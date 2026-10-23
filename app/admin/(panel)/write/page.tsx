import { AdminWrite } from "@/components/admin/AdminWrite";
import { STAFF, topics, refresh } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function WritePage() {
  refresh();
  return <AdminWrite categories={topics.map((t) => t.name)} author={STAFF} />;
}
