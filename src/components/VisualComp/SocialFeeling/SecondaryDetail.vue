<template>
    <div class="secondaryDetail" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div class="secondAbilityItem" v-for="(item, index) in data" :key="index">
            <div class="top">
                <div class="levelName">{{ item.levelName }}</div>
                <div class="percent">{{ item.percent }}%</div>
                <div class="level">{{ item.level }}</div>
                <div class="percent">Level</div>
            </div>
            <div class="describe">{{ item.overview }}</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        data: Object,
        boxWidth: Number,
        boxHeight: Number,
    },
    setup() {
        return {}
    }
})
</script>

<style lang='scss' scoped>
.secondaryDetail {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .secondAbilityItem {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .top {
            width: 40%;
            display: flex;
            justify-content: space-between;
            align-items: end;

            .levelName {
                color: rgb(255, 255, 255);
                font-family: Urbanist;
                font-size: 40px;
                font-weight: 700;
            }

            .level {
                font-size: 70px;
            }

            .percent {
                font-size: 35px;
            }
        }

        .describe {
            width: 95%;
            margin: 10px auto;
            font-size: 18px;
            font-weight: 500;
        }
    }

    .secondAbilityItem:nth-child(1) {

        .percent,
        .level {
            background: linear-gradient(90.00deg, rgb(77, 255, 223), rgb(77, 161, 255));
            font-weight: 700;
            -webkit-background-clip:
                text;
            -webkit-text-fill-color:
                transparent;
            background-clip:
                text;
            text-fill-color:
                transparent;
            font-family: Urbanist;

        }
    }

    .secondAbilityItem:nth-child(2) {

        .percent,
        .level {
            background: linear-gradient(90.00deg, rgb(255, 212, 34), rgb(255, 125, 5));
            font-weight: 700;
            -webkit-background-clip:
                text;
            -webkit-text-fill-color:
                transparent;
            background-clip:
                text;
            text-fill-color:
                transparent;
            font-family: Urbanist;

        }
    }

    .secondAbilityItem:nth-child(3) {

        .percent,
        .level {
            background: linear-gradient(90.00deg, rgb(227, 35, 255), rgb(117, 23, 248));
            font-weight: 700;
            -webkit-background-clip:
                text;
            -webkit-text-fill-color:
                transparent;
            background-clip:
                text;
            text-fill-color:
                transparent;
            font-family: Urbanist;

        }
    }
}
</style>