import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.chat import Chat
from schemas.chat import ChatMessage, ChatRequest, ChatResponse, MessageRole

chat_router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

def generate_ai_response(user_message: str) -> str:
    # TODO wire this into AI agent
    return f"Echo: {user_message}"

@chat_router.post("/create", response_model=ChatResponse)
def send_response(request: ChatRequest, db: Session = Depends(get_db)):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        ai_text = generate_ai_response(request.message)
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to generate AI response")
    
    user_msg = Chat(
        role=MessageRole.user.value, 
        content=request.message
    )
    assistant_msg = Chat(
        role=MessageRole.assistant.value,
        content=ai_text
    )   
    
    db.add_all([user_msg, assistant_msg])
    db.commit()
    db.refresh(assistant_msg)

    return ChatResponse(
        message=ChatMessage.model_validate(assistant_msg)
    )

@chat_router.get("/{conversation_id}", response_model=List[ChatMessage])
def get_history(db: Session = Depends(get_db)):
    messages = (
        db.query(Chat).order_by(Chat.timestamp).all()
    )
    if not messages:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return messages 
