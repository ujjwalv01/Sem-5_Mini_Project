# MedSpace (Sem-5 Mini Project)

MedSpace is a web application built with Next.js designed to help users discover, book, and manage medical spaces easily.

This project was bootstrapped with `create-next-app` and utilizes a modern tech stack to deliver a fast and responsive user experience.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS / Vanilla CSS
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth.js
- **Package Manager:** npm

---

## Getting Started for Contributors

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- Git

### 2. Clone the Repository
Open your terminal and clone the repository using Git:

    git clone https://github.com/your-username/sem-5_mini_project.git

Navigate into the project directory:

    cd sem-5_mini_project

### 3. Install Dependencies
Install all the required packages using npm:

    npm install

### 4. Set up Environment Variables
The project requires certain environment variables to run properly (like database connections and authentication secrets). 

1. Locate the `.env.example` file in the root directory (if it exists) or create a new file named `.env`.
2. Add the following keys to your `.env` file and ask the project lead for the actual values:

    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key

> Note: Never commit the `.env` file to GitHub!

### 5. Run the Development Server
Once everything is installed and your `.env` file is set up, start the local development server:

    npm run dev

Open http://localhost:3000 with your browser to see the result. The page will auto-update as you edit the files.

---

## How to Contribute

1. Pull the latest changes: Always make sure you are on the latest main branch before starting work.

    git checkout main
    git pull origin main

2. Create a new branch: Create a branch for your feature or bug fix.

    git checkout -b feature/your-feature-name

3. Make your changes: Write your code and test it locally.

4. Commit your changes:

    git add .
    git commit -m "Add a descriptive commit message here"

5. Push and create a PR:

    git push origin feature/your-feature-name

Then go to GitHub and open a Pull Request!

---

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:
- Next.js Documentation - learn about Next.js features and API.
- Learn Next.js - an interactive Next.js tutorial.

---

*Created for Sem-5 Mini Project.*
