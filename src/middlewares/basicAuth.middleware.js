import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {

    // 1. check if authorization header is empty.
    const authHeader = req.headers["authorization"];

    if(!authHeader) {
        return res.status(401).send("No authorization details found");
    }

    // 2. extract credentials
    const base64Credentials = authHeader.replace("Basic ", "");

    // 3. decode credentials.
    console.log(base64Credentials);

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log("Decoded creds", decodedCreds);

    const creds = decodedCreds.split(':');

    const user = UserModel.getUsers().find((u) => u.email == creds[0] && u.password == creds[1]);

    if(user) {
        next();
    } else {
        res.status(401).send("Unauthorized user.")
    }
}

export default basicAuthorizer;