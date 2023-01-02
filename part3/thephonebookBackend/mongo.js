const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Provide a password when running node mongo.js')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstacktest:${password}@cluster0.y7bim7f.mongodb.net/thePhoneBook?retryWrites=true&w=majority`

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String,
    visible: Boolean,
})

const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length == 5) {
mongoose
.connect(url)
.then((result) => {

 const newPerson = new Person({
    name: name,
    number: number,
    visible: true

 })

 return newPerson.save()        
})
.then(() => {
    console.log(`Added ${name} number: ${number} to the phonebook`);
    return mongoose.connection.close()  
})
.catch((error) => console.log(error))
}

/*.then((result) => {
    console.log('Connected to database');

    const person1 = new Person({
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456",
        visible: true,
    })

return person1.save()

})
.then(() => {
    const person2 = new Person({
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        visible: true
    })

return person2.save()

})
.then(() => {
    const person3 = new Person({
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345",
        visible: true
    })

return person3.save()

})
.then(() => {
    const person4 = new Person({
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        visible: true
    })

return person4.save()

})*/

if (process.argv.length == 3) {
mongoose
.connect(url)
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
})
.then(() => {
    console.log('connection closed');
    return mongoose.connection.close()
})
.catch((error) => console.log(error))
}
