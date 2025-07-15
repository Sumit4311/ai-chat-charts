import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Grid, Button } from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Bg from "../../image/loginBg.jpg"
import loginImage from "../../image/loginIMage.png"
import logo from "../../image/logo.png"
import OTP from "./OTP"
import {ReactComponent  as Iconmail } from "../../image/mail-inbox-app.svg"

import InputAdornment from '@mui/material/InputAdornment';
import {ReactComponent  as Icon_AccountCircle } from "../../image/user.svg"
import {forgotpassword} from '../../services/api';
import {postDataFromApi,getDataFromApi,putDataFromApi} from '../../services/CommonService';


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

const IMG = styled('img')(() => ({
    width: 'auto',
}))

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: '100%',
        borderRadius: 12,
        margin: '1rem',
        background: 'transparent !important',
        width: '100%',
        boxShadow: 'none!important',
    },
}))
const BgCol = {
    backgroundImage: `url(${Bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    flexWrap: 'wrap',
    backgroundPosition: 'center',
}

const ForgotPassword = () => {
    const [isOTP, setIsOTP] = useState(false)
    const navigate = useNavigate()
    const [state, setState] = useState({})

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        
        console.log(email)
        var response = ''
        response = await getDataFromApi(
            forgotpassword+'?email='+email
        )
        if(response && response.status==200){
            setIsOTP(true)
        }
        console.log(response)
    }

    let { email } = state

    return (
        <ForgotPasswordRoot style={BgCol}>
            <Box p ={4} pb={0} sx={{width:'100%'}}>
                <IMG src={logo} alt=""/>
            </Box>
            <Card className="card">
            <Grid container sx={{alignItems:'center'}}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                            <IMG
                                src={loginImage}
                                alt=""
                            />
                              <Box className="loginTitle" sx={{ fontWeight: 700, fontSize: 40, color: '#fff', lineHeight: '60px' }}>A few more clicks to <br/>Set to your password.</Box>
                            <Box className="loginsubTitle" sx={{ fontWeight: 'regular', fontSize: 18, color: '#fff', paddingTop: '13px', lineHeight: '40px' }}>Manage all your investment accounts in one place</Box>
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      {isOTP ? <OTP/>: <ContentBox className='login-conent'>
                        <Box sx={{ fontWeight: 600, fontSize: 24, color: '#fff', lineHeight: '36px' }}>Forgot your Password?</Box>
                            <Box sx={{ fontWeight: '400', fontSize: 13, color: '#fff', paddingTop: '2px', lineHeight: '19px' }}>Please enter your email address to get <br/> a New password</Box>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="inputwithIcon"
                                    sx={{ mt: 3, mb: 3, width: '100%',  }}
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    placeholder="Enter your Email Id"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Iconmail />
                                        </InputAdornment>
                                      ),
                                    }}
                                />
                               <FlexBox mb={2} flexWrap="wrap">
                               <Box position="relative" className="login-button">
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Submit
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
                                <a href='' onClick={() =>
                                            navigate('/session/signin')} style={{textDecoration:'underline',color:'blue',position:'relative',left:'85%'}}>Sign In</a>
                            </ValidatorForm>

                        </ContentBox>}

                    </Grid>
                </Grid>
            </Card>
        </ForgotPasswordRoot>
    )
}

export default ForgotPassword
