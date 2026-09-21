"""
PlantGuard AI - Environment Verification Script (Phase 1)
Validates core toolchain dependencies, hardware acceleration, and directory structure.
"""

import sys
import os
from pathlib import Path

REQUIRED_PATHS = [
    "ml/configs",
    "ml/notebooks",
    "ml/src/data",
    "ml/src/models",
    "ml/src/utils",
    "ml/models",
    "ml/outputs",
    "backend/app",
    "frontend/src",
    "data/raw",
    "data/processed",
    "data/external_test",
    "docs",
    "tests",
]

def verify_directories():
    print("[*] Validating directory layout...")
    root = Path.cwd()
    missing = []

    for rel_path in REQUIRED_PATHS:
        target = root / rel_path
        if not target.exists():
            missing.append(rel_path)
            print(f"  [-] MISSING: {rel_path}")
        else:
            print(f"  [+] FOUND: {rel_path}")

    if missing:
        print(f"\n[!] Failed: {len(missing)} directories missing.")
        return False

    print("[+] Directory structure verified.\n")
    return True


def verify_python_packages():
    print("[*] Validating Python environment and imported packages...")

    packages = [
        ("numpy", "NumPy"),
        ("pandas", "Pandas"),
        ("PIL", "Pillow"),
        ("cv2", "OpenCV"),
        ("sklearn", "Scikit-Learn"),
        ("matplotlib", "Matplotlib"),
        ("torch", "PyTorch"),
        ("torchvision", "Torchvision"),
        ("torchinfo", "TorchInfo"),
        ("imagehash", "ImageHash"),
    ]

    failed = False

    for pkg_name, label in packages:
        try:
            mod = __import__(pkg_name)
            ver = getattr(mod, "__version__", "Version unavailable")
            print(f"  [+] {label:<15} : {ver}")
        except ImportError as e:
            print(f"  [-] FAILED: {label} ({e})")
            failed = True

    if failed:
        print("\n[!] Failed: Missing dependencies. Check your virtual environment.")
        return False

    print("[+] Core Python packages imported successfully.\n")
    return True


def verify_compute_device():
    print("[*] Checking compute acceleration devices...")
    import torch

    cuda_available = torch.cuda.is_available()
    mps_available = (
        hasattr(torch.backends, "mps")
        and torch.backends.mps.is_available()
    )

    if cuda_available:
        device_name = torch.cuda.get_device_name(0)
        device_count = torch.cuda.device_count()

        print("  [+] CUDA Hardware Acceleration DETECTED:")
        print(f"      - Device Name  : {device_name}")
        print(f"      - Device Count : {device_count}")
        print(f"      - CUDA Version : {torch.version.cuda}")

    elif mps_available:
        print("  [+] Apple Metal Performance Shaders (MPS) DETECTED.")

    else:
        print("  [!] CUDA/MPS acceleration NOT detected. Defaulting to CPU.")
        print("      Note: CPU training works, but training will be significantly slower.")

    x = torch.rand(5, 3)
    print(
        f"  [+] Tensor allocation test passed: "
        f"Shape={x.shape}, Device={x.device}\n"
    )

    return True


def main():
    print("=" * 60)
    print("      PLANTGUARD AI: PHASE 1 SYSTEM VERIFICATION")
    print("=" * 60)

    print(f"Working Directory : {os.getcwd()}")
    print(f"Python Binary     : {sys.executable}")
    print(f"Python Version    : {sys.version.split()[0]}\n")

    d_ok = verify_directories()
    p_ok = verify_python_packages()
    c_ok = verify_compute_device()

    if d_ok and p_ok and c_ok:
        print("=" * 60)
        print("[SUCCESS] Phase 1 setup complete and verified.")
        print("=" * 60)
        sys.exit(0)

    else:
        print("=" * 60)
        print("[FAILURE] Resolve the missing components above.")
        print("=" * 60)
        sys.exit(1)


if __name__ == "__main__":
    main()python tests\