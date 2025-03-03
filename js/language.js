document.addEventListener("DOMContentLoaded", () => {
  // 1) Select language buttons
  const langButtons = document.querySelectorAll(".language-button span");

  // 2) Function to load JSON file and apply translations
  async function setLanguage(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      const translations = await response.json();
  
      // 1) Update text for elements with data-i18n
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
  
      // 2) Update placeholders for elements with data-i18n-placeholder
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[key]) {
          el.setAttribute("placeholder", translations[key]);
        }
      });
  
      // 3) Update href for elements with data-i18n-href
      document.querySelectorAll("[data-i18n-href]").forEach(el => {
        const key = el.getAttribute("data-i18n-href");
        if (translations[key]) {
          el.setAttribute("href", translations[key]);
        }
      });
  
    } catch (error) {
      console.error("Error loading translation file:", error);
    }
  }
  
  // 3) Function to highlight the active language button
  function highlightActiveLang(selectedLang) {
    langButtons.forEach(btn => {
      btn.classList.remove("active-lang");
      if (btn.getAttribute("data-lang") === selectedLang) {
        btn.classList.add("active-lang");
      }
    });
  }

  // 4) Add event listeners to each language button
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
      highlightActiveLang(lang);
      // Save user preference in localStorage
      localStorage.setItem("preferredLang", lang);
    });
  });

  // 5) On page load, set language to stored preference or default to "en"
  const storedLang = localStorage.getItem("preferredLang") || "en";
  setLanguage(storedLang);
  highlightActiveLang(storedLang);
});
