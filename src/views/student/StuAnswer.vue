<template>
    <a-spin v-if="loading" class="arcoSpin" />
    <div v-else class="quiz-app">
        <!-- 左侧答题卡 -->
        <div class="answer-card">
            <h3>答题卡</h3>
            <div class="numberBox">
                <ul>
                    <li v-for="(question, qIndex) in questions" :key="qIndex"
                        :class="{ answered: answers[question?.index - 1], active: currentQuestionIndex === qIndex }"
                        @click="goToQuestion(qIndex)">
                        {{ question?.index }}
                    </li>
                </ul>
            </div>
            <div class="scrollLogo">
                <img src="../../assets/image/scrollPoint.png" alt="scrollPoint">
            </div>

            <p class="currentProgress">进度：{{ validCount }}/{{ questions.length }}</p>
            <div class="tip">
                <div class="tipItem">
                    <div class="tipColor" style="background:#1919324D"></div>未答
                </div>
                <div class="tipItem">
                    <div class="tipColor" style="background:#EFF2FF"></div>已答
                </div>
                <div class="tipItem">
                    <div class="tipColor" style="background:#00B2FF"></div>当前
                </div>
            </div>
            <div class="studentDetail">
                <p>姓名：{{ loginUser.name }}</p>
                <p>班级：{{ loginUser.classesName }}</p>
                <p>学号：{{ loginUser.number }}</p>
            </div>
        </div>

        <!-- 右侧答题区域 -->
        <div class="quiz-container">
            <div class="progress-bar">
                <div class="progress" :style="{ width: ((validCount) / questions.length) * 100 + '%' }">
                </div>
            </div>
            <div class="question-block">
                <p class="secondDimension">【{{ questions[currentQuestionIndex]?.secondDimension }}】</p>
                <p class="questionTitle">{{ questions[currentQuestionIndex]?.index }}. {{
                    questions[currentQuestionIndex]?.title }}</p>
                <ul class="options">
                    <li v-for="(option, oIndex) in questions[currentQuestionIndex]?.options" :key="oIndex"
                        class="option">
                        <label>
                            <input type="radio" :name="'question-' + questions[currentQuestionIndex]?.index"
                                :value="option.key" v-model="answers[questions[currentQuestionIndex]?.index - 1]"
                                @change="goToNext()" />
                            {{ option.value }}
                        </label>
                    </li>
                </ul>
            </div>
            <div class="navigation-buttons">
                <button @click="goToPrevious" :disabled="currentQuestionIndex === 0">上一题</button>
                <button @click="goToNext" :disabled="currentQuestionIndex === questions.length - 1"
                    v-if="validCount !== questions.length">下一题</button>
                <button class="submit-button" v-else @click="submitAnswers">提交答案</button>
            </div>
            <!-- <div class="auto-next">
                <a-switch v-model="autoNext" checked-color="#00B2FF" unchecked-color="#BABAC2" type="circle"
                    style="margin-right:10px" />答题后自动跳转下一题
            </div> -->

        </div>
    </div>
</template>

