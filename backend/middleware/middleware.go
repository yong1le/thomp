package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

func CheckAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Split JWT: bearer $token
		authHeader := r.Header.Get("Authorization")
		splitAuthHeader := strings.Split(authHeader, " ")
		if len(splitAuthHeader) != 2 {
			// JWT not in right form, client's error
			http.Error(w, "Missing or invalid authorization header", http.StatusBadRequest)
			return
		}

		// Get Public Key
		region := os.Getenv("AWS_REGION")
		userPoolID := os.Getenv("AWS_USER_POOL_ID")
		pubKeyURL := fmt.Sprintf(
			"https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json",
			region, userPoolID)
		set, err := jwk.Fetch(r.Context(), pubKeyURL)
		if err != nil {
			// Problem fetching JWK, server's error
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Validate JWT
		token, err := jwt.Parse(
			[]byte(splitAuthHeader[1]),
			jwt.WithKeySet(set),
			jwt.WithValidate(true))
		if err != nil {
			// Problem validating token, server's error
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Print(token)

		next.ServeHTTP(w, r)
	})
}
