# Faculty Dashboard System - Deployment Guide

## 📋 Overview

This is a full-stack faculty performance dashboard system that fetches academic data from zbMATH and displays it through an interactive web interface.

**Architecture:**
- **Backend**: Flask (Python) REST API on port 5000
- **Frontend**: Bootstrap + Chart.js HTML/JavaScript on port 8000
- **Data Source**: zbMATH Open REST API (with fallback data)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation & Running

#### 1. Install Dependencies
```bash
cd faculty-dashboard2
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. Start Backend Server
```bash
cd backend
PORT=5000 python3 app.py
```

The backend will start on `http://localhost:5000`

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

#### 3. Start Frontend Server (in another terminal)
```bash
cd frontend
python3 -m http.server 8000
```

The frontend will be available at `http://localhost:8000`

---

## 📊 API Endpoints

### Faculty Data
- **GET** `/api/faculty` - Get all faculty data
- **GET** `/api/faculty/<author_id>` - Get specific faculty data
- **GET** `/api/faculty/<author_id>/publications` - Get publications
- **GET** `/api/faculty/<author_id>/metrics` - Get metrics

### Cache Management
- **GET** `/api/cache/status` - Check cache status
- **POST** `/api/cache/clear` - Clear the cache

### Example Requests
```bash
# Get all faculty data
curl http://localhost:5000/api/faculty

# Get specific author
curl http://localhost:5000/api/faculty/tao.terence

# Get author publications
curl http://localhost:5000/api/faculty/tao.terence/publications?limit=10

# Force fresh data (bypass cache)
curl "http://localhost:5000/api/faculty?cache=false"
```

---

## 📁 Project Structure

```
faculty-dashboard2/
├── backend/
│   ├── app.py                 # Flask application
│   ├── zbmath_scraper.py      # zbMATH API client
│   └── models.py              # (Optional) Data models
├── frontend/
│   ├── index.html             # Main HTML
│   ├── js/
│   │   ├── app.js             # Main application logic
│   │   └── consolidated_data.js  # Sample data
│   ├── img/                   # Images
│   └── css/                   # Styles (if any)
├── requirements.txt           # Python dependencies
└── DEPLOYMENT_GUIDE.md        # This file
```

---

## 🔧 Configuration

### Environment Variables
```bash
PORT=5000              # Backend port (default: 5000)
DEBUG=True             # Debug mode (default: True)
```

### Faculty Authors
Edit `backend/app.py` to change the default faculty list:
```python
FACULTY_AUTHORS = [
    "tao.terence",
    "alon.noga", 
    "wiles.andrew",
    # Add more authors here
]
```

---

## 📈 Features

### Dashboard
- **Metrics Overview**: Total publications, citations, average h-index
- **Charts**: Publications and citations trends by year
- **Faculty Ranking**: Top faculty by h-index

### Faculty Profiles
- Individual faculty metrics
- Publication history
- Co-author network
- Citation trends

### Data Management
- **Caching**: 1-hour cache for performance
- **Fallback Data**: Works even if zbMATH API is unavailable
- **Rate Limiting**: Respects API rate limits

---

## 🔌 Data Integration

### zbMATH API
The system attempts to fetch real data from zbMATH REST API:
- Author search
- Publication search
- Document details

**Note**: If the API is unavailable or returns 403 errors, the system automatically falls back to sample data.

### Adding New Authors
1. Add author ID to `FACULTY_AUTHORS` in `backend/app.py`
2. Ensure the author exists in zbMATH (format: `firstname.lastname`)

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use: `lsof -i :5000`
- Kill existing process: `fuser -k 5000/tcp`
- Try different port: `PORT=5001 python3 app.py`

### Frontend shows "Error loading faculty data"
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check browser console for CORS errors
- Ensure both servers are running

### No data displayed
- Check backend logs for errors
- Verify zbMATH API connectivity
- System will use fallback data if API fails

### CORS Issues
- Backend has CORS enabled for all origins
- If issues persist, check browser console for specific errors

---

## 🚢 Production Deployment

### Using Gunicorn (Recommended)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker
Create `Dockerfile`:
```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

Build and run:
```bash
docker build -t faculty-dashboard .
docker run -p 5000:5000 faculty-dashboard
```

### Frontend Deployment
- Build static files (already done)
- Deploy to web server (Nginx, Apache, etc.)
- Update API URL in `js/app.js` if needed

---

## 📝 Notes

- All timestamps are in UTC
- Data is cached for 1 hour by default
- The system gracefully handles API failures with fallback data
- CORS is enabled for development; configure for production

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs: `tail -f backend.log`
3. Check browser console for frontend errors
4. Verify API connectivity: `curl http://localhost:5000/api/health`

---

**Last Updated**: December 3, 2025
