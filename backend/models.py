import sqlite3

# 连接数据库
conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# 创建 faculty 表
cursor.execute("""
CREATE TABLE IF NOT EXISTS faculty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT,
    email TEXT
)
""")

conn.commit()  # 提交事务
conn.close()   # 关闭连接









