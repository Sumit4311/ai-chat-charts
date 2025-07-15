import React, { useState, useEffect } from 'react'
import {CssBaseline, makeStyles, ThemeProvider} from '@mui/styles'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import { getCurrenctQuarter, getFileExtension, getFileIcon } from 'app/services/CommonObject'
import Pagination from '@material-ui/lab/Pagination'
import { yearopt } from 'app/services/CommonObject'
import JSZip from 'jszip'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { useParams } from 'react-router-dom'
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
// import zipFolder from '../../image/zipFolder.svg'
import zipFolder from "../../image/zipFolder.svg"
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
    foldersearch,
    deletedsubfileocumentfile,
    UploadOrgValuationReport
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
const useStyles = makeStyles((theme) => ({
    // Define custom styles for disabled dates
    disabledDate: {
      backgroundColor: '#eee',
      color: '#888',
    },
  }));
  
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

const categoryoptFixed = [
    { id: 'Commercial & Business', label: 'Commercial & Business' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Technology', label: 'Technology' },
    { id: 'People & Culture', label: 'People & Culture' },
    // { id: "Shareholder Repository", label: "Shareholder Repository" },
    { id: 'Employees List', label: 'Employees List' },
    { id: 'Valuation Report', label: 'Valuation Report' },
    // { id: 'Equity Value', label: 'Equity Value' },
    // { id: 'Asset Cover Ratio', label: 'Asset Cover Ratio' },
    
    { id: 'Risks', label: 'Risks', mainmenu: 'others' },
    {
        id: 'News & Social Media',
        label: 'News & Social Media',
        mainmenu: 'others',
    },
]
const categoryoptArbitary = [
    { id: 'Commercial & Business', label: 'Commercial & Business' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Technology', label: 'Technology' },
    { id: 'People & Culture', label: 'People & Culture' },
    // { id: "Shareholder Repository", label: "Shareholder Repository" },
    { id: 'Employees List', label: 'Employees List' },
    { id: 'Valuation Report', label: 'Valuation Report' },
    // { id: 'Equity Value', label: 'Equity Value' },
    // { id: 'Asset Cover Ratio', label: 'Asset Cover Ratio' },
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
    { id: 'Q1', label: 'Q1' },
    { id: 'Q2', label: 'Q2' },
    { id: 'Q3', label: 'Q3' },
    { id: 'Q4', label: 'Q4' },
]

const quarteropt = [
    { id: 'Q1', label: 'Q1' },
    { id: 'Q2', label: 'Q2' },
    { id: 'Q3', label: 'Q3' },
    { id: 'Q4', label: 'Q4' },
]

const filesopt = [{ id: 'Recently Added', label: 'Recently Added' }]

const WeekAndMonthOptions = [
    { id: 'lastSevenDaysFiles', label: 'Last Seven Days Files' },
    { id: 'lastMonthFiles', label: 'Last Month Files' }
];
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
    const classes = useStyles();
    const navigate = useNavigate()
    var currentyear = new Date().getFullYear()
    const [formdata, setFormData] = useState({
        documenttype: '',
        company: '',
        year: currentyear.toString(),
        category: '',
        quarter: null,
        status: '',
        originalFileList: [],
        searchDocumenttype: null,
        searchCompany: null,
        searchCategory: null,
        searchPeriod: null,
        searchYear: null,
        changeRadioButton: 'Files'
    })
    let { companyId } = useParams();
    const userRole = localStorage.getItem('userRole')
    const [isCompanyLoaded, setIsCompanyLoaded] = useState(true)
    const [open, setOpen] = useState(false)
    const [dateopen, setdateOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(false)
    const subFolderMenuShow = Boolean(anchorEl2)
    const submeuopen = Boolean(anchorEl)
    const [detailsopen, setdetailsopen] = useState(false)
    const [folderSizes, setFolderSizes] = useState('')
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
    const inputRef = React.useRef(null)
    const [defaultOptions, setDefaultOptions] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [page, setPage] = useState(1)
    const [fileSelected, setfileSelected] = useState({})
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [uploadZipFolder, setUploadZipFolder] = useState(null)
    const [uploadZipContent, setUploadZipContent] = useState(null)
    const [extractedFiles, setExtractedFiles] = useState([])
    const [currentFolder, setCurrentFolder] = useState('');
    const [allExtractFiles, setAllExtractFiles] = useState([])
    const [showExtractedFiles, setShowExtractedFiles] = useState(false)
    const [latestweekfiles, setLatestWeekFiles] = useState([])
    const [currentFolderName, setcurrentFolderName] = useState([])
    const [allSubFolders, setallSubFolders] = useState([])
    // const [subFolderMenuShow, setSubFolderMenuShow] = useState(false)
    const [subFolderFile, setSubFolderFile] = useState('')
    const [quarterValidate, setQuarterValidate] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [currentFolderIsMain, setcurrentFolderIsMain] = useState(0)


    const customDayClassName = (date) => {
        return shouldDisableDate(date) ? 'custom-future-date' : '';
      };
    const changeWeekandMonthFiles = (event, value) => {
        setFormData((formData) => ({
            ...formData,
            files: null,
        }))
        setSelectedOption(value)
        if (value === null) {
            displayingrecords([])
            setCompleteFiles([])
            return
        }
        const currentDate = new Date()
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        //lastoneweek files
        if (value.id === 'lastSevenDaysFiles') {
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(currentDate.getDate() - 7)
            const sevenDaysAndMonthRec = fileArray.filter((rec) => {
                const uploadDate = new Date(rec.uploadDate)
                return uploadDate >= sevenDaysAgo && uploadDate >= currentMonthStart
            })
            displayingrecords(sevenDaysAndMonthRec)
            setCompleteFiles(sevenDaysAndMonthRec)
        } else if (value.id === 'lastMonthFiles') {
            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(currentDate.getMonth() - 1)
            const oneMonthAndMonthRec = fileArray.filter((record) => {
                const uploadDate = new Date(record.uploadDate)
                return uploadDate >= oneMonthAgo && uploadDate >= currentMonthStart
            })
            displayingrecords(oneMonthAndMonthRec)
            setCompleteFiles(oneMonthAndMonthRec)
        }
    }

    var cmpname = '';
    const companies = JSON.parse(localStorage.getItem('companyDet'));

    companies &&
        companies.forEach((opt) => {
            if (opt.id === companyId) {
                cmpname = opt.name;
            }
        });

    let folderName = selectedFiles?.[0]?.webkitRelativePath?.split('/')[0]
    let folderSize = 0

    const [isQuarterTouched, setIsQuarterTouched] = useState(false)
    const handleClickFoldername = () => {
        setShowExtractedFiles(false)
        setAllExtractFiles([])
        setExtractedFiles([])
    }

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files)
        setUploadZipFolder(null)
        setUploadZipContent(null)
        setExtractedFiles([])
    }
    useEffect(() => {
        if (formdata.quarter !== '') {
            setQuarterValidate(false)
        }
    }, [formdata.quarter])

    const extractFiles = async (content) => {
        setShowExtractedFiles(true)
        var i = 0
        // fetch('file:///C:/CBTOffline/Images/8687.Zip')
        fetch(content)
            // fetch("https://cors-anywhere.herokuapp.com/"+content)
            .then(response => response.arrayBuffer())
            .then(data => {
                // Extract the files from the zip
                const zip = new JSZip()
                return zip.loadAsync(data)
            })
            .then(async (zip) => {
                const extracted = []
                for (const [relativePath, file] of Object.entries(zip.files)) {
                    if (!file.dir) {
                        const fileName = file.name
                        const content = await file.async('blob')
                        extracted.push({ fileName, content })
                    }
                }
                setExtractedFiles(extracted)
            })
            .catch(error => console.error(error))
    }

    function removeUploadedZipFolder() {
        setUploadZipFolder(null)
        setUploadZipContent(null)
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
    const handleBrowseClick = () => {
        inputRef.current.click()
    }
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
        if (showExtractedFiles) {
            response = await deleteDataFromApi(
                deletedsubfileocumentfile + delete_id,
                [],
                1
            )
        }
        else {
            response = await deleteDataFromApi(
                deletedocumentfile + delete_id,
                [],
                1
            )
        }
        if (response && response?.status == '200') {
            setDeleteId('')
            setDeleteOpen(false)
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
            year: currentyear.toString(),
        }))
        setQuarterValidate(false)
        setuploadedFiles([])
    }
    const handleClearDropdown = () => {
        setFormData((formData) => ({
            ...formData,
            searchDocumenttype: null,
            searchCompany: null,
            searchCategory: null,
            searchPeriod: null,
            searchYear: null,
            files: null,
            lastMonthFiles: null,
        }))
        getFileNames(false)
        setSelectedOption(null)
    }
    const clearWeekAndMonthFiles = () => {
        setFormData((formData) => ({
            ...formData,
            files: null,
            lastMonthFiles: null
        }))
        setSelectedOption(null)
        getFileNames(false)
    }

    function handleClickOpen(type, record) {
        if(userRole === 'Company Admin' || userRole === 'Company User'){
            setFormData((formData) => ({
                ...formData,
                // eslint-disable-next-line no-useless-computed-key
                ['company']: record.companyId
            }))
        }
        setAnchorEl(null)
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
    function convertBlobToFile(blob, folderName, folderSizes) {
        const file = new File([blob], folderName, { type: blob?.type })
        return file
    }
    const shouldDisableDate = (date) => {
        return date > new Date();
      };
    const handleSubmit = async (event) => {
        if (!formdata.quarter) {
            setQuarterValidate(true)
            return
        }
        // if (!formdata.file || !uploadZipFolder) {
        //     setalertMessage('Please choose file')
        //     setalert(true)
        //     setalertType('error')
        //     return false
        // }
        const cmpyId = companyopt.filter(item => item.label === formdata.company)
        var formData = new FormData()
        formdata.category !== 'Valuation Report'&& formData.append('companyId', edit ? cmpyId[0]?.id : formdata.company)
        formData.append('quarter', edit || view ? formdata.quarter : formdata.quarter)
        // formData.append('documentType', edit ? formdata.documenttype : formdata.documenttype)
        // formData.append('category', edit ? formdata.category : formdata.category)
        formData.append('year', formdata.year)
        formData.append('userId', localStorage.getItem('id'))
        var response = ''
        if (
            (formdata.documenttype == 'Arbitrary' ||
                formdata.category == 'ESG' ||
                formdata.category == 'Regulatory & Compliance') 
                // && (formdata.changeRadioButton === 'Folders' || formdata.changeRadioButton === 'Files')
        ) {
            formData.append('documentType', formdata.documenttype)
            if (formdata.documenttype === 'Arbitrary' 
            && (formdata.changeRadioButton === 'Folders')
            ) {
                const folderSize = folderSizes
                const file = convertBlobToFile(uploadZipContent, `${folderName}.zip`, folderSizes)
                formData.append('report', file)
            } else {
                formData.append('report', formdata.file)
            }
            formData.append('category', formdata.category)
            response = await postDataFromApi(
                reportsUploadArbitary,
                formData,
                1,
                '',
                1
            )
        }
        else {
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
            if(formdata.category === 'Valuation Report'){
                // formData.append('companyId', '')
                response = await postDataFromApi(
                    UploadOrgValuationReport,
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
                    : formdata.documenttype === 'Arbitrary' && formdata.changeRadioButton === 'Folders' ?
                        'Folder is Uploaded Successfully' : 'File is Uploaded Successfully'
            )
            setalert(true)
            setalertType('success')
            setuploadedFiles([])
            setUploadZipFolder(null)
            getFileNames()
        }
        else {
            setalertMessage("error uploading file")
            setalert(true)
            setalertType('error')
        }
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
    const id = localStorage.getItem('selectedCompanyId')
    const filterList = () => {
        const compId = companyopt.filter(item => item.label === formdata.searchCompany)
        let querystring = ''
        if (userRole === 'Company Admin' || userRole === 'Company User') {
            querystring += querystring
                ? '&company=' + id
                : 'company=' + id
        }
        if (formdata.searchCompany) {
            querystring += querystring
                ? '&company=' + compId[0]?.id
                : 'company=' + compId[0]?.id
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
        handleClose()
        setFormData((formData) => ({
            ...formData,
            searchDocumenttype: null,
            searchCompany: null,
            searchCategory: null,
            searchPeriod: null,
            searchYear: null,
            files: null,
            lastMonthFiles: null
        }))
        setSelectedOption(null)
        setAnchorEl(null)
        setAnchorEl2(null)
        getFileNames(false)
    }

    const handleDateChange = (date) => {
        var year = new Date(date)
        year = year.getFullYear().toString()
        setFormData((formData) => ({
            ...formData,
            year: year,
            quarter: null,

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
    function changedropdownvalues(type, e) {
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

    function changedropdownvalue(type, e) {
        setSelectedOption(null)
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        if(type==='documenttype'){
            setFormData((formData) => ({
                ...formData,
                [type]: value,
                ['category']: ''
            }))
        }else{
            setFormData((formData) => ({
                ...formData,
                [type]: value,
            }))
        }
        if (type === 'files') {
            if (value) {
                fileArray?.sort(function (a, b) {
                    return new Date(b.uploadDate) - new Date(a.uploadDate)
                })
            }
            else {
                fileArray?.sort(function (a, b) {
                    return new Date(a.uploadDate) - new Date(b.uploadDate)
                })
            }
            // setCompleteFiles(filteredArray)
            displayingrecords(fileArray)
        }
    }

    function handleClicksubmenu(event, index) {
        setAnchorEl(event.currentTarget)
        setAnchorEl2(null)
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

    const getFileNames = async (string = true) => {
        setSelectedOption(null)
        setFormData((formData) => ({
            ...formData,
            files: null,
            lastMonthFiles: null
        }))
        var query = '';
        var querystring = filterList();
        var querystrings = "?company=" + id
        const response = string ? await getDataFromApi(reportsSearch + querystring, 1, '') :
            (userRole === 'Company Admin' || userRole === 'Company User') ?
                await getDataFromApi(reportsSearch + querystrings, 1, '') :
                await getDataFromApi(reportsSearch, 1, '')

        if (response?.status == 200 && response?.data) {
            // setnameDetails(response.data);
            setFileArray(response.data);
            // setFilteredArray(response.data);
            displayingrecords(response.data);
            setCompleteFiles(response.data);
            setFormData((formData) => ({
                ...formData,
                ['originalFileList']: response.data,
            }));
        }
    }

    useEffect(() => {
        getallActivecmp()
        // getnameDetails();
        getFileNames()
    }, [])
    const getSelectedZipFolder = async (folderPath, isMain = 0) => {
        const path = folderPath;
        if (!path) {
            console.error('Folder path or filename is missing.');
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
            console.log(response, "resss")

            response?.data?.map((singleData) => {
                if (singleData?.presignedUrl) {
                    extractedAllfiles?.push(singleData);
                }
                else {
                    extractedAllfolders?.push(singleData)
                }
            })
        }
        console.log('presignedUrl', extractedAllfiles)
        setAllExtractFiles(extractedAllfiles)
        setallSubFolders(extractedAllfolders)
        { console.log(extractedAllfolders, 'extractedAllfolders') }
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
                setcompanyopt([companyDetails])
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
                const uniqueOptions = Array.from(new Set(comOpt.map(option => option.label)))
                .map(label => comOpt.find(option => option.label === label));
                setcompanyopt(uniqueOptions);

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
        if (completeFiles && completeFiles.length > 15) {
            displayingrecords(completeFiles, value, 15)
        }
    }
    // const displayingrecords = (
    //     listingData = [],
    //     pageno = page,
    //     rowpage = rowsPerPage
    // ) => {
    //     const startIndex = (pageno - 1) * rowpage;
    //     const endIndex = startIndex + rowpage;
    //     const updated = listingData.slice(startIndex, endIndex);
    //     setFilteredArray(updated);
    // }
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

    const getCurrentFolderPath = () => {
        if (!currentFolderName || currentFolderName?.length === 0) {
            return null
        }
        return (
            <div>
                <span
                    className="extract-files"
                    onClick={() => handleClickFoldername()}
                >
                    {'files'}
                </span>
                {currentFolderName.length===3?currentFolderName.splice(1,1):currentFolderName?.map((folder, i) => {
                    const folderPath = currentFolderName?.slice(0, i + 1)?.join('/')
                    return (
                        <span
                            key={i}
                            className="extract-files"
                            onClick={() => i == 0 ? getSelectedZipFolder(folder, 1): (i < currentFolderName.length - 1 && getSelectedZipFolder(folder))}
                        // onClick={() => (currentFolderName.length == 1 ? handleClickFoldername() : getSelectedZipFolder(folder))}
                        >
                            /{folder}
                        </span>
                    )
                })}
            </div>
        )
    }

    // const getCurrentFolderPath = () => {
    //     var newfolder = "";
    //     return (
    //         <>
    //             {
    //                 currentFolderName.map((folder, i) => {
    //                     console.log(currentFolderName,"hjhhh")
    //                     newfolder += i == 0 ? folder : '/' + folder
    //                     console.log('newfolder' + newfolder)
    //                     return (
    //                         (
    //                             <>
    //                                 {i == 0 ? <span className='extract-files'
    //                                     onClick={handleClickFoldername}
    //                                 >
    //                                     {'/main'}
    //                                 </span> : <span className='extract-files'
    //                                     onClick={() => getSelectedZipFolder(newfolder)}
    //                                 >
    //                                     {'/'} {folder}
    //                                 </span>}

    //                             </>
    //                         )
    //                     )
    //                 })
    //             }
    //         </>
    //     )
    //     var link = (<span className='extract-files'
    //         onClick={handleClickFoldername}
    //     >
    //         {'/'}
    //     </span>);
    //     var newfolder = ''
    //     currentFolderName.map((folder, i) => {
    //         newfolder += i == 0 ? folder : '/' + folder
    //         link += (
    //             <span className='extract-files'
    //                 onClick={() => getSelectedZipFolder(newfolder)}
    //             >
    //                 {'/'}
    //             </span>
    //         )
    //     })
    //     return ({ link })
    // }
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
    const validateInput = (value) => {
        if (!value || value.length === 0) {
            return 'this field is required';
        }
        return null;
    };
    const isCompanyUserOrAdmin = (userRole === 'Company Admin' || userRole === 'Company User')
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
                    {!showExtractedFiles && (
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={() => null}
                            className="leadsearch customform"
                        >
                            <Grid container spacing={3} className="testetest">
                                <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                    <label>Document Type</label>
                                    <AutoComplete
                                        className="dropdown "
                                        fullWidth
                                        options={doctypeopt}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'searchDocumenttype',
                                                value
                                            )
                                        }
                                        value={formdata.searchDocumenttype}
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
                                    <label>Company</label>
                                    {isCompanyLoaded && (
                                        <AutoComplete
                                            disabled={
                                                userRole === 'Company Admin' ||
                                                userRole === 'Company User'
                                            }
                                            className="dropdown"
                                            fullWidth
                                            // getOptionLabel={(option) => option.label}
                                            options={companyopt}
                                            defaultValue={
                                                userRole === 'Company Admin' ||
                                                userRole === 'Company User'
                                                    ? companyopt[0]
                                                    : null
                                            }
                                            // getOptionLabel={(option) =>  option.label}
                                            onChange={(event, value) =>
                                                changedropdownvalues(
                                                    'searchCompany',
                                                    value
                                                )
                                            }
                                            {...(userRole !== 'Company Admin' &&
                                                userRole !== 'Company User' && {
                                                    value: formdata.searchCompany,
                                                })}
                                            renderInput={(params) => (
                                                <>
                                                    {userRole ===
                                                        'Company Admin' ||
                                                    userRole ===
                                                        'Company User' ? (
                                                        <TextField
                                                            {...params}
                                                            className="required"
                                                            label="Select"
                                                            value={
                                                                formdata.searchCompany
                                                            }
                                                            name="searchCompany"
                                                            placeholder="Select"
                                                        />
                                                    ) : (
                                                        <TextField
                                                            {...params}
                                                            className="required"
                                                            label="Select"
                                                            name="searchCompany"
                                                            placeholder="Select"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        />
                                    )}
                                </Grid>
                                <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                    <label>Category</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={categoryoptArbitary}
                                        groupBy={(option) => option.mainmenu}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'searchCategory',
                                                value
                                            )
                                        }
                                        value={formdata.searchCategory}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                name="searchCategory"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={1.5} md={1.5} sm={6} xs={6}>
                                    <label>Year</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={yearopt}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'searchYear',
                                                value
                                            )
                                        }
                                        // inputValue={formdata.searchYear}
                                        value={formdata.searchYear || ''}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
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
                                <Grid item lg={1.5} md={1.5} sm={6} xs={6}>
                                    <label>Period</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={periodopt}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'searchPeriod',
                                                value
                                            )
                                        }
                                        value={formdata.searchPeriod}
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
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            // style={{ marginTop: "-8px" }}
                                            variant="contained"
                                            color="primary"
                                            className="whitebg"
                                            onClick={getFileNames}
                                        >
                                            Search
                                        </Button>
                                        <Button
                                            style={{
                                                marginTop: '25px',
                                                marginLeft: '15px',
                                                borderRadius: '4px',
                                            }}
                                            variant="outlined"
                                            className="whitebg "
                                            onClick={handleClearDropdown}
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
                <StyledCard
                    elevation={6}
                    className="filesandfolder breakall-word"
                >
                    {!showExtractedFiles && (
                        <ValidatorForm className="leadsearch customform">
                            <Grid container spacing={3} className="testetest">
                                <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                    <Title>Files</Title>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={filesopt}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(event, value) =>
                                            changedropdownvalue('files', value)
                                        }
                                        value={formdata.files || ''}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                name="files"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                    <div style={{ marginTop: '30px' }}>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            options={WeekAndMonthOptions}
                                            // getOptionLabel={(option) => option.label}
                                            onChange={changeWeekandMonthFiles}
                                            value={selectedOption || null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    name="files"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6}>
                                    <Button
                                        style={{
                                            marginTop: '35px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                        }}
                                        variant="outlined"
                                        className="whitebg "
                                        onClick={clearWeekAndMonthFiles}
                                        color="primary"
                                    >
                                        Clear
                                    </Button>
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
                    )}

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
                    <SubTitle>
                        {showExtractedFiles ? (
                            <>{getCurrentFolderPath()}</>
                        ) : (
                            ''
                        )}
                    </SubTitle>
                    <Grid container spacing={3} className="folderss">
                        {showExtractedFiles && (
                            <>
                                {console.log(
                                    allSubFolders,
                                    'allSubFoldersallSubFolders'
                                )}
                                {allSubFolders?.map((folder, index) => {
                                    console.log(folder, 'folderssss')
                                    const folderSegments = folder.split('/')
                                    const lastFolderName =
                                        folderSegments[
                                            folderSegments.length - 1
                                        ]

                                    return (
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            key={index}
                                        >
                                            <div className="singlefilefol">
                                                <div
                                                    className="folderfileName"
                                                    onClick={() => {
                                                        getSelectedZipFolder(
                                                            folder
                                                        )
                                                    }}
                                                >
                                                    <Icon fontSize="medium">
                                                        <img
                                                            src={getFileIcon(
                                                                lastFolderName,
                                                                1
                                                            )}
                                                        />
                                                    </Icon>{' '}
                                                    <span>
                                                        {lastFolderName}
                                                    </span>
                                                </div>
                                                <div className="folderfileDetail"></div>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )}
                    </Grid>
                    <Grid container spacing={3} className="folderss">
                        {showExtractedFiles ? (
                            <>
                                {allExtractFiles?.map((extractfiles, index) => {
                                    return (
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            key={index}
                                        >
                                            <div className="singlefilefol">
                                                <div
                                                    className="folderfileName"
                                                    onClick={() => {
                                                        getFileExtension(
                                                            extractfiles?.filename
                                                        ) === 'zip'
                                                            ? getSelectedZipFolder(
                                                                  extractfiles?.folderPath
                                                              )
                                                            : window.open(
                                                                  extractfiles.presignedUrl,
                                                                  '_blank'
                                                              )
                                                    }}
                                                >
                                                    <Icon fontSize="medium">
                                                        <img
                                                            src={getFileIcon(
                                                                extractfiles.fileName
                                                            )}
                                                        />
                                                    </Icon>{' '}
                                                    <span>
                                                        {extractfiles.fileName}
                                                    </span>
                                                </div>
                                                <Icon
                                                    fontSize="medium"
                                                    className="more_horiz"
                                                    onClick={(e) =>
                                                        handleClicksubfoldermenu(
                                                            e,
                                                            extractfiles
                                                        )
                                                    }
                                                >
                                                    more_horiz
                                                </Icon>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (
                            filteredArray?.map((file, index) => (
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    key={index}
                                >
                                    <div className="singlefilefol">
                                        <div
                                            className="folderfileName"
                                            onClick={() => {
                                                const extension =
                                                    getFileExtension(
                                                        file.filename
                                                    )
                                                if (extension === 'zip') {
                                                    if (file.folderPath) {
                                                        getSelectedZipFolder(
                                                            file.folderPath,
                                                            1
                                                        )
                                                    } else {
                                                        getSelectedZipFolder(
                                                            file.filename,
                                                            1
                                                        )
                                                    }
                                                } else {
                                                    window.open(
                                                        file.presignedurl,
                                                        '_blank'
                                                    )
                                                }
                                            }}
                                        >
                                            <Icon fontSize="medium">
                                                <img
                                                    src={getFileIcon(
                                                        file.filename
                                                    )}
                                                />
                                            </Icon>{' '}
                                            <span>
                                                {file.filename}
                                            </span>
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
                            ))
                        )}
                    </Grid>
                    {showExtractedFiles ? null : (
                        <>
                            {completeFiles && completeFiles.length > 0 && (
                                <div style={{ margin: '0 auto' }}>
                                    <Pagination
                                        count={Math.ceil(
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
                        </>
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
                                onClick={() =>
                                    handleClickOpen('view', fileSelected)
                                }
                            >
                                <Icon
                                    fontSize="small"
                                    className="more_horiz docitem"
                                >
                                    remove_red_eye
                                </Icon>{' '}
                                Details
                            </MenuItem>
                            <MenuItem key="5">
                                {filteredArray.map((file, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            window.open(
                                                file.presignedurl,
                                                '_blank'
                                            )
                                        }
                                    >
                                        <div style={{ display: 'flex' }}>
                                            {fileSelected === file && (
                                                <>
                                                    <Icon
                                                        fontSize="small"
                                                        className="more_horiz docitem"
                                                    >
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
                            {fileSelected.documentType !== 'Arbitrary' && (
                                <MenuItem
                                    key="6"
                                    onClick={() =>
                                        handleClickOpen('edit', fileSelected)
                                    }
                                >
                                    <Icon
                                        fontSize="small"
                                        className="more_horiz docitem"
                                    >
                                        edit
                                    </Icon>{' '}
                                    Edit
                                </MenuItem>
                            )}
                            <MenuItem
                                key="7"
                                onClick={() =>
                                    handleDeleteOpen(fileSelected.id)
                                }
                            >
                                <Icon
                                    fontSize="small"
                                    className="more_horiz docitem"
                                >
                                    delete
                                </Icon>{' '}
                                Delete
                            </MenuItem>
                        </Menu>
                    ) : subFolderMenuShow ? (
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
                                        onClick={() => {
                                            window.open(
                                                extractfiles.presignedUrl,
                                                '_blank'
                                            )
                                        }}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            {subFolderFile === extractfiles && (
                                                <>
                                                    <Icon
                                                        fontSize="small"
                                                        className="more_horiz"
                                                    >
                                                        {' '}
                                                        file_download
                                                    </Icon>
                                                    Download
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {/* {allExtractFiles.map((extractfiles, index) => (
                                    <div key={index}>
                                        <div style={{ display: 'flex', cursor: 'pointer' }}>
                                            {subFolderFile === extractfiles && (
                                                <>
                                                    <a
                                                        href={extractfiles.extractfiles}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="more_horiz docitem"
                                                    >
                                                        <Icon fontSize="small">
                                                            file_download
                                                        </Icon>
                                                        <span>Download</span>
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))} */}
                            </MenuItem>
                            <MenuItem
                                key="7"
                                onClick={() =>
                                    handleDeleteOpen(subFolderFile.uuid)
                                }
                            >
                                <Icon fontSize="small" className="more_horiz">
                                    delete
                                </Icon>{' '}
                                Delete
                            </MenuItem>
                        </Menu>
                    ) : null}
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
                        style={{ width: '100px' }}
                        onClick={handleDeleteConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Confirm
                    </Button>
                    <Button
                        style={{
                            width: '100px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                        }}
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
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            {/* {console.log(formdata.category,'includes',['Valuation Report','Equity Value','Asset Cover Ratio'].includes(formdata.documenttype))} */}

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
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'this field is required',
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Category</label>
                                            <AutoComplete
                                                disabled={edit || view}
                                                className="dropdown"
                                                fullWidth
                                                value={getSelectedItem(
                                                    formdata.category,
                                                    formdata?.documenttype ===
                                                        'Fixed Documents'
                                                        ? categoryoptFixed
                                                        : categoryoptArbitary
                                                )}
                                                groupBy={(option) =>
                                                    option.mainmenu
                                                }
                                                options={
                                                    formdata?.documenttype ===
                                                    'Fixed Documents'
                                                        ? categoryoptFixed
                                                        : categoryoptArbitary
                                                }
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
                                                        value={
                                                            formdata.category
                                                        }
                                                        name="category"
                                                        placeholder="Select"
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'this field is required',
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        {![
                                                'Valuation Report',
                                                'Equity Value',
                                                'Asset Cover Ratio',
                                            ].includes(formdata.category) &&
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                                    <label>Company</label>
                                                    <AutoComplete
                                                        disabled={
                                                            userRole ===
                                                                'Company Admin' ||
                                                            userRole ===
                                                                'Company User'
                                                                ? isCompanyUserOrAdmin
                                                                : edit || view
                                                        }
                                                        defaultValue={getSelectedItem(
                                                            formdata.company,
                                                            companyopt,
                                                            0,
                                                            0
                                                        )}
                                                        className="dropdown"
                                                        fullWidth
                                                        options={companyopt}
                                                        getOptionLabel={(
                                                            option
                                                        ) => option.label}
                                                        onChange={(
                                                            event,
                                                            value
                                                        ) =>
                                                            changedropdownvalue(
                                                                'company',
                                                                value
                                                            )
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                className="required"
                                                                label="Select"
                                                                value={
                                                                    formdata.company
                                                                }
                                                                name="company"
                                                                placeholder="Select"
                                                                validators={[
                                                                    'required',
                                                                ]}
                                                                errorMessages={[
                                                                    'this field is required',
                                                                ]}
                                                            />
                                                        )}
                                                    />
                                        </Grid>}
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
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
                                                        dayClassName={customDayClassName}
                                                        onOpen={() =>
                                                            setdateOpen(true)
                                                        }
                                                        onClose={() =>
                                                            setdateOpen(false)
                                                        }
                                                        onChange={(e) =>
                                                            handleDateChange(e)
                                                        }
                                                        renderInput={(
                                                            props
                                                        ) => (
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
                                                        shouldDisableDate={
                                                            shouldDisableDate
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <label>Quarter</label>
                                            <AutoComplete
                                                disabled={edit || view}
                                                disableClearable={
                                                    !formdata.quarter && true
                                                }
                                                className="dropdown"
                                                getOptionDisabled={(option) =>
                                                    option.id >
                                                    getCurrenctQuarter(
                                                        formdata.year
                                                    )
                                                }
                                                fullWidth
                                                defaultValue={getSelectedItem(
                                                    formdata.quarter,
                                                    quarteropt,
                                                    0,
                                                    1
                                                )}
                                                options={quarteropt}
                                                // getOptionLabel={(option) =>
                                                //     option.label
                                                // }
                                                onChange={(event, value) => {
                                                    changedropdownvalue(
                                                        'quarter',
                                                        value
                                                    )
                                                }}
                                                value={formdata.quarter}
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
                                                            error={
                                                                quarterValidate
                                                            }
                                                        />
                                                        {quarterValidate && (
                                                            <span className="quater-validation">
                                                                this field is
                                                                required
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </Grid>
                                        
                                        {formdata.documenttype ==
                                                'Arbitrary' && (
                                                    <Grid  item
                                                    lg={6}
                                                    md={6}
                                                    sm={12}
                                                    xs={12}>
                                                        <div className="doc-files-folders">
                                                            <RadioGroup
                                                                aria-label="Gender"
                                                                name="changeRadioButton"
                                                                className="group"
                                                                value={
                                                                    formdata.changeRadioButton ||
                                                                    ''
                                                                }
                                                                onChange={(e) =>
                                                                    formdatavaluechange(
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                    }}
                                                                >
                                                                    <FormControlLabel
                                                                        value="Files"
                                                                        control={
                                                                            <Radio />
                                                                        }
                                                                        label="Files"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="Folders"
                                                                        control={
                                                                            <Radio />
                                                                        }
                                                                        label="Folders"
                                                                    />
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </Grid>
                                            )}
                                       
                                        
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <label className="transparentLabel">
                                            sample pdf
                                        </label>
                                        {formdata.documenttype ===
                                            'Arbitrary' ||
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
                                                       {formdata.category} : - Sample Template Download
                                                        <br />
                                                    </span>
                                                </a>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div className="fileuploadBox documentfileupload ">
                                            {formdata.changeRadioButton ===
                                                'Files' ||
                                            formdata.documenttype ===
                                                'Fixed Documents' ? (
                                                <>
                                                    <input
                                                        ref={inputRef}
                                                        disabled={view}
                                                        type="file"
                                                        name="file"
                                                        id="file"
                                                        onChange={(e) =>
                                                            onFileChange(e)
                                                        }
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                    />
                                                    <div
                                                        className="uploaderDiv"
                                                        onClick={
                                                            handleBrowseClick
                                                        }
                                                    >
                                                        <img
                                                            src={IconCloudSvg}
                                                        />
                                                        <Typography>
                                                            Drag files to upload
                                                            OR Browse
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
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                    />
                                                    <div
                                                        className="uploaderDiv"
                                                        onClick={
                                                            handleBrowseClick
                                                        }
                                                    >
                                                        <img
                                                            src={IconCloudSvg}
                                                            alt="Cloud Icon"
                                                        />
                                                        <Typography>
                                                            Drag folders to
                                                            upload OR Browse
                                                        </Typography>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Grid>
                                    
                                    </Grid>
                            </StyledCard>
                            <SubTitle className="SubTitle">Uploading</SubTitle>
                            <div className="uploadingfilesfol">
                                {uploadZipFolder &&
                                formdata.documenttype === 'Arbitrary' &&
                                formdata.changeRadioButton === 'Folders' ? (
                                    <div className="single_uploadingfilesfol">
                                        <div>
                                            <img
                                                style={{ width: '30px' }}
                                                src={zipFolder}
                                                alt="zipfolder"
                                            />
                                            <span>
                                                {/* <img src={require(zipFolder).default} alt='zipfolder' /> */}
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
                                            onClick={removeUploadedZipFolder}
                                        >
                                            delete
                                        </Icon>
                                    </div>
                                ) : (
                                    <>
                                        {uploadedFiles &&
                                            uploadedFiles.map((files, i) => (
                                                <div className="single_uploadingfilesfol">
                                                    <div>
                                                        <span>
                                                            <img
                                                                src={getFileIcon(
                                                                    files.name
                                                                )}
                                                            />
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
                                                        onClick={
                                                            removeUploadedFile
                                                        }
                                                    >
                                                        delete
                                                    </Icon>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            {uploadZipFolder &&
                            uploadZipFolder &&
                            formdata.changeRadioButton === 'Folders' ? (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={
                                        !uploadZipFolder
                                            ? 'whitebg disablebtn'
                                            : 'whitebg'
                                    }
                                    onClick={() =>
                                        setQuarterValidate(
                                            formdata.quarter === null
                                        )
                                    }
                                    disabled={!uploadZipFolder}
                                >
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={
                                        !formdata.file
                                            ? 'whitebg disablebtn'
                                            : 'whitebg'
                                    }
                                    onClick={() =>
                                        setQuarterValidate(
                                            formdata.quarter === null
                                        )
                                    }
                                    disabled={!formdata.file}
                                >
                                    Save
                                </Button>
                            )}
                            <Button
                                style={{
                                    borderRadius: '4px',
                                    width: '100px',
                                    textTransform: 'uppercase',
                                }}
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
                onClose={handleClose}
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
                                <span>Company</span>
                                <span>: {formdata.company}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Document Type</span>
                                <span>: {formdata.documenttype}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Category</span>
                                <span>
                                    :{' '}
                                    <div className="viewprofiledetails">
                                        {formdata.category}
                                    </div>
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Financial Year</span>
                                <span>
                                    : {formdata.year}
                                    {/* : {edit || view ? formdata.year : ''} */}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Quarter</span>
                                <span>: {formdata.quarter}</span>
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
