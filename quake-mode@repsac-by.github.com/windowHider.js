'use strict';

/* exported WindowHider */

const Workspace = imports.ui.workspace.Workspace;
const WorkspaceThumbnail = imports.ui.workspaceThumbnail.WorkspaceThumbnail;


var WindowHider = class {
	constructor(win) {

		this.__workspace_isOverviewWindow =
			Workspace.prototype._isOverviewWindow;
		Workspace.prototype._isOverviewWindow = window => {
			return !window.skip_taskbar && window != win;
		};

		this.__workspaceThumbnail_isOverviewWindow =
			WorkspaceThumbnail.prototype._isOverviewWindow;
		WorkspaceThumbnail.prototype._isOverviewWindow = window => {
			return !window.get_meta_window().skip_taskbar &&
				window.get_meta_window().showing_on_its_workspace() &&
				window.get_meta_window() != win;
		};

	}

	destroy() {
		Workspace.prototype._isOverviewWindow =
			this.__workspace_isOverviewWindow;
		WorkspaceThumbnail.prototype._isOverviewWindow =
			this.__workspaceThumbnail_isOverviewWindow;
	}
};
