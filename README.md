🏨 Roomify – Room Booking Web Application

Roomify is a full-stack room booking web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse rooms, check availability, and book rooms seamlessly.

🚀 Features
🔐 User Authentication (Login/Register)
🏨 Browse available rooms
📅 Check room availability by date
💳 Booking system
🧾 Booking history for users
🛠️ Admin panel for managing rooms & bookings
📊 Responsive UI for all devices
🛠️ Tech Stack

Frontend:

React.js
CSS / Bootstrap

Backend:

Node.js
Express.js

Database:

MongoDB

Other Tools:

EJS (for templating if used)
REST APIs
Git & GitHub
📁 Project Structure
Roomify/
│
├── models/          # Database schemas
├── routes/          # API routes
├── views/           # Frontend templates (EJS)
├── public/          # Static files (CSS, JS, Images)
├── utils/           # Utility functions
├── middleware.js    # Custom middleware
├── app.js           # Main server file
├── schema.js        # Validation schema
├── package.json     # Dependencies
└── README.md
⚙️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/roomify.git
cd roomify
Install dependencies
npm install
Setup environment variables
Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
PORT=5000
Run the application
-> npm run dev
-> nodemon server/server.js
Open in browser:
http://localhost:5000
📸 Screenshots (Optional)

Add screenshots of your UI here

🔑 API Endpoints (Sample)
Method	Endpoint	Description
GET	/rooms	Get all rooms
POST	/book	Book a room
GET	/bookings	User booking history
POST	/login	User login
POST	/register	User registration
👨‍💻 Author

Ayush Kumar Gupta

GitHub: https://github.com/ayushkumarguptaa
📌 Future Enhancements
Online payment integration (Razorpay/Stripe)
Email notifications
Advanced search filters
Ratings & reviews system
