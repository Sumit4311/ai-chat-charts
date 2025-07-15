import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'
import Bg from '../../../image/loginBg.jpg'
import loginImage from '../../../image/loginIMage.png'
import logo from '../../../image/logo.png'
import { wrap } from 'lodash'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { ReactComponent as Icon_AccountCircle } from '../../../image/user.svg'
import { ReactComponent as Icon_padlock1 } from '../../../image/padlock1.svg'
import $ from 'jquery'

import InputAdornment from '@mui/material/InputAdornment'
import { getDataFromApi } from 'app/services/CommonService'
import { getonboardcmp } from 'app/services/api'
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

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: '100%',
        borderRadius: 12,
        margin: '1rem',
        background: 'transparent !important',
        width: '100%',
        boxShadow: 'none!important',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const BgCol = {
    backgroundImage: `url(${Bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    flexWrap: 'wrap',
    backgroundPosition: 'center',
}
const JwtLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        agreement: true,
    })
    const [message, setMessage] = useState('')

    const { login } = useAuth()
    const [disableButton, setdisableButton] = useState(true)

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)

        if (
            temp.email &&
            temp.email != '' &&
            temp.password &&
            temp.password != ''
        ) {
            setdisableButton(false)
        } else {
            setdisableButton(true)
        }
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main


    const getMenuList = async (searchvalue = "") => {
        var companies = [];
        const response = await getDataFromApi(getonboardcmp+`?userId=${localStorage.getItem("userId")}`, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            console.log('sidenav', response.data)
           const value= response?.data?.[0]?.id
           if(response.data.length>0){
            navigate(`/companylists/companydashboard/${value}`)
           }else{
            navigate('/documents')
           }

        }
    }
    

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
           const response= await login(userInfo.email, userInfo.password)
           console.log("response?.data?.userDto?.roles",response,response?.data?.userDto?.roles,localStorage.getItem("accessToken"))
           localStorage.setItem("userEmail", userInfo.email)
           if(localStorage.getItem("accessToken")){
            if(localStorage.getItem("userRole")==='Company Admin'||localStorage.getItem("userRole")==='Company User'){
                getMenuList()
            }else{
                navigate('/')
            }
           }
           if(response?.status == 200){
            setLoading(true)
           }else{
            setLoading(false)
           }
        } catch (e) {
            setMessage(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        /*  window.addEventListener('DOMContentLoaded', (event) => {
            console.log(userInfo.email)
            if (userInfo.email && userInfo.email!='' && userInfo.password && userInfo.password!='') {
                setdisableButton(false)
            }else{
                setdisableButton(true)
            }
        }); */
        checkButton()
    }, [])

    function checkButton() {
        setTimeout(function () {
            if (
                userInfo.email &&
                userInfo.email != '' &&
                userInfo.password &&
                userInfo.password != ''
            ) {
                setdisableButton(false)
                console.log(disableButton)
            } else {
                setdisableButton(true)
                $('.login-button .MuiButton-root ').trigger('click')
                console.log(disableButton)
            }
        }, 1000)
    }
    return (
        <JWTRoot style={BgCol}>
            <Box p={2} pb={0} sx={{ width: '100%' }}>
                <IMG src={logo} alt="" />
            </Box>
            <Card className="card">
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <JustifyBox
                            p={4}
                            height="100%"
                            sx={{
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            <IMG src={loginImage} alt="" />
                            <Box
                                className="loginTitle"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 40,
                                    color: '#fff',
                                    lineHeight: '60px',
                                }}
                            >
                                A few more clicks to <br /> sign in to your
                                account.
                            </Box>
                            <Box
                                className="loginsubTitle"
                                sx={{
                                    fontWeight: 'regular',
                                    fontSize: 18,
                                    color: '#fff',
                                    paddingTop: '13px',
                                    lineHeight: '40px',
                                }}
                            >
                                Manage all your investment accounts in one place
                            </Box>
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <ContentBox className="login-conent">
                            <Box
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 24,
                                    color: '#fff',
                                    lineHeight: '36px',
                                }}
                            >
                                Let's Get Started
                            </Box>
                            <Box
                                sx={{
                                    fontWeight: '400',
                                    fontSize: 13,
                                    color: '#fff',
                                    paddingTop: '2px',
                                    lineHeight: '19px',
                                }}
                            >
                                Sign in to continue to solcon
                            </Box>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mt: 3, mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    defaultValue=""
                                    InputProps={{
                                        autocomplete: 'new-password',
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon_AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Enter your username"
                                    className="inputwithIcon"
                                />
                                <TextValidator
                                    defaultValue=""
                                    className="inputwithIcon"
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    placeholder="Enter your password"
                                    InputProps={{
                                        autocomplete: 'new-password',
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon_padlock1 />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <FlexBox
                                    mb={2}
                                    flexWrap="wrap"
                                    sx={{
                                        justifyContent: 'space-between',
                                        maxWidth: 400,
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{
                                            mb: '12px',
                                            maxWidth: 288,
                                            color: 'rgba(255,255,255,.5)',
                                        }}
                                        name="agreement"
                                        onChange={handleChange}
                                        control={
                                            <Checkbox
                                                size="small"
                                                onChange={({
                                                    target: { checked },
                                                }) =>
                                                    handleChange({
                                                        target: {
                                                            name: 'agreement',
                                                            value: checked,
                                                        },
                                                    })
                                                }
                                                checked={
                                                    userInfo.agreement || ''
                                                }
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Button
                                        sx={{
                                            color: 'rgba(255,255,255,.5)',
                                            mb: '12px',
                                            pt: 0,
                                        }}
                                        onClick={() =>
                                            navigate('/session/forgot-password')
                                        }
                                    >
                                        Forgot password?
                                    </Button>
                                </FlexBox>
                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box
                                        position="relative"
                                        className="login-button"
                                    >
                                        <Button
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                             disabled={disableButton}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading &&  (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    {/* <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() =>
                                            navigate('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button> */}
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
