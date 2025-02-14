document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const body = document.body;
    const newArticleToggle = document.getElementById("newArticleToggle");
    const newArticleDropdown = document.getElementById("newArticleDropdown");

    // Open or Close Sidebar (same button)
    sidebarToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            // Close Sidebar
            sidebar.classList.remove("open");
            body.classList.remove("sidebar-open");
        } else {
            // Open Sidebar
            sidebar.classList.add("open");
            body.classList.add("sidebar-open");
        }
    });

    
});