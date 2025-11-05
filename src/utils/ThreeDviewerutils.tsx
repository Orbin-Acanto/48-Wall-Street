import { PerformanceMemory } from '@/types';
import * as THREE from 'three';

export function useDebugMode(
  sceneRef: React.RefObject<THREE.Scene | null>,
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleDebugClick = (event: MouseEvent) => {
    if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(
      sceneRef.current.children,
      true
    );

    if (intersects.length > 0) {
      const point = intersects[0].point;
      console.log('🎯 Clicked Position:', {
        x: point.x.toFixed(2),
        y: point.y.toFixed(2),
        z: point.z.toFixed(2),
        vectorString: `new THREE.Vector3(${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)})`,
      });

      const markerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(point);
      sceneRef.current.add(marker);
    }
  };

  return { handleDebugClick };
}

export function optimizeTexture(
  texture: THREE.Texture,
  quality: 'high' | 'medium' | 'low' = 'medium'
): void {
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  const anisotropyMap = { high: 4, medium: 2, low: 1 };
  texture.anisotropy = anisotropyMap[quality];

  texture.colorSpace = THREE.SRGBColorSpace;

  texture.needsUpdate = true;
}

export function calculateOptimalCameraPosition(
  model: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  viewType: 'dollhouse' | 'closeup' = 'dollhouse'
): { position: THREE.Vector3; target: THREE.Vector3 } {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);

  let cameraDistance: number;
  if (viewType === 'dollhouse') {
    cameraDistance = (maxDim / Math.tan(fov / 2)) * 1.2;
  } else {
    cameraDistance = (maxDim / Math.tan(fov / 2)) * 0.8;
  }

  const position = new THREE.Vector3(
    center.x + cameraDistance * 0.7,
    center.y + cameraDistance * 0.6,
    center.z + cameraDistance * 0.7
  );

  return { position, target: center };
}

export function detectPerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'medium';
  }

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) return 'low';

  const cores = navigator.hardwareConcurrency || 2;

  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

  if (cores >= 8 && memory >= 8) return 'high';
  if (cores >= 4 && memory >= 4) return 'medium';
  return 'low';
}

export function getRecommendedSettings(tier?: 'high' | 'medium' | 'low') {
  const performanceTier = tier || detectPerformanceTier();

  const settingsMap = {
    high: {
      enablePerformanceMode: false,
      maxTextureSize: 2048,
      enableShadows: true,
      antialias: true,
      pixelRatio: 2,
      shadowMapSize: 2048,
      anisotropy: 4,
    },
    medium: {
      enablePerformanceMode: true,
      maxTextureSize: 1024,
      enableShadows: true,
      antialias: true,
      pixelRatio: 1.5,
      shadowMapSize: 1024,
      anisotropy: 2,
    },
    low: {
      enablePerformanceMode: true,
      maxTextureSize: 512,
      enableShadows: false,
      antialias: false,
      pixelRatio: 1,
      shadowMapSize: 512,
      anisotropy: 1,
    },
  };

  return settingsMap[performanceTier];
}

export function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;

    const mesh = child as THREE.Mesh;

    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    if (mesh.material) {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((material) => {
        Object.keys(material).forEach((key) => {
          const value = (material as unknown as Record<string, unknown>)[key];
          if (value && typeof value === 'object' && 'isTexture' in value) {
            (value as THREE.Texture).dispose();
          }
        });

        material.dispose();
      });
    }
  });
}

export function createDebugGrid(
  size: number = 20,
  divisions: number = 20
): THREE.GridHelper {
  const gridHelper = new THREE.GridHelper(size, divisions, 0xd4b371, 0xcccccc);
  return gridHelper;
}

export function createDebugAxes(size: number = 10): THREE.AxesHelper {
  return new THREE.AxesHelper(size);
}

export class FPSMonitor {
  private frames: number = 0;
  private prevTime: number = performance.now();
  private fps: number = 0;
  private callback: (fps: number) => void;

  constructor(callback: (fps: number) => void) {
    this.callback = callback;
  }

  update(): void {
    this.frames++;
    const time = performance.now();

    if (time >= this.prevTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.callback(this.fps);
      this.frames = 0;
      this.prevTime = time;
    }
  }

  getFPS(): number {
    return this.fps;
  }
}

export function getMemoryUsage(): {
  used: number;
  total: number;
  percentage: number;
} | null {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return null;
  }

  const perf = performance as Performance & { memory?: PerformanceMemory };

  if (!perf.memory) return null;

  const memory = perf.memory;
  const used = memory.usedJSHeapSize / (1024 * 1024);
  const total = memory.jsHeapSizeLimit / (1024 * 1024);
  const percentage = (used / total) * 100;

  return { used, total, percentage };
}

export function isWebGLAvailable(): { available: boolean; version: number } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { available: false, version: 0 };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      return { available: false, version: 0 };
    }

    const version = gl instanceof WebGL2RenderingContext ? 2 : 1;
    return { available: true, version };
  } catch {
    return { available: false, version: 0 };
  }
}

export function estimateLoadTime(
  fileSizeBytes: number,
  networkSpeed: 'slow' | 'medium' | 'fast' = 'medium'
): number {
  const speedMap = {
    slow: 2,
    medium: 10,
    fast: 50,
  };

  const speedMbps = speedMap[networkSpeed];
  const speedBytesPerSecond = (speedMbps * 1024 * 1024) / 8;
  const timeSeconds = fileSizeBytes / speedBytesPerSecond;

  return timeSeconds * 1.2;
}
