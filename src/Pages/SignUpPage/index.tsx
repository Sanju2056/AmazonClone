import './index.css'
import { useState, useEffect } from 'react'


const SignUpPage = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [fullName, setFullName] = useState<string | undefined>();
    const [UserName, setUserName] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>()
    const [users, setUsers] = useState<any>([])
    const formValidation = () => {
        // console.log(user)
        setUsers((prev: any) => {
            return [
                ...prev,
                {
                    fullName: fullName || '',
                    email: email || '',
                    password: password || '',
                    confirmPassword: confirmPassword || '',
                    phoneNumber: phoneNumber || '',
                    userName: UserName || '',
                }
            ]
        });
    };
    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <div className='sp-main'>
            <div className='sp-box'>
                <h3 className='sp-heading'>Registration</h3>
                <div className='sp-box-container'>
                    <div className='sp-input-box1'>
                        <div className='sp-input-box'>
                            <p className='sp-t-title'>Full Name</p>
                            <input className='sp-text-input' placeholder='Full Name' onChange={(e) => { setFullName(e.target.value) }} />
                        </div>
                        <div className='sp-input-box'>
                            <p className='sp-t-title'>Email</p>
                            <input className='sp-text-input' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='sp-input-box'>
                            <p className='sp-t-title'>Password</p>
                            <input className='sp-text-input' placeholder='PassWord' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className='sp-input-box1'>
                        <div className='sp-input-box'>
                            <p className='sp-t-title'>Username</p>
                            <input className='sp-text-input' placeholder='Username' onChange={(e) => { setUserName(e.target.value) }} />
                        </div><div className='sp-input-box'>
                            <p className='sp-t-title'>Phone Number</p>
                            <input className='sp-text-input' placeholder='Phone Number' onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </div><div className='sp-input-box'>
                            <p className='sp-t-title'>Confirm Password</p>
                            <input className='sp-text-input' placeholder='Confirm Password' onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <h4 className='sp-gender-title'>Gender</h4>
                <div className='sp-gender-div'>
                    <div className='sp-genders'>
                        <input className='sp-gender-input' type='radio' />
                        <p className='sp-genders-text'>Male</p>
                    </div >
                    <div className='sp-genders'>
                        <input className='sp-gender-input' type='radio' />
                        <p className='sp-genders-text'>Female</p>
                    </div>
                    <div className='sp-genders'>
                        <input className='sp-gender-input' type='radio' />
                        <p className='sp-genders-text'>Others</p>
                    </div>
                </div>
                <div className='sp-button-div'>
                    <button className='sp-button' onClick={() => { formValidation() }}>
                        <p className='sp-button-text'>
                            Register
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage