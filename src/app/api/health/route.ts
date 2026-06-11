import { ok } from "@/server/api-response";

export function GET() {
  return ok({
    status: "ok",
    service: "borne-pizza-de-nuit",
    timestamp: new Date().toISOString()
  });
}
