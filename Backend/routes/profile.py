from fastapi import APIRouter, Header, HTTPException
from models.models import ProfileData, ProfileResponse
from utils.utils import verify_jwt, encrypt_key
from db import users_collection

router = APIRouter()

@router.get("/profile", response_model=ProfileResponse)
async def get_profile(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    email = verify_jwt(token)

    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return ProfileResponse(
        name=user.get("name", ""),
        description=user.get("description", ""),
        has_gemini_key="gemini_key" in user and user["gemini_key"] != "",
    )

@router.post("/profile")
async def save_profile(profile: ProfileData, authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    email = verify_jwt(token)

    update_data = {
        "name": profile.name,
        "description": profile.description,
    }

    if profile.gemini_key:
        update_data["gemini_key"] = encrypt_key(profile.gemini_key)

    users_collection.update_one(
        {"email": email},
        {"$set": update_data},
        upsert=True,
    )
    return {"status": "success"}
