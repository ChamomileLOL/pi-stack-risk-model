import { createSignal } from 'solid-js';
import './App.css';

// Fix: Import types required for standard HTML elements
import type { Component } from 'solid-js';

// Use Component type for the main function
const App: Component = () => {
    // Corrected state types
    const [result, setResult] = createSignal<string | null>(null);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);

    // Get the backend URL from the .env file (or default to localhost)
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

    const calculateRisk = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            console.log(`📡 Calling Backend at: ${API_BASE}/wasm/edge`);

            // The fetch call to your Go Backend
            const response = await fetch(`${API_BASE}/wasm/edge`);

            if (!response.ok) {
                // Read error message from response text if available
                const errorText = await response.text();
                throw new Error(`Server Error (${response.status}): ${errorText.substring(0, 100)}...`);
            }

            const text = await response.text();
            setResult(text);
        } catch (err: any) {
            setError(err.message || "Failed to connect to the Brain");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="App"> {/* Fix: Use 'class' instead of 'className' */}
            <header class="header">
                <h1>π Stack Risk Model</h1>
                <p>End-to-End Type Safety: Rust 🦀 → Wasm 🕸️ → Go 🐹 → DB 🐘</p>
            </header>

            <div class="card"> {/* Fix: Use 'class' instead of 'className' */}
                <button onClick={calculateRisk} disabled={loading()}> {/* Fix: Call accessor function 'loading()' */}
                    {loading() ? 'Calculating Monte Carlo...' : '⚡ Run Risk Simulation'}
                </button>

                {/* Fix: Call accessor function 'error()' */}
                {error() && <div class="error">❌ {error()}</div>}

                {/* Fix: Call accessor function 'result()' */}
                {result() && (
                    <div class="success"> {/* Fix: Use 'class' instead of 'className' */}
                        <h3>✅ Simulation Complete</h3>
                        <pre>{result()}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;