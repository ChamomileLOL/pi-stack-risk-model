π Stack Risk Model 🚀
A high-performance, end-to-end type-safe risk simulation engine. This project demonstrates a cutting-edge "π Stack" architecture, combining the safety of Rust, the portability of WASM, the concurrency of Go, and the reactivity of Solid.js.

🏗️ The Architecture (π Stack)
Frontend: Solid.js (TypeScript) deployed on Vercel.

Computation: Rust logic compiled to WebAssembly (WASM) for near-native simulation speeds.

Backend: Go (Golang) microservice deployed on Render acting as the orchestration layer.

Database: PostgreSQL managed via Prisma ORM for persistent simulation results.

⚡ How it Works
Trigger: The user initiates a Monte Carlo simulation from the Solid.js UI.

Execution: The Go backend invokes the Rust WASM module to perform heavy mathematical calculations (Value at Risk - VaR).

Persistence: The Go backend saves the calculation results into the PostgreSQL database using Prisma.

Feedback: The result is sent back to the frontend with full type safety across the entire journey.

🛠️ Installation & Setup
Prerequisites
Go 1.22+

Rust (with wasm-pack)

Node.js & npm

Backend Setup
Bash
cd backend-go
npm install
npx prisma db push
go run main.go
Frontend Setup
Bash
cd frontend
npm install
npm run dev
🌐 Deployment
Frontend: Hosted on Vercel at https://pi-stack-risk-model.vercel.app

Backend: Hosted on Render at https://pi-stack-risk-model.onrender.com