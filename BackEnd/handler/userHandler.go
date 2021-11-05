package handler

import (
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/entity"
	"net/http"
)

type UserHandler struct{
	UserUseCase entity.UserUseCase
}

func NewUserHandler(e *echo.Group, UserUseCase entity.UserUseCase){
	handler := &UserHandler{
		UserUseCase: UserUseCase,
	}
	e.GET("/user", handler.GetAll)
	e.GET("/user/:id", handler.GetById)
	e.POST("/user", handler.Create)
	e.PUT("/user/:id", handler.Update)
	e.DELETE("/user/:id", handler.Delete)
}

func (handler *UserHandler) GetAll(c echo.Context) error{
	ctx := c.Request().Context()
	users, err := handler.UserUseCase.GetAll(ctx)
	if err != nil{
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
			Users []entity.User "json:\"users\""
		}{
			Users: users,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) GetById(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	user, err := handler.UserUseCase.GetById(ctx, id)
	if err != nil{
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
			User entity.User "json:\"user\""
		}{
			User: user,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) Create(c echo.Context) error{
	ctx := c.Request().Context()
	var user entity.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := handler.UserUseCase.Create(ctx, user)
	if err != nil{
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
			Message: "user is created",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) Update(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	var user entity.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	user.UserId = id
	err := handler.UserUseCase.Update(ctx, user)
	if err != nil{
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
			Message: "user is updated",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) Delete(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	err := handler.UserUseCase.Delete(ctx, id)
	if err != nil{
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
			Message: "user is deleted",
		},
	}
	return c.JSON(http.StatusOK, response)
}