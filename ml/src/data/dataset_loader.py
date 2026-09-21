from pathlib import Path
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Dataset paths
TRAIN_DIR = Path("data/processed/train")
VAL_DIR = Path("data/processed/val")
TEST_DIR = Path("data/processed/test")

# Image settings
IMAGE_SIZE = 224
BATCH_SIZE = 64

# Training transformations
train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.RandomResizedCrop(
        IMAGE_SIZE,
        scale=(0.8, 1.0)
    ),
    transforms.ColorJitter(
        brightness=0.15
    ),
    transforms.ToTensor(),
])

# Validation and test transformations
test_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
])

# Load datasets
train_dataset = datasets.ImageFolder(
    TRAIN_DIR,
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    VAL_DIR,
    transform=test_transform
)

test_dataset = datasets.ImageFolder(
    TEST_DIR,
    transform=test_transform
)

# Create data loaders
train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

# Display information
print("=" * 60)
print("PLANTGUARD AI - DATASET LOADER")
print("=" * 60)

print(f"Number of classes   : {len(train_dataset.classes)}")
print(f"Training images     : {len(train_dataset)}")
print(f"Validation images   : {len(val_dataset)}")
print(f"Testing images      : {len(test_dataset)}")
print(f"Image size          : {IMAGE_SIZE} x {IMAGE_SIZE}")
print(f"Batch size          : {BATCH_SIZE}")

print("\nClasses:")
for i, class_name in enumerate(train_dataset.classes):
    print(f"{i}: {class_name}")

print("=" * 60)
# Test one batch
images, labels = next(iter(train_loader))

print("\nBatch test:")
print(f"Image batch shape : {images.shape}")
print(f"Label batch shape : {labels.shape}")