import torch
import torch.nn as nn
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import json
from model_architecture import BiLSTMAutoencoder

seq_len = 30
features = 3
samples = 1500

normal_data = np.random.normal(0, 1, (samples, seq_len, features))

scaler = StandardScaler()
normal_data = normal_data.reshape(-1, features)
normal_data = scaler.fit_transform(normal_data)
normal_data = normal_data.reshape(samples, seq_len, features)

data = torch.tensor(normal_data, dtype=torch.float32)

model = BiLSTMAutoencoder(features, 64)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.MSELoss()

epochs = 8

for epoch in range(epochs):
    optimizer.zero_grad()
    output = model(data)
    loss = criterion(output, data)
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

with torch.no_grad():
    recon = model(data)
    errors = torch.mean((recon - data)**2, dim=(1,2)).numpy()

threshold = errors.mean() + 3 * errors.std()

torch.save(model.state_dict(), "model.pth")
joblib.dump(scaler, "scaler.pkl")

with open("threshold.json", "w") as f:
    json.dump({"threshold": float(threshold)}, f)

print("Training Complete")
print("Threshold:", threshold)