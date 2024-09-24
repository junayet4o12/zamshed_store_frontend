# Zamshed Store
**Zamshed Store** is a web application designed for efficient grocery shop management. Its primary goal is to streamline the ordering process and reduce offline workload, making it ideal for small-scale operations. Built with **React** and powered by **Vite**, the application uses **Firebase** for secure authentication, **Node.js** and **Express.js** for the backend, and **Redux** for effective state management. **MongoDB** handles database operations, while **Cloudinary** is integrated for seamless image hosting, allowing the proprietor to easily add products with images.

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Installation](#-installation)
- [⚙️ Usage](#%EF%B8%8F-usage)
- [🔑 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

## ✨ Features

### 👥 Client-Side Features

#### 🔐 User Authentication
Powered by **Firebase**, the app supports secure user authentication, including:
- User registration
- Login
- Session management

API protection is ensured using **JSON Web Tokens (JWT)**, providing data privacy and security.

#### 🎨 Better UI/UX
We've prioritized an intuitive and attractive user interface (UI) to offer users a seamless experience:
- Easy-to-use functionalities for all core features
- Modern and responsive design for optimal user engagement

#### 🛒 Add Product & Make Order
Users can:
- Add products to the cart, specifying quantity or amount.
- View all selected products and the total price in the "My Cart" section.
- Complete the order process by entering essential details such as shipping and payment information.

#### 📦 Order Details
Once an order is placed, users can view the order status in the **Order Details** page. The status updates in real time and includes:
- Pending
- On Processing
- On-going

### 📋 Admin-Side Features

#### 🔐 Manage Products
The proprietor can efficiently manage all products within the store:
- **Add Product**: Easily add new products with details such as name, price, quantity, and upload images.
- **Update Product**: Modify existing product details to keep information current and accurate.
- **Toggle Hot State**: Mark products as "hot" or featured to promote them on the storefront.
- **Delete Product**: Remove products that are no longer available or relevant.

#### 🔐 Manage Categories
The proprietor can oversee all product categories to ensure organization:
- **Add Category**: Create new categories to organize products effectively.
- **Update Category**: Change category names or descriptions as needed.
- **Delete Category**: Remove categories that are no longer in use or relevant to the store’s offerings.

#### 🛒 Manage Proprietor and Shop Details
The proprietor can maintain accurate shop and personal information:
- **Edit Proprietor Details**: Update personal information such as name, age, and contact information to ensure accurate communication.
- **Edit Shop Details**: Modify shop information including name, total product count, category count, and any relevant operational details (e.g., location, size).


## 🛠️ Tech Stack
- **Frontend**: React, Vite, React Router DOM, Redux, RTK Query
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Firebase, JWT
- **Image Hosting**: Cloudinary

## 🚀 Installation

### Prerequisites
- **Node.js**
- **npm** or **yarn**
- Firebase project setup (for authentication)
- Cloudinary API key (for image hosting)

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/junayet4o12/zamshed_store_frontend.git
    cd zamshed_store_frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root of your project and add the required Firebase and Cloudinary configuration:
    ```env
    # Firebase Configuration
    VITE_apiKey=your-firebase-api-key
    VITE_authDomain=your-firebase-auth-domain
    VITE_projectId=your-firebase-project-id
    VITE_storagebucket=your-firebase-storage-bucket
    VITE_messagingSenderId=your-firebase-messaging-sender-id
    VITE_appId=your-firebase-app-id

    # Cloudinary Configuration
    VITE_CLOUD_NAME=your-Cloudinary-hosting-api-key
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to see the app in action.
   Or
   Navigate to [https://zamshed-store.web.app/](https://zamshed-store.web.app/) to see the app in action.

## ⚙️ Usage
1. **Sign Up / Login**: Users can create an account or log in using Firebase authentication. (Optional but recommended)
2. **Browse Products**: Users can browse the available products, filter by category, and search for specific items.
3. **Add to Cart**: After selecting products, users can add them to their cart and view their selections.
4. **Checkout Process**: Users can proceed to checkout, providing shipping and payment details to complete their order.
5. **Track Orders**: Users can track the status of their orders through the "Order Details" page, where updates are displayed in real-time.

## 🔑 Environment Variables
Make sure to configure the following environment variables in your `.env.local` file:

- **Firebase Variables**:
  - VITE_apiKey
  - VITE_authDomain
  - VITE_projectId
  - VITE_storagebucket
  - VITE_messagingSenderId
  - VITE_appId

- **Cloudinary Hosting API**:
  - VITE_CLOUD_NAME

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact
For any inquiries or feedback, please reach out to:

- **Name**: Junayet Alam
- **Email**: muhammadjunayetmaruf@gmail.com
- **Portfolio**: [junayet-portfolio.com](https://junayet-alam-portfolio.vercel.app/)

---

Thank you for using Zamshed Store!
