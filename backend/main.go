package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/yong1le/thomp/middleware"
	"github.com/yong1le/thomp/routes"
)

func main() {
	// Load .env file if it exists
	godotenv.Load()

	r := chi.NewRouter()

  frontendURL := os.Getenv("FRONTEND_URL")
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{frontendURL},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
	}))

	r.Route("/registration", routes.RegistrationRouter)
	r.Route("/auth", func(r chi.Router) {
		r.Use(middleware.CheckAuthentication)
		r.Route("/user", routes.UsersRouter)
		r.Route("/activity", routes.ActivitiesRouter)
		r.Route("/message", routes.MessagesRouter)
    r.Get("/", func (w http.ResponseWriter, r *http.Request) {
      fmt.Println("Hello World")
    })
	})

	port := fmt.Sprintf("%s%s", ":", os.Getenv("PORT"))
  fmt.Println(port)
	err := http.ListenAndServe(port, r)
  if err != nil {
    fmt.Print(err)
  }
}
