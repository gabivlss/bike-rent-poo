import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1234,
            4321,
            9,
            'test description',
            8,
            'test url[]',
            true,
            '123,4',
            '4322,1',
            '98765'
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeToBePersisted.id)
        expect(persistedBike.name).toEqual(
            bikeToBePersisted.name
        )
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1234,
            4321,
            9,
            'test description',
            8,
            'test url[]',
            true,
            '123,4',
            '4322,1',
            '87654'
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        await repo.remove('test@mail.com')
        const removedBike = await repo.find('test@mail.com')
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const bike1 = new Bike('test bike','test type',1234,4321,9,'test description',8,'test url[]',true,'123,4','4322,1','76543')
        const bike2 = new Bike('test bike','test type',1234,4321,9,'test description',8,'test url[]',true,'123,4','4322,1','65432')
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })
})