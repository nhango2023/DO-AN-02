import jwk from "jsonwebtoken"
require('dotenv');

const nonSecurePaths = ['/login', '/logout', '/register'];


const createJwt = (payload) => {
    let token = null;
    try {
        token = jwk.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN });
    } catch (e) {
        console.log(e);
    }
    return token;
}

const verifyJwt = (token) => {
    let decoded = null;
    try {
        decoded = jwk.verify(token, process.env.JWT_KEY);

    } catch (e) {
        if (e.name == "TokenExpiredError") {
            return "TokenExpired";
        }
        console.log(e);
    }
    return decoded;
}

const authentication = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookie = req.cookies;
    if (cookie && cookie.accessToken) {
        let token = cookie.accessToken;
        let decodedToken = verifyJwt(token);
        if (decodedToken && decodedToken !== "TokenExpired") {
            req.user = decodedToken;
            next();
        }
        else {
            return res.status(401).json({
                errorCode: -1,
                data: null,
                message: 'Token is invalid or expired'
            })
        }
    }
    else {
        return res.status(401).json({
            errorCode: -1,
            data: null,
            message: 'Token is invalid or expired'
        })
    }

}

const authorization = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let roles = req.user.roles;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                errorCode: -1,
                data: null,
                message: `You don't have permission`
            })
        }
        let currentPath = req.path;
        let canAcess = roles.some(item => item === currentPath);
        if (canAcess === true) {
            next();
        } else {
            return res.status(403).json({
                errorCode: -1,
                data: null,
                message: `You don't have permission`
            })
        }
    }
}

module.exports = {
    createJwt,
    verifyJwt,
    authentication,
    authorization
} 