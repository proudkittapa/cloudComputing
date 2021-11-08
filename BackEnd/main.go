package main

import (
	"fmt"
	"log"

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
	AWS_ACCESS_KEY_ID := "AKIATY2SF6MT2XKKST6T"
	AWS_SECRET_ACCESS_KEY := "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"

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-1"),
		Credentials: credentials.NewStaticCredentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, ""),
	})

	if err != nil {
		log.Fatalf("Got error get new session: %s", err)
	}

	svc := dynamodb.New(sess)
	fmt.Println("svc", svc)
	e := echo.New()
	handlerGroup := e.Group("/bababook")

	bookRepo := repo.NewBookRepository(svc)
	userRepo := repo.NewUserRepository(svc)
	userTransactionRepo := repo.NewUserTransactionRepository(svc)

	bookUseCase := usecase.NewBookUseCase(bookRepo, userRepo, userTransactionRepo)
	userUseCase := usecase.NewUserUseCase(userRepo)

	handler.NewBookHandler(handlerGroup, bookUseCase)
	handler.NewUserHandler(handlerGroup, userUseCase)
	e.Logger.Fatal(e.Start(":8080"))
}
