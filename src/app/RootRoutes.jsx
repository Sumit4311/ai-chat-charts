import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import investmentpipelineRoutes from './views/investmentpipeline/InvestmentpipelineRoutes'
import usermanagementRoutes from './views/usermanagement/UsermanagementRoutes'
import documentsRoutes from './views/documents/DocumentsRoutes'
import companylistsRoutes from './views/companylists/CompanylistsRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...investmentpipelineRoutes,
    ...usermanagementRoutes,
    ...documentsRoutes,
    ...companylistsRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
