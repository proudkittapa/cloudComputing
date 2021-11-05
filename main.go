package main
import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/labstack/echo"
	"github.com/proudkittapa/cloudComputing/handler"
	repo "github.com/proudkittapa/cloudComputing/repository"
	"github.com/proudkittapa/cloudComputing/usecase"
	"log"
)
func main()  {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-1"),
		Credentials: credentials.NewSharedCredentials("", "temp"),
	})

	if err != nil {
		log.Fatalf("Got error get new session: %s", err)
	}

	svc := dynamodb.New(sess)
	fmt.Println("svc", svc)
	fmt.Println("%T\n", svc)
	e := echo.New()
	handlerGroup := e.Group("/bababook")

	bookRepo := repo.NewBookRepository(svc)
	userRepo := repo.NewUserRepository(svc)

	bookUseCase := usecase.NewBookUseCase(bookRepo)
	userUseCase := usecase.NewUserUseCase(userRepo)

	handler.NewBookHandler(handlerGroup, bookUseCase)
	handler.NewUserHandler(handlerGroup, userUseCase)
	e.Logger.Fatal(e.Start(":8080"))
}