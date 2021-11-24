package entity

import "context"

type Book struct {
	BookId      string  `json:"book_id"`
	Name        string  `json:"name"`
	UserId      string  `json:"user_id"`
	Price       float32 `json:"price"`
	Rating      float32 `json:"rating"`
	Description string  `json:"description"`
	Img         string  `json:"img"`
	Url         string  `json:"url"`
}

type BookRepository interface {
	GetAll(c context.Context) ([]Book, error)
	GetById(c context.Context, bookId string) (Book, error)
	CreateBook(c context.Context, book Book) (id string, err error)
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error

	CreateShelf(c context.Context, shelfName string) (string, error)       //Create New shelf
	AddBookToShelf(c context.Context, shelfId string, bookId string) error //Add book to existing shelf

	GetBooksIdFromShelf(c context.Context, shelfId string) (BooksId, error) //Get all books(id) from shelf
	CreateUserShelf(c context.Context, userId, shelfId string) error        // Add to user_shelf

	CreateBookDB() error
}

type BookUseCase interface {
	//book
	GetAll(c context.Context) ([]Book, error)
	GetById(c context.Context, bookId string) (Book, User, error)
	CreateBook(c context.Context, book Book) (id string, err error)
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error
	AddBook(c context.Context, bookId string, userId string) error
	//shelf
	GetBooksFromShelf(c context.Context, shelfId string) ([]Book, []User, error)

	InitDB() error
}
