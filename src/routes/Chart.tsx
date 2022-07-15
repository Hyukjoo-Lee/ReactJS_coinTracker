import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
};

interface ChartProps {
    coinId?: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data: historyData } = useQuery<IHistorical[]>
        (["historyData", coinId],
            () => fetchCoinHistory(coinId),
            {
                refetchInterval: 10000,
            }
        );

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: historyData?.map((price => price.close)) ?? [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            height: 300,
                            width: 500,
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: { curve: "smooth", width: 4 },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            labels: {
                                show: false,
                            },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: 'datetime',
                            categories: historyData?.map((price => price.time_close)) ?? [],
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["green"],
                                stops: [0, 100]
                            },
                        },
                        colors: ["#e84118"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(1)}`,
                            }
                        }
                    }}
                />
            )
            }
        </div>
    )
}

export default Chart;