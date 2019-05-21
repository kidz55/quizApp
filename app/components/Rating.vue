<template>
    <stackLayout class="popupRating">
        <TextView class="textRating" text="Would you rate our quizz before ?❤️"/>
        <GridLayout columns="*, *, *, *" rows="*" v-if="!hasRespondedtoRating">
            <Label class="emoji" text="😡" @tap="showPopUpThank" row="0" col="0"/>
            <Label class="emoji" text="😕" @tap="showPopUpThank" row="0" col="1"/>
            <Label class="emoji" text="🙂" @tap="showRealRating" row="0" col="2"/>
            <Label class="emoji" text="😍" @tap="showRealRating" row="0" col="3"/>
        </GridLayout>
        <Label class="message" marginTop="7%" text="Thank you !"/>
    </stackLayout>
</template>

<script>
    import {Ratings} from "nativescript-ratings";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "rating",
        data: function () {
            return {
                rating: {}
            }
        },
        methods: {
            ...mapActions(["respondToRating"]),
            showPopUpThank: function () {
                this.respondToRating()
            },
            showRealRating: function () {
                this.respondToRating()
                this.rating.init();
                this.rating.prompt()

            }
        },
        computed: {
            ...mapGetters([
                "hasRespondedtoRating",
            ])
        },
        mounted: function () {
            this.rating = new Ratings({
                id: "appname-1.0.0",
                showOnCount: 1,
                title: "Please rate us",
                text: "Will you please rate our app ?",
                agreeButtonText: "Rate Now",
                remindButtonText: "Remind Me Later",
                declineButtonText: "No Thanks",
                androidPackageId: "com.quizzy.quizz",
                iTunesAppId: "12345"
            });

        }
    };
</script>

<style scoped>

</style>