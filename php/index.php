<?php
include 'connect.php';
session_start();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signUp'])) {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']); 

    if (empty($username) || empty($email) || empty($password)) {
        die("All fields are required.");
    }

    if (!preg_match("/^[a-zA-Z0-9._%+-]+@gmail\.com$/", $email)) {
        die("Only Gmail Accounts are allowed.");
    }

    $checkEmail = $conn->prepare("SELECT id FROM username WHERE emailaddress = ?");
    if (!$checkEmail) {
        die("Prepare failed: " . $conn->error);
    }
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $checkEmail->store_result();

    if ($checkEmail->num_rows > 0) {
        die("Email is already registered.");
    }

    $checkEmail->close();
    $stmt = $conn->prepare("INSERT INTO username (username, emailaddress, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password); 

    if ($stmt->execute()) {
        echo "<script>alert('Account created successfully!'); window.location.href = '../login2.html';</script>";
    } else {
        die("Error inserting data: " . $stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Login</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
   <link rel="stylesheet" href="css/style.css">
</head>
<body>
   <section class="container">
      <div class="left-side">
         <h2>Mathinik</h2>
         <img src="/upd2/images/loginform.png"  alt="Illustration">
      </div>
    <!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Login</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
   <link rel="stylesheet" href="../style.css">
</head>
<body>

              <div class="right-side">
         <div class="form-container">
            <h3>Create Account</h3>
<form action="index.php" method="POST">
    <input type="text" name="username" placeholder="Username" required class="box">
    <input type="email" name="email" placeholder="Email Address" required class="box" 
       pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$" 
       title="Only Gmail Accounts are allowed">
    <input type="password" name="password" placeholder="Password" required class="box" id="password">
    <input type="submit" class="enter" value="Sign Up" name="signUp" >
</form>
            <p>Already have an account?</p> 
          <p>   <a href="../login2.html" class="register">Log in</a>
          </p>
         </div>
      </div>
   </section>

   <script src="login.js"></script>
<script>
   if (!preg_match("/^[a-zA-Z0-9._%+-]+@gmail\.com$/", $email)) {
    die("Only Gmail addresses are allowed.");
}


      function togglePassword() {
         const input = document.getElementById("password");
         const toggle = event.target;
  
         if (input.type === "password") {
  
             input.type = "text";
   
             toggle.textContent = "Hide";
  }   else {
               input.type = "password";
               toggle.textContent = "Show";
  }
}
</script>
   <style>
      body {
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         background-color: #f4f4f4;
      }
      .container {
         display: flex;
         width: 900px;
         height: 500px;
         border-radius: 20px;
         box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
         margin-right: 300px;
         font-family: 'Nunito', sans-serif;
      }
      .left-side {
         flex: 1;
         background: #4A47A3;
         color: white;
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;
         border-radius: 10px;
      }
      .left-side img {
         max-width: 100%;
      }
      .right-side {
         display: flex;
         align-items: center;
         justify-content: center;
         background-color: #fff;
      }
      .form-container {
         width: 90%;
         max-width: 350px;
         padding: 2rem;
         border-radius: .5rem;
         background-color: #fff;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         text-align: center;
      }
      .form-container h3 {
         font-size: 1.8rem;
         margin-bottom: 1rem;
      }
      .box {
         width: 100%;
         padding: 0.8rem;
         margin: 0.5rem 0;
         border-radius: 5px;
         border: 1px solid #ccc;
      }
      .enter {
         display: block;
         width: 100%;
         background: linear-gradient(to left, #4776E6, #8e54e9);
         color: white;
         padding: 0.8rem;
         border-radius: 5px;
         text-decoration: none;
         margin-top: 1rem;
         letter-spacing: 0.5px;
      }
      .enter:hover {
         letter-spacing: 0.5px;
         background: linear-gradient(to right, #4776E6, #8e54e9);
      }
      .register {
         display: block;
         margin-top: 0.5rem;
         color: #006BFF;
         text-decoration: underline;
         font-size: 15px;
      }
      h2 {
         font-family: 'Nunito', sans-serif;
         font-size: 3.5rem;
      }
      p {
         font-family: 'Nunito', sans-serif;
         font-size: 15px;
         margin-top: 8px;
      }
   </style>
</body>
</html>