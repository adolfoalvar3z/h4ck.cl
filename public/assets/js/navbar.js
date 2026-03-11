/**
 * Componente de Navegación Global para HACKER_LOG
 */

const navbarHTML = `
<nav class="navbar navbar-expand-lg py-3 px-lg-5">
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
            <img src="https://cdn-icons-png.flaticon.com/512/2833/2833333.png" alt="Logo" width="30" height="30" class="me-2 filter invert">
            <span class="fw-bold text-white mono">HACKER_LOG</span>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <i class="bi bi-list text-white fs-2"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="index.html" id="nav-home"><i class="bi bi-house-door me-1"></i> INICIO</a></li>
                <li class="nav-item"><a class="nav-link" href="index.html#posts-grid" id="nav-itels"><i class="bi bi-cpu me-1"></i> INTELIGENCIA</a></li>
                <li class="nav-item"><a class="nav-link" href="generator.html" id="nav-tools"><i class="bi bi-tools me-1"></i> HERRAMIENTAS</a></li>
                <li class="nav-item"><a class="nav-link" href="#" id="nav-about"><i class="bi bi-info-circle me-1"></i> ACERCA DE</a></li>
            </ul>
            <div class="d-flex align-items-center gap-3">
                <div class="position-relative d-none d-xl-block">
                    <i class="bi bi-search position-absolute top-50 start-3 translate-middle-y text-secondary"></i>
                    <input type="text" id="search-db-nav" class="form-control form-control-dark ps-5 py-2" placeholder="Buscar inteligencia...">
                </div>
                <button class="btn btn-red d-none d-sm-block">SUSCRIBIRSE</button>
                <a href="#" class="text-white fs-4"><i class="bi bi-person-circle"></i></a>
            </div>
        </div>
    </div>
</nav>
`;

function initializeNavbar() {
    const navbarContainer = document.getElementById('main-navbar');
    if (!navbarContainer) return;

    navbarContainer.innerHTML = navbarHTML;

    // Lógica para marcar enlace activo
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === 'index.html' || page === '') {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (page === 'generator.html') {
        document.getElementById('nav-tools')?.classList.add('active');
    } else if (page === 'post.html') {
        document.getElementById('nav-itels')?.classList.add('active');
    }

    // Sincronizar búsqueda si existe en la página
    const navSearch = document.getElementById('search-db-nav');
    const mainSearch = document.getElementById('search-db');
    
    if (navSearch && mainSearch) {
        navSearch.addEventListener('input', (e) => {
            mainSearch.value = e.target.value;
            mainSearch.dispatchEvent(new Event('input'));
        });
    }
}

// Iniciar inmediatamente e intentar de nuevo cuando el DOM cargue
initializeNavbar();
document.addEventListener('DOMContentLoaded', initializeNavbar);
