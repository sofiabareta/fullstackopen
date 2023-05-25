const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// ySizHKuX7bD5vreq
const url =
  `mongodb+srv://sofibareta:${password}@cluster0.lte35vm.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Promise auttaa asynkronisissa operaatiossa',
  date: new Date(),
  important: false,
})

if (false) {
  note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}



Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})