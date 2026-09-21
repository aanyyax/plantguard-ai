import sys
from pathlib import Path

import torch
import matplotlib.pyplot as plt

sys.path.append(str(Path(__file__).resolve().parents[1] / "data"))

from dataset_loader import test_loader
from baseline_cnn import BaselineCNN
from improved_cnn import ImprovedCNN


device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


def evaluate_model(model):

    model = model.to(device)
    model.eval()

    correct = 0
    total = 0

    with torch.no_grad():

        for images, labels in test_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    return 100 * correct / total


# -------------------------------------------------
# Load Baseline CNN
# -------------------------------------------------

baseline_model = BaselineCNN(num_classes=15)

baseline_model.load_state_dict(
    torch.load(
        "ml/models/baseline_cnn.pth",
        map_location=device
    )
)


# -------------------------------------------------
# Load Improved CNN
# -------------------------------------------------

improved_model = ImprovedCNN(num_classes=15)

improved_model.load_state_dict(
    torch.load(
        "ml/models/improved_cnn.pth",
        map_location=device
    )
)


# -------------------------------------------------
# Load Weighted CNN
# -------------------------------------------------

weighted_model = ImprovedCNN(num_classes=15)

weighted_model.load_state_dict(
    torch.load(
        "ml/models/weighted_cnn.pth",
        map_location=device
    )
)


# -------------------------------------------------
# Evaluate
# -------------------------------------------------

baseline_accuracy = evaluate_model(
    baseline_model
)

improved_accuracy = evaluate_model(
    improved_model
)

weighted_accuracy = evaluate_model(
    weighted_model
)


# -------------------------------------------------
# Display results
# -------------------------------------------------

print("=" * 60)
print("PLANTGUARD AI - FINAL MODEL COMPARISON")
print("=" * 60)

print(
    f"Baseline CNN  : {baseline_accuracy:.2f}%"
)

print(
    f"Improved CNN  : {improved_accuracy:.2f}%"
)

print(
    f"Weighted CNN  : {weighted_accuracy:.2f}%"
)

print("=" * 60)


# -------------------------------------------------
# Create chart
# -------------------------------------------------

models = [
    "Baseline CNN",
    "Improved CNN",
    "Weighted CNN"
]

accuracies = [
    baseline_accuracy,
    improved_accuracy,
    weighted_accuracy
]


plt.figure(figsize=(9, 5))

plt.bar(
    models,
    accuracies
)

plt.ylabel("Test Accuracy (%)")
plt.xlabel("Model")
plt.title(
    "PlantGuard AI - Final CNN Model Comparison"
)

plt.ylim(0, 100)

plt.tight_layout()


# Save chart

output_path = Path(
    "ml/outputs/final_model_comparison.png"
)

output_path.parent.mkdir(
    parents=True,
    exist_ok=True
)

plt.savefig(output_path)

print(
    f"\nFinal comparison chart saved to: "
    f"{output_path}"
)

plt.show()