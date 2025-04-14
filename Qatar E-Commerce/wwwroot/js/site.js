// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Promotional Banner
    const promoBanner = document.getElementById("promoBanner")
    const promoClose = document.getElementById("promoClose")

    if (promoClose && promoBanner) {
        promoClose.addEventListener("click", () => {
            promoBanner.style.display = "none"
            // Store in session storage
            sessionStorage.setItem("promoBannerClosed", "true")
        })

        // Check if banner was previously closed
        if (sessionStorage.getItem("promoBannerClosed") === "true") {
            promoBanner.style.display = "none"
        }
    }

    // Sidebar Toggle
    const menuToggle = document.getElementById("menuToggle")
    const sidebarClose = document.getElementById("sidebarClose")
    const sidebar = document.getElementById("sidebar")
    const body = document.body

    // Create overlay element
    const overlay = document.createElement("div")
    overlay.className = "overlay"
    body.appendChild(overlay)

    // Toggle sidebar on menu button click
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active")
            overlay.classList.add("active")
            body.style.overflow = "hidden"
        })
    }

    // Close sidebar on close button click
    if (sidebarClose) {
        sidebarClose.addEventListener("click", () => {
            sidebar.classList.remove("active")
            overlay.classList.remove("active")
            body.style.overflow = ""
        })
    }

    // Close sidebar when clicking on overlay
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active")
        overlay.classList.remove("active")
        body.style.overflow = ""
    })

    // Submenu Toggle
    const navItems = document.querySelectorAll(".nav-item")

    navItems.forEach((item) => {
        const link = item.querySelector(".nav-link")
        const dropdownIcon = item.querySelector(".dropdown-icon")

        if (dropdownIcon) {
            link.addEventListener("click", (e) => {
                e.preventDefault()
                item.classList.toggle("open")
            })
        }
    })

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle")

    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem("darkMode") === "true"

    // Set initial state
    if (isDarkMode) {
        body.classList.add("dark-mode")
        if (themeToggle) {
            themeToggle.checked = true
        }
    }

    // Toggle dark mode
    if (themeToggle) {
        themeToggle.addEventListener("change", function () {
            if (this.checked) {
                body.classList.add("dark-mode")
                localStorage.setItem("darkMode", "true")
            } else {
                body.classList.remove("dark-mode")
                localStorage.setItem("darkMode", "false")
            }
        })
    }

    // Back to Top Button
    const backToTop = document.getElementById("backToTop")

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTop.classList.add("active")
            } else {
                backToTop.classList.remove("active")
            }
        })

        backToTop.addEventListener("click", (e) => {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })
    }

    // Floating Cart
    const floatingCart = document.getElementById("floatingCart")

    if (floatingCart) {
        floatingCart.addEventListener("click", () => {
            // Redirect to cart page or open cart dropdown
            window.location.href = "/cart"
        })
    }

    // Part Finder Modal
    const partFinderBtn = document.getElementById("partFinderBtn")
    const partFinderModal = document.getElementById("partFinderModal")

    let bootstrap;
    if (typeof bootstrap === 'undefined') {
        bootstrap = window.bootstrap;
    }

    if (partFinderBtn && partFinderModal && typeof bootstrap !== "undefined") {
        partFinderBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const modal = new bootstrap.Modal(partFinderModal)
            modal.show()
        })
    }

    // Quick View Modal
    const quickViewButtons = document.querySelectorAll(".quick-view-btn")
    const quickViewModal = document.getElementById("quickViewModal")

    if (quickViewButtons.length > 0 && quickViewModal && typeof bootstrap !== "undefined") {
        quickViewButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault()
                const modal = new bootstrap.Modal(quickViewModal)
                modal.show()
            })
        })

        // Quantity selector in quick view
        const minusBtn = quickViewModal.querySelector(".minus")
        const plusBtn = quickViewModal.querySelector(".plus")
        const qtyInput = quickViewModal.querySelector(".qty-input")

        if (minusBtn && plusBtn && qtyInput) {
            minusBtn.addEventListener("click", () => {
                const value = Number.parseInt(qtyInput.value)
                if (value > 1) {
                    qtyInput.value = value - 1
                }
            })

            plusBtn.addEventListener("click", () => {
                const value = Number.parseInt(qtyInput.value)
                qtyInput.value = value + 1
            })
        }

        // Thumbnail gallery in quick view
        const thumbs = quickViewModal.querySelectorAll(".thumb")
        const mainImage = quickViewModal.querySelector(".quick-view-gallery > img")

        if (thumbs.length > 0 && mainImage) {
            thumbs.forEach((thumb) => {
                thumb.addEventListener("click", function () {
                    // Remove active class from all thumbs
                    thumbs.forEach((t) => t.classList.remove("active"))

                    // Add active class to clicked thumb
                    this.classList.add("active")

                    // Update main image src
                    const imgSrc = this.querySelector("img").getAttribute("src")
                    mainImage.setAttribute("src", imgSrc)
                })
            })
        }
    }

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
    }

    // Form Validation
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
        const requiredFields = form.querySelectorAll("[required]")

        form.addEventListener("submit", (e) => {
            let isValid = true

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false
                    field.classList.add("is-invalid")
                } else {
                    field.classList.remove("is-invalid")
                }
            })

            if (!isValid) {
                e.preventDefault()
            }
        })

        requiredFields.forEach((field) => {
            field.addEventListener("input", () => {
                if (field.value.trim()) {
                    field.classList.remove("is-invalid")
                }
            })
        })
    })

    // Newsletter Form
    const newsletterForm = document.querySelector(".newsletter-form")

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()

            const emailInput = this.querySelector('input[type="email"]')
            const email = emailInput.value.trim()

            if (email && isValidEmail(email)) {
                // Show success message
                const successMessage = document.createElement("div")
                successMessage.className = "alert alert-success mt-3"
                successMessage.innerHTML = "Thank you for subscribing to our newsletter!"
                this.appendChild(successMessage)

                // Clear input
                emailInput.value = ""

                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove()
                }, 3000)
            } else {
                // Show error message
                emailInput.classList.add("is-invalid")

                if (!emailInput.nextElementSibling || !emailInput.nextElementSibling.classList.contains("invalid-feedback")) {
                    const errorMessage = document.createElement("div")
                    errorMessage.className = "invalid-feedback"
                    errorMessage.innerHTML = "Please enter a valid email address."
                    emailInput.parentNode.appendChild(errorMessage)
                }
            }
        })
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Add animation effects for a more premium feel
    const animateElements = document.querySelectorAll(".animate-on-scroll")

    if (animateElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated")
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)

        animateElements.forEach((element) => {
            observer.observe(element)
        })
    }

    // Mobile search toggle
    const searchToggle = document.querySelector(".search-toggle")
    const headerCenter = document.querySelector(".header-center")

    if (searchToggle && headerCenter) {
        searchToggle.addEventListener("click", () => {
            headerCenter.classList.toggle("active")
        })
    }

    // Sticky header
    const header = document.querySelector(".header")

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                header.classList.add("sticky")
            } else {
                header.classList.remove("sticky")
            }
        })
    }

    // Vehicle selector dropdown positioning
    const vehicleSelector = document.querySelector(".vehicle-selector")
    const vehicleDropdown = document.querySelector(".vehicle-dropdown")

    if (vehicleSelector && vehicleDropdown) {
        function positionDropdown() {
            const rect = vehicleSelector.getBoundingClientRect()
            const windowWidth = window.innerWidth

            if (windowWidth < 768) {
                vehicleDropdown.style.width = "280px"
            } else {
                vehicleDropdown.style.width = "450px"
            }

            if (rect.left + vehicleDropdown.offsetWidth > windowWidth) {
                vehicleDropdown.style.left = "auto"
                vehicleDropdown.style.right = "0"
            } else {
                vehicleDropdown.style.left = "0"
                vehicleDropdown.style.right = "auto"
            }
        }

        window.addEventListener("resize", positionDropdown)
        positionDropdown()
    }
})
