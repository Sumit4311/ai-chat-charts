import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import $ from 'jquery'
import useAuth from 'app/hooks/useAuth'

import testFile from '../../image/Format reference.xlsx'
import CommercialandBusiness from '../../image/CommercialandBusiness.xlsx'
import EmployeeList from '../../image/EmployeeList.xlsx'
import Finance from '../../image/Finance.xlsx'
import zip from '../../image/zip.svg'

import NewsAndSocialMedia from '../../image/NewsAndSocialMedia.xlsx'
import Risks from '../../image/Risks.xlsx'
import Technology from '../../image/Technology.xlsx'
import PeopleCulture from '../../image/PeopleCulture.xlsx'
// import PDF from"../../../Assets/PDF.svg"
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
import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography'
import Revenue from '../../image/revenue.svg'
import ReactEcharts from 'echarts-for-react'
import Icon_countries from '../../image/Seven-countries-cohorts-menu.svg'
import Solconlogosvg from '../../image/solconlogosvg.svg'
import '../../../Assets/style.css'
import people from '../../image/people.svg'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PropTypes from 'prop-types'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import prof from '../../image/prof.svg'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import { Autocomplete } from '@mui/lab'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import IconCloudSvg from '../../image/cloudcomputing.svg'

import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { DatePicker } from '@mui/lab'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import xlsxgreen from '../../image/xlsxgreen.svg'
import PDFData from '../../image/PDFData.svg'

import {
    createBoardmember,
    getAllBoardmember,
    getSingleBoardmember,
    getvaluation,
    deleteBoardmember,
    createSchedule,
    getAllSchedule,
    createIssue,
    getdocumentsAll,
    getBoardDocuments,
    getshareholderdocs,
    uploadshareholderdocs,
    getonboardcmp,
    uploadEmployeesList,
    uploadFileFinance,
    uploadRisks,
    uploadFileCommercialProduct,
    uploadFileTechnology,
    uploadFilepeople,
    uploadFileSocialmedia,
    reportsUploadArbitary,
    uploadBoardDocuments,
    searchBoardDocuments,
} from '../../services/api'
import { yearopt } from 'app/services/CommonObject'
import {
    postDataFromApi,
    putDataFromApi,
    getDataFromApi,
    deleteDataFromApi,
} from '../../services/CommonService'
import AlertMessage from '../commoncomponent/AlertMessage'
import Slide from '@mui/material/Slide'
import sheet from '../../image/sheets.svg'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf'
import { uploadBoardDocs } from '../../services/api'
import { getFileIcon, getCommas, getFixed } from 'app/services/CommonObject'

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

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wra,p',
    alignItems: 'center',
}))

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',
    [theme.breakpoints.down('sm')]: {},
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

const SubTitle = styled('span')(() => ({
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '10px',
}))

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    color: '#FFF',
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

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

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

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))


const testing = [
    { id: 'Board Resolutions', label: 'Board Resolutions' },
    { id: 'Board Minutes', label: 'Board Minutes' },
    { id: 'Board Pack', label: 'Board Pack' },
    // { label: 'Option 4', value: 4 },
]
const testings = [
    { label: 'Investment Committee Reports', value: 1 },
    { label: 'Audit & Risk Committee Reports', value: 2 },
    { label: 'ESG Committee Reports', value: 3 },
    { label: 'Digital Advisory Council Reports', value: 4 },
    { label: 'REMCO Reports', value: 5 },
    // { label: 'Option 4', value: 4 },
]
const doctypeopt = [
    { id: 'Fixed Documents', label: 'Fixed Documents' },
    { id: 'Arbitrary', label: 'Arbitrary' },
]
const categoryopt = [
    { id: 'Commercial & Business', label: 'Commercial & Business' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Technology', label: 'Technology' },
    { id: 'People & Culture', label: 'People & Culture' },
    // { id: "Shareholder Repository", label: "Shareholder Repository" },
    { id: 'Employees List', label: 'Employees List' },
    {
        id: 'Regulatory & Compliance',
        label: 'Regulatory & Compliance',
        mainmenu: 'others',
    },
    { id: 'ESG', label: 'ESG', mainmenu: 'others' },
    { id: 'Risks', label: 'Risks', mainmenu: 'others' },
    {
        id: 'News & Social Media',
        label: 'News & Social Media',
        mainmenu: 'others',
    },
]
const testingss = [
    { label: 'Monthly Management Accounts', value: 1 },
    { label: 'CEO Reports', value: 2 },
    { label: 'CFO Reports', value: 3 },
    { label: 'CIO Reports', value: 4 },
    { label: 'CTO Reports', value: 5 },
    // { label: 'Option 4', value: 4 },
]
const testingsss = [
    { label: 'Valuation Report', value: 1 },
    { label: 'Equity Value', value: 2 },
    { label: 'Asset Cover Ratio', value: 3 },
    { label: 'Detailed Valuation Report', value: 4 },
    // { label: 'CTO Reports', value: 5 },
    // { label: 'Option 4', value: 4 },
]
const periodopt = [
    // { id: 1, label: "Financial Year" },
    { id: 'Q1', label: 'Quarter 1' },
    { id: 'Q2', label: 'Quarter 2' },
    { id: 'Q3', label: 'Quarter 3' },
    { id: 'Q4', label: 'Quarter 4' },
    // { id: 6, label: "Months" },
]

const subscribarList = [
    {
        id: '1',
        name: 'Adam Taylor',
        joiningDate: '22-05-2020',
        department: 'Account',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Google',
        joiningDate: '02-03-2019',
        department: 'Marketing',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Inactive',
    },
    {
        id: '3',
        name: 'John Dolor',
        joiningDate: '15-02-2019',
        department: 'Sales',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Pending',
    },
    {
        id: '4',
        name: 'Sit Ipsum',
        joiningDate: '10-05-2018',
        department: 'Designing',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Cancelled',
    },
    {
        id: '5',
        name: 'French Marc',
        joiningDate: '22-03-2018',
        department: 'Testing',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Active',
    },
    {
        id: '6',
        name: 'Asley Huda',
        joiningDate: '18-12-2017',
        department: 'Developer',
        email: 'test@demo.com',
        phoneNumber: '+91 9876543210',
        status: 'Cancelled',
    },
]

const genderopt = [
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' },
    { id: 3, label: 'Other' },
]

const statusopt = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
    { id: 3, label: 'Pending' },
    { id: 4, label: 'Cancelled' },
]

const countryopt = [
    { id: 1, label: 'India' },
    { id: 2, label: 'Australia' },
    { id: 3, label: 'USA' },
    { id: 3, label: 'Canada' },
]

const cityopt = [
    { id: 1, label: 'Surat' },
    { id: 2, label: 'Mumbai' },
    { id: 3, label: 'Ahmedabad' },
    { id: 3, label: 'Pune' },
]
const quarteropt = [
    { id: "Q1", label: 'Quarter 1' },
    { id: "Q2", label: 'Quarter 2' },
    { id: "Q3", label: 'Quarter 3' },
    { id: "Q4", label: 'Quarter 4' },
]

const meetingcategoryopt = [
    { id: 1, label: 'Meeting, Conference, Private, Event, Project etc' },
]

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

