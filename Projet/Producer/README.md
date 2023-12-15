# Web Scraping T-DAT-901

This project is designed to scrape articles from a website using Python and Scrapy.

## Prerequisites

Make sure you have Python and pip installed. If not, follow the steps below.

### Installing Python and pip on Ubuntu

1. **Python Installation:**

   - Open a terminal on Ubuntu.

   - Update the package list:

     ```bash
     sudo apt update
     ```

   - Install Python 3:

     ```bash
     sudo apt install python3
     ```

   - Verify the installation by running:

     ```bash
     python3 --version
     ```

     You should see the installed Python version.

2. **pip Installation:**

   - Install pip for Python 3:

     ```bash
     sudo apt install python3-pip
     ```

   - Verify the installation by running:

     ```bash
     pip3 --version
     ```

     You should see the installed pip version.

## Setting up Virtual Environment

It's recommended to use a virtual environment to manage project dependencies.

1. Open a terminal and navigate to the project directory.

2. Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

3. Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

## Installing Dependencies

Install the required packages using the provided `requirements.txt` file:

```bash
pip install -r requirements.txt
```

## Running the Scrapy Spider

Launch the Scrapy spider to scrape articles from the specified website.

```bash
python producer.py <number_of_pages_to_scrape>
```

Replace `<number_of_pages_to_scrape>` with the desired number of pages you want to scrape or none, to use the "by default" 1 page. It can only be an integer.

The spider will start scrolling down the website to load more articles and extract the necessary information.

## Important Notes


- Make sure to deactivate the virtual environment when you are done:

```bash
deactivate
```

**Note:** If you encounter any issues, refer to the Scrapy documentation: [Scrapy Documentation](https://docs.scrapy.org/en/latest/)