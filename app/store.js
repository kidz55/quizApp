import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/api';
import conf from './assets/conf.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        session: 0,
        name: '',
        questions: [],
        questionsAreLoaded: false,
        currentQuestionsIndex: 0,
        oldSessions: [],
        hasRespondedtoRating: false,
        responses: [],
        choicesStatus: []
    },
    mutations: {
        SET_NAME(state, name) {
            state.name = name;
        },
        SET_SCORE(state, score) {
            state.responses[state.currentQuestionsIndex].score = score
        },
        SET_TIME(state, time) {
            state.responses[state.currentQuestionsIndex].time = time
        },
        SAVE_OLD_SESSION(state) {
            state.oldSessions.push({
                name: state.name,
                session: state.session,
                questions: state.questions
            })
        },
        SET_NEW_SESSION(state) {
            state.session += 1
            state.questionsAreLoaded = false
            state.currentQuestionsIndex = 0
            state.questions = []
        },
        CLEAR_INDEX_QUESTION(state) {
            state.currentQuestionsIndex = 0
            state.responses = initResponsesArray(state.questions);
        },
        SET_QUESTIONS(state, questions) {
            for (let i = 0; i < questions.length; i++) {
                let responses = questions[i].incorrect_answers
                responses.push(questions[i].correct_answer)
                let shuffleResponses = shuffle(responses)
                let values = []
                for (let y = 0; y < shuffleResponses.length; y++) {
                    values.push({text: decode(shuffleResponses[y]), id: y})
                }
                console.log(decode(questions[i].question))
                let questionObj = {
                    question: decode(questions[i].question),
                    values: values,
                    answer: shuffleResponses.indexOf(questions[i].correct_answer)
                }
                state.questions.push(questionObj)
            }
            state.questionsAreLoaded = true;
            console.log('DONE')
            state.responses = initResponsesArray(state.questions);
        },
        NEXT_QUESTION(state) {
            state.currentQuestionsIndex++;
        },
        INIT_CHOICES_STATUS(state) {
            const currentQuestion = state.questions[state.currentQuestionsIndex];
            state.choicesStatus = currentQuestion.values.reduce((acc, {id}) => {
                return {
                    ...acc,
                    [id]: {
                        bgColor: conf.background_color,
                    }
                }
            }, {});
        },
        SET_CHOICES_STATUS(state, {goodAnswerId, badAnswerId}) {
            state.choicesStatus[goodAnswerId].bgColor = 'green';
            if (badAnswerId !== undefined) {
                state.choicesStatus[badAnswerId].bgColor = 'red';
            }
        },
        SET_ADMOB_INTER(state, bool) {
            state.isAdmobInterstialShowing = bool
        },
        RESPOND_TO_RATING(state) {
            state.hasRespondedtoRating = true
        }
    },
    actions: {

        setScore(store, payload) {
            let {score, time} = payload;
            store.commit('SET_SCORE', score);
            store.commit('SET_TIME', time);
        },
        setNewSession(store) {
            store.commit('SAVE_OLD_SESSION');
            store.commit('SET_NEW_SESSION');
        },
        retryCurrentSession(store) {
            store.commit('CLEAR_INDEX_QUESTION');
            store.commit('INIT_CHOICES_STATUS');
        },
        setName(store, name) {
            store.commit('SET_NAME', name);
        },
        async fetchQuestions(store) {
            const questionsRequest = await Api.get('https://opentdb.com/api.php?amount=20&category=11&type=multiple');
            const questions = questionsRequest.data.results
            store.commit('SET_QUESTIONS', questions);
            store.commit('INIT_CHOICES_STATUS');
        },
        nextQuestion(store) {
            store.dispatch('initInterstial')
            store.commit('INIT_CHOICES_STATUS');
            store.commit('NEXT_QUESTION');
        },
        respondToRating(store) {
            store.commit('RESPOND_TO_RATING')
        },
        validateAnswer(store, chosenId) {
            const currentQuestion = store.state.questions[store.state.currentQuestionsIndex];
            if (currentQuestion.answer === chosenId) {
                // Good answer
                store.commit('SET_CHOICES_STATUS', {goodAnswerId: chosenId})
            } else {
                // Wrong answer
                store.commit('SET_CHOICES_STATUS', {goodAnswerId: currentQuestion.answer, badAnswerId: chosenId})
            }
        }
    },
    getters: {
        getName: (state) => state.name,
        getRank: (state) => {
            let score = state.responses.reduce((total, x) => {
                return total + x.score
            }, 0)

            let time = state.responses.reduce((total, x) => {
                return total + x.time
            }, 0)

            let mondialScore = (score * 20000 / (state.questions.length) - time / 100)
            console.log(mondialScore)
            const maxMondialScore = 20000
            if (mondialScore >= maxMondialScore - (maxMondialScore * 0.3))
                return conf.king
            else if (mondialScore < maxMondialScore - (maxMondialScore * 0.3) && mondialScore >= maxMondialScore - (maxMondialScore * 0.5))
                return conf.master
            else if (mondialScore < maxMondialScore - (maxMondialScore * 0.5) && mondialScore >= maxMondialScore - (maxMondialScore * 0.7))
                return conf.medium
            else if (mondialScore < maxMondialScore - (maxMondialScore * 0.7))
                return conf.noob
            else
                return conf.king

        },
        getScore: (state) => {
            return state.responses.reduce((total, x) => {
                return total + x.score
            }, 0)
        },
        getTime: (state) => {
            return state.responses.reduce((total, x) => {
                return total + x.time
            }, 0) / 1000
        },
        areQuestionsLoaded: (state) => state.questionsAreLoaded,
        isQuestionsLeft: (state) => state.questions.length > state.currentQuestionsIndex + 1,
        getQuestions: (state) => state.questions,
        getNbOfQuestions: (state) => state.questions.length,
        getCurrentQuestion: (state) => state.questions[state.currentQuestionsIndex],
        currentChoicesStatus: (state) => state.choicesStatus,
        getCurrentQuestionIndex: (state) => state.currentQuestionsIndex,
        hasRespondedtoRating: (state) => state.hasRespondedtoRating

    }
});

// utils

const initResponsesArray = (questionsArray) => {
    return questionsArray.map(() => ({score: null, time: 100000000}));
}

const shuffle = function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var he = require('he');

const decode = function (str) {
    return he.decode(str)
};
