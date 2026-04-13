from fastapi import FastAPI
from pydantic import BaseModel
from utils.analyzer import analyze_image_heuristics

app = FastAPI()

class ImageRequest(BaseModel):
    image_url: str

@app.post("/analyze-image")
async def analyze_image(req: ImageRequest):
    # Call our new real logic instead of generating random data!
    analysis_result = analyze_image_heuristics(req.image_url)
    
    return {
        "url": req.image_url,
        "label": analysis_result["label"],
        "confidence": analysis_result["confidence"],
        "reason": analysis_result["reason"]
    }
    