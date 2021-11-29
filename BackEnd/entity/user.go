package entity

import "context"

type User struct {
	UserId    string  `json:"user_id"`
	Username  string  `json:"username"`
	FullName  string  `json:"full_name"`
	Age       int     `json:"age"`
	Email     string  `json:"email"`
	Role      string  `json:"role"`
	PaymentId string  `json:"payment_id"`
	Balance   float32 `json:"balance"`
	Img       string  `json:"img"`
}

type UserRepository interface {
	GetAll(c context.Context) ([]User, error)
	GetById(c context.Context, userId string) (User, error)
	GetByName(c context.Context, fullname string) ([]User, error)
	Create(c context.Context, user User) (string, error)
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string, userName string) error
	CreateUserDB() error

	CreatePayment(c context.Context, payment Payment) (string, error) //TODO add get payment by id
	UpdatePayment(c context.Context, userId string, username string, paymentId string) error
	GetPaymentById(c context.Context, id string) (Payment, error)

	MockUser(c context.Context, numOfUser int) error
	CreateUserShelfDB() error
	CreateShelfDB() error
	CreateSubscription(c context.Context, userId string) error
	UpdateBalance(c context.Context, uid string, username string, balance float32) error
	GetAllAuthors(c context.Context) ([]User, error)
	GetAllUsers(c context.Context) ([]User, error)
}

type UserUseCase interface {
	GetAll(c context.Context) ([]User, error)
	GetById(c context.Context, userId string) (User, error)
	Create(c context.Context, user User) (string, error)
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string) error
	AddBook(c context.Context, bookId string, userId string) error

	GetAllShelfByUserId(c context.Context, userId string) ([]Shelf, error)
	CreateShelf(c context.Context, userId string, shelf Shelf) error
	AddBookToShelf(c context.Context, shelfId string, bookId string) error

	CreateSubscription(c context.Context, userId string) error

	CreatePayment(c context.Context, userId string, payment Payment) error
	AddBalance(c context.Context, userId string, balance float32) (currentBalance float32, err error)
	MockUser(c context.Context, numOfUser int) error
	InitUserDB() error
	InitUserShelfDB() error
	InitShelfDB() error
	InitAll() error

	GetAllAuthor(c context.Context) ([]User, error)
	GetAllUsers(c context.Context) ([]User, error)

	GetPayment(c context.Context, id string)(Payment, error)
}