<script lang="ts">
import { studentAnswerCommit, studentGetQuestion } from '@/api/studentController';
import { useTestInformStore } from '@/store/testStore';
import { useLoginUserStore } from '@/store/userStore';
import { Message } from '@arco-design/web-vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'QuizApp',
    setup() {
        const testInformStore = useTestInformStore()
        const testInform = testInformStore.testInform
        const router = useRouter()
        const loginUserStore = useLoginUserStore();
        const loginUser = loginUserStore.loginUser
        const loading = ref<boolean>(true)
        const questions = ref<API.SingleQuestion[]>([])
        const questionDesc = ref<String>("")
        onMounted(() => {
            loadData()
        })
        const loadData = async () => {
            const res = await studentGetQuestion(testInform.questionId || "")
            loading.value = false
            questions.value = res.data.questionContent || {}
            questionDesc.value = res.data.questionDesc || ""
        }

        // 当前显示的题目索引
        const currentQuestionIndex = ref<number>(0);
        // 用户的答案存储
        const answers = ref<Array<String>>([]);
        // 自动跳转下一题设置
        const autoNext = ref<Boolean>(false);

        // 跳转到上一题
        const goToPrevious = () => {
            if (currentQuestionIndex.value > 0) {
                currentQuestionIndex.value--;
            }
        };

        // 跳转到下一题
        const goToNext = () => {
            if (currentQuestionIndex.value < questions.value.length - 1) {
                setTimeout(() => {
                    currentQuestionIndex.value++;
                }, 300)
            }
            console.log("answer::::", answers.value);
        };

        // 跳转到指定题目
        const goToQuestion = (index: number) => {
            currentQuestionIndex.value = index;
        };

        // 提交答案的函数
        const submitAnswers = async () => {
            loading.value = true
            const res: API.BasicResponse = await studentAnswerCommit({
                questionId: testInform.questionId,
                questionType: testInform.questionType,
                choices: answers.value
            } as API.QuestionCommit)
            console.log(res);
            if (res.code === 0) {
                loading.value = false
                Message.success("提交成功！")
                router.go(-1)
            }


            // // 根据 secondAbility 属性分类答案
            // questions.value.forEach((question) => {
            //     const ability = question.secondAbility;
            //     if (!sortedAnswers[ability]) {
            //         sortedAnswers[ability] = [];
            //     }
            //     sortedAnswers[ability].push(answers.value[question?.index] || null);
            // });

            // console.log('分类排序后的答案:', sortedAnswers);
            // alert('答案已提交，请查看控制台！');

            // 返回给后端的格式化数据
            // return sortedAnswers;
        };

        // 计算属性，用于获取有效值数量
        const validCount = computed(() => {
            return answers.value.filter(value => value !== undefined && value !== null && value !== "").length;
        });


        return {
            questions,
            currentQuestionIndex,
            answers,
            goToPrevious,
            goToNext,
            goToQuestion,
            submitAnswers,
            loading,
            validCount,
            loginUser,
        };
    }
};
</script>

<style lang="scss" scoped>
.arcoSpin {
    width: 100%;
    height: 100%;

    ::v-deep .arco-spin-icon {
        width: fit-content;
        margin: 50px auto;
        font-size: 30px;
    }
}

.quiz-app {
    display: flex;
    gap: 20px;
    width: 90%;
    height: 90%;
    margin: auto;
}

.answer-card {
    width: 20%;
    height: 100%;
    padding: 10px;
    background: #fff;
    border-radius: 10px;

    .scrollLogo {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}

.numberBox {
    height: 50%;
}

.tip {
    display: flex;
    justify-content: space-between;

    .tipItem {
        display: flex;

        .tipColor {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin: 0 5px;
        }
    }
}

.studentDetail {
    position: absolute;
    bottom: 5%;
}


.answer-card ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: auto;
    align-content: space-around;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;

    /* IE 10+ */
    ::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }


}

.answer-card li {
    width: 30px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    margin: 5px 0;
    background: rgb(186, 186, 194);
    color: #fff;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    font-size: 18px;

}

.answer-card li.active {
    background: rgb(0, 178, 255) !important;
    color: #fff !important;
}

.answer-card li.answered {
    background: rgba(191, 205, 255, 0.25);
    color: rgb(0, 178, 255);
}

.quiz-container {
    width: 80%;
    height: 100%;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
}

.progress-bar {
    height: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}

.progress {
    height: 100%;
    border-radius: 100px;
    /* 好看颜色 */
    background: linear-gradient(90.00deg, rgb(77, 255, 223), rgb(77, 161, 255) 100%);
}

.question-block {
    margin-bottom: 20px;

    .secondDimension {
        color: rgb(0, 178, 255);
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
    }

    .questionTitle {
        color: rgb(25, 25, 50);
        font-family: Urbanist;
        font-size: 24px;
        font-weight: 600;
        line-height: 29px;
        text-align: left;
    }
}

.options {
    list-style: none;
    padding: 0;
    display: flex;
}

.option {
    margin: 10px;
    color: rgb(25, 25, 50);
    font-family: Urbanist;
    font-size: 18px;
    font-weight: 400;

}

.navigation-buttons {
    display: flex;
    justify-content: right;
    margin-top: 20px;
    margin-right: 10%;

    button {
        width: 90px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        color: #fff;
        padding: 0;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
        background: rgb(0, 178, 255);
        margin: 20px;
    }
}

.auto-next {
    margin-top: 10px;
    text-align: right;
    margin-right: 5%;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}
</style>
