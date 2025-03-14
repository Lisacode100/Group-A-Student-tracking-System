import React, { useState, useRef } from 'react';
import './Otp.css';
import shield from '../assets/shield.png';
import refresh from '../assets/refresh.png';
import help from '../assets/help.png';
import Congratulations from './congratulations';
import { Link } from 'react-router-dom';

const Otp = ({ email, onResendOtp }) => {
    const [otp, setOtp] = useState(['','','','']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleVerifyClick = () => {
        const enteredOtp = otp.join('');
        const fixedOtp = '1234';
        if (enteredOtp === fixedOtp) {
            setSuccess(true);
            setError('');
            console.log('OTP verified successfully');
            setShowCongratulations(true);
        } else {
            setError('Invalid OTP. Please try again.');
            setSuccess(false);
        }
    };

    const handleResendClick = () => {
        setOtp(['','','','']);
        setError('');
        setSuccess(false);
        onResendOtp();
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    if (showCongratulations) {
        return <Congratulations />;
    }

    return (
        <div className='otp-container'>
            <div className='aits-logo'>AITS</div>
            <div className='help'>
                <img src={help} alt='help logo' className='help-logo' />Help?
                <div className='tooltip'>
                    Email Address: alvin69david@gmail.com
                    Phone Number: 0758862363
                </div>
            </div>
            <div className='otp-content'>
                <img  className='shield'src={shield} alt='shiled logo' />
                <h2 className='authenticate-title'>Authenticate Your Account</h2>
                <p className='authenticate-sub-title'>Protecting your account is our top priority. Please confirm your account by entering the authorization code we sent to <strong>{email}</strong>.</p>
                <div className='otp-inputs'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            className='otp-input'
                            type='text'
                            maxLength='1'
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)} 
                        />
                    ))}
                </div>
            <Link to="/congs" onClick={handleVerifyClick}>
            
            <button className='verify-button' 
               disabled={!isOtpComplete}>
                   Verify
               </button></Link>
                <button 
                className='resend-button'
                onClick={handleResendClick}>
                    <img className='refresh-icon'src={refresh} alt='refresh icon' /> 
                    Resend Code
                </button>
                </div>   
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>OTP verified successfully!</p>}
        </div>
    );
};

export default Otp;