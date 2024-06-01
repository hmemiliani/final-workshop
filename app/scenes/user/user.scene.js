import { navigateTo } from "../../Router";
import styles from "./user.style.css";

export function UserScene() {
    const pageContent = `
        <div class="${styles.userContainer}">
            <div class="${styles.header}">
                <h1>Profile</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user">
            </div>
            <div class="${styles.container}">
                <div class="${styles.userInfo}">
                    <h2 id="userName">nombreDeUsuario</h2>
                    <p>I'm web designer, I work in programs like figma, adobe photoshop, adobe illustrator</p>
                    <button class="${styles.changePasswordButton}" id="changePasswordButton">Change Password</button>
                </div>
            </div>
        </div>
    `;

    const logic = () => {
        const currentUserId = localStorage.getItem('userId');
        console.log(currentUserId);
        if (!currentUserId) {
            console.error("No user is currently logged in.");
            return;
        }

        const apiUrl = `http://localhost:3000/users/${currentUserId}`;

        const fetchUserName = async () => {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const user = await response.json();
                    document.getElementById("userName").textContent = user.name;
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserName();

        document.getElementById("changePasswordButton").addEventListener("click", () => {
            navigateTo('/change-password');
        });

    };

    return {
        pageContent,
        logic
    };
}
