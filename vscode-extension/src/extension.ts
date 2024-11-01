import * as vscode from "vscode"

const format = async (text: string) => {
	// todo: somehow get ESM working
	const { execa } = await import("execa")

	const command = execa("scadformat")
	command.stdin.write(text)
	command.stdin.end()

	const { stdout } = await command
	return stdout
}

export function activate(context: vscode.ExtensionContext) {
	const formatter = vscode.languages.registerDocumentFormattingEditProvider("scad", {
		provideDocumentFormattingEdits: async (
			document: vscode.TextDocument,
		): Promise<vscode.TextEdit[]> => {
			try {
				const inputText = document.getText()
				const formatted = await format(inputText)

				return [
					new vscode.TextEdit(new vscode.Range(0, 0, document.lineCount, 0), formatted),
				]
			} catch (error) {
				console.error(error)

				if (error instanceof Error) {
					vscode.window.showErrorMessage(`Failed to format document\n\n${error.message}`)
				} else {
					vscode.window.showErrorMessage("Failed to format document")
				}

				return []
			}
		},
	})

	context.subscriptions.push(formatter)
}

export function deactivate() {}
