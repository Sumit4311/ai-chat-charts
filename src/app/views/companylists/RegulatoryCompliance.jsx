import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import { getFileIcon, yearopt } from 'app/services/CommonObject'
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
// import XlsxFileFormat from "../../image/xlsx-file-format-extension.svg"
// import pdf from "../../image/pdf.svg"
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import zip from "../../image/zip.svg"
import xlsxgreen from "../../image/xlsxgreen.svg"
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Pagination from '@material-ui/lab/Pagination';
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { DatePicker } from '@mui/lab'
import IconCloudSvg from '../../image/cloudcomputing.svg';
import { Menu, MenuItem } from '@mui/material'
import Slide from '@mui/material/Slide'
import sheet from "../../image/sheets.svg"
/*import DialogTitle from '@mui/material/DialogTitle'*/
import { getDataFromApi, postDataFromApi, deleteDataFromApi } from '../../services/CommonService';
import { getAllCompanyDetails, uploadFileCommercialProduct, uploadFileFinance, uploadFileTechnology, uploadFilepeople, uploadFileSocialmedia, searchplmnt, reportsSearch, getonboardcmp, deletedocumentfile } from '../../services/api';
/* import preval from "babel-plugin-preval";
import fs from 'fs-react'; */
import AlertMessage from '../commoncomponent/AlertMessage'
import $ from 'jquery'
import testFile from '../../image/Format reference.xlsx';
import { useParams } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
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

const DialogTitle = ((props) => {
    const { children, onClose } = props
    return (
        <DialogTitleRoot disableTypography>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className='closeButton'
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitleRoot>
    )
})


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
    { id: 1, label: "Active" },
    { id: 2, label: "Inactive" },
]

const doctypeopt = [
    { id: "Fixed Documents", label: "Fixed Documents" },
    { id: "Arbitrary", label: "Arbitrary" },
]

const WeekAndMonthOptions = [
    { id: 'lastSevenDaysFiles', label: 'Last Seven Days Files' },
    { id: 'lastMonthFiles', label: 'Last Month Files' }
];
const categoryopt = [
    { id: "Commercial & Business", label: "Commercial & Business" },
    { id: "Finance", label: "Finance" },
    { id: "Technology", label: "Technology" },
    { id: "People & Culture", label: "People & Culture" },
    { id: "Shareholder Repository", label: "Shareholder Repository" },
    { id: "Employees List", label: "Employees List" },
    { id: "Regulatory & Compliance", label: "Regulatory & Compliance", mainmenu: "others" },
    { id: "ESG", label: "ESG", mainmenu: "others" },
    { id: "Risks", label: "Risks", mainmenu: "others" },
    { id: "News & Social Media", label: "News & Social Media", mainmenu: "others" },
]

const periodopt = [
    // { id: 1, label: "Financial Year" },
    { id: "Q1", label: "Q1" },
    { id: "Q2", label: "Q2" },
    { id: "Q3", label: "Q3" },
    { id: "Q4", label: "Q4" },
    // { id: 6, label: "Months" },
]

const quarteropt = [
    { id: 1, label: "Q1" },
    { id: 2, label: "Q2" },
    { id: 3, label: "Q3" },
    { id: 4, label: "Q4" },
]

const filesopt = [
    { id: "Recently Added", label: "Recently Added" },
]

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

