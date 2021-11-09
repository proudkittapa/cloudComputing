package entity

import "context"

type UserTransaction struct {
	TransactionId string `json:"transaction_id"`
	BookId        string `json:"book_id"`
	UserId        string `json:"user_id"`
	Time          string `json:"time"`
}

type UserTransactionRepository interface {
	AddBook(c context.Context, userId string, bookId string) error
}

type UserTransactionUseCase interface {
}
