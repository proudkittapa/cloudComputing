package handler

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/entity"
	"net/http"
	"strconv"
)

type UserHandler struct {
	UserUseCase entity.UserUseCase
}

func NewUserHandler(e *echo.Group, UserUseCase entity.UserUseCase) {
	handler := &UserHandler{
		UserUseCase: UserUseCase,
	}
	e.POST("/init", handler.InitAll)
	e.GET("/users", handler.GetAll)
	e.GET("/user/:id", handler.GetById)
	e.POST("/user", handler.Create)
	e.PUT("/user/:id", handler.Update)
	e.DELETE("/user/:id", handler.Delete)
	e.POST("/user/:userId/book/:bookId", handler.AddBook)
	e.POST("/user/init", handler.InitUser)
	e.POST("/shelf/init", handler.InitUserShelf)
	e.POST("/user/:userId/subscription", handler.CreateSubscription)

	e.GET("/user/:userId/shelf", handler.GetAllShelf)
	e.POST("/user/:userId/shelf", handler.CreateShelf)

	e.POST("/user/:userId/payment", handler.CreatePayment)
	e.PUT("/user/:userId/payment", handler.AddBalance)
	//TODO get payment

	e.POST("/user/:userId/book/:bookId/shelf/:shelfId", handler.AddBookToShelf)

	e.POST("/user/mock/:num", handler.MockUser)

	e.GET("/role/authors", handler.GetAllAuthor)
	e.GET("/role/users", handler.GetAllUsers)

	e.GET("/test", handler.Test)

}

func (handler *UserHandler) Test(c echo.Context) error {
	fmt.Println("enter here")
	cookie, err := c.Cookie("jwt")
	if err != nil{
		return c.JSON(http.StatusUnauthorized, err)
	}
	SecretKey := "secret"
	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err)
	}
	claims := token.Claims.(*jwt.StandardClaims)
	fmt.Println("claims", claims)
	return c.JSON(http.StatusOK, "test success")
}

func (handler *UserHandler) GetAll(c echo.Context) error {
	ctx := c.Request().Context()
	users, err := handler.UserUseCase.GetAll(ctx)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
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

func (handler *UserHandler) GetAllAuthor(c echo.Context) error {
	ctx := c.Request().Context()
	users, err := handler.UserUseCase.GetAllAuthor(ctx)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Users []entity.User `json:"authors"`
		}{
			Users: users,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) GetAllUsers(c echo.Context) error {
	ctx := c.Request().Context()
	users, err := handler.UserUseCase.GetAllUsers(ctx)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Users []entity.User `json:"users"`
		}{
			Users: users,
		},
	}
	return c.JSON(http.StatusOK, response)
}


func (handler *UserHandler) GetById(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	user, err := handler.UserUseCase.GetById(ctx, id)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
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

func (handler *UserHandler) Create(c echo.Context) error {
	ctx := c.Request().Context()
	var user entity.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	id, err := handler.UserUseCase.Create(ctx, user)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
			Id string `json:"id"`
		}{
			Message: "user is created",
			Id : id,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) Update(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	var user entity.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	user.UserId = id
	err := handler.UserUseCase.Update(ctx, user)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
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

func (handler *UserHandler) Delete(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	err := handler.UserUseCase.Delete(ctx, id)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
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

func (handler *UserHandler) AddBook(c echo.Context) error {
	ctx := c.Request().Context()
	bookId := c.Param("bookId")
	userId := c.Param("userId")
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := handler.UserUseCase.AddBook(ctx, bookId, userId)
	fmt.Println("error add book", err)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "book is added",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) InitUser(c echo.Context) error {

	err := handler.UserUseCase.InitUserDB()
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init user db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) CreatePayment(c echo.Context) error {
	ctx := c.Request().Context()
	userId := c.Param("userId")
	var payment entity.Payment
	if err := c.Bind(&payment); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := handler.UserUseCase.CreatePayment(ctx, userId, payment)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "payment is created",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) GetAllShelf(c echo.Context) error {
	ctx := c.Request().Context()
	userId := c.Param("userId")
	shelves, err := handler.UserUseCase.GetAllShelfByUserId(ctx, userId)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Shelf []entity.Shelf "json:\"shelves\""
		}{
			Shelf: shelves,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) CreateShelf(c echo.Context) error {
	ctx := c.Request().Context()
	userId := c.Param("userId")
	var shelf entity.Shelf
	if err := c.Bind(&shelf); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err := handler.UserUseCase.CreateShelf(ctx, userId, shelf.Name)
	if err != nil{
		errMess := err.Error()

		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMess,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "shelf is created",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) AddBookToShelf(c echo.Context) error {
	ctx := c.Request().Context()
	bookId := c.Param("bookId")
	shelfId := c.Param("shelfId")

	err := handler.UserUseCase.AddBookToShelf(ctx, shelfId, bookId)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "book is added to shelf",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) MockUser(c echo.Context) error {
	ctx := c.Request().Context()
	num := c.Param("num")
	number, err := strconv.Atoi(num)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "can't convert")
	}
	err = handler.UserUseCase.MockUser(ctx, number)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "Mock the data for user",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) InitUserShelf(c echo.Context) error {

	err := handler.UserUseCase.InitUserShelfDB()
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	err = handler.UserUseCase.InitShelfDB()
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
			Message: "init user shelf and shelf db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) InitShelf(c echo.Context) error {

	err := handler.UserUseCase.InitShelfDB()
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init shelf db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) InitAll(c echo.Context) error {

	err := handler.UserUseCase.InitAll()
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}

	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "init all db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) CreateSubscription(c echo.Context) error {
	ctx := c.Request().Context()
	userId := c.Param(":userId")
	err := handler.UserUseCase.CreateSubscription(ctx, userId)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
		}{
			Message: "subscription is created",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (handler *UserHandler) AddBalance(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("userId")
	var balance entity.Balance
	if err := c.Bind(&balance); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	fmt.Println("Add bal", balance)
	balanceLeft, err := handler.UserUseCase.AddBalance(ctx, id, balance.Balance)
	if err != nil {
		errMessage := err.Error()
		return c.JSON(http.StatusInternalServerError, entity.ResponseError{
			Error: struct {
				Code    int    "json:\"code\""
				Message string "json:\"message\""
			}{
				Code:    404,
				Message: errMessage,
			},
		})
	}
	response := entity.ResponseSuccess{
		Data: struct {
			Message string "json:\"message\""
			CurrentBalance float32 `json:"balance"`
		}{
			Message: "Balance is updated",
			CurrentBalance: balanceLeft,
		},
	}
	return c.JSON(http.StatusOK, response)
}