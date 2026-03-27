export const chatAbortManager = {
	controller: null as null | AbortController,

	set(ctrl: AbortController) {
		this.controller = ctrl;
	},

	abort() {
		if (this.controller) {
			this.controller.abort();
			this.controller = null;
		}
	},
};
