<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "creditcard_db";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["form_action"] == "insert") {
    $full_name_data = $_POST["full_name"];
    $cpf_data = $_POST["cpf"];
    $creditcard_number_data = $_POST["creditcard_number"];
    $rawDate = $_POST["expiration_date"];
    $cvc_code_data = $_POST["cvc_code"];

    // Check if the date is in "mm/yy" format
    if (preg_match('/^\d{2}\/\d{2}$/', $rawDate)) {
        // Date is already in the correct format
        $expiration_date_data = $rawDate;
    } else {
        // Parse and format the date
        $dateTime = DateTime::createFromFormat('Y-m', $rawDate); // Assuming the input is in yyyy/mm format
        if ($dateTime === false) {
            // Invalid date format, handle accordingly (e.g., show an error message)
            echo "Invalid date format. Please enter a valid date.";
            exit;
        }

        $expiration_date_data = $dateTime->format('m/y');
    }

    // Construct and execute the SQL INSERT query
    $sql = "INSERT INTO creditcard_data (full_name, cpf, creditcard_number, expiration_date, cvc_code)
            VALUES ('$full_name_data', '$cpf_data', '$creditcard_number_data', '$expiration_date_data', '$cvc_code_data')";

    if (mysqli_query($conn, $sql)) {
        echo "Form data inserted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Close connection
mysqli_close($conn);
?>