import pandas as pd

# Define the dummy metadata for the 4 tasks
# This data represents the transition from Databricks to Microsoft Fabric
data = [
    {
        'Type': 'Table',
        'Name': 'All Suspended',
        'Before': 'DirectQuery',
        'After': 'DirectQuery',
        'Before_Source': 'Databricks',
        'Before_Conn': 'Databricks.Contents',
        'After_Source': 'Microsoft Fabric',
        'After_Conn': 'Lakehouse.Contents',
        'Notes': 'Partition source migration',
        'File_Name': 'tables/All Suspended.tmdl',
        'Connection_Type': 'Lakehouse.Contents',
        'Server': 'dummy_server_url.pbidedicated.windows.net',
        'Database_Name': 'dummy_fabric_lakehouse',
        'Connection_String': 'https://api.fabric.microsoft.com',
        'M_Query_Preview': 'let\n    Source = Lakehouse.Contents("https://api.fabric.microsoft.com", [WorkspaceId="dummy_id", LakehouseId="dummy_id"])\nin\n    Source'
    },
    {
        'Type': 'Table',
        'Name': 'All_Running',
        'Before': 'DirectQuery',
        'After': 'DirectQuery',
        'Before_Source': 'Databricks',
        'Before_Conn': 'Databricks.Contents',
        'After_Source': 'Microsoft Fabric',
        'After_Conn': 'Lakehouse.Contents',
        'Notes': 'Partition source migration',
        'File_Name': 'tables/All_Running.tmdl',
        'Connection_Type': 'Lakehouse.Contents',
        'Server': 'dummy_server_url.pbidedicated.windows.net',
        'Database_Name': 'dummy_fabric_lakehouse',
        'Connection_String': 'https://api.fabric.microsoft.com',
        'M_Query_Preview': 'let\n    Source = Lakehouse.Contents("https://api.fabric.microsoft.com", [WorkspaceId="dummy_id", LakehouseId="dummy_id"])\nin\n    Source'
    },
    {
        'Type': 'Table',
        'Name': 'OpenSessions',
        'Before': 'DirectQuery',
        'After': 'DirectQuery',
        'Before_Source': 'Databricks',
        'Before_Conn': 'Databricks.Contents',
        'After_Source': 'Microsoft Fabric',
        'After_Conn': 'Lakehouse.Contents',
        'Notes': 'Partition source migration',
        'File_Name': 'tables/OpenSessions.tmdl',
        'Connection_Type': 'Lakehouse.Contents',
        'Server': 'dummy_server_url.pbidedicated.windows.net',
        'Database_Name': 'dummy_fabric_lakehouse',
        'Connection_String': 'https://api.fabric.microsoft.com',
        'M_Query_Preview': 'let\n    Source = Lakehouse.Contents("https://api.fabric.microsoft.com", [WorkspaceId="dummy_id", LakehouseId="dummy_id"])\nin\n    Source'
    },
    {
        'Type': 'Table',
        'Name': 'request_steps',
        'Before': 'DirectQuery',
        'After': 'DirectQuery',
        'Before_Source': 'Databricks',
        'Before_Conn': 'Databricks.Contents',
        'After_Source': 'Microsoft Fabric',
        'After_Conn': 'Lakehouse.Contents',
        'Notes': 'Partition source migration',
        'File_Name': 'tables/request_steps.tmdl',
        'Connection_Type': 'Lakehouse.Contents',
        'Server': 'dummy_server_url.pbidedicated.windows.net',
        'Database_Name': 'dummy_fabric_lakehouse',
        'Connection_String': 'https://api.fabric.microsoft.com',
        'M_Query_Preview': 'let\n    Source = Lakehouse.Contents("https://api.fabric.microsoft.com", [WorkspaceId="dummy_id", LakehouseId="dummy_id"])\nin\n    Source'
    }
]

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
output_file = 'pbip_master_metadata.csv'
df.to_csv(output_file, index=False)

print(f"Success! {output_file} has been created with dummy data.")