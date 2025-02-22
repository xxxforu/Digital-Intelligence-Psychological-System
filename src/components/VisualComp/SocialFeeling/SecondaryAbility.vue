<template>
    <div class="secondaryAbility">
        <h3 class="boardTitle">{{ boardTitle }}</h3>
        <div class="left ">
            <div class="trumpet ">
                <img src="../../../assets/visualReport/trumpet.png" alt="trumpet">
                <img src="../../../assets/visualReport/stage.png" alt="stage">
                <div style="clear: both;"></div>
            </div>
            <div class="firstLevelPoint">{{ data.point }}</div>
            <div>分</div>
        </div>
        <div class="right">
            <div class="secondLevelLine">
                <div ref='gauge0' style="width:120px;height:120px"></div>
                <p class="secondLevelTitle">{{ data.secondLevel[0].title }}</p>
                <div class="level">{{ data.secondLevel[0].level }}</div>
            </div>
            <div class="secondLevelLine">
                <div ref='gauge1' style="width:120px;height:120px"></div>
                <p class="secondLevelTitle">{{ data.secondLevel[1].title }}</p>
                <div class="level">{{ data.secondLevel[1].level }}</div>
            </div>
            <div class="secondLevelLine">
                <div ref='gauge2' style="width:120px;height:120px"></div>
                <p class="secondLevelTitle">{{ data.secondLevel[2].title }}</p>
                <div class="level">{{ data.secondLevel[2].level }}</div>
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
        boardTitle: String,
        data: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        components: { }
        const gauge0 = ref(null)
        const gauge1 = ref(null)
        const gauge2 = ref(null)


        const barColor = [
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
        ]
        onMounted(() => {
            setTimeout(() => {
                const gaugeChart0 = echarts.init(gauge0.value)
                const gaugeChart1 = echarts.init(gauge1.value)
                const gaugeChart2 = echarts.init(gauge2.value)
                const gaugeDataList = [
                    [{
                        value: props.data.secondLevel[0].point,
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '0%']
                        }
                    }], [{
                        value: props.data.secondLevel[1].point,
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '0%']
                        }
                    }], [{
                        value: props.data.secondLevel[2].point,
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '0%']
                        }
                    }]
                ]
                const getOption = (optionIndex) => {
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
                                        color: barColor[optionIndex]
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        width: 15
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
                                data: gaugeDataList[optionIndex],
                                detail: {
                                    fontSize: 20,
                                    color: '#fff',
                                    formatter: '{value}分'
                                }
                            }
                        ]
                    }
                }
                gaugeChart0.setOption(getOption(0));
                gaugeChart1.setOption(getOption(1));
                gaugeChart2.setOption(getOption(2));
            }, 200)
        })



        return {
            gauge0,
            gauge1,
            gauge2,

        }
    }
})
</script>

<style lang='scss' scoped>
$box-height: 420px;
$box-width: 800px;

.secondaryAbility {
    height: $box-height;
    width: $box-width;
    margin: 5px;
    background-color: transparent;
    position: relative;
    display: flex;

    .boardTitle {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -150%);
        text-align: center;
        font-size: 20px;
        color: white;
    }

    .left {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: space-between;
        color: #fff;
        font-size: 30px;
        font-weight: bold;

        .trumpet {
            display: grid;
            position: relative;
            /* 用于子元素的绝对定位参照 */
        }

        img:nth-child(1) {
            grid-area: 1 / 1;
            /* 第一张图片 */
            transform: translateX(10%);
            /* 向右位移3% */
        }

        img:nth-child(2) {
            grid-area: 1 / 1;
            /* 第二张图片，保持位置 */
        }

        .firstLevelPoint {
            font-size: 80px;
        }

        div {
            width: fit-content;
            margin: auto;
        }


    }

    .right {
        width: 65%;
        height: 100%;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .secondLevelLine {
            height: 30%;
            padding-bottom: 5px;
            display: flex;
            color: #fff;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #fff;

            .secondLevelTitle {
                font-size: 50px;
                font-weight: bold;

            }

            .level {
                background-image: url(../../../assets/visualReport/levelBG.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                /* 背景图自适应容器大小 */
                display: inline-block;
                /* 让 div 宽度根据内容调整 */
                padding: 0 20px;
                /* 左右 padding 增加背景图宽度 */
                height: 60px;
                text-align: center;
                font-size: 25px;
                font-weight: bold;
                line-height: 60px;

            }
        }
    }
}
</style>