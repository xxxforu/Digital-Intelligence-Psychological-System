<template>
    <div id="psyReportView">
        <div class="selectLine">
            <a-select
                :style="{ width: '100px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.grade" @change="chooseGrade" placeholder="选择年级" :loading="loadingState.gradeLoading">
                <a-option v-for="(gradeItem, gradeIndex) in gradeList" :key="gradeIndex" :value="gradeItem.gradeId">{{
                    gradeItem.gradeName }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '130px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.class" @change="chooseClass" placeholder="选择班级" :loading="loadingState.classLoading">
                <a-option v-for="(classItem, classIndex) in classList" :key="classIndex" :value="classItem.classesId">{{
                    classItem.classesName }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '100px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.student" placeholder="选择学生" :loading="loadingState.stuLoading" @change="loadReportData">
                <a-option v-for="(studentItem, studentIndex) in studentList" :key="studentIndex"
                    :value="studentItem.id">{{
                        studentItem.name }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '140px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.term" :loading="loadingState.termLoading" @change="loadReportData">
                <a-option v-for="(termItem, termIndex) in termList" :key="termIndex" :value="termItem.value">{{
                    termItem.label }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '200px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.type" :default-value="0" @change="loadReportData">
                <a-option :value="0">社会情感能力报告</a-option>
                <a-option :value="1">多元智能与霍兰德职业兴趣报告</a-option>
                <a-option :value="2">中小学生心理健康量表(MHT)报告</a-option>
                <a-option :value="3">学生动态心理预警报告</a-option>
            </a-select>
            <a-select
                :style="{ width: '100px', height: '30px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.cnt" :default-value="1" @change="loadReportData">
                <a-option :value="1">第一次</a-option>
                <a-option :value="2">第二次</a-option>
            </a-select>
        </div>
        <div class="changeLine">
            <span class="changeReport pointerAndNotSelect" :class="{ 'disabled': currentStu.index === 0 }"
                @click="lastReport">上一份报告</span>
            <span class="reportName">{{ currentStu.name }}的{{
                state.type === 0 ? "社会情感测试报告" :
                    state.type === 1 ? "多元智能霍兰德耦合报告" :
                        state.type === 2 ? "MHT测试报告" : "心理预警测试报告"
            }}</span>
            <span class="changeReport pointerAndNotSelect"
                :class="{ 'disabled': currentStu.index === studentList.length - 1 }" @click="nextReport">下一份报告</span>
        </div>
        <a-spin v-if="loadingState.pageLoading" class="arcoSpin contentBox" />
        <div class="contentBox" v-else-if="!loadingState.pageLoading && data !== null">
            <div class="reportBox">
                <div class="visualBox" v-if="state.type === 0">
                    <div class="columnBox">
                        <p>社会情感测试总览统计</p>
                        <horizontal-column :boxWidth="400" :boxHeight="200"
                            :dataSource="(data as API.StuSFReportProps).totalScore" :currentType="state.type"
                            :isReport="true" />
                    </div>
                    <div>
                        <p>社会情感能力分布</p>
                        <radar-board :boxWidth="400" :boxHeight="200" :data="(data as API.StuSFReportProps).radarData"
                            :currentType="state.type" :radius="70" :isReport="true" />
                    </div>
                </div>
                <div class="visualBox" v-else-if="state.type === 1">
                    <div>
                        <p>霍兰德能力分布</p>
                        <radar-board :boxWidth="460" :boxHeight="200" :data="(data as API.IPReportProps).ProradarData"
                            :currentType="state.type + 1" :radius="70" :isReport="true" />
                    </div>
                    <div>
                        <p>多元智能能力分布</p>
                        <radar-board :boxWidth="380" :boxHeight="200" :data="(data as API.IPReportProps).IGradarData"
                            :currentType="state.type" :radius="70" :isReport="true" />
                    </div>
                </div>
                <div class="visualBox" v-if="state.type === 2">
                    <div class="columnBox">
                        <p>MHT测试总览统计</p>
                        <horizontal-column :boxWidth="400" :boxHeight="300"
                            :dataSource="(data as API.psyMHTReportProps).score" :currentType="state.type"
                            :isReport="true" />
                    </div>
                    <div>
                        <p>MHT能力分布</p>
                        <radar-board :boxWidth="400" :boxHeight="300" :data="(data as API.psyMHTReportProps).radarData"
                            :currentType="state.type" :radius="70" :isReport="true" />
                    </div>
                </div>
                <div class="visualBox" style="flex-wrap: wrap;" v-else-if="state.type === 3">
                    <div style="margin:10px 0">
                        <p>易损处境维度分布</p>
                        <radar-board :boxWidth="420" :boxHeight="200"
                            :data="(data as API.psyWarnReportProps).VPRadarData" :currentType="state.type + 1"
                            :radius="60" :isReport="true" />
                    </div>
                    <div style="margin:10px 0">
                        <p>心理痛苦维度分布</p>
                        <radar-board :boxWidth="420" :boxHeight="200"
                            :data="(data as API.psyWarnReportProps).HPRadarData" :currentType="state.type" :radius="60"
                            :isReport="true" />
                    </div>
                    <div style="margin:10px 0">
                        <p>易损体质维度分布</p>
                        <radar-board :boxWidth="420" :boxHeight="200"
                            :data="(data as API.psyWarnReportProps).VTRadarData" :currentType="state.type" :radius="60"
                            :isReport="true" />
                    </div>
                    <div style="margin:10px 0">
                        <p>自杀意念维度分布</p>
                        <PipeBoard :currentType="state.type"
                            :percent="(data as API.psyWarnReportProps).suicide.score[2]" :boxWidth="420"
                            :boxHeight="200" :bgWhite="true" />
                    </div>
                </div>
                <div class="textReportBox" v-if="state.type === 0">
                    <!-- <div class="boxTitle">社会情感测试报告</div> -->
                    <div class="textReportItem" v-for="(item, index) in (data as API.StuSFReportProps).scoreDesc"
                        :key="index">
                        <div class="blueTitle">【{{ item.title }}】 {{ item.rank }}</div>
                        <div class="blackTitle">{{ item.title }}解释</div>
                        <div class="content">{{ item.overview }}</div>
                        <div class="blackTitle">{{ item.title }}评价</div>
                        <div class="content">{{ item.content }}</div>
                    </div>
                </div>
                <div class="textReportBox" v-else-if="state.type === 1">
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
                <div class="textReportBox" v-if="state.type === 2">
                    <!-- <div class="boxTitle">MHT测试报告</div> -->
                    <div class="textReportItem" v-for="(item, index) in (data as API.psyMHTReportProps).details"
                        :key="index">
                        <div class="blueTitle">【{{ item.resultName }}】 {{ item.resultScore }}分</div>
                        <div class="blackTitle">等级解释</div>
                        <div class="content">{{ item.resultDesc }}</div>
                        <div class="blackTitle">建议</div>
                        <div class="content">{{ item.advice }}</div>
                    </div>
                </div>
                <div class="textReportBox" v-if="state.type === 3">
                    <!-- <div class="boxTitle">MHT测试报告</div> -->
                    <div class="textReportItem"
                        v-for="(item, index) in (data as API.psyWarnReportProps).dimensionExplain" :key="index">
                        <div class="blueTitle">【{{ item.resultName }}】 {{ item.warnType }}</div>
                        <div class="blackTitle">类型解释</div>
                        <div class="content">{{ item.resultDesc }}</div>
                        <div class="blackTitle">辅导建议</div>
                        <div class="content">{{ item.advice }}</div>
                    </div>
                </div>
            </div>
            <div class="markBox">
                <div class="markTitle">报告标记</div>
                <div class="tags">
                    <a-tag size="large" v-for="tag of (data as API.StuSFReportProps).reportMark" color="blue" bordered
                        :key="tag" :style="{ margin: '5px' }">
                        {{ tag }}
                    </a-tag>
                    <a-input v-if="showInput" ref="inputRef" :style="{ width: '90px', margin: '5px' }" size="large"
                        v-model.trim="inputVal" @keyup.enter="handleAdd" @blur="showInput = false" />
                    <a-tag v-else size="large" :style="{
                        width: '90px',
                        backgroundColor: '#f7f7f7',
                        color: 'blue',
                        border: '1px dashed blue',
                        cursor: 'pointer',
                        margin: '5px',
                    }" @click="handleEdit">
                        <template #icon>
                            <icon-plus />
                        </template>
                        增加标签
                    </a-tag>
                </div>
                <div class="markTitle">干预方案</div>
                <div class="intervention">
                    <a-textarea placeholder="请填写干预方案" allow-clear v-model="intervention" :auto-size="{
                        minRows: 10,
                        maxRows: 15
                    }" />
                    <div class="submitIntervention" @click="submitIntervention">提交</div>
                </div>
            </div>
        </div>
        <div class="contentBox" v-else>
            <div class="noData">
                <img src="../../assets/image/noStuData.png" alt="noStuData">
                <p>查找不到学生数据</p>
            </div>

        </div>
    </div>

</template>

<script lang='ts'>
import {
    psyClassVisualListGET,
    psyGradeListGET,
    psyInterVentionPOST,
    psyIPReportGET,
    psyMarkPOST,
    psyMHTReportGET,
    psySFReportGET,
    psyStudentListGET,
    psyTermGET,
    psyWarnReportGET,
} from '@/api/teacherController';
import HorizontalColumn from '@/components/VisualComp/HorizontalColumn.vue';
import PipeBoard from '@/components/VisualComp/PipeBoard.vue';
import RadarBoard from '@/components/VisualComp/RadarBoard.vue';
import { useTestInformStore } from '@/store/testStore';
import { Message } from '@arco-design/web-vue';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
export default ({
    components: {
        HorizontalColumn,
        RadarBoard,
        PipeBoard,
    },
    setup() {
        const route = useRoute()
        const isFromList = route.params.check === 'check' //判断是否从首页测评列表进入
        const testInformStore = useTestInformStore();
        const testInform = testInformStore.testInform;

        // 定义State接口，用于描述state对象的结构
        interface State {
            grade: number | null;
            class: number | null;
            student: number | null;
            term: string | null;
            type: number | null; // 根据您的需求定义type的类型
            cnt: number | null;
        }

        // 使用ref创建state响应式对象，并指定其类型为State
        const state = ref<State>({
            grade: null, // 初始化为null
            class: null,
            student: 0,
            term: null,
            type: 0,
            cnt: 1,
        });
        const currentStu = ref({
            name: "",
            index: 0,
        })
        const loadingState = ref({
            pageLoading: true,
            gradeLoading: true,
            classLoading: true,
            stuLoading: true,
            termLoading: true
        })
        type termType = {
            value: string,
            label: string
        }
        const gradeList = ref<Array<API.GradeListItem>>([])
        const classList = ref<Array<API.ClassListItem>>([])
        const studentList = ref<Array<API.StudentListItem>>([])
        const termList = ref<Array<termType>>([])
        //获取下拉框信息
        onMounted(async () => {
            const res = await psyGradeListGET()
            gradeList.value = res.data
            if (isFromList) {
                state.value.grade = testInform.gradeId || res.data[0]?.gradeId
                state.value.type = testInform.questionType || 0
                state.value.cnt = testInform.cnt || 1
            }
            else state.value.grade = res.data[0]?.gradeId
            loadingState.value.gradeLoading = false
            chooseGrade(state.value.grade, true)

            const res1 = await psyTermGET()
            if (res1.data) {
                if (isFromList) state.value.term = testInform.term || res1.data[0]
                else state.value.term = res1.data[0]
                loadingState.value.termLoading = false
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
                    } as termType)
                })
            }
        })
        //下拉框信息更改
        //年级下拉框更改
        const chooseGrade = async (value: number, isFirstEnter?: boolean) => {
            //先重置关联的选项内容
            loadingState.value.classLoading = true
            state.value.class = null
            state.value.student = null
            //发起请求
            const params = []
            params.push(value + "")
            const res: API.BasicResponse = await psyClassVisualListGET({
                gradeIds: params
            })
            if (res.code === 0) {
                classList.value = res?.data
                if (isFromList && isFirstEnter) state.value.class = testInform.classedId || classList.value[0].classesId
                else state.value.class = classList.value[0].classesId
                loadingState.value.classLoading = false
                chooseClass(state.value.class)
            }
        }
        const chooseClass = async (value: number) => {
            loadingState.value.stuLoading = true
            state.value.student = null
            const query = {
                classesIds: value
            }
            const res: API.BasicResponse = await psyStudentListGET(query)
            if (res.code === 0) {
                studentList.value = res?.data
                state.value.student = studentList.value[0]?.id || null
                currentStu.value.name = studentList.value[0]?.name || ""
                currentStu.value.index = 0
                loadingState.value.stuLoading = false
                loadReportData()
            }
        }
        //加载报告
        const intervention = ref("")
        const data = ref<API.StuSFReportProps | API.IPReportProps | API.psyMHTReportProps | API.psyWarnReportProps | null>({})
        const loadReportData = async () => {
            if (!state.value.student) return false
            loadingState.value.pageLoading = true
            currentStu.value.index = studentList.value.findIndex(student => student.id === state.value.student);
            currentStu.value.name = studentList.value[currentStu.value.index].name

            const query = {
                studentId: state.value.student,
                term: state.value.term,
                questionType: state.value.type,
                cnt: state.value.cnt
            } as API.teacherGetReportParams
            switch (state.value.type) {
                case 0:
                    const res: API.BasicResponse = await psySFReportGET(query)
                    loadingState.value.pageLoading = false
                    if (res.data) {
                        data.value = res.data;
                        (data.value as API.StuSFReportProps).totalScore = (data.value as API.StuSFReportProps)?.totalScore?.map(([label, score]) => [label, Number(score)]);
                        const scoreDistribute = (res.data as API.StuSFReportProps).scoreDistribute;
                        intervention.value = (res.data as API.StuSFReportProps).intervention || "";
                        if (scoreDistribute) {
                            const { list, scoreValues } = scoreDistribute;
                            (data.value as API.StuSFReportProps).radarData = {
                                value: scoreValues,
                                indicator: list,
                            } as API.MaxRadarFrontedData;
                        }
                    } else data.value = null
                    break;
                case 1:
                    const res1: API.BasicResponse = await psyIPReportGET(query)
                    loadingState.value.pageLoading = false
                    if (res1.data) {
                        data.value = res1.data
                        intervention.value = (res1.data as API.StuSFReportProps).intervention || ""
                        // 类型断言
                        const intelligenceDistribute = (res1.data as API.IPReportProps).intelligenceDistribute;
                        const professionDistribute = (res1.data as API.IPReportProps).professionDistribute;
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
                    } else data.value = null
                    break;
                case 2:
                    const res2: API.BasicResponse = await psyMHTReportGET(query)
                    loadingState.value.pageLoading = false
                    if (res2.data) {
                        data.value = res2.data;
                        (data.value as API.psyMHTReportProps).score = (data.value as API.psyMHTReportProps)?.score?.map(([label, score]) => [label, Number(score)]);
                        const distribute = (res2.data as API.psyMHTReportProps).distribute;
                        intervention.value = (res2.data as API.psyMHTReportProps).intervention || ""
                        if (distribute) {
                            const { indicator, score } = distribute;
                            (data.value as API.psyMHTReportProps).radarData = {
                                value: score,
                                indicator: indicator,
                            } as API.MaxRadarFrontedData;
                        }
                    } else data.value = null
                    break;
                case 3:
                    const res3: API.BasicResponse = await psyWarnReportGET(query)
                    loadingState.value.pageLoading = false
                    if (res3.data) {
                        data.value = res3.data
                        intervention.value = (res3.data as API.StuSFReportProps).intervention || ""
                        // 类型断言
                        const heartPain = (res3.data as API.psyWarnReportProps).heartPain;
                        const vulnerablePosition = (res3.data as API.psyWarnReportProps).vulnerablePosition;
                        const vulnerableTrait = (res3.data as API.psyWarnReportProps).vulnerableTrait;
                        if (heartPain) {
                            const { indicator, score } = heartPain;
                            (data.value as API.psyWarnReportProps).HPRadarData = {
                                value: score,
                                indicator: indicator,
                            } as API.MaxRadarFrontedData;
                        }
                        if (vulnerablePosition) {
                            const { indicator, score } = vulnerablePosition;
                            (data.value as API.psyWarnReportProps).VPRadarData = {
                                value: score,
                                indicator: indicator,
                            } as API.MaxRadarFrontedData;
                        }
                        if (vulnerableTrait) {
                            const { indicator, score } = vulnerableTrait;
                            (data.value as API.psyWarnReportProps).VTRadarData = {
                                value: score,
                                indicator: indicator,
                            } as API.MaxRadarFrontedData;
                        }
                    } else data.value = null
                    break;

            }

        }
        // 切换上一份/下一份报告
        const lastReport = () => {
            currentStu.value.index -= 1
            state.value.student = studentList.value[currentStu.value.index].id
            currentStu.value.name = studentList.value[currentStu.value.index].name
            loadReportData()
        }
        const nextReport = () => {
            currentStu.value.index += 1
            state.value.student = studentList.value[currentStu.value.index].id
            currentStu.value.name = studentList.value[currentStu.value.index].name
            loadReportData()
        }
        //处理标签
        const inputRef = ref<HTMLInputElement | null>(null);
        const showInput = ref(false);
        const inputVal = ref('');

        const handleEdit = () => {
            showInput.value = true;

            nextTick(() => {
                if (inputRef.value) {
                    inputRef.value.focus();
                }
            });
        };

        const handleAdd = () => {
            if (inputVal.value) {
                if (!(data.value as API.StuSFReportProps).reportMark) (data.value as API.StuSFReportProps).reportMark = [];
                (data.value as API.StuSFReportProps).reportMark?.push(inputVal.value);
                inputVal.value = '';
            }
            const query = {
                studentId: state.value.student,
                term: state.value.term,
                questionType: state.value.type,
                cnt: state.value.cnt,
                tagList: (data.value as API.StuSFReportProps).reportMark
            } as API.MarkParams
            psyMarkPOST(query).then(res => {
                if ((res as API.BasicResponse).code === 0)
                    Message.success("标记成功！")
                else Message.error((res as API.BasicResponse).msg || "标记失败！")
            })
            showInput.value = false;
        };
        //处理干预方案
        const submitIntervention = () => {
            const query = {
                studentId: state.value.student,
                term: state.value.term,
                questionType: state.value.type,
                cnt: state.value.cnt,
                intervention: intervention.value
            } as API.InterventionParams
            psyInterVentionPOST(query).then(res => {
                if ((res as API.BasicResponse).code === 0)
                    Message.success("提交成功！")
                else Message.error((res as API.BasicResponse).msg || "提交失败！")
            })
        }


        return {
            state,
            loadingState,
            gradeList,
            classList,
            chooseGrade,
            chooseClass,
            studentList,
            termList,
            loadReportData,
            data,
            currentStu,
            lastReport,
            nextReport,
            inputRef,
            showInput,
            inputVal,
            handleEdit,
            handleAdd,
            intervention,
            submitIntervention,
        }
    }
})
</script>

