   document.getElementById("loginBtn").addEventListener("click", function () {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let message = document.getElementById("message");

            if (!email.includes("@gmail.com")) {
                message.textContent = "❌ Invalid Email. It must contain '@gmail.com'.";

            } else if (password.length < 6) {
                message.textContent = "❌ Password must be at least 6 characters.";

            } else {
                message.textContent = "✅ Login Successful!";
                message.className = "result success";
            }
        });