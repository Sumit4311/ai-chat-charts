import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
    Button,
    Tooltip,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import adminUser from "../../image/adminUser.svg"
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import XlsxFileFormat from "../../image/xlsx-file-format-extension.svg"
import pdf from "../../image/pdf.svg"
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import prof from "../../image/prof.svg"
import { postDataFromApi, getDataFromApi, putDataFromApi, deleteDataFromApi } from '../../services/CommonService';
import { getAllUserDetails, deleteUser, searchUserDetails } from '../../services/api';
import AlertMessage from '../commoncomponent/AlertMessage'
import { departmentopt, rolesopt, getProfile } from '../../services/CommonObject';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AnalyticsRoot = styled(Card)(({ theme }) => ({
    padding: '28px 32px 32px 32px',
    marginBottom: '24px',
    background: theme.palette.primary.main,
}))

const Header = styled(H3)(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: 'rgba(255, 255, 255, 0.87)',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    color: "#FFF",
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: '15px',
                color: '#fff',
                textTransform: 'capitalize',
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: '15px',
                textTransform: 'capitalize',
                color: '#fff',
            },
        },
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',

}))

const StyledAvatar = styled(Avatar)(() => ({
    height: '40px',
    width: '40px',
}))


const statusopt = [
    { id: 'Active', label: "Active" },
    { id: 'Inactive', label: "Inactive" },
]

