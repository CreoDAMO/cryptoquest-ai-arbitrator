import React, { Suspense, lazy } from "react";

const TradingFlowVisualization = lazy(() => import("../components/TradingFlowVisualization"));
const TradingVolumeChart = lazy(() => import("../components/TradingVolumeChart"));

export async function getServerSideProps() {
  const tradingData = await fetch(`${process.env.BACKEND_API_URL}/market-data`).then((res) =>
    res.json()
  );
  return { props: { tradingData } };
}

const Home = ({ tradingData }) => (
  <div>
    <h1>CryptoQuest AI Arbitrator</h1>
    <Suspense fallback={<div>Loading 3D Visualization...</div>}>
      <TradingFlowVisualization />
    </Suspense>
    <Suspense fallback={<div>Loading Chart...</div>}>
      <TradingVolumeChart data={tradingData} />
    </Suspense>
  </div>
);

export default Home;
