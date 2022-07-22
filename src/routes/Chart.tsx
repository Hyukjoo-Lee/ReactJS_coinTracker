import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
};

interface ChartProps {
    coinId: string;
}

interface ILineChart {
    x: Date;
    y: number[];
}

function Chart({ coinId }: ChartProps) {

    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading: historyLoading, data: historyData } = useQuery<
        IHistorical[]
    >(["history", coinId], () => fetchCoinHistory(coinId!), {
        refetchInterval: 10000,
    });

    return (
        <div>
            {historyLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: historyData?.map((props) => {
                                return {
                                    x: new Date(props.time_open * 1000),
                                    y: [
                                        parseFloat(props.close),
                                    ],
                                };
                            }) as ILineChart[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
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