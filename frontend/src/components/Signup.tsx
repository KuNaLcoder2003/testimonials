import React, { useState } from 'react';
import { UserPlus, Lock, Mail, User, User2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const BACKEND_URL = `http://localhost:8000/api/v1`
console.log(BACKEND_URL)
const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null)
    const { login } = useAuth()
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (!file) {
            setError("Please select user image");
            return
        }
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', file)
        try {
            const response = await fetch(`${BACKEND_URL}/user/signup`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (!data.valid) {
                setError(data.message)
            } else {
                login(data.token, data.user)
            }
        } catch (error) {

        }

    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl z-1">
            <div className="w-full max-w-sm bg-gradient-to-b from-sky-50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-blue-100 text-black">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
                    <UserPlus className="w-7 h-7 text-black" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">
                    Create your account
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Join us today and start collaborating with your team for free
                </p>
                <div className="w-full flex flex-col gap-3 mb-2">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                placeholder="First name"
                                type="text"
                                value={firstName}
                                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                placeholder="Last name"
                                type="text"
                                value={lastName}
                                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="Password (min. 8 characters)"
                            type="password"
                            value={password}
                            className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <User2 className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="File"
                            type="file"
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => {
                                const files = e.target.files
                                if (!files) {
                                    return
                                }
                                setFile(files[0])
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {error && (
                            <div className="text-sm text-red-500">{error}</div>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleSignUp}
                    className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
                >
                    Create Account
                </button>
                <div className="flex items-center w-full my-2">
                    <div className="flex-grow border-t border-dashed border-gray-200"></div>
                    <span className="mx-2 text-xs text-gray-400">Or sign up with</span>
                    <div className="flex-grow border-t border-dashed border-gray-200"></div>
                </div>
                <div className="flex gap-3 w-full justify-center mt-2">
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-6 h-6"
                        />
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
                        <img
                            src="https://www.svgrepo.com/show/448224/facebook.svg"
                            alt="Facebook"
                            className="w-6 h-6"
                        />
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
                        <img
                            src="https://www.svgrepo.com/show/511330/apple-173.svg"
                            alt="Apple"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button className="text-black font-medium hover:underline">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp