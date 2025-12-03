from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

# 初始化 Flask 应用
app = Flask(__name__)
CORS(app)  # 允许跨域请求，解决前端请求跨域问题

DB_PATH = "database.db"  # 数据库路径

# 连接到数据库
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# 获取所有教师数据的 API 路由
@app.route("/api/faculty", methods=["GET"])
def get_faculty_data():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM faculty").fetchall()
    conn.close()
    data = [dict(row) for row in rows]  # 转换成字典格式
    return jsonify(data)

# 添加教师数据的 API 路由
@app.route("/api/faculty", methods=["POST"])
def add_faculty():
    data = request.json  # 获取请求的 JSON 数据
    name = data.get("name")
    department = data.get("department")
    email = data.get("email")

    conn = get_db_connection()
    conn.execute("INSERT INTO faculty (name, department, email) VALUES (?, ?, ?)",
                 (name, department, email))
    conn.commit()
    conn.close()
    return jsonify({"message": "Faculty member added"}), 201

# 运行应用
if __name__ == "__main__":
    app.run(debug=True)  # 开启调试模式，方便调试和开发








