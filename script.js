import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://heolqzakdwsvlhhrtdjn.supabase.co";
const supabaseKey = "sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase connected!");

// ====================
// SIGNUP
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

    window.location.href = "subscribe.html";
  });
}

// ====================
// LOGIN
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

    window.location.href = "subscribe.html";
  });
}

// ====================
// PROTECT PREMIUM INDEX
// ====================

supabase.auth.getSession().then(async ({ data: { session } }) => {
  const path = window.location.pathname;

  // Only protect index.html / website root
  if (path === "/ilyas-s_website/" || path.endsWith("/index.html")) {

    // Not logged in
    if (!session) {
      window.location.href = "login.html";
      return;
    }

    // Get this user's premium status
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", session.user.id)
      .single();

    // Not premium
    if (error || !profile || profile.premium !== true) {
      window.location.href = "subscribe.html";
      return;
    }

    // Premium user → stay on index.html
    console.log("Premium access granted.");
  }
});
