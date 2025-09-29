# GitHub Repository Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - Repository name: `portfolio`
   - Description: `A modern design portfolio website built with HTML, CSS, and JavaScript`
   - Make it **Public**
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** check "Add .gitignore" (we already have one)
   - **DO NOT** check "Choose a license" (we can add this later)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you the commands. Run these in your terminal:

```bash
# Navigate to your project directory (if not already there)
cd /Users/asyabinsted/Documents/portfolio

# Add the remote origin (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push your code to GitHub
git push -u origin main
```

## Step 3: Verify Setup

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/portfolio`
2. You should see all your files there
3. The repository should show your initial commit

## Step 4: Future Development

For future changes, you can use these commands:

```bash
# Make changes to your files
# Then stage and commit changes
git add .
git commit -m "Your commit message"

# Push changes to GitHub
git push
```

## Alternative: Using GitHub Desktop

If you prefer a GUI, you can also:
1. Download GitHub Desktop
2. Clone the repository you created on GitHub
3. Copy your local files into the cloned repository
4. Commit and push through GitHub Desktop
