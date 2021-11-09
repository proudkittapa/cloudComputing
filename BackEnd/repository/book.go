package repository

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/proudkittapa/cloudComputing/entity"
)

type BookRepository struct {
	db *dynamodb.DynamoDB
}

func NewBookRepository(db *dynamodb.DynamoDB) *BookRepository {
	return &BookRepository{db: db}
}

func GenerateUUID() string {
	return uuid.New().String()
}

func (repo *BookRepository) GetAll(c context.Context) ([]entity.Book, error) {

	var books []entity.Book

	input := &dynamodb.ScanInput{
		TableName: aws.String("book"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		panic(err)
	}

	for _, i := range result.Items {
		item := entity.Book{}

		err = dynamodbattribute.UnmarshalMap(i, &item)

		if err != nil {
			log.Fatalf("Got error unmarshalling: %s", err)
			return []entity.Book{}, err
		}
		fmt.Println("Found item:")
		fmt.Println("bookId:  ", item.BookId)
		fmt.Println("name: ", item.Name)
		fmt.Println("price:  ", item.Price)
		fmt.Println("rating: ", item.Rating)
		fmt.Println("description: ", item.Description)
		books = append(books, item)
	}
	return books, nil
}

func (repo *BookRepository) GetById(c context.Context, id string) (entity.Book, error) {

	tableName := "book"

	input := &dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"book_id": {
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

	book := entity.Book{}

	err = dynamodbattribute.UnmarshalMap(result.Item, &book)

	if err != nil {
		log.Fatalf("Got error unmarshalling: %s", err)
		return entity.Book{}, err
	}

	fmt.Println("Found book:")
	fmt.Println("bookId:  ", book.BookId)
	fmt.Println("name: ", book.Name)
	fmt.Println("price:  ", book.Price)
	fmt.Println("rating: ", book.Rating)
	fmt.Println("description: ", book.Description)
	return book, nil
}

func (repo *BookRepository) CreateBook(c context.Context, book entity.Book) error {
	book.BookId = GenerateUUID()
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(book)
	if err != nil {
		log.Fatalf("Got error marshalling new movie item: %s", err)
	}

	tableName := "book"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		log.Fatalf("Got error calling PutItem: %s", err)
	}

	fmt.Println("Successfully added '" + book.Name + "' (" + book.BookId + ") to table " + tableName)
	return nil
}

func (repo *BookRepository) UpdateBook(c context.Context, book entity.Book) error {
	//update
	tableName := "book"
	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#N":   aws.String("name"),
			"#UID": aws.String("user_id"),
			"#P":   aws.String("price"),
			"#R":   aws.String("rating"),
			"#DES": aws.String("description"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":n": {
				S: aws.String(book.Name),
			},
			":uid": {
				S: aws.String(book.UserId),
			},
			":p": {
				N: aws.String(fmt.Sprintf("%f", book.Price)),
			},
			":r": {
				N: aws.String(fmt.Sprintf("%f", book.Rating)),
			},
			":des": {
				S: aws.String(book.Description),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"book_id": {
				S: aws.String(book.BookId),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #N = :n, #UID = :uid, #P = :p, #R = :r, #DES = :des"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		log.Fatalf("Got error calling UpdateItem: %s", err)
	}

	fmt.Println("Successfully updated '" + book.Name + "' (" + book.BookId + ")")
	return nil
}

func (repo *BookRepository) DeleteBook(c context.Context, id string) error {
	//delete book with the given id
	tableName := "book"

	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"book_id": {
				S: aws.String(id),
			},
		},
		TableName: aws.String(tableName),
	}

	_, err := repo.db.DeleteItem(input)
	if err != nil {
		log.Fatalf("Got error calling DeleteItem: %s", err)
	}

	fmt.Println("Deleted Book Id'" + id + ") from table " + tableName)
	return nil
}

func (repo *BookRepository) CreateBookDB() error{
	tableName := "book"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("book_id"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("name"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("user_id"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("price"),
				AttributeType: aws.String("N"),
			},
			{
				AttributeName: aws.String("rating"),
				AttributeType: aws.String("N"),
			},
			{
				AttributeName: aws.String("description"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("book_id"),
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
		log.Fatalf("Got error calling CreateTable: %s", err)
	}

	fmt.Println("Created the table", tableName)
	return err
}
