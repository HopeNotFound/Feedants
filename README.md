# Feedants - Competition Details Screen (Full-Stack Module)

> **Technical Assignment - Full Stack Development Intern**  
> Company: **Feedants**  
> Feature: **Competition Details Screen - Dynamic, Concurrency-Safe Full-Stack Implementation**  
> Tech Stack: **Node.js, Express.js, MongoDB (Mongoose), React 19, Tailwind CSS, Vite**

---

## 📌 Overview

This repository contains a full-stack implementation of the **Feedants Classical Dance Competition Details Screen** as specified in the assignment PDF. The system provides a responsive frontend styled with **Tailwind CSS** that matches the provided design reference pixel-for-pixel, coupled with an **Express.js + MongoDB** backend handling live competition state, atomic registrations, concurrency control, and video submissions.

---

## 📱 Features & Visual Fidelity (Matching PDF Design)

- **Mobile Frame & Responsive Web View**:
  - **Mobile Frame**: Pixel-accurate mockup matching Page 3 of the PDF (Status bar `9:41`, Signal, WiFi, Battery, Back button, Language pill `ENG | हिंदी`, `✔ Registered` badge).
  - **Responsive Web**: Full-width responsive view that adapts fluidly to desktop monitors, tablets, and mobile devices.
- **Dynamic Competition State & Availability**:
  - Live data served directly from the backend API (`/api/competitions/current`).
  - Title: *"Feedants Classical Dance"*, Category tags (*Dance*, *Multi-Win*, *🏆 Winners get certificate*).
  - Pricing Breakdown: Prize Pool (`₹ 1,500`), Entry Fee (`₹ 99`), Remaining Spots (`⚠️ Only 19 spots left`), Dynamic Progress Bar (`1 / 20 Booked`).
- **Interactive Judge Profile & Video**:
  - Judge details for **Guru Manju Dubey** (Professional Kathak Dancer, 12+ Years Experience).
  - Functional *"Intro Video"* modal with embedded performance stream.
- **Real-Time Registration Countdown**:
  - Live ticking countdown timer (`01d : 06h : 28m : 32s`) updating every second with animated *"⏰ Hurry up!"* urgency indicator.
- **Important Dates Grid (2x2)**:
  - Register Before: `10 Aug 26, 11:50 PM`
  - Submission Starts: `11 Aug 26, 04:00 AM`
  - Submission Ends: `20 Aug 26, 11:55 PM`
  - Result Date: `1 Sept 26, 11:50 PM`
- **Previous Winners Carousel**:
  - Horizontal scrolling row with ranked participants (Riya Shah 1st, Aarav Mehta 2nd, Neha Verma 3rd, Ishita C Finalist) with trophy & medal badges.
- **Interactive Tab Navigation**:
  - **About Competition**: Overview with functional *"View more / View less"* accordion toggle.
  - **Judging Parameters**: Scoring breakdown (Taala & Rhythm 30%, Bhava & Abhinaya 25%, Mudras & Posture 20%, Costume 15%, Choreography 10%).
  - **Rules & Eligibility**: Duration guidelines, landscape recording criteria, audio standards, and submission deadlines.
- **Rewards Breakdown & Razorpay Trust Badge**:
  - Monetary prize distribution for ranks 1 to 6 (1st: ₹550, 2nd: ₹300, 3rd: ₹240, 4th: ₹200, 5th: ₹130, 6th: ₹80).
  - Disclaimer note for paid participants.
  - Interactive modal: *"How will you receive prize money?"*.
  - Razorpay verified security badge with refund policy.
- **Refer & Earn Module**:
  - Referral URL (`https://feedants.com/c/classicd22`) with one-click **Copy Link** (copies to clipboard with success toast).
  - Social share action with Web Share API fallback.
- **Hear From Our Users**:
  - Interactive testimonials modal featuring participant reviews and 5-star ratings.
- **Dynamic Sticky Action Bar**:
  - **Registered Users**: Displays *"Upload Submission"* button + green *"Registered"* status indicator.
  - **Unregistered Users**: Displays *"Register Now • ₹99"* button, opening the checkout modal.
  - **Sold Out State**: Disables registration automatically when all 20 spots are booked.
- **Bottom Navigation Bar**:
  - 5-item mobile app navbar (Home, Search, Create `+`, Competitions active, Profile).
- **Interactive Evaluator Toolbar**:
  - Switch between **Mobile App Frame** and **Full Responsive Web**.
  - Toggle between **User 1 (Registered)** and **User 2 (Unregistered New Participant)**.
  - **Concurrency Stress Test Button**: Fires 5 rapid concurrent registration requests simultaneously to test the backend's atomic lock and race condition prevention.
  - **Reset State Button**: Resets spots to 19 left (1/20 booked) with one click.
  - Bilingual switcher: Real-time translation between English (`ENG`) and Hindi (`हिंदी`).

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **React 19**: Modern component architecture, custom hooks, and responsive design.
- **Tailwind CSS**: Pixel-matched styling, custom color palette, responsive breakpoints, smooth animations.
- **Lucide React**: Clean, accessible SVG iconography matching the design reference.
- **Canvas-Confetti**: Visual celebration on registration and submission completion.
- **Vite**: Ultra-fast build tool and developer experience.

