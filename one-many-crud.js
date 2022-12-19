const db = require('./models')

async function petCrud() {
    try {
        // sequelize 'special methods and mixins' for 1:M relationships
        // step 1: find an instance of a database entry
        const foundUser = await db.user.findOne() // findOne w no params = finding the first entry
        console.log(`foundUser: ${foundUser.firstName}`)
        console.log(foundUser)
        // step 2: invoke relationship methods that live inside the model instance
        // create a pet and add it to the user that we just found
        const newPet = await foundUser.createPet({
            name: 'Sugar Bell',
            species: 'cat',
            description: 'April\'s Lynx Siamiese who is silver-white',
            // sequelize will auto populate the userId for us
        })

        console.log(newPet)

        // sequelize eager loading on read queires
    } catch(err) {
        console.error('🤬🤬🤬🤬🤬🤬')
        console.error(err)
    }
}

petCrud()