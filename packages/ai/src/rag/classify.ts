import { isAltitudeEmergency, isInjectionAttempt } from "../guards";
import type { ConciergeIntent } from "./types";

export function isHumanHandoff(message: string): boolean {
  const text = message.toLowerCase();
  return (
    /\bcustomers?\b/.test(text) ||
    /\bcustomer service\b/.test(text) ||
    /\bchat with a (specialist|human|person|agent)\b/.test(text) ||
    /\bspecialists?\b/.test(text) ||
    /\bhumans?\b/.test(text) ||
    /\b(real|actual|live) person\b/.test(text) ||
    /\bsomeone from the team\b/.test(text) ||
    /\bsomeone on the team\b/.test(text) ||
    /\bchat with (a |the )?(customer|person|human|specialist|agent|team)\b/.test(text) ||
    /\b(speak|talk) to (a |the )?(real )?person\b/.test(text) ||
    /\btalk to someone\b/.test(text) ||
    /\b(call me|handoff|hand\s*off|whatsapp|whats\s*app)\b/.test(text) ||
    /\b(agents?|staff|representative)\b/.test(text) ||
    /\bconnect me\b/.test(text)
  );
}

export function classifyIntent(message: string): ConciergeIntent {
  if (isInjectionAttempt(message)) return "injection_attempt";
  if (isAltitudeEmergency(message)) return "emergency";
  if (isHumanHandoff(message)) return "human";
  const text = message.toLowerCase();
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
