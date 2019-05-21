<template>
  <TextView :text="text" v-bind:style="questionClass" editable="false"/>
</template>

<script >
export default {
  data() {
    return {
      msg: "Loremp ipsum doloris ?",
      questionClass: {
        color: this.textColor,
        textAlign: "center",
        verticalAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        fontSize: "22px",
        paddingBottom: "30px",
        paddingRight: "20px",
        paddingLeft: "20px"
      }
    };
  },
  props: {
    text: String,
    textColor: String
  }
};
</script>

<style scoped>
</style>
