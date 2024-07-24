import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport'
import session from 'express-session'; 

import "./passport/github.auth.js"
import userRoutes from './routes/user.routes.js';
import exploreRoutes from './routes/explore.routes.js';
import connectMongoDB from './db/connectMongoDB.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get("/",(req,res) => {
    res.send("Server is ready");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);


app.listen(5000,() => {
    console.log('Server started on http://localhost:5000');
    connectMongoDB();
})