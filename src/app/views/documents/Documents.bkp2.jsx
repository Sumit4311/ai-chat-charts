import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import { getFileIcon } from 'app/services/CommonObject'
import Pagination from '@material-ui/lab/Pagination'
import { yearopt } from 'app/services/CommonObject'
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

import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import XlsxFileFormat from '../../image/xlsx-file-format-extension.svg'
import pdf from '../../image/pdf.svg'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import zip from '../../image/zip.svg'
import xlsxgreen from '../../image/xlsxgreen.svg'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { DatePicker } from '@mui/lab'
import IconCloudSvg from '../../image/cloudcomputing.svg'
import { Menu, MenuItem } from '@mui/material'
import Slide from '@mui/material/Slide'
import sheet from '../../image/sheets.svg'
/*import DialogTitle from '@mui/material/DialogTitle'*/
import {
    getDataFromApi,
    postDataFromApi,
    deleteDataFromApi,
} from '../../services/CommonService'
import {
    getAllCompanyDetails,
    uploadFileCommercialProduct,
    uploadFileFinance,
    uploadFileTechnology,
    uploadFilepeople,
    uploadFileSocialmedia,
    searchplmnt,
    reportsSearch,
    getonboardcmp,
    uploadEmployeesList,
    uploadRisks,
    getAllUserDetails,
    deletedocumentfile,
    reportsUploadArbitary,
} from '../../services/api'
/* import preval from "babel-plugin-preval";
import fs from 'fs-react'; */
import AlertMessage from '../commoncomponent/AlertMessage'
import $ from 'jquery'
import testFile from '../../image/Format reference.xlsx'
import CommercialandBusiness from '../../image/CommercialandBusiness.xlsx'
import EmployeeList from '../../image/EmployeeList.xlsx'
import Finance from '../../image/Finance.xlsx'
import NewsAndSocialMedia from '../../image/NewsAndSocialMedia.xlsx'
import Risks from '../../image/Risks.xlsx'
import Technology from '../../image/Technology.xlsx'
import PeopleCulture from '../../image/PeopleCulture.xlsx'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import useAuth from 'app/hooks/useAuth'
import { Login } from '@mui/icons-material'
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

const Title = styled('span')(() => ({
    fontSize: '1.3rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#fff',
}))

