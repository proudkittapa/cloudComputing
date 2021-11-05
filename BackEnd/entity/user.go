package entity

import "context"

type User struct{
	UserId string
	FirstName string
	LastName string
	PaymentId string
	Age int
	Email string
}

type UserRepository interface{
	GetAll(c context.Context) ([]User, error)
	GetById (c context.Context, userId string) (User, error)
	Create(c context.Context, user User) error
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string) error
}

type UserUseCase interface{
	GetAll(c context.Context) ([]User, error)
	GetById (c context.Context, userId string) (User, error)
	Create(c context.Context, user User) error
	Update(c context.Context, user User) error
	Delete(c context.Context, userId string) error
}