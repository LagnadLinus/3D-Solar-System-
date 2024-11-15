**Solar System Project Using Babylon.js**

**Overview**

This project is a 3D Solar System simulation using Babylon.js, an open-source JavaScript framework for building 3D web applications. The simulation includes a Sun, planets orbiting around it, a space background with stars, and an animated spaceship. The project also demonstrates loading external 3D assets like a spaceship model and implementing interactive camera and lighting effects for a space-like experience.

**Features**

**3D Solar System:** The Sun and 8 planets, each with unique textures and sizes, orbiting around the Sun.
**Interactive Camera:** The ArcRotateCamera allows users to move around the scene, providing a 3D perspective of the Solar System.
**Lighting Effects: **Various light sources including hemispheric light for general illumination and point light for sun-like illumination.
**Space Background:** A starry skybox adds a realistic space effect to the scene.
**External 3D Models:** A stylized spaceship model is loaded into the scene to add interactivity and realism.
**Animations:** Planets rotate and orbit the Sun, with smooth transitions and orbital speeds.


**Project Setup**

**Prerequisites**
A modern web browser (e.g., Google Chrome, Mozilla Firefox)
Node.js and npm (for running the development server)

**Installation**
Clone the repository:
git clone https://github.com/LagnadLinus/3D-Solar-System-
cd solar-system-babylonjs

**Install dependencies:** If you haven't installed the required dependencies, use the following command:
npm install
**Run the development server:** Use a development server to preview the project. You can use a plugin like Live Server (VS Code extension) or set up your own local server.
**Access the project:** Open index.html in a web browser to view the Solar System simulation.


**How to Use**

Use your mouse or touchpad to drag and rotate the camera around the Solar System.
Observe the planets as they orbit around the Sun.
The spaceship model is included for added interactivity.


**Project Structure**

**index.html:** The main HTML file containing the canvas element to render the scene.
**main.js:** The core JavaScript file containing the Babylon.js scene setup, camera, lighting, animations, and 3D object loading.
**assets/:** Directory for textures and external 3D models used in the simulation (e.g., planet textures, spaceship model).
**assets/models/:** Folder containing the 3D model files (e.g., spaceship) in .gltf format.
**assets/images/:** Textures for planets and the skybox.


**Technologies Used**

**Babylon.js:** A powerful 3D engine for rendering the Solar System simulation.
**WebGL:** A JavaScript API for rendering interactive 3D graphics in the browser.
**HTML/CSS/JavaScript:** Standard web technologies used for the front-end of the application.
**GLTF:** A file format for 3D models used in the project (spaceship model).


**Contributions**

Feel free to contribute to this project by forking the repository, making changes, and submitting a pull request. Contributions are welcome for improvements, bug fixes, or adding new features.


**Acknowledgments**

Special thanks to Nuriddin Xamidov for providing the stylized spaceship model used in this project.
Babylon.js community for making 3D rendering accessible via JavaScript.
