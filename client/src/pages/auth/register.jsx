import CommonForm from '@/components/common/form';
import React, { useState } from 'react';
import { registerFormControls } from '@/config';
import { Link } from 'react-router-dom'; 
const intialState ={
    userName : '',
    email : '',
    password : ''
}

// Ensure this import is added

function AuthRegister() {


    const [formData,setFormData]=useState(intialState)

    function onSubmit(){

    }


    return (  
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-1">Already have an account
                    <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
                </p>
            </div>
            <CommonForm
            formControls={registerFormControls}
            buttonText={'Sign Up'}
            formData={formData}
            setFormData={setFormData}      
            onSubmit={onSubmit} 
            />
     </div>
    );
}

export default AuthRegister;
