import * as vscode from "vscode"
import { Highlighter } from "./highlighter"

export class Controller {
	private highlighter: Highlighter
	private _disposable: vscode.Disposable

	constructor(highlighter: Highlighter) {
		this.highlighter = highlighter

		const subscriptions: vscode.Disposable[] = []
		vscode.window.onDidChangeTextEditorSelection(
			this._onEvent,
			this,
			subscriptions
		)
		vscode.window.onDidChangeActiveTextEditor(
			this._onChangeEditor,
			this,
			subscriptions
		)
		vscode.workspace.onDidChangeConfiguration(
			this._onUpdateSettings,
			this,
			subscriptions
		)

		this._onEvent()

		this._disposable = vscode.Disposable.from.apply(
			vscode.Disposable,
			subscriptions
		)

		this.highlighter.updateConfig()
		this.highlighter.onChange()
	}

	dispose(): void {
		this._disposable.dispose()
	}

	private _onUpdateSettings(
		configuration: vscode.ConfigurationChangeEvent
	): void {
		if (configuration.affectsConfiguration("scope-highlighter")) {
			this.highlighter.updateConfig()
		}
	}

	private _onChangeEditor(): void {
		this.highlighter.updateConfig()
		this.highlighter.onChange()
	}

	private _onEvent(e?: vscode.TextEditorSelectionChangeEvent): void {
		if (e && e.textEditor === vscode.window.activeTextEditor) {
			this.highlighter.onChange()
		}
	}
}
