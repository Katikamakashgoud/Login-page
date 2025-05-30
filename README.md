# Login Info with Deception Detection

This is a modern React TypeScript application that implements a secure login form with built-in deception detection features. The application uses Material-UI for a beautiful and responsive user interface.

## Features

- Modern, responsive UI using Material-UI
- TypeScript for type safety
- Deception detection features:
  - Typing speed analysis
  - Mouse movement tracking
  - Failed login attempt monitoring
  - Suspicious activity detection

## Deception Detection Mechanisms

The application implements several deception detection mechanisms:

1. **Typing Speed Analysis**
   - Tracks the time between keystrokes
   - Detects suspiciously fast typing patterns
   - Identifies potential automated attacks

2. **Mouse Movement Tracking**
   - Monitors mouse movement patterns
   - Helps identify automated or bot-like behavior

3. **Login Attempt Monitoring**
   - Tracks failed login attempts
   - Implements rate limiting
   - Detects rapid successive attempts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Security Features

- Input validation
- Rate limiting
- Suspicious activity detection
- Secure password field
- Loading state management
- Error handling

## Technologies Used

- React 18
- TypeScript
- Material-UI
- Emotion (for styling)
- Web Vitals (for performance monitoring)

## Development

The project uses Create React App with TypeScript template. To modify the deception detection logic, you can adjust the thresholds in the `App.tsx` file:

- Typing speed threshold: Currently set to 50ms between keystrokes
- Login attempt cooldown: Currently set to 2000ms (2 seconds)

## Note

This is a demonstration application. In a production environment, you would want to:

1. Implement proper backend authentication
2. Use HTTPS
3. Add CSRF protection
4. Implement proper session management
5. Add more sophisticated deception detection algorithms
6. Use environment variables for configuration
7. Add proper logging and monitoring #   L o g i n - p a g e  
 #   L o g i n - p a g e  
 