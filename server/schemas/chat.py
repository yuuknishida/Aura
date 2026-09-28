from typing import List, Optional, Dict
from datetime import datetime
from pydantic import BaseModel
from enum import Enum

class MessageRole(str, Enum):
    user = "user"
    assistant = "assistant"

class ChatMessage(BaseModel):
    id: int
    content: str
    role: MessageRole
    timestamp: datetime

    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: ChatMessage
