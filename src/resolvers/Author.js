const Author = {
    // Busca objetos de usuarios que crearon al author
    register_by: (parent, args, { db }, info) => {
        // user.id = X_num === parent.register_by que es igual a author->register_by = X_num
        return db.users.find( user => user.id === parent.register_by)
    },
    books: (parent, args, { db }, info) => {
        
        
        return db.books.filter( books => books.writted_by === parent.id)
    }
}

export default Author