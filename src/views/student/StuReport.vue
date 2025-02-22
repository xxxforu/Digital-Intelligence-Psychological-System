<template>
    <a-spin v-if="loading" class="arcoSpin" />
    <div v-else id="stuReport">
        <div class="visualBox" v-if="!TestInform.questionType">
            <div class="columnBox">
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
        <div class="visualBox" v-else>
            <div>
                <p>霍兰德能力分布</p>
                <radar-board :boxWidth="620" :boxHeight="200" :data="(data as API.IPReportProps).ProradarData"
                    :currentType="TestInform.questionType + 1" :radius="70" :isReport="true" />
            </div>
            <div>
                <p>多元智能能力分布</p>
                <radar-board :boxWidth="620" :boxHeight="200" :data="(data as API.IPReportProps).IGradarData"
                    :currentType="TestInform.questionType" :radius="70" :isReport="true" />
            </div>
        </div>
        <div class="textReportBox" v-if="!TestInform.questionType">
            <div class="boxTitle">社会情感测试报告</div>
            <div class="textReportItem" v-for="(item, index) in (data as API.StuSFReportProps).scoreDesc" :key="index">
                <div class="blueTitle">【{{ item.title }}】 {{ item.rank }}</div>
                <div class="blackTitle">{{ item.title }}解释</div>
                <div class="content">{{ item.overview }}</div>
                <div class="blackTitle">{{ item.title }}评价</div>
                <div class="content">{{ item.content }}</div>
            </div>
        </div>
        <div class="textReportBox" v-else>
            <div class="boxTitle">霍兰德职业测试报告</div>
            <div class="textReportItem" v-for="(item, index) in (data as API.IPReportProps).professionReport"
                :key="index">
                <div class="blueTitle">【{{ item.resultName }}】</div>
                <div class="blackTitle">类型特点</div>
                <div class="content">{{ item.characterName }}</div>
                <div class="blackTitle">类型解释</div>
                <div class="content">{{ item.characterDesc }}</div>
                <div class="blackTitle">相关生活案例</div>
                <div class="content">{{ item.characterCase }}</div>
                <div class="blackTitle">推荐专业定位</div>
                <div class="content">{{ item.majorLocation }}</div>
            </div>
            <br /><br />
            <div class="boxTitle">多元智能测试报告</div>
            <div class="textReportItem" v-for="(item, index) in (data as API.IPReportProps).intelligenceReport"
                :key="index">
                <div class="blueTitle">【{{ item.resultName }}智能】{{ item.resultScore }}分</div>
                <div class="blackTitle">维度评语</div>
                <div class="content">{{ item.resultDesc }}</div>
                <div class="blackTitle">维度解释</div>
                <div class="content">{{ item.dimensionDesc }}</div>
                <div class="blackTitle">建议</div>
                <div class="content">{{ item.method }}</div>
                <div class="blackTitle">推荐专业：</div>
                <div v-for="(majorItem, majorIndex) in item.majorRecommend" :key="majorIndex">
                    <div class="blackTitle">{{ majorItem.majorCode }}-{{ majorItem.majorMain }}</div>
                    <div class="content">{{ majorItem.majorDesc }}</div>
                </div>
            </div>
            <br /><br />
            <div class="boxTitle">多元智能霍兰德耦合报告</div>
            <div class="textReportItem">
                <div class="blueTitle">{{ (data as API.IPReportProps).mixReport?.resultName }}</div>
                <div class="blueTitle">核心智能：{{ (data as API.IPReportProps).mixReport?.dimension }}</div>
                <div class="blackTitle">推荐专业：</div>
                <div v-for="(majorItem, majorIndex) in (data as API.IPReportProps).mixReport?.majorRecommend"
                    :key="majorIndex">
                    <div v-if="majorItem.majorCode">
                        <div class="blackTitle">{{ majorItem.majorCode }}-{{ majorItem.majorMain }}</div>
                        <div class="blackTitle">介绍</div>
                        <div class="content">{{ majorItem.majorDesc }}</div>
                        <div class="blackTitle">包含专业</div>
                        <div class="content">{{ majorItem.majorInclude }}</div>
                    </div>
                    <div v-else>无</div>

                </div>
            </div>

        </div>
    </div>
    <button @click="exportPDF">导出</button>
</template>

