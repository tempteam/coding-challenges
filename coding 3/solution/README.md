# Nx Angular NestJS App

This repository is an Nx monorepo that includes both an Angular frontend and a NestJS backend API.

## Requirements

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

```bash
git clone git@github.com:tempteam/coding-challenge-fs.git
cd coding-challenge-fs/solution
```

2. Install dependencies:

```bash
npm install
```

## Run tasks

1. To start the Angular frontend, run:

```sh
npm run serve:frontend
```

The frontend will start on http://localhost:4200 by default.

2. To start the NestJS API, run:

```sh
npm run serve:api
```

The API will start on http://localhost:3333 by default.


## API Endpoints

The API includes the following endpoints for managing people:

- **`GET /api/people`**

  Returns a list of people.

- **`GET /api/people?name=SEARCH_TERM`**

Returns a list of people filtered by name, where `SEARCH_TERM` is the search term.

- **`GET /api/people?name=SEARCH_TERM&page=1&limit=10`**

  Returns a paginated list of people filtered by name, with specified page and limit parameters.

- **`GET /api/people?page=1&limit=10`**

  Returns a paginated list of people with specified page and limit parameters.

> **Note**: The `limit` parameter defaults to 10 if not specified. Replace `SEARCH_TERM`, `page=1`, and `limit=10` with the actual values as needed.
