import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "editor") {
        window.location.href = "/editor";
      } else {
        window.location.href = "/library";
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome</h1>
          <p className="text-white/60 text-sm">Access your premium video dashboard</p>
        </div>

        {/* Form Card */}
        <div className="premium-card">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="glass-panel-sm border-l-4 border-status-flagged bg-status-flagged/10 p-4">
                <p className="text-status-flagged text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-premium-light hover:text-premium-lighter font-semibold transition-colors">
                Create one
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/40 text-xs">
          <p>© 2026 Premium Video Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
