// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // For now, just show an alert
            // In a real implementation, this would send data to a server
            alert(`Thank you for your message, ${name}!\n\nWe'll get back to you at ${email} as soon as possible.\n\nNote: This is a demo form. To make it functional, you'll need to connect it to a backend service or email API.`);

            // Reset form
            contactForm.reset();
        });
    }
});
