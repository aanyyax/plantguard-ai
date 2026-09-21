from pathlib import Path
from PIL import Image

root = Path("data/raw/PlantVillage")

image_files = [
    p for p in root.rglob("*")
    if p.is_file() and p.suffix.lower() in [".jpg", ".jpeg", ".png"]
]

bad_images = []

print("=" * 60)
print("PLANTGUARD AI - IMAGE INTEGRITY CHECK")
print("=" * 60)
print(f"Total images found: {len(image_files)}")
print("Checking images...")

for image_path in image_files:
    try:
        with Image.open(image_path) as img:
            img.verify()
    except Exception:
        bad_images.append(image_path)

print()
print(f"Valid images   : {len(image_files) - len(bad_images)}")
print(f"Corrupt images : {len(bad_images)}")

if bad_images:
    print("\nCorrupt image files:")
    for image_path in bad_images:
        print(image_path)
else:
    print("\nAll images passed the integrity check.")

print("=" * 60)