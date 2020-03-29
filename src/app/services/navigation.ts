export function redirectTo(url: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.update(tabs[0].id, { url });
  });
}
