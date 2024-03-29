package repository

import (
	"bufio"
	"context"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/pkg/errors"

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

func UrlToLines(url string) ([]string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	// return LinesFromReader(resp.Body)
	var lines []string
	scanner := bufio.NewScanner(resp.Body)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	resp.Body.Close()

	return lines, nil
}

func (repo *UserRepository) GetAll(c context.Context) ([]entity.User, error) {
	var Users []entity.User

	input := &dynamodb.ScanInput{
		TableName: aws.String("users"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return []entity.User{}, err
	}

	for _, i := range result.Items {
		user := entity.User{}

		err = dynamodbattribute.UnmarshalMap(i, &user)

		if err != nil {
			return []entity.User{}, err
		}

		Users = append(Users, user)
	}
	return Users, nil
}

func (repo *UserRepository) GetById(c context.Context, id string) (entity.User, error) {

	queryInput := &dynamodb.QueryInput{
		TableName: aws.String("users"),
		KeyConditions: map[string]*dynamodb.Condition{
			"user_id": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(id),
					},
				},
			},
		},
	}

	result, err := repo.db.Query(queryInput)
	if err != nil {
		return entity.User{}, err
	}

	user := []entity.User{}

	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &user)
	//fmt.Println("user", user)
	if err != nil {
		return entity.User{}, err
	}
	if len(user) == 0 {
		return entity.User{}, errors.New("This user id doesn't exist")
	}

	return user[0], nil
}

