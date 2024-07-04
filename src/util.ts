import * as vscode from "vscode"
import { HighlighterMode, MatchingBracket } from "./types"

let openingBrackets = ""
let closingBrackets = ""

function updateConfig() {
	const activeEditor = vscode.window.activeTextEditor

	if (activeEditor) {
		openingBrackets = "({["
		closingBrackets = ")}]"
	}
}

function isMatchingBracket(open: string, close: string) {
	switch (open) {
		case "(":
			return close === ")"
		case "{":
			return close === "}"
		case "[":
			return close === "]"
		default:
			return false
	}
}

function isOpenBracket(char: string) {
	return openingBrackets.includes(char)
}

function isCloseBracket(char: string) {
	return closingBrackets.includes(char)
}

// Finds to the left the nearest open bracket using a stack.
// Starting from the cursor position (index) to the beginning of the (text)
function findLeftBracket(text: string, index: number): MatchingBracket {
	const bracketStack = []
	let offset = 0
	let bracket = ""

	for (let i = index; i >= 0; i--) {
		let char = text.charAt(i)
		if (isOpenBracket(char)) {
			if (bracketStack.length === 0) {
				bracket = char
				offset = i
				break
			} else {
				let top = bracketStack.pop()!
				if (!isMatchingBracket(char, top)) {
					throw "Unmatched bracket pair"
				}
			}
		} else if (isCloseBracket(char)) {
			bracketStack.push(char)
		}
	}

	return { bracket, offset }
}

// Finds to the right the nearest open bracket using a stack.
// Starting from the cursor position (index) to the end of the (text)
function findRightBracket(text: string, index: number): MatchingBracket {
	const bracketStack = []
	let offset = text.length
	let bracket = ""
	for (let i = index; i < text.length; i++) {
		let char = text.charAt(i)
		if (isCloseBracket(char)) {
			if (bracketStack.length === 0) {
				offset = i
				bracket = char
				break
			} else {
				let top = bracketStack.pop()!
				if (!isMatchingBracket(top, char)) {
					throw "Unmatched bracket pair"
				}
			}
		} else if (isOpenBracket(char)) {
			bracketStack.push(char)
		}
	}

	return { bracket, offset }
}

function shouldHighlight(
	highlighterMode: HighlighterMode,
	offset: number,
	leftMatchingBracket: { offset: number; bracket: string },
	rightMatchingBracket: { offset: number; bracket: string }
): boolean {
	switch (highlighterMode) {
		// highlight only when the cursor is next to the matching bracket
		case HighlighterMode.Near:
			return (
				offset === leftMatchingBracket.offset ||
				offset === rightMatchingBracket.offset + 1
			)
		case HighlighterMode.Always:
			return true
		case HighlighterMode.Never:
			return false
		default:
			return false // fallback for any unexpected values
	}
}

function setRangeStyle() {
	return vscode.window.createTextEditorDecorationType({
		light: {
			backgroundColor: "#4d4d4d30"
		},
		dark: {
			backgroundColor:
				vscode.workspace.getConfiguration("scope-highlighter").scopeColor,
		},
	})
}

function setEndStyle() {
	return vscode.window.createTextEditorDecorationType({
		light: {
			backgroundColor: "#4d4d4d30"
		},
		dark: {
			backgroundColor:
				vscode.workspace.getConfiguration("scope-highlighter").bracketColor,
		},
	})
}

export default {
	updateConfig,
	isMatchingBracket,
	isOpenBracket,
	isCloseBracket,
	findLeftBracket,
	findRightBracket,
	shouldHighlight,
	setRangeStyle,
	setEndStyle,
}
