<script lang="ts">
import {
    CollectiveVisualGET,
    PersonalVisualGET,
    psyTermGET,
} from '@/api/teacherController';
import DoubleColumn from '@/components/VisualComp/DoubleColumn.vue';
import SignificantType from '@/components/VisualComp/Hollander/SignificantType.vue';
import HorizontalColumn from '@/components/VisualComp/HorizontalColumn.vue';
import CollectiveDimensionBoard from '@/components/VisualComp/MHT/CollectiveDimensionBoard.vue';
import PipeBoard from '@/components/VisualComp/PipeBoard.vue';
import RadarBoard from '@/components/VisualComp/RadarBoard.vue';
import ScrollText from '@/components/VisualComp/ScrollText.vue';
import LevelStage from '@/components/VisualComp/SocialFeeling/LevelStage.vue';
import PieBoard from '@/components/VisualComp/SocialFeeling/PieBoard.vue';
import SecondaryAbility from '@/components/VisualComp/SocialFeeling/SecondaryAbility.vue';
import SecondaryDetail from '@/components/VisualComp/SocialFeeling/SecondaryDetail.vue';
import TableBoard from '@/components/VisualComp/TableBoard.vue';
import { useLoginUserStore } from '@/store/userStore';
import { useVisualStore } from '@/store/visualStore';
import useDraw from '@/utils/useDraw';
import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3';
import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
} from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        TableBoard,
        HorizontalColumn,
        ScrollText,
        SecondaryAbility,
        RadarBoard,
        SignificantType,
        PipeBoard,
        DoubleColumn,
        CollectiveDimensionBoard,
        LevelStage,
        SecondaryDetail,
        PieBoard,
        useRouter,
    },
    computed: {
        title() {
            if (this.visualDetail.boardType) {
                switch (this.state.currentType) {
                    case 0:
                        return '社会情感能力数据可视化大屏';
                    case 1:
                        return '多元智能数据可视化大屏';
                    case 2:
                        return '霍兰德职业兴趣数据可视化大屏';
                    case 3:
                        return '中小学生心理健康量表(MHT)数据可视化大屏';
                    case 4:
                        return '学生动态心理预警数据可视化大屏';
                    default:
                        return '';
                }
            }
            switch (this.state.currentType) {
                case 0:
                    return '社会情感能力集体数据可视化大屏';
                case 1:
                    return '多元智能集体数据可视化大屏';
                case 2:
                    return '霍兰德职业兴趣集体数据可视化大屏';
                case 3:
                    return '中小学生心理健康量表(MHT)集体数据可视化数据';
                case 4:
                    return '学生动态心理预警集体数据可视化大屏';
                default:
                    return '';
            }
        },
    },
    setup() {
        const loginUserStore = useLoginUserStore();
        const loginUser = loginUserStore.loginUser

        const router = useRouter()
        const borderRef = ref<InstanceType<typeof DvBorderBox1>>()
        //加载标识
        const loadingState = ref({
            pageLoading: true,
            termLoading: true
        })
        type termType = {
            value: string,
            label: string
        }
        // * 适配处理
        const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
        const visualDetailStore = useVisualStore()
        const visualDetail = visualDetailStore.visualDetail
        if (!visualDetail.uid && !visualDetail.classedIds?.length) router.go(-1);
        const termList = ref<Array<termType>>([])
        const getTermList = async () => {
            try {
                const res1 = await psyTermGET();
                if (res1.data) {
                    state.value.term = res1.data[0];

                    loadingState.value.termLoading = false;
                    res1.data.forEach(termItem => {
                        // 提取年份和数字部分
                        const year1 = termItem.substring(0, 4); // 提取前4个字符作为第一个年份
                        const year2 = termItem.substring(4, 8).slice(0, 4); // 提取接下来的4个字符作为第二个年份（虽然这里只需要前4个，但substring已经确保了长度）
                        const number = termItem.substring(8, 9) || termItem.slice(-1); // 提取最后1个字符作为数字（这里两种方法都可以，因为已知长度为7）

                        // 拼接成所需格式
                        const formattedString = `${year1}-${year2}-${number}`;
                        termList.value.push({
                            label: formattedString,
                            value: termItem
                        } as termType);
                    });
                }
            } catch (error) {
                console.error("Error fetching term list:", error);
            }
        };
        // 生命周期
        onMounted(async () => {
            // todo 屏幕适应
            windowDraw()
            calcRate()
            borderRef.value?.initWH()
            await getTermList()
            loadData()
        })
        const data = ref({})
        const loadData = () => {
            loadingState.value.pageLoading = true

            if (visualDetail.boardType) {
                PersonalVisualGET({
                    uid: visualDetail.uid,
                    resultType: state.value.currentType,
                    term: state.value.term,
                    cnt: state.value.cnt || null
                } as API.PersonalVisualProps).then(res => {
                    loadingState.value.pageLoading = false
                    if (state.value.currentType === 0) {
                        data.value = (res.data as API.personalSFVisual) || null;

                        if (res.data) {
                            PSFTableBoard.value.data = (data.value as API.personalSFVisual).rankList;
                            (data.value as API.personalSFVisual).totalScore = (data.value as API.personalSFVisual).totalScore.map(([label, score]) => [label, Number(score)]);
                        }
                    } else if (state.value.currentType === 1) {
                        data.value = (res.data as API.personalMIVisual) || null;
                        if (res.data) {

                            MITableBoard.value.data = (data.value as API.personalMIVisual).rankList;
                            (data.value as API.personalMIVisual).rankList = (data.value as API.personalMIVisual).rankList.map(([label, score]) => [label, Number(score)]);
                            const scoreDistribute = (res.data as API.personalMIVisual).scoreDistribute;
                            if (scoreDistribute) {
                                const { list, scoreValues } = scoreDistribute;
                                MIRadarBoard.value = {
                                    value: scoreValues,
                                    indicator: list,
                                };
                            }
                            MIScrollText1.value = [];
                            MIScrollText2.value = [];
                            (data.value as API.personalMIVisual).intelligenceExplainAndRecommend.forEach(item => {
                                MIScrollText1.value.push({
                                    title: item.resultName + "智能",
                                    content: item.resultDesc
                                })
                                item.majorRecommend.forEach(el => {
                                    MIScrollText2.value.push({
                                        title: el.majorCode + " " + el.majorMain,
                                        content: el.majorDesc
                                    })
                                });
                            })

                        }
                    } else if (state.value.currentType === 2) {
                        data.value = (res.data as API.personalHLDVisual) || null;
                        if (res.data) {

                            (data.value as API.personalHLDVisual).score = (data.value as API.personalHLDVisual).score.map(([label, score]) => [label, Number(score)]);
                            HLDRadarBoard.value.value = [];
                            HLDRadarBoard.value.indicator = [];
                            // 定义排序顺序
                            const order = ['R', 'C', 'E', 'S', 'A', 'I'];

                            // 按照指定顺序对 score 进行排序
                            const sortedScore = (data.value as API.personalHLDVisual).score.sort((a, b) => {
                                const aType: string = (a[0] as string)[0]; // 提取类型，如 "R-Realistic-技能型" 中的 "R"
                                const bType: string = (b[0] as string)[0]; // 提取类型，如 "E-Enterprise-经营型" 中的 "E"
                                return order.indexOf(aType) - order.indexOf(bType);
                            });
                            sortedScore.forEach(item => {
                                HLDRadarBoard.value.value.push(parseInt(item[1] as string))
                                HLDRadarBoard.value.indicator.push({
                                    text: (item[0] as string),
                                    max: 8,
                                })
                            })
                        }
                    }
                    else if (state.value.currentType === 3) {
                        data.value = (res.data as API.personalMHTVisual) || null;
                        if (res.data) {
                            MHTTableBoard.value.data = [];
                            MHTScrollText1.value = [];
                            MHTScrollText2.value = [];
                            (res.data as API.personalMHTVisual).score.forEach(item => {
                                MHTTableBoard.value.data.push([item[0] as string, item[1] as string])

                                MHTScrollText1.value.push()
                            });
                            (res.data as API.personalMHTVisual).explain.forEach(item => {
                                MHTScrollText1.value.push({
                                    title: item.resultName,
                                    content: item.resultDesc
                                })
                                MHTScrollText2.value.push({
                                    title: item.resultName,
                                    content: item.advice
                                })
                            })
                        }
                    } else if (state.value.currentType === 4) {
                        data.value = (res.data as API.personalWarnVisual) || null;
                        if (res.data) {
                            EWTableBoard1.value.data = (res.data as API.personalWarnVisual).vulnerablePositionExplain;
                            EWTableBoard2.value.data = (res.data as API.personalWarnVisual).heartPainExplain
                            EWTableBoard3.value.data = (res.data as API.personalWarnVisual).suicideExplain
                            EWTableBoard4.value.data = (res.data as API.personalWarnVisual).vulnerableTraitExplain

                            EWRadarBoard1.value = {
                                value: (res.data as API.personalWarnVisual).vulnerablePosition.score,
                                indicator: (res.data as API.personalWarnVisual).vulnerablePosition.indicator,
                            };
                            EWRadarBoard2.value = {
                                value: (res.data as API.personalWarnVisual).heartPain.score,
                                indicator: (res.data as API.personalWarnVisual).heartPain.indicator,
                            };
                            EWRadarBoard4.value = {
                                value: (res.data as API.personalWarnVisual).vulnerableTrait.score,
                                indicator: (res.data as API.personalWarnVisual).vulnerableTrait.indicator,
                            };
                        }
                    }
                    else data.value = res.data
                })
            }
            else {
                CollectiveVisualGET({
                    classesIds: visualDetail.classedIds,
                    resultType: state.value.currentType,
                    term: state.value.term,
                    cnt: state.value.cnt || null
                } as API.CollectiveVisualProps).then(res => {
                    loadingState.value.pageLoading = false

                    if (state.value.currentType === 0) {
                        data.value = (res.data as API.collectiveSFVisual) || null;
                        if (res.data) {
                            (data.value as API.collectiveSFVisual).pieAndBarList.barList = ((data.value as API.collectiveSFVisual).pieAndBarList as API.pieAndBarListProps).barList.map(([label, score]) => [label, Number(score)]);
                            // (data.value as API.collectiveSFVisual).pieAndBarList.pieList = [];
                            (res.data as API.collectiveSFVisual).list.forEach(item => {
                                let content = item.describe[0].content
                                item.describe[0].content = item.describe[0].overview + '\n' + content;
                                // (data.value as API.collectiveSFVisual).pieAndBarList.pieList.push({
                                //     name: item.levelName,
                                //     value: item.percent
                                // })
                            })
                        }

                    } else if (state.value.currentType === 1) {
                        //把数据解析出来
                        data.value = (res.data as API.collectiveMIVisual)?.data || null
                        if (res.data) {
                            let TableBoard: Array<Array<string>> = (res.data as API.collectiveMIVisual).data
                            CMITableBoard.value.data = []
                            CMIPieDataList.value = []
                            CMIDoubleColumn.value = []
                            TableBoard.forEach(item => {
                                CMITableBoard.value.data.push([item[0] + '智能', item[1] + '人', item[2] + '人', item[3] + '%'])
                                CMIPieDataList.value.push([item[0] + '智能', parseInt(item[1]), parseInt(item[3])])
                                CMIDoubleColumn.value.push([item[0] + '智能', parseInt(item[1])])
                            })
                        }
                    }
                    else if (state.value.currentType === 2) {
                        data.value = (res.data as API.collectiveHLDVisual) || null
                        if (res.data) {
                            let TableBoard: Array<Array<string | number>> = (res.data as API.collectiveHLDVisual).rank
                            CHLDTableBoard.value.data = []
                            CHLDPieDataList.value = []

                            const { values, indicator } = (data.value as API.collectiveHLDVisual).distribute
                            // 定义排序顺序
                            const order = ['R', 'C', 'E', 'S', 'A', 'I'];

                            // 将 list 和 scoreValues 组合成一个数组，方便排序
                            const combined = indicator.map((item: { text: string, max: number }, index: number) => ({
                                text: item.text,
                                max: item.max,
                                score: values[index],
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
                            CHLDRadarBoard.value.value = sortedScoreValues;
                            CHLDRadarBoard.value.indicator = sortedList;

                            TableBoard.forEach(item => {
                                CHLDTableBoard.value.data.push([item[0] as string, item[1] + '人', item[2] + '人', item[3] + '%'])
                                CHLDPieDataList.value.push([item[0], item[1], item[3]])

                            })
                        }

                    } else if (state.value.currentType === 3) {
                        data.value = (res.data as API.collectiveMHTVisual)?.list || null
                    } else if (state.value.currentType === 4) {
                        data.value = (res.data as API.collectiveWarnVisual)?.list || null
                        if (res.data) {
                            const dataArray: Array<API.collectiveWarnVisualItem> = (res.data as API.collectiveWarnVisual).list
                            CEWTableBoard1.value.data = []
                            CEWTableBoard5.value.data = []
                            CEWTableBoard2.value.data = []
                            CEWTableBoard3.value.data = []
                            dataArray.forEach((item, index) => {
                                switch (index) {
                                    case 0: //易损处境
                                        item.analysis.list.forEach((el: Array<string>) => {
                                            CEWTableBoard1.value.data.push([el[0], el[1], el[2] + '%'])
                                        });
                                        break;
                                    case 1: //易损特质
                                        item.analysis.list.forEach((el: Array<string>) => {
                                            CEWTableBoard5.value.data.push([el[0], el[1], el[2] + '%'])
                                        });
                                        break;
                                    case 2: //心理痛苦
                                        item.analysis.list.forEach((el: Array<string>) => {
                                            CEWTableBoard2.value.data.push([el[0], el[1], el[2] + '%'])
                                        });
                                        break;
                                    case 3: //自杀意念
                                        item.analysis.list.forEach((el: Array<string>) => {
                                            CEWTableBoard3.value.data.push([el[0], el[1], el[2] + '%'])
                                        });
                                        break;

                                }

                            })
                        }

                    } else data.value = res.data
                })
            }
        }

        onUnmounted(() => {
            unWindowDraw()
        })

        var state = ref({
            term: "",
            currentType: 0,
            cnt: 0
        })


        const testSelectChange = (val: string | number) => {
            state.value.currentType = Number(val); // 强制转换为数值型\
            loadData()
        };
        const goToLastPage = () => {
            state.value.currentType = state.value.currentType - 1
            loadData()

        }
        const goToNextPage = () => {
            state.value.currentType = state.value.currentType + 1
            loadData()
        }
        // 要传给组件的数据

        // personSocialFeeling
        const PSFTableBoard = ref({
            header: ['一级指标名称', '一级指标等级'],
            data: [
                ['任务能力', 'A-高',],
                ['情绪能力', 'A-高',],
                ['关爱能力', 'A-高',],
                ['开放能力', 'B-较高',],
                ['领导能力', 'B-较高',],
                ['学习能力', 'C-中等',]
            ],
            rowNum: 6, //表格行数
            // headerHeight: 35,
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            // columnWidth: [50],
            align: ['center']
        })
        // mutipleIntelligence
        const MITableBoard = ref({
            header: ['智能类型', '得分', '智能等级'],
            data: [
                ['语言言语智能', '5分/稍有优势',],
                ['数据逻辑智能', '3分一般',],
                ['视觉空间智能', '9分/有优势',],
                ['音乐旋律智能', '7分/有优势',],
                ['身体运动智能', '6分/稍有优势',],
                ['人际关系智能', '8分/有优势',],
                ['自我认知智能', '7分/有优势',],
                ['自然观察智能', '8分/有优势',]

            ],
            rowNum: 8, //表格行数
            // headerHeight: 35,
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            // columnWidth: [50],
            align: ['center']
        })

        const MIRadarBoard = ref({
            value: [5, 3, 9, 7, 6, 8, 7, 8],
            indicator: [
                { text: '语言言语智能' },
                { text: '数据逻辑智能' },
                { text: '视觉空间智能' },
                { text: '音乐旋律智能' },
                { text: '身体运动智能' },
                { text: '人际关系智能' },
                { text: '自我认知智能' },
                { text: '自然观察智能' },
            ],
        })
        const MIScrollText1 = ref([
            {
                title: "语言言语智能",
                content: "该学生在言语-语言智能方面具有一定的优势。该学生对语言有一定的理解能力，能够处理日常的交流和基本的书面表达。该学生的语言学习能力适中，对新语言知识的掌握需要一定的时间和练习。在表达和沟通方面，该学生能够使用恰当的词汇和语法，尽管在复杂情境下可能需要进一步的练习和提高。该学生对语言的敏感性正在发展中，能够识别和使用一些修辞手法，但在创造性表达方面还有提升空间。通过持续的学习和实践，该学生有望提高自己的语言能力，更好地发掘和利用自己的言语-语言智能。"
            },
            {
                title: "数据逻辑智能",
                content: "该学生在逻辑-数学智能方面的表现处于平均水平。该学生在理解和应用数学概念及逻辑推理方面可能需要更多的努力和时间。在解决数学问题时，该学生可能在某些步骤上遇到困难，需要额外的指导和练习来提高解题技巧。在逻辑推理方面，该学生能够进行基本的思考，但在处理复杂的逻辑关系和抽象概念时可能会感到挑战。尽管如此，通过持续的学习和适当的指导，该学生完全有能力提高自己的逻辑-数学智能，增强解决问题和决策的能力。"
            },
            {
                title: "视觉空间智能",
                content: "该学生在视觉-空间智能方面展现出了非凡的才能和深刻的理解力。该学生对色彩、线条、形状、形式和空间关系的感知和理解能力非常强，这使得该学生在艺术、设计、建筑和导航等领域表现出色。该学生能够在心中轻松构建和操作复杂的空间图像，这种能力在解决空间问题和进行视觉创造时显得尤为突出。该学生在视觉艺术创作中展现出的创造力和表现力令人印象深刻，能够将抽象的视觉概念转化为具体的设计和作品。这种优势不仅体现在学术成绩上，也在日常决策和问题解决中发挥着重要作用。该学生对细节的注意力和空间想象力使该学生在需要空间想象力和视觉创造力的活动中能够迅速适应并表现出色。"
            },
            {
                title: "音乐旋律智能",
                content: "该学生在音乐-旋律智能方面展现出了非凡的才能和深刻的理解力。该学生对音乐的节奏、音调、旋律和音色有着极高的敏感性和理解力，这使得该学生在音乐创作、演奏和欣赏方面有着出色的才能。该学生能够准确地表达和传达音乐情感，对音乐的记忆力强，能够快速学习和掌握新的音乐作品。在音乐表演中，该学生能够展现出卓越的技巧和情感表达，无论是在独奏还是合奏中都能发挥关键作用。这种优势使该学生在音乐领域中能够迅速适应并表现出色，该学生对音乐的热爱和投入也常常激励着周围的人。该学生的音乐才能不仅在学术成绩上得到体现，也在日常生活中的音乐欣赏和创作中发挥着重要作用。"
            },
            {
                title: "身体运动智能",
                content: "该学生在身体-运动智能方面具有一定的优势，这使得该学生在体育和身体活动中比平均水平的学生更为出色。该学生对身体动作有一定的控制和协调能力，能够在体育和舞蹈等活动中表现出一定的技巧。虽然该学生可能不是每个运动领域的佼佼者，但该学生在某些特定的体育项目或活动中表现出了较高的潜力和兴趣。该学生可能在某些身体技巧上表现出色，如协调、平衡或力量，但在其他方面可能需要进一步的练习和提高。通过持续的锻炼和适当的指导，该学生有望提高自己的运动能力，更好地发掘和利用自己的潜力。"
            },
            {
                title: "人际关系智能",
                content: "该学生在人际关系智能方面表现出了卓越的能力和天赋。该学生对他人的情绪、意向、动机和感觉有着深刻的理解和洞察力，这使得该学生在与人交往时能够建立强有力的联系和信任。该学生能够准确地识别和解读他人的非言语信号，如面部表情、肢体语言和声音的微妙变化，这使该学生在社交场合中能够做出恰当的反应和调整。该学生的同理心和社交技巧使该学生成为团队中的协调者和领导者，能够有效地解决冲突和促进团队合作。这种优势不仅使该学生在个人关系中受到欢迎，也在需要团队合作和领导力的情境中发挥着重要作用。"
            },
            {
                title: "自我认知智能",
                content: "该学生在自我认识智能方面表现出了卓越的自我意识和深刻的自我理解。该学生对自己的长处和短处有着清晰的认识，能够准确地评估自己的能力和局限。这种自我认知使该学生能够在学习和生活中做出明智的决策，有效地规划自己的发展路径。该学生展现出高度的自我激励和自我调节能力，能够在面对挑战和压力时保持冷静和专注。该学生的自我反省能力使该学生能够从经验中学习，不断成长和进步。这种优势不仅帮助该学生在个人发展上取得成功，也使该学生在团队合作和领导力方面表现出色，因为该学生能够理解自己的行为如何影响他人。"
            },
            {
                title: "自我观察智能",
                content: "该学生在自然观察智能方面表现出了卓越的能力和深刻的理解。该学生对自然界的形态和模式有着敏锐的洞察力，能够准确地辨认和分类自然界中的各种生物和非生物元素。这种能力使该学生在户外活动、生态研究或环境科学等领域中表现出色。该学生对自然界的细微变化非常敏感，能够观察到其他人可能忽视的模式和联系。该学生的这种优势不仅体现在对自然世界的直接观察上，还体现在能够将这些观察与更广泛的环境问题和科学理论联系起来的能力。该学生对自然界的深刻理解和热爱，使该学生成为保护环境和促进可持续发展的积极倡导者。"
            },
        ]
        )
        const MIScrollText2 = ref([
            {
                title: "0503 新闻传播学类",
                content: "本学科是研究关于新闻、传播、广告及出版相关内容的学科。它以社会新闻与信息传播活动为对象,从不同维度研究不同形态类型的新闻与信息传播活动与人类社会的关系。在近些年，其研究视野和范围大大扩展，网络传播、媒介文化、数字传播、信息和文化产业等已成为本学科研究的重要内容。"
            },
            {
                title: "0201 经济学类",
                content: "经济学是研究人类社会在各个发展阶段上的各种经济活动和各种相应的经济关系及其运行、发展的规律的科学。经济学是研究价值的生产、流通、分配、消费的规律的理论与应用的学科。经济学类专业针对的是整个经济领域的现象，主要培养具有深厚的经济学基础理论，适应综合经济管理、经济政策研究、理论研究和经济应用方面的人才。相对于应用经济学科，它更侧重于对经济现象的理论分析，为解决经济问题提供思路和方法。"
            },
            {
                title: "0705 地理科学类",
                content: "地理科学类是从各种角度对地质、地表形态等地理特征进行深入研究，同时也研究地域与人们生活关联的一门学科。本学科大致分为两大领域:以地形、地质、气候、海洋等自然环境为对象的自然地理学和以人口、城市、交通、文化等为对象的人文地理学，除此之外，还要进行大量的地理应用方面的研究。"
            },
            {
                title: "0702 物理学类",
                content: "物理学是研究物质的运动形态与相互作用的基本规律的科学。物理学的研究目的在于认识物质运动的普遍规律。本学科注重于研究物质、能量、空间、时间，尤其是它们各自的性质与彼此之间的相互关系。它是人们对无生命自然界中物质的转变的知识做出规律性的总结。它的理论结构充分地把数学作为自己的工作语言，将实验作为检验理论正确性的唯一标准， 作为自然科学的带头学科，从宏观到微观，物理学研究大至宇宙，小至基本粒子等一切物质最基本的运动形式和规律，因此成为其他各自然科学学科的研究基础。"
            },
            {
                title: "0402 体育学类",
                content: "体育学类是研究体育科学体系及其发展方向的一门学科，是研究和阐明运动训练过程的综合性应用学科。它通过体育训练和对人体解剖学、心理学、生理学等基础课及系列专业课的学习，对运动训练、运动负荷、训练过程的周期等问题进行研究，使毕业生达到系统掌握体育教育、竟技训练、运动保健等方面的基本理论、基本知识和基本技能，熟悉体育教学、运动训练、民族体育等方面的工作规律，并能在上述活动中从事教学、训练、管理、科研医疗等工作。"
            },
        ])
        //hollander

        const HLDRadarBoard = ref({
            value: [8, 7, 9, 6, 3, 6],
            indicator: [
                { text: 'R-Realistic-技能型', max: 10 },
                { text: 'I-Investigative-研究型', max: 10 },
                { text: 'A-Artistic-艺术型', max: 10 },
                { text: 'S-Social-社会型', max: 10 },
                { text: 'E-Enterprise-经营型', max: 10 },
                { text: 'C-Conventional-常规型', max: 10 },
            ],
        })
        //MHT
        const MHTTableBoard = ref({
            header: ['MHT类型', '分数'],
            data: [
                ['对人焦虑', '9分/较高',],
                ['学习焦虑', '8分/较高',],
                ['孤独倾向', '7分/中等',],
                ['自责倾向', '6分/中等',],
                ['过敏倾向', '5分/中等',],
                ['身体症状', '4分/中等',],
                ['恐怖症状', '3分/较低',],
                ['冲动倾向', '2分/较低',],
                ['效度量表(测谎)', '1分/较低',]

            ],
            rowNum: 9, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })

        const MHTScrollText1 = ref([
            {
                title: "对人焦虑",
                content: "该学生过分注重自己的形象,害怕与人交往,退缩。对人焦虑通常表现为过度关注自我,一切以自我为中心,怕见生人,在众人面前感到不安,不会与人交往,难以与同学、伙伴合作。独生子女,享受父母的娇惯和迁就,养成较强的自我中心意识,在人际交往方面的能力较弱,易产生对人焦虑的倾向；有的学生从小受到父母的严厉管教,形成了看大人脸色行事的软弱性格,这也是造成学生对人焦虑的另一原因。"
            },
            {
                title: "学习焦虑",
                content: "该学生表现出较高的学习焦虑水平，可能对考试有恐惧心理，难以安心专注于学习，过分在乎考试分数，这导致他们不能很好地应对学习和考试压力。这种焦虑可能源于应试教育的背景、社会升学压力、父母的高期望以及严厉的管教"
            },
            {
                title: "孤独倾向",
                content: "该学生能与他人保持正常的交往，没有表现出明显的孤独倾向。他们能够在社交场合中与他人互动，但可能不会特别主动。"
            },
            {
                title: "自责倾向",
                content: "在面对挫折和困难时,与常人表现一致,没有明显个体差异。"
            },
            {
                title: "过敏倾向",
                content: "属于中等水平,对日常事务一般不会过于敏感。"
            },
            {
                title: "身体症状",
                content: "身体会有一些小问题,但不影响生活和学习。"
            },
            {
                title: "恐怖症状",
                content: "恐怖倾向较弱,处于这一水平的受测者胆量偏大,基本不会对日常生活当中的情景,如黑暗、高地、独自睡觉或者某种特殊事物等感到紧张害怕。被测试者的心理安全感较高,不容易产生恐怖感,情绪平稳。"
            },
            {
                title: "冲动倾向",
                content: "冲动倾向较低,说明有很好的自制力,凡事三思而后行。"
            },
            {
                title: "效度量表(测谎)",
                content: "被测试者基本上是按照自己的真实情况对问题进行回答的，因此测验比较准确可靠。"
            },

        ])
        const MHTScrollText2 = ref([
            {
                title: "对人焦虑",
                content: "(1)首先希望受测者能够敞开心扉,和希望交往的朋友坦然而真诚的交流,不需要过于担心别人可能对自己做出的评价,完全可以自然、大方的呈现出自己的特点。\n(2)其次要相信自己的交往能力, 相信自己可以和他人相处融洽。自信是交往开始的基础。有的时候, 不是自己没有吸引对方的能力, 而是在交往之前, 就打了退堂鼓, 没有勇气和人交往。那么现在, 不要怀疑自己的能力, 至少在与人交流之前, 不要左思右想, 而是怀着自信, 勇敢而友善的同他人打交道, 朋友们会越来越多的。不要因为不自信, 放弃了与人交流的机会。\n(3)应当尝试多学习一些人际交往的技巧, 提高自己人际交往的能力。通过观察你身边社交能力强的同伴的做法, 比如如何找到双方均感兴趣的话题、如何倾听等等, 必定有助于进一步改善受测者的社交状况, 降低对人焦虑。"
            },
            {
                title: "学习焦虑",
                content: "该学生表现出较高的学习焦虑水平，可能对考试有恐惧心理，难以安心专注于学习，过分在乎考试分数，这导致他们不能很好地应对学习和考试压力。这种焦虑可能源于应试教育的背景、社会升学压力、父母的高期望以及严厉的管教"
            },
            {
                title: "孤独倾向",
                content: "该学生能与他人保持正常的交往，没有表现出明显的孤独倾向。他们能够在社交场合中与他人互动，但可能不会特别主动。"
            },
            {
                title: "自责倾向",
                content: "在面对挫折和困难时,与常人表现一致,没有明显个体差异。"
            },
            {
                title: "过敏倾向",
                content: "属于中等水平,对日常事务一般不会过于敏感。"
            },
            {
                title: "身体症状",
                content: "身体会有一些小问题,但不影响生活和学习。"
            },
            {
                title: "恐怖症状",
                content: "恐怖倾向较弱,处于这一水平的受测者胆量偏大,基本不会对日常生活当中的情景,如黑暗、高地、独自睡觉或者某种特殊事物等感到紧张害怕。被测试者的心理安全感较高,不容易产生恐怖感,情绪平稳。"
            },
            {
                title: "冲动倾向",
                content: "冲动倾向较低,说明有很好的自制力,凡事三思而后行。"
            },
            {
                title: "效度量表(测谎)",
                content: "被测试者基本上是按照自己的真实情况对问题进行回答的，因此测验比较准确可靠。"
            },

        ])
        //earlyWarnig
        const EWTableBoard1 = ref({
            header: ['维度名称', '类型', '严重程度(%)'],
            data: [
                ['家庭亲密度低', '阳性', "80%"],
                ['家庭冲突', '阳性', "70%"],
                ['家长情绪不稳定', '阴性', "25%"],
                ['社会支持不足', '阴性', "18%"],
                ['师生关系差', '阴性', "15%"],
            ],
            rowNum: 5, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            align: ['center']
        })
        const EWRadarBoard1 = ref({
            value: [0.8, 0.7, 0.25, 0.18, 0.15],
            indicator: [
                { text: '家庭亲密度低', max: 1 },
                { text: '家庭冲突', max: 1 },
                { text: '家长情绪不稳定', max: 1 },
                { text: '社会支持不足', max: 1 },
                { text: '师生关系差', max: 1 },
            ],
        })
        const EWTableBoard2 = ref({
            header: ['维度名称', '类型', '严重程度(%)'],
            data: [
                ['抑郁', '阳性', "80%"],
                ['焦虑', '阳性', "70%"],
                ['无助与无力感', '阳性', "66%"],
                ['情绪失控', '阴性', "18%"],
                ['挫败与气馁', '阴性', "15%"],
            ],
            rowNum: 5, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            align: ['center']
        })
        const EWRadarBoard2 = ref({
            value: [2, 4, 2, 1, 3],
            indicator: [
                { text: '抑郁', max: 3 },
                { text: '焦虑', max: 4 },
                { text: '无助与无力感', max: 5 },
                { text: '情绪失控', max: 2 },
                { text: '挫败与气馁', max: 4 },
            ],
        })
        const EWTableBoard3 = ref({
            header: ['维度名称', '类型', '严重程度(%)'],
            data: [
                ['自杀程度', '阴性', "15%"],
            ],
            rowNum: 1, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            align: ['center']
        })
        const EWTableBoard4 = ref({
            header: ['维度名称', '类型', '严重程度(%)'],
            data: [
                ['社会决定完美主义', '阳性', "80%"],
                ['状态性冲动', '阳性', "70%"],
                ['攻击敌对', '阳性', "66%"],
                ['问题解决困境', '阴性', "18%"],
                ['反刍思维', '阴性', "15%"],
                ['低自尊与自卑', '阴性', "12%"],
            ],
            rowNum: 6, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })
        const EWRadarBoard4 = ref({
            value: [0.8, 0.7, 0.66, 0.18, 0.15, 0.12],
            indicator: [
                { text: '社会决定完美主义', max: 1 },
                { text: '状态性冲动', max: 1 },
                { text: '攻击敌对', max: 1 },
                { text: '问题解决困境', max: 1 },
                { text: '反刍思维', max: 1 },
                { text: '低自尊与自卑', max: 1 },
            ],
        })

        // 集体
        // mutipleIntelligence
        const CMITableBoard = ref({
            header: ['智能类型', '有优势', '其他', '有优势人数占比'],
            data: [
                ['语言言语智能', '32人', '16人', '67%'],
                ['数据逻辑智能', '29人', '19人', '60%'],
                ['视觉空间智能', '27人', '21人', '56%'],
                ['音乐旋律智能', '25人', '23人', '52%'],
                ['身体运动智能', '24人', '22人', '50%'],
                ['人际关系智能', '23人', '24人', '48%'],
                ['自我认知智能', '22人', '25人', '44%'],
                ['自然观察智能', '21人', '26人', '42%']
            ],
            rowNum: 8, //表格行数
            // headerHeight: 35,
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            // columnWidth: [50],
            align: ['center']
        })
        const CMIPieDataList = ref([
            ['语言言语智能', 32, 67],
            ['数据逻辑智能', 29, 60],
            ['视觉空间智能', 27, 56],
            ['音乐旋律智能', 25, 52],
            ['身体运动智能', 24, 50],
            ['人际关系智能', 23, 48],
            ['自我认知智能', 22, 44],
            ['自然观察智能', 21, 42]
        ])
        const CMIDoubleColumn = ref([
            //['智能维度', '有优势', '其他'],
            ['语言言语智能', 32],
            ['数据逻辑智能', 29],
            ['视觉空间智能', 27],
            ['音乐旋律智能', 25],
            ['身体运动智能', 24],
            ['人际关系智能', 23],
            ['自我认知智能', 22],
            ['自然观察智能', 21]
        ])
        //hollander
        const CHLDTableBoard = ref({
            header: ['霍兰德类型', '显著', '其他', '显著人数占比'],
            data: [
                ['R-Realistic-技能型', '32人', '16人', '67%'],
                ['I-Investigative-研究型', '29人', '19人', '60%'],
                ['A-Artistic-艺术型', '27人', '21人', '56%'],
                ['S-Social-社会型', '25人', '23人', '52%'],
                ['E-Enterprise-经营型', '24人', '22人', '50%'],
                ['C-Conventional-常规型', '23人', '24人', '48%'],
            ],
            rowNum: 6, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })
        const CHLDPieDataList = ref([
            ['R-Realistic-技能型', 32, 67],
            ['I-Investigative-研究型', 29, 60],
            ['A-Artistic-艺术型', 27, 56],
            ['S-Social-社会型', 25, 52],
            ['E-Enterprise-经营型', 24, 50],
            ['C-Conventional-常规型', 23, 48],
        ])
        const CHLDRadarBoard = ref({
            value: [8, 7, 9, 6, 3, 6],
            indicator: [
                { text: 'R-Realistic-技能型' },
                { text: 'I-Investigative-研究型' },
                { text: 'A-Artistic-艺术型' },
                { text: 'S-Social-社会型' },
                { text: 'E-Enterprise-经营型' },
                { text: 'C-Conventional-常规型' },
            ],
        })

        //earlyWarnig
        const CEWTableBoard1 = ref({
            header: ['维度名称', '类型', '人数占比'],
            data: [
                ['家庭亲密度低', '阳性', "80%"],
                ['家庭冲突', '阳性', "70%"],
                ['家长情绪不稳定', '阴性', "25%"],
                ['社会支持不足', '阴性', "18%"],
                ['师生关系差', '阴性', "15%"],
            ],
            rowNum: 5, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })

        const CEWTableBoard2 = ref({
            header: ['维度名称', '类型', '人数占比'],
            data: [
                ['抑郁', '阳性', "80%"],
                ['焦虑', '阳性', "70%"],
                ['无助与无力感', '阳性', "66%"],
                ['情绪失控', '阴性', "18%"],
                ['挫败与气馁', '阴性', "15%"],
            ],
            rowNum: 5, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })
        const CEWTableBoard5 = ref({
            header: ['维度名称', '类型', '人数占比'],
            data: [
                ['家庭亲密度低', '阳性', "80%"],
                ['家庭冲突', '阳性', "70%"],
                ['家长情绪不稳定', '阴性', "25%"],
                ['社会支持不足', '阴性', "18%"],
                ['师生关系差', '阴性', "15%"],
            ],
            rowNum: 6, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })
        const CEWTableBoard3 = ref({
            header: ['维度名称', '类型', '人数占比'],
            data: [
                ['自杀程度', '阴性', "15%"],
            ],
            rowNum: 1, //表格行数
            headerBGC: 'linear-gradient(rgba(116, 194, 255, 0.4), rgba(7, 125, 255, 0.4))',
            oddRowBGC: '#0f1325', //奇数行
            evenRowBGC: '#171c33', //偶数行
            index: true,
            align: ['center']
        })

        return {
            loadingState,
            appRef,
            state,
            testSelectChange,
            router,
            visualDetail,
            termList,
            loadData,
            data,
            loginUser,


            PSFTableBoard,
            MITableBoard,
            MIRadarBoard,
            MIScrollText1,
            MIScrollText2,
            goToLastPage,
            goToNextPage,
            HLDRadarBoard,
            MHTTableBoard,
            MHTScrollText1,
            MHTScrollText2,
            CMITableBoard,
            CMIPieDataList,
            CMIDoubleColumn,
            CHLDTableBoard,
            CHLDPieDataList,
            CHLDRadarBoard,
            EWTableBoard1,
            EWRadarBoard1,
            EWTableBoard2,
            EWRadarBoard2,
            EWTableBoard3,
            EWTableBoard4,
            EWRadarBoard4,
            CEWTableBoard1,
            CEWTableBoard2,
            CEWTableBoard3,
            CEWTableBoard5,
        }
    },
})
</script>

<template>
    <div id="page">
        <div id="index" ref="appRef">
            <div class="bg">
                <dv-loading v-if="loadingState.pageLoading">Loading...</dv-loading>
                <div v-else class="host-body">
                    <div class="vr-title">
                        <img src="../../assets/visualReport/titleBG.png" alt="lost">
                        <span id="title">{{ title }}</span>
                        <div class="left">
                            <img src="../../assets/visualReport/return.png" alt="return" class="return"
                                style="cursor: pointer;" @click="router.go(-1)">
                            <div class="className">
                                {{ visualDetail.className || visualDetail.studentName }}
                            </div>
                        </div>
                        <div class="right">
                            <a-select
                                :style="{ width: '170px', height: '50px', borderRadius: '10px', background: 'radial-gradient(50.00% 50.00% at 50% 50%, rgb(77, 255, 223), rgb(77, 161, 255) 100%)', color: '#fff', fontSize: '18px', fontWeight: 'bold' }"
                                v-model="state.term" :loading="loadingState.termLoading" @change="loadData">
                                <a-option v-for="(termItem, termIndex) in termList" :key="termIndex"
                                    :value="termItem.value">{{
                                        termItem.label }}</a-option>
                            </a-select>
                            <a-select
                                :style="{ width: '260px', height: '50px', borderRadius: '10px', background: 'radial-gradient(50.00% 50.00% at 50% 50%, rgb(77, 255, 223), rgb(77, 161, 255) 100%)', color: '#fff', fontSize: '18px', fontWeight: 'bold' }"
                                v-model="state.currentType" @change="testSelectChange">
                                <a-option :value="0" label="社会情感能力数据可视化大屏">社会情感能力数据可视化大屏</a-option>
                                <a-option :value="1" label="多元智能数据可视化大屏">多元智能数据可视化大屏</a-option>
                                <a-option :value="2" label="霍兰德职业兴趣数据可视化大屏">霍兰德职业兴趣数据可视化大屏</a-option>
                                <a-option v-if="loginUser.role === 'psychologist'" :value="3"
                                    label="中小学生心理健康量表(MHT)数据可视化大屏">中小学生心理健康量表(MHT)数据可视化大屏</a-option>
                                <a-option v-if="loginUser.role === 'psychologist'" :value="4"
                                    label="学生动态心理预警数据可视化大屏">学生动态心理预警数据可视化大屏</a-option>
                            </a-select>
                            <a-select
                                :style="{ width: '130px', height: '50px', borderRadius: '10px', background: 'radial-gradient(50.00% 50.00% at 50% 50%, rgb(77, 255, 223), rgb(77, 161, 255) 100%)', color: '#fff', fontSize: '18px', fontWeight: 'bold' }"
                                v-model="state.cnt" @change="loadData">
                                <a-option :value="0">最新报告</a-option>
                                <a-option :value="1">第一次报告</a-option>
                                <a-option :value="2">第二次报告</a-option>
                            </a-select>

                        </div>
                    </div>

                    <div v-if="data">
                        <div class="visualContent personalContent" v-if="visualDetail.boardType">
                            <div class="personSocialFeeling" v-if="state.currentType === 0">
                                <div class="firstLayer">
                                    <!-- wid+50,height+50 -->
                                    <dv-border-box1 style="width: 530px;height:400px;">
                                        <table-board :config="PSFTableBoard" :boxWidth="480" :boxHeight="350"
                                            board-title="社会情感能力总得分" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 830px;height:400px;">
                                        <horizontal-column :dataSource="(data as API.personalSFVisual).totalScore"
                                            :boxWidth="800" :boxHeight="350" board-title="总览统计"
                                            :currentType="state.currentType" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 530px;height:400px;">
                                        <scroll-text :data="(data as API.personalSFVisual).scoreDesc" :boxWidth="480"
                                            :boxHeight="330" board-title="分数解析" />
                                    </dv-border-box1>
                                </div>
                                <div class="secondLayer">
                                    <a-carousel :style="{
                                        width: '100%',
                                        height: '450px'
                                    }" :default-current="1" :auto-play="true">
                                        <a-carousel-item
                                            v-for="(item, index) in (data as API.personalSFVisual).secondDimensionScore"
                                            :key="index">
                                            <dv-border-box1 style="width: 830px;height:450px;">
                                                <secondary-ability :board-title="item.title + '详解'" :data="item" />
                                            </dv-border-box1>
                                            <dv-border-box1 style="width: 950px;height:450px;">
                                                <scroll-text :data="item.secondLevel" :boxWidth="900" :boxHeight="380"
                                                    :board-title="item.title + '分数解析'" />
                                            </dv-border-box1>
                                        </a-carousel-item>
                                    </a-carousel>
                                </div>
                            </div>
                            <div class="mutipleIntelligence" v-else-if="state.currentType === 1">
                                <div class="firstLayer">
                                    <dv-border-box1 style="width: 530px;height:400px;">
                                        <table-board :config="MITableBoard" :boxWidth="480" :boxHeight="350"
                                            board-title="多元智能得分排名" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 830px;height:400px;">
                                        <horizontal-column :dataSource="(data as API.personalMIVisual).rankList"
                                            :boxWidth="800" :boxHeight="350" board-title="总览统计"
                                            :currentType="state.currentType" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 530px;height:400px;">
                                        <radar-board :data="MIRadarBoard" :boxWidth="500" :boxHeight="350"
                                            board-title="多元智能维度分布" :currentType="state.currentType" />
                                    </dv-border-box1>
                                </div>
                                <div class="secondLayer">
                                    <dv-border-box1 style="width: 950px;height:450px;">
                                        <scroll-text :data="MIScrollText1" :boxWidth="900" :boxHeight="380"
                                            board-title="核心智能详解" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 950px;height:450px;">
                                        <scroll-text :data="MIScrollText2" :boxWidth="900" :boxHeight="380"
                                            board-title="相关学科推荐" />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="hollander" v-else-if="state.currentType === 2">
                                <div class="firstLayer">
                                    <dv-border-box1 style="width: 480px;height:400px;">
                                        <significant-type :data="(data as API.personalHLDVisual).professionCode"
                                            :boxWidth="450" :boxHeight="350" board-title="显著类型" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 830px;height:400px;">
                                        <horizontal-column :dataSource="(data as API.personalHLDVisual).score"
                                            :boxWidth="800" :boxHeight="350" board-title="总览统计"
                                            :currentType="state.currentType" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 620px;height:400px;">
                                        <radar-board :data="HLDRadarBoard" :boxWidth="610" :boxHeight="350"
                                            board-title="霍兰德维度分布" :currentType="state.currentType" />
                                    </dv-border-box1>
                                </div>
                                <div class="secondLayer">
                                    <dv-border-box1 style="width: 950px;height:450px;">
                                        <scroll-text :data="(data as API.personalHLDVisual).professionExplain"
                                            :boxWidth="900" :boxHeight="380" board-title="霍兰德类型详解" isHollander=true
                                            HLDTypeDetail=true />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 950px;height:450px;">
                                        <scroll-text :data="(data as API.personalHLDVisual).professionExplain"
                                            :boxWidth="900" :boxHeight="380" board-title="维度解析" isHollander=true
                                            HLDDimensionDetail=true />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="MHT" v-else-if="state.currentType === 3">
                                <div class="firstLayer">
                                    <dv-border-box1 style="width: 530px;height:500px;">
                                        <table-board :config="MHTTableBoard" :boxWidth="480" :boxHeight="450"
                                            board-title="MHT得分排名" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 830px;height:500px;">
                                        <horizontal-column :dataSource="(data as API.personalMHTVisual).score"
                                            :boxWidth="800" :boxHeight="450" board-title="总览统计"
                                            :currentType="state.currentType" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 530px;height:500px;">
                                        <scroll-text :data="MHTScrollText1" :boxWidth="480" :boxHeight="430"
                                            board-title="MHT维度介绍" />
                                    </dv-border-box1>
                                </div>
                                <div class="secondLayer">
                                    <dv-border-box1 style="width: 1600;height:350px;">
                                        <scroll-text :data="MHTScrollText2" :boxWidth="1580" :boxHeight="280"
                                            board-title="辅导建议" />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="earlyWarnig" v-else-if="state.currentType === 4">
                                <div class="left">
                                    <div class="leftTop">
                                        <dv-border-box1 style="width: 530px;height:650px;">
                                            <table-board :config="EWTableBoard1" :boxWidth="480" :boxHeight="300"
                                                board-title="易损处境维度分析" :isEarlyWarning="true" />
                                            <radar-board :currentType="state.currentType" :data="EWRadarBoard1"
                                                :boxWidth="480" :boxHeight="350" />
                                        </dv-border-box1>
                                        <dv-border-box1 style="width: 530px;height:650px;">
                                            <table-board :config="EWTableBoard2" :boxWidth="480" :boxHeight="300"
                                                board-title="心理痛苦维度分析" :isEarlyWarning="true" />
                                            <radar-board :currentType="state.currentType" :data="EWRadarBoard2"
                                                :boxWidth="480" :boxHeight="350" />
                                        </dv-border-box1>
                                    </div>
                                    <div class="leftBottom">
                                        <dv-border-box1 style="width: 1060px;height:200px;">
                                            <table-board :config="EWTableBoard3" :boxWidth="600" :boxHeight="150"
                                                board-title="自杀意念程度" :isEarlyWarning="true" />
                                            <PipeBoard :currentType="state.currentType"
                                                :percent="(data as API.personalWarnVisual).suicide.score[2]"
                                                :boxWidth="480" :boxHeight="100" />
                                        </dv-border-box1>
                                    </div>
                                </div>
                                <div class="right">
                                    <dv-border-box1 style="width: 830px;height:850px;">
                                        <table-board :config="EWTableBoard4" :boxWidth="780" :boxHeight="420"
                                            board-title="易损特质维度分析" :isEarlyWarning="true" />
                                        <radar-board :currentType="state.currentType" :data="EWRadarBoard4"
                                            :boxWidth="780" :boxHeight="380" />
                                    </dv-border-box1>
                                </div>
                            </div>
                        </div>
                        <div class="visualContent collectiveContent" v-else>
                            <div class="personSocialFeeling" v-if="state.currentType === 0">
                                <div class="firstLayer">
                                    <a-carousel :style="{
                                        width: '100%',
                                        height: '530px'
                                    }" :default-current="1" :auto-play="true" @change="">
                                        <a-carousel-item v-for="(item, index) in (data as API.collectiveSFVisual).list"
                                            :key="index">
                                            <div class="everyLevelTile">二级能力轮播图--{{ item.levelName }}描述</div>
                                            <div class="everyLevel">
                                                <div class="leftTop">
                                                    <level-stage :data="item" :boxWidth="750" :boxHeight="180" />
                                                    <dv-border-box1 style="width: 750px;height:240px;">
                                                        <scroll-text :data="item.describe" :boxWidth="700"
                                                            :boxHeight="180" board-title="整体情况描述"
                                                            :isActive="index === activeIndex" />
                                                    </dv-border-box1>
                                                </div>
                                                <div class="rightLevel">
                                                    <dv-border-box1 style="width: 1150px;height:530px;">
                                                        <secondary-detail :data="item.secondLevel" :boxWidth="1100"
                                                            :boxHeight="480" />
                                                    </dv-border-box1>
                                                </div>
                                            </div>


                                        </a-carousel-item>
                                    </a-carousel>
                                </div>
                                <div class="secondLayer">
                                    <dv-border-box1 style="width: 1030px;height:330px;">
                                        <horizontal-column
                                            :dataSource="(data as API.collectiveSFVisual)?.pieAndBarList.barList"
                                            :boxWidth="1000" :boxHeight="280" board-title="一级能力为A的总览统计"
                                            :currentType="state.currentType" />
                                    </dv-border-box1>
                                    <dv-border-box1 style="width: 850px;height:330px;">
                                        <pie-board :data="(data as API.collectiveSFVisual)?.pieAndBarList.pieList"
                                            :boxWidth="800" :boxHeight="280" board-title="一级能力为A的人次分布呈现" />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="mutipleIntelligence" v-else-if="state.currentType === 1">
                                <div class="leftLayer">
                                    <dv-border-box1 style="width: 900px;height:450px;">
                                        <table-board :config="CMITableBoard" :boxWidth="850" :boxHeight="400"
                                            board-title="多元智能集体得分排名" />
                                    </dv-border-box1>
                                    <div class="pipeBox">
                                        <PipeBoard v-for="(item, index) in CMIPieDataList" :key="index" :data="item"
                                            :boxWidth="200" :boxHeight="150" :currenType="state.currentType" />
                                    </div>
                                </div>
                                <div class="rightLayer">
                                    <dv-border-box1 style="width: 1000px;height:850px;">
                                        <horizontal-column :dataSource="CMIDoubleColumn" :boxWidth="980"
                                            :boxHeight="800" boardTitle="多元智能总览统计" :currentType="state.currentType" />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="hollander" v-else-if="state.currentType === 2">
                                <div class="leftLayer">
                                    <dv-border-box1 style="width: 900px;height:450px;">
                                        <table-board :config="CHLDTableBoard" :boxWidth="850" :boxHeight="400"
                                            board-title="霍兰德显著类型排名" :isHollander="true" />
                                    </dv-border-box1>
                                    <div class="pipeBox">
                                        <PipeBoard v-for="(item, index) in CHLDPieDataList" :key="index" :data="item"
                                            :boxWidth="250" :boxHeight="150" :currenType="state.currentType" />
                                    </div>
                                </div>
                                <div class="rightLayer">
                                    <dv-border-box1 style="width: 1000px;height:850px;">
                                        <radar-board :data="CHLDRadarBoard" :boxWidth="980" :boxHeight="800"
                                            board-title="霍兰德集体统计" :currentType="state.currentType" :radius="250" />
                                    </dv-border-box1>
                                </div>
                            </div>
                            <div class="MHT" v-else-if="state.currentType === 3">
                                <dv-border-box1 style="width: 450px;height:410px;" v-for="(item, index) in data"
                                    :key="index">
                                    <collective-dimension-board :data="item" :boxHeight="340" :boxWidth="400" />
                                </dv-border-box1>
                            </div>
                            <div class="earlyWarnig" v-else-if="state.currentType === 4">
                                <div class="left">
                                    <div class="leftTop">
                                        <dv-border-box1 style="width: 530px;height:650px;">
                                            <table-board :config="CEWTableBoard1" :boxWidth="480" :boxHeight="300"
                                                board-title="易损处境维度分析" :isEarlyWarning="true" />
                                            <pie-board :data="(data as Array<API.collectiveWarnVisualItem>)[0].pie"
                                                :boxWidth="480" :boxHeight="350" :radius="['30%', '50%']"
                                                :label="false" />
                                        </dv-border-box1>
                                        <dv-border-box1 style="width: 530px;height:650px;">
                                            <table-board :config="CEWTableBoard2" :boxWidth="480" :boxHeight="300"
                                                board-title="心理痛苦维度分析" :isEarlyWarning="true" />
                                            <pie-board :data="(data as Array<API.collectiveWarnVisualItem>)[2].pie"
                                                :boxWidth="480" :boxHeight="350" :radius="['30%', '50%']"
                                                :label="false" />

                                        </dv-border-box1>
                                    </div>
                                    <div class="leftBottom">
                                        <dv-border-box1 style="width: 1060px;height:200px;">
                                            <table-board :config="CEWTableBoard3" :boxWidth="400" :boxHeight="150"
                                                board-title="自杀意念程度" :isEarlyWarning="true" />
                                            <PipeBoard :currentType="state.currentType"
                                                :percent="(data as Array<API.collectiveWarnVisualItem>)[3].pie[0].value"
                                                :boxWidth="480" :boxHeight="100" />
                                        </dv-border-box1>
                                    </div>
                                </div>
                                <div class="right">
                                    <dv-border-box1 style="width: 830px;height:850px;">
                                        <table-board :config="CEWTableBoard5" :boxWidth="780" :boxHeight="420"
                                            board-title="易损特质维度分析" :isEarlyWarning="true" />
                                        <pie-board :data="(data as Array<API.collectiveWarnVisualItem>)[1].pie"
                                            :boxWidth="780" :boxHeight="380" :radius="['30%', '50%']" :label="false" />

                                    </dv-border-box1>
                                </div>
                            </div>
                        </div>

                        <div class="changePage">
                            <button class="lastPage changePageButton" @click="goToLastPage"
                                :disabled="state.currentType === 0"
                                :class="{ disable: state.currentType === 0 }">上一页</button>
                            <button v-if="loginUser.role === 'psychologist'" class="nextPage changePageButton"
                                @click="goToNextPage" :disabled="state.currentType === 4"
                                :class="{ disable: state.currentType === 4 }">下一页</button>
                            <button v-else class="nextPage changePageButton" @click="goToNextPage"
                                :disabled="state.currentType === 2"
                                :class="{ disable: state.currentType === 2 }">下一页</button>
                        </div>
                    </div>
                    <div v-else-if="!data" class="noData">
                        <div class="noData">
                            <img src="../../assets/image/noStuData.png" alt="noStuData">
                            <p>查找不到学生数据</p>
                        </div>
                        <div class="changePage">
                            <button class="lastPage changePageButton" @click="goToLastPage"
                                :disabled="state.currentType === 0"
                                :class="{ disable: state.currentType === 0 }">上一页</button>
                            <button v-if="loginUser.role === 'psychologist'" class="nextPage changePageButton"
                                @click="goToNextPage" :disabled="state.currentType === 4"
                                :class="{ disable: state.currentType === 4 }">下一页</button>
                            <button v-else class="nextPage changePageButton" @click="goToNextPage"
                                :disabled="state.currentType === 2"
                                :class="{ disable: state.currentType === 2 }">下一页</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
@import '../../assets/scss/visualReport.scss';

.noData {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;

    img {
        width: 50%;
        height: fit-content;
    }
}
</style>