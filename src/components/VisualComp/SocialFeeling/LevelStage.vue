<template>
    <div class="levelStage" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div class="percent">{{ data.percent }}%</div>
        <div class="stage">
            <img src="../../../assets/visualReport/stage.png" alt="stage">
            <div>{{ data.level }}</div>
        </div>
        <div class="level">Level</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        data: Object,
        boxWidth: Number,
        boxHeight: Number,
    },
    setup() {
        components: { }
        return {}
    }
})
</script>

<style lang='scss' scoped>
.levelStage {
    overflow: hidden;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: end;

    .percent,
    .level {
        background: linear-gradient(90.00deg, rgb(255, 255, 255), rgb(139, 220, 255));
        -webkit-background-clip:
            text;
        -webkit-text-fill-color:
            transparent;
        background-clip:
            text;
        text-fill-color:
            transparent;
        font-family: Urbanist;
        font-size: 70px;
        font-weight: 700;
    }


    .stage {
        position: relative;

        width: 225px;
        height: 240px;

        img {
            width: 224px;
            height: 240px;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
        }

        div {
            font-size: 120px;
            color: #fff;
            width: 224px;
            position: absolute;
            left: 0;
            bottom: 20%;
            text-align: center;
        }
    }
}
</style>