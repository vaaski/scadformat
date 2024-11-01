"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropertyDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropertyNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProperty = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProperties = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropertyNames(from))
      if (!__hasOwnProperty.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropertyDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (module_, isNodeMode, target) => (target = module_ == undefined ? {} : __create(__getProtoOf(module_)), __copyProperties(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !module_ || !module_.__esModule ? __defProp(target, "default", { value: module_, enumerable: true }) : target,
  module_
));
var __toCommonJS = (module_) => __copyProperties(__defProp({}, "__esModule", { value: true }), module_);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
function activate(context) {
  console.log('Congratulations, your extension "scadformat" is now active!');
  const disposable = vscode.commands.registerCommand("scadformat.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from scadformat!");
  });
  context.subscriptions.push(disposable);
}
function deactivate() {}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
