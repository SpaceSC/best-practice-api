const express = require('express')
const router = express.Router()

const UserBoard = require('../models/userBoardModel')

router.get('/', async (req, res) => {
  const user_id = req.headers['x-user-id']; //inside object but has dashes (or if it's a variable)
  console.log(req.headers);

  if (!req.headers['x-user-id']) {
    return res.status(401).json({ message: "x-user-id missing" })
  }

  //const {'x-user-id': user_id} = req.headers;
  const filter = { user_id }; // equals user_id: user_id
  const update = { user_id };
  const userBoard = await UserBoard.findOneAndUpdate(filter, update, {
    new: true, // return the new data, but now we don't store it in a variable
    upsert: true // Make this update into an upsert
  });

  res.status(200).json(userBoard)
})


module.exports = router