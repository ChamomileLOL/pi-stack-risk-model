// src/main.jsx (Final Wasm Integration Fix)
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// CRITICAL FIX: Import the whole package object instead of destructuring the functions
import init, * as risk_wasm_pkg from '../risk_wasm/pkg';

// --- Configuration ---
const SIMULATION_ITERATIONS = 1_000_000;

const App = () => {
    const [result, setResult] = useState("Initializing Wasm Core...");
    const [time, setTime] = useState(0);
    const [greeting, setGreeting] = useState("Wasm Greeting Pending...");

    useEffect(() => {
        // 1. Initialize the Wasm module
        init().then(() => {
            // --- IMPORTANT: ALL WASM CALLS MUST BE INSIDE THIS .then() BLOCK ---

            // 2. Run the Rust Wasm function and measure performance
            const startTime = performance.now();

            // FIX: Access the function via the imported package object (risk_wasm_pkg)
            const riskValue = risk_wasm_pkg.calculate_monte_carlo_risk(SIMULATION_ITERATIONS);

            const endTime = performance.now();
            const executionTime = (endTime - startTime).toFixed(3);

            // 3. Update state with the results
            setResult(`Simulated VaR: ${riskValue.toFixed(6)}`);
            setTime(executionTime);

            // 4. FIX: Access greet via the imported package object
            setGreeting(risk_wasm_pkg.greet("Developer"));

        }).catch(e => {
            console.error("Wasm initialization failed:", e);
            setResult("Wasm Error! Check the browser console.");
        });
    }, []); // Run only once

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>✅ Pi Stack Running: Wasm Core Verified</h1>
            <p style={{ color: 'green', fontSize: '1.2em' }}>
                Frontend (React) successfully executed the Rust WebAssembly core.
            </p>

            <hr />

            <h2>Monte Carlo Risk Simulation (Rust Wasm)</h2>
            <p>Iterations: **{SIMULATION_ITERATIONS.toLocaleString()}**</p>

            {/* Display the result from the Rust Wasm core */}
            <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#B33A3A' }}>
                {result}
            </p>
            <p style={{ color: 'gray' }}>
                Execution Time: **{time} ms** (Proof of low-latency computation)
            </p>

            <hr />

            {/* Display the fixed greeting */}
            <p style={{ color: '#007ACC' }}>{greeting}</p>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);