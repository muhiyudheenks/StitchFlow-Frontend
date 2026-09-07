
# StitchFlow Frontend

The StitchFlow frontend is a Next.js App Router application for garment-manufacturing workforce and operations management. It provides the public landing page, authentication flows, and role-specific dashboards for administrators, managers, and employees.

The frontend communicates with the StitchFlow backend API through Axios and uses Redux Toolkit for authentication and application state.

## Features

- Email/password login with OTP verification.
- Google login through `@react-oauth/google`.
- NextAuth Google route at `/api/auth/[...nextauth]`.
- Forgot-password, reset-password, and invited-user password setup flows.
- Role-based dashboards for `admin`, `manager`, and `employee` users.
- Admin workflows for employees, managers, production, inventory, reports, analytics, settings, and support.
- Manager workflows for employees, batches, tasks, reports, production, inventory, and support.
- Employee workflows for attendance, leave, performance, profile, salary, tasks, notifications, and support.
- React Query for server-state access and Framer Motion for UI transitions.
- Theme support and responsive dashboard layouts.

## Technology stack

- Next.js `16.2.10`
- React `19.2.4`
- TypeScript
- Redux Toolkit and React Redux
- TanStack React Query
- Axios
- Tailwind CSS 4
- React Hook Form and Zod
- `@react-oauth/google`
- NextAuth `4.24.15`
- Framer Motion
- React Icons
- Next Themes

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page. |
| `/login` | Email/password and Google login. |
| `/otp` | Login or password-reset OTP verification. |
| `/forgot-password` | Start password reset. |
| `/reset-password` | Set a new password after OTP verification. |
| `/set-password` | Invited-user password setup. |
| `/set-password/[token]` | Token-based password setup. |
| `/dashboard` | Role-based dashboard redirect. |
| `/dashboard/admin` | Administrator dashboard. |
| `/dashboard/admin/[tab]` | Administrator dashboard sections. |
| `/dashboard/manager` | Manager dashboard. |
| `/dashboard/manager/[tab]` | Manager dashboard sections. |
| `/dashboard/manager/batches/[batchId]` | Manager batch details and tasks. |
| `/dashboard/employee` | Employee dashboard. |
| `/dashboard/employee/[tab]` | Employee dashboard sections. |
| `/api/auth/[...nextauth]` | NextAuth Google authentication route. |

## Project structure

```text
Frontend/
├── public/                         # Public static assets
├── src/
│   ├── app/                        # Next.js App Router pages and providers
│   ├── config/                     # Axios and application configuration
│   ├── hooks/                      # Shared hooks
│   ├── modules/
│   │   ├── admin/                  # Administrator UI and services
│   │   ├── attendance/             # Attendance views and services
│   │   ├── auth/                   # Login, OTP, reset, and auth state
│   │   ├── employee/               # Employee dashboard and features
│   │   ├── inventory/              # Inventory UI
│   │   ├── landing/                # Public landing page
│   │   ├── manager/                # Manager dashboard and features
│   │   └── production/             # Production UI
│   ├── services/                   # Shared API and local-storage services
│   ├── shared/                     # Shared components, constants, and types
│   ├── store/                      # Redux store, hooks, and slices
│   ├── type/                       # Shared TypeScript types
│   └── utils/                      # Validation and utility functions
├── next.config.ts
├── package.json
└── .env.example
```

## Authentication and state

The frontend supports two backend-backed authentication paths:

1. Email/password login sends the user to the OTP page. Successful OTP verification stores the JWT and public user data, updates the Redux auth slice, and redirects to `/dashboard`.
2. Google login sends the Google credential to the backend. The backend verifies the credential, checks the existing MongoDB user, returns a JWT, and the frontend stores the authenticated user and redirects to `/dashboard`.

The database user remains the source of truth for role and account status. The dashboard layout also checks the current role before allowing a role-specific route.

Redux is configured in `src/store/store.ts` with:

- `authSlice`: current user, authentication state, pending OTP context, reset email, and request errors.
- `appSlice`: application-level state such as authentication intent.

`AuthInitializer` restores the Redux auth state from local storage when the application starts. Axios uses `withCredentials: true` and adds a bearer token from local storage when available.

## Environment variables

Copy the example file before starting the application:

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL. Local example: `http://localhost:5000`. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Browser Google OAuth client ID. |
| `GOOGLE_CLIENT_ID` | Server-side Google provider configuration. |
| `GOOGLE_CLIENT_SECRET` | NextAuth Google provider secret. |
| `NEXTAUTH_URL` | NextAuth application URL. |
| `NEXTAUTH_SECRET` | NextAuth session secret. |
| `BACKEND_API_URL` | Optional backend URL used by the NextAuth route; falls back to `NEXT_PUBLIC_API_URL`. |

Do not commit `.env` files or OAuth secrets. The public Google client ID may be exposed to the browser; the client secret and NextAuth secret must remain server-side.

## Local development

### Prerequisites

- Node.js 20 or a compatible current Node.js release.
- npm.
- A running StitchFlow backend, normally at `http://localhost:5000`.

### Install and run

```bash
npm ci
npm run dev
```

Open <http://localhost:3000> after the development server starts.

The backend repository must be configured and running separately. See the backend repository README for MongoDB, JWT, OTP email, and Google verification configuration.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create the optimized production build. |
| `npm run start` | Start the production Next.js server. |
| `npm run lint` | Run ESLint using the repository flat configuration. |

There is currently no automated test script in this repository.

## Production deployment

The repository includes `.github/workflows/deploy.yml`. On pushes to `main`, it:

1. Uses Node.js 20.
2. Runs `npm ci` and `npm run build` in GitHub Actions.
3. Connects to EC2 over SSH.
4. Pulls the `main` branch in `/home/ubuntu/StitchFlow-Frontend`.
5. Installs dependencies, builds again, and restarts the PM2 process `stitchflow-frontend`.

The Nginx configuration in the parent workspace proxies frontend traffic to `localhost:3000` and serves the production host `stitchflow.space`.

The workflow expects these GitHub Actions secrets:

- `EC2_HOST`
- `EC2_USERNAME`
- `EC2_SSH_KEY`

No PM2 ecosystem file or Docker configuration is committed in this repository.

## Development notes

- Keep frontend role checks aligned with backend authorization; frontend route guards are not a replacement for backend authorization.
- Keep API paths synchronized with the backend repository. Some existing feature service paths require reconciliation with backend route registrations.
- Run `npm run lint` and `npm run build` before opening a pull request.

## Repository

GitHub: <https://github.com/muhiyudheenks/StitchFlow-Frontend>

