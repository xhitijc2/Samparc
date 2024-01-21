from fastapi import FastAPI, HTTPException, Depends, Form , UploadFile, File, Path, Query
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from datetime import UTC, datetime
from typing import Optional, List, Union, Any
from models import User
from enum import Enum
# from otpUtil import otpUtil
import uuid
# from main import UPLOAD_DIR, db_dependency
from base64 import b64decode



app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

def decode_user_id(encoded_user_id):
    return int(b64decode(encoded_user_id).decode('utf-8'))

class UserBase(BaseModel):
    type_of: str
    patientFname: str
    patientLname: str
    campaigner: str
    mobile: str
    email: str
    hospital: str
    amount: float
    aadharnumber: str
    story: str
    disease: str
    date: datetime

class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Depends(get_db)

models.Base.metadata.create_all(bind=engine)
UPLOAD_DIR = "uploaded_images"

# Create the directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/users/", response_model=UserModel)
async def create_user(
    type_of: str = Form(default=""),
    patientFname: str = Form(default=""),
    patientLname: str = Form(default=""),
    campaigner: str = Form(default=""),
    mobile: str = Form(default=""),
    email: str = Form(default=""),
    hospital: str = Form(default=""),
    amount: float = Form(default=00),
    aadharnumber: str = Form(default=""),
    story: str = Form(default=""),
    disease: str = Form(default=""),
    db: Session = db_dependency,
    file: UploadFile = File(default=None)
):
    try:
        # Handle user data
        user_data = {
            "type_of": type_of,
            "patientFname": patientFname,
            "patientLname": patientLname,
            "campaigner": campaigner,
            "mobile": mobile,
            "email": email,
            "hospital": hospital,
            "amount": amount,
            "aadharnumber": aadharnumber,
            "story": story,
            "disease": disease,
            "date": datetime.now(),
        }

        db_user = models.User(**user_data)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        # Generate a filename based on user-related information and timestamp
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        new_filename = f"{campaigner}_{timestamp}_{file.filename}" if file else None

        # Save the uploaded file to a directory specific to the user
        if file:
            user_upload_dir = os.path.join(UPLOAD_DIR, str(db_user.id))
            os.makedirs(user_upload_dir, exist_ok=True)
            file_path = os.path.join(user_upload_dir, new_filename)

            with open(file_path, "wb") as f:
                shutil.copyfileobj(file.file, f)
        
        return db_user
    
    except Exception as e:
        error_message = f"Error adding data to the database: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)

@app.get("/users/{encoded_user_id}", response_model=UserModel)
async def get_user(encoded_user_id: str = Path(..., title="The ID of the user to retrieve"), db: Session = db_dependency):
    user_id = decode_user_id(encoded_user_id)
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user




@app.get("/users/{encoded_user_id}/images", response_model=Any)
async def get_user_images(encoded_user_id: str, db: Session = db_dependency):
    user_id = decode_user_id(encoded_user_id)
    user_upload_dir = os.path.join(UPLOAD_DIR, str(user_id))

    if not os.path.exists(user_upload_dir):
        raise HTTPException(status_code=404, detail="User not found")

    # List all files in the user's directory (image filenames)
    image_files = [os.path.join(user_upload_dir, f) for f in os.listdir(user_upload_dir) if os.path.isfile(os.path.join(user_upload_dir, f))]


    # Return a single StreamingResponse for the first image file (you can modify this logic)
    if not image_files:
        raise HTTPException(status_code=404, detail="No images found for the user")

    file_path = image_files[0]
    
    return StreamingResponse(open(file_path, "rb"), media_type="image/jpeg")

@app.get("/users/by-phone/{mobile}", response_model=int)
async def get_user_id_by_phone(
    mobile: str,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.mobile == mobile).first()
    if user is None:
        raise HTTPException(status_code=404, detail=f"User with mobile number {mobile} not found")

    return user.id




@app.get("/users/date_range/")
async def get_users_in_date_range(
    start_datetime_str: str = Query(..., description="Start datetime string from frontend"),
    end_datetime_str: str = Query(..., description="End datetime string from frontend"),
    db: Session = Depends(get_db)
):
    try:
        # Convert input strings to datetime objects
        start_datetime = datetime.fromisoformat(start_datetime_str)
        end_datetime = datetime.fromisoformat(end_datetime_str)
        print(f"Received start_datetime_str: {start_datetime_str}")
        print(f"Received end_datetime_str: {end_datetime_str}")
        # Query the database for users within the specified date range
        users_in_date_range = db.query(models.User).filter(models.User.date.between(start_datetime, end_datetime)).all()

        return users_in_date_range

    except Exception as e:
        error_message = f"Error fetching users in date range: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)
        print(f"Error fetching users in date range: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
