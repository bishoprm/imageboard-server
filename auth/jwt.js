const jwt = require("jsonwebtoken"); // require the JWT module

// set secret key to an env variable we can configure in the hosting of our server so it's not exposed on github
const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

// create a JWT token combining the data we hand it (in this case the userID)
// and sets its expiration time
function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

// verifies that tokens are valid
function toData(token) {
  return jwt.verify(token, secret);
}

// exporting the functions so they can be used in routes
module.exports = { toJWT, toData };
