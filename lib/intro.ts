export const INTRO_SEEN_KEY = "fox-intro-seen";
export const SHOW_INTRO_EVENT = "fox:show-intro";

export function requestIntro() {
  try {
    sessionStorage.removeItem(INTRO_SEEN_KEY);
  } catch {
    // Without storage the intro plays on every visit anyway.
  }
  // Already on the home page there is no navigation to remount it, so it listens for this.
  window.dispatchEvent(new Event(SHOW_INTRO_EVENT));
}
