# Architecture & Tech Stack

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui.
- **Backend**: Next.js API Routes, Server Actions.
- **Database**: PostgreSQL (Neon), Prisma ORM.
- **Authentication**: Auth.js, JWT sessions, OTP email verification.
- **Storage**: Cloudinary.
- **Deployment**: Vercel.

## Recommended Folder Structure
```text
src/
├── app/          # Next.js App Router
├── components/   # Shared UI components
├── modules/      # Feature-based logic
├── lib/          # Shared libraries (prisma, auth)
├── prisma/       # Database schema and migrations
├── server/       # Server-only logic / actions
├── services/     # API services / External integrations
├── hooks/        # Custom React hooks
├── store/        # State management
├── types/        # TypeScript interfaces/types
└── utils/        # Helper functions
```

## Development Principles
- **Production-First**: Focus on scalability and clean architecture.
- **Modular Design**: Avoid feature spaghetti.
- **Verification First**: Manual approval for Academic Premium and Researcher content.
- **Documentation**: Continuous updates to `docs/` folder.
