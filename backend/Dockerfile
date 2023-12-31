FROM golang:1.21.3

WORKDIR /backend
COPY go.mod go.mod
RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE ${PORT}
CMD [ "./main" ]