<script lang='ts'>
import { stuIPReportGET, stuSFReportGET } from '@/api/studentController';
import HorizontalColumn from '@/components/VisualComp/HorizontalColumn.vue';
import RadarBoard from '@/components/VisualComp/RadarBoard.vue';
import { useTestInformStore } from '@/store/testStore';
import exportHtmlPDF from '@/utils/useHtmlToPDF';
import JsPDF from 'jspdf';
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
                res = await stuSFReportGET(TestInform.questionId || "")
                if (res.data) {
                    data.value = res.data;
                    (data.value as API.StuSFReportProps).totalScore = (data.value as API.StuSFReportProps)?.totalScore?.map(([label, score]) => [label, Number(score)]);
                    // 进行雷达图数据类型转换
                    // 类型断言
                    const scoreDistribute = (res.data as API.StuSFReportProps).scoreDistribute;
                    if (scoreDistribute) {
                        const { list, scoreValues } = scoreDistribute;
                        (data.value as API.StuSFReportProps).radarData = {
                            value: scoreValues,
                            indicator: list,
                        } as API.MaxRadarFrontedData;
                    }
                }


            } else if (TestInform.questionType === 1) {
                res = await stuIPReportGET(TestInform.questionId || "")
                data.value = res.data
                // 类型断言
                //解析雷达图
                const intelligenceDistribute = (res.data as API.IPReportProps).intelligenceDistribute;
                const professionDistribute = (res.data as API.IPReportProps).professionDistribute;
                if (intelligenceDistribute) {
                    const { list, scoreValues } = intelligenceDistribute;
                    (data.value as API.IPReportProps).IGradarData = {
                        value: scoreValues,
                        indicator: list,
                    } as API.MaxRadarFrontedData;
                }
                if (professionDistribute) {
                    // 假设 professionDistribute 是从后端获取的数据
                    const { list, scoreValues } = professionDistribute;

                    // 定义排序顺序
                    const order = ['R', 'C', 'E', 'S', 'A', 'I'];

                    // 将 list 和 scoreValues 组合成一个数组，方便排序
                    const combined = list.map((item: { text: string, max: number }, index: number) => ({
                        text: item.text,
                        max: item.max,
                        score: scoreValues[index],
                    }));

                    // 按照指定顺序对 combined 进行排序
                    const sortedCombined = combined.sort((a: { text: string, max: number }, b: { text: string, max: number }) => {
                        const aType = a.text[0]; // 提取类型，如 "R-Realistic-技能型" 中的 "R"
                        const bType = b.text[0]; // 提取类型，如 "E-Enterprise-经营型" 中的 "E"
                        return order.indexOf(aType) - order.indexOf(bType);
                    });

                    // 分离排序后的 list 和 scoreValues
                    const sortedList = sortedCombined.map((item: { text: string, max: number }) => ({
                        text: item.text,
                        max: item.max,
                    }));
                    const sortedScoreValues = sortedCombined.map((item: { text: string, max: number, score: number }) => item.score);

                    // 将排序后的数据赋值给 ProradarData
                    (data.value as API.IPReportProps).ProradarData = {
                        value: sortedScoreValues,
                        indicator: sortedList,
                    } as API.MaxRadarFrontedData;
                }
            }
            loading.value = false

        }
        watchEffect(() => {
            loadData()
        })
        const exportPDF = () => {
            exportHtmlPDF(
                'stuReport',
                (res: { pdf: JsPDF; canvas: HTMLCanvasElement; canvasUrl: string }) => {
                    const { pdf } = res;

                    // 自定义文件名
                    const fileName = `报名表_${new Date().toLocaleDateString()}.pdf`;

                    // 自动下载 PDF 文件
                    pdf.save(fileName);

                    // 如果需要获取 base64 的 PDF 数据
                    const pdfData = pdf.output('datauristring'); // 获取 base64 的 PDF
                    console.log(pdfData); // 打印 base64 数据（可选）
                },
                (err: unknown) => {
                    console.error('导出 PDF 失败:', err);
                }
            );
        };
        return {
            TestInform,
            data,
            loading,
            exportPDF,
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
    justify-content: start;
    align-content: center;
    height: 90%;
    width: 90%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 10px;

    .visualBox {
        display: flex;
        justify-content: space-between;
        flex: 2;
        margin-bottom: 15px;

        .columnBox {
            padding: 10px 0;
            box-sizing: border-box;
        }

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
                font-size: 16px;
            }
        }
    }

    .textReportBox {
        flex: 3;
    }
}
</style>