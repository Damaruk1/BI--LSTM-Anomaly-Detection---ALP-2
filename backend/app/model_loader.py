import torch
import joblib
import json
import os
from backend.app.model_architecture import BiLSTMAutoencoder

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "..", "model")

def load_components():
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

    with open(os.path.join(MODEL_DIR, "threshold.json")) as f:
        threshold = json.load(f)["threshold"]

    model = BiLSTMAutoencoder(3, 64)
    model.load_state_dict(
        torch.load(os.path.join(MODEL_DIR, "model.pth"), map_location=torch.device("cpu"))
    )
    model.eval()

    return model, scaler, threshold
