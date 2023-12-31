package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/yong1le/thomp/backend/internals/api"
	"github.com/yong1le/thomp/backend/internals/api/handlers"
	"github.com/yong1le/thomp/backend/internals/database"
)

func main() {
	// Load .env file if it exists
	godotenv.Load()

	// Database Setup
	queries, err := database.Connect()
	if err != nil {
		log.Fatal("Database failed to connect: ", err)
	}

	// Save the queries object so it can be used in our handlers
	h := handlers.NewHandlers(queries)

	// Server Setup
	server := api.NewServer(h)
	err = server.Run()
	if err != nil {
		log.Fatal("Server failed to run: ", err)
	}
}
