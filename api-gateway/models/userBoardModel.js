const mongoose = require('mongoose')


const toDosSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})

const dashboardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  toDos: {
    type: [toDosSchema]
  }
})

const userBoardSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  // title: {
  //   type: String,
  //   required: true
  // },
  dashboards: {
    type: [dashboardSchema]
  }
})


module.exports = mongoose.model('UserBoard', userBoardSchema)