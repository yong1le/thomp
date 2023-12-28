package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/yong1le/thomp/backend/internals/api/handlers"
	"github.com/yong1le/thomp/backend/internals/api/middleware"
)

func SetupRoutes(r chi.Router, h *handlers.Handlers) {

	r.Post("/registration", h.CreateUserHandler)

	r.Route("/user", func(r chi.Router) {
		r.Use(middleware.CheckAuthentication)
		r.Put("/avatar", h.ChangeAvatarHandler)
		r.Put("/name", h.ChangeNameHandler)
		r.Post("/follow/{followed}/{follower}", h.FollowHandler)
		r.Delete("/unfollow/{followed}/{follower}", h.UnfollowHandler)
	})

	r.Route("/activity", func(r chi.Router) {
		r.Use(middleware.CheckAuthentication)
		r.Get("/recents/{limit}", h.GetRecentsHandler)
		r.Get("/recents/following/{limit}", h.GetFollowingRecentsHandler)
		r.Get("/single/{id}", h.OneActivityHandler)
		r.Post("/create", h.CreateActivityHandler)
		r.Delete("/delete/{id}", h.DeleteActivityHandler)
	})

	r.Route("/message", func(r chi.Router) {
		r.Use(middleware.CheckAuthentication)
		r.Post("/send", h.SendMessageHandler)
		r.Post("/delete/{id}", h.DeleteMessageHandler)
	})

}
