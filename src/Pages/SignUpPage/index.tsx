import './index.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const SignUpPage = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
    const [termCheck, setTermCheck] = useState(false)

    const changeRadio = () => {
        setTermCheck(!termCheck)
    }

    const formValidation = (e) => {

        e.preventDefault();

        const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const nameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
        const lNameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/


        if (emailRegExp.test(email) && email.length) {
            console.log('valid email')
        } else {
            console.log('invalid email')
            return
        }

        if (passwordRegExp.test(password) && password?.length) {
            console.log('valid password')
        } else {
            console.log('invalid password')
            return
        }

        if (confirmPassword == password) {
            console.log('password equal')
        } else {
            console.log('password not matched')
            return
        }

        if (nameRegExp.test(firstName) && firstName?.length) {
            console.log('valid name')
        } else {
            console.log('invalid name')
            return
        }

        if (lNameRegExp.test(lastName) && lastName?.length) {
            console.log('valid name')
        } else {
            console.log('invalid name')
            return
        }

        const userInfoGet = JSON.parse(localStorage.getItem("userInfo")) ?? []
        const checkData = userInfoGet.filter((item) => item.email == email)
        if (checkData.length) {
            alert('email already exist')
            return
        }

        console.log(userInfoGet)
        localStorage.setItem("userInfo", JSON.stringify([...userInfoGet, {
            firstName: firstName || '',
            email: email || '',
            password: password || '',
            confirmPassword: confirmPassword || '',
            lastName: lastName || '',
        }
        ]))
    };

    const disabled = !firstName || !email || !lastName || !confirmPassword || !password || !termCheck


    return (
        <div className='sup-main'>
            <div className='sp-box'>
                <div className='sp-heading-div'>
                    <p className='sp-heading'>Register</p>
                    <p className='sp-heading-txt'>Lets get started with your new account</p>
                </div>
                <form className='sp-box-container' onSubmit={(e) => { formValidation(e) }}>
                    <label className='sp-label'>
                        <p className='sp-txt'>First Name</p>
                        <input className='sp-text-input' placeholder='First Name'
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Last Name</p>
                        <input className='sp-text-input' placeholder='Last Name'
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Email</p>
                        <input className='sp-text-input' placeholder='Email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Password</p>
                        <input className='sp-text-input' placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Confirm Password</p>
                        <input className='sp-text-input' placeholder='Confirm Password'
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                    </label>
                    <label className='term-div'>
                        <div className='term-radio' >
                            <div className={`term-radio-check  ${termCheck == true ? 'term-radio-checked' : ''} `} onClick={() => { changeRadio() }}></div>
                        </div>
                        <p className='term'>Accept Terms & Conditions</p>
                    </label>
                    <button className={`${disabled ? 'sp-button-disabled' : 'sp-button'}`} disabled={disabled} >
                        <p className='sp-button-text'>
                            Sign Up
                        </p>
                    </button>
                </form>
                <p className='last-txt'>
                    Already have an account?
                    <Link to={'/'}>
                        <span className='span-last-txt'> Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage