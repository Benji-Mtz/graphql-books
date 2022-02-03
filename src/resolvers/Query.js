const Query = {
    hello: (parent, args, ctx, info) => {
        const { name } = args;

        return `Hello ${name || 'GraphQL'}`
    },
    quantity: () => 1,
    
    // Busca Usuarios
    user: (parent, args, ctx, info) => { 
        const { id } = args;
        const { prisma } = ctx;

        if (!id){
            // return prisma.users
            return prisma.users.findMany()
        }

        // return prisma.users.filter( user => user.id === args.id )
        return prisma.users.findOne({
            where: {
                id,
            },
        })
    },
    // Busca Authores
    author: (parent, { id }, { prisma }, info) => {
        if (!id) {
            return prisma.authors.findMany()
        }

        return prisma.authors.findOne({
            where: {
                id: Number(id),
            },
        })
    },

    // Busca Libros
    book: (parent, { id }, { prisma }, info) => {
        if (!id) {
            return prisma.books.findMany()
        }

        return prisma.books.findOne({
            where: {
                id: Number(id),
            },
        })
    },

}

export default Query