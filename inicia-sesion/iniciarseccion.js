document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("auth-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const formTitle = document.getElementById("form-title");
  const formSubtitle = document.getElementById("form-subtitle");
  const submitBtn = document.getElementById("submit-btn");
  const toggleLink = document.getElementById("toggle-link");
  const toggleText = document.getElementById("toggle-text");
  const welcomeBanner = document.getElementById("user-welcome");
  const savedUsernameSpan = document.getElementById("saved-username");
  const logoutBtn = document.getElementById("logout-btn");

  let isRegisterMode = false;

  // Verificar si hay una sesión o usuario guardado previamente
  const checkSavedUser = () => {
    const activeUser = localStorage.getItem("activeUser");

    if (activeUser) {
      // Si ya hay alguien registrado e inició sesión
      savedUsernameSpan.textContent = activeUser;
      welcomeBanner.classList.remove("hidden");
      authForm.classList.add("hidden");
      toggleText.classList.add("hidden");
      formTitle.textContent = "Panel de Control";
      formSubtitle.textContent = "Sesión activa detectada";
    } else {
      // Modo normal
      welcomeBanner.classList.add("hidden");
      authForm.classList.remove("hidden");
      toggleText.classList.remove("hidden");
    }
  };

  // Alternar entre Inicio de Sesión y Registro
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;

    if (isRegisterMode) {
      formTitle.textContent = "Crear Cuenta";
      formSubtitle.textContent = "Registra tus datos para empezar";
      submitBtn.textContent = "Registrarse";
      toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link">Inicia sesión aquí</a>';
    } else {
      formTitle.textContent = "Bienvenido";
      formSubtitle.textContent = "Ingresa tus credenciales para continuar";
      submitBtn.textContent = "Iniciar Sesión";
      toggleText.innerHTML = '¿No tienes una cuenta? <a href="#" id="toggle-link">Regístrate aquí</a>';
    }

    // Reasignar el evento al nuevo enlace creado dinámicamente
    document.getElementById("toggle-link").addEventListener("click", arguments.callee);
  });

  // Guardar / Validar datos al enviar el formulario
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (isRegisterMode) {
      // Guardar credenciales en el navegador
      localStorage.setItem("registeredUser", username);
      localStorage.setItem("registeredPassword", password);
      localStorage.setItem("activeUser", username);
      alert("¡Cuenta registrada con éxito!");
    } else {
      // Validar si existe el usuario guardado
      const savedUser = localStorage.getItem("registeredUser");
      const savedPass = localStorage.getItem("registeredPassword");

      if (username === savedUser && password === savedPass) {
        localStorage.setItem("activeUser", username);
      } else {
        alert("Credenciales incorrectas o usuario no registrado.");
        return;
      }
    }

    // Limpiar campos y actualizar interfaz
    usernameInput.value = "";
    passwordInput.value = "";
    checkSavedUser();
  });

  // Botón para cerrar sesión o permitir que otra persona se registre
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("activeUser");
    formTitle.textContent = "Bienvenido";
    formSubtitle.textContent = "Ingresa tus credenciales para continuar";
    checkSavedUser();
  });

  // Inicializar estado
  checkSavedUser();
});