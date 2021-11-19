package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/proudkittapa/cloudComputing/config"

	"github.com/labstack/echo/middleware"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/handler"
	repo "github.com/proudkittapa/cloudComputing/repository"
	"github.com/proudkittapa/cloudComputing/usecase"
)

func main() {

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(config.AWS_ACCESS_KEY_ID, config.AWS_SECRET_ACCESS_KEY, ""),
	})

	if err != nil {
		log.Fatalf("Got error get new session: %s", err)
	}

	svc := dynamodb.New(sess)
	fmt.Println("svc", svc)
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8080"},
		AllowCredentials: true,
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	handlerGroup := e.Group("/bababook")

	bookRepo := repo.NewBookRepository(svc)
	userRepo := repo.NewUserRepository(svc)
	userTransactionRepo := repo.NewUserTransactionRepository(svc)

	bookUseCase := usecase.NewBookUseCase(bookRepo, userRepo, userTransactionRepo)
	userUseCase := usecase.NewUserUseCase(userRepo, userTransactionRepo, bookRepo)
	userTransactionUseCase := usecase.NewUserTransactionUseCase(userTransactionRepo)

	handler.NewBookHandler(handlerGroup, bookUseCase)
	handler.NewUserHandler(handlerGroup, userUseCase)
	handler.NewUserTransactionHandler(handlerGroup, userTransactionUseCase)
	e.Logger.Fatal(e.Start(":8080"))
}
