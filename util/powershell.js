import { spawn } from "child_process";

async function runPowerShellScript(scriptPath) {
  try {
    const child = spawn("powershell.exe", [
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath,
    ]);

    child.stdout.on("data", (data) => {
      console.log(`PowerShell output: ${data.toString()}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`PowerShell error: ${data.toString()}`);
    });

    child.on("close", (code) => {
      console.log(`PowerShell script exited with code: ${code}`);
    });
  } catch (error) {
    console.error(`Error running PowerShell script: ${error}`);
  }
}

// Example usage (assuming this code is in a separate ESM file):
export default runPowerShellScript; // Export the function for use in other modules
