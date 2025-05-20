// Обработка контактной формы
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверяем, поддерживается ли PHP на сервере
        const usePhp = false; // Измените на true, если загружаете на PHP-сервер
        
        if (usePhp) {
            // Отправка данных через PHP
            const formData = new FormData(contactForm);
            
            fetch('php/process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.innerHTML = `<div class="success-message">${data.message}</div>`;
                } else {
                    formMessage.innerHTML = `<div class="error-message">${data.message}</div>`;
                }
                formMessage.classList.remove('hidden');
                contactForm.reset();
                formMessage.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                formMessage.innerHTML = '<div class="error-message">Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.</div>';
                formMessage.classList.remove('hidden');
            });
        } else {
            // JavaScript-эмуляция отправки формы
            formMessage.innerHTML = '<div class="success-message">Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.</div>';
            formMessage.classList.remove('hidden');
            contactForm.reset();
            formMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Аналогичный код для формы заказа в корзине
// ...