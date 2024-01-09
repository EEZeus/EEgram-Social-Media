import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = (req, res) => {
  //check user existance
  const q1 = "SELECT * FROM users WHERE username = ?";

  db.query(q1, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists !");
  
  const q4 = "SELECT * FROM users WHERE email = ?";

  db.query(q4, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("This email has been already used !");
  
  //create new user
  //hash pass
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(req.body.password, salt);

  const q2 =
    "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";

  const values = [req.body.username, req.body.email, hashedPass, req.body.name];

  db.query(q2, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created successfully");
  });
});
});
};

export const login = (req, res) => {
  const q3 = "SELECT * FROM users WHERE username = ?";
  db.query(q3, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("User not found !");
    const passIsTrue = bcrypt.compareSync(req.body.password, data[0].password);

    if (!passIsTrue)
      return res.status(400).json("Wrong password or username !");
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(others);
  });
};
export const checkAuth = (req,res)=>{
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
 
  if (!token) return res.status(401).json("Not Logged In !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid !");})

  return res.status(200).json('User is logged in ...')
}

export const logout = (req, res) => {
  res.clearCookie('accessToken',{
    secure:true,
    sameSite:'none'
  }).status(200).json('User has been logged Out !')
  
};
