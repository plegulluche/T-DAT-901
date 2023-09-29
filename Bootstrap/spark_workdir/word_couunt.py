# from operator import add
# from pyspark.sql import SparkSession
# import os

# spark = SparkSession . builder . appName (" WordCount "). master (os. environ .get ("
# SPARK_MASTER_URL ")).getOrCreate()

# # Setting default log level to " WARN ".
# # To adjust logging level use sc. setLogLevel ( newLevel ). For SparkR , use setLogLevel ( newLevel).

# lines = spark . read . text (" work / discours -macron - savines -le -lac -30 - mars -2023. txt ").
# rdd .map( lambda r: r [0])
# counts = lines . flatMap ( lambda x: x. split (’ ’)).map( lambda x: (x, 1)). reduceByKey (
# add )
# output = counts.collect()
#     for (word , count ) in output :
#         print ("%s: %i" % (word , count ))
