import './index.css'

const LoginPage = () => {
  return (
    <div className='lp-main'>
      <div className='lp-box'>
        <h3 className='lg-title'>Log in with us</h3>
        <div className='lg-form-div-container'>
          <div className='lg-form-div'>
            <p className='lg-form-text'>UserName</p>
            <input className='lg-form-input' placeholder='UserName' />
          </div>
          <div className='lg-form-div'>
            <p className='lg-form-text'>Password</p>
            <input className='lg-form-input' placeholder='Password' />
          </div>
          <p className='lg-fPass-text'>Forgot your password? <span className='lg-span-text'>Click here!</span></p>
        </div>
        <button className='lg-button'>
          <p className='lg-button-text'>Log in</p>
        </button>
        <button className='lg-button'>
          <p className='lg-button-text'>Log in with Google</p>
        </button>
        <p className='lg-new'>New here,Wanna Sign Up! <span className='lg-span-new-id'>Click here.</span></p>
      
      </div>

    </div>
  )
}

export default LoginPage