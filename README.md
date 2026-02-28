# 🚇 Barcelona Metro 3D Map

An interactive, 3D visualization of the Barcelona metro system. This project combines geographic mapping with 3D elements to provide a unique perspective on the city's transit network.

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://maximka76667.github.io/barcelona-metro-map)

## ✨ Features

- **3D Visualization**: Metro stations are rendered as 3D cones, and lines are represented by colored paths in 3D space, integrated with a **MapLibre GL** map.
- **Route Planning**: Automatically calculate the shortest path between any two stations using **Dijkstra’s algorithm**.
- **Animated Tram**: A 3D tram model that follows your planned route, moving smoothly between stations with realistic rotations.
- **Interactive UI**: Select origin and destination stations via searchable dropdowns to explore the network.
- **Real-time Data**: Fetches the latest metro station and line data from a dedicated GraphQL API.

## 🛠️ Tech Stack

- **Core**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Maps**: [MapLibre GL](https://maplibre.org/), [react-map-gl](https://visgl.github.io/react-map-gl/), [react-three-map](https://github.com/pmndrs/react-three-map)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/), [GraphQL](https://graphql.org/)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/)
- **Testing**: [Jest](https://jestjs.io/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maximka76667/barcelona-metro-map.git
   cd barcelona-metro-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds for production.
- `npm run lint`: Runs ESLint for code quality.
- `npm test`: Runs Jest unit tests.
- `npm run preview`: Previews the production build locally.

## 📂 Project Structure

- `src/components`: UI components and 3D scene elements.
- `src/lib`: Core logic including GraphQL queries, pathfinding utilities, and types.
- `src/store.ts`: Global state management using Zustand.
- `src/apolloClient.ts`: Configuration for the GraphQL client.

## 📄 License

This project is open-source and available under the MIT License.
