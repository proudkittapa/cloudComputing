package handler

import (
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/entity"
	"net/http"
)

type UserTransactionHandler struct {
	UserTransactionUseCase entity.UserTransactionUseCase
}

func NewUserTransactionHandler(e *echo.Group, userTrans entity.UserTransactionUseCase ){
	handler := &UserTransactionHandler{
		UserTransactionUseCase: userTrans,
	}
	e.POST("/userTransaction/init", handler.InitUserTrans)
	e.POST("/payment/init", handler.InitPayment)
	e.POST("/subscription/init", handler.InitSubscription)
}

func (handler *UserTransactionHandler) InitUserTrans(c echo.Context) error {

	err := handler.UserTransactionUseCase.CreateUserTransactionDB()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: "error",
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init user transaction db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserTransactionHandler) InitPayment(c echo.Context) error {

	err := handler.UserTransactionUseCase.CreatePaymentDB()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: "error",
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init user transaction db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserTransactionHandler) InitSubscription(c echo.Context) error {

	err := handler.UserTransactionUseCase.CreateSubscriptionDB()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: "error",
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init user transaction db",
		},
	}
	return c.JSON(http.StatusOK, response)
}
