import hashlib
import hmac
import os
import time

from fastapi.testclient import TestClient

from ok_intel.main import app

client = TestClient(app)


def _signed_headers(body: bytes) -> dict[str, str]:
    secret = os.environ["INTEL_HMAC_SECRET"]
    timestamp = str(int(time.time()))
    signature = hmac.new(
        secret.encode("utf-8"),
        f"{timestamp}.".encode() + body,
        hashlib.sha256,
    ).hexdigest()
    return {
        "content-type": "application/json",
        "x-ok-timestamp": timestamp,
        "x-ok-signature": signature,
    }


def test_health_is_public() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_pricing_rejects_missing_hmac() -> None:
    response = client.post(
        "/v1/pricing/suggest",
        json={"durationDays": 14, "partySize": 2},
    )
    assert response.status_code == 401


def test_pricing_accepts_signed_request() -> None:
    body = b'{"durationDays":14,"partySize":2}'
    response = client.post(
        "/v1/pricing/suggest",
        content=body,
        headers=_signed_headers(body),
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["staffOnly"] is True
    assert "public price" in payload["landPackageHint"].lower()


def test_plan_rejects_missing_hmac() -> None:
    response = client.post(
        "/v1/itinerary/plan",
        json={
            "days": [
                {
                    "dayNumber": 1,
                    "title": "Arrive Kathmandu",
                    "fromPlace": "Kathmandu",
                    "toPlace": "Kathmandu",
                    "startAltitudeM": 1400,
                    "highPointM": 1400,
                    "sleepAltitudeM": 1400,
                    "dayType": "city",
                }
            ],
            "pace": "steady",
            "usesLukla": False,
            "seasons": ["spring"],
        },
    )
    assert response.status_code == 401


def test_plan_accepts_signed_request_and_omits_prices() -> None:
    body = (
        b'{"days":[{"dayNumber":1,"title":"Arrive Kathmandu","fromPlace":"Kathmandu",'
        b'"toPlace":"Kathmandu","startAltitudeM":1400,"highPointM":1400,'
        b'"sleepAltitudeM":1400,"dayType":"city"}],"month":4,"pace":"steady",'
        b'"usesLukla":false,"seasons":["spring"]}'
    )
    response = client.post(
        "/v1/itinerary/plan",
        content=body,
        headers=_signed_headers(body),
    )
    assert response.status_code == 200
    payload = response.json()
    assert "days" in payload
    assert "reasons" in payload
    assert "seasonFit" in payload
    blob = str(payload).lower()
    for token in ("price", "deposit", "currency", "usd", "amount"):
        assert token not in blob


def test_analytics_summary_accepts_signed_request() -> None:
    body = b'{"requests":4,"quotesSent":2,"quotesAccepted":1,"bookings":1}'
    response = client.post(
        "/v1/analytics/summary",
        content=body,
        headers=_signed_headers(body),
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["staffOnly"] is True
    assert payload["mocked"] is True
