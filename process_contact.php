<?php
// Проверка, что форма была отправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Валидация данных (простая проверка)
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля']);
        exit;
    }
    
    // В реальном проекте здесь был бы код для отправки email
    // mail($to, $subject, $message, $headers);
    
    // Возвращаем успешный ответ
    echo json_encode(['success' => true, 'message' => 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.']);
    exit;
}

// Если запрос не POST, перенаправляем на страницу контактов
header('Location: ../contact.html');
exit;
?>