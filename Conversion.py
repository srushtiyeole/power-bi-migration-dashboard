import subprocess
import os

def force_pbip_conversion():
    # Define your specific file and path
    folder_path = r"C:\Users\91932\Downloads\a"
    file_name = "Synapse 01 (Self-Serve).pbix"
    abs_path = os.path.join(folder_path, file_name)
    
    # The PowerShell command that forces conversion without waiting for 'Ready' state
    ps_command = f'PBIXtoPBIP_PBITConversion -PBIXFilePath "{abs_path}" -ConversionFileType "PBIP"'
    
    print(f"🚀 Forcing conversion for: {file_name}")
    print("⚠️  IMPORTANT: When the 'Cannot load model' error pops up, click 'CLOSE' immediately.")
    
    # Run the command directly
    result = subprocess.run(["powershell", "-Command", ps_command], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Conversion successful! Folder created.")
    else:
        print("❌ Error during conversion:")
        print(result.stderr)

if __name__ == "__main__":
    force_pbip_conversion()