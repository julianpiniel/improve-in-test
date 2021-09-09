# improve-in-test by Julian Piñel

<br/>
This is a backend server made for Improve-In Node.Js Test.
It involves an HTTP REST API with jwt authentication.
 <br/>

<br/>
<br/>
API consists in four principal endpoints AND an authentication endpoint for login/logout/token renewal:

-   /users to create, reaa, update or delete a user.
-   /movies to post or read movies.
-   /episodes to post or read episodes.
-   /shows to post or read shows.

Database was implemented with MongoDB, but I am also capable of implementing the same concept with PostgreSQL.

<br/>

# How can I run this server?

-   You will need to have installed Node 12 or higher.
-   You will need to have installed MongoDB ( optionally have installed MongoDB Compass for db visualization).
    <br/>
    <br/>
-   After cloning the repo, step into the folder with package.json file and run " npm install" on bash(console), this will install all necesary dependencies.

<br/>
<br/>

-   You will also need a .env file, used to protect "sensitive" data (there is no such sensitive data on this repo, but is used to represent the concept of environmental variables).
    This .env file should be in the same folder as package.json file, and should contain the following lines:
    <br/>
    <br/>
    MONGO_DB_URI=improve
    MONGO_DB_TEST=improve_test
    PORT=3001
    <br/>
    <br/>

-   After installing dependencies, creating .env file (and populating it) you will need to create a db in MongoDB called "improve". If you dont know how, <a href="https://www.mongodb.com/es/basics/create-database">here</a> is a tutorial.
    <br/><br/>

# OK, I'm Done with installations and set-up. How do I run this server?

If you come to this point, I'm guessing you are good to go. Just run "npm start" on console.
If you see the message
<br/>
<br/>
"%s listening at 3001
<br/> <br/>
Connected to mongodb://localhost:27017/improve"
<br/> <br/>

or similar, congratulations! <br/><br/>
Server is running on port 3001 and connected to db. Now you can test routes with Postman or any software you like.
