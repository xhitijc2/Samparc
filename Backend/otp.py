# Import your Firebase functions
from firebase import sendOTP, verifyOTP
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

# ... (other import statements and FastAPI setup)

@app.post("/generate-otp", response_model=JSONResponse)
async def generate_otp_endpoint(request: PhoneNumberVerificationRequest):
    try:
        # Call the Firebase function to send OTP
        verification_id = sendOTP(request.phone_number)

        return JSONResponse(content={"message": "OTP sent successfully", "verification_id": verification_id})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class OTPVerificationRequest(BaseModel):
    verification_id: str
    otp: str

@app.post("/verify-otp", response_model=JSONResponse)
async def verify_otp_endpoint(request: OTPVerificationRequest):
    try:
        # Call the Firebase function to verify OTP
        is_verified = verifyOTP(request.verification_id, request.otp)

        if is_verified:
            return JSONResponse(content={"message": "OTP verified successfully"})
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
