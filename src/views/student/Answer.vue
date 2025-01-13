<template>
    <div class="quiz-app">
        <!-- 左侧答题卡 -->
        <div class="answer-card">
            <h3>答题卡</h3>
            <ul>
                <li v-for="(question, qIndex) in questions" :key="qIndex"
                    :class="{ answered: answers[question.index], active: currentQuestionIndex === qIndex }"
                    @click="goToQuestion(qIndex)">
                    第 {{ question.index }} 题
                </li>
            </ul>
        </div>

        <!-- 右侧答题区域 -->
        <div class="quiz-container">
            <div class="progress-bar">
                <div class="progress" :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }">
                </div>
            </div>
            <div class="question-block">
                <h3>{{ questions[currentQuestionIndex].index }}. {{ questions[currentQuestionIndex].title }}</h3>
                <ul class="options">
                    <li v-for="(option, oIndex) in questions[currentQuestionIndex].options" :key="oIndex"
                        class="option">
                        <label>
                            <input type="radio" :name="'question-' + questions[currentQuestionIndex].index"
                                :value="option.key" v-model="answers[questions[currentQuestionIndex].index]"
                                @change="autoNext && goToNext()" />
                            {{ option.value }}
                        </label>
                    </li>
                </ul>
            </div>
            <div class="navigation-buttons">
                <button @click="goToPrevious" :disabled="currentQuestionIndex === 0">上一题</button>
                <button @click="goToNext" :disabled="currentQuestionIndex === questions.length - 1">下一题</button>
            </div>
            <div class="auto-next">
                <label>
                    <input type="checkbox" v-model="autoNext" />
                    答题后自动跳转下一题
                </label>
            </div>
            <button class="submit-button" @click="submitAnswers">提交答案</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'QuizApp',
    setup() {
        // 模拟从后端获取的数据
        const questions = ref([
            {
                options: [
                    { result: "xxx", score: 5, value: "非常不同意", key: "A" },
                    { result: "xxx", score: 3, value: "比较不同意", key: "B" },
                    { result: "xxx", score: 5, value: "有点不同意", key: "C" },
                    { result: "xxx", score: 5, value: "有点同意", key: "D" },
                    { result: "xxx", score: 5, value: "比较同意", key: "E" },
                    { result: "xxx", score: 5, value: "非常同意", key: "F" }
                ],
                title: "我自己的事情自己做。",
                index: "1",
                secondAbility: "responsebility"
            },
            {
                options: [
                    { result: "xxx", score: 5, value: "非常不同意", key: "A" },
                    { result: "xxx", score: 3, value: "比较不同意", key: "B" },
                    { result: "xxx", score: 5, value: "有点不同意", key: "C" },
                    { result: "xxx", score: 5, value: "有点同意", key: "D" },
                    { result: "xxx", score: 5, value: "比较同意", key: "E" },
                    { result: "xxx", score: 5, value: "非常同意", key: "F" }
                ],
                title: "我爱迟到。",
                index: 2,
                secondAbility: "responsebility"
            }
        ]);

        // 当前显示的题目索引
        const currentQuestionIndex = ref(0);
        // 用户的答案存储
        const answers = ref({});
        // 自动跳转下一题设置
        const autoNext = ref(false);

        // 跳转到上一题
        const goToPrevious = () => {
            if (currentQuestionIndex.value > 0) {
                currentQuestionIndex.value--;
            }
        };

        // 跳转到下一题
        const goToNext = () => {
            if (currentQuestionIndex.value < questions.value.length - 1) {
                currentQuestionIndex.value++;
            }
        };

        // 跳转到指定题目
        const goToQuestion = (index) => {
            currentQuestionIndex.value = index;
        };

        // 提交答案的函数
        const submitAnswers = () => {
            const sortedAnswers = {};

            // 根据 secondAbility 属性分类答案
            questions.value.forEach((question) => {
                const ability = question.secondAbility;
                if (!sortedAnswers[ability]) {
                    sortedAnswers[ability] = [];
                }
                sortedAnswers[ability].push(answers.value[question.index] || null);
            });

            console.log('分类排序后的答案:', sortedAnswers);
            alert('答案已提交，请查看控制台！');

            // 返回给后端的格式化数据
            return sortedAnswers;
        };

        return {
            questions,
            currentQuestionIndex,
            answers,
            autoNext,
            goToPrevious,
            goToNext,
            goToQuestion,
            submitAnswers
        };
    }
};
</script>

<style>
.quiz-app {
    display: flex;
    gap: 20px;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.answer-card {
    width: 20%;
    padding: 10px;
    border-right: 1px solid #ddd;
}

.answer-card ul {
    list-style: none;
    padding: 0;
}

.answer-card li {
    padding: 5px;
    margin: 5px 0;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
}

.answer-card li.active {
    background-color: #cce5ff;
    color: #004085;
}

.answer-card li.answered {
    background-color: #d4edda;
    color: #155724;
}

.quiz-container {
    width: 80%;
    padding: 10px;
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
    background-color: #007bff;
}

.question-block {
    margin-bottom: 20px;
}

.options {
    list-style: none;
    padding: 0;
}

.option {
    margin: 5px 0;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.auto-next {
    margin-top: 10px;
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
