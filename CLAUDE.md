# Project Guide: IKA TEUAS UPI Website

**Version:** 2.1  
**Date:** January 8, 2025  
**Last Updated:** NestJS backend migration completed

## 1. Overview

This document provides comprehensive context, conventions, and workflow for the **IKA TEUAS UPI alumni platform**. The project is a **sophisticated frontend with disconnected backend** - beautiful UI exists but needs integration work.

**Current Status:** ⚠️ **FRONTEND COMPLETE, NESTJS BACKEND READY** - UI is polished, NestJS backend migrated, but no API integration yet.

For detailed features and requirements, refer to **[PRD.md](PRD.md)**.  
For implementation phases, see **[plans/](plans/)** directory.

## 2. Core Mandates for AI Contribution

As an AI assistant, you must adhere to these principles:

1. **Integration Focus:** The **primary goal** is connecting the beautiful frontend to the backend API. Frontend UI is complete but uses mock data. Backend exists but isn't connected.

2. **Maintain Architecture:** The project uses a sophisticated **Turbo monorepo** structure. The architecture is sound - focus on integration, not restructuring.

3. **TypeScript First:** Both frontend and backend are **fully TypeScript**. Maintain strict typing when adding integration code.

4. **API Integration Priority:** The main work needed is:
   - Connect frontend forms to backend endpoints
   - Fix endpoint mismatches (frontend calls `/api/auth/*`, backend has `/user/*`)
   - Replace mock data with real API calls
   - Implement proper authentication flow

5. **Test Integration:** Always test API connections and run `npm run lint` and `npm run type-check`.

6. **UI/UX Flexibility:** The frontend is well-designed but may need adjustments. Be open to UI improvements while focusing on backend integration.

## 3. Technology Stack

### Architecture
- **Monorepo:** Turbo-managed workspace with 3 packages
- **Package Manager:** npm with workspaces
- **Build System:** Turbo for parallel builds and caching

### Backend (`@teuas/backend`)
- **Language:** TypeScript (100% coverage)
- **Framework:** NestJS (modern Node.js framework)
- **Port:** 4000 (to avoid conflict with frontend on 3000)
- **Database:** MariaDB (to be integrated)
- **Authentication:** To be implemented with JWT
- **File Upload:** To be implemented
- **Email:** To be implemented

### Frontend (`@teuas/frontend`)
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript with strict typing
- **Styling:** Tailwind CSS 4.0
- **Components:** shadcn/ui (40+ components)
- **Authentication:** NextAuth.js with custom provider
- **Forms:** React Hook Form with Zod validation
- **Animations:** Framer Motion

### Shared (`@teuas/shared`)
- **Types:** Centralized type definitions
- **Utils:** Logger and common utilities
- **Constants:** Shared configuration

## 4. Project Structure

```
teuas-website/                    # Turbo monorepo root
├── backend/                      # @teuas/backend (NestJS)
│   ├── src/
│   │   ├── app.module.ts         # Main app module
│   │   ├── app.controller.ts     # App controller
│   │   ├── app.service.ts        # App service
│   │   └── main.ts               # Application entry point
│   ├── test/                     # E2E tests
│   ├── dist/                     # Compiled JavaScript
│   ├── nest-cli.json             # NestJS CLI configuration
│   └── package.json
├── frontend/                     # @teuas/frontend
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── (18 implemented pages)
│   │   │   ├── api/auth/         # NextAuth configuration
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── features/         # Feature-specific components
│   │   │   ├── layout/           # Header, Footer, etc.
│   │   │   └── common/           # Shared components
│   │   ├── lib/
│   │   │   ├── api/              # API client and endpoints
│   │   │   ├── auth/             # NextAuth configuration
│   │   │   ├── constants/        # App configuration
│   │   │   └── validations/      # Zod schemas
│   │   └── types/                # Frontend type definitions
│   └── public/                   # Static assets
├── shared/                       # @teuas/shared
│   ├── src/
│   │   ├── types/                # Shared types
│   │   ├── utils/                # Logger, utilities
│   │   └── constants/            # Shared constants
│   └── dist/                     # Compiled output
├── plans/                        # Implementation documentation
├── turbo.json                    # Turbo configuration
└── package.json                  # Root workspace config
```

## 5. Development Workflow

### Quick Start
```bash
# Install all dependencies
npm install

# Start all services in development
npm run dev

# Or start individual services
npm run frontend    # Frontend only
npm run backend     # Backend only
npm run shared      # Shared package watch mode
```

### Available Commands
```bash
# Development
npm run dev           # All packages in development mode
npm run build         # Build all packages
npm run lint          # Lint all packages
npm run type-check    # TypeScript checking
npm run format        # Format with Prettier

# Individual packages
npm run frontend      # turbo dev --filter=@teuas/frontend
npm run backend       # turbo dev --filter=@teuas/backend
npm run shared        # turbo dev --filter=@teuas/shared
```

