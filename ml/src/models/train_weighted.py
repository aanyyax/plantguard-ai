import sys
from pathlib import Path

import torch
import torch.nn as nn
import torch.optim as optim

# Allow importing dataset_loader and improved_cnn
sys.path.append(str(Path(__file__).resolve().parents[1] / "data"))

from dataset_loader import train_loader, val_loader
from improved_cnn import ImprovedCNN


# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ---------------------------------------------------------
# Calculate class weights
# ---------------------------------------------------------

num_classes = 15

class_counts = torch.zeros(num_classes)

for _, labels in train_loader:
    for label in labels:
        class_counts[label] += 1

# Inverse-frequency weighting
class_weights = 1.0 / class_counts

# Normalize weights
class_weights = class_weights / class_weights.sum() * num_classes

class_weights = class_weights.to(device)


print("=" * 60)
print("PLANTGUARD AI - CLASS WEIGHT CALCULATION")
print("=" * 60)

for i, weight in enumerate(class_weights):
    print(f"Class {i:<2} | Images: {int(class_counts[i]):<5} | Weight: {weight:.4f}")

print("=" * 60)


# ---------------------------------------------------------
# Model
# ---------------------------------------------------------

model = ImprovedCNN(num_classes=num_classes)
model = model.to(device)


# Weighted loss
criterion = nn.CrossEntropyLoss(
    weight=class_weights
)


# Optimizer
optimizer = optim.Adam(
    model.parameters(),
    lr=0.001
)


# Keep at 1 epoch for CPU
EPOCHS = 1


print("\n" + "=" * 60)
print("PLANTGUARD AI - WEIGHTED CNN TRAINING")
print("=" * 60)
print(f"Device : {device}")
print(f"Epochs : {EPOCHS}")
print("Loss   : Weighted CrossEntropyLoss")
print("=" * 60)


# ---------------------------------------------------------
# Training
# ---------------------------------------------------------

for epoch in range(EPOCHS):

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    train_loss = running_loss / len(train_loader)
    train_accuracy = 100 * correct / total


    # -----------------------------------------------------
    # Validation
    # -----------------------------------------------------

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

    val_loss = val_loss / len(val_loader)
    val_accuracy = 100 * val_correct / val_total


    print(
        f"Epoch [{epoch + 1}/{EPOCHS}] | "
        f"Train Loss: {train_loss:.4f} | "
        f"Train Acc: {train_accuracy:.2f}% | "
        f"Val Loss: {val_loss:.4f} | "
        f"Val Acc: {val_accuracy:.2f}%"
    )


# ---------------------------------------------------------
# Save model
# ---------------------------------------------------------

model_path = Path("ml/models/weighted_cnn.pth")
model_path.parent.mkdir(parents=True, exist_ok=True)

torch.save(model.state_dict(), model_path)


print("=" * 60)
print("Training complete!")
print(f"Model saved to: {model_path}")
print("=" * 60)