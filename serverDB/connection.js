const mongoose = require("mongoose")

const mongoString = "mongodb+srv://mara:mara@clusterpad.5xuuw.mongodb.net/language_app?retryWrites=true&w=majority"

const db = mongoose.connect(mongoString, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err}`);
});

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

// dincolo e ceva db initialize; cred ca ne trebuie si noua

module.exports = {
  database: db, // e nevoie ca sa putem fol baza de date in alte module
  secret: 'yoursecret'
}