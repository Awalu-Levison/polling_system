import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';

export const { auth } = supabase;

export async function signUp(credentials: any) {
  const { email, password } = credentials;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function signIn(credentials: any) {
  const { email, password } = credentials;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}