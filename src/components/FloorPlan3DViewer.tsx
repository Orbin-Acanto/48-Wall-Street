'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  RotateCw,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  Home,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  MapPin,
} from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Hotspot, ViewPoint } from '@/types';

interface FloorPlan3DViewerProps {
  emptyModelPath: string;
  furnishedModelPath: string;
  initialFurnished?: boolean;
  hotspots?: Hotspot[];
  viewPoints?: ViewPoint[];
  enablePerformanceMode?: boolean;
  maxTextureSize?: number;
}

export default function FloorPlan3DViewer({
  emptyModelPath,
  furnishedModelPath,
  initialFurnished = false,
  hotspots = [],
  viewPoints = [],
  enablePerformanceMode = false,
}: FloorPlan3DViewerProps) {
  // State management
  const [isRotating, setIsRotating] = useState(false);
  const [showFurnished, setShowFurnished] = useState(initialFurnished);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isInteriorView, setIsInteriorView] = useState(false);
  const [currentViewPointIndex, setCurrentViewPointIndex] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const hotspotSpritesRef = useRef<Map<string, THREE.Sprite>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const initialCameraPositionRef = useRef<THREE.Vector3>(
    new THREE.Vector3(15, 12, 15)
  );
  const initialCameraTargetRef = useRef<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );

  // Memoized values
  const currentViewPoint = useMemo(
    () => viewPoints[currentViewPointIndex],
    [viewPoints, currentViewPointIndex]
  );

  const createHotspotSprite = useCallback((hotspot: Hotspot, index: number) => {
    const canvas = document.createElement('canvas');
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.fillStyle = 'rgba(212, 179, 113, 0.9)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((index + 1).toString(), size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.4, 0.4, 1);
    sprite.position.copy(hotspot.position);
    sprite.userData = { hotspot, index };

    return sprite;
  }, []);

  const updateHotspots = useCallback(() => {
    if (!sceneRef.current) return;

    hotspotSpritesRef.current.forEach((sprite) => {
      sceneRef.current?.remove(sprite);
      sprite.material.dispose();
      if (sprite.material.map) sprite.material.map.dispose();
    });
    hotspotSpritesRef.current.clear();

    if (showHotspots) {
      hotspots.forEach((hotspot, index) => {
        const sprite = createHotspotSprite(hotspot, index);
        if (sprite && sceneRef.current) {
          sceneRef.current.add(sprite);
          hotspotSpritesRef.current.set(hotspot.id, sprite);
        }
      });
    }
  }, [hotspots, showHotspots, createHotspotSprite]);

  // Handle mouse move for hotspot hover
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const sprites = Array.from(hotspotSpritesRef.current.values());
    const intersects = raycasterRef.current.intersectObjects(sprites);

    if (intersects.length > 0) {
      const sprite = intersects[0].object as THREE.Sprite;
      const hotspotId = sprite.userData.hotspot.id;
      setHoveredHotspot(hotspotId);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'pointer';
      }
    } else {
      setHoveredHotspot(null);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    }
  }, []);

  // Handle click for hotspot selection
  const handleClick = useCallback((event: MouseEvent) => {
    if (!canvasRef.current || !cameraRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const sprites = Array.from(hotspotSpritesRef.current.values());
    const intersects = raycasterRef.current.intersectObjects(sprites);

    if (intersects.length > 0) {
      const sprite = intersects[0].object as THREE.Sprite;
      setSelectedHotspot(sprite.userData.hotspot);
    }
  }, []);

  // Fullscreen handling
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);

        setTimeout(() => {
          if (canvasRef.current && cameraRef.current && rendererRef.current) {
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height, false);
          }
        }, 100);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Navigate view points
  const navigateViewPoint = useCallback(
    (direction: 'next' | 'prev') => {
      if (viewPoints.length === 0 || !cameraRef.current || !controlsRef.current)
        return;

      const newIndex =
        direction === 'next'
          ? (currentViewPointIndex + 1) % viewPoints.length
          : (currentViewPointIndex - 1 + viewPoints.length) % viewPoints.length;

      setCurrentViewPointIndex(newIndex);

      const viewPoint = viewPoints[newIndex];

      const startPos = cameraRef.current.position.clone();
      const startTarget = controlsRef.current.target.clone();
      const duration = 1000;
      const startTime = Date.now();

      const animateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        if (cameraRef.current && controlsRef.current) {
          cameraRef.current.position.lerpVectors(
            startPos,
            viewPoint.position,
            eased
          );
          controlsRef.current.target.lerpVectors(
            startTarget,
            viewPoint.target,
            eased
          );
          controlsRef.current.update();
        }

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        }
      };

      animateTransition();
    },
    [viewPoints, currentViewPointIndex]
  );

  // Toggle interior view
  const toggleInteriorView = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    setIsInteriorView((prev) => {
      const newIsInterior = !prev;

      if (newIsInterior && viewPoints.length > 0) {
        const viewPoint = viewPoints[0];
        cameraRef.current!.position.copy(viewPoint.position);
        controlsRef.current!.target.copy(viewPoint.target);
        setCurrentViewPointIndex(0);
      } else {
        cameraRef.current!.position.copy(initialCameraPositionRef.current);
        controlsRef.current!.target.copy(initialCameraTargetRef.current);
      }

      controlsRef.current!.update();
      return newIsInterior;
    });
  }, [viewPoints]);

  const resetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    cameraRef.current.position.copy(initialCameraPositionRef.current);
    controlsRef.current.target.copy(initialCameraTargetRef.current);
    controlsRef.current.update();
    setIsInteriorView(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          }
          if (selectedHotspot) {
            setSelectedHotspot(null);
          }
          break;
        case 'ArrowLeft':
          if (isInteriorView) {
            event.preventDefault();
            navigateViewPoint('prev');
          }
          break;
        case 'ArrowRight':
          if (isInteriorView) {
            event.preventDefault();
            navigateViewPoint('next');
          }
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'h':
        case 'H':
          setShowHotspots((prev) => !prev);
          break;
        case 'r':
        case 'R':
          resetCamera();
          break;
        case ' ':
          event.preventDefault();
          setIsRotating((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isFullscreen,
    isInteriorView,
    selectedHotspot,
    toggleFullscreen,
    navigateViewPoint,
    resetCamera,
  ]);

  // Main scene initialization
  useEffect(() => {
    if (!canvasRef.current) return;

    let mounted = true;
    setIsLoading(true);
    setLoadingProgress(0);

    const initScene = async () => {
      try {
        if (!mounted || !canvasRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        scene.fog = new THREE.Fog(0xf0f0f0, 40, 80);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          45,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000
        );
        camera.position.copy(initialCameraPositionRef.current);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        });
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        rendererRef.current = renderer;

        const hemisphereLight = new THREE.HemisphereLight(
          0xffffff,
          0x8d8d8d,
          0.4
        );
        hemisphereLight.position.set(0, 50, 0);
        scene.add(hemisphereLight);

        const sunLight = new THREE.DirectionalLight(0xfff4e6, 2.8);
        sunLight.position.set(30, 50, 30);
        sunLight.castShadow = true;

        sunLight.shadow.mapSize.width = 4096;
        sunLight.shadow.mapSize.height = 4096;
        sunLight.shadow.camera.left = -35;
        sunLight.shadow.camera.right = 35;
        sunLight.shadow.camera.top = 35;
        sunLight.shadow.camera.bottom = -35;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 120;
        sunLight.shadow.bias = -0.00005;
        sunLight.shadow.normalBias = 0.03;
        sunLight.shadow.radius = 2;
        scene.add(sunLight);

        const skyLight = new THREE.DirectionalLight(0xadd8e6, 1.5);
        skyLight.position.set(-25, 35, -25);
        scene.add(skyLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
        scene.add(ambientLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
        rimLight.position.set(-35, 12, 25);
        scene.add(rimLight);

        if (!enablePerformanceMode) {
          sunLight.shadow.mapSize.width = 2048;
          sunLight.shadow.mapSize.height = 2048;
          const createCeilingLight = (
            x: number,
            z: number,
            intensity: number = 1.8
          ) => {
            const light = new THREE.PointLight(0xfff5e1, intensity, 28, 2);
            light.position.set(x, 8, z);
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 30;
            light.shadow.bias = -0.0001;
            return light;
          };

          scene.add(createCeilingLight(6, 6, 1.8));
          scene.add(createCeilingLight(-6, -6, 1.8));
          scene.add(createCeilingLight(6, -6, 1.5));
          scene.add(createCeilingLight(-6, 6, 1.5));
          scene.add(createCeilingLight(0, 0, 1.6));

          const createSpotlight = (x: number, targetX: number) => {
            const spotlight = new THREE.SpotLight(
              0xffd4a3,
              1.0,
              18,
              Math.PI / 5,
              0.4,
              1.8
            );
            spotlight.position.set(x, 10, 0);
            spotlight.target.position.set(targetX, 0, 0);
            spotlight.castShadow = true;
            spotlight.shadow.mapSize.width = 512;
            spotlight.shadow.mapSize.height = 512;
            scene.add(spotlight);
            scene.add(spotlight.target);
            return spotlight;
          };

          createSpotlight(10, 6);
          createSpotlight(-10, -6);
        } else {
          sunLight.shadow.mapSize.width = 1024;
          sunLight.shadow.mapSize.height = 1024;

          const light1 = new THREE.PointLight(0xfff5e1, 1.5, 25, 2);
          light1.position.set(5, 8, 5);
          scene.add(light1);

          const light2 = new THREE.PointLight(0xfff5e1, 1.5, 25, 2);
          light2.position.set(-5, 8, -5);
          scene.add(light2);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 5;
        controls.maxDistance = 45;
        controls.maxPolarAngle = Math.PI / 2.05;
        controls.autoRotate = isRotating;
        controls.autoRotateSpeed = 1.2;
        controls.target.copy(initialCameraTargetRef.current);
        controls.update();
        controlsRef.current = controls;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
          'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
        );
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.preload();

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

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

                if (mesh.material && !enablePerformanceMode) {
                  const materials = Array.isArray(mesh.material)
                    ? mesh.material
                    : [mesh.material];

                  materials.forEach((mat: THREE.Material) => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                      if (mat.metalness !== undefined) mat.metalness *= 0.7;
                      if (mat.roughness !== undefined)
                        mat.roughness = Math.max(mat.roughness, 0.35);
                      if (mat.envMapIntensity !== undefined)
                        mat.envMapIntensity = 0.8;

                      if (mat.map) {
                        mat.map.anisotropy =
                          renderer.capabilities.getMaxAnisotropy();
                      }
                    }
                  });
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
                    const materials = Array.isArray(mesh.material)
                      ? mesh.material
                      : [mesh.material];
                    materials.forEach((mat) => mat.dispose());
                  }
                }
              });
            }

            scene.add(model);
            modelRef.current = model;
            setIsLoading(false);
            setLoadingProgress(100);
          },
          (progress) => {
            if (progress.total > 0) {
              const percentComplete = (progress.loaded / progress.total) * 100;
              setLoadingProgress(Math.round(percentComplete));
            }
          },
          (error) => {
            console.error('Error loading 3D model:', error);
            setIsLoading(false);
          }
        );

        const animate = () => {
          if (!mounted) return;
          animationFrameRef.current = requestAnimationFrame(animate);

          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('click', handleClick);

        const handleResize = () => {
          if (!canvasRef.current || !mounted) return;

          const width = canvasRef.current.clientWidth;
          const height = canvasRef.current.clientHeight;

          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
          canvasRef.current?.removeEventListener('click', handleClick);
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

      hotspotSpritesRef.current.forEach((sprite) => {
        sceneRef.current?.remove(sprite);
        sprite.material.dispose();
        if (sprite.material.map) sprite.material.map.dispose();
      });
      hotspotSpritesRef.current.clear();

      if (modelRef.current && sceneRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              const materials = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              materials.forEach((mat) => mat.dispose());
            }
          }
        });
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [
    showFurnished,
    emptyModelPath,
    furnishedModelPath,
    isRotating,
    enablePerformanceMode,
  ]);

  useEffect(() => {
    updateHotspots();
  }, [updateHotspots]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden border-[0.5] border-gray-300 bg-black shadow-lg ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen'
          : 'aspect-[16/10] w-full'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ display: 'block' }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center">
            <RotateCw className="mx-auto mb-4 h-12 w-12 animate-spin text-[#D4B371]" />
            <p className="mb-2 text-sm font-medium text-white">
              Loading 3D model...
            </p>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-[#D4B371] transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">{loadingProgress}%</p>
          </div>
        </div>
      )}

      {/* Control panel */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {/* Rotation control */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="flex h-10 w-10 items-center justify-center rounded bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          title={
            isRotating ? 'Pause rotation (Space)' : 'Start rotation (Space)'
          }
        >
          {isRotating ? (
            <Pause className="h-5 w-5 text-gray-700" />
          ) : (
            <Play className="h-5 w-5 text-gray-700" />
          )}
        </button>

        {/* Furnished/Empty toggle */}
        <button
          onClick={() => setShowFurnished(!showFurnished)}
          className="rounded bg-[#D4B371] px-3 py-2 text-xs font-semibold tracking-wider text-white uppercase shadow-lg transition-all hover:scale-105 hover:bg-[#C5A562]"
          title="Toggle furnished/empty view"
        >
          {showFurnished ? 'Empty' : 'Furnished'}
        </button>

        {/* Interior view toggle */}
        {viewPoints.length > 0 && (
          <button
            onClick={toggleInteriorView}
            className={`flex h-10 w-10 items-center justify-center rounded shadow-lg transition-all hover:scale-110 ${
              isInteriorView
                ? 'bg-[#D4B371] text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
            title="Toggle interior view"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}

        {/* Reset camera */}
        <button
          onClick={resetCamera}
          className="flex h-10 w-10 items-center justify-center rounded bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          title="Reset camera (R)"
        >
          <Home className="h-5 w-5 text-gray-700" />
        </button>

        {/* Toggle hotspots */}
        {hotspots.length > 0 && (
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex h-10 w-10 items-center justify-center rounded shadow-lg transition-all hover:scale-110 ${
              showHotspots
                ? 'bg-[#D4B371] text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
            title="Toggle hotspots (H)"
          >
            <MapPin className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Fullscreen toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleFullscreen}
          className="flex h-10 w-10 items-center justify-center rounded bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen (F)'}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5 text-gray-700" />
          ) : (
            <Maximize2 className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Interior navigation arrows */}
      {isInteriorView && viewPoints.length > 1 && (
        <>
          <button
            onClick={() => navigateViewPoint('prev')}
            className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
            title="Previous viewpoint (←)"
          >
            <ChevronLeft className="h-7 w-7 text-gray-700" />
          </button>
          <button
            onClick={() => navigateViewPoint('next')}
            className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
            title="Next viewpoint (→)"
          >
            <ChevronRight className="h-7 w-7 text-gray-700" />
          </button>
        </>
      )}

      {/* View indicator */}
      <div className="absolute bottom-4 left-4 rounded bg-black/80 px-4 py-2 shadow-lg backdrop-blur-sm">
        <span className="text-sm font-semibold tracking-wider text-white uppercase">
          {isInteriorView && currentViewPoint
            ? currentViewPoint.name
            : showFurnished
              ? 'Furnished 3D View'
              : 'Empty 3D View'}
        </span>
        {isInteriorView && viewPoints.length > 1 && (
          <span className="ml-2 text-xs text-gray-400">
            {currentViewPointIndex + 1}/{viewPoints.length}
          </span>
        )}
      </div>

      {/* Hotspot information panel */}
      {selectedHotspot && (
        <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white/95 p-6 shadow-2xl backdrop-blur-sm md:inset-x-auto md:top-1/2 md:right-6 md:bottom-auto md:w-96 md:-translate-y-1/2">
          <button
            onClick={() => setSelectedHotspot(null)}
            className="absolute top-3 right-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-3 flex items-center gap-2">
            <Info className="h-6 w-6 text-[#D4B371]" />
            <h3 className="text-xl font-bold text-gray-900">
              {selectedHotspot.title}
            </h3>
          </div>

          {selectedHotspot.category && (
            <span className="mb-4 inline-block rounded-full bg-[#D4B371]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#D4B371] uppercase">
              {selectedHotspot.category}
            </span>
          )}

          <p className="text-sm leading-relaxed text-gray-700">
            {selectedHotspot.description}
          </p>
        </div>
      )}

      {/* Hotspot hover tooltip */}
      {hoveredHotspot && !selectedHotspot && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-black/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          <span className="text-xs font-medium text-white">
            Click to view details
          </span>
        </div>
      )}
    </div>
  );
}
