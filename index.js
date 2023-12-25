const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const path = require("path")
const multer = require("multer");
const cors = require("cors");

app.use(cors())

app.use("/images", express.static(path.join(__dirname, "/images")));

// const url = "mongodb+srv://blog:blog@cluster0.je7k3wr.mongodb.net/blogApp"
const url = "mongodb+srv://blog:blog@cluster0.je7k3wr.mongodb.net/"


mongoose.connect(url, {
    'useNewUrlParser': true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    'useUnifiedTopology': true,
}).then(console.log("DB connected successfully")).catch(err => console.log(err))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        // cb(null, req.body.name);
        cb(null, req.body.name); // upload file with eg. "name" : "xyz.jpeg"
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
    console.log("backend started")
})