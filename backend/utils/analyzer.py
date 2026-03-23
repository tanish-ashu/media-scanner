import requests
from io import BytesIO
from PIL import Image, ExifTags

def analyze_image_heuristics(image_url: str):
    try:
        # 1. Download the image into memory
        response = requests.get(image_url, timeout=5)
        response.raise_for_status()
        
        # 2. Open the image using Pillow
        img = Image.open(BytesIO(response.content))
        
        # 3. Extract hidden EXIF Metadata
        exif_data = img.getexif()
        
        if not exif_data:
            # Many social media sites and AI generators strip metadata entirely
            return {
                "label": "suspicious",
                "confidence": 0.70,
                "reason": "No EXIF metadata found. Image may be AI-generated, screenshot, or heavily compressed."
            }

        # 4. Search for known editing software in the metadata
        for tag_id, value in exif_data.items():
            tag_name = ExifTags.TAGS.get(tag_id, tag_id)
            if tag_name == "Software":
                software_used = str(value).lower()
                suspicious_software = ["photoshop", "gimp", "lightroom", "canva", "midjourney", "dall-e"]
                
                if any(sw in software_used for sw in suspicious_software):
                    return {
                        "label": "edited",
                        "confidence": 0.95,
                        "reason": f"EXIF data indicates editing/generation software was used: {value}"
                    }

        # 5. If it has metadata and no editing software is found
        return {
            "label": "authentic",
            "confidence": 0.85,
            "reason": "Standard camera metadata found with no obvious editing software tags."
        }

    except Exception as e:
        # If the image can't be downloaded (e.g., blocked by the news site)
        return {
            "label": "suspicious",
            "confidence": 0.50,
            "reason": f"Could not analyze file: {str(e)}"
        }