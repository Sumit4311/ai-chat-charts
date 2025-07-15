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
import { postDataFromApi, getDataFromApi, putDataFromApi, deleteDataFromApi } from '../../services/CommonService';
import { getallplmnt, deleteplmnt, searchplmnt, getAllCompanyDetails } from '../../services/api';
import AlertMessage from '../commoncomponent/AlertMessage'
import { statusoptions, progressStages } from '../../services/CommonObject';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import moment from 'moment'
import Arrowrightwhite from "../../image/Arrowrightwhite.svg"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragList from "./DragList";

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



const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#0E0E23',

}))




const PipelineManagementprogress = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    const [nameDetails, setnameDetails] = useState([])
    const [companyoptions, setcompanyoptions] = useState([])


    const [characters, updateCharacters] = useState(nameDetails);



    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }




    useEffect(() => {
        getnameDetails();
    }, []);

    const getnameDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllCompanyDetails, 1);
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data);
            updateCharacters(response.data)
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
                <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/investmentpipeline/lead')}>
                    Lead List
                </Button>
            </div>
            <Grid container spacing={3} >
                <Grid item lg={12} md={12} sm={12} xs={12} className="progressHeadercon">
                    <StyledCard elevation={6}>
                        <CardHeader className="cardheader">
                            <Title>Progress stages</Title>
                        </CardHeader>

                        {/* <Grid container spacing={3} className="stagesmaindiv">
                                  
                                  <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Origination stage</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      {nameDetails.map((nameDetails, index) => (
                                      <div className='companyname'>{nameDetails.name}</div>
                                      ))}
                                  </div>
                                  <div className="customtooltip">
                                     DF
                                    Review
                                  </div>
                                </Grid>
                             
                               <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>NDA stage</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      <div className='companyname'>Receive Information</div>
                                      <div className='companyname'>Desktop Analysis</div>
                                      <div className='companyname'>Initial Valuation</div>
                                      <div className='companyname'>Timeline tool</div>
                                      <div className='companyname'>Deal evaluation sheet</div>
                                      <div className='companyname'>CP cheque size</div>
                                      <div className='companyname'>CP standard NDA Template or</div>
                                      <div className='companyname'>Thirtd party NDA  template</div>
                                  </div>
                                  <div className="customtooltip">
                                     DF Screening
                                  </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Adition to pipeline</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      
                                  </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Termsheet/EOI/NBO</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      <div className='companyname'>IC Sighting paper</div>
                                      <div className='companyname'>Risk paper</div>
                                      <div className='companyname'>Impact assessment</div>
                                      <div className='companyname'>Final valuation</div>
                                      <div className='companyname'>Detailed termsheet</div>
                                  </div>
                                  <div className="customtooltip">
                                    LPAC if Required
                                  </div>
                                  <div className="customtooltip">
                                    IC Screening
                                  </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Due Dilligence</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                  </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Draft Agreements</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      <div className='companyname'>IC final paper</div>
                                      <div className='companyname'>100 day plan</div>
                                      <div className='companyname'>Board pack</div>
                                      <div className='companyname'>Legal Documentation</div>
                                      <div className='companyname'>E&S action plan</div>
                                      <div className='companyname'>Imapct action plan</div>
                                      <div className='companyname'>DD reports</div>
                                      <div className='companyname'>EIB/CDC undertakings</div>
                                      <div className='companyname'>KYC</div>
                                  </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} >
                                  <div className='titlewitharrow'>
                                      <Title>Sign Agreements</Title>
                                      <img src={Arrowrightwhite} />
                                  </div>
                                  <div className='content'>
                                      <div className='companyname'>Pay away process</div>
                                  </div>
                                  <div className="customtooltip">
                                     IC Final
                                  </div>
                                  <div className="customtooltip">
                                     Manager Boards
                                  </div>
                                  <div className="customtooltip">
                                    Fund Boards
                                  </div>
                                </Grid>
                           </Grid> */}
                    </StyledCard>
                </Grid>
                <DragList />

            </Grid>

            {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                        {characters.map(({id, name, thumb}, index) => {
                        return (
                            <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <p>
                                            { name }
                                        </p>
                                    </li>
                                )}
                            </Draggable>
                        );
                        })}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext> */}

        </Container>
    )
}

export default PipelineManagementprogress
