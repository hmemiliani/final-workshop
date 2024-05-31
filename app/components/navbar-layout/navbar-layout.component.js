import { navigateTo } from "../../Router";

export function NavbarLayout(pageContent, logic){
    const root = document.getElementById('root');

const logout = `<button type="button" id="logout">Logout</button>`

    root.innerHTML = `
    <nav>
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