document.addEventListener("DOMContentLoaded", async function () {
    const body = document.querySelector("body");

    const registerForm = document.querySelector("#registerForm");
    const loginForm = document.querySelector("#loginForm");

    const nameInput = document.querySelector("#registerForm #name");
    const emailInput = document.querySelector("#registerForm #email");
    const passwordInput = document.querySelector("#registerForm #password");
    const confirmPasswordInput = document.querySelector("#registerForm #confirm-password");

    const loginEmailInput = document.querySelector("#loginForm #loginEmail");
    const loginPasswordInput = document.querySelector("#loginForm #loginPassword");

    const API_URL = "http://127.0.0.1:3000/auth";

    function validateInput(input, regex, errorMessage) {
        if (!input.value.trim()) {
            alert("Tous les champs doivent être remplis !");
            input.focus();
            return false;
        }

        if (!regex.test(input.value)) {
            alert(errorMessage);
            input.focus();
            return false;
        }
        return true;
    }

    registerForm?.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!nameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim() || !confirmPasswordInput.value.trim()) {
            alert("Tous les champs doivent être remplis !");
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        if (!validateInput(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Adresse e-mail invalide !")) return;
        if (!validateInput(passwordInput, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mot de passe non sécurisé !")) return;

        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error("Erreur lors de l'inscription.");

            const { token } = await response.json();
            localStorage.setItem("token", token);
            alert("Inscription réussie ! Redirection vers la connexion...");

            window.location.href = "login.html";
        } catch (error) {
            console.error("Erreur :", error);
            alert(error.message);
        }
    });

    loginForm?.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!loginEmailInput.value.trim() || !loginPasswordInput.value.trim()) {
            alert("Tous les champs doivent être remplis !");
            return;
        }

        const loginData = {
            email: loginEmailInput.value,
            password: loginPasswordInput.value,
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) throw new Error("Erreur lors de la connexion !");

            const { token } = await response.json();
            localStorage.setItem("token", token);
            alert("Connexion réussie !");

            window.location.href = "ajouter-livre.html";
        } catch (error) {
            console.error("Erreur :", error);
            alert(error.message);
        }
    });

    async function loadProfile() {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération du profil !");

            const userData = await response.json();
            displayUserData(userData);
        } catch (error) {
            console.error("Erreur :", error);
            alert("Impossible de récupérer les données utilisateur.");
        }
    }

    function displayUserData(user) {
        const profileContainer = document.querySelector("#profile");

        if (!profileContainer) return;

        profileContainer.innerHTML = `
            <div class="card">
                <img src="https://via.placeholder.com/150" alt="Photo de profil">
                <h2>${user.name}</h2>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-phone"></i> ${user.phone || "Non renseigné"}</p>
                <button id="logout">Se déconnecter</button>
            </div>
        `;

        document.querySelector("#logout").addEventListener("click", function () {
            localStorage.removeItem("token");
            alert("Déconnexion réussie !");
            window.location.href = "login.html";
        });
    }

    loadProfile();
});
