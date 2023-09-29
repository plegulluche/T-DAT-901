import pandas as pd 
import subprocess
from tqdm import tqdm as TQ
import duckdb as ddb

############################### PANDAS ####################################


# Count lines in the csv file :
def count_lines(file_path):
    num_lines = subprocess.check_output(['wc', '-l', file_path])
    return int(num_lines.split()[0])


file_path = './Liquor_Sales.csv'  # Replace with the actual file path

# Check if the file exists
try:
    with open(file_path, 'r'):
        pass
except FileNotFoundError:
    print(f"Error: File '{file_path}' not found.")
    exit(1)  # Exit the program with an error code

# Print total of lines in the file (TOTAL LINES :  19666764)
total_lines = count_lines(file_path)
print(f"Total lines in the file: {total_lines}")

# Read the first 20 lines
df_head = pd.read_csv(file_path, nrows=20)

# Display it
print(df_head)


# Read CSV in chunks
chunk_size = 20000
chunks = pd.read_csv(file_path, sep=",", chunksize=chunk_size)

# Initialize DataFrames for description and aggregation
all_descriptions = pd.DataFrame()
aggregated_description = pd.DataFrame()

# Loop through chunks with a progress bar
for i, chunk in enumerate(TQ(chunks, total=total_lines//chunk_size)):
    if i % 10000 == 0:
        print(f"Processed {i*chunk_size} lines so far...")

    chunk_description = chunk.describe()

    # Concatenate chunk descriptions (optional)
    all_descriptions = pd.concat([all_descriptions, chunk_description])

    # Sum up for averaging (part of the optional aggregation)
    if aggregated_description.empty:
        aggregated_description = chunk_description
    else:
        aggregated_description += chunk_description

# Averaging (final step of the optional aggregation)
aggregated_description /= (total_lines // chunk_size)

print("Averaged Description:", aggregated_description)
print("All Done!")


############################### DUCKDB ####################################

con = ddb.connect()