<template>
    <div class="horizontalColumn" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div style="position:relative;height:100%;width:100%;">
            <h3 class="boardTitle" v-if="boardTitle">{{ boardTitle }}</h3>
            <div class="chart" ref="horizontalColumn" style="width:100%;height:100%;"></div>
        </div>
    </div>
</template>

<script>
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, onMounted, ref } from 'vue';

echarts.use([GridComponent, BarChart, CanvasRenderer, DatasetComponent]);

export default defineComponent({
    props: {
        currentType: Number,
        boardTitle: {
            type: String,
            required: false
        },
        isReport: {
            type: Boolean,
            required: false,
            default: false
        },
        dataSource: Array,
        boxWidth: Number,
        boxHeight: Number,
    },
    setup(props) {
        const horizontalColumn = ref(null);
        const colorStopsList = [
            [{
                offset: 0, color: 'rgba(77,161,254,0.6)'
            }, {
                offset: 1, color: 'rgba(77,253,224,0.6)'
            }],
            [{
                offset: 0, color: 'rgba(125,64,255,0.6)'
            }, {
                offset: 1, color: 'rgba(2,164,255,0.6)'
            }],
            [{
                offset: 0, color: 'rgba(255,212,34,0.6)'
            }, {
                offset: 1, color: 'rgba(77,161,255,0.6)'
            }],
            [{
                offset: 0, color: 'rgba(227,35,255,0.6)'
            }, {
                offset: 1, color: 'rgba(117,23,248,0.6)'
            }]
        ]
        onMounted(() => {
            const horizontalColumnChart = echarts.init(horizontalColumn.value);
            const option = {
                textStyle: {
                    color: props.isReport ? "#000" : "#fff",
                },
                dataset: {
                    source: props.dataSource
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                    axisLabel: {
                        fontSize: props.isReport ? 16 : 18
                    }
                },
                xAxis: {
                    type: "value"
                },
                series: [
                    {
                        realtimeSort: true,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)',
                        },
                    },
                ],
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    width: props.boxWidth - 50,
                    height: props.boxHeight,
                    containLabel: true
                },
                color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: colorStopsList[props.currentType],
                    global: false // 缺省为 false
                },
                animationDuration: 0,
                animationDurationUpdate: 1000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };

            horizontalColumnChart.setOption(option);


        });

        return {
            horizontalColumn,
        };
    },
});
</script>

<style lang="scss" scoped>
.horizontalColumn {
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
