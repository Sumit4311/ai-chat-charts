import Footer from '../../Footer/Footer'
import Layout1Topbar from './Layout1Topbar'
import { MatxSuspense } from 'app/components'
import Layout1Sidenav from './Layout1Sidenav'
import Scrollbar from 'react-perfect-scrollbar'
import useSettings from 'app/hooks/useSettings'
import { styled, Box, useTheme } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme'
import SecondarySidebar from '../../SecondarySidebar/SecondarySidebar'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'
import { Outlet } from 'react-router-dom'

const Layout1Root = styled(Box)(({ theme }) => ({
    display: 'flex',
    background: theme.palette.background.default,
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
}))

const StyledScrollBar = styled(Scrollbar)(() => ({
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
}))

const LayoutContainer = styled(Box)(({ width, secondarySidebar }) => ({
    height: '100vh',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    verticalAlign: 'top',
    marginLeft: width,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    marginRight: secondarySidebar.open ? 50 : 0,
}))
const Layout1 = () => {
    const { settings, updateSettings } = useSettings()
    const [currency, setCurrency] = useState('R')
    const { layout1Settings, secondarySidebar } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings
    console.log('currencycurrency',currency);
    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return sideNavWidth
            case 'compact':
                return sidenavCompactWidth
            default:
                return '0px'
        }
    }
    const sidenavWidth = getSidenavWidth()
    const theme = useTheme()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const ref = useRef({ isMdScreen, settings })
    const layoutClasses = `theme-${theme.palette.type}`
    useEffect(() => {
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode
            updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        }
    }, [isMdScreen])
    useEffect(()=>{
        // var currencyval=localStorage.getItem('currencyValue') ?
         localStorage.getItem('currencyValue') 
        //  : 'R'
        // setCurrency(currencyval)
    },[])
    return (
        <Layout1Root className={layoutClasses}>
            {showSidenav && sidenavMode !== 'close' && (
                <SidenavTheme>
                    <Layout1Sidenav />
                </SidenavTheme>
            )}

            <LayoutContainer
                width={sidenavWidth}
                secondarySidebar={secondarySidebar}
            >
                {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                    // <Layout1Topbar fixed={true} />
                    <ThemeProvider theme={topbarTheme}>
                        <Layout1Topbar fixed={true} className="elevation-z8" setCurrency={(e) => setCurrency(e)} currency={currency}/>
                    </ThemeProvider>
                )}
                {settings.perfectScrollbar && (
                    <StyledScrollBar>
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                // <Layout1Topbar />
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar setCurrency={(e) => setCurrency(e)} currency={currency}/>
                                </ThemeProvider>
                            )}
                        <Box flexGrow={1} position="relative">
                            <MatxSuspense>
                                {/* {renderRoutes(routes)} */}
                                <Outlet context={[currency]} />
                            </MatxSuspense>
                        </Box>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </StyledScrollBar>
                )}

                {!settings.perfectScrollbar && (
                    <ContentBox>
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                // <Layout1Topbar />
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar setCurrency={(e) => setCurrency(e)} currency={currency}/>
                                </ThemeProvider>
                            )}
                        <Box flexGrow={1} position="relative">
                            <MatxSuspense>
                                {/* {renderRoutes(routes)} */}
                                <Outlet context={[currency]} />
                            </MatxSuspense>
                        </Box>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </ContentBox>
                )}
                {settings.footer.show && settings.footer.fixed && <Footer />}
            </LayoutContainer>
            {settings.secondarySidebar.show && <SecondarySidebar />}
        </Layout1Root>
    )
}
export default React.memo(Layout1)
