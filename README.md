
# PopPilgrim

### PopPilgrim is an booking app based on HipCamp and AirBnB.

### The app currently featuring:

* Authenticated Users
* Listings by Users
* Reviews for Listings
* Images for Listings

### You can visit the live website at

```sh
https://poppilgrim.herokuapp.com/
```

## Steps to run this app

### 1. Clone this repo

```sh
https://github.com/B-S-Arnold/poppilgrim
```
### 2. Install dependencies from root directory

```sh
npm install
```

### 3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL

```sh
CREATE USER <name> WITH CREATEDB PASSWORD <'password'>;
```
* NOTE: remeber this information, as you will be using it in step 5

### 4. Create a .env file in the backend directory based on the .env.example found wihtin said directory

### 5. Enter your username and password information in your .env file along with a secure set of characters for your JWT_SECRET, and set the PORT (preferably 5000)

### 6. Add the following proxy to your package.json file within your frontend directory, to match your PORT in the .env file

```sh
"proxy": "http://localhost:5000"
```

### 7. Crate Database, Migrate, and Seed models based on .env file

```sh
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

* NOTE - if at any moment, you wish to undo seeds and migrations perform the following:

```sh
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
```

* then to run migration and seed files again, run:

```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

### 8. Start services in the backend directory

```sh
npm start
```

### 9. Start the services in the frontend directory, which should open in the browser

```sh
npm start
```

* if the browser does not automatically open, navigate to http://localhost:3000

### 10. Once on the home page, you click the "Log In" button, which can will give you the option to log in as a "Demo User"

* alternatively you can sign up, and will automatically be logged in as an authenticated user with your specified information

### 11. The nav bar will remain on the top of the window at all times, so if you are ever lost you will have access to:

* The Home Page
* The Traveler Icon with dropdown menu for "Log Out" and "Create Listing"

* NOTE - the app is full navigable to an unauthenticated/unregistered user, but the nav bar will have "Log In" and "Sign Up", instead of the traveler icon


### 12. As a logged in user, you can do the following:

* Create a unique listing
* Update a listing you created
* Delete your listings
* Review listings from other users
* Delete those reviews

### 13. To Log Out or Create a Listing, click the traveler icon

* you can log back in with any credentials you used to sign up

### 14. To view a list of the listing, click the "Current Listings" link

### 15. When looking at a list of listings, you can navigate to that particular listing page by clicking it

### 16. On the individual listing page:

* if the listing is yours, you can edit or delete the listing
* if the listing belongs to another user, you can leave a review and delete said review

## That concludes the navigation and functionality of PopPilgrim
## Thank you for viewing

* Remember to stop the services in the frontend and backend directories

## The following steps are to remove tables and the database from your local machine

### 1. Undo seeds and migrations from the database, and drop the database

```sh
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:drop
```

### 2. Undo seeds and migrations from the database

```sh
DROP USER <name>;
```

### The tables, database, and user should all be dropped from your local machine

# Contact me for any job offers

Bryan Arnold
bryanscottarnold@gmail.com

LinkedIn: 'https://www.linkedin.com/in/bryan-arnold-882378215/'

GitHub: https://github.com/B-S-Arnold

Live Site Hosted on Heroku: https://poppilgrim.herokuapp.com/

This project was made in 2022 as a part of the App Academy curriculum

https://www.appacademy.io/

2022 PopPilgrim by Bryan Arnold

# Thank you for using PopPilgrim!

### Technologies used

* GitHub (git repository)
  * planned the website, created blueprints, and kept track of my progress using utilities offered by GitHub
  * used GitHub to create, push to, and branch on a repository
* ReactJS (frontend)
  * installed dependencies using npm and ran the front end server on localhost
  * made use of JavaScript's ability to create modals, params, use scoping, and error handling
  * made use of React libary's UseEffect, Redirect, UseState, useDispatch, etc.
  * created and updated State, and updated pages seamlessly with React
  * used frontend stores, api fetches, and reducers to send CRUD data to the backend
* ExpressJS (backend)
  * created forms and routes for CRUD features in the backend
  * used sequelize to migrate, update, and seed the database
  * created a relational database, with table dependency and cascading delete
* HTML and CSS (layout and styling)
  * implemented a vast majority of HTML in JS files
  * used HTML element wrapping and css positiong to manipulate the size, location, and appearance of HTML elements
  * used HTML to source images from urls, and JavaScript to check the sources legitimacy
* Heroku (hosting online)
  * used Heroku commands to push the app, and manage the live database
  * deployed the website on Heroku, allowing remote access to the website