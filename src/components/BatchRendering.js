import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BatchRendering = ({ trades }) => {
  const groupRef = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    trades.forEach((trade) => {
      positions.push(...trade.source.position);
      colors.push(0, 0, 1); // Blue for source
      positions.push(...trade.destination.position);
      colors.push(0, 1, 0); // Green for destination
    });
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
  }, [trades]);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            itemSize={3}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial attach="material" vertexColors size={0.1} />
      </points>
    </group>
  );
};

export default BatchRendering;
