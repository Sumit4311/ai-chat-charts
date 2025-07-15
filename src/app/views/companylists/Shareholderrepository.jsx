import React, { useState, useEffect,useCallback } from 'react'
import { Grid, Card, Fab } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import $ from 'jquery'
import JSZip from 'jszip'
import Chart from 'react-apexcharts';
import Radio from '@mui/material/Radio'
import useAuth from 'app/hooks/useAuth'
import "datatables.net-dt/js/dataTables.dataTables"
import zipFolder from "../../image/zipFolder.svg"
import RadioGroup from '@mui/material/RadioGroup'
import { departmentopt, rolesopt, getProfile, formatdecimals, getFileExtension, getCurrenctQuarter, quaterOpt } from '../../services/CommonObject'
import "datatables.net-dt/css/jquery.dataTables.min.css"
// import Pagination from '@material-ui/lab/Pagination'
import { Pagination } from '@material-ui/lab';
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
// import CanvasJSReact from '@canvasjs/react-charts'
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
    updateBoardMemberDetails,
    deleteSingleDocument,
    foldersearch,
    deletedsubfileocumentfile,
    getOrgValauationReports,
    shareholderRepoTable,
    getValuationEquityValue,
    getValuationAssetCoverRatio,
    getOrgCompaniesList,
    UploadOrgValuationReport
} from '../../services/api'
import { countryOpt, yearopt } from 'app/services/CommonObject'
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
import { s_a } from 'app/services/countries'
// const CanvasJS = CanvasJSReact.CanvasJS;
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
const ITEM_HEIGHT = 60
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
const colors=[
    '#8B3DA8','#02A6CF','#D7BB4F','#49C9BD','#FF0000','#00FF00','#0000FF',
    '#FFA500','#008000','#FFC0CB','#FF6347','#4B0082','#32CD32','#FF1493','#ADFF2F'];
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


const boardDocumentOptions = [
    { id: 'Board Resolutions', label: 'Board Resolutions' },
    { id: 'Board Minutes', label: 'Board Minutes' },
    { id: 'Board Pack', label: 'Board Pack' },
]
const committeeReportOptions = [
    { id: 'Investment Committee Reports', label: 'Investment Committee Reports' },
    { id: 'Audit & Risk Committee Reports', label: 'Audit & Risk Committee Reports' },
    { id: 'ESG Committee Reports', label: 'ESG Committee Reports' },
    { id: 'Digital Advisory Council Reports', label: 'Digital Advisory Council Reports' },
    { id: 'REMCO Reports', label: 'REMCO Reports' },
]
const monthlyReportOptions = [
    { id: 'Monthly Management Accounts', label: 'Monthly Management Accounts' },
    { id: 'CEO Reports', label: 'CEO Reports' },
    { id: 'CFO Reports', label: 'CFO Reports' },
    { id: 'CIO Reports', label: 'CIO Reports' },
    { id: 'CTO Reports', label: 'CTO Reports' },
]
const shareholderReportOptions = [
    { id: 'Valuation Report', label: 'Valuation Report' },
    // { id: 'Equity Value', label: 'Equity Value' },
    // { id: 'Asset Cover Ratio', label: 'Asset Cover Ratio' },
    { id: 'Detailed Valuation Report', label: 'Detailed Valuation Report' },
]
const agreementsOptions = [
    { id: 'Agreements', label: 'Agreements' },
]
const afsOptions = [
    { id: 'AFS', label: 'AFS' },
]
const shareCertificatesOptions = [
    { id: 'Share Certificates', label: 'Share Certificates' },
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
    { id: 'Male', label: 'Male' },
    { id: 'Female', label: 'Female' },
    { id: 'Other', label: 'Other' },
]

const statusopt = [
    { id: 'Active', label: 'Active' },
    { id: 'Inactive', label: 'Inactive' },
    // { id: 'Pending', label: 'Pending' },
    // { id: 'Cancelled', label: 'Cancelled' },
]

const countryopt = [
    { id: 'India', label: 'India' },
    { id: 'Australia', label: 'Australia' },
    { id: 'USA', label: 'USA' },
    { id: 'Canada', label: 'Canada' },
]

const cityopt = [
    { id: 'Surat', label: 'Surat' },
    { id: 'Mumbai', label: 'Mumbai' },
    { id: 'Ahmedabad', label: 'Ahmedabad' },
    { id: 'Pune', label: 'Pune' },
]
const quarteropt = [
    { id: "Q1", label: 'Q1' },
    { id: "Q2", label: 'Q2' },
    { id: "Q3", label: 'Q3' },
    { id: "Q4", label: 'Q4' },
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
    // const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        id: '',
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
        startDate: null,
        endDate: null,
        search_Period: '',
        search_Documenttype: '',
        search_Year: '',
        upload_Documenttype: '',
        upload_Quarter: '',
        upload_Year: currentyear.toString(),
        upload_File: '',
        file: '',
        year: currentyear.toString(),
        changeRadioButton: 'Files',
        shareholderyear: currentyear,
        yearShareHolderRepost: "",
        // yearShareHolderRepost: currentyear,
        quarterShareHolderRepost: "",
        // quarterShareHolderRepost: "Q1",
        companyShareHolderRepost:""
    })
    const inputRef = React.useRef(null)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [openUploadDocument, setOpenUploadDocument] = useState(false)
    const [meetingopen, setmeetingopen] = useState(false)
    const [dateopen, setdateOpen] = useState(false)
    const [documentsDate, setDocumentsDate] = useState(false)
    const [uploadedFiles, setuploadedFiles] = useState([])
    const [companyOption, setCompanyOption] = useState([])
    const [isCompanyLoaded, setIsCompanyLoaded] = useState(true)
    const [quarterValidate, setQuarterValidate] = useState(false)
    const [uploadZipContent, setUploadZipContent] = useState(null)
    const [uploadZipFolder, setUploadZipFolder] = useState(null)
    const [companyValuationData, setCompanyValuationData] = useState([])
    const user = useAuth()
    const [view, setView] = useState(false)
    const [allActivecmp, setallActivecmp] = useState([])
    const [index, setIndex] = useState('')
    const [state, setState] = useState({
        checkedA: true,
    })
    let { companyId, orgID } = useParams();
    const [value, setValue] = React.useState(companyId === ':orgID' ? 6 : 0)
    const [allBoardmember, setallBoardmember] = useState([])
    const [ValudationData, setValuData] = useState([])
    const [valuationReports, setValutionReports] = useState([]);
    const [TotalValuation, setTotalvaluation] = useState([]);
    const [valEquityValue, setValEquityValue] = useState([]);
    const [valAssetCoverRatio, setValAssetCoverRatio] = useState([]);
    const [valuationMember, setValuationMember] = useState([]);
    const [valudationCprPer, setValuationCprPer] = useState([]);
    const [periodChngValuation, setPeriodChngValuation] = useState([]);
    const [portFolPercentage, setPortFolioPer] = useState([]);
    const [valuationTab, setValuationTab] = useState(0)
    const [allSubFolders, setallSubFolders] = useState([])
    const [docsList, setDocsList] = useState([])
    const [allDocumentList, setAllDocumentList] = useState([])
    const [shareholderdocsList, setshareholderdocsList] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteRecordOpen, setDeleteRecordOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [editid, setEditid] = useState('')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [currentFolderName, setcurrentFolderName] = useState([])
    const [alertType, setalertType] = useState('')
    const [allSchedule, setallSchedule] = useState([])
    const [allExtractFiles, setAllExtractFiles] = useState([])
    const [folderSizes, setFolderSizes] = useState('')
    const [isPrinting, setIsPrinting] = useState(false)
    const [detailsopen, setdetailsopen] = useState(false)
    const [detailsRecordOpen, setDetailsRecordOpen] = useState(false)
    const [singleBoardmember, setsingleBoardmember] = useState([])
    const [is_singledetails, setis_singledetails] = useState(false)
    const [enddateopen, setenddateOpen] = useState(false)
    const [showExtractedFiles, setShowExtractedFiles] = useState(false)
    const [currentFolder, setCurrentFolder] = useState('');
    const [myEventsList, setmyEventsList] = useState([])
    const [pdfOpen, setpdfOpen] = useState(false)
    const [equityPdfOpen, setEquityPdfOpen] = useState(false)
    const [assetPdfOpen, setAssetPdfOpen] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [currentFolderIsMain, setcurrentFolderIsMain] = useState(0)
    const [stateOpt, setstateOpt] = useState([])
    const [extractedFiles, setExtractedFiles] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(false)
    const [subFolderFile, setSubFolderFile] = useState('')
    const [fileSelected, setfileSelected] = useState({})
    const [chart, setChart] = useState(null);
    const submeuopen = Boolean(anchorEl)
    const subFolderMenuShow = Boolean(anchorEl2)
    let folderName = selectedFiles?.[0]?.webkitRelativePath?.split('/')[0]
    let folderSize = 0
    var companyLabel = ''
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    // const addSymbols = (e) => {
    //     var suffixes = ["", "K", "M", "B"];
    //     var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    //     if (order > suffixes.length - 1)
    //         order = suffixes.length - 1;
    //     var suffix = suffixes[order];
    //     return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    // };

    const toggleDataSeries = (e) => {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    };
    const dataPoints = [
        {
            category: "Investment",
            data: [27500, 29000, 22000, -26500],
            color: "#02A6CF",
            negativeColor: "red",
        },
        {
            category: "Valuation",
            data: [40550, -40050, -40050, 40550],
            color: "Green",
            negativeColor: "red",
        },
        {
            category: "Dividend",
            data: [35600, -36100, 37100, -37600],
            color: "yellow",
            negativeColor: "red",
        },
        {
            category: "% of Investment",
            data: [60500, 66000, 60000, 65500],
            color: '#FFA500',
        },
        {
            category: "% of Valuation",
            data: [77500, 79000, 72000, 70500],
            color: '#4B0082',
        },
    ];
    
    const filteredValuationMember = valuationMember.filter(item => item.value !== 0 || item.name !== 'No Data');
    const isValGrossDataEmpty = filteredValuationMember?.length === 0;
    const isValGrossCenter = isValGrossDataEmpty ? ['50%', '50%'] : ['35%', '40%']
    console.log('valuationMember',valuationMember)
    
    const getSeriesData = useCallback((data)=>{
        data?.sort((a, b) => {
            const quarters = { "Q1": 1, "Q2": 2, "Q3": 3, "Q4": 4 };
            return quarters[a.quarter] - quarters[b.quarter];
          });
        const companyData = {};
        data?.forEach(item => {
          const company = item.name;
          if (!companyData[company]) {
            if(company==='No Data'){
             companyData[company] = { name: company, type: 'line', data: [],quarter:item.quarter };
            }else{
             companyData[company] = { name: company, type: 'line', data: ['Q1', 'Q2', 'Q3', 'Q4'].map(() => null),quarter:item.quarter };
            }
          }
          const quarterIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(item.quarter);
          if (quarterIndex !== -1) {
            companyData[company].data[quarterIndex] = item.value;
          }
        //   companyData[company].data.push(item.value);
        });
        console.log('companyData',companyData)
        return Object.values(companyData)
   },[periodChngValuation,valuationMember,valudationCprPer])//, formdata.yearShareHolderRepost, formdata.quarterShareHolderRepost,formdata.companyShareHolderRepost
   
   const getSeriesPieData = useCallback((data)=>{
        const companyData = [];
        companyData.push({ 
        name: 'Category', 
        type: 'pie',
        radius: ['30%', '70%'], 
        avoidLabelOverlap: true,
        label: {
            position: 'inner',
            formatter: '{c}%',
        },
        labelLine: {
            show: false,
        }, 
        data: data
        // Array.from(
        //     new Set(data.map(obj => obj.quarter))
        //   ).map(id => {
        //     return data.find(obj => obj.quarter === id);
        //   })
    });
    return companyData
},[portFolPercentage,periodChngValuation,valuationMember,valudationCprPer])
const getEquityAssetRatioBarGrpahData = useCallback((data)=>{//asset graph data
    data?.sort((a, b) => {
        const quarters = { "Q1": 1, "Q2": 2, "Q3": 3, "Q4": 4 };
        return quarters[a.quarter] - quarters[b.quarter];
      });
    const companyData = {};
    data?.forEach(item => {
      const company = 'Gross Equity Value';
      if (!companyData[company]) {
        if(company==='No Data'){
         companyData[company] = { name: company, type: 'bar', data: [] , barWidth: '20px',label:company,year:item.year};
        }else{
         companyData[company] = { name: company, type: 'bar', data: ['Q1', 'Q2', 'Q3', 'Q4'].map(() => null), barWidth: '20px',label:company,year:item.year };
        }
      }
      const company2 = 'Ordinary Equity Value';
      if (!companyData[company2]) {
        if(company==='No Data'){
         companyData[company2] = { name: company2, type: 'bar', data: [] , barWidth: '20px',label:company2,year:item.year};
        }else{
         companyData[company2] = { name: company2, type: 'bar', data: ['Q1', 'Q2', 'Q3', 'Q4'].map(() => null), barWidth: '20px',label:company2,year:item.year };
        }
      }
      const quarterIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(item.quarter);
      if (quarterIndex !== -1) {
        companyData[company].data[quarterIndex] = item.grossEqityvalue;
      }
      if (quarterIndex !== -1) {
        companyData[company2].data[quarterIndex] = item.ordinaryEquityvalue;
      }
    //   companyData[company].data.push(item.value);
    });
    valAssetCoverRatio?.sort((a, b) => {
        const quarters = { "Q1": 1, "Q2": 2, "Q3": 3, "Q4": 4 };
        return quarters[a.quarter] - quarters[b.quarter];
      });
    valAssetCoverRatio?.forEach(item => {
        const company = 'Asset Cover Ratio';
        if (!companyData[company]) {
          if(company==='No Data'){
           companyData[company] = { name: company, type: 'line', data: [] , barWidth: '20px',label:company,year:item.year};
          }else{
           companyData[company] = { name: company, type: 'line', data: ['Q1', 'Q2', 'Q3', 'Q4'].map(() => null), barWidth: '20px',label:company,year:item.year };
          }
        }
       
        const quarterIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(item.quarter);
        if (quarterIndex !== -1) {
          companyData[company].data[quarterIndex] = item.assetCoverratio;
        }
       
      //   companyData[company].data.push(item.value);
      });
    return Object.values(companyData)
},[valEquityValue,valAssetCoverRatio])//, formdata.yearShareHolderRepost, formdata.quarterShareHolderRepost,formdata.companyShareHolderRepost

