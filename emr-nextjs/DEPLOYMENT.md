# Deployment Guide - EMR Hospital System

## Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Vercel account (for deployment)
- GitHub repository (for CI/CD)

## Development Setup

```bash
# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env.local and update values
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Deployment to Vercel

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel:
   - Visit https://vercel.com/new
   - Select "Next.js" framework
   - Import your repository
   - Configure environment variables in Vercel dashboard
   - Click "Deploy"

### Option 2: Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the CLI prompts and configure your project

### Option 3: Deploy from Command Line

```bash
# Login to Vercel
vercel login

# Deploy current project
vercel --prod

# View deployment logs
vercel logs
```

## Environment Variables for Deployment

Set these in Vercel Project Settings > Environment Variables:

```
NEXT_PUBLIC_APP_NAME=EMR Hospital
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken
NEXT_PUBLIC_APP_VERSION=1.0.0
AUTH_SECRET=your-secret-key
AUTH_TOKEN_EXPIRY=86400
NODE_ENV=production
```

## Monitoring & Logs

- View deployment logs: https://vercel.com/dashboard
- Check application health: https://your-domain.com
- Monitor performance: https://vercel.com/analytics

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version`
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`
- Check for TypeScript errors: `npm run build`

### Environment Variables Not Working
- Ensure variables are set in Vercel dashboard
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after changing variables

### Performance Issues
- Check Vercel Analytics
- Review Next.js Image Optimization settings
- Enable automatic ISR (Incremental Static Regeneration)

## Best Practices for Production

1. **Security**
   - Never commit `.env.local` to version control
   - Use strong `AUTH_SECRET` values
   - Enable HTTPS (automatic on Vercel)

2. **Performance**
   - Enable automatic image optimization
   - Use ISR for frequently updated pages
   - Monitor Core Web Vitals in Vercel Analytics

3. **Reliability**
   - Set up error monitoring
   - Configure automated deployments
   - Use preview deployments for testing

4. **Maintenance**
   - Regularly update dependencies
   - Monitor security vulnerabilities
   - Keep Next.js updated

## CI/CD Pipeline

The project uses GitHub Actions for automatic deployment:

1. Push to feature branch
2. GitHub Actions runs tests and lint
3. Create Pull Request
4. Merge to main branch
5. Automatic deployment to Vercel

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments tab
4. Click the three dots on desired deployment
5. Select "Promote to Production"

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
