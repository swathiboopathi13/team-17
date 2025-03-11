import pandas as pd
import numpy as np
import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Sample dataset
data = {
    "height": [80, 90, 100, 110, 120, 130, 140],
    "weight": [10, 15, 20, 25, 30, 35, 40],
    "growth_status": ["Underweight", "Underweight", "Normal", "Normal", "Overweight", "Overweight", "Obese"]
}

df = pd.DataFrame(data)
df["growth_status"] = df["growth_status"].astype("category").cat.codes

X = df[["height", "weight"]]
y = df["growth_status"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

pickle.dump(model, open("growth_model.pkl", "wb"))

print("Model trained and saved as growth_model.pkl")
