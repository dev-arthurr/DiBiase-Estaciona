document.addEventListener("DOMContentLoaded", () => {
    const nome = localStorage.getItem("nome") || "Usuário"
    const role = localStorage.getItem("role") || "Colaborador"

    document.getElementById("userName").textContent = nome
    document.getElementById("UserRole").textContent =
        role === "admin" ? "Administrador" : "Colaborador"

    if (role !== "admin") {
        const menuUsuarios = document.getElementById("menu-usuarios")
        if (menuUsuarios) menuUsuarios.style.display = "none"
    }

    const menuIcon = document.getElementById("menu-icon")
    const sidebar = document.getElementById("sidebar")
    if (menuIcon && sidebar) {
        menuIcon.addEventListener("click", () => {
            sidebar.classList.toggle("active")
        })
    }

    const footer = document.getElementById("side-footer")
    const menu = document.getElementById("side-footer-menu")
    if (footer && menu) {
        footer.addEventListener("click", () => {
            menu.classList.toggle("active")
        })

        document.addEventListener("click", (e) => {
            if (!footer.contains(e.target)) {
                menu.classList.remove("active")
            }
        })
    }

    const logoutBtn = document.getElementById("side-footer-menu")
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault()
            localStorage.clear()
            window.location.replace("../pages/login.html")
        })
    }
})