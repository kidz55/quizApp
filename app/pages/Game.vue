<template>
    <Page actionBarHidden="true" class="general-container">
        <GridLayout columns="*" rows="5*,20*,50*,3*">
            <Timer col="0" row="0" :timer="timer" :maxTime="MAX_TIME_VALUE"></Timer>
            <Question col="0" row="1" :text="getCurrentQuestion.question" :textColor="textColor"></Question>
            <GridLayout columns="*" :rows="genRows()" row="2" col="0">
                <Choice
                        v-for="(choice,index) in getCurrentQuestion.values"
                        :choice="choice"
                        :row="index"
                        col="0"
                        class="animatedChoice"
                        @onChoiceClick="onChoiceClick"
                        :bgColor="currentChoicesStatus[choice.id].bgColor"
                        :textColor="textColor"
                        v-bind:key="index"
                />
            </GridLayout>
            <Label
                    :text="`${getCurrentQuestionIndex + 1}/${getNbOfQuestions}`"
                    class="questionsCounter"
                    col="0"
                    row="3"
            />
        </GridLayout>
    </Page>
</template>

<script>
    import End from "./End";
    import Choice from "../components/Choice.vue";
    import Timer from "../components/Timer.vue";
    import Question from "../components/Question.vue";

    import {mapGetters, mapActions} from "vuex";

    import conf from "../assets/conf.json";

    export default {
        data() {
            return {
                MAX_TIME_VALUE: 20000,
                msg: "Game",
                response: "",
                bgColor: conf.background_color,
                textColor: conf.textColor,
                timer: 0,
                timerInterval: null,
                answerLock: false
            };
        },
        watch: {

            timer: function (value) {
                if (value >= this.MAX_TIME_VALUE) {
                    clearInterval(this.timerInterval);
                    this.failed();
                    this.isQuestionsLeft ? this.initNextQuestion() : this.goToEnd();
                }
            }
        },
        methods: {
            ...mapActions(["nextQuestion", "setScore", "validateAnswer"]),
            goToEnd() {
                this.$navigateTo(End, {
                    clearHistory: true
                });
            },
            genRows() {
                // TODO : create string according to the number of rows
                return "*,*,*,*";
            },
            onChoiceClick(choiceId) {
                if (this.answerLock) {
                    return;
                }
                this.answerLock = true;
                clearInterval(this.timerInterval);
                this.validateAnswer(choiceId);
                choiceId === this.getCurrentQuestion.answer
                    ? this.succeed()
                    : this.failed();
                // Add timeout before going to the next question
                setTimeout(() => {
                    this.isQuestionsLeft ? this.initNextQuestion() : this.goToEnd();
                    this.answerLock = false;
                }, 2000);
            },
            initNextQuestion() {

                this.launchTimer();
                this.nextQuestion();


            },
            launchTimer() {
                this.timer = 0;
                this.timerInterval = setInterval(() => {
                    this.timer += 10;
                }, 10);
            },
            succeed() {
                this.setScore({score: true, time: this.timer});
                console.log("succeed , printing something on screen");
            },
            failed() {
                this.setScore({score: false, time: this.timer});
                console.log("failed, printing something on screen");
            }
        },
        mounted() {
            this.launchTimer();
        },
        components: {
            End,
            Choice,
            Timer,
            Question
        },
        computed: {
            ...mapGetters([
                "getCurrentQuestion",
                "isQuestionsLeft",
                "currentChoicesStatus",
                "getCurrentQuestionIndex",
                "getNbOfQuestions",
            ])
        }
    };
</script>

<style scoped>

    .animatedChoice {
        vertical-align: center;
        opacity: 0;
        animation-name: fadeInDown;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

</style>
