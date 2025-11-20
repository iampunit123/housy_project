Perfect! I’ve updated your README so the **live demo link** is included and fully ready to copy-paste. I also added a neat “Live Demo” badge for style:

````markdown
# 🏠 Housy - Sustainable Housing Made Easy

![Housy Banner](https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)

> **Connecting Kenyans with Sustainable, Eco-Friendly Housing Solutions**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen)](https://housy-project-ffe752.netlify.app/)

---

## 🌟 Overview

Housy is a modern property listing platform focused on **sustainable housing in Kenya**. We bridge the gap between environmentally conscious property seekers and landlords offering eco-friendly accommodations, office spaces, and short-term rentals.

### 🎯 Key Features

- **🏡 Smart Property Listings** - Advanced search with sustainability filters
- **🌱 Sustainability Scoring** - AI-powered eco-rating system for properties
- **📱 Modern Interface** - Beautiful, responsive design built with React & Tailwind
- **🔐 Secure Platform** - JWT authentication and role-based access
- **🖼️ Image Management** - Cloudinary integration for seamless media uploads
- **👥 Multi-User Roles** - Tenants, Landlords, and Admin panels
- **⭐ Review System** - Community-driven property ratings

---

## 🚀 Quick Start

### Prerequisites
- Node.js `16+` 
- MongoDB `4.4+`
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iampunit123/housy_project.git
cd housy
````

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with MongoDB and Cloudinary credentials
npm run dev
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm run dev
```

4. **Access the Application**

* Frontend: [http://localhost:3000](http://localhost:3000)

* Backend API: [http://localhost:5000](http://localhost:5000)

* **Live Demo:** [https://housy-project-ffe752.netlify.app/](https://housy-project-ffe752.netlify.app/)

---

## 🏗️ Tech Stack

| Frontend     | Backend    |
| ------------ | ---------- |
| React 18     | Node.js    |
| Vite         | Express.js |
| Tailwind CSS | MongoDB    |
| React Router | Mongoose   |
| Axios        | JWT        |
| Lucide React | Cloudinary |
|              | bcryptjs   |

---

## 📁 Project Structure

```
housy/
├── backend/
│   ├── config/          # Database & service configurations
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React context providers
│   │   ├── services/    # API services
│   │   └── utils/       # Helper functions
│   └── package.json
└── README.md
```

---

## 🔑 API Endpoints

### Authentication

* `POST /api/auth/register` - User registration
* `POST /api/auth/login` - User login
* `GET /api/auth/profile` - Get user profile

### Properties

* `GET /api/properties` - Get properties with filters
* `GET /api/properties/featured` - Get featured properties
* `POST /api/properties` - Create property (Landlord)
* `PUT /api/properties/:id` - Update property

### Admin

* `GET /api/admin/dashboard` - Admin dashboard stats
* `GET /api/admin/users` - User management
* `PUT /api/admin/properties/:id/feature` - Feature properties

---

## 🌱 Sustainability Features

Housy rates properties based on:

* **Energy Efficiency** (Solar panels, insulation, etc.)
* **Water Conservation** (Rainwater harvesting, low-flow fixtures)
* **Waste Management** (Recycling systems, composting)
* **Sustainable Materials** (Eco-friendly construction)

---

## 👥 User Roles

| Role         | Features                                                                       |
| ------------ | ------------------------------------------------------------------------------ |
| 🧑‍💼 Tenant | Browse & search properties, save favorites, submit reviews, contact landlords  |
| 🏠 Landlord  | Create/manage listings, upload images, track performance, respond to inquiries |
| 👨‍💼 Admin  | Platform moderation, user management, analytics, featuring content             |

---

## 🎨 UI/UX Features

* Responsive Design - Mobile-first approach
* Dark Navigation - Distinct brand identity
* Sustainability Badges - Clear eco-ratings
* Advanced Filtering - Find perfect matches
* Image Galleries - High-quality property visuals

---

## 🔒 Security

* Password hashing with bcrypt
* JWT token authentication
* Input validation and sanitization
* File upload restrictions
* CORS configuration

---

## 🚀 Deployment

* **Backend Deployment**: Render
* **Frontend Deployment**: Netlify

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

* Sustainable Development Goals (SDGs) inspiration
* Kenyan housing market research
* Modern UI design patterns
* Open source community

---

## 📞 Support

For support, email: `support@housy.co.ke` or join our Slack channel.

<div align="center">
Built with ❤️ for a Sustainable Kenya  

🏠 [Live Demo](https://housy-project-ffe752.netlify.app/) | 📚 Documentation | 🐛 Report Bug

</div>
```

