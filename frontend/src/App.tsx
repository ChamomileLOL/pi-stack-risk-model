import { createSignal } from 'solid-js';
import './App.css';

function App() {
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
                throw new Error(`Server Error: ${response.statusText}`);
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
        <div className="App">
            <header className="header">
                <h1>π Stack Risk Model</h1>
                <p>End-to-End Type Safety: Rust 🦀 → Wasm 🕸️ → Go 🐹 → DB 🐘</p>
            </header>

            <div className="card">
                <button onClick={calculateRisk} disabled={loading}>
                    {loading ? 'Calculating Monte Carlo...' : '⚡ Run Risk Simulation'}
                </button>

                {error && <div className="error">❌ {error}</div>}

                {result && (
                    <div className="success">
                        <h3>✅ Simulation Complete</h3>
                        <pre>{result}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;