### Package-Specific Commands
```bash
# Backend (@teuas/backend)
cd backend
npm run dev           # NestJS development mode with watch
npm run build         # NestJS build compilation
npm run start         # Run compiled JavaScript
npm run start:prod    # Production mode

# Frontend (@teuas/frontend)
cd frontend
npm run dev           # Next.js dev with Turbopack
npm run build         # Next.js production build
npm run start         # Next.js production server

# Shared (@teuas/shared)
cd shared
npm run dev           # TypeScript watch mode
npm run build         # Compile TypeScript
```

## 6. Implemented Features

### ✅ Frontend Complete (18 Pages)

**Core Pages:**
- Homepage with hero section and highlights ✅
- About page with mission/vision ✅
- Contact page with services info ✅

**Authentication UI:**
- Login page with beautiful forms ✅ (but no backend connection ❌)
- Register page with validation ✅ (but no backend connection ❌)
- NextAuth setup exists ✅ (but endpoints don't match ❌)

**Alumni Features:**
- Alumni directory with filters ✅ (using mock data ❌)
- Individual alumni profiles ✅ (using mock data ❌)
- Alumni statistics display ✅ (using mock data ❌)

**Content Pages:**
- News section ✅ (using mock data ❌)
- Events system ✅ (using mock data ❌)
- Media gallery ✅ (using mock data ❌)
- Scholarships ✅ (using mock data ❌)
- Privacy/Terms pages ✅

### ❌ Missing API Integration
- **No backend-frontend communication**
- **No real authentication** (forms exist but don't work)
- **No real data** (everything uses mock data)
- **Endpoint mismatches** (frontend → `/api/auth/*`, backend → `/user/*`)
- **No file upload** working
- **No email notifications** connected

## 7. Database Schema

**Current Database:** MariaDB (`TEUAS`)

**Users Table Structure:**
```sql
Users (
  id: number (PK),
  email: string (unique),
  fullName: string,
  password: string (hashed),
  graduationYear: number?,
  nim: string?,
  major: string?,
  phoneNumber: string?,
  address: string?,
  profilePhoto: string?,
  role: 'admin' | 'user',
  currentCompany: string?,
  position: string?
)
```

## 8. Coding Conventions

### TypeScript
- **Strict typing:** All functions, props, and variables must be typed
- **Interface naming:** Use `PascalCase` (e.g., `UserProfile`, `ApiResponse`)
- **Enums:** Use `const` assertions for better type safety

### React/Next.js
- **Components:** `PascalCase` with descriptive names
- **Props:** Use interfaces, not types for component props
- **File naming:** `kebab-case` for files, `PascalCase` for components

### API Design
- **RESTful:** Follow REST principles
- **Endpoints:** `/api/users`, `/api/users/:id`
- **Responses:** Consistent `ApiResponse<T>` structure
- **Error handling:** Proper HTTP status codes

### Styling
- **Tailwind:** Utility-first approach
- **Components:** Use shadcn/ui for consistency
- **Responsive:** Mobile-first design
- **Dark mode:** Ready for implementation

## 9. Current Status & Next Steps

### ✅ Completed
- **Frontend UI** - Complete, beautiful, responsive
- **NestJS Backend Migration** - Fresh NestJS setup with TypeScript
- **Turborepo Integration** - Backend fully integrated with monorepo
- **Component library** - 40+ shadcn/ui components
- **Type safety** - Strict TypeScript across all packages
- **Port Configuration** - Backend on port 4000, Frontend on port 3000

### 🚨 **CRITICAL WORK NEEDED**
1. **Build NestJS API** - Create controllers, services, and modules
2. **Database Integration** - Connect MariaDB with TypeORM or Prisma
3. **Authentication System** - JWT auth with NestJS Guards
4. **API Endpoints** - Create REST endpoints for all frontend features
5. **Replace mock data** - Connect frontend to real NestJS API calls
6. **Environment setup** - Production configuration

### 🔄 Future Enhancements (After Integration)
- Admin dashboard for content management
- Advanced search and filtering  
- Email subscription system
- Performance optimizations
- Testing suite implementation

### ⚠️ **NOT Deployment Ready Yet**
**Frontend** is deployment ready:
- SEO optimization ✅
- Performance considerations ✅
- Beautiful responsive UI ✅

**Backend** needs work:
- Fresh NestJS setup ✅ 
- No database connection ❌
- No API endpoints ❌
- Not connected to frontend ❌

## 10. Important Notes

### For AI Assistants
1. **This is a DISCONNECTED project** - beautiful frontend exists, fresh NestJS backend, but no integration
2. **PRIMARY GOAL: Build NestJS API and connect to frontend** - frontend ready, backend needs development
3. **Focus on NestJS Development:** Create modules, controllers, services, database integration
4. **TypeScript is non-negotiable** - maintain strict typing during development
5. **Test your changes** - always run `npm run lint` and `npm run type-check`
6. **Backend runs on port 4000** - frontend uses port 3000

### Development Guidelines
- **Read existing code** before making changes
- **Follow established patterns** in the codebase
- **Update types** when adding new features
- **Consider cross-package implications** when making changes
- **Document significant changes** in commit messages

---

**Remember:** This is a sophisticated but **disconnected** application. The frontend is polished, NestJS backend is fresh and ready, but they don't communicate yet. Focus on **NestJS API development** and **integration work** to make them communicate properly.