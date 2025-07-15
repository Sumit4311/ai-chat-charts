import clsx from 'clsx'
import { useEffect } from 'react'
import { styled, Box } from '@mui/system'
import { useLocation } from 'react-router-dom'
import { Icon, ButtonBase } from '@mui/material'
import React, { useState, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem } from '@mui/material'
import $ from "jquery";

const NavExpandRoot = styled('div')(({ theme }) => ({
    '& .expandIcon': {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(90deg)',
    },
    '& .collapseIcon': {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(0deg)',
    },
    '& .expansion-panel': {
        overflow: 'hidden',
        transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    },
    '& .highlight': {
        background: theme.palette.primary.main,
    },
    '&.compactNavItem': {
        width: 44,
        overflow: 'hidden',
        justifyContent: 'center !important',
        '& .itemText': {
            display: 'none',
        },
        '& .itemIcon': {
            display: 'none',
        },
    },
}))
/* $(".toplevelmenu >.expandIcon").on('click',function(){
    console.log("dd");
    $('.toplevelmenu.open >.expandIcon').trigger('click')
});  */
const BaseButton = styled(ButtonBase)(({ theme }) => ({
    height: 44,
    width: '100%',
    whiteSpace: 'pre',
    overflow: 'hidden',
    paddingRight: '16px',
    borderRadius: '4px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between !important',
    color: theme.palette.text.primary,
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
    },
    '& .icon': {
        width: 36,
        fontSize: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
        verticalAlign: 'middle',
    },
}))

const BulletIcon = styled('div')(({ theme }) => ({
    width: 4,
    height: 4,
    color: 'inherit',
    overflow: 'hidden',
    marginLeft: '20px',
    marginRight: '8px',
    borderRadius: '300px !important',
    // background: theme.palette.primary.contrastText,
    background: theme.palette.text.primary,
}))

const ItemText = styled('span')(() => ({
    fontSize: '0.875rem',
    paddingLeft: '0.8rem',
    verticalAlign: 'middle',
}))

const BadgeValue = styled('div')(() => ({
    padding: '1px 4px',
    overflow: 'hidden',
    borderRadius: '300px',
}))

