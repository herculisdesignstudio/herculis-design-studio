/* Herculis Design Studio — shared site behavior (vanilla JS, no dependencies) */

(function () {
  "use strict";

  /* ---------- Utilities ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch (e) { return fallback; }
    },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  };
  const money = (n) => (n === 0 ? "Free" : `$${n.toFixed(0)}`);
  const stars = (rating) => {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  /* ---------- State ---------- */
  let cart = store.get("herculis_cart", []);
  let wishlist = store.get("herculis_wishlist", []);
  let recentlyViewed = store.get("herculis_recent", []);
  let platform = store.get("herculis_platform", "gumroad");

  const PLATFORM_LABELS = { gumroad: "Gumroad", pristify: "Pristify", payhip: "Payhip" };

  function getPlatform() { return platform; }
  function setPlatform(p) {
    platform = p;
    store.set("herculis_platform", p);
    $$(".platform-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-platform") === p));
    renderGrids();
    if (typeof initShop === "function") reapplyShop();
    if (typeof reapplyProductPage === "function") reapplyProductPage();
  }
  window.setPlatform = setPlatform;

  function productLink(p) {
    if (!p.links) return "#";
    return p.links[platform] || p.links.gumroad || Object.values(p.links)[0] || "#";
  }
  function productPrice(p) {
    if (!p.prices) return typeof p.price === "number" ? p.price : 0;
    return typeof p.prices[platform] === "number" ? p.prices[platform] : p.prices.gumroad;
  }

  function initPlatformSelector() {
    $$(".platform-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-platform") === platform);
      btn.addEventListener("click", () => setPlatform(btn.getAttribute("data-platform")));
    });
  }

  function saveCart() { store.set("herculis_cart", cart); renderCart(); updateBadges(); }
  function saveWishlist() { store.set("herculis_wishlist", wishlist); updateBadges(); }

  function updateBadges() {
    $$(".cart-count").forEach(el => { el.textContent = cart.length; el.classList.toggle("hidden", cart.length === 0); });
    $$(".wishlist-count").forEach(el => { el.textContent = wishlist.length; el.classList.toggle("hidden", wishlist.length === 0); });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(msg) {
    let toast = $(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- Cart / wishlist actions (exposed globally for inline onclick) ---------- */
  window.addToCart = function (id, name, price, image) {
    if (!cart.find(i => i.id === id)) {
      cart.push({ id, name, price, image });
      saveCart();
      showToast(`${name} added to cart`);
    } else {
      showToast(`${name} is already in your cart`);
    }
    openDrawer();
  };
  window.removeFromCart = function (id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
  };
  window.toggleWishlist = function (id, name, btn) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast(`${name} removed from wishlist`);
      if (btn) btn.setAttribute("aria-pressed", "false");
    } else {
      wishlist.push(id);
      showToast(`${name} saved to wishlist`);
      if (btn) btn.setAttribute("aria-pressed", "true");
    }
    saveWishlist();
  };
  window.trackRecentlyViewed = function (id) {
    recentlyViewed = [id, ...recentlyViewed.filter(x => x !== id)].slice(0, 8);
    store.set("herculis_recent", recentlyViewed);
  };

  /* ---------- Cart drawer ---------- */
  function openDrawer() {
    $(".drawer")?.classList.add("open");
    $(".drawer-overlay")?.classList.add("open");
  }
  function closeDrawer() {
    $(".drawer")?.classList.remove("open");
    $(".drawer-overlay")?.classList.remove("open");
  }
  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  function renderCart() {
    const body = $(".drawer-body");
    const totalEl = $(".drawer-total-amount");
    if (!body) return;
    if (cart.length === 0) {
      body.innerHTML = `<p class="empty-note">Your cart is empty. Browse the <a href="shop.html" style="color:var(--color-primary); font-weight:600;">shop</a> to find something you'll love.</p>`;
    } else {
      body.innerHTML = cart.map(item => `
        <div class="drawer-item">
          <img src="${item.image}" alt="" loading="lazy">
          <div class="drawer-item-info">
            <div style="font-weight:600; font-size:14px;">${item.name}</div>
            <div style="color:var(--color-text-muted); font-size:13px; margin:2px 0 6px;">${money(item.price)}</div>
            <small onclick="removeFromCart('${item.id}')">Remove</small>
          </div>
        </div>
      `).join("");
    }
    if (totalEl) totalEl.textContent = money(cart.reduce((s, i) => s + i.price, 0));
  }

  /* ---------- Product card renderer (used on home, shop, related products) ---------- */
  function productCardHTML(p) {
    const badgeMap = { sale: "Sale", new: "New", bestseller: "Best seller", free: "Free" };
    const wished = wishlist.includes(p.id);
    const price = productPrice(p);
    const link = productLink(p);
    const isReal = link !== "#";
    return `
    <article class="card product-card">
      <a href="product.html?id=${p.id}" class="product-media" aria-label="View ${p.name}">
        ${p.badge ? `<div class="product-badges"><span class="badge badge-${p.badge}">${badgeMap[p.badge] || p.badge}</span></div>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-hover-actions">
        <button class="icon-btn" aria-label="Save ${p.name} to wishlist" aria-pressed="${wished}"
          onclick="toggleWishlist('${p.id}','${p.name.replace(/'/g, "\\'")}', this)">${wished ? "♥" : "♡"}</button>
        <button class="icon-btn" aria-label="Quick view ${p.name}" onclick="window.location.href='product.html?id=${p.id}'">⤢</button>
        <button class="icon-btn" aria-label="Share ${p.name}" onclick="sharePage('${p.name.replace(/'/g, "\\'")}')">↗</button>
      </div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-rating"><span class="stars" aria-hidden="true">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</div>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="price">${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ""}${money(price)}</div>
          ${isReal
            ? `<a class="btn btn-primary btn-sm" href="${link}" target="_blank" rel="noopener">Buy on ${PLATFORM_LABELS[platform]}</a>`
            : `<span class="btn btn-ghost btn-sm" style="cursor:default; opacity:0.6;" title="Link coming soon">Coming soon</span>`}
        </div>
      </div>
    </article>`;
  }
  window.productCardHTML = productCardHTML;

  window.sharePage = function (name) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: name, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      showToast("Link copied to clipboard");
    }
  };

  /* ---------- Render product grids declared with data-product-grid ---------- */
  function renderGrids() {
    $$("[data-product-grid]").forEach(grid => {
      const filterTag = grid.getAttribute("data-filter-tag");
      const limit = parseInt(grid.getAttribute("data-limit") || "8", 10);
      let items = window.HERCULIS_PRODUCTS || [];
      if (filterTag) items = items.filter(p => p.tags.includes(filterTag));
      items = items.slice(0, limit);
      grid.innerHTML = items.map(productCardHTML).join("");
    });
  }

  /* ---------- Shop page: search + filter + sort ---------- */
  function initShop() {
    const grid = $("#shop-grid");
    if (!grid) return;
    const searchInput = $("#shop-search");
    const sortSelect = $("#shop-sort");
    const categoryChecks = $$('input[name="category"]');
    const typeChecks = $$('input[name="type"]');
    const resultCount = $("#result-count");

    function apply() {
      let items = [...(window.HERCULIS_PRODUCTS || [])];
      const q = (searchInput?.value || "").trim().toLowerCase();
      if (q) items = items.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

      const checkedCats = categoryChecks.filter(c => c.checked).map(c => c.value);
      if (checkedCats.length) items = items.filter(p => checkedCats.includes(p.category));

      const checkedTypes = typeChecks.filter(c => c.checked).map(c => c.value);
      if (checkedTypes.length) items = items.filter(p => checkedTypes.some(t => p.tags.includes(t)));

      const sort = sortSelect?.value;
      if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
      else if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
      else if (sort === "alphabetical") items.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === "bestselling") items.sort((a, b) => b.reviews - a.reviews);
      else if (sort === "newest") items.reverse();

      grid.innerHTML = items.length
        ? items.map(productCardHTML).join("")
        : `<p class="empty-note" style="grid-column:1/-1;">No products match those filters yet. Try clearing a filter.</p>`;
      if (resultCount) resultCount.textContent = `${items.length} product${items.length === 1 ? "" : "s"}`;
    }

    searchInput?.addEventListener("input", apply);
    sortSelect?.addEventListener("change", apply);
    [...categoryChecks, ...typeChecks].forEach(c => c.addEventListener("change", apply));
    window._shopApply = apply;
    apply();
  }
  function reapplyShop() { if (window._shopApply) window._shopApply(); }

  /* ---------- Product detail page ---------- */
  function initProductPage() {
    const wrap = $("#product-detail");
    if (!wrap) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || (window.HERCULIS_PRODUCTS[0] && window.HERCULIS_PRODUCTS[0].id);
    const p = (window.HERCULIS_PRODUCTS || []).find(x => x.id === id) || window.HERCULIS_PRODUCTS[0];
    if (!p) return;
    trackRecentlyViewed(p.id);
    window._currentProduct = p;

    $("#pd-title").textContent = p.name;
    $("#pd-category").textContent = p.category;
    document.title = `${p.name} — Herculis Design Studio`;
    $("#pd-rating-stars").textContent = stars(p.rating);
    $("#pd-rating-text").textContent = `${p.rating} (${p.reviews} reviews)`;
    $("#pd-desc").textContent = p.desc;
    $("#pd-main-image").src = p.image;
    $("#pd-main-image").alt = p.name;
    $("#pd-wish-btn").setAttribute("onclick", `toggleWishlist('${p.id}','${p.name.replace(/'/g, "\\'")}', this)`);
    renderProductPrice(p);

    // Related products: same category, excluding current
    const related = (window.HERCULIS_PRODUCTS || []).filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    const relatedGrid = $("#related-grid");
    if (relatedGrid) relatedGrid.innerHTML = related.map(productCardHTML).join("") || "<p class='empty-note'>No related items yet.</p>";

    // Recently viewed (excluding current)
    const rv = recentlyViewed.filter(x => x !== p.id).map(rid => (window.HERCULIS_PRODUCTS || []).find(x => x.id === rid)).filter(Boolean).slice(0, 4);
    const rvGrid = $("#recent-grid");
    if (rvGrid) {
      rvGrid.innerHTML = rv.length ? rv.map(productCardHTML).join("") : "<p class='empty-note'>You haven't viewed any other products yet.</p>";
    }
  }

  function renderProductPrice(p) {
    const price = productPrice(p);
    const link = productLink(p);
    const isReal = link !== "#";
    const priceEl = $("#pd-price");
    const buyBtn = $("#pd-buy-btn");
    if (priceEl) priceEl.innerHTML = (p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : "") + money(price);
    if (buyBtn) {
      if (isReal) {
        buyBtn.setAttribute("href", link);
        buyBtn.setAttribute("target", "_blank");
        buyBtn.setAttribute("rel", "noopener");
        buyBtn.textContent = `Buy on ${PLATFORM_LABELS[platform]}`;
        buyBtn.classList.remove("btn-ghost");
        buyBtn.classList.add("btn-primary");
      } else {
        buyBtn.removeAttribute("href");
        buyBtn.textContent = "Coming soon";
        buyBtn.classList.remove("btn-primary");
        buyBtn.classList.add("btn-ghost");
      }
    }
  }
  function reapplyProductPage() { if (window._currentProduct) renderProductPrice(window._currentProduct); }

  /* ---------- Nav / mobile menu / theme ---------- */
  function initNav() {
    $("#nav-toggle")?.addEventListener("click", () => {
      $("#nav-links")?.classList.toggle("nav-open-mobile");
      $(".navbar")?.classList.toggle("mobile-open");
    });
    const themeToggle = $("#theme-toggle");
    const savedTheme = store.get("herculis_theme", "light");
    if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    themeToggle?.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      store.set("herculis_theme", isDark ? "light" : "dark");
    });
  }

  /* ---------- Announcement bar dismiss ---------- */
  function initAnnouncement() {
    const bar = $(".announcement");
    if (!bar) return;
    if (store.get("herculis_announcement_dismissed", false)) { bar.remove(); return; }
    $(".announcement button")?.addEventListener("click", () => {
      bar.remove();
      store.set("herculis_announcement_dismissed", true);
    });
  }

  /* ---------- Accordion (FAQ) ---------- */
  function initAccordion() {
    $$(".accordion-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".accordion-item");
        const panel = item.querySelector(".accordion-panel");
        const isOpen = item.classList.contains("open");
        $$(".accordion-item").forEach(i => { i.classList.remove("open"); i.querySelector(".accordion-panel").style.maxHeight = null; });
        if (!isOpen) {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Scroll-to-top + reading progress ---------- */
  function initScrollExtras() {
    const btn = $(".scroll-top");
    const progress = $(".reading-progress");
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (btn) btn.classList.toggle("show", y > 500);
      if (progress) {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = height > 0 ? `${(y / height) * 100}%` : "0%";
      }
    });
    btn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Cookie consent ---------- */
  function initCookieBanner() {
    const banner = $(".cookie-banner");
    if (!banner) return;
    if (store.get("herculis_cookie_consent", null) === null) {
      setTimeout(() => banner.classList.add("show"), 800);
    }
    $("#cookie-accept")?.addEventListener("click", () => { store.set("herculis_cookie_consent", "accepted"); banner.classList.remove("show"); });
    $("#cookie-decline")?.addEventListener("click", () => { store.set("herculis_cookie_consent", "declined"); banner.classList.remove("show"); });
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        let cur = 0;
        const step = Math.max(1, Math.round(target / 60));
        const tick = () => {
          cur = Math.min(target, cur + step);
          el.textContent = cur.toLocaleString() + suffix;
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));
  }

  /* ---------- Newsletter form (placeholder submit) ---------- */
  function initNewsletter() {
    $$("form[data-newsletter]").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("You're on the list — check your inbox for a welcome email.");
        form.reset();
      });
    });
  }

  /* ---------- Contact form (placeholder submit) ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message sent — we'll get back to you within 1-2 business days.");
      form.reset();
    });
  }

  /* ---------- Product tabs on product page ---------- */
  function initProductTabs() {
    $$(".product-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        $$(".product-tab").forEach(t => t.classList.remove("active"));
        $$(".tab-panel").forEach(p => p.classList.add("hidden"));
        tab.classList.add("active");
        $(`#tab-${target}`)?.classList.remove("hidden");
      });
    });
  }

  /* ---------- Gallery thumbs ---------- */
  function initGallery() {
    $$(".gallery-thumbs img").forEach(thumb => {
      thumb.addEventListener("click", () => {
        $$(".gallery-thumbs img").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        const main = $("#pd-main-image");
        if (main) main.src = thumb.src;
      });
    });
  }

  /* ---------- Back-to-top footer link ---------- */
  function initFooterTop() {
    $("#footer-top")?.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Init on DOM ready ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initAnnouncement();
    initPlatformSelector();
    renderGrids();
    initShop();
    initProductPage();
    renderCart();
    updateBadges();
    initAccordion();
    initScrollExtras();
    initCookieBanner();
    initCounters();
    initNewsletter();
    initContactForm();
    initProductTabs();
    initGallery();
    initFooterTop();

    $(".drawer-overlay")?.addEventListener("click", closeDrawer);
    $("#cart-toggle")?.addEventListener("click", openDrawer);
    $("#drawer-close")?.addEventListener("click", closeDrawer);
  });
})();
