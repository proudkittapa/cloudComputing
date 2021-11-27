package usecase

import (
	"context"
	"fmt"

	"github.com/pkg/errors"
	"github.com/proudkittapa/cloudComputing/entity"
)

type userUseCase struct {
	userRepo      entity.UserRepository
	userTransRepo entity.UserTransactionRepository
	bookRepo      entity.BookRepository
}

func NewUserUseCase(user entity.UserRepository, userTransRepo entity.UserTransactionRepository, bookRepo entity.BookRepository) entity.UserUseCase {
	return &userUseCase{
		userRepo:      user,
		userTransRepo: userTransRepo,
		bookRepo:      bookRepo,
	}
}

func (useCase *userUseCase) GetAll(c context.Context) ([]entity.User, error) {
	users, err := useCase.userRepo.GetAll(c)
	return users, err
}

func (useCase *userUseCase) GetAllAuthor(c context.Context) ([]entity.User, error){
	return []entity.User{}, nil
}

func (useCase *userUseCase) GetById(c context.Context, id string) (entity.User, error) {
	user, err := useCase.userRepo.GetById(c, id)
	return user, err
}

func (useCase *userUseCase) Create(c context.Context, user entity.User) error {
	id, err := useCase.userRepo.Create(c, user)
	if err != nil {
		return err
	}

	err = useCase.CreateShelf(c, id, "Your Shelf")

	return err
}

func (useCase *userUseCase) Update(c context.Context, user entity.User) error {
	err := useCase.userRepo.Update(c, user)
	return err
}

func (useCase *userUseCase) Delete(c context.Context, id string) error {
	err := useCase.userRepo.Delete(c, id)
	return err
}

func (useCase *userUseCase) AddBook(c context.Context, bookId string, userId string) error {
	//buy book
	check, err := useCase.userTransRepo.CheckSubscription(c, userId)
	if err != nil {
		fmt.Println("here checkkk")
		return err
	}
	fmt.Println("check", check)
	if check {
		err = useCase.userTransRepo.AddBook(c, bookId, userId)
	} else {
		user, err := useCase.userRepo.GetById(c, userId)
		if err != nil {
			fmt.Println("err get by id", err)
			return err
		}
		book, err := useCase.bookRepo.GetById(c, bookId)
		if err != nil{
			fmt.Println("get by id", err)
			return err
		}
		fmt.Println("book price", book.Price)
		fmt.Println("user balance", user.Balance)
		if book.Price <= user.Balance {
			fmt.Println("")
			updateBal := user.Balance - book.Price

			err = useCase.userRepo.UpdateBalance(c, userId, user.FullName, updateBal)
			if err != nil {
				fmt.Println("update bal err", err)
				return err
			}
			err = useCase.userTransRepo.AddBook(c, bookId, userId)
			if err != nil {
				fmt.Println("add book err ", err)
				return err
			}
		} else {
			return errors.New("Insufficient balance")
		}
	}
	return err
}
func (useCase *userUseCase) InitUserDB() error {
	err := useCase.userRepo.CreateUserDB()
	return err
}

func (useCase *userUseCase) GetAllShelfByUserId(c context.Context, userId string) ([]entity.Shelf, error) {
	_, err := useCase.userRepo.GetById(c, userId)
	if err != nil {
		return []entity.Shelf{}, err
	}
	shelf, err := useCase.userTransRepo.GetAllShelfByUserId(c, userId)
	return shelf, err
}

func (useCase *userUseCase) CreatePayment(c context.Context, userId string, payment entity.Payment) error {
	paymentId, err := useCase.userRepo.CreatePayment(c, payment)
	if err != nil {
		return err
	}
	user, err := useCase.userRepo.GetById(c, userId)
	if err != nil {
		return err
	}
	err = useCase.userRepo.UpdatePayment(c, userId, user.FullName, paymentId)
	return err
}

func (useCase *userUseCase) CreateShelf(c context.Context, userId string, shelfName string) error {
	if shelfName == ""{
		return errors.New("Shelf name can't be empty")
	}
	_, err := useCase.userRepo.GetById(c, userId)
	if err != nil {
		return err
	}
	shelves, err := useCase.userTransRepo.GetAllShelfByUserId(c, userId)
	for _, s := range shelves {
		if s.Name == shelfName {
			return errors.New("Shelf name already existed")
		}
	}
	shelfId, err := useCase.bookRepo.CreateShelf(c, shelfName)
	if err != nil {
		return err
	}
	err = useCase.bookRepo.CreateUserShelf(c, userId, shelfId)
	return err
}

func (useCase *userUseCase) AddBookToShelf(c context.Context, shelfId string, bookId string) error {
	err := useCase.bookRepo.AddBookToShelf(c, shelfId, bookId)
	return err
}

func (useCase *userUseCase) MockUser(c context.Context, numOfUser int) error {
	err := useCase.userRepo.MockUser(c, numOfUser)
	return err
}

func (useCase *userUseCase) InitUserShelfDB() error {
	err := useCase.userRepo.CreateUserShelfDB()
	return err
}
func (useCase *userUseCase) InitShelfDB() error {
	err := useCase.userRepo.CreateShelfDB()
	return err
}

func (useCase *userUseCase) InitAll() error {
	err := useCase.userRepo.CreateShelfDB()
	if err != nil {
		return err
	}
	err = useCase.userRepo.CreateUserDB()
	if err != nil {
		return err
	}
	err = useCase.userRepo.CreateUserShelfDB()
	if err != nil {
		return err
	}
	err = useCase.bookRepo.CreateBookDB()
	if err != nil {
		return err
	}
	err = useCase.userTransRepo.CreateUserTransactionDB()
	if err != nil {
		return err
	}
	err = useCase.userTransRepo.CreatePaymentDB()
	if err != nil {
		return err
	}
	err = useCase.userTransRepo.CreateSubscriptionDB()
	return err
}

func (useCase *userUseCase) CreateSubscription(c context.Context, userId string) error {
	user, err := useCase.userRepo.GetById(c, userId)
	if err != nil {
		return err
	}
	if user.Balance >= 50 {
		err = useCase.userRepo.CreateSubscription(c, userId)
	} else {
		return errors.New("Can't create subscription. The balance in the wallet is not enough")
	}
	return err
}

func (useCase *userUseCase) AddBalance(c context.Context, userId string, balance float32) (currentBalance float32, err error) {
	user, err := useCase.userRepo.GetById(c, userId)
	if err != nil {
		return 0, err
	}
	currentBalance = user.Balance+balance

	err = useCase.userRepo.UpdateBalance(c, userId, user.FullName, currentBalance)
	if err != nil{
		return 0, err
	}
	return currentBalance, err
}
