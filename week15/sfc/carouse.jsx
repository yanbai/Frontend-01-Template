<template>
  <div>
    <img />
  </div>
</template>
<script>
export default {
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function() {
      return this.message.split('').reverse().join('|')
    }
  }
}
</script>
