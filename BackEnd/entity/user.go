package entity

import "context"

type User struct {
	UserId         string `json:"book_id"`
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	PaymentId      string `json:"payment_id"`
	Age            int    `json:"age"`
	Email          string `json:"email"`
	Role           string `json:"role"`
	SubscriptionId string `json:"subscription_id"`
}

type UserRepository interface {
	GetAll(c context.Context) ([]User, error)
	GetById(c context.Context, userId string) (User, error)
	Create(c context.Context, user User) error
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string) error
}

type UserUseCase interface {
	GetAll(c context.Context) ([]User, error)
	GetById(c context.Context, userId string) (User, error)
	Create(c context.Context, user User) error
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string) error
}
