const Author = {
    // Busca objetos de usuarios que crearon al author
    register_by: (parent, args, { prisma }, info) => {
        // user.id = X_num === parent.register_by que es igual a author->register_by = X_num
        // return db.users.find( user => user.id === parent.register_by)
        console.log(parent);
        console.log(prisma.authors);
        return prisma.authors
            .findOne({
                where: {
                    id: parent.id,
                },
            })
            .users()
    },

    books: (parent, args, { prisma }, info) => {
        // return prisma.books.filter( books => books.writted_by === parent.id)
        console.log(parent);
        return prisma.authors
            .findOne({
                where: {
                    id: parent.id,
                },
            })
            .books()
    }
}

export default Author