<template>
    <div class="significantType" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <h3 class="boardTitle">{{ boardTitle }}</h3>
        <div class="typeList">
            <div class="typeItem" v-for="(item, index) in data" :key="index">
                <div class="colorBox">{{ item.type0 }}</div>
                <p style="font-size: 40px;">{{ item.type2 }}</p>
                <p style="font-size: 20px;">{{ item.type1 }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        boardTitle: String,
        data: Array,
        boxWidth: Number,
        boxHeight: Number,
    },
    setup() {
        return {}
    }
})
</script>

<style lang='scss' scoped>
.significantType {
    overflow: hidden;
    display: flex;
    align-items: center;

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

    .typeList {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .typeItem {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10;
            color: #fff;
            font-weight: bold;

            .colorBox {
                width: 60px;
                height: 60px;
                border-radius: 10px;
                line-height: 60px;
                font-size: 28px;
            }
        }

        .typeItem:nth-child(1) .colorBox {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(255, 212, 34), rgb(255, 125, 5) 100%);
        }

        .typeItem:nth-child(2) .colorBox {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(227, 35, 255), rgb(117, 23, 248) 100%);
        }

        .typeItem:nth-child(3) .colorBox {
            background: radial-gradient(50.00% 50.00% at 50% 50%, rgb(77, 255, 223), rgb(77, 161, 255) 100%);
        }
    }



}
</style>