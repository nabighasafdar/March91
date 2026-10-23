export const DRAFT_KEY = "m91-drafts";

export type Block = { id: string; kind: "p" | "h" | "q" | "img"; text: string; src?: string };
export type Draft = {
  id: string; title: string; excerpt: string; category: string; author: string; tags: string;
  blocks: Block[]; status: "Draft" | "Published"; updated: string;
};

export function saveDraft(d: Draft) {
  try {
    const all: Draft[] = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "[]");
    const i = all.findIndex((x) => x.id === d.id);
    if (i >= 0) all[i] = d; else all.unshift(d);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(all));
    return true;
  } catch { return false; }
}
