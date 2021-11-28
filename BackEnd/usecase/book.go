package usecase

import (
	"context"
	"fmt"
	"github.com/pkg/errors"
	"github.com/proudkittapa/cloudComputing/entity"
)

type bookUseCase struct{
	bookRepo entity.BookRepository
	userRepo entity.UserRepository
	userTransRepo entity.UserTransactionRepository
}

func NewBookUseCase(bookRepo entity.BookRepository, userRepo entity.UserRepository, userTransactionRepo entity.UserTransactionRepository) entity.BookUseCase{
	return &bookUseCase{
		bookRepo: bookRepo,
		userRepo: userRepo,
		userTransRepo: userTransactionRepo,
	}
}

func (useCase *bookUseCase) GetAll(c context.Context) ([]entity.Book, error) {
	pag := entity.Pagination{}
	books, err := useCase.bookRepo.GetAll(c, pag )
	return books, err
}

func (useCase *bookUseCase) GetById(c context.Context, id string) (entity.Book, entity.User, error) {
	book, err := useCase.bookRepo.GetById(c, id)
	if err != nil{
		return entity.Book{}, entity.User{}, err
	}
	user, err := useCase.userRepo.GetById(c, book.UserId)
	if err != nil{
		return entity.Book{}, entity.User{}, err
	}
	return book, user, err
}

func (useCase *bookUseCase) CreateBook(c context.Context, book entity.Book) (string, error) {
	user, err := useCase.userRepo.GetById(c, book.UserId)
	if err != nil{
		fmt.Println("get by id", err)
		return "", err
	}
	id, err := useCase.bookRepo.CreateBook(c, book)
	if err != nil{
		fmt.Println("create", err)
		return "", err
	}
	user.Role = "Author"
	err = useCase.userRepo.Update(c, user)
	return id, err
}

func (useCase *bookUseCase) UpdateBook(c context.Context, book entity.Book) error {
	err := useCase.bookRepo.UpdateBook(c, book)
	return err
}

func (useCase *bookUseCase) DeleteBook(c context.Context, id string) error {
	book, err := useCase.bookRepo.GetById(c, id)
	if err != nil{
		return err
	}
	err = useCase.bookRepo.DeleteBook(c, id, book.Name)
	return err
}

func (useCase *bookUseCase) AddBook(c context.Context, bookId string, userId string) error {
	check, err := useCase.userTransRepo.CheckSubscription(c, userId)
	if err != nil{
		return err
	}
	if check{
		err = useCase.userTransRepo.AddBook(c, bookId, userId)
	}else{
		user, err := useCase.userRepo.GetById(c, userId)
		if err != nil{
			return err
		}
		checkPayment, err := useCase.userTransRepo.CheckPayment(c, user.PaymentId)
		if !checkPayment{
			return errors.New("The payment is invalid")
		}
		if err != nil{
			return err
		}
		err = useCase.userTransRepo.AddBook(c, bookId, userId)
	}
	return err
}

func (useCase *bookUseCase) InitDB() error {
	err := useCase.bookRepo.CreateBookDB()
	return err
}




func (useCase *bookUseCase) GetBooksFromShelf(c context.Context, shelfId string) ([]entity.Book, []entity.User, error)  {
	booksId, err := useCase.bookRepo.GetBooksIdFromShelf(c, shelfId)
	if err != nil{
		return []entity.Book{}, []entity.User{}, err
	}
	var books []entity.Book
	var users []entity.User
	for _, v := range booksId.Books{
		book, err := useCase.bookRepo.GetById(c, v)
		if err != nil{
			return []entity.Book{}, []entity.User{}, err
		}
		user, err := useCase.userRepo.GetById(c, book.UserId)
		users = append(users, user)
		books = append(books, book)
	}
	return books, users, err
}