const RegulatoryCompliance = () => {
    const theme = useTheme()
    // const { logout, user, data } = useAuth()


    const navigate = useNavigate()
    let { companyId } = useParams()
    const [formdata, setFormData] = useState({
        searchdocumenttype: null,
        period: null,
        searchcompany: companyId ? companyId : '',
        searchcategory: "Regulatory & Compliance",
        documenttype: "",
        company: "",
        category: "",
        status: "",
        recentfiles: null,
        searchYear: null,
        originalFileList: []
    })
    const [open, setOpen] = useState(false)
    const [dateopen, setdateOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const submeuopen = Boolean(anchorEl)
    const [detailsopen, setdetailsopen] = useState(false)
    const [nameDetails, setnameDetails] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [uploadedFiles, setuploadedFiles] = useState([])
    const [fileArray, setFileArray] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [completeFiles, setCompleteFiles] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [page, setPage] = useState(1)
    const user = useAuth()
    const [selectedOption, setSelectedOption] = useState(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [delete_id, setDeleteId] = useState('')
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(false)
    const [fileSelected, setfileSelected] = useState({})
    const [index, setIndex] = useState('')

    const [allActivecmp, setallActivecmp] = useState([])
    const [companyopt, setcompanyopt] = useState([])


    var companyLabel = ''
    var companyopts = JSON.parse(localStorage.getItem('companyDet'))

    companyopts &&
        companyopts.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    function handleCloseRegulatoryDetails() {
        setOpen(false)
        setdetailsopen(false)
    }

    function handleClickOpen(type, record) {
        setAnchorEl(null)
        setOpen(true)
        setEdit(false)
        setView(false)
        if (type === 'edit' || type === 'view') {
            setFormData((formData) => ({
                ...formData,
                filename: record.filename,
                company: record.companyName,
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
    const clearWeekAndMonthFiles = () => {
        setFormData((formData) => ({
            ...formData,
            recentfiles: null,
            lastMonthFiles: null
        }))
        setSelectedOption(null)
        getFileNames()
    }

    const changeWeekandMonthFiles = (event, value) => {
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

        if (response && response?.status == '200') {
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
    const handleSubmit = async (event) => {
        if (!formdata.file) {
            setalertMessage("Please choose file")
            setalert(true)
            setalertType('error')
            return false
        }
        var formData = new FormData();
        formData.append("file", formdata.file);
        formData.append("companyId", formdata.company);
        formData.append("quarter", 'Q' + formdata.quarter);

        var response = ''

        if (formdata.category == 1) {
            response = await postDataFromApi(
                uploadFileCommercialProduct,
                formData, 1, '', 1)
        } else if (formdata.category == 2) {
            response = await postDataFromApi(
                uploadFileFinance,
                formData, 1, '', 1)
        } else if (formdata.category == 3) {
            response = await postDataFromApi(
                uploadFileTechnology,
                formData, 1, '', 1)
        } else if (formdata.category == 4) {
            response = await postDataFromApi(
                uploadFilepeople,
                formData, 1, '', 1)
        } else if (formdata.category == 9) {
            response = await postDataFromApi(
                uploadFileSocialmedia,
                formData, 1, '', 1)
        }
        if (response && response.status == 200) {
            console.log(response)
            setalertMessage(response.message ? response.message : 'file is uploaded successfully')
            setalert(true)
            setalertType('success')
            setuploadedFiles([])
        } else {
            setalertMessage("error uploading file")
            setalert(true)
            setalertType('error')
        }
    }
    const handleClearDropdown = () => {
        setFormData((formData) => ({
            ...formData,
            searchdocumenttype: null,
            period: null,
            searchYear: null,
        }))
        getFileNames()
    }
    const filterList = (filedata = '') => {
        var newfiledata = filedata && filedata.length > 0 ? filedata : fileArray
        if (formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.quarter == formdata.period) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            setCompleteFiles(newSearchArr)
            displayingrecords(newSearchArr)
        }
        else if (formdata.searchYear) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.year == formdata.searchYear) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            setCompleteFiles(newSearchArr)
            displayingrecords(newSearchArr)
        }
        else if (formdata.searchdocumenttype) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.documentType == formdata.searchdocumenttype) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            setCompleteFiles(newSearchArr)
            displayingrecords(newSearchArr)
        }

        else if (formdata.searchcategory) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.category == formdata.searchcategory) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            setCompleteFiles(newSearchArr)
            displayingrecords(newSearchArr)
        }

        else if (formdata.searchcompany) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            setCompleteFiles(newSearchArr)
            displayingrecords(newSearchArr)
        }
        else if (formdata.period && formdata.searchYear) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.quarter.trim() == formdata.period.trim()
                    && opt?.year.trim() === formdata.searchYear.trim()) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            displayingrecords(newSearchArr)
        }
        else if (formdata.searchdocumenttype && formdata.period && formdata.searchYear) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.documentType.trim() == formdata.searchdocumenttype.trim()
                    && opt?.quarter.trim() == formdata.period.trim()
                    && opt?.year === formdata.searchYear) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        }
        else if (formdata.searchdocumenttype && formdata.searchYear) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.documentType.trim() == formdata.searchdocumenttype.trim()
                    && opt?.year === formdata.searchYear) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        }

        else if (formdata.searchcompany && formdata.searchdocumenttype && formdata.searchcategory && formdata.period && formdata.searchYear) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany &&
                    opt?.category.trim() == formdata.searchcategory.trim()
                    && opt?.documentType.trim() == formdata.searchdocumenttype.trim()
                    && opt?.quarter.trim() == formdata.period.trim()
                    && opt?.year == formdata.searchYear
                ) {
                    newSearchArr.push(opt);
                }
            })
            // setFilteredArray(newSearchArr)
            displayingrecords(newSearchArr)
        } else if (formdata.searchcompany && formdata.searchdocumenttype && formdata.searchcategory) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.documentType.trim() == formdata.searchdocumenttype.trim() && opt?.category.trim() == formdata.searchcategory.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)

        } else if (formdata.searchcompany && formdata.searchdocumenttype && formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.documentType.trim() == formdata.searchdocumenttype.trim() && opt?.quarter.trim() == formdata.period.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchcompany && formdata.searchcategory && formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.category.trim() == formdata.searchcategory.trim() && opt?.quarter.trim() == formdata.period.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchdocumenttype && formdata.searchcategory && formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.documentType.trim() == formdata.searchdocumenttype.trim() && opt?.category.trim() == formdata.searchcategory.trim() && opt?.quarter.trim() == formdata.period.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchcompany && formdata.searchdocumenttype) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.documentType.trim() == formdata.searchdocumenttype.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchcompany && formdata.searchcategory) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.category.trim() == formdata.searchcategory.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchcompany && formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.companyId == formdata.searchcompany && opt?.quarter.trim() == formdata.period.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchdocumenttype && formdata.searchcategory) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.documentType.trim() == formdata.searchdocumenttype.trim() && opt?.category.trim() == formdata.searchcategory.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        } else if (formdata.searchcategory && formdata.period) {
            let newSearchArr = []
            newfiledata.find((opt) => {
                if (opt?.category.trim() == formdata.searchcategory.trim() && opt?.quarter.trim() == formdata.period.trim()) {
                    newSearchArr.push(opt);
                }
            })
            setFilteredArray(newSearchArr)
        }

        // else if (formdata.company &&formdata.documenttype&&formdata.category) {
        //     let newSearchArr = []
        //     fileArray.find((opt) => {
        //         if (opt?.companyId.includes(formdata.company)&&opt?.documentType.includes(formdata.documentType)&&opt?.category.includes(formdata.category))  {
        //             newSearchArr.push(opt);
        //         }
        //     })
        //     setFilteredArray(newSearchArr)
        // }
        // else if (formdata.company &&formdata.documenttype&&formdata.period) {
        //     let newSearchArr = []
        //     fileArray.find((opt) => {
        //         if (opt?.companyId.includes(formdata.company)&&opt?.documentType.includes(formdata.documentType)&&opt?.period.includes(formdata.period))  {
        //             newSearchArr.push(opt);
        //         }
        //     })
        //     setFilteredArray(newSearchArr)
        // }

        else {
            setFilteredArray(fileArray)
        }
    }

    function confirm() {
        setalert(false)
        $(".fileuploadBox.documentfileupload input[type='file']").val(null);
        formdata['file'] = null;
        setuploadedFiles([])
        setFormData((formData) => ({
            ...formData,
            searchdocumenttype: null,
            period: null,
            searchYear: null,
            recentfiles: null,
            lastMonthFiles: null
        }))
        setSelectedOption(null)
        setAnchorEl(null)
        getFileNames()
    }

    const handleDateChange = (date) => {
        setFormData((formData) => ({
            ...formData,
            date,
        }));
    }

    function onFileChange(event) {
        var file = event.target.files[0]
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: file,
        }));
        if (uploadedFiles) {
            uploadedFiles.splice(0, 1)
        }
        if (file) {
            var data = {
                name: file.name,
                size: file.size
            }
            uploadedFiles.push(data)
        }
    }

    function removeUploadedFile() {
        setuploadedFiles([])
        //uploadedFiles.splice(0,1)
        formdata['file'] = null;
        console.log(formdata.file)
        $(".fileuploadBox.documentfileupload input[type='file']").val(null);
    }

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
        if (type == 'recentfiles') {
            if (value) {
                fileArray.sort(function (a, b) {
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                });
            }
            else {
                fileArray.sort(function (a, b) {
                    return new Date(a.uploadDate) - new Date(b.uploadDate);
                });
                displayingrecords(fileArray)
            }
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
        var query = ""
        const response = await getDataFromApi(searchplmnt, 1, 1);
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data);
        }
    }
    const filterLists = () => {
        let querystring = ''
        if (companyId) {
            querystring += querystring
                ? '&company=' + companyId
                : 'company=' + companyId
        }
        if (formdata.searchcategory) {
            querystring += querystring ? '&category=' : 'category=';
            querystring += encodeURIComponent("Regulatory & Compliance");
        }
        return querystring ? '?' + querystring : ''

    }

    const getFileNames = async () => {
        var query = ""
        var querystring = filterLists()

        const response = await getDataFromApi(reportsSearch + querystring, 1, "");
        if (response?.status == 200 && response?.data) {
            // setnameDetails(response.data);
            // const REGULATORY = response.data.filter (val => val.category === "Regulatory & Compliance"&& val.companyId === "c68a7105-6bf2-4447-ad84-fd776713545c")
            setFileArray(response?.data)
            // setFilteredArray(response.data)
            displayingrecords(response?.data)
            setCompleteFiles(response?.data)
            setFormData((formData) => ({
                ...formData,
                ['originalFileList']: response?.data,
            }));


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
        getallActivecmp();
        // getnameDetails();
        getFileNames()

    }, [companyId]);

    const getallActivecmp = async () => {
        const response = await getDataFromApi(getonboardcmp + `?userId=${user?.user?.id}`, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            setallActivecmp(response.data)
            var comOpt = []
            response.data.map((opt) => {
                var cp = []
                cp['id'] = opt.id
                cp['label'] = opt.companyName
                if (user.roles === 'Company Admin' && user.email === opt?.companyVo?.dealTeams) {
                    comOpt.push(cp)
                }
            })
            setcompanyopt(comOpt)
        }
    }

    const handleChangeRowsPerPage = (event, value) => {
        setPage(value)
        displayingrecords(completeFiles, value, 15)
    }
    const displayingrecords = (listingData = [], pageno = page, rowpage = rowsPerPage) => {
        var updated = listingData
            .slice(
                pageno === 1 ? 0 : pageno - 1 * rowpage,
                pageno === 1 ? rowpage : rowpage * pageno
            );
        setFilteredArray(updated)
    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'Regulatory & Compliance' },
                    ]}
                />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                    Others / Regulatory & Compliance{' '}
                </div>
            </div>
            <div className="rightalign_btn">
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <Box width="100%" className="box">
                <StyledCard elevation={6} className="searchdiv">
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null} className="leadsearch customform">
                        <Grid container spacing={3}>
                            <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                <label>Document Type</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    // defaultValue={{ id: "Fixed Documents", label: "Fixed Documents" }}
                                    options={doctypeopt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('searchdocumenttype', value)}
                                    value={formdata.searchdocumenttype}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            name="searchdocumenttype"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6} className="disabledDiv">
                                <label>Company</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={companyopt}
                                    defaultValue={{ id: companyId, label: companyLabel }}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('searchcompany', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.searchcompany}
                                            name="searchcompany"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2.5} md={2.5} sm={6} xs={6} className="disabledDiv">
                                <label>Category</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    defaultValue={{ id: "Regulatory & Compliance", label: "Regulatory & Compliance" }}
                                    options={categoryopt}
                                    groupBy={(option) => option.mainmenu}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('searchcategory', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.searchcategory}
                                            name="searchcategory"
                                            placeholder="Select"
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
                                    onChange={(event, value) => changedropdownvalue('period', value)}
                                    value={formdata.period}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            name="category"
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
                                        changedropdownvalue('searchYear', value)
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
                            <Grid item lg={1} md={1} sm={6} xs={6}>
                                <div style={{ display: 'flex' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="whitebg"
                                        onClick={filterList}>
                                        Search
                                    </Button>
                                    <Button
                                        style={{ marginTop: "25px", marginLeft: '15px', borderRadius: "4px" }}
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
                </StyledCard>
                <StyledCard elevation={6} className="filesandfolder">
                    <ValidatorForm className=" leadsearch customform">
                        <Grid container spacing={3}>

                            <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                <Title>Files</Title>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={filesopt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('recentfiles', value)}
                                    value={formdata.recentfiles}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            name="recentfiles"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={2.5} md={2.5} sm={6} xs={6}>
                                <div style={{ marginTop: "30px" }}>
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
                                    style={{ marginTop: "35px", borderRadius: "4px", display: "flex" }}
                                    variant="outlined"
                                    className="whitebg "
                                    onClick={clearWeekAndMonthFiles}
                                    color="primary"
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>

                    <SubTitle>Files</SubTitle>
                    <Grid container spacing={3} className="folderss">
                        {filteredArray.map((file, index) => (
                            <Grid item lg={4} md={4} sm={6} xs={12}
                            >
                                <div className="singlefilefol">
                                    <div className="folderfileName"
                                        onClick={() => window.open(file.presignedurl, "_blank")}>
                                        <Icon fontSize="medium"><img src={xlsxgreen} />
                                        </Icon> <span>{file.filename}</span></div>
                                    <div className="folderfileDetail">{file.uploadDate}  .  {file.filesize + 'KB'}  .  {file.documentType}</div>
                                    <Icon
                                        fontSize="medium"
                                        className="more_horiz"
                                        onClick={(e) => handleClicksubmenu(e, file)} >
                                        more_horiz</Icon>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    {completeFiles.length > 15 &&
                        <div style={{ margin: "0 auto" }}>
                            <Pagination count={Math.round(completeFiles.length / rowsPerPage)} page={page} onChange={handleChangeRowsPerPage} style={{ position: 'center', backgroundColor: 'white' }} />
                        </div>
                    }
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
                            onClick={() => handleClickOpen('view', fileSelected)}
                        >
                            <Icon fontSize="small" className="more_horiz">
                                remove_red_eye
                            </Icon>{' '}
                            Details
                        </MenuItem>
                        <MenuItem key="5">
                            {filteredArray.map((file, index) => (
                                <div
                                    key={index}
                                    onClick={() => window.open(file.presignedurl, '_blank')}
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
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
            >

                <ValidatorForm onSubmit={handleSubmit} className="customform" onError={() => null}>
                    <DialogTitle id="form-dialog-title" onClose={handleCloseRegulatoryDetails}>Upload Documents</DialogTitle>
                    <DialogContent>
                        <StyledCard elevation={6} className="">
                            <Grid container spacing={3} >
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Company</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={companyopt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('company', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.company}
                                                name="company"
                                                placeholder="Select"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        )}
                                    />
                                    <label>Category</label>
                                    <AutoComplete
                                        className={formdata.documenttype == "Fixed Documents" ? "dropdown" : "dropdown disabledDiv"}
                                        fullWidth
                                        groupBy={(option) => option.mainmenu}
                                        options={categoryopt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => { changedropdownvalue('category', value) }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.category}
                                                name="category"
                                                placeholder="Select"
                                                /*validators={['required']}*/
                                                errorMessages={['this field is required']}
                                            />
                                        )}
                                    />
                                    <label>Quarter</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={quarteropt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('quarter', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.quarter}
                                                name="quarter"
                                                placeholder="Select"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <label>Document Type</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={doctypeopt}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changedropdownvalue('documenttype', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.documenttype}
                                                name="documenttype"
                                                placeholder="Select"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        )}
                                    />
                                    <label>Financial Year</label>
                                    <div className="datediv">
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker
                                                openTo="year"
                                                views={["year"]}
                                                value={formdata.date}
                                                open={dateopen}
                                                onOpen={() => setdateOpen(true)}
                                                onClose={() => setdateOpen(false)}
                                                onChange={(e) => handleDateChange(e)}
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
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <label className="transparentLabel">sample pdf</label>
                                    <div className="single_uploadingfilesfol formfiles">
                                        {/* <a href={testFile} without rel='noopener noreferrer' target="_blank">

                                            <Icon fontSize="medium">cloud_download</Icon>
                                            <span>Sample Template<br /></span>
                                        </a> */}

                                    </div>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <div className="fileuploadBox documentfileupload">
                                        <TextField
                                            type="file"
                                            name="file"
                                            id="file"
                                            onChange={(e) => onFileChange(e)}
                                        /*  label="Enter company name"
                                         placeholder="Enter company name" */
                                        // validators={['required']}
                                        // errorMessages={['this field is required']}
                                        />
                                        {/* <input required="true" type="file" name="file" /> */}
                                        <div className="uploaderDiv">
                                            <img src={IconCloudSvg} />
                                            <Typography>Drag files to upload
                                                OR
                                                Browse</Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </StyledCard>
                        <SubTitle className="SubTitle">Uploading</SubTitle>
                        <div className="uploadingfilesfol">
                            {uploadedFiles && uploadedFiles.map((files, i) => (
                                <div className="single_uploadingfilesfol">
                                    <div>
                                        <span><img src={zip} /></span>
                                        <span>{files.name}<br /><span className="folderfileDetail">{files.size}</span></span>
                                    </div>
                                    <Icon fontSize="medium" onClick={removeUploadedFile}>delete</Icon>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" type="submit" color="primary" className="whitebg">
                            Save
                        </Button>
                        <Button
                            className="whitebg"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleCloseRegulatoryDetails()}
                        >
                         CANCEL
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
            <Dialog
                open={detailsopen}
                onClose={handleCloseRegulatoryDetails}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="form-dialog-title"
                keepMounted
                TransitionComponent={Transition}
                className="sidebarPopup"
            >
                <DialogTitle id="form-dialog-title" onClose={handleCloseRegulatoryDetails}>
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
                                <span>: {formdata.category}</span>
                            </div>
                            <div className="detailListinginner">
                                <span>Financial Year</span>
                                <span>: {formdata.year}
                                </span>
                            </div>
                            <div className="detailListinginner">
                                <span>Quarter</span>
                                <span>: {formdata.quarter}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
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
                        style={{ width: "100px" }}
                        onClick={handleDeleteConfirm}
                        color="primary"
                        variant="contained"
                        className="whitebg"
                    >
                        Confirm
                    </Button>
                    <Button
                        style={{ width: "85px", borderRadius: "4px" }}
                        variant="outlined"
                        className="whitebg"
                        onClick={handleDeleteClose}
                        color="primary"
                    >
                       CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default RegulatoryCompliance 