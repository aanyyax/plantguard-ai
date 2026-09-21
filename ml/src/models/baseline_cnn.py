import torch
import torch.nn as nn


class BaselineCNN(nn.Module):

    def __init__(self, num_classes=15):
        super(BaselineCNN, self).__init__()

        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


if __name__ == "__main__":

    model = BaselineCNN(num_classes=15)

    sample_input = torch.randn(1, 3, 224, 224)

    output = model(sample_input)

    print("=" * 60)
    print("PLANTGUARD AI - BASELINE CNN")
    print("=" * 60)
    print(f"Input shape  : {sample_input.shape}")
    print(f"Output shape : {output.shape}")
    print(f"Parameters   : {sum(p.numel() for p in model.parameters()):,}")
    print("=" * 60)