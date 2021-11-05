package handler

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/entity"
	"net/http"
)

type BookHandler struct{
	BookUseCase entity.BookUseCase
}

func NewBookHandler(e *echo.Group, BookUseCase entity.BookUseCase){
	handler := &BookHandler{
		BookUseCase: BookUseCase,
	}
	e.GET("/book", handler.GetAll)
	e.GET("/book/:id", handler.GetById)
	e.POST("/book", handler.CreateBook)
	e.PUT("/book/:id", handler.Update)
	e.DELETE("/book/:id", handler.DeleteBook)
}

func (bookHandler *BookHandler) GetAll(c echo.Context) error{
	ctx := c.Request().Context()
	books, err := bookHandler.BookUseCase.GetAll(ctx)
	fmt.Println("books", books)
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
			Books []entity.Book "json:\"books\""
		}{
			Books: books,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) GetById(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	book, err := bookHandler.BookUseCase.GetById(ctx, id)
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
			Book entity.Book "json:\"book\""
		}{
			Book: book,
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) CreateBook(c echo.Context) error{
	ctx := c.Request().Context()
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := bookHandler.BookUseCase.CreateBook(ctx, book)
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
			Message: "book is created",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) Update(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	var book entity.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	book.Id = id
	err := bookHandler.BookUseCase.UpdateBook(ctx, book)
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
			Message: "book is updated",
		},
	}
	return c.JSON(http.StatusOK, response)
}

func (bookHandler *BookHandler) DeleteBook(c echo.Context) error{
	ctx := c.Request().Context()
	id := c.Param("id")
	err := bookHandler.BookUseCase.DeleteBook(ctx, id)
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
			Message: "book is deleted",
		},
	}
	return c.JSON(http.StatusOK, response)
}