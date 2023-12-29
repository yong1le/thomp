package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/yong1le/thomp/backend/internals/api/handlers"
)

func SetupRoutes(r chi.Router, h *handlers.Handlers) {

	r.Route("/user", func(r chi.Router) {
		r.Put("/avatar", h.ChangeAvatarHandler)
		r.Put("/name", h.ChangeNameHandler)
		r.Post("/follow/{followed}/{follower}", h.FollowHandler)
		r.Delete("/unfollow/{followed}/{follower}", h.UnfollowHandler)
	})

	r.Route("/activity", func(r chi.Router) {
		r.Get("/recents/{limit}", h.GetRecentsHandler)
		r.Get("/recents/following/{limit}", h.GetFollowingRecentsHandler)
		r.Get("/single/{id}", h.OneActivityHandler)
		r.Post("/create", h.CreateActivityHandler)
		r.Delete("/delete/{id}", h.DeleteActivityHandler)
	})

	r.Route("/message", func(r chi.Router) {
		r.Post("/send", h.SendMessageHandler)
		r.Post("/delete/{id}", h.DeleteMessageHandler)
	})

}
