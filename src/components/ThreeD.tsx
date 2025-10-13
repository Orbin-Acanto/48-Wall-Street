'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCw, Pause, Play } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface FloorPlan3DViewerProps {
  emptyModelPath: string;
  furnishedModelPath: string;
  initialFurnished?: boolean;
}

export default function ThreeD({
  emptyModelPath,
  furnishedModelPath,
  initialFurnished = false,
}: FloorPlan3DViewerProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [showFurnished, setShowFurnished] = useState(initialFurnished);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!canvasRef.current) return;

    let mounted = true;
    setIsLoading(true);

    const initScene = async () => {
      try {
        if (!mounted || !canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f5);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          50,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000
        );
        camera.position.set(15, 12, 15);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true,
        });
        renderer.setSize(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        rendererRef.current = renderer;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.bias = -0.001;
        scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-10, 15, -10);
        scene.add(fillLight);

        const hemisphereLight = new THREE.HemisphereLight(
          0xffffff,
          0x444444,
          0.5
        );
        hemisphereLight.position.set(0, 20, 0);
        scene.add(hemisphereLight);

        const pointLight1 = new THREE.PointLight(0xd2b371, 0.8, 30);
        pointLight1.position.set(5, 8, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xd2b371, 0.8, 30);
        pointLight2.position.set(-5, 8, -5);
        scene.add(pointLight2);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 5;
        controls.maxDistance = 40;
        controls.maxPolarAngle = Math.PI / 2.1;
        controls.autoRotate = isRotating;
        controls.autoRotateSpeed = 1.5;
        controls.target.set(0, 0, 0);
        controlsRef.current = controls;

        // Load GLB model
        const loader = new GLTFLoader();
        const modelPath = showFurnished ? furnishedModelPath : emptyModelPath;

        loader.load(
          modelPath,
          (gltf) => {
            if (!mounted) return;

            const model = gltf.scene;

            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                if (mesh.material) {
                  const material = mesh.material as THREE.MeshStandardMaterial;
                  material.needsUpdate = true;

                  if (material.metalness !== undefined) {
                    material.metalness = Math.max(
                      material.metalness * 0.8,
                      0.1
                    );
                  }
                  if (material.roughness !== undefined) {
                    material.roughness = Math.max(material.roughness, 0.3);
                  }
                }
              }
            });

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x += model.position.x - center.x;
            model.position.y += model.position.y - center.y;
            model.position.z += model.position.z - center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 20 / maxDim;
            model.scale.setScalar(scale);

            const newBox = new THREE.Box3().setFromObject(model);
            const newCenter = newBox.getCenter(new THREE.Vector3());
            model.position.sub(newCenter);

            if (modelRef.current && sceneRef.current) {
              sceneRef.current.remove(modelRef.current);
              modelRef.current.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  if (mesh.geometry) mesh.geometry.dispose();
                  if (mesh.material) {
                    if (Array.isArray(mesh.material)) {
                      mesh.material.forEach((mat) => mat.dispose());
                    } else {
                      mesh.material.dispose();
                    }
                  }
                }
              });
            }

            scene.add(model);
            modelRef.current = model;
            setIsLoading(false);
          },
          (progress) => {
            const percentComplete = (progress.loaded / progress.total) * 100;
            console.log(`Loading: ${percentComplete.toFixed(0)}%`);
          },
          (error) => {
            console.error('Error loading 3D model:', error);
            setIsLoading(false);
          }
        );

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationFrameRef.current = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
          if (!canvasRef.current || !mounted) return;

          const width = canvasRef.current.clientWidth;
          const height = canvasRef.current.clientHeight;

          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Error initializing 3D scene:', error);
        setIsLoading(false);
      }
    };

    initScene();

    return () => {
      mounted = false;

      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (modelRef.current && sceneRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => mat.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [showFurnished, emptyModelPath, furnishedModelPath, isRotating]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  return (
    <div className="relative overflow-hidden bg-white shadow-2xl">
      <div className="relative aspect-[16/10]">
        <canvas ref={canvasRef} className="h-full w-full" />

        {isLoading && (
          <div className="bg-whitesmoke/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <RotateCw className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
              <p className="font-secondary text-sm text-gray-600">
                Loading 3D model...
              </p>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-2 bg-white/90 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
          >
            {isRotating ? (
              <Pause className="text-primary h-4 w-4" />
            ) : (
              <Play className="text-primary h-4 w-4" />
            )}
            <span className="font-secondary text-xs text-gray-600">
              {isRotating ? 'Pause' : 'Rotate'}
            </span>
          </button>

          <button
            onClick={() => setShowFurnished(!showFurnished)}
            className="bg-primary hover:bg-primary/90 px-4 py-2 transition-all hover:shadow-lg"
          >
            <span className="font-secondary text-dark-black text-xs font-semibold tracking-wider uppercase">
              {showFurnished ? 'Show Empty' : 'Show Furnished'}
            </span>
          </button>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 backdrop-blur-sm">
          <span className="font-secondary text-xs text-gray-600">
            Drag to rotate • Scroll to zoom
          </span>
        </div>

        <div className="bg-dark-black/80 absolute bottom-4 left-4 px-4 py-2 backdrop-blur-sm">
          <span className="font-secondary text-whitesmoke text-xs font-semibold tracking-wider uppercase">
            {showFurnished ? 'Furnished 3D View' : 'Empty 3D View'}
          </span>
        </div>
      </div>
    </div>
  );
}
