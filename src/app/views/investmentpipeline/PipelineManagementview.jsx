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
import CloseIcon from '@mui/icons-material/Close'
import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography';
import { Small } from 'app/components/Typography'
import profImg from "../../image/profImg.svg"
import xlsx from "../../image/xlsx.svg"
import flowchart from "../../image/flowchart.PNG"
import rightarrow from "../../image/rightarrow.svg"
import toparrow from "../../image/6615640.svg"
import leftarrow from "../../image/leftarrow.svg"
import downarrow from "../../image/downarrow.svg"
import { getDataFromApi, postDataFromApi } from '../../services/CommonService';
import { getSingleplmnt, getAllCompanyDetails, getAllUserDetails, plmntUpload, plmntApprove } from '../../services/api';
import { useParams } from 'react-router-dom'
import { statusoptions, managedByoptions, progressStagesfunc, getFileIcon, progressStagesfunction } from '../../services/CommonObject';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import processbg from "../../image/processbg.png"
import moment from "moment";
import useAuth from 'app/hooks/useAuth'
import AlertMessage from '../commoncomponent/AlertMessage'


const progressStages = progressStagesfunc()
const progresStage = progressStagesfunction()
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

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',

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

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '1rem',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '15px',
    display: 'block',
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

const DialogTitle = props => {
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


const PipelineManagementview = () => {

    const theme = useTheme()
    const navigate = useNavigate()
    let { id } = useParams()
    let newid = id ? id : ''
    const [singleplmnt, setsingleplmnt] = useState([])
    const [formdata, setFormData] = useState({ id: "", companyName: "", startDate: "", endDate: "", status: "", stage: "" })
    const [nameDetails, setnameDetails] = useState([])
    const [companyoptions, setcompanyoptions] = useState([])
    const [dragdropOpen, setdragdropOpen] = useState(false)
    const [userDetails, setuserDetails] = useState([])
    const { user } = useAuth()
    const [uploadDocresult, setuploadDocresult] = useState([])
    const [companyHistory, setcompanyHistory] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [disableApproveReject, setdisableApproveReject] = useState(true)
    const [disableReview, setdisableReview] = useState(false)
    const [stageId, setstageId] = useState('')
    const [allStage, setallStage] = useState([])

    useEffect(() => {
        getuserDetails();
        if (id) {
            getsingleplmnt();
        } else {
        }
        getnameDetails();

    }, [])

    const getnameDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllCompanyDetails, 1);
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data);
            console.log('nameDetails', response.data);
            var companyopts = [];
            response.data.map((company, i) => {
                var cp = [];
                cp['id'] = company.id
                cp['label'] = company.name
                companyopts.push(cp)
            })
            setcompanyoptions(companyopts)
        }
    }

    const getsingleplmnt = async () => {
        var query = ""
        const response = await getDataFromApi(
            getSingleplmnt + id,
            1, 1
        )
        console.log(response, "respon")
        if (response && response.status == 200 && response.data != null) {
            console.log(response.data)
            setsingleplmnt(response.data)
            if (response.data.companyHistoryList) {
                setcompanyHistory(response.data.companyHistoryList)
                if (response.data.companyHistoryList.length > 0 && response.data.companyHistoryList[response.data.companyHistoryList.length - 1].status == 'Submitted') {
                    setdisableApproveReject(false)
                    setdisableReview(true)
                } else {
                    setdisableApproveReject(true)
                    setdisableReview(false)
                }
            }

            if (id) {
                var plmnt = response.data
                var managed_By = plmnt.companyVo.managed_By ? plmnt.companyVo.managed_By : ''
                managedByoptions && managedByoptions.map((opt) => {
                    if (opt.id == plmnt.companyVo.managed_By) {
                        managed_By = opt.label
                    }
                })

                progressStages.map((opt) => {
                    if (opt.label == plmnt.stage) {
                        setstageId(opt.id)
                    }
                })
                var newstages = []
                progressStages && progressStages.map((opt) => {
                    var commentdata = response.data.companyHistoryList.filter((stage, i) => {
                        var newStage = stage.stage;
                        newStage = newStage ? newStage.toLowerCase() : ''
                        return stage.stage && newStage == opt.label.toLowerCase()
                    })
                    var st = opt
                    st['commentsAndFiles'] = commentdata
                    newstages.push(st)
                })
                const sortedData = [...progressStages].sort((a, b) => a.id - b.id)
                // response.data.companyHistoryList.map((opt) => {
                //     if (opt.stage && (opt.stage == 'Origination' || opt.stage == 'Origination Stage')) {
                //         newstages[0].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == "NDA") {
                //         newstages[1].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == 'Addition to Pipeline') {
                //         newstages[2].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == 'Termsheet/EOI/NBO') {
                //         newstages[3].commentsAndFiles.push(opt)
                //     }
                //      else if (opt.stage && opt.stage == 'Due Dilligence') {
                //         newstages[4].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == 'Draft Agreements') {
                //         newstages[5].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == 'Pay Away') {
                //         newstages[6].commentsAndFiles.push(opt)
                //     } else if (opt.stage && opt.stage == 'Sign Agreement') {
                //         newstages[7].commentsAndFiles.push(opt)
                //     }else if (opt.stage && opt.stage == 'Sign Agreement') {
                //         newstages[8].commentsAndFiles.push(opt)
                //     }
                // })
                setallStage(sortedData)
                setFormData((formData) => ({
                    ...formData,
                    ['id']: plmnt.id,
                    ['companyName']: plmnt.companyName,
                    ['startDate']: plmnt.startDate,
                    ['endDate']: plmnt.endDate,
                    ['status']: plmnt.status,
                    ['stage']: plmnt.stage,
                    ['managed_By']: managed_By,
                    ['websiteUrl']: plmnt.companyVo.websiteUrl,
                    ['currentValue']: plmnt.companyVo.currentValue,
                    ['dealTeams']: plmnt.companyVo.dealTeams,
                    ['investmentValue']: plmnt.companyVo.investmentValue,
                }))
            }
        }
    }

    const getuserDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllUserDetails + `?userId=${user?.id}`, 1);
        if (response && response.status == 200 && response.data != null) {
            setuserDetails(response.data);
            console.log('userDetails', response.data);
        }
    }

    const handleDragDropClose = async (e) => {
        setdragdropOpen(false)
    }

    const handleDragDropConfirm = async (e) => {
        //setdragdropOpen(false)
        //navigate('/investmentpipeline/pipelinemanagementprogress');
        var response = ''
        var stage = ''
        var nextstage = ''
        var email = singleplmnt && singleplmnt.companyVo && singleplmnt.companyVo.dealTeams ? singleplmnt.companyVo.dealTeams : ''
        if (singleplmnt.companyHistoryList && singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].stage) {
            stage = singleplmnt.companyHistoryList && singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].stage
            progressStages.map((opt) => {
                if (opt.label == stage) {
                    nextstage = progressStages[opt.id].label
                }
            })
        }
        var data = {
            id: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].id : '',
            fileId: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].fileId : '',
            stage: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].stage : '',
            status: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].status : '',
            uploadDate: moment().format("YYYY-MM-DD"),
            companyId: id,
        }
        response = await postDataFromApi(plmntApprove + '?nextstage=true&username=' + email, data, 1, 1)
        console.log(response)
        if (response && response.status == 200) {
            setalertMessage("Approved")
            setalert(true)
            setalertType('success')
        } else {
            setalertMessage("error")
            setalert(true)
            setalertType('error')
        }
        getsingleplmnt()
    }

    const handleDragDropReview = async (e) => {
        var response = ''
        if (formdata.uploadDoc) {
            const currentDate = moment().format("YYYY/MM/DD")
            var formData = new FormData();
            formData.append("uploadDoc", formdata.uploadDoc);
            formData.append("stage", 'Origination Stage');
            formData.append("uploadDate", currentDate);
            formData.append("companyId", id ? id : '');
            response = await postDataFromApi(plmntUpload, formData, 1, 1)
            console.log(response)
            if (response && response.status == 200) {
                setuploadDocresult(response.data)
                setdisableApproveReject(false)
                setalertMessage("Document uploaded successfully")
                setalert(true)
                setalertType('success')
            } else {
                setuploadDocresult([])
                setalertMessage("error")
                setalert(true)
                setalertType('error')
            }
        }
    }

    const handleDragDropOpen = async (e) => {
        setdragdropOpen(true)
    }

    const onFileChange = async (event) => {
        console.log('event', event.target.name)
        var file = event.target.files[0]
        console.log('file', file)
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: file,
        }));
        console.log('formdata--->', formdata)
    }
    function confirm() {
        setalert(false)
        setdragdropOpen(false)
    }
    var isODd = 0;
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'Pipeline Management detail' },
                    ]}
                />
                <div className="breadnavigation">Investment Pipeline/ Pipeline Management Detail</div>
            </div>
            <div className="rightalign_btn">
                <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/investmentpipeline/pipelinemanagementprogress')}>
                    Pipeline Management
                </Button>
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <Box width="100%" className="box">
                <Grid container spacing={3} >
                    <Grid item lg={8} md={8} sm={12} xs={12} className="leftGrid">
                        <div className="singleStyledCard">
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Progress overview</Title>
                                </CardHeader>
                                {console.log(allStage, "allstage----")}
                                {allStage && allStage.map((opt) => {
                                    if (opt && opt.commentsAndFiles.length > 0 || opt.label == 'Origination') {
                                        return (<div className="divInner withborder">
                                            <SubTitle>{opt.label}</SubTitle>
                                            <div className="contentDetail">
                                                <h4>Comment:</h4>
                                                <Typography> {opt.commentsAndFiles && opt.commentsAndFiles.length > 0 && opt.commentsAndFiles[opt.commentsAndFiles.length - 1].comments ? opt.commentsAndFiles[opt.commentsAndFiles.length - 1].comments : ''} </Typography>
                                                <h4>Attachments:</h4>
                                                <Grid container spacing={3} className="attachmentbox">
                                                    {opt.commentsAndFiles && opt.commentsAndFiles.length > 0 && opt.commentsAndFiles.map((companyHistory, i) => (
                                                        <Grid item lg={3} md={3} sm={6} xs={6} key={i}>
                                                            <div className="attachFile">
                                                                <a href={companyHistory.presignedurl} target="_blank">
                                                                    <img src={getFileIcon(companyHistory.presignedurl)} />
                                                                </a>
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </div>
                                        </div>)
                                    } else {
                                        return (<div className="divInner withborder">
                                            <SubTitle>{opt.label}</SubTitle>
                                            <div className="contentDetail">
                                                <h4>Comment:</h4>
                                                <h4>Attachments:</h4>
                                            </div>
                                        </div>)
                                    }
                                })}

                                {/*<div className="divInner withborder">
                                        <SubTitle>NDA</SubTitle>
                                        <div className="contentDetail">
                                            <h4>Current satge : {formdata.stage}</h4>
                                            <div className="fileuploadView">
                                                <Button variant="contained" color="primary" className="whitebg" >
                                                    Upload Document
                                                </Button>
                                                <input type="file" name="uploadDoc" onChange={(e)=>onFileChange(e)} />
                                            </div>
                                            <Button variant="contained" color="primary" className="whitebg submitforReview" onClick={(e)=>handleDragDropOpen()}>
                                                Submit for review
                                            </Button>    
                                        </div>
                                     </div>*/}
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className="bottomMargin">
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Basic Details</Title>
                            </CardHeader>
                            <div className="divInner">
                                <div className="basicdetailListing">
                                    {/*<div className="detailListinginner">
                                           <span>Company Id</span><span>: {formdata.id}</span>
                                        </div>*/}
                                    <div className="detailListinginner">
                                        <span>Company Name</span><span>: {formdata.companyName}</span>
                                    </div>
                                    {/* <div className="detailListinginner">
                                        <span>Start Date</span><span>: {formdata.startDate}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>End Date</span><span>: {companyHistory && companyHistory.length > 0 && companyHistory[companyHistory.length - 1].stage == 'Sign Agreement' && companyHistory[companyHistory.length - 1].status == 'Approved' && companyHistory[companyHistory.length - 1].uploadDate ? companyHistory[companyHistory.length - 1].uploadDate : ''}</span>
                                    </div> */}
                                    <div className="detailListinginner">
                                        <span>Status</span><span>: {formdata.status}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Stage</span><span>: {formdata.stage}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Managed By</span><span >: {formdata.managed_By}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Website</span><span>: {formdata.websiteUrl}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Current Valuation</span><span>: {formdata.currentValue}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Deal Teams</span><span>: {formdata.dealTeams}</span>
                                            {/* <div className="viewprofiledetails"> */}
                                              {/* </div> */}
                                             
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Investment Value</span><span>: {formdata.investmentValue}</span>
                                    </div>
                                </div>
                            </div>
                        </StyledCard>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="leftGrid">
                        <StyledCard elevation={6} >
                            <CardHeader className="cardheader">
                                <Title>our process</Title>
                            </CardHeader>
                            <div className="divInner" style={{ overflowX: 'scroll' }}>
                                <Grid container >
                                    {progresStage.map((stage, i) => {
                                        if (i % 2 != 0) {
                                            isODd = isODd ? 0 : 1
                                            var newisODd = isODd
                                        }
                                        return (
                                            <>
                                                {stage.label == '' ?
                                                    <>
                                                        {(i == 1 || i == 3 || i == 5 || i == 8 || i == 10 || i == 12 || i == 14 || i == 16 || i == 18 || i == 20 || i == 22) ?
                                                            <Grid item lg={1} md={1} sm={1} xs={1} className="bottomMargin flowarrow bottomarrow">
                                                                <img src={downarrow} />
                                                            </Grid> :
                                                            (i == 9 || i == 11 || i == 13 || i == 15) ?
                                                                <Grid item lg={1} md={1} sm={1} xs={1} className="bottomMargin flowarrow bottomarrow">
                                                                    <img src={downarrow} style={{ transform: 'scaleY(-1)' }} />
                                                                </Grid> :
                                                                <Grid item lg={1} md={1} sm={1} xs={1} className="bottomMargin"></Grid>
                                                        }
                                                    </>
                                                    :
                                                    <Grid item lg={1} md={1} sm={1} xs={1}
                                                        className={stageId && stageId > stage.id ?
                                                            "bottomMargin singleflow pastStage" : stageId == stage.id
                                                                ? "bottomMargin singleflow currentStage" : "bottomMargin singleflow"}>
                                                        <div>
                                                            <img src={processbg} />
                                                            <span>{stage.label.toUpperCase()}</span>
                                                        </div>
                                                    </Grid>
                                                }
                                                {(i == 1 || i == 3 || i == 5 || i == 16 || i == 18 || i == 20 || i == 22) &&
                                                    <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5} className="bottomMargin flowarrow rightarrow">
                                                        <img src={rightarrow} />
                                                    </Grid>
                                                }
                                                {(i == 0 || i == 2 || i == 4 || i == 6 || i == 9 || i == 11 || i == 13 || i == 15
                                                    || i == 17 || i == 19 || i == 21 || i == 8 || i == 10 || i == 12 || i == 14) &&
                                                    <Grid item lg={0.5} md={0.5} sm={0.5} xs={0.5} className="bottomMargin"></Grid>
                                                }
                                            </>
                                        )
                                    })
                                    }
                                </Grid>
                            </div>
                        </StyledCard>
                    </Grid>
                </Grid>
                {/* <Box width='100%'className="box" style={{marginTop:'10px'}}>
                        <StyledCard elevation={6} style={{overflowY:'scroll',height:"402px"}}>
                            <CardHeader className="cardheader">
                                <Title>our process</Title>
                            </CardHeader>
                            <div className="divInner" style={{marginLeft:"100px"}}>
                                <Grid container >
                                    {
                                        progressStages.map((stage, i) => {
                                            if (i % 2 != 0) {
                                                isODd = isODd ? 0 : 1
                                                var newisODd = isODd
                                                console.log('isODdisODd', isODd)
                                            }
                                            return (
                                                <>
                                                    <Grid item lg={4} md={4} sm={5.4} xs={5.4} className={stageId && stageId > stage.id ? "bottomMargin singleflow pastStage" : stageId == stage.id ? "bottomMargin singleflow currentStage" : "bottomMargin singleflow"}>
                                                        <div>
                                                            <img src={processbg} />
                                                            <span>{stage.label}</span>
                                                        </div>
                                                    </Grid>
                                                    {
                                                        i % 4 == 0 ? (
                                                            <Grid item lg={1.2} md={1.2} sm={1.2} xs={1.2} className="bottomMargin flowarrow rightarrow">
                                                                <img src={rightarrow} />

                                                            </Grid>
                                                        ) : i % 2 == 0 ? (
                                                            <Grid item lg={1.2} md={1.2} sm={1.2} xs={1.2} className="bottomMargin flowarrow rightarrow">
                                                                <img src={leftarrow} />

                                                            </Grid>
                                                        ) :
                                                            i + 1 == progressStages.length ? null : (
                                                                newisODd ? (
                                                                    <>
                                                                        <Grid item lg={4} md={4} sm={5.4} xs={5.4} className="bottomMargin singleflow">

                                                                        </Grid>
                                                                        <Grid item lg={1.2} md={1.2} sm={1.2} xs={1.2} className="bottomMargin">

                                                                        </Grid>
                                                                        <Grid item lg={4} md={4} sm={5.4} xs={5.4} className="bottomMargin flowarrow bottomarrow">
                                                                            <img src={downarrow} />
                                                                        </Grid>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Grid item lg={4} md={4} sm={5.4} xs={5.4} className="bottomMargin flowarrow bottomarrow">
                                                                            <img src={downarrow} />
                                                                        </Grid>
                                                                        <Grid item lg={1.2} md={1.2} sm={1.2} xs={1.2} className="bottomMargin">

                                                                        </Grid>
                                                                        <Grid item lg={4} md={4} sm={5.4} xs={5.4} className="bottomMargin singleflow">
                                                                        </Grid>
                                                                    </>
                                                                )
                                                            )
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </Grid>
                            </div>
                        </StyledCard>
                        </Box> */}
            </Box>
            <Dialog
                onClose={handleDragDropClose}
                open={dragdropOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
                className="drapanddropdialouge"
            >
                <DialogTitle
                    id="form-dialog-title"
                    onClose={handleDragDropClose}
                >
                    REVIEW
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        className="submitContent"
                    >
                        {' '}
                        <div>Submit for review or approval?</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button
                            variant="outlined"
                            className="whitebg"
                            onClick={handleDragDropReview}
                            color="primary"
                            disabled={disableReview}
                        >
                            Review
                        </Button>
                        <Button
                            onClick={handleDragDropConfirm}
                            color="primary"
                            variant="contained"
                            className="whitebg"
                            disabled={disableApproveReject}
                        >
                            Approve
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default PipelineManagementview