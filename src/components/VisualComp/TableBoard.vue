<template>
    <div class="tableBoard" :class="{ hollanderBox: isHollander, earlyWarningBox: isEarlyWarning }"
        :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
        <div style="position:relative;height:100%;width:100%;">
            <h3 class="boardTitle">{{ boardTitle }}</h3>
            <dv-scroll-board class="dv-scr-board" :config="config" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        boardTitle: String,
        config: Object,
        boxWidth: Number,
        boxHeight: Number,
        isHollander: {
            type: Boolean,
            default: false,
            required: false
        },
        isEarlyWarning: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
.tableBoard {
    border-radius: 5px;
    margin: 20px;

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

    ::v-deep .dv-scr-board {

        .ceil {
            font-size: 18px;
        }

        .rows .row-item .ceil:last-child {
            //字体颜色渐变
            background: linear-gradient(90deg, rgb(139, 220, 255), rgb(0, 178, 255));
            color: #000000;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .header {
            //背景色渐变
            background: linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4));

            .header-item {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }


}

.hollanderBox {
    ::v-deep .dv-scr-board {
        .header .header-item:nth-child(2) {
            width: 250px !important;
        }

        .row-item .ceil:nth-child(2) {
            width: 250px !important;
        }
    }
}

.earlyWarningBox {
    ::v-deep .dv-scr-board {
        .header .header-item:nth-child(2) {
            width: 180px !important;
        }

        .row-item .ceil:nth-child(2) {
            width: 180px !important;
        }
    }
}
</style>
