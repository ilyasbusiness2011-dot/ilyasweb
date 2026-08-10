import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://heolqzakdwsvlhhrtdjn.supabase.co'
const supabaseKey = 'sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase connected!')
const signupButton = document.getElementById('signup');

if (signupButton) {
  signupButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (signupButton) {
  signupButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: email,
            premium: false
          }
        ]);

      if (profileError) {
        alert(profileError.message);
      } else {
        alert('Account created successfully!');
        window.location.href = 'subscribe.html';
      }

    }
  });
}

    if (error) {
      alert(error.message);
    } else {
      alert('Account created successfully! Check your email if confirmation is required.');
    }
  });
}
const loginButton = document.getElementById('login');

if (loginButton) {
  loginButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Login successful!');
      window.location.href = 'subscribe.html';
    }
  });
}
supabase.auth.getSession().then(({ data: { session } }) => {

  const path = window.location.pathname;

  if (path === "/ilyas-s_website/" || path.endsWith("/index.html")) {

    if (!session) {
      window.location.href = "login.html";
    }

  }

});
