from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image

import io

from backend.app.services.model_service import predict_image


router = APIRouter()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Check file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload an image file."
        )

    # Read image
    contents = await file.read()

    try:
        image = Image.open(io.BytesIO(contents))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    # Get prediction
    result = predict_image(image)

    return result