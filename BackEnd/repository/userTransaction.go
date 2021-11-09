package repository

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/proudkittapa/cloudComputing/entity"
)

type UserTransactionRepository struct {
	db *dynamodb.DynamoDB
}

func NewUserTransactionRepository(db *dynamodb.DynamoDB) *UserTransactionRepository {
	return &UserTransactionRepository{db: db}
}

func (repo *UserTransactionRepository) AddBook(c context.Context, userId string, bookId string) error {
	//add userId, bookId and time(unix time) to the table userTransaction

	userTransaction := entity.UserTransaction{
		TransactionId: GenerateUUID(),
		BookId:        bookId,
		UserId:        userId,
		Time:          strconv.FormatInt(time.Now().Unix(), 10),
	}
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(userTransaction)
	if err != nil {
		log.Fatalf("Got error marshalling new movie item: %s", err)
	}

	tableName := "user_transaction"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		log.Fatalf("Got error calling PutItem: %s", err)
	}

	fmt.Println("Successfully added User Transaction '" + userTransaction.UserId + "' to table " + tableName + "at" + userTransaction.Time)
	return nil
}
