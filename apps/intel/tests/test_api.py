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
