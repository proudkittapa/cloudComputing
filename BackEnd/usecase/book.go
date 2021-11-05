package usecase

import (
	"context"
	"fmt"
	"github.com/proudkittapa/cloudComputing/entity"
)

type bookUseCase struct{
	bookRepo entity.BookRepository
}

func NewBookUseCase(bookRepo entity.BookRepository) entity.BookUseCase{
	return &bookUseCase{bookRepo: bookRepo}
}

func (useCase *bookUseCase) GetAll(c context.Context) ([]entity.Book, error) {
	books, err := useCase.bookRepo.GetAll(c)
	fmt.Println("book usecase", books)
	return books, err
}

func (useCase *bookUseCase) GetById(c context.Context, id string) (entity.Book, error) {
	book, err := useCase.bookRepo.GetById(c, id)
	return book, err
}

func (useCase *bookUseCase) CreateBook(c context.Context, book entity.Book) error {
	err := useCase.bookRepo.CreateBook(c, book)
	return err
}

func (useCase *bookUseCase) UpdateBook(c context.Context, book entity.Book) error {
	err := useCase.bookRepo.UpdateBook(c, book)
	return err
}

func (useCase *bookUseCase) DeleteBook(c context.Context, id string) error {
	err := useCase.bookRepo.DeleteBook(c, id)
	return err
}