import React, { useRef, useState } from 'react'
import OtpForm from "../OtpForm"
import Modal from '../Shared/Modal';
import { BiAt } from "react-icons/bi"

const ForgotPasswordComponent = (props) => {
    const { onClose } = props

    const [showOtpForm, setShowOtpForm] = useState(false)
    const [error, setError] = useState('')
    const inputsOtpRef = useRef([])

    const confirmOTP = async () => {
        const otp = [
            inputsOtpRef.current[0].value,
            ...inputsOtpRef.current.slice(1).map(input => input.value)
        ].join('')
        setIsLoading(true);
        const response = await confirmOtpHandle(email, otp)
        setIsLoading(false);
        if (response) {
            setIsOpenModalConfirm(true)
        } else {
            setError('OTP không đúng vui lòng nhập lại')
        }
    }

    // const resendOtp = async () => {

    // }

    return (
        <Modal
            title={!showOtpForm ? 'Forgot your password?' : 'Enter your OTP'}
            body={
                !showOtpForm
                    ?
                    <>
                        <h4 className='pb-2'>Enter your email here to restore</h4>
                        <div className="input-box">
                            <BiAt />
                            <input type="text" className='input'
                                placeholder=" "
                            />
                            <label htmlFor="">Email address</label>
                        </div>
                    </>
                    :
                    <OtpForm
                        verifyAction={confirmOTP}
                        resendOtpAction={true}
                        inputsRef={inputsOtpRef}
                        error={error}
                        setError={() => setError('')}
                    />

            }
            onClose={onClose}
            onAction={() => setShowOtpForm(true)}
            hiddenFooter={showOtpForm ? true : false}
        />

    );
}


export default ForgotPasswordComponent