document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("reg-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  
  const activeSessionBanner = document.getElementById("active-session-banner");
  const activeUserName = document.getElementById("active-user-name");
  const logoutBtn = document.getElementById("logout-btn");

  // Revisar si ya hay una cuenta o sesión guardada
  const checkSession = () => {
    const activeUser = localStorage.getItem("activeUser");

    if (activeUser) {
      activeUserName.textContent = activeUser;
      activeSessionBanner.classList.remove("hidden");
      registerForm.classList.add("hidden");
    } else {
      activeSessionBanner.classList.add("hidden");
      registerForm.classList.remove("hidden");
    }
  };

  // Procesar el registro
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validación de contraseñas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    // Guardar datos en el navegador (localStorage)
    const userData = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    localStorage.setItem("activeUser", name);

    alert("¡Registro exitoso! Tus datos han sido guardados.");
    checkSession();
  });

  // Botón para cerrar sesión y permitir registrar a otra persona
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("activeUser");
    registerForm.reset();
    checkSession();
  });

  // Verificar estado al cargar la página
  checkSession();
});