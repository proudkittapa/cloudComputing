package repository

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/pkg/errors"
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
		return err
	}

	tableName := "user_transaction"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return err
	}

	// fmt.Println("Successfully added User Transaction '" + userTransaction.UserId + "' to table " + tableName + "at" + userTransaction.Time)
	return nil
}

func (repo *UserTransactionRepository) CreateUserTransactionDB() error {
	tableName := "user_transaction"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("transaction_id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("transaction_id"),
				KeyType:       aws.String("HASH"),
			},
		},
		ProvisionedThroughput: &dynamodb.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(5),
			WriteCapacityUnits: aws.Int64(5),
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.CreateTable(input)
	if err != nil {
		return err
	}

	// fmt.Println("Created the table", tableName)
	return nil
}

func (repo *UserTransactionRepository) CreateSubscriptionDB() error {
	tableName := "subscriptions"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("subscription_id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("subscription_id"),
				KeyType:       aws.String("HASH"),
			},
		},
		ProvisionedThroughput: &dynamodb.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(5),
			WriteCapacityUnits: aws.Int64(5),
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.CreateTable(input)
	if err != nil {
		return err
	}

	// fmt.Println("Created the table", tableName)
	return nil
}

func (repo *UserTransactionRepository) CreatePaymentDB() error {
	tableName := "payments"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("payment_id"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("card_name"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("payment_id"),
				KeyType:       aws.String("HASH"),
			},
			{
				AttributeName: aws.String("card_name"),
				KeyType:       aws.String("RANGE"),
			},
		},
		ProvisionedThroughput: &dynamodb.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(5),
			WriteCapacityUnits: aws.Int64(5),
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.CreateTable(input)
	if err != nil {
		return err
	}

	// fmt.Println("Created the table", tableName)
	return nil
}

func (repo *UserTransactionRepository) CheckSubscription(c context.Context, id string) (bool, error) {
	var Subs []entity.Subscription

	input := &dynamodb.ScanInput{
		TableName: aws.String("subscriptions"),
		ExpressionAttributeNames: map[string]*string{
			"#uid": aws.String("user_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {

				S: aws.String(id),
			},
		},
		FilterExpression: aws.String("#uid = :id"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return false, err
	}

	for _, i := range result.Items {
		sub := entity.Subscription{}

		err = dynamodbattribute.UnmarshalMap(i, &sub)

		if err != nil {
			return false, err
		}

		endTime, _ := strconv.ParseInt(sub.EndDate, 10, 64)
		if time.Unix(endTime, 0).After(time.Now()) {
			Subs = append(Subs, sub)
		}

	}

	return len(Subs) != 0, nil
}

func (repo *UserTransactionRepository) CheckPayment(ctx context.Context, paymentId string) (bool, error) {
	var Payments []entity.Payment

	input := &dynamodb.ScanInput{
		TableName: aws.String("payments"),
		ExpressionAttributeNames: map[string]*string{
			"#pid": aws.String("payment_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {

				S: aws.String(paymentId),
			},
		},
		FilterExpression: aws.String("#pid = :id"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return false, err
	}

	for _, i := range result.Items {
		payment := entity.Payment{}

		err = dynamodbattribute.UnmarshalMap(i, &payment)

		if err != nil {
			return false, err
		}
		fmt.Println(payment.Exp)
		splitedExp := strings.Split(payment.Exp, "/")
		cardExp := splitedExp[1] + splitedExp[0]
		if cardExp >= time.Now().Format("0601") {
			Payments = append(Payments, payment)
		}
		fmt.Println(Payments)

	}
	return len(Payments) != 0, nil
}

func (repo *UserTransactionRepository) GetAllShelfByUserId(c context.Context, userId string) ([]entity.Shelf, error) {
	var Shelves []entity.Shelf

	// find shelf_id from user_id
	input := &dynamodb.ScanInput{
		TableName: aws.String("user_shelf"),
		ExpressionAttributeNames: map[string]*string{
			"#uid": aws.String("user_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":uid": {

				S: aws.String(userId),
			},
		},
		FilterExpression: aws.String("#uid = :uid"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return Shelves, err
	}

	// for each shelf_id of user, find book shelves
	for _, i := range result.Items {
		userShelf := entity.UserShelf{}

		err = dynamodbattribute.UnmarshalMap(i, &userShelf)

		if err != nil {
			return []entity.Shelf{}, err
		}

		// get all shelves from a shelf_id
		input := &dynamodb.ScanInput{
			TableName: aws.String("shelf"),
			ExpressionAttributeNames: map[string]*string{
				"#sid": aws.String("shelf_id"),
			},
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":sid": {

					S: aws.String(userShelf.ShelfId),
				},
			},
			FilterExpression: aws.String("#sid = :sid"),
		}

		result, err := repo.db.Scan(input)
		if err != nil {
			return []entity.Shelf{}, err
		}

		for _, i := range result.Items {
			shelf := entity.Shelf{}

			err = dynamodbattribute.UnmarshalMap(i, &shelf)

			if err != nil {
				return []entity.Shelf{}, err
			}

			Shelves = append(Shelves, shelf)
		}

	}
	return Shelves, nil
}

func (repo *UserTransactionRepository) GetDefaultShelfByUserId(c context.Context, userId string) (string, error) {

	// find shelf_id from user_id
	input := &dynamodb.ScanInput{
		TableName: aws.String("user_shelf"),
		ExpressionAttributeNames: map[string]*string{
			"#uid": aws.String("user_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":uid": {

				S: aws.String(userId),
			},
		},
		FilterExpression: aws.String("#uid = :uid"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return "", err
	}

	// for each shelf_id of user, find book shelves
	for _, i := range result.Items {
		userShelf := entity.UserShelf{}

		err = dynamodbattribute.UnmarshalMap(i, &userShelf)

		if err != nil {
			return "", err
		}

		// get all shelves from a shelf_id
		input := &dynamodb.ScanInput{
			TableName: aws.String("shelf"),
			ExpressionAttributeNames: map[string]*string{
				"#sid": aws.String("shelf_id"),
			},
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":sid": {

					S: aws.String(userShelf.ShelfId),
				},
			},
			FilterExpression: aws.String("#sid = :sid"),
		}

		result, err := repo.db.Scan(input)
		if err != nil {
			return "", err
		}

		for _, i := range result.Items {
			shelf := entity.Shelf{}

			err = dynamodbattribute.UnmarshalMap(i, &shelf)

			if err != nil {
				return "", err
			}
			if shelf.Name == "Your Shelf" {
				return shelf.ShelfId, nil
			}
		}
	}
	return "", errors.New("Could not find Default Shelf")
}
