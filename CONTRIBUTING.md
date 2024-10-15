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

### 5. 📜 Generate a Refresh Token (Optional but Recommended)

If you are using the internal application, which allows a longer period for API tokens before expiry, consider generating a refresh token to ensure seamless email sending:

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
2. In the top-right corner, click the **Settings** icon.
3. Check the box for **Use your own OAuth credentials** and fill in your **Client ID** and **Client Secret**.
4. For **API URL**, enter: `https://mail.google.com`.
5. Click **Authorize APIs** and complete the authorization process to get an authorization code.
6. Use this authorization code to generate a refresh token.

### 6. 💾 Save and Use the API Key

- Store the API key and refresh token in a secure place, such as an environment configuration file (e.g., `.env` for Node.js).
- Use this API key within your npm package to send OTPs via email.

## ⚠️ Note

Please ensure to check if your user's credentials have expired to avoid disruptions in service.

## 📌 Reason for the Update

This documentation is essential to help users of the npm package generate their personalized API keys, enabling them to send OTPs using emails effectively.

## 🎯 Expected Outcome

By following this guide, users will be able to:

- Generate their own personalized API keys using the Google Developer Console.
- Integrate these API keys seamlessly into their npm package for sending OTPs via email.
- Understand and apply best practices for secure and effective use of the API key.

## 💬 Additional Context

If you are unfamiliar with API key generation or need clarification, feel free to ask questions in the comments.
