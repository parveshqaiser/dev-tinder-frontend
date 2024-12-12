

import React, { useState } from 'react'

const useFormValues = () => {
    
    const [formValues , setFormValues] = useState({
        fullName : {
            value:"",
            error :"",
        },
        age : {
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
        },
        skills : {
            value : "",
            error : ""
        },
        photoUrl : {
            value : '',
            error : "",
        }
    });

    return [formValues , setFormValues]
}

export default useFormValues;
