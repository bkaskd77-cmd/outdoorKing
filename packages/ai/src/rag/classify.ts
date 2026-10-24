import { isAltitudeEmergency, isInjectionAttempt } from "../guards";
import type { ConciergeIntent } from "./types";

export function classifyIntent(message: string): ConciergeIntent {
  const text = message.toLowerCase();
  if (isInjectionAttempt(message)) return "injection_attempt";
  if (isAltitudeEmergency(message)) return "emergency";
  if (
    /\b(human|specialist|agent|real person|whatsapp|whats\s*app|call me|handoff|hand\s*off|speak to (a |someone|a person)|talk to (a )?(real )?person|talk to someone)\b/.test(
      text,
    )
  ) {
    return "human";
  }
  if (
    /\b(my booking|my deposit|my quote|payment status|wire reference|portal)\b/.test(text)
  ) {
    return "booking_status";
  }
  if (/\b(tims|permits?|rap|acap|visa|trek-card|restricted area)\b/.test(text)) {
    return "permit";
  }
  if (/\b(weather|forecast|temperature|snow|rainfall)\b/.test(text)) {
    return "season";
  }
  if (/\b(monsoon|season|when (should|to) go|best time|spring|autumn)\b/.test(text)) {
    return "season";
  }
  if (
    /\b(hello|hi |hey |thanks|thank you|namaste)\b/.test(text) &&
    text.split(/\s+/).length < 6
  ) {
    return "smalltalk";
  }
  if (/\b(bitcoin|stock market|recipe|python code)\b/.test(text)) {
    return "out_of_scope";
  }
  return "trip_info";
}
