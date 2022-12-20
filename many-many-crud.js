const db = require('./models')


// find a toy and do the following:
// toyInstance.getPets()
// toyInstance.countPets()
// toyInstance.hasPet()
// toyInstance.hasPets()
// toyInstance.setPets()
// toyInstance.addPet()
// toyInstance.addPets()
// toyInstance.removePet()
// toyInstance.removePets()
// toyInstance.createPet()

// find a pet and do the following:
// petInstance.getToys()
// petInstance.countToys()
// petInstance.hasToy()
// petInstance.hasToys()
// petInstance.setToys()
// petInstance.addToy()
// petInstance.addToys()
// petInstance.removeToy()
// petInstance.removeToys()
// petInstance.createToy()

const relationshipCrud = async () => {
    try {
        // find or create a pet
        const [pet, petCreated] = await db.pet.findOrCreate({
            where: {
                name: 'Luna',
                species: 'Aussiedoodle',
                description: 'Really smart',
                userId: 1
            }
        })

        // find or create a toy
        const [toy, toyCreated] = await db.toy.findOrCreate({
            where: {
                type: 'Tennis Ball',
                color: 'Green'
            }
        })
        // add the toy to the pet with pet.addToy or with toy.addPet
        await toy.addPet(pet)

        // ask the pet what toys are assoicated with it
        const lunaToys = await pet.getToys()
        lunaToys.forEach(toy => console.log(toy.type))

        // find a user, include their pets AND have all the pet's toys included
        const foundUser = await db.user.findOne({
            where: {
                id: 1
            },
            // fixes 'EagerLoadingError'
            include: [{
                model: db.pet,
                include: [{
                    model: db.toy
                }]
            }],

        })
        console.log(`found user: ${foundUser.firstName}`)
        foundUser.pets.forEach(pet => {
            console.log(`they have a pet ${pet.name}`)
            pet.toys.forEach(toy => {
                console.log(`this pet owns a ${toy.type} toy to play with`)
            })
        })
        // user.pets []
            // each pet has a toy array []
    } catch (err) {
        console.log('🔥🔥🔥🔥🔥🔥🔥', err)
    }
}

relationshipCrud()