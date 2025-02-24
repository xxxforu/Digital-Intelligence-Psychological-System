<template>
    <div class="scrollText" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <h3 class="boardTitle">{{ boardTitle }}</h3>
        <div class="scroll-content" :style="{ animationDuration: animationDuration + 's' }" ref="scrollContent"
            v-if="isHollander">
            <div class="scroll-item" v-for="(item, index) in data" :key="index">
                <div class="hollanderRate">
                    <div class="colorBox">{{ index - 1 }}</div>
                    <p class="content">{{ item.resultName }}</p>
                </div>
                <div v-if="HLDTypeDetail">
                    <p class="title">【类型特点】</p>
                    <p class="content">{{ item.characterName }}</p>
                    <p class="title">【类型解释】</p>
                    <p class="content">{{ item.characterDesc }}</p>
                </div>
                <div v-else-if="HLDDimensionDetail">
                    <p class="title">【相关生活案例】</p>
                    <p class="content">{{ item.characterCase }}</p>
                    <p class="title">【推荐专业定位】</p>
                    <p class="content">{{ item.majorLocation }}</p>
                </div>
            </div>
            <div class="scroll-item" v-for="(item, index) in data" :key="index">
                <div class="hollanderRate">
                    <div class="colorBox">{{ index - 1 }}</div>
                    <p class="content">{{ item.resultName }}</p>
                </div>
                <div v-if="HLDTypeDetail">
                    <p class="title">【类型特点】</p>
                    <p class="content">{{ item.characterName }}</p>
                    <p class="title">【维度解释】</p>
                    <p class="content">{{ item.characterDesc }}</p>
                </div>
                <div v-else-if="HLDDimensionDetail">
                    <p class="title">【相关生活案例】</p>
                    <p class="content">{{ item.characterCase }}</p>
                    <p class="title">【推荐专业定位】</p>
                    <p class="content">{{ item.majorLocation }}</p>
                </div>

            </div>


        </div>
        <div class="scroll-content" :style="{ animationDuration: animationDuration + 's' }" ref="scrollContent" v-else>
            <div class="scroll-item" v-for="(item, index) in data" :key="index">
                <p class="title">【{{ item.title }}】</p>
                <p class="content">{{ item.content }}</p>
            </div>
            <div class="scroll-item" v-for="item in data">
                <p class="title">【{{ item.title }}】</p>
                <p class="content">{{ item.content }}</p>
            </div>

        </div>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    props: {
        isHollander: {
            type: Boolean,
            default: false,
            required: false
        },
        HLDTypeDetail: {
            type: Boolean,
            default: false,
            required: false
        },
        HLDDimensionDetail: {
            type: Boolean,
            default: false,
            required: false
        },
        boardTitle: String,
        data: Array,
        boxWidth: Number,
        boxHeight: Number,

    },
    setup(props) {
        const scrollContent = ref(null); // 获取滚动内容的 DOM 元素
        const contentHeight = ref(0); // 存储滚动内容的总高度

        // 在组件挂载后计算滚动内容的总高度
        onMounted(() => {
            if (scrollContent.value) {
                const items = scrollContent.value.querySelectorAll('.scroll-item');
                let totalHeight = 0;
                items.forEach(item => {
                    totalHeight += item.offsetHeight; // 获取每个滚动项的实际高度
                });
                contentHeight.value = totalHeight;
            }
        });

        // 根据总高度和期望的滚动速度计算动画持续时间
        const animationDuration = computed(() => {
            const speed = 30; // 期望的滚动速度（px/s）
            if (contentHeight.value)
                return contentHeight.value / speed;
            else return (props.boxHeight + 250) / speed;
        });

        return {
            scrollContent,
            animationDuration
        };
    }
})
</script>

<style lang='scss' scoped>
.scrollText {
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

    .hollanderRate {
        display: flex;
        text-align: center;
        align-items: center;

        .colorBox {
            width: 20px;
            height: 20px;
            border-radius: 2px;
            line-height: 20px;
            font-size: 18px;
            margin: 5px;
        }

        .colorBox:nth-child(1) {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(255, 212, 34), rgb(255, 125, 5) 100%);
        }

        .colorBox:nth-child(2) {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(227, 35, 255), rgb(117, 23, 248) 100%);
        }

        .colorBox:nth-child(3) {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(77, 255, 223), rgb(77, 161, 255) 100%);
        }
    }
}

.scroll-content {
    display: flex;
    flex-direction: column;
    //滚动速度
    animation: scroll linear infinite;
}

.scroll-item {
    background: transparent;
    margin: 5px 0;

    .title {
        margin: 0;
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
        white-space: pre-line;

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