import { commands, ExtensionContext, window } from 'vscode';
import main from './main';

export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('sort-imports-by-path.sortImportsByPath', () => {
		try {
			main();
		} catch (err) {
			console.log(err);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}