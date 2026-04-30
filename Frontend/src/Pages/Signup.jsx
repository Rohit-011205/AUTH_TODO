import React, { useState } from 'react'
import API from '../API.js'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../Store/useStore.js'

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await API.post('/auth/signup', formData);
            navigate('/verify-otp', { state: { email: formData.email } });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0c0e] text-white flex items-center justify-center px-4">
            <div className="bg-[#111113] border border-zinc-800 p-8 rounded-2xl w-full max-w-md">
                
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter italic text-emerald-500">Task.Base</h1>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">New Operator</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-xs font-bold uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-all"
                            placeholder="Rohit Kadam"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2 ml-1">Email Identifier</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2 ml-1">Security Key</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Initialize Account'}
                    </button>
                </form>

                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest text-center mt-8">
                    Registered already? <Link to="/login" className="text-emerald-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;