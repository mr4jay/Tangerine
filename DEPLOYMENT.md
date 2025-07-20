# Deploying Your Portfolio to GitHub and Vercel

This guide will walk you through the steps to push your code to a GitHub repository and deploy it as a live website using Vercel.

## Prerequisites

Before you begin, make sure you have the following:

*   A **GitHub account**.
*   A **Vercel account** (you can sign up with your GitHub account).
*   **Git** installed on your local machine.

---

## Step 1: Create a GitHub Repository

1.  Go to [GitHub](https://github.com) and create a new repository. You can name it whatever you like (e.g., `my-portfolio`).
2.  **Do not** initialize the new repository with a `README`, `.gitignore`, or `license` file, as this project already contains them.
3.  Copy the repository URL provided by GitHub (it will look something like `https://github.com/your-username/my-portfolio.git`).

---

## Step 2: Push Your Code to GitHub

Open a terminal or command prompt in your project's root directory and run the following commands one by one:

1.  **Initialize Git:**
    ```bash
    git init
    ```

2.  **Add all your files to the staging area:**
    ```bash
    git add .
    ```

3.  **Make your first commit:**
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Set the main branch name (optional but recommended):**
    ```bash
    git branch -M main
    ```

5.  **Add the remote repository URL (use the URL you copied from GitHub):**
    ```bash
    git remote add origin https://github.com/your-username/my-portfolio.git
    ```

6.  **Push your code to GitHub:**
    ```bash
    git push -u origin main
    ```

Your code is now stored safely on GitHub!

---

## Step 3: Deploy to Vercel

1.  **Log in to Vercel**: Go to your [Vercel dashboard](https://vercel.com/dashboard).

2.  **Add New Project**: Click the "Add New..." button and select "Project".

3.  **Import Git Repository**: Vercel will show your GitHub repositories. Find the `my-portfolio` repository you just created and click the "Import" button next to it.

4.  **Configure Project**:
    *   **Project Name**: Vercel will automatically use your repository name. You can change it if you wish.
    *   **Framework Preset**: Vercel should automatically detect that this is a **Next.js** project.
    *   **Environment Variables**: This is the most important step. You need to add your Gemini API key.
        *   Click on the "Environment Variables" section.
        *   Add a new variable:
            *   **Name**: `GEMINI_API_KEY`
            *   **Value**: Paste your actual Gemini API key here.
        *   Click "Add".

5.  **Deploy**: Click the "Deploy" button.

Vercel will now build and deploy your application. After a few moments, you will get a URL where you can see your live portfolio. Any future pushes to your `main` branch on GitHub will automatically trigger a new deployment on Vercel.
