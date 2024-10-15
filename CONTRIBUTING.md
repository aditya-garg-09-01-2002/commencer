# ✉️ How to Create a Mail API Key using Google Developer Console

This guide explains how to generate a Mail API key in the Google Developer Console, which can be used to send OTPs via email using an npm package.

## 🛠️ Steps to Generate the API Key

### 1. 🚀 Create a Google Cloud Project

- Visit the [Google Cloud Console](https://console.cloud.google.com/).
- Sign in with your Google account.
- In the top-left corner, click **Select a project** > **New Project**.
- Name your project (e.g., `Mail API Project`) and click **Create**.

### 2. 📧 Enable the Gmail API

- From the dashboard, go to **APIs & Services** > **Library**.
- Search for "Gmail API".
- Click **Gmail API** and select **Enable** to activate it for your project.

### 3. 🗝️ Create API Credentials

- Navigate to **APIs & Services** > **Credentials**.
- Click **Create Credentials** and choose **API Key**.
- Copy the generated API key. This key will be used to send emails via the npm package.

### 4. 🔐 Set API Restrictions (Optional)

- For security, you can restrict your API key under **API restrictions** to ensure it's used only by authorized applications.

### 5. 💾 Save and Use the API Key

- Store the API key in a secure place, such as an environment configuration file (e.g., `.env` for Node.js).
- Use this API key within your npm package to send OTPs via email.

## 📌 Reason for the Update

This documentation is essential to help users of the npm package generate their personalized API keys, enabling them to send OTPs using emails effectively.

## 🎯 Expected Outcome

By following this guide, users will be able to:

- Generate their own personalized API keys using the Google Developer Console.
- Integrate these API keys seamlessly into their npm package for sending OTPs via email.
- Understand and apply best practices for secure and effective use of the API key.

## 💬 Additional Context

If you are unfamiliar with API key generation or need clarification, feel free to ask questions in the comments.
