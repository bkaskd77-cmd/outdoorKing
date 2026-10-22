import hashlib
import hmac
import time

from ok_intel.auth import verify_signature


def test_hmac_accepts_fresh_signature() -> None:
    secret = "intel-hmac-secret-must-be-32-chars!!"
    body = b'{"durationDays":14,"partySize":2}'
    timestamp = str(int(time.time()))
    signature = hmac.new(
        secret.encode(), f"{timestamp}.".encode() + body, hashlib.sha256
    ).hexdigest()
    assert verify_signature(timestamp, body, signature, secret) is True


def test_hmac_rejects_bad_signature() -> None:
    assert (
        verify_signature("1", b"{}", "00", "intel-hmac-secret-must-be-32-chars!!")
        is False
    )
