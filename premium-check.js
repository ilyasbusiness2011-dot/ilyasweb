import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://heolqzakdwsvlhhrtdjn.supabase.co",
    "sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi"
);

(async () => {

    const {
        data: { session }
    } = await supabase.auth.getSession();

    // NOT LOGGED IN → SIGN UP
    if (!session) {
        window.location.replace(
            "https://ilyasbusiness2011-dot.github.io/ilyas-s_website/signup.html"
        );
        return;
    }

    // GET PROFILE
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("premium")
        .eq("id", session.user.id)
        .single();

    console.log("========== PREMIUM DEBUG ==========");
    console.log("USER ID:", session.user.id);
    console.log("PROFILE:", profile);
    console.log("ERROR:", error);
    console.log("PREMIUM VALUE:", profile?.premium);
    console.log("PREMIUM TYPE:", typeof profile?.premium);
    console.log("===================================");

    // DATABASE ERROR
    if (error) {
        console.log("PROFILE QUERY FAILED");

        window.location.replace(
            "https://ilyasbusiness2011-dot.github.io/ilyas_s_website/subscribe.html"
        );

        return;
    }

    // NOT PREMIUM
    if (profile?.premium !== true) {
        console.log("PREMIUM IS NOT BOOLEAN TRUE");

        window.location.replace(
            "https://ilyasbusiness2011-dot.github.io/ilyas_s_website/subscribe.html"
        );

        return;
    }

    // PREMIUM
    console.log("✅ PREMIUM VERIFIED — NO REDIRECT");

    document.documentElement.style.visibility = "visible";

})();
