import * as vscode from 'vscode';

export function getTextFromSelection(selection: vscode.Selection): string {
	const { activeTextEditor } = vscode.window;
	const { start, end } = selection;

	return activeTextEditor!.document.getText(new vscode.Range(start, end));
}