# Multi-Venture Daily Tracker

A responsive single-page web application designed for solo founders, engineers, and multi-venture builders. Runs **100% locally in your browser** with `localStorage` persistence, local JSON backup/restore, and zero external backend dependencies.

---

## 🎨 Visual Theme & Palette

- **Primary Background**: Warm Light Cream (`#FFFDF6`)
- **Card Surfaces & Modals**: Soft Cream (`#FAF6E8`) with subtle warm borders (`#E5DEC9`)
- **Primary Brand / Header Accent**: Royal Blue (`#1E40AF`) with soft blue highlights (`#DBEAFE`)
- **Badges & Accents**: Warm Amber / Gold (`#D97706` / `#FEF3C7`)
- **Strictly Light Theme**: High-contrast charcoal text (`#1E293B`, `#475569`), no dark or black backgrounds.

---

## 🧭 Navigation: 5 Focused Tabs

1. **Tab 1: Day's activity** (Time-Blocked Operating Blocks)
2. **Tab 2: Opportunities** (5-Pillar Matrix)
3. **Tab 3: Ventures Portfolio** (Active products & platforms)
4. **Tab 4: Analytics & Data** (Completion rates & metrics overview)
5. **Tab 5: Focus Timer** (Simple Pomodoro or focus countdown timer)

---

## 🚀 Detailed Features

### Top Header & Editable User Profile
- **Main App Title**: "Multi-Venture Daily Tracker"
- **Interactive User Profile Subtitle**: Click the name/subtitle or pencil icon to edit and save your customized name and platform tagline (defaults to `"Anand Mohandas • Solo Development Platform"`). Persists in `localStorage`.
- **Date Navigation**: Jump to Today, or step backward/forward (`◀` and `▶`) to view schedule records across days.
- **Streak Tracker**: Active daily streak counter (`🔥 7d streak`).
- **Global "Daily Rhythm Completion" Progress Bar**:
  - Live progress counter: `X / Y Tasks Completed (Z%)`
  - Animated progress bar fill
  - **"Reset Daily Checks"** button to reset today's checklist without deleting blocks or task structures.
- **Data Sovereignty**: JSON Export & Import buttons.

---

### Tab 1: Daily Operating Rhythm (Time Blocks)
Structured as a responsive 2-column card grid (`+ Add Time Block` button at the top):

1. **Block 1: Morning Foundation & Focus** (`08:00 AM – 10:00 AM` | Royal Blue)
   - *Objective*: Personal routine, language study (French, German, Spanish), and high-leverage solo engineering.
   - Tasks:
     - `30-min trilingual fluency drill (French, German, Spanish)` [Tag: Languages]
     - `Deep-focus coding sprint on Android Kotlin/Jetpack Compose & WebView architecture` [Tag: Android Dev]
2. **Block 2: Commercial Core & Client Operations** (`10:00 AM – 02:00 PM` | Warm Amber)
   - *Objective*: RECOVERYGOD.COM data recovery, IT infrastructure, and client deliverables.
   - Tasks:
     - `Handle data recovery diagnostics & storage restoration` [Tag: RECOVERYGOD]
     - `Execute computer installation, network setup & enterprise IT support calls` [Tag: IT Infra]
3. **Block 3: Afternoon Creative & Content Engine** (`03:00 PM – 05:30 PM` | Emerald)
   - *Objective*: Automated Node.js/Python pipelines, art print production, and storefront management.
   - Tasks:
     - `Review automated Node.js/Python publishing pipelines` [Tag: Automation]
     - `Art print production & online marketplace updates` [Tag: Creative Arts]
4. **Block 4: Evening Review & Infrastructure Maintenance** (`07:00 PM – 08:30 PM` | Indigo)
   - *Objective*: Cloud deployments, FirmSwitch tracking, and next-day planning.
   - Tasks:
     - `Verify cloud deployments, GitHub commits & Play Console status` [Tag: DevOps]
     - `Log completed milestones & set tomorrow's priorities` [Tag: Operations]

---

### Tab 2: 5-Pillar Opportunity Tracker
Organized across 5 pillars with top filter chips:
1. **Commercial Need** (Red badge)
2. **Existing Expertise** (Royal Blue badge)
3. **Growth Opportunity** (Emerald badge)
4. **Long-Term Opportunity** (Amber badge)
5. **Extra Opportunities** (Purple badge)

- **⚡ "Send to Day's activity" Action Button**: One-click dispatch of any opportunity's Concrete Next Action directly into the designated Daily Time Block in Tab 1, automatically switching the view to Tab 1 with visual focus and audio confirmation.
- Full CRUD (Add, Edit, Delete).

---

### Tab 3: Ventures Portfolio (Active Products & Platforms)
Pre-populated with real platforms:
1. **RECOVERYGOD.COM** (IT Services & Data Recovery | Active Core | Metric: Active Client Tickets)
2. **Artsit & Freeit** (Android Apps & Marketplaces | Published Platforms | Metric: Play Store Listings)
3. **Parlez & Guten** (AI Language Learning Apps | Active Deployment | Metric: Web App Users)

- Full CRUD (Add, Edit, Delete).
- Inline metric quick-updater.
- Quick focus session trigger.

---

### Tab 4: Analytics & Data
- **4 Real-Time Stat Cards**: Daily Tasks Completed, Active Ventures Tracked, Opportunities Pipeline, Total Focus Time Logged.
- **7-Day Completion Velocity Canvas Chart**: Dynamic bar chart showing daily execution over the past 7 days.
- **Opportunity Matrix Breakdown**: Visual progress bars representing pipeline distribution across the 5 pillars.
- **Venture Focus Distribution**: Visual breakdown of minutes invested per venture.
- **Local Data Sovereignty**: One-click JSON backup export and restore.

---

### Tab 5: Focus Timer
- Clean countdown timer with circular SVG progress ring.
- Presets: 15m Quick, 25m Pomodoro, 50m Deep Work.
- Attributed to any Venture or Platform.
- Completed sessions automatically credit focus minutes to the venture's analytics.
- **100% Offline Synthesizer Audio**: Web Audio API chords upon completion (zero external audio files).

---

## 🚀 How to Run Locally

Open [`index.html`](file:///C:/Users/USER/.gemini/antigravity/scratch/multi-venture-daily-tracker/index.html) in any browser (Chrome, Edge, Firefox, Brave, Safari):
```
file:///C:/Users/USER/.gemini/antigravity/scratch/multi-venture-daily-tracker/index.html
```

Or start a local static server:
```powershell
python -m http.server 8080 --directory "C:\Users\USER\.gemini\antigravity\scratch\multi-venture-daily-tracker"
```
and navigate to `http://localhost:8080`.
