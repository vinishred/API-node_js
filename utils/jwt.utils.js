const jwt = require("jsonwebtoken");
// génération de notre clé secrète
const JWT_SIGN_SECRET =
  "07sjkjvglkdfenvldfhKJOUH9472jhkl34kjhdfoldkjfvlfjMObniuTd94ncvjdiefndkjJHLJYjghjkhklUjh8rccsdfjklhjgkljhgldkjf";

// Exported functions
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      JWT_SIGN_SECRET,
      { expiresIn: "24h" }
    );
  },

  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },

  getUserId: function (authorization) {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) {
          userId = jwtToken.userId;
        }
      } catch (err) {}
    }
    return userId;
  },
};
