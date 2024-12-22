
import React, { useEffect, useState } from 'react';
import bg from "../../images/sign.jpg"
// import img  from '../../images/signup.jpg'
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { BASE_URL } from '../utils/apis';
import toast, { Toaster } from 'react-hot-toast';

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
    <>
        {/* <Toaster position='top-center' /> */}
        <div 
            className="min-h-screen flex items-center justify-center" 
            style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="w-full max-w-xl mx-auto p-6 bg-white bg-opacity-50 rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    Create Your DevTinder Account
                </h1>
                <p className="text-md font-mono text-center mb-3">Connect with developers around the world.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className=''>
                        {/* <label className="block text-sm font-medium text-gray-700">FullNAme</label> */}
                        <input 
                            value={formValues.fullName.value}
                            placeholder="Your full name"
                            type="text" 
                            onChange={handleChange}
                            autoComplete="off"
                            name="fullName"
                           className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                        />
                        <span className="text-sm text-red-600">{formValues.fullName.error}</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700"></label>
                        <input 
                            value={formValues.email.value}
                            placeholder="Your Email Address"
                            type="text" 
                            onChange={handleChange}
                            autoComplete="off"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                        />
                        <span className="text-sm text-red-600">{formValues.email.error}</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700"></label>
                        <input 
                            value={formValues.password.value}
                            placeholder="Set Your Password"
                            type="password" 
                            onChange={handleChange}
                            autoComplete="off"
                            name="password"
                            className='w-full px-3 py-2 border rounded-lg text-gray-800 outline-none'
                        />
                       <span className="text-sm text-red-600">{formValues.password.error}</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700"></label>
                        <input 
                            value={formValues.age.value}
                            placeholder="Your Age"
                            type="text" 
                            onChange={handleChange}
                            autoComplete="off"
                            name="age"
                            className='w-full px-3 py-2 border rounded-lg text-gray-800 outline-none'
                        />
                        <span className="text-sm text-red-600">{formValues.age.error}</span>
                    </div>
                    <div className="mb-2 sm:col-span-2">
                        <select 
                            name="gender" 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                        >
                            <option value="">Select Your Gender</option>
                            <option value="Male">♂️ Male</option>
                            <option value="Female">♀ Female</option>
                            <option value="Others">Others</option>
                        </select>
                        <span className="text-sm text-red-600">{formValues.gender.error}</span>
                    </div>
                    <div className="sm:col-span-2">
                        <textarea
                            name="bio"
                            value={formValues.bio.value}
                            onChange={handleChange}
                            placeholder="Tell something about yourself..."
                            className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                        />
                        <span className="text-sm  text-red-600">{formValues.bio.error}</span>
                    </div>
                    <div className='sm:col-span-2'>
                    {
                        isDisabled ?  
                        <button  disabled className="bg-pink-600 cursor-not-allowed w-full text-white px-6 py-2 rounded-md">
                            Submitting...
                        </button> :  <button
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white px-6 py-2 rounded-md"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    }
                    </div>
                    <div className='sm:col-span-2'>
                        <p className='text-center text-black'>Exiting User ? <Link className=''  to="/login">Login </Link></p>
                    </div>  
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default SingUpPage;




