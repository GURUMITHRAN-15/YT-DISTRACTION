const toggle = document.getElementById("toggle");
const keywordsBox = document.getElementById("keywords");
const saveBtn = document.getElementById("save");

const DEFAULT = [
  "tutorial","lecture","course","education",
  "coding","programming","javascript",
  "math","science","engineering","how to","learn"
];

chrome.storage.sync.get(
  { enabled: false, keywords: DEFAULT },
  data => {
    toggle.checked = data.enabled;
    keywordsBox.value = data.keywords.join(", ");
  }
);

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

saveBtn.addEventListener("click", () => {
  const list = keywordsBox.value
    .split(",")
    .map(x => x.trim().toLowerCase())
    .filter(Boolean);

  chrome.storage.sync.set({ keywords: list });
  alert("Saved!");
});
