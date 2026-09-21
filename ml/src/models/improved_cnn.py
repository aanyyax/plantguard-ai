import torch
import torch.nn as nn


class ImprovedCNN(nn.Module):

    def __init__(self, num_classes=15):
        super(ImprovedCNN, self).__init__()

        self.features = nn.Sequential(

            # Block 1
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # Block 2
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # Block 3
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # Block 4
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),

            # Global Average Pooling
            nn.AdaptiveAvgPool2d((1, 1))
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


if __name__ == "__main__":

    model = ImprovedCNN(num_classes=15)

    sample_input = torch.randn(1, 3, 224, 224)

    output = model(sample_input)

    print("=" * 60)
    print("PLANTGUARD AI - IMPROVED CNN")
    print("=" * 60)
    print(f"Input shape  : {sample_input.shape}")
    print(f"Output shape : {output.shape}")
    print(
        f"Parameters   : "
        f"{sum(p.numel() for p in model.parameters()):,}"
    )
    print("=" * 60)