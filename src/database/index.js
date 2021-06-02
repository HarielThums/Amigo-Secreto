import mongoose from ('mongoose')

mongoose.connect('mongodb://localhost/eCondos', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.Promise = global.Promise
module.exports = mongoose