<style lang='scss' scoped>
#psyReportView {
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .selectLine {
        height: 40px;
        width: 100%;
    }

    .changeLine {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .disabled {
            cursor: not-allowed !important;
            color: rgba(25, 25, 50, 0.5) !important;
        }

        .changeReport {
            cursor: pointer;
            color: rgb(0, 178, 255);
            font-family: Urbanist;
            font-size: 18px;
            font-weight: 700;
            line-height: 22px;
            letter-spacing: 0%;
            text-align: center;
            text-decoration-line: underline;
        }

        .reportName {
            color: rgba(25, 25, 50, 0.7);
            font-family: Urbanist;
            font-size: 24px;
            font-weight: 700;
            line-height: 29px;
            letter-spacing: 0%;
            text-align: left;
        }
    }

    ::v-deep .arco-spin {
        .arco-spin-icon {
            margin: auto;
        }
    }

    .contentBox {
        width: 100%;
        height: 85vh;
        display: flex;
        justify-content: space-between;

        .noData {
            width: 100%;
            height: 100%;
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


        .reportBox {
            width: 72%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-content: center;
            overflow-y: scroll;
            overflow-x: hidden;

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

        .markBox {
            background: #fff;
            border-radius: 10px;
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            padding: 10px;


            .markTitle {
                color: rgb(25, 25, 50);
                font-size: 18px;
                font-weight: 700;
                line-height: 22px;
                margin: 10px 0;
            }

            .tags {
                margin: auto;
                width: 90%;
                box-sizing: border-box;
                padding: 10px 10px 20px 10px;
                border-radius: 5px;
                background-color: #f7f7f7;
            }

            .intervention {
                width: 90%;
                margin: auto;

                ::v-deep .arco-textarea {
                    resize: none;
                }

                .submitIntervention {
                    float: right;
                    text-align: center;
                    width: 60px;
                    height: 30px;
                    font-weight: 600;
                    line-height: 30px;
                    border-radius: 5px;
                    color: #fff;
                    padding: 0;
                    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
                    background: rgb(0, 178, 255);
                    margin: 20px 0;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>