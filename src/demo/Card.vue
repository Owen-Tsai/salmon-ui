<template>
  <demo name="Card">
    <s-card>
      <img :src="src" alt="My Trip in Asia">
      <div class="content">
        <h2>My Trip in Asia</h2>
        <div class="tags">
          <s-tag type="primary" size="small">Trip</s-tag>
          <s-tag type="primary" size="small">China</s-tag>
          <s-tag type="primary" size="small">Asia</s-tag>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, tenetur dolores? Asperiores quis dolorem iure velit esse harum id! Eos, suscipit consequuntur? Illum ullam ipsa aliquid ut quam autem dolorum.</p>
      </div>
    </s-card>

    <div class="grid">
      <s-card title="Title">
        <template #action>
          <s-link hover="background">Link</s-link>
        </template>
        <div class="content">
          Salmon UI is a simple, consistent UI library buitl for vue 3.
        </div>
      </s-card>
      <s-card title="Title">
        <template #action>
          <s-link hover="background">Link</s-link>
        </template>
        <div class="content">
          Salmon UI is a simple, consistent UI library buitl for vue 3.
        </div>
      </s-card>
    </div>
  </demo>
</template>

<script lang="ts" setup>
import SCard from 'salmon-ui/card'
import STag from 'salmon-ui/tag'
import SLink from 'salmon-ui/link'
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

.tags {
  margin-top: 8px;

  .sui-tag + .sui-tag {
    margin-left: 4px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}
</style>