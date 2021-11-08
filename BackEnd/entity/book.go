package entity

import "context"

type Book struct {
	BookId      string  `json:"book_id"`
	Name        string  `json:"name"`
	UserId      string  `json:"user_id"`
	Price       float32 `json:"price"`
	Rating      float32 `json:"rating"`
	Description string  `json:"description"`
}

type BookRepository interface {
	GetAll(c context.Context) ([]Book, error)
	GetById(c context.Context, bookId string) (Book, error)
	CreateBook(c context.Context, book Book) error
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error
	AddBook(c context.Context, bookId string, userId string) error
}

type BookUseCase interface {
	GetAll(c context.Context) ([]Book, error)
	GetById(c context.Context, bookId string) (Book, error)
	CreateBook(c context.Context, book Book) error
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error
	AddBook(c context.Context, bookId string, userId string) error
}
