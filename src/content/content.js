function isCoursologyUsmleStep1TestPage(url) {
	const pageUrl = new URL(url);

	return pageUrl.protocol === "https:" &&
		pageUrl.hostname === "coursology-qbank.com" &&
		/^\/qbanks\/usmle1\/tests\/\d+$/.test(pageUrl.pathname);
}

const isSupportedTestPage = isCoursologyUsmleStep1TestPage(window.location.href);

if (isSupportedTestPage) {
	const reportActivity = () => chrome.runtime.sendMessage({ type: "activity" });

	chrome.runtime.sendMessage({ type: "page-entered" });

	["mousemove", "click", "scroll", "keydown"].forEach((eventType) => {
		window.addEventListener(eventType, reportActivity, { passive: true });
	});

	window.addEventListener("pagehide", () => {
		chrome.runtime.sendMessage({ type: "page-left" });
	});
}

