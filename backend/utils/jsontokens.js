const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY_FOR_TOKEN|| process.config.SECRET_KEY_FOR_TOKEN;
function createToken(userId,username,role) {
    const token = jwt.sign({
        userId,
        username,
        role
    },
        SECRET_KEY,
        { expiresIn: '10m' }
    );
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log(16, err);
                reject(false);
            }
            else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}