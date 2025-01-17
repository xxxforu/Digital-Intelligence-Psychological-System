<template>
    <div class="doubleColumn" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div style="position:relative;height:100%;width:100%;">
            <h3 class="boardTitle">{{ boardTitle }}</h3>
            <div class="chart" ref="doubleColumn" style="width:100%;height:100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { BarChart } from 'echarts/charts';
import {
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, onMounted, ref } from 'vue';
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    DatasetComponent
]);

export default defineComponent({
    props: {
        boardTitle: String,
        dataSource: Array,
        boxWidth: Number,
        boxHeight: Number,
    },
    setup(props) {
        const doubleColumn = ref(null)
        onMounted(() => {
            const doubleColumnChart = echarts.init(doubleColumn.value)
            var option = {
                dataset: {
                    source: props.dataSource
                },
                textStyle: {
                    color: "#fff",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    bottom: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                color: [
                    {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(2,164,255,0.6)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(125,64,255,0.6)'
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(117,23,248,0.6)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(227,35,255,0.6)'
                            }
                        ],
                        global: false // 缺省为 false
                    }
                ],
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 16
                    }
                    // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                },
                series: [

                    { type: 'bar' }, { type: 'bar' }
                    // {
                    //     name: '2011',

                    //     data: [18203, 23489, 29034, 104970, 131744, 630230]
                    // },
                    // {
                    //     name: '2012',
                    //     type: 'bar',
                    //     data: [19325, 23438, 31000, 121594, 134141, 681807]
                    // }
                ]
            };

            option && doubleColumnChart.setOption(option);
        })
        return { doubleColumn }

    }
})
</script>

<style lang='scss' scoped>
.doubleColumn {
    margin: 0 20px;

    .boardTitle {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -150%);
        margin: 5px;
        text-align: center;
        font-size: 20px;
        color: white;
    }
}
</style>