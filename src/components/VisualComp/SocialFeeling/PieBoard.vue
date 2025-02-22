<template>
    <div class="PieBoard" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div style="position:relative;height:100%;width:100%;">
            <h3 class="boardTitle" v-if="boardTitle">{{ boardTitle }}</h3>
            <div class="chart" ref="pieBoard" style="width:100%;height:100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { PieChart } from 'echarts/charts';
import { DatasetComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, onMounted, ref } from 'vue';
echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    DatasetComponent
]);

export default defineComponent({
    props: {
        boardTitle: {
            type: String,
            required: false
        },
        data: Array,
        boxWidth: Number,
        boxHeight: Number,
        radius: {
            type: Array,
            default: ['50%', '80%'],
            required: false
        },
        label: {
            type: Boolean,
            default: true,
            required: false
        },
    },
    setup(props) {
        const pieBoard = ref(null)
        const colorList = [
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(77, 255, 223)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(77, 161, 255)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(255, 212, 34)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(255, 125, 5)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(227,35,255)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(117, 23, 248)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(125, 64, 255)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(2, 164, 255)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(139,220,255)' // 0% 处的颜色
                }, {
                    offset: 0.5, color: 'rgb(0,178,255)' // 100% 处的颜色
                }, {
                    offset: 1, color: 'rgb(57,195,255)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(255,212,34)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(227,35,255)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
        ]
        onMounted(() => {
            console.log(props.data);

            const pieBoardChart = echarts.init(pieBoard.value)
            var option;
            option = {
                color: colorList,
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        fontSize: 20,
                    },
                    valueFormatter: (value: number | string, dataIndex: number) => value + '人'
                },
                legend: {
                    top: 'middle',
                    right: '3%',
                    orient: 'vertical',
                    textStyle: {
                        color: "#fff",
                        fontSize: 18
                    },
                },
                dataset: {
                    source: props.data
                },
                series: [
                    {
                        name: '指标',
                        type: 'pie',
                        right: "20%",
                        radius: props.radius,
                        avoidLabelOverlap: false,
                        label: {
                            show: props.label,
                            position: 'outside',
                            formatter: '{b}:{@[1]}人',
                            //{a}系列名，{b}数据名，{c}数据值，{d}百分比
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 500
                        },
                        labelLine: {
                            show: true,
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 22,
                                fontWeight: 'bold'
                            }
                        },
                    }
                ]
            };
            option && pieBoardChart.setOption(option);
        })
        return { pieBoard }
    }
})
</script>

<style lang='scss' scoped>
.PieBoard {
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