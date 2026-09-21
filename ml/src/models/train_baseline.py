import sys
from pathlib import Path
import torch
import torch.nn as nn
import torch.optim as optim

# Allow importing dataset_loader and baseline_cnn
sys.path.append(str(Path(__file__).resolve().parents[1] / "data"))

from dataset_loader import train_loader, val_loader
from baseline_cnn import BaselineCNN


# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Model
model = BaselineCNN(num_classes=15)
model = model.to(device)

# Loss function
criterion = nn.CrossEntropyLoss()

# Optimizer
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Number of epochs
EPOCHS = 1

print("=" * 60)
print("PLANTGUARD AI - BASELINE CNN TRAINING")
print("=" * 60)
print(f"Device : {device}")
print(f"Epochs : {EPOCHS}")
print("=" * 60)


# Training loop
for epoch in range(EPOCHS):

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:

        images = images.to(device)
        labels = labels.to(device)

        # Clear gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = model(images)

        # Calculate loss
        loss = criterion(outputs, labels)

        # Backpropagation
        loss.backward()

        # Update weights
        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    train_accuracy = 100 * correct / total
    train_loss = running_loss / len(train_loader)

    # Validation
    model.eval()

    val_loss = 0.0
    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            loss = criterion(outputs, labels)

            val_loss += loss.item()

            _, predicted = torch.max(outputs, 1)

            val_total += labels.size(0)
            val_correct += (predicted == labels).sum().item()

    val_accuracy = 100 * val_correct / val_total
    val_loss = val_loss / len(val_loader)

    print(
        f"Epoch [{epoch + 1}/{EPOCHS}] | "
        f"Train Loss: {train_loss:.4f} | "
        f"Train Acc: {train_accuracy:.2f}% | "
        f"Val Loss: {val_loss:.4f} | "
        f"Val Acc: {val_accuracy:.2f}%"
    )


# Save trained model
model_path = Path("ml/models/baseline_cnn.pth")
model_path.parent.mkdir(parents=True, exist_ok=True)

torch.save(model.state_dict(), model_path)

print("=" * 60)
print(f"Training complete!")
print(f"Model saved to: {model_path}")
print("=" * 60)