import sys
import pandas as pd
import mysql.connector
from sklearn.ensemble import IsolationForest

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="swathi",
    database="attendance_db"
)
cursor = conn.cursor()

# Get student ID from Node.js
student_id = sys.argv[1]

# Fetch last 10 attendance records
cursor.execute("SELECT timestamp FROM attendance WHERE student_id = %s ORDER BY timestamp DESC LIMIT 10", (student_id,))
data = cursor.fetchall()

if len(data) < 5:
    print("No Fraud")  # Not enough data to analyze
    sys.exit()

# Convert timestamps to pandas DataFrame
df = pd.DataFrame(data, columns=["timestamp"])
df["timestamp"] = pd.to_datetime(df["timestamp"])
df["time_diff"] = df["timestamp"].diff().dt.total_seconds().fillna(0)

# Train Isolation Forest to detect anomalies
model = IsolationForest(contamination=0.2, random_state=42)
df["anomaly"] = model.fit_predict(df[["time_diff"]])

# If latest record is flagged as fraud
if df["anomaly"].iloc[-1] == -1:
    print("Fraud Detected")
else:
    print("No Fraud")

cursor.close()
conn.close()
