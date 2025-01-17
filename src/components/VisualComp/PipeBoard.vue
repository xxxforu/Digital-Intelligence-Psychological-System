<template>
    <div id="pipeBoard" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div class="left">
            <div ref="pipe" style="width: 100px;height:100px;"></div>
        </div>
        <div class="right">
            <p>{{ data[0] }}</p>
            <p>优势人数</p>
            <div>
                <span>{{ data[1] }}人</span>
                <icon-user-group />
            </div>
        </div>
    </div>
</template>

<script>

import { GaugeChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, onMounted, ref } from 'vue';
echarts.use([GaugeChart, CanvasRenderer]);
export default defineComponent({
    props: {
        data: Array,
        boxWidth: Number,
        boxHeight: Number,
        isHollander: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    setup(props) {
        const pipe = ref(null)
        var formatter = ""
        components: { }
        var barColor;
        if (props.isHollander) {
            barColor = {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(255, 212, 34)'// 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(77, 161, 255)'  // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
        } else {
            barColor = {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(2, 164, 255)'// 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(125, 64, 255)'  // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
        }
        const getOption = () => {
            return {
                series: [
                    {
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            overlap: false,
                            roundCap: false,
                            clip: false,
                            itemStyle: {
                                color: barColor
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 10
                            }
                        },
                        splitLine: {
                            show: false,
                            distance: 0,
                            length: 10
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        data: [{
                            value: props.data[3],
                            detail: {
                                valueAnimation: true,
                                offsetCenter: ['0%', '0%']
                            }
                        }],
                        detail: {
                            fontSize: 14,
                            color: '#fff',
                            formatter: formatter
                        }
                    }
                ]
            }
        }

        onMounted(() => {
            if (props.isHollander) {
                formatter = props.data[0][0] + '\n{value}%'
            }
            else {
                formatter = '{value}%'
            }

            const chartInstance = echarts.init(pipe.value);
            chartInstance.setOption(getOption());
        })
        return { pipe }
    }
})
</script>

<style lang='scss' scoped>
#pipeBoard {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background: rgb(25, 25, 50);
    font-size: 12px;
    color: #fff;
    font-weight: 500;
}
</style>