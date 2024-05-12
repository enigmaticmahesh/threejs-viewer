import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import './App.css';

function Scene1() {
  const conatinerRef = useRef();
  useEffect(() => {
    // const onload = (file) => {
    //   console.log({ file });
    //   scene.add(file);
    // };
    const onProgress = (data) => {
      console.log({ data });
    };
    const onError = (error) => {
      console.log({ error });
    };

    let renderer = null;

    const loadViewer = () => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdddddd);

      const camera = new THREE.PerspectiveCamera(
        5,
        // window.innerWidth / window.innerHeight,
        conatinerRef.current.clientWidth / conatinerRef.current.clientHeight,
        1,
        5000
      );
      camera.position.z = 1000;

      const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
      light.position.set(0, 1, 0);
      scene.add(light);

      const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
      light.position.set(0, 1, 0);
      scene.add(light2);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      // renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(
        conatinerRef.current.clientWidth,
        conatinerRef.current.clientHeight
      );
      // document.body.appendChild(renderer.domElement);
      // document
      //   .querySelector('.threejs-looader')
      //   .appendChild(renderer.domElement);
      conatinerRef.current &&
        conatinerRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', renderer);

      const animate = () => {
        requestAnimationFrame(animate);
        // renderer.clear();
        // controls.update();
        renderer.render(scene, camera);
      };

      const fbxLoader = new FBXLoader();
      // fbxLoader.load('./ToyCar.fbx', (object) => {
      fbxLoader.load(
        'https://files.threedy.ai/jobs/fbeeff24/other/mesh_separated.fbx',
        (object) => {
          scene.add(object);
          animate();
        }
      );
      // renderer.render(scene, camera);
    };
    loadViewer();
    return () => {
      renderer.domElement.remove();
      // conatinerRef.current.remove();
    };
  }, []);
  // useEffect(() => {
  //   // const onload = (file) => {
  //   //   console.log({ file });
  //   //   scene.add(file);
  //   // };
  //   const onProgress = (data) => {
  //     console.log({ data });
  //   };
  //   const onError = (error) => {
  //     console.log({ error });
  //   };
  //   let renderer = null;
  //   const loadViewer = () => {
  //     const scene = new THREE.Scene();

  //     scene.background = new THREE.Color(0xa0a0a0);

  //     // const camera = new THREE.PerspectiveCamera(
  //     //   75,
  //     //   window.innerWidth / window.innerHeight,
  //     //   0.1,
  //     //   1000
  //     // );
  //     const camera = new THREE.PerspectiveCamera(
  //       45,
  //       window.innerWidth / window.innerHeight,
  //       1,
  //       2000
  //     );
  //     // camera.position.set(100, 200, 300);

  //     renderer = new THREE.WebGLRenderer({ antialias: true });
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     document
  //       .querySelector('.threejs-looader')
  //       .appendChild(renderer.domElement);

  //     //controls
  //     const controls = new OrbitControls(camera, renderer.domElement);
  //     controls.enableZoom = false;
  //     controls.enablePan = false;
  //     controls.target.set(0, 0, 0);

  //     // const geometry = new THREE.BoxGeometry(1, 1, 1);
  //     // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //     // const cube = new THREE.Mesh(geometry, material);
  //     // scene.add(cube);

  //     const loader = new FBXLoader();
  //     loader.load(
  //       'https://files.threedy.ai/jobs/fbeeff24/other/mesh_separated.fbx',
  //       (object) => {
  //         console.log({ object });
  //         object.traverse(function (child) {
  //           if (child.isMesh) {
  //             child.castShadow = true;
  //             child.receiveShadow = true;
  //           }
  //         });
  //         scene.add(object);
  //       },
  //       onProgress,
  //       onError
  //     );
  //     // loader.load(
  //     //   // 'https://res.cloudinary.com/diob85xoy/image/upload/v1708419649/rkdlgxdxtsm9hd3t21ui.glb',
  //     //   'https://files.threedy.ai/jobs/fbeeff24/other/mesh_separated.fbx',
  //     //   function (gltf) {
  //     //     console.log({ gltf });
  //     //     scene.add(gltf.scene);
  //     //     renderer.render(scene, camera);
  //     //   },
  //     //   undefined,
  //     //   function (error) {
  //     //     console.error({ error });
  //     //   }
  //     // );

  //     camera.position.z = 5;
  //     renderer.render(scene, camera);
  //     // function animate() {
  //     //   requestAnimationFrame(animate);

  //     //   cube.rotation.x += 0.01;
  //     //   cube.rotation.y += 0.01;

  //     //   renderer.render(scene, camera);
  //     // }

  //     // animate();
  //   };
  //   loadViewer();
  //   return () => {
  //     renderer.domElement.remove();
  //   };
  // }, []);

  return (
    <>
      <div ref={conatinerRef} className="threejs-looader"></div>
      {/* <canvas ref={canvasRef} className="threejs-looader"></canvas> */}
    </>
  );
}

export default Scene1;
