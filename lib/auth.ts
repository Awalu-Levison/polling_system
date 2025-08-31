import { supabase } from './supabaseClient';

export async function login(email: string) {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    alert('Check your email for the login link!');
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
}

export async function register(email: string) {
  try {
    const { error } = await supabase.auth.signUp({ email, password: '' }); // Supabase requires a password, but we're using OTP, so we pass an empty string
    if (error) throw error;
    alert('Check your email to confirm your registration!');
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
}
