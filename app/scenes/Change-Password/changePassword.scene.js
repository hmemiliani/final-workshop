import styles from "./changePassword.style.css";

export function ChangePasswordScene() {
    const pageContent = `
        <div class="${styles.changePasswordContainer}">
            <div class="${styles.header}">
                <h1>Change Password</h1>
            </div>
            <div class="${styles.container}">
                <form id="changePasswordForm" class="${styles.form}">
                    <div class="${styles.formGroup}">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" disabled>
                    </div>
                    <div class="${styles.formGroup}">
                        <label for="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" name="currentPassword" required>
                    </div>
                    <div class="${styles.formGroup}">
                        <label for="newPassword">New Password</label>
                        <input type="password" id="newPassword" name="newPassword" required>
                    </div>
                    <button type="submit" class="${styles.submitButton}">Change Password</button>
                </form>
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

        const fetchUserEmail = async () => {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const user = await response.json();
                    document.getElementById("email").value = user.email;
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserEmail();

        const changePasswordForm = document.getElementById("changePasswordForm");
        changePasswordForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;

            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const user = await response.json();
                    if (user.password === currentPassword) {
                        const updateResponse = await fetch(apiUrl, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ password: newPassword })
                        });
                        if (updateResponse.ok) {
                            alert("Password changed successfully");
                        } else {
                            alert("Failed to change password");
                        }
                    } else {
                        alert("Current password is incorrect");
                    }
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        });
    };

    return {
        pageContent,
        logic
    };
}
