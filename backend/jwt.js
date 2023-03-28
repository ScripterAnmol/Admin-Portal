const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        {uName: user.uName, uId: user.uId},
        "jwtsecretplschange"
    );

    return accessToken;
}

module.exports = {createTokens};