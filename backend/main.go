package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// 1. Definimos la estructura de un Gasto (Como una Interface en TS)
type Expense struct {
	ID       int     `json:"id"`
	Title    string  `json:"title"`
	Amount   float64 `json:"amount"`
	Category string  `json:"category"`
}

// 2. Datos "Dummy" (Simulando una base de datos)
var expenses = []Expense{
	{ID: 1, Title: "Uber a la oficina", Amount: 15.50, Category: "Transporte"},
	{ID: 2, Title: "Almuerzo", Amount: 12.00, Category: "Comida"},
	{ID: 3, Title: "Netflix", Amount: 9.99, Category: "Entretenimiento"},
}

func main() {
	// 3. Definimos la ruta /expenses
	http.HandleFunc("/expenses", func(w http.ResponseWriter, r *http.Request) {
		// Headers para permitir que la App móvil se conecte (CORS básico)
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Convertimos el array a JSON y lo enviamos
		json.NewEncoder(w).Encode(expenses)
	})

	fmt.Println("Backend corriendo en puerto 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
