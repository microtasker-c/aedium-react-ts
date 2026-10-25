import { createClient } from '@neondatabase/neon-js';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react';
import type { Database } from '../types/database';


export const client = createClient<Database>({
    auth: {
        url: import.meta.env.VITE_NEON_AUTH_URL,
        adapter: BetterAuthReactAdapter(),
        allowAnonymous: true
    },
    dataApi: {
        url: import.meta.env.VITE_NEON_DATA_API_URL,
    },
});

export const authClient = client.auth;


// npx @neondatabase/neon-js gen-types \
//   --db-url "postgresql://neondb_owner:npg_kSRWx2fa8TqE@ep-wild-dawn-a1vac3xf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" \
//   --output src/types/database.ts