package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/yong1le/thomp/backend/internals/api/handlers"
)

func SetupRoutes(r chi.Router, h *handlers.Handlers) {

	r.Route("/user", func(r chi.Router) {
		r.Get("/get/{id}", h.GetUserHandler)
	})

	r.Route("/activity", func(r chi.Router) {
		r.Get("/get/{id}", h.GetAllByUserHandler)
		r.Get("/recents", h.GetRecentsHandler)
		r.Get("/recents/following", h.GetFollowingRecentsHandler)
		r.Get("/single/{id}", h.OneActivityHandler)
		r.Post("/create", h.CreateActivityHandler)
		r.Delete("/delete/{id}", h.DeleteActivityHandler)
		r.Post("/reply/create", h.CreateReplyHandler)
		r.Get("/replies/{id}", h.GetRepliesHandler)
	})

	r.Route("/message", func(r chi.Router) {
		r.Post("/send", h.SendMessageHandler)
		r.Post("/delete/{id}", h.DeleteMessageHandler)
	})

	r.Route("/relationship", func(r chi.Router) {
		r.Post("/add/{followed}", h.FollowHandler)
		r.Delete("/delete/{followed}", h.UnfollowHandler)
		r.Get("/check/{followed}/{follower}", h.CheckRelationshipHandler)
		r.Get("/{id}/followers", h.GetAllFollowersHandler)
		r.Get("/{id}/following", h.GetAllFollowingHandler)
	})

}
