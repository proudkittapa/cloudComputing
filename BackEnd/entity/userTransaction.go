package entity

import "context"

type UserTransaction struct{
	Id string `json:"id"`
	BookId string `json:"book_id"`
	UserId string `json:"user_id"`
	Time int64 `json:"time"`
}

type UserTransactionRepository interface {
	AddBook(c context.Context, userId string, bookId string) error
}

type UserTransactionUseCase interface {

}