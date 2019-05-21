<template>
    <Page @loaded="pageLoaded" actionBarHidden="true" class="general-container">
        <stackLayout>
            <Image src="~/assets/images/home_movie.png" col="0" row="0" height="150" class="imgHeader"/>
            <Button
                    class="btn-primary red"
                    :text="areQuestionsLoaded? 'Start game':'Please wait'"
                    @tap="goTo"
                    col="0"
                    row="2"
                    width="60%"
                    marginTop="30%"
                    height="50"
            />
        </stackLayout>
    </Page>
</template>

<script>
    import Game from "./Game.vue";
    import TextFieldWrapper from "../components/TextFieldWrapper.vue";
    import {mapActions, mapGetters} from "vuex";
    import conf from "../assets/conf.json";
    import * as app from 'tns-core-modules/application'
    import * as platform from 'tns-core-modules/platform'
    import * as color from 'tns-core-modules/color'
    export default {
        data() {
            return {
                msg: "Home",
                bgColor: conf.background_color,
                textColor: conf.textColor,
                startBtnClass: {
                    backgroundColor: conf.background_color,
                    padding: "0",
                    borderRadius: "50%"
                }
            };
        },
        props: {
            mode: String,
            default: "new"
        },
        computed: {
            ...mapGetters(["areQuestionsLoaded", "getNbOfQuestions", "getName"])
        },
        created() {
            this.name = this.getName;
            this.setNewSession();
            this.fetchQuestions();
        },
        methods: {
            ...mapActions(["fetchQuestions", "setNewSession"]),
            textchange(e) {
            },
            goTo() {
                this.$navigateTo(Game);
            },
            pageLoaded() {
                if (app.android && platform.device.sdkVersion >= "21") {
                    const window = app.android.foregroundActivity.getWindow();
                    window.setStatusBarColor(new color.Color("#1C1C1C").android);
                }
            }
        },
        components: {
            Game,
            TextFieldWrapper
        }
    };
</script>

<style scoped>
    .nameField {
        text-align: center;
    }

    .imgHeader {
        text-align: center;
        margin: 10vw;
    }
</style>
