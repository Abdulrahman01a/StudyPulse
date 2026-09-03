importScripts("../engine/study-engine.js");

const studyEngine = new StudyEngine();

chrome.runtime.onMessage.addListener((message, sender) => {
	if (!sender.tab || !["page-entered", "page-left", "activity"].includes(message.type)) {
		return;
	}

	const pageId = sender.tab.id;
	const now = Date.now();

	if (message.type === "page-entered") {
		studyEngine.enterPage(pageId, now);
	} else if (message.type === "page-left") {
		studyEngine.leavePage(pageId, now);
	} else {
		studyEngine.recordActivity(pageId, now);
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (changeInfo.url) {
		studyEngine.leavePage(tabId, Date.now());
	}
});

chrome.tabs.onRemoved.addListener((tabId) => {
	studyEngine.leavePage(tabId, Date.now());
});

chrome.windows.onFocusChanged.addListener((windowId) => {
	if (windowId === chrome.windows.WINDOW_ID_NONE) {
		studyEngine.leaveAllPages(Date.now());
	}
});

setInterval(() => studyEngine.update(Date.now()), 1000);

