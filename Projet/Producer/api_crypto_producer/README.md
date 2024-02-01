# Crypto Producer Application

## Overview

The Crypto Producer application is a specialized Flask application designed to fetch cryptocurrency data and send it to a Kafka topic. It operates as a background service, periodically fetching coin lists and real-time price data, then pushing this information to designated Kafka topics.

## Features

- Fetches a list of cryptocurrencies and their details.
- Periodically fetches real-time price data for specific cryptocurrencies.
- Sends the fetched data to Kafka topics for further processing or consumption.

## Prerequisites

- Python 3.10 or higher.
- Access to a Kafka broker (see Kafka setup documentation).
- Docker (for running the application in a containerized environment).

## Local Setup

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required Python packages.

```bash

cd path/to/crypto-producer
pip install -r requirements.txt
```

3. **Environment Variables:**

Set up the necessary environment variables or use a .env file to define them.

Run the Application: Start the Flask application locally.

bash

    flask run

Kafka Dependency

The application requires a Kafka broker to function correctly. For setting up Kafka, refer to the Kafka Repository Documentation (Add the link to your Kafka repo documentation here).
Running with Docker

To containerize and run the Crypto Producer application, follow these steps:

    Build the Docker Image:

    bash

docker build -t crypto-producer .

Run the Container:

    Ensure your Kafka broker is running and accessible.
    Run the Docker container on the same network as Kafka.

bash

docker run -d --name crypto-producer --network=<your-kafka-network> crypto-producer

Start the Application:

    Manually start the Flask app inside the Docker container.

bash

    docker exec -it crypto-producer /bin/bash -c "./start_app.sh"

Stopping the Application

To stop the application, you can stop the Docker container:

bash

docker stop crypto-producer

### TODO :

- Reference crypto compare in the app : https://www.cryptocompare.com/media/35280519/cc-public-guidelines.pdf

### Endpoints notes

## coin list

1 call needed to fetch all coin list

## global

**Update every 10 min**
get the market cap , market cap % , and total volume of the 60 first coins , and some other global infos

## Price data on 1 crypto in real time :

- uri : https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR
- headers : authorization: Apikey {your_api_key}.
- caching : 10 sec
