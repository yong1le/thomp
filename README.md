# THOMP

A full-stack social media platform built with

* React frontend
* Golang backend 
* Supabase S3 buckets, authentication, and Postgresql database

This project was a learning opportunity for

* JWT token-based authentication
* Postgresql functions, triggers, and cron jobs
* Server side rendering

The demo is available at http://thomp.vercel.app.

## Project Architecture

![image](https://github.com/yong1le/thomp/assets/76537485/c132037f-2a9d-469b-b59f-8c4b6a4134b7)


## Getting Started

Clone the project

```sh
git clone https://github.com/yong1le/thomp.git
cd thomp
```

Connect to your own Supabase services and create a `.env` file with the content

```env
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:8000"

SUPABASE_BUCKET_NAME=""
SUPABASE_URL=""
SUPABASE_ANON_KEY=""

DB_URL=""
BACKEND_PORT=8080
```

Run the docker compose file

```sh
docker compose up
```
Open [http://localhost:3000]() on your computer.
