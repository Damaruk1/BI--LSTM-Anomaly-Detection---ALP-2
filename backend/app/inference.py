import torch
import numpy as np
import joblib
import os
import json

from backend.app.model_architecture import BiLSTMAutoencoder

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "..", "model")

model_path = os.path.join(MODEL_DIR, "model.pth")
scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")
threshold_path = os.path.join(MODEL_DIR, "threshold.json")

# Load Model
model = BiLSTMAutoencoder(input_dim=3, hidden_dim=64)
model.load_state_dict(
    torch.load(model_path, map_location=torch.device("cpu"))
)
model.eval()

# Load Scaler
scaler = joblib.load(scaler_path)

# Load Threshold
with open(threshold_path, "r") as f:
    threshold = json.load(f)["threshold"]


def predict_sequence(sequence):

    sequence = np.array(sequence)

    scaled = scaler.transform(sequence)

    tensor = torch.tensor(
        scaled,
        dtype=torch.float32
    ).unsqueeze(0)

    with torch.no_grad():
        reconstructed = model(tensor)

    loss = torch.mean(
        (tensor - reconstructed) ** 2
    ).item()

    prediction = "Anomaly" if loss > threshold else "Normal"

    return {
        "reconstruction_error": loss,
        "threshold": threshold,
        "prediction": prediction
    }
