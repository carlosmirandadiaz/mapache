// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // Toggle del menú accesible
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // Embed dinámico de Twitch
  // =========================
  (function loadTwitchEmbed() {
    const channelName = "radiomapache";
    const container = document.getElementById("twitch-embed-container");

    if (!container) return;

    // Detectar parent dinámicamente
    const parent = window.location.hostname;

    const iframe = document.createElement("iframe");
    iframe.src = `https://player.twitch.tv/?channel=${channelName}&parent=${parent}`;
    iframe.width = "720";
    iframe.height = "480";
    iframe.allow = "autoplay; fullscreen";

    container.appendChild(iframe);
  })();

  // Cargar noticias desde la API de WordPress
  fetchNews();
});

// Función para escapar HTML (por seguridad en el manejo del título)
function escapeHTML(html) {
  const div = document.createElement("div");
  div.innerText = html;
  return div.innerHTML;
}

// Función para cargar noticias desde la API de WordPress
async function fetchNews() {
  try {
    const response = await fetch(
      "https://polvora.com.mx/wp-json/wp/v2/posts?per_page=10&_embed&categories=77"
    );
    if (!response.ok) throw new Error("Error al obtener las noticias");

    const posts = await response.json();
    const container = document.getElementById("news-container");

    posts.forEach((post) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      const imageUrl =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/120";

      newsItem.innerHTML = `
    <img src="${imageUrl}" alt="${post.title.rendered}">
    <div class="news-item-content">
      <h3><a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title.rendered}</a></h3>
    </div>
  `;

      container.appendChild(newsItem);
    });
  } catch (error) {
    console.error("Error al cargar las noticias:", error);
    const container = document.getElementById("news-container");
    container.innerHTML =
      "<p>Error al cargar las noticias. Por favor, inténtalo de nuevo más tarde.</p>";
  }
}
