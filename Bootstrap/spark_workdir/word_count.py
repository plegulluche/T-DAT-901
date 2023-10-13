# Import the necessary modules
from operator import add
from pyspark.sql import SparkSession
import os

# Initialize a Spark session with a name and master URL
spark = SparkSession.builder \
    .appName("WordCount") \
    .master(os.environ.get("SPARK_MASTER_URL")) \
    .getOrCreate()

# Reading the text file and converting it to an RDD
lines = spark.read.text("work/discours-macron-savines-le-lac-30-mars-2023.txt").rdd.map(lambda r: r[0])

# Perform the word count
# First, split the line into words
# Then, map each word to a tuple (word, 1)
# Finally, reduce by key (the word) by adding up the counts
counts = lines.flatMap(lambda x: x.split(' ')) \
    .map(lambda x: (x, 1)) \
    .reduceByKey(add)

# Collect the counts back to the driver program
output = counts.collect()

# Print the counts
for (word, count) in output:
    print(f"{word}: {count}")

# Stop the Spark session
spark.stop()
