package entity

type Payment struct {
	PaymentId  string `json:"payment_id"`
	CardNumber string `json:"card_number"`
	Exp        string `json:"exp"`
	Ccv        string `json:"ccv"`
	CardName   string `json:"card_name"`
}

type PaymentRepository interface {
}

type PaymentUseCase interface {
}

type Balance struct {
	Balance float32 `json:"balance"`
}