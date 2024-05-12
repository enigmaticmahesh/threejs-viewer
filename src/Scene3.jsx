import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Scene3 = () => {
  const containerRef = useRef();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const camera = new THREE.PerspectiveCamera();

  // Setup the Camera
  const controls = new OrbitControls(camera, renderer.domElement);

  useEffect(() => {
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      //   renderer.clear();
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
      camera.far = 1100;
      // Set up the renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
      light.position.set(0, 1, 0);
      scene.add(light);

      const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
      light.position.set(0, 1, 0);
      scene.add(light2);

      const fbxLoader = new FBXLoader();
      fbxLoader.load(
        'https://files.threedy.ai/jobs/fbeeff24/other/mesh_separated.fbx',
        (object) => {
          scene.add(object);
          // Make sure you call animate
          animate();
        }
      );

      // Position the camera
      camera.position.z = 1000;
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

export default Scene3;
