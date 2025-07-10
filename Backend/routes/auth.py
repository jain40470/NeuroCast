from fastapi import APIRouter, Request, HTTPException
from db import users_collection
from utils.utils import create_jwt
import os
import requests
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@router.post("/auth/google")
async def google_login(request: Request):
    
    data = await request.json()
    token = data.get("credential")
    if not token:
        raise HTTPException(status_code=400, detail="No token provided")

    resp = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
    if resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    user_info = resp.json()
    if user_info.get("aud") != GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="Client ID mismatch")

    email = user_info.get("email")
    name = user_info.get("name", "")

    # Upsert user
    users_collection.update_one(
        {"email": email},
        {"$setOnInsert": {"email": email, "name": name}},
        upsert=True,
    )

    jwt_token = create_jwt(email)
    return {"token": jwt_token, "email": email, "name": name}
