// risk_wasm/src/lib.rs

// This line allows Rust functions to be exposed to JavaScript/WebAssembly
use wasm_bindgen::prelude::*;

// We use the 'console_error_panic_hook' crate to get better error messages
// This is critical for debugging Wasm in the browser
#[cfg(feature = "console_error_panic_hook")]
pub fn set_panic_hook() {
    console_error_panic_hook::set_once();
}

// ----------------------------------------------------------------------
// Monte Carlo Simulation Placeholder
// ----------------------------------------------------------------------

/// Calculates a simulated risk value using a high-iteration loop.
/// This simulates a simple Monte Carlo run for portfolio risk.
///
/// * num_simulations: The number of iterations to run (e.g., 1000000).
#[wasm_bindgen]
pub fn calculate_monte_carlo_risk(num_simulations: u32) -> f64 {
    // Set the panic hook to get useful error messages if the Rust code crashes
    set_panic_hook();

    let mut total_risk = 0.0;
    
    // Simulate the intensive computation required by the problem statement
    for _ in 0..num_simulations {
        // Simple math to simulate complexity
        total_risk += (num_simulations as f64) * 0.00001; 
    }

    // Return the simulated Value-at-Risk (VaR) result
    total_risk / (num_simulations as f64)
}

// ----------------------------------------------------------------------
// Hello World (Optional, for simple testing)
// ----------------------------------------------------------------------

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {} from Rust Wasm!", name)
}