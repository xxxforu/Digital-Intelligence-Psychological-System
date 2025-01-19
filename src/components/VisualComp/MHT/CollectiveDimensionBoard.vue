<template>
    <div class="collectiveDimensionBoard" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <h3 class="boardTitle">{{ data.dimensionName }}</h3>
        <div class="scroll-content">
            <div class="scroll-item">
                <div class="progress">
                    人数占比:{{ data.percent }}%<a-progress :percent="data.percent * 0.01" :style="{ width: '150px' }"
                        :color="{
                            '0%': 'rgb(227,35,255)',
                            '100%': 'rgb(117,23,248)',
                        }" trackColor="rgba(191,205,255,0.25)" showText="false" size="large" />
                </div>

                <p class="title">【等级解释】</p>
                <p class="content">{{ data.levelExplain }}</p>
                <p class="title">【群体辅导建议】</p>
                <p class="content">{{ data.suggestion }}</p>
            </div>
            <div class="scroll-item">
                <div class="progress">
                    人数占比:{{ data.percent }}%<a-progress :percent="data.percent * 0.01" :style="{ width: '150px' }"
                        :color="{
                            '0%': 'rgb(227,35,255)',
                            '100%': 'rgb(117,23,248)',
                        }" trackColor="rgba(191,205,255,0.25)" showText="false" size="large" />
                </div>

                <p class="title">【等级解释】</p>
                <p class="content">{{ data.levelExplain }}</p>
                <p class="title">【群体辅导建议】</p>
                <p class="content">{{ data.suggestion }}</p>
            </div>
        </div>

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
.collectiveDimensionBoard {
    overflow: hidden;
    margin: 25px;

    .boardTitle {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -30%);
        margin: 5px;
        text-align: center;
        font-size: 20px;
        color: white;
    }
}

.scroll-content {
    display: flex;
    flex-direction: column;
    //滚动速度
    animation: scroll 35s linear infinite;
}

.scroll-item {
    background: transparent;
    margin: 5px 0;

    .title {
        margin: 10px 0;
        background: linear-gradient(90.00deg, rgb(139, 220, 255), rgb(0, 178, 255));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-family: Urbanist;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
    }

    .content {
        margin: 5px 0;
        color: rgb(255, 255, 255);
        font-family: Urbanist;
        font-size: 18px;
        font-weight: 500;
        line-height: 25px;
        letter-spacing: 0%;
        text-align: left;
    }

    .progress {
        background: transparent;
        text-align: left;
        margin: 10px;
        font-size: 18px;
        font-weight: 700;
        line-height: 25px;

        ::v-deep .arco-progress-type-line {
            margin-left: 10px;
        }

        ::v-deep .arco-progress-line-text {
            display: none;
        }
    }
}

/* Clone the content to achieve infinite scrolling */
.scroll-content::after {
    content: '';
    display: block;
    width: 100%;
    height: 0;
}

@keyframes scroll {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
}

.scrollText:hover .scroll-content {
    animation-play-state: paused;
}
</style>