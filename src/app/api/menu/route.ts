import { menu } from "@/data/menu";
import { ok } from "@/server/api-response";

export function GET() {
  return ok(menu);
}
