import { routes } from "./routes";
import {NavbarLayout} from './components/navbar-layout';

export function Router(){
    const path = window.location.pathname;


    if(path === '/login' || path === '/') {
        if(localStorage.getItem('token')){
            navigateTo('/tasks')
            return;
        }
    }
    if(path === '/') {
        if(!localStorage.getItem('token')){
            navigateTo('/login')
            return;
        }
    }


    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);

    if(publicRoute){
        publicRoute.scene();
        return;
    } 
    if(privateRoute){
        if(localStorage.getItem('token')){
            const {pageContent, logic} = privateRoute.scene();
            NavbarLayout(pageContent, logic);
            return;
        }
        navigateTo('/login');
        return;
    }

    navigateTo('/not-found');
}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router();
}