from pydantic import BaseModel

class ProfileData(BaseModel):
    name: str
    description: str
    gemini_key: str
