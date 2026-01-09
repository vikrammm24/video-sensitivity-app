import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered. Now login.");
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <select onChange={e => setForm({...form, role: e.target.value})}>
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
      </select>
      <button>Register</button>
    </form>
  );
}
