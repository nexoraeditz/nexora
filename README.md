# NEXORA — Deployment Guide

Is folder mein 2 real, working web pages hain jo aapke Firebase project
(`nexora-promps`) se connected hain:

- `index.html` → **NEXORA FORM** (publish karne ki website)
- `app.html` → **NEXORA PROMPTS** (gallery app, installable)

Dono live data **Firestore** mein save/read karte hain — prompt, category,
aur image (chhoti compressed image seedha Firestore document ke andar,
base64 format mein). Firebase **Storage** bilkul use nahi hoti — isliye
koi billing/card add karne ki zaroorat nahi.

---

## Step 1 — Firestore rules set karein

Abhi "test mode" mein hain — jo **30 din baad expire ho jata hai**. Permanent
rules lagane ke liye:

Firebase Console → Firestore Database → **Rules** tab → ye paste karein:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /prompts/{promptId} {
      allow read: if true;
      allow create: if request.resource.data.prompt is string
                    && request.resource.data.prompt.size() < 2000
                    && request.resource.data.category is string
                    && request.resource.data.image is string
                    && request.resource.data.image.size() < 900000;
      allow update, delete: if false;
    }
  }
}
```

"**Publish**" dabana na bhoolein.

(Ye rules sabko publish karne dete hain lekin delete/edit kisi ko nahi —
agar aap chahte hain sirf aap publish kar sakein, bata dein, main
login-based rules bhi bana dunga.)

---

## Step 2 — Website deploy karein (GitHub Pages, free)

1. `github.com` par jayein → account banayein (free) ya login karein
2. Upar right **"+"** icon → **"New repository"**
3. Naam dein: `nexora` → **Public** rakhein → **"Create repository"**
4. Repo khulne ke baad "**uploading an existing file**" wala link tap karein
   (ya "Add file" → "Upload files")
5. **"choose your files"** par tap karein — is se aapki gallery/files khulegi
6. Is folder ki **saari files ek saath select** karein (index.html, app.html,
   firebase-config.js, manifest.json, sw.js, icon-192.png, icon-512.png,
   apple-touch-icon.png) — **README.md chhod dein**, zaroori nahi
7. Neeche **"Commit changes"** dabayein

**Ab website ON karein:**
8. Repo ke andar **"Settings"** tab par jayein
9. Left menu mein **"Pages"** dhoondein
10. "Branch" ke neeche **"main"** aur folder **"/ (root)"** select karein → **Save**
11. 1-2 minute intezar karein, phir yehi settings page refresh karein — upar
    ek green box mein link milega, jaisa:
    `https://username.github.io/nexora/`

- Form: `https://username.github.io/nexora/index.html`
- App: `https://username.github.io/nexora/app.html`

**Update karna ho** (naya code aaye) to bas dobara "Add file" → "Upload
files" se wahi filenames upload kar dein — GitHub khud purani file replace
kar dega.

---

## Step 3 — Android APK banayein (PWABuilder, free)

1. Step 2 ka live link mil jaye, us mein se **app.html** ka URL le lein
   (jaise `https://nexora.pages.dev/app.html`)
2. Browser mein jayein: `www.pwabuilder.com`
3. Wahi URL paste karein → **Start**
4. Ye aapki `manifest.json` aur icon khud detect kar lega
5. **"Package for stores"** → **Android** choose karein
6. Options default rakh sakte hain → **Generate**
7. Ek `.zip` file download hogi, jisme se `NEXORA.apk` nikaal kar
   **yehi file** aap apni audience ko share kar sakte hain

Note: Android par pehli baar install karte waqt phone "Unknown apps"
warning dega (kyunki Play Store se nahi hai) — user ko "Install anyway"
dabana hoga.

**`signing.keystore` file safe rakhein** — agar kabhi app update karni ho
to yehi dobara chahiye hogi.

---

## Files in this folder

```
nexora-deploy/
├── index.html          → NEXORA FORM (website)
├── app.html             → NEXORA PROMPTS (installable app)
├── firebase-config.js   → shared Firebase connection (aapki keys already andar hain)
├── manifest.json         → app ka naam/icon/install settings
├── sw.js                 → offline support ke liye
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

Kuch bhi customize karna ho (rang, naam, categories) to bata dein.
