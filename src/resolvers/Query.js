const Query = {
    hello: (parent, args, ctx, info) => {
        const { name } = args;

        return `Hello ${name || 'GraphQL'}`
    },
    quantity: () => 1,
    // Busca Usuarios
    user: (parent, args, ctx, info) => { 
        const { id } = args;
        const { db } = ctx;

        if (!id){
            return db.users
        }

        return db.users.filter( user => user.id === args.id )
    },
    // Busca Authores
    author: (parent, { id }, { db }, info) => {
        if (!id) {
            return db.authors
        }

        return db.authors.filter( author => author.id === id)
    },

    // Busca Libros
    book: (parent, { id }, { db }, info) => {
        if (!id) {
            return db.books
        }

        return db.books.filter( book => book.id === id)
    },

}

export default Query