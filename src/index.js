const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./config/connection");
const login = require('./routes/logIn');
const signUp = require('./routes/signUp');
const subscribe = require('./routes/subscriber');
const { postBlog, upload } = require('./routes/postBlog');
const getBlog = require('./routes/getBlog');
const delBlog = require('./routes/delBlog');
const { postClass, uploadClass } = require('./routes/postClass');
const getClass = require('./routes/getClass');
const delClass = require('./routes/delClass');
const authToken = require("./middleware/authToken");
const getBlogView = require("./routes/getBlogView");
const getClassView = require("./routes/getClassView");

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.redirect("https://blog-yogaly.vercel.app/");
});

// Logging admin
app.post('/signup', signUp);
app.post('/login', login);

// Subsciber api
app.post('/subscribe', subscribe);

// posting, getting and deleting blogs
app.post('/postBlog', upload.single('image'), postBlog, authToken);
app.get('/getBlog', getBlog);
app.delete('/deleteBlog', delBlog, authToken);
app.get('/getBlogView/:id', getBlogView);

// posting, getting and deleting Class
app.post('/postClass', uploadClass.single('image'), postClass, authToken);
app.get('/getClass', getClass);
app.delete('/delClass', delClass, authToken);
app.get('/getClassView/:id', getClassView);

connection({ app, port: process.env.PORT || 8000 });