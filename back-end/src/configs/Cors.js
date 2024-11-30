require('dotenv').config();
const configCors = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', "PUT, POST, GET, DELETE, PATCH, OPTIONS");
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (req.method === 'OPTIONS') {
            res.sendStatus(200)
        } else {
            next();
        }
    })
}

export default configCors;
