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

      <div class="demo-block">
        <h2>Tooltips</h2>
        <div class="demo-content" id="tooltip-demo">
          <div></div>
          <div>
            <s-tooltip content="top-left" placement="top-start" trigger="click"><s-button>上左</s-button></s-tooltip>
          </div>
          <div>
            <s-tooltip content="top" placement="top" trigger="focus"><s-button>上方</s-button></s-tooltip>
          </div>
          <div>
            <s-tooltip content="top-end" placement="top-end"><s-button>上右</s-button></s-tooltip>
          </div>
          <div></div>

          <div>
            <s-tooltip content="left-start" placement="left-start" theme="light"><s-button>左上</s-button></s-tooltip>
          </div>
          <div></div> <div></div> <div></div>
          <div>
            <s-tooltip content="right-start" placement="right-start"><s-button>右上</s-button></s-tooltip>
          </div>

          <div>
            <s-tooltip content="left" placement="left"><s-button>左侧</s-button></s-tooltip>
          </div>
          <div></div> <div></div> <div></div>
          <div>
            <s-tooltip content="right" placement="right"><s-button>右侧</s-button></s-tooltip>
          </div>

          <div>
            <s-tooltip content="left-end" placement="left-end"><s-button>左下</s-button></s-tooltip>
          </div>
          <div></div> <div></div> <div></div>
          <div>
            <s-tooltip content="right-end" placement="right-end"><s-button>右下</s-button></s-tooltip>
          </div>

          <div></div>
          <div>
            <s-tooltip content="bottom-start" placement="bottom-start"><s-button>下左</s-button></s-tooltip>
          </div>
          <div>
            <s-tooltip content="bottom" placement="bottom-start"><s-button>下方</s-button></s-tooltip>
          </div>
          <div>
            <s-tooltip content="bottom-end" placement="bottom-start"><s-button>下右</s-button></s-tooltip>
          </div>
          <div></div>
        </div>
      </div>
    </section>
    <section class="dev-demo-col">
      <div class="demo-block">
        <h2>Alerts</h2>
        <div class="demo-content">
          <s-alert class="demo-m-y" icon="smile" title="Greetings!">你好，欢迎使用 Salmon UI</s-alert>
          <s-alert class="demo-m-y" icon="smile" outlined>Salmon UI 是一个用于快速开发用户界面的组件库</s-alert>
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

        <div class="demo-block">
          <h2>Tags</h2>
          <div class="demo-content">
            <s-tag class="demo-m-a" dismissible>Vue.js</s-tag>
            <s-tag class="demo-m-a" outlined dismissible>Vue.js</s-tag>
            <s-tag class="demo-m-a" size="large">Web 前端</s-tag>
            <s-tag class="demo-m-a" size="small" dismissible type="warning">Django</s-tag>
            <s-tag class="demo-m-a" size="small" type="error">不兼容</s-tag>
            <s-tag class="demo-m-a" type="error" dismissible>hot</s-tag>
            <s-tag class="demo-m-a" type="error" dismissible outlined>hot</s-tag>
            <s-tag class="demo-m-a" type="success">兼容</s-tag>
          </div>
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

      <div class="demo-block">
        <h2>Radios & Radio Groups</h2>
        <div class="demo-content">
          <s-radio v-model="radio1" label="mao" disabled>毛毛</s-radio>
          <s-radio v-model="radio2" label="cai">蔡蔡</s-radio>
          <p>测试：左值为{{ radio1 }}, 右值为{{ radio2 || '未选中' }}</p>
          <s-radio-group v-model="radio3">
            <s-radio label="mao">毛毛</s-radio>
            <s-radio label="cai">蔡蔡</s-radio>
          </s-radio-group>
          <p>测试：选中值为{{ radio3 }}</p>
        </div>
      </div>

      <div class="demo-block">
        <h2>Checkboxes & Checkbox Groups</h2>
        <div class="demo-content">
          <s-checkbox v-model="checkbox1" label="mao">毛毛</s-checkbox>
          <s-checkbox v-model="checkbox2" label="cai">蔡蔡</s-checkbox>
          <p>测试：毛毛被选中 {{ checkbox1 }}, 蔡蔡被选中 {{ checkbox2 }}</p>
          <s-checkbox-group v-model="checkbox3">
            <s-checkbox label="mao">毛毛</s-checkbox>
            <s-checkbox label="cai">蔡蔡</s-checkbox>
            <s-checkbox label="da-mao">大毛毛</s-checkbox>
            <s-checkbox label="da-cai">大蔡蔡</s-checkbox>
          </s-checkbox-group>
          <p>测试：选中的值包含{{ checkbox3 }}</p>
          <s-checkbox-group v-model="checkbox3" :min="1" :max="3">
            <s-checkbox label="mao">毛毛</s-checkbox>
            <s-checkbox label="cai">蔡蔡</s-checkbox>
            <s-checkbox label="da-mao">大毛毛</s-checkbox>
            <s-checkbox label="da-cai">大蔡蔡</s-checkbox>
          </s-checkbox-group>
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
  import STag from './packages/tag'
  import SRadio from './packages/radio'
  import SRadioGroup from './packages/radio-group'
  import SCheckbox from './packages/checkbox'
  import SCheckboxGroup from './packages/checkbox-group'
  import STooltip from './packages/tooltip'

  import avatar1 from './assets/avatar.jpg'
  import avatar2 from './assets/avatar2.jpg'

  export default {
    components: {
      SButton, SButtonGroup,
      SIcon, SAlert, SAvatar, SBadge,
      SBreadcrumb, SBreadcrumbItem,
      STag, SRadio, SRadioGroup,
      SCheckbox, SCheckboxGroup,
      STooltip
    },
    data: () => ({
      avatar1, avatar2,
      badgeValue: 3,
      radio1: 'mao',
      radio2: '',
      radio3: '',
      checkbox1: false, checkbox2: false,
      checkbox3: []
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

  #tooltip-demo {
    padding 32px 48px
    display grid
    grid-template-columns repeat(5, 1fr)
    grid-gap 8px 0

    div {
      display flex
      align-items center
      justify-content center
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
