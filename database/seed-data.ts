interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string
    status: string
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Velit Lorem commodo nostrud est laboris aliquip occaecat.',
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            description: 'Exercitation non sunt laboris reprehenderit.',
            status: 'pending',
            createdAt: Date.now() - 1000
        },
        {
            description: 'Eu id non excepteur nostrud sint fugiat laboris labore qui nisi ullamco ex.',
            status: 'pending',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Eiusmod laboris cillum mollit non eu sit amet consequat minim.',
            status: 'finished',
            createdAt: Date.now() - 10000
        }
    ]
}