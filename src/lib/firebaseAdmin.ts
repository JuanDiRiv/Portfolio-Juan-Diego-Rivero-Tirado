import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getFirebaseAdminApp() {
  if (getApps().length) return getApps()[0]!;

  const projectId = getRequiredEnv("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = getRequiredEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKeyRaw = getRequiredEnv("FIREBASE_ADMIN_PRIVATE_KEY");
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  const app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  // Apply Firestore settings ONCE, before any read/write happens.
  // `ignoreUndefinedProperties` lets us write objects with optional `undefined`
  // fields (e.g. optional URLs from AI extraction) without throwing.
  try {
    getFirestore(app).settings({ ignoreUndefinedProperties: true });
  } catch {
    // settings already applied (HMR / hot reload). Safe to ignore.
  }

  return app;
}

export function getAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getAllowedAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS || "";
  const items = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return new Set(items);
}
