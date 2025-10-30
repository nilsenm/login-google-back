const {OAuth2Client} = require('google-auth-library');



const client = new OAuth2Client();


const validateGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:  [
                process.env.WEB_CLIENT_ID,
                process.env.ANDROID_CLIENT_ID,
            ],  

        });
        const payload = ticket.getPayload();
        console.log('payload', payload);
        return payload;
    } catch (error) {
        console.log('error', error);
        return null;
    }
   
}


module.exports = {
    validateGoogleToken
}