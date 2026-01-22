const { spawn } = require('child_process');
const path = require('path');

// 1. Path to your Python executable
const pythonExe = "C:/Python313/python.exe";

// 2. Path to the Task 1 script you just ran
const scriptPath = path.join(__dirname, "Task_1.py");

console.log("Node.js: Starting the Python Task...");

// 3. Spawning the Python process
const pythonProcess = spawn(pythonExe, [scriptPath]);

// 4. Capture output from Python
pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data.toString()}`);
});

// 5. Capture errors if any
pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data.toString()}`);
});

// 6. When the script finishes
pythonProcess.on('close', (code) => {
    console.log(`Node.js: Python script finished with code ${code}`);
    if(code === 0) {
        console.log("✅ Task 2 Successful: Python was triggered by Node.js!");
    }
});