### Backend
- **Node.js + Express.js**: RESTful API with modular MVC architecture.
- **MongoDB + Mongoose**: Data modeling with schemas, indexes, and atomic updates.
- **Dual-Engine Reliability Adapter**: If MongoDB Atlas is connected, queries run directly on the database. If offline or if the database is unreachable, a stateful in-memory engine with atomic mutex locking ensures seamless zero-crash evaluation.
- **CORS & Cookie Parser**: Secure cross-origin requests and token handling.

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
In the root directory:
```bash
# Install backend dependencies
npm install

# Install client dependencies
npm --prefix client install
```

### 2. Configure Environment Variables
A `.env` file is located in the root folder with:
```env
PORT=3000
MONGO_URI=mongodb+srv://yt:ronit03052004@backend.uugv4el.mongodb.net/pluto
JWT_SECRET=e7978cc16f33971297d39edd663c3f90ca38bd3d5b71c56bd32cfbaa4fd2f96d
```
*(If your local network restricts remote Atlas SRV DNS queries, the server automatically switches to the built-in in-memory fallback store so all APIs and features continue functioning flawlessly without crashing!)*

### 3. Build & Run the Application

#### Option A: Single Command (Production Mode - Recommended)
Build the frontend and run the Express server on port 3000:
```bash
# Build frontend
npm run build

# Start backend server (serves both API and React frontend on port 3000)
npm start
```
Now open **[http://localhost:3000](http://localhost:3000)** in your browser!

#### Option B: Development Mode (with Hot Reloading)
```bash
# Terminal 1: Run Backend API
npm run dev

# Terminal 2: Run Vite Frontend Dev Server
npm run client
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/competitions/current` | Fetches active competition details, judge, dates, rewards, and spots |
| `GET` | `/api/competitions/:id` | Fetches competition by ID |
| `POST` | `/api/competitions/:id/register` | Atomically registers a user, decrements spots, and records transaction |
| `GET` | `/api/competitions/:id/registration-status` | Checks if a given `userId` is registered |
| `POST` | `/api/competitions/:id/cancel-registration` | Cancels a registration and restores a spot (for testing) |
| `POST` | `/api/competitions/reset-spots` | Resets spots back to 19 remaining (1/20 booked) |
| `POST` | `/api/competitions/:id/submit` | Records performance video URL, dance style, and notes |
| `GET` | `/api/competitions/:id/submission` | Retrieves submission entry for a user |

---

## 💡 Engineering Section (Evaluation Criteria)

### 1. Important Assumptions Made
- **Spot Capacity & Overbooking Prevention**: The competition has a hard cap of 20 participants. Once booked spots reach 20, further registration attempts must be rejected with HTTP 400 (`"Competition spots are full! No seats left."`), and the UI must display *"Sold Out"*.
- **User Identity**: Supported via JWT authentication, cookies, or header `x-user-id` (with demo fallback `user_1` and `user_2`), enabling testing without forcing user sign-up.
- **Payment Verification**: Mock checkout powered by Razorpay flow that produces cryptographically unique transaction IDs (`TXN_XXXXX`) and marks payment status as `completed`.
- **Submission Access**: Only users with completed registration can access the submission form and upload their video link.

### 2. Major Technical Decisions
- **Atomic Operations for Concurrency**: To support thousands of concurrent users without double-booking spots, registrations use atomic MongoDB conditional updates:
  ```javascript
  await Competition.findOneAndUpdate(
    { _id: competitionId, bookedSpots: { $lt: totalSpots } },
    { $inc: { bookedSpots: 1 } },
    { new: true }
  );
  ```
  If another request fills the last spot milliseconds before, the update returns `null` and prevents overbooking. An in-memory mutex lock mirrors this behavior in offline mode.
- **Fail-Safe Dual Storage Architecture**: Network firewalls or expired Atlas credentials often cause technical evaluation scripts to crash. Our service layer wraps Mongoose queries and gracefully falls back to a high-fidelity in-memory store so evaluators can run and test the app offline without database setup headaches.
- **Tailwind CSS + Component Separation**: Divided the screen into atomic, reusable React components (`CompetitionHero`, `JudgeCard`, `CountdownBanner`, `ImportantDates`, `PreviousWinners`, `CompetitionTabs`, `RewardsSection`, `ReferAndEarn`, `TestimonialsCard`, `StickyBottomBar`, `Modals`).

### 3. Trade-offs Considered
- **Web App with Mobile Mockup vs Pure React Native**: The prompt specifically requested: *"use tailwind css as well and make it like the image shown in the pdf, and also make it responsive"*. We built a responsive React + Tailwind application with a toggleable Mobile App Frame (matching Page 3 of the PDF) and Full Responsive Web layout, allowing immediate browser inspection and testing on any device.
- **In-Memory Mutex vs Redis Distributed Lock**: For a distributed multi-node server cluster, Redis (`Redlock`) is standard. For this assignment, MongoDB's atomic `$inc` combined with a process-level mutex lock provides concurrency safety without introducing external infrastructure dependencies.

### 4. What Would Be Improved for Production
1. **Direct Video Upload to S3/Cloudflare R2**: Replace video link inputs with presigned multipart uploads directly to AWS S3 or Cloudflare Stream, including automated HLS transcoding.
2. **Real-time WebSockets / SSE**: Use Server-Sent Events or Socket.io to push spot updates to all connected viewers in real time when someone registers.
3. **Automated Razorpay Webhooks**: Implement Razorpay signature verification (`crypto.createHmac('sha256', secret)`) on webhook callbacks for payment settlement.
4. **Caching with Redis**: Cache `/api/competitions/current` with Redis to handle 50,000+ requests per second with sub-5ms response times.
