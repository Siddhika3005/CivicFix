from datetime import datetime, timedelta, timezone
import os
import secrets

import jwt
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="CivicFix API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ADMIN_EMAIL = "admin@civicfix.com"
ADMIN_PASSWORD = "admin@123"
JWT_SECRET = os.getenv("CIVICFIX_JWT_SECRET", "civicfix-development-secret")


class LoginRequest(BaseModel):
    email: str
    password: str
    remember_session: bool = False


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/auth/login")
def login(credentials: LoginRequest) -> LoginResponse:
    if credentials.email.strip().lower() != ADMIN_EMAIL or not secrets.compare_digest(credentials.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Invalid CivicFix credentials")

    expires_in = 60 * 60 * 24 if credentials.remember_session else 60 * 60
    token = jwt.encode(
        {
            "sub": ADMIN_EMAIL,
            "role": "admin",
            "iat": datetime.now(timezone.utc),
            "exp": datetime.now(timezone.utc) + timedelta(seconds=expires_in),
        },
        JWT_SECRET,
        algorithm="HS256",
    )
    return LoginResponse(access_token=token, expires_in=expires_in)
