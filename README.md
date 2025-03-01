# Clustox Ticket Manager

A modern, responsive single-page application that serves as a ticket management system for software development teams, powered by the Groq API.

## Features

- AI-powered ticket parsing to convert project manager tickets into actionable tasks
- Task history with ticket organization
- Local storage integration for persistent tasks and ticket history
- Responsive design for all device sizes
- Clean, professional user interface with Clustox branding

## How It Works

The Clustox Ticket Manager allows users to:

1. Enter project manager tickets in natural language
2. Have the AI parse and structure the tickets into actionable tasks
3. View tasks as interactive checkboxes
4. Mark tasks as complete/incomplete
5. Access previous tickets through the ticket history
6. Persist task and ticket status between sessions using local storage

### Task Parsing

When a user enters a project manager ticket, the application sends a prompt to the Groq API asking it to parse the input into a structured list of tasks. The system then:

1. Creates a new ticket entry with the parsed tasks
2. Adds the ticket to the history
3. Displays the tasks as checkboxes
4. Tracks completion status of both individual tasks and entire tickets

### Local Storage

The application uses local storage to maintain:
- Current active tasks
- Complete ticket history with metadata
- Completion status of tickets and tasks

## Environment Setup

This project uses environment variables to store sensitive information like API keys.

1. Create a `.env` file in the root directory
2. Add your Groq API key:
```
VITE_REACT_APP_GROQ_API_KEY=your_api_key_here
```

**IMPORTANT**: Never commit your `.env` file to version control. It's already added to `.gitignore`.

## Security Note

This implementation uses `dangerouslyAllowBrowser: true` to allow client-side API calls, which exposes the API key to the browser. In a production environment, you should move API calls to a backend server to protect your API key.

## Getting Started

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

3. Build for production:
```
npm run build
```

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Groq SDK
- Lucide React for icons
- UUID for generating unique IDs
- Local Storage API for data persistence