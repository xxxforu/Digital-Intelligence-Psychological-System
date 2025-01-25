<template>
    <a-spin v-if="loading" class="arcoSpin" />
    <div v-else id="stuReport">
        <div class="visualBox">
            <div>
                <p>社会情感测试总览统计</p>
                <horizontal-column :boxWidth="750" :boxHeight="200"
                    :dataSource="(data as API.StuSFReportProps).totalScore" :currentType="TestInform.questionType"
                    :isReport="true" />
            </div>
            <div>
                <p>社会情感能力分布</p>
                <radar-board :boxWidth="500" :boxHeight="200" :data="(data as API.StuSFReportProps).radarData"
                    :currentType="TestInform.questionType" :radius="70" :isReport="true" />
            </div>
        </div>
        <div class="textBox"></div>
    </div>
</template>

<script lang='ts'>
import { stuIPReportGET, stuSFReportGET } from '@/api/studentController';
import HorizontalColumn from '@/components/VisualComp/HorizontalColumn.vue';
import RadarBoard from '@/components/VisualComp/RadarBoard.vue';
import { useTestInformStore } from '@/store/testStore';
import { ref, watchEffect } from 'vue';
export default ({
    components: {
        HorizontalColumn,
        RadarBoard,
    },
    setup() {
        const loading = ref<boolean>(true)
        const testInformStore = useTestInformStore()
        const TestInform = testInformStore.testInform
        var res: API.BasicResponse
        const data = ref<API.StuSFReportProps | API.IPReportProps>({})
        const loadData = async () => {

            if (TestInform.questionType === 0) {
                res = await stuSFReportGET(TestInform.questionId)
                data.value = res.data
                // 进行雷达图数据类型转换

                // 类型断言
                const scoreDistribute = (res.data as API.StuSFReportProps).scoreDistribute;

                if (scoreDistribute) {
                    const { list, scoreValues } = scoreDistribute;
                    (data.value as API.StuSFReportProps).radarData = {
                        value: scoreValues,
                        indicator: list,
                    } as API.MaxRadarFrontedData;
                    console.log((data.value as API.StuSFReportProps).radarData);
                }

            } else if (TestInform.questionType === 1) {
                res = await stuIPReportGET(TestInform.questionId)
                data.value = res.data
                // 类型断言
                const intelligenceDistribute = (res.data as API.IPReportProps).intelligenceDistribute;
                const professionDistribute = (res.data as API.IPReportProps).professionDistribute;
                if (intelligenceDistribute) {
                    const { list, scoreValues } = intelligenceDistribute;
                    (data.value as API.IPReportProps).IGradarData = {
                        value: scoreValues,
                        indicator: list,
                    } as API.MaxRadarFrontedData;
                    console.log((data.value as API.IPReportProps).IGradarData);
                }
                if (professionDistribute) {
                    const { list, scoreValues } = professionDistribute;
                    (data.value as API.IPReportProps).ProradarData = {
                        value: scoreValues,
                        indicator: list,
                    } as API.MaxRadarFrontedData;
                    console.log((data.value as API.IPReportProps).ProradarData);
                }
            }
            loading.value = false

        }
        watchEffect(() => {
            loadData()
        })
        return {
            TestInform,
            data,
            loading,
        };
    }
})
</script>

<style lang='scss' scoped>
.arcoSpin {
    width: 100%;
    height: 100%;

    ::v-deep .arco-spin-icon {
        width: fit-content;
        margin: 50px auto;
        font-size: 30px;
    }
}

#stuReport {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    height: 90%;
    width: 90%;

    .visualBox {
        display: flex;
        justify-content: space-between;
        flex: 2;
        margin-bottom: 15px;

        div {
            background-color: #fff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            p {
                width: 100%;
                margin: 0;
                padding-left: 20px;
                font-weight: bold;
                font-size: 18px;
            }
        }
    }

    .textBox {
        flex: 3;
        background-color: antiquewhite;
    }
}
</style>