const MatxVerticalNavExpansionPanel = ({ item, children, mode, getSubmenus, ...props }) => {
    console.log(item,"hyyhh")
    const [collapsed, setCollapsed] = useState(true)
    const elementRef = useRef(null)
    const componentHeight = useRef(0)
    const componentTop = useRef(0)
    const { pathname } = useLocation()
    const { toplevelmenu, secondlevelmenu, mainMenu, path, name, icon, iconText, badge } = item
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const submeuopen = Boolean(anchorEl)

    function handleClicksubmenu(event) {
        setAnchorEl(event.currentTarget)
    }
    function handleClosesubmenu() {
        setAnchorEl(null)
    }

    const handleClick = (e, path = '') => {
        if (item.isCompany) {
            getSubmenus(item)
        }
        const levelclass = e.target.className
        if (path && levelclass.indexOf('toplevelclick') != -1 && levelclass.indexOf('arrowexpandclick') != -1) {
            navigate(path);
        }
        else if (levelclass.indexOf('toplevelclick') != -1) {
            $('.toplevelmenu.open .expandIcon').trigger('click')
            $('.toplevelmenu.open ~.submenu .expandIcon').trigger('click')
        } else if (levelclass.indexOf('secondlevelclick') != -1) {
            $('.secondlevelmenu.open .expandIcon').trigger('click')
            $('.secondlevelmenu.open ~.submenu .expandIcon').trigger('click')
        }
        componentHeight.current = 0
        calcaulateHeight(elementRef.current)
        setCollapsed(!collapsed)

        componentTop.current = 0
        if (mainMenu) {
            var windowheight = $(window).height() - 200;
            const elem = document.getElementById(elementRef.current.id);
            const rect = elem.getBoundingClientRect();
            console.log(rect)
            console.log(windowheight)
            console.log("#" + elementRef.current.id)
            if (windowheight > rect.top) {
                componentTop.current = rect.top - 30;
            } else {
                componentTop.current = 0;
            }
        }
        // props.callAgain()
    }

    const calcaulateHeight = useCallback((node) => {
        if (node.name !== 'child') {
            for (let child of node.children) {
                calcaulateHeight(child)
            }
        }
        if (node.name === 'child') componentHeight.current += node.scrollHeight
        else componentHeight.current += 44 //here 44 is node height
        return
    }, [])

    useEffect(() => {
        if (!elementRef) return
        calcaulateHeight(elementRef.current)
        // OPEN DROPDOWN IF CHILD IS ACTIVE
        // console.log('href',elementRef.current.children)
        for (let child of elementRef.current.children) {
            //Changed for default active
            if ((pathname.indexOf('others') > -1 || pathname.indexOf('companylists') > -1)) {
                if (name.toLowerCase() == "company lists") {
                    setCollapsed(false)
                }
                // else if(pathname.indexOf('others') > -1 && name.toLowerCase()=="others"){
                //     setCollapsed(false)
                // }
                else if (secondlevelmenu && pathname.indexOf(item.companyid) > -1) {
                    setCollapsed(false)
                }
            }
            else {
                if (child.children[0].getAttribute('href') === '#' + pathname) {
                    setCollapsed(false)
                }
            }
            //End change
        }
    }, [pathname, calcaulateHeight])
    var extraclass = !collapsed ? "openinpoup" : "dynamicmenugetting"
    var preventscroll = !collapsed ? mainMenu ? $("body").addClass("preventscroll") : $("body").removeClass("preventscroll") : $("body").removeClass("preventscroll"); /* $(".navigation .expansion-panel.submenu.openinpoup .expansion-panel.submenu .expansion-panel.submenu").css("max-height","0"); $(".navigation .othersmenu > button").removeClass("open"); $(".navigation .othersmenu .sidenavHoverShow ").removeClass("expandIcon"); $(".navigation .othersmenu .sidenavHoverShow ").addClass("collapseIcon"); */
    //var toplevelmenu = toplevelmenu ? 'toplevelmenu' : ''
    return (
        <NavExpandRoot className={mainMenu ? 'othersmenu' : ''}>
            {path ?
                <BaseButton
                    className={clsx({
                        'has-submenu compactNavItem': true,
                        compactNavItem: mode === 'compact',
                        open: !collapsed,
                        toplevelmenu: toplevelmenu,
                        secondlevelmenu: secondlevelmenu,
                    })}
                >
                    <Box display="flex" alignItems="center" onClick={(e) => {
                        handleClick(e, path);
                        navigate(path)

                    }
                    } className="linkwithexpansion">
                        {icon && <Icon className="icon" >{icon}</Icon>}
                        {iconText && <React.Fragment onClick={() => console.log("imclicked")}><BulletIcon /></React.Fragment>}
                        <ItemText className="sidenavHoverShow" >{name}</ItemText>
                    </Box>
                    {badge && (
                        <BadgeValue className="sidenavHoverShow itemIcon">
                            {badge.value}
                        </BadgeValue>
                    )}
                    <div
                        className={clsx({
                            sidenavHoverShow: true,
                            collapseIcon: collapsed,
                            expandIcon: !collapsed,

                        })}
                        onClick={(e) => {
                            handleClick(e, path);
                        }}
                    >
                        <Icon fontSize="small" sx={{ verticalAlign: 'middle' }} className={toplevelmenu ? 'toplevelclick arrowexpandclick' : secondlevelmenu ? 'secondlevelclick' : ''} onClick={() => console.log("imclicked22")}>
                            chevron_right
                        </Icon>
                    </div>
                </BaseButton>
                :
                <BaseButton
                    className={clsx({
                        'has-submenu compactNavItem': true,
                        compactNavItem: mode === 'compact',
                        open: !collapsed,
                        toplevelclick: toplevelmenu,
                        toplevelmenu: toplevelmenu,
                        secondlevelmenu: secondlevelmenu,
                        secondlevelclick: secondlevelmenu,
                    })}
                    onClick={handleClick}
                >
                    <Box display="flex" alignItems="center">
                        {console.log(icon,"jhhjh")}
                        {icon && <Icon className="icon">{icon}</Icon>}
                        {iconText && <BulletIcon />}
                        <ItemText className={toplevelmenu ? 'toplevelclick sidenavHoverShow' : secondlevelmenu ? 'secondlevelclick sidenavHoverShow' : 'sidenavHoverShow'}>{name}</ItemText>
                    </Box>
                    {badge && (
                        <BadgeValue className="sidenavHoverShow itemIcon">
                            {badge.value}
                        </BadgeValue>
                    )}
                    <div
                        className={clsx({
                            sidenavHoverShow: true,
                            collapseIcon: collapsed,
                            expandIcon: !collapsed,
                            toplevelclick: toplevelmenu,
                            secondlevelclick: secondlevelmenu,
                        })}
                    >
                        <Icon fontSize="small" sx={{ verticalAlign: 'middle' }} className={toplevelmenu ? 'toplevelclick' : secondlevelmenu ? 'secondlevelclick' : ''}>
                            chevron_right
                        </Icon>
                    </div>
                </BaseButton>
            }
            <div
                id={mainMenu ? mainMenu + '_' + name : name}
                ref={elementRef}
                className={"expansion-panel submenu " + extraclass}
                style={
                    collapsed
                        ? { maxHeight: '0px' }
                        : componentTop.current == 0 ? { bottom: '20%' } : { top: componentTop.current + 'px' }
                }
            >
                {children}
            </div>
        </NavExpandRoot>

    )
}

export default MatxVerticalNavExpansionPanel
