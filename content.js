let enabled = false;
let keywords = [];

chrome.storage.sync.get(
  { enabled: false, keywords: [] },
  data => {
    enabled = data.enabled;
    keywords = data.keywords;
    watchPage();
  }
);

chrome.storage.onChanged.addListener(changes => {
  if (changes.enabled) enabled = changes.enabled.newValue;
  if (changes.keywords) keywords = changes.keywords.newValue;
  filter();
});

function isEducational(text) {
  return keywords.some(k => text.includes(k));
}

function filter() {
  const vids = document.querySelectorAll(
    "ytd-rich-item-renderer, ytd-video-renderer"
  );

  vids.forEach(v => {
    const text = v.innerText.toLowerCase();

    const ok = enabled ? isEducational(text) : true;

    if (ok) {
      v.style.filter = "";
      v.style.opacity = "";
      v.style.pointerEvents = "";
      v.removeAttribute("data-blurred-edu");
    } else {
      v.style.filter = "blur(6px)";
      v.style.opacity = "0.35";
      v.style.pointerEvents = "none";  // remove this line if you want clickable
      v.setAttribute("data-blurred-edu", "1");
    }
  });
}

function watchPage() {
  filter();

  const observer = new MutationObserver(filter);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
