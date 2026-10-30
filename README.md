# 🌾 বাজার দর | Bazardor

<p align="center">
  <img src="https://img.shields.io/badge/Bazardor-Market%20Price%20Tracker-16A34A?style=for-the-badge&logo=leaflet&logoColor=white" alt="Bazardor">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

<p align="center">
  <strong>প্রতিদিনের বাজারদর, পণ্যের দামের ওঠানামা এবং বাজারভিত্তিক তুলনামূলক বিশ্লেষণ এক প্ল্যাটফর্মে।</strong>
</p>

<p align="center">
  <a href="https://bazardor-a07-iota.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Bazardor-16A34A?style=for-the-badge" alt="Live Demo">
  </a>
</p>

---

## 📖 Project Overview

**বাজার দর (Bazardor)** is a modern and user-friendly market price tracking web application designed to help users explore daily commodity prices, monitor price fluctuations, and compare product prices across different markets.

The platform provides an organized overview of essential commodities, including rice, lentils, oil, vegetables, fish, meat, and spices.

With a clean interface, Bengali typography, interactive price indicators, and market comparison features, Bazardor makes everyday market information easier to understand and explore.

The application also includes secure authentication, protected routes, user profile management, and responsive layouts to provide a smooth experience across different devices.

### 🎯 Project Goals

- Make daily commodity prices easier to access.
- Help users understand price changes over time.
- Provide market-based price comparison.
- Present market information in a simple and organized interface.
- Deliver a responsive and accessible user experience.
- Provide secure authentication and personalized user access.

---

## ✨ Key Features

### 1. 📊 Daily Commodity Price Tracking

Explore daily prices of essential commodities, including:

- Rice
- Lentils
- Cooking oil
- Vegetables
- Fish
- Meat
- Spices

The price listing provides an organized overview of available products and their market prices.

### 2. 📈 Interactive Price Ticker

An animated scrolling price ticker displays commodity prices and their percentage changes.

Users can quickly identify products experiencing price increases or decreases without navigating through the entire product list.

### 3. 🗂️ Category-Based Filtering

Browse products through category-specific filters.

Users can select different commodity categories to find relevant products quickly and conveniently.

### 4. 🔍 Product Details and Price Analytics

Explore detailed information about individual commodities.

The product analytics section provides:

- Minimum market price
- Maximum market price
- Average market price
- Current price information
- Price fluctuation indicators

These statistics help users understand the overall price range of a product.

### 5. 🏪 Market-Based Price Comparison

Compare commodity prices across different markets.

The comparison table presents product prices and average values in an organized format, helping users identify price differences between available markets.

### 6. 📉 Price Fluctuation Indicators

Monitor price changes compared with the previous day's prices.

The application displays:

- Percentage price changes
- Price increase indicators
- Price decrease indicators
- Visual arrows for price movement

This makes price trends easier to understand at a glance.

### 7. 🔐 Secure Authentication with Better Auth

The application uses Better Auth to provide secure user authentication.

Available authentication methods include:

- Email and password authentication
- Google OAuth
- GitHub OAuth

Users can securely sign in and access protected application features.

### 8. 🛡️ Protected Routes and Smart Redirects

Protected routes restrict access to authenticated users.

When an unauthenticated user attempts to access a protected product page, the application redirects them to the login page.

After successful authentication, the user can return to the originally requested page through the callback redirect mechanism.

### 9. 👤 User Profile Management

Authenticated users can manage their profile information.

Available functionality includes:

- View profile information
- Update profile name
- Access account information
- Sign out securely

Profile changes are accompanied by visual feedback.

### 10. 🔔 Interactive Toast Notifications

The application integrates `react-hot-toast` to provide user-friendly notifications.

Notifications are used to communicate:

- Successful profile updates
- Authentication feedback
- Application errors
- Other relevant user interactions

These notifications help users understand the result of their actions.

### 11. 🇧🇩 Bengali Typography and Numerals

Bazardor provides a Bengali-friendly interface for users.

The application supports:

- Bengali text presentation
- Bengali number formatting
- Localized price information
- Readable market data

This makes the platform more accessible to Bengali-speaking users.

### 12. 📱 Fully Responsive Design

The application is designed to work across different screen sizes.

Supported layouts include:

- Mobile phones
- Tablets
- Desktop computers

Responsive components help maintain a consistent user experience across devices.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| Better Auth | Authentication and OAuth integration |
| MongoDB Atlas | Database and data storage |
| react-hot-toast | Interactive notifications |
| Google OAuth | Google authentication |
| GitHub OAuth | GitHub authentication |
| Vercel | Application deployment |

---

## 🏗️ Application Architecture

