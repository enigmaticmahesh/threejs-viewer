import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Scene2 = () => {
  const containerRef = useRef();
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const camera = new THREE.PerspectiveCamera();

  // Setup the Camera
  const controls = new OrbitControls(camera, renderer.domElement);

  useEffect(() => {
    // componentDidMount events
    // When the window resizes adapt the scene
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.clear();
      // Update Controls
      controls.update();
      renderer.render(scene, camera);
    };

    const renderScene = () => {
      // Clear the Scene
      scene.clear();
      // Create a scene, camera, and renderer
      camera.fov = 75;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.near = 0.1;
      camera.far = 1000;
      // Set up the renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      // Create a plane that matches the camera view
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // Standard Material
      // const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      cube.rotation.x += 45;
      cube.rotation.y += 30;

      // Add the Plane
      scene.add(cube);

      // Position the camera
      camera.position.z = 5;
      renderer.render(scene, camera);
      // Make sure you call animate
      animate();
    };
    // Render the scene
    renderScene();
    // Add the resize listener
    window.addEventListener('resize', onWindowResize, false);

    return () => {
      // componentWillUnmount events
      // Make sure to remove the renderer from the container, to avoid ThreeJS drawing an additional canvas everytime you make changes to the code.
      containerRef.current.removeChild(renderer.domElement);
      // Remove the event listener
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  return <div ref={containerRef} className="threejs-loader-2"></div>;
};

export default Scene2;
