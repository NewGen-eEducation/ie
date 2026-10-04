export const CRYPTO_SALT = "NEWGEN_SECRET_SALT_2026";
export const DEFAULT_MASTER_KEY = "0000";
export const DEFAULT_USER_PIN = "0000";

export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateDeviceFingerprint(): Promise<string> {
  const fp = [
    navigator.userAgent,
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  ].join("###");
  const hash = await sha256(fp);
  return `DEV-${hash.substring(0, 16).toUpperCase()}`;
}

export async function computeActivationKey(deviceKey: string): Promise<string> {
  const raw = `${deviceKey}::${CRYPTO_SALT}`;
  const hash = await sha256(raw);
  return `ACT-${hash.substring(0, 16).toUpperCase()}`;
}

// Full Lifetime License - Demo restrictions completely removed
export function isFullLicenseActivated(): boolean {
  return true;
}

export function getUserPin(): string {
  return localStorage.getItem("app_user_pin") || DEFAULT_USER_PIN;
}

export function setUserPin(pin: string): void {
  localStorage.setItem("app_user_pin", pin);
}

export function getMasterKey(): string {
  return localStorage.getItem("app_master_key") || DEFAULT_MASTER_KEY;
}

export function setMasterKey(key: string): void {
  localStorage.setItem("app_master_key", key);
}
