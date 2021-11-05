package repository

import (
	"context"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/proudkittapa/cloudComputing/entity"
)

type UserRepository struct {
	db *dynamodb.DynamoDB
}

func NewUserRepository(db *dynamodb.DynamoDB) *UserRepository{
	return &UserRepository{db: db}
}


func (repo *UserRepository) GetAll(c context.Context)([]entity.User, error){
	var Users []entity.User
	user := entity.User{
		UserId:    "",
		FirstName: "",
		LastName:  "",
		PaymentId: "",
		Age:       0,
		Email:     "",
	}
	Users = append(Users, user)
	//book = entity.Book{
	//	Id:       GenerateUUID(),
	//	Name:     "Book2",
	//	AuthorId: "2",
	//	Price:    1200,
	//	Rating:   0,
	//}
	//books = append(books, book)
	return Users, nil
}

func (repo *UserRepository) GetById(c context.Context, id string)(entity.User, error){
	user := entity.User{
		UserId:    "",
		FirstName: "",
		LastName:  "",
		PaymentId: "",
		Age:       0,
		Email:     "",
	}
	return user, nil
}

func (repo *UserRepository) Create(c context.Context, user entity.User) error {

	return nil
}

func (repo *UserRepository) Update(c context.Context, user entity.User) error {

	return nil
}

func (repo *UserRepository) Delete(c context.Context, id string) error {

	return nil
}
