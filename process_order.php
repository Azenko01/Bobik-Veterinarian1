<?php
// Проверка, что форма была отправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $address = $_POST['address'] ?? '';
    $payment = $_POST['payment'] ?? '';
    $orderItems = $_POST['order_items'] ?? '';
    $orderTotal = $_POST['order_total'] ?? '';
    
    // Валидация данных (простая проверка)
    if (empty($name) || empty($email) || empty($phone) || empty($address) || empty($payment)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля']);
        exit;
    }
    
    // Генерация номера заказа
    $orderNumber = 'ORD-' . date('YmdHis') . '-' . rand(100, 999);
    
    // В реальном проекте здесь был бы код для сохранения заказа в базу данных
    // и отправки подтверждения на email клиента
    
    // Возвращаем успешный ответ с номером заказа
    echo json_encode([
        'success' => true, 
        'message' => 'Ваш заказ успешно оформлен!',
        'orderNumber' => $orderNumber,
        'orderDate' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Если запрос не POST, перенаправляем на страницу корзины
header('Location: ../cart.html');
exit;
?>