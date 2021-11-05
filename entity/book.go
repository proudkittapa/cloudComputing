package entity

import "context"

type Book struct{
	Id string `json:"id"`
	Name string `json:"name"`
	AuthorId string `json:"author_id""`
	Price float32 `json:"price"`
	Rating float32 `json:"rating"`
}

type BookRepository interface{
	GetAll(c context.Context) ([]Book, error)
	GetById (c context.Context, bookId string) (Book, error)
	CreateBook(c context.Context, book Book) error
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error
}

type BookUseCase interface{
	GetAll(c context.Context) ([]Book, error)
	GetById (c context.Context, bookId string) (Book, error)
	CreateBook(c context.Context, book Book) error
	UpdateBook(c context.Context, book Book) error
	DeleteBook(c context.Context, bookId string) error
}