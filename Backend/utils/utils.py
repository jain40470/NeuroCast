from jose import jwt, JWTError
from fastapi import HTTPException
from cryptography.fernet import Fernet
import os

JWT_SECRET = os.getenv("JWT_SECRET")
FERNET_KEY = os.getenv("FERNET_KEY")
fernet = Fernet(FERNET_KEY)

def create_jwt(email: str) -> str:
    return jwt.encode({"email": email}, JWT_SECRET, algorithm="HS256")

def verify_jwt(token: str) -> str:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload["email"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def encrypt_key(key: str) -> str:
    return fernet.encrypt(key.encode()).decode()

def decrypt_key(encrypted_key: str) -> str:
    return fernet.decrypt(encrypted_key.encode()).decode()
