# Xmas-Is-Here
XmasIsHere is a full stack web application that allows users to select Christmas movie randomly every day from 1st of December to 24th of December.

Current functionality:
* register and log in to the website
* select movie depends on the day of December
* change movie dependes on the wishes of the user
* add/remove movie from wishlist

# Project Structure
* `/` - home page with user registration form
* `/signin` - log in page with user log in form
* `/dashboard` - dashboard page with links to movies advent calendar and wishlist
* `/movies-calendar` - calendar cards page with link to movie card page depends on the day
* `/movies-calendar/movie` - movie card page with option to add movie to wishlist and change movie
* `/wishlist` - wishlist page with option to remove movie from wishlist

# Enviroment Variables
Check `.env.sample` in the client and the server directory to set up enviroment variables file (.env)

# Project Tech Stack
* Sass
* ReactJS
* NodeJS
* ExpressJS
* JWT Authentication

# Running the Project
1. Clone or download this repository
2. Start the server
   * **`cd server`** - change project directory to server diretory
   * **`npm install`** - install all the node modules
   * **`npm start`** - start run server on port
3. Start the client
   * **`cd client`** - change project directory to client diretory
   * **`npm install`** - install all the node modules
   * ***`npm install react-snowfall`*** - install react component that creates a snowfall effect
   * ***`npm install @material-ui/core`*** - install @material-ui/core for tooltip
   * **`npm start`** - start run XmasIsHere app on http://localhost:3000 in browser

# Continued development
I would like to add DB, music in app in future.







