package usecase

import (
	"context"
	"github.com/proudkittapa/cloudComputing/entity"
)

type userUseCase struct{
	userUseCase entity.UserRepository
}

func NewUserUseCase(user entity.UserUseCase) entity.UserUseCase{
	return &userUseCase{userUseCase: user}
}

func (useCase *userUseCase) GetAll(c context.Context) ([]entity.User, error) {
	users, err := useCase.userUseCase.GetAll(c)
	return users, err
}

func (useCase *userUseCase) GetById(c context.Context, id string) (entity.User, error) {
	user, err := useCase.userUseCase.GetById(c, id)
	return user, err
}

func (useCase *userUseCase) Create(c context.Context, user entity.User) error {
	err := useCase.userUseCase.Create(c, user)
	return err
}

func (useCase *userUseCase) Update(c context.Context, user entity.User) error {
	err := useCase.userUseCase.Update(c, user)
	return err
}

func (useCase *userUseCase) Delete(c context.Context, id string) error {
	err := useCase.userUseCase.Delete(c, id)
	return err
}
