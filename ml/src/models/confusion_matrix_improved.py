import sys
from pathlib import Path

import torch
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay


# ============================================================
# PATH SETUP
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

sys.path.append(str(PROJECT_ROOT / "ml" / "src"))
sys.path.append(str(PROJECT_ROOT / "ml" / "src" / "models"))
sys.path.append(str(PROJECT_ROOT / "ml" / "src" / "data"))


# Import model and test loader
from improved_cnn import ImprovedCNN
from dataset_loader import test_loader


# ============================================================
# DEVICE
# ============================================================

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("=" * 60)
print("PLANTGUARD AI - IMPROVED CNN CONFUSION MATRIX")
print("=" * 60)
print(f"Device: {device}")


# ============================================================
# LOAD MODEL
# ============================================================

model = ImprovedCNN(num_classes=15)

model.load_state_dict(
    torch.load(
        PROJECT_ROOT / "ml" / "models" / "improved_cnn.pth",
        map_location=device
    )
)

model.to(device)
model.eval()

print("Improved CNN model loaded successfully.")


# ============================================================
# PREDICTIONS
# ============================================================

all_predictions = []
all_labels = []

print("Generating predictions...")

with torch.no_grad():

    for images, labels in test_loader:

        images = images.to(device)

        outputs = model(images)

        predictions = torch.argmax(outputs, dim=1)

        all_predictions.extend(
            predictions.cpu().numpy()
        )

        all_labels.extend(
            labels.numpy()
        )


# ============================================================
# CONFUSION MATRIX
# ============================================================

class_names = test_loader.dataset.classes

cm = confusion_matrix(
    all_labels,
    all_predictions
)

print("Confusion matrix calculated successfully.")


# ============================================================
# DISPLAY CONFUSION MATRIX
# ============================================================

fig, ax = plt.subplots(figsize=(16, 14))

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=class_names
)

disp.plot(
    ax=ax,
    xticks_rotation=90,
    cmap="Blues",
    values_format="d",
    colorbar=True
)

plt.title(
    "PlantGuard AI - Improved CNN Confusion Matrix",
    fontsize=16
)

plt.tight_layout()


# ============================================================
# SAVE FIGURE
# ============================================================

output_path = (
    PROJECT_ROOT
    / "ml"
    / "outputs"
    / "improved_cnn_confusion_matrix.png"
)

plt.savefig(
    output_path,
    dpi=300,
    bbox_inches="tight"
)

plt.show()


print("=" * 60)
print("CONFUSION MATRIX GENERATED SUCCESSFULLY")
print("=" * 60)
print(f"Saved at: {output_path}")
print("=" * 60)