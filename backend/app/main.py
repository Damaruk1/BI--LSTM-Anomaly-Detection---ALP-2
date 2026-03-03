from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from backend.app.database import db
from backend.app.inference import predict_sequence

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Collections ----------------
employees_collection = db["employees"]
predictions_collection = db["predictions"]

# ---------------- Root ----------------
@app.get("/")
def root():
    return {"message": "AI SOC Backend Running"}

# ---------------- Create Employee ----------------
@app.post("/employees")
def create_employee(employee: dict):
    employee["created_at"] = datetime.utcnow()
    employees_collection.insert_one(employee)
    return {"message": "Employee added successfully"}

# ---------------- Get Employees ----------------
@app.get("/employees")
def get_employees():
    employees = list(employees_collection.find())
    for emp in employees:
        emp["_id"] = str(emp["_id"])
        emp["created_at"] = emp["created_at"].strftime("%Y-%m-%d %H:%M:%S")
    return employees

# ---------------- Analyze Log ----------------
@app.post("/analyze")
def analyze(payload: dict):
    employee_id = payload.get("employee_id")
    sequence = payload.get("sequence")

    if not employee_id or not sequence:
        return {"error": "employee_id and sequence required"}

    result = predict_sequence(sequence)

    employee = employees_collection.find_one({"employee_id": employee_id})

    record = {
        "employee_id": employee_id,
        "employee_name": employee["name"] if employee else "Unknown",
        "prediction": result["prediction"],
        "reconstruction_error": float(result["reconstruction_error"]),
        "threshold": float(result["threshold"]),
        "timestamp": datetime.utcnow()
    }

    inserted = predictions_collection.insert_one(record)
    record["_id"] = str(inserted.inserted_id)
    record["timestamp"] = record["timestamp"].strftime("%Y-%m-%d %H:%M:%S")

    return record

# ---------------- Employee-wise History ----------------
@app.get("/history")
def get_history():
    records = list(predictions_collection.find().sort("timestamp", -1))

    grouped = {}

    for rec in records:
        emp_id = rec.get("employee_id", "Unknown")

        # Safe timestamp handling
        timestamp = rec.get("timestamp")
        if isinstance(timestamp, datetime):
            timestamp = timestamp.strftime("%Y-%m-%d %H:%M:%S")
        else:
            timestamp = str(timestamp)

        if emp_id not in grouped:
            grouped[emp_id] = {
                "employee_id": emp_id,
                "employee_name": rec.get("employee_name", "Unknown"),
                "logs": []
            }

        grouped[emp_id]["logs"].append({
            "prediction": rec.get("prediction"),
            "reconstruction_error": float(rec.get("reconstruction_error", 0)),
            "threshold": float(rec.get("threshold", 0)),
            "timestamp": timestamp
        })

    return list(grouped.values())
