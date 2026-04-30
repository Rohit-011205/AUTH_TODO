import React from 'react'
import { useState } from 'react'
import API from '../API.js'
import { Link, useNavigate } from 'react-router-dom'    


const Verification = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const { setUser } = useStore();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/auth/verify-otp', { email, otp });
            setUser(data.user, data.token);
            navigate('/projects');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-white mb-1">Verify Email</h1>
                <p className="text-gray-400 mb-6">Enter the OTP sent to <span className="text-blue-400">{email}</span></p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center text-xl"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
  )
}

export default Verification
