
import { useState, useEffect } from "react"
import validator from "validator"
import axios from "axios"
import { BASE_URL } from "../utils/apis"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { BsEyeFill } from "react-icons/bs"
import { FaEyeSlash, FaGithub, FaGoogle, FaHeart, FaCode, FaCoffee } from "react-icons/fa"
import { IoFlash } from "react-icons/io5"

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: { value: "", error: "" },
        password: { value: "", error: "" },
    })

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        window.addEventListener("online", () => {
            setIsOnline(true)
        })

        window.addEventListener("offline", (e) => {
            setIsOnline(false)
        })

        return () => toast.dismiss()
    }, [])

    function handleTogglePassword() {
        setShowPassword(!showPassword)
    }

    function handleChange(e) {
        const { name, value } = e.target
        const newValues = { ...formValues }

        if (name == "email") {
            newValues[name] = {
                value: value && value.trim(),
                error: !value ? "Required" : !validator.isEmail(value) ? "Invalid Email" : "",
            }
        }

        if (name == "password") {
            newValues[name] = {
                value: value && value.trim(),
                error : !value ? "Required" : "",
            }
        }

        setFormValues(newValues)
    }

    async function handleClick() 
    {
        const { email, password } = formValues;

        if (!email.value && password.value.trim() == "") {
            setFormValues({
                ...formValues,
                email: {
                    ...formValues.email,
                    error: !validator.isEmail(email.value) ? "Invalid Email" : "Required",
                },
                password: {
                    ...formValues.password,
                    error: "Required",
                },
            })
            return;
        }

        if (!password.value) {
            setFormValues({
                ...formValues,
                password: {
                ...formValues.password,
                error: "Required",
                },
            })
            return;
        }

        const data = {
            email: formValues.email.value,
            password: formValues.password.value,
        };

        try {
            setIsDisabled(true)
            const res = await axios.post(`${BASE_URL}/login`, data, { withCredentials: true })

            if (res?.data?.token) {
                toast.success("Login Success", { position: "top-center", duration: 2000 })
                setTimeout(() => {
                    navigate("/home")
                    setIsDisabled(false)
                }, 2100)
            }
            } catch (err) {
                toast.error(err?.response?.data?.message || "Check Internet Connection")
                console.log(err)
                setIsDisabled(false)
            }
        }

        if (isOnline == false) {
            return <h2 className="text-center text-2xl text-white">You're Offline. Please Check your network connection.</h2>
        }

    return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <section className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">

            {/* left side box */}
            <aside className="hidden lg:block space-y-8 text-white">      
                {/*  oen*/}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaHeart className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Dev Tinder
                    </h1>
                </div>
                {/*two  */}
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <FaCode className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Connect with Fellow Developers</h3>
                        <p className="text-gray-400 text-sm">Find your coding soulmate</p>
                    </div>
                </div>
                {/* three */}
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <FaCoffee className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Share Your Passion</h3>
                        <p className="text-gray-400 text-sm">Bond over your favorite tech stack</p>
                    </div>
                </div>
                {/* four */}
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <IoFlash className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Build Something Together</h3>
                        <p className="text-gray-400 text-sm">Collaborate on projects and life</p>
                    </div>
                </div>

                {/* five */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 font-mono text-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-green-400">
                        <div>$ npm install love</div>
                        <div className="text-gray-500">Installing dependencies...</div>
                        <div>$ node findMatch.js</div>
                        <div className="text-pink-400">{"> Match found! 💕"}</div>
                    </div>
                </div>
            </aside>

            {/* right side */}
            <aside className="w-full max-w-md mx-auto">
                <nav className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg">
                    <div className="text-center space-y-2 p-4 pb-0">
                        <div className="flex justify-center lg:hidden mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <FaHeart className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="text-gray-300">Sign in to find your perfect coding partner</p>
                    </div>

                    <div className="space-y-4 p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 px-4 py-2 rounded-md flex items-center justify-center">
                                <FaGithub className="w-4 h-4 mr-2" />
                                GitHub
                            </button>
                            <button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 px-4 py-2 rounded-md flex items-center justify-center">
                                <FaGoogle className="w-4 h-4 mr-2" />
                                Google
                            </button>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm">
                            <div className="flex-grow border-t border-white/20"></div>
                            <span className="px-3">OR</span>
                            <div className="flex-grow border-t border-white/20"></div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Tell us your Email Id"
                                onChange={handleChange}
                                value={formValues.email.value}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                            />
                            <span className="text-red-500 text-sm">{formValues.email.error}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimum 5 characters"
                                    onChange={handleChange}
                                    value={formValues.password.value}
                                    name="password"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePassword}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                {showPassword ? <BsEyeFill size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            </div>
                            <span className="text-red-500 text-sm">{formValues.password.error}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 text-gray-300">
                                <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {isDisabled ? (
                            <button
                                disabled
                                className="w-full bg-pink-600/50 cursor-not-allowed text-white font-semibold py-3 rounded-md transition-all duration-200"
                            >
                                Logging...
                            </button>
                            ) : (
                            <button
                                className="w-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold py-[10px] transition-all duration-200 transform hover:scale-105 rounded-md"
                                onClick={handleClick}
                            >
                                Submit
                            </button>
                        )}

                        <div className="text-center text-sm text-gray-300">
                            Don't have an account ? &nbsp;
                            <Link to="/signup" className="text-purple-400 underline hover:text-purple-300 font-semibold transition-colors">
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </nav>
            </aside>
        </section>
    </main>
    )
}
export default Login;
