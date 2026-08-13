import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://heolqzakdwsvlhhrtdjn.supabase.co";
const supabaseKey = "sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase connected!");

// ====================
// SIGN UP
// ====================

const signupButton = document.getElementById("signup");

if (signupButton) {
  signupButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert("Account created. Please check your email to confirm your account.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          email: email,
          premium: false
        }
      ]);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Account created successfully!");
    window.location.replace("subscribe.html");
  });
}

// ====================
// LOG IN
// ====================

const loginButton = document.getElementById("login");

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful!");
    window.location.replace("subscribe.html");
  });
}
