/**
 * Multi-Venture Daily Tracker - Core Application Logic
 * 5 Tabs: Daily Rhythm, Opportunities, Ventures Portfolio, Analytics & Data, Focus Timer
 * 100% Browser Local Storage, Mobile-Ready, Responsive
 * Palette: Warm Light Cream (#FFFDF6), Soft Cream (#FAF6E8), Royal Blue (#1E40AF)
 */

// Storage Key
const STORAGE_KEY = 'MULTI_VENTURE_DAILY_TRACKER_V3';

// Pillar Definitions & Color Map
const PILLARS = [
  { id: "Commercial Need", label: "Commercial Need", color: "#DC2626", bg: "#FEE2E2", border: "#FECACA" },
  { id: "Existing Expertise", label: "Existing Expertise", color: "#1E40AF", bg: "#DBEAFE", border: "#BFDBFE" },
  { id: "Growth Opportunity", label: "Growth Opportunity", color: "#059669", bg: "#D1FAE5", border: "#A7F3D0" },
  { id: "Long-Term Opportunity", label: "Long-Term Opportunity", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
  { id: "Extra Opportunities", label: "Extra Opportunities", color: "#7C3AED", bg: "#EDE9FE", border: "#DDD6FE" }
];

// Default Data Schema
const DEFAULT_DATA = {
  userProfile: {
    name: "Anand Mohandas",
    subtitle: "Solo Development Platform",
    streak: 7
  },
  timeBlocks: [
    {
      id: "tb-1",
      title: "Slot 1: Morning Foundation & Focus",
      timeWindow: "08:00 AM – 10:00 AM",
      color: "#1E40AF", // Royal Blue
      objective: "Personal routine, language study (French, German, Spanish), and high-leverage solo engineering.",
      tasks: [
        {
          id: "t-101",
          title: "30-min trilingual fluency drill (French, German, Spanish)",
          tag: "Languages",
          tagColor: "#7C3AED",
          completedDates: [getTodayDateString()]
        },
        {
          id: "t-102",
          title: "Deep-focus coding sprint on Android Kotlin/Jetpack Compose & WebView architecture",
          tag: "Android Dev",
          tagColor: "#059669",
          completedDates: []
        }
      ]
    },
    {
      id: "tb-2",
      title: "Slot 2: Commercial Core & Client Operations",
      timeWindow: "10:00 AM – 02:00 PM",
      color: "#D97706", // Warm Amber
      objective: "RECOVERYGOD.COM data recovery, IT infrastructure, and client deliverables.",
      tasks: [
        {
          id: "t-201",
          title: "Handle data recovery diagnostics & storage restoration",
          tag: "RECOVERYGOD",
          tagColor: "#DC2626",
          completedDates: [getTodayDateString()]
        },
        {
          id: "t-202",
          title: "Execute computer installation, network setup & enterprise IT support calls",
          tag: "IT Infra",
          tagColor: "#0284C7",
          completedDates: []
        }
      ]
    },
    {
      id: "tb-3",
      title: "Slot 3: Afternoon Creative & Content Engine",
      timeWindow: "03:00 PM – 05:30 PM",
      color: "#059669", // Emerald
      objective: "Automated Node.js/Python pipelines, art print production, and storefront management.",
      tasks: [
        {
          id: "t-301",
          title: "Review automated Node.js/Python publishing pipelines",
          tag: "Automation",
          tagColor: "#2563EB",
          completedDates: []
        },
        {
          id: "t-302",
          title: "Art print production & online marketplace updates",
          tag: "Creative Arts",
          tagColor: "#EA580C",
          completedDates: []
        }
      ]
    },
    {
      id: "tb-4",
      title: "Slot 4: Evening Review & Infrastructure Maintenance",
      timeWindow: "07:00 PM – 08:30 PM",
      color: "#4F46E5", // Indigo
      objective: "Cloud deployments, FirmSwitch tracking, and next-day planning.",
      tasks: [
        {
          id: "t-401",
          title: "Verify cloud deployments, GitHub commits & Play Console status",
          tag: "DevOps",
          tagColor: "#475569",
          completedDates: []
        },
        {
          id: "t-402",
          title: "Log completed milestones & set tomorrow's priorities",
          tag: "Operations",
          tagColor: "#059669",
          completedDates: []
        }
      ]
    }
  ],
  opportunities: [
    {
      id: "opp-1",
      title: "Enterprise Hard Drive & RAID Recovery Tier",
      pillar: "Commercial Need",
      priority: "High",
      concreteAction: "Standardize intake diagnostic workflow and pricing sheet for business NAS/RAID recoveries",
      targetBlockId: "tb-2"
    },
    {
      id: "opp-2",
      title: "Android Artsit Hybrid WebView & Canvas Engine V2",
      pillar: "Existing Expertise",
      priority: "High",
      concreteAction: "Benchmark AssetLoader cold-start latency on Android 15 & 16 release candidate build",
      targetBlockId: "tb-1"
    },
    {
      id: "opp-3",
      title: "Trilingual Language Immersion Mobile Flashcard Micro-App",
      pillar: "Growth Opportunity",
      priority: "Medium",
      concreteAction: "Curate top 250 European French/German legal & technical terms into JSON dictionary schema",
      targetBlockId: "tb-1"
    },
    {
      id: "opp-4",
      title: "Autonomous Content & Social Publisher Daemon",
      pillar: "Long-Term Opportunity",
      priority: "Medium",
      concreteAction: "Test automated Markdown to WordPress cross-posting webhook with draft status validation",
      targetBlockId: "tb-3"
    },
    {
      id: "opp-5",
      title: "Limited Edition Fine Art Prints & Canvas Fulfillment Store",
      pillar: "Extra Opportunities",
      priority: "Exploratory",
      concreteAction: "Verify digital vector exports and test paper finish samples with local print vendor",
      targetBlockId: "tb-3"
    }
  ],
  ventures: [
    {
      id: "ven-1",
      name: "RECOVERYGOD.COM",
      type: "IT Services & Data Recovery",
      status: "Active Core",
      color: "#DC2626", // Red / Amber
      metricName: "Active Client Tickets",
      metricValue: "4 Diagnoses In Flight",
      notes: "Commercial storage data recovery, secure forensic cloning, enterprise IT network setup & infrastructure support.",
      timeLoggedMins: 120
    },
    {
      id: "ven-2",
      name: "Artsit & Freeit",
      type: "Android Apps & Marketplaces",
      status: "Published Platforms",
      color: "#1E40AF", // Royal Blue
      metricName: "Play Store Listings",
      metricValue: "Target SDK 35 Compliant",
      notes: "Hybrid Android WebView and high-fidelity art showcase platform with asset caching & hardware acceleration.",
      timeLoggedMins: 90
    },
    {
      id: "ven-3",
      name: "Parlez & Guten",
      type: "AI Language Learning Apps",
      status: "Active Deployment",
      color: "#059669", // Emerald
      metricName: "Web App Users",
      metricValue: "Trilingual Fluency Drill Active",
      notes: "AI-synthesized question bank, trilingual flashcards, and language fluency platform for French, German & Spanish.",
      timeLoggedMins: 45
    }
  ],
  historyDays: {} // YYYY-MM-DD -> { completedTaskCount, totalTaskCount }
};

// Global State
let appState = loadState();
let selectedDate = getTodayDateString();
let currentTab = 'rhythmTab';
let activePillarFilter = 'all';

// Focus Timer State
let timerInterval = null;
let timerSecondsRemaining = 25 * 60;
let timerTotalSeconds = 25 * 60;
let timerIsRunning = false;
let timerTargetVentureId = "ven-1";

// Audio Context for 100% offline Web Audio API synth
let audioCtx = null;

// Helper: Today's date YYYY-MM-DD
function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format Human Readable Date
function formatHumanDate(dateStr) {
  try {
    const parts = dateStr.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

// Date Navigation Steppers
function changeSelectedDate(offsetDays) {
  const parts = selectedDate.split('-');
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  selectedDate = `${year}-${month}-${day}`;
  renderApp();
  showToast(`Showing ${formatHumanDate(selectedDate)}`, "info");
}

function jumpToToday() {
  selectedDate = getTodayDateString();
  renderApp();
  showToast("Showing Today's schedule", "info");
}

// Load State from LocalStorage
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const parsed = JSON.parse(raw);

    // Schema validation
    // Auto-migrate block titles to slot terminology
    parsed.timeBlocks.forEach(b => {
      if (b.title && typeof b.title === 'string' && b.title.startsWith("Block ")) {
        b.title = b.title.replace(/^Block /, "Slot ");
      }
    });

    if (!parsed.timeBlocks || !Array.isArray(parsed.timeBlocks) || parsed.timeBlocks.length === 0) {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    if (!parsed.opportunities || !Array.isArray(parsed.opportunities)) {
      parsed.opportunities = DEFAULT_DATA.opportunities;
    }
    if (!parsed.ventures || !Array.isArray(parsed.ventures)) {
      parsed.ventures = DEFAULT_DATA.ventures;
    }
    if (!parsed.userProfile) {
      parsed.userProfile = DEFAULT_DATA.userProfile;
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

// Save State to LocalStorage
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error("Failed to save state:", e);
    showToast("Storage quota exceeded or private mode restriction", "danger");
  }
}

// --------------------------------------------------------------------------
// Sound Chime using Web Audio API (100% Offline Synthesizer)
// --------------------------------------------------------------------------
function playChime(type = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);       // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24);// C6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      osc.start(now);
      osc.stop(now + 0.75);
    } else if (type === 'all_complete') {
      [0, 0.12, 0.24, 0.4].forEach((timeOffset, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(440 * Math.pow(1.2, idx), now + timeOffset);
        g.gain.setValueAtTime(0.25, now + timeOffset);
        g.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.3);
        o.start(now + timeOffset);
        o.stop(now + timeOffset + 0.3);
      });
    } else if (type === 'timer_done') {
      [0, 0.2, 0.4].forEach((offset, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(650 + (idx * 220), now + offset);
        g.gain.setValueAtTime(0.3, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25);
        o.start(now + offset);
        o.stop(now + offset + 0.25);
      });
    }
  } catch (err) {
    // Audio gesture constraint handling
  }
}

