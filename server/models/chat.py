from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from db.database import Base



class Chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(Text, unique=False, nullable=False)
    content = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
