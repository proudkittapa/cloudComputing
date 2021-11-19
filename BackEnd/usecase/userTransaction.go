package usecase

import "github.com/proudkittapa/cloudComputing/entity"

type userTransactionUseCase struct {
	userTransactionRepo entity.UserTransactionRepository
}

func NewUserTransactionUseCase(userTrans entity.UserTransactionRepository) entity.UserTransactionUseCase{
	return &userTransactionUseCase{
		userTransactionRepo: userTrans,
	}
}

func (useCase *userTransactionUseCase) CreateUserTransactionDB() error{
	err := useCase.userTransactionRepo.CreateUserTransactionDB()
	return err
}

func (useCase *userTransactionUseCase) CreatePaymentDB() error{
	err := useCase.userTransactionRepo.CreatePaymentDB()
	return err
}

func (useCase *userTransactionUseCase) CreateSubscriptionDB() error{
	err := useCase.userTransactionRepo.CreateSubscriptionDB()
	return err
}