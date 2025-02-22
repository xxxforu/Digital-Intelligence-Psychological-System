<template>
    <div id="dataBoardEnter">
        <div class="top">
            <p class="title">请选择您需要查看的数据面板</p>
            <a-select
                :style="{ width: '150px', height: '40px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.boardType" @change="chooseBoardType">
                <a-option :value="0">集体数据看板</a-option>
                <a-option :value="1">个人数据看板</a-option>
            </a-select>
        </div>
        <!-- <label for="selectBox">年级班级姓名</label> -->
        <div id="selectBox" class="selectBox">
            <a-select
                :style="{ width: '130px', height: '40px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.grade as number" @change="chooseGrade" placeholder="选择年级"
                :loading="loadingState.gradeLoading">
                <a-option v-for="(gradeItem, gradeIndex) in gradeList" :key="gradeIndex" :value="gradeItem.gradeId">{{
                    gradeItem.gradeName }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '160px', height: '40px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.class as number" @change="chooseClass" placeholder="选择班级"
                :loading="loadingState.classLoading">
                <a-option v-for="(classItem, classIndex) in classList" :key="classIndex" :value="classItem.classesId">{{
                    classItem.classesName }}</a-option>
            </a-select>
            <a-select
                :style="{ width: '130px', height: '40px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
                v-model="state.student as number" placeholder="选择学生" :loading="loadingState.stuLoading"
                v-if="state.boardType">
                <a-option v-for="(studentItem, studentIndex) in studentList" :key="studentIndex"
                    :value="studentItem.id">{{
                        studentItem.name }}</a-option>
            </a-select>
            <a-button class="checkBoard" :style="{ height: '40px' }" @click="goToVisualBoard">查看</a-button>
        </div>
    </div>
</template>

<script lang='ts'>
import { psyClassVisualListGET, psyGradeListGET, psyStudentListGET } from '@/api/teacherController';
import { useVisualStore } from '@/store/visualStore';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default ({
    setup() {
        // 定义State接口，用于描述state对象的结构
        interface State {
            grade: number | null;
            class: number | null;
            student: number | null;
            boardType: number //0为集体，1为个人
        }

        // 使用ref创建state响应式对象，并指定其类型为State
        const state = ref<State>({
            grade: null, // 初始化为null
            class: null,
            student: 0,
            boardType: 0
        });
        const loadingState = ref({
            gradeLoading: true,
            classLoading: true,
            stuLoading: true,
        })
        const gradeList = ref<Array<API.GradeListItem>>([])
        const classList = ref<Array<API.ClassListItem>>([])
        const studentList = ref<Array<API.StudentListItem>>([])
        //获取下拉框信息
        onMounted(async () => {
            const res: API.BasicResponse = await psyGradeListGET()
            if (res.data) {
                gradeList.value = res.data
                state.value.grade = res.data[0]?.gradeId
                loadingState.value.gradeLoading = false
                chooseGrade(state.value.grade)
            } else Message.error(res.msg || '加载失败！')

        })
        //下拉框信息更改
        //年级下拉框更改
        const chooseGrade = async (value: any) => {
            if (typeof value !== 'number') {
                return;
            }
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
                if (!state.value.boardType) {
                    classList.value = [{
                        classesName: "全部班级",
                        classesId: -1
                    }, ...res?.data];
                } else {
                    classList.value = res?.data
                }
                state.value.class = classList.value[0].classesId
                loadingState.value.classLoading = false
                chooseClass(state.value.class)
            } else Message.error(res.msg || '加载失败！')
        }
        const chooseClass = async (value: any) => {
            if (typeof value !== 'number') {
                return;
            }
            loadingState.value.stuLoading = true
            state.value.student = null
            const query = {
                classesIds: value
            }
            const res: API.BasicResponse = await psyStudentListGET(query)
            if (res.code === 0) {
                studentList.value = res?.data
                state.value.student = studentList.value[0]?.id || null
                loadingState.value.stuLoading = false
            } else Message.error(res.msg || '加载失败！')
        }
        const chooseBoardType = () => {
            chooseGrade(state.value.grade as number)
        }
        const currentStuOrClass = {
            name: "",
            index: 0,
        }
        const visualDetailStore = useVisualStore()
        const setVisualDetail = visualDetailStore.setVisualDetail
        const router = useRouter()
        const goToVisualBoard = () => {
            if (state.value.boardType) {
                if (!state.value.student) {
                    Message.error("请选择班级及学生！")
                    return
                }
                currentStuOrClass.index = studentList.value.findIndex(student => student.id === state.value.student);
                currentStuOrClass.name = studentList.value[currentStuOrClass.index].name
                setVisualDetail({
                    uid: state.value.student,
                    studentName: currentStuOrClass.name,
                    boardType: state.value.boardType
                } as API.VisualDetail)
            }
            else {
                let classesIds = []
                currentStuOrClass.index = classList.value.findIndex(item => item.classesId === state.value.class);
                currentStuOrClass.name = classList.value[currentStuOrClass.index].classesName
                if (state.value.class === -1) {
                    classesIds = getAllClassIds()
                    currentStuOrClass.index = gradeList.value.findIndex(item => item.gradeId === state.value.grade);
                    currentStuOrClass.name = gradeList.value[currentStuOrClass.index].gradeName
                } else classesIds.push(state.value.class)
                setVisualDetail({
                    classedIds: classesIds,
                    className: currentStuOrClass.name,
                    boardType: state.value.boardType
                } as API.VisualDetail)
            }

            router.push('/visualReport')

        }
        // 获取所有班级的 ID
        const getAllClassIds = () => {
            const allClassIds = <Array<number>>[];

            classList.value.forEach((classItem) => {
                if (classItem.classesId != -1)
                    allClassIds.push(classItem.classesId);
            });
            return allClassIds;
        };
        return {
            state,
            loadingState,
            gradeList,
            classList,
            studentList,
            chooseGrade,
            chooseClass,
            chooseBoardType,
            goToVisualBoard,
        }
    }
})
</script>

<style lang='scss' scoped>
#dataBoardEnter {
    width: 90%;
    height: 80%;
    border-radius: 10px;
    box-shadow: 0px 10px 20px 1px rgba(0, 0, 0, 0.05);
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    flex-direction: column;

    .top {
        display: flex;
        align-items: center;
        width: 95%;
        justify-content: space-between;
        margin-bottom: 20px;

        .title {
            color: rgb(25, 25, 50);
            font-family: Urbanist;
            font-size: 24px;
            font-weight: 600;
            line-height: 29px;
            letter-spacing: 0%;
            text-align: left;
        }
    }

    .selectBox {
        display: flex;
        justify-content: left;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .checkBoard {
            border-radius: 5px;
            box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
            background: rgba(191, 205, 255, 0.25);
            color: rgb(0, 178, 255);
            font-family: Urbanist;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            text-align: center;
            margin: 0 10px;
        }
    }


}
</style>