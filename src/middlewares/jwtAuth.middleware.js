import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // check token from headers 
    const token = req.cookies?.token || req.headers['authorization'];

    // if no token return error 
    if(!token) {
        res.status(401).send("Unauthorized");
    }

    console.log(token)
    // check if payload is valid
    try {
        const payload = jwt.verify(
            token,
            "cf2f364b30417d5d45cf1b0ca0603985"
        )
        req.userID = payload.userID;
        console.log("Payload", payload);
    } catch (error) {
        return res.status(201).send("Unauthorized User");
    }

    // call to next 
    next();
}

export default jwtAuth;