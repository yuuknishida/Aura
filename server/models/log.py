from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.database import Base

class Log(Base):
    __tablename__ = "logs"
    
    id = Column(Integer, primary_key=True)
    level = Column(Text)
    message = Column(Text)
    source = Column(Text)