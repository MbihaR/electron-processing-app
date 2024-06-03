# Collaborative Code Editor

## Overview

This project is a collaborative code editor built using Electron, CodeMirror, ShareDB, and Node.js. It allows multiple users to edit the same code document in real-time, providing features such as syntax highlighting, user presence indicators, and conflict resolution. The primary goal is to create an intuitive and efficient environment for collaborative coding.

## Technologies Used

### Electron
Electron is used to build cross-platform desktop applications with JavaScript, HTML, and CSS. It enables the creation of a desktop app that runs on Windows, macOS, and Linux while leveraging web technologies.

### CodeMirror
CodeMirror is a versatile text editor implemented in JavaScript for the browser. It provides powerful features for code editing, including syntax highlighting for multiple programming languages, and is highly customizable.

### ShareDB
ShareDB is a real-time data synchronization engine. It is used to handle the real-time collaboration aspects of the editor, allowing multiple users to work on the same document simultaneously with operational transformation (OT) to manage conflicts.

### Node.js
Node.js is used as the server-side environment to handle backend operations, including the synchronization of documents between clients and server, and file system operations required for running and saving code sketches.

## Features

- **Real-time collaboration:** Multiple users can edit the same document simultaneously.
- **Syntax highlighting:** CodeMirror provides syntax highlighting for a better coding experience.
- **Conflict resolution:** ShareDB handles conflicts using operational transformation.
- **User presence indicators:** See who else is editing the document.
- **Cross-platform:** Runs on Windows, macOS, and Linux.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Electron installed globally
- Processing 4.3 or higher installed

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/collaborative-code-editor.git
    cd collaborative-code-editor
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm run start-server
    ```

4. Start the Electron app:
    ```bash
    npm start
    ```

## Usage

1. **Launching the App:**
   - Run `npm start` from the project directory to launch the Electron application.
   - The app will open with a default editor interface.

2. **Collaborative Editing:**
   - Open multiple instances of the application on different devices or windows.
   - Start typing in the editor; changes will be reflected across all open instances in real-time.

3. **Running a Processing Sketch:**
   - Enter your Processing code in the editor.
   - Click the "Run Sketch" button to save and execute the sketch. The output will be displayed in the designated area.

## Folder Structure

```
collaborative-code-editor/
├── main.js
├── preload.js
├── renderer.js
├── index.html
├── styles.css
├── server.js
├── package.json
└── README.md
```

## Main Files

- **main.js:** Initializes the Electron app and creates the main application window.
- **preload.js:** Handles the context bridge for secure communication between the renderer process and Node.js environment.
- **renderer.js:** Manages the front-end logic and interaction with the DOM.
- **index.html:** The main HTML file for the editor interface.
- **server.js:** Backend server handling real-time collaboration and document synchronization.
- **styles.css:** Contains the styling for the editor interface.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Electron](https://www.electronjs.org/)
- [CodeMirror](https://codemirror.net/)
- [ShareDB](https://share.github.io/sharedb/)
- [Node.js](https://nodejs.org/)

This README file provides an overview of the project, including its purpose, the technologies used, how to install and run it, and information on contributing. It is designed to help new developers get up to speed quickly and understand the project's structure and requirements.
