import React, { useState, createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import {
    getAllCompanyDetails,
    userlogin,
    getsingleUserDetails,
} from '../services/api'
import { getDataFromApi, postDataFromApi } from '../services/CommonService'
import AlertMessage from '../views/commoncomponent/AlertMessage'
/*var md5 = require("md5");*/
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,

}

const isValidToken = accessToken => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = async accessToken => {
    if (accessToken) {
        // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        // localStorage.setItem('accessToken', accessToken)

        var query = ''
        const response = await getDataFromApi(getAllCompanyDetails, accessToken)
        if (response && response.status == 200 && response.data != null) {
            var companysetails = []
            response.data.map((company, i) => {
                var cp = { id: company.id, name: company.name,financialYear:company.yearType,startMonth:company.startMonth,endMonth:company.endMonth }
                companysetails.push(cp)
            })
            localStorage.setItem('companyDet', JSON.stringify(companysetails))
        }else{
            localStorage.clear()
        }
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
        localStorage.removeItem('companyDet')
        localStorage.removeItem('id')
        localStorage.removeItem('Authtoken')
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    var pass = ''
    function confirm() {
        setalert(false)
    }

    const login = async (email, password) => {
        /* const response = await axios.post('/api/auth/login', {
            email,
            password,
        })
        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        }) */

        var query = {
            username: email,
            password: password,
        }
        console.log(query)
        var response = await postDataFromApi(userlogin, query)

        const data = []
        const accessToken = ''
        console.log('response', response)

        // response = {
        //     status: 200,
        //     data: {
        //         jwt:
        //             'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWlmeWFuLnBhdGVsLnByLjdAZ21haWwuY29tIiwiZXhwIjoxNjU5MDI3OTQzLCJpYXQiOjE2NTg5OTE5NDN9.YbgzZm13xcffbfJWawA0g-eqM1jMkFWoiSqnWKHQwSE',
        //         permissions: [
        //             {
        //                 authority: 'UserManagement.Write',
        //             },
        //             {
        //                 authority: 'Dashboard.Read',
        //             },
        //             {
        //                 authority: 'CompanyDashboards.Read',
        //             },
        //             {
        //                 authority: 'InvestmenPipeline.Read',
        //             },
        //             {
        //                 authority: 'InvestmenPipeline.Write',
        //             },
        //             {
        //                 authority: 'Documents.Read',
        //             },
        //             {
        //                 authority: 'Documents.Write',
        //             },
        //         ],
        //         userDto: {
        //             id: '8186b3cd-aabe-4d8e-8f73-2d7d46ac8bf0',
        //             username: 'Aravinda',
        //             password:
        //                 '86f770af52f022d544a178d087e94b9342c9caaa5ad6a9484c858f8cb177bdbd:5bc6f85109946ec8555e022031952e0d59f5fb344d9bee08bd8ce2adca0006ef',
        //             email: 'suifyan.patel.pr.7@gmail.com',
        //             mobilePhone: '6666666666',
        //             companyName: 'Google',
        //             status: 'Active',
        //             roles: 'SuperAdmin',
        //             department: 'Development',
        //             designation: 'Developer',
        //             permissionId: '712d9f88-c434-4688-9d05-1fe26d2366ea',
        //         },
        //     },
        // }
        if (response && response.status == 200 && response.data) {
            console.log('loginresponse', response.data.jwt)
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.jwt}`
            localStorage.setItem('accessToken', response.data.jwt)
            localStorage.setItem('userRole', response?.data?.userDto?.roles)
            localStorage.setItem('userId', response?.data?.userDto?.id)



            const data = response.data
            //data['existingpassword']=password;
            const user = response.data.userDto


            const accessToken = response.data.jwt
            localStorage.setItem('id', response.data.userDto.id)
            //localStorage.setItem('Authtoken',md5(password))
            // setSession(accessToken)
            await setSession(accessToken)

            dispatch({
                type: 'LOGIN',
                payload: {
                    data,
                    isAuthenticated: true,
                    user,

                },
            })
        } else {
            setalertMessage("Invalid login details")
            setalert(true)
            setalertType('warning')
        }
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    // const response = await axios.get('/api/auth/profile')
                    var id = window.localStorage.getItem('id')
                    // var token = window.localStorage.getItem('accessToken')
                    var response = await getDataFromApi(
                        getsingleUserDetails + id,
                        1
                    )
                    /* response = {
                        status: 200,
                        data: {
                            id: '2dc69b94-120f-4429-99be-b46600128fed',
                            username: 'Shhdd',
                            password: null,
                            email: 'chowdhuryshafiqur@gmail.com',
                            mobilePhone: '6462510383',
                            companyName: 'deb',
                            status: '2',
                            roles: '5',
                            department: 'Econ',
                            designation: null,
                            permissionId: null,
                        },
                    } */
                    if (response && response.status == 200) {
                        var user = response.data

                        console.log('user', user)
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                user,
                            },
                        })
                    } else{
                        localStorage.clear()
                    }
                    /* const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    }) */
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (<>
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
        <AlertMessage
            alert={alert}
            alertMessage={alertMessage}
            confirm={confirm}
            alertType={alertType}
        />
    </>
    )
}

export default AuthContext
