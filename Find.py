import os

target_folder = r'C:\Users\91932\Downloads\a\Synapse 01 (Self-Serve).pbip\Synapse 01 (Self-Serve).SemanticModel'

print("--- Searching for any Source lines ---")
for root, dirs, files in os.walk(target_folder):
    for file in files:
        if file.endswith(".tmdl"):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if "Source =" in line:
                        print(f"File: {file} -> Content: {line.strip()}")