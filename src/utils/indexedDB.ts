import { CustomAttachment, RecentItem, TabType } from '../types';

const DB_NAME = "NewGenZeroDB";
const DB_VERSION = 1;
const STORE_NAME = "local_attachments";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storeLocalFileBlob(item: { id: string; name: string; blob: Blob; type: string }): Promise<boolean> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getLocalFileBlob(id: string): Promise<{ id: string; name: string; blob: Blob; type: string } | null> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteLocalFileBlob(id: string): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error("IndexedDB delete error:", err);
    return false;
  }
}

export function getAllStoredLinks(): Record<TabType, CustomAttachment[]> {
  try {
    const raw = localStorage.getItem("newgen_zero_lib_links");
    if (!raw) {
      return {
        dashboard: [],
        admissions: [],
        "exam-pre": [],
        "exam-during": [],
        "exam-post": [],
        results: [],
        converters: [],
        "sports-games": [],
        about: []
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      dashboard: [],
      admissions: [],
      "exam-pre": [],
      "exam-during": [],
      "exam-post": [],
      results: [],
      converters: [],
      "sports-games": [],
      about: []
    };
  }
}

export function saveAllStoredLinks(data: Record<TabType, CustomAttachment[]>): void {
  localStorage.setItem("newgen_zero_lib_links", JSON.stringify(data));
}

export function getRecentOpenedList(): RecentItem[] {
  try {
    const raw = localStorage.getItem("newgen_recent_opened");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function logRecentOpened(item: Omit<RecentItem, 'timestamp'>): RecentItem[] {
  try {
    const current = getRecentOpenedList().filter((x) => x.title !== item.title);
    const updated: RecentItem[] = [{ ...item, timestamp: Date.now() }, ...current].slice(0, 10);
    localStorage.setItem("newgen_recent_opened", JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
