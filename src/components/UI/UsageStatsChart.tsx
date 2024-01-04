import {
    CategoryScale,
    Chart,
    ChartData,
    ChartDataset,
    Colors,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { DefaultChart } from 'solid-chartjs'
import { createSignal, onMount, ParentProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import { getProjectUsageStats } from '../../services/projects.service'
import { Loader } from './Loader'

interface UsageStatsChartProps extends ParentProps {
    slug: string | undefined
}

export const UsageStatsChart = ({ slug }: UsageStatsChartProps) => {
    const [refLine, setRefLine] = createSignal()
    const [chartData, setChartData] = createSignal<ChartData>()
    const [chartConfig, setChartConfig] = createStore({
        width: 'auto',
        height: 'auto',
    })
    const [loading, setLoading] = createSignal(true)
    const [error, setError] = createSignal<string | null>(null)

    const fallback = () => {
        return (
            <div class="error-message">Chart is not available. {error()}</div>
        )
    }

    onMount(async () => {
        Chart.register(
            Title,
            Tooltip,
            LineController,
            LineElement,
            PointElement,
            LinearScale,
            CategoryScale,
            Colors
        )

        try {
            const response = await getProjectUsageStats(slug)

            const labels = response?.result.map((e: any) => e.timestamp)
            const datasets: ChartDataset[] = [
                {
                    label: 'Usage',
                    data: response?.result.map((e: any) => e.count),
                },
            ]

            setChartData({
                labels,
                datasets,
            })
        } catch (err: any) {
            setError(
                `Failed to fetch project usage stats.${
                    err.message ? ` Error message: "${err.message}".` : ''
                } Please try again.`
            )
        } finally {
            setLoading(false)
        }
    })

    return (
        <>
            {loading() ? (
                <Loader />
            ) : error() ? (
                <div class="error-message">Error: {error()}</div>
            ) : (
                <DefaultChart
                    ref={setRefLine}
                    //@ts-ignore
                    width={chartConfig.width}
                    //@ts-ignore
                    height={chartConfig.height}
                    fallback={fallback()}
                    type="line"
                    data={chartData()}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            colors: {
                                forceOverride: true,
                            },
                        },
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    }}
                />
            )}
        </>
    )
}
