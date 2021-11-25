package repository

import (
	"context"
	"fmt"

	"github.com/pkg/errors"

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
		TableName: aws.String("books"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return []entity.Book{}, err
	}

	for _, i := range result.Items {
		item := entity.Book{}

		err = dynamodbattribute.UnmarshalMap(i, &item)

		if err != nil {

			return []entity.Book{}, err
		}
		// fmt.Println("Found item:")
		// fmt.Println("bookId:  ", item.BookId)
		// fmt.Println("name: ", item.Name)
		// fmt.Println("price:  ", item.Price)
		// fmt.Println("rating: ", item.Rating)
		// fmt.Println("description: ", item.Description)
		books = append(books, item)
	}
	return books, nil
}

func (repo *BookRepository) GetById(c context.Context, id string) (entity.Book, error) {

	queryInput := &dynamodb.QueryInput{
		TableName: aws.String("books"),
		KeyConditions: map[string]*dynamodb.Condition{
			"book_id": {
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
		return entity.Book{}, err
	}

	book := []entity.Book{}
	// fmt.Println("results.items: ", result.Items)
	// fmt.Println("results.items: ", result.Items[0])
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &book)
	if err != nil {
		return entity.Book{}, err
	}
	if len(book) == 0 {
		return entity.Book{}, errors.New("books id doesn't exist")
	}
	return book[0], nil
}

func (repo *BookRepository) GetByName(c context.Context, name string) ([]entity.Book, error) {
	var Books []entity.Book

	input := &dynamodb.ScanInput{
		TableName: aws.String("books"),
		ExpressionAttributeNames: map[string]*string{
			"#name": aws.String("name"),
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
		return []entity.Book{}, err
	}

	for _, i := range result.Items {
		book := entity.Book{}

		err = dynamodbattribute.UnmarshalMap(i, &book)

		if err != nil {
			return []entity.Book{}, err
		}
		Books = append(Books, book)
	}
	return Books, nil
}

func (repo *BookRepository) CreateBook(c context.Context, book entity.Book) (string, error) {
	book.BookId = GenerateUUID()
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(book)
	if err != nil {
		return "", err
	}

	tableName := "books"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return "", err
	}

	// fmt.Println("Successfully added '" + book.Name + "' (" + book.BookId + ") to table " + tableName)
	return book.BookId, nil
}

func (repo *BookRepository) UpdateBook(c context.Context, book entity.Book) error {
	tableName := "books"
	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#N":   aws.String("name"),
			"#UID": aws.String("user_id"),
			"#P":   aws.String("price"),
			"#R":   aws.String("rating"),
			"#DES": aws.String("description"),
			"#IMG": aws.String("img"),
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
			":img": {
				S: aws.String(book.Img),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"book_id": {
				S: aws.String(book.BookId),
			},
			"name": {
				S: aws.String(book.Name),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #N = :n, #UID = :uid, #P = :p, #R = :r, #DES = :des, #IMG = :img"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		return err
	}

	// fmt.Println("Successfully updated '" + book.Name + "' (" + book.BookId + ")")
	return nil
}

func (repo *BookRepository) DeleteBook(c context.Context, id string) error {
	//delete book with the given id
	tableName := "books"

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
		return err
	}

	// fmt.Println("Deleted Book Id'" + id + ") from table " + tableName)
	return nil
}

func (repo *BookRepository) CreateBookDB() error {
	tableName := "books"
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
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("book_id"),
				KeyType:       aws.String("HASH"),
			},
			{
				AttributeName: aws.String("name"),
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

func (repo *BookRepository) CreateShelf(c context.Context, shelfName string) (string, error) {
	books := entity.BooksId{
		Books: []string{},
	}
	shelf := entity.Shelf{
		ShelfId: GenerateUUID(),
		Name:    shelfName,
		Img:     "https://st.depositphotos.com/1000441/1359/i/600/depositphotos_13590596-stock-photo-bookshelf.jpg",
	}
	//insert to table book

	shelfAv, err := dynamodbattribute.MarshalMap(shelf)
	if err != nil {
		return "", err
	}

	booksAv, err := dynamodbattribute.MarshalMap(books)
	if err != nil {
		return "", err
	}

	listAv, err := dynamodbattribute.MarshalList([]string{})
	if err != nil {
		return "", err
	}

	booksAv["books"] = &dynamodb.AttributeValue{L: listAv}

	shelfAv["book_set"] = &dynamodb.AttributeValue{M: booksAv}

	tableName := "shelf"

	input := &dynamodb.PutItemInput{
		Item:      shelfAv,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return "", err
	}

	// fmt.Println("Successfully added '" + shelf.Name + "' (" + shelf.ShelfId + ") to table " + tableName)
	return shelf.ShelfId, nil
}

func (repo *BookRepository) AddBookToShelf(c context.Context, shelfId string, bookId string) error {
	tableName := "shelf"

	av := &dynamodb.AttributeValue{
		S: aws.String(bookId),
	}

	var bid []*dynamodb.AttributeValue
	bid = append(bid, av)

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeNames: map[string]*string{
			"#BS": aws.String("book_set"),
			"#BK": aws.String("books"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":bk": {
				L: bid,
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"shelf_id": {
				S: aws.String(shelfId),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set #BS.#BK = list_append(#BS.#BK, :bk)"),
	}

	_, err := repo.db.UpdateItem(input)
	if err != nil {
		return err
	}

	// fmt.Println("Successfully updated '" + bookId + "' to Shelf '" + shelfId + "'")
	return nil
}

func (repo *BookRepository) GetBooksIdFromShelf(c context.Context, shelfId string) (entity.BooksId, error) {
	var BooksId []entity.BooksId

	input := &dynamodb.ScanInput{
		TableName: aws.String("shelf"),
		ExpressionAttributeNames: map[string]*string{
			"#SID": aws.String("shelf_id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":sid": {

				S: aws.String(shelfId),
			},
		},
		FilterExpression: aws.String("#SID = :sid"),
	}

	result, err := repo.db.Scan(input)
	if err != nil {
		return entity.BooksId{}, err
	}

	for _, i := range result.Items {
		shelf := entity.Shelf{}

		err = dynamodbattribute.UnmarshalMap(i, &shelf)

		if err != nil {
			return entity.BooksId{}, err
		}
		BooksId = append(BooksId, shelf.BookSet)
	}
	// fmt.Println("books", BooksId)
	if len(BooksId) == 0 {
		return entity.BooksId{}, errors.New("books id doesn't exist")
	}
	return BooksId[0], nil
}

func (repo *BookRepository) CreateUserShelf(c context.Context, userId, shelfId string) error {
	userShelf := entity.UserShelf{
		UserShelfId: GenerateUUID(),
		UserId:      userId,
		ShelfId:     shelfId,
	}
	//insert to table book

	av, err := dynamodbattribute.MarshalMap(userShelf)
	if err != nil {
		return err
	}

	tableName := "user_shelf"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = repo.db.PutItem(input)

	if err != nil {
		return err
	}

	// fmt.Println("Successfully added '" + userShelf.UserShelfId + "' to table " + tableName)
	return nil
}
