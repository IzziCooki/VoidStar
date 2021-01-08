# 💫 VoidStar

This is our submission for the Tech With Tim codejam.

Created by **EternalMoon1234#1145** and **IzziCooki#0001**.

### 📚 Tech Stack

- TypeScript
- Node JS / NPM
- Python (for VoidBot)
- PostgreSQL
- Prisma (ORM)

## 📜 Local Deployment Instructions

Here are some instructions, to get set up with VoidStar, locally.

### ⚙️ Basic Setup

1. First, you need to clone the repository locally. In your terminal once you've created a folder, run the command `git clone https://github.com/eternalmoon1234/VoidStar.git`.
   <br>
2. Next, to install all of the dependencies locally, run the command `npm install`, in the project's directory.
   <br>
3. Thirdly, you need to set up the Database. Have a PostgreSQL server running and create a database by running the command `CREATE DATABASE voidstar;`.
   <br>

   In order to get the same tables as our project, copy the contents of **db/db.sql**, and paste it in your PostgreSQL database. To connect to the Database, create a `.env` file in the root directory of the project. You can look in `SAMPLE.env` in the `DATABASE_URL` key, to figure out how to connect your database.

### 🔐 Secrets

1. In the `SAMPLE.env` file, you will find two other keys, called **CLIENT_ID** and **CLIENT_SECRET**. These values are secrets used to connect to Discord's OAuth API.
   <br>

   To make authentication work, head over to `https://discord.com/developers`. Create a new application called **VoidStar**. Copy the client ID and client secret, and paste it in your `.env` file, accordingly.

### 🚀 Deploy

1. Finally, you can deploy the application!
   <br>

   #### Scripts

   `yarn serve`
   <br>
   The script to serve the application with node.

   `yarn serve-dev`
   <br>
   This is the script used for development, and runs the application with `nodemon`, a tool used to make development easier.

2. If you see a success message in the console that says `✔️ Server started on port 8000`, then it has succeeded. Head over to `http://localhost:8000`, and use the app there!
