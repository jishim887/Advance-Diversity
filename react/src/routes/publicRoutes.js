import { lazy } from 'react';

const Landing = lazy(() => import('../pages/landing/'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const ServerError = lazy(() => import('../pages/error/ServerError'));
const Venues = lazy(() => import('../pages/venues/Venues'));
const FAQ = lazy(() => import('../pages/landing/FAQ'));
const BlogPage = lazy(() => import('../pages/blogs/BlogPage'));
const Blogs = lazy(() => import('../pages/blogs/Blogs'));
const Jobs = lazy(() => import('../pages/jobs/Jobs'));
const Layouts = lazy(() => import('../pages/landing/Layouts'));
const LoginAccount = lazy(() => import('../components/users/Login'));
const ForgotPassword = lazy(() => import('../components/users/ForgotPassword'));
const Comments = lazy(() => import('../components/comments/Comments'));
const Events = lazy(() => import('../components/events/Events'));
const EventPage = lazy(() => import('../components/events/EventPage'));
const Resources = lazy(() => import('../components/resources/ResourcesPublic'));
const Register = lazy(() => import('../components/users/Register'));
const Donations = lazy(() => import('../components/donations/Donation'));
const ContactUs = lazy(() => import('../pages/landing/ContactUs'));
const DonationConfirm = lazy(() => import('../components/donations/DonationConfirm'));
const Mentors = lazy(() => import('../components/mentors/Mentors'));
const Cookies = lazy(() => import('../pages/cookies/OurCookies'));
const Privacy = lazy(() => import('../pages/privacy/PrivacyPolicy'));
const AboutUs = lazy(() => import('../pages/aboutus/AboutUs'));
const NewsletterSubscriptions = lazy(() => import('../pages/landing/NewsletterSubscriptions'));
const ChangePassword = lazy(() => import('../components/users/ChangePassword'));

const forgotPasswordRoutes = [
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        element: ForgotPassword,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];

const changePasswordRoutes = [
    {
        path: '/changepassword',
        name: 'ChangePassword',
        element: ChangePassword,
        roles: ['Admin', 'Mentor', 'Mentee'],
        exact: true,
        isAnonymous: true,
    },
];

const routes = [
    {
        path: '/',
        name: 'Landing',
        exact: true,
        element: Landing,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/venues',
        name: 'Venues',
        exact: true,
        element: Venues,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/faq',
        name: 'FAQ',
        exact: true,
        element: FAQ,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/donate',
        name: 'Donation',
        exact: true,
        element: Donations,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/contactus',
        name: 'contactus',
        exact: true,
        element: ContactUs,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/mentors',
        name: 'Mentors',
        exact: true,
        element: Mentors,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/cookies',
        name: 'cookies',
        exact: true,
        element: Cookies,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/privacy',
        name: 'privacy',
        exact: true,
        element: Privacy,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/newslettersubscriptions',
        name: 'newslettersubscriptions',
        exact: true,
        element: NewsletterSubscriptions,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/aboutus',
        name: 'aboutus',
        exact: true,
        element: AboutUs,
        roles: [],
        isAnonymous: true,
    },
];

const jobRoutes = [
    {
        path: '/jobs',
        name: 'Jobs',
        exact: true,
        element: Jobs,
        roles: [],
        isAnonymous: true,
    },
];

const eventRoutes = [
    {
        path: 'events',
        name: 'Layouts',
        exact: true,
        element: Layouts,
        roles: [],
        isAnonymous: true,
    },
];

const events = [
    {
        path: '/events',
        name: 'Events',
        exact: true,
        element: Events,
        roles: [],
        isAnonymous: true,
        children: [
            {
                path: '/events/:eventid',
                name: 'viewEvent',
                exact: true,
                element: EventPage,
                roles: [],
                isAnonymous: true,
            },
        ],
    },
];

const errorRoutes = [
    {
        path: '/error-500',
        name: 'Error - 500',
        element: ServerError,
        roles: [],
        exact: true,
        isAnonymous: true,
    },

    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];

const blogRoutes = [
    {
        path: '/blogs',
        name: 'blogs',
        exact: true,
        element: Blogs,
        roles: [],
        isAnonymous: true,
        children: [
            {
                path: '/blogs/blogPage/:blogid',
                name: 'viewBlog',
                exact: true,
                element: BlogPage,
                roles: [],
                isAnonymous: true,
            },
        ],
    },
];


const donationRoutes = [
    {
        path: '/donate',
        name: 'Donation',
        header: 'Navigation',
        exact: true,
        element: Donations,
        roles: [],
        isAnonymous: true,
        children: [
            {
                path: '/donate/confirmation',
                name: 'DonationConfirm',
                element: DonationConfirm,
                roles: [],
                isAnonymous: true,
            },
        ],
    },
];

const resourceRoute = [
    {
        path: '/resources',
        name: 'resourcesPublic',
        exact: true,
        element: Resources,
        roles: [],
        isAnonymous: true,
    },
];

const loginRoutes = [
    {
        path: '/login',
        name: 'Login',
        element: LoginAccount,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];

const registerRoutes = [
    {
        path: '/register',
        name: 'Register',
        element: Register,
        roles: [],
        exact: true,
        isAnonymous: true,
    },
];

const commentRoutes = [
    {
        path: '/comments',
        name: 'Comments',
        exact: true,
        element: Comments,
        roles: [],
        isAnonymous: true,
    },
];
var allRoutes = [
    ...routes,
    ...errorRoutes,
    ...blogRoutes,
    ...loginRoutes,
    ...registerRoutes,
    ...donationRoutes,
    ...resourceRoute,
    ...events,
    ...commentRoutes,
    
    ...eventRoutes,
    ...jobRoutes,
    ...forgotPasswordRoutes,
    ...changePasswordRoutes,
];

export default allRoutes;
