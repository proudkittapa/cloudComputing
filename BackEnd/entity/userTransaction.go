package entity

import "context"

type UserTransaction struct {
	TransactionId string `json:"transaction_id"`
	BookId        string `json:"book_id"`
	UserId        string `json:"user_id"`
	Time          string `json:"time"`
}

type Subscription struct {
	SubscriptionId string `json:"subscription_id"`
	UserId string `json:"user_id"`
	StartDate string `json:"start_date"`
	EndDate string `json:"end_date"`
}

type UserTransactionRepository interface {
	AddBook(c context.Context, userId string, bookId string) error
	CreateUserTransactionDB() error
	CheckSubscription(ctx context.Context, id string) (bool, error)
	CheckPayment(ctx context.Context, paymentId string) (bool, error)
	GetAllShelfByUserId(c context.Context, userId string) ([]Shelf, error)
	CreateSubscriptionDB() error
	CreatePaymentDB() error
	GetDefaultShelfByUserId(c context.Context, userId string) (string, error)
}

type UserTransactionUseCase interface {
	CreateSubscriptionDB() error
	CreatePaymentDB() error
	CreateUserTransactionDB() error
}
