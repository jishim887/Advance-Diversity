import { lazy } from 'react';
const AnalyticsDashboards = lazy(() => import('../pages/dashboard/analytics/AnalyticsDashboardPage'));
const MenteeDashboard = lazy(() => import('../pages/dashboard/mentees/MenteeDashboard'));
const EventWizard = lazy(() => import('../components/events/EventWizard'));
const EventsDisplay = lazy(() => import('../components/events/EventsDisplay'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const Resources = lazy(() => import(`../components/resources/Resources`));
const ResourcesForm = lazy(() => import(`../components/resources/ResourcesForm`));
const UserProfiles = lazy(() => import('../components/userProfiles/UserProfiles'));
const UserProfileEdit = lazy(() => import('../components/userProfiles/UserProfileEdit'));
const UploadFileComponent = lazy(() => import('../components/files/FileUploadExample'));
const Surveys = lazy(() => import('../components/surveys/Surveys'));
const SurveyWizard = lazy(() => import('../components/surveys/SurveyWizard'));
const AdminRoutes = lazy(() => import('../components/users/Admin'));
const Mentee = lazy(() => import('../components/users/Mentees'));
const Mentor = lazy(() => import('../pages/dashboard/mentors/MentorDashboard'));
const BlogsAdmin = lazy(() => import('../components/blogsAdmin/BlogsAdmin'));
const Venues = lazy(() => import('../components/venues/VenuesForm'));
const FaqAdmin = lazy(() => import('../pages/landing/FaqAdmin'));
const SurveyForm = lazy(() => import('../components/surveyInstances/SurveyForm'));
const Subscription = lazy(() => import('../components/subscriptions/Subscriptions'));
const Success = lazy(() => import('../components/subscriptions/Success'));
const Cancel = lazy(() => import('../components/subscriptions/Cancel'));
const NewsletterTemplates = lazy(() => import('../components/newsletterTemplates/NewsletterTemplates'));
const MentorWizard = lazy(() => import('../components/mentorprofiles/MentorWizard'));
const TemplatesForm = lazy(() => import('../components/newsletterTemplates/TemplatesForm'));
const JobsForm = lazy(() => import('../components/jobsadmin/JobsForm'));
const Newsletters =  lazy(() => import('../components/newsletters/Newsletters'));
const Daily = lazy(() => import('../components/daily/Daily'))

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard/profiles',
                name: 'Profile',
                element: UserProfiles,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard/profiles/edit',
                name: 'ProfileEdit',
                element: UserProfileEdit,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard/events',
                name: 'Event Form',
                element: EventWizard,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard/events-display',
                name: 'Event Form',
                element: EventsDisplay,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];
const surveys = [
    {
        path: '/surveys',
        name: 'Surveys',
        element: Surveys,
        roles: ['Admin', 'Mentee', 'Mentor'],
        isAnonymous: false,
        children: [
            {
                path: '/surveys/new',
                name: 'Survey Creator',
                element: SurveyWizard,
                roles: ['Admin', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/surveys/forms/:surveyId',
                name: 'Survey Form',
                element: SurveyForm,
                roles: ['Admin', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];
const blogsAdminRoutes = [
    {
        path: '/blogsadmin',
        name: 'BlogsAdmin',
        element: BlogsAdmin,
        roles: ['Admin', 'Mentor'],
        exact: true,
        isAnonymous: false,
    },
];
const subscriptionRoutes = [
    {
        path: '/subscription',
        name: 'Subscriptions',
        element: Subscription,
        roles: ['Admin', 'Mentee', 'Mentor'],
        isAnonymous: false,
        children: [
            {
                path: '/success',
                name: 'Subscribe Success',
                element: Success,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/cancel',
                name: 'Canceled Subscription',
                element: Cancel,
                roles: ['Admin', 'Mentee', 'Mentor'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const uploadFileRoutes = [
    {
        path: '/files',
        name: 'Files',
        children: [
            {
                path: '/files/upload',
                name: 'Files upload',
                exact: true,
                element: UploadFileComponent,
                roles: ['Admin', 'Mentee', 'Mentor'],
                isAnonymous: false,
            },
        ],
    },
];
const adminRoutes = [
    {
        path: '/admin',
        name: 'Admin',
        element: AdminRoutes,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const menteeRoutes = [
    {
        path: '/mentee',
        name: 'Mentee',
        element: Mentee,
        roles: ['Admin', 'Mentee'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/dashboard/mentee',
        name: 'Mentee Dashboard Secured Route',
        exact: true,
        element: MenteeDashboard,
        roles: ['Admin', 'Mentee'],
        isAnonymous: false,
    },
];

const mentorRoutes = [
    {
        path: '/mentor',
        name: 'Mentor',
        element: Mentor,
        roles: ['Admin', 'Mentor'],
        exact: true,
        isAnonymous: false,
    },
];

const mentors = [
    {
        path: '/mentors/profile/new',
        name: 'MentorsForm',
        element: MentorWizard,
        roles: ['Admin', 'Mentor'],
        isAnonymous: false,
    },
    {
        path: '/mentors/profile/edit',
        name: 'MentorsForm',
        element: MentorWizard,
        roles: ['Admin', 'Mentor'],
        isAnonymous: false,
    },
];

const test = [
    {
        path: '/test',
        name: 'Test',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured1',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Admin'],
        isAnonymous: false,
    },
];
const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const faqAdminRoutes = [
    {
        path: '/faqadmin',
        name: 'FaqAdmin',
        element: FaqAdmin,
        roles: ['Admin', 'Mentor'],
        exact: true,
        isAnonymous: false,
    },
];
const resources = [
    {
        path: '/resources/admin',
        name: 'Resources',
        element: Resources,
        roles: ['Admin', 'Mentor'],
        isAnonymous: false,
    },
    {
        path: '/resources/new',
        name: 'Resources Form',
        element: ResourcesForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/resources/:id',
        name: 'Update Resources',
        element: ResourcesForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const newslettersRoutes = [
    {
        path: '/newsletters',
        name: 'Newsletters',
        element: Newsletters,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const venuesRoutes = [
    {
        path: '/venuesform',
        name: 'Venues',
        exact: true,
        element: Venues,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const newsletterTemplates = [
    {
        path: '/newslettertemplates',
        name: 'Newsletter Templates',
        exact: true,
        element: NewsletterTemplates,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/newslettertemplates/new',
        name: 'Newsletter Templates Form',
        element: TemplatesForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/newslettertemplates/:id',
        name: 'Update Template',
        element: TemplatesForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];
const jobsRoutes = [
    {
        path: '/jobs',
        name: 'Jobs',
        children: [
            {
                path: '/jobs/new',
                name: 'Jobs Admin',
                element: JobsForm,
                roles: [`Admin`],
                isAnonymous: false,
            },
        ],
    },
];

const dailyRoutes = [
    {
        path: '/daily',
        name: 'contact a mentor',
        exact: true,
        element: Daily,
        roles: ['Admin', 'Mentee', 'Mentor'],
        isAnonymous: false,
    },
];

const allRoutes = [
    ...dashboardRoutes,
    ...test,
    ...errorRoutes,
    ...resources,
    ...surveys,
    ...uploadFileRoutes,
    ...menteeRoutes,
    ...adminRoutes,
    ...faqAdminRoutes,
    ...mentorRoutes,
    ...mentors,
    ...blogsAdminRoutes,
    ...venuesRoutes,
    ...subscriptionRoutes,
    ...newsletterTemplates,
    ...jobsRoutes,
    ...newslettersRoutes, 
    ...dailyRoutes
];
export default allRoutes;
