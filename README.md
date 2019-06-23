# Welcome to Vidly - A Node & React Reference Project

This project is built from the Programming With Mosh Course.

## Development Tools

This project has been developed using the following tools and may be required to run the application:

- [Visual Studio Code](https://visualstudio.microsoft.com/downloads/)
- [Node.js LTS](https://nodejs.org/en/)
- [MongoDB Server & Compass](https://www.mongodb.com/download-center/community)

## Running the Web API

The Web API provides a secure method to access data for this application.

    1. Open the project with visual studio code at location /node-vidly/main/server/
    2. Ensure the necessary global packages are installed in the console
        2.1 npm ls -g --depth=0 - will list all globally installed npm packages
        2.2 npm i -g nodemon - if the react cli is not installed use this command to install it globally
    3. Run the following commands in the console:
        3.1 npm install - get all missing packages
        3.2 npm start - will run app

## Running the React App

The React component provides the front end for the system.

    1. Open the project with visual studio code at location /node-vidly/main/client/
    2. Ensure the Web API is running in order to supply data
    3. Ensure the necessary global packages are installed in the console
        3.1 npm ls -g --depth=0 - will list all globally installed npm packages
        3.2 npm i -g create-react-app- if the react cli is not installed use this command to install it globally
    4. Run the following commands in the console:
        4.1 npm install - get all missing packages
        4.2 npm start - will run app
