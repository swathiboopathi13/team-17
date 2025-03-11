import sys
import pickle
import numpy as np
import warnings

# Ignore warnings (optional, to suppress feature name warnings)
warnings.filterwarnings("ignore")

# Load the trained model
try:
    model = pickle.load(open("growth_model.pkl", "rb"))
except FileNotFoundError:
    print("Error: growth_model.pkl not found")
    sys.exit(1)

def predict_growth(height, weight):
    try:
        # Convert input to float and reshape into a 2D array
        input_data = np.array([[float(height), float(weight)]])
        prediction = model.predict(input_data)
        return prediction[0]
    except ValueError:
        return "Error: Invalid input data"

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Error: Missing height or weight input")
        sys.exit(1)

    height = sys.argv[1]
    weight = sys.argv[2]

    result = predict_growth(height, weight)
    print(result)
