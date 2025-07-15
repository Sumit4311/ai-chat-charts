import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Lead = Loadable(lazy(() => import("./Lead")));
const Leadadd = Loadable(lazy(() => import("./Leadadd")));
const Leadview = Loadable(lazy(() => import("./Leadview")));
const PipelineManagement = Loadable(lazy(() => import("./PipelineManagement")));
const PipelineManagementview = Loadable(lazy(() => import("./PipelineManagementview")));
const PipelineManagementadd = Loadable(lazy(() => import("./PipelineManagementadd")));
const PipelineManagementprogress = Loadable(lazy(() => import("./PipelineManagementprogress")));
const investmentpipelineRoutes = [
    {
        path: '/investmentpipeline/lead',
        element: <Lead />,
    },
    {
        path: '/investmentpipeline/lead/add',
        element: <Leadadd />,
    },
    {
        path: '/investmentpipeline/lead/edit/:id',
        element: <Leadadd />,
    },
    {
        path: '/investmentpipeline/lead/view/:id',
        element: <Leadview />,
    },
    {
        path: '/investmentpipeline/pipelinemanagement',
        element: <PipelineManagement />,
    },
    {
        path: '/investmentpipeline/pipelinemanagement/view/:id',
        element: <PipelineManagementview />,
    },
    {
        path: '/investmentpipeline/pipelinemanagement/add',
        element: <PipelineManagementadd />,
    },
    {
        path: '/investmentpipeline/pipelinemanagement/edit/:id',
        element: <PipelineManagementadd />,
    },
    {
        path: '/investmentpipeline/pipelinemanagementprogress',
        element: <PipelineManagementprogress />,
    },
]

export default investmentpipelineRoutes
