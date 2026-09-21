from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.predict import router as predict_router

app = FastAPI(
    title="PlantGuard AI API",
    description="Plant disease detection API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Prediction route
app.include_router(predict_router)


@app.get("/")
def home():
    return {
        "message": "PlantGuard AI API is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }