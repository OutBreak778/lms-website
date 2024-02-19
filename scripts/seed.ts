const { PrismaClient } = require("@prisma/client")
const database = new PrismaClient()

async function Main() {
    try {

        await database.category.createMany({
            data: [
                {
                    name: "Computer Science"
                },
                {
                    name: "Music"
                },
                {
                    name: "Fitness"
                },
                {
                    name: "Photography"
                },
                {
                    name: "Accounting"
                },
                {
                    name: "Engineering"
                },
                {
                    name: "Filming"
                },
                {
                    name: "Stock Market"
                },
            ]
        })
        console.log("Success")

    } catch (error) {
        console.log("Error in Seed", error)
    } finally {
        await database.$disconnect()
    }
}

Main()
