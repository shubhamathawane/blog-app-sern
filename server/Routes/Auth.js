const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conn = require("../Utils/DB.js");
const { verifyToken } = require("./VerifyToken.js");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    if (req.body.username && req.body.email) {
      const q =
        "INSERT INTO user (`username`,`password`, `email`, `profile_text`) VALUES (?)";

      const values = [
        req.body.username,
        hashedPass,
        req.body.email,
        req.body.profile_text,
      ];

      conn.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await new Promise((resolve, reject) => {
      const findUser = "SELECT * FROM user WHERE `username` = ? LIMIT 1";
      conn.query(findUser, [username], (err, data) => {
        if (err) reject(false);
        resolve(data);
      });
    });

    if (user) {
      const validate = await bcrypt.compare(password, user[0].password);
      try{

        !validate &&  res.status(400).json({ message: "Wrong password" });
      }catch(err){
        console.log(err)
      }


      const accessToken = jwt.sign(
        {
          id: user[0].id,
        },
        process.env.JWT_KEY,
        { expiresIn: "3d" }
      );
      res.status(200).json({ ...user[0], accessToken });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in request" });
  }
});

router.get("/test", verifyToken, (res, req) => {
  console.log("Something");
});

module.exports = router;
