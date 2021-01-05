# 💫 VoidStar

This is our submission for the Tech With Tim codejam.

Created by **EternalizedMoonlight#1145** and **IzziCooki#0001**.

### 📚 Tech Stack

- React (Soon)
- Node JS / NPM
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

   `npm run start`
   <br>
   The script to start the application with node.

   `npm run dev`
   <br>
   This is the script used for development, and runs the application with `nodemon`, a tool used to make development easier.

2. If you see a success message in the console that says `✔️ Server started on port 8000`, then it has succeeded. Head over to `http://localhost:8000`, and use the app there!

## ⚙️ VoidStar API

The VoidStar API is extremely powerful, as it is secure, has a great deal of endpoints, and gives developers customizability. This section will be about how to get started using our API.

> All of the endpoints can be accessed after specifying the API version number.

**Current API Version: V1**

#### API Rate Limiting

To prevent users and bots from spamming the API, we have set up rate limiting. The rate limit for each endpoint will be given by the amount of requests allowed, in how many minutes.

#### Base URL

`https://voidstar.com/api/v{version_number}`

### Authentication

We use Discord and GitHub OAuth in VoidStar, which means that authentication is secured with Discord and GitHub.

To gain access to the other endpoints, a user needs to be authenticated. Your users will need to go through either Discord, or GitHub OAuth, to access the API. There are two ways to authenticate, with two services.

> Please remember, you can only view your own personal information, such as tasks, your calendar, and other data.

**POST** - /api/v1/auth/discord

This endpoint will redirect you to Discord's Authorization page, where you will give access to certain information.

**POST** - /api/v1/auth/github

This endpoint will redirect you to GitHub's Authorization page, where you will give access to certain information.

### 📝 Tasks Endpoints

**POST** - /api/v1/tasks/create/{task-title}/{task-description}/{task-category}
<br>

Create a new task with your options, and save it in the Database. A unique task ID will be returned, which can be used to delete tasks.

#### Request Parameters

**task-title** - The created task's title.
<br>
**task-description** - The created task's description.
<br>
**task-category** - The created task's category.

_Rate Limit_: **30** requests per **1** minute

---

**POST** - /api/v1/tasks/create/archive/{task.id}
<br>

Archive a task, which makes it readonly.

#### Request Parameters

**task-id** - The ID of the task to-be-archived.

_Rate Limit_: **20** requests per **1** minute

---

**POST** - /api/v1/tasks/create/unarchive/{task.id}
<br>

Unarchive a task, making it editable.

#### Request Parameters

**task-id** - The ID of the task to-be unarchived.

_Rate Limit_: **20** requests per **1** minute

---

**GET** - /api/v1/tasks/get
<br>

Fetch all of your tasks, with their task ID, title, description, and category.

#### Request Parameters

**None**

_Rate Limit_: **60** requests per **1** minute

---

**DELETE** - /api/v1/tasks/delete/{task-id}
<br>

Delete a certain task, by its task ID. The task is moved to a deleted database, but being hashed. If a user wants to restore a task, it is moved back to the main Database. After a certain period, the task will be fully dropped.

#### Request Parameters

**task-id** - The to-be-deleted task's ID.

_Rate Limit_: **30** requests per **1** minute

---

**DELETE** - /api/v1/tasks/permdelete/{task-id}
<br>

Permanently delete a task, and drop it from the deleted database.

#### Request Parameters

**task-id** - The to-be-perm-deleted task's ID.

_Rate Limit_: **20** requests per **1** minute

---

### 🤖 VoidBot Endpoints
