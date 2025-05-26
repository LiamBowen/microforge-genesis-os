
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

interface GCodePreviewProps {
  gcode: string;
  className?: string;
}

interface GCodeLine {
  start: THREE.Vector3;
  end: THREE.Vector3;
  type: 'move' | 'cut';
}

const GCodePath = ({ lines }: { lines: GCodeLine[] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const { moveGeometry, cutGeometry } = useMemo(() => {
    const movePoints: THREE.Vector3[] = [];
    const cutPoints: THREE.Vector3[] = [];

    lines.forEach((line) => {
      if (line.type === 'move') {
        movePoints.push(line.start, line.end);
      } else {
        cutPoints.push(line.start, line.end);
      }
    });

    const moveGeometry = new THREE.BufferGeometry().setFromPoints(movePoints);
    const cutGeometry = new THREE.BufferGeometry().setFromPoints(cutPoints);

    return { moveGeometry, cutGeometry };
  }, [lines]);

  return (
    <group ref={meshRef}>
      {/* Rapid moves (travel) - dashed gray lines */}
      <lineSegments geometry={moveGeometry}>
        <lineDashedMaterial color="#666666" dashSize={0.5} gapSize={0.3} />
      </lineSegments>
      
      {/* Cutting moves - solid colored lines */}
      <lineSegments geometry={cutGeometry}>
        <lineBasicMaterial color="#00ff88" />
      </lineSegments>
    </group>
  );
};

const parseGCode = (gcode: string): GCodeLine[] => {
  const lines: GCodeLine[] = [];
  let currentX = 0;
  let currentY = 0;
  let currentZ = 0;

  const gcodeLines = gcode.split('\n');

  gcodeLines.forEach((line) => {
    const trimmed = line.trim().toUpperCase();
    
    // Skip comments and empty lines
    if (trimmed.startsWith(';') || trimmed.startsWith('(') || !trimmed) {
      return;
    }

    // Parse G-code commands
    if (trimmed.startsWith('G00') || trimmed.startsWith('G0 ') || trimmed.startsWith('G01') || trimmed.startsWith('G1 ')) {
      const isRapid = trimmed.startsWith('G00') || trimmed.startsWith('G0 ');
      
      // Extract coordinates
      const xMatch = trimmed.match(/X([+-]?\d*\.?\d+)/);
      const yMatch = trimmed.match(/Y([+-]?\d*\.?\d+)/);
      const zMatch = trimmed.match(/Z([+-]?\d*\.?\d+)/);

      const newX = xMatch ? parseFloat(xMatch[1]) : currentX;
      const newY = yMatch ? parseFloat(yMatch[1]) : currentY;
      const newZ = zMatch ? parseFloat(zMatch[1]) : currentZ;

      // Only add line if there's actual movement
      if (newX !== currentX || newY !== currentY || newZ !== currentZ) {
        lines.push({
          start: new THREE.Vector3(currentX, currentY, currentZ),
          end: new THREE.Vector3(newX, newY, newZ),
          type: isRapid ? 'move' : 'cut'
        });

        currentX = newX;
        currentY = newY;
        currentZ = newZ;
      }
    }
  });

  return lines;
};

const GCodePreview: React.FC<GCodePreviewProps> = ({ gcode, className = "" }) => {
  const lines = useMemo(() => parseGCode(gcode), [gcode]);

  if (!gcode || lines.length === 0) {
    return (
      <div className={`bg-gray-900 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Upload a G-code file to see preview</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 rounded-lg ${className}`}>
      <Canvas camera={{ position: [50, 50, 50], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        
        <GCodePath lines={lines} />
        
        <Grid
          args={[100, 100]}
          cellSize={5}
          cellThickness={0.5}
          cellColor="#333333"
          sectionSize={25}
          sectionThickness={1}
          sectionColor="#444444"
          position={[0, -5, 0]}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={200}
        />
      </Canvas>
      
      <div className="absolute bottom-2 left-2 bg-black/70 rounded px-2 py-1 text-xs text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-gray-500"></div>
            <span>Rapid</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-green-400"></div>
            <span>Cut</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCodePreview;
