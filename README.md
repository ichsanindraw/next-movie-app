# 🎬 Movie Search App

A movie search application built with **Next.js (App Router)** that allows users to search movies, view details, and browse results efficiently using modern React patterns.

---

## 🚀 Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- OMDb API

---

## 📁 Project Structure (High Level)

```text
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
├── config/             # App & environment configuration
├── constants/          # App constants
├── features/
│   └── movies/         # Movie domain (slice, service, types)
│     └── components/   # Movie domain (slice, service, types)
│     └── hooks/        # Movie domain (slice, service, types)
│     └── services/     # Movie domain (slice, service, types)
│     └── store/        # Movie domain (slice, service, types)
│     └── types/        # Movie domain (slice, service, types)
├── hooks/              # Redux store & shared utilities
├── lib/                # Redux store & shared utilities
└── providers/          # App constants

```

# 🔑 Environment Variables

This project uses the OMDb API to fetch movie data.

Create a `.env` file in the project root:

```
NEXT_PUBLIC_API_URL=http://www.omdbapi.com
NEXT_PUBLIC_API_KEY=YOUR_API_KEY_HERE
```

You can get a free API key from:
https://www.omdbapi.com/apikey.aspx

# 🛠️ How to Run the App Locally

1. Clone the Repository

```
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app

```

2. Install Dependencies
   Using npm:

```
npm install

```

Or using pnpm:

```
pnpm install
```

3. Run the Development Server
   Using npm:

```
npm install

```

Or using pnpm:

```
pnpm install
```

5. Open in Browser
   Open your browser and navigate to:

```
http://localhost:3000
```

✨ Features

🔍 Search movies by title

📄 Movie detail page

♾️ Infinite scroll for long search results

🔗 Search keyword synced with URL query (?q=keyword)

⚡ Optimized API calls using Redux Toolkit async thunks

📱 Responsive design for mobile and desktop

🧪 Testing (Optional)

If tests are available:
npm run test

🧠 Notes

State management is handled using Redux Toolkit

API logic is separated into a service layer

Search behavior reacts to URL query parameters

Code structure is modular and scalable

scalable

📌 Possible Improvements

Add skeleton loading states

Add unit tests for Redux slices and components

Improve SEO metadata

Cache search results

# 📄 License

This project is for learning and demonstration purposes.
