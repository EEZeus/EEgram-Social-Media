import Express from "express";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import likesRoute from "./routes/likes.js";
import commentsRoute from "./routes/comments.js";
import storiesRoute from "./routes/stories.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import multer from "multer";
const app = Express();
//middleware
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Credentials',true)
  next()
})
app.use(Express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}
))
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/eegram/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/server/upload',upload.single('file'), (req,res)=>{
 const file = req.file;
  res.status(200).json(file.filename)
})
app.use("/server/users", usersRoute);
app.use("/server/posts", postsRoute);
app.use("/server/likes", likesRoute);
app.use("/server/comments", commentsRoute);
app.use("/server/stories", storiesRoute);
app.use("/server/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is Working!");
});
