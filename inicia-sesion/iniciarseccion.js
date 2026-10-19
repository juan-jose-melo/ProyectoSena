document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("auth-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const formTitle = document.getElementById("form-title");
  const formSubtitle = document.getElementById("form-subtitle");
  const submitBtn = document.getElementById("submit-btn");
  const toggleText = document.getElementById("toggle-text");
  const welcomeBanner = document.getElementById("user-welcome");
  const savedUsernameSpan = document.getElementById("saved-username");
  const logoutBtn = document.getElementById("logout-btn");

  let isRegisterMode = false;

  // Verificar si hay una sesión activa
  const checkSavedUser = () => {
    const activeUser = localStorage.getItem("activeUser");

    if (activeUser) {
      savedUsernameSpan.textContent = activeUser;
      welcomeBanner.classList.remove("hidden");
      authForm.classList.add("hidden");
      toggleText.classList.add("hidden");
      formTitle.textContent = "Panel de Cuenta";
      formSubtitle.textContent = "Sesión activa";
    } else {
      welcomeBanner.classList.add("hidden");
      authForm.classList.remove("hidden");
      toggleText.classList.remove("hidden");
    }
  };

  // Guardar / Validar datos al enviar el formulario
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Obtener usuarios guardados o inicializar objeto
    const registeredUserJSON = localStorage.getItem("registeredUser");
    let userData = registeredUserJSON ? JSON.parse(registeredUserJSON) : null;

    if (isRegisterMode) {
      // Registrar nuevo usuario
      userData = { name: username, password: password };
      localStorage.setItem("registeredUser", JSON.stringify(userData));
      localStorage.setItem("activeUser", username);
      
      alert("¡Cuenta registrada e inicio de sesión exitoso!");
      window.location.href = "index.html"; // Redirigir a inicio
    } else {
      // Validar datos en inicio de sesión
      if (userData && (userData.name === username || userData.email === username) && userData.password === password) {
        localStorage.setItem("activeUser", userData.name);
        alert(`¡Bienvenido de nuevo, ${userData.name}!`);
        window.location.href = "index.html"; // Redirigir a inicio
      } else {
        alert("Credenciales incorrectas o usuario no registrado.");
        return;
      }
    }

    usernameInput.value = "";
    passwordInput.value = "";
  });

  // Botón para cerrar sesión
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("activeUser");
    formTitle.textContent = "Bienvenido";
    formSubtitle.textContent = "Ingresa tus credenciales para continuar";
    checkSavedUser();
  });

  checkSavedUser();
});