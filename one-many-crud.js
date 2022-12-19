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
        // const newPet = await foundUser.createPet({
        //     name: 'Henrietta',
        //     species: 'Box Turtle',
        //     description: 'a 25 year old box turtle who love avacado',
        //     // sequelize will auto populate the userId for us
        // })

        // console.log(newPet)

        // creating a pet and manually adding the id:
        const manualPet = await db.pet.create({
            name: 'spike',
            species: 'dog',
            description: ' super old chiuaua',
            userId: 2 // manually populate userId
        })

        // special method/mixin for finding a user's pets
        const aprilsPets = await foundUser.getPets() // returns an array of all of this user's pets
        aprilsPets.forEach(pet => console.log(`April owns a pet named ${pet.name} who is a ${pet.species}`))

        // special methods we can use with an instance of a user
        // foundUser.getPets()
        // foundUser.countPets()
        // foundUser.hasPet()
        // foundUser.hasPets()
        // foundUser.setPets()
        // foundUser.addPet()
        // foundUser.addPets()
        // foundUser.removePet()
        // foundUser.removePets()
        // foundUser.createPet()

        // special methods we can use with an instance of a pet
        // manualPet.getUser()
        // manualPet.setUser()
        // manualPet.createUser()

        // sequelize eager loading on read queires
        const aprilAndPets = await db.user.findOne({
            where: {
                firstName: 'April'
            },
            include: [db.pet] // this array can contain many models to be joined during this query
        })
        
        // returned object will have sub array of includes
        aprilAndPets.pets.forEach(pet => {
            console.log(`April is the proud owner of ${pet.name}`)
        })
    } catch(err) {
        console.error('🤬🤬🤬🤬🤬🤬')
        console.error(err)
    }
}

petCrud()