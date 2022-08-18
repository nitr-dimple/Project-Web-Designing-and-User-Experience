# Entertainment Platform

## Team Member

Name: Dimpleben Kanjibhai Patel<br>
Email: patel.dim@northeastern.edu <br>
NUID: 002965372<br>
<br>
Name: Uppala Nikhil<br>
Email: uppala.n@northeastern.edu<br>
NUID: 002925788<br>
<br>
Name: Sairam Mantravadi<br>
Email: sairam.m@northeastern.edu<br>
NUID: 002951479<br>
<br>
Name: Priyanka Akula<br>
Email: akula.p@northeastern.edu <br>
NUID: 002981839<br>
<br>

## Project Description

Entertainment Platform allows you to music/video streaming, maintaining playlists.

### APIs

```
// To get credentials from spotify
POST /spotifylogin

//  user signup
POST /signup

// user login
POST /login

// user logout
POST /logout

// playlist create
POST /user/:id/playlist

// playlist get all
GET /user/:id/playlist

// playlist get by id
GET /user/:userId/playlist/:id

// playlist update
PUT /user/:userId/playlist/:id

// playlist delete
DELETE /user/:userId/playlist/:id

// songs Add
POST /playlist/:id/songs

// songs get
GET /playlist/:id/songs

// songs delete
DELETE /playlist/:playlistId/songs/:songsId

//favorite Add
POST /user/:userId/favorite/

//favorite get
GET /user/:userId/favorite/

//favorite delete
DELETE /user/:userId/favorite/:id

// forget password
PUT /forgetpassword/:id

// lyrics
GET /lyrics

```

## Model Diagram

![alt text](https://github.com/neu-mis-info6150-spring-2022/final-project-summeriscoming/blob/main/musicapp/assets/Model%20Diagram.png?raw=true)

## User Stories

- As a user, I should be able to create new account.
- As a user, I should be able to login to user account with username and password.
- Add proper validation for registration page.
- Add proper validation for login page.
- As a user, I should be able to stream music from different platforms, So that i don’t have go to different sites to stream the content I like.
- As a user, I should be able to view all available music/video.
- As a user, I should be able to search music , So that I can find the content i like easily.
- As a user I should be able to create Playlists, so that i can organize my content better in groups and play them in the order.
- As a user, I should be able to save music, So that i can go back to my favorite content.
- As a user, I should be able to delete music/video from playlist.
- As a user, I should be able to see recommendations, So that i can find best content easily.
- As a user, I should be able to filter content, so that I can only see the content I need.
- As a user, I should be able to select genres, So that I can get recommendations on my favorite genres only.
- As a user, I should be able to change the names of the playlist, so that I can have the flexibility to change the names if I don’t like them.
- As a user, I should be able to check my history, So that I can know what all content I streamed.
- As a user, I should be able to do setting based on preferences.
- As a user, I should be able to logout from the app.
- As a user, I should be able to delete the account, So that If i don’t like the app, I can delete my account.

## Technology

1. `HTML`
2. `SASS`
3. `Reactjs`
4. `Javascript`
5. `Nodejs`
6. `Expressjs`
7. `MongoDB`

## How to run this repository ?

- Clone the repository.
- To start backend, go to server folder and run below commands <br>
  `npm i -save express mongoose cors debug`<br>
  `nodemon server`
- To start frontend, go to web-app folder and run below commands <br>
  `npm i create-react-app` <br>
  `npm run start`
