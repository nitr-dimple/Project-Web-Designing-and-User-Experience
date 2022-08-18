import signupRouter from './signup-router.js';
import loginRouter from './spotifylogin-router.js';
import playlistRouter from './playlist-router.js';
import userRouter from './user-router.js'
import signinROuter from './login-router.js'
import playlistSongsRouter from './playlistSongs-router.js'
import favoriteSongsRouter from './favorite-routes.js'



export default (app) => {
    app.use('/', signupRouter),
    app.use('/', loginRouter),
    app.use('/', playlistRouter),
    app.use('/',userRouter),
    app.use('/', signinROuter),
    app.use('/', playlistSongsRouter),
    app.use('/', favoriteSongsRouter)
}