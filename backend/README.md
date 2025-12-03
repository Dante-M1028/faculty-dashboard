Faculty Performance Dashboard - Backend

This project provides the backend API for the Faculty Performance 
Dashboard. It is built with Flask, a lightweight Python web framework, to 
handle data management and provide endpoints for the frontend to retrieve 
faculty-related performance metrics.

🔧 Technologies Used

Flask: Python web framework used for the backend server.

SQLite: Embedded database to store faculty data (including publications, 
citations, and other metrics).

Python 3.x: Programming language for backend development.

SQLAlchemy: Object-relational mapping (ORM) tool for database operations.

🚀 Features

Faculty Data API: Provides endpoints to retrieve faculty data, 
publications, citations, and other metrics.

Database: Stores faculty data, such as publications, citations by year, 
and h-index.

Endpoints:

/api/faculty: Fetches all faculty data, including metrics and 
publications.

/api/faculty/{id}: Fetches detailed information about a specific faculty 
member.

🔨 Installation

Follow these steps to set up the backend locally:

Option 1: Clone and Run Locally

Clone the repository:

git clone https://github.com/yourusername/faculty-dashboard.git


Navigate to the project directory:

cd faculty-dashboard/backend


Set up a virtual environment (optional, but recommended):

python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`


Install dependencies:

pip install -r requirements.txt


Run the Flask application:

python app.py


The backend should now be running on http://localhost:5000.

Option 2: Use Docker (If applicable)

Build and run the Docker container:

docker build -t faculty-dashboard-backend .
docker run -p 5000:5000 faculty-dashboard-backend

💻 Running the Backend Locally

After following the installation steps, the Flask API should be running on 
http://localhost:5000. You can access the faculty data by visiting:

/api/faculty: Displays a list of all faculty members.

/api/faculty/{id}: Displays detailed information about a specific faculty 
member.

Example Request:
curl http://localhost:5000/api/faculty

Example Response:
[
  {
    "id": 1,
    "name": "John Doe",
    "department": "Computer Science",
    "publications": 20,
    "citations": 1500,
    "h_index": 25,
    "citations_by_year": [
      { "year": 2020, "count": 300 },
      { "year": 2021, "count": 400 }
    ]
  }
]

🛠️ Running Tests (If applicable)

If you have any test suite set up, you can run the tests using:

python -m unittest discover


Or if you're using pytest:

pytest



