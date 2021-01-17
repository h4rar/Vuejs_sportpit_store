<template>
  <div class="v-comment-item">
    <p>{{ comment_data.user.firstName }} {{ comment_data.user.lastName }} {{ time }} {{ day }}.{{ month }}.{{ year }}</p>
    <p>{{ comment_data.text }}</p>
  </div>

</template>

<script>
export default {
  name: "v-comment-item",
  data() {
    return {
    }
  },
  props: {
    comment_data: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  computed: {
    year(){
      return this.comment_data.created[0];
    },
    month(){
      return this.comment_data.created[1];
    },
    day(){
      return this.comment_data.created[2];
    },
    time(){
      let t = this.comment_data.created[3] + ":" + this.comment_data.created[4]
      return t;
    }
  }
}
</script>

<style scoped>

</style>