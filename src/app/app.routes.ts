import { Routes } from '@angular/router';
import { Secure } from './layouts/secure/secure';
import { Public } from './layouts/public/public';
import { checkLoggedInGuard } from './core/auth/check-logged-in-guard';
import { authGuardGuard } from './core/auth/auth-guard-guard';

export const routes: Routes = [
    {
        path: '',
        component: Public,
        canActivate: [checkLoggedInGuard],
        children: [
            {
                path:'',
                redirectTo: 'login',
                pathMatch: 'full',
                data: { hideLayout: true }
            },
            {
                path: 'login',
                loadComponent: () => import('./features/login/login').then(m => m.Login),
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./features/forgot-password/forgot-password').then(m => m.ForgotPassword),
            },
            {
                path: 'public-home',
                loadComponent: () => import('./features/public-home/public-home').then(m => m.PublicHome),
            },
            {
                path: 'public-header',
                loadComponent: () => import('./features/public-header/public-header').then(m => m.PublicHeader),
            },
            {
                path: 'public-footer',
                loadComponent: () => import('./features/public-footer/public-footer').then(m => m.PublicFooter),
            },
        ]
    },
    
    {
        path: '',
        component: Secure,
        canActivate: [authGuardGuard],
        children: [
             {
                path:'',
                redirectTo: 'dashbaord',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashbaord/dashbaord').then(m => m.Dashbaord),
            },

            {
                path: 'home',
                loadComponent: () => import('./pages/home/home').then(m => m.Home),
            },

            {
                path: 'report',
                loadComponent: () => import('./pages/report/report').then(m => m.Report),
            },
        ],
    },

    {
        path:'**',
        redirectTo: '',
    },

];
