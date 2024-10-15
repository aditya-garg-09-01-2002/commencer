# **Commencer** (_q-auth_)
### Easy Authentication Integration for Beginner Dev Projects

## Overview
Commencer simplifies the integration of authentication into your projects, offering a quick and hassle-free setup.

## Sections:
## 1. For Developers Using the npm Package / Repository as a Template

Step 1 : 
 For Install the package via npm
``` 
npx commencer
```
_Or_ Clone the repo directly

Step 2 :
 Configure your MySQL database URL in the ```.env``` file under ```COMMENCER_DATABASE_URL```

Step 3 :
 Generate Prisma files:
```
npx prisma generate
```

Step 4 :
 Deploy migrations:
```
npx prisma migrate deploy
```

---

## 2. For Contributors
Contributions are welcome!😃 Follow these steps to contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Stage and commit your changes:
   
```
git add <file-path> 
git commit -m "Detailed message about changes"
```
4. Push to your branch and create a pull request.

### Additional Git Commands:
To stage changes:
```
git add <file-path>
```
To commit changes:
```
git commit # opens vim editor
```
For a simple commit message (not recommended):
```
git commit -m "<message>"
```
---

## 3. User Registration Process
1. After registration, users will receive an OTP via email.
2. Users must verify the OTP to complete the registration.
3. Re-registration is not allowed if the email is already in the database, regardless of OTP verification status.

---

## 4. API Endpoints
### The ```/src/routes/user/index.ts``` file defines several authentication-related endpoints. All routes listed below are prefixed with ```/auth/```.

---

### **`POST /auth/register`**

- **Input**:
  - `email` (string): The user’s email.
  - `password` (string): The user’s password.

- **Controller**:  
  Registers a new user and sends an OTP for email verification.

---

### **`POST /auth/login`**

- **Input**:
  - `email` (string): The user’s email.
  - `password` (string): The user’s password.

- **Controller**:  
  Authenticates the user and returns a session token on successful login.

---

### **`POST /auth/verify-otp`**

- **Input**:
  - `email` (string): The user’s email.
  - `otp` (string): The OTP sent to the user's email.

- **Controller**:  
  Verifies the OTP. If valid, the user's email is confirmed.

---

### **`POST /auth/reset-password`**

- **Input**:
  - `email` (string): The user’s email.

- **Controller**:  
  Sends a password reset link or OTP to the user's email.

---

### **`POST /auth/new-password`**

- **Input**:
  - `email` (string): The user’s email.
  - `password` (string): The new password.

- **Controller**:  
  Updates the password for the user’s account if the reset process is valid.

---

### **`GET /auth/me`**

- **Middleware**: 
  - `authMiddleware`: Ensures the request is authenticated.

- **Controller**:  
  Returns the user’s information based on the authentication token.

---

## Contribution Guide
To contribute, create a discussion thread to clarify processes and suggest improvements.

## Feedback and Support
Feel free to open issues or discussions if you need assistance or encounter any problems. Contributions and suggestions are highly encouraged to improve the repository.

---
