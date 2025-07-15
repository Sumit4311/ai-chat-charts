import React, { useState, useEffect } from 'react'
import { Grid} from '@mui/material'
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
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import  XlsxFileFormat  from "../../image/xlsx-file-format-extension.svg"
import  pdf  from "../../image/pdf.svg"
import { useNavigate } from 'react-router-dom'
import {postDataFromApi,getDataFromApi,putDataFromApi,deleteDataFromApi} from '../../services/CommonService';
import {getallplmnt,deleteplmnt,searchplmnt,getAllCompanyDetails} from '../../services/api';
import AlertMessage from '../commoncomponent/AlertMessage'
import {statusoptions} from '../../services/CommonObject';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import moment from 'moment'



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

const CardHeader = styled('div')(() => ({
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
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

const subscribarList = [
    {
        id: '12345',
        companyName: 'Tesla',
        startDate: '22-05-2015',
        endDate: '15-08-2017',
        status: 'Complete',
        stage:'Sign agreement',
    },
    {
        id: '13456',
        companyName: 'Flipcart',
        startDate: '15-06-2015',
        endDate: '-',
        status: 'Screening',
        stage:'NDA',
    },
    {
        id: '25896',
        companyName: 'Cognizant',
        startDate: '20-08-2016',
        endDate: '15-06-2018',
        status: 'Complete',
        stage:'Sign agreement',
    },
    {
        id: '58961',
        companyName: 'TCS',
        startDate: '08-08-2017',
        endDate: '25-06-2019',
        status: 'Complete',
        stage:'Completed',
    },
    {
        id: '75632',
        companyName: 'Oppo',
        startDate: '25-05-2018',
        endDate: '-',
        status: 'Screening',
        stage:'NDA',
    },
    {
        id: '75632',
        companyName: 'Tesla',
        startDate: '25-12-2018',
        endDate: '-',
        status: 'Review',
        stage:'Origination',
    },
    
]

const statusopt=[
    {id: 1,label:"Active"},
    {id: 2,label:"Inactive"},
]


const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    background: '#0E0E23',
    
}))



