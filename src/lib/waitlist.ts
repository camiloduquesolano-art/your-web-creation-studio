import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "shroomed_visitor_id";
const VISIT_TRACKED_KEY = "shroomed_visit_tracked";
const BASE_SUBSCRIBERS = 842;

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export async function trackVisit(lang: string, path: string) {
  if (typeof window === "undefined") return;
  // Only track one visit per session (per tab-open) to avoid spam
  if (window.sessionStorage.getItem(VISIT_TRACKED_KEY)) return;
  window.sessionStorage.setItem(VISIT_TRACKED_KEY, "1");
  try {
    await supabase.from("page_visits").insert({
      visitor_id: getVisitorId(),
      path,
      lang,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  } catch {
    /* ignore */
  }
}

export async function saveSignup(email: string, goal: string, lang: string) {
  const { error } = await supabase.from("waitlist_signups").insert({
    email: email.toLowerCase(),
    goal,
    lang,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    referrer: typeof document !== "undefined" ? document.referrer || null : null,
  });
  // Duplicate = 23505; treat as success (already registered)
  if (error && !error.message.toLowerCase().includes("duplicate")) {
    throw error;
  }
}

export async function getSubscriberCountFromDb(): Promise<number> {
  try {
    const { count } = await supabase
      .from("waitlist_signups")
      .select("*", { count: "exact", head: true });
    return BASE_SUBSCRIBERS + (count ?? 0);
  } catch {
    return BASE_SUBSCRIBERS;
  }
}
