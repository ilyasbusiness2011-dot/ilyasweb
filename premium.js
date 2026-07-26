import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://heolqzakdwsvlhhrtdjn.supabase.co'
const supabaseKey = 'sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi'

const supabase = createClient(supabaseUrl, supabaseKey)

const checkPremium = async () => {

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    window.location.href = "login.html"
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('premium')
    .eq('id', session.user.id)
    .single()

  if (error) {
    console.log(error)
    return
  }

  if (!data.premium) {
    window.location.href = "subscribe.html"
  }

}

checkPremium()
