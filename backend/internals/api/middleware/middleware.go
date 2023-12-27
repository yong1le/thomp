package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/yong1le/thomp/backend/internals/api/models"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

func CheckAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonWriter := json.NewEncoder(w)

		// Load env variables
		region := os.Getenv("AWS_REGION")
		userPoolID := os.Getenv("AWS_USER_POOL_ID")
		appClientID := os.Getenv("AWS_APP_CLIENT_ID")

		// Split JWT: bearer $token
		authHeader := r.Header.Get("Authorization")
		splitAuthHeader := strings.Split(authHeader, " ")
		if len(splitAuthHeader) != 2 {
			// JWT not in right form, client's error
			w.WriteHeader(http.StatusBadRequest)
			jsonWriter.Encode(models.JsonError{
				Error: "Missing or invalid authorization header.",
			})
			return
		}

		// Get Public Key
		pubKeyURL := fmt.Sprintf(
			"https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json",
			region, userPoolID)
		set, err := jwk.Fetch(r.Context(), pubKeyURL)
		if err != nil {
			// Problem fetching JWK, server's error
			w.WriteHeader(http.StatusInternalServerError)
			jsonWriter.Encode(models.JsonError{Error: err.Error()})
			return
		}

		// Validate JWT
		token, err := jwt.Parse(
			[]byte(splitAuthHeader[1]),
			jwt.WithKeySet(set),
			jwt.WithValidate(true))
		if err != nil {
			// Invalid token, client's error
			w.WriteHeader(http.StatusBadRequest)
			jsonWriter.Encode(models.JsonError{Error: err.Error()})
			return
		}

		// Verify the claims of the token
		clientID, ok1 := token.Get("client_id")
		tokenUse, ok2 := token.Get("token_use")
		issuer, ok3 := token.Get("iss")
		correctISS := fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s", region, userPoolID)
		if !ok1 || !ok2 || !ok3 || clientID != appClientID || tokenUse != "access" || issuer != correctISS {
			w.WriteHeader(http.StatusUnauthorized)
			jsonWriter.Encode(models.JsonError{
				Error: "Failed to verify the claims of authorization token.",
			})
			return
		}

		// Store username for use in handlers
		username, _ := token.Get("username")
		ctx := context.WithValue(r.Context(), "username", username)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
