const Book = {
    writted_by: async (parent, args, { prisma }, info) => {
        // return db.authors.find( author => author.id === parent.writted_by)
        return await prisma.books
        .findOne({
            where: {
                id: parent.id,
            },
        }).authors()
    },

    register_by: async (parent, args, { prisma }, info) => {
    
        return await prisma.books
        .findOne({
            where: {
                id: parent.id,
            },
        }).users()
    },
}

export default Book