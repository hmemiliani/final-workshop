import { navigateTo } from '../../Router';
import { encryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch.api';
import styles from './register.styles.css';

export function RegisterScene() {
    const root = document.getElementById('root');
    root.innerHTML= `
        <div class="${styles.container}">
            <form class="${styles.form}">
                <h2>Register</h2>
                <input type="text" placeholder="Nombre" autocomplete="namea"/>
                <input type="email" placeholder="nombre@email.com" autocomplete="email"/>
                <input type="password" placeholder="Contraseña" autocomplete="new-password"/>
                <button type="submit">Register</button>
                <button id="login-button">Login</button>
            </form>
        </div>
    `;

    //logic

    const $nameHtml = root.querySelector('input[type="text"]');
    const $emailHtml = root.querySelector('input[type="email"]');
    const $passwordHtml = root.querySelector('input[type="password"]');

    const $myForm = root.getElementsByTagName('form')[0];

    $myForm.addEventListener('submit', async (event) =>{
        event.preventDefault();

        if(!$nameHtml.value || !$emailHtml.value || !$passwordHtml.value){
            alert('Please fill all fields');
            return;
        }

        //fetch
        const userCreated = await fetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: $nameHtml.value,
                email: $emailHtml.value,
                password: encryptData($passwordHtml.value)
            })
        })
        
        if (userCreated) {
            alert('User created successfully');
            navigateTo('/login')
        }
    });
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {
        navigateTo('/login');
    });
}