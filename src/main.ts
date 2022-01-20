import * as vscode from 'vscode';
import { GroupConfig } from './types/types';
import { getTextFromSelection } from './utils/helpers/editorHelpers';
import { getImportModuleList, groupImports } from './utils/helpers/importModuleHelpers';
import { getOrderedImportModuleList } from './utils/helpers/sortHelpers';
import { ImportModule } from './utils/instances/ImportModule';

function main() {
	const settings = vscode.workspace.getConfiguration('sortImportsByPath');
	const groups = settings.get('groups') as GroupConfig | null;
	const { activeTextEditor } = vscode.window;
	let selectedStrings: string;
	let importModules: ImportModule[];
	let orderedImportModuleList: ImportModule[];
	let orderedPlainText: string;

	try {
		if (activeTextEditor && activeTextEditor.document) {
			selectedStrings = activeTextEditor.selections.map(getTextFromSelection).join('');
			importModules = getImportModuleList(selectedStrings);
			orderedImportModuleList = getOrderedImportModuleList(importModules, groups);
			orderedPlainText = orderedImportModuleList.map(item => item.line).join('\n');
	
			activeTextEditor.edit(editBuilder => {
				activeTextEditor.selections.forEach(selection => {
					editBuilder.replace(selection, orderedPlainText);
				});
			});
		}
	} catch (err) {
		vscode.window.showErrorMessage('Something went wrong. Please open an issue with the imports you are trying to sort along with the groups if there is any');
	}
	
}

export default main;