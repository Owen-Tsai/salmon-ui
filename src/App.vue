<template>
  <main class="dev-demo-container">
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Icons</h2>
        <div class="demo-content" id="icon-demo">
          <div><s-icon name="smile"></s-icon></div>
          <div><s-icon name="user"></s-icon></div>
          <div><s-icon name="lock"></s-icon></div>
          <div><s-icon name="shield"></s-icon></div>
          <div><s-icon name="umbrella"></s-icon></div>
          <div><s-icon name="star"></s-icon></div>
          <div><s-icon name="mail"></s-icon></div>
          <div><s-icon name="github"></s-icon></div>
        </div>
      </div>
    </section>
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Alerts</h2>
        <div class="demo-content">
          <s-alert class="demo-m" icon="smile" title="Greetings!">你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m" icon="smile" outlined>你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m" type="error" icon="wifi-off" :dismissible="false">
            <template v-slot:title>错误</template>
            <span>检测不到可用的网络连接<a style="margin-left: 8px; color: #fff" href="#">重试</a></span>
          </s-alert>
          <s-alert class="demo-m" type="success" icon="smile">你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m" type="warning" icon="smile">你好，欢迎使用 Salmon UI</s-alert>
        </div>
      </div>
    </section>
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Buttons</h2>
        <div class="demo-content">

        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import SIcon from './packages/icon'
  import SAlert from './packages/alert'

  export default {
    components: {
      SIcon, SAlert
    }
  }
</script>

<style lang="stylus" scoped>
  .dev-demo-container {
    display grid
    grid-template-columns repeat(3, 1fr)

    .dev-demo-col {
      margin 16px
      padding 16px

      .demo-block {
        h2 {
          font-size 36px
          font-weight 700
          line-height 1.5
          margin-top 0
          margin-bottom 24px
        }
      }
    }
  }

  #icon-demo {
    display grid
    grid-template-columns repeat(4, 1fr)

    div {
      font-size 36px
      display flex
      align-items center
      justify-content center
      margin 16px
    }
  }

  .demo-m {
    margin 16px 0
  }
</style>

<style lang="stylus">
  body {
    margin 0
    padding 0
  }
</style>
