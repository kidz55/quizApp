<template>
    <AbsoluteLayout>
        <Label :text="Math.round((maxTime - timer)/1000)" left="0" top="0" :width="computedWidth" height="40" :backgroundColor="bgColor"/>
    </AbsoluteLayout>
</template>

<script>
    export default {
        props: ["timer", "maxTime"],
        computed: {
            bgColor: function () {
                const half = Math.floor(this.maxTime / 2);
                const x = Math.floor((this.timer * 2 * 255) / this.maxTime);
                if (this.timer <= half) {
                    return `rgb(${x}, 255, 0)`;
                } else {
                    return `rgb(255, ${510 - x} , 0)`;
                }
            },
            computedWidth: function () {
                return `${this.timer / (this.maxTime / 100)}%`;
            }
        }
    };
</script>

<style scoped>
</style>
