import { navigateTo } from "../../Router";
import styles from "./navbar-layout.styles.css";



export function NavbarLayout(pageContent, logic){
    const root = document.getElementById('root');

const logout = `<button class="${styles.btn}" type="button" id="logout">Logout</button>`

    root.innerHTML = `
    <nav class=${styles.nav}>
        <img src="https://expertosenmarca.com/wp-content/uploads/2019/02/Logo_TV_2015.png" alt="logo">
        <a href="/tasks">Tasks</a>
        <a href="/user">User</a>
        ${logout}
    </nav>
    ${pageContent}
`;
    logic();

    const $logoutButton = root.querySelector('#logout');
    $logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        navigateTo('/login');
    });

}