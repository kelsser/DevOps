<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "creditcard_db";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // Valid login
        $_SESSION['username'] = $username;
        header("Location: dashboard.php"); // Redirect to the dashboard page
    } else {
        // Invalid login
        echo "Invalid username or password";
    }
}

mysqli_close($conn);
?>
