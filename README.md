# Christian Prenholato - Portfolio Website

A modern, responsive, and performance-oriented personal portfolio website built with **React** and **Vite**. 

This portfolio showcases professional experiences, academic education, technical skills, and features a dynamic integration with the GitHub API to showcase projects.

---

## 🚀 Key Features

* **Dynamic GitHub Integration**: 
  * Automatically fetches public repositories tagged with `<PORTFOLIO>` in the description and lists them in the Projects section.
  * Fetches real-time profile picture and display name directly from the GitHub API, reducing the need to manually update local image assets.
* **Centralized Data Management (`src/data/profile.json`)**:
  * Easily update biography, education timelines, work experience lists, language fluencies, skill sets, and contact details from a single central JSON file without editing React components.
* **Spotlight Card Component**:
  * A reusable `SpotlightCardProject` component built to highlight critical work (such as the TCC Thesis Project) while sitting seamlessly side-by-side with other projects.
* **Modern & Responsive Layout**:
  * Beautiful typing animation on the home page showing different roles.
  * Interactive info sliders.
  * Fully responsive grid layouts using custom, lightweight CSS.

---

## 🛠️ Tech Stack

* **Core**: React (JSX, Hooks)
* **Build Tool**: Vite
* **Styling**: Vanilla CSS (CSS Variables)
* **Data Sources**: GitHub REST API & Local JSON config

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrenholatoChris/prenholatochris.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd prenholatochris.github.io
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### Building for Production

To build the static assets for production (deployed to GitHub Pages):
```bash
npm run build
```
The production-ready assets will be compiled into the `dist/` directory.

---

## 📂 Project Structure

```text
├── src/
│   ├── data/
│   │   └── profile.json          # Central configuration file for experiences, education, and skills
│   ├── Components/
│   │   ├── ProjectComponent.jsx  # Card layout for standard repositories
│   │   └── SpotlightCardProject.jsx # Spotlight card for featured projects
│   ├── AboutPage/                # About Me layout, education, & experiences
│   ├── HomePage/                 # Home banner and typing animations
│   ├── InformationPage/          # Interactive information dots and age calculator
│   ├── NavBar/                   # Sticky navigation bar
│   ├── ProjectPage/              # Dynamic list fetching repos from GitHub
│   ├── SkillsPage/               # Skills categories grid
│   ├── assets/                   # Static images and icons
│   ├── index.css                 # Global styles and design variables
│   └── main.jsx                  # Root React mounting point
├── index.html                    # HTML entry template
├── vite.config.js                # Vite configuration
└── package.json                  # Project scripts and dependencies
```

---

## 📝 Configuration (`profile.json`)

To update your profile information, edit the fields in `src/data/profile.json`:
* `birthDate`: Configures the automatic age calculator in the info banner.
* `homeTitles`: Array of strings that rotate in the home page typing animation.
* `about`: Holds your resume text, work experience, education lists, and languages.
* `skillCategories`: Organizes categories (e.g. languages, frameworks, interests) displayed on the Skills page.
* `contact`: Configures links for email, LinkedIn, Instagram, and GitHub.
