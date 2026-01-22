import os
import re
import csv

# १. तुमच्या फोल्डरचा अचूक पत्ता इथे टाका
base_path = r"C:\Users\91932\Downloads\a"
tables_path = os.path.join(base_path, "Synapse 01 (Self-Serve).SemanticModel", "definition", "tables")
output_csv = os.path.join(base_path, "Synapse_Migration_Report.csv")

def create_final_csv():
    if not os.path.exists(tables_path):
        print(f"❌ एरर: फोल्डर सापडले नाही: {tables_path}")
        return

    extracted_data = []
    
    # २. सर्व TMDL फाईल्स तपासणे
    for file_name in os.listdir(tables_path):
        if file_name.endswith(".tmdl"):
            with open(os.path.join(tables_path, file_name), 'r', encoding='utf-8') as f:
                content = f.read()
                
                # कनेक्शन आणि क्वेरी शोधणे (तुमच्या फाईलमधील फॉरमॅटनुसार)
                conn = re.search(r'Sql\.Database\("(.*?)",\s*"(.*?)"', content)
                query = re.search(r'\[Query\s*=\s*"(.*?)"', content, re.DOTALL)
                
                if conn or query:
                    server = conn.group(1) if conn else "N/A"
                    db = conn.group(2) if conn else "N/A"
                    # क्वेरीमधील #(lf) काढून टाकणे
                    clean_sql = query.group(1).replace("#(lf)", " ").replace("\n", " ").strip() if query else "N/A"
                    
                    extracted_data.append({
                        "Table Name": file_name.replace(".tmdl", ""),
                        "Server": server,
                        "Database": db,
                        "SQL Query": clean_sql
                    })

    # ३. CSV फाईल लिहिणे
    if extracted_data:
        headers = ["Table Name", "Server", "Database", "SQL Query"]
        with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=headers)
            writer.writeheader()
            writer.writerows(extracted_data)
        
        print(f"✅ यश! CSV फाईल इथे तयार झाली आहे: {output_csv}")
    else:
        print("⚠️ कोणतीही माहिती सापडली नाही.")

if __name__ == "__main__":
    create_final_csv()