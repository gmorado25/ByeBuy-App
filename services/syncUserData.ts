import { UserData } from '@/contexts/UserContext';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function syncUserProfile(userData: UserData, session: Session) {
  if (!session?.user?.id) return;

  const { error } = await supabase.from('profiles').upsert({
    id: session.user.id,
    name: userData.name,
    age: userData.age,
    retirement_age: userData.retirementAge,
    salary: userData.salary,
    post_tax_salary: userData.postTaxSalary,
    spent: userData.spent || 0,
    saved: userData.saved || 0,
    invested: userData.invested || 0,
  });

  if (error) console.error('Supabase sync error:', error.message);
}

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Fetch profile error:', error.message);
    return null;
  }

  return data;
}