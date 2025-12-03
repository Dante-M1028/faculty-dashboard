from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)  

DB_PATH = "database.db"  


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/api/faculty", methods=["GET"])
def get_faculty_data():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM faculty").fetchall()
    conn.close()
    data = [dict(row) for row in rows]  
    return jsonify(data)


@app.route("/api/faculty", methods=["POST"])
def add_faculty():
    data = request.json  
    name = data.get("name")
    department = data.get("department")
    email = data.get("email")

    conn = get_db_connection()
    conn.execute("INSERT INTO faculty (name, department, email) VALUES (?, ?, ?)",
                 (name, department, email))
    conn.commit()
    conn.close()
    return jsonify({"message": "Faculty member added"}), 201


if __name__ == "__main__":
    app.run(debug=True)  









