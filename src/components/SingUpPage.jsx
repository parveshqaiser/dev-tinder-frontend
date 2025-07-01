
import React, { useEffect, useState } from 'react';
// import bg from "../../public/images/sign.jpg"
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { BASE_URL } from '../utils/apis';
import toast, { Toaster } from 'react-hot-toast';
import "../App.css";

const SingUpPage = () => {

    let navigate = useNavigate();

    useEffect(()=>{
        return(()=>{
            toast.dismiss();
        })
    },[])

    const [formValues , setFormValues] = useState({
        fullName : {
            value:"",
            error :"",
        },
        email : {
            value:"",
            error :"",
        },
        age : {
            value:"",
            error :"",
        },
        password : {
            value:"",
            error :"",
        },
        gender : {
            value:"",
            error :"",
        },
        bio : {
            value:"",
            error :"",
        },
        languages : {
            value : "",
            error : ""
        }
    });

    let [isDisabled, setIsDisabled] = useState(false);

    function handleChange(e)
    {
        let {name, value} = e.target;
        let newValues = {...formValues};

        if(name == "fullName" || name =="bio"){
            newValues[name] = {
                value : value && value.charAt(0).toUpperCase() +  value.slice(1),
                error : !value ? "Required" :""
            }
        }

        if(name == "email"){
            newValues[name] = {
                value : value,
                error : (!validator.isEmail(value) ? "Invalid Email" : "")
            }
        }

        if(name == "age"){
            newValues[name] = {
                value : parseInt(value) || "",
                error : !value ? "Required" : (value && value <=17 )? "Must be above 18" : "" 
            }
        }

        if(name == "password" || name == "gender"){
            newValues[name] = {
                value : value,
                error : !value ? "Required" : "" 
            }
        }
        setFormValues(newValues);        
    }

    async function handleSubmit()
    {
        let {fullName , email,age, password, bio, gender} = formValues;

        if(!fullName.value){
            setFormValues({
                ...formValues,
                fullName : {
                    ...formValues.fullName,
                    error : "Required"
                }
            });
            return;
        }

        if(!email.value){
            setFormValues({...formValues, email : {...formValues.email, error : !(validator.isEmail(email.value)? "Invalid Email" : "")}});
            return;
        }

        if((age.value && age.value <17) || !age.value){
            setFormValues({...formValues,age : {...formValues.age, error : !age.value ? "Required" : "Must be above 18"}});
            return;
        }

        if(!password.value){
            setFormValues({...formValues,password : {...formValues.password, error : "Required"}});
            return;
        }

        if(!gender.value){
            setFormValues({...formValues,gender : {...formValues.gender, error : "Required"}});
            return;
        }

        if(!bio.value){
            setFormValues({...formValues,bio : {...formValues.bio, error : "Required"}});
            return;
        }

        let dataToBeSend = {
            fullName : fullName.value.trim() || "",
            email : email.value.trim() || "",
            age : age.value.toString() || "",
            password : password.value.trim() || "",
            bio : bio.value.trim() || "",
            gender : gender.value || "",
        };

        try {
            setIsDisabled(true);
            let res = await axios.post(BASE_URL + "/signup",dataToBeSend,{withCredentials:true});           
            if(res.data.success){
                toast.success(res.data.message,{duration:2400})
                setTimeout(()=>{
                    navigate("/login");
                    setIsDisabled(false);
                },2500)
            }
        } catch (error) {
            console.log(error);
            setIsDisabled(false);
            toast.error(error?.response?.data?.message,{duration:2000})
        }

    }

    return (
    <main className="flex flex-wrap justify-center sm:justify-around min-h-screen bg-gray-800 text-white p-2">

        <div className="hidden sm:block max-w-xl mt-3">
            <img src="/images/sign.jpg" alt="Background" className="w-full h-full object-cover rounded-lg" />
        </div>
    
        <div className="w-full sm:w-2/3 lg:w-1/2 mt-5 rounded-lg p-4">
            <header className="text-2xl font-mono mb-4 text-center">Create DevTinder Account</header>
            <p className="text-sm mb-4 text-center">
                Already have an account? <span className="text-pink-500 cursor-pointer hover:underline">
                    <Link to="/login">Log In</Link>
                </span>
            </p>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        value={formValues.fullName.value}
                        placeholder="Your Full Name"
                        type="text"
                        onChange={handleChange}
                        autoComplete="off"
                        name="fullName"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    />
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.fullName.error}</span>
                </div>    
                <div>
                    <input
                        value={formValues.email.value}
                        placeholder="Your Email Address"
                        type="email"
                        onChange={handleChange}
                        autoComplete="off"
                        name="email"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    />
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.email.error}</span>
                </div>    
                <div>
                    <input
                        value={formValues.password.value}
                        placeholder="Set Your Password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="off"
                        name="password"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    />
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.password.error}</span>
                </div>    
                <div>
                    <input
                        value={formValues.age.value}
                        placeholder="Your Age in number"
                        type="text"
                        onChange={handleChange}
                        autoComplete="off"
                        name="age"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    />
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.age.error}</span>
                </div>    
                <div className="sm:col-span-2">
                    <select
                        name="gender"
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    >
                        <option value="">Select Your Gender</option>
                        <option value="Male">♂️ Male</option>
                        <option value="Female">♀ Female</option>
                        <option value="Others">Others</option>
                    </select>
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.gender.error}</span>
                </div>    
                <div className="sm:col-span-2">
                    <textarea
                        name="bio"
                        value={formValues.bio.value}
                        onChange={handleChange}
                        placeholder="A brief about yourself ..."
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg outline-none focus:border-pink-500"
                    />
                    <span className="text-sm text-red-600 block min-h-[1.25rem]">{formValues.bio.error}</span>
                </div>    
                <div className="sm:col-span-2">
                
                    <button 
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`${isDisabled ? "cursor-not-allowed" : ""} animated-button w-full text-white px-6 py-2 rounded-md`}
                    >
                        {isDisabled ? "Submitting" : "Submit"}
                    </button>                    
                </div>
            </div>
        </div>
    </main>    
    )
}

export default SingUpPage;
