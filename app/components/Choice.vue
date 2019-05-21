<template>
    <TextView :text="choice.text" class="choiceButton" :style="computeClass" @tap="onChoiceClick" editable="false"/>
</template>

<script>
    export default {
        data: function () {
            return {
                pressed: false,
            }
        },
        methods: {
            onChoiceClick: function () {
                this.pressed = true
                this.$emit("onChoiceClick", this.choice.id);
            }
        },
        computed: {
            computeClass() {
                return {
                    borderColor: this.bgColor,
                    color: this.textColor
                };
            }
        },
        props: {
            choice: Object,
            bgColor: String,
            textColor: String,
        }
    };
</script>

<style scoped>
    .choiceButton {

        border-width: 6px;
        border-radius: 50%;
        padding-left: 30px;
        padding-right: 30px;
        background-color: rgba(0, 0, 0, 0.5);
        vertical-align: center;
        text-align: center;
        width: 70%;
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 20px;
    }

    .choiceButton.active {
        /*        animation-name: tada;
                animation-duration: 1s;
                animation-fill-mode: forwards;*/
    }
</style>
