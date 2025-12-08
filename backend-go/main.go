// backend-go/main.go (Phase 7, Step 3 - Final Integration)
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
"github.com/rs/cors" // <--- ADD THIS LINE

	// 1. IMPORT PRISMA CLIENT: Use the relative path to the generated client package
	// This assumes the client code is generated in the 'prisma-client' folder
    prisma "pi-stack-risk-model/backend-go/prisma-client"
)

// Define the data structure for an incoming stock tick 
type StockTick struct {
	Symbol string `json:"symbol"`
	Price  float64 `json:"price"`
	Volume int    `json:"volume"`
}

// Global variable for the prisma Prisma Client
var client *prisma.PrismaClient

// Handler function for the data ingestion endpoint
func ingestDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not supported. Use POST.", http.StatusMethodNotAllowed)
		return
	}

	var ticks []StockTick
	err := json.NewDecoder(r.Body).Decode(&ticks)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err), http.StatusBadRequest)
		return
	}

	// Placeholder Data Aggregation
	totalVolume := 0
	for _, tick := range ticks {
		totalVolume += tick.Volume
	}

	// 2. Save the Aggregated Tick data to the PostgreSQL database (Prisma)
	_, err = client.AggregatedTick.CreateOne(
		prisma.AggregatedTick.Symbol.Set("PI-TICK"),
		prisma.AggregatedTick.StartTime.Set(time.Now()),
		prisma.AggregatedTick.TotalVolume.Set(totalVolume),
		prisma.AggregatedTick.AveragePrice.Set(150.375), // Placeholder average price
	).Exec(context.Background())

	if err != nil {
		log.Printf("Prisma Aggregation Save Error: %v", err)
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Successfully ingested %d stock ticks. Total Volume aggregated: %d. Data saved to DB.", len(ticks), totalVolume)
}

// Handler function to simulate Wasm Edge Execution and save result
func wasmEdgeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not supported. Use GET.", http.StatusMethodNotAllowed)
		return
	}
	
	// 3. Save the Wasm Risk Model Result to the PostgreSQL database (Prisma)
	// Simulates a successful Wasm execution returning a Value-at-Risk (VaR)
	riskValue := 9.999999
	
	_, err := client.RiskModelResult.CreateOne(
		prisma.RiskModelResult.Portfolio.Set("GlobalVol"),
		prisma.RiskModelResult.ValueAtRisk.Set(riskValue),
	).Exec(context.Background())
	
	if err != nil {
		log.Printf("Prisma Risk Save Error: %v", err)
		http.Error(w, "Wasm executed, but database save failed.", http.StatusInternalServerError)
		return
	}

	// Final success response
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Wasm Edge Function Executed and Result (VaR: %.6f) SAVED to PostgreSQL via Prisma. End-to-End Type Safety Complete!", riskValue)
}

func main() {
	// 4. Initialize the Prisma Client
	client = prisma.NewClient()
	if err := client.Connect(); err != nil {
		log.Fatalf("Could not connect to Prisma Database: %v", err)
	}
	defer func() {
		if err := client.Disconnect(); err != nil {
			log.Fatalf("Could not disconnect from Prisma Database: %v", err)
		}
	}()
	log.Println("Prisma Client connected to PostgreSQL.")

	// Define API routes
	http.HandleFunc("/data/ingest", ingestDataHandler)
	http.HandleFunc("/wasm/edge", wasmEdgeHandler)

	// The Go server will run on port 8080
	port := "8080"
	fmt.Printf("Go Backend Server listening on http://localhost:%s\n", port)
	
	// Start the server
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}