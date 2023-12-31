package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/nedpals/supabase-go"
	"github.com/yong1le/thomp/backend/internals/api/lib"
)

func CheckAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Split JWT: bearer $token
		authHeader := r.Header.Get("Authorization")
		splitAuthHeader := strings.Split(authHeader, " ")
		if len(splitAuthHeader) != 2 {
			// JWT not in right form, client's error
			lib.SendJsonError(w, http.StatusBadRequest, "Missing or invalid authorization header.")
			return
		}

		supabaseUrl := os.Getenv("SUPABASE_URL")
		supabaseKey := os.Getenv("SUPABASE_ANON_KEY")

		supa := supabase.CreateClient(supabaseUrl, supabaseKey)
		user, err := supa.Auth.User(r.Context(), splitAuthHeader[1])
		if err != nil {
			lib.SendJsonError(w, http.StatusUnauthorized, "Session is invalid or has expired.")
			return
		}

		// Store username for use in handlers
		ctx := context.WithValue(r.Context(), "id", user.ID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
