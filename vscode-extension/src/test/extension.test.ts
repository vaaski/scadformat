import * as assert from "node:assert"
import { readFile } from "node:fs/promises"
import path from "node:path"

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode"
import * as scadformat from "../extension"

const testdataFolder = path.join(
	// eslint-disable-next-line unicorn/prefer-module
	__dirname,
	"../../../",
	"internal/formatter/testdata",
)
const loadTestdataFile = async (filePath: string) => {
	return await readFile(path.join(testdataFolder, filePath), "utf8")
}

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.")

	test("Sample test", async () => {
		// todo: automatically run tests on all the files in testdata
		const input = await loadTestdataFile("valid/if-statements.scad")
		const expected = await loadTestdataFile("expected/if-statements.scad")

		assert.notStrictEqual(input, expected)

		const formatted = await scadformat.format(input)

		// todo: investigate whats going on with the trailing newline
		assert.strictEqual(formatted.trim(), expected.trim())
	})
})
