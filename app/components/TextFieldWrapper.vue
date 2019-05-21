<template>
  <WrapLayout :style="wrapperFieldClass" height="70">
    <TextField
      v-model="name"
      hint="Enter your name..."
      :style="textFieldClass"
      height="50"
      width="100%"
    />
  </WrapLayout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      wrapperFieldClass: {
        textAlign: "center",
        borderColor: this.bgColor,
        borderWidth: "6px",
        borderRadius: "50%",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: "rgba(0,0,0,0.5)"
      },
      textFieldClass: {
        color: this.textColor
      }
    };
  },
  watch: {
    name: function(value) {
      this.setName(value);
    }
  },
  methods: {
    ...mapActions(["setName"])
  },
  computed: {},
  props: {
    choice: Object,
    bgColor: String,
    textColor: String,
    name: String
  }
};
</script>

<style scoped lang="scss">
</style>
