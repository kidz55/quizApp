<template>
    <Page actionBarHidden="true" class="general-container">
        <GridLayout class="container" columns="*" rows="*,2*,3*,*,*">
            <GridLayout columns="*, *" rows="*"  col="0" row="0">
                <StackLayout row="0" col="0">
                    <Label class="message" text="SCORE"/>
                    <Label class="message resultContainerLabel" :text="getScore + '/' + getNbOfQuestions"/>
                </StackLayout>

                <StackLayout row="0" col="1">
                    <Label class="message" text="TIME"/>
                    <Label class="message resultContainerLabel" :text="getTime + ' sec'"/>
                </StackLayout>
            </GridLayout>
            <stackLayout col="0" row="1" marginTop="7%">
                <Label class="message" text="RANK"/>
                <Label class="message resultContainerLabel" :text="getRank.label"/>
            </stackLayout>

            <Image v-if="!buttonTaped" :src="getRank.img" stretch="aspectFill" class="imageClass" height="300" col="0"
                   row="2"/>
            <rate-us v-else col="0" row="2"></rate-us>
            <GridLayout columns="*, *" rows="*" height="100" col="0" row="3">
                <Button text="RETRY" @tap="goTo('retry')" class="btn-primary red" row="0" col="0"/>
                <Button text="NEW QUIZZ" @tap="goTo('new')" class="btn-primary green" row="0" col="1"/>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import home from "./Home";
    import game from "./Game";
    import rateUs from "../components/Rating";
    import modal from "../components/modal";

    export default {
        data() {
            return {
                buttonTaped: false
            };
        },
        computed: {
            ...mapGetters([
                "getName",
                "getQuestions",
                "getQuestions",
                "getNbOfQuestions",
                "getScore",
                "getRank",
                "getTime"
            ])
        },

        methods: {
            ...mapActions(["retryCurrentSession", 'initAndDispatchInterstial']),
            goToResult: function () {
                this.$navigateTo(classement);
            },
            goTo: function (mode) {
                if (!this.buttonTaped) {
                    this.buttonTaped = true

                } else {
                    if (mode === "retry") {
                        this.retryCurrentSession();
                        this.$navigateTo(game, {
                            clearHistory: true
                        });
                    } else {
                        this.$navigateTo(home, {
                            clearHistory: true
                        });
                    }
                }
            }
        },
        components: {
            home,
            game,
            rateUs,
            modal
        },
    };
</script>

<style scoped>

    .container {
        margin-top: 10%;
        margin-left: 5%;
        margin-right: 5%;
    }


</style>
