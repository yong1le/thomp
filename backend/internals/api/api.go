package api

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/yong1le/thomp/backend/internals/api/handlers"
	"github.com/yong1le/thomp/backend/internals/api/middleware"
	"github.com/yong1le/thomp/backend/internals/api/routes"
)

type Server struct {
	Router *chi.Mux
}

func NewServer(h *handlers.Handlers) *Server {
	r := chi.NewRouter()

	// Setup Middleware
	frontendURL := os.Getenv("FRONTEND_URL")
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{frontendURL},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
	}))
	r.Use(middleware.CheckAuthentication)

	routes.SetupRoutes(r, h)

	return &Server{
		Router: r,
	}
}

func (s *Server) Run() error {
	port := fmt.Sprintf("%s%s", ":", os.Getenv("PORT"))
	return http.ListenAndServe(port, s.Router)
}
