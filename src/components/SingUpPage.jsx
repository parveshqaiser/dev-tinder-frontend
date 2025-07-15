
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validator from "validator"
import axios from "axios"
import { BASE_URL } from "../utils/apis"
import toast from "react-hot-toast"
import {FaHeart,FaCode,FaCoffee,FaUser,FaEnvelope,FaLock,FaCalendarAlt,FaVenusMars,FaEdit,} from "react-icons/fa"
import { IoFlash } from "react-icons/io5"

const SignUpPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
        toast.dismiss()
        }
    }, [])

    const [formValues, setFormValues] = useState({
        fullName: {
        value: "",
        error: "",
        },
        email: {
        value: "",
        error: "",
        },
        age: {
        value: "",
        error: "",
        },
        password: {
        value: "",
        error: "",
        },
        gender: {
        value: "",
        error: "",
        },
        bio: {
        value: "",
        error: "",
        },
        languages: {
        value: "",
        error: "",
        },
    })

    const [isDisabled, setIsDisabled] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        const newValues = { ...formValues }

        if (name == "fullName" || name == "bio") {
            newValues[name] = {
                value: value && value.charAt(0).toUpperCase() + value.slice(1),
                error: !value ? "Required" : "",
            }
        }

        if (name == "email") {
            newValues[name] = {
                value: value,
                error: !validator.isEmail(value) ? "Invalid Email" : "",
            }
        }

        if (name == "age") {
            newValues[name] = {
                value: Number.parseInt(value) || "",
                error: !value ? "Required" : value && value <= 17 ? "Must be above 18" : "",
            }
        }

        if (name == "password"){
            newValues[name] = {
                value: value,
                error : !value ? "Required" : (value.length <=8) ? "Password should be min 8 characters": "",
            }
        }

        if(name == "gender"){
            newValues[name] = {
                value: value,
                error : !value ? "Required" : "",
            }
        }
        setFormValues(newValues)
    }

    async function handleSubmit() {
        const { fullName, email, age, password, bio, gender } = formValues

        if (!fullName.value) {
            setFormValues({
                ...formValues,
                fullName: {
                ...formValues.fullName,
                error: "Required",
                },
            })
            return;
        }

        if (!email.value) {
            setFormValues({
                ...formValues,
                email: { ...formValues.email, error: !validator.isEmail(email.value) ? "Invalid Email" : "" },
            })
            return;
        }

        if ((age.value && age.value < 17) || !age.value) {
            setFormValues({
                ...formValues,
                age: { ...formValues.age, error: !age.value ? "Required" : "Must be above 18" },
            })
            return;
        }

        if (!password.value || password.value.length<=5) {
            setFormValues({
                ...formValues, 
                password : {
                    ...formValues.password,
                    error :!password.value ? "Required" : "Password should be min 8 characters"
            }})
            return;
        }

        if (!gender.value) {
            setFormValues({ ...formValues, gender: { ...formValues.gender, error: "Required" } })
            return;
        }

        if (!bio.value) {
            setFormValues({ ...formValues, bio: { ...formValues.bio, error: "Required" } })
            return;
        }

        const dataToBeSend = {
            fullName: fullName.value.trim() || "",
            email: email.value.trim() || "",
            age: age.value.toString() || "",
            password: password.value.trim() || "",
            bio: bio.value.trim() || "",
            gender: gender.value || "",
        };

        try {
            setIsDisabled(true)
            const res = await axios.post(BASE_URL + "/signup", dataToBeSend, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message, { duration: 2400 })
                setTimeout(() => {
                    navigate("/login")
                    setIsDisabled(false)
                }, 2500)
            }
        } catch (error) {
            console.log(error)
            setIsDisabled(false)
            toast.error(error?.response?.data?.message, { duration: 2000 })
        }
    }

    return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <section className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">

            <aside className="hidden lg:block space-y-8 text-white">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <FaHeart className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Dev Tinder
                        </h1>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <FaCode className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Build Your Developer Profile</h3>
                        <p className="text-gray-400 text-sm">Showcase your coding skills and personality</p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <FaCoffee className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Connect with Like-minded Devs</h3>
                        <p className="text-gray-400 text-sm">Find someone who speaks your language</p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <IoFlash className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Start Your Journey</h3>
                        <p className="text-gray-400 text-sm">Your perfect coding partner awaits</p>
                    </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 font-mono text-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-green-400">
                        <div>$ npm create dev-profile</div>
                        <div className="text-gray-500">Setting up your account...</div>
                        <div>$ node createAwesomeProfile.js</div>
                        <div className="text-pink-400">{"> Profile created successfully! 🚀"}</div>
                    </div>
                </div>
            </aside>

            <aside className="w-full max-w-2xl mx-auto">
                <nav className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg">
                    <div className="text-center space-y-2 p-6 pb-4">
                        <div className="flex justify-center lg:hidden mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <FaHeart className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <p className="text-gray-300"> Already have an account? &nbsp;
                            <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>

                    <div className="p-6 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaUser className="w-4 h-4 mr-2" /> Full Name
                                </label>
                                <input
                                    value={formValues.fullName.value}
                                    placeholder="Your Full Name"
                                    type="text"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="fullName"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                                />
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.fullName.error}</span>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaEnvelope className="w-4 h-4 mr-2" />  Email
                                </label>
                                <input
                                    value={formValues.email.value}
                                    placeholder="Your Email Address"
                                    type="email"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="email"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                                />
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.email.error}</span>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaLock className="w-4 h-4 mr-2" />  Password
                                </label>
                                <input
                                    value={formValues.password.value}
                                    placeholder="Set Your Password"
                                    type="password"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="password"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                                />
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.password.error}</span>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaCalendarAlt className="w-4 h-4 mr-2" />                                    Age
                                </label>
                                <input
                                    value={formValues.age.value}
                                    placeholder="Your Age in number"
                                    type="text"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="age"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                                />
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.age.error}</span>
                            </div>

                            <div className="sm:col-span-2 space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaVenusMars className="w-4 h-4 mr-2" /> Gender
                                </label>
                                <select
                                    name="gender"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                                >
                                    <option value="" className="bg-gray-800"> Select Your Gender</option>
                                    <option value="Male" className="bg-gray-800">♂️ Male </option>
                                    <option value="Female" className="bg-gray-800">♀ Female</option>
                                    <option value="Others" className="bg-gray-800">Others</option>
                                </select>
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.gender.error}</span>
                            </div>

                            <div className="sm:col-span-2 space-y-1">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <FaEdit className="w-4 h-4 mr-2" /> Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formValues.bio.value}
                                    onChange={handleChange}
                                    placeholder="A brief about yourself ..."
                                    rows="3"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none resize-none"
                                />
                                <span className="text-red-400 text-sm block min-h-[1.25rem]">{formValues.bio.error}</span>
                            </div>

                            <div className="sm:col-span-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isDisabled}
                                    className={`w-full ${isDisabled ? "bg-pink-600/50 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105"
                                    } text-white font-semibold py-3 transition-all duration-200 rounded-md`}
                                >
                                    {isDisabled ? "Submitting..." : "Create Account"}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>

        </section>
    </main>
    )
}

export default SignUpPage;
