import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const TradingFlowVisualization = ({ trades }) => {
  const spheres = useMemo(() => {
    const positions = [];
    const scales = [];
    const colors = [];
    const lines = [];

    trades.forEach((trade) => {
      const sourcePosition = trade.source.position;
      const destinationPosition = trade.destination.position;

      positions.push(...sourcePosition);
      scales.push(trade.volume * 0.05);
      colors.push(0.1, 0.5, 0.9); // Blue for sources

      positions.push(...destinationPosition);
      scales.push(trade.volume * 0.05);
      colors.push(0.5, 0.9, 0.1); // Green for destinations

      lines.push(...sourcePosition, ...destinationPosition);
    });

    return {
      positions: new Float32Array(positions),
      scales: new Float32Array(scales),
      colors: new Float32Array(colors),
      lines: new Float32Array(lines),
    };
  }, [trades]);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Batched Spheres */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={spheres.positions}
            count={spheres.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={spheres.colors}
            count={spheres.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.2} vertexColors />
      </points>

      {/* Batched Trade Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={spheres.lines}
            count={spheres.lines.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="orange" />
      </lineSegments>
    </Canvas>
  );
};

export default TradingFlowVisualization;
