# We are open to any new feature suggestion. You can directly open issue and add `feature` label.

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

    # PostgreSQL Database Connection String (Neon)
    DATABASE_URL=your_neon_postgres_connection_string
    
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key

> Note: Never commit the `.env` file to GitHub!

### 5. Run the Development Server
Once everything is installed and your `.env` file is set up, start the local development server:

    npm run dev

Open http://localhost:3000 with your browser to see the result. The page will auto-update as you edit the files.

---

## How to Contribute

Follow these steps to set up MedSpace locally and submit your changes.

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/sem-5_mini_project.git
cd sem-5_mini_project

# Install dependencies
npm install

# Add upstream repository
git remote add upstream https://github.com/ujjwalv01/sem-5_mini_project.git

# Keep your fork updated
git fetch upstream
git checkout main
git pull upstream main

# Create a feature branch
# Format: feature-name or feature-name#issue-number
git checkout -b add-search-filter

# Make your changes and test locally
npm run dev

# After changes, commit your work
git add .
git commit -m "Add search filter feature"

# Push your branch to your fork
git push origin add-search-filter

---

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:
- Next.js Documentation - learn about Next.js features and API.
- Learn Next.js - an interactive Next.js tutorial.

---

*Created for Sem-5 Mini Project.*
