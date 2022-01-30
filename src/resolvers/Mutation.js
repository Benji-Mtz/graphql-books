import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    createUser: (parent, args, { db }, info ) => {
        const isEmailTaken = db.users.some( user => user.email === args.email)
        
        if(isEmailTaken) {
            throw new Error('Email Taken')
        }

        const user = {
            id: uuidv4(),
            ...args
        }

        db.users.push(user)

        return user
    },

    updateUser: (parent, args, { db }, info ) => {
        const { id, ...data } = args;
        const userExist = db.users.find(user => user.id === id)

        if(!userExist) {
            throw new Error('User not found')
        }

        const isEmailTaken = db.users.some( user => user.email === data.email)
        
        if(isEmailTaken) throw new Error('Email Taken')

        db.users = db.users.map( user => {
            if(user.id === id ){
                user = {...user, ...data}
                return user
            }
            return user
        })
        return { ...userExist, ...data}
    },

    createAuthor: (parent, args, { db }, info ) => {
        const author = {
            id: uuidv4(),
            ...args
        }

        db.authors.push(author)

        return author
    },

    updateAuthor: (parent, args, { db }, info ) => {
        const { id, ...data} = args;
        // Verificar que exista el author
        const authorExist = db.authors.find(author => author.id === id);
        // Sino existe mandamos error
        if(!authorExist) throw new Error("Author no existe")
        
        // Actualizamos en la DB
        db.authors = db.authors.map( author => {
            if(author.id === id){
                author = {
                    ...author, ...data
                }
                return author
            }
            return author
        })

        // Retornamos el author con su datos actualizados para mostrar al frontend
        return {...authorExist, ...data}
    },

    createBook:  (parent, args, { db }, info ) => {
        const book = {
            id: uuidv4(),
            ...args
        }
        db.books.push(book)

        return book
    }
}

export default Mutation