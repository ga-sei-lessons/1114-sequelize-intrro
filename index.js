// import the entire models folder and mount it on db
const db = require('./models')

async function userCrud() {
    try {
        // CREATE
        const newUser = await db.user.create({
            firstName: 'April',
            lastName: 'Gonzales',
            age: 30,
            email: 'april.gonzales@generalassemb.ly'
        })

        // console.log(`new user name: ${newUser.firstName} ${newUser.lastName}, email: ${newUser.email}`)

        // READ
        // findAll returns an array of users 
        // const allUsers = await db.user.findAll() // return every user ever in the db
        // console.log(allUsers)
        // allUsers.forEach(user => console.log(user.firstName))
        // const allWestons = await db.user.findAll({
        //     where: {
        //         firstName: 'Weston'
        //     }
        // })
        // console.log(allWestons)

        // // just return one user that meets the criteria
        // const oneUser = await db.user.findOne({
        //     where: {
        //         firstName: 'April'
        //     }
        // })
        // console.log(oneUser) // not an array
        // seqeulize helper method findOrCreate
        // destructuring assingment
        // array destructuring
        const [user, created] = await db.user.findOrCreate({
            // where clause: what to search for
            where: {
                firstName: 'Gabe'
            },
            // defaults: populating the columns that where not search for in the case of creation
            defaults: {
                lastName: 'Gangoso',
                age: 26,
                email: 'gabriel.gongoso@generalassemb.ly'
            }
        })

        console.log('was Gabe created?', created)
        console.log(user.firstName)

        // find one user by primary key
        // const keyLookup = await db.user.findByPk(1)
        // console.log(keyLookup)

        // UPDATE
        // update({ what to update }, { where: { what to search for }})
        // const numRowsChange = await db.user.update({ age: 100 }, {
        //     where: {
        //         firstName: 'Weston'
        //     }
        // })
        // console.log(numRowsChange)
        
        // // DESTROY
        // const numRowsDeleted = await db.user.destroy({
        //     where: {
        //         firstName: 'Weston'
        //     }
        // })
        // console.log(numRowsDeleted)
    } catch (err) {
        console.log(err)
    }
}

userCrud() // dont forget to invoke!