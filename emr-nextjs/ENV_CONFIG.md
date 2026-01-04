# EMR Hospital - Environment Configuration Guide

## Environment Variables Setup

Environment variables are used to configure the application for different environments (development, staging, production).

### File Structure

```
.env.local          # Local development (NOT committed to git)
.env.example        # Template for developers (committed to git)
```

### Available Variables

#### Public Variables (NEXT_PUBLIC_*)
These are exposed to the browser and should not contain sensitive data.

```env
# Application Settings
NEXT_PUBLIC_APP_NAME=EMR Hospital
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**Usage in Code:**
```typescript
// src/app/layout.tsx
const appName = process.env.NEXT_PUBLIC_APP_NAME; // "EMR Hospital"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;   // "http://localhost:3000"
```

#### Private Variables (Server-Only)
These should NOT have NEXT_PUBLIC_ prefix and are only available on the server.

```env
# Authentication (Server-side only)
AUTH_SECRET=demo-secret-key-change-in-production
AUTH_TOKEN_EXPIRY=86400

# Database (when added)
DATABASE_URL=postgresql://user:password@localhost:5432/emr_db
```

**Usage in Code:**
```typescript
// src/app/api/route.ts (Server-side only)
const secret = process.env.AUTH_SECRET; // Only works on server
```

### Environment-Specific Configurations

#### Development (.env.local)
```env
NEXT_PUBLIC_APP_NAME=EMR Hospital
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken
AUTH_SECRET=demo-secret-key-for-dev
AUTH_TOKEN_EXPIRY=86400
NODE_ENV=development
```

#### Staging (.env.staging)
```env
NEXT_PUBLIC_APP_NAME=EMR Hospital
NEXT_PUBLIC_API_URL=https://staging.emr-hospital.local
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken
AUTH_SECRET=change-this-in-staging
AUTH_TOKEN_EXPIRY=86400
NODE_ENV=production
```

#### Production (.env.production)
```env
NEXT_PUBLIC_APP_NAME=EMR Hospital
NEXT_PUBLIC_API_URL=https://emr-hospital.com
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken
AUTH_SECRET=generate-long-random-secret-in-production
AUTH_TOKEN_EXPIRY=86400
NODE_ENV=production
```

### Deployment Instructions

#### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Go to Project Settings → Environment Variables
3. Add environment variables for different deployment environments:
   - Development (Preview)
   - Staging
   - Production

```bash
# Vercel CLI
vercel env add NEXT_PUBLIC_API_URL
vercel env add AUTH_SECRET
```

#### Docker/Self-Hosted
```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production
RUN npm install && npm run build
CMD ["npm", "start"]
```

Run with:
```bash
docker run -e NEXT_PUBLIC_API_URL="https://api.example.com" \
           -e AUTH_SECRET="your-secret" \
           emr-hospital:latest
```

### Best Practices

1. **Never commit secrets to git**
   - Add `.env.local` to `.gitignore`
   - Share `.env.example` instead

2. **Use NEXT_PUBLIC_ for client-side variables only**
   - These are exposed to browser, so no sensitive data
   - Always assume these are visible to users

3. **Rotate secrets regularly**
   - Change AUTH_SECRET in production quarterly
   - Use secrets management (GitHub Secrets, HashiCorp Vault)

4. **Type-safe environment variables**
   ```typescript
   // src/lib/env.ts
   export const env = {
     appName: process.env.NEXT_PUBLIC_APP_NAME || "EMR",
     apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
     authSecret: process.env.AUTH_SECRET,
   } as const;
   ```

### Environment Variables Used in Application

| Variable | Type | Purpose | Default |
|----------|------|---------|---------|
| `NEXT_PUBLIC_APP_NAME` | String | Application branding | "EMR Hospital" |
| `NEXT_PUBLIC_API_URL` | URL | API/App base URL for metadata | "http://localhost:3000" |
| `NEXT_PUBLIC_AUTH_COOKIE_NAME` | String | Auth cookie identifier | "authToken" |
| `NEXT_PUBLIC_APP_VERSION` | String | App version for display | "1.0.0" |
| `AUTH_SECRET` | String | Secret for auth token generation | (required in prod) |
| `AUTH_TOKEN_EXPIRY` | Number | Token expiry time (seconds) | 86400 (24h) |
| `NODE_ENV` | String | Environment (development/production) | "development" |

### Accessing Variables

**Server Components/Routes:**
```typescript
// Can access both NEXT_PUBLIC_* and private variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.AUTH_SECRET; // Server-only
```

**Client Components:**
```typescript
// Can only access NEXT_PUBLIC_* variables
"use client";
const appName = process.env.NEXT_PUBLIC_APP_NAME;
// process.env.AUTH_SECRET would be undefined
```

**Static/Dynamic Pages:**
```typescript
export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    // ...
  };
}
```

### Troubleshooting

**Problem: Environment variable is undefined**
- Check if variable name is correct
- Ensure .env.local file exists in project root
- Restart development server after changing .env.local
- Remember: NEXT_PUBLIC_* only accessible in client components if prefixed

**Problem: Wrong URL in production**
- Verify NEXT_PUBLIC_API_URL is set in production environment
- Check deployment platform environment variables
- Use `console.log(process.env.NEXT_PUBLIC_API_URL)` in server component to debug

**Problem: Secrets leaked to frontend**
- Never use process.env.SECRET (without NEXT_PUBLIC_) in client components
- Use TypeScript to enforce server-only modules
- Review build output to ensure no secrets are exposed

---

**Last Updated**: 2026-01-04  
**Next.js Version**: 16.1.1  
**Status**: Production Ready
