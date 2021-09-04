import { commands, ExtensionContext, Uri } from 'vscode';
import generateIndex from './generate-index';

export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "typescript-indexing" is now active!');

	context.subscriptions.push(
		commands.registerCommand('typescript-indexing.generateIndex', (target: Uri) => {
			generateIndex(target);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
