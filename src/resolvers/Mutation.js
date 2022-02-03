import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    //name_mutation (parent, args, ctx, info )
    createUser: (parent, { data }, { prisma }, info ) => {
        /*const isEmailTaken = db.users.some( user => user.email === data.email)
        if(isEmailTaken) {
            throw new Error('Email Taken')
        }
        const user = {
            id: uuidv4(),
            ...data
        }
        db.users.push(user)
        return user*/
        return prisma.users.create({
            data,
        })
    },

    updateUser: (parent, { id, data }, { prisma }, info ) => {
        /*const userExist = db.users.find(user => user.id === id)
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
        return { ...userExist, ...data}*/
        return prisma.users.update({
            where: {
                id
            },
            data,
        })
    },

    createAuthor: async (parent, {data}, { prisma }, info ) => {
        /*const author = {
            id: uuidv4(),
            ...data
        }
        db.authors.push(author)
        return author*/
        const { register_by, ...rest } = data;

        const newAuthor = await prisma.authors.create({
            data: {
                ...rest,
                users: {
                    connect: {
                        id: Number(register_by)
                    }
                }
            }
        })

        return newAuthor
    },

    updateAuthor: async(parent, { id, data }, { prisma }, info ) => {
        // Verificar que exista el author
        /*const authorExist = db.authors.find(author => author.id === id);
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
        return {...authorExist, ...data}*/
        const { register_by } = data;

        if(register_by){
            data.users = {
                connect: {
                    id: Number(register_by)
                }
            }
        }

        const authorUpdated = await prisma.authors.update({
            where:{
                id: Number(id)
            },
            data
        })

        return authorUpdated
    },

    createBook: async (parent, { data }, { prisma }, info ) => {
        /*const book = {
            id: uuidv4(),
            ...data
        }
        db.books.push(book)
        return book*/

        const { writted_by, register_by, ...rest } = data;

        const newBook = await prisma.books.create({
            data: {
                ...rest,
                authors: {
                    connect: {
                        id: Number(writted_by)
                    }
                },
                users: {
                    connect: {
                        id: Number(register_by)
                    }
                }
            }
        })

        return newBook
    },

    updateBook: async (parent, { id, data }, { prisma }, info ) => {
        /*const bookExist = db.books.find(book => book.id === id )
        if(!bookExist){
            throw new Error('Book not found!')
        }
        db.books = db.books.map( book => {
            if(book.id === id) {
                book = {
                    ...book,
                    ...data
                }
                return book
            }
            return book
        })
        return { ...bookExist, ...data }*/
        const { writted_by, register_by } = data;
        if(writted_by){
            data.authors = {
                connect: {
                    id: Number(writted_by)
                }
            }
        }
        if(register_by){
            data.users = {
                connect: {
                    id: Number(register_by)
                }
            }
        }
        const bookUpdated = await prisma.books.updated({
            where: {
                id: Number(id)
            }, 
            data
        })
        return bookUpdated
    },

    deleteBook: async(parent, { id }, { prisma }, info ) => {
        /*const bookExist = db.books.find(book => book.id === id )
        if (!bookExist) {
            throw new Error('Book not found')
        }
        db .books = db.books.reduce( (acc, book) => {
            if (book.id !== id) {
                acc.push(book)
            }
            return acc
        }, [
            // Acc inicializado en array vacio
        ])
        return bookExist*/
        const bookDelete = await prisma.books.delete({
            where: {
                id: Number(id)
            }
        })

        return bookDelete
    },
}

export default Mutation