const mongoose = require("mongoose")

const mongoString = "mongodb+srv://mara:mara@clusterpad.5xuuw.mongodb.net/clientsDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoString, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
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

