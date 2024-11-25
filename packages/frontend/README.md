# User Authentication System

This project implements a user authentication system using **Node.js**, **Angular**, **MySQL**, and **Sequelize ORM**. It includes features for user registration, login, and secure management of credentials.

## Features

### User Registration
- Register using **email**, and **password**.
- Passwords are securely hashed and salted before storage.
- Supports **two-phase registration**.

### User Login
- Basic login system with validation of stored credentials.
-  **two-factor authentication (2FA)** for enhanced security.

### Credential Management
- Passwords are stored securely using hashing and salting (bcrypt).
- Ensures data integrity and protection.

## Tech Stack
- **Backend**: Node.js, Sequelize ORM
- **Frontend**: Angular
- **Database**: MySQL
