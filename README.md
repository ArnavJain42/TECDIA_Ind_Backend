```md
# 🧠 Recruitment Apply Backend (Express + MongoDB)

This is a Node.js backend server for a recruitment application portal. It allows users to:
- Apply for jobs
- Receive pins via email
- Check application status using email + pin
- Admins can register, login, view all applications, and update statuses.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (local)
- Mongoose
- Nodemailer (for sending pins)
- JWT (for admin auth)

---

## 🗂 Project Structure

```

recruitment-app-backend/
├── controllers/
├── models/
├── routes/
├── utils/
├── config/
├── .env
├── .gitignore
├── app.js
├── server.js
└── README.md

````

---

## 🚀 Setup & Run

### Clone the repo
```bash
git clone https://github.com/ArnavJain42/TECDIA_Ind_Backend.git
cd recruitment-app-backend
````

### Install dependencies

```bash
npm install
```

### Create a `.env` file

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URI  =**CONTACTADMIN**
JWT_SECRET =**CONTACTADMIN**
EMAIL_USER =**CONTACTADMIN**
EMAIL_PASS =**CONTACTADMIN**
```

### Start the server

```bash
npm start
```

-----

## 📬 API Endpoints

### 👤 Applicant

| Method | Endpoint                      | Description               |
| :----- | :---------------------------- | :------------------------ |
| `POST` | `/api/applications/apply`       | Apply for a job           |
| `POST` | `/api/applications/check-status`| Check status with pin     |

### 🔐 Admin

| Method | Endpoint                           | Description                   |
| :----- | :--------------------------------- | :---------------------------- |
| `POST` | `/api/auth/register`               | Register a new admin          |
| `POST` | `/api/auth/login`                  | Login and receive JWT         |
| `GET`  | `/api/applications/admin/all`      | View all applications (Protected) |
| `PATCH`| `/api/applications/admin/update/:id`| Update application status (Protected) |

-----

## ✅ Application Fields

  - **name**: Applicant's full name (`String`, `required`)
  - **email**: Unique email address (`String`, `required`, `unique`)
  - **phone**: Contact number (`String`, `required`)
  - **position**: Applied job role (`String`, `required`)
  - **resumeLink**: URL to the applicant's resume (`String`, `required`)
  - **additionalQuery**: Any note or query from the applicant (`String`)
  - **status**: Application status (`String`, `enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected']`, `default: 'Pending'`)
  - **pin**: One-time password for status check (`String`)
  - **pinExpires**: Expiration timestamp for the pin (`Date`)

-----

## 📌 TODOs

  - [ ] Add rate-limiting for pin requests.
  - [ ] Add comprehensive input validation and error handling.
  - [ ] Write unit and integration tests.

<!-- end list -->

```
```