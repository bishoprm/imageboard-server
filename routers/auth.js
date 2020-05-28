const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  // 1. get params (email and password), and validate
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Missing login parameters");
  } else {
    // 2. look in our DB for user with the email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).send("User not found");
    } else {
      // use the bcrypt function to compare password from req.body and the password from the user table
      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (passwordsMatch) {
        // yes! the user exists and we can log them in
        // create a JWT
        const token = toJWT({ userId: user.id }); // this gives back a token, and later when it's decoded you get the userId back

        res.send({ token });
      } else {
        res.status(400).send("wrong password");
      }
    }
    console.log("found user!", user);
    res.send("trying out login");
  }
  // 3. check if passwords match
});

module.exports = router;

// make sure to import user module
// don't forget to plug in the router after you create it, in index.js
