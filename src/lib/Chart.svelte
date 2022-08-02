<script>
export let data;
import { Line } from 'svelte-chartjs';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
} from 'chart.js';


ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
);
</script>

<Line
    data={data}
    options={{
        responsive: true,
        plugins:{
            legend: {
                display:false
            }
        }
    }}
/>