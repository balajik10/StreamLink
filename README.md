# StreamLink

StreamLink is a cutting-edge live streaming platform built to empower creators and connect them with audiences globally. With real-time video streaming, interactive chat, and a seamless user experience, StreamLink leverages modern technologies such as **Next.js**, **WebRTC**, **Sockets**, **Prisma**, **Tailwind CSS**, **MySQL**, and **LiveKit**. Designed for scalability and performance, StreamLink allows creators to engage with their viewers in a highly interactive and responsive environment.

## 🚀 Features

- **Real-Time Video Streaming**: High-quality, low-latency video streaming powered by WebRTC, allowing creators to engage their audience instantly.
- **Interactive Chat**: Real-time chat for viewers to communicate with creators and other viewers during live streams, powered by WebSockets.
- **Scalable Architecture**: Built with Next.js for efficient server-side rendering and LiveKit for scalable media streaming.
- **User Authentication**: Secure login and user management with JWT authentication and Prisma ORM to interact with the MySQL database.
- **Responsive UI**: Beautiful, responsive design powered by Tailwind CSS to ensure a seamless experience across devices.
- **Channel Creation**: Streamers can create and customize their own channels to broadcast content to the world.
- **Audience Interaction**: Viewers can interact with live streams through real-time chat, reactions, and more.
- **Database Integration**: MySQL stores user data, streams, chat messages, and more, allowing for robust data management.
- **Customizable UI**: Tailwind CSS provides a highly flexible UI framework for adapting the platform to specific needs or brand styles.

## 🛠️ Technologies Used

StreamLink integrates several modern technologies to ensure an optimal and scalable user experience:

- **Next.js**: A powerful React framework for server-side rendering, static site generation, and routing.
- **WebRTC**: A real-time communication protocol for peer-to-peer video, audio, and data sharing, enabling low-latency streaming.
- **WebSockets**: For real-time communication such as chat and notifications between viewers and streamers.
- **Prisma**: ORM for easy interaction with the MySQL database, simplifying data querying and management.
- **Tailwind CSS**: A utility-first CSS framework that makes it quick and easy to style your platform with custom designs.
- **MySQL**: A relational database used to store user information, live stream metadata, and chat history.
- **LiveKit**: A media platform for real-time video and audio communication that powers scalable streaming.

## 🔑 Installation Guide

Follow these steps to set up StreamLink locally.

### Prerequisites

Ensure you have the following installed before proceeding:
- **Node.js** (v18 or higher)
- **MySQL** (v5.7 or higher)
- **AWS** account (for deploying and storing media files)
- **LiveKit** account (for media streaming)
  
### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/streamlink.git
cd streamlink

2. Install Dependencies
Install all the necessary dependencies with npm:
npm install

3. Set Up Environment Variables
Create a .env file in the root directory and define the following environment variables. Make sure to replace the placeholders with your actual values.
NEXT_PUBLIC_LIVEKIT_API_KEY=your_livekit_api_key
DATABASE_URL=mysql://username:password@localhost:3306/streamlink
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
NEXTAUTH_SECRET=your_jwt_secret

4. Run the Development Server
Start the development server:
npm run dev

Now, you can access the platform at http://localhost:3000.

📈 Deployment
StreamLink is built with scalability in mind, so it can be deployed easily on cloud platforms. Here are some deployment options:

1. AWS:
Set up an EC2 instance with Node.js and MySQL installed.
Use S3 to store video content and CloudFront to deliver streams with low latency.
2. Vercel:
For easy frontend deployment, connect your GitHub repository to Vercel.
3. LiveKit:
Host the LiveKit server to manage and scale real-time media streams.
For more details, refer to the respective documentation of AWS, Vercel, and LiveKit for deployment guidelines.

🌍 Contributing
We welcome contributions to StreamLink! If you would like to improve the platform, fix bugs, or add new features, please follow these steps:

How to Contribute:
Fork the repository on GitHub.
Clone your fork to your local machine:
git clone https://github.com/yourusername/streamlink.git

Create a new branch for your feature or fix:
git checkout -b feature/your-feature

Make your changes and commit them:
git commit -m 'Add new feature'

Push your changes to your forked repository:
git push origin feature/your-feature

Open a pull request from your fork to the main repository.
📑 License
StreamLink is licensed under the MIT License. See the LICENSE file for more details.

💬 Support
If you encounter any issues, need help with setup, or have questions, please don’t hesitate to reach out:

mail:balajik.0204@gmail.com

