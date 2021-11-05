package entity

type Payment struct{
	CardNumber string
	Exp string
	Ccv string
	CardName string
}

type PaymentRepository interface{

}

type PaymentUseCase interface{

}