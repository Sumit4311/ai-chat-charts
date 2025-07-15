import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from '../../../components/Typography'
import { MatxMenu, MatxSearchBox } from 'app/components'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { Autocomplete } from '@mui/lab'
import SettingsIcon from '@mui/icons-material/Settings'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import '../../../../Assets/style.css'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import { postDataFromApi, getDataFromApi } from '../../../services/CommonService'
import { createconversion, getConversionAPI, getConversionValueAPI, updateNewPassword } from '../../../services/api'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
    Button,
} from '@mui/material'
import { topBarHeight } from 'app/utils/constant'
import adminUser from '../../../image/adminUser.svg'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Card } from '@mui/material'
import { Grid } from '@mui/material'
import { rolesopt } from '../../../services/CommonObject'
import { putDataFromApi } from '../../../services/CommonService'
import { updateUser } from '../../../services/api'
import AlertMessage from 'app/views/commoncomponent/AlertMessage'
/*var md5 = require("md5");*/
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}))
const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}))
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))
const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))
const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))
const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'none !important',
    },
}))
const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    '& .closeButton': {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))
const DialogTitle = (props) => {
    const { children, onClose } = props
    return (
        <DialogTitleRoot disableTypography>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className="closeButton"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitleRoot>
    )
}
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#0E0E23',
}))
const Layout1Topbar = ({ setCurrency, currency }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const { logout, user, data } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [formdata, setFormData] = useState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: '',
        conversionvalue: 0,
        convertfrom: 'RAND',
        convertto: 'USD',
    })
    const [open, setOpen] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [currVal, setcurrVal] = useState({})
    const [isCurrencyChanged, setIsCurrencyChanged] = useState(false)

    const currencyArray = [
        { label: 'RAND', id: 1994 },
        { label: 'USD', id: 1972 },
    ]
    const currencyvalue = [
        { id: 'R', label: 'RAND' },
        { id: '$', label: 'USD' },
    ]
    const handleCurrencyValueChanged = async (val) => {
        var response = ""
        var convaterto = val?.id == "R" ? 'RAND' : 'USD'
        var convaterFrom = "RAND"
        response = await getDataFromApi(getConversionAPI + "?convaterFrom=" + convaterFrom + "&convaterTo=" + convaterto, 1)
        setCurrency(val?.id)
        localStorage.setItem('currencyValue', val?.id)
    }
    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }
    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode
        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }
        updateSidebarMode({ mode })
    }
    function handleClose() {
        setOpen(false)
        setdefaultvalue()
    }
    function handleClickOpen() {
        setOpen(true)
    }
    function handleSettingOpen() {
        setOpenSetting(true)
    }
    function handleSettingClose() {
        setOpenSetting(false)
    }
    const handleSubmit = async (event) => {
        /*var existingpassword =  localStorage.getItem('Authtoken') 
        if(existingpassword && formdata.oldpassword){
           if(existingpassword != md5(formdata.oldpassword)){
             return false
           }
        } */
        if (formdata.newpassword) {
            var response = ''
            var data = {
                id: user.id,
                /*username: user.username,*/
                password: formdata.newpassword,
                /*email: user.email,
                mobilePhone: user.mobilePhone,
                companyName: user.companyName,
                status: user.status,
                roles: user.roles,
                department: user.department,
                designation: user.designation,
                permissionId: user.permissionId,
                fileId: user.fileId,
                presignedurl: user.presignedurl,
                uploadDoc: user.uploadDoc*/
            }
            // var response = await putDataFromApi(updateUser, data, 1)
            var response = await putDataFromApi(updateNewPassword, data, 1)
            if (response && response.status == 200 && response.data != null) {
                //localStorage.setItem('Authtoken',md5(formdata.newpassword))
                setalertMessage('Password updated successfully')
                setalert(true)
                setalertType('success')
            } else {
                setalertMessage('error...!')
                setalert(true)
                setalertType('error')
            }
        }
    }
    function confirm() {
        setalert(false)
        if (isCurrencyChanged) {
            navigate('/dashboard/default')
        }
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    function setdefaultvalue() {
        setFormData({
            oldpassword: '',
            newpassword: '',
            confirmnewpassword: '',
        })
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

    // const getVal = () => {
    //     // return currency === "$" ? { label: 'USD', id: "$" } : { label: 'RAND', id: "R" }
    //     setcurrVal(currency === "$" ? { label: 'USD', id: "$" } : { label: 'RAND', id: "R" })
    // }

    useEffect(() => {
        setcurrVal(
            currency === 'R'
                ? { label: 'RAND', id: 'R' }
                : { label: 'USD', id: '$' }
        )
        changeCurrecyValue();
    }, [currency])

    const changeCurrecyValue = async () => {
        var response = ""
        var convaterto = currency == "R" ? 'RAND' : 'USD'
        var convaterFrom = "RAND"
        response = await getDataFromApi(getConversionAPI + "?convaterFrom=" + convaterFrom + "&convaterTo=" + convaterto, 1)
    }
    const defaultValueUSD = currencyArray.find(
        (option) => option.label === 'USD'
    )
    const defaultValueRAND = currencyArray.find(
        (option) => option.label === 'RAND'
    )
    const handleSaveConversion = async (e) => {
        var response = ""
        var newformdata = new FormData()
        newformdata.append('conversionValue', formdata.conversionvalue)
        newformdata.append('convaterto', formdata.convertto)
        newformdata.append('convaterFrom', formdata.convertfrom)
        // var newformdata = {
        //     // id: user.id,
        //     conversionValue: formdata.conversionvalue,
        //     convaterto: formdata.convertto,
        //     convaterFrom: formdata.convertfrom,
        // }
        var resp = await getconversionValue()
        if (resp) {
            newformdata.append('id', resp)
        }
        response = await postDataFromApi(createconversion, newformdata, 1)
        if (response && response.status == 200) {
            localStorage.setItem('conversionValue', formdata.conversionvalue);
            setalertMessage('Successfully')
            setalert(true)
            setalertType('success')
            setIsCurrencyChanged(true)
            setOpenSetting(false)
            // setpreviewImg('')
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
            // setpreviewImg('')
            setOpenSetting(false)
        }
    }
    useEffect(() => {
        const conversionValueFromLocalStorage = localStorage.getItem('conversionValue')
        if (conversionValueFromLocalStorage) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                conversionvalue: conversionValueFromLocalStorage,
            }));
        }
    }, [localStorage.getItem('conversionValue')])
    useEffect(() => {
        getconversionValue()
    }, [])
    const getconversionValue = async () => {
        const response = await getDataFromApi(
            getConversionValueAPI +
            '?convaterTo=' +
            formdata.convertto +
            '&convaterFrom=' +
            formdata.convertfrom,
            1
        );
        var responseId = "";
        if (response && response.status == 200) {
            const { data } = response
            localStorage.setItem('conversionValue', data.conversionValue)
            responseId = data.id;
        }
        return responseId;
    };

    return (
        <>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <TopbarRoot className="header">
                <TopbarContainer>
                    <Box display="flex">
                        <StyledIconButton onClick={handleSidebarToggle}>
                            <Icon>menu</Icon>
                        </StyledIconButton>
                        <MatxSearchBox />

                        <label className="currencyheaderstyle">Currency </label>
                        <div style={{ width: '100%' }}>
                            { }
                            <ValidatorForm className="customform">
                                <Grid item lg={4} md={4} sm={6} xs={6}>
                                    <AutoComplete
                                        className="dropdown1"
                                        // fullWidth
                                        options={currencyvalue}
                                        // value={currVal}
                                        defaultValue={currencyvalue ? currencyvalue[0] : null}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(e, val) => {
                                            handleCurrencyValueChanged(val)
                                        }}
                                        // onChange={(e,val)=>the .log('currencyValue',e,val)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                getallplmnt
                                                className="inputcurrency"
                                                // className="required"
                                                // label="Managed By"
                                                // value={formdata.label}
                                                name="managed_By"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                            </ValidatorForm>
                        </div>
                        {/*<IconBox>
                        <StyledIconButton>
                            <Icon>mail_outline</Icon>
                        </StyledIconButton>

                        <StyledIconButton>
                            <Icon>web_asset</Icon>
                        </StyledIconButton>

                        <StyledIconButton>
                            <Icon>star_outline</Icon>
                        </StyledIconButton>
                    </IconBox>*/}
                    </Box>
                    <Box display="flex" alignItems="center">
                        {/*<NotificationProvider>
                        <NotificationBar />
                    </NotificationProvider>
                    <ShoppingCart />*/}
                        <MatxMenu
                            menuButton={
                                <UserMenu>
                                    {user && user.presignedurl ? (
                                        <img className="profile-img" src={user?.presignedurl}></img>
                                    ) : (
                                        <Avatar
                                            src={adminUser}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    <Hidden xsDown>
                                        <Span>
                                            <strong>{user?.username}</strong>
                                            <span className="subtitle_role">
                                                {user?.roles}
                                            </span>
                                        </Span>
                                    </Hidden>
                                </UserMenu>
                            }
                        >
                            {/*<StyledItem>
                            <Link to="/">
                                <Icon> home </Icon>
                                <Span> Home </Span>
                            </Link>
                        </StyledItem>*/}
                            <StyledItem>
                                <Link to={'user/profile/' + user.id}>
                                    <Icon> person </Icon>
                                    <Span> My Profile </Span>
                                </Link>
                            </StyledItem>
                            <StyledItem onClick={handleClickOpen} id='myButton'>
                                <Icon> lock_outline </Icon>
                                <Span> Reset Password </Span>
                            </StyledItem>
                            <StyledItem onClick={handleSettingOpen}>
                                <Icon>
                                    {' '}
                                    <SettingsIcon />{' '}
                                </Icon>
                                <Span> Currency Conversion</Span>
                            </StyledItem>
                            <StyledItem onClick={logout} id='myButton'>
                                {/* <Icon>
                                    {' '}
                                    <  PowerSettingsNewIcon />{' '}
                                </Icon>
                                <Span> Logout</Span> */}
                                <Icon > {' '}power_settings_new{' '} </Icon>
                                <Span style={{ marginTop: "0px" }}> Logout </Span>
                            </StyledItem>
                        </MatxMenu>
                    </Box>
                    <Dialog
                        open={open}
                        disableBackdropClick
                        disableEscapeKeyDown
                        aria-labelledby="form-dialog-title"
                    >
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            className="customform"
                        >
                            <DialogTitle
                                id="form-dialog-title"
                                onClose={handleClose}
                            >
                                Reset password
                            </DialogTitle>
                            <DialogContent>
                                <StyledCard elevation={6} className="">
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            {/* <label>Old Password</label>
                                    <TextValidator
                                            className="inputwithIcon"
                                            sx={{ mb: '12px', width: '100%',  }}
                                            label="Enter Old Password"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e)=>formdatavaluechange(e)}
                                            name="oldpassword"
                                            type="password"
                                            value={formdata.oldpassword || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            placeholder="Enter Old Password"
                                            
                                    /> */}
                                            <label>New Password</label>
                                            <TextValidator
                                                className="inputwithIcon"
                                                sx={{
                                                    mb: '12px',
                                                    width: '100%',
                                                }}
                                                label="Enter New Password"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                name="newpassword"
                                                type="password"
                                                value={
                                                    formdata.newpassword || ''
                                                }
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required',
                                                ]}
                                                placeholder="Enter New Password"
                                            />
                                            <label>Confirm New Password</label>
                                            <TextValidator
                                                className="inputwithIcon"
                                                sx={{
                                                    mb: '12px',
                                                    width: '100%',
                                                }}
                                                label="Enter Confirm New Password"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                name="confirmnewpassword"
                                                type="password"
                                                value={formdata.confirmnewpassword || ""}
                                                validators={[
                                                    'required',
                                                    'isPasswordMatch',
                                                ]}
                                                errorMessages={[
                                                    'this field is required',
                                                    "password didn't match",
                                                ]}
                                                placeholder="Enter Confirm New Password"
                                            />
                                        </Grid>
                                    </Grid>
                                </StyledCard>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className="whitebg"
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ textTransform: "uppercase" }}
                                    className="whitebg"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </ValidatorForm>
                    </Dialog>
                    <Dialog
                        open={openSetting}
                        disableBackdropClick
                        disableEscapeKeyDown
                        aria-labelledby="form-dialog-title"
                    >
                        <ValidatorForm
                            onSubmit={handleSaveConversion}
                            className="customform"
                        >
                            <DialogTitle
                                id="form-dialog-title"
                                onClose={handleSettingClose}
                            >
                                Currency Conversion
                            </DialogTitle>
                            <DialogContent>
                                <StyledCard elevation={6} className="">
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            {/* <label>Old Password</label>
                                    <TextValidator
                                            className="inputwithIcon"
                                            sx={{ mb: '12px', width: '100%',  }}
                                            label="Enter Old Password"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e)=>formdatavaluechange(e)}
                                            name="oldpassword"
                                            type="password"
                                            value={formdata.oldpassword || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            placeholder="Enter Old Password"
                                            
                                    /> */}
                                            <div style={{ display: 'flex' }}>
                                                <Grid
                                                    item
                                                    lg={12}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <label>Currency From</label>
                                                    <AutoComplete
                                                        disabled
                                                        className="dropdown"
                                                        fullWidth
                                                        options={currencyArray}
                                                        getOptionLabel={(
                                                            option
                                                        ) => option.label}
                                                        defaultValue={defaultValueRAND}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                disabled
                                                                {...params}
                                                                getallplmnt
                                                                className="required"
                                                                label="Select"
                                                                value={formdata.convertfrom}
                                                                name="managed_By"
                                                                placeholder="Select"
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={12}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <label className="dropdownstyle">
                                                        Currency To
                                                    </label>
                                                    <AutoComplete
                                                        disabled
                                                        className="dropdown dropdownstyle"
                                                        fullWidth
                                                        // className='dropdownstyle'
                                                        options={currencyArray}
                                                        getOptionLabel={(
                                                            option
                                                        ) => option.label}
                                                        defaultValue={defaultValueUSD}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                getallplmnt
                                                                className="required"
                                                                label="Select"
                                                                value={formdata.convertfrom}
                                                                name="managed_By"
                                                                placeholder="Select"
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </div>
                                            <label>Currency Conversion</label>
                                            <TextField
                                                type="number"
                                                name="conversionvalue"
                                                id="name"
                                                value={formdata.conversionvalue || ""}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                label="CURRENCY CONVERSION VALUE"
                                                placeholder="CURRENCY CONVERSION VALUE"
                                            />
                                        </Grid>
                                    </Grid>
                                </StyledCard>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className="whitebg"
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ textTransform: "uppercase" }}
                                    className="whitebg"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleSettingClose()}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </ValidatorForm>
                    </Dialog>
                </TopbarContainer>
            </TopbarRoot>
        </>
    )
}

export default React.memo(Layout1Topbar)
