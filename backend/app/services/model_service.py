from pathlib import Path

import torch
from PIL import Image
from torchvision import transforms

import sys


# ============================================================
# PATH SETUP
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

ML_MODELS_PATH = PROJECT_ROOT / "ml" / "models"
ML_SRC_PATH = PROJECT_ROOT / "ml" / "src" / "models"

sys.path.append(str(ML_SRC_PATH))


# Import your Improved CNN
from improved_cnn import ImprovedCNN


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
        ML_MODELS_PATH / "improved_cnn.pth",
        map_location=device
    )
)

model.to(device)
model.eval()


# ============================================================
# IMAGE TRANSFORM
# ============================================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])


# ============================================================
# PREDICTION FUNCTION
# ============================================================

def predict_image(image: Image.Image):

    image = image.convert("RGB")

    image_tensor = transform(image)

    image_tensor = image_tensor.unsqueeze(0)

    image_tensor = image_tensor.to(device)

    with torch.no_grad():

        output = model(image_tensor)

        probabilities = torch.softmax(output, dim=1)

        predicted_class = torch.argmax(
            probabilities,
            dim=1
        ).item()

        confidence = probabilities[0][predicted_class].item()

    return {
        "disease": CLASS_NAMES[predicted_class],
        "confidence": round(confidence * 100, 2)
    }