const SubTitle = styled('span')(() => ({
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '10px',
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

const statusopt = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
]

const doctypeopt = [
    { id: 'Fixed Documents', label: 'Fixed Documents' },
    { id: 'Arbitrary', label: 'Arbitrary' },
]
const companyOptions = [
    { id: '345c4c59-91db-40c7-ae83-3f3f40997b19', label: 'FSI' },
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

const periodopt = [
    // { id: 1, label: "Financial Year" },
    { id: 'Q1', label: 'Quarter 1' },
    { id: 'Q2', label: 'Quarter 2' },
    { id: 'Q3', label: 'Quarter 3' },
    { id: 'Q4', label: 'Quarter 4' },
    // { id: 6, label: "Months" },
]

const quarteropt = [
    { id: 1, label: 'Q1' },
    { id: 2, label: 'Q2' },
    { id: 3, label: 'Q3' },
    { id: 4, label: 'Q4' },
]

const filesopt = [{ id: 1, label: 'Recently Added' }]
// const fileArray = [
//     { id: 1, filename: "Google2014-5-12_document.xlsx", filetype: "xlsx", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
//     { id: 2, filename: "Design Proposal.zip", filetype: "xlsx", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
//     { id: 3, filename: "Presentation.xlsx", filetype: "xlsx", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
//     { id: 4, filename: "Micr2015-12-28-M12_document.xlsx", filetype: "zip", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
//     { id: 5, filename: "App2018-10-5_Design.zip", filetype: "xlsx", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
//     { id: 6, filename: "Presentation.xlsx", filetype: "xlsx", date: "today", filesize: "25 MB", doctype: "Fixed Document" },
// ]
const ITEM_HEIGHT = 60
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

const Documents = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    var currentyear = new Date().getFullYear()
    const [formdata, setFormData] = useState({
        documenttype: '',
        company: '',
        year: currentyear.toString(),
        category: '',
        status: '',
        originalFileList: [],
        searchDocumenttype: '',
        searchCompany: '',
        searchCategory: '',
        searchPeriod: '',
        searchYear: '',
    })
    const userRole = localStorage.getItem('userRole')
    const [isCompanyLoaded, setIsCompanyLoaded] = useState(true)
    const [open, setOpen] = useState(false)
    const [dateopen, setdateOpen] = useState(false)
    console.log(dateopen,"datttt")
    const [anchorEl, setAnchorEl] = useState(null)
    const submeuopen = Boolean(anchorEl)
    const [detailsopen, setdetailsopen] = useState(false)
    const [nameDetails, setnameDetails] = useState([])
    const [userDetails, setuserDetails] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [index, setIndex] = useState('')
    const [edit, setEdit] = useState(false)
    const [view, setView] = useState(false)
    const [uploadedFiles, setuploadedFiles] = useState([])
    const [fileArray, setFileArray] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [completeFiles, setCompleteFiles] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [allActivecmp, setallActivecmp] = useState([])
    const [companyopt, setcompanyopt] = useState([])
    const [defaultOptions, setDefaultOptions] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [page, setPage] = useState(1)
    const [fileSelected, setfileSelected] = useState({})
    const user = useAuth()

    function handleDeleteClose() {
        setDeleteOpen(false)
        setDeleteId('')
    }
    function handleDeleteOpen(id) {
        setDeleteOpen(true)
        setDeleteId(id)
    }
    const handleDeleteConfirm = async (e) => {
        var query = ''
        var response = ''
        response = await deleteDataFromApi(
            deletedocumentfile + delete_id,
            [],
            1
        )
        if (response.status == '200') {
            setDeleteId('')
            setDeleteOpen(false)
            setalertMessage('user Deleted successfully')
            setalert(true)
            setalertType('success')
            setIndex()
            getFileNames()
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
            setDeleteId('')
            setDeleteOpen(false)
        }
    }

    function handleClose() {
        setOpen(false)
        setdetailsopen(false)
        setFormData((formData) => ({
            ...formData,
            filename: '',
            company: '',
            documenttype: '',
            category: '',
            quarter: '',
            file: '',
        }))
        setuploadedFiles([])
    }
    function handleClickOpen(type, record) {
        setOpen(true)
        setEdit(false)
        setView(false)
        if (type === 'edit' || type === 'view') {
            setFormData((formData) => ({
                ...formData,
                filename: record.filename,
                company: record.companyId,
                documenttype: record.documentType,
                category: record.category,
                year: record.year,
                quarter: record.quarter,
            }))
            if (type === 'edit') {
                setEdit(true)
            } else if (type === 'view') {
                // setView(true)
                setOpen(false)
                setdetailsopen(!detailsopen)
            }
        }
    }
    const handleSubmit = async (event) => {
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
            edit || view ? formdata.quarter : 'Q' + formdata.quarter
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
            getFileNames()
        }
        // else {
        //     setalertMessage("error uploading file")
        //     setalert(true)
        //     setalertType('error')
        // }
    }

    // const filterList = () => {
    //     if (formdata.company) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.companyId.includes(formdata.company)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         // setFilteredArray(newSearchArr)
    //         setCompleteFiles(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     } else if (formdata.category) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.category.includes(formdata.category)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         setCompleteFiles(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     } else if (formdata.period) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.period.includes(formdata.period)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         setCompleteFiles(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     }
    //     else if (formdata.company && formdata.category) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.companyId.includes(formdata.company) && opt?.category.includes(formdata.category)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         // setFilteredArray(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     }
    //     else if (formdata.company && formdata.documenttype) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.companyId.includes(formdata.company) && opt?.documentType.includes(formdata.documentType)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         // setFilteredArray(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     }

    //     else if (formdata.company && formdata.period) {
    //         let newSearchArr = []
    //         fileArray.find((opt) => {
    //             if (opt?.companyId.includes(formdata.company) && opt?.period.includes(formdata.period)) {
    //                 newSearchArr.push(opt);
    //             }
    //         })
    //         // setFilteredArray(newSearchArr)
    //         displayingrecords(newSearchArr, 1)
    //     }
    //     else {
    //         // setFilteredArray(fileArray)
    //         setCompleteFiles(fileArray)
    //         displayingrecords(fileArray, 1)

    //     }
    // }
    const filterList = () => {
        let querystring = ''
        if (formdata.searchCompany) {
            querystring += querystring
                ? '&company=' + formdata.searchCompany
                : 'company=' + formdata.searchCompany
        }
        // if (formdata.searchCategory) {
        //     querystring += querystring
        //         ? '&category=' + formdata.searchCategory
        //         : 'category=' + formdata.searchCategory
        // }
        if (formdata.searchCategory) {
            querystring += querystring ? '&category=' : 'category=';
            querystring += encodeURIComponent(formdata.searchCategory);
          }
        if (formdata.searchPeriod) {
            querystring += querystring
                ? '&quarter=' + formdata.searchPeriod
                : 'quarter=' + formdata.searchPeriod
        }
        if (formdata.searchDocumenttype) {
            querystring += querystring
                ? '&type=' + formdata.searchDocumenttype
                : 'type=' + formdata.searchDocumenttype
        }
        if (formdata.searchYear) {
            querystring += querystring
                ? '&year=' + formdata.searchYear
                : 'year=' + formdata.searchYear
        }
        return querystring ? '?' + querystring : ''
    }

    function confirm() {
        setalert(false)
        $(".fileuploadBox.documentfileupload input[type='file']").val(null)
        formdata['file'] = null
        setuploadedFiles([])
    }

    const handleDateChange = (date) => {
        var year = new Date(date)
        year = year.getFullYear().toString()
        setFormData((formData) => ({
            ...formData,
            year: year,
        }))
    }

    function onFileChange(event) {
        var file = event.target.files[0]
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: file,
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

    function removeUploadedFile() {
        setuploadedFiles([])
        //uploadedFiles.splice(0,1)
        formdata['file'] = null
        $(".fileuploadBox.documentfileupload input[type='file']").val(null)
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
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
        if (type == 'files') {
            if (value) {
                filteredArray.sort(function (a, b) {
                    return new Date(b.uploadDate) - new Date(a.uploadDate)
                })
            } else {
                filteredArray.sort(function (a, b) {
                    return new Date(a.uploadDate) - new Date(b.uploadDate)
                })
            }
            // setCompleteFiles(filteredArray)
            displayingrecords(filteredArray)
        }
    }

    function handleClicksubmenu(event, index) {
        setAnchorEl(event.currentTarget)
        setfileSelected(index)
    }
    function handleClosesubmenu() {
        setAnchorEl(null)
    }
    function handleDetailsmenu() {
        setAnchorEl(null)
        setdetailsopen(true)
    }

    const getnameDetails = async () => {
        var query = ''
        const response = await getDataFromApi(searchplmnt, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data)
        }
    }

    const getFileNames = async () => {
        var query = ''
        var querystring = filterList()
        const response = await getDataFromApi(
            reportsSearch + querystring,
            1,
            ''
        )
        if (response?.status == 200 && response?.data) {
            // setnameDetails(response.data);
            setFileArray(response.data)
            // setFilteredArray(response.data)
            displayingrecords(response.data)
            setCompleteFiles(response.data)
            setFormData((formData) => ({
                ...formData,
                ['originalFileList']: response.data,
            }))
            // var companyopts=[];
            // response.data.map((company,i)=>{
            //     if(company.status=='Active' && company.stage == 'Sign Agreement'){
            //         var cp=[];
            //         cp['id']=company.id
            //         cp['label']=company.companyName
            //         companyopts.push(cp)
            //     }
            // })
            // setcompanyoptions(companyopts)
        }
    }

    useEffect(() => {
        getallActivecmp()
        // getnameDetails();
        getFileNames()
    }, [])

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
                setcompanyopt([companyDetails])
                console.log(companyDetails ,"companyDetails ")
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
                    // if (user.roles === 'Super Admin') {
                    //     comOpt.push(cp)
                    // } else if (user.roles === 'Company Admin' && user.email === opt?.companyVo?.dealTeams) {
                    //     comOpt.push(cp)
                    // }
                })
                setcompanyopt(comOpt)
            
            }
            setIsCompanyLoaded(false)
            setTimeout(() => {
                setIsCompanyLoaded(true)
                }, 1)
        }
    }
    const handleChangePage = (event, value) => {
        setPage(value)
        displayingrecords(filteredArray, value)
    }

    // const handleChangePage = (event) => {
    //     // setPage(newPage)
    //     // displayingrecords(filteredArray, newPage)
    // }
    const handleChangeRowsPerPage = (event, value) => {
        setPage(value)
        displayingrecords(completeFiles, value, 15)
    }

    const displayingrecords = (
        listingData = [],
        pageno = page,
        rowpage = rowsPerPage
    ) => {
        var updated = listingData.slice(
            pageno === 1 ? 0 : (pageno - 1) * rowpage,
            pageno === 1 ? rowpage : rowpage * pageno
        )
        setFilteredArray(updated)
    }

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
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Documents' }]} />
                <div className="breadnavigation">Home / Documents</div>
            </div>
            <div className="rightalign_btn">
                {/* <Button variant="outlined" color="primary" className="whitebg" >
                   <Icon fontSize="medium">add</Icon> create
                </Button> */}
                <Button
                    variant="contained"
                    color="primary"
                    className="whitebg icon document-upload"
                    onClick={handleClickOpen}
                >
                    <Icon fontSize="medium">backup</Icon> Upload
                </Button>
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
                                    options={doctypeopt}

                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'searchDocumenttype',
                                            value
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.searchDocumenttype}
                                            name="searchDocumenttype"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <label>Company</label>
                                {isCompanyLoaded && (
                                    <AutoComplete
                                        disabled={userRole === 'Company Admin' || userRole === 'Company User'}
                                        className="dropdown"
                                        fullWidth
                                        options={companyopt}
                                        defaultValue={userRole === 'Company Admin' || userRole === 'Company User' ? companyopt[0] : null}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('searchCompany', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.searchCompany}
                                                name="searchCompany"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                )}
                            </Grid>

                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <label>Category</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={categoryopt}
                                    groupBy={(option) => option.mainmenu}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'searchCategory',
                                            value
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.searchCategory}
                                            name="searchCategory"
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
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'searchPeriod',
                                            value
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.searchPeriod}
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
                                        changedropdownvalue('searchYear', value)
                                    }
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
                                    onClick={getFileNames}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </StyledCard>
                <StyledCard elevation={6} className="filesandfolder breakall-word">
                    <ValidatorForm className=" customform search">
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Title>Files</Title>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={filesopt}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('files', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.files}
                                            name="files"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    type="text"
                                    name="search"
                                    id="search"
                                    value={formdata.search || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label="Search file,folder"
                                    placeholder="Search file,folder"
                                    className="searchfilefolder"

                                />
                            </Grid> */}
                        </Grid>
                    </ValidatorForm>
                    {/* <SubTitle>Folder</SubTitle>
                    <Grid container spacing={3} className="filess">
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <div className="singlefilefol">
                                <div className="folderfileName"><Icon fontSize="medium">folder</Icon> <span>Presentation</span></div>
                                <div className="folderfileDetail">Today  .  24.5 MB  .  Fixed document</div>
                                <Icon fontSize="medium" className="more_horiz">more_horiz</Icon>
                            </div>

                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <div className="singlefilefol">
                                <div className="folderfileName"><Icon fontSize="medium">folder</Icon> <span>Presentation</span> <Icon fontSize="medium" className="star">star_outline</Icon></div>
                                <div className="folderfileDetail">Today  .  24.5 MB  .  Fixed document</div>
                                <Icon fontSize="medium" className="more_horiz">more_horiz</Icon>
                            </div>

                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <div className="singlefilefol">
                                <div className="folderfileName"><Icon fontSize="medium">folder</Icon><span>Presentation</span></div>
                                <div className="folderfileDetail">Today  .  24.5 MB  .  Fixed document</div>
                                <Icon fontSize="medium" className="more_horiz">more_horiz</Icon>
                            </div>

                        </Grid>
                    </Grid> */}
                    <SubTitle>Files</SubTitle>
                    <Grid container spacing={3} className="folderss">
                        {console.log(filteredArray, "filee>>>>>")}
                        {filteredArray.map((file, index) => (
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <div className="singlefilefol">
                                    <div
                                        className="folderfileName"
                                        onClick={() =>
                                            window.open(
                                                file.presignedurl,
                                                '_blank'
                                            )
                                        }
                                    >
                                        <Icon fontSize="medium">
                                            <img
                                                src={getFileIcon(file.filename)}
                                            />
                                        </Icon>{' '}
                                        <span>{file.filename}</span>
                                    </div>
                                    <div className="folderfileDetail">
                                        {file.uploadDate} .{' '}
                                        {file.filesize + 'KB'} .{' '}
                                        {file.documentType}
                                    </div>
                                    <Icon
                                        fontSize="medium"
                                        className="more_horiz"
                                        onClick={(e) =>
                                            handleClicksubmenu(e, file)
                                        }
                                    >
                                        more_horiz
                                    </Icon>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    {completeFiles.length > 15 && (
                        <div style={{ margin: '0 auto' }}>
                            <Pagination
                                count={Math.round(
                                    completeFiles.length / rowsPerPage
                                )}
                                page={page}
                                onChange={handleChangeRowsPerPage}
                                style={{
                                    position: 'center',
                                    backgroundColor: 'white',
                                }}
                            />
                        </div>
                    )}
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
                            /*selected={option.label === 'Pyxis'}*/
                            // onClick={()=>setdetailsopen(!detailsopen)}
                            //
                            onClick={() =>
                                handleClickOpen('view', fileSelected)
                            }
                        >
                            <Icon fontSize="small" className="more_horiz">
                                remove_red_eye
                            </Icon>{' '}
                            Details
                        </MenuItem>
                        {/* <MenuItem
                            key='2'
                        onClick={()=>setdetailsopen(!detailsopen)}
                        >
                            <Icon fontSize="small" className="more_horiz">share</Icon> Share
                        </MenuItem> */}
                        {/* <MenuItem
                            key='2'
                            onClick={handleClosesubmenu}
                        >
                            <Icon fontSize="small" className="more_horiz">share</Icon> Share
                        </MenuItem>
                        <MenuItem
                            key='3'
                            onClick={handleClosesubmenu}
                        >
                            <Icon fontSize="small" className="more_horiz">content_copy</Icon> Copy
                        </MenuItem>
                        <MenuItem
                            key='4'
                            onClick={handleClosesubmenu}
                        >
                            <Icon fontSize="small" className="more_horiz">trending_flat</Icon> Move
                        </MenuItem> */}
                        <MenuItem key="5">
                            {filteredArray.map((file, index) => (
                                <div
                                    key={index}
                                    onClick={() => window.open(file.presignedurl, '_blank')}
                                >
                                    {/* <Icon fontSize="medium"><img src={xlsxgreen} /></Icon> <span>{file.filename}</span>  */}
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
                            key="6"
                            /*selected={option.label === 'Pyxis'}*/
                            onClick={() =>
                                handleClickOpen('edit', fileSelected)
                            }
                        >
                            <Icon fontSize="small" className="more_horiz">
                                edit
                            </Icon>{' '}
                            edit
                        </MenuItem>
                        <MenuItem
                            key="7"
                            /*selected={option.label === 'Pyxis'}*/
                            // onClick={handleClosesubmenu}
                            onClick={() => handleDeleteOpen(fileSelected.id)}
                        >
                            <Icon fontSize="small" className="more_horiz">
                                delete
                            </Icon>{' '}
                            Delete
                        </MenuItem>
                    </Menu>
                </StyledCard>
            </Box>
            <Dialog
                open={deleteOpen}
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
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >
                {open && (
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        className="customform"
                        onError={() => null}
                    >
                        <DialogTitle
                            id="form-dialog-title"
                            onClose={handleClose}
                        >
                            Upload Documents
                        </DialogTitle>
                        <DialogContent>
                            <StyledCard elevation={6} className="">
                                <Grid container spacing={3}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Company</label>
                                        <AutoComplete
                                            disabled={edit || view}
                                            defaultValue={getSelectedItem(
                                                formdata.company,
                                                companyopt
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={companyopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'company',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.company}
                                                    name="company"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        <label>Category</label>
                                        <AutoComplete
                                            disabled={edit || view}
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={getSelectedItem(
                                                formdata.category,
                                                categoryopt
                                            )}
                                            groupBy={(option) =>
                                                option.mainmenu
                                            }
                                            options={categoryopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) => {
                                                changedropdownvalue(
                                                    'category',
                                                    value
                                                )
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.category}
                                                    name="category"
                                                    placeholder="Select"
                                                    /*validators={['required']}*/
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        <label>Quarter</label>
                                        <AutoComplete
                                            disabled={edit || view}
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={getSelectedItem(
                                                formdata.quarter,
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
                                                    'quarter',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.quarter}
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
                                        <label>Document Type</label>
                                        <AutoComplete
                                            disabled={edit || view}
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={getSelectedItem(
                                                formdata.documenttype,
                                                doctypeopt
                                            )}
                                            options={doctypeopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'documenttype',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={
                                                        formdata.documenttype
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
                                        <label>Financial Year</label>
                                        <div className="datediv">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    disabled={edit || view}
                                                    openTo="year"
                                                    views={['year']}
                                                    value={formdata.year}
                                                    open={dateopen}
                                                    onOpen={() =>
                                                        setdateOpen(true)
                                                    }
                                                    onClose={() =>
                                                        setdateOpen(false)
                                                    }
                                                    onChange={(e) =>
                                                        handleDateChange(e)
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
                                                                setdateOpen(
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
                                        <label className="transparentLabel">
                                            sample pdf
                                        </label>
                                        {formdata.documenttype == 'Arbitrary' ||
                                            formdata.category == 'ESG' ||
                                            formdata.category ==
                                            'Regulatory & Compliance' ? (
                                            ''
                                        ) : (
                                            <div className="single_uploadingfilesfol formfiles">
                                                <a
                                                    href={downloadLink}
                                                    without
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    <Icon fontSize="medium">
                                                        cloud_download
                                                    </Icon>
                                                    <span>
                                                        Sample Template
                                                        <br />
                                                    </span>
                                                </a>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div className="fileuploadBox documentfileupload ">
                                            <TextField
                                                disabled={view}
                                                type="file"
                                                name="file"
                                                id="file"
                                                onChange={(e) =>
                                                    onFileChange(e)
                                                }
                                            /*  label="Enter company name"
                                         placeholder="Enter company name" */
                                            // validators={['required']}
                                            // errorMessages={['this field is required']}
                                            />
                                            {/* <input required="true" type="file" name="file" /> */}
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

                                {/* <div className="single_uploadingfilesfol">
                                  <div>
                                      <span><img src={zip} /></span>
                                      <span>Project proposal.zip<br/><span className="folderfileDetail">24.5 MB  .  Fixed document</span></span>
                                  </div>
                                  <Icon fontSize="medium">delete</Icon>
                               </div> */}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className={
                                    !formdata.file
                                        ? 'whitebg disablebtn'
                                        : 'whitebg'
                                }
                                disabled={!formdata.file}
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
                )}
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
                    Document preview
                </DialogTitle>
                <DialogContent>
                    <img src={getFileIcon(formdata.filename)} />
                    <Title className="title">{formdata.filename}</Title>
                    <SubTitle className="SubTitle">Preview</SubTitle>
                    <div className="divInner">
                        <div className="basicdetailListing">
                            <div className="detailListinginner">
                                <span>Company </span><span>:{formdata.company}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Document Type</span>
                                <span>: {formdata.documenttype}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Category</span>
                                <span>:{formdata.category}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Financial Year</span>
                                <span>
                                    {/* : {edit || view ? formdata.year : ''} */}
                                    {formdata.year}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Quarter</span>
                                <span>:{formdata.quarter}</span>
                            </div>
                        </div>

                        {/* <div className="detailListinginner">
                                <span>Zipcode</span><span>: 123456</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Address</span><span>: XXXX XXXXX XX</span>
                            </div> */}
                    </div>
                    {/* <SubTitle className="SubTitle">File Shared with</SubTitle>
                    <div className="fileSharedwith">
                        <div className="fileSharedwithInner">
                            <span className="profInitial">A</span>
                            <span>Arch Farena</span>
                        </div>
                        <div className="fileSharedwithInner">
                            <span className="profInitial">G</span>
                            <span>Gohed Huda</span>
                        </div>
                        <div className="fileSharedwithInner">
                            <span className="profInitial">P</span>
                            <span>Piyush Juneja</span>
                        </div>
                    </div> */}
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </Container>
    )
}

export default Documents
