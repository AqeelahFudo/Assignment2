const books = require("../models/books");
//const { db } = require("../models/book");
module.exports = {
    index: (req, res) => {
    books.find({})
     .then(books => {
     res.render("home", {
     data: books
         })
        })
        .catch(err => {
            console.log(`Erro users: ${err.message}`)
            res.redirect("/home");
        });
    },
    load_page: (req, res) => {
        books.find({})
        .then(books => {
         res.render("DeleteABook", {
            data: books
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${err.message}`)
            res.redirect("/home");
        });
    },
    add: (req, res) => {
        res.render("AddNewBook");
    },

// exports.bookCreate = (req, res) => {
//     const book = new bookData({
//         name: req.body.Name,
//         author: req.body.Author,
//         link: req.body.Link
//     });
//     book.save();
//     res.redirect("/home");
// }
    create: (req, res, next) => {
        let bookParams = {
            name: req.body.name,
            author: req.body.author,
            link: req.body.link
        };

        books.create(bookParams)
            .then(user => {
                res.locals.redirect = "/home";
                res.locals.books;
                next(); 
            })
            .catch(error => {
                next(error);
            });
    },

    Requestbook: (req,res, next) => {
        let bookId = req.params.id;
        books.findById(bookId)
            .then(book => {
                res.render("book", {
                    data: book
                })            
            })
            .catch(error => {
                res.redirect ("/home");
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    delete: (req, res, next) => {
        let bookId = req.params.bookId;
        books.findOneAndDelete({book:bookId})
            .then(() => {
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error deleting defined book: ${err.message}`);
                next();
            });
    }
};
 /* findbook (req, res) => {
let pages = req.params.pages;
    if (pages == 1) {
        var bookQuery = Book.findOne({
            name: "Dog Days",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book1", {book: data});
        });
    }
    else if (pages == 2) {
        var bookQuery = Book.findOne({
            name: "Diary of Wimpy Kid",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book2", {book: data});
        });
    }
    else if (pages == 3) {
        var bookQuery = Book.findOne({
            name: "Rodrick Rules",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book3", {book: data});
        });

    } 
};
*/