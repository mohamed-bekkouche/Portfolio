import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { vertexShader, fragmentShader } from "./shaders";

const fixedPoints = [{ lat: 35, long: 175 }];

const Globe = () => {
  const containerRef = useRef(null);
  const canvas3DRef = useRef(null);
  const canvas2DRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !canvas3DRef.current ||
      !canvas2DRef.current ||
      !popupRef.current
    )
      return;

    let renderer, scene, camera, rayCaster, controls;
    let globe, globeMesh, pointer, clock, mouse;
    let mapMaterial;

    const init = async () => {
      // Setup renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas3DRef.current,
        alpha: true,
      });
      renderer.setPixelRatio(4);

      // Setup scene
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 3);
      camera.position.z = 1.1;

      // Setup raycaster
      rayCaster = new THREE.Raycaster();
      rayCaster.far = 1.15;
      mouse = new THREE.Vector2(-1, -1);
      clock = new THREE.Clock();

      // Create controls
      controls = new OrbitControls(camera, canvas3DRef.current);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.minPolarAngle = 0.4 * Math.PI;
      controls.maxPolarAngle = 0.4 * Math.PI;
      controls.autoRotate = true;

      // Load texture and create globe
      const textureLoader = new THREE.TextureLoader();
      const earthTexture = await textureLoader.loadAsync(
        "https://ksenia-k.com/img/earth-map-colored.png"
      );

      createGlobe(earthTexture);
      createPointer();
      addFixedMarkers();
      updateSize();
      render();
    };

    const createGlobe = (earthTexture) => {
      const globeGeometry = new THREE.IcosahedronGeometry(1, 55);
      mapMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_map_tex: { type: "t", value: earthTexture },
          u_dot_size: { type: "f", value: 0 },
          u_pointer: { type: "v3", value: new THREE.Vector3(0, 0, 1) },
          u_time_since_click: { value: 0 },
        },
        alphaTest: false,
        transparent: true,
      });

      globe = new THREE.Points(globeGeometry, mapMaterial);
      scene.add(globe);

      globeMesh = new THREE.Mesh(
        globeGeometry,
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.2,
        })
      );
      scene.add(globeMesh);
    };

    const createPointer = () => {
      const geometry = new THREE.SphereGeometry(0.0, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 1,
      });
      pointer = new THREE.Mesh(geometry, material);
      scene.add(pointer);
    };

    const addFixedMarkers = () => {
      const markerGeometry = new THREE.SphereGeometry(0.015, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x8f9094 });

      fixedPoints.forEach((point) => {
        const latRad = (point.lat * Math.PI) / 180;
        const longRad = (point.long * Math.PI) / 180;
        const x = Math.cos(latRad) * Math.cos(longRad);
        const y = Math.sin(latRad);
        const z = Math.cos(latRad) * Math.sin(longRad);

        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z).normalize();
        scene.add(marker);
      });
    };

    const updateSize = () => {
      if (!containerRef.current || !canvas2DRef.current) return;

      const minSide = 0.65 * Math.min(window.innerWidth, window.innerHeight);
      containerRef.current.style.width = `${minSide}px`;
      containerRef.current.style.height = `${minSide}px`;
      renderer.setSize(minSide, minSide);
      canvas2DRef.current.width = canvas2DRef.current.height = minSide;
      if (mapMaterial) {
        mapMaterial.uniforms.u_dot_size.value = 0.032 * minSide;
      }
    };

    const render = () => {
      if (!mapMaterial) return;

      mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    init();
    return () => {
      scene.clear();
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className=" scale-[0] -rotate-180  cursor-pointer" ref={containerRef}>
      <canvas className="" ref={canvas3DRef} id="globe-3d" />
      <canvas ref={canvas2DRef} id="globe-2d-overlay" />
      <div id="globe-popup-overlay">
        <div ref={popupRef} className="globe-popup" />
      </div>
      //{" "}
    </div>
  );
};

export default Globe;
