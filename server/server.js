import app from './api/app.js'

const port = 9000;
app.listen(9000, () => {
    console.log(`Server running at ${port}.`);
});