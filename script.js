import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://heolqzakdwsvlhhrtdjn.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase connected!')