const getSelectedLegendDots=(data)=>{
    const selectedObject={};
    data?.forEach(item=>{
        selectedObject[item.name]=true
    })
    return selectedObject
}
   const d=new Date()
    // const seriesDataStructured=getSeriesData();
    const EQuityValuationAssetRatio = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '15%',
            right: '5%',
        },
        tooltip: {
             trigger: 'item',
        },
        legend: {
            show:TotalValuation.length>0 ? true:false,
            data:['Gross Equity Value','Ordinary Equity Value','Asset Cover Ratio'],
            // data:[...new Set(periodChngValuation.map(item=> item.label))],
            // show:false,
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
            // show: true,
            top: 200,
        },
       
        xAxis: {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
                rotate: 0,
            },
        },
        yAxis: {
            data:[0,10,20,30,40,50,60,70,80,90,100],
            // data: ['5%', '10%', '15%', '20%', '25%', '30%','40%',"45%",'50%', '55%', '60%', '65%', '70%','80%',"95%","100%"],
            // type: 'category',
            type: valEquityValue.length>0 ? 'value':'category',
            axisLine: {
                show: true,
                // show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
                
            },
        },
        series: getEquityAssetRatioBarGrpahData(valEquityValue)
    }
    const ValReportedValue = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '15%',
            right: '5%',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show:periodChngValuation[0]?.name !=='No Data'? true:false,
            // show:false,
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
            // show: true,
            top: 200,
        },
       
        xAxis: {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
                rotate: 0,
            },
        },
        yAxis: {
            data:[0,10,20,30,40,50,60,70,80,90,100],
            // data: ['5%', '10%', '15%', '20%', '25%', '30%','40%',"45%",'50%', '55%', '60%', '65%', '70%','80%',"95%","100%"],
            // type: 'category',
            type: periodChngValuation[0]?.name !=='No Data'?'value':'category',
            axisLine: {
                show: true,
                // show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
                
            },
        },
        series:
        // periodChngValuation
        getSeriesData(periodChngValuation)
    }
    const ValGrossIRR = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '15%',
            right: '5%',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show:valuationMember[0]?.name !=='No Data'? true:false,
            // data:[...new Set(periodChngValuation.map(item=> item.name))],
            // show:false,
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
            // show: true,
            top: 200,
        },
       
        xAxis: {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
                rotate: 0,
            },
        },
        yAxis: {
            data:[0,10,20,30,40,50,60,70,80,90,100],
            // data: ['5%', '10%', '15%', '20%', '25%', '30%','40%',"45%",'50%', '55%', '60%', '65%', '70%','80%',"95%","100%"],
            // type: 'category',
            type: valuationMember[0]?.name !=='No Data'?'value':'category',// no data show default
            axisLine: {
                show: true,
                // show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
                
            },
        },
        series:
        // periodChngValuation
        getSeriesData(valuationMember)
    }
    const ValCPROwnshipPer = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '15%',
            right: '5%',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show:valudationCprPer[0]?.name !=='No Data'? true:false,
            // data:[...new Set(periodChngValuation.map(item=> item.name))],
            // show:false,
            data:valudationCprPer.map(item=>item.name),
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
            // show: true,
            top: 200,
            selected:getSelectedLegendDots(valudationCprPer),
            // click: (name) => {
            //     console.log(name,'newData')
            //     // handleLegendClick(name);
            //   },
        },
       
        xAxis: {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
           axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
                rotate: 0,
            },
        },
        yAxis: {
            data:[0,10,20,30,40,50,60,70,80,90,100],
            // data: ['5%', '10%', '15%', '20%', '25%', '30%','40%',"45%",'50%', '55%', '60%', '65%', '70%','80%',"95%","100%"],
            // type: 'category',
            type: valudationCprPer[0]?.name !=='No Data'?'value':'category',
            axisLine: {
                show: true,
                // show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        series:
        // periodChngValuation
        getSeriesData(valudationCprPer),
    }
    const valuPortFolioPerData={
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `${params.name}: ${params.value}<br>${params.data.year}:${params.data.quarter}`;
            }, },
        legend: {
            // show:false,
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
            show: true,
            top: 200,
        },
        series: getSeriesPieData(portFolPercentage)
       
    }
    console.log('valudationCprPer',valudationCprPer)
    function confirm() {
        setalert(false)
        handleCloseUploadDocument()
        setis_singledetails(false)
        setFormData((formData) => ({
            ...formData,
            search_Documenttype: '',
            search_Period: '',
            search_Year: '',
        }))
        setAnchorEl(null)
        setAnchorEl2(null)
        if(companyId !==':orgID'){
        toGetAllDocuments(false)}
    }
    function handleClicksubfoldermenu(event, file) {
        setAnchorEl(null)
        setAnchorEl2(event.currentTarget)
        // setSubFolderMenuShow(true)
        setSubFolderFile(file)
    }
    function handleclosesubfoldermenu(event, file) {
        setAnchorEl2(false)
        setAnchorEl(null)
        // setSubFolderMenuShow(false)
        setSubFolderFile('')
    }
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files)
        setUploadZipFolder(null)
        setUploadZipContent(null)
        setExtractedFiles([])
    }
    const getSelectedZipFolder = async (folderPath, isMain = 0) => {
        const path = folderPath;
        if (!path) {
            return
        }
        setcurrentFolderName(path?.split('/'))
        setCurrentFolder(folderPath)
        setcurrentFolderIsMain(isMain)
        var response = ''
        if (isMain) {
            var filepath = folderPath.indexOf('_')>-1 ? folderPath.split('.')[0].slice(folderPath.indexOf('_')+1): folderPath.split('.')[0];
            response = await getDataFromApi(foldersearch + `?folderPath=${path}/${filepath}`, 1)
        }
        else {
            response = await getDataFromApi(foldersearch + `?folderPath=${path}`, 1)
        }
        if (response && response?.status == 200 && response?.data != null) {
            setShowExtractedFiles(true)
            var extractedAllfolders = []
            var extractedAllfiles = [];
            response?.data?.map((singleData) => {
                if (singleData?.presignedUrl) {
                    extractedAllfiles?.push(singleData);
                }
                else {
                    extractedAllfolders?.push(singleData)
                }
            })
        }
        setAllExtractFiles(extractedAllfiles)
        setallSubFolders(extractedAllfolders)
    }
    const handleClickFoldername = () => {
        setShowExtractedFiles(false)
        setAllExtractFiles([])
        setExtractedFiles([])
    }
    const getCurrentFolderPath = () => {
        if (!currentFolderName || currentFolderName?.length === 0) {
            return null
        }
        return (
            <div style={{ float: "right" }}>
                <span
                    className="extract-files"
                    onClick={() => handleClickFoldername()}
                >
                    {'files'}
                </span>
                {currentFolderName?.map((folder, i) => {
                    const folderPath = currentFolderName?.slice(0, i + 1)?.join('/')
                    return (
                        <span
                            key={i}
                            className="extract-files"
                            onClick={() => i == 0 ? getSelectedZipFolder(folder, 1) : (i < currentFolderName.length - 1 && getSelectedZipFolder(folder))}
                        // onClick={() => (currentFolderName.length == 1 ? handleClickFoldername() : getSelectedZipFolder(folder))}
                        >
                            /{folder}
                        </span>
                    )
                })}
            </div>
        )
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
                setis_singledetails(true)
            }
        }
        setdetailsopen(true)
    }

    const getstateOpt = async (country, index = '') => {
        if (!index) {
            index = countryOpt
                .map((item) => {
                    return item.id;
                })
                .indexOf(country);
        }
        var newIndex = index + 1
        var states = s_a[newIndex].split("|");
        var stateArray = []
        states.map((opt) => {
            var state = []
            state['id'] = opt
            state['label'] = opt
            stateArray.push(state)
        })
        setstateOpt(stateArray)
    }
    const clearDropdownValues = () => {
        setFormData((formData) => ({
            ...formData,
            search_Documenttype: '',
            search_Period: '',
            search_Year: ''
        }))
        if(companyId !==':orgID'){
            toGetAllDocuments(false)}
    }
    const handleBrowseClick = () => {
        inputRef.current.click()
    }
    const handleOpenUploadDocument = () => {
        setOpenUploadDocument(true)
    }
    useEffect(() => {
        if (selectedFiles && selectedFiles.length > 0) {
            const zip = new JSZip()
            const folderName = selectedFiles?.[0]?.webkitRelativePath?.split('/')[0];
            const folder = zip.folder(folderName)
            Array.from(selectedFiles).forEach((file) => {
                folderSize += file.size
                const filePath = file.webkitRelativePath;
                const pathParts = filePath.split('/');
                let currentFolder = folder;
                pathParts.slice(1, pathParts.length - 1).forEach((subfolder) => {
                    currentFolder = currentFolder.folder(subfolder);
                });
                currentFolder.file(file.name, file);
            });

            zip.generateAsync({ type: 'blob' }).then((content) => {
                const link = URL.createObjectURL(content);
                setUploadZipFolder(link)
                setUploadZipContent(content)
                setFolderSizes(folderSize)
            });
        }
    }, [selectedFiles])
    function handleCloseUploadDocument() {
        setOpenUploadDocument(false)
        setdetailsopen(false)
        setFormData((formData) => ({
            ...formData,
            upload_Documenttype: '',
            upload_Quarter: '',
            upload_Year: currentyear.toString(),
            upload_File: '',
            changeRadioButton: 'Files'
        }))
        setUploadZipFolder(null)
        setuploadedFiles([])
        setQuarterValidate(false)
    }

    const filterList = () => {
        let querystring = ''
        querystring += '?companyId=' + companyId
        if (formdata.search_Period) {
            querystring += '&quarter=' + formdata.search_Period
        }
        if (formdata.search_Documenttype) {
            querystring += '&shareholderdoctype=' + encodeURIComponent(formdata.search_Documenttype)
        }
        if (formdata.search_Year) {
            querystring += '&year=' + formdata.search_Year
        }
        querystring += value === 3 ? '&shareholdercategory=Board Documents' :
            value === 4 ? '&shareholdercategory=Commitee Reports' :
                value === 5 ? '&shareholdercategory=Management Reports' :
                    value === 6 ? '&shareholdercategory=Shareholder Reports' :
                        value === 7 ? '&shareholdercategory=Agreements' :
                            value === 8 ? '&shareholdercategory=AFS' :
                                value === 9 ? '&shareholdercategory=Share Certificates' :
                                    ''
        return querystring
    }
    const getCompaniesList=async()=>{
        const orgCompanies= await getDataFromApi(getOrgCompaniesList, 1,'','',1);
        // console.log(orgCompanies,'orgCompanies',[...new Set(orgCompanies.data)])
        if(orgCompanies.status===200){
            setOrgCompaniesList([...new Set(orgCompanies.data)])
        }
    }
    useEffect(() => {
        if ([3, 4, 5, 6, 7, 8, 9].includes(value)) {
            if(companyId !==':orgID'){
               
                toGetAllDocuments(false);
            }
        }
    }, [value])
    useEffect(() => {
        if (value === 2) {
            getdatatable()
            getallBoardmember()
        }
        else if (value === 0) {
            getallSchedule()
        }
        else if (value === 6) {
            if(formdata?.yearShareHolderRepost !== "" || formdata?.quarterShareHolderRepost !== "" || formdata?.companyShareHolderRepost !== ""){
                getvaluationmember('');
                getCompaniesList();
            }
        }
        
    }, [formdata.shareholderyear, value, companyId, formdata.yearShareHolderRepost, formdata.quarterShareHolderRepost,formdata.companyShareHolderRepost])//, formdata.yearShareHolderRepost, formdata.quarterShareHolderRepost
    const toGetAllDocuments = async (string = true) => {
        var querystring = filterList()
        var querystrings = "?companyId=" + companyId +
            '&shareholdercategory=' + (
                value === 3 ? 'Board Documents' :
                    value === 4 ? 'Commitee Reports' :
                        value === 5 ? 'Management Reports' :
                            value === 6 ? 'Shareholder Reports' :
                                value === 7 ? 'Agreements' :
                                    value === 8 ? 'AFS' :
                                        value === 9 ? 'Share Certificates' :
                                            ''
            )
        //  + 
        // '&quarter=' + formdata.boardPeriod + '&year=' + formdata.boardYear
        const response = string ? await getDataFromApi(searchBoardDocuments + querystring, 1, '') :
            await getDataFromApi(searchBoardDocuments + querystrings, 1, '')
        if (response && response?.status == 200 && response?.data != null) {
            setAllDocumentList(response?.data)
        } else {
            console.log(response)
        }
    }
    function convertBlobToFile(blob, folderName, folderSizes) {
        const file = new File([blob], folderName, { type: blob?.type })
        return file
    }
    const handleUploadDocuments = async () => {
        if (!formdata.upload_Quarter) {
            setQuarterValidate(true);
            return;
        }

        var formData = new FormData();
        formData.append('quarter', edit || view ? formdata?.upload_Quarter : formdata?.upload_Quarter);
        formData.append('year', formdata?.upload_Year);
        formData.append('userId', localStorage?.getItem('id'));

        var payload = new FormData();
        payload.append('companyId', companyId);
        payload.append('quarter', formdata?.upload_Quarter);
        payload.append('year', formdata?.upload_Year);

        if (formdata.changeRadioButton === 'Folders') {
            const folderSize = folderSizes;
            const file = convertBlobToFile(uploadZipContent, `${folderName}.zip`, folderSizes);
            payload.append('document', file);
        } else {
            payload.append('document', formdata?.upload_File);
        }

        payload.append('shareholderdoctype', value === 7 ? 'Agreements' :
            value === 8 ? 'AFS' :
                value === 9 ? 'Share Certificates' : formdata?.upload_Documenttype);
        payload.append('shareholdercategory', value === 3 ? 'Board Documents' :
            value === 4 ? 'Commitee Reports' :
                value === 5 ? 'Management Reports' :
                    value === 6 ? 'Shareholder Reports' :
                        value === 7 ? 'Agreements' :
                            value === 8 ? 'AFS' :
                                value === 9 ? 'Share Certificates' : '');

        if (formdata.upload_Documenttype === 'Valuation Report') {
            formData.append('filereport', formdata.upload_File)
            const valuationReportResponse = await postDataFromApi(
                UploadOrgValuationReport,
                formData,
                1,
            );
            // if (response && response?.status === 200) {
            console.log(valuationReportResponse, "valuationReportResponse>>")
            if (valuationReportResponse && valuationReportResponse?.status === 200) {
                setalertMessage(
                    valuationReportResponse.message
                        ? valuationReportResponse.message
                        : formdata.changeRadioButton === 'Folders'
                            ? 'Folder is Uploaded Successfully'
                            : 'File is Uploaded Successfully'
                );
                setalert(true);
                setalertType('success');
                setUploadZipFolder(null);
                setuploadedFiles([]);
            }
            else {
                setalertMessage("error uploading file")
                setalert(true)
                setalertType('error')
            }
            return;
        }

        const response = await postDataFromApi(uploadBoardDocuments, payload, 1, '', 1);
        if (response && response.status === 200) {
            setalertMessage(
                response.message
                    ? response.message
                    : formdata.changeRadioButton === 'Folders'
                        ? 'Folder is Uploaded Successfully'
                        : 'File is Uploaded Successfully'
            );
            setalert(true);
            setalertType('success');
            setUploadZipFolder(null);
            setuploadedFiles([]);
        }
    };

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
    function removeUploadedZipFolder() {
        setUploadZipFolder(null)
        setUploadZipContent(null)
    }
    const handleDeleteConfirm = async (e) => {
        console.log('delete_id', delete_id)
        var query = ''
        var response = ''
        response = await deleteDataFromApi(deleteBoardmember + delete_id, query, 1)
        if (response && response.status == 200) {
            getallBoardmember()
            setDeleteId('')
            setDeleteOpen(false)
            setOpen(false)
            setalertMessage('Board Member Deleted Successfully')
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
    function handleClosesubmenu() {
        setAnchorEl(null)
    }
    function handleClicksubmenu(event, index) {
        setAnchorEl(event.currentTarget)
        setfileSelected(index)
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
        setIsPrinting(true)
        const input = document.getElementById('pdfid')
        const pdf = new jsPDF({ unit: 'px', format: 'letter', userUnit: 'px' })
        pdf.html(input, { html2canvas: { scale: 0.3 } }).then(() => {
            /*  var img = new Image()
             img.src = Solconlogosvg
             pdf.addImage(img, 'svg', 0, 0, 0, 15) */
            pdf.save('shareholderreport.pdf')
            setIsPrinting(false)
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
    function handleDeleteRecordClose() {
        setDeleteRecordOpen(false)
        setDeleteId('')
    }
    function handleDeleteRecordOpen(id) {
        setDeleteRecordOpen(true)
        setDeleteId(id)
    }
    const handleDeleteRecordConfirm = async (e) => {
        var query = ''
        var response = ''
        if (showExtractedFiles) {
            response = await deleteDataFromApi(
                deletedsubfileocumentfile + delete_id,
                [],
                1
            )
        }
        else {
            response = await deleteDataFromApi(
                deleteSingleDocument + delete_id,
                [],
                1
            )
        }
        if (response && response?.status == '200') {
            setDeleteId('')
            setDeleteRecordOpen(false)
            setalertMessage('User Deleted Successfully')
            setalert(true)
            setalertType('success')
            setIndex()
            if (showExtractedFiles) {
                if (currentFolderIsMain) {
                    getSelectedZipFolder(currentFolder, 1)
                }
                else {
                    getSelectedZipFolder(currentFolder, 0)
                }
            }
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
            setDeleteId('')
            setDeleteRecordOpen(false)
        }
    }
    const handlecheckChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked })
    }

    const handleChange = (event, newValue) => {
        console.log('newValue', newValue)
        setValue(newValue)
        setFormData((formData) => ({
            ...formData,
            search_Documenttype: '',
            search_Period: '',
            search_Year: '',
            shareholderyear: currentyear
        }))
        setShowExtractedFiles(false)
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
            upload_Year: year,
            upload_Quarter: null,

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
            upload_File: file,
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
        var response = ''
        response = await postDataFromApi(createIssue, newformdata, 1)
        if (response && response.status == 200) {
            setOpen(false)
            setalertMessage('Issue Submitted Successfully')
            setalert(true)
            setalertType('success')
        } else {
            setOpen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
        }
    }
    const renderContent = (item, field) => {
        if (item?.type === 'header') {
            return item[field]
        } else {
            return field || '-'
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
        var response = ''
        response = await postDataFromApi(createSchedule, newformdata, 1)
        if (response && response.status == 200) {
            setOpen(false)
            setmeetingopen(false)
            setalertMessage('Schedule Created Successfully')
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
    const handleSubmitBoardmember = async (e, editid) => {
        e.preventDefault()
        var response = ''
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
        var editformdata = {
            id: editid,
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
        if (editid) {
            response = await putDataFromApi(updateBoardMemberDetails, editformdata, 1)
        } else {
            response = await postDataFromApi(createBoardmember, newformdata, 1)
        }
        if (response && response.status == 200) {
            setOpen(false)
            if (editid) {
                setalertMessage('Updated Board Member Successfully')
            } else {
                setalertMessage('Created Board Member Successfully')
            }
            setalert(true)
            setalertType('success')
            getallBoardmember()
        } else {
            getallBoardmember()
            setOpen(false)
            setalertMessage('Error')
            setalert(true)
            setalertType('error')
        }
    }

    useEffect(() => {
        // getallBoardmember()
        // getallSchedule()
        // getdocumentsList()
        // getshareholderdocsList()
        if (companyId === ':orgID') {
            setValue(6);
            clearOrgCompanyFunction('companyid');
            setTimeout(()=>{
                clearOrgCompanyFunction('timeout');
            },500)
        } else {
            setValue(0);
            setFormData((formData) => ({
                ...formData,
                'companyShareHolderRepost': companyLabel,
                'yearShareHolderRepost':  '',
                'quarterShareHolderRepost':  '',
            }))
        }
    }, [companyId])

    const getallBoardmember = async () => {
        var query = ''
        const response = await getDataFromApi(getAllBoardmember + companyId, 1)
        if (response && response.status == 200 && response.data != null) {
            setallBoardmember(response?.data)
        }
    }

const [orgCompaniesList,setOrgCompaniesList]=useState([]);
const clearOrgCompanyFunction= (check)=>{
    let catopt=[{   
                    value: 0,
                    name: 'No Data',
                    year:0,
                    quarter:0
                }]
    setValuationCprPer(catopt);
    setValuationMember(catopt);
    setPeriodChngValuation(catopt);
    setPortFolioPer(catopt)
    setValEquityValue(catopt);
    setValAssetCoverRatio(catopt);
    setValutionReports([]);
    setTotalvaluation(catopt);
    setFormData((formData) => ({
        ...formData,
        'yearShareHolderRepost':  '',
        'quarterShareHolderRepost':  '',
        'companyShareHolderRepost': ''
    }));
    console.log(formdata,'check formdata---',check)
    
}
    const getvaluationmember = async () => {
        if (companyId) {// check here
            // const response = await getDataFromApi(
            //     getOrgValauationReports + `?quarter=${formdata.quarterShareHolderRepost}` + '&year=' + formdata.yearShareHolderRepost,// calling on page load
            //     1
            // )
        //    if(formdata.yearShareHolderRepost ||formdata.quarterShareHolderRepost && !formdata.companyShareHolderRepost)
        const queryParams = [];
            let response=''
            let EquityValueResponse=''
            let AssetCoverRatioResponse=''
            var catopt = [];
            var catopt1 = [];
            var catopt2=[];
            var catopt3=[];
            var catopt4=[];
            var yearQuarterData=[]
            if(formdata.yearShareHolderRepost &&formdata.quarterShareHolderRepost &&!formdata.companyShareHolderRepost ){
                response = await getDataFromApi(
                    shareholderRepoTable + `?year=${formdata.yearShareHolderRepost}` + '&quarter=' + formdata.quarterShareHolderRepost + '&documentType='+'Fixed Documents'+'&category='+'Valuation Report',
                    1,'','',1
                );
                    EquityValueResponse = await getDataFromApi(
                        getValuationEquityValue + `?year=${formdata.yearShareHolderRepost}` + '&quarter=' + formdata.quarterShareHolderRepost,
                        1,'','',1
                    );
                    AssetCoverRatioResponse = await getDataFromApi(
                        getValuationAssetCoverRatio + `?year=${formdata.yearShareHolderRepost}` + '&quarter=' + formdata.quarterShareHolderRepost,
                        1,'','',1
                    );
                console.log(AssetCoverRatioResponse,'AssetCoverRatioResponse==EquityValueResponse',EquityValueResponse)
            }else  if(formdata?.yearShareHolderRepost !== "" || formdata?.quarterShareHolderRepost !== "" || formdata?.companyShareHolderRepost !== ""){
                if (formdata.companyShareHolderRepost) {
                    queryParams.push(`valuationCompanyName=${formdata.companyShareHolderRepost}`);
                  }
                  if (formdata.yearShareHolderRepost) {
                    queryParams.push(`year=${formdata.yearShareHolderRepost}`);
                  }
                  if (formdata.quarterShareHolderRepost) {
                    queryParams.push(`quarter=${formdata.quarterShareHolderRepost}`);
                  }
                  const queryString = queryParams.join('&');

            response = await getDataFromApi(
                getOrgValauationReports +'?'+ queryString,
                1,'','',1
            );
            if (!formdata.companyShareHolderRepost) {
                EquityValueResponse = await getDataFromApi(
                    getValuationEquityValue +'?'+ queryString,
                    1,'','',1
                );
                AssetCoverRatioResponse = await getDataFromApi(
                    getValuationAssetCoverRatio +'?'+ queryString,
                    1,'','',1
                );
            }
            }
            if (EquityValueResponse && EquityValueResponse?.status == 200 && EquityValueResponse?.data != null && typeof EquityValueResponse?.data !== 'string') {
                setValEquityValue(EquityValueResponse.data)
            }else{
                setValEquityValue([])//check==
            }
            if (AssetCoverRatioResponse && AssetCoverRatioResponse?.status == 200 && AssetCoverRatioResponse?.data != null && typeof AssetCoverRatioResponse?.data !== 'string') {
                setValAssetCoverRatio(AssetCoverRatioResponse.data)
            }else{
                setValAssetCoverRatio([])
            }
            if (response && response?.status == 200 && response?.data != null && typeof response?.data !== 'string') {
                if (Array.isArray(response?.data?.bCashAndReceivables)) {
                    const mappedReports = (response?.data?.bCashAndReceivables || [])?.map((item) => ({
                        valuation_companyName: item?.purpose,
                        reportedValue1ZARm: item?.reportedValue1ZARm,
                        reportedValue2ZARm: item?.reportedValue2ZARm,
                        periodChangeinReported: item?.periodChangeinReportedValue,
                    }));

                    const totalEquityInvestments = {
                        ...response?.data?.totalEquityInvestments,
                        valuation_companyName: 'Total Equity Investments',
                    };

                    const totalReportedValue = {
                        ...response?.data?.totalReportedValue,
                        valuation_companyName: 'Total Reported Value',
                    };

                    const cashAndReceivables = {
                        valuation_companyName: 'B. Cash And Receivables',
                        type: 'header'
                    };

                    const totalCash = {
                        valuation_companyName: 'Total Cash',
                        type: 'header'
                    };

                    const equityInvestments = {
                        valuation_companyName: 'A. Equity Investments',
                        type: 'header'
                    };
                        response?.data?.companyValuation?.map((labelValuedto, i) => {
                        var ct = {
                            value: labelValuedto.grossIrr?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt.push(ct);
                        var ct1 = {
                            value: labelValuedto.cpiOwnerShip_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt1.push(ct1);
                        var ct2 ={
                            value:labelValuedto.periodchangeinValuation_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt2.push(ct2)
                        var ct3 ={
                            value:labelValuedto.portfolio_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt3.push(ct3)
                        yearQuarterData.push(labelValuedto.quarter+'FY'+labelValuedto.year)
                //    var singleSeriesObj= { type: 'line', smooth: true };
                //    seriesData.push(singleSeriesObj);
                    })
                    // setValuData(response?.data?.companyValuation)
                    setValutionReports([
                        equityInvestments,
                        ...(response?.data?.companyValuation || []),
                        totalEquityInvestments,
                        cashAndReceivables,
                        ...mappedReports,
                        totalCash,
                        totalReportedValue,
                    ]);
                }
               
                    if(Array.isArray(response?.data)){
                    response?.data?.map((labelValuedto, i) => {
                        var ct = {
                            value: labelValuedto.grossIrr?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt.push(ct);
                        var ct1 = {
                            value: labelValuedto.cpiOwnerShip_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt1.push(ct1);
                        
                        // var ct2 ={
                        //     value:labelValuedto.periodchangeinValuation_per?.toFixed(0),
                        //     name: labelValuedto.valuation_companyName,
                        //     yrQuarter:labelValuedto.quarter+'FY'+labelValuedto.year
                        // }
                        var ct2 ={
                            value:labelValuedto.periodchangeinValuation_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt2.push(ct2)
                        var ct3 ={
                            value:labelValuedto.portfolio_per?.toFixed(0),
                            name: labelValuedto.valuation_companyName,
                            year:labelValuedto.year,
                            quarter:labelValuedto.quarter
                        }
                        catopt3.push(ct3)
                        yearQuarterData.push(labelValuedto.quarter+'FY'+labelValuedto.year)
                        // var singleSeriesObj= { type: 'line', smooth: true };
                        // seriesData.push(singleSeriesObj);
                    }) ;

                    setValutionReports([
                        // equityInvestments,
                        ...(response?.data || []),
                        // totalEquityInvestments,
                        // cashAndReceivables,
                        // ...mappedReports,
                        // totalCash,
                        // totalReportedValue,
                    ]);
                    }
                    // setValuData(response?.data)
                // }
                if (catopt?.length == 0 && catopt1?.length == 0 && catopt2?.length == 0) {
                    var ct = {
                        value: null,
                        name: 'No Data',
                    }
                    catopt.push(ct)
                    var ct1 = {
                        value: 0,
                        name: 'No Data',
                    }
                    catopt1.push(ct1);
                    var ct2 = {
                        value: 0,
                        name: 'No Data',
                    }
                    catopt2.push(ct2);
                    var ct3 = {
                        value: 0,
                        name: 'No Data',
                        year:0,
                        quarter:0
                    }
                    catopt3.push(ct3);
                    
                }
                
                setValuationMember(catopt);
                setValuationCprPer(catopt1);
                setPeriodChngValuation(catopt2);
                setPortFolioPer(catopt3);
            }
            else {
                if (catopt?.length == 0 && catopt1?.length == 0 && catopt3?.length == 0&& catopt2?.length == 0) {
                    var ct = {
                        value: 0,
                        name: 'No Data',
                        itemStyle: { color: "lightgray", },
                    }
                    catopt.push(ct)
                    var ct1 = {
                        value: 0,
                        name: 'No Data',
                        itemStyle: { color: "lightgray", },
                    }
                    catopt1.push(ct1);
                    var ct2 = {
                        value: 0,
                        type:'line',
                        name: 'No Data',
                        itemStyle: { color: "lightgray", },
                    }
                    // catopt2.push(ct2)
                    catopt2.push(ct2);
                    var ct3 = {
                        value: 0,
                        type:'pie',
                        name: 'No Data',
                        year:0,
                        quarter:0,
                        itemStyle: { color: "lightgray", },
                    }
                    // catopt2.push(ct2)
                    catopt3.push(ct3);
                }
                setValutionReports([]);
                setValuationMember(catopt);
                setValuationCprPer(catopt1);
                setPeriodChngValuation(catopt2);
                setPortFolioPer(catopt3)
            }
        } else if(companyId !== ':orgID' ) {
            const response = await getDataFromApi(
                getvaluation + `?companyId=${companyId}` + '&year=' + formdata.shareholderyear,// calling on page load
                1
            )
            if (response && response?.status == 200 && response?.data != null) {
                // setValuationMember(response?.data)
                setValuData(response.data)
            }
            setValEquityValue([]);
            setValAssetCoverRatio([]);
            setValutionReports([]);
            
            setTotalvaluation([{
                value: 0,
                name: 'No Data',
                year:0,
                quarter:0
            }]);
            setValuationMember([{
                value: 0,
                name: 'No Data',
                year:0,
                quarter:0
            }]);
                setValuationCprPer([{
                    value: 0,
                    name: 'No Data',
                    year:0,
                    quarter:0
                }]);
                setPeriodChngValuation([{
                    value: 0,
                    name: 'No Data',
                    year:0,
                    quarter:0
                }]);
                setPortFolioPer([{
                    value: 0,
                    name: 'No Data',
                    year:0,
                    quarter:0
                }])

        }
    }

    const getdocumentsList = async () => {
        const response = await getDataFromApi(
            getBoardDocuments + '?company=' + companyId,
            1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setDocsList(response.data)
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

           }
    }

    function handleClose() {
        setOpen(false)
        setmeetingopen(false)
        setdetailsopen(false)
        setDetailsRecordOpen(false)
        setsingleBoardmember([])
    }

    function handleClickOpenRecord(type, record) {
        setAnchorEl(null)
        setOpen(true)
        setView(false)
        if (type === 'view') {
            setFormData((formData) => ({
                ...formData,
                documentType: record.shareholderdoctype,
                year: record.year,
                quarter: record.quarter,
                uploadDate: record.uploadDate,
                filename: record.filename,

            }))
            if (type === 'view') {
                setOpen(false)
                setDetailsRecordOpen(!detailsRecordOpen)
            }
        }
    }
    function handleClickOpen(member) {
        setEdit(true)
        setEditid(member.id)
        setFormData({
            ...formdata,
            membername: member.name,
            memberemail: member.email,
            memberphone: member.phoneNumber,
            gender: member.gender,
            age: member.age,
            status: member.status,
            address: member.address,
            city: member.city,
            state: member.state,
            country: member.country,
            zipcode: member.zip,
            joiningDate: '',
            // companyId: companyId,
        })
        setOpen(true)
    }
    function handleClickmeetingOpen() {
        setmeetingopen(true)
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id ?e.id:e
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        if (value) {
            if (type == 'country') {
                getstateOpt(value)
            }
        } else {
            if (type == 'country') {
                setstateOpt([])
            }
        }
    }
    const shouldDisableDate = (date) => {
        return date > new Date();
    };
    function changeYearDropdown(type, e) {
        if (e) {
            var value = e.label
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
        formdata['upload_File'] = null
        $(".fileuploadBox.documentfileupload input[type='file']").val(null)
    }

    useEffect(() => {
        if (formdata.upload_Quarter !== '') {
            setQuarterValidate(false)
        }
    }, [formdata.upload_Quarter])
    const getdatatable = async () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#customdatatable').DataTable()
            }, 500)
        })
    }
    const generateTabPanel = (index, handleOpenUploadDocument) => (
        <TabPanel
            key={index}
            value={value}
            index={index}
            className="tabpanel nopadding notclear"
        >
            <div className="rightalign_btn">
                <Button
                    variant="contained"
                    color="primary"
                    className="whitebg icon document-upload"
                    onClick={handleOpenUploadDocument}
                >
                    <Icon fontSize="medium">backup</Icon> Upload Document
                </Button>
            </div>
        </TabPanel>
    );
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Shareholder Repository' }]}
                />
                {companyId === ':orgID' ?
                    <div className="breadnavigation">
                        {/* // */}
                        Dashboard /
                        Shareholder Repository{' '}
                    </div>
                    :
                    <div className="breadnavigation">
                        {/* // */}
                        Home / Company lists{' '}
                        {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                        Shareholder Repository{' '}
                    </div>
                }

            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            {companyId !== ':orgID' ?
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
                    <Tab label="Shareholder Repository" />
                    <Tab label="Agreements" />
                    <Tab label="AFS" />
                    <Tab label="Share Cerfificates" />
                </Tabs> :
                <Tabs
                    value={6}
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

                    <Tab disabled label="Shareholder reports" />
                </Tabs>}
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
            <div className="uploaddoc">
                {[3, 4, 5, 6, 7, 8, 9].map((index) => generateTabPanel(index, handleOpenUploadDocument))}
            </div>
            {/* <TabPanel
                value={value}
                index={3}
                className="tabpanel nopadding notclear "
            >
                <div className="rightalign_btn">
                    <Button
                        variant="contained"
                        color="primary"
                        className="whitebg icon document-upload"
                        onClick={handleOpenUploadDocument}
                    >
                        <Icon fontSize="medium">backup</Icon> Upload Document
                    </Button>
                </div>
            </TabPanel> */}
            <div className="uploaddoc">
                {/* <TabPanel
                    value={value}
                    index={4}
                    className="tabpanel nopadding notclear "
                >
                    <div className="rightalign_btn">
                        <Button
                            variant="contained"
                            color="primary"
                            className="whitebg icon document-upload"
                            onClick={handleOpenUploadDocument}
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
                            onClick={handleOpenUploadDocument}
                        >
                            <Icon fontSize="medium">backup</Icon> Upload Document
                        </Button>
                    </div>
                </TabPanel>
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
                            onClick={handleOpenUploadDocument}
                        >
                            <Icon fontSize="medium">backup</Icon> Upload Document
                        </Button>
                    </div>
                </TabPanel> */}
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
                                                label="Enter Name"
                                                placeholder="Enter Name"
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
                                                label="Enter Email Id"
                                                placeholder="Enter Email Id"
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
                                                label="Enter Phone Number"
                                                placeholder="Enter Phone Number"
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
                                                label="Enter Subject"
                                                placeholder="Enter Subject"
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
                                                label="Enter Your Text Here...."
                                                placeholder="Enter Your Text Here...."
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
                                                CANCEL
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
                        <StyledTable className="customtable odd-even withborder" id="customdatatable">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>#</TableCell> */}
                                    <TableCell>MEMBER NAME</TableCell>
                                    <TableCell>EMAIL ID </TableCell>
                                    <TableCell>PHONE NUMBER</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    {/* <TableCell>Join date</TableCell> */}
                                    <TableCell>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allBoardmember.map((member, index) => (
                                    <TableRow key={index}>
                                        {/* <TableCell align="left">
                                            {member.id}
                                        </TableCell> */}
                                        <TableCell align="left" className="imgCell">
                                            <span>
                                                {/* <img src={prof} /> */}
                                                {<span className="profileInitial">{getProfile(member?.name)}</span>}
                                                {member?.name}
                                            </span>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div style={{ textTransform: "lowercase", display: "flex" }}> {member?.email ? member?.email : '-'}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            {member?.phoneNumber ? member?.phoneNumber : '-'}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={
                                                member.status
                                                    ? statusopt?.map((opt) => {
                                                        if (
                                                            opt.id ==
                                                            member?.status
                                                        )
                                                            return opt.label
                                                    })
                                                    : ''
                                            }
                                        >
                                            {member?.status
                                                ? statusopt?.map((opt) => {
                                                    if (
                                                        opt.id ==
                                                        member?.status
                                                    )
                                                        return (
                                                            <span>
                                                                {opt.label}
                                                            </span>
                                                        )
                                                })
                                                : ''}
                                        </TableCell>
                                        {/* <TableCell align="left">
                                            {member.joiningDate}
                                        </TableCell> */}
                                        <TableCell align="left">
                                            <Tooltip
                                                title="View"
                                                fontSize="large"
                                                onClick={() =>
                                                    handleDetailsmenu(member?.id)
                                                }
                                            >
                                                <Icon fontSize="large" className="actioniconspointer">
                                                    remove_red_eye
                                                </Icon>
                                            </Tooltip>
                                            <Tooltip
                                                title="Edit"
                                                fontSize="large"
                                                onClick={() => {
                                                    handleClickOpen(member)
                                                }}
                                            >
                                                <Icon fontSize="large" className="actioniconspointer">
                                                    mode_edit
                                                </Icon>
                                            </Tooltip>
                                            <Tooltip
                                                title="Delete"
                                                fontSize="large"
                                                onClick={() =>
                                                    handleDeleteOpen(member?.id)
                                                }
                                            >
                                                <Icon fontSize="large" className="actioniconspointer">
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
            {[3, 4, 5, 6, 7, 8, 9].includes(value) && (
                <TabPanel className="tabpanel">
                    <Box width="100%" className="box">
                        <StyledCard elevation={6} className="searchdiv">
                            {!showExtractedFiles && (
                                <ValidatorForm
                                    // onSubmit={handleSubmit}
                                    onError={() => null}
                                    className="leadsearch customform"
                                >
                                    <Grid container spacing={3} className="testetest">
                                        <Grid item lg={3} md={3} sm={6} xs={6}>
                                            <label>Document Type</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                // options={testing}
                                                options={value === 3 ? boardDocumentOptions :
                                                    value === 4 ? committeeReportOptions :
                                                        value === 5 ? monthlyReportOptions :
                                                            value === 6 ? shareholderReportOptions :
                                                                value === 7 ? agreementsOptions :
                                                                    value === 8 ? afsOptions :
                                                                        shareCertificatesOptions
                                                }
                                                // getOptionLabel={(option) => option.label}
                                                onChange={(event, value) =>
                                                    changedropdownvalue(
                                                        'search_Documenttype',
                                                        value
                                                    )
                                                }
                                                // disableClearable={formdata.boardFilter_Documenttype === '' ? true : false}
                                                // inputValue={formdata.search_Documenttype}
                                                value={formdata.search_Documenttype || ""}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        name="searchDocumenttype"
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
                                                onChange={(event, value) =>
                                                    changeYearDropdown('search_Year', value)
                                                }
                                                // inputValue={formdata.search_Year}
                                                value={formdata.search_Year || ''}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        name="search_Year"
                                                        placeholder="Select"
                                                        validators={['required']}
                                                        errorMessages={[
                                                            'this field is required',
                                                        ]}
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
                                                // getOptionLabel={(option) => option.label}
                                                onChange={(event, value) => changedropdownvalue('search_Period', value)}
                                                // inputValue={formdata.search_Period}
                                                value={formdata.search_Period}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        name="searchPeriod"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={1} sm={6} xs={6}>
                                            <div className='shareholder-repo-search'>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className="whitebg"
                                                    onClick={toGetAllDocuments}
                                                >
                                                    Search
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    className="whitebg shareholder-clear"
                                                    onClick={clearDropdownValues}
                                                    color="primary"
                                                >
                                                    Clear
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            )}
                        </StyledCard>
                    </Box>
                    <SubTitle>
                        {showExtractedFiles ? (<>{getCurrentFolderPath()}</>) : ''}
                    </SubTitle>
                    <Grid container spacing={3} className='folderss'>
                        {companyId === ':orgID' ? '':showExtractedFiles && (
                            <>
                                {allSubFolders?.map((folder, index) => {
                                    const folderSegments = folder.split('/')
                                    const lastFolderName = folderSegments[folderSegments.length - 1]
                                    return (
                                        <Grid item className="border-grid-docs" lg={3.6} md={3.6} sm={4} xs={12}>
                                            <div className="fullfolder">
                                                <div
                                                    className="img-para"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => { getSelectedZipFolder(folder) }}
                                                >
                                                    <Icon fontSize='medium'>
                                                        <img src={getFileIcon(lastFolderName, 1)} />
                                                    </Icon>{' '}
                                                    <span className="filenamedocs">
                                                        {lastFolderName}
                                                    </span>
                                                </div>
                                                <div className='folderfileDetail'>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )}
                    </Grid>
                    <Grid container spacing={1} className="folderGrid">
                        {companyId !== ':orgID'&& showExtractedFiles ? (
                            <>
                                {allExtractFiles?.map((extractfiles, index) => {
                                    return (
                                        <Grid item className="border-grid-docs" lg={3.6} md={3.6} sm={4} xs={12}>
                                            <div className="fullfolder">
                                                <div
                                                    className="img-para subfolders"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        getFileExtension(extractfiles?.fileName) === 'zip'
                                                            ? getSelectedZipFolder(extractfiles?.folderPath)
                                                            : window.open(extractfiles?.presignedUrl, '_blank')
                                                    }}
                                                >
                                                    <Icon fontSize='medium'>
                                                        <img src={getFileIcon(extractfiles?.fileName)} />
                                                    </Icon>
                                                    <span className="filenamedocs">
                                                        {extractfiles?.fileName.split('.')[0]}
                                                    </span>
                                                </div>
                                                <div className="container">
                                                    <div style={{ marginLeft: "90%" }} onClick={(e) => handleClicksubfoldermenu(e, extractfiles)}>
                                                        <Icon style={{ cursor: 'pointer' }} fontSize="medium" className="more_horiz subfiles">
                                                            more_horiz
                                                        </Icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (companyId !== ':orgID'&& allDocumentList.map((Documents, index) => (
                            <Grid item className="border-grid-docs" lg={3.6} md={3.6} sm={4} xs={12}
                            >
                                <div className="fullfolder">
                                    <div className="img-para"
                                        style={{ cursor: 'pointer' }}
                                        // onClick={() =>
                                        //     window.open(Documents.presignedurl, '_blank')
                                        // }
                                        onClick={() => {
                                            const extension = getFileExtension(Documents?.filename)
                                            if (extension === 'zip') {
                                                if (Documents.folderPath) {
                                                    getSelectedZipFolder(Documents?.folderPath, 1)
                                                } else {
                                                    getSelectedZipFolder(Documents?.filename, 1)
                                                }
                                            } else {
                                                window.open(Documents.presignedurl, '_blank')
                                            }
                                        }}
                                    >
                                        <Icon fontSize='medium'>
                                            <img style={{ width: "24px" }} src={getFileIcon(Documents?.filename)} />
                                        </Icon>{''}
                                        <span className="filenamedocs">
                                            {Documents?.filename.split('.')[0]}
                                        </span>
                                    </div>
                                    <div className="folderfileDetail">
                                        {Documents?.uploadDate} {''}Quarter:{Documents?.quarter}
                                    </div>
                                    <div className="container">
                                        <div className="icon-wrapper" onClick={(e) => handleClicksubmenu(e, Documents)}>
                                            <Icon fontSize="medium" className="more_horiz">
                                                more_horiz
                                            </Icon>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))
                        )}
                    </Grid>
                </TabPanel>
            )}
            {submeuopen && !subFolderMenuShow ? (
                <Menu
                    id="submenu"
                    anchorEl={anchorEl}
                    open={submeuopen}
                    onClose={handleClosesubmenu}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 125,
                        },
                    }}
                >
                    <MenuItem
                        key="1"
                        onClick={() => handleClickOpenRecord('view', fileSelected)}
                    >
                        <Icon fontSize="small" className="more_horiz">
                            remove_red_eye
                        </Icon>{' '}
                        Details
                    </MenuItem>
                    <MenuItem key="5">
                        {allDocumentList?.map((file, index) => (
                            <div
                                key={index}
                                onClick={() => window.open(file?.presignedurl, '_blank')}
                            >
                                <div style={{ display: 'flex' }}>
                                    {fileSelected === file && (
                                        <>
                                            <Icon fontSize="small" className="more_horiz">
                                                {' '}
                                                file_download
                                            </Icon>
                                            Download
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </MenuItem>
                    <MenuItem
                        key="7"
                        onClick={() => handleDeleteRecordOpen(fileSelected?.id)}
                    >
                        <Icon fontSize="small" className="more_horiz">
                            delete
                        </Icon>{' '}
                        Delete
                    </MenuItem>
                </Menu>)
                : subFolderMenuShow ? (
                    <Menu
                        id="submenu"
                        anchorEl={anchorEl2}
                        open={subFolderMenuShow}
                        onClose={handleclosesubfoldermenu}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 125,

                            },
                        }}
                    >
                        <MenuItem key="5">
                            {allExtractFiles?.map((extractfiles, index) => (
                                <div
                                    key={index}
                                    onClick={() => { window.open(extractfiles?.presignedUrl, '_blank') }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        {subFolderFile === extractfiles && (
                                            <>
                                                <Icon fontSize="small" className="more_horiz">
                                                    {' '}
                                                    file_download
                                                </Icon>
                                                Download
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </MenuItem>
                        <MenuItem
                            key="7"
                            onClick={() => handleDeleteRecordOpen(subFolderFile?.uuid)}
                        >
                            <Icon fontSize="small" className="more_horiz">
                                delete
                            </Icon>{' '}
                            Delete
                        </MenuItem>
                    </Menu>
                ) : (
                    null
                )}
            <TabPanel
                value={value}
                index={6}
                className="tabpanel shareholder_report"
            >
                <Tabs
                    value={valuationTab}
                    onChange={(e, value) => setValuationTab(value)}
                    aria-label="basic tabs example"
                    className="whitebg"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabScrollButton-root': {
                            color: 'white',
                        },
                    }}
                >
                    <Tab label="Graph" value={0} />
                    <Tab label="Table" value={1} />
                </Tabs>
                <ValidatorForm className="year-form" style={{position:'relative',top:'-32px'}}>
                    <div className="year-form-inner" style={{position:'absolute',right:'-19%',top:'-10%'}}>
                        <label>Year:</label>
                        <AutoComplete
                            className="dropdown"
                            fullWidth
                            options={yearopt}
                            value={{'label':formdata.yearShareHolderRepost} || yearopt[0]}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                changedropdownvalue('yearShareHolderRepost', value)
                            }
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Select"
                                    value={formdata.yearShareHolderRepost}
                                    name="year"
                                    placeholder="Select"
                                />
                            )}
                        />
                        <label>Quarter:</label>
                        <AutoComplete
                            className="dropdown"
                            fullWidth
                            options={quaterOpt}
                            value={{'label':formdata.quarterShareHolderRepost} ||  quaterOpt[0] }
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                changedropdownvalue('quarterShareHolderRepost', value)
                            }
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Select"
                                    value={formdata.quarterShareHolderRepost}
                                    name="year"
                                    placeholder="Select"
                                />
                            )}
                        /> 
                        {/* <span style={{color:'white'}}> | </span> */}
                         <label style={{position:'relative',top:'60px',right:'40%'}}>Company:</label>
                         {/* <label>Company:</label> */}
                        <AutoComplete
                            className="dropdown"
                            fullWidth
                            disabled={companyLabel!== ''? true:false}
                            options={orgCompaniesList}
                            value={formdata.companyShareHolderRepost}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => {
                                changedropdownvalue('companyShareHolderRepost', value)
                            }
                            }
                            style={{position:'relative',right:'40%',top:'20px'}}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Select"
                                    value={formdata.companyShareHolderRepost}
                                    name="companyShareHolderRepost"
                                    placeholder="Select"
                                    style={{marginTop:'40px'}}
                                />
                            )}
                        />
                    </div>
                    <div style={{position:'absolute',right:'1%'}}>
                    {/* <Button onClick={()=>getOrgCompaniesListByCompanyName()}>Search</Button> */}
                    <Button style={{color:'white'}} onClick={()=>clearOrgCompanyFunction()}>Clear</Button>
                    </div>
                </ValidatorForm>
                {valuationTab === 0 ?
                    <Box className="box" style={{marginTop:'-2px',paddingTop:'45px',border:'2px solid white',borderRadius:'7px'}}>
                        <Grid width="100%" container >
                            <Grid className='valuationpiechart' item lg={6} md={6} sm={6} xs={12}>
                                <StyledCard elevation={6} className="echarts ">
                                    <CardHeader className="cardheader">
                                        <Title>CPR OWNERSHIP PERCENTAGE(%)</Title>
                                    </CardHeader>
                                    <SimpleCard>
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...ValCPROwnshipPer,
                                                color: colors,
                                            }}
                                            notMerge={true}
                                        />
                                    </SimpleCard>
                                </StyledCard>
                            </Grid>
                            <Grid className='valuationpiechart' item lg={6} md={6} sm={6} xs={12}>
                                <StyledCard elevation={6} className="echarts ">
                                    <CardHeader className="cardheader">
                                        <Title>Gross IRR(%)</Title>
                                    </CardHeader>
                                    <SimpleCard>
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...ValGrossIRR,
                                                color: colors,
                                            }}
                                            notMerge={true}
                                        />
                                    </SimpleCard>
                                </StyledCard>
                            </Grid>
                            <Grid className='valuationpiechart' item lg={6} md={6} sm={6} xs={12}>
                                <StyledCard elevation={6} className="echarts ">
                                    <CardHeader className="cardheader">
                                        <Title>PERIOD CHANGE IN VALUATION PERCENTAGE(%) </Title>
                                    </CardHeader>
                                    <SimpleCard>
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...ValReportedValue,
                                                color: colors,
                                            }}
                                            notMerge={true}
                                        />
                                    </SimpleCard>
                                </StyledCard>
                            </Grid>
                            <Grid className='valuationpiechart' item lg={6} md={6} sm={6} xs={12}>
                                <StyledCard elevation={6} className="echarts ">
                                    <CardHeader className="cardheader">
                                        <Title>Portfolio Percentage(%) </Title>
                                    </CardHeader>
                                    <SimpleCard>
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...valuPortFolioPerData,
                                                color: colors,
                                            }}
                                            notMerge={true}
                                        />
                                    </SimpleCard>
                                </StyledCard>
                            </Grid>
                            <Grid className='valuationpiechart' item lg={12} md={12} sm={12} xs={12}>
                                <StyledCard elevation={6} className="echarts ">
                                    <CardHeader className="cardheader">
                                        <Title>Equity & Asset Cover Ratio(%) </Title>
                                    </CardHeader>
                                    <SimpleCard>
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...EQuityValuationAssetRatio,
                                                color: colors,
                                                // color: ['#2F8CD8', '#D43F8D',],
                                            }}
                                            notMerge={true}
                                        />
                                    </SimpleCard>
                                </StyledCard>
                            </Grid>
                        </Grid>
                    </Box>
                    :
                    <div className="tabpanelInner" style={{marginTop:'-2px',paddingTop:'30px',border:'2px solid white',borderRadius:'7px'}}>
                        <Box width="100%" className="box">
                            <br />
                            <br />
                            <StyledCard elevation={12} className="paddingbottom">
                                <CardHeader className="cardheader nomarginBottom">
                                    <Title>Valuation Report</Title>
                                </CardHeader>
                            </StyledCard>
                            <div className="table_scroll reportscrollstyle" style={{padding:'5px'}}>
                                <StyledTable className="customtable odd-even  withborder">
                                    <TableHead >
                                    <TableRow className='bgcolor '>
                                        <TableCell style={{ width: "223px" }} >Company Name</TableCell>
                                        <TableCell >Year</TableCell>
                                            <TableCell >Quarter</TableCell>
                                            <TableCell>Owner ship %</TableCell>
                                            <TableCell>Initial Investment Date</TableCell>
                                            <TableCell>Total Invested </TableCell>
                                            <TableCell>Period Change in Total Invested</TableCell>
                                            <TableCell>Dividends Received Current Quarter </TableCell>
                                            <TableCell>Reported  (Present) Value </TableCell>
                                            <TableCell>Previous Quarter Valuation </TableCell>
                                            <TableCell>Valuation Methodology </TableCell>
                                            <TableCell>Period Change in Valuation</TableCell>
                                            <TableCell>Period change in Valuation(%) </TableCell>
                                            <TableCell>Multiple of Capital </TableCell>
                                            <TableCell>Gross IRR</TableCell>
                                            <TableCell>Portfolio %</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* <TableRow className="tablebodyTitle">
                                            <div>A. Equity Investments</div>
                                        </TableRow> */}
                                        {valuationReports.length > 0 ? valuationReports?.map((member, index) => (
                                            <TableRow>
                                                <TableCell className={member?.type === 'header' ? 'header-row' : ''}> {member?.valuation_companyName || "-"}</TableCell>
                                                <TableCell className={member?.type === 'header' ? 'header-row' : ''}> {member?.year || "-"}</TableCell>
                                                <TableCell className={member?.type === 'header' ? 'header-row' : ''}> {member?.quarter || "-"}</TableCell>
                                                <TableCell>{(member?.cpiOwnerShip_per) ?renderContent(member, member?.cpiOwnerShip_per?.toFixed(2))+'%' :'-'}</TableCell>
                                                <TableCell>{renderContent(member, member?.initialInvestmentDate?.slice(0, 10))|| "-"}</TableCell>
                                                <TableCell>{renderContent(member, member?.totalInvestedZARm?.toFixed(2))|| "-"} </TableCell>
                                                <TableCell>{renderContent(member, member?.periodChangeinTotalInvested?.toFixed(2)) || "-"}  </TableCell>
                                                <TableCell>{renderContent(member, member?.periodChangeinProceedsReceived?.toFixed(2)) || "-"}</TableCell>
                                                <TableCell>{renderContent(member, member?.reportedValue1ZARm?.toFixed(2)) || "-"}</TableCell>
                                                <TableCell>{renderContent(member, member?.reportedValue2ZARm?.toFixed(2)) || "-"} </TableCell>
                                                <TableCell>{renderContent(member, member?.valuationMethodology) || "-"}   </TableCell>
                                                {/* {getCommas(member.valuationMethodology)} */}
                                                <TableCell>{renderContent(member, member?.periodChangeinReported?.toFixed(2)) || "-"}</TableCell>
                                                <TableCell>{typeof member?.periodchangeinValuation_per ==='number'&& member?.periodchangeinValuation_per ? renderContent(member, member?.periodchangeinValuation_per?.toFixed(2))+'%':'-'}</TableCell>
                                                <TableCell>{renderContent(member, member?.investmentmultiple?.toFixed(2)) || "-"} </TableCell>
                                                <TableCell>{renderContent(member, member?.grossIrr?.toFixed(2)) || "-"}</TableCell>
                                                <TableCell>{member?.portfolio_per? renderContent(member, member?.portfolio_per?.toFixed(2))+'%':'-'} </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableCell colSpan={14}><div className='tablenodata'>No Data Found For This Year Or Quarter</div></TableCell>
                                        )}

                                        {/* <TableRow className="tablebodyTitle">
                                            <div>B.Cash and Receivables</div>
                                        </TableRow> */}
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
                            <div className="table_scroll reportscrollstyle" style={{padding:'5px'}}>
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow  className='bgcolor '>
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
                                    {valEquityValue.length > 0 ? valEquityValue?.map((member, index) => (
                                            <TableRow>
                                                <TableCell > {member?.year || "-"}</TableCell>
                                                <TableCell > {member?.quarter || "-"}</TableCell>
                                                <TableCell > {member?.totalInvestments || "-"}</TableCell>
                                                <TableCell > {member?.liabilities || "-"}</TableCell>
                                                <TableCell > {member?.provisionFortax || "-"}</TableCell>
                                                <TableCell > {member?.dprefs || "-"}</TableCell>
                                                <TableCell > {member?.grossEqityvalue || "-"}</TableCell>
                                                <TableCell > {member?.eprefsvalue || "-"}</TableCell>
                                                
                                                <TableCell>{renderContent(member, member?.ordinaryEquityvalue)} </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableCell colSpan={8}><div className='tablenodata'>No Data Found For This Year Or Quarter</div></TableCell>
                                        )}
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
                            <div className="table_scroll reportscrollstyle" style={{padding:'5px'}}>
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow  className='bgcolor '>
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
                                                Adjusted D Pref share rolled-up value
                                            </TableCell>
                                            <TableCell>
                                                Asset cover ratio
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {valAssetCoverRatio.length > 0 ? valAssetCoverRatio?.map((member, index) => (
                                            <TableRow>
                                            <TableCell > {member?.year || "-"}</TableCell>
                                            <TableCell > {member?.quarter || "-"}</TableCell>
                                            <TableCell > {member?.totalPortfoliovalue || "-"}</TableCell>
                                            <TableCell > {member?.cashOnhandCpi || "-"}</TableCell>
                                            <TableCell > {member?.liabilitiesAndprovisions || "-"}</TableCell>
                                            <TableCell > {member?.dprefSharerolledUpvalue || "-"}</TableCell>
                                            <TableCell > {member?.adjustedPrefshareRolledupValue || "-"}</TableCell>
                                            <TableCell > {member?.assetCoverratio || "-"}</TableCell>
                                            
                                            {/* <TableCell>{renderContent(member, member?.ordinaryEquityvalue)} </TableCell> */}
                                        </TableRow>
                                        )) : (
                                            <TableCell colSpan={8}><div className='tablenodata'>No Data Found For This Year Or Quarter</div></TableCell>
                                        )}
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
                    </div>}
            </TabPanel>
            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm
                    onSubmit={(e) => handleSubmitBoardmember(e, editid)}
                    className="customform"
                    onError={() => null}
                >
                    <DialogTitle id="form-dialog-title" onClose={handleClose}>
                        {editid ? 'Update Board Member' : 'Add Board Member'}
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
                                        label="Enter Name"
                                        placeholder="Enter Name"
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                    <label>Phone Number</label>
                                    <TextField
                                        fullWidth
                                        label="Enter Phone Number"
                                        placeholder="Enter Phone Number"
                                        type="text"
                                        name="memberphone"
                                        value={formdata.memberphone || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                    <label>Gender</label>
                                    <AutoComplete
                                        defaultValue={getSelectedItem(
                                            formdata.gender,
                                            genderopt
                                        )}
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
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required*',
                                                ]}
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
                                        label="Enter Email Id"
                                        placeholder="Enter Email Id"
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                    <label>Age</label>
                                    <TextField
                                        fullWidth
                                        label="Enter Age"
                                        placeholder="Enter Age"
                                        type="text"
                                        name="age"
                                        value={formdata.age || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                    <label>Status</label>
                                    <AutoComplete
                                        defaultValue={getSelectedItem(
                                            formdata.status,
                                            statusopt
                                        )}
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
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required*',
                                                ]}
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
                                        label="Enter Address"
                                        placeholder="Enter Address"
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Country</label>
                                    <AutoComplete
                                        defaultValue={getSelectedItem(
                                            formdata.country,
                                            countryOpt
                                        )}
                                        className="dropdown"
                                        fullWidth
                                        options={countryOpt}
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
                                                validators={['required']}
                                                errorMessages={[
                                                    'this field is required*',
                                                ]}
                                            />
                                        )}
                                    />
                                    <label>City</label>
                                    <TextField
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={formdata.city || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter City"
                                        placeholder="Enter City"
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>State</label>
                                    <AutoComplete
                                        defaultValue={getSelectedItem(
                                            formdata.state,
                                            stateOpt
                                        )}
                                        className="dropdown"
                                        fullWidth
                                        options={stateOpt}
                                        // getOptionLabel={(option) =>
                                        //     option.label
                                        // }
                                        onChange={(event, value) =>
                                            changedropdownvalue('state', value)
                                        }
                                        {...(editid) && { value: formdata.state }}
                                        renderInput={(params) => (
                                            <>{
                                                editid ?

                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        id='state'
                                                        name="state"
                                                        placeholder="Select"

                                                    />
                                                    :
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        id='state'
                                                        name="state"
                                                        value={formdata.state}
                                                        placeholder="Select"
                                                        validators={['required']}
                                                        errorMessages={[
                                                            'this field is required*',
                                                        ]}
                                                    />
                                            }
                                            </>
                                        )}
                                    />
                                    <label>Zip code</label>
                                    <TextField
                                        type="text"
                                        name="zipcode"
                                        id="zipcode"
                                        value={formdata.zipcode || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter Zip code"
                                        placeholder="Enter Zip code"
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required*',
                                        ]}
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
                            {editid ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            className="whitebg"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            CANCEL
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
                        CANCEL
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
                                    <label>Meeting Title</label>
                                    <TextField
                                        type="text"
                                        name="meetingtitle"
                                        id="meetingtitle"
                                        value={formdata.meetingtitle || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter Meeting Title"
                                        placeholder="Enter Meeting Title"
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
                                        label="Enter Start Time"
                                        placeholder="Enter Start Time"
                                    />
                                    <label>End Time</label>
                                    <TextField
                                        type="text"
                                        name="endtime"
                                        id="endtime"
                                        value={formdata.endtime || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter End Time"
                                        placeholder="Enter End Time"
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
                                        label="Email Id With Seperated Comma"
                                        placeholder="Email Id With Seperated Comma"
                                    />
                                    <label>Meeting Description</label>
                                    <TextField
                                        type="text"
                                        name="meetingdesc"
                                        id="meetingdesc"
                                        value={formdata.meetingdesc || ''}
                                        onChange={(e) => formdatavaluechange(e)}
                                        label="Enter Your Description Here..."
                                        placeholder="Enter Your Description Here..."
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
                onClose={handleClose}
                style={{ cursor: "pointer" }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
                keepMounted
                TransitionComponent={Transition}
                className="sidebarPopup "
            >
                <DialogTitle id="form-dialog-title" onClose={handleClose}>
                    Board Member Details
                </DialogTitle>
                <DialogContent>
                    <div className="divInner">
                        <div className="basicdetailListing">
                            {/* <div className="detailListinginner">
                                <span>Id</span>
                                <span>: {singleBoardmember.id}</span>
                            </div> */}
                            <div className="detailListinginner">
                                <span>Member Name</span>
                                <span>: {singleBoardmember.name}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Email Id</span>
                                <span >: <div className="viewprofiledetails">{singleBoardmember.email}</div></span>
                            </div>
                            <div className="detailListinginner">
                                <span>Phone Number</span>
                                <span>: {singleBoardmember.phoneNumber}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Status</span>
                                <span>
                                    :{' '} {singleBoardmember.status}
                                    {/* // ? statusopt.map((opt) => {
                                        //     if (
                                        //         opt.id ==
                                        //         singleBoardmember.status
                                        //     )
                                        //         return (
                                        //             <span>{opt.label}</span>
                                        //         )
                                        // })
                                        // : ''} */}
                                </span>
                            </div>
                            {/* <div className="detailListinginner">
                                <span>Join Date</span>
                                <span>: {singleBoardmember.joiningDate}</span>
                            </div> */}
                            <div className="detailListinginner">
                                <span>Gender</span>
                                <span>
                                    :{' '} {singleBoardmember.gender}
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
                                    :{' '}{singleBoardmember.city}
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
                            <TableRow >
                                        <TableCell style={{ width: "223px" }} >Company Name</TableCell>
                                        <TableCell >Year</TableCell>
                                            <TableCell >Quarter</TableCell>
                                            <TableCell>Owner ship %</TableCell>
                                            <TableCell>Initial Investment Date</TableCell>
                                            <TableCell>Total Invested </TableCell>
                                            <TableCell>Period Change in Total Invested</TableCell>
                                            <TableCell>Dividends Received Current Quarter </TableCell>
                                            <TableCell>Reported  (Present) Value </TableCell>
                                            <TableCell>Previous Quarter Valuation </TableCell>
                                            <TableCell>Valuation Methodology </TableCell>
                                            <TableCell>Period Change in Valuation</TableCell>
                                            <TableCell>Period change in Valuation(%) </TableCell>
                                            <TableCell>Multiple of Capital </TableCell>
                                            <TableCell>Gross IRR</TableCell>
                                            <TableCell>Portfolio %</TableCell>
                                        </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow className="tablebodyTitle">
                                    <div>A. Equity Investments</div>
                                </TableRow> */}
                                {valuationReports?.length > 0 ? (
                                    valuationReports.map((member, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={member.type === 'header' ? 'header-row' : ''}>{member.valuation_companyName || "-"}</TableCell>
                                            <TableCell>{renderContent(member, member.cpiOwnerShip_per)}</TableCell>
                                            <TableCell>{renderContent(member, member.initialInvestmentDate?.slice(0, 4))}</TableCell>
                                            <TableCell>{renderContent(member, member.totalInvestedZARm)}</TableCell>
                                            <TableCell>{renderContent(member, member.periodChangeinTotalInvested)}</TableCell>
                                            <TableCell>{renderContent(member, member.periodChangeinProceedsReceived)}</TableCell>
                                            <TableCell>{renderContent(member, member.reportedValue1ZARm)}</TableCell>
                                            <TableCell>{renderContent(member, member.reportedValue2ZARm)}</TableCell>
                                            <TableCell>{renderContent(member, member.valuationMethodology)}</TableCell>
                                            <TableCell>{renderContent(member, member.periodChangeinReported)}</TableCell>
                                            <TableCell>{renderContent(member, member.periodchangeinValuation_per)}</TableCell>
                                            <TableCell>{renderContent(member, member.investmentmultiple)}</TableCell>
                                            <TableCell>{renderContent(member, member.grossIrr)}</TableCell>
                                            <TableCell>{renderContent(member, member.portfolio_per)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableCell colSpan={14}><div style={{ marginLeft: "20px" }}>No Data Found For This Year Or Quarter</div></TableCell>
                                )}
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
                {!isPrinting && (
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
                )}
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
                        {/* //equitey value */}

                            </TableBody>
                        </StyledTable>
                    </div>
                </DialogContent>
                {!isPrinting && (
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
                )}
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
                                {/* asset cover ratio */}
                            </TableBody>
                        </StyledTable>
                    </div>
                </DialogContent>
                {!isPrinting && (
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
                )}
            </Dialog>
            <Dialog
                open={openUploadDocument}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                {openUploadDocument && (
                    <ValidatorForm
                        onSubmit={handleUploadDocuments}
                        className="customform"
                        onError={() => null}
                    >
                        <DialogTitle
                            id="form-dialog-title"
                            onClose={handleCloseUploadDocument}
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
                                            // defaultValue={getSelectedItem(
                                            //     'Agreements',
                                            //     agreementsOptions,
                                            //     0, 1
                                            // )}
                                            defaultValue={(value === 7 ? agreementsOptions[0] :
                                                value === 8 ? afsOptions[0] :
                                                    value === 9 ? shareCertificatesOptions[0] : null
                                            )}
                                            options={value === 3 ? boardDocumentOptions :
                                                value === 4 ? committeeReportOptions :
                                                    value === 5 ? monthlyReportOptions :
                                                        value === 6 ? shareholderReportOptions :
                                                            value === 7 ? agreementsOptions :
                                                                value === 8 ? afsOptions :
                                                                    shareCertificatesOptions
                                            }
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'upload_Documenttype',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.upload_Documenttype}
                                                    name="documenttype"
                                                    placeholder="Select"
                                                    // validators={['required']}
                                                    // errorMessages={[
                                                    //     'this field is required',
                                                    // ]}
                                                    validators={[7, 8, 9].includes(value) ? [] : ['required']}
                                                    errorMessages={
                                                        [7, 8, 9].includes(value) ? [] : ['this field is required']
                                                    }
                                                />
                                            )}
                                        />
                                        {console.log(formdata.upload_Documenttype, "formdata.upload_Documenttypeformdata.upload_Documenttype")}
                                        <label>Quarter</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            getOptionDisabled={(option) => option.id > getCurrenctQuarter(formdata.upload_Year)}
                                            defaultValue={getSelectedItem(
                                                formdata.upload_Quarter,
                                                quarteropt,
                                                0,
                                                1
                                            )}
                                            options={quarteropt}
                                            // getOptionLabel={(option) =>
                                            //     option.label
                                            // }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'upload_Quarter',
                                                    value
                                                )
                                            }
                                            value={formdata.upload_Quarter}
                                            renderInput={(params) => (
                                                <>
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        name="quarter"
                                                        placeholder="Select"
                                                        // validators={['required']}
                                                        // errorMessages={[
                                                        //     'this field is required',
                                                        // ]}
                                                        error={quarterValidate}
                                                    />
                                                    {quarterValidate && <span className='quater-validation'>this field is required</span>}
                                                </>
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
                                                    value={formdata.upload_Year}
                                                    open={documentsDate}
                                                    onOpen={() =>
                                                        setDocumentsDate(true)
                                                    }
                                                    onClose={() =>
                                                        setDocumentsDate(false)
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
                                                                setDocumentsDate(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    // maxDate={new Date()}
                                                    shouldDisableDate={shouldDisableDate}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                        {formdata?.upload_Documenttype == "Valuation Report" ? null : (
                                            <>
                                                <RadioGroup
                                                    style={{ marginTop: "33px" }}
                                                    aria-label="Gender"
                                                    name="changeRadioButton"
                                                    className="group"
                                                    value={formdata.changeRadioButton || ''}
                                                    onChange={(e) => formdatavaluechange(e)}
                                                >
                                                    <div style={{ display: 'flex' }}>
                                                        <FormControlLabel
                                                            value="Files"
                                                            control={<Radio />}
                                                            label="Files"
                                                        />
                                                        <FormControlLabel
                                                            value="Folders"
                                                            control={<Radio />}
                                                            label="Folders"
                                                        />
                                                    </div>

                                                </RadioGroup>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div className="fileuploadBox documentfileupload ">
                                            {formdata.changeRadioButton === 'Files' ? (
                                                <>
                                                    <input
                                                        ref={inputRef}
                                                        disabled={view}
                                                        type="file"
                                                        name="file"
                                                        id="file"
                                                        onChange={(e) => onFileChange(e)}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <div className="uploaderDiv" onClick={handleBrowseClick}>
                                                        <img src={IconCloudSvg} />
                                                        <Typography>
                                                            Drag files to upload OR Browse
                                                        </Typography>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        multiple
                                                        directory=""
                                                        webkitdirectory=""
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <div className="uploaderDiv" onClick={handleBrowseClick}>
                                                        <img src={IconCloudSvg} alt="Cloud Icon" />
                                                        <Typography>
                                                            Drag folders to upload OR Browse
                                                        </Typography>
                                                    </div>
                                                </>)}
                                        </div>

                                    </Grid>
                                </Grid>
                            </StyledCard>
                            <SubTitle className="SubTitle">Uploading</SubTitle>
                            <div className="uploadingfilesfol">
                                {uploadZipFolder && formdata.changeRadioButton === 'Folders' ? (
                                    <div className="single_uploadingfilesfol">
                                        <div>
                                            <img style={{ width: "30px" }} src={zipFolder} alt='zipfolder' />
                                            <span >
                                            </span>
                                            <span>
                                                {folderName}
                                                <br />
                                                <span className="folderfileDetail">
                                                    {folderSizes}
                                                </span>
                                            </span>
                                        </div>

                                        <Icon
                                            fontSize="medium"
                                            onClick={removeUploadedZipFolder}>
                                            delete
                                        </Icon>
                                    </div>
                                ) :
                                    (<>
                                        {uploadedFiles &&
                                            uploadedFiles.map((files, i) => (
                                                <div className="single_uploadingfilesfol">
                                                    <div>
                                                        <span>
                                                            <img src={getFileIcon(files.name)} />
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
                                    </>)}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            {uploadZipFolder && uploadZipFolder && formdata.changeRadioButton === 'Folders' ?
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={
                                        (!uploadZipFolder)
                                            ? 'whitebg disablebtn'
                                            : 'whitebg'
                                    }
                                    onClick={() => setQuarterValidate(formdata.upload_Quarter === null)}
                                    disabled={(!uploadZipFolder)}
                                >
                                    Save
                                </Button> :
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={
                                        (!formdata.upload_File)
                                            ? 'whitebg disablebtn'
                                            : 'whitebg'
                                    }
                                    onClick={() => setQuarterValidate(formdata.upload_Quarter === null)}
                                    disabled={(!formdata.upload_File)}
                                >
                                    Save
                                </Button>
                            }
                            <Button
                                className="whitebg"
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleCloseUploadDocument()}
                            >
                                CANCEL
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                )}
            </Dialog>
            <Dialog
                open={detailsRecordOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
                keepMounted
                TransitionComponent={Transition}
                className="sidebarPopup"
                onClose={handleClose}
            >
                <DialogTitle id="form-dialog-title" onClose={handleClose}>
                    Document preview
                </DialogTitle>
                <DialogContent>
                    <img src={getFileIcon(formdata.filename)} />
                    <Title className="title">{formdata.filename}</Title>
                    <SubTitle className="SubTitle">Preview</SubTitle>
                    <div className="divInner">
                        <div className="basicdetailListing">
                            <div className="detailListinginner">
                                <span>Document Type</span>
                                <span>: {formdata.documentType}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Year</span>
                                <span>: {formdata.year}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Quarter</span>
                                <span>: {formdata.quarter}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Uploaded Date</span>
                                <span>: {formdata.uploadDate}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Document Name</span>
                                <span>: <div className="viewprofiledetails">{formdata.filename}</div> </span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
            <Dialog
                open={deleteRecordOpen}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure You Want to delete this file?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ width: "100px" }}
                        onClick={handleDeleteRecordConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        className="whitebg"
                        onClick={handleDeleteRecordClose}
                        color="primary"
                    >
                        CANCEL
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    )
}
export default Shareholderrepository
