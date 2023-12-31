FROM golang:1.21.3

WORKDIR /backend
COPY go.mod go.mod
RUN go mod download

# Hotreloading with go air
# RUN go install github.com/cosmtrek/air@latest

COPY . .

EXPOSE ${PORT}
CMD [ "go", "run", "." ]

