package repository

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/proudkittapa/cloudComputing/entity"
)

type UserRepository struct {
	db *dynamodb.DynamoDB
}

func NewUserRepository(db *dynamodb.DynamoDB) *UserRepository {
	return &UserRepository{db: db}
}

func (repo *UserRepository) GetAll(c context.Context) ([]entity.User, error) {
	var Users []entity.User

	input := &dynamodb.ScanInput{
		TableName: aws.String("user"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		panic(err)
	}

	for _, i := range result.Items {
		user := entity.User{}

		err = dynamodbattribute.UnmarshalMap(i, &user)

		if err != nil {
			log.Fatalf("Got error unmarshalling: %s", err)
			return []entity.User{}, err
		}

		fmt.Println("Found user:")
		fmt.Println("UserId:  ", user.UserId)
		fmt.Println("FirstName: ", user.FirstName)
		fmt.Println("LastName:  ", user.LastName)
		fmt.Println("PaymentId: ", user.PaymentId)
		fmt.Println("Age: ", user.Age)
		fmt.Println("Email: ", user.Email)
		fmt.Println("Role: ", user.Role)
		fmt.Println("SubscriptionId: ", user.SubscriptionId)
		Users = append(Users, user)
	}
	return Users, nil
}

func (repo *UserRepository) GetById(c context.Context, id string) (entity.User, error) {

	tableName := "user"

	input := &dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(id),
			},
		},
	}

	result, err := repo.db.GetItem(input)

	if err != nil {
		log.Fatalf("Got error calling GetItem: %s", err)
	}

	if result.Item == nil {
		msg := "Could not find '" + id + "'"
		fmt.Println(msg)
	}

	user := entity.User{}

	err = dynamodbattribute.UnmarshalMap(result.Item, &user)

	if err != nil {
		log.Fatalf("Got error unmarshalling: %s", err)
		return entity.User{}, err
	}

	fmt.Println("Found user:")
	fmt.Println("UserId:  ", user.UserId)
	fmt.Println("FirstName: ", user.FirstName)
	fmt.Println("LastName:  ", user.LastName)
	fmt.Println("PaymentId: ", user.PaymentId)
	fmt.Println("Age: ", user.Age)
	fmt.Println("Email: ", user.Email)
	fmt.Println("Role: ", user.Role)
	fmt.Println("SubscriptionId: ", user.SubscriptionId)
	return user, nil
}

func (repo *UserRepository) Create(c context.Context, user entity.User) error {
	user.UserId = GenerateUUID()
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		log.Fatalf("Got error marshalling new movie item: %s", err)
	}

	tableName := "user"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		log.Fatalf("Got error calling PutItem: %s", err)
	}

	fmt.Println("Successfully added '" + user.FirstName + " " + user.LastName + "' (" + user.UserId + ") to table " + tableName)
	return nil
}

func (repo *UserRepository) Update(c context.Context, user entity.User) error {
	tableName := "user"

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#UID":   aws.String("user_id"),
			"#FN":    aws.String("firstName"),
			"#LN":    aws.String("lastName"),
			"#PID":   aws.String("payment_Id"),
			"#AGE":   aws.String("age"),
			"#EMAIL": aws.String("email"),
			"#ROLE":  aws.String("role"),
			"#SUB":   aws.String("subscription_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":fn": {
				S: aws.String(user.FirstName),
			},
			":ln": {
				S: aws.String(user.LastName),
			},
			":pid": {
				S: aws.String(user.PaymentId),
			},
			":age": {
				N: aws.String(strconv.Itoa(user.Age)),
			},
			":em": {
				S: aws.String(user.Email),
			},
			":ro": {
				S: aws.String(user.Role),
			},
			":sub": {
				S: aws.String(user.SubscriptionId),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(user.UserId),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #UID = :uid, #FN = :fn, #LN = :ln, #PID = :pid, #AGE = :age, #EMAIL = :em, #ROLE = :ro, #SUB = :sub"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		log.Fatalf("Got error calling UpdateItem: %s", err)
	}

	fmt.Println("Successfully updated '" + user.FirstName + " " + user.LastName + "' (" + user.UserId + ")")
	return nil
}

func (repo *UserRepository) Delete(c context.Context, id string) error {
	//delete user with the given id
	tableName := "user"

	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(id),
			},
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.DeleteItem(input)
	if err != nil {
		log.Fatalf("Got error calling DeleteItem: %s", err)
	}

	fmt.Println("Deleted User Id'" + id + ") from table " + tableName)
	return nil
}
