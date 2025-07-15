import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
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
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import locationcity from "../../image/locationcity.svg"
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
import { getAllCompanyDetails, deleteCompany, searchCompany, getAllUserDetails } from "../../services/api"
import { getDataFromApi, deleteDataFromApi } from '../../services/CommonService';
import AlertMessage from '../commoncomponent/AlertMessage'
import { managedByoptions, getProfile } from '../../services/CommonObject';
import { navigations } from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import moment from 'moment'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import useAuth from 'app/hooks/useAuth'

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
                textTransform: 'uppercase',
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


const statusopt = [
    { id: "Active", label: "Active" },
    { id: "Inactive", label: "Inactive" },
]


const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',

}))

const Lead = () => {
    if (localStorage.getItem('reloadLead')) {
        localStorage.removeItem('reloadLead')
        window.location.reload();
    }
    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({ name: "", startDate: null, endDate: null, status: "", managed_By: "" })
    const [nameDetails, setnameDetails] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [dateopen, setdateOpen] = useState(false);
    const [enddateopen, setenddateOpen] = useState(false);
    const [searchResult, setsearchResult] = useState([])
    const [noSearchResultData, setnoSearchResultData] = useState(false)
    const [mguseroptions, setmguseroptions] = useState([])
    const [userDetails, setuserDetails] = useState([])
    const user = useAuth()
    const userRole = localStorage.getItem('userRole')

    function handleDeleteOpen(id) {
        setDeleteOpen(true)
        setDeleteId(id)
    }

    function handleDeleteClose() {
        setDeleteOpen(false)
        setDeleteId("")
    }

    const handleDateChange = (date, name) => {
        console.log(date)
        if (date != null) {
            const momentdate = moment(date)
            var newdate = momentdate.format('Y-MM-DD')
        } else {
            var newdate = null
        }

        setFormData((formData) => ({
            ...formData,
            [name]: newdate,
        }));
    }

    const handleDeleteConfirm = async (e) => {
        console.log('delete_id', delete_id)
        var query = ""
        var response = ""
        response = await deleteDataFromApi(
            deleteCompany + delete_id,
            query, 1
        )

        if (response && response.status == 200) {
            setDeleteId("")
            setDeleteOpen(false)
            setalertMessage("Record Deleted Successfully")
            setalert(true)
            setalertType('success')
            getnameDetails();
        } else {
            setalertMessage("Error")
            setalert(true)
            setalertType('error')
            setDeleteId("")
            setDeleteOpen(false)
            getnameDetails();
        }

    }

    function confirm() {
        setalert(false)
        window.location.reload();
    }

    const handleSubmit = (event) => {

    }

    const handleClearDropdownValues = () => {
        setFormData((formData) => ({
            ...formData,
            name: '',
            status: null,
            managed_By: null,
        }))
        getnameDetails()
    }

    // console.log(handleSubmitSearch,"handleSubmitSearch")
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }

    function changedropdownvalue(type, e) {
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

    useEffect(() => {
        getnameDetails();
        getuserDetails();

    }, [])

    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable();
            }, 500);
        });
    }

    const handleSubmitSearch = async (event) => {
        console.log(formdata)
        $('#customdatatable').DataTable().destroy();
        setsearchResult([])
        setnoSearchResultData(false);
        var newSearchArr = []
        if (formdata.name && formdata.managed_By && formdata.status) {
            nameDetails.find((opt) => {
                if (opt.name && opt.name.toLowerCase().includes(formdata.name.toLowerCase()) && opt.managed_By && formdata.managed_By == opt.managed_By && opt.status && opt.status == formdata.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.name && formdata.managed_By) {
            nameDetails.find((opt) => {

                if (opt.name && opt.name.toLowerCase().includes(formdata.name.toLowerCase()) && opt.managed_By && formdata.managed_By == opt.managed_By) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.name && formdata.status) {
            nameDetails.find((opt) => {

                if (opt.name && opt.name.toLowerCase().includes(formdata.name.toLowerCase()) && opt.status == formdata.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.managed_By && formdata.status) {
            nameDetails.find((opt) => {

                if (opt.managed_By && formdata.managed_By == opt.managed_By && formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.name) {
            nameDetails.find((opt) => {

                if (opt.name && opt.name.toLowerCase().includes(formdata.name.toLowerCase())) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.managed_By) {
            nameDetails.find((opt) => {

                if (opt.managed_By && formdata.managed_By == opt.managed_By) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        } else if (formdata.status) {

            nameDetails.find((opt) => {

                if (formdata.status == opt.status) {
                    newSearchArr.push(opt);
                }
            })
            if (newSearchArr.length == 0) {
                setnoSearchResultData(true);
            }
        }
        setsearchResult(newSearchArr)
        // getdatatable();
        /*  var response = '';
         var query = '';
         var parameter = ''
         if(formdata.status){
             if(formdata.status == 1 ){
                 var formstatus = true;
             }else{
                 var formstatus = false;
             }
         }
         if(formdata.name && formdata.startDate && formdata.endDate && formdata.status){
             parameter = '?name='+formdata.name+'&creationDate='+formdata.startDate+'&lastmodifiedDate='+formdata.endDate+'&status='+formstatus
         }else if(formdata.name && formdata.startDate && formdata.endDate){
             parameter = '?name='+formdata.name+'&creationDate='+formdata.startDate+'&lastmodifiedDate='+formdata.endDate
         }else if(formdata.name && formdata.startDate && formdata.status){
             parameter = '?name='+formdata.name+'&creationDate='+formdata.startDate+'&status='+formstatus
         }else if(formdata.name && formdata.status && formdata.endDate){
             parameter = '?name='+formdata.name+'&status='+formstatus+'&lastmodifiedDate='+formdata.endDate
         }else if(formdata.startDate && formdata.status && formdata.endDate){
             parameter = '?creationDate='+formdata.startDate+'&status='+formstatus+'&lastmodifiedDate='+formdata.endDate
         }else if(formdata.name && formdata.startDate){
             parameter = '?name='+formdata.name+'&creationDate='+formdata.startDate
         }else if(formdata.name && formdata.endDate){
             parameter = '?name='+formdata.name+'&lastmodifiedDate='+formdata.endDate
         }else if(formdata.name && formdata.status){
             parameter = '?name='+formdata.name+'&status='+formstatus
         }else if(formdata.startDate && formdata.status){
             parameter = '?creationDate='+formdata.startDate+'&status='+formstatus
         }else if(formdata.startDate && formdata.endDate){
             parameter = '?creationDate='+formdata.startDate+'&lastmodifiedDate='+formdata.endDate
         }else if(formdata.endDate && formdata.status){
             parameter = '?lastmodifiedDate='+formdata.endDate+'&status='+formstatus
         }else if(formdata.name){
             parameter = '?name='+formdata.name
         }else if(formdata.startDate){
             parameter = '?creationDate='+formdata.startDate
         }else if(formdata.endDate){
             parameter = '?lastmodifiedDate='+formdata.endDate
         }else if(formdata.status){
             parameter = '?status='+formstatus
         }
 
         response = await getDataFromApi(searchCompany+parameter);
         
         if(response && response.status==200 && response.data !=null){
             setnameDetails(response.data);
         } */
    }
    const getnameDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllCompanyDetails, 1);
        if (response && response?.status == 200 && response?.data != null) {
            setsearchResult([])
            setnoSearchResultData(false)
            setnameDetails(response?.data);
            var companysetails = []
            response.data.map((company, i) => {
                var cp = { id: company.id, name: company.name }
                companysetails.push(cp)
            });
            localStorage.setItem('companyDet', JSON.stringify(companysetails));
            getdatatable();
        }
    }

    const getuserDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllUserDetails + `?userId=${user?.user?.id}`, 1);
        if (response && response.status == 200 && response.data != null) {
            setuserDetails(response.data)
            var mguseropts = [];
            response.data.map((user, i) => {
                var mg = []
                mg['id'] = user.email
                mg['label'] = user.username + '(' + user.email + ')'
                mguseropts.push(mg)
            })
            setmguseroptions(mguseropts)
        }
    }

    return (

        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'Investment pipeline' },
                    ]}
                />
                <div className="breadnavigation">Home / Investment Pipeline/ Lead list</div>
            </div>
            <div className="rightalign_btn">
                {userRole != 'Shareholder' && (
                    <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/investmentpipeline/lead/add')}>
                        Add Lead
                    </Button>
                )}

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
                    <ValidatorForm onSubmit={handleSubmitSearch} onError={() => null} className="leadsearch customform">
                        <Grid container spacing={3}>
                            <Grid item lg={3.5} md={3.5} sm={6} xs={6}>
                                <label>Company Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formdata.name || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label="Search..."
                                    placeholder="Search..."
                                />
                            </Grid>
                            <Grid item lg={3.5} md={3.5} sm={6} xs={6}>
                                <label>Managed By</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={mguseroptions}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('managed_By', value)}
                                    // inputValue={formdata.managed_By}
                                    value={formdata?.managed_By || ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            getallplmnt className="required"
                                            label="Managed By"
                                            name="managed_By"
                                            placeholder="Managed By"
                                        />
                                    )}
                                />

                            </Grid>
                            {/*<Grid item lg={3} md={3} sm={6} xs={6}>
                                <label>Date</label>
                                <div className="datediv">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker
                                                inputFormat="dd-MM-yyyy"
                                                value={formdata.startDate}
                                                open={dateopen}
                                                helperText={'Invalid Date'}
                                                onOpen={() => setdateOpen(true)}
                                                onClose={() => setdateOpen(false)} 
                                                onChange={(e,name)=>handleDateChange(e,'startDate')}
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        // variant="Outlined"
                                                        value={formdata.startDate}
                                                        className="required"
                                                        id="mui-pickers-date"
                                                        label="DD-MM-YYYY"
                                                        sx={{ mb: 2, width: '100%' }}
                                                        onClick={(e) => setdateOpen(true)}
                                                        
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider> 
                                </div>
                          </Grid>
                          <Grid item lg={3} md={3} sm={6} xs={6}>
                                <label>Date</label>
                                <div className="datediv">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker
                                                inputFormat="dd-MM-yyyy"
                                                value={formdata.endDate}
                                                open={enddateopen}
                                                onOpen={() => setenddateOpen(true)}
                                                onClose={() => setenddateOpen(false)} 
                                                onChange={(e,name)=>handleDateChange(e,'endDate')}
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        // variant="Outlined"
                                                        className="required"
                                                        id="mui-pickers-date"
                                                        label="DD-MM-YYYY"
                                                        sx={{ mb: 2, width: '100%' }}
                                                        onClick={(e) => setenddateOpen(true)}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider> 
                                    </div>
                          </Grid>*/}
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <label>Status</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={statusopt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('status', value)}
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
                            <Grid item lg={1} md={1} sm={6} xs={6}>
                                <div className='shareholder-repo-search'>
                                    <Button
                                        // style={{ marginTop: "-4px" }}
                                        variant="contained"
                                        color="primary"
                                        className="whitebg"
                                        type="submit">
                                        Search
                                    </Button>
                                    <Button
                                        // style={{ marginTop: "10px", borderRadius: "4px" }}
                                        variant="outlined"
                                        className="whitebg shareholder-clear"
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

                <div className="table_scroll">
                    <StyledTable className="customtable odd-even withborder" id="customdatatable">
                        <TableHead>
                            <TableRow>
                                {/*<TableCell>Id</TableCell>*/}
                                <TableCell>Company Name</TableCell>
                                <TableCell>Managed by</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Registered</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {!nameDetails || nameDetails.length==0 || (noSearchResultData && searchResult.length==0) ? <TableRow><TableCell colspan="6" align="center">No Data Found </TableCell></TableRow> :''} */}
                            {!noSearchResultData && searchResult.length == 0 && nameDetails.length > 0 && nameDetails.map((nameDetails, index) => (
                                <TableRow key={index}>
                                    {/*<TableCell align="left">
                                                        {nameDetails.id}
                                                    </TableCell>*/}
                                    {/* <TableCell align="left" className="imgCell">
                                        <span>
                                            {nameDetails?.presignedurl ? <img src={nameDetails?.presignedurl} /> : nameDetails?.name ? <span className="profileInitial">{getProfile(nameDetails?.name)}</span> : "-"}
                                            {nameDetails?.name}</span>
                                    </TableCell> */}
                                    <TableCell align="left" className="imgCell">
                                        <span>
                                            {nameDetails?.presignedurl ? (
                                                <img
                                                    src={nameDetails?.presignedurl}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = locationcity;
                                                    }}
                                                />
                                            ) : nameDetails?.name ? (
                                                <span className="profileInitial" >{getProfile(nameDetails?.name)}</span>
                                            ) : (
                                                "-"
                                            )}
                                            <div className="profilesimagelead" > {nameDetails?.name}</div>
                                        </span>
                                    </TableCell>
                                    <TableCell align="left" >
                                        <div style={{ textTransform: "lowercase",display:"flex"}}> {nameDetails?.managed_By ? nameDetails?.managed_By : '-'}</div>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.category ? nameDetails?.category : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.status ? nameDetails?.status : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.registerDate ? nameDetails?.registerDate : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/investmentpipeline/lead/view/' + nameDetails?.id)} >
                                            <Icon fontSize="large" className="actioniconspointer">remove_red_eye</Icon>
                                        </Tooltip>
                                        {userRole != 'Shareholder' && (
                                            <>
                                                <Tooltip
                                                    title="Edit"
                                                    fontSize="large"
                                                    onClick={() => navigate('/investmentpipeline/lead/edit/' + nameDetails?.id)}
                                                >
                                                    <Icon fontSize="large" className="actioniconspointer">mode_edit</Icon>
                                                </Tooltip>
                                                {nameDetails?.status && nameDetails?.status !== 'Inactive' && (
                                                    <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(nameDetails?.id)}>
                                                        <Icon fontSize="large" className="actioniconspointer">delete</Icon>
                                                    </Tooltip>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!noSearchResultData && searchResult?.length != 0 && searchResult?.map((nameDetails, index) => (
                                <TableRow key={index}>
                                    {/*<TableCell align="left">
                                                        {nameDetails.id}
                                                    </TableCell>*/}
                                    {/* <TableCell align="left" className="imgCell"> */}
                                    {/* <span> */}
                                    {/* <img src={prof} /> */}
                                    {/* {nameDetails?.presignedurl ? <img src={nameDetails?.presignedurl} /> : nameDetails?.name ? <span className="profileInitial">{getProfile(nameDetails.name)}</span> : "-"}
                                            {nameDetails?.name}</span> */}

                                    {/* </TableCell> */}
                                    <TableCell align="left" className="imgCell">
                                        <span>
                                            {nameDetails?.presignedurl ? (
                                                <img
                                                    src={nameDetails?.presignedurl}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = locationcity;
                                                    }}
                                                />
                                            ) : nameDetails?.name ? (
                                                <span className="profileInitial">{getProfile(nameDetails?.name)}</span>
                                            ) : (
                                                "-"
                                            )}
                                            <div className="profilesimagelead" > {nameDetails?.name}</div>
                                        </span>
                                    </TableCell>
                                    <TableCell align="left" >
                                        <div style={{ textTransform: "lowercase",display:"flex" }}> {nameDetails?.managed_By ? nameDetails?.managed_By : '-'}</div>
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.category ? nameDetails?.category : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.status ? nameDetails?.status : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        {nameDetails?.registerDate ? nameDetails?.registerDate : '-'}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/investmentpipeline/lead/view/' + nameDetails?.id)} >
                                            <Icon fontSize="large" className="actioniconspointer">remove_red_eye</Icon>
                                        </Tooltip>
                                        <Tooltip title="Edit" fontSize="large" onClick={() => navigate('/investmentpipeline/lead/edit/' + nameDetails?.id)}>
                                            <Icon fontSize="large" className="actioniconspointer">mode_edit</Icon>
                                        </Tooltip>
                                        {nameDetails?.status && nameDetails?.status != 'Inactive' ?
                                            <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(nameDetails?.id)}>
                                                <Icon fontSize="large" className="actioniconspointer">delete</Icon>
                                            </Tooltip>
                                            : ''}
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
                    <Button variant="outlined" className="whitebg" style ={{textTransform: "uppercase"}}onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Lead