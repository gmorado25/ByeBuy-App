// import { UserData } from '@/contexts/UserContext';
// import { Session } from '@supabase/supabase-js';
// import { supabase } from './supabase';

// export async function syncUserProfile(userData: UserData, session: Session) {
//   if (!session?.user?.id) return;

//   const { error } = await supabase.from('profiles').upsert({
//     id: session.user.id,
//     name: userData.name?.trim() ?? '',
//     age: userData.age ?? 0,
//     retirement_age: userData.retirementAge ?? 65,
//     birth_year: userData.birthYear ?? '1900-01-01',
//     salary: userData.salary ?? null,
//     post_tax_salary: userData.postTaxSalary ?? null,
//     spent: userData.spent ?? 0,
//     saved: userData.saved ?? 0,
//     invested: userData.invested ?? 0,
//     completed_onboarding: userData.hasCompletedOnboarding ?? false,
//   });

//   if (error) console.error('Supabase sync error:', error.message);
// }

// export async function fetchUserProfile(userId: string) {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   if (error) {
//     console.error('Fetch profile error:', error.message);
//     return null;
//   }

//   return data;
// }

import { UserData } from '@/contexts/UserContext';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// export async function syncUserProfile(userData: UserData, session: Session) {
//   if (!session?.user?.id) {
//     console.warn('[SYNC] No session.user.id found — aborting sync');
//     return null;
//   }

//   const updatePayload = {
//     id: session.user.id,
//     name: userData.name?.trim() ?? '',
//     age: userData.age ?? 0,
//     retirement_age: userData.retirementAge ?? 65,
//     birth_year: userData.birthYear ? `${userData.birthYear}-01-01` : '1900-01-01',
//     salary: userData.salary ?? null,
//     post_tax_salary: userData.postTaxSalary ?? null,
//     spent: userData.spent ?? 0,
//     saved: userData.saved ?? 0,
//     invested: userData.invested ?? 0,
//     completed_onboarding: userData.hasCompletedOnboarding ?? false,
//   };

//   console.log('[SYNCING USER PROFILE] Payload:', updatePayload);

//   const { error, data } = await supabase
//     .from('profiles')
//     .upsert(updatePayload);

//   if (error) {
//     console.error('[SYNC FAILED] Supabase error:', error.message);
//     return null;
//   }

//   if (!userData.name || !userData.birthYear || !userData.salary) {
//     console.warn('[SYNC ABORT] Missing required profile fields');
//     return;
//   }

//   console.log('[SYNC SUCCESS] Supabase response:', data);
//   return data;
// }

export async function syncUserProfile(userData: UserData, session: Session) {
  if (!session?.user?.id) {
    console.warn('[SYNC] No session.user.id found — aborting sync');
    return null;
  }

  // ⛔️ Abort early if any REQUIRED fields are still missing
  if (!userData.name || !userData.birthYear || !userData.age || !userData.retirementAge || !userData.salary) {
    console.warn('[SYNC ABORT] Missing required profile fields');
    return null;
  }

  const updatePayload = {
    id: session.user.id,
    name: userData.name.trim(),
    age: userData.age,
    retirement_age: userData.retirementAge,
    birth_year: `${userData.birthYear}-01-01`,
    salary: userData.salary,
    post_tax_salary: userData.postTaxSalary ?? null,
    spent: userData.spent ?? 0,
    saved: userData.saved ?? 0,
    invested: userData.invested ?? 0,
    completed_onboarding: userData.hasCompletedOnboarding ?? false,
  };

  console.log('[SYNCING USER PROFILE] Payload:', updatePayload);

  const { error, data } = await supabase
    .from('profiles')
    .upsert(updatePayload);

  if (error) {
    console.error('[SYNC FAILED] Supabase error:', error.message);
    return null;
  }

  console.log('[SYNC SUCCESS] Supabase response:', data);
  return data;
}

export async function fetchUserProfile(userId: string) {
  console.log('[FETCH USER PROFILE] Looking for user:', userId);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('[FETCH FAILED] Supabase error:', error.message);
    return null;
  }

  console.log('[FETCH SUCCESS] Data from Supabase:', data);
  return data;
}