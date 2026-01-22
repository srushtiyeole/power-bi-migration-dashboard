import pandas as pd

# 1. Load the original extracted CSV file
input_file = 'Synapse_Migration_Report.csv'
df = pd.read_csv(input_file)

# 2. Replace real values with dummy text for security/anonymization
# Replacing Server, Database, and Table names
df['Server'] = 'dummy_server.database.windows.net'
df['Database'] = 'dummy_database'
df['Table Name'] = 'dummy_table'

# 3. Clean and replace server names inside the SQL Queries as well
# This ensures no real server names are left in the query strings
df['SQL Query'] = df['SQL Query'].str.replace('dta-eun-prod-sqlsrv-synapse-01', 'dummy_server', case=False)

# 4. Save the modified data to a new dummy CSV file
output_file = 'Synapse_Migration_Dummy_Report.csv'
df.to_csv(output_file, index=False)

print(f"✅ Success! The anonymized file has been created: {output_file}")