<script lang="ts">
import useDraw from '@/utils/useDraw';
import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref
} from 'vue';
export default defineComponent({
    components: {},
    setup() {
        //加载标识
        const loading = ref<boolean>(true)
        // * 适配处理
        const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
        // 生命周期
        onMounted(() => {
            console.log("onmounted");

            cancelLoading()
            // todo 屏幕适应
            windowDraw()
            calcRate()
        })

        onUnmounted(() => {
            unWindowDraw()
        })

        // methods
        // todo 处理 loading 展示
        const cancelLoading = () => {
            setTimeout(() => {
                loading.value = false
            }, 500)
        }

        // return
        return {
            loading,
            appRef,
        }
    },
})
</script>

<template>
    <div id="index" ref="appRef">
        <div class="bg">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <div v-else class="host-body">
                <div class="vr-title">
                    <img src="../../assets/visualReport/titleBG.png" alt="lost">
                    <!-- <span id="title">心理成长可视化大屏</span> -->
                </div>
            </div>
        </div>
    </div>

    <!-- <div id="visualReport" class="main">
            <div class="main_con">
                <div class="main_top">
                    <div class="main_top_middle">
                        <div class="main_top_middle_top_title">
                            <img class="title_bg" src="../../assets/visualReport/title_bg.png"> 政务服务大数据可视化监管平台
                        </div>
                        <div class="main_top_middle_num_title">案件公开数量</div>
                        <div class="main_top_middle_num">
                            <div class="main_top_middle_num_list">
                                <img src="../../assets/visualReport/center_num.png">
                                <p class="main_top_middle_num_list5">0</p>
                            </div>
                            <div class="main_top_middle_num_list">
                                <img src="../../assets/visualReport/center_num.png">
                                <p class="main_top_middle_num_list4">0</p>
                            </div>
                            <div class="main_top_middle_num_list">
                                <img src="../../assets/visualReport/center_num.png">
                                <p class="main_top_middle_num_list3">0</p>
                            </div>
                            <div class="main_top_middle_num_list">
                                <img src="../../assets/visualReport/center_num.png">
                                <p class="main_top_middle_num_list2">0</p>
                            </div>
                            <div class="main_top_middle_num_list">
                                <img src="../../assets/visualReport/center_num.png">
                                <p class="main_top_middle_num_list1">0</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div> -->
</template>

<style scoped>
@import '../../assets/scss/visualReport.scss';
</style>
<!-- <style scoped>
#visualReport {
    width: 100%;
    overflow-y: auto;
    background-color: black;
    transform-origin: center center;
}

.main_con {
    position: absolute;
    width: 97%;
    height: 95%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    /* background: white; */
}

.main_top {
    width: 100%;
    height: 37%;
}

.main_top_middle {
    float: left;
    width: 63%;
    height: 100%;
    margin-left: 1.2%;
}

.main_top_middle_top_title {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 1.7vw;
    font-weight: bold;
    color: #0EFCFF;
    height: 14%;
}

.main_top_middle_top_title .title_bg {
    position: absolute;
    left: 7%;
    top: -20%;
    width: 86%;
    height: 140%;
}

.main_top_middle_top_title .title_bg {
    position: absolute;
    left: 7%;
    top: -20%;
    width: 86%;
    height: 140%;
}

.main_top_middle_num_title {
    float: left;
    color: #0EFCFF;
    font-size: 1.5vw;
    margin-left: 13%;
    line-height: 4.5vw;
    width: 18%;
    margin-top: .5vw;
}

.main_top_middle_num_title {
    float: left;
    color: #0EFCFF;
    font-size: 1.5vw;
    margin-left: 13%;
    line-height: 4.5vw;
    width: 18%;
    margin-top: .5vw;
}

.main_top_middle_num {
    float: left;
    width: 55%;
    height: 23%;
    margin: .7% auto;
    margin-top: 1.5%;
}

.main_top_middle_num_list {
    position: relative;
    float: left;
    height: 100%;
    width: 12%;
    margin-left: 2.6%;
    font-size: 2vw;
    font-weight: bold;
    color: #0EFCFF;
    line-height: 240%;
}

.main_top_middle_num_list p {
    text-align: center;
}

.main_top_middle_num_list:nth-child(1) {
    margin-left: 0;
}

.main_top_middle_num_list img {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style> -->