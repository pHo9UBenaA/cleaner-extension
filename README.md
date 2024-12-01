# Cleaner Extension

Cleaner Extension is a Chrome extension that automates organizing your Gmail inbox and Prime Video watch history.

---

## Features

- **Gmail Inbox Cleanup**: Automatically deletes emails without stars.
- **Prime Video Watch History Cleanup**: Automatically removes watch history.

---

## Installation

### 1. Set Up Using Docker

Follow these steps to set up the project with Docker:

1. Clone or download the repository:

   ```bash
   git clone https://github.com/pHo9UBenaA/cleaner-extension.git
   cd cleaner-extension
   ```

2. Copy the environment variables template and configure it:

   ```bash
   cp .env.example .env
   ```

3. Build and start the Docker containers:

   ```bash
   docker compose up -d --build
   ```

4. Install dependencies:

   ```bash
   docker compose exec node pnpm i --frozen-lockfile
   ```

5. Build the project:

   ```bash
   docker compose exec node pnpm run build
   ```

6. Install the extension in Chrome:

   1. Locate the generated `dist` folder.
   2. Open Chrome and navigate to `chrome://extensions/`.
   3. Enable developer mode and select "Load unpacked."
   4. Choose the `dist` folder.

---

## Environment Variables

You can customize the project behavior using the `.env` file.

| Variable Name          | Description                                              | Default Value |
|------------------------|----------------------------------------------------------|---------------|
| `CONFIRM_WHEN_DELETE`  | Show confirmation dialog when deleting emails (`yes` or `no`) | `no`          |

---

## Development Setup Without Docker

If you prefer to set up the project locally without Docker, follow these steps:

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

---

## Technologies Used

- **Package Manager**: pnpm
- **Build Tool**: esbuild
- **Code Formatter**: Prettier
- **Linting**: ESLint
- **Containerization**: Docker & Docker Compose

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
