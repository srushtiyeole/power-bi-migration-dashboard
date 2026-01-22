import os

# १. तुमचा मुख्य PBIP फोल्डर पाथ
target_folder = r"C:\Users\91932\Downloads\a\Synapse 01 (Self-Serve).SemanticModel"
# २. नावाचा फक्त एक भाग शोधा (जो नक्की असेलच)
search_string = 'synapse-01' 
new_string = 'dummy_server'

def run_task_1():
    print(f"Searching for '{search_string}' in {target_folder}...")
    count = 0
    
    for root, dirs, files in os.walk(target_folder):
        for file in files:
            # PBIP मधील महत्त्वाच्या फाइल्स
            if file.endswith((".tmdl", ".pbir", ".json", ".bim", ".pbit")):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Case-insensitive शोध घेण्यासाठी .lower() वापरूया
                    if search_string.lower() in content.lower():
                        # मूळ मजकूर बदलणे
                        import re
                        insensitive_replace = re.compile(re.escape(search_string), re.IGNORECASE)
                        new_content = insensitive_replace.sub(new_string, content)
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"✅ Updated: {file}")
                        count += 1
                except Exception as e:
                    print(f"Could not read {file}: {e}")

    print(f"--- Task 1 Finished. Total {count} files updated. ---")

if __name__ == "__main__":
    run_task_1()