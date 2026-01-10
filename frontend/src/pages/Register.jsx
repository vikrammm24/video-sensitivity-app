import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-white/60 text-sm">Join our premium video platform</p>
        </div>

        {/* Form Card */}
        <div className="premium-card">
          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="glass-panel-sm border-l-4 border-status-flagged bg-status-flagged/10 p-4">
                <p className="text-status-flagged text-sm font-semibold">{error}</p>
              </div>
            )}

            {success && (
              <div className="glass-panel-sm border-l-4 border-status-safe bg-status-safe/10 p-4">
                <p className="text-status-safe text-sm font-semibold">{success}</p>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create a strong password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Account Type</label>
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="viewer" className="bg-premium-dark">Viewer - Watch Videos</option>
                <option value="editor" className="bg-premium-dark">Editor - Moderate Content</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <a href="/" className="text-premium-light hover:text-premium-lighter font-semibold transition-colors">
                Sign in
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
