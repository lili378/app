const filterButtons = document.querySelectorAll(".filter-btn");
const tagButtons = document.querySelectorAll(".tag-btn");
const cards = document.querySelectorAll(".card");
const heartButtons = document.querySelectorAll(".heart-btn");

// --- FAVORITES FEATURE --- //
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Load saved favorites
document.addEventListener("DOMContentLoaded", () => {
    favorites.forEach((id) => {
        const card = document.querySelector(`.card[data-id='${id}']`);
        if (card) {
            const heart = card.querySelector(".heart-btn");
            heart.textContent = "❤️";
            heart.classList.add("favorited");
        }
    });
});

// Toggle favorites
heartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const id = card.getAttribute("data-id");

        if (favorites.includes(id)) {
            favorites = favorites.filter((fav) => fav !== id);
            btn.textContent = "🤍";
            btn.classList.remove("favorited");
        } else {
            favorites.push(id);
            btn.textContent = "❤️";
            btn.classList.add("favorited");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});

// --- AESTHETIC FILTER --- //
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        cards.forEach((card) => {
            if (filter === "all") {
                card.style.display = "inline-block";
            } else if (filter === "favorites") {
                card.style.display = favorites.includes(card.getAttribute("data-id"))
                    ? "inline-block"
                    : "none";
            } else {
                card.style.display = card.classList.contains(filter)
                    ? "inline-block"
                    : "none";
            }
        });
    });
});

// --- MODESTY TAG FILTER --- //
tagButtons.forEach((tagButton) => {
    tagButton.addEventListener("click", () => {
        const tag = tagButton.getAttribute("data-tag");

        tagButtons.forEach((btn) => btn.classList.remove("active"));
        tagButton.classList.add("active");

        cards.forEach((card) => {
            card.style.display = card.classList.contains(tag)
                ? "inline-block"
                : "none";
        });
    });
});

