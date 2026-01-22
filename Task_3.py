import os

# 1. Folder Path
target_folder = r'C:\Users\91932\Downloads\a' # Main folder

# 2. What to look for? (Keep it short to be safe)
search_for = "dummy_server" 
replace_with = "Fabric_Lakehouse"

print(f"--- Searching for '{search_for}' in all subfolders ---")
count = 0

for root, dirs, files in os.walk(target_folder):
    for file in files:
        if file.endswith((".tmdl", ".pbir", ".json")):
            file_path = os.path.join(root, file)
            
            # Use 'utf-16' or 'utf-8' because Power BI uses different encodings
            try:
                with open(file_path, 'r', encoding='utf-16') as f:
                    content = f.read()
            except:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

            if search_for in content:
                new_content = content.replace(search_for, replace_with)
                
                # Write it back
                try:
                    with open(file_path, 'w', encoding='utf-16') as f:
                        f.write(new_content)
                except:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                        
                print(f"✅ FOUND & CHANGED in: {file}")
                count += 1

print(f"--- Task 3 Done! Total files updated: {count} ---")