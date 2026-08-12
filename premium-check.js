import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://heolqzakdwsvlhhrtdjn.supabase.co",
  "sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi"
);

(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // Not logged in
  if (!session) {
    window.location.replace("https://ilyasbusiness2011-dot.github.io/your-main-repo/login.html");
    return;
  }

  // Check subscription
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("premium")
    .eq("id", session.user.id)
    .single();

  // Not subscribed
  if (error || profile?.premium !== true) {
    window.location.replace("https://ilyasbusiness2011-dot.github.io/your-main-repo/subscribe.html");
    return;
  }

  // Subscribed → allow page
  document.documentElement.style.visibility = "visible";
})();
