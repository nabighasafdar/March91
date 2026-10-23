import fs from "node:fs";
import path from "node:path";
import { UPLOAD_DIR } from "@/lib/store";

export const dynamic = "force-dynamic";
const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = path.basename((await params).name);
  const type = TYPES[name.split(".").pop() ?? ""];
  const file = path.join(UPLOAD_DIR, name);
  if (!type || !fs.existsSync(file)) return new Response("Not found", { status: 404 });
  return new Response(fs.readFileSync(file), { headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" } });
}
