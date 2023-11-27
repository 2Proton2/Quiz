const AppService = require("../services/app.service");
const userSchema = require("../models/app.model");
const bcrypt = require("bcryptjs");
const { renderNextQuestion } = require('../helper/game.helper');
const AppController =  {
  home: (req, res, next) => {
      res.send(AppService.home());
  },

  signin: async (req, res, next) => {
    try {
      console.log(req)
      const userInstance = new userSchema(req.body);
      
      /**
       * save into the db
       */
      let result = await userInstance.save();
      res.status(201).json({message:"Registeration done successfully"})
      
      console.log('redirected')
      
    } catch (error) {
      res.status(505).send({
        message: `error for sigin api`,
      })
    }
  },

  login: async (req, res, next) => {
    try {
      //first find whether the email id is present or not
      let emailExistance = await userSchema.findOne({email: req.body.email})

      //compare the userEntered password with hashed password present in the database
      let enteredPassword = await bcrypt.compare(req.body.password, emailExistance.password)
      console.log('eP => ',enteredPassword)
      if(emailExistance && enteredPassword){
        res.status(200).json({
          message:"logged in successfully",
          data: emailExistance._id
        })
      }
      else{
        throw new Error("Invalid Credential");
      }
    } catch (error) {
      res.status(500).send({
        message: `error for login api`,
      })
    }
  },

  getUserDetails: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log('Yeah backedn is called', id)
      let result = await userSchema.findOne({_id: id})
      console.log('result => ',result)

      if(result){
        res.status(200).json({
          data:result
        })
      }
      else{
        throw new Error(`Error in fetching the user data`)
      }
    } catch (error) {
      
    }
  },

  game: (req, res) => {
    // Reset game data for a new round
    let gameData = {};
    gameData.questions = [];
    gameData.userResponses = [];
    gameData.score = 0;

    // Render the game page with the first question
    renderNextQuestion(res);
}
}

module.exports = AppController;
