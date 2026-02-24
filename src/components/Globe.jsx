import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Clock,
  IcosahedronGeometry,
  Points,
  Mesh,
  ShaderMaterial,
  MeshBasicMaterial,
  SphereGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { vertexShader, fragmentShader } from "./shaders";

const fixedPoints = [{ lat: 35, long: 175 }];

const Globe = () => {
  const containerRef = useRef(null);
  const canvas3DRef = useRef(null);
  const canvas2DRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    // Early return if refs aren't ready
    if (!containerRef.current || !canvas3DRef.current) return;

    // Store refs in variables for cleanup
    const container = containerRef.current;
    const canvas3D = canvas3DRef.current;

    let renderer, scene, camera, controls;
    let globe, globeMesh, pointer;
    let mapMaterial, animationFrame;
    let clock;

    const init = async () => {
      try {
        // Setup renderer with optimal settings
        renderer = new WebGLRenderer({
          canvas: canvas3D,
          alpha: true,
          powerPreference: "high-performance",
          antialias: true,
        });

        // Calculate optimal pixel ratio (max 2 for performance)
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);

        // Setup scene
        scene = new Scene();
        camera = new OrthographicCamera(-1, 1, 1, -1, 0, 3);
        camera.position.z = 1.1;

        // Setup helpers
        clock = new Clock();

        // Create controls with optimized settings
        controls = new OrbitControls(camera, canvas3D);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minPolarAngle = 0.4 * Math.PI;
        controls.maxPolarAngle = 0.4 * Math.PI;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;

        // Load texture
        const textureLoader = new TextureLoader();
        const earthTexture = await textureLoader.loadAsync(
          "https://ksenia-k.com/img/earth-map-colored.png",
        );

        createGlobe(earthTexture);
        createPointer();
        addFixedMarkers();

        // Initial size setup
        updateSize();

        // Start render loop
        render();
      } catch (error) {
        console.error("Failed to initialize globe:", error);
      }
    };

    const createGlobe = (earthTexture) => {
      // Reduce geometry complexity for better performance
      const globeGeometry = new IcosahedronGeometry(1, 35); // Reduced from 55

      mapMaterial = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_map_tex: { value: earthTexture },
          u_dot_size: { value: 0 },
          u_pointer: { value: new Vector3(0, 0, 1) },
          u_time_since_click: { value: 0 },
        },
        transparent: true,
      });

      globe = new Points(globeGeometry, mapMaterial);
      scene.add(globe);

      // Only add mesh if needed for debugging/interaction
      if (process.env.NODE_ENV === "development") {
        globeMesh = new Mesh(
          globeGeometry,
          new MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.2,
          }),
        );
        scene.add(globeMesh);
      }
    };

    const createPointer = () => {
      // Start with scale 0, will be updated when needed
      const geometry = new SphereGeometry(0.015, 8, 8); // Reduced segments
      const material = new MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 1,
      });
      pointer = new Mesh(geometry, material);
      pointer.scale.set(0, 0, 0); // Start invisible
      scene.add(pointer);
    };

    const addFixedMarkers = () => {
      // Optimize marker geometry
      const markerGeometry = new SphereGeometry(0.015, 6, 6); // Reduced segments
      const markerMaterial = new MeshBasicMaterial({ color: 0x8f9094 });

      fixedPoints.forEach((point) => {
        const latRad = (point.lat * Math.PI) / 180;
        const longRad = (point.long * Math.PI) / 180;
        const x = Math.cos(latRad) * Math.cos(longRad);
        const y = Math.sin(latRad);
        const z = Math.cos(latRad) * Math.sin(longRad);

        const marker = new Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z).normalize();
        scene.add(marker);
      });
    };

    const updateSize = () => {
      if (!container) return;

      const minSide = 0.65 * Math.min(window.innerWidth, window.innerHeight);
      container.style.width = `${minSide}px`;
      container.style.height = `${minSide}px`;

      if (renderer) {
        renderer.setSize(minSide, minSide);
      }

      if (mapMaterial) {
        mapMaterial.uniforms.u_dot_size.value = 0.032 * minSide;
      }
    };

    const render = () => {
      if (!mapMaterial || !controls || !scene || !camera || !renderer) return;

      mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);

      animationFrame = requestAnimationFrame(render);
    };

    // Handle resize
    const handleResize = () => {
      updateSize();
    };

    // Start initialization
    init();

    // Add event listeners
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      if (renderer) {
        renderer.dispose();
      }

      if (controls) {
        controls.dispose();
      }

      if (scene) {
        scene.clear();
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <div className="scale-[0] -rotate-180 cursor-pointer" ref={containerRef}>
      <canvas ref={canvas3DRef} id="globe-3d" className="w-full h-full" />
      <canvas ref={canvas2DRef} id="globe-2d-overlay" className="hidden" />
      <div id="globe-popup-overlay" className="hidden">
        <div ref={popupRef} className="globe-popup" />
      </div>
    </div>
  );
};

export default Globe;
