<?php
session_start();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script>
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "../login2.html";
        } else {
            window.history.back(); // go back if cancelled
        }
    </script>
</body>
</html>
