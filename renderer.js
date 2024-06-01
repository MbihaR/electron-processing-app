document.addEventListener('DOMContentLoaded', async () => {
  // Create CodeMirror editor
  const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: 'javascript'
  });

  
  // Get ShareDB client objects
  try {
    const { ShareDB, StringBinding, ReconnectingWebSocket } = await window.electron.getSharedbClient();
    console.log('ShareDB', ShareDB);
    // Create WebSocket connection to ShareDB server
     const socket = new window.ReconnectingWebSocket('ws://localhost:9090');
      console.log('socket', socket);
      const connection = new ShareDB.Connection(socket);
      console.log('connection', connection);
    // Get the 'collab-editor' document
    const doc = connection.get('examples', 'collab-editor');

    // Subscribe to the document
    doc.subscribe((err) => {
      if (err) throw err;

      // If document is missing, create it with an empty string
      if (doc.type === null) {
        doc.create('', (err) => {
          if (err) throw err;
          setupBinding();
        });
      } else {
        setupBinding();
      }
    });

    // Setup binding between CodeMirror and ShareDB
    function setupBinding() {
      const binding = new StringBinding(editor, doc, ['content']);
      binding.setup();
    }

    // Add event listener for the run button
    document.getElementById('run').addEventListener('click', async () => {
      const code = editor.getValue();
      try {
        const sketchDir = await window.electron.path.join('C:\\Users\\mbiha\\Downloads\\electron-processing-app\\sketch');
        const sketchPath = await window.electron.path.join(sketchDir, 'sketch.pde');
        const processingPath = await window.electron.path.join('C:\\Users\\mbiha\\Downloads\\processing-4.3', 'processing-java');

        console.log('Run button clicked');
        console.log('Code to write:', code);
        console.log('Sketch directory path:', sketchDir);
        console.log('Sketch file path:', sketchPath);
        console.log('Processing path:', processingPath);

        // Save the code to a file
        await window.electron.fs.writeFileSync(sketchPath, code);
        console.log('Writing code to sketch.pde');

        // Run the Processing sketch
        console.log('Executing processing-java');
        const result = await window.electron.exec(`${processingPath} --sketch=${sketchDir} --run`);
        document.getElementById('output').innerText = `Output: ${result}`;
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = `Error: ${error}`;
      }
    });
  } catch (e) {
    console.error('Error during initialization:', e);
  }
});