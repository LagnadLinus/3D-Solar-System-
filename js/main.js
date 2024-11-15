
/// <reference path='./vendor/babylon.d.ts' />

// getting the canvas 
const canvas = document.getElementById('renderCanvas');

// creating WebGL engine with babylon 
const engine = new BABYLON.Engine(canvas, true);  // passing canvas element as parameter and true for anti aliasing

function createCamera(scene) {
    // adding Arch camera with alpha, beta, & raidus value with target.  
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 20, BABYLON.Vector3.Zero(), scene);
    // allowing users to control camera movements
    camera.attachControl(canvas);

    // limit camera movement when zooming in and out the camera 
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 60;

    scene.registerBeforeRender(() => {
        camera.alpha += 0.001;  // Adjust for a smooth, gradual orbit
    });
    
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;  // it controls the amount of light for the background scene
    light.groundColor = new BABYLON.Color3(0, 0, 1);    // changing the ground color light to blue
}

function createSun(scene) {
    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene); // adding material to Sun
    sunMaterial.emissiveTexture = new BABYLON.Texture('assets/images/sun.jpg', scene);  //adding texture path for sun 
    sunMaterial.diffuseColor = new BABYLON.Color3.Black();
    sunMaterial.specularColor = new BABYLON.Color3.Black(); // it removes the reflective light

    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {segments: 16, diameter: 4}, scene); // creating sun shape
 
    // To make the sun use the material
    sun.material = sunMaterial;

    // Sun Emitting Light 
    const sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
    sunLight.intensity = 3;     // maing the light stronger

    // Add rotation animation to the sun
    scene.registerBeforeRender(() => {
        sun.rotate(BABYLON.Axis.Y, 0.008, BABYLON.Space.LOCAL); // Adjust speed as needed
    });
}

function createPlanets(scene){

    const textures = [
        'assets/images/mercury.jpg',  // Mercury
        'assets/images/venus.jpg',    // Venus
        'assets/images/earth.jpg',    // Earth
        'assets/images/mars.jpg',     // Mars
        'assets/images/jupiter.jpg',  // Jupiter
        'assets/images/saturn.jpg',   // Saturn
        'assets/images/uranus.jpg',   // Uranus
        'assets/images/neptune.jpg'   // Neptune
    ];

    const sizes = [0.5, 1, 1.1, 0.8, 2.5, 2.2, 1.7, 1.6];  // Different sizes for each planet
    const speeds = [0.03, 0.025, 0.02, 0.015, 0.01, 0.008, 0.005, 0.003]; // Orbital speeds

    for (let i = 0; i < 8; i += 1) {
        // Create a unique material for each planet
        const planetMaterial = new BABYLON.StandardMaterial(`planetMaterial${i}`, scene);
        planetMaterial.diffuseTexture = new BABYLON.Texture(textures[i], scene);  // Set texture
        planetMaterial.specularColor = BABYLON.Color3.Black();  // Remove reflection

        // Create each planet with its own size
        const planet = BABYLON.MeshBuilder.CreateSphere(`planet${i}`, {segments: 16, diameter: sizes[i]}, scene);
        planet.position.x = (2 * i) + 4;  // Set initial position
        planet.material = planetMaterial;  // Apply material

        // Set up orbit properties
        planet.orbit = {
            radius: planet.position.x,
            speed: speeds[i],
            angle: 0,
        };

        // function to update x and z position of the planets
        scene.registerBeforeRender(() => {
            //updating position
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
            //updating angle
            planet.orbit.angle += planet.orbit.speed;
            planet.rotation.y += 0.01;  // Adjust the speed as needed
        });  
    }
    }


// function to create skybox
function createSkybox(scene) {
    //creating material for skycube 
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);
    
    skyboxMaterial.backFaceCulling = false;    // backFaceCulling to false to render the box

    skyboxMaterial.specularColor = BABYLON.Color3.Black(); // it removes the reflective light
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();
    


    // loading the texture for 6 side of the box
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox/skybox', scene);
    // Giving Coordinates
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    const skybox = BABYLON.MeshBuilder.CreateBox('skybox', { size: 1000}, scene); 


    skybox.infiniteDistance = true;    // to move the camera with skybox and give 3D vibe

    // updating skybox to have the material
    skybox.material = skyboxMaterial;

} 

// Loading 3D objects and creating ship
function createShip(scene) {
    BABYLON.SceneLoader.ImportMesh('', 'assets/models/stylised_spaceship/', 'scene.gltf', scene, (meshes) => {
        console.log(meshes);
        // to move, position and scale the ship 
        meshes.forEach((mesh) => {
            mesh.position = new BABYLON.Vector3(0, -5, 10);
            mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

             // Adding a point light near the spaceship
            const shipLight = new BABYLON.PointLight('shipLight', new BABYLON.Vector3(0, -5, 10), scene);
            shipLight.intensity = 0.8;  // Adjust the intensity to suit the scene
            shipLight.parent = mesh;  // Attach the light to the spaceship model

        });
    });
}



// creating scene 
function createScene() {
    const scene = new BABYLON.Scene(engine);
    // updating bg color of the scene
    scene.clearColor = BABYLON.Color3.Black();

// creating camera
createCamera(scene);

// creating light 
createLight(scene);

//creating Sun
const sun = createSun(scene);

//creating planet 1
createPlanets(scene);

//creating skybox 
createSkybox(scene);

//creating ship
createShip();

return scene;
}

// creating our scene 
const mainScene = createScene();


engine.runRenderLoop(() => {
    mainScene.render();
})


