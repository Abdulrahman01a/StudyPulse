function isCoursologyUsmleStep1TestPage(url) {
	const pageUrl = new URL(url);

	return pageUrl.protocol === "https:" &&
		pageUrl.hostname === "coursology-qbank.com" &&
		/^\/qbanks\/usmle1\/tests\/\d+$/.test(pageUrl.pathname);
}

const isSupportedTestPage = isCoursologyUsmleStep1TestPage(window.location.href);

