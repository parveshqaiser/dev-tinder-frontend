

import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { interestList , languageList} from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/apis';
import { addUser } from '../redux/userSlice';

const EditProfile = () => {

    let dispatch = useDispatch();
    let user = useSelector(store => store?.user?.user);

    // console.log("** ", user);
    const animatedComponents = makeAnimated();

    let [isDisabled, setIsDisabled] = useState(false);

    const [formValues , setFormValues] = useState({
        fullName : {
            value: user?.fullName || "",
            error :"",
        },
        email : {
            value :user?.email || "",
        },
        age : {
            value: user?.age || "",
            error :"",
        },
        gender : {
            value: user?.gender || "",
            error :"",
        },
        bio : {
            value: user?.bio || "",
            error :"",
        },
        lang : [],
        skills : [],
        photoUrl : {
            value : '',
            error : "",
        }
    });

    useEffect(()=>{
        let incomingLangData = [];
        let incomingInterestData = [];
        if(user)
        {
            for(let lang of user.languages)
            {
                if(lang == "Hindi" || lang == "English" || lang == "Spanish" || lang == "French" || lang =="German" || lang =="Telegu" || lang =="Urdu" || lang =="Bengali")
                {
                    incomingLangData.push({label : lang , value : lang});
                }
            }

            for (let skill of user.skills){
                if(skill == "JavaScript" || skill == "Node Js" || skill == "CSS" || skill == "Tailwind CSS" || skill =="React" || skill =="Angular" || skill =="Java" || skill ==".NET" || skill == "Python" || skill == "Vue" || skill == "SQL" || skill == "C++" || skill == "MongoDB")
                {
                    incomingInterestData.push({label : skill , value : skill})
                }
            }
            
            setFormValues({
                ...formValues,
                fullName : {
                    value: user?.fullName || "",
                    error :"",
                },
                email : {
                    value :user?.email || "",
                },
                age : {
                    value: user?.age || "",
                    error :"",
                },
                gender : {
                    value: user?.gender || "",
                    error :"",
                },
                bio : {
                    value: user?.bio || "",
                    error :"",
                },
                photoUrl : {
                    value : "",
                    error : "",
                },
                lang : incomingLangData,
                skills : incomingInterestData,
            })
        }

        
    },[user])

    function handleChange(e)
    {
        let {name, value} = e.target;
        let newValues = {...formValues};

        if(name == "fullName" || name == "bio"){
            newValues[name] = {
                value : value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required" : ""
            }
        }

        if(name == "age"){
            newValues[name] = {
                value : parseInt(value) || "",
                error : !value ? "Required" : (value >=1 && value <=18) ? "Must be above 18" : "",
            }
        }

        if(name == "gender"){
            newValues[name] = {
                value : value,
                error : !value ? "Required" :  "",
            }
        }
        setFormValues(newValues);
    }

    function handleLanguage(lang)
    {
        if(lang.length>=5){
            toast("You can select upto Max 4",{duration:2500});            
        }else {
            setFormValues({...formValues, lang : lang})
        }       
    }

    function handleSkills(skill)
    {
        if(skill.length>=5){
            toast("You can select upto Max 4",{duration:2500});
        }else {
            setFormValues({...formValues, skills : skill})
        }
    }

    function handleFileChange(e)
    {
        let file = e.target.files[0];
        console.log(file);
        setFormValues({...formValues , photoUrl : {...formValues.photoUrl , value : file}});
    }

    async function handleClick()
    {
       let {fullName,age, gender, bio, photoUrl, lang, skills} = formValues;

        const formData = new FormData();

        if(!fullName.value || fullName.value.trim()== ""){
            setFormValues({...formValues,
                fullName : {
                ...formValues.fullName,
                    error : "Required*"
            }});
            return;
        }

        if(!age.value || (age.value && age.value <=17)){
            setFormValues({...formValues,
                age : {
                    ...formValues.age,
                    error : !age.value ? "Required*" : "Must be above 18"
                }
            });
            return;
        }

        if(!bio.value || bio.value.trim()== "")
        {
            setFormValues({...formValues,
                bio : {
                    ...formValues.bio,
                    error : "Required*"
                }});
            return;
        }

        if(!gender.value){
            setFormValues({...formValues,
                gender : {
                    ...formValues.gender,
                    error : "Required*"
                }});
            return;
        }

        if(lang.length ==0)
        {
            toast.error("Please Select the Languages you know",{duration:2000});
            return;
        }

        if(skills.length ==0)
        {
            toast.error("Please Select the Skills you know",{duration:2000});
            return;
        }

        let modifyLanguages = lang.length && lang.map(val => val.value);
        let modifySkills = skills.length && skills.map(val => val.value);

        formData.append("fullName",fullName.value || "");
        formData.append("age", age.value || "");
        formData.append("gender", gender.value || "");
        formData.append("bio", bio.value || "");
        formData.append("skills" , modifySkills || "");
        formData.append("languages",modifyLanguages || "");
        if(photoUrl.value){
            formData.append("file", photoUrl.value || "");
        }

        // formData.forEach((key,val) =>{
        //     console.log(`${key} : ${val}`)
        // })
    
        try {
            setIsDisabled(true)
            let res = await axios.patch(BASE_URL + "/profile/edit",formData,{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message, {duration: 2000});
                dispatch(addUser(res.data.data));
                setTimeout(()=>{
                    setIsDisabled(false)
                },2100)
            }
        } catch (error) {
            console.log(error);
            setIsDisabled(false)
            toast.error(error.response.data.message || error?.response?.data, {duration: 2000})
        }
    }

    return(
    <>
    {user && (
        <nav className='flex max-w-5xl justify-around'>
        <div className='w-1/3 mx-5 mt-5 p-2 sticky top-5 h-64'>
            <img className='rounded-lg' src={user?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT0M9PkaDKnCMW8NANGmmvjkS-WhhsIOe4pQ&s"}/>
        </div>
        <div className='w-2/3 mx-10 border-2 p-2  mt-5 '>
            <h1 className='font-semibold text-black text-center'>Update Profile</h1>
            <form onSubmit={(e)=> e.preventDefault()}> 
                <div className='mb-3'>
                    <input 
                        type='text' 
                        value={formValues.fullName.value} 
                        name="fullName" 
                        onChange={handleChange} 
                        className='w-full px-2 py-2 outline-none bg-gray-200 rounded-md' 
                        placeholder='Your Full Name' 
                    />
                    <span className='text-red-400 text-sm'>{formValues.fullName.error}</span>
                </div>
                <div className='mb-3'>
                    <input 
                        type='email' 
                        value={formValues.email.value} 
                        className='w-full px-2 py-2 cursor-not-allowed outline-none bg-gray-200 rounded-md' 
                        disabled 
                    />
                    <span className='text-red-400 text-sm'></span>
                </div>
                <div className='mb-3'>
                    <input 
                        type='text' 
                        name="age" 
                        maxLength={2}
                        value={formValues.age.value} 
                        onChange={handleChange} 
                        className='w-full px-2 py-2 outline-none bg-gray-200 rounded-md' 
                        placeholder='Your Age' 
                    />
                    <span className='text-red-400 text-sm'>{formValues.age.error}</span>
                </div>
                <div className='mb-3'>
                    <textarea 
                        name="bio" 
                        value={formValues.bio.value} 
                        onChange={handleChange} 
                        className='w-full px-2 py-2 outline-none bg-gray-200 rounded-md' 
                        placeholder='Your Bio' 
                    />
                    <span className='text-red-400 text-sm'>{formValues.bio.error}</span>
                </div>
                <div className='mb-3'>
                    <select name='gender' value={formValues.gender.value} onChange={handleChange} className="w-full px-2 py-2 border rounded-lg text-gray-800 outline-none">
                        <option value={""}>Select Your Gender</option>
                        <option value={"Male"}> ♂️ Male</option>
                        <option value={"Female"}>♀ Female</option>
                        <option value={"Others"}>Others</option>
                    </select>
                    <span className='text-red-400 text-sm'>{formValues.gender.error}</span>
                </div>
                <div className='mb-3'>
                    <Select 
                        isMulti 
                        placeholder="Spoken Languages"
                        options={languageList} 
                        // value={selectedLanguages} 
                        value={formValues.lang}
                        onChange={handleLanguage} 
                        closeMenuOnSelect={false} 
                        components={animatedComponents}                               
                    />
                </div>
                <div className='mb-2'>
                    <Select 
                        placeholder="Select Your Interest"
                        options={interestList}
                        isMulti 
                        // value={selectedInterest} 
                        value={formValues.skills}
                        onChange={handleSkills} 
                        closeMenuOnSelect={false} 
                        components={animatedComponents}                                 
                    />
                </div>
                <div className='mb-2'>
                    <label>Please Upload Profile Picture</label>
                    <input 
                        accept="image/png,image/jpeg"
                        type="file" 
                        name='profilePicture'
                        className="w-full px-2 py-2"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    disabled={isDisabled}
                    className={`${isDisabled ? "cursor-not-allowed" : ""} bg-pink-500 hover:bg-pink-600 w-full text-white px-6 py-2 rounded-md`} 
                    onClick={handleClick}
                >
                    {isDisabled ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
        </nav>
    )}
    </>
    )
}

export default EditProfile

// sticky top-0 h-52

// bg-pink-500 hover:bg-pink-600 w-full text-white px-6 py-2 rounded-md

 // if(user && Object.keys(user).length >0) {
    //     for(let lang of user.languages){
    //         if(lang == "Hindi" || lang == "English" || lang == "Spanish" || lang == "French" || lang =="German" || lang =="Telegu" || lang =="Urdu" || lang =="Bengali")
    //         {
    //             initialLanguages.push({label : lang , value : lang});
    //         }
    //     }
    // }