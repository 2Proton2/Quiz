const express = require("express");
const AppController = require("../controllers/app.controller");

//Setting up the Express Router
const Router = express.Router();

/**
 * sign in
 */
Router.post("/sign-in", AppController.signin)

/**
 * Render login page
 */
Router.get("/login", (req, res) => {
    res.render("login");
});

/**
 * login
 */
Router.post("/login", AppController.login)

/**
 * get user details
 */
Router.get("/user/:id", AppController.getUserDetails);

/**
 * Render game page
 */
Router.get("/game", AppController.game);




module.exports = Router;