const Shareholderrepository = () => {
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        membername: '',
        memberemail: '',
        memberphone: '',
        age: '',
        gender: '',
        status: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        meetingtitle: '',
        endtime: '',
        starttime: '',
        members: '',
        meetingdesc: '',
        meetingcategory: '',
        startDate: '',
        endDate: '',
        boardFilter_Period: '',
        boardFilter_Documenttype: '',
        boardFilter_Year: '',
        boardDocument_Type: '',
        boardDocument_Quarter: '',
        boardDocument_Year: currentyear.toString(),
        boardDocument_File:'',
        committeeFilter_Doctype:'',
        file: '',
        year: currentyear.toString(),

    })
    const [open, setOpen] = useState(false)
    const [openBoardDocument, setOpenBoardDocument] = useState(false)
    const [meetingopen, setmeetingopen] = useState(false)
    const [dateopen, setdateOpen] = useState(false)
    const [boardDocDate, setBoardDocDate] = useState(false)
    const [uploadedFiles, setuploadedFiles] = useState([])
    const [companyOption, setCompanyOption] = useState([])
    const [isCompanyLoaded, setIsCompanyLoaded] = useState(true)
    const user = useAuth()
    const [allActivecmp, setallActivecmp] = useState([])
    const [value, setValue] = React.useState(0)
    const [state, setState] = useState({
        checkedA: true,
    })
    let { companyId } = useParams()
    // const  companyId = 'F284b8e8-A0d8-44bd-Ba31-631ab2520425';
    const [allBoardmember, setallBoardmember] = useState([])
    const [valuationMember, setValuationMember] = useState([])
    const [docsList, setDocsList] = useState([])
    const [boardDocumentList, setBoardDocumentList] = useState([])
    const [shareholderdocsList, setshareholderdocsList] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [allSchedule, setallSchedule] = useState([])
    const [detailsopen, setdetailsopen] = useState(false)
    const [singleBoardmember, setsingleBoardmember] = useState([])
    const [is_singledetails, setis_singledetails] = useState(false)
    const [enddateopen, setenddateOpen] = useState(false)
    const [myEventsList, setmyEventsList] = useState([])
    const [pdfOpen, setpdfOpen] = useState(false)
    const [equityPdfOpen, setEquityPdfOpen] = useState(false)
    const [assetPdfOpen, setAssetPdfOpen] = useState(false)
    var companyLabel = ''
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    function confirm() {
        setalert(false)
        setis_singledetails(false)
    }

    const handleDetailsmenu = async (detailsid) => {
        if (detailsid) {
            var query = ''
            const response = await getDataFromApi(
                getSingleBoardmember + detailsid,
                1
            )
            if (response && response.status == 200 && response.data != null) {
                setsingleBoardmember(response.data)
                console.log('single borad member data', response)
                setis_singledetails(true)
            }
        }
        setdetailsopen(true)
    }
    const handleOpenBoardDocument = () => {
        setOpenBoardDocument(true)

    }
    function handleCloseBoardDocument() {
        setOpenBoardDocument(false)
        setdetailsopen(false)
        setFormData((formData) => ({
            ...formData,
            boardDocument_Type: '',
            boardDocument_Quarter: '',
            boardDocument_Year: currentyear.toString(),
            boardDocument_File:''
        }))
        setuploadedFiles([])
    }
    useEffect(() => {
        getallActivecmp()
    }, [])
    const filterList = () => {
        let querystring = ''
        if (companyId) {
            querystring += querystring
                ? '&company=' + companyId
                : 'company=' + companyId
        }
        if (formdata.boardFilter_Period) {
            querystring += querystring
                ? '&quarter=' + formdata.boardFilter_Period
                : 'quarter=' + formdata.boardFilter_Period
        }
        if (formdata.boardFilter_Documenttype) {
            querystring += querystring
                ? '&shareholderdoctype=' + formdata.boardFilter_Documenttype
                : 'shareholderdoctype=' + formdata.boardFilter_Documenttype
        }
        if (formdata.boardFilter_Year) {
            querystring += querystring
                ? '&year=' + formdata.boardFilter_Year
                : 'year=' + formdata.boardFilter_Year
        }
        return querystring ? '?' + querystring : ''
    }
    useEffect(() => {
        if (value == 3 ||value == 4 ||value == 5||value == 6 ) {
            toGetBoardDocuments()
        }
    }, [value])
    const toGetBoardDocuments = async () => {
        var querystring = filterList()
        // var quesrystring = "?companyId=" + companyId + 
        // '&shareholderdoctype=' + formdata.boardDocumenttype + 
        // '&quarter=' + formdata.boardPeriod + '&year=' + formdata.boardYear
        const response = await getDataFromApi(searchBoardDocuments + querystring, 1, '')
        if (response && response?.status == 200 && response?.data != null) {
            setBoardDocumentList(response.data)
        } else {
            console.log(response)
        }

    }
    const handleUploadBoardDoc = async () => {
     
        console.log('fileee-', formdata)
        var payload = new FormData()
        payload.append('companyId', companyId)
        payload.append('quarter', formdata.boardDocument_Quarter)
        payload.append('year', formdata.boardDocument_Year)
        payload.append('document', formdata.boardDocument_File)
        payload.append('shareholderdoctype', formdata.boardDocument_Type)
        // const payload1 = { 
        //     companyId: companyId,
        //     quarter: formdata.boardPeriod,
        //     year: formdata.year,
        //     document: formdata.file,
        //     shareholderdoctype: formdata.boardDocumenttype
        // }
        console.log(formdata, "formdata====")
        const response = await postDataFromApi(uploadBoardDocuments, payload, 1, '', 1)
        console.log(response, "resss====")
        if (response && response.status == 200) {
            setalertMessage(
                response.message
                    ? response.message
                    : 'file is uploaded successfully'
            )
            setalert(true)
            setalertType('success')
            setuploadedFiles([])
        }
    }
    const getallActivecmp = async () => {
        const response = await getDataFromApi(
            getonboardcmp + `?userId=${user?.user?.id}`,
            1,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setallActivecmp(response.data)
            if (localStorage.getItem('userRole') === 'Company Admin') {
                const companyDetails = { id: response?.data[0]?.companyVo?.id, label: response?.data[0]?.companyName }
                setCompanyOption([companyDetails])
                console.log(companyDetails, "companyDetails ")
            }
            else {
                var comOpt = []
                response?.data?.map((opt) => {
                    var cp = {}
                    cp['id'] = opt.id
                    cp['label'] = opt.companyName
                    //    comOpt.push(cp)
                    if (
                        user.roles === 'Company Admin' ||
                        user.roles === 'Company User'
                    ) {
                        let emails = opt?.companyVo?.dealTeams.split(',')
                        if (emails.includes(user.email)) {
                            comOpt.push(cp)
                        }
                    } else {
                        comOpt.push(cp)
                    }

                })
                setCompanyOption(comOpt)
            }
            setIsCompanyLoaded(false)
            setTimeout(() => {
                setIsCompanyLoaded(true)
            }, 1)
        }
    }
    const handleDeleteConfirm = async (e) => {
        console.log('delete_id', delete_id)
        var query = ''
        var response = ''
        response = await deleteDataFromApi(deleteBoardmember + delete_id, 1)

        if (response && response.status == 200) {
            getallBoardmember()
            setDeleteId('')
            setDeleteOpen(false)
            setOpen(false)
            setalertMessage('Board member created successfully')
            setalert(true)
            setalertType('success')
        } else {
            getallBoardmember()
            setDeleteId('')
            setDeleteOpen(false)
            setOpen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
        }

        /*if (response.data.code) {
                setDeleteId('')
                setalertMessage(response.data.message)
                setalert(true)
                setalertType('success')
            } else {
                setalertMessage(response.data.message)
                setalert(true)
                setalertType('error')
                setDeleteId('')
        }*/
    }

    function handlePDFClose() {
        setpdfOpen(false)
    }
    function handlePDFOpen() {
        setpdfOpen(true)
    }
    function handleEquityPDFClose() {
        setEquityPdfOpen(false)
    }
    function handleEquityPDFOpen() {
        setEquityPdfOpen(true)
    }
    function handleAssetPDFClose() {
        setAssetPdfOpen(false)
    }
    function handleAssetPDFOpen() {
        setAssetPdfOpen(true)
    }
    function handlePDFConfirm() {
        const input = document.getElementById('pdfid')
        const pdf = new jsPDF({ unit: 'px', format: 'letter', userUnit: 'px' })
        pdf.html(input, { html2canvas: { scale: 0.3 } }).then(() => {
            /*  var img = new Image()
             img.src = Solconlogosvg
             pdf.addImage(img, 'svg', 0, 0, 0, 15) */
            pdf.save('shareholderreport.pdf')
        })
    }

    function handleDeleteClose() {
        setDeleteOpen(false)
        setDeleteId('')
    }
    function handleDeleteOpen(id) {
        setDeleteOpen(true)
        setDeleteId(id)
    }

    const handlecheckChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleDateChange = (date, name) => {
        const momentdate = moment(date)
        var newdate = momentdate.format('Y-MM-DD')
        setFormData((formData) => ({
            ...formData,
            [name]: newdate,
        }))
    }
    const handleDateChanges = (date) => {
        var year = new Date(date)
        year = year.getFullYear().toString()
        setFormData((formData) => ({
            ...formData,
            boardDocument_Year: year,
        }))
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }
    const onFileChange = async (event, type) => {
        var file = event.target.files[0]
        setFormData((formData) => ({
            ...formData,
            boardDocument_File: file,
        }))
        if (uploadedFiles) {
            uploadedFiles.splice(0, 1)
        }
        if (file) {
            var data = {
                name: file.name,
                size: file.size,
            }
            uploadedFiles.push(data)
        }
    }

    // const uploadDocument = async (file, type) => {
    //     var formData = new FormData()
    //     formData.append('document', file)
    //     formData.append('companyId', companyId)
    //     var response = ''
    //     if (type == 'board') {
    //         response = await postDataFromApi(uploadBoardDocs, formData, 1)
    //     } else {
    //         response = await postDataFromApi(uploadshareholderdocs, formData, 1)
    //     }
    //     if (response && response.status == 200) {
    //         setalertMessage(
    //             response.message
    //                 ? response.message
    //                 : 'file is uploaded successfully'
    //         )
    //         setalert(true)
    //         setalertType('success')
    //         setuploadedFiles([])
    //         if (type == 'board') {
    //             getdocumentsList()
    //         } else {
    //             getshareholderdocsList()
    //         }
    //         // getFileNames()
    //     } else {
    //         setalertMessage('error uploading file')
    //         setalert(true)
    //         setalertType('error')
    //     }
    // }

    const handleSubmit = (event) => { }

    const handleSubmitIssues = async (e) => {
        var newformdata = {
            name: formdata.name,
            email: formdata.email,
            phoneNumber: formdata.phone,
            subject: formdata.subject,
            message: formdata.message,
            companyId: companyId,
        }
        console.log('newformdata', newformdata)
        var response = ''
        response = await postDataFromApi(createIssue, newformdata, 1)
        console.log('edit response', response)
        if (response && response.status == 200) {
            setOpen(false)
            setalertMessage('Issue submitted successfully')
            setalert(true)
            setalertType('success')
        } else {
            setOpen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
        }
    }

    const handleSubmitSchedule = async (e) => {
        var newformdata = {
            title: formdata.meetingtitle,
            category: formdata.meetingcategory,
            startDate: formdata.startDate,
            endDate: formdata.endDate,
            startTime: formdata.starttime,
            endTime: formdata.endtime,
            description: formdata.meetingdesc,
            participants: formdata.members,
            notify: state.checkedA,
            companyId: companyId,
        }
        console.log('newformdata', newformdata)
        var response = ''
        response = await postDataFromApi(createSchedule, newformdata, 1)
        console.log('edit response', response)
        if (response && response.status == 200) {
            setOpen(false)
            setmeetingopen(false)
            setalertMessage('Schedule created successfully')
            setalert(true)
            setalertType('success')
            getallSchedule()
        } else {
            setOpen(false)
            setmeetingopen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
            getallSchedule()
        }
    }
    const handleSubmitBoardmember = async (e) => {
        console.log(formdata)
        var newformdata = {
            name: formdata.membername,
            email: formdata.memberemail,
            phoneNumber: formdata.memberphone,
            gender: formdata.gender,
            age: formdata.age,
            status: formdata.status,
            address: formdata.address,
            city: formdata.city,
            state: formdata.state,
            country: formdata.country,
            zip: formdata.zipcode,
            joiningDate: '',
            companyId: companyId,
        }
        console.log('newformdata', newformdata)
        var response = ''
        /* if(is_edit){
            response =  await postDataFromApi('masters/allMasters/updateCityMasters/'+edit_id, formdata);
        }
        else{ */
        response = await postDataFromApi(createBoardmember, newformdata, 1)
        /* } */
        console.log('edit response', response)
        if (response && response.status == 200) {
            getallBoardmember()

            setOpen(false)
            setalertMessage('Board member created successfully')
            setalert(true)
            setalertType('success')
        } else {
            getallBoardmember()
            setOpen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
        }
    }

    useEffect(() => {
        getallBoardmember()
        getvaluationmember()
        getallSchedule()
        getdocumentsList()
        getshareholderdocsList()
    }, [companyId])


    const getallBoardmember = async () => {
        var query = ''
        const response = await getDataFromApi(getAllBoardmember + companyId, 1)
        if (response && response.status == 200 && response.data != null) {
            setallBoardmember(response.data)
            console.log('allBoardmember data', response.data)
        }
    }
    const getvaluationmember = async () => {
        var query = ''
        const response = await getDataFromApi(
            getvaluation + `?companyId=${companyId}`,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setValuationMember(response.data)
            console.log('getvaluation', response.data)
        }
    }
    const getdocumentsList = async () => {
        const response = await getDataFromApi(
            getBoardDocuments + '?company=' + companyId,
            1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setDocsList(response.data)
            console.log('DocsList', response)
        } else {
            console.log(response)
        }

    }
    const getshareholderdocsList = async () => {
        const response = await getDataFromApi(
            getshareholderdocs + '?company=' + companyId,
            1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setshareholderdocsList(response?.data)
        } else {
            console.log(response)
        }
    }

    const getallSchedule = async () => {
        var query = ''
        var startDate = currentyear + '-01-01'
        var endDate = '-12-31'
        const response = await getDataFromApi(
            getAllSchedule +
            '?startDate=' +
            startDate +
            '&&endDate=' +
            endDate +
            '&&company=' +
            companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setallSchedule(response.data)
            var myEventsListopts = []
            response.data.map((myEventsList, i) => {
                var et = []
                et['id'] = myEventsList.id
                et['title'] = myEventsList.title
                et['start'] = new Date(myEventsList.startDate)
                et['end'] = new Date(myEventsList.endDate)
                et['description'] = myEventsList.description
                myEventsListopts.push(et)
            })
            setmyEventsList(myEventsListopts)

            /* const myEventsList= [
                {
                  'title': 'All Day Event very long title',
                  'allDay': true,
                  'start': new Date(2022, 3, 0),
                  'end': new Date(2022, 3, 1)
                },
                {
                  'title': 'Long Event',
                  'start': new Date(2022, 3, 7),
                  'end': new Date(2022, 3, 10)
                },
              
                {
                  'title': 'DTS STARTS',
                  'start': new Date(2022, 2, 13, 0, 0, 0),
                  'end': new Date(2022, 2, 20, 0, 0, 0)
                },
              
                {
                  'title': 'DTS ENDS',
                  'start': new Date(2022, 10, 6, 0, 0, 0),
                  'end': new Date(2022, 10, 13, 0, 0, 0)
                },
              
                {
                  'title': 'Some Event',
                  'start': new Date(2022, 3, 9, 0, 0, 0),
                  'end': new Date(2022, 3, 9, 0, 0, 0)
                },
                {
                  'title': 'Conference',
                  'start': new Date(2022, 3, 11),
                  'end': new Date(2022, 3, 13),
                  desc: 'Big conference for important people'
                },
                {
                  'title': 'Meeting',
                  'start': new Date(2022, 5, 12, 10, 30, 0, 0),
                  'end': new Date(2022, 5, 12, 12, 30, 0, 0),
                  desc: 'Pre-meeting meeting, to prepare for the meeting'
                },
              ] */
        }
    }

    function handleClose() {
        setOpen(false)
        setmeetingopen(false)
        setdetailsopen(false)
        setsingleBoardmember([])
    }

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClickmeetingOpen() {
        setmeetingopen(true)
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
    }

    //     const fileExtension = docsList.filename.split('.').pop()
    // var imagePdf;
    // if (fileExtension === 'pdf') {
    //     imagePdf = 'PDF'
    //   } else if (fileExtension === 'png') {
    //     imagePdf = 'PDF'
    //   }
    function getSelectedItem(id, data = [], multiple = '', label = '') {
        const item = data.find((opt) => {
            if (label) {
                if (opt.label == id) return opt
            } else {
                if (opt.id == id) return opt
            }
        })

        if (multiple) {
            return item || []
        } else {
            return item || null
        }
    }
    const handleSubmitBoardDoc = async (event) => {
        if (!formdata.file) {
            setalertMessage('Please choose file')
            setalert(true)
            setalertType('error')
            return false
        }
        var formData = new FormData()
        formData.append('companyId', formdata.company)
        formData.append(
            'quarter',
            formdata.quarter
        )
        // formData.append(
        //     'year',
        //     edit || view ? formdata.year : formdata.year.getFullYear()
        // )
        formData.append(
            'year',
            formdata.year
        )
        formData.append('userId', localStorage.getItem('id'))
        var response = ''
        if (
            formdata.documenttype == 'Arbitrary' ||
            formdata.category == 'ESG' ||
            formdata.category == 'Regulatory & Compliance'
        ) {
            formData.append('documentType', formdata.documenttype)
            formData.append('report', formdata.file)
            formData.append('category', formdata.category)
            response = await postDataFromApi(
                reportsUploadArbitary,
                formData,
                1,
                '',
                1
            )
        } else {
            formData.append('filereport', formdata.file)
            if (formdata.category == 'Finance') {
                response = await postDataFromApi(
                    uploadFileFinance,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'Risks') {
                response = await postDataFromApi(
                    uploadRisks,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'Commercial & Business') {
                response = await postDataFromApi(
                    uploadFileCommercialProduct,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'Technology') {
                response = await postDataFromApi(
                    uploadFileTechnology,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'People & Culture') {
                response = await postDataFromApi(
                    uploadFilepeople,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'News & Social Media') {
                response = await postDataFromApi(
                    uploadFileSocialmedia,
                    formData,
                    1,
                    '',
                    1
                )
            } else if (formdata.category == 'Employees List') {
                response = await postDataFromApi(
                    uploadEmployeesList,
                    formData,
                    1,
                    '',
                    1
                )
            }
        }

        if (response && response.status == 200) {
            setalertMessage(
                response.message
                    ? response.message
                    : 'file is uploaded successfully'
            )
            setalert(true)
            setalertType('success')
            setuploadedFiles([])
        }

    }
    const downloadLinks = {
        'Commercial & Business': CommercialandBusiness,
        'Employees List': EmployeeList,
        'Finance': Finance,
        'News & Social Media': NewsAndSocialMedia,
        'Risks': Risks,
        'Technology': Technology,
        'People & Culture': PeopleCulture,
    }
    const downloadLink = downloadLinks[formdata.category] || testFile

    function removeUploadedFile() {
        setuploadedFiles([])
        //uploadedFiles.splice(0,1)
        formdata['boardDocument_File'] = null
        $(".fileuploadBox.documentfileupload input[type='file']").val(null)
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Shareholder Repository' }]}
                />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                    Others / Shareholder Repository{' '}
                </div>
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="whitebg customwidth"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTabScrollButton-root': {
                        color: 'white', // Change the color here
                    },
                }}
            //   aria-label="scrollable auto tabs example"
            >
                <Tab label="Time Table" />
                <Tab label="Issue" />
                <Tab label="Board Members" />
                <Tab label="Board Documents" />
                <Tab label="Committee Reports" />
                <Tab label="Management Reports" />
                <Tab label="Shareholder reports" />
            </Tabs>
            <TabPanel
                value={value}
                index={0}
                className="tabpanel nopadding notclear"
            >
                <div className="rightalign_btn">
                    <Button
                        variant="contained"
                        color="primary"
                        className="whitebg"
                        onClick={handleClickmeetingOpen}
                    >
                        + Schedule
                    </Button>
                </div>
            </TabPanel>
            <TabPanel
                value={value}
                index={2}
                className="tabpanel nopadding notclear"
            >
                <div className="rightalign_btn">
                    <Button
                        variant="contained"
                        color="primary"
                        className="whitebg"
                        onClick={handleClickOpen}
                    >
                        Add Member
                    </Button>
                </div>
            </TabPanel>
            <TabPanel
                value={value}
                index={3}
                className="tabpanel nopadding notclear "
            >
                <div className="rightalign_btn">
                    <Button
                        variant="contained"
                        color="primary"
                        className="whitebg icon document-upload"
                        onClick={handleOpenBoardDocument}
                    >
                        <Icon fontSize="medium">backup</Icon> Upload Document
                    </Button>
                </div>
            </TabPanel>
            <div className="uploaddoc">
                <TabPanel
                    value={value}
                    index={4}
                    className="tabpanel nopadding notclear "
                >
                    <div className="rightalign_btn">
                        <Button
                            variant="contained"
                            color="primary"
                            className="whitebg icon document-upload"
                            onClick={handleOpenBoardDocument}
                        >
                            <Icon fontSize="medium">backup</Icon> Upload Document
                        </Button>

                    </div>
                </TabPanel>
                <TabPanel
                    value={value}
                    index={5}
                    className="tabpanel nopadding notclear "
                >
                    <div className="rightalign_btn">
                        <Button
                            variant="contained"
                            color="primary"
                            className="whitebg icon document-upload"
                            onClick={handleOpenBoardDocument}
                        >
                            <Icon fontSize="medium">backup</Icon> Upload Document
                        </Button>

                    </div>
                </TabPanel>
                {/* <TabPanel
                    value={value}
                    index={5}
                    className="tabpanel nopadding notclear"
                >
                    <div className="rightalign_btn">
                        <div className="uploadImg withTextfield uploadClass">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => onFileChange(e, 'shareholder')}
                            />
                            <Icon
                                style={{ marginTop: '8.5px' }}
                                fontSize="medium"
                            >
                                backup
                            </Icon>
                            Upload Document
                        </div>
                    </div>
                </TabPanel> */}
                <TabPanel
                    value={value}
                    index={6}
                    className="tabpanel nopadding notclear "
                >
                    <div className="rightalign_btn">
                        <Button
                            variant="contained"
                            color="primary"
                            className="whitebg icon document-upload"
                            onClick={handleOpenBoardDocument}
                        >
                            <Icon fontSize="medium">backup</Icon> Upload Document
                        </Button>

                    </div>
                </TabPanel>
            </div>
            <TabPanel
                value={value}
                index={0}
                className="tabpanel  nopadding calndertab"
            >
                <div className="tabpanelInner">
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} className="tabpanel nopadding">
                <div className="tabpanelInner">
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCard elevation={6} className="paddingbottom">
                                <CardHeader className="cardheader">
                                    <Title>Send your issues</Title>
                                </CardHeader>
                                <ValidatorForm
                                    onSubmit={handleSubmitIssues}
                                    onError={() => null}
                                    className="customform fullwidth padding"
                                >
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Name</label>
                                            <TextField
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formdata.name || ''}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                label="Enter name"
                                                placeholder="Enter name"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Email Id</label>
                                            <TextField
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={formdata.email || ''}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                label="Enter email id"
                                                placeholder="Enter email id"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Phone Number</label>
                                            <TextField
                                                fullWidth
                                                label="Enter phone number"
                                                ceholder="Enter phone number"
                                                type="text"
                                                name="phone"
                                                value={formdata.phone || ''}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Subject</label>
                                            <TextField
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                value={formdata.subject || ''}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                label="Enter subject"
                                                placeholder="Enter subject"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Message</label>
                                            <TextField
                                                type="text"
                                                name="message"
                                                id="message"
                                                value={formdata.message || ''}
                                                onChange={(e) =>
                                                    formdatavaluechange(e)
                                                }
                                                label="Enter your text here...."
                                                placeholder="Enter your text here...."
                                                multiline
                                                rows={8}
                                            />
                                        </Grid>
                                        <div className="formbuttons">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="whitebg"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                className="whitebg"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Grid>
                                </ValidatorForm>
                            </StyledCard>
                        </Grid>
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} className="tabpanel nopadding">
                <div className="tabpanelInner">
                    <StyledCard elevation={6} className="paddingbottom">
                        <CardHeader className="cardheader nomarginBottom">
                            <Title>Board Members</Title>
                        </CardHeader>
                    </StyledCard>
                    <div className="table_scroll">
                        <StyledTable className="customtable odd-even withborder">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Member Name</TableCell>
                                    <TableCell>Email Id</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Join date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allBoardmember.map((member, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {member.id}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className="imgCell"
                                        >
                                            <span>
                                                <img src={prof} />
                                                {member.name}
                                            </span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {member.email}
                                        </TableCell>
                                        <TableCell align="left">
                                            {member.phoneNumber}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={
                                                member.status
                                                    ? statusopt.map((opt) => {
                                                        if (
                                                            opt.id ==
                                                            member.status
                                                        )
                                                            return opt.label
                                                    })
                                                    : ''
                                            }
                                        >
                                            {member.status
                                                ? statusopt.map((opt) => {
                                                    if (
                                                        opt.id ==
                                                        member.status
                                                    )
                                                        return (
                                                            <span>
                                                                {opt.label}
                                                            </span>
                                                        )
                                                })
                                                : ''}
                                        </TableCell>
                                        <TableCell align="left">
                                            {member.joiningDate}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Tooltip
                                                title="View"
                                                fontSize="large"
                                                onClick={() =>
                                                    handleDetailsmenu(member.id)
                                                }
                                            >
                                                <Icon fontSize="large">
                                                    remove_red_eye
                                                </Icon>
                                            </Tooltip>
                                            <Tooltip
                                                title="Edit"
                                                fontSize="large"
                                            >
                                                <Icon fontSize="large">
                                                    mode_edit
                                                </Icon>
                                            </Tooltip>
                                            <Tooltip
                                                title="Delete"
                                                fontSize="large"
                                                onClick={() =>
                                                    handleDeleteOpen(member.id)
                                                }
                                            >
                                                <Icon fontSize="large">
                                                    delete
                                                </Icon>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3} className="tabpanel">
                <Box width="100%" className="box">
                    <StyledCard elevation={6} className="searchdiv">
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={() => null}
                            className="leadsearch customform"
                        >
                            <Grid container spacing={3} className="testetest">
                                <Grid item lg={3} md={3} sm={6} xs={6}>
                                    <label>Document Type</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={testing}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'boardFilter_Documenttype',
                                                value
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.boardFilter_Documenttype}
                                                name="searchDocumenttype"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <label>Period</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={quarteropt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'boardFilter_Period',
                                                value
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.boardFilter_Period}
                                                name="searchPeriod"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <label>Year</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={yearopt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue('boardFilter_Year', value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.boardFilter_Year || ''}
                                                name="searchYear"
                                                placeholder="Select"
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required',
                                                ]}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={1} md={1} sm={6} xs={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="whitebg"
                                        onClick={toGetBoardDocuments}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </StyledCard>
                </Box>
                {/* <SubTitle>Document Lt</SubTitle> */}
                <div className="tabpanelInner">
                    <Grid container spacing={1} className="folderGrid">
                        {boardDocumentList.map((boardDocfiles, index) => (
                            <Grid
                                item
                                className="border-grid-docs"
                                lg={3.6}
                                md={3.6}
                                sm={4}
                                xs={12}
                                onClick={() =>
                                    window.open(boardDocfiles.presignedurl, '_blank')
                                }
                            >
                                <div className="fullfolder">
                                    <div className="img-para">
                                        <img src={getFileIcon(boardDocfiles.filename)} />
                                        <Typography className="filenamedocs">
                                            {boardDocfiles.filename}
                                        </Typography>
                                    </div>
                                    <div className="folderfileDetail">
                                        {boardDocfiles.uploadDate}
                                    </div>
                                    {/* {file.filesize + 'KB'} {file.documentType} */}
                                    {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel value={value} index={4} className="tabpanel">
                <Box width="100%" className="box">
                    <StyledCard elevation={6} className="searchdiv">
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={() => null}
                            className="leadsearch customform"
                        >
                            <Grid container spacing={3} className="testetest">
                                <Grid item lg={3} md={3} sm={6} xs={6}>
                                    <label>Document Type</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={testings}

                                        // getOptionLabel={(option) => option.label}
                                        // onChange={(event, value) =>
                                        //     changedropdownvalue(
                                        //         'searchDocumenttype',
                                        //         value
                                        //     )
                                        // }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                // value={formdata.searchDocumenttype}
                                                name="searchDocumenttype"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <label>Period</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={periodopt}

                                        // getOptionLabel={(option) => option.label}
                                        // onChange={(event, value) =>
                                        //     changedropdownvalue(
                                        //         'searchPeriod',
                                        //         value
                                        //     )
                                        // }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                // value={formdata.searchPeriod}
                                                name="searchPeriod"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <label>Year</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={yearopt}

                                        // getOptionLabel={(option) => option.label}
                                        // onChange={(event, value) =>
                                        //     changedropdownvalue('searchYear', value)
                                        // }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.searchYear || ''}
                                                name="searchYear"
                                                placeholder="Select"
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required',
                                                ]}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={1} md={1} sm={6} xs={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="whitebg"
                                    // onClick={getFileNames}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </StyledCard>
                </Box>
                {/* <SubTitle>Document Lt</SubTitle> */}
                <div className="tabpanelInner">
                    <Grid container spacing={1} className="folderGrid">
                        {docsList.map((file, index) => (
                            //     <Grid item className='border-grid-docs' lg={4} md={4} sm={4} xs={12} onClick={() => window.open(file.presignedurl, "_blank")}>
                            //         <div className="singlefilefol">
                            //             <div className="folderfileName"><Icon fontSize="medium"><img src={xlsxgreen} /></Icon> <span>{file.filename}</span></div>
                            //             <div className="folderfileDetail">{file.uploadDate}</div>
                            //             {/* {file.filesize + 'KB'} {file.documentType} */}
                            //             {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                            //         </div>
                            //     </Grid>
                            // ))}
                            <Grid
                                item
                                className="border-grid-docs"
                                lg={3.6}
                                md={3.6}
                                sm={4}
                                xs={12}
                                onClick={() =>
                                    window.open(file.presignedurl, '_blank')
                                }
                            >
                                <div className="fullfolder">
                                    <div className="img-para">
                                        <img src={getFileIcon(file.filename)} />

                                        <Typography className="filenamedocs">
                                            {file.filename}
                                        </Typography>
                                    </div>
                                    <div className="folderfileDetail">
                                        {file.uploadDate}
                                    </div>
                                    {/* {file.filesize + 'KB'} {file.documentType} */}
                                    {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel value={value} index={5} className="tabpanel">
                {/* <SubTitle>Document Lt</SubTitle> */}
                <div className="tabpanelInner">
                    <Grid container spacing={1} className="folderGrid">
                        <Box width="100%" className="box">
                            <StyledCard elevation={6} className="searchdiv">
                                <ValidatorForm
                                    onSubmit={handleSubmit}
                                    onError={() => null}
                                    className="leadsearch customform"
                                >
                                    <Grid container spacing={3} className="testetest">
                                        <Grid item lg={3} md={3} sm={6} xs={6}>
                                            <label>Document Type</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={testingss}


                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue(
                                                //         'searchDocumenttype',
                                                //         value
                                                //     )
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        // value={formdata.searchDocumenttype}
                                                        name="searchDocumenttype"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={6} xs={6}>
                                            <label>Period</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={periodopt}

                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue(
                                                //         'searchPeriod',
                                                //         value
                                                //     )
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        // value={formdata.searchPeriod}
                                                        name="searchPeriod"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={6} xs={6}>
                                            <label>Year</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={yearopt}

                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue('searchYear', value)
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={formdata.searchYear || ''}
                                                        name="searchYear"
                                                        placeholder="Select"
                                                        validators={['required']}
                                                        errorMessages={[
                                                            'this field is required',
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={1} sm={6} xs={6}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="whitebg"
                                            // onClick={getFileNames}
                                            >
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </StyledCard>
                        </Box>
                        {docsList.map((file, index) => (
                            //     <Grid item className='border-grid-docs' lg={4} md={4} sm={4} xs={12} onClick={() => window.open(file.presignedurl, "_blank")}>
                            //         <div className="singlefilefol">
                            //             <div className="folderfileName"><Icon fontSize="medium"><img src={xlsxgreen} /></Icon> <span>{file.filename}</span></div>
                            //             <div className="folderfileDetail">{file.uploadDate}</div>
                            //             {/* {file.filesize + 'KB'} {file.documentType} */}
                            //             {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                            //         </div>
                            //     </Grid>
                            // ))}
                            <Grid
                                item
                                className="border-grid-docs"
                                lg={3.6}
                                md={3.6}
                                sm={4}
                                xs={12}
                                onClick={() =>
                                    window.open(file.presignedurl, '_blank')
                                }
                            >
                                <div className="fullfolder">
                                    <div className="img-para">
                                        <img src={getFileIcon(file.filename)} />

                                        <Typography className="filenamedocs">
                                            {file.filename}
                                        </Typography>
                                    </div>
                                    <div className="folderfileDetail">
                                        {file.uploadDate}
                                    </div>
                                    {/* {file.filesize + 'KB'} {file.documentType} */}
                                    {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                </div>
            </TabPanel>
            <TabPanel
                value={value}
                index={6}
                className="tabpanel shareholder_report"
            >
                <div className="tabpanelInner">
                    <Grid container spacing={1} className="folderGrid">
                        <Box width="100%" className="box">
                            <StyledCard elevation={6} className="searchdiv">
                                <ValidatorForm
                                    onSubmit={handleSubmit}
                                    onError={() => null}
                                    className="leadsearch customform"
                                >
                                    <Grid container spacing={3} className="testetest">
                                        <Grid item lg={3} md={3} sm={6} xs={6}>
                                            <label>Document Type</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={testingsss}



                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue(
                                                //         'searchDocumenttype',
                                                //         value
                                                //     )
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        // value={formdata.searchDocumenttype}
                                                        name="searchDocumenttype"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={6} xs={6}>
                                            <label>Period</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={periodopt}
                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue(
                                                //         'searchPeriod',
                                                //         value
                                                //     )
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        // value={formdata.searchPeriod}
                                                        name="searchPeriod"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={6} xs={6}>
                                            <label>Year</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={yearopt}
                                                // getOptionLabel={(option) => option.label}
                                                // onChange={(event, value) =>
                                                //     changedropdownvalue('searchYear', value)
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={formdata.searchYear || ''}
                                                        name="searchYear"
                                                        placeholder="Select"
                                                        validators={['required']}
                                                        errorMessages={[
                                                            'this field is required',
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={1} sm={6} xs={6}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="whitebg"
                                            // onClick={getFileNames}
                                            >
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </StyledCard>
                        </Box>
                        {docsList.map((file, index) => (
                            //     <Grid item className='border-grid-docs' lg={4} md={4} sm={4} xs={12} onClick={() => window.open(file.presignedurl, "_blank")}>
                            //         <div className="singlefilefol">
                            //             <div className="folderfileName"><Icon fontSize="medium"><img src={xlsxgreen} /></Icon> <span>{file.filename}</span></div>
                            //             <div className="folderfileDetail">{file.uploadDate}</div>
                            //             {/* {file.filesize + 'KB'} {file.documentType} */}
                            //             {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                            //         </div>
                            //     </Grid>
                            // ))}
                            <Grid
                                item
                                className="border-grid-docs"
                                lg={3.6}
                                md={3.6}
                                sm={4}
                                xs={12}
                                onClick={() =>
                                    window.open(file.presignedurl, '_blank')
                                }
                            >
                                <div className="fullfolder">
                                    <div className="img-para">
                                        <img src={getFileIcon(file.filename)} />

                                        <Typography className="filenamedocs">
                                            {file.filename}
                                        </Typography>
                                    </div>
                                    <div className="folderfileDetail">
                                        {file.uploadDate}
                                    </div>
                                    {/* {file.filesize + 'KB'} {file.documentType} */}
                                    {/* <Icon fontSize="medium" className="more_horiz" onClick={(e) => handleClicksubmenu(e, index)} >more_horiz</Icon> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    <Box width="100%" className="box">
                        <br />
                        <br />
                        <StyledCard elevation={6} className="paddingbottom">
                            <CardHeader className="cardheader nomarginBottom">
                                <Title>Valuation Report</Title>
                            </CardHeader>
                        </StyledCard>
                        <div className="table_scroll">
                            <StyledTable className="customtable odd-even withborder">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Quarter</TableCell>
                                        <TableCell>
                                            Investment in the Quarter
                                        </TableCell>
                                        <TableCell>Total Investment</TableCell>
                                        <TableCell>
                                            Period change in Total Investment
                                        </TableCell>
                                        <TableCell>
                                            Period change in Investment (%)
                                        </TableCell>
                                        <TableCell>
                                            Dividend received in quarter
                                        </TableCell>
                                        <TableCell>
                                            Valuation till this quarter
                                        </TableCell>
                                        <TableCell>
                                            Previous quarter Valuation
                                        </TableCell>
                                        <TableCell>
                                            Period change in Valuation
                                        </TableCell>
                                        <TableCell>
                                            Period Change in Valuation(%)
                                        </TableCell>
                                        <TableCell>Multiple of capital</TableCell>
                                        <TableCell>Gross IRR</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* <TableRow className="tablebodyTitle">
                                    <div>A. Equity Investments</div>
                                </TableRow> */}
                                    {valuationMember.map((member, index) => (
                                        <TableRow>
                                            <TableCell>{member.year.slice(0, 4)}</TableCell>
                                            <TableCell>{member.quarter}</TableCell>
                                            <TableCell>
                                                {getCommas(member.investment)}
                                            </TableCell>
                                            <TableCell>
                                                {getCommas(member.totalInvestmentValue)}
                                            </TableCell>
                                            <TableCell>{'-'}</TableCell>
                                            <TableCell>{'-'}</TableCell>
                                            <TableCell>
                                                {getCommas(member.receivedDividend)}
                                            </TableCell>
                                            <TableCell>
                                                {getCommas(member.currentValuation)}
                                            </TableCell>
                                            <TableCell>{'-'}</TableCell>
                                            <TableCell>
                                                {getCommas(member.changeInValuation)}
                                            </TableCell>
                                            <TableCell>
                                                {getCommas(member.changeInvaluationPer)}
                                            </TableCell>
                                            <TableCell>
                                                {getCommas(member.multipleOfCapital)}
                                            </TableCell>
                                            <TableCell>{getCommas(member.grossIrr)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </div>
                        <div className="formbuttons rightalign">
                            <Button
                                variant="contained"
                                color="primary"
                                className="whitebg"
                                onClick={handlePDFOpen}
                            >
                                View PDF
                            </Button>
                        </div>
                        <br />
                        <br />
                        <StyledCard elevation={6} className="paddingbottom">
                            <CardHeader className="cardheader nomarginBottom">
                                <Title>Equity Value</Title>
                            </CardHeader>
                        </StyledCard>
                        <div className="table_scroll">
                            <StyledTable className="customtable odd-even withborder">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Quarter</TableCell>
                                        <TableCell>
                                            Total Investments
                                        </TableCell>
                                        <TableCell>Liabilities</TableCell>
                                        <TableCell>
                                            Provision for Tax
                                        </TableCell>
                                        <TableCell>
                                            Dprefs
                                        </TableCell>
                                        <TableCell>
                                            Gross equity value (GEV)
                                        </TableCell>
                                        <TableCell>
                                            Eprefs
                                        </TableCell>
                                        <TableCell>
                                            Ordinary equity value
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </StyledTable>
                        </div>
                        <div className="formbuttons rightalign">
                            <Button
                                variant="contained"
                                color="primary"
                                className="whitebg"
                                onClick={handleEquityPDFOpen}
                            >
                                View PDF
                            </Button>
                        </div>
                        <br />
                        <br />
                        <StyledCard elevation={6} className="paddingbottom">
                            <CardHeader className="cardheader nomarginBottom">
                                <Title>Asset Cover Ratio</Title>
                            </CardHeader>
                        </StyledCard>
                        <div className="table_scroll">
                            <StyledTable className="customtable odd-even withborder">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Quarter</TableCell>
                                        <TableCell>
                                            Total portfolio value
                                        </TableCell>
                                        <TableCell>Cash on hand -CPI</TableCell>
                                        <TableCell>
                                            Liabilities and provisions
                                        </TableCell>
                                        <TableCell>
                                            D Pref share rolled-up value
                                        </TableCell>
                                        <TableCell>
                                            Cash on hand -CPI
                                        </TableCell>
                                        <TableCell>
                                            Adjusted D Pref share rolled-up value
                                        </TableCell>
                                        <TableCell>
                                            Asset cover ratio
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </StyledTable>
                        </div>
                        <div className="formbuttons rightalign">
                            <Button
                                variant="contained"
                                color="primary"
                                className="whitebg"
                                onClick={handleAssetPDFOpen}
                            >
                                View PDF
                            </Button>
                        </div>
                    </Box>
                </div>
            </TabPanel>


            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm
                    onSubmit={handleSubmitBoardmember}
                    className="customform"
                    onError={() => null}
                >
                    <DialogTitle id="form-dialog-title" onClose={handleClose}>
                        Add Board Member
                    </DialogTitle>
                    <DialogContent>
                        <StyledCard elevation={6} className="">
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Name</label>
                                    <TextField
                                        type="text"
                                        name="membername"
                                        id="membername"
                                        value={formdata.membername || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter name"
                                        placeholder="Enter name"
                                    />
                                    <label>Phone Number</label>
                                    <TextField
                                        fullWidth
                                        label="Enter phone number"
                                        ceholder="Enter phone number"
                                        type="text"
                                        name="memberphone"
                                        value={formdata.memberphone || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                    />
                                    <label>Gender</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={genderopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changedropdownvalue('gender', value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.gender}
                                                name="gender"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Email Id</label>
                                    <TextField
                                        type="text"
                                        name="memberemail"
                                        id="memberemail"
                                        value={formdata.memberemail || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter email id"
                                        placeholder="Enter email id"
                                    />
                                    <label>Age</label>
                                    <TextField
                                        fullWidth
                                        label="Enter age"
                                        ceholder="Enter age"
                                        type="text"
                                        name="age"
                                        value={formdata.age || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                    />
                                    <label>Status</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={statusopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changedropdownvalue('status', value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.status}
                                                name="status"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <label>Address</label>
                                    <TextField
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={formdata.address || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter address"
                                        placeholder="Enter address"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Country</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={countryopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'country',
                                                value
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.country}
                                                name="country"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                    <label>State</label>
                                    <TextField
                                        type="text"
                                        name="state"
                                        id="state"
                                        value={formdata.state || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter state"
                                        placeholder="Enter state"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>City</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={cityopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changedropdownvalue('city', value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.city}
                                                name="city"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                    <label>Zip code</label>
                                    <TextField
                                        type="text"
                                        name="zipcode"
                                        id="zipcode"
                                        value={formdata.zipcode || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter zip code"
                                        placeholder="Enter zip code"
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
                    <Button
                        onClick={handleDeleteConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        className="whitebg"
                        onClick={handleDeleteClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={meetingopen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm
                    onSubmit={handleSubmitSchedule}
                    className="customform"
                    onError={() => null}
                >
                    <DialogTitle id="form-dialog-title" onClose={handleClose}>
                        Add meeting schedule
                    </DialogTitle>
                    <DialogContent>
                        <StyledCard elevation={6} className="">
                            <Grid container spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <label>Meeting title</label>
                                    <TextField
                                        type="text"
                                        name="meetingtitle"
                                        id="meetingtitle"
                                        value={formdata.meetingtitle || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter Meeting title"
                                        placeholder="Enter Meeting title"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Start Date</label>
                                    <div className="datediv">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DatePicker
                                                inputFormat="dd-MM-yyyy"
                                                value={formdata.startDate}
                                                open={dateopen}
                                                onOpen={() => setdateOpen(true)}
                                                onClose={() =>
                                                    setdateOpen(false)
                                                }
                                                onChange={(e, name) =>
                                                    handleDateChange(
                                                        e,
                                                        'startDate'
                                                    )
                                                }
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        // variant="Outlined"
                                                        className="required"
                                                        id="mui-pickers-date"
                                                        label="DD-MM-YYYY"
                                                        sx={{
                                                            mb: 2,
                                                            width: '100%',
                                                        }}
                                                        onClick={(e) =>
                                                            setdateOpen(true)
                                                        }
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <label>End Date</label>
                                    <div className="datediv">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DatePicker
                                                inputFormat="dd-MM-yyyy"
                                                value={formdata.endDate}
                                                open={enddateopen}
                                                onOpen={() =>
                                                    setenddateOpen(true)
                                                }
                                                onClose={() =>
                                                    setenddateOpen(false)
                                                }
                                                onChange={(e, name) =>
                                                    handleDateChange(
                                                        e,
                                                        'endDate'
                                                    )
                                                }
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        // variant="Outlined"
                                                        className="required"
                                                        id="mui-pickers-date"
                                                        label="DD-MM-YYYY"
                                                        sx={{
                                                            mb: 2,
                                                            width: '100%',
                                                        }}
                                                        onClick={(e) =>
                                                            setenddateOpen(true)
                                                        }
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Start Time</label>
                                    <TextField
                                        type="text"
                                        name="starttime"
                                        id="starttime"
                                        value={formdata.starttime || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter start time"
                                        placeholder="Enter start time"
                                    />
                                    <label>End Time</label>
                                    <TextField
                                        type="text"
                                        name="endtime"
                                        id="endtime"
                                        value={formdata.endtime || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter end time"
                                        placeholder="Enter end time"
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <label>Meeting Category</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={meetingcategoryopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'meetingcategory',
                                                value
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.meetingcategory}
                                                name="meetingcategory"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                    <label>Add Member</label>
                                    <TextField
                                        type="text"
                                        name="members"
                                        id="members"
                                        value={formdata.members || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Email id with seperated comma"
                                        placeholder="Email id with seperated comma"
                                    />
                                    <label>Meeting description</label>
                                    <TextField
                                        type="text"
                                        name="meetingdesc"
                                        id="meetingdesc"
                                        value={formdata.meetingdesc || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter your description here..."
                                        placeholder="Enter your description here..."
                                        multiline
                                        rows={5}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.checkedA}
                                                onChange={handlecheckChange(
                                                    'checkedA'
                                                )}
                                                value="checkedA"
                                            />
                                        }
                                        label="Send notification to added members"
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
                open={detailsopen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
                keepMounted
                TransitionComponent={Transition}
                className="sidebarPopup"
            >
                <DialogTitle id="form-dialog-title" onClose={handleClose}>
                    Borad Member Details
                </DialogTitle>
                <DialogContent>
                    {/* <img src={sheet} />
                                <Title className="title">Design proposal for website.xlsx</Title>
                                <SubTitle className="SubTitle">Preview</SubTitle> */}
                    <div className="divInner">
                        <div className="basicdetailListing">
                            <div className="detailListinginner">
                                <span>Id</span>
                                <span>: {singleBoardmember.id}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Member Name</span>
                                <span>: {singleBoardmember.name}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Email Id</span>
                                <span>: {singleBoardmember.email}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Phone Number</span>
                                <span>: {singleBoardmember.phoneNumber}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Status</span>
                                <span>
                                    :{' '}
                                    {singleBoardmember.status
                                        ? statusopt.map((opt) => {
                                            if (
                                                opt.id ==
                                                singleBoardmember.status
                                            )
                                                return (
                                                    <span>{opt.label}</span>
                                                )
                                        })
                                        : ''}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Join Date</span>
                                <span>: {singleBoardmember.joiningDate}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>gender</span>
                                <span>
                                    :{' '}
                                    {singleBoardmember.gender
                                        ? genderopt.map((opt) => {
                                            if (
                                                opt.id ==
                                                singleBoardmember.gender
                                            )
                                                return (
                                                    <span>{opt.label}</span>
                                                )
                                        })
                                        : ''}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Age</span>
                                <span>: {singleBoardmember.age}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Address</span>
                                <span>: {singleBoardmember.address}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>City</span>
                                <span>
                                    :{' '}
                                    {singleBoardmember.city
                                        ? cityopt.map((opt) => {
                                            if (
                                                opt.id ==
                                                singleBoardmember.city
                                            )
                                                return (
                                                    <span>{opt.label}</span>
                                                )
                                        })
                                        : ''}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>State</span>
                                <span>: {singleBoardmember.state}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Country</span>
                                <span>: {singleBoardmember.country}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Zip Code</span>
                                <span>: {singleBoardmember.zip}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
            <Dialog
                open={pdfOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="pdfpopup"
                id="pdfid"
            >
                <DialogTitle id="alert-dialog-title">
                    <img src={Solconlogosvg} />
                </DialogTitle>
                <DialogContent>
                    <div className="table_scroll">
                        <StyledTable className="customtable odd-even withborder">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Quarter</TableCell>
                                    <TableCell>
                                        Investment in the Quarter
                                    </TableCell>
                                    <TableCell>Total Investment</TableCell>
                                    <TableCell>
                                        Period change in Total Investment
                                    </TableCell>
                                    <TableCell>
                                        Period change in Investment (%)
                                    </TableCell>
                                    <TableCell>
                                        Dividend received in quarter
                                    </TableCell>
                                    <TableCell>
                                        Valuation till this quarter
                                    </TableCell>
                                    <TableCell>
                                        Previous quarter Valuation
                                    </TableCell>
                                    <TableCell>
                                        Period change in Valuation
                                    </TableCell>
                                    <TableCell>
                                        Period Change in Valuation(%)
                                    </TableCell>
                                    <TableCell>Multiple of capital</TableCell>
                                    <TableCell>Gross IRR</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow className="tablebodyTitle">
                                    <div>A. Equity Investments</div>
                                </TableRow> */}
                                {console.log("valuationMember", valuationMember)}
                                {valuationMember.map((member, index) => (
                                    <TableRow>
                                        <TableCell>{member.year.slice(0, 4)}</TableCell>
                                        {/* <TableCell>{new Date(member.year).getFullYear()}</TableCell> */}

                                        <TableCell>{member.quarter}</TableCell>

                                        <TableCell>
                                            {getCommas(member.investment)}
                                        </TableCell>
                                        <TableCell>
                                            {getCommas(member.totalInvestmentValue)}
                                        </TableCell>
                                        <TableCell>{'-'}</TableCell>
                                        <TableCell>{'-'}</TableCell>
                                        <TableCell>
                                            {getCommas(member.receivedDividend)}
                                        </TableCell>
                                        <TableCell>
                                            {getCommas(member.currentValuation)}
                                        </TableCell>
                                        <TableCell>{'-'}</TableCell>
                                        <TableCell>
                                            {getCommas(member.changeInValuation)}
                                        </TableCell>
                                        <TableCell>
                                            {getCommas(member.changeInvaluationPer)}
                                        </TableCell>
                                        <TableCell>
                                            {getCommas(member.multipleOfCapital)}
                                        </TableCell>
                                        <TableCell>{getCommas(member.grossIrr)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    </div>
                    {/* <StyledCard elevation={6} className="samebackground">
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Equity Value 31 Oct 20
                                            </TableCell>
                                            <TableCell>R’m</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Total investments
                                            </TableCell>
                                            <TableCell>980.7</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Liabilities</TableCell>
                                            <TableCell>(0.5)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Provision for tax2
                                            </TableCell>
                                            <TableCell>(24.9)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>D prefs</TableCell>
                                            <TableCell>(397.5)</TableCell>
                                        </TableRow>
                                        <TableRow className="boldwhite">
                                            <TableCell>
                                                Gross Equity Value (GEV)
                                            </TableCell>
                                            <TableCell>557.8</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>E prefs 5.5%</TableCell>
                                            <TableCell>(30.7)</TableCell>
                                        </TableRow>
                                        <TableRow className="boldwhite">
                                            <TableCell>
                                                Ordinary Equity value
                                            </TableCell>
                                            <TableCell>527.1</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </StyledTable>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Asset cover ratio 31 Oct 20
                                            </TableCell>
                                            <TableCell>Notes</TableCell>
                                            <TableCell>R’m</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Total portfolio value
                                            </TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell>980.7</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Less : Cash on hand - CPI
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>(0.5)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Less : Liabilities and
                                                provisions
                                            </TableCell>
                                            <TableCell>2</TableCell>
                                            <TableCell>(24.9)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>940.5</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                D pref share rolled - up value
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>397.5</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Less : Cash on hand -CPI
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>(14.8)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Adjusted D pref share rolled -
                                                up value
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>382.7</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Adjusted D pref share rolled -
                                                up value
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>2.46</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </StyledTable>
                            </Grid>
                        </Grid>
                    </StyledCard> */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handlePDFConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Download
                    </Button>
                    <Button
                        variant="outlined"
                        className="whitebg"
                        onClick={handlePDFClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={equityPdfOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="pdfpopup"
                id="pdfid"
            >
                <DialogTitle id="alert-dialog-title">
                    <img src={Solconlogosvg} />
                </DialogTitle>
                <DialogContent>
                    <div className="table_scroll">
                        <StyledTable className="customtable odd-even withborder">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Quarter</TableCell>
                                    <TableCell>
                                        Total Investments
                                    </TableCell>
                                    <TableCell>Liabilities</TableCell>
                                    <TableCell>
                                        Provision for Tax
                                    </TableCell>
                                    <TableCell>
                                        Dprefs
                                    </TableCell>
                                    <TableCell>
                                        Gross equity value (GEV)
                                    </TableCell>
                                    <TableCell>
                                        Eprefs
                                    </TableCell>
                                    <TableCell>
                                        Ordinary equity value
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </StyledTable>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handlePDFConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Download
                    </Button>
                    <Button
                        variant="outlined"
                        className="whitebg"
                        onClick={handleEquityPDFClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={assetPdfOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="pdfpopup"
                id="pdfid"
            >
                <DialogTitle id="alert-dialog-title">
                    <img src={Solconlogosvg} />
                </DialogTitle>
                <DialogContent>
                    <div className="table_scroll">
                        <StyledTable className="customtable odd-even withborder">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Quarter</TableCell>
                                    <TableCell>
                                        Total portfolio value
                                    </TableCell>
                                    <TableCell>Cash on hand -CPI</TableCell>
                                    <TableCell>
                                        Liabilities and provisions
                                    </TableCell>
                                    <TableCell>
                                        D Pref share rolled-up value
                                    </TableCell>
                                    <TableCell>
                                        Cash on hand -CPI
                                    </TableCell>
                                    <TableCell>
                                        Adjusted D Pref share rolled-up value
                                    </TableCell>
                                    <TableCell>
                                        Asset cover ratio
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </StyledTable>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handlePDFConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Download
                    </Button>
                    <Button
                        variant="outlined"
                        className="whitebg"
                        onClick={handleAssetPDFClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openBoardDocument}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                {openBoardDocument && (
                    <ValidatorForm
                        // onSubmit={handleUploadBoardDoc}
                        className="customform"
                        onError={() => null}
                    >
                        <DialogTitle
                            id="form-dialog-title"
                            onClose={handleCloseBoardDocument}
                        >
                            Upload Documents
                        </DialogTitle>
                        <DialogContent>
                            <StyledCard elevation={6} className="">
                                <Grid container spacing={3}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Document Type</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={getSelectedItem(
                                                formdata.boardDocument_Type,
                                                testing
                                            )}
                                            // options={testing}
                                            options={value === 3 ? testing : value === 4 ? testings : value === 5 ? testingss : testingsss}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'boardDocument_Type',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={
                                                        formdata.boardDocument_Type
                                                    }
                                                    name="documenttype"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        <label>Quarter</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={getSelectedItem(
                                                formdata.boardDocument_Quarter,
                                                quarteropt,
                                                0,
                                                1
                                            )}
                                            options={quarteropt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'boardDocument_Quarter',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.boardDocument_Quarter}
                                                    name="quarter"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Year</label>
                                        <div className="datediv">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    openTo="year"
                                                    views={['year']}
                                                    value={formdata.boardDocument_Year}
                                                    open={boardDocDate}
                                                    onOpen={() =>
                                                        setBoardDocDate(true)
                                                    }
                                                    onClose={() =>
                                                        setBoardDocDate(false)
                                                    }
                                                    onChange={(e) =>
                                                        handleDateChanges(e)
                                                    }
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            // variant="Outlined"
                                                            className="required"
                                                            id="mui-pickers-date"
                                                            label="DD-MM-YYYY"
                                                            sx={{
                                                                mb: 2,
                                                                width: '100%',
                                                            }}
                                                            onClick={(e) =>
                                                                setBoardDocDate(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div className="fileuploadBox documentfileupload ">
                                            <TextField
                                                // disabled={view}
                                                type="file"
                                                name="file"
                                                id="file"
                                                onChange={(e) =>
                                                    onFileChange(e)
                                                }
                                            />
                                            <div className="uploaderDiv">
                                                <img src={IconCloudSvg} />
                                                <Typography>
                                                    Drag files to upload OR
                                                    Browse
                                                </Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                            <SubTitle className="SubTitle">Uploading</SubTitle>
                            <div className="uploadingfilesfol">
                                {uploadedFiles &&
                                    uploadedFiles.map((files, i) => (
                                        <div className="single_uploadingfilesfol">
                                            <div>
                                                <span>
                                                    <img src={zip} />
                                                </span>
                                                <span>
                                                    {files.name}
                                                    <br />
                                                    <span className="folderfileDetail">
                                                        {files.size}
                                                    </span>
                                                </span>
                                            </div>
                                            <Icon
                                                fontSize="medium"
                                                onClick={removeUploadedFile}
                                            >
                                                delete
                                            </Icon>
                                        </div>
                                    ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className={
                                    !formdata.boardDocument_File
                                        ? 'whitebg disablebtn'
                                        : 'whitebg'
                                }
                                disabled={!formdata.boardDocument_File}
                                onClick={handleUploadBoardDoc}
                            >
                                Save
                            </Button>
                            <Button
                                className="whitebg"
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleCloseBoardDocument()}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                )}
            </Dialog>

        </Container>
    )
}
export default Shareholderrepository