// --------------------------------------------------------------------------
// Confetti Animation for Completion Celebration
// --------------------------------------------------------------------------
function triggerConfetti() {
  const colors = ['#1E40AF', '#3B82F6', '#D97706', '#10B981', '#F59E0B', '#7C3AED'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-10px';
    p.style.width = Math.random() * 8 + 6 + 'px';
    p.style.height = Math.random() * 8 + 6 + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.animationDuration = Math.random() * 1.5 + 1.5 + 's';
    p.style.animationDelay = Math.random() * 0.3 + 's';
    document.body.appendChild(p);

    setTimeout(() => p.remove(), 3200);
  }
}

// --------------------------------------------------------------------------
// UI RENDERERS
// --------------------------------------------------------------------------

// Main Dispatcher
function renderApp() {
  renderHeaderProfile();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderOpportunityFilters();
  renderOpportunities();
  renderVenturesList();
  renderAnalyticsDashboard();
  renderTimerUI();
  populateDropdowns();
}

// 1. Header & Editable Profile
function renderHeaderProfile() {
  const nameEl = document.getElementById('userProfileNameDisplay');
  const subEl = document.getElementById('userProfileSubtitleDisplay');
  const streakEl = document.getElementById('userStreakDisplay');
  const dateEl = document.getElementById('currentDateDisplay');

  if (nameEl) nameEl.textContent = appState.userProfile.name || "Your Name";
  if (subEl) subEl.textContent = appState.userProfile.subtitle || "Solo Development Platform";
  if (streakEl) streakEl.textContent = `🔥 ${appState.userProfile.streak || 0}d streak`;
  if (dateEl) dateEl.textContent = formatHumanDate(selectedDate);
}

// 2. Global "Daily Rhythm Completion" Progress Bar
function renderDailyRhythmProgress() {
  let totalTasks = 0;
  let completedTasks = 0;

  appState.timeBlocks.forEach(block => {
    block.tasks.forEach(task => {
      totalTasks++;
      if (task.completedDates && task.completedDates.includes(selectedDate)) {
        completedTasks++;
      }
    });
  });

  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const fractionEl = document.getElementById('rhythmProgressFraction');
  const fillEl = document.getElementById('rhythmProgressBarFill');

  if (fractionEl) {
    fractionEl.textContent = `${completedTasks} / ${totalTasks} Tasks Completed (${percent}%)`;
  }
  if (fillEl) {
    fillEl.style.width = `${percent}%`;
  }
}

