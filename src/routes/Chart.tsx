import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading: historyLoading, data: historyData } = useQuery<
    IHistorical[]
  >(["history", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });

  return (
    <div>
      {historyLoading ? (
        "Loading Chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: historyData!
                .slice(0)
                .reverse()
                .map((historyData) => ({
                  x: new Date(historyData.time_open * 1000),
                  y: [
                    historyData.open,
                    historyData.high,
                    historyData.low,
                    historyData.close,
                  ],
                })),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#c0392b",
                  downward: "#2980b9",
                },
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            grid: { show: false },
            yaxis: {
              tooltip: {
                enabled: false,
              },
            },
            tooltip: {
              x: {
                formatter: (val) => new Date(val).toLocaleDateString(),
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
