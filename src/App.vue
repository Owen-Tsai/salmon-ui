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

      <div class="demo-block">
        <h2>Avatars</h2>
        <div class="demo-content">
          <s-avatar :src="avatar2" size="large" class="demo-m-a"></s-avatar>
          <s-avatar :src="avatar2" class="demo-m-a"></s-avatar>
          <s-avatar :src="avatar2" size="small" class="demo-m-a"></s-avatar>
          <s-avatar :src="avatar2" class="demo-m-a" size="large" shape="square"></s-avatar>
          <s-avatar :src="avatar2" class="demo-m-a" shape="square"></s-avatar>
          <s-avatar :src="avatar2" class="demo-m-a" size="small" shape="square"></s-avatar>

          <br>

          <s-avatar class="demo-m-a" :size="64">三文咸鱼</s-avatar>
          <s-avatar class="demo-m-a" :size="64">Lucy</s-avatar>
          <s-avatar class="demo-m-a" :size="64">张三</s-avatar>
          <s-avatar class="demo-m-a" icon="user"></s-avatar>
        </div>
      </div>

      <div class="demo-block">
        <h2>Badges</h2>
        <div class="demo-content">
          <s-badge :value="badgeValue" :max="9" class="demo-m-a">
            <s-button>示例按钮</s-button>
          </s-badge>
          <s-badge type="success" dot class="demo-m-a">
            <s-button>示例按钮</s-button>
          </s-badge>
          <s-badge type="error" :value="badgeValue" :max="9" class="demo-m-a">
            <s-avatar :src="avatar2" size="large"></s-avatar>
          </s-badge>
          <s-badge type="warning" dot :top="4" :right="4" class="demo-m-a">
            <s-avatar :src="avatar2" size="large"></s-avatar>
          </s-badge>
          <s-badge value="hot" type="error" class="demo-m-a">
            <s-button>某功能</s-button>
          </s-badge>

          <br>

          <s-button-group class="demo-m-a">
            <s-button icon="plus" @click="changeBadgeValue(1)"></s-button>
            <s-button icon="minus" @click="changeBadgeValue(-1)"></s-button>
          </s-button-group>
        </div>
      </div>
    </section>
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Alerts</h2>
        <div class="demo-content">
          <s-alert class="demo-m-y" icon="smile" title="Greetings!">你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m-y" icon="smile" outlined>你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m-y" type="error" icon="wifi-off" :dismissible="false">
            <template v-slot:title>错误</template>
            <span>检测不到可用的网络连接<a style="margin-left: 8px; color: #fff" href="#">重试</a></span>
          </s-alert>
          <s-alert class="demo-m-y" type="success" icon="smile">你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m-y" type="warning" icon="smile">你好，欢迎使用 Salmon UI</s-alert>
        </div>
      </div>

      <div class="demo-block">
        <h2>Breadcrumb</h2>
        <div class="demo-content">
          <s-breadcrumb>
            <s-breadcrumb-item to="/">首页</s-breadcrumb-item>
            <s-breadcrumb-item class="demo-m-y">
              <a href="">订单管理</a>
            </s-breadcrumb-item>
            <s-breadcrumb-item>订单列表</s-breadcrumb-item>
            <s-breadcrumb-item>订单详情</s-breadcrumb-item>
          </s-breadcrumb>

          <s-breadcrumb separate-icon="chevron-right" class="demo-m-y">
            <s-breadcrumb-item to="/">首页</s-breadcrumb-item>
            <s-breadcrumb-item>订单管理</s-breadcrumb-item>
            <s-breadcrumb-item>订单列表</s-breadcrumb-item>
            <s-breadcrumb-item>订单详情</s-breadcrumb-item>
          </s-breadcrumb>
        </div>
      </div>
    </section>
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Buttons</h2>
        <div class="demo-content">
          <s-button class="demo-m-a" type="primary">主要按钮</s-button>
          <s-button class="demo-m-a" icon="heart">爱你</s-button>
          <s-button class="demo-m-a" type="outlined">outlined 按钮</s-button>
          <s-button class="demo-m-a" type="text">文字按钮</s-button>

          <s-button class="demo-m-a" danger type="primary">危险按钮</s-button>
          <s-button class="demo-m-a" danger icon="heart">爱你</s-button>
          <s-button class="demo-m-a" danger type="outlined">outlined 危险</s-button>
          <s-button class="demo-m-a" danger type="text">危险文字</s-button>

          <s-button class="demo-m-a" type="primary" shape="round">圆角按钮</s-button>
          <s-button class="demo-m-a" type="primary" shape="round">
            <s-icon name="heart"></s-icon>
            圆角按钮
          </s-button>
          <s-button class="demo-m-a" type="primary" shape="circle" icon="star"></s-button>

          <br>

          <s-button class="demo-m-a" shape="round" size="large">Large</s-button>
          <s-button class="demo-m-a" shape="round">Default</s-button>
          <s-button class="demo-m-a" shape="round" size="small">Small</s-button>

          <s-button class="demo-m-a" size="large" shape="circle" icon="star"></s-button>
          <s-button class="demo-m-a" shape="circle" icon="star"></s-button>
          <s-button class="demo-m-a" size="small" shape="circle" icon="star"></s-button>

          <br>

          <s-button class="demo-m-a" disabled>禁用</s-button>
          <s-button class="demo-m-a" type="text" disabled>禁用</s-button>
          <s-button class="demo-m-a" loading>载入中</s-button>
          <s-button class="demo-m-a" type="primary" shape="round" loading>载入中</s-button>
        </div>
      </div>

      <div class="demo-block">
        <h2>Button Groups</h2>
        <div class="demo-content">
          <s-button-group class="demo-m-y" size="small">
            <s-button type="primary">主要按钮</s-button>
            <s-button type="primary">主要按钮</s-button>
            <s-button type="primary">主要按钮</s-button>
          </s-button-group>

          <s-button-group class="demo-m-y">
            <s-button type="outlined">outlined</s-button>
            <s-button type="outlined">outlined</s-button>
            <s-button type="outlined">outlined</s-button>
          </s-button-group>

          <s-button-group class="demo-m-y" size="large">
            <s-button>主要按钮</s-button>
            <s-button>主要按钮</s-button>
            <s-button>主要按钮</s-button>
          </s-button-group>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import SIcon from './packages/icon'
  import SAlert from './packages/alert'
  import SButton from "./packages/button"
  import SButtonGroup from './packages/button-group'
  import SAvatar from './packages/avatar'
  import SBadge from './packages/badge'
  import SBreadcrumb from './packages/breadcrumb'
  import SBreadcrumbItem from './packages/breadcrumb-item'

  import avatar1 from './assets/avatar.jpg'
  import avatar2 from './assets/avatar2.jpg'

  export default {
    components: {
      SButton, SButtonGroup,
      SIcon, SAlert, SAvatar, SBadge,
      SBreadcrumb, SBreadcrumbItem
    },
    data: () => ({
      avatar1, avatar2,
      badgeValue: 3
    }),
    methods: {
      changeBadgeValue(value) {
        this.badgeValue += value

        if(this.badgeValue <= 0) {
          this.badgeValue = 0
        }
      }
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
          margin-bottom 16px
        }
        margin-bottom 16px
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

  .demo-m-y {
    margin 16px 0
  }
  .demo-m-a {
    margin 8px
  }
</style>

<style lang="stylus">
  body {
    margin 0
    padding 0
  }
</style>
