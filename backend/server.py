from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="C.S. Singhi & Associates API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=300)
    message: str = Field(min_length=1, max_length=4000)


class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class JobApplicationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    role: str = Field(min_length=1, max_length=200)
    message: Optional[str] = Field(default=None, max_length=4000)


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "C.S. Singhi & Associates API", "status": "ok"}


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(payload: ContactCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(doc)
    logger.info(f"Contact submission saved: {submission.id} from {submission.email}")
    return submission


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contact_submissions():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


@api_router.post("/careers/apply", response_model=JobApplication)
async def submit_application(payload: JobApplicationCreate):
    application = JobApplication(**payload.model_dump())
    doc = application.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.job_applications.insert_one(doc)
    logger.info(f"Job application saved: {application.id} for {application.role}")
    return application


@api_router.get("/careers/apply", response_model=List[JobApplication])
async def list_applications():
    items = await db.job_applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
