# Database Schema (Initial Draft)

## Core Models

### User
- id, name, email, emailVerified, image, role (GUEST, USER, PREMIUM, ACADEMIC_PREMIUM, RESEARCHER, ADMIN)
- accounts (Account[]), sessions (Session[])
- academicVerificationStatus (PENDING, APPROVED, REJECTED)
- institutionalEmail, institutionDetails, verificationNote, proofUrl

### Account (Auth.js)
- id, userId, type, provider, providerAccountId, etc.

### Session (Auth.js)
- id, sessionToken, userId, expires

### VerificationToken (Auth.js / OTP)
- identifier (email), token (6-digit code), expires

### ResearchPaper
- id, title, abstract, content, pdfUrl, datasetUrl, status (DRAFT, PENDING_APPROVAL, PUBLISHED)
- visibility (PUBLIC, PREMIUM, PRIVATE)
- authorId (User)
- category, tags, publishedAt

### Event
- id, title, description, date, location, seatCount, bannerUrl
- type (WORKSHOP, LECTURE, CONFERENCE, SYMPOSIUM)

### Project
- id, title, description, progress, status, authorId
- collaborators (many-to-many User)

### Mentorship
- id, mentorId, title, description, status

### StoreProduct
- id, name, description, price, stock, category, images

### GalleryMedia
- id, url, caption, type (IMAGE, VIDEO), category (EVENTS, RESEARCH, SPACE, PROJECT)
