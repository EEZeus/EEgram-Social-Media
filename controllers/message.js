import { db } from "../connect.js";
import moment from 'moment'
export const getMessages = (req, res) => {
  const q =
    "SELECT * FROM messages WHERE (senderId, receiverId) = (?, ?) OR (senderId, receiverId) = (?, ?) ORDER BY createdAt ASC";

  const values = [
    req.body.senderId,
    req.body.receiverId,
    req.body.receiverId,
    req.body.senderId,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addMessages = (req, res) => {
  const q = "INSERT INTO messages (`senderId`,`receiverId`,`message`,`createdAt`) VALUES (?)"

  const values = [
    req.body.senderId,
    req.body.receiverId,
    req.body.message,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data);
  });
};