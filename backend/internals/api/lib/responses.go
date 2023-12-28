package lib

import (
	"encoding/json"
	"log"
	"net/http"
)

func SendJsonError(w http.ResponseWriter, code int, error string) {
	if code > 499 {
		log.Println("Server error: ", error)
	}
	SendJsonResponse(w, code, JsonError{Error: error})
}

func SendJsonResponse(w http.ResponseWriter, code int, payload interface{}) {
	w.WriteHeader(code)
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}
