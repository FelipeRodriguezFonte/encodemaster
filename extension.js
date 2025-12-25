const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // ==================== FILE COMMANDS ====================
    
    // Complete file to Hexadecimal
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.fileToHex', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            let buffer;
            
            // Check if file is saved or unsaved (Untitled)
            if (editor.document.isUntitled || editor.document.uri.scheme !== 'file') {
                // For unsaved files, get content from editor
                const text = editor.document.getText();
                buffer = Buffer.from(text, 'utf8');
            } else {
                // For saved files, read from disk
                const filePath = editor.document.uri.fsPath;
                buffer = fs.readFileSync(filePath);
            }
            
            const hex = buffer.toString('hex').toUpperCase();
            
            const doc = await vscode.workspace.openTextDocument({
                content: hex,
                language: 'plaintext'
            });
            await vscode.window.showTextDocument(doc);
        })
    );
    
    // Complete file to Base64
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.fileToBase64', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            let buffer;
            
            // Check if file is saved or unsaved (Untitled)
            if (editor.document.isUntitled || editor.document.uri.scheme !== 'file') {
                // For unsaved files, get content from editor
                const text = editor.document.getText();
                buffer = Buffer.from(text, 'utf8');
            } else {
                // For saved files, read from disk
                const filePath = editor.document.uri.fsPath;
                buffer = fs.readFileSync(filePath);
            }
            
            const base64 = buffer.toString('base64');
            
            const doc = await vscode.workspace.openTextDocument({
                content: base64,
                language: 'plaintext'
            });
            await vscode.window.showTextDocument(doc);
        })
    );
    
    // Hexadecimal to Binary (file)
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.hexToFile', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            try {
                const hex = editor.document.getText().replace(/\s+/g, '');
                const buffer = Buffer.from(hex, 'hex');
                
                const uri = await vscode.window.showSaveDialog({
                    defaultUri: vscode.Uri.file('output.bin')
                });
                
                if (uri) {
                    fs.writeFileSync(uri.fsPath, buffer);
                    vscode.window.showInformationMessage('File saved successfully');
                }
            } catch (error) {
                vscode.window.showErrorMessage('Error: ' + error.message);
            }
        })
    );
    
    // Hexadecimal to Base64 (file)
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.hexToBase64File', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            try {
                const hex = editor.document.getText().replace(/\s+/g, '');
                const buffer = Buffer.from(hex, 'hex');
                const base64 = buffer.toString('base64');
                
                const doc = await vscode.workspace.openTextDocument({
                    content: base64,
                    language: 'plaintext'
                });
                await vscode.window.showTextDocument(doc);
            } catch (error) {
                vscode.window.showErrorMessage('Error: ' + error.message);
            }
        })
    );
    
    // Base64 to Binary (file)
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.base64ToFile', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            try {
                const base64 = editor.document.getText().replace(/\s+/g, '');
                const buffer = Buffer.from(base64, 'base64');
                
                const uri = await vscode.window.showSaveDialog({
                    defaultUri: vscode.Uri.file('output.bin')
                });
                
                if (uri) {
                    fs.writeFileSync(uri.fsPath, buffer);
                    vscode.window.showInformationMessage('File saved successfully');
                }
            } catch (error) {
                vscode.window.showErrorMessage('Error: ' + error.message);
            }
        })
    );
    
    // Base64 to Hexadecimal (file)
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.base64ToHexFile', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            try {
                const base64 = editor.document.getText().replace(/\s+/g, '');
                const buffer = Buffer.from(base64, 'base64');
                const hex = buffer.toString('hex').toUpperCase();
                
                const doc = await vscode.workspace.openTextDocument({
                    content: hex,
                    language: 'plaintext'
                });
                await vscode.window.showTextDocument(doc);
            } catch (error) {
                vscode.window.showErrorMessage('Error: ' + error.message);
            }
        })
    );
    
    // File to Hexdump (xxd style)
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.fileToHexdump', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            let buffer;
            
            // Check if file is saved or unsaved (Untitled)
            if (editor.document.isUntitled || editor.document.uri.scheme !== 'file') {
                const text = editor.document.getText();
                buffer = Buffer.from(text, 'utf8');
            } else {
                const filePath = editor.document.uri.fsPath;
                buffer = fs.readFileSync(filePath);
            }
            
            // Generate hexdump output (xxd style)
            let hexdump = '';
            const bytesPerLine = 16;
            
            for (let i = 0; i < buffer.length; i += bytesPerLine) {
                // Offset
                const offset = i.toString(16).padStart(8, '0');
                hexdump += offset + ': ';
                
                // Hex bytes (in groups of 2)
                const lineBytes = buffer.slice(i, i + bytesPerLine);
                for (let j = 0; j < bytesPerLine; j++) {
                    if (j < lineBytes.length) {
                        hexdump += lineBytes[j].toString(16).padStart(2, '0');
                    } else {
                        hexdump += '  ';
                    }
                    hexdump += (j % 2 === 1) ? ' ' : '';
                }
                
                // ASCII representation
                hexdump += ' ';
                for (let j = 0; j < lineBytes.length; j++) {
                    const byte = lineBytes[j];
                    hexdump += (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : '.';
                }
                
                hexdump += '\n';
            }
            
            const doc = await vscode.workspace.openTextDocument({
                content: hexdump,
                language: 'plaintext'
            });
            await vscode.window.showTextDocument(doc);
        })
    );
    
    // ==================== SELECTION COMMANDS ====================
    
    // Selection: Text to Hexadecimal
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.selectionToHex', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (!text) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            const buffer = Buffer.from(text, 'utf8');
            const hex = buffer.toString('hex').toUpperCase();
            
            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        })
    );
    
    // Selection: Text to Base64
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.selectionToBase64', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (!text) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            const buffer = Buffer.from(text, 'utf8');
            const base64 = buffer.toString('base64');
            
            editor.edit(editBuilder => {
                editBuilder.replace(selection, base64);
            });
        })
    );
    
    // Selection: Hexadecimal to Text
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.hexToText', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const hex = editor.document.getText(selection).replace(/\s+/g, '');
            
            if (!hex) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            try {
                const buffer = Buffer.from(hex, 'hex');
                const text = buffer.toString('utf8');
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, text);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Error: Invalid hexadecimal');
            }
        })
    );
    
    // Selection: Hexadecimal to Base64
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.hexToBase64', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const hex = editor.document.getText(selection).replace(/\s+/g, '');
            
            if (!hex) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            try {
                const buffer = Buffer.from(hex, 'hex');
                const base64 = buffer.toString('base64');
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, base64);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Error: Invalid hexadecimal');
            }
        })
    );
    
    // Selection: Base64 to Text
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.base64ToText', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const base64 = editor.document.getText(selection).replace(/\s+/g, '');
            
            if (!base64) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            try {
                const buffer = Buffer.from(base64, 'base64');
                const text = buffer.toString('utf8');
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, text);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Error: Invalid Base64');
            }
        })
    );
    
    // Selection: Base64 to Hexadecimal
    context.subscriptions.push(
        vscode.commands.registerCommand('encodemaster.base64ToHex', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.selection;
            const base64 = editor.document.getText(selection).replace(/\s+/g, '');
            
            if (!base64) {
                vscode.window.showWarningMessage('No text selected');
                return;
            }
            
            try {
                const buffer = Buffer.from(base64, 'base64');
                const hex = buffer.toString('hex').toUpperCase();
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, hex);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Error: Invalid Base64');
            }
        })
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};