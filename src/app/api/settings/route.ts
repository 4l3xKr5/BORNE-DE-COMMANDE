import { settings } from "@/data/settings";
import { ok } from "@/server/api-response";

export function GET() {
  return ok(settings);
}
