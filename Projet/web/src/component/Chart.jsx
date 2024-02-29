import React, { useEffect } from 'react';
import { init, dispose } from 'klinecharts';

// Assuming the prop is named `prices`
const Chart = ({ prices }) => {
  useEffect(() => {
    // Assuming the element ID where the chart will be rendered is 'chart'
    const chart = init('chart');

    // console.log("passed correctly",prices);

    // Format the incoming data to match the expected format for klinecharts
    const formattedData = prices.map(price => ({
      open: price.open,
      close: price.close,
      high: price.high,
      low: price.low,
      volume: price.volume,
      // Convert 'date' (YYYY-MM-DD) to timestamp
      timestamp: new Date(price.date).getTime(),
    }));

    // Add the formatted data to the chart
    chart.applyNewData(formattedData);

    // Cleanup function to dispose of the chart when the component unmounts
    return () => {
      dispose('chart');
    };
  }, [prices]); // Add `prices` as a dependency so the effect reruns if prices change

  // Render the container for the chart
  return <div id="chart"  />;
};

export default Chart;
