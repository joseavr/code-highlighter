export interface MatchingBracket {
	bracket: string
	offset: number
}

export enum HighlighterMode {
	Near = "near",
	Always = "always",
	Never = "never",
}

export type BracketStringType = "parentheses" | "braces" | "squareBrackets"
