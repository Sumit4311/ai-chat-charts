import React, { useEffect, useState } from 'react'
import { useTheme, Box, styled } from '@mui/system'
import { DragDropContext } from 'react-beautiful-dnd'
import DraggableElement from './DraggableElement'
import { Grid, Button, Card, IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { getAllCompanyDetails, updateCompany, plmntApprove, plmntDecline, plmntUpload, getSingleplmnt, searchplmnt } from '../../services/api'
import { getDataFromApi, putDataFromApi, postDataFromApi } from '../../services/CommonService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import moment from "moment";
import AlertMessage from '../commoncomponent/AlertMessage'
import $ from 'jquery'
import { progressStageslist } from 'app/services/CommonObject'

var companyopt = JSON.parse(localStorage.getItem('companyDet'))
{
    console.log('companyopt', companyopt)
}

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const DragDropContextContainer = styled('div')(({ theme }) => ({
    padding: '20px',
    border: '4px solid indianred',
    borderRadius: '6px',
}))
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#0E0E23',
}))

const ListGrid = styled('div')(({ theme }) => ({
    display: 'flex',
    overflow: 'auto',
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

// fake data generator
const getItems = (companyopt, prefix) =>
    Array.from({ length: companyopt.length }, (v, k) => k).map(k => {
        const randomId = Math.floor(Math.random() * 1000)
        console.log('companyVo--', companyopt[k].stage)
        console.log('prefix--', prefix)
        if (companyopt[k] && companyopt[k].stage == prefix && companyopt[k].status == "Active") {
            return {
                id: `item-${companyopt[k].id}`,
                prefix,
                content: `${companyopt[k].companyName} `,
                companyId: `${companyopt[k].id}`,
            }
        }
        else {
            return null
        }
    })

const removeFromList = (list, index) => {
    const result = Array.from(list)
    const [removed] = result.splice(index, 1)
    return [removed, result]
}

const addToList = (list, index, element) => {
    const result = Array.from(list)
    result.splice(index, 0, element)
    return result
}

// const lists = [
//     'Origination',
//     'NDA',
//     'Addition to Pipeline',
//     'Termsheet/EOI/NBO',
//     'Due Dilligence',
//     'Draft Agreements',
//     'Pay Away',
//     'Sign Agreement',
// ]

const lists = progressStageslist;
const generateLists = (companyDetails) =>
    lists.reduce(
        (acc, listKey) => ({
            ...acc,

            [listKey]: companyDetails
                ? getItems(companyDetails, listKey)
                : [],
        }),
        {}
    )
// const generateLists = (companyDetails=[]) =>{
//     return companyDetails ? companyDetails.map((company,cid)=>{
//         if(company && company.companyVo && company.company.companyVo.stage==lists[0]){
//             getItems(companyDetails, lists[0]) 
//         }
//     }): [];
// }

function DragList() {
    const [elements, setElements] = React.useState(generateLists())
    const theme = useTheme()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [dragdropOpen, setdragdropOpen] = useState(false)
    const [handledragdropOpen, sethandledragdropOpen] = useState()
    const [allowDragDrop, setallowDragDrop] = useState(false)
    const [dragdropResult, setdragdropResult] = useState('')
    const [formdata, setFormData] = useState({ comments: "" })
    const [companyDetails, setcompanyDetails] = useState([])
    const [companyId, setcompanyId] = useState('')
    const [uploadDocresult, setuploadDocresult] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [disableApproveReject, setdisableApproveReject] = useState(true)
    const [disableReview, setdisableReview] = useState(false)
    const [singleplmnt, setsingleplmnt] = useState([])
    const [uploadedfilename, setunploadedFileName] = useState('')
    const userEmail = localStorage.getItem("userEmail")
    useEffect(() => {
        getcompanyDetails()
    }, [singleplmnt])

    const getcompanyDetails = async () => {
        var query = ''
        const response = await getDataFromApi(searchplmnt, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            setcompanyDetails(response.data)
            if (response.data) {
                setElements(generateLists(response.data))
            }
            /*var companysetails = []
            response.data.map((company, i) => {
                var cp = { id: company.id, name: company.name }
                companysetails.push(cp)
            })*/
        }
    }

    const handleDragDropConfirm = async e => {
        if (dragdropResult) {
            const listCopy = { ...elements }
            const sourceList = listCopy[dragdropResult.source.droppableId]
            const [removedElement, newSourceList] = removeFromList(
                sourceList,
                dragdropResult.source.index
            )
            listCopy[dragdropResult.source.droppableId] = newSourceList
            const destinationList =
                listCopy[dragdropResult.destination.droppableId]
            listCopy[dragdropResult.destination.droppableId] = addToList(
                destinationList,
                dragdropResult.destination.index,
                removedElement
            )
            var response = ''
            // var email = singleplmnt.companyVo.dealTeams ? singleplmnt.companyVo.dealTeams : ''
            var email = userEmail
            var draggableId = dragdropResult.draggableId.replace('item-', '');
            var data = {
                id: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].id : '',
                fileId: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].fileId : '',
                stage: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].stage : '',
                status: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].status : '',
                uploadDate: moment().format("YYYY-MM-DD"),
                companyId: singleplmnt ? singleplmnt.id : '',
                comments: formdata.comments ? formdata.comments : '',
            }
            response = await postDataFromApi(plmntApprove + '?username=' + email + '&nextstage=true', data, 1, 1)
            console.log(response)
            if (response && response.status == 200) {
                setElements(listCopy)
                setalertMessage("Approved")
                setalert(true)
                setalertType('success')
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("declined");
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("striked");
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("reviewed");
                getsingleplmnt(response.data.companyId)
                setFormData((formData) => ({
                    ...formData,
                    ['comments']: '',
                    ['uploadDoc']: '',
                }));
            } else {
                setalertMessage("User Doesn't Have Access")
                setalert(true)
                setalertType('error')
            }
        }
        setallowDragDrop(false)
        setdragdropOpen(false)
        setdragdropResult('')
        setcompanyId('')
    }

    const handleDragDropReview = async e => {
        var response = ''
        if (formdata.uploadDoc) {
            const currentDate = moment().format("YYYY/MM/DD")
            var formData = new FormData();
            formData.append("uploadDoc", formdata.uploadDoc);
            formData.append("stage", dragdropResult && dragdropResult.destination.droppableId ? dragdropResult.destination.droppableId : '');
            formData.append("uploadDate", currentDate);
            formData.append("companyId", companyId ? companyId : '');
            formData.append("comments", formdata.comments ? formdata.comments : '');

            response = await postDataFromApi(plmntUpload, formData, 1, 1)
            console.log(response)
            if (response && response.status == 200) {
                setuploadDocresult(response.data)
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("declined");
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("striked");
                $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").addClass("reviewed");
                getsingleplmnt(response.data.companyId)
                setalertMessage("Document uploaded successfully")
                setalert(true)
                setalertType('success')
                setFormData((formData) => ({
                    ...formData,
                    ['comments']: '',
                    ['uploadDoc']: '',
                }));
            } else {
                setuploadDocresult([])
                setalertMessage("error")
                setalert(true)
                setalertType('error')
            }
        }
        else {
            setalertMessage("Please choose file")
            setalert(true)
            setalertType('error')
        }
    }

    const handleDragDropClose = async e => {
        setdragdropOpen(false)
        setallowDragDrop(false)
        setdragdropResult('')
        setFormData((formData) => ({
            ...formData,
            ['comments']: '',
            ['uploadDoc']: '',
        }));
    }

    const handleDragDropDecline = async (e) => {
        var response = ''
        var email = userEmail
        var data = {
            id: singleplmnt.companyHistoryList ? singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length - 1].id : '',
            comments: formdata.comments,
            companyId: singleplmnt ? singleplmnt.id : '',
        }
        response = await postDataFromApi(plmntDecline + '?username=' + email, data, 1, 1)
        if (response && response.status == 200) {
            setcompanyId('')
            setalertMessage("Decline successfully")
            setalert(true)
            setalertType('success')
            $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").addClass("declined");
            $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").addClass("striked");
            $(".droppableColumns div[data-rbd-draggable-id=item-" + response.data.companyId + "] > div.companyname").removeClass("reviewed");
            getsingleplmnt(response.data.companyId)
        }
        else {
            setcompanyId('')
            setalertMessage("User Doesn't Have Access")
            setalert(true)
            setalertType('error')
        }
    }
    /*  const gethandledragdropOpen = async(id) {
    setdragdropOpen(true)
 } */

    const getsingleplmnt = async (id, destinationStage = '') => {
        var query = ""
        const response = await getDataFromApi(
            getSingleplmnt + id,
            1, 1
        )
        if (response && response.status == 200 && response.data != null) {
            console.log(response.data)
            setsingleplmnt(response.data)
            if (response.data) {
                if (response.data.id == id) {
                    if (response.data.companyHistoryList && response.data.companyHistoryList.length > 0 && response.data.companyHistoryList[response.data.companyHistoryList.length - 1].status == 'Submitted' && destinationStage && destinationStage == response.data.companyHistoryList[response.data.companyHistoryList.length - 1].stage) {
                        setdisableApproveReject(false)
                        setdisableReview(true)
                    } else {
                        setdisableApproveReject(true)
                        setdisableReview(false)
                    }
                }
            }
        }
    }

    // const onDragEnd = async (result) => {
    //     console.log('result', result)
    //     if (!result.destination) {
    //         return
    //     }
    //     if (result.destination) {
    //         setcompanyId(result.draggableId.replace('item-', ''))
    //         var companyid = result.draggableId.replace('item-', '')
    //         var sourceid = lists.indexOf(result.source.droppableId)
    //         var sourceidplus = lists.indexOf(result.source.droppableId) + 1
    //         var sourceidminus = lists.indexOf(result.source.droppableId) - 1
    //         var destinationid = lists.indexOf(result.destination.droppableId)

    //         console.log(sourceid)
    //         console.log(destinationid)
    //         if ((sourceid < destinationid && sourceidplus != destinationid) || (sourceid > destinationid && sourceidminus != destinationid)) {
    //             return
    //         }
    //     }
    //     setFormData((formData) => ({
    //         ...formData,
    //         ['comments']: '',
    //     }));
    //     var backStage = ''
    //     if (sourceidminus == destinationid) {
    //         backStage = 1;
    //     }
    //     setsingleplmnt([])
    //     getsingleplmnt(companyid, result.destination.droppableId ? result.destination.droppableId : '')
    //     //console.log(allCompanyplmntDetails)
    //     setallowDragDrop(false)
    //     setdragdropResult('')
    //     setdragdropOpen(true)
    //     setdragdropResult(result)
    //     if (!result.destination || !allowDragDrop) {
    //         return
    //     }

    //     /*if (allowDragDrop) {
    //         const listCopy = { ...elements }

    //         const sourceList = listCopy[result.source.droppableId]
    //         const [removedElement, newSourceList] = removeFromList(
    //             sourceList,
    //             result.source.index
    //         )
    //         listCopy[result.source.droppableId] = newSourceList
    //         const destinationList = listCopy[result.destination.droppableId]
    //         listCopy[result.destination.droppableId] = addToList(
    //             destinationList,
    //             result.destination.index,
    //             removedElement
    //         )

    //         setElements(listCopy)
    //     }*/
    // }

    const onDragEnd = async (result) => {
        if (localStorage.getItem('userRole') === 'Shareholder') {
            return
        }
        if (!result.destination) {
            return
        }
        if (result.destination) {
            setcompanyId(result?.draggableId?.replace('item-', ''))
            var companyid = result?.draggableId?.replace('item-', '')
            var sourceid = lists.indexOf(result?.source?.droppableId)
            var destinationid = lists.indexOf(result?.destination?.droppableId)
            if (sourceid + 1 !== destinationid) {
                return
            }
        }
        setFormData((formData) => ({
            ...formData,
            ['comments']: '',
        }));
        setsingleplmnt([])
        getsingleplmnt(
            companyid,
            result.destination.droppableId ? result.destination.droppableId : ''
        );
        setallowDragDrop(false)
        setdragdropResult('')
        setdragdropOpen(true)
        setdragdropResult(result)
        if (!result.destination || !allowDragDrop) {
            return
        }
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }

    const onFileChange = async (event) => {
        console.log('event', event.target.name)
        var file = event.target.files[0]
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: file,
        }));
    }

    function confirm() {
        setalert(false)
        setdragdropOpen(false)
    }

    return (
        <Grid item lg={12} md={12} sm={12} xs={12} className="dragdropcon">
            <StyledCard elevation={6}>
                <Grid container spacing={3} className="stagesmaindiv">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <ListGrid className="stagesmaindivInner ">
                            {lists.map(listKey => (
                                <DraggableElement
                                    elements={elements[listKey]}
                                    key={listKey}
                                    prefix={listKey}
                                    companyDetails={companyDetails}
                                />
                            ))}
                        </ListGrid>
                    </DragDropContext>
                </Grid>
            </StyledCard>
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
                        {
                            !disableReview && <><Button
                                color="primary"
                                variant="contained"
                                className="whitebg uploadDocbutton"
                            >
                                Upload Document
                                <input type="file" name="uploadDoc" onChange={(e) => onFileChange(e)} />
                            </Button>
                                <p>{formdata?.uploadDoc?.name}</p></>
                        }{' '}
                        <div>Submit for review or approval?</div>
                        <ValidatorForm /* onSubmit={handleSubmit} onError={() => null} className="customform" */>
                            <TextField
                                type="text"
                                name="comments"
                                id="comments"
                                value={formdata.comments || ''}
                                onChange={(e) => formdatavaluechange(e)}
                                label="comments"
                                placeholder="comments"
                                multiline
                                rows={4}
                            /* validators={['required']}
                            errorMessages={['this field is required']} */
                            />
                        </ValidatorForm>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button
                            variant="contained"
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
                        <Button
                            onClick={handleDragDropDecline}
                            color="primary"
                            variant="contained"
                            className="whitebg"
                            disabled={disableApproveReject}
                        >
                            Decline
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
        </Grid>
    )
}

export default DragList
