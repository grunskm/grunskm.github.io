(() => {
  const getImageTarget = (eventTarget) => {
    if (!(eventTarget instanceof Element)) {
      return null;
    }

    const image = eventTarget.closest("#card-column img.slide");
    if (!image || image.classList.contains("no-lightbox")) {
      return null;
    }

    return image;
  };

  const createLightbox = () => {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    const image = document.createElement("img");
    image.className = "lightbox-image";
    image.alt = "";

    lightbox.append(image);
    document.body.appendChild(lightbox);

    return { lightbox, image };
  };

  const { lightbox, image } = createLightbox();

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    image.src = "";
    image.alt = "";
  };

  const openLightbox = (sourceImage) => {
    if (!sourceImage.src) {
      return;
    }

    image.src = sourceImage.src;
    image.alt = sourceImage.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  };

  document.addEventListener("click", (event) => {
    const sourceImage = getImageTarget(event.target);
    if (sourceImage) {
      openLightbox(sourceImage);
      return;
    }

    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
