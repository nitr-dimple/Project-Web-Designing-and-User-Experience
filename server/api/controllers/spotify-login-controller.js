import authentication from '../config.js';
import SpotifyWebAPI from 'spotify-web-api-node';
import lyricsFinder from 'lyrics-finder';

export const post = async (request, response) => {

    const code = request.body.code;
    const spotifyApi = new SpotifyWebAPI({
        redirectUri: authentication.redirectUri,
        clientId: authentication.clientId,
        clientSecret: authentication.clientSecret
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        response.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token, 
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err);
        response.sendStatus(400);
    });
}

export const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebAPI({
        redirectUri: authentication.redirectUri,
        clientId: authentication.clientId,
        clientSecret: authentication.clientSecret, 
        refreshToken
    });

    spotifyApi.refreshAccessToken().then(
        data => {
            console.log('The access token has been refreshed!');
            return res.json({
                   accessToken: data.body.access_token,
                   expiresIn: data.body.expires_in
            });
        }
    )
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })

}

export const lyrics = async (req, res) => {
    const lyrics = ( await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics found"
    res.json({ lyrics })
}