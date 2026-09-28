from sqlalchemy import Column, Integer, String, Float, Text, Double
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.database import Base

class Process(Base):
    __tablename__ = "processes"

    id = Column(Integer, primary_key=True, index=True)
    pid = Column(Integer)
    name = Column(Text)
    status = Column(Text)
    cpu_percent = Column(Float)
    memory_mb = Column(Double)
