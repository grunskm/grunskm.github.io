(() => {
  const nav = document.getElementById("nav");
  const navTop = nav ? nav.querySelector(".nav-top") : null;
  const links = nav ? nav.querySelector(".nav-links") : null;
  const toggle = nav ? nav.querySelector(".nav-toggle") : null;

  if (!nav || !navTop || !links || !toggle) {
    return;
  }

  const setExpanded = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  const shouldCollapse = () => {
    const topWidth = navTop.scrollWidth;
    const linksWidth = links.scrollWidth;
    const buffer = 64;

    return topWidth + linksWidth + buffer > nav.clientWidth;
  };

  const syncNavMode = () => {
    nav.classList.remove("nav-collapsed", "is-open");
    setExpanded(false);

    if (shouldCollapse()) {
      nav.classList.add("nav-collapsed");
    }

    document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
  };

  toggle.addEventListener("click", () => {
    if (!nav.classList.contains("nav-collapsed")) {
      return;
    }

    const isOpen = nav.classList.toggle("is-open");
    setExpanded(isOpen);
  });

  syncNavMode();
  window.addEventListener("resize", syncNavMode);
})();
