import * as vscode from "vscode"
import { Highlighter } from "./highlighter"
import { Controller } from "./controller"

export function activate(context: vscode.ExtensionContext) {
	const highligher = new Highlighter()
	const controller = new Controller(highligher)

	context.subscriptions.push(highligher)
	context.subscriptions.push(controller)
}