func (repo *UserRepository) GetByName(c context.Context, name string) ([]entity.User, error) {
	var Users []entity.User

	input := &dynamodb.ScanInput{
		TableName: aws.String("users"),
		ExpressionAttributeNames: map[string]*string{
			"#name": aws.String("full_name"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":n": {

				S: aws.String(name),
			},
		},
		FilterExpression: aws.String("#name = :n"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return []entity.User{}, err
	}

	for _, i := range result.Items {
		user := entity.User{}

		err = dynamodbattribute.UnmarshalMap(i, &user)

		if err != nil {
			return []entity.User{}, err
		}
		Users = append(Users, user)
	}
	if len(Users) == 0 {
		return []entity.User{}, errors.New("Name doesn't exist")
	}
	return Users, nil
}

func (repo *UserRepository) GetAllAuthors(c context.Context) ([]entity.User, error) {
	var Users []entity.User

	input := &dynamodb.ScanInput{
		TableName: aws.String("users"),
		ExpressionAttributeNames: map[string]*string{
			"#ROLE": aws.String("role"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":r": {

				S: aws.String("Author"),
			},
		},
		FilterExpression: aws.String("#ROLE = :r"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return []entity.User{}, err
	}

	for _, i := range result.Items {
		user := entity.User{}

		err = dynamodbattribute.UnmarshalMap(i, &user)

		if err != nil {
			return []entity.User{}, err
		}
		Users = append(Users, user)
	}
	if len(Users) == 0 {
		return []entity.User{}, errors.New("Name doesn't exist")
	}
	return Users, nil
}

func (repo *UserRepository) GetAllUsers(c context.Context) ([]entity.User, error) {
	var Users []entity.User

	input := &dynamodb.ScanInput{
		TableName: aws.String("users"),
		ExpressionAttributeNames: map[string]*string{
			"#ROLE": aws.String("role"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":r": {

				S: aws.String("User"),
			},
		},
		FilterExpression: aws.String("#ROLE = :r"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return []entity.User{}, err
	}

	for _, i := range result.Items {
		user := entity.User{}

		err = dynamodbattribute.UnmarshalMap(i, &user)

		if err != nil {
			return []entity.User{}, err
		}
		Users = append(Users, user)
	}
	if len(Users) == 0 {
		return []entity.User{}, errors.New("Name doesn't exist")
	}
	return Users, nil
}

func (repo *UserRepository) Create(c context.Context, user entity.User) (string, error) {
	user.UserId = GenerateUUID()
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		return "", err
	}

	tableName := "users"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return "", err
	}

	// fmt.Println("Successfully added '" + user.FullName + "' (" + user.UserId + ") to table " + tableName)
	return user.UserId, nil
}

func (repo *UserRepository) Update(c context.Context, user entity.User) error {
	tableName := "users"

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#FN":    aws.String("full_name"),
			"#PID":   aws.String("payment_id"),
			"#AGE":   aws.String("age"),
			"#EMAIL": aws.String("email"),
			"#ROLE":  aws.String("role"),
			"#IMG":   aws.String("img"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":fn": {
				S: aws.String(user.FullName),
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
			":img": {
				S: aws.String(user.Img),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(user.UserId),
			},
			"username": {
				S: aws.String(user.Username),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #FN = :fn, #PID = :pid, #AGE = :age, #EMAIL = :em, #ROLE = :ro, #IMG = :img"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		return err
	}

	// fmt.Println("Successfully updated '" + user.FullName + "' (" + user.UserId + ")")
	return nil
}

func (repo *UserRepository) Delete(c context.Context, id string, username string) error {
	//delete user with the given id
	tableName := "users"

	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(id),
			},
			"username": {
				S: aws.String(username),
			},
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.DeleteItem(input)
	if err != nil {
		return err
	}

	// fmt.Println("Deleted User Id'" + id + ") from table " + tableName)
	return nil
}

func (repo *UserRepository) CreateUserDB() error {
	tableName := "users"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("user_id"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("username"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("user_id"),
				KeyType:       aws.String("HASH"),
			},
			{
				AttributeName: aws.String("username"),
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
	return err
}

func (repo *UserRepository) CreateUserShelfDB() error {
	tableName := "user_shelf"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("user_shelf_id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("user_shelf_id"),
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
	return err
}

func (repo *UserRepository) CreateShelfDB() error {
	tableName := "shelf"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("shelf_id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("shelf_id"),
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
	return err
}

func (repo *UserRepository) MockUser(c context.Context, numOfUser int) error {
	bookRepo := NewBookRepository(repo.db)
	text, err := UrlToLines("https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/name.txt")
	if err != nil {
		return err
	}
	nameCount := 0
	count := int(numOfUser / 4)
	numOfUser -= count
	// fmt.Println("Normal users: ")
	for i := 0; i < count; i++ {
		username := text[nameCount] + text[nameCount+1]
		fullname := text[nameCount] + " " + text[nameCount+1]
		nameCount += 2
		Payment := entity.Payment{
			CardNumber: "1234567890123456",
			Exp:        "06/22",
			Ccv:        "123",
			CardName:   fullname,
		}
		pid, _ := repo.CreatePayment(c, Payment)
		User := entity.User{
			Username:  username,
			FullName:  fullname,
			Age:       rand.Intn(80-1+1) + 1,
			Email:     username + "@gmail.com",
			Role:      "User",
			Balance:   100,
			PaymentId: pid,
			Img:       "https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/User" + strconv.Itoa(i) + ".jpg",
		}
		userId, err := repo.Create(c, User)
		if err != nil {
			return err
		}
		shelf := entity.Shelf{
			Name: "Your Shelf",
			Img:  "https://st.depositphotos.com/1000441/1359/i/600/depositphotos_13590596-stock-photo-bookshelf.jpg",
		}
		shelfId, err := bookRepo.CreateShelf(c, shelf)
		if err != nil {
			return err
		}
		err = bookRepo.CreateUserShelf(c, userId, shelfId)
		if err != nil {
			return err
		}

	}

	numOfUser -= count
	// fmt.Println("Subscription users: ")
	for i := 0; i < count; i++ {
		username := text[nameCount] + text[nameCount+1]
		fullname := text[nameCount] + " " + text[nameCount+1]
		nameCount += 2
		Payment := entity.Payment{
			CardNumber: "1234567890123456",
			Exp:        "06/22",
			Ccv:        "123",
			CardName:   fullname,
		}
		pid, _ := repo.CreatePayment(c, Payment)
		User := entity.User{
			Username:  username,
			FullName:  fullname,
			Age:       rand.Intn(80-1+1) + 1,
			Email:     username + "@gmail.com",
			Role:      "User",
			Balance:   (rand.Float32() * (1000 - 100)) + 100,
			PaymentId: pid,
			Img:       "https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/User" + strconv.Itoa(i+count) + ".jpg",
		}
		userId, err := repo.Create(c, User)
		if err != nil {
			return err
		}
		shelf := entity.Shelf{
			Name: "Your Shelf",
			Img:  "https://st.depositphotos.com/1000441/1359/i/600/depositphotos_13590596-stock-photo-bookshelf.jpg",
		}
		shelfId, err := bookRepo.CreateShelf(c, shelf)
		if err != nil {
			return err
		}
		err = bookRepo.CreateUserShelf(c, userId, shelfId)
		if err != nil {
			return err
		}
		repo.CreateSubscription(c, userId)
		// fmt.Println(name + "\t\t" + userEntity[0].UserId)
	}

	// fmt.Println("Authors:")
	for i := 0; i < numOfUser; i++ {
		username := text[nameCount] + text[nameCount+1]
		fullname := text[nameCount] + " " + text[nameCount+1]
		nameCount += 2
		Payment := entity.Payment{
			CardNumber: "1234567890123456",
			Exp:        "06/22",
			Ccv:        "123",
			CardName:   fullname,
		}
		pid, _ := repo.CreatePayment(c, Payment)
		User := entity.User{
			Username:  username,
			FullName:  fullname,
			Age:       rand.Intn(80-1+1) + 1,
			Email:     username + "@gmail.com",
			Role:      "Author",
			Balance:   (rand.Float32() * (1000 - 100)) + 100,
			PaymentId: pid,
			Img:       "https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/User" + strconv.Itoa(i+2*count) + ".jpg",
		}
		userId, err := repo.Create(c, User)
		if err != nil {
			return err
		}
		shelf := entity.Shelf{
			Name: "Your Shelf",
			Img:  "https://st.depositphotos.com/1000441/1359/i/600/depositphotos_13590596-stock-photo-bookshelf.jpg",
		}
		shelfId, err := bookRepo.CreateShelf(c, shelf)
		if err != nil {
			return err
		}
		err = bookRepo.CreateUserShelf(c, userId, shelfId)
		if err != nil {
			return err
		}
		bookName := text[nameCount]
		nameCount++
		Book := entity.Book{
			Name:        bookName,
			UserId:      userId,
			Price:       (rand.Float32() * (1000 - 100)) + 100,
			Rating:      (rand.Float32() * (5 - 1)) + 1,
			Description: "lorem",
			Url:         "https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/SampleBook0.pdf",
			Img:         "https://bababook-bucket.s3.ap-southeast-1.amazonaws.com/cloudComputing/Mock+User/Book" + strconv.Itoa(i) + ".jpg",
		}
		bookRepo.CreateBook(c, Book)
		// fmt.Println(name + "\t\t" + userEntity[0].UserId)
	}

	return nil
}

func (repo *UserRepository) CreatePayment(c context.Context, payment entity.Payment) (string, error) {
	payment.PaymentId = GenerateUUID()
	//insert to table payment

	av, err := dynamodbattribute.MarshalMap(payment)
	if err != nil {
		return "", err
	}

	tableName := "payments"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return "", err
	}

	// fmt.Println("Successfully added '" + payment.PaymentId + "' (" + payment.CardName + ") to table " + tableName)
	return payment.PaymentId, nil
}

func (repo *UserRepository) UpdatePayment(c context.Context, userId string, username string, paymentId string) error {
	tableName := "users"

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#PID": aws.String("payment_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":pid": {
				S: aws.String(paymentId),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(userId),
			},
			"username": {
				S: aws.String(username),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #PID = :pid"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		return err
	}

	// fmt.Println("Successfully updated '" + paymentId + "' to user '" + userId + "'")
	return nil
}

func (repo *UserRepository) GetPaymentById(c context.Context, id string) (entity.Payment, error) {

	queryInput := &dynamodb.QueryInput{
		TableName: aws.String("payments"),
		KeyConditions: map[string]*dynamodb.Condition{
			"payment_id": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(id),
					},
				},
			},
		},
	}

	result, err := repo.db.Query(queryInput)
	if err != nil {
		return entity.Payment{}, err
	}

	payment := []entity.Payment{}

	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &payment)
	//fmt.Println("user", user)
	if err != nil {
		return entity.Payment{}, err
	}
	if len(payment) == 0 {
		return entity.Payment{}, errors.New("This payment id doesn't exist")
	}

	return payment[0], nil
}

func (repo *UserRepository) CreateSubscription(c context.Context, userId string) error {
	subscription := entity.Subscription{
		SubscriptionId: GenerateUUID(),
		UserId:         userId,
		StartDate:      strconv.FormatInt(time.Now().Unix(), 10),
		EndDate:        strconv.FormatInt(time.Now().Add(30*24*time.Hour).Unix(), 10),
	}
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(subscription)
	if err != nil {
		return err
	}

	tableName := "subscriptions"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return err
	}

	// fmt.Println("Successfully created Subscription (" + subscription.SubscriptionId + ") to table " + tableName)
	return nil
}

func (repo *UserRepository) UpdateBalance(c context.Context, uid string, username string, balance float32) error {
	tableName := "users"
	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#BAL": aws.String("balance"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":bal": {
				N: aws.String(fmt.Sprintf("%f", balance)),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"user_id": {
				S: aws.String(uid),
			},
			"username": {
				S: aws.String(username),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #BAL = :bal"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		return err
	}

	//fmt.Println("Successfully updated '" + uid + "' balance to '" + balance + "'")
	return nil
}
