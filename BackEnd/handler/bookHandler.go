package handler

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/entity"
)

type BookHandler struct {
	BookUseCase entity.BookUseCase
}

func NewBookHandler(e *echo.Group, BookUseCase entity.BookUseCase) {
	handler := &BookHandler{
		BookUseCase: BookUseCase,
	}
	e.GET("/book", handler.GetAll)
	e.GET("/book/:id", handler.GetById)
	e.POST("/book", handler.CreateBook)
	e.PUT("/book/:id", handler.Update)
	e.DELETE("/book/:id", handler.DeleteBook)
	e.POST("/book/:bookId/user/:userId", handler.AddBook)
	e.POST("/book/init", handler.Init)

	e.GET("/shelf/:id", handler.GetBooksFromShelf)
}

func (bookHandler *BookHandler) GetAll(c echo.Context) error {
	ctx := c.Request().Context()
	books, err := bookHandler.BookUseCase.GetAll(ctx)
	fmt.Println("books", books)
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
			Books []entity.Book "json:\"books\""
		}{
			Books: books,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) GetById(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	book, user, err := bookHandler.BookUseCase.GetById(ctx, id)
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
			Book entity.Book "json:\"book\""
			User entity.User "json:\"user\""
		}{
			Book: book,
			User: user,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) CreateBook(c echo.Context) error {

	ctx := c.Request().Context()
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		fmt.Println("err bind", err)
		return c.JSON(http.StatusBadRequest, err)
	}
	fmt.Println("book", book)
	id, err := bookHandler.BookUseCase.CreateBook(ctx, book)
	if err != nil {
		fmt.Println()
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
			Message: "book is created",
			Id: id,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) Update(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	book.BookId = id
	err := bookHandler.BookUseCase.UpdateBook(ctx, book)
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
			Message: "book is updated",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) DeleteBook(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	err := bookHandler.BookUseCase.DeleteBook(ctx, id)
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
			Message: "book is deleted",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) AddBook(c echo.Context) error {
	ctx := c.Request().Context()
	bookId := c.Param("bookId")
	userId := c.Param("userId")
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := bookHandler.BookUseCase.AddBook(ctx, bookId, userId)
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


func (bookHandler *BookHandler) Init(c echo.Context) error {

	err := bookHandler.BookUseCase.InitDB()
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
			Message: "init book db",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) GetBooksFromShelf(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("id")
	books, users, err := bookHandler.BookUseCase.GetBooksFromShelf(ctx, id)
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
	type bookReturn struct {
		Name string `json:"name"`
		BookId string `json:"book_id"`
		AuthorName string `json:"author_name"`
	}

	var result []bookReturn
	for k, v := range books{
		res := bookReturn{
			Name:       v.Name,
			BookId:     v.BookId,
			AuthorName: users[k].FullName,
		}
		result = append(result, res)
	}
	fmt.Println(result)

	response := entity.ResponseSuccess{
		Data: struct {
			Result []bookReturn `json:"books"`
		}{
			Result: result,
		},
	}
	return c.JSON(http.StatusOK, response)
}