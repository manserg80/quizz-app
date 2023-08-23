<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    http_response_code(200);
    echo json_encode(array("message" => "Данные успешно обработаны."));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Ошибка при обработке запроса."));
}
?>