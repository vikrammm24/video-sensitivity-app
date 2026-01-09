export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <a href="/library" style={{ marginRight: 10 }}>My Videos</a>
      <a href="/upload" style={{ marginRight: 10 }}>Upload</a>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

