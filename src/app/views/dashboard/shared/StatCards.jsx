import React from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Small } from 'app/components/Typography'
import Typography from '@mui/material/Typography'

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': {
        color: theme.palette.text.secondary,
    },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const StatCards = () => {
    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            <Grid item xs={12} md={3} className="stat_cards">
                <StyledCard elevation={6} >
                    <ContentBox className="contentBox">
                        <Box>
                            <Small>Google</Small>
                            <Heading>profit <span>+6.90%</span></Heading>
                        </Box>
                        <div className="content">
                          <Typography>Total Revenue/Quarter</Typography>
                          <h2>$15,215.70</h2>
                        </div>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={3} className="stat_cards">
                <StyledCard elevation={6} >
                    <ContentBox className="contentBox">
                        <Box>
                            <Small>Microsoft</Small>
                            <Heading>profit <span>+2.10%</span></Heading>
                        </Box>
                        <div className="content">
                          <Typography>Total Revenue/Quarter</Typography>
                          <h2>$9,215.70</h2>
                        </div>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={3} className="stat_cards">
                <StyledCard elevation={6} >
                    <ContentBox className="contentBox">
                        <Box>
                            <Small>Apple</Small>
                            <Heading>Loss <span>-2.10%</span></Heading>
                        </Box>
                        <div className="content">
                          <Typography>Total Revenue/Quarter</Typography>
                          <h2>$9,215.70</h2>
                        </div>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={3} className="stat_cards">
                <StyledCard elevation={6} >
                    <ContentBox className="contentBox">
                        <Box>
                            <Small>Samsung</Small>
                            <Heading>Loss <span>+8.20%</span></Heading>
                        </Box>
                        <div className="content">
                          <Typography>Total Revenue/Quarter</Typography>
                          <h2>$19,215.70</h2>
                        </div>
                    </ContentBox>
                </StyledCard>
            </Grid>
            {/*<Grid item xs={12} md={3}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">shopping_cart</Icon>
                        <Box ml="12px">
                            <Small>Orders to deliver</Small>
                            <Heading>305 Orders</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>*/}
        </Grid>
    )
}

export default StatCards
