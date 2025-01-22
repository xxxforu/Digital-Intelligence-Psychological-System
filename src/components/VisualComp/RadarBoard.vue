<template>
    <div class="radarBoard" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div style="position:relative;height:100%;width:100%;">
            <h3 class="boardTitle" v-if="boardTitle">{{ boardTitle }}</h3>
            <div class="chart" ref="radarBoard" style="width:100%;height:100%;"></div>
        </div>
    </div>
</template>

<script>
import { RadarChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { number } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([RadarChart, CanvasRenderer]);

import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    props: {
        currentType: Number,
        boardTitle: {
            type: String,
            required: false
        },
        data: Object,
        boxWidth: Number,
        boxHeight: Number,
        radius: {
            type: number,
            default: 120,
            required: false
        },
        isDouble: {//是否为两种数据
            type: Boolean,
            default: false,
            required: false,
        },
    },
    setup(props) {
        const radarBoard = ref(null)
        const colorList = [
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
            }],
            [{
                offset: 0, color: 'rgba(255,212,34,0.5)'
            }, {
                offset: 1, color: 'rgba(117,23,248,0.5)'
            }]
        ]
        const color = ['rgba(77,253,224,0.6)', 'rgba(125,64,255,0.6)', 'rgba(77,161,255,0.6)', 'rgba(227,35,255,0.6)', 'rgba(255,212,34,0.6)']
        onMounted(() => {
            const radarBoardChart = echarts.init(radarBoard.value)
            var option;
            option = {
                radar: [
                    {
                        indicator: props.data.indicator,
                        radius: props.radius,
                        axisName: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        radarIndex: 0,
                        data: [
                            {
                                value: props.data.value,
                                areaStyle: {
                                    color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, colorList[props.currentType])
                                }
                            }
                        ]
                    }
                ]
            };
            console.log(props);

            if (props.isDouble === true) {
                option.legend = {
                    bottom: 0,
                    selectedMode: false,
                    textStyle: {
                        fontSize: 20,
                        color: '#fff'
                    },
                }
                option.series[0].data = [
                    {
                        value: props.data.value[0],
                        name: "显著",//先当第一类数据为显著
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, colorList[props.currentType - 1])
                        }
                    }, {
                        value: props.data.value[1],
                        name: "其他",//
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, colorList[props.currentType])
                        }
                    },
                ]
                option.color = color.slice(props.currentType - 1, props.currentType + 1)
            }
            option && radarBoardChart.setOption(option);
        })
        return { radarBoard }
    }
})
</script>

<style lang='scss' scoped>
.radarBoard {

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