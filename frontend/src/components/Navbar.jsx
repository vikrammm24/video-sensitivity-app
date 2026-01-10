export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-[20px] bg-black/40 border-b border-white/10 shadow-premium">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-premium-accent to-premium-light flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <h1 className="text-xl font-bold text-white">VideoHub</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a 
            href="/library" 
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
          >
            <span className="text-base">📚</span>
            <span>My Videos</span>
            <span className="w-0 h-0.5 bg-gradient-to-r from-premium-accent to-premium-light group-hover:w-full transition-all duration-300"></span>
          </a>

          <a 
            href="/upload" 
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
          >
            <span className="text-base">⬆️</span>
            <span>Upload</span>
            <span className="w-0 h-0.5 bg-gradient-to-r from-premium-accent to-premium-light group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="btn-secondary px-6 py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
