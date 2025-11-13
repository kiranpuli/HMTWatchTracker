# Stock Tracker Telegram Bot

This is a simple Node.js script that tracks the stock of products from a list and sends a notification to a Telegram chat if the product is back in stock. The script is designed to be run on a schedule using GitHub Actions.

## Features

-   Tracks multiple products from a JSON file.
-   Sends a Telegram notification when a product is back in stock.
-   Uses GitHub Actions for scheduled execution.
-   Keeps sensitive information secure using GitHub Secrets.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Add watches to track:**
    Edit the `watches.json` file to add the products you want to track. The format is an array of objects, each with a `url` and a `name`.

    ```json
    [
      {
        "url": "https://www.example.com/product1",
        "name": "Product 1"
      },
      {
        "url": "https://www.example.com/product2",
        "name": "Product 2"
      }
    ]
    ```

4.  **Set up GitHub Secrets:**
    -   In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
    -   Click on **New repository secret**.
    -   Create a secret named `TELEGRAM_BOT_TOKEN` and paste your Telegram bot token as the value.
    -   Create another secret named `CHAT_ID` and paste your group chat ID as the value.

5.  **Push your changes:**
    Commit and push your changes to the `main` branch of your repository.

    ```bash
    git add .
    git commit -m "Update watch list"
    git push origin main
    ```

## How it works

The GitHub Actions workflow in `.github/workflows/main.yml` is configured to run the script on a schedule. It checks out the code, installs the dependencies, and then runs the `index.js` script. The script reads the `watches.json` file, checks the stock of each product, and sends a notification if a product is back in stock.

---
*This bot is configured to run automatically via GitHub Actions.*
