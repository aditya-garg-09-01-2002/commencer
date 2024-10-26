# User Authentication and Account Management Routes Documentation

This document describes the endpoints available for user authentication, password management, and account operations.
As of now , all parameters are required.

## Base Route
- **Path**: `/auth`
- **File**: `userRoutes` (imported from `./user`)
- **Purpose**: Provides routes for user registration, login, password management, OTP handling, and account deletion.

## Available Endpoints

### 1. Register a New User
- **Endpoint**: `POST /auth/register-user`
- **Description**: Allows new users to register.
- **Request Body**:
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.
  - `password` (string): Required, the user's password.

- **Response**:
  - **Success**: Returns a success message and user details.
  - **Failure**: Returns an error message if validation fails.

### 2. Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates an existing user.
- **Middleware**: `getUserDetailsFromAPIBody`, `verifyPassword`
- **Request Body**:
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.
  - `password` (string): Required, the user's password.

- **Response**:
  - **Success**: Returns session details.
  - **Failure**: Returns an error message if authentication fails.

### 3. Logout
- **Endpoint**: `POST /auth/logout`
- **Description**: Logs out the currently authenticated user.
- **Middleware**: `isValidSession`
- **Request Body**: None
- **Response**:
  - **Success**: Returns a confirmation message on successful logout.

### 4. Forgot Password
- **Endpoint**: `GET /auth/forgot-password`
- **Description**: Initiates the password recovery process.
- **Middleware**: `getUserDetailsFromAPIBody`
- **Request Body**:
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.

- **Response**:
  - **Success**: Returns a link or code for password reset.
  - **Failure**: Returns an error if the email is invalid or unregistered.

### 5. Change Password
- **Endpoint**: `GET /auth/change-password`
- **Description**: Allows a user to change their password.
- **Middleware**: `isValidSession`, `getUserDetailsFromJwt`, `verifyPassword`
- **Request Body**:
  - `oldPassword` (string): Required, the user's current password.
  - `newPassword` (string): Required, the user's new password.

- **Response**:
  - **Success**: Confirmation of successful password change.
  - **Failure**: Returns an error if validation or authentication fails.

### 6. Resend OTP
- **Endpoint**: `PUT /auth/resend-otp`
- **Description**: Resends an OTP to the user.
- **Request Body**:
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.

- **Response**:
  - **Success**: Confirmation that the OTP has been resent.
  - **Failure**: Returns an error if the email is invalid.

### 7. Set Password
- **Endpoint**: `PUT /auth/set-password`
- **Description**: Sets a new password using an OTP.
- **Middleware**: `verifyOtp`
- **Request Body**:
  - `otp` (string): Required, the OTP sent to the user.
  - `newPassword` (string): Required, the user's desired new password.
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.

- **Response**:
  - **Success**: Confirmation of successful password reset.
  - **Failure**: Returns an error if the OTP is invalid or expired.

### 8. Reset Password
- **Endpoint**: `PUT /auth/reset-password`
- **Description**: Resets a user's password.
- **Middleware**: `verifyOtp`
- **Request Body**:
  - `otp` (string): Required, the OTP sent to the user.
  - `newPassword` (string): Required, the user's new password.
  - `idType` (string): Required, the user's type of communication method used i.e. either *mobile* or *email*.
  - `userId` (string): Required, the user's unique id like specific email or mobile.

- **Response**:
  - **Success**: Confirms that the password has been reset.
  - **Failure**: Returns an error if the OTP is invalid or expired.

### 9. Remove User
- **Endpoint**: `DELETE /auth/remove-user`
- **Description**: Deletes the user's account.
- **Middleware**: `isValidSession`, `getUserDetailsFromJwt`, `verifyPassword`
- **Request Body**:
  - `password` (string): Required, the user's password for confirmation.

- **Response**:
  - **Success**: Confirmation of successful account deletion.
  - **Failure**: Returns an error if the password is incorrect or session validation fails.

---

This documentation serves as a reference for developers working with user authentication and account management in the application.
