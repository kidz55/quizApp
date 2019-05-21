<template>
    <GridLayout class="rowRank" columns="*, *, *" rows="50">
        <Label class="colRank message" :text="user.userId" row="0" col="0"/>
        <Label class="colRank message" :text="user.score" row="0" col="1"/>
        <Label class="colRank message" :text="index + 1" row="0" col="2"/>
    </GridLayout>
</template>

<script>
    export default {
        name: "ranking-row",
        props: {
            user: Object,
            index: Number
        }
    }
</script>

<style scoped>
    .colRank {
        border: #D51A1A solid 1;
    }

    .rowRank {
        border: #D51A1A solid 1;
        background-color: white;
    }
</style>