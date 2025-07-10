from pydantic import BaseModel

class ProfileData(BaseModel):
    name: str
    description: str
    gemini_key: str | None = None  # optional for updates

class ProfileResponse(BaseModel):
    name: str
    description: str
    has_gemini_key: bool