// Reset Daily Checks (Unchecks today's tasks)
function resetDailyChecks() {
  if (!confirm("Reset all task checkboxes for today? Your time slots and task structures will remain intact.")) {
    return;
  }

  appState.timeBlocks.forEach(block => {
    block.tasks.forEach(task => {
      if (task.completedDates) {
        task.completedDates = task.completedDates.filter(d => d !== selectedDate);
      }
    });
  });

  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  showToast("All daily checks have been reset for today.", "info");
}

// --------------------------------------------------------------------------
// TAB 1: DAILY OPERATING RHYTHM (2-COLUMN GRID OF TIME SLOTS)
// --------------------------------------------------------------------------
function renderTimeBlocks() {
  const container = document.getElementById('timeBlocksGridContainer');
  if (!container) return;

  if (appState.timeBlocks.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background-color: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-color);">
        <p style="font-weight: 700; color: var(--text-secondary); margin-bottom: 0.75rem;">No Time Slots created yet.</p>
        <button class="btn btn-primary btn-sm" onclick="openAddTimeBlockModal()">+ Add Time Slot</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.timeBlocks.map(block => {
    const total = block.tasks.length;
    const completed = block.tasks.filter(t => t.completedDates && t.completedDates.includes(selectedDate)).length;
    const isBlockDone = total > 0 && completed === total;

    return `
      <div class="time-block-card" style="--block-color: ${block.color || '#1E40AF'};">
        <div>
          <!-- Top Row: Time Window Badge, Live Counter, Actions -->
          <div class="block-header-row">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="block-window-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${escapeHtml(block.timeWindow || 'Custom Time')}
              </span>
              <span class="block-completion-pill" style="${isBlockDone ? 'background-color: var(--success-light); color: var(--success); font-weight: 800;' : ''}">
                ${completed}/${total} done
              </span>
            </div>
            <div class="block-header-actions">
              <button class="btn-icon-only" title="Edit Slot" onclick="openEditTimeBlockModal('${block.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button class="btn-icon-only" title="Delete Slot" onclick="confirmDeleteTimeBlock('${block.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>

          <!-- Block Title in Bold Royal Blue -->
          <h3 class="block-title-text" style="color: ${block.color || '#1E40AF'};">${escapeHtml(block.title)}</h3>

          <!-- Objective Line -->
          <div class="block-objective-row" style="border-left-color: ${block.color || '#1E40AF'};">
            <span class="block-objective-bold">Objective:</span>
            ${escapeHtml(block.objective || 'Focus execution on key priorities.')}
          </div>

          <!-- Tasks List inside this block -->
          <div class="block-task-list">
            ${block.tasks.length === 0 ? `
              <div style="font-size: 0.8125rem; color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">No tasks yet in this slot.</div>
            ` : block.tasks.map(task => {
              const isChecked = task.completedDates && task.completedDates.includes(selectedDate);
              const tagColor = task.tagColor || block.color || '#1E40AF';
              return `
                <div class="task-item ${isChecked ? 'completed' : ''}" id="task_${task.id}">
                  <div class="task-left">
                    <input 
                      type="checkbox" 
                      class="custom-checkbox" 
                      ${isChecked ? 'checked' : ''} 
                      onchange="toggleTask('${block.id}', '${task.id}')"
                      aria-label="Toggle task completion"
                    />
                    <span class="task-title">${escapeHtml(task.title)}</span>
                  </div>
                  <div class="task-right">
                    ${task.tag ? `
                      <span class="task-category-pill" style="background-color: ${hexToRgba(tagColor, 0.12)}; color: ${tagColor}; border: 1px solid ${hexToRgba(tagColor, 0.3)};">
                        ${escapeHtml(task.tag)}
                      </span>
                    ` : ''}
                    <button class="btn-icon-only" title="Edit Task" onclick="openEditTaskModal('${block.id}', '${task.id}')">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button>
                    <button class="btn-icon-only" title="Delete Task" onclick="deleteTask('${block.id}', '${task.id}')">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Add Task to Block Row -->
        <form class="add-task-to-block-row" onsubmit="handleInlineAddTask(event, '${block.id}')">
          <input 
            type="text" 
            class="mini-input" 
            id="inlineInput_${block.id}" 
            placeholder="+ Add task to this slot..." 
            required
          />
          <input 
            type="text" 
            class="mini-input" 
            id="inlineTag_${block.id}" 
            placeholder="Tag (e.g. Android)" 
            style="max-width: 120px;"
          />
          <button type="submit" class="btn btn-primary btn-sm" style="padding: 0.35rem 0.75rem;">
            + Add
          </button>
        </form>
      </div>
    `;
  }).join('');
}

// Toggle Task Checkbox
function toggleTask(blockId, taskId) {
  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;
  const task = block.tasks.find(t => t.id === taskId);
  if (!task) return;

  if (!task.completedDates) task.completedDates = [];
  const idx = task.completedDates.indexOf(selectedDate);

  if (idx === -1) {
    task.completedDates.push(selectedDate);
    playChime('success');
  } else {
    task.completedDates.splice(idx, 1);
  }

  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();

  // Check if ALL daily tasks completed!
  let allTotal = 0;
  let allDone = 0;
  appState.timeBlocks.forEach(b => {
    b.tasks.forEach(t => {
      allTotal++;
      if (t.completedDates && t.completedDates.includes(selectedDate)) allDone++;
    });
  });

  if (allTotal > 0 && allDone === allTotal) {
    playChime('all_complete');
    triggerConfetti();
    showToast("🎉 All Daily Rhythm Tasks Completed 100%!", "success");
  }
}

// Inline Task Add
function handleInlineAddTask(event, blockId) {
  if (event) event.preventDefault();
  const inputEl = document.getElementById(`inlineInput_${blockId}`);
  const tagEl = document.getElementById(`inlineTag_${blockId}`);
  if (!inputEl || !inputEl.value.trim()) return;

  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;

  const tagText = tagEl && tagEl.value.trim() ? tagEl.value.trim() : "Action";
  const newTask = {
    id: "t-" + Date.now(),
    title: inputEl.value.trim(),
    tag: tagText,
    tagColor: block.color || "#1E40AF",
    completedDates: []
  };

  block.tasks.push(newTask);
  inputEl.value = "";
  if (tagEl) tagEl.value = "";

  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  showToast(`Added task to "${block.title}"`, "success");
}

// Task Delete
function deleteTask(blockId, taskId) {
  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;
  if (!confirm("Delete this checklist task?")) return;

  block.tasks = block.tasks.filter(t => t.id !== taskId);
  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  showToast("Task removed.", "info");
}

// Task Edit Modal Handlers
let editingTaskBlockId = null;
let editingTaskId = null;

function openEditTaskModal(blockId, taskId) {
  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;
  const task = block.tasks.find(t => t.id === taskId);
  if (!task) return;

  editingTaskBlockId = blockId;
  editingTaskId = taskId;

  document.getElementById('editTaskTitleInput').value = task.title || "";
  document.getElementById('editTaskTagInput').value = task.tag || "";
  document.getElementById('editTaskBlockSelect').value = blockId;

  openModal('taskEditModal');
}

function handleSaveEditedTask(event) {
  if (event) event.preventDefault();
  const newTitle = document.getElementById('editTaskTitleInput').value.trim();
  const newTag = document.getElementById('editTaskTagInput').value.trim();
  const targetBlockId = document.getElementById('editTaskBlockSelect').value;

  if (!newTitle) return;

  const sourceBlock = appState.timeBlocks.find(b => b.id === editingTaskBlockId);
  if (!sourceBlock) return;
  const taskIndex = sourceBlock.tasks.findIndex(t => t.id === editingTaskId);
  if (taskIndex === -1) return;

  const task = sourceBlock.tasks[taskIndex];
  task.title = newTitle;
  task.tag = newTag || "General";

  if (targetBlockId !== editingTaskBlockId) {
    sourceBlock.tasks.splice(taskIndex, 1);
    const targetBlock = appState.timeBlocks.find(b => b.id === targetBlockId);
    if (targetBlock) {
      targetBlock.tasks.push(task);
    }
  }

  saveState();
  closeModal('taskEditModal');
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  showToast("Task updated.", "success");
}

// Time Block CRUD
function openAddTimeBlockModal() {
  document.getElementById('blockModalTitle').textContent = "Add Time Slot";
  document.getElementById('blockEditIdInput').value = "";
  document.getElementById('blockTitleInput').value = "";
  document.getElementById('blockTimeWindowInput').value = "09:00 AM – 11:00 AM";
  document.getElementById('blockObjectiveInput').value = "";
  document.getElementById('blockColorInput').value = "#1E40AF";
  openModal('blockModal');
  setTimeout(() => document.getElementById('blockTitleInput').focus(), 100);
}

function openEditTimeBlockModal(blockId) {
  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;

  document.getElementById('blockModalTitle').textContent = "Edit Time Slot";
  document.getElementById('blockEditIdInput').value = block.id;
  document.getElementById('blockTitleInput').value = block.title;
  document.getElementById('blockTimeWindowInput').value = block.timeWindow || "";
  document.getElementById('blockObjectiveInput').value = block.objective || "";
  document.getElementById('blockColorInput').value = block.color || "#1E40AF";
  openModal('blockModal');
}

function handleSaveTimeBlock(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById('blockEditIdInput').value;
  const title = document.getElementById('blockTitleInput').value.trim();
  const timeWindow = document.getElementById('blockTimeWindowInput').value.trim();
  const objective = document.getElementById('blockObjectiveInput').value.trim();
  const color = document.getElementById('blockColorInput').value || "#1E40AF";

  if (!title) {
    showToast("Please enter a slot title.", "danger");
    return;
  }

  if (idInput) {
    const block = appState.timeBlocks.find(b => b.id === idInput);
    if (block) {
      block.title = title;
      block.timeWindow = timeWindow;
      block.objective = objective;
      block.color = color;
    }
    showToast("Time slot updated.", "success");
  } else {
    const newBlock = {
      id: "tb-" + Date.now(),
      title,
      timeWindow: timeWindow || "09:00 AM – 11:00 AM",
      color,
      objective: objective || "Focus execution on designated goals.",
      tasks: []
    };
    appState.timeBlocks.push(newBlock);
    showToast("New Time Slot created!", "success");
  }

  saveState();
  closeModal('blockModal');
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  populateDropdowns();
}

function confirmDeleteTimeBlock(blockId) {
  const block = appState.timeBlocks.find(b => b.id === blockId);
  if (!block) return;
  if (!confirm(`Delete "${block.title}" and its ${block.tasks.length} tasks?`)) return;

  appState.timeBlocks = appState.timeBlocks.filter(b => b.id !== blockId);
  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();
  populateDropdowns();
  showToast(`Time slot removed.`, "info");
}

// --------------------------------------------------------------------------
// TAB 2: 5-PILLAR OPPORTUNITY TRACKER
// --------------------------------------------------------------------------
function renderOpportunityFilters() {
  const container = document.getElementById('pillarFiltersContainer');
  if (!container) return;

  const filters = [
    { id: 'all', label: 'All Pillars' },
    ...PILLARS.map(p => ({ id: p.id, label: p.label }))
  ];

  container.innerHTML = filters.map(f => `
    <button 
      class="pillar-chip ${activePillarFilter === f.id ? 'active' : ''}" 
      onclick="setPillarFilter('${f.id}')"
    >
      ${escapeHtml(f.label)}
    </button>
  `).join('');
}

function setPillarFilter(pillarId) {
  activePillarFilter = pillarId;
  renderOpportunityFilters();
  renderOpportunities();
}

function renderOpportunities() {
  const container = document.getElementById('opportunitiesGridContainer');
  if (!container) return;

  let filtered = appState.opportunities;
  if (activePillarFilter !== 'all') {
    filtered = filtered.filter(o => o.pillar === activePillarFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background-color: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-color);">
        <p style="font-weight: 700; color: var(--text-secondary); margin-bottom: 0.75rem;">No opportunities found in this pillar.</p>
        <button class="btn btn-primary btn-sm" onclick="openAddOpportunityModal()">+ Add Opportunity</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(opp => {
    const pillarConfig = PILLARS.find(p => p.id === opp.pillar) || {
      color: '#1E40AF',
      bg: '#DBEAFE',
      border: '#BFDBFE'
    };
    const targetBlock = appState.timeBlocks.find(b => b.id === opp.targetBlockId);
    const targetBlockName = targetBlock ? targetBlock.title : (appState.timeBlocks[0] ? appState.timeBlocks[0].title : 'Slot 1');

    return `
      <div class="opportunity-card">
        <div>
          <!-- Badge Row: Pillar + Priority -->
          <div class="opp-badge-row">
            <span class="opp-pillar-pill" style="background-color: ${pillarConfig.bg}; color: ${pillarConfig.color}; border: 1px solid ${pillarConfig.border};">
              ${escapeHtml(opp.pillar)}
            </span>
            <span class="opp-priority-pill priority-${(opp.priority || 'medium').toLowerCase()}">
              ${escapeHtml(opp.priority || 'Medium')}
            </span>
          </div>

          <!-- Title -->
          <h3 class="opp-title" style="margin-top: 0.75rem; margin-bottom: 0.5rem;">${escapeHtml(opp.title)}</h3>

          <!-- Target Block -->
          <div class="opp-target-block">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Target: <strong>${escapeHtml(targetBlockName)}</strong>
          </div>

          <!-- Concrete Action -->
          <div class="opp-action-box" style="margin-top: 0.875rem;">
            <span class="opp-action-label">Concrete Next Action:</span>
            ${escapeHtml(opp.concreteAction || 'No concrete action defined yet.')}
          </div>
        </div>

        <!-- Footer: Send to Day's activity + Edit/Delete -->
        <div class="opp-footer-actions">
          <button class="btn btn-soft-blue btn-sm" onclick="sendOpportunityToRhythm('${opp.id}')" title="Push this concrete action directly into its target Time Slot in Day's activity">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Send to Day's activity
          </button>
          <div style="display: flex; gap: 0.2rem;">
            <button class="btn-icon-only" title="Edit Opportunity" onclick="openEditOpportunityModal('${opp.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="btn-icon-only" title="Delete Opportunity" onclick="confirmDeleteOpportunity('${opp.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// "Send to Rhythm" Action
function sendOpportunityToRhythm(oppId) {
  const opp = appState.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  let targetBlock = appState.timeBlocks.find(b => b.id === opp.targetBlockId);
  if (!targetBlock && appState.timeBlocks.length > 0) {
    targetBlock = appState.timeBlocks[0];
  }
  if (!targetBlock) {
    showToast("No time slots exist to receive this task.", "danger");
    return;
  }

  const pillarConfig = PILLARS.find(p => p.id === opp.pillar) || { color: targetBlock.color || '#1E40AF' };

  const newTask = {
    id: "t-" + Date.now(),
    title: opp.concreteAction || opp.title,
    tag: opp.pillar || "Opportunity",
    tagColor: pillarConfig.color || targetBlock.color,
    completedDates: []
  };

  targetBlock.tasks.push(newTask);
  saveState();
  renderDailyRhythmProgress();
  renderTimeBlocks();
  renderAnalyticsDashboard();

  // Switch view to Tab 1 ("Day's activity")
  switchTab('rhythmTab');

  playChime('success');
  showToast(`⚡ Dispatched action to "${targetBlock.title}" in Day's activity!`, "success");

  // Highlight and scroll to the receiving task
  setTimeout(() => {
    const taskEl = document.getElementById(`task_${newTask.id}`);
    if (taskEl) {
      taskEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      taskEl.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease';
      taskEl.style.boxShadow = '0 0 0 3px #1E40AF, 0 4px 12px rgba(30, 64, 175, 0.25)';
      taskEl.style.borderColor = '#1E40AF';
      taskEl.style.transform = 'scale(1.02)';
      setTimeout(() => {
        taskEl.style.boxShadow = '';
        taskEl.style.borderColor = '';
        taskEl.style.transform = '';
      }, 2000);
    }
  }, 120);
}

// Opportunity Modal Handlers
function openAddOpportunityModal() {
  document.getElementById('oppModalTitle').textContent = "Add Opportunity";
  document.getElementById('oppEditIdInput').value = "";
  document.getElementById('oppTitleInput').value = "";
  document.getElementById('oppPillarSelect').value = "Commercial Need";
  document.getElementById('oppPrioritySelect').value = "High";
  document.getElementById('oppActionInput').value = "";
  if (appState.timeBlocks[0]) {
    document.getElementById('oppBlockSelect').value = appState.timeBlocks[0].id;
  }
  openModal('oppModal');
  setTimeout(() => document.getElementById('oppTitleInput').focus(), 100);
}

function openEditOpportunityModal(oppId) {
  const opp = appState.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  document.getElementById('oppModalTitle').textContent = "Edit Opportunity";
  document.getElementById('oppEditIdInput').value = opp.id;
  document.getElementById('oppTitleInput').value = opp.title;
  document.getElementById('oppPillarSelect').value = opp.pillar || "Commercial Need";
  document.getElementById('oppPrioritySelect').value = opp.priority || "Medium";
  document.getElementById('oppActionInput').value = opp.concreteAction || "";
  document.getElementById('oppBlockSelect').value = opp.targetBlockId || (appState.timeBlocks[0] && appState.timeBlocks[0].id);

  openModal('oppModal');
}

function handleSaveOpportunity(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById('oppEditIdInput').value;
  const title = document.getElementById('oppTitleInput').value.trim();
  const pillar = document.getElementById('oppPillarSelect').value;
  const priority = document.getElementById('oppPrioritySelect').value;
  const concreteAction = document.getElementById('oppActionInput').value.trim();
  const targetBlockId = document.getElementById('oppBlockSelect').value;

  if (!title) {
    showToast("Please enter an opportunity title.", "danger");
    return;
  }

  if (idInput) {
    const opp = appState.opportunities.find(o => o.id === idInput);
    if (opp) {
      opp.title = title;
      opp.pillar = pillar;
      opp.priority = priority;
      opp.concreteAction = concreteAction;
      opp.targetBlockId = targetBlockId;
    }
    showToast("Opportunity updated.", "success");
  } else {
    const newOpp = {
      id: "opp-" + Date.now(),
      title,
      pillar,
      priority,
      concreteAction,
      targetBlockId
    };
    appState.opportunities.push(newOpp);
    showToast("New opportunity added!", "success");
  }

  saveState();
  closeModal('oppModal');
  renderOpportunities();
  renderAnalyticsDashboard();
}

function confirmDeleteOpportunity(oppId) {
  const opp = appState.opportunities.find(o => o.id === oppId);
  if (!opp) return;
  if (!confirm(`Delete opportunity "${opp.title}"?`)) return;

  appState.opportunities = appState.opportunities.filter(o => o.id !== oppId);
  saveState();
  renderOpportunities();
  renderAnalyticsDashboard();
  showToast("Opportunity deleted.", "info");
}

// --------------------------------------------------------------------------
// TAB 3: VENTURES PORTFOLIO
// --------------------------------------------------------------------------
function renderVenturesList() {
  const container = document.getElementById('venturesGridContainer');
  if (!container) return;

  if (appState.ventures.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background-color: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-color);">
        <p style="font-weight: 700; color: var(--text-secondary); margin-bottom: 0.75rem;">No active ventures in portfolio yet.</p>
        <button class="btn btn-primary btn-sm" onclick="openAddVentureModal()">+ Add First Venture</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.ventures.map(v => {
    return `
      <div class="venture-card" style="--venture-color: ${v.color || '#1E40AF'};">
        <div>
          <!-- Header -->
          <div class="venture-card-header">
            <div class="venture-identity">
              <div class="venture-icon-box" style="background-color: ${v.color || '#1E40AF'};">
                ${escapeHtml(v.name.charAt(0).toUpperCase())}
              </div>
              <div class="venture-title-area">
                <span class="venture-name">${escapeHtml(v.name)}</span>
                <span class="venture-category">${escapeHtml(v.type || 'Venture')}</span>
              </div>
            </div>
            <div style="display: flex; gap: 0.2rem;">
              <button class="btn-icon-only" title="Edit Venture" onclick="openEditVentureModal('${v.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button class="btn-icon-only" title="Delete Venture" onclick="confirmDeleteVenture('${v.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>

          <!-- Status Badge -->
          <div style="margin-top: 0.75rem;">
            <span class="venture-metric-label" style="background-color: ${hexToRgba(v.color || '#1E40AF', 0.12)}; color: ${v.color || '#1E40AF'}; padding: 0.2rem 0.55rem; border-radius: var(--radius-sm); border: 1px solid ${hexToRgba(v.color || '#1E40AF', 0.3)};">
              ${escapeHtml(v.status || 'Active')}
            </span>
          </div>

          <!-- Core Metric Box -->
          <div class="venture-metric-card">
            <div>
              <div class="venture-metric-label">${escapeHtml(v.metricName || 'Key Metric')}</div>
              <div class="venture-metric-val">${escapeHtml(v.metricValue || 'Tracked')}</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="openUpdateVentureMetricModal('${v.id}')" title="Quick Update Metric" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">
              Update
            </button>
          </div>

          ${v.notes ? `<p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.75rem; line-height: 1.45;">${escapeHtml(v.notes)}</p>` : ''}
        </div>

        <!-- Footer -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 0.8125rem;">
          <span style="font-weight: 700; color: var(--text-muted);">
            ⏱ Focus Logged: <strong style="color: var(--brand-primary);">${v.timeLoggedMins || 0}m</strong>
          </span>
          <button class="btn btn-soft-blue btn-sm" onclick="startTimerForVenture('${v.id}')" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;">
            ⏱ Focus
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Venture CRUD Handlers
function openAddVentureModal() {
  document.getElementById('venModalTitle').textContent = "Add Active Venture";
  document.getElementById('venEditIdInput').value = "";
  document.getElementById('venNameInput').value = "";
  document.getElementById('venTypeInput').value = "";
  document.getElementById('venStatusSelect').value = "Active Core";
  document.getElementById('venColorInput').value = "#1E40AF";
  document.getElementById('venMetricNameInput').value = "Active Metric";
  document.getElementById('venMetricValueInput').value = "";
  document.getElementById('venNotesInput').value = "";
  openModal('ventureModal');
  setTimeout(() => document.getElementById('venNameInput').focus(), 100);
}

function openEditVentureModal(vId) {
  const v = appState.ventures.find(item => item.id === vId);
  if (!v) return;

  document.getElementById('venModalTitle').textContent = "Edit Venture";
  document.getElementById('venEditIdInput').value = v.id;
  document.getElementById('venNameInput').value = v.name;
  document.getElementById('venTypeInput').value = v.type || "";
  document.getElementById('venStatusSelect').value = v.status || "Active Core";
  document.getElementById('venColorInput').value = v.color || "#1E40AF";
  document.getElementById('venMetricNameInput').value = v.metricName || "";
  document.getElementById('venMetricValueInput').value = v.metricValue || "";
  document.getElementById('venNotesInput').value = v.notes || "";
  openModal('ventureModal');
}

function handleSaveVenture(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById('venEditIdInput').value;
  const name = document.getElementById('venNameInput').value.trim();
  const type = document.getElementById('venTypeInput').value.trim();
  const status = document.getElementById('venStatusSelect').value;
  const color = document.getElementById('venColorInput').value || "#1E40AF";
  const metricName = document.getElementById('venMetricNameInput').value.trim();
  const metricValue = document.getElementById('venMetricValueInput').value.trim();
  const notes = document.getElementById('venNotesInput').value.trim();

  if (!name) {
    showToast("Please enter a venture name.", "danger");
    return;
  }

  if (idInput) {
    const v = appState.ventures.find(item => item.id === idInput);
    if (v) {
      v.name = name;
      v.type = type;
      v.status = status;
      v.color = color;
      v.metricName = metricName;
      v.metricValue = metricValue;
      v.notes = notes;
    }
    showToast("Venture updated.", "success");
  } else {
    const newV = {
      id: "ven-" + Date.now(),
      name,
      type: type || "Platform",
      status: status || "Active Core",
      color,
      metricName: metricName || "Key Metric",
      metricValue: metricValue || "Active",
      notes,
      timeLoggedMins: 0
    };
    appState.ventures.push(newV);
    showToast("New venture added to portfolio!", "success");
  }

  saveState();
  closeModal('ventureModal');
  renderVenturesList();
  renderAnalyticsDashboard();
  populateDropdowns();
}

function confirmDeleteVenture(vId) {
  const v = appState.ventures.find(item => item.id === vId);
  if (!v) return;
  if (!confirm(`Delete venture "${v.name}" from portfolio?`)) return;

  appState.ventures = appState.ventures.filter(item => item.id !== vId);
  saveState();
  renderVenturesList();
  renderAnalyticsDashboard();
  populateDropdowns();
  showToast("Venture removed.", "info");
}

function openUpdateVentureMetricModal(vId) {
  const v = appState.ventures.find(item => item.id === vId);
  if (!v) return;
  const newVal = prompt(`Update "${v.metricName || 'Metric'}" for ${v.name}:`, v.metricValue || "");
  if (newVal !== null) {
    v.metricValue = newVal.trim();
    saveState();
    renderVenturesList();
    showToast("Metric updated.", "success");
  }
}

// --------------------------------------------------------------------------
// TAB 4: ANALYTICS & DATA
// --------------------------------------------------------------------------
function renderAnalyticsDashboard() {
  // 1. Metric Stat Cards
  let totalTasks = 0;
  let completedTasks = 0;
  appState.timeBlocks.forEach(b => {
    b.tasks.forEach(t => {
      totalTasks++;
      if (t.completedDates && t.completedDates.includes(selectedDate)) completedTasks++;
    });
  });

  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalMins = appState.ventures.reduce((sum, v) => sum + (v.timeLoggedMins || 0), 0);

  const tEl = document.getElementById('statCompletedTasks');
  const vEl = document.getElementById('statActiveVentures');
  const oEl = document.getElementById('statTotalOpportunities');
  const sEl = document.getElementById('statTimeLogged');

  if (tEl) tEl.textContent = `${completedTasks} / ${totalTasks} (${percent}%)`;
  if (vEl) vEl.textContent = `${appState.ventures.length} Platforms`;
  if (oEl) oEl.textContent = `${appState.opportunities.length} Pipeline`;
  if (sEl) sEl.textContent = `${totalMins} mins`;

  // 2. Render 7-Day Completion Velocity Canvas Chart
  renderCompletionTrendCanvas();

  // 3. Render 5-Pillar Opportunity Matrix Breakdown
  renderPillarMatrixBreakdown();

  // 4. Render Venture Focus Distribution
  renderVentureFocusDistribution();
}

// Canvas Chart: 7-Day Completion Trend
function renderCompletionTrendCanvas() {
  const canvas = document.getElementById('completionTrendCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  // Generate last 7 days data
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    let count = 0;
    appState.timeBlocks.forEach(b => {
      b.tasks.forEach(t => {
        if (t.completedDates && t.completedDates.includes(dateStr)) count++;
      });
    });
    days.push({ dateStr, dayName, count });
  }

  const maxVal = Math.max(6, ...days.map(d => d.count));
  const padding = { top: 25, bottom: 30, left: 25, right: 15 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const colW = chartW / days.length;

  // Background Grid Lines
  ctx.strokeStyle = '#E5DEC9';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  [0, 0.5, 1].forEach(ratio => {
    const y = padding.top + chartH * (1 - ratio);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Bars
  days.forEach((day, idx) => {
    const x = padding.left + idx * colW + colW * 0.2;
    const barWidth = colW * 0.6;
    const barH = (day.count / maxVal) * chartH;
    const y = padding.top + chartH - barH;

    const isToday = day.dateStr === selectedDate;
    ctx.fillStyle = isToday ? '#1E40AF' : '#93C5FD';
    drawRoundedRect(ctx, x, y, barWidth, barH, 4);
    ctx.fill();

    // Value on top
    ctx.fillStyle = isToday ? '#1E40AF' : '#64748B';
    ctx.font = 'bold 11px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(String(day.count), x + barWidth / 2, y - 6);

    // Day Label below
    ctx.fillStyle = isToday ? '#1E40AF' : '#475569';
    ctx.font = isToday ? 'bold 11px Inter, system-ui' : '11px Inter, system-ui';
    ctx.fillText(day.dayName, x + barWidth / 2, h - 10);
  });
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (height < 2) height = 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// 5-Pillar Matrix Distribution
function renderPillarMatrixBreakdown() {
  const container = document.getElementById('pillarMatrixBreakdownContainer');
  if (!container) return;

  const totalOpps = appState.opportunities.length;

  container.innerHTML = PILLARS.map(p => {
    const count = appState.opportunities.filter(o => o.pillar === p.id).length;
    const pct = totalOpps > 0 ? Math.round((count / totalOpps) * 100) : 0;

    return `
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 700; margin-bottom: 0.25rem;">
          <span style="color: ${p.color};">${p.label}</span>
          <span style="color: var(--text-secondary);">${count} (${pct}%)</span>
        </div>
        <div class="progress-bar-track" style="height: 8px;">
          <div style="width: ${pct}%; height: 100%; background-color: ${p.color}; border-radius: 9999px;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Venture Focus Distribution
function renderVentureFocusDistribution() {
  const container = document.getElementById('ventureFocusDistributionContainer');
  if (!container) return;

  const totalMins = appState.ventures.reduce((sum, v) => sum + (v.timeLoggedMins || 0), 0);

  if (totalMins === 0) {
    container.innerHTML = `<p style="font-size:0.8125rem; color:var(--text-muted); font-style:italic;">No focus time recorded yet. Use the Focus Timer to log minutes.</p>`;
    return;
  }

  container.innerHTML = appState.ventures.map(v => {
    const mins = v.timeLoggedMins || 0;
    const pct = totalMins > 0 ? Math.round((mins / totalMins) * 100) : 0;

    return `
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 700; margin-bottom: 0.25rem;">
          <span style="color: ${v.color || '#1E40AF'};">${escapeHtml(v.name)}</span>
          <span style="color: var(--text-secondary);">${mins}m (${pct}%)</span>
        </div>
        <div class="progress-bar-track" style="height: 8px;">
          <div style="width: ${pct}%; height: 100%; background-color: ${v.color || '#1E40AF'}; border-radius: 9999px;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// TAB 5: FOCUS TIMER
// --------------------------------------------------------------------------
function startTimerForVenture(vId) {
  timerTargetVentureId = vId;
  switchTab('timerTab');
  renderTimerUI();
  if (!timerIsRunning) {
    toggleTimer();
  }
}

function renderTimerUI() {
  const timeDisplay = document.getElementById('timerMinutesSecondsDisplay');
  const targetLabel = document.getElementById('timerActiveTargetName');
  const playPauseBtn = document.getElementById('timerPlayPauseBtn');
  const circleProgress = document.getElementById('timerProgressSvgCircle');

  const mins = Math.floor(timerSecondsRemaining / 60);
  const secs = timerSecondsRemaining % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (timeDisplay) timeDisplay.textContent = timeFormatted;

  const activeVenture = appState.ventures.find(v => v.id === timerTargetVentureId);
  if (targetLabel) {
    targetLabel.textContent = activeVenture ? `Target: ${activeVenture.name}` : 'General Solo Focus';
  }

  if (playPauseBtn) {
    playPauseBtn.innerHTML = timerIsRunning 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Start Focus`;
    playPauseBtn.className = timerIsRunning ? "btn btn-amber" : "btn btn-primary";
  }

  if (circleProgress) {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (timerSecondsRemaining / timerTotalSeconds) * circumference;
    circleProgress.style.strokeDashoffset = offset;
  }
}

function toggleTimer() {
  if (timerIsRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerIsRunning = true;
  playChime('success');

  timerInterval = setInterval(() => {
    if (timerSecondsRemaining > 0) {
      timerSecondsRemaining--;
      renderTimerUI();
    } else {
      completeTimerSession();
    }
  }, 1000);

  renderTimerUI();
}

function pauseTimer() {
  timerIsRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  renderTimerUI();
}

function resetTimer() {
  pauseTimer();
  timerSecondsRemaining = timerTotalSeconds;
  renderTimerUI();
}

function setTimerPreset(mins) {
  pauseTimer();
  timerTotalSeconds = mins * 60;
  timerSecondsRemaining = mins * 60;
  renderTimerUI();
}

function completeTimerSession() {
  pauseTimer();
  playChime('timer_done');
  triggerConfetti();

  const loggedMinutes = Math.round(timerTotalSeconds / 60);

  // Credit focus minutes to the active venture
  const v = appState.ventures.find(item => item.id === timerTargetVentureId);
  if (v) {
    v.timeLoggedMins = (v.timeLoggedMins || 0) + loggedMinutes;
  }

  saveState();
  renderVenturesList();
  renderAnalyticsDashboard();

  showToast(`⏱ ${loggedMinutes} minutes focus logged to ${v ? v.name : 'Venture'}!`, "success");
  resetTimer();
}

function handleTimerTargetChange(e) {
  timerTargetVentureId = e.target.value;
  renderTimerUI();
}

// --------------------------------------------------------------------------
// EDITABLE USER PROFILE (Header)
// --------------------------------------------------------------------------
function openEditProfileModal() {
  document.getElementById('profileNameInput').value = appState.userProfile.name || "";
  document.getElementById('profileSubtitleInput').value = appState.userProfile.subtitle || "";
  openModal('profileModal');
  setTimeout(() => document.getElementById('profileNameInput').focus(), 100);
}

function handleSaveProfile(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('profileNameInput');
  const subInput = document.getElementById('profileSubtitleInput');

  appState.userProfile.name = nameInput.value.trim() || "Your Name";
  appState.userProfile.subtitle = subInput.value.trim() || "Solo Development Platform";

  saveState();
  closeModal('profileModal');
  renderHeaderProfile();
  showToast("User profile saved.", "success");
}

// --------------------------------------------------------------------------
// EXPORT & IMPORT BACKUP (Local JSON)
// --------------------------------------------------------------------------
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `multi-venture-daily-tracker-${getTodayDateString()}.json`);
  dlAnchorElem.click();
  showToast("Full JSON Backup downloaded.", "success");
}

function handleImportJSONFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.timeBlocks || !parsed.userProfile) {
        throw new Error("Invalid schema format.");
      }
      appState = parsed;
      saveState();
      renderApp();
      closeModal('backupModal');
      showToast("Backup restored successfully!", "success");
    } catch (err) {
      alert("Invalid backup file: Could not parse Multi-Venture JSON format.");
    }
  };
  reader.readAsText(file);
}

function handlePasteJSONImport() {
  const raw = document.getElementById('pasteJsonInput').value.trim();
  if (!raw) {
    showToast("Please paste valid JSON text.", "danger");
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.timeBlocks || !parsed.userProfile) {
      throw new Error("Invalid schema format.");
    }
    appState = parsed;
    saveState();
    renderApp();
    closeModal('backupModal');
    showToast("Backup restored successfully from pasted JSON!", "success");
  } catch (err) {
    alert("Invalid JSON: Please check the pasted data structure.");
  }
}

function reloadDefaultData() {
  if (!confirm("Reload default Operating Rhythm, Opportunities, and Ventures? This will overwrite local customizations.")) {
    return;
  }
  appState = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveState();
  renderApp();
  closeModal('backupModal');
  showToast("Default Operating Rhythm & Ventures reloaded.", "success");
}

function clearAllData() {
  if (!confirm("WARNING: Clear all data? This cannot be undone without a JSON backup.")) {
    return;
  }
  appState = {
    userProfile: {
      name: "Your Name",
      subtitle: "Solo Development Platform",
      streak: 1
    },
    timeBlocks: [],
    opportunities: [],
    ventures: []
  };
  saveState();
  renderApp();
  closeModal('backupModal');
  showToast("All data cleared.", "info");
}

// Populate dropdown selects
function populateDropdowns() {
  // 1. Blocks dropdown for task & opportunity assignment
  const blockSelects = ['editTaskBlockSelect', 'oppBlockSelect'];
  blockSelects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const currentVal = el.value;
    el.innerHTML = appState.timeBlocks.map(b => `
      <option value="${b.id}">${escapeHtml(b.title)} (${escapeHtml(b.timeWindow || '')})</option>
    `).join('');
    if (currentVal && appState.timeBlocks.some(b => b.id === currentVal)) {
      el.value = currentVal;
    }
  });

  // 2. Ventures dropdown for Focus Timer
  const timerSelect = document.getElementById('timerTargetSelect');
  if (timerSelect) {
    timerSelect.innerHTML = appState.ventures.map(v => `
      <option value="${v.id}" ${v.id === timerTargetVentureId ? 'selected' : ''}>${escapeHtml(v.name)} (${escapeHtml(v.type || 'Platform')})</option>
    `).join('');
  }
}

// --------------------------------------------------------------------------
// 5-TAB SWITCHER & MODAL HELPERS
// --------------------------------------------------------------------------
function switchTab(tabId) {
  currentTab = tabId;

  // View sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  // Desktop top tabs
  document.querySelectorAll('.top-tab-btn-5').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Mobile bottom navigation tabs
  document.querySelectorAll('.mobile-tab-btn-5').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  if (tabId === 'analyticsTab') {
    setTimeout(renderAnalyticsDashboard, 60);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Utility: Hex to RGBA
function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(30, 64, 175, ${alpha})`;
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) || 30;
  const g = parseInt(hex.substring(2, 4), 16) || 64;
  const b = parseInt(hex.substring(4, 6), 16) || 175;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --------------------------------------------------------------------------
// INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderApp();

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Keyboard shortcut: ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });

  // Debounced resize handler for canvas charts
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (currentTab === 'analyticsTab') renderCompletionTrendCanvas();
    }, 150);
  });
});
