(function () {
    // Mobile nav
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });
    }

    // Footer year
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Scroll reveal
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // Gallery lightbox
    var lightbox = document.getElementById("lightbox");
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
    if (lightbox && items.length && lightbox.showModal) {
        var img = lightbox.querySelector("img");
        var count = lightbox.querySelector(".lightbox__count");
        var current = 0;

        function show(i) {
            current = (i + items.length) % items.length;
            img.src = items[current].href;
            img.alt = items[current].querySelector("img").alt;
            count.textContent = (current + 1) + " / " + items.length;
        }

        items.forEach(function (a, i) {
            a.addEventListener("click", function (e) {
                e.preventDefault();
                show(i);
                lightbox.showModal();
            });
        });

        lightbox.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
        lightbox.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
        lightbox.querySelector(".lightbox__close").addEventListener("click", function () { lightbox.close(); });
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) lightbox.close();
        });
        lightbox.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") show(current - 1);
            if (e.key === "ArrowRight") show(current + 1);
        });
        lightbox.addEventListener("close", function () { img.removeAttribute("src"); });
    }
})();
