document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active")
            navLinks.classList.remove("active")
        })
    })

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: "smooth",
                })
            }
        })
    })

    // Carousel functionality
    const carouselItems = document.querySelectorAll(".carousel-item")
    const indicators = document.querySelectorAll(".indicator")
    let currentIndex = 0
    const intervalTime = 5000 // 5 seconds

    function showSlide(index) {
        // Hide all slides
        carouselItems.forEach((item) => {
            item.classList.remove("active")
        })

        // Deactivate all indicators
        indicators.forEach((dot) => {
            dot.classList.remove("active")
        })

        // Show the selected slide and activate its indicator
        carouselItems[index].classList.add("active")
        indicators[index].classList.add("active")
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length
        showSlide(currentIndex)
    }

    // Set up automatic slide transition
    let slideInterval = setInterval(nextSlide, intervalTime)

    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            clearInterval(slideInterval)
            currentIndex = index
            showSlide(currentIndex)
            slideInterval = setInterval(nextSlide, intervalTime)
        })
    })

    // Pause carousel on hover
    const carouselContainer = document.querySelector(".carousel-container")
    carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
    })

    carouselContainer.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, intervalTime)
    })

    // Initialize the carousel
    showSlide(currentIndex)

        // Form submission with EmailJS
        // Load EmailJS SDK
        ; (() => {
            if (typeof emailjs !== "undefined") {
                emailjs.init("YOUR_EMAILJS_PUBLIC_KEY")
            }
        })()

    const contactForm = document.getElementById("contactForm")
    const formStatus = document.getElementById("formStatus")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Get form data
            const institutionName = document.getElementById("institutionName").value
            const fullName = document.getElementById("fullName").value
            const phone = document.getElementById("phone").value

            // Show loading message
            formStatus.innerHTML = "Gönderiliyor..."
            formStatus.className = "form-status"

            if (typeof emailjs !== "undefined") {
                // Prepare template parameters
                const templateParams = {
                    institutionName: institutionName,
                    fullName: fullName,
                    phone: phone,
                }

                // Send email using EmailJS
                emailjs.send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", templateParams).then(
                    (response) => {
                        // Success message
                        formStatus.innerHTML = "Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz."
                        formStatus.className = "form-status success"
                        contactForm.reset()
                    },
                    (error) => {
                        // Error message
                        formStatus.innerHTML = "Form gönderilirken bir hata oluştu."
                        formStatus.className = "form-status error"
                        console.error("EmailJS Error:", error)
                    },
                )
            } else {
                // Fallback if EmailJS is not loaded
                formStatus.innerHTML = "Form gönderildi (test modu)."
                formStatus.className = "form-status success"
                contactForm.reset()
            }
        })
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate")
            }
        })
    }, observerOptions)

    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section)
    })
})
