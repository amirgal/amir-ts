import { useState } from "react";
import "../../styles/App.css";

const API_URL = "api/auth";

interface User {
    id: string;
    name: string;
    email: string;
}

function App() {
    const [mode, setMode] = useState<'login' | 'register'>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(() => {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) as User : null;
    });

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_URL}/${mode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    mode === "register"
                        ? { name, email, password }
                        : { email, password }
                ),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.message || "Something went wrong");
            } else {
                if (mode === "login") {
                    setMessage("Login successful!");
                    setToken(data.token);
                    setUser(data.user as User);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    setMessage("Registration successful! You can now log in.");
                    setMode("login");
                }
                resetForm();
            }
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                setMessage("Network error: " + (err as { message?: string }).message);
            } else {
                setMessage("Network error");
            }
        }
        setLoading(false);
    };

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setMessage("Logged out.");
    };

    if (token && user) {
        return (
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md mt-10">
                <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
                <p>Email: {user.email}</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                    Logout
                </button>
                {message && <div className="mt-4 text-green-600">{message}</div>}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md mt-10">
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded ${mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => { setMode("login"); setMessage(null); }}
                    disabled={mode === "login"}
                >
                    Login
                </button>
                <button
                    className={`px-4 py-2 rounded ${mode === "register" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => { setMode("register"); setMessage(null); }}
                    disabled={mode === "register"}
                >
                    Register
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {mode === "register" && (
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 placeholder-gray-500"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 placeholder-gray-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 placeholder-gray-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 rounded font-semibold"
                    disabled={loading}
                >
                    {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
                </button>
                {message && <div className="mt-4 text-red-600 text-center">{message}</div>}
            </form>
        </div>
    );
}

export default App;
