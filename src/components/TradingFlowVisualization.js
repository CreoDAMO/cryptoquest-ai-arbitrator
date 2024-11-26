import React, { useRef, useEffect, useState, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useWebSocket from '../hooks/useWebSocket';

const TradingFlowVisualization = () => {
  const { data: tradingData } = useWebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    if (tradingData && tradingData.trades) {
      setTrades(tradingData.trades);
    }
  }, [tradingData]);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {trades.map((trade, index) => (
        <TradeVisualization
          key={index}
          source={trade.source}
          destination={trade.destination}
          volume={trade.volume}
          rate={trade.rate}
        />
      ))}
    </Canvas>
  );
};

const TradeVisualization = ({ source, destination, volume }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * (volume / 100));
    }
  });

  return (
    <>
      <mesh ref={sphereRef} position={source.position}>
        <sphereGeometry args={[volume * 0.01, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh position={destination.position}>
        <sphereGeometry args={[volume * 0.01, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <line>
        <bufferGeometry
          attach="geometry"
          attributes={{
            position: new THREE.BufferAttribute(
              new Float32Array([
                ...source.position,
                ...destination.position,
              ]),
              3
            ),
          }}
        />
        <lineBasicMaterial attach="material" color="orange" />
      </line>
    </>
  );
};

export default TradingFlowVisualization;
