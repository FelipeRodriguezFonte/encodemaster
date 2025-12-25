# EncodeMaster

Master encoder/decoder for binary, hexadecimal and base64 formats - both complete files and text selections.

## Usage

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type the command you need:

### File Commands

Convert entire files:
- **EncodeMaster: File to Hexadecimal** - Read binary file and display as hex
- **EncodeMaster: File to Base64** - Read binary file and display as base64
- **EncodeMaster: File to Hexdump (xxd style)** - Display file in hexdump format with ASCII
- **EncodeMaster: Hexadecimal to File** - Convert hex to binary file
- **EncodeMaster: Hexadecimal to Base64** - Convert hex to base64
- **EncodeMaster: Base64 to File** - Convert base64 to binary file
- **EncodeMaster: Base64 to Hexadecimal** - Convert base64 to hex

### Selection Commands

Convert selected text in-place:
- **EncodeMaster: Selection to Hexadecimal** - Text → Hex
- **EncodeMaster: Selection to Base64** - Text → Base64
- **EncodeMaster: Hexadecimal to Text** - Hex → Text
- **EncodeMaster: Hexadecimal to Base64** - Hex → Base64
- **EncodeMaster: Base64 to Text** - Base64 → Text
- **EncodeMaster: Base64 to Hexadecimal** - Base64 → Hex

## Examples

**Convert text to hexadecimal:**
1. Select: `Hello World`
2. Run: `EncodeMaster: Selection to Hexadecimal`
3. Result: `48656C6C6F20576F726C64`

**Decode base64:**
1. Select: `SGVsbG8gV29ybGQ=`
2. Run: `EncodeMaster: Base64 to Text`
3. Result: `Hello World`

**Convert file to hex:**
1. Open any binary/text file
2. Run: `EncodeMaster: File to Hexadecimal`
3. New tab opens with hex content

**Hexdump for debugging:**
1. Open any file
2. Run: `EncodeMaster: File to Hexdump (xxd style)`
3. Output format:
   ```
   00000000: 4865 6c6c 6f20 576f 726c 640a       Hello World.
   ```

## Features

- Works with saved and unsaved files (including Untitled documents)
- Works with binary files (images, executables, etc.)
- Works with text files (UTF-8 encoded)
- Hexadecimal output in uppercase without spaces
- Hexdump format (xxd style) for debugging and analysis
- Selection commands replace text in-place
- File commands open new tabs or save dialogs

## Author

**Felipe Rodríguez Fonte**
**Contact: felipe.rodriguez.fonte@gmail.com**


## License

MIT