from pathlib import Path
import shutil
from sklearn.model_selection import train_test_split

# Paths
SOURCE_DIR = Path("data/raw/PlantVillage")
OUTPUT_DIR = Path("data/processed")

# Split settings
TRAIN_RATIO = 0.80
VAL_RATIO = 0.10
TEST_RATIO = 0.10
RANDOM_STATE = 42

print("=" * 60)
print("PLANTGUARD AI - DATASET SPLITTING")
print("=" * 60)

# Check source dataset
if not SOURCE_DIR.exists():
    print(f"ERROR: Dataset not found at {SOURCE_DIR}")
    raise SystemExit(1)

# Get class folders
class_dirs = sorted([p for p in SOURCE_DIR.iterdir() if p.is_dir()])

print(f"Classes found: {len(class_dirs)}")
print()

# Create output folders
for split in ["train", "val", "test"]:
    (OUTPUT_DIR / split).mkdir(parents=True, exist_ok=True)

total_train = 0
total_val = 0
total_test = 0

# Process each class
for class_dir in class_dirs:
    class_name = class_dir.name

    images = sorted([
        p for p in class_dir.iterdir()
        if p.is_file() and p.suffix.lower() in [".jpg", ".jpeg", ".png"]
    ])

    # First split: 80% train, 20% temporary
    train_files, temp_files = train_test_split(
        images,
        test_size=(VAL_RATIO + TEST_RATIO),
        random_state=RANDOM_STATE
    )

    # Second split: temporary → 50% validation, 50% test
    val_files, test_files = train_test_split(
        temp_files,
        test_size=0.5,
        random_state=RANDOM_STATE
    )

    # Create class folders
    train_dir = OUTPUT_DIR / "train" / class_name
    val_dir = OUTPUT_DIR / "val" / class_name
    test_dir = OUTPUT_DIR / "test" / class_name

    train_dir.mkdir(parents=True, exist_ok=True)
    val_dir.mkdir(parents=True, exist_ok=True)
    test_dir.mkdir(parents=True, exist_ok=True)

    # Copy images
    for file in train_files:
        shutil.copy2(file, train_dir / file.name)

    for file in val_files:
        shutil.copy2(file, val_dir / file.name)

    for file in test_files:
        shutil.copy2(file, test_dir / file.name)

    total_train += len(train_files)
    total_val += len(val_files)
    total_test += len(test_files)

    print(
        f"{class_name}: "
        f"Train={len(train_files)}, "
        f"Val={len(val_files)}, "
        f"Test={len(test_files)}"
    )

print()
print("=" * 60)
print("DATASET SPLIT COMPLETE")
print("=" * 60)
print(f"Training images   : {total_train}")
print(f"Validation images : {total_val}")
print(f"Testing images    : {total_test}")
print(f"Total images      : {total_train + total_val + total_test}")
print("=" * 60)