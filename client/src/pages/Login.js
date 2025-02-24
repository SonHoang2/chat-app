import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { user, login, getGoogleCode } = useAuth();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await login({ email, password });
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="shadow-lg border px-6 py-8 bg-white rounded-lg w-96">
                <form onSubmit={handleSubmit}>
                    <p className="text-green-500 text-3xl font-semibold text-center mb-6">LOGIN TO YOUR ACCOUNT</p>
                    {error && (
                        <div className="alert alert-danger text-red-600 font-bold mb-4">{error}. Try again.</div>
                    )}
                    <div className="flex flex-col mb-4">
                        <label className="font-semibold text-gray-700" htmlFor="email">Email address</label>
                        <input
                            className="form-input py-2 px-4 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="font-semibold text-gray-700" htmlFor="password">Password</label>
                        <input
                            className="form-input py-2 px-4 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="flex justify-end mb-4">
                        <Link to='/user/forgotPassword' className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
                    </div>
                    <div className="flex justify-center mb-4">
                        <input
                            type="submit"
                            value="Login"
                            className="bg-green-500 text-white py-2 px-4 w-full rounded-md cursor-pointer hover:bg-green-600 transition duration-200"
                        />
                    </div>
                </form>
                <div className="text-center text-gray-600 mb-4">
                    <p>Or login with a social account</p>
                </div>
                <div className="flex flex-col my-3">
                    <div
                        className="btn border shadow-sm flex items-center w-full mb-3 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200"
                        onClick={getGoogleCode}
                    >
                        <img src="/img/google-icon.png" alt="google" className="w-6 h-6"/>
                        <span className="ml-3">Sign in with Google</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
