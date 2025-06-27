// import { getData, saveData } from '@/services/storage';
// import { supabase } from '@/services/supabase';
// import { fetchUserProfile, syncUserProfile } from '@/services/syncUserData';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import Toast from 'react-native-toast-message';
// import { useAuth } from './AuthContext';

// export type UserData = {
//   name?: string;
//   age?: number;
//   birthYear?: string;
//   retirementAge?: number;
//   salary?: number;
//   postTaxSalary?: number;
//   spent?: number;
//   saved?: number;
//   invested?: number;
// };

// type UserContextType = {
//   userData: UserData;
//   setUserData: React.Dispatch<React.SetStateAction<UserData>>;
// };

// const defaultContext: UserContextType = {
//   userData: {},
//   setUserData: () => { },
// };

// const UserContext = createContext<UserContextType>(defaultContext);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [userData, setUserData] = useState<UserData>({});
//   const { session } = useAuth();

//   async function ensureProfileExists(userId: string) {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('id')
//       .eq('id', userId)
//       .single();

//     if (!data && !error) {
//       await supabase.from('profiles').insert({ id: userId });
//       console.log('Created new profile row');
//     }
//   }

//   useEffect(() => {
//     (async () => {
//       const stored = await getData('userData');
//       if (stored) setUserData(JSON.parse(stored));
//     })();
//   }, []);

//   useEffect(() => {
//     if (Object.keys(userData).length > 0) {
//       saveData('userData', JSON.stringify(userData));
//       if (session?.user) {
//         syncUserProfile(userData, session);
//         Toast.show({
//           type: 'success',
//           text1: 'Profile Updated',
//           text2: 'Your profile has been synced successfully.',
//         });
//       }
//     }
//   }, [userData]);

//   useEffect(() => {
//     (async () => {
//       if (session?.user?.id) {
//         await ensureProfileExists(session.user.id);
//         const profile = await fetchUserProfile(session.user.id);
//         if (profile) {
//           setUserData({
//             name: profile.name,
//             age: profile.age,
//             birthYear: profile.birth_year,
//             retirementAge: profile.retirement_age,
//             salary: profile.salary,
//             postTaxSalary: profile.post_tax_salary,
//             spent: profile.spent || 0,
//             saved: profile.saved || 0,
//             invested: profile.invested || 0,
//           });
//           Toast.show({
//             type: 'success',
//             text1: 'Profile Loaded',
//             text2: 'Your profile data has been loaded successfully.',
//           });
//         }
//       }
//     }
//     )();
//   }, [session]);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import { getData, saveData } from '@/services/storage';
import { supabase } from '@/services/supabase';
import { fetchUserProfile } from '@/services/syncUserData';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from './AuthContext';

export type UserData = {
  name?: string;
  age?: number;
  birthYear?: string;
  retirementAge?: number;
  salary?: number;
  postTaxSalary?: number;
  spent?: number;
  saved?: number;
  invested?: number;
  hasCompletedOnboarding?: boolean;
};

type UserContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const defaultContext: UserContextType = {
  userData: {},
  setUserData: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);
  const { session } = useAuth();

  async function ensureProfileExists(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!data && !error) {
      await supabase.from('profiles').insert({ id: userId });
      console.log('✅ Created new profile row');
    }
  }

  // Load from local storage on first mount
  useEffect(() => {
    (async () => {
      const stored = await getData('userData');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserData(prev => ({ ...prev, ...parsed }));
        } catch (err) {
          console.error('Failed to parse stored userData:', err);
        }
      }
    })();
  }, []);

  // Save changes locally and sync with Supabase if logged in
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      saveData('userData', JSON.stringify(userData));

      // if (session?.user) {
      //   syncUserProfile(userData, session);
      //   Toast.show({
      //     type: 'success',
      //     text1: 'Profile Updated',
      //     text2: 'Your profile has been synced successfully.',
      //   });
      // }
    }
  }, [userData]);

  // Fetch profile only once on session start
  useEffect(() => {
    (async () => {
      if (session?.user?.id && !hasFetchedProfile) {
        await ensureProfileExists(session.user.id);
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          // setUserData((prev) => ({
          //   ...prev,
          //   name: profile.name,
          //   age: profile.age,
          //   birthYear: profile.birth_year,
          //   retirementAge: profile.retirement_age,
          //   salary: profile.salary,
          //   postTaxSalary: profile.post_tax_salary,
          //   spent: profile.spent || 0,
          //   saved: profile.saved || 0,
          //   invested: profile.invested || 0,
          //   hasCompletedOnboarding: profile.hasCompletedOnboarding ?? false
          // }));
          setUserData((prev) => ({
            ...prev,
            ...profile,
          }));

          Toast.show({
            type: 'success',
            text1: 'Profile Loaded',
            text2: 'Your profile data has been loaded successfully.',
          });
        }

        setHasFetchedProfile(true);
      }
    })();
  }, [session, hasFetchedProfile]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);