import React, { useState, useEffect } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Card, Grid, Button } from '@mui/material'
import {resetPassword} from '../../services/api';
import {putDataFromApi} from '../../services/CommonService';
import AlertMessage from '../commoncomponent/AlertMessage'


const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))
const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export default function OTP() {
    const navigate = useNavigate()
    const [formdata,setFormData]=useState({token:"",newpassword:"",confirmnewpassword:""})
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [showError,setshowError] = useState(false)
    
    function confirm() {
        setalert(false)
        navigate('/');
    }

    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }
    const handleFormSubmit = async (event) => {
        setshowError(false)
        console.log(formdata)
        var response = ''
        var query = {
            "password": formdata.newpassword
        }
        response = await putDataFromApi(
            resetPassword+'?token='+formdata.token,query
        )
        if(response && response.status==200){
             setalertMessage("Password Change Successfully..")
             setalert(true)
             setalertType('success')
        }else{
            setshowError(true)
        }
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== formdata.newpassword) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
        
    }, [formdata.newpassword])

  return (
    <ContentBox className='login-conent tokenscreen'>
        <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
    <Box sx={{ fontWeight: 600, fontSize: 24, color: '#fff', lineHeight: '36px' }}>Enter  TOKEN</Box>
        <Box sx={{ fontWeight: '400', fontSize: 13, color: '#fff', paddingTop: '2px', lineHeight: '19px' }}>Enter token has been send to on<br/>your Email</Box>
        <ValidatorForm onSubmit={handleFormSubmit}  onError={() => null} style={{ display: 'flex',flexDirection: 'row',flexWrap: 'wrap' ,justifyContent: 'space-between'  }}>
            {/* <TextValidator
                sx={{ mt: 3, mb: 3, width: 45,  }}
                variant="outlined"
                label=""
                type="text"
                name="otp"
                size="small"
                maxlength={1}

            />
             <TextValidator
                sx={{ mt: 3, mb: 3, width: 45,  }}
                variant="outlined"
                label=""
                type="text"
                name="otp"
                size="small"
                maxlength={1}

            />
             <TextValidator
                sx={{ mt: 3, mb: 3, width: 45,  }}
                variant="outlined"
                label=""
                type="text"
                name="otp"
                size="small"
                maxlength={1}

            />
             <TextValidator
                sx={{ mt: 3, mb: 3, width: 45,  }}
                variant="outlined"
                label=""
                type="text"
                name="otp"
                size="small"
                maxlength={1}

            /> */}
                <label>Token</label>
                <TextField
                    type="text"
                    name="token"
                    id="token"
                    value={formdata.token || ''}
                    onChange={(e)=>formdatavaluechange(e)}
                    label="token"
                    placeholder="token"
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <label>New Password</label>
                <TextField
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    value={formdata.newpassword || ''}
                    onChange={(e)=>formdatavaluechange(e)}
                    label="new password"
                    placeholder="new password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <label>Confirm New Password</label>
                <TextField
                    type="password"
                    name="confirmnewpassword"
                    id="confirmnewpassword"
                    value={formdata.confirmnewpassword || ''}
                    onChange={(e)=>formdatavaluechange(e)}
                    label="confirm new password"
                    placeholder="confirm new password"
                    validators={['required','isPasswordMatch']}
                    errorMessages={['this field is required',"password didn't match"]}
                />
                {/* <label>New Password</label>
                <TextField
                        className="inputwithIcon"
                        sx={{ mb: '12px', width: '100%',  }}
                        label="Enter New Password"
                        variant="outlined"
                        size="small"
                        onChange={(e)=>formdatavaluechange(e)}
                        name="newpassword"
                        type="password"
                        value={formdata.newpassword || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        placeholder="Enter New Password"
                        
                />
                <label>Confirm New Password</label>
                <TextField
                        className="inputwithIcon"
                        sx={{ mb: '12px', width: '100%',  }}
                        label="Enter Confirm New Password"
                        variant="outlined"
                        size="small"
                        onChange={(e)=>formdatavaluechange(e)}
                        name="confirmnewpassword"
                        type="password"
                        value={formdata.confirmnewpassword || ''}
                        validators={['required','isPasswordMatch']}
                        errorMessages={['this field is required',"password didn't match"]}
                        placeholder="Enter Confirm New Password"
                        
                /> */}
               
           <FlexBox mb={2} flexWrap="wrap" sx={{width:'100%'}}>
           <Box position="relative" className="login-button">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Verify
                </Button>
                {/* <Span sx={{ mr: 1, ml: '16px' }}>or</Span> */}
                {/* <Button
                    sx={{ textTransform: 'capitalize' }}
                    onClick={() => navigate("/session/signin")}
                >
                    Sign in
                </Button> */}
                </Box>
            </FlexBox>
            {showError ? <div className="customerrormsg">Invalid Details</div>:""}
        </ValidatorForm>

    </ContentBox>
  )
}
