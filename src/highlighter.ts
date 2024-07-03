import * as vscode from "vscode"
import util from "./util"
import { HighlighterMode, MatchingBracket } from "./types"

class Highlighter {
	scoperRangeDecorationType: vscode.TextEditorDecorationType
	scoperEndDecorationType: vscode.TextEditorDecorationType
	userConfigHighlightingMode: HighlighterMode

	constructor() {
		this.scoperRangeDecorationType = util.setRangeStyle()
		this.scoperEndDecorationType = util.setEndStyle()
		this.userConfigHighlightingMode = vscode.workspace
			.getConfiguration("scope-highlighter")
			.get<HighlighterMode>("matchBrackets", HighlighterMode.Near)
	}

	updateConfig() {
		if (vscode.window.activeTextEditor) {
			vscode.window.activeTextEditor.setDecorations(
				this.scoperRangeDecorationType,
				[]
			)
			vscode.window.activeTextEditor.setDecorations(
				this.scoperEndDecorationType,
				[]
			)
		}
		this.scoperRangeDecorationType.dispose()
		this.scoperEndDecorationType.dispose()

		this.scoperRangeDecorationType = util.setRangeStyle()
		this.scoperEndDecorationType = util.setEndStyle()

		util.updateConfig()
	}

	onChange() {
		this.scoperRangeDecorationType.dispose()
		this.scoperEndDecorationType.dispose()

		this.scoperRangeDecorationType = util.setRangeStyle()
		this.scoperEndDecorationType = util.setEndStyle()

		const editor = vscode.window.activeTextEditor

		if (!editor) {
			return
		}

		const offset = editor.document.offsetAt(editor.selection.active)
		const text = editor.document.getText()

		let backwardResult: MatchingBracket
		let forwardResult: MatchingBracket

		// ^: cursor position
		// (...)
		//      ^
		if (util.isCloseBracket(text.charAt(offset - 1))) {
			backwardResult = util.findLeftBracket(text, offset - 2)
			forwardResult = util.findRightBracket(text, offset - 1)
		}

		//  (...)
		//  ^
		else if (util.isOpenBracket(text.charAt(offset))) {
			backwardResult = util.findLeftBracket(text, offset)
			forwardResult = util.findRightBracket(text, offset + 1)
		}

		// (.)
		//	 ^
		else {
			backwardResult = util.findLeftBracket(text, offset - 1)
			forwardResult = util.findRightBracket(text, offset)
		}

		const shouldHighlight = util.shouldHighlight(
			this.userConfigHighlightingMode,
			offset,
			backwardResult,
			forwardResult
		)

		// set up the decoratiosn to highlight the scope and matching brackets
		if (
			util.isMatchingBracket(backwardResult.bracket, forwardResult.bracket) &&
			shouldHighlight
		) {
			let start =
				backwardResult.offset < text.length
					? backwardResult.offset + 1
					: backwardResult.offset
			let end = forwardResult.offset

			const start_decoration = new vscode.Range(
				editor.document.positionAt(start - 1),
				editor.document.positionAt(start)
			)
			const range_decoration = new vscode.Range(
				editor.document.positionAt(start),
				editor.document.positionAt(end)
			)
			const end_decoration = new vscode.Range(
				editor.document.positionAt(end),
				editor.document.positionAt(end + 1)
			)

			var rangeDecorations = []
			var endDecorations = []

			rangeDecorations.push(range_decoration)
			editor.setDecorations(this.scoperRangeDecorationType, rangeDecorations)

			endDecorations.push(start_decoration)
			endDecorations.push(end_decoration)
			editor.setDecorations(this.scoperEndDecorationType, endDecorations)
		}
	}

	dispose(): void {
		this.scoperRangeDecorationType.dispose()
		this.scoperEndDecorationType.dispose()
	}
}

const highlighter = new Highlighter()
export { highlighter, Highlighter }
