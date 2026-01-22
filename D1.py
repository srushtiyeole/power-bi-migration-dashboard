import pandas as pd
import re

# 1. Load the original CSV file
input_file = 'Synapse_Migration_Report.csv'
df = pd.read_csv(input_file)

# 2. Define the Dummy values
DUMMY_SERVER = "dummy_server.database.windows.net"
DUMMY_DATABASE = "dummy_database"
DUMMY_TABLE = "dummy_table"
DUMMY_SCHEMA = "dummy_schema"

# 3. Define the actual values we want to hide (from your CSV)
REAL_SERVER = "dta-eun-prod-sqlsrv-synapse-01.database.windows.net"
REAL_DATABASE = "dta-eun-prod-datawarehouse-synapse-01"

def anonymize_sql(query):
    """
    This function replaces real names with dummy names inside the SQL strings.
    """
    if pd.isna(query):
        return query
    
    # Replace Server and Database names
    query = query.replace(REAL_SERVER, DUMMY_SERVER)
    query = query.replace(REAL_DATABASE, DUMMY_DATABASE)
    
    # Replace Table names (like 'All Suspended' or 'All_Running')
    # Using a general replacement for common patterns in your file
    query = re.sub(r'sys\.dm_pdw_exec_requests', f'{DUMMY_SCHEMA}.{DUMMY_TABLE}_requests', query, flags=re.IGNORECASE)
    query = re.sub(r'sys\.dm_pdw_exec_sessions', f'{DUMMY_SCHEMA}.{DUMMY_TABLE}_sessions', query, flags=re.IGNORECASE)
    
    return query

# 4. Apply transformations to the columns
df['Table Name'] = DUMMY_TABLE
df['Server'] = DUMMY_SERVER
df['Database'] = DUMMY_DATABASE

# 5. Apply transformation to the SQL Query column
df['SQL Query'] = df['SQL Query'].apply(anonymize_sql)

# 6. Save the final Dummy Report
output_file = 'Synapse_Final_Dummy_Report.csv'
df.to_csv(output_file, index=False)

print(f"✅ Success! Fully anonymized file created: {output_file}")