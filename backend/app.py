# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from zbmath_scraper import get_zbmath_author_data
import os
from functools import lru_cache
import time

app = Flask(__name__)

# Enable CORS with proper configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuration
FACULTY_AUTHORS = [
    "tao.terence",
    "alon.noga", 
    "wiles.andrew",
    "perelman.grigori",
    "yau.shing-tung"
]

# Cache for author data (expires after 1 hour)
CACHE = {}
CACHE_EXPIRY = 3600  # 1 hour


def get_cached_data(author_id: str) -> dict:
    """
    Get cached data or fetch fresh data if cache expired
    """
    current_time = time.time()
    
    if author_id in CACHE:
        data, timestamp = CACHE[author_id]
        if current_time - timestamp < CACHE_EXPIRY:
            return data
    
    # Fetch fresh data
    print(f"🔍 Fetching fresh data for: {author_id}...")
    try:
        data = get_zbmath_author_data(author_id)
        CACHE[author_id] = (data, current_time)
        print(f"✅ Successfully cached data for {author_id}")
        return data
    except Exception as e:
        print(f"❌ Error fetching data for {author_id}: {e}")
        return {
            "id": author_id,
            "name": author_id,
            "num_publications": 0,
            "num_reviews": 0,
            "num_co_authors": 0,
            "num_joint_publications": 0,
            "metrics": {
                "h_index": 0,
                "g_index": 0
            },
            "publications": [],
            "publications_by_year": [],
            "citations_by_year": [],
            "error": str(e)
        }


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Faculty Dashboard Backend is running"})


@app.route('/api/faculty', methods=['GET'])
def get_faculty_data():
    """
    Get data for all faculty members
    
    Query parameters:
    - authors: comma-separated list of author IDs (optional)
    - cache: 'true' to use cache, 'false' to force refresh (optional)
    """
    try:
        # Get authors from query params or use defaults
        authors_param = request.args.get('authors', '')
        use_cache = request.args.get('cache', 'true').lower() != 'false'
        
        if authors_param:
            authors = [a.strip() for a in authors_param.split(',')]
        else:
            authors = FACULTY_AUTHORS
        
        data = []
        
        for author_id in authors:
            print(f"Processing author: {author_id}")
            
            if use_cache:
                author_data = get_cached_data(author_id)
            else:
                # Force fresh fetch
                author_data = get_zbmath_author_data(author_id)
                CACHE[author_id] = (author_data, time.time())
            
            data.append(author_data)
        
        return jsonify({
            "success": True,
            "count": len(data),
            "data": data,
            "timestamp": time.time()
        }), 200
    
    except Exception as e:
        print(f"Error in get_faculty_data: {e}")
        return jsonify({
            "success": False,
            "error": str(e),
            "data": []
        }), 500


@app.route('/api/faculty/<author_id>', methods=['GET'])
def get_faculty_by_id(author_id: str):
    """
    Get data for a specific faculty member
    
    Path parameters:
    - author_id: zbMATH author ID (e.g., "tao.terence")
    """
    try:
        use_cache = request.args.get('cache', 'true').lower() != 'false'
        
        if use_cache:
            author_data = get_cached_data(author_id)
        else:
            author_data = get_zbmath_author_data(author_id)
            CACHE[author_id] = (author_data, time.time())
        
        return jsonify({
            "success": True,
            "data": author_data,
            "timestamp": time.time()
        }), 200
    
    except Exception as e:
        print(f"Error fetching faculty {author_id}: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/faculty/<author_id>/publications', methods=['GET'])
def get_faculty_publications(author_id: str):
    """
    Get publications for a specific faculty member
    
    Query parameters:
    - limit: maximum number of publications to return (default: 50)
    - year: filter by publication year (optional)
    """
    try:
        limit = int(request.args.get('limit', 50))
        year_filter = request.args.get('year')
        
        author_data = get_cached_data(author_id)
        publications = author_data.get('publications', [])
        
        # Filter by year if specified
        if year_filter:
            try:
                year_filter = int(year_filter)
                publications = [p for p in publications if p.get('year') == year_filter]
            except ValueError:
                pass
        
        # Apply limit
        publications = publications[:limit]
        
        return jsonify({
            "success": True,
            "author_id": author_id,
            "count": len(publications),
            "data": publications,
            "timestamp": time.time()
        }), 200
    
    except Exception as e:
        print(f"Error fetching publications for {author_id}: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/faculty/<author_id>/metrics', methods=['GET'])
def get_faculty_metrics(author_id: str):
    """
    Get metrics for a specific faculty member
    """
    try:
        author_data = get_cached_data(author_id)
        
        return jsonify({
            "success": True,
            "author_id": author_id,
            "name": author_data.get('name'),
            "metrics": author_data.get('metrics', {}),
            "num_publications": author_data.get('num_publications', 0),
            "num_co_authors": author_data.get('num_co_authors', 0),
            "timestamp": time.time()
        }), 200
    
    except Exception as e:
        print(f"Error fetching metrics for {author_id}: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/cache/clear', methods=['POST'])
def clear_cache():
    """
    Clear the cache (useful for testing)
    """
    global CACHE
    CACHE.clear()
    return jsonify({
        "success": True,
        "message": "Cache cleared"
    }), 200


@app.route('/api/cache/status', methods=['GET'])
def cache_status():
    """
    Get cache status
    """
    current_time = time.time()
    cache_info = {}
    
    for author_id, (data, timestamp) in CACHE.items():
        age = current_time - timestamp
        cache_info[author_id] = {
            "cached_at": timestamp,
            "age_seconds": age,
            "expired": age > CACHE_EXPIRY,
            "publications_count": len(data.get('publications', []))
        }
    
    return jsonify({
        "success": True,
        "cache_size": len(CACHE),
        "cache_expiry_seconds": CACHE_EXPIRY,
        "entries": cache_info,
        "timestamp": time.time()
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "path": request.path
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "message": str(error)
    }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting Faculty Dashboard Backend on port {port}")
    print(f"📚 Faculty authors: {', '.join(FACULTY_AUTHORS)}")
    print(f"🔄 Cache expiry: {CACHE_EXPIRY} seconds")
    
    app.run(debug=debug, host='0.0.0.0', port=port)
