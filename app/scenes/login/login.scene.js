import { navigateTo } from '../../Router';
import { decryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch.api';
import styles from './login.styles.css';

export function LoginScene() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="${styles.container}">
            <form id="login-form" class="${styles.loginform}">
                <h2>Login</h2>
                <input class="${styles.loginInput}" type="email" placeholder="nombre@email.com*" autocomplete="email"/>
                <input class="${styles.loginInput}" type="password" placeholder="Password*" autocomplete="current-password"/>
                <button type="submit">Login</button>
                <button id="register-button">Register</button>
            </form>
        </div>
    `;

    const $emailHtml = root.querySelector('input[type="email"]')
    const $passwordHtml = root.querySelector('input[type="password"]')

    const $myForm = root.getElementsByTagName('form')[0];
    $myForm.addEventListener('submit', async (event) =>{
        event.preventDefault();
        
        if(!$emailHtml.value || !$passwordHtml.value){
            alert("Por favor llene todos los campos requeridos")
        }

        // console.log($emailHtml.value, $passwordHtml.value); //funciona

        //fetch

        const users = await fetchApi('http://localhost:3000/users')
        const user = users.find(user => user.email === $emailHtml.value && decryptData(user.password) === $passwordHtml.value);

        if(user){
            const token = Math.random().toString(36).substring(2);
            const userId = user.id;
            console.log("user.id: ",userId);
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            navigateTo('/tasks');
        } else {
            alert("Usuuario o contasena invalidos")
        }
    });

    const registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', () => {
        navigateTo('/register');
    });
}