"""Backend API tests for C.S. Singhi & Associates portfolio site."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback to frontend .env value used at deploy time
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/ root ----------
class TestRoot:
    def test_root_status_ok(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data and isinstance(data["message"], str)


# ---------- /api/contact ----------
class TestContact:
    def test_contact_create_and_list(self, client):
        payload = {
            "name": "TEST_QA Tester",
            "email": "qa+test@cssinghi.dev",
            "subject": "Test enquiry",
            "message": "Hello, this is a test.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        created_id = data["id"]

        # Verify list contains it
        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        ids = [i["id"] for i in items]
        assert created_id in ids

    def test_contact_invalid_email_returns_422(self, client):
        payload = {
            "name": "Bad Email",
            "email": "not-an-email",
            "subject": "x",
            "message": "y",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_missing_required_returns_422(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.co"})
        assert r.status_code == 422


# ---------- /api/careers/apply ----------
class TestCareers:
    def test_career_apply_and_list(self, client):
        payload = {
            "name": "TEST_Applicant",
            "email": "applicant+test@cssinghi.dev",
            "role": "Junior Architect",
            "message": "Please consider my application.",
        }
        r = client.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["role"] == payload["role"]
        created_id = data["id"]

        r2 = client.get(f"{API}/careers/apply")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        ids = [i["id"] for i in items]
        assert created_id in ids

    def test_career_invalid_email_returns_422(self, client):
        r = client.post(
            f"{API}/careers/apply",
            json={"name": "x", "email": "bad", "role": "Architect"},
        )
        assert r.status_code == 422

    def test_career_missing_role_returns_422(self, client):
        r = client.post(
            f"{API}/careers/apply",
            json={"name": "x", "email": "a@b.co"},
        )
        assert r.status_code == 422
