const ACTIVE_TIMEOUT_MS = 2 * 60 * 1000;
const SESSION_TIMEOUT_MS = 45 * 60 * 1000;

class StudyEngine {
	constructor() {
		this.pages = new Set();
		this.session = null;
		this.lastActivityAt = null;
	}

	enterPage(pageId, at) {
		this.pages.add(pageId);

		if (this.session && this.session.awaySince !== null) {
			if (at - this.session.awaySince >= SESSION_TIMEOUT_MS) {
				this.session = null;
				this.lastActivityAt = null;
			} else {
				this.session.awaySince = null;
			}
		}
	}

	leavePage(pageId, at) {
		if (!this.pages.delete(pageId)) {
			return;
		}

		if (this.pages.size === 0) {
			this.addActiveTime(at);
			this.lastActivityAt = null;

			if (this.session) {
				this.session.awaySince = at;
			}
		}
	}

	leaveAllPages(at) {
		if (this.pages.size === 0) {
			return;
		}

		this.addActiveTime(at);
		this.lastActivityAt = null;

		if (this.session) {
			this.session.awaySince = at;
		}
	}

	recordActivity(pageId, at) {
		if (!this.pages.has(pageId)) {
			return;
		}

		if (!this.session) {
			this.session = {
				startTime: at,
				activeStudyTime: 0,
				awaySince: null
			};
		} else if (this.session.awaySince !== null) {
			if (at - this.session.awaySince >= SESSION_TIMEOUT_MS) {
				this.session = {
					startTime: at,
					activeStudyTime: 0,
					awaySince: null
				};
			} else {
				this.session.awaySince = null;
			}
		}

		this.addActiveTime(at);
		this.lastActivityAt = at;
	}

	update(at) {
		if (this.lastActivityAt !== null && at - this.lastActivityAt >= ACTIVE_TIMEOUT_MS) {
			this.addActiveTime(this.lastActivityAt + ACTIVE_TIMEOUT_MS);
			this.lastActivityAt = null;
		}

		if (this.session && this.session.awaySince !== null &&
			at - this.session.awaySince >= SESSION_TIMEOUT_MS) {
			this.session = null;
			this.lastActivityAt = null;
		}
	}

	getState() {
		return this.session ? { ...this.session } : null;
	}

	addActiveTime(at) {
		if (!this.session || this.lastActivityAt === null) {
			return;
		}

		this.session.activeStudyTime += Math.min(at - this.lastActivityAt, ACTIVE_TIMEOUT_MS);
	}
}

globalThis.StudyEngine = StudyEngine;