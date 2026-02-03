module pi-stack-backend

go 1.25.0

require (
	github.com/rs/cors v1.11.1
	pi-stack-risk-model/backend-go/prisma-client v0.0.0-00010101000000-000000000000
)

require (
	github.com/joho/godotenv v1.5.1 // indirect
	github.com/shopspring/decimal v1.4.0 // indirect
	github.com/steebchen/prisma-client-go v0.47.0 // indirect
	go.mongodb.org/mongo-driver/v2 v2.0.1 // indirect
)

// C:\Users\Acer\source\repos\pi-stack-risk-model\backend-go\go.mod

// ... (existing dependencies and require blocks)

replace pi-stack-risk-model/backend-go/prisma-client => ./prisma-client