Bazardor is built using the Next.js App Router architecture.

The application combines a responsive frontend, authentication functionality, database integration, and protected application routes.

```text
Bazardor
│
├── Frontend
│   ├── Next.js
│   ├── React
│   ├── TypeScript
│   └── Tailwind CSS
│
├── Authentication
│   ├── Better Auth
│   ├── Email & Password
│   ├── Google OAuth
│   └── GitHub OAuth
│
├── Database
│   └── MongoDB Atlas
│
├── Notifications
│   └── react-hot-toast
│
└── Deployment
    └── Vercel
```

---

## 🚀 Getting Started

Follow these instructions to run Bazardor locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Google OAuth credentials
- GitHub OAuth credentials

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bazardor.git
```

Navigate to the project directory:

```bash
cd bazardor
```

> Replace `your-username` with your actual GitHub username and repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add the following environment variables:

```env
# MongoDB Database
BETTER_AUTH_DB_URL=your_mongodb_connection_string

# Better Auth Configuration
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:** Replace all placeholder values with your actual credentials.

Keep your environment variables secure.

Never commit `.env.local` or expose authentication secrets in your public repository.

### 4. Configure OAuth

#### Google OAuth

1. Open the Google Cloud Console.
2. Create or select a project.
3. Configure the OAuth consent screen.
4. Create OAuth client credentials.
5. Add your local application URL to the authorized origins.
6. Configure the appropriate callback URL for your Better Auth setup.
7. Add the Google Client ID and Client Secret to `.env.local`.

#### GitHub OAuth

1. Open GitHub Developer Settings.
2. Navigate to OAuth Apps.
3. Create a new OAuth application.
4. Configure the application homepage.
5. Set the authorization callback URL according to your Better Auth configuration.
6. Generate the Client ID and Client Secret.
7. Add the credentials to `.env.local`.

> OAuth callback URLs must match the authentication configuration used by the application.

### 5. Run the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

The application should now be available locally.

---

## 🌐 Live Deployment

<p align="center">
  <a href="https://bazardor-a07-iota.vercel.app">
    <img src="https://img.shields.io/badge/Visit-Live%20Application-16A34A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Application">
  </a>
</p>

**Live Website:**  
https://bazardor-a07-iota.vercel.app

The application is deployed using Vercel.

### Deployment Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Set up production OAuth callback URLs.
5. Deploy the application.
6. Verify authentication and application functionality.

---

## 📁 Project Structure

The application follows the Next.js App Router structure.

```text
bazardor/
│
├── public/
│   └── assets/
│
├── src/
│   └── app/
│       ├── components/
│       │
│       ├── (authentication)/
│       │
│       ├── products/
│       │
│       ├── profile/
│       │
│       ├── api/
│       │
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
│
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

> The structure above is an illustrative overview. Actual folders and routes may vary depending on the current implementation.

---

## 🔒 Security

Bazardor uses Better Auth for authentication and protected application access.

Security considerations:

- Authentication secrets should remain private.
- OAuth credentials should be stored in environment variables.
- Protected routes should verify authentication.
- Production callback URLs should be configured correctly.
- Database credentials should never be exposed publicly.
- User profile updates should be validated before saving.

---

## 📌 Project Information

| Information | Details |
|---|---|
| Project Name | বাজার দর (Bazardor) |
| Project Type | Market Price Tracking Web Application |
| Framework | Next.js |
| Frontend | React, TypeScript |
| Styling | Tailwind CSS |
| Authentication | Better Auth |
| Database | MongoDB Atlas |
| Deployment | Vercel |
| Developer | Ibrahim Khalil |
| Organization | UpperCodes IT Solutions |

---

## 👨‍💻 About the Developer

<p align="center">
  <strong>Ibrahim Khalil</strong>
</p>

<p align="center">
  Full-Stack Developer | Next.js | React | TypeScript | ASP.NET Core
</p>

<p align="center">
  <a href="https://www.uppercodes.com/">
    <img src="https://img.shields.io/badge/Website-UpperCodes-2563EB?style=for-the-badge&logo=google-chrome&logoColor=white" alt="UpperCodes Website">
  </a>
</p>

**Organization:** UpperCodes IT Solutions  
**Website:** https://www.uppercodes.com/

---

## 📄 License

This project is developed as a web application project.

Add an appropriate open-source license to the repository if you intend to distribute the project under specific reuse permissions.

---

<p align="center">
  🌾 <strong>বাজার দর — প্রতিদিনের বাজারদর জানুন, সচেতন সিদ্ধান্ত নিন।</strong>
</p>

<p align="center">
  Built with ❤️ by <strong>Ibrahim Khalil</strong>
</p>