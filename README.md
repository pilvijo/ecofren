# Ecofren

Ecofren is an online sustainability-driven game that bridges real-world eco-friendly actions with an immersive virtual experience. The project is organized into two main components:

- **webapp**: A Next.js application providing the web interface for user interactions, dashboards, and integration with various backend services.
- **game**: A Godot project that delivers the interactive in-game experience, where players explore and impact a dynamic world through their eco-actions.

## Folder Structure

```plaintext
Ecofren/
├── webapp/    # Next.js web application
└── game/      # Godot game project
```

## Getting Started

### Prerequisites

- **Node.js** (v14.x or later) and npm/yarn for the webapp
- **Godot Engine** (v3.x or 4.x, depending on your project setup) for the game
- **Git** for version control

### Setting Up the Webapp (Next.js)

1. **Navigate to the `webapp` directory:**
   ```bash
   cd webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   The web interface will be available at [http://localhost:3000](http://localhost:3000).

### Setting Up the Game (Godot)

1. **Open the project in Godot:**
   - Launch the Godot Engine.
   - In the project manager, click "Import" and select the `project.godot` file located in the `game` directory.

2. **Run the game:**
   - Open the main scene (e.g., `Main.tscn`) from the Godot editor.
   - Click the "Play" button to start the game.

## Development Workflow

- **Webapp**: All development related to the Next.js web interface (pages, components, API integration, styling) should be done in the `webapp` folder.
- **Game**: All game development (scenes, scripts, assets) is maintained in the `game` folder using the Godot Engine.

## Contributing

Contributions to Ecofren are welcome! To contribute:

1. **Fork the repository** and create your branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -am "Add feature X"
   ```

3. **Push your branch**:
   ```bash
   git push origin feature/your-feature
   ```

4. **Create a Pull Request** detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
