import 'dotenv/config';

export default {
  expo: {
    name: "BYEBUY-App",
    slug: "ByeBuy-App",
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      googleClientId: process.env.SUPABASE_GOOGLE_CLIENT_ID
    },
    plugins: [
      [
        "expo-secure-store",
      ]
    ]
  }
};