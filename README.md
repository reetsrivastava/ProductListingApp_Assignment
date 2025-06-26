# Product Listing App

A modern, responsive e-commerce product listing application built with Next.js(React Framework), TypeScript, and Tailwind CSS.

## 🚀 Project Type

- **Framework**: Next.js(React) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **API**: Fake Store API (https://fakestoreapi.com)
- **Deployment**: Vercel

## 🛠️ How to Build and Deploy

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd productlistingapp_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Deployment on Vercel

1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Deploy automatically** - Vercel will detect Next.js and deploy accordingly

**Live Demo**: [Add your Vercel deployment link here]

## ✨ Functionalities Implemented

### 🏠 Homepage
- **Product Grid Display**: Responsive grid layout showcasing all products
- **Product Cards**: Each card displays image, title, price, and rating
- **Quick Add to Cart**: One-click add to cart functionality
- **Loading States**: Smooth loading animations while fetching data

### 🔍 Advanced Filtering & Sorting
- **Category Filter**: Filter products by specific categories
- **Price Range Filter**: Set minimum and maximum price ranges
- **Sorting Options**:
  - Price (Low to High / High to Low)
  - Popularity (Based on ratings)
  - Name (A-Z / Z-A)
- **Clear Filters**: Reset all applied filters with one click

### 📄 Pagination
- **Configurable Page Sizes**: Choose from 5, 10, 20, or 50 items per page
- **Navigation Controls**: Previous/Next page buttons
- **Page Information**: Current page and total items display

### 🛒 Shopping Cart
- **Cart Management**: Add, remove, and update product quantities
- **Cart Counter**: Real-time cart item count in navigation
- **Persistent Cart**: Cart state persists across page refreshes
- **Cart Page**: Dedicated page to view and manage cart items

### 📱 Product Details
- **Individual Product Pages**: Detailed view for each product
- **Product Information**: Complete product details including description
- **Add to Cart**: Direct add to cart from product detail page
- **Back Navigation**: Easy navigation back to product list

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Navigation Bar**: Fixed navigation with cart indicator
- **Error Handling**: User-friendly error messages and loading states

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Efficient data fetching and state management
- **SEO Friendly**: Server-side rendering capabilities
- **Accessibility**: ARIA labels and keyboard navigation support

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)
*Product listing with filters and pagination*

### Product Details
![Product Details](screenshots/product-details.png)
*Individual product page with detailed information*

### Shopping Cart
![Shopping Cart](screenshots/cart.png)
*Cart management page with quantity controls*

### Mobile View
![Mobile View](screenshots/mobile.png)
*Responsive design on mobile devices*

## 🏗️ Project Structure

```
productlistingapp_assignment/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── [productId]/       # Dynamic product detail pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Cart/             # Cart-related components
│   ├── Error/            # Error handling components
│   ├── FilterSort/       # Filtering and sorting components
│   ├── Navbar/           # Navigation components
│   ├── Pagination/       # Pagination components
│   ├── ProductDetails/   # Product detail components
│   └── ProductList/      # Product listing components
├── hooks/                # Custom React hooks
│   ├── useCart.ts        # Cart state management
│   ├── useFetchDetail.ts # Product detail fetching
│   └── useFetchList.ts   # Product list fetching
├── context/              # React Context providers
└── public/               # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🔗 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com) to fetch:
- Product listings
- Individual product details
- Product categories
- Product ratings and reviews

## 🎯 Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management
- **Fake Store API**: Product data source

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Note**: This is a demo application using the Fake Store API. In a production environment, you would integrate with a real e-commerce backend API.
