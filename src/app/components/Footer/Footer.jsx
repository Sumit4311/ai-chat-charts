import React from 'react'
import { Span, Paragraph } from '../Typography'
import useSettings from 'app/hooks/useSettings'
import { Button, Toolbar, AppBar, ThemeProvider } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { topBarHeight } from 'app/utils/constant'
import { useLocation } from 'react-router-dom';




const AppFooter = styled(Toolbar)(() => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: topBarHeight,
    '@media (max-width: 499px)': {
        display: 'table',
        width: '100%',
        minHeight: 'auto',
        padding: '1rem 0',
        '& .container': {
            flexDirection: 'column !important',
            '& a': {
                margin: '0 0 16px !important',
            },
        },
    },
}))

const FooterContent = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 1rem',
    maxWidth: '1170px',
    margin: '0 auto',
}))

const Footer = () => {
    const theme = useTheme()
    const { settings } = useSettings()

    const footerTheme = settings.themes[settings.footer.theme] || theme
    const location = useLocation();
    const isChatbotPage = location.pathname.includes('/fingenie-chatbot');

  if (isChatbotPage) return null;

return (
    <ThemeProvider theme={footerTheme}>
        <AppBar
            color="primary"
            position="static"
            sx={{ zIndex: 96 }}
        >
            <AppFooter>
                <FooterContent>
                    <a href="#">
                        @2022 Solcon Capital. All Rights Reserved
                    </a>
                    <Span sx={{ m: "auto" }}></Span>
                </FooterContent>
            </AppFooter>
        </AppBar>
    </ThemeProvider>
);
}

export default Footer
