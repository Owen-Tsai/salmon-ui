<template>
  <demo name="Card">
    <s-card body-class="my-body">
      <img :src="src" alt="My Trip in Asia">
      <div class="content">
        <h2>My Trip in Asia</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tenetur dolores? Asperiores quis dolorem iure velit esse harum id! Eos, suscipit consequuntur? Illum ullam ipsa aliquid ut quam autem dolorum.</p>
      </div>
    </s-card>

    <s-card title="待办清单" shadow="always">
      <p>You got 3 things to do this year.</p>
      <ul>
        <li>Keep creative.</li>
        <li>Keep discovering.</li>
        <li>Purpose her.</li>
      </ul>
      <template v-slot:footer>
        <div style="text-align: right">&copy; Owen @SalmonUI</div>
      </template>
    </s-card>
  </demo>
</template>

<script lang="ts" setup>
import SCard from 'salmon-ui/card'
const src = 'https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
</script>

<style lang="scss" scoped>
img {
  display: block;
  height: 140px;
  width: 100%;
  object-fit: cover;
}
.content {
  padding: 8px 16px;
  h2 {
    font-size: 18px;
    margin: 0;
  }
  p {
    color: #444;
  }
}

.sui-card + .sui-card {
  margin-top: 16px;
}
</style>