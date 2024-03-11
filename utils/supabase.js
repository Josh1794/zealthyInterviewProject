import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'react-native-dotenv';

export const supabase = createClient(
  'https://olhppfiunaqpjkawkypb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saHBwZml1bmFxcGprYXdreXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMDk4NzIsImV4cCI6MjAyNTU4NTg3Mn0.UtRC-VrL82hpo0_hZtl2xNuKWM1lpzTL6Aa2mIat418',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