const Usermanagement = () => {
    // const { user } = useAuth()

    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({ name: "", startdate: "", enddate: "", status: "", role: "" })
    const [userDetails, setuserDetails] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [searchResult, setsearchResult] = useState([])
    const [noSearchResultData, setnoSearchResultData] = useState(false)
    const user = useAuth()
    const userRole = localStorage.getItem('userRole')

    function handleDeleteClose() {
        setDeleteOpen(false)
        setDeleteId("")
    }
    function handleDeleteOpen(id) {
        setDeleteOpen(true)
        setDeleteId(id)
    }
    const handleDeleteConfirm = async (e) => {
        var query = ""
        var response = ""
        response = await deleteDataFromApi(deleteUser + delete_id, query, 1)
        if (response.status == "200") {
            setDeleteId("")
            setDeleteOpen(false)
            setalertMessage('User Deleted Successfully')
            setalert(true)
            setalertType('success')
            getuserDetails();
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
            setDeleteId("")
            setDeleteOpen(false)
            getuserDetails();
        }
    }

    function confirm() {
        setalert(false)
    }
    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable();
            },);
        });
    }
    const getuserDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllUserDetails + `?userId=${user?.user?.id}`, 1);
        if (response && response.status == 200 && response.data != null) {
            const filteredList = response.data.filter(val => val.roles === 'Company Admin');
            if (user.roles === 'Company Admin') {
                setsearchResult([])
                setnoSearchResultData(false)
                setuserDetails(filteredList)
            } else {
                setsearchResult([])
                setnoSearchResultData(false)
                setuserDetails(response.data);
            }
            getdatatable();
        }
    }

    useEffect(() => {
        getuserDetails();
    }, []);


    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }

    // const handleDataTableInitialization = () => {
    //     $('#customdatatable').DataTable();
    //   };

    //   useEffect(() => {
    //     handleDataTableInitialization(); // Initialize DataTable when the component is mounted.
    //   }, []);


    const handleSubmitSearch = async (event) => {
        $('#customdatatable').DataTable().destroy();
        setsearchResult([])
        setnoSearchResultData(false);
        var newSearchArr = []
        // if (formdata.status && formdata.status == 'Active') {
        //     var formstatus = 'Active'
        // } else {
        //     var formstatus = 'Inactive'
        // }
        console.log(userDetails, "gggg")
        if (formdata.name && formdata.role && formdata.status) {
            userDetails.find((opt) => {
                if (opt.username && opt.username.toLowerCase().includes(formdata.name.toLowerCase()) && opt.roles && formdata.role == opt.roles && opt.status && formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.name && formdata.role) {
            userDetails.find((opt) => {
                if (opt.username && opt.username.toLowerCase().includes(formdata.name.toLowerCase()) && opt.roles && formdata.role == opt.roles) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }

        } else if (formdata.name && formdata.status) {
            userDetails.find((opt) => {
                if (opt.username && opt.username.toLowerCase().includes(formdata.name.toLowerCase()) && formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }

        } else if (formdata.role && formdata.status) {
            userDetails.find((opt) => {
                if (opt.roles && formdata.role == opt.roles && formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.name) {
            userDetails.find((opt) => {
                if (opt.username && opt.username.toLowerCase().includes(formdata.name.toLowerCase())) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.role) {
            userDetails.find((opt) => {
                if (opt.roles && formdata.role == opt.roles) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.status) {
            userDetails.find((opt) => {
                if (formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else {
            // console.log('no data found')
            // setnoSearchResultData(false);
        }
        setsearchResult(newSearchArr)
        // getdatatable();
    }

    function formdataValueChange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }
    const handleClearDropdownValues = () => {
        setFormData((formData) => ({
            ...formData,
            name: '',
            status: null,
            role: null,
        }))
        getuserDetails()
    }
    function changeDropdownValue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));
    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'User Management' },
                    ]}
                />
                <div className="breadnavigation">Home / User Management / User List</div>
            </div>
            <div className="rightalign_btn">
                <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/usermanagement/add')}>
                    Add User
                </Button>
                {/* <Button variant="contained" color="primary" className="whitebg icon">
                    <img src={XlsxFileFormat} />
                </Button>
                <Button variant="contained" color="primary" className="whitebg icon">
                   <img src={pdf} />
                </Button> */}
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <Box width="100%" className="box">
                <StyledCard elevation={6} className="searchdiv">
                    <ValidatorForm
                        onSubmit={handleSubmitSearch} onError={() => null}
                        className="leadsearch customform">
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <label>Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formdata.name || ''}
                                    onChange={(e) => formdataValueChange(e)}
                                    label="Search..."
                                    placeholder="Search..."
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <label>Roles {user.roles}</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={localStorage.getItem('userRole').toLowerCase() === 'company admin' ? rolesopt.slice(-2) : rolesopt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changeDropdownValue('role', value)}
                                    // inputValue={formdata.role}
                                    value={formdata.role}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Role"
                                            name="role"
                                            placeholder="Role"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <label>Status</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={statusopt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changeDropdownValue('status', value)}
                                    // inputValue={formdata.status}
                                    value={formdata.status}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Status"
                                            name="status"
                                            placeholder="Status"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <div className='shareholder-repo-search'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="whitebg"
                                        type="submit">
                                        Search
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className="whitebg shareholder-clear "
                                        onClick={handleClearDropdownValues}
                                        color="primary"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </StyledCard>
                <div className="table_scroll" style={{ whiteSpace: "nowrap" }}>
                    <StyledTable className="customtable odd-even withborder" id="customdatatable">
                        <TableHead >
                            <TableRow >
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Department</TableCell>
                                {(userRole === 'Super Admin' || userRole === 'Admin') &&
                                    <TableCell style={{ whiteSpace: "nowrap" }}>Company Name</TableCell>
                                }
                                <TableCell>Email Id</TableCell>
                                <TableCell style={{ whiteSpace: "nowrap" }}>Phone Number</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!noSearchResultData && searchResult.length == 0 && userDetails.length > 0 && userDetails.map((user, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell align="left" className="imgCell"> */}
                                    {/* <span> */}
                                    {/* <img src={prof} /> */}
                                    {/* {user?.presignedurl ? <img src={user?.presignedurl} /> : user?.username ? <span className="profileInitial">{getProfile(user?.username)}</span> : "-"}
                                            {user?.username}</span>
                                    </TableCell> */}
                                    <TableCell align="left" className="imgCell">
                                        <span>
                                            {user?.presignedurl ? (
                                                <img
                                                    src={user?.presignedurl}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = adminUser;
                                                    }}
                                                />
                                            ) : user?.username ? (
                                                <span className="profileInitial">{getProfile(user?.username)}</span>
                                            ) : (
                                                "-"
                                            )}
                                            <div className="profilesimageuser" > {user?.username}</div>
                                        </span>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user.roles ? rolesopt?.map((opt) => {
                                            if (opt?.id == user?.roles)
                                                return <span>{opt?.label}</span>
                                        }) : '-'
                                        }
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user.department ? departmentopt?.map((opt) => {
                                            if (opt?.id == user?.department)
                                                return <span>{opt?.label}</span>
                                        }) : '-'
                                        }
                                    </TableCell>
                                    {(userRole === 'Super Admin' || userRole === 'Admin') &&
                                        <TableCell align="left" >
                                            {user?.companyName ? user?.companyName : '-'}
                                        </TableCell>
                                    }
                                    <TableCell align="left" >
                                        <div style={{ textTransform: "lowercase",display:"flex" }}> {user?.email ? user?.email : '-'}</div>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.mobilePhone ? user?.mobilePhone : "-"}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.status ? user?.status : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/usermanagement/view/' + user?.id)}>
                                            <Icon fontSize="large" className="actioniconspointer">remove_red_eye</Icon>
                                        </Tooltip>
                                        <Tooltip title="Edit" fontSize="large" onClick={() => navigate('/usermanagement/update/' + user?.id)}>
                                            <Icon fontSize="large" className="actioniconspointer">mode_edit</Icon>
                                        </Tooltip>
                                        {user?.roles && user?.roles != "Super Admin" ?
                                            <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(user?.id)}>
                                                <Icon fontSize="large" className="actioniconspointer">delete</Icon>
                                            </Tooltip>
                                            : ""}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!noSearchResultData && searchResult.length != 0 && searchResult.map((user, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell align="left" className="imgCell">
                                        <span> */}
                                    {/* <img src={prof} /> */}
                                    {/* {user?.presignedurl ? <img src={user?.presignedurl} /> : user?.username ? <span className="profileInitial">{getProfile(user?.username)}</span> : "-"}
                                            {user?.username}</span>
                                    </TableCell> */}
                                    <TableCell align="left" className="imgCell">
                                        <span>
                                            {user?.presignedurl ? (
                                                <img
                                                    src={user?.presignedurl}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = adminUser;
                                                    }}
                                                />
                                            ) : user?.username ? (
                                                <span className="profileInitial">{getProfile(user?.username)}</span>
                                            ) : (
                                                "-"
                                            )}
                                            <div className="profilesimageuser" > {user?.username}</div>
                                        </span>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.roles ? rolesopt.map((opt) => {
                                            if (opt?.id == user?.roles)
                                                return <span>{opt?.label}</span>
                                        }) : '-'
                                        }
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.department ? departmentopt?.map((opt) => {
                                            if (opt?.id == user?.department)
                                                return <span>{opt?.label}</span>
                                        }) : '-'
                                        }
                                    </TableCell>
                                    {(userRole !== 'Company Admin' || userRole !== 'Company User') &&
                                        <TableCell align="left" >
                                            {user?.companyName ? user?.companyName : '-'}
                                        </TableCell>}
                                    <TableCell align="left" >
                                        <div style={{ textTransform: "lowercase",display:"flex" }}> {user?.email ? user?.email : '-'}</div>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.mobilePhone ? user?.mobilePhone : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {user?.status ? user?.status : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/usermanagement/view/' + user?.id)}>
                                            <Icon fontSize="large" className="actioniconspointer" >remove_red_eye</Icon>
                                        </Tooltip>
                                        <Tooltip title="Edit" fontSize="large" onClick={() => navigate('/usermanagement/update/' + user?.id)}>
                                            <Icon fontSize="large" className="actioniconspointer">mode_edit</Icon>
                                        </Tooltip>
                                        {user?.roles && user?.roles != "Super Admin" ?
                                            <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(user?.id)}>
                                                <Icon fontSize="large" className="actioniconspointer">delete</Icon>
                                            </Tooltip>
                                            : ""}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </div>
            </Box>
            <Dialog
                open={deleteOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure You Want to delete this record?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="primary" variant="contained" className="whitebg">
                        Confirm
                    </Button>
                    <Button variant="outlined" className="whitebg" style={{ textTransform: "uppercase" }} onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

export default Usermanagement
