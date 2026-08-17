/* =========================================================
   NEXTGEN STORE — SCRIPT.JS
   Handles: product rendering, image gallery, WhatsApp orders,
   navbar behaviour, mobile menu, scroll reveal, back-to-top.
   ========================================================= */

"use strict";

/* ===================== CONFIG ===================== */
const STORE_NAME = "NextGen Store";
const WHATSAPP_NUMBER = "923339630737"; // international format, no + or leading 0

/* ===================== PRODUCT DATA ===================== */
/* Replace image1-4 with your own product photos later.
   front = main display image, side/top/back = gallery angles. */
const products = [
  {
    id: 1,
    name: "Brown Panjidar Chappal",
    price: 2700,
    image1: "./assets/images/Chappal-1-1.jpeg",
    image2: "./assets/images/Chappal-1-2.jpeg",
    image3: "./assets/images/Chappal-1-3.jpeg",
    image4: "./assets/images/Chappal-1-4.jpeg",
  },
  {
    id: 2,
    name: "Black Panjidar Chappal",
    price: 2700,
    image1: "./assets/images/Chappal-2-1.jpeg",
    image2: "./assets/images/Chappal-2-2.jpeg",
    image3: "./assets/images/Chappal-2-3.jpeg",
    image4: "./assets/images/Chappal-2-4.jpeg",
  },
  {
    id: 3,
    name: "Black Panjidar Chappal",
    price: 2700,
    image1: "./assets/images/Chappal-3-1.jpeg",
    image2: "./assets/images/Chappal-3-2.jpeg",
    image3: "./assets/images/Chappal-3-3.jpeg",
    image4: "./assets/images/Chappal-3-4.jpeg",
  },
  {
    id: 4,
    name: "Black Panjidar Chappal",
    price: 2500,
    image1: "./assets/images/Chappal-4-1.jpeg",
    image2: "./assets/images/Chappal-4-2.jpeg",
    image3: "./assets/images/Chappal-4-3.jpeg",
    image4: "./assets/images/Chappal-4-4.jpeg",
  },
  {
    id: 5,
    name: "Gray Panjidar Chappal",
    price: 2500,
    image1: "./assets/images/Chappal-5-1.jpeg",
    image2: "./assets/images/Chappal-5-2.jpeg",
    image3: "./assets/images/Chappal-5-3.jpeg",
    image4: "./assets/images/Chappal-5-4.jpeg",
  },
  {
    id: 6,
    name: "Handmaded Red Chappal",
    price: 3000,
    image1: "./assets/images/Chappal-6-1.jpeg",
    image2: "./assets/images/Chappal-6-2.jpeg",
    image3: "./assets/images/Chappal-6-4.jpeg",
    image4: "./assets/images/Chappal-6-4.jpeg",
  },
  {
    id: 7,
    name: "Handmaded Gray Chappal",
    price: 3000,
    image1: "./assets/images/Chappal-7-1.jpeg",
    image2: "./assets/images/Chappal-7-2.jpeg",
    image3: "./assets/images/Chappal-7-3.jpeg",
    image4: "./assets/images/Chappal-7-4.jpeg",
  },
];

/* ===================== FORMAT PRICE ===================== */
function formatPrice(amount) {
  return "PKR " + amount.toLocaleString("en-PK");
}

/* ===================== BUILD WHATSAPP LINK ===================== */
function buildWhatsAppLink(productName, price) {
  const message =
    `Hello ${STORE_NAME},\n\n` +
    `I want to order this product.\n\n` +
    `Product:\n${productName}\n\n` +
    `Price:\n${formatPrice(price)}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ===================== RENDER PRODUCT CARDS ===================== */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const angles = ["Image", "Image", "Image", "Image"];
  const cardsHTML = products
    .map((product) => {
      const images = [
        product.image1,
        product.image2,
        // product.image3,
        // product.image4,
      ];

      const thumbsHTML = images
        .map(
          (img, i) => `
      <button class="thumb-btn ${i === 0 ? "active" : ""}" type="button"
              data-image="${img}" data-index="${i}"
              aria-label="${angles[i]} view of ${product.name}">
        <img src="${img}" alt="${angles[i]} view of ${product.name}" loading="lazy">
        <span class="thumb-label">${angles[i]}</span>
      </button>
    `,
        )
        .join("");

      return `
      <article class="product-card fade-up" data-id="${product.id}">
        <div class="product-gallery">
          <div class="product-main-image">
            <img src="${product.image1}" alt="${product.name} - front view" class="main-img" loading="lazy">
          </div>
          <div class="product-thumbs">
            ${thumbsHTML}
          </div>
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)} <span>/ pair</span></p>
          <a class="order-btn" target="_blank" rel="noopener noreferrer"
             href="${buildWhatsAppLink(product.name, product.price)}">
            <i class="fa-brands fa-whatsapp"></i> Order Now
          </a>
        </div>
      </article>
    `;
    })
    .join("");

  grid.innerHTML = cardsHTML;
  attachGalleryEvents();
  observeFadeElements();
}

/* ===================== IMAGE GALLERY SWITCHING ===================== */
function attachGalleryEvents() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const mainImg = card.querySelector(".main-img");
    const thumbs = card.querySelectorAll(".thumb-btn");

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const newSrc = thumb.getAttribute("data-image");
        if (mainImg.src === newSrc) return;

        mainImg.classList.add("switching");
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.classList.remove("switching");
        }, 150);

        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  });
}

/* ===================== NAVBAR SCROLL STATE ===================== */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const toggle = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ===================== MOBILE MENU ===================== */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===================== ACTIVE NAV HIGHLIGHTING ===================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ===================== SCROLL REVEAL (Intersection Observer) ===================== */
let revealObserver;

function observeFadeElements() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
  }

  document.querySelectorAll(".fade-up:not(.revealed)").forEach((el) => {
    revealObserver.observe(el);
  });
}

/* ===================== BACK TO TOP ===================== */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===================== PAGE LOADER ===================== */
function initPageLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("loaded"), 350);
  });
}

/* ===================== FOOTER YEAR ===================== */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initNavbarScroll();
  initMobileMenu();
  initActiveNavHighlight();
  observeFadeElements();
  initBackToTop();
  setFooterYear();
});

initPageLoader();
