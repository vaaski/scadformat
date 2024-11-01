import path from "node:path"
import os from "node:os"
import * as vscode from "vscode"

const getBinPath = () => {
	const config = vscode.workspace.getConfiguration("scadformat")
	let binPath = config.get<string>("binPath", "scadformat")

	if (binPath.startsWith("~/")) {
		binPath = path.join(os.homedir(), binPath.replace("~/", ""))
	}

	return binPath
}

export const format = async (text: string) => {
	// todo: somehow get ESM working or use native child_process
	const { execa } = await import("execa")

	const binPath = getBinPath()

	const command = execa(binPath)
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
					if (error.message.includes("ENOENT")) {
						vscode.window.showErrorMessage(
							`Failed to format document. Make sure you have "scadformat" in you path or configure the "scadformat.binPath" setting.`,
						)
					} else {
						vscode.window.showErrorMessage(
							`Failed to format document\n\n${error.message}`,
						)
					}
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
