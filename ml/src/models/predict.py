import sys
from pathlib import Path

import torch
from PIL import Image
from torchvision import transforms

from improved_cnn import ImprovedCNN


# ============================================================
# PATH SETUP
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

# ------------------------------------------------------------
# CHANGE THIS IMAGE PATH TO YOUR TEST LEAF IMAGE
# ------------------------------------------------------------

IMAGE_PATH = PROJECT_ROOT / "data" / "external_test" / "test_leaf.jpg"

MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "improved_cnn.pth"


# ============================================================
# CLASS NAMES
# ============================================================

CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___healthy",
    "Potato___Late_blight",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_healthy",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_mosaic_virus",
    "Tomato__Tomato_YellowLeaf__Curl_Virus"
]


# ============================================================
# DEVICE
# ============================================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# ============================================================
# LOAD MODEL
# ============================================================

model = ImprovedCNN(num_classes=15)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model.to(device)
model.eval()


# ============================================================
# IMAGE PREPROCESSING
# ============================================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])


# ============================================================
# LOAD IMAGE
# ============================================================

if not IMAGE_PATH.exists():

    print("=" * 60)
    print("IMAGE NOT FOUND")
    print("=" * 60)
    print(f"Please put a test image here:")
    print(IMAGE_PATH)
    sys.exit()


image = Image.open(IMAGE_PATH).convert("RGB")

image_tensor = transform(image)

image_tensor = image_tensor.unsqueeze(0)

image_tensor = image_tensor.to(device)


# ============================================================
# PREDICTION
# ============================================================

with torch.no_grad():

    output = model(image_tensor)

    probabilities = torch.softmax(output, dim=1)

    predicted_class = torch.argmax(
        probabilities,
        dim=1
    ).item()

    confidence = probabilities[0][predicted_class].item()


# ============================================================
# RESULT
# ============================================================

print("=" * 60)
print("PLANTGUARD AI - DISEASE PREDICTION")
print("=" * 60)

print(f"Predicted Disease : {CLASS_NAMES[predicted_class]}")
print(f"Confidence        : {confidence * 100:.2f}%")

print("=" * 60)