const PipelineManagement = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata,setFormData]=useState({name:"",startDate:null,endDate:null,status:""})
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [plmntDetails,setplmntDetails]=useState([])
    const [dateopen, setdateOpen] = useState(false);
    const [enddateopen, setenddateOpen] = useState(false);
    const [nameDetails,setnameDetails]=useState([])
    const [companyoptions,setcompanyoptions]=useState([])
    const [searchResult,setsearchResult] = useState([])
    const [noSearchResultData,setnoSearchResultData] = useState(false)

    function handleDeleteClose() {
        setDeleteOpen(false)
        setDeleteId("")
    }
    function handleDeleteOpen(id) {
        setDeleteOpen(true)
        setDeleteId(id)
    }
    const handleDeleteConfirm = async (e) => {
        console.log('delete_id',delete_id)
        var query=""
        var response = ""
        response = await deleteDataFromApi(
                    deleteplmnt+delete_id,query,1,1
        )
        if(response && response.status==200 ){
            setDeleteId("")
            setDeleteOpen(false)
            setalertMessage("Pipeline Deleted Successfully")
            setalert(true)
            setalertType('success')
        }else{
                setalertMessage("Error")
                setalert(true)
                setalertType('error')
                setDeleteId("")
                setDeleteOpen(false)
        }
        
        
    }

    function confirm() {
        setalert(false)
    }

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }

    const handleDateChange = (date,name) => {
        console.log(date)
        if(date!=null){
            const momentdate = moment(date)
            var newdate = momentdate.format('Y-MM-DD')
        }else{
            var newdate = null
        }
        setFormData((formData) => ({
            ...formData,
            [name]:newdate,
        }));
    }

    const handleSubmitSearch = async (event) => {
        console.log(formdata)
        
        setsearchResult([])
        setnoSearchResultData(false);
        
        var newSearchArr = []
        
        
        if(formdata.name && formdata.startDate && formdata.endDate && formdata.status){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')  && opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD') && formdata.status == opt.status){
                            newSearchArr.push(opt);
                        }
                    }
                })
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.startDate!=null && formdata.endDate!=null){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')  && opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD')){
                            newSearchArr.push(opt);
                        }
                    }
                })
               
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.startDate && formdata.status){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')   && formdata.status == opt.status){
                            newSearchArr.push(opt);
                        }
                    }
                })
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.status && formdata.endDate){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase())  && opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD') && formdata.status == opt.status){
                            newSearchArr.push(opt);
                        }
                    }
                })
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.startDate && formdata.status && formdata.endDate){
            plmntDetails.find((opt) => {
                
                if( opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')  && opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD') && formdata.status == opt.status){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.startDate){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')){
                            newSearchArr.push(opt);
                        }
                    }
                })
                
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.endDate){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD')){
                            newSearchArr.push(opt);
                        }
                    }
                })
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name && formdata.status){
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(opt.companyName && options.label.toLowerCase().includes(formdata.name.toLowerCase()) && formdata.status == opt.status){
                            newSearchArr.push(opt);
                        }
                    }
                })
               
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.startDate && formdata.status){
            plmntDetails.find((opt) => {
               
                if(opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD') && formdata.status == opt.status){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.startDate && formdata.endDate){
            plmntDetails.find((opt) => {
               
                if(opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD') && opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.endDate && formdata.status){
            plmntDetails.find((opt) => {
               
                if(opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD') && formdata.status == opt.status){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.name){
            console.log(formdata.name)
            plmntDetails.find((opt) => {
                companyoptions.map((options)=>{
                    if (opt.companyName && opt.companyName == options.id){
                        if(options.label.toLowerCase().includes(formdata.name.toLowerCase())){
                            newSearchArr.push(opt);
                        }
                    }
                })
                
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.startDate){
            plmntDetails.find((opt) => {
               
                if(opt.startDate && formdata.startDate == moment(opt.startDate).format('Y-MM-DD')){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.endDate){
            plmntDetails.find((opt) => {
               
                if(opt.endDate && formdata.endDate == moment(opt.endDate).format('Y-MM-DD')){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else if(formdata.status){
           
            plmntDetails.find((opt) => {
               
                if(formdata.status == opt.status){
                   newSearchArr.push(opt);
                }
            })
            if(newSearchArr.length==0){
                setnoSearchResultData(true);
            }
        }else{
            //setnoSearchResultData(false);
        }

        console.log('newSearchArr',newSearchArr)
        setsearchResult(newSearchArr)
        console.log('noSearchResultData',noSearchResultData)

        /* var response = '';
        var query = '';
        response = await getDataFromApi(searchplmnt+'?companyName='+formdata.name,1);
        console.log('edit response',response)
        if(response && response.status==200 && response.data !=null){
            //setcompanyDeatils(response.data);
            //console.log('companyDeatils',response.data);
        } */
    }

    function formdatavaluechange(e){
        var value=e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]:value,
        }));
    }
    
    function changedropdownvalue(type,e){
        if(e){
           var value=e.id
        }else{
            var value=""
        }
        setFormData((formData) => ({
            ...formData,
            [type]:value,
        }));
    }
    

    useEffect(() => {
        getplmntDetails();
        getnameDetails();
    }, []);

    const getnameDetails = async () =>{
        var query = ""
        const response = await getDataFromApi(getAllCompanyDetails, 1);
        if(response && response.status==200 && response.data !=null){
            setnameDetails(response.data);
            console.log('nameDetails',response.data);
            var companyopts=[];
            response.data.map((company,i)=>{
                var cp=[];
                cp['id']=company.id
                cp['label']=company.name
                companyopts.push(cp)
            })
            setcompanyoptions(companyopts)
        }
    }

    const getplmntDetails = async () =>{
       var query = ""
        const response = await getDataFromApi(getallplmnt,1,1);
        if(response && response.status==200 && response.data !=null){
            setplmntDetails(response.data);
            console.log('plmntDetails',response);
        }
    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                       
                        { name: 'Pipeline Management' },
                    ]}
                />
                <div className="breadnavigation">Investment Pipeline / Pipeline Management</div>
            </div>
            <div className="rightalign_btn">
                {/* <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/investmentpipeline/pipelinemanagement/add')}>
                    Add Pipeline
                </Button> */}
                {/* <Button variant="contained" color="primary" className="whitebg icon">
                    <img src={XlsxFileFormat} />
                </Button>
                <Button variant="contained" color="primary" className="whitebg icon">
                   <img src={pdf} />
                </Button> */}
            </div>
            <Box width="100%" className="box">
                <StyledCard elevation={6} className="searchdiv">
                   <ValidatorForm onSubmit={handleSubmitSearch} onError={() => null} className="leadsearch customform">
                       <Grid container spacing={3}>
                          <Grid item lg={3} md={3} sm={6} xs={6}>
                                <label>Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formdata.name || ''}
                                    onChange={(e)=>formdatavaluechange(e)}
                                    label="Search..."
                                    placeholder="Search..."
                                />
                          </Grid>
                          <Grid item lg={3} md={3} sm={6} xs={6}>
                                <label>Date</label>
                                <div className="datediv">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker
                                                inputFormat="dd-MM-yyyy"
                                                value={formdata.startDate}
                                                open={dateopen}
                                                onOpen={() => setdateOpen(true)}
                                                onClose={() => setdateOpen(false)} 
                                                onChange={(e,name)=>handleDateChange(e,'startDate')}
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        // variant="Outlined"
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
                          </Grid>
                          <Grid item lg={2} md={2} sm={6} xs={6}>
                                <label>Select status</label>
                                <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={statusoptions}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('status',value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Status"
                                                value={formdata.status}
                                                name="status"
                                                placeholder="Status"
                                            />
                                        )}
                                />
                          </Grid>
                          <Grid item lg={1} md={1} sm={6} xs={6}>
                                <Button variant="contained" color="primary" className="whitebg" type="submit">
                                    Search
                                </Button>
                          </Grid>
                       </Grid>     
                   </ValidatorForm>
                </StyledCard>
                <div className="table_scroll">
                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Company Name</TableCell>
                                                <TableCell>Start date</TableCell>
                                                <TableCell>End date</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Stage</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {!plmntDetails || plmntDetails.length==0 || (noSearchResultData && searchResult.length==0) ? <TableRow><TableCell colspan="7" align="center">No Data Found </TableCell></TableRow> :''} 
                                            {!noSearchResultData && searchResult.length==0 && plmntDetails.map((plmntDetails, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        {plmntDetails.id}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    { companyoptions && plmntDetails.companyName ? companyoptions.map((opt)=>{
                                                         if (opt.id == plmntDetails.companyName)
                                                        return <span>{opt.label}</span>      
                                                        }): ''
                                                    }
                                                    
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.startDate}
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.endDate}
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                    {plmntDetails.status ? statusoptions.map((opt)=>{
                                                         if (opt.id == plmntDetails.status)
                                                        return <span>{opt.label}</span>      
                                                        }): ''
                                                    }
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.stage}
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/investmentpipeline/pipelinemanagement/view/'+plmntDetails.id)} >
                                                            <Icon fontSize="large">remove_red_eye</Icon>
                                                        </Tooltip>
                                                        {/* <Tooltip title="Edit" fontSize="large" onClick={() => navigate('/investmentpipeline/pipelinemanagement/edit/'+plmntDetails.id)}>
                                                            <Icon fontSize="large">mode_edit</Icon>
                                                        </Tooltip> */}
                                                        {/* <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(plmntDetails.id)}>
                                                            <Icon fontSize="large">delete</Icon>
                                                        </Tooltip> */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {!noSearchResultData && searchResult.length!=0 && searchResult.map((plmntDetails, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        {plmntDetails.id}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    { companyoptions && plmntDetails.companyName ? companyoptions.map((opt)=>{
                                                         if (opt.id == plmntDetails.companyName)
                                                        return <span>{opt.label}</span>      
                                                        }): ''
                                                    }
                                                    
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.startDate}
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.endDate}
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                    {plmntDetails.status ? statusoptions.map((opt)=>{
                                                         if (opt.id == plmntDetails.status)
                                                        return <span>{opt.label}</span>      
                                                        }): ''
                                                    }
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {plmntDetails.stage}
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Tooltip title="View" fontSize="large" onClick={() => navigate('/investmentpipeline/pipelinemanagement/view/'+plmntDetails.id)} >
                                                            <Icon fontSize="large">remove_red_eye</Icon>
                                                        </Tooltip>
                                                        {/* <Tooltip title="Edit" fontSize="large" onClick={() => navigate('/investmentpipeline/pipelinemanagement/edit/'+plmntDetails.id)}>
                                                            <Icon fontSize="large">mode_edit</Icon>
                                                        </Tooltip> */}
                                                        {/* <Tooltip title="Delete" fontSize="large" onClick={() => handleDeleteOpen(plmntDetails.id)}>
                                                            <Icon fontSize="large">delete</Icon>
                                                        </Tooltip> */}
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
                    <Button variant="outlined" className="whitebg" onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default PipelineManagement
