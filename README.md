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
├── app/                # Next.js App Router pages (layouts, routes)
├── components/         # Shared/Generic UI components
├── config/             # App & environment configuration
├── constants/          # Static app-wide constants
├── features/           # Feature-based modules
│   └── movies/         # Movie-specific domain logic
│     ├── components/   # Components specific to movie feature
│     ├── hooks/        # Custom hooks for movie logic
│     ├── services/     # API request logic (Axios)
│     ├── store/        # Redux slices and actions
│     └── types/        # TypeScript interfaces/types
├── hooks/              # Shared/Global React hooks
├── lib/                # Third-party configurations (Redux store, Axios instance)
└── providers/          # Context providers (Redux, Theme, etc.)
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
git clone https://github.com/ichsanindraw/next-movie-app.git
cd next-movie-app
```

2. Install Dependencies

```
npm install
# or
pnpm install
```

3. Run the Development Server

```
npm run dev
# or
pnpm run dev
```

4. Open in Browser
   Open your browser and navigate to:

```
http://localhost:3000
```

# ✨ Features

- 🔍 **Search movies by title**
- 📄 **Movie detail page**
- ♾️ **Infinite scroll for long search results**
- 🔗 **Search keyword synced with URL query (?q=keyword)**
- ⚡ **Optimized API calls using Redux Toolkit async thunks**
- 📱 **Responsive design for mobile and desktop**

# 🧪 Testing

```
npm run test
# or
pnpm run test
```

# 🧠 Notes

- State management is handled using Redux Toolkit
- API logic is separated into a service layer
- Search behavior reacts to URL query parameters
- Code structure is modular and scalable

# 📌 Possible Improvements

- Add skeleton loading states
- Add unit tests for Redux slices and components
- Improve SEO metadata
- Cache search results

# 📄 License

This project is for learning and demonstration purposes.
