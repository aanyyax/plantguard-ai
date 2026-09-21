import sys
from pathlib import Path

import torch
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Allow importing dataset_loader and baseline_cnn
sys.path.append(str(Path(__file__).resolve().parents[1] / "data"))

from dataset_loader import test_loader
from baseline_cnn import BaselineCNN


# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Create model
model = BaselineCNN(num_classes=15)

# Load trained model
model_path = Path("ml/models/baseline_cnn.pth")
model.load_state_dict(torch.load(model_path, map_location=device))

model = model.to(device)
model.eval()


# Store predictions and actual labels
all_predictions = []
all_labels = []


print("=" * 60)
print("PLANTGUARD AI - BASELINE CNN EVALUATION")
print("=" * 60)
print(f"Device : {device}")
print(f"Test images : {len(test_loader.dataset)}")
print("=" * 60)


# Evaluation
with torch.no_grad():

    for images, labels in test_loader:

        images = images.to(device)
        labels = labels.to(device)

        outputs = model(images)

        _, predicted = torch.max(outputs, 1)

        all_predictions.extend(predicted.cpu().numpy())
        all_labels.extend(labels.cpu().numpy())


# Accuracy
accuracy = accuracy_score(all_labels, all_predictions)

print(f"\nTest Accuracy : {accuracy * 100:.2f}%")


# Classification report
print("\nClassification Report:")
print(
    classification_report(
        all_labels,
        all_predictions,
        target_names=test_loader.dataset.classes,
        zero_division=0
    )
)


# Confusion matrix
cm = confusion_matrix(all_labels, all_predictions)

print("\nConfusion Matrix:")
print(cm)

print("\n" + "=" * 60)
print("BASELINE CNN EVALUATION COMPLETE")
print("=" * 60)