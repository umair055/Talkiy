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

    // Form submission
    const contactForm = document.getElementById("contactForm")
    const formStatus = document.getElementById("formStatus")

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Get form data
        const institutionName = document.getElementById("institutionName").value
        const fullName = document.getElementById("fullName").value
        const phone = document.getElementById("phone").value

        // Prepare data for Google Sheets
        const formData = new FormData()
        formData.append("institutionName", institutionName)
        formData.append("fullName", fullName)
        formData.append("phone", phone)

        // Replace with your Google Sheet script URL
        const scriptURL = "YOUR_GOOGLE_SHEET_SCRIPT_URL"

        // Show loading message
        formStatus.innerHTML = "Gönderiliyor..."
        formStatus.className = "form-status"

        // Send data to Google Sheets
        fetch(scriptURL, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Success message
                    formStatus.innerHTML = "Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz."
                    formStatus.className = "form-status success"
                    contactForm.reset()
                } else {
                    // Error message
                    throw new Error("Form gönderilirken bir hata oluştu.")
                }
            })
            .catch((error) => {
                formStatus.innerHTML = error.message
                formStatus.className = "form-status error"
            })
    })

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
