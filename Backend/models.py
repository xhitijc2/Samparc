# this is models.py
from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, LargeBinary, ForeignKey, Sequence, DateTime, Table , MetaData
from fastapi import File
from sqlalchemy.orm import relationship
from datetime import datetime

metadata = MetaData()
class User(Base):
    __tablename__= 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type_of=Column(String)
    patientFname =Column(String)
    patientLname =Column(String)
    campaigner =Column(String)
    mobile = Column(String, unique=True)
    email= Column(String)
    hospital =Column(String)
    amount = Column(Float)
    aadharnumber = Column(String)
    story = Column(String)
    disease=Column(String)
    date = Column(DateTime, default=datetime.now)
    
    