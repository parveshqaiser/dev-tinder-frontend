
import React, { useEffect, useState } from 'react';
import img from "../../images/reg.avif";
import img1 from "../../images/signup.jpg"
import img2 from "../../images/devBg.jpg";
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
    <Toaster position='top-center' />
    <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{backgroundImage: `url(${img2})`, backgroundPosition:"center", backgroundSize:"cover"}}
    >
        <div className="w-full max-w-sm mx-auto p-6 bg-white bg-opacity-50 rounded-lg">
            <h2 className="text-black text-2xl font-semibold text-center mb-6">
                Create Your Account
            </h2>
            <div className="mb-3">
                <input
                    type="text"
                    name='fullName'
                    value={formValues.fullName.value}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                />
               <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.fullName.error}
                    </span>
               </div>                
            </div>
            <div className="mb-3">
                <input
                    name='email'
                    value={formValues.email.value}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                />
                <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.email.error}
                    </span>
               </div>    
                
            </div>
            <div className="mb-3">
                <input
                    name='age'
                    onChange={handleChange}
                    value={formValues.age.value}
                    type="text"
                    placeholder="Enter Age"
                    title='Age Must be above 18'
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                />
                <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.age.error}
                    </span>
               </div>  
                
            </div>
            <div className="mb-3">
                <input
                    name='password'
                    value={formValues.password.value}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Password"
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                />
                <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.password.error}
                    </span>
               </div>  
            </div>
            {/* <div className='mb-2'>
                <Select value={selectedLanguages} onChange={handleLanguage} closeMenuOnSelect={false} components={animatedComponents} isMulti options={optionList}></Select>
            </div> */}
            <div className="mb-2">
                <select name='gender' onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none">
                    <option value={""}>Select Your Gender</option>
                    <option value={"Male"}> ♂️ Male</option>
                    <option value={"Female"}> ♀ Female</option>
                    <option value={"Others"}>Others</option>
                </select>
                <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.gender.error}
                    </span>
               </div>  
            </div> 
            <div className="mb-2">
                <textarea
                    name='bio'
                    value={formValues.bio.value}
                    onChange={handleChange}
                    placeholder="Tell something about yourself..."
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 outline-none"
                />
                <div className='h-3'>
                    <span className="text-red-600 text-sm">
                        {formValues.bio.error}
                    </span>
                </div>  

            </div>
            <div>
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
                <p className='text-center text-black'>Exiting User ? <Link to="/login">Login </Link></p>
        </div>
    </div>
    </>
    )
}

export default SingUpPage;




