# Task Management Application

A simple task management application built with Next.js and MongoDB, featuring server actions for data operations.
vercel link : https://task-management-nine-khaki.vercel.app/

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Task details including title, description, and due date
- Real-time updates using Server Actions
- Responsive design with TailwindCSS
- MongoDB integration for data persistence

## Tech Stack

- Frontend: Next.js
- Backend: Next.js Server Actions
- Database: MongoDB
- Styling: TailwindCSS
- Deployment: Vercel

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/amreshkyadav998/task_management-assi-.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add your MongoDB connection string to the environment variables
5. Deploy!

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components
  - `/lib` - Utility functions and server actions
  - `page.js` - Main application page
- `.env.local` - Environment variables
- `package.json` - Project dependencies

## Contributing

Feel free to submit issues and pull requests.
