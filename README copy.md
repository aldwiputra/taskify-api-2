# Database REST API - Aldwiputra

Simple REST API for Taskify built with [Nest](https://github.com/nestjs/nest).

## Installation

To install the application, follow these steps:

Clone the repository: `git clone https://github.com/revou-fsse-1/w13-my-database-api-aldwiputra.git`

Install the dependencies: `pnpm install`

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## API Endpoints

See a full documentation here [API Documentation](https://documenter.getpostman.com/view/13853356/2s93RTQsZz)

This project exposes the following endpoints:

### GET /users

Returns a list of all users.

---

### POST /users

Creates a new user.

Request Body:

- `username` (string, required) - The username of the user.
- `password` (string, required) - The password of the user.

---

### GET /tasks `OR` /tasks?q=play

Returns a list of all tasks.

Query:

- `q` (string, optional) - The query string to filter the result.

---

### GET /tasks/:id

Returns the details of a specific task.

Parameters:

- `id` (string, required) - The ID of the task to retrieve.

---

### POST /tasks

Creates a new task.

Request Body:

- `title` (string, required) - The name of the user.
- `done` (boolean, required) - Is the task has been done or not.
- `userId` (number, required) - User id of the task's owner.

---

### PUT /tasks/:id

Updates the details of a specific task.

Parameters:

- `id` (string, required) - The ID of the user to update.

Request Body:

- `title` (string, required) - The name of the user.
- `done` (boolean, required) - Is the task has been done or not.

---

### PATCH /tasks/:id

Updates the details of a specific task.

Parameters:

- `id` (string, required) - The ID of the user to update.

Request Body:

- `done` (boolean, required) - Is the task has been done or not.

---

### DELETE /tasks/:id

Deletes a specific task.

Parameters:

- `id` (string, required) - The ID of the user to delete.

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=ts,nestjs,prisma,express,postman,vscode)](https://skillicons.dev)
