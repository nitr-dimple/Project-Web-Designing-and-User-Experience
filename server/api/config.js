
const authentication = {
    "AUTH_URL" : 'https://accounts.spotify.com/authorize?client_id=b811a27b91ef4ef1a0a6ab05ab1e6230&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state',
    "redirectUri" : 'http://localhost:3000',
    "clientId" : 'b811a27b91ef4ef1a0a6ab05ab1e6230',
    "clientSecret" : '931c3d8b8d08449d9541ed5ce7bea216'
};

export default authentication;

export const {
    PORT = 9000,
    NODE_ENV = 'development',
    MONGO_URI = 'mongodb+srv://doadmin:6u0G724rZ1tb3S9i@db-mongodb-nyc3-48149-03c689a9.mongo.ondigitalocean.com/music?authSource=admin&replicaSet=db-mongodb-nyc3-48149&tlsInsecure=true',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 60 * 1,
    secret = "bezkoder-secret-key",
    user = "tunetesting202227@gmail.com", 
    pass = "Nikhil@1997"
  } = process.env;