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

type Item struct {
	price  float32
	bookId string
	name   string
}

func (repo *BookRepository) GetAll(c context.Context) ([]entity.Book, error) {

	var books []entity.Book

	result, err := repo.db.Scan(&dynamodb.ScanInput{
		TableName: aws.String("book"),
	})
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
		fmt.Println("bookId:  ", item.Id)
		fmt.Println("name: ", item.Name)
		fmt.Println("price:  ", item.Price)
		books = append(books, item)
	}
	return books, nil
}

func (repo *BookRepository) GetById(c context.Context, id string) (entity.Book, error) {
	// book := entity.Book{
	// 	Id:       GenerateUUID(),
	// 	Name:     "Book1",
	// 	AuthorId: "1",
	// 	Price:    100,
	// 	Rating:   10,
	// }
	result, err := repo.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String("book"),
		Key: map[string]*dynamodb.AttributeValue{
			"bookId": {
				S: aws.String(id),
			},
		},
	})

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
		panic(fmt.Sprintf("Failed to unmarshal Record, %v", err))
	}

	fmt.Println("Found book:")
	fmt.Println("bookId:  ", book.Id)
	fmt.Println("name: ", book.Name)
	fmt.Println("price:  ", book.Price)
	return book, nil
}

func (repo *BookRepository) CreateBook(c context.Context, book entity.Book) error {
	book.Id = GenerateUUID()
	//insert to table book
	return nil
}

func (repo *BookRepository) UpdateBook(c context.Context, book entity.Book) error {
	//update
	return nil
}

func (repo *BookRepository) DeleteBook(c context.Context, id string) error {
	//delete book with the given id
	return nil
}

func (repo *BookRepository) AddBook(c context.Context, userId string, bookId string) error {
	//this is when user want to add book
	//click add book
	return nil
}
