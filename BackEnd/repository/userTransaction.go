package repository

import (
	"context"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type UserTransactionRepository struct {
	db *dynamodb.DynamoDB
}

func NewUserTransactionRepository(db *dynamodb.DynamoDB) *UserTransactionRepository{
	return &UserTransactionRepository{db: db}
}

func (repo *UserTransactionRepository) AddBook(c context.Context, userId string, bookId string) error{
	//add userId, bookId and time(unix time) to the table userTransaction
	return nil
}