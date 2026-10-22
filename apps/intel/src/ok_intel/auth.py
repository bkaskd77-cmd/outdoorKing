from __future__ import annotations

import hashlib
import hmac
import os
import time

SKEW_SECONDS = 5 * 60


def verify_signature(timestamp: str, body: bytes, signature: str, secret: str) -> bool:
    if not secret or not timestamp or not signature:
        return False
    try:
        ts = int(timestamp)
    except ValueError:
        return False
    ts_seconds = ts if len(timestamp) <= 10 else ts / 1000
    if abs(time.time() - ts_seconds) > SKEW_SECONDS:
        return False
    expected = hmac.new(
        secret.encode("utf-8"),
        f"{timestamp}.".encode() + body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def configured_secret() -> str:
    return os.environ.get("INTEL_HMAC_SECRET", "")
