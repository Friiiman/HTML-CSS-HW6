"use strict";

function mainNavHidden() {
  const mainNav = document.querySelector(".main-nav");
  mainNav.classList.add("main-nav--hidden");
}

function mainNavToggle() {
  const burgerMenu = document.querySelector(".burger-menu");
  burgerMenu.onclick = function () {
    const mainNav = document.querySelector(".main-nav");
    mainNav.classList.toggle("main-nav--hidden");
  };
}

mainNavHidden();
mainNavToggle();

// -------------------------------------------------

function getDataCards() {
  fetch("js/data.json")
    .then((response) => {
      return response.json();
    })
    .catch((err) => alert(err))
    .then((data) => {
      data.forEach(
        ({
          id,
          imgSrc,
          productName,
          productDescr,
          productPrice,
          color,
          size,
        }) => {
          catalogCardCreate(
            id,
            imgSrc,
            productName,
            productDescr,
            productPrice
          );
          cartCardAdd(id, imgSrc, productName, productPrice, color, size);
        }
      );
    });
}

getDataCards();

// -------------------------------------------------

function catalogCardCreate(
  id,
  imgSrc,
  productName,
  productDescr,
  productPrice
) {
  const cardsContainer = document.querySelector(".catalog__content");
  const productCardEl = `
    <article id="${id}" class="catalog-card">
          <div class="catalog-card__img">
              <img src="${imgSrc}" alt="image" class="catalog-card__img-item">
              <button class="catalog-card__img-button">
                  <img src="styles/img/shop-cart.svg" alt="shop cart">Add
                  to Cart
              </button>
          </div>
          <a href="product.html" class="catalog-card__link">
            <h3 class="catalog-card__title">${productName}</h3>
          </a>
          <p class="catalog-card__text">${productDescr}</p>
          <span class="catalog-card__price">$${productPrice}</span>
      </article>
    `;
  cardsContainer.insertAdjacentHTML("beforeend", productCardEl);
}

// -------------------------------------------------

function cartCardAdd(id, imgSrc, productName, productPrice, color, size) {
  const cardImgBtn = document.querySelectorAll(".catalog-card__img-button");
  cardImgBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const catalogCart = document.querySelector(".catalog-cart");
      const catalogCartChilds = catalogCart.children;
      const dataId = id;
      const cartCardEl = `
        <article class="cart-card">
          <img src="${imgSrc}" alt="product image" class="cart-card__img">
          <div class="cart-card__content">
              <h3 class="cart-card__title">${productName}
              </h3>
              <div class="cart-card__details">
                  <p class="cart-card__detail">Price: <span
                          class="cart-card__detail--price">${productPrice}$</span></p>
                  <p class="cart-card__detail">Color: <span
                          class="cart-card__detail--highlighted">${color}</span></p>
                  <p class="cart-card__detail">Size: <span
                          class="cart-card__detail--highlighted">${size}</span></p>
                  <p class="cart-card__detail">Quantity: <input type="number" value="1" min="1"
                          max="99" class="cart-card__detail-input"></p>
              </div>
          </div>
          <button class="cart-card__close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                      fill="#575757" />
              </svg>
          </button>
        </article>
      `;

      // Добавление заголовка
      if (catalogCartChilds.length === 0) {
        const catalogCartHeaderCreate = document.createElement("h2");
        catalogCartHeaderCreate.classList.add("catalog-cart__header");
        catalogCartHeaderCreate.textContent = "Cart Items";
        catalogCart.appendChild(catalogCartHeaderCreate);
      }
      // Вставка карточки
      if (e.target.closest(".catalog-card").id === dataId) {
        catalogCart.insertAdjacentHTML("beforeend", cartCardEl);
      }
      // Закрытие карточки
      const cartCardCloseBtn = document.querySelectorAll(".cart-card__close");
      cartCardCloseBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.target.closest(".cart-card").remove();
          if (catalogCartChilds.length === 1) {
            const catalogCartHeader = document.querySelector(
              ".catalog-cart__header"
            );
            catalogCartHeader.remove();
          }
        });
      });
    });
  });
}
