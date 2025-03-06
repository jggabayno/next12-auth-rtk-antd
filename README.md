# Next.js 12 with Authentication, Redux Toolkit, API Integration, and Antd UI Library

## Overview

This project is built with **Next.js version 12**, featuring:

- **Authentication System**: Cookie-based authentication with signup and refresh token functionality.
- **State Management**: Implemented with Redux Toolkit for authentication, CRUD operations, and App Settings.
- **Custom Hooks**: Implemented for reusable logic and enhanced functionality.
- **Ant Design Integration**: Components, and functions leveraging Ant Design.
- **API Integration**: Uses Axios with custom methods for efficient API communication.

## Getting Started

### Requirements

- Node.js 12.x to 14.x 

### Setup

1. Clone the repository.
2. Install dependencies:

   ```sh
   yarn install
   ```

3. Use the .env.example file as a reference to create your own .env for environment setup.

## Running the Application

### Development Mode

To start the development server:

```sh
yarn dev
```

After running, access the application at:

```sh
http://localhost:3000/
```

### Production Mode

To build and start the production server:

```sh
yarn build
yarn start
```