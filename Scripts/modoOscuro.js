const toggleDarkModeButton = document.getElementById("toggle-dark-mode")
const iconElement = toggleDarkModeButton.querySelector("i")
const textElement = toggleDarkModeButton

const isDarkMode = localStorage.getItem("dark-mode")

if (isDarkMode === "enabled") {
    document.body.classList.add("dark-mode")
    iconElement.classList.remove("bi-moon")
    iconElement.classList.add("bi-sun")  
    textElement.innerHTML = '<i class="bi bi-sun"></i> Modo Claro' 
}

const enableDarkMode = () => {
    document.body.classList.add("dark-mode")
    iconElement.classList.remove("bi-moon")
    iconElement.classList.add("bi-sun")  
    textElement.innerHTML = '<i class="bi bi-sun"></i> Modo Claro'  
    localStorage.setItem("dark-mode", "enabled")
}

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode")
    iconElement.classList.remove("bi-sun")
    iconElement.classList.add("bi-moon") 
    textElement.innerHTML = '<i class="bi bi-moon"></i> Modo Oscuro' 
    localStorage.setItem("dark-mode", "disabled")
}

toggleDarkModeButton.addEventListener("click", () => {
    const isDarkMode = localStorage.getItem("dark-mode")
    if (isDarkMode !== "enabled") {
        enableDarkMode() 
    } else {
        disableDarkMode() 
    }
})
