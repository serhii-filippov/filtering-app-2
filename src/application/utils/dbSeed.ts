import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import {faker} from '@faker-js/faker'
import {connect} from 'mongoose'
import {MONGODB_URI} from '../../application/config/environment'
import {
    UserModelSchema,
} from '../../infrastructure/driven-adapters/adapters/orm/mongoose/models/user'

if (process.env.NODE_ENV === 'dev' &&
    process.env.DONT_SEED !== 'true') {
    seedDB().then(() => process.exit(0))
}

async function seedDB() {
    try {
        await connect(MONGODB_URI)
        console.log('Successfully connected to the DB. Starting the seeding process.')
        let seedDataPromises = []

        for (let i = 0; i < 100; i++) {
            const firstName = faker.person.firstName()
            const lastName = faker.person.lastName()
            const email = faker.internet.email()
            const password = faker.internet.password()
            const user = new UserModelSchema({
                firstName,
                lastName,
                email,
                password
            })

            seedDataPromises.push(user.save())
        }
        await Promise.all(seedDataPromises)

        console.log('Database seeded! Enjoy something more than Hello world :)')
    } catch (err) {
        console.error('Error during DB seeding:', err)
    }
}