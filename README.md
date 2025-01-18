# LiteMart

LiteMart is a high-performance e-commerce application framework crafted for delivering lightning-fast web experiences. It is built with a minimalist approach, leveraging pure JavaScript for core functionality and integrating React selectively for dynamic routes.

LiteMart is designed to achieve a **100% mobile PageSpeed Insights score**, making it an ideal choice for developers building modern e-commerce websites focused on speed and scalability.

---

## Key Features

- **Blazing-Fast Development Server**: Powered by Express.js for lightweight and efficient server-side rendering.
- **Partial Build System**: Only rebuilds updated modules, reducing build times significantly.
- **Web Workers**: Offloads heavy tasks like filtering and sorting to ensure smooth performance.
- **Component-Based Architecture**: Built with pure JavaScript for flexibility and lightweight design.
- **Hybrid Framework**: Use vanilla JavaScript by default, with React selectively integrated for specific routes.
- **CDN Deployment Ready**: Easily deploy to services like Cloudflare or AWS CloudFront for global reach.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/litemart.git
   cd litemart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### Development

Start the development server with:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

### Build for Production

Generate optimized static files for deployment:

```bash
npm run build
```

Serve the production build locally using Express:

```bash
npm start
```

---

### Folder Structure

```
LiteMart/
├── public/              # Static assets (images, fonts, etc.)
├── src/                 # Source files
│   ├── components/      # JavaScript components
│   ├── routes/          # Page routes
│   ├── workers/         # Web worker scripts
│   └── app.js           # Main entry file
├── server.js            # Express.js server file
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

---

### Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `public` and `server.js` files to your preferred hosting platform (e.g., Heroku, AWS, Vercel).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or fixes.

---

## Performance Goals

LiteMart is optimized to meet the following benchmarks:

- **100% Mobile PageSpeed Insights Score**
- Minimal JavaScript and CSS overhead
- Fast time-to-interactive and low cumulative layout shift (CLS)

---

Happy coding! 🚀
