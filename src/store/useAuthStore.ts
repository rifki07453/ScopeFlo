import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { hashPassword, generateSalt } from '@/utils/crypto';

export type UserRole = 'super_admin' | 'admin' | 'agency' | 'personal';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserRecord extends UserProfile {
  passwordHash: string;
  salt: string;
}

// Pre-computed dummy user credentials for security and instant client-side loading
const preSeededUsers: UserRecord[] = [
  {
    id: 'usr-super-admin',
    name: 'Super Admin ScopeFlo',
    email: 'superadmin@scopeflo.com',
    role: 'super_admin',
    createdAt: '2026-01-01T00:00:00Z',
    passwordHash: '5bff7504f0d6a5b752f8e423463c2c45bc5af649318c72d352ff87f6f94c6804', // Password: SuperAdmin123!
    salt: 'super_salt_123',
  },
  {
    id: 'usr-admin',
    name: 'Admin ScopeFlo',
    email: 'admin@scopeflo.com',
    role: 'admin',
    createdAt: '2026-01-10T00:00:00Z',
    passwordHash: '6fbbd01b02be62272437c4a3c6950365e274834f9ee12176777af8285c7f9016', // Password: AdminPassword123!
    salt: 'admin_salt_456',
  },
  {
    id: 'usr-agency',
    name: 'Agency User (CreateDigital)',
    email: 'agency@scopeflo.com',
    role: 'agency',
    createdAt: '2026-02-15T00:00:00Z',
    passwordHash: '418ffd82f2c3020626136f4174fa2d39ad8a4efc201a2c788076903f9a8e3fe5', // Password: AgencyPassword123!
    salt: 'agency_salt_789',
  },
  {
    id: 'usr-personal',
    name: 'Rifki (Personal User)',
    email: 'personal@scopeflo.com',
    role: 'personal',
    createdAt: '2026-03-20T00:00:00Z',
    passwordHash: 'cb95c574e5de20f257a2a1e5d5546e27154caf7f5a656ecd01544ae103749b82', // Password: PersonalPassword123!
    salt: 'personal_salt_abc',
  },
];

interface AuthStore {
  isLoggedIn: boolean;
  user: UserProfile | null;
  users: UserRecord[];
  
  // Actions
  login: (email: string, passwordPlain: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, passwordPlain: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleLogin: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      users: preSeededUsers, // Initialized with seed users. Persist middleware will merge this correctly.
      
      login: async (email, passwordPlain) => {
        const emailLower = email.toLowerCase().trim();
        // Fallback merge: if local storage doesn't have the preSeededUsers, merge them in
        const currentUsers = get().users;
        const mergedUsers = [...currentUsers];
        for (const preUser of preSeededUsers) {
          if (!mergedUsers.some(u => u.email.toLowerCase() === preUser.email.toLowerCase())) {
            mergedUsers.push(preUser);
          }
        }
        if (mergedUsers.length !== currentUsers.length) {
          set({ users: mergedUsers });
        }

        const userRecord = mergedUsers.find((u) => u.email.toLowerCase() === emailLower);
        if (!userRecord) {
          return { success: false, error: 'Email atau password salah' };
        }
        
        // Verify password
        const hash = await hashPassword(passwordPlain, userRecord.salt);
        if (hash !== userRecord.passwordHash) {
          return { success: false, error: 'Email atau password salah' };
        }
        
        const profile: UserProfile = {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
          createdAt: userRecord.createdAt,
        };
        
        set({ isLoggedIn: true, user: profile });
        return { success: true };
      },
      
      register: async (name, email, passwordPlain) => {
        const emailLower = email.toLowerCase().trim();
        // Check if user already exists
        const exists = get().users.some((u) => u.email.toLowerCase() === emailLower);
        if (exists) {
          return { success: false, error: 'Email sudah terdaftar' };
        }
        
        const salt = generateSalt();
        const passwordHash = await hashPassword(passwordPlain, salt);
        
        const newUser: UserRecord = {
          id: Math.random().toString(36).substring(2, 9),
          name: name.trim(),
          email: emailLower,
          role: 'personal', // Defaults to personal role
          passwordHash,
          salt,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          users: [...state.users, newUser],
        }));
        
        return { success: true };
      },
      
      logout: () => set({ isLoggedIn: false, user: null }),
      
      toggleLogin: () => {
        const state = get();
        if (state.isLoggedIn) {
          set({ isLoggedIn: false, user: null });
        } else {
          // Log in with the personal user (Rifki) by default or first user
          const defaultUser = state.users.find(u => u.role === 'personal') || state.users[0] || preSeededUsers[3];
          set({ 
            isLoggedIn: true, 
            user: { 
              id: defaultUser.id, 
              name: defaultUser.name, 
              email: defaultUser.email, 
              role: defaultUser.role,
              createdAt: defaultUser.createdAt 
            } 
          });
        }
      },
    }),
    {
      name: 'scopeflo-auth-storage',
    }
  )
);
