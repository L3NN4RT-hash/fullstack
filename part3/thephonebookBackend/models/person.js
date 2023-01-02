const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log(url);
    console.log('Connection established to MongoDB database');
})
.catch((error) => {
    console.log('An error occured when connecting to MongoDB');
})

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: { 
        type: String,
        minLength: 8,
        validate: {
            validator: (number) => {
                if (number.split('-').length === 2) {
                const [first, second] = number.split('-')
                if (first.length === 2 || first.length === 3) {
                    if (second.length > 0) {
                        return number
                    }
                }
            }
        }
        }
    },
    visible: Boolean,
})

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', peopleSchema)

