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
            <s-tooltip
              content="top-end"
              placement="top-end"
              trigger="manual"
              v-model="switchVal"
              :hide-on-click="false"
            >
              <s-button>上右</s-button>
            </s-tooltip>
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

      <div class="demo-block">
        <h2>Dropdowns</h2>
        <div class="demo-content">
          <s-dropdown class="demo-m-a" trigger="hover" @command="log">
            <template #reference>
              <s-button>Hover 触发</s-button>
            </template>
            <s-dropdown-menu>
              <s-dropdown-item @click="log('clicked 1st')">number 1 option</s-dropdown-item>
              <s-dropdown-item command="2nd">number 2 option</s-dropdown-item>
              <s-dropdown-item command="3rd">number 3 option</s-dropdown-item>
            </s-dropdown-menu>
          </s-dropdown>

          <s-dropdown class="demo-m-a">
            <template #reference>
              <s-button type="primary">Click 触发</s-button>
            </template>
            <s-dropdown-menu>
              <s-dropdown-item icon="star">星星图标</s-dropdown-item>
              <s-dropdown-item icon="user">用户中心</s-dropdown-item>
              <s-dropdown-item icon="umbrella">雨伞图标</s-dropdown-item>
              <s-dropdown-item icon="lock" :disabled="popoverDisabled">禁用选项</s-dropdown-item>
              <s-dropdown-item icon="lock" divided>分割选项</s-dropdown-item>
              <s-dropdown-item>没有图标的选项</s-dropdown-item>
            </s-dropdown-menu>
          </s-dropdown>

          <s-dropdown class="demo-m-a">
            <template #reference>
              <s-button shape="round" type="primary">多级菜单</s-button>
            </template>
            <s-dropdown-menu>
              <s-dropdown-item icon="star">星星图标</s-dropdown-item>
              <s-dropdown-item icon="user">用户中心</s-dropdown-item>
              <s-dropdown placement="right-start">
                <template #reference>
                  <s-dropdown-item icon="star">星星图标</s-dropdown-item>
                </template>
                <s-dropdown-menu>
                  <s-dropdown-item icon="star">星星星星图标</s-dropdown-item>
                  <s-dropdown-item icon="user">用星星户中心</s-dropdown-item>
                </s-dropdown-menu>
              </s-dropdown>
              <s-dropdown-item icon="star">星星图标</s-dropdown-item>
              <s-dropdown-item icon="user">用户中心</s-dropdown-item>
            </s-dropdown-menu>
          </s-dropdown>
        </div>
      </div>

      <div class="demo-block">
        <h2>Switches</h2>
        <div class="demo-content">
          <s-switch v-model="switchVal" class="demo-m-a"></s-switch>
          <s-switch v-model="switchVal" disabled class="demo-m-a"></s-switch>
          <s-switch
            v-model="switchVal"
            class="demo-m-a"
            activeText="开" inactiveText="关"
          ></s-switch>
          <s-switch
            v-model="switchVal"
            class="demo-m-a"
            activeText="开开" inactiveText="关关"
            :min-width="64"
          ></s-switch>
          <s-switch
            v-model="switchVal"
            class="demo-m-a"
            activeIcon="check" inactiveIcon="x"
          ></s-switch>
          <s-switch
            v-model="switchVal"
            activeColor="#28a745"
            inactiveColor="#d13e32"
            class="demo-m-a"
          ></s-switch>
          <s-switch class="demo-m-a" loading></s-switch>
          <s-switch class="demo-m-a" v-model="switchVal" loading></s-switch>
        </div>
      </div>

      <div class="demo-block">
        <h2>Selects</h2>
        <div class="demo-content">
          <p>测试：选中的值是{{ selectModel }}</p>
          <s-select v-model="selectModel">
            <s-option value="mao">毛毛</s-option>
            <s-option value="cai">蔡蔡</s-option>
            <s-option value="da-mao">大毛毛</s-option>
            <s-option value="da-cai">大蔡蔡</s-option>
          </s-select>
          <p>测试：选中的值是{{ selectModel3 }}</p>
          <s-select
            v-model="selectModel3"
            prefix-icon="user"
            multiple
            :limit="selectLimit"
            style="width: 300px"
            :disabled="popoverDisabled"
          >
            <s-option value="mao">毛毛</s-option>
            <s-option value="cai">蔡蔡</s-option>
            <s-option value="da-mao" divided>大毛毛</s-option>
            <s-option value="da-cai">大蔡蔡</s-option>
          </s-select>
          <p>测试多选：选中的值是{{ selectModel2 }}</p>
          <s-select v-model="selectModel2" multiple :limit="3">
            <s-option value="mao">毛毛</s-option>
            <s-option value="cai">蔡蔡</s-option>
            <s-option value="da-mao"></s-option>
            <s-option value="da-cai">大蔡蔡</s-option>
          </s-select>
          <s-button class="demo-m-a" @click="selectLimit = selectLimit === 2 ? 3 : 2">切换 limit</s-button>
        </div>
      </div>

      <div class="demo-block">
        <h2>Notifications</h2>
        <div class="demo-content">
          <div class="demo-message-form">
            <div class="row">
              <s-select v-model="notice.type" style="width: 100%" placeholder="类型">
                <s-option value="default"></s-option>
                <s-option value="success"></s-option>
                <s-option value="warning"></s-option>
                <s-option value="error"></s-option>
              </s-select>
              <s-input type="number" v-model="notice.duration" placeholder="持续时间"></s-input>
            </div>
            <div class="row">
              <s-input v-model="notice.title" placeholder="标题"></s-input>
              <s-input v-model="notice.content" placeholder="内容"></s-input>
            </div>
            <div class="row">
              <s-input v-model="notice.icon" placeholder="图标">
                <template #prepend>
                  <s-select v-model="notice.showIcon" style="width: 100px">
                    <s-option value="true">显示</s-option>
                    <s-option value="false">不显示</s-option>
                  </s-select>
                </template>
              </s-input>
            </div>
            <div class="row">
              <s-radio-group v-model="notice.position">
                <s-radio label="top-right">右上</s-radio>
                <s-radio label="top-left">左上</s-radio>
                <s-radio label="bottom-right">右下</s-radio>
                <s-radio label="bottom-left">左下</s-radio>
              </s-radio-group>
            </div>

            <s-button class="demo-m-a" type="primary" @click="notify()">
              显示 Notification
            </s-button>
            <s-button class="demo-m-a" @click="shorthandNotify">
              Shorthand
            </s-button>
          </div>
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

      <div class="demo-block">
        <h2>Popovers</h2>
        <div class="demo-content">
          <s-popover trigger="manual" v-model="popoverVisible">
            <template #reference>
              <s-button type="primary" @click="popoverVisible = true">示例按钮</s-button>
            </template>
            <template #default>
              <p style="font-size: 14px; margin-bottom: 0"><b>标题</b></p>
              <p style="font-size: 14px; margin-top: 8px">你确认要删除此条记录吗？</p>
              <div style="text-align: right; padding-bottom: 8px">
                <s-button size="small" type="text" @click="popoverVisible = false">否</s-button>
                <s-button type="primary" size="small" @click="popoverVisible = false">是</s-button>
              </div>
            </template>
          </s-popover>

          <s-popover
            title="标题"
            :content="popperContent"
            trigger="click"
            style="margin-left: 8px"
            :disabled="popoverDisabled"
          >
            <template #reference>
              <s-button :disabled="popoverDisabled">Button</s-button>
            </template>
          </s-popover>

          <s-button @click="changePopperContent" style="margin-left: 8px">改变渲染内容</s-button>
          <s-button @click="popoverDisabled = !popoverDisabled" style="margin-left: 8px">改变可见性</s-button>
        </div>
      </div>

      <div class="demo-block">
        <h2>Cards</h2>
        <div class="demo-content">
          <s-card hoverable class="demo-card">
            <template #header>
              <div class="demo-card-header">
                <h3>穿搭指南</h3>
                <a href="#">More</a>
              </div>
            </template>

            <p>纯色的T恤或衬衫</p>
            <p>卡其色、牛仔蓝、军绿、黑色的裤子，合身宽松</p>
            <p>避免全黑或全白</p>
            <p>层次感！夏天也不可以穿太薄</p>

            <template #footer>
              <div class="demo-card-footer">
                <s-button type="primary">记下了</s-button>
              </div>
            </template>
          </s-card>

          <s-card class="demo-card-2" :body-style="{padding: 0}">
            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="cover">
            <div>
              <h4>European Street Beat</h4>
              <span>https://pdpcy.club/salmon-ui</span>
            </div>
          </s-card>
        </div>
      </div>

      <div class="demo-block">
        <h2>Sliders</h2>
        <div class="demo-content" style="margin-bottom: 80px" >
          <s-slider :step="10" show-stops v-model="sliderValue"></s-slider>
          <p>slider value is {{ sliderValue }}</p>
          <s-slider disabled v-model="sliderValue"></s-slider>
          <br>
          <s-slider style="margin-bottom: 32px" :markers="sliderMarkers" range v-model="sliderRange"></s-slider>
          <p>slider range is between {{ sliderRange }}</p>
          <s-slider range disabled v-model="sliderRange"></s-slider>
          <br>
          <s-slider height="200px" vertical v-model="sliderValue"></s-slider>
          <s-slider height="200px" range vertical v-model="sliderRange"></s-slider>
          <s-slider disabled height="200px" vertical v-model="sliderValue"></s-slider>
          <s-slider disabled height="200px" range vertical v-model="sliderRange"></s-slider>
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
            <s-button>大号按钮</s-button>
            <s-button>大号按钮</s-button>
            <s-button>大号按钮</s-button>
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
          <s-checkbox v-model="checkbox1" value="mao">毛毛</s-checkbox>
          <s-checkbox v-model="checkbox2" value="cai">蔡蔡</s-checkbox>
          <p>测试：毛毛被选中 {{ checkbox1 }}, 蔡蔡被选中 {{ checkbox2 }}</p>
          <s-checkbox-group v-model="checkbox3">
            <s-checkbox value="mao">毛毛</s-checkbox>
            <s-checkbox value="cai">蔡蔡</s-checkbox>
            <s-checkbox value="da-mao">大毛毛</s-checkbox>
            <s-checkbox value="da-cai">大蔡蔡</s-checkbox>
          </s-checkbox-group>
          <p>测试：选中的值包含{{ checkbox3 }}</p>
          <s-checkbox-group v-model="checkbox3" :min="1" :max="3">
            <s-checkbox value="mao">毛毛</s-checkbox>
            <s-checkbox value="cai">蔡蔡</s-checkbox>
            <s-checkbox value="da-mao">大毛毛</s-checkbox>
            <s-checkbox value="da-cai">大蔡蔡</s-checkbox>
          </s-checkbox-group>
        </div>
      </div>

      <div class="demo-block">
        <h2>Input Fields</h2>
        <div class="demo-content">
          <s-input
            class="demo-m-sy"
            v-model="inputModel1"
            placeholder="请输入关键字"
            prefix-icon="smile"
          ></s-input>
          <s-input
            class="demo-m-sy"
            v-model="inputModel1"
            placeholder="请输入关键字"
            prefix-icon="search"
            suffix-icon="search"
          >
            <template #append>
              <s-button type="primary">搜索</s-button>
            </template>
          </s-input>
          <s-input
            class="demo-m-sy"
            v-model="inputModel1"
            placeholder="请输入关键字"
            prefix-icon="search"
          >
            <template #prepend>
              <s-button>搜索</s-button>
            </template>
          </s-input>
          <s-input
            class="demo-m-sy"
            clearable v-model="inputModel1"
            placeholder="请输入关键字"
          ></s-input>
          <s-input
            class="demo-m-sy"
            show-password-toggle
            v-model="inputModel2"
            placeholder="请输入关键字"
          ></s-input>
          <s-input
            class="demo-m-sy"
            show-password-toggle
            v-model="inputModel2"
            placeholder="请输入关键字"
          >
            <template #suffix>
              <s-icon name="lock"></s-icon>
            </template>
          </s-input>
          <s-input
            class="demo-m-sy"
            show-password-toggle
            clearable
            suffix-icon="lock"
            v-model="inputModel2"
            placeholder="请输入关键字"
            disabled
          ></s-input>
          <s-input
            class="demo-m-sy"
            v-model="inputModel1"
            placeholder="请输入关键字"
          >
            <template #prepend>https://</template>
            <template #append>.com</template>
          </s-input>
          <s-input
            class="demo-m-sy"
            v-model="inputModel1"
            placeholder="请输入关键字"
            maxlength="10"
            show-word-count
          ></s-input>
        </div>
      </div>

      <div class="demo-block">
        <h2>Messages</h2>
        <div class="demo-content">
          <div class="demo-message-form">
            <div class="row">
              <s-select v-model="msg.type" style="width: 100%" placeholder="类型">
                <s-option value="default"></s-option>
                <s-option value="success"></s-option>
                <s-option value="warning"></s-option>
                <s-option value="error"></s-option>
              </s-select>
              <s-input type="number" v-model="msg.duration" placeholder="持续时间"></s-input>
            </div>
            <div class="row">
              <s-input v-model="msg.icon" placeholder="图标(留空则由其类型决定)"></s-input>
              <s-input v-model="msg.content" placeholder="内容"></s-input>
            </div>
          </div>

          <s-button class="demo-m-a" @click="showMessage()" type="primary">
            显示 Message
          </s-button>
          <s-button class="demo-m-a" @click="shorthandMessage()">
            Shorthand
          </s-button>
          <br>
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
  import SPopover from './packages/popover'
  import SCard from './packages/card'
  import SDropdownItem from './packages/dropdown-menu-item'
  import SDropdownMenu from './packages/dropdown-menu'
  import SDropdown from './packages/dropdown'
  import SSwitch from './packages/switch'
  import SInput from './packages/input'
  import SSelect from './packages/select'
  import SOption from './packages/select-option'
  import SSlider from './packages/slider/Slider'

  import avatar1 from './assets/avatar.jpg'
  import avatar2 from './assets/avatar2.jpg'

  export default {
    components: {
      SButton, SButtonGroup,
      SIcon, SAlert, SAvatar, SBadge,
      SBreadcrumb, SBreadcrumbItem,
      STag, SRadio, SRadioGroup,
      SCheckbox, SCheckboxGroup,
      STooltip, SPopover,
      SCard,
      SDropdown, SDropdownItem, SDropdownMenu,
      SSwitch,
      SInput,
      SSelect, SOption,
      SSlider
    },
    data: () => ({
      avatar1, avatar2,
      badgeValue: 3,
      radio1: 'mao',
      radio2: '',
      radio3: '',
      checkbox1: false, checkbox2: false,
      checkbox3: [],
      popoverDisabled: false,
      popoverVisible: false,
      popperContent: 'something real good is gonna happen',
      switchVal: true,
      modelVal: true,
      inputModel1: '123123123',
      inputModel2: '',
      selectModel: 'da-mao',
      selectModel2: ['mao', 'da-mao', 'cai'],
      selectModel3: '',
      selectLimit: 2,
      sliderValue: 10,
      sliderRange: [0, 20],
      sliderMarkers: {
        0: '0℃',
        20: '20℃',
        32: {
          style: {
            color: '#f25f51',
          },
          label: '高温'
        },
        60: '60℃',
        100: 'MAX'
      },
      msg: {
        type: 'default',
        content: '你好，欢迎使用 Salmon UI！',
        duration: 3000,
        icon: undefined
      },
      notice: {
        type: 'default',
        title: '欢迎使用 Salmon UI',
        content: 'Salmon UI 是基于 Vue 3.x 的 Web 端用户界面组件库，拥有简洁统一的视觉表现和语义化的程序实现',
        duration: 5000,
        icon: undefined,
        showIcon: 'false',
        position: 'top-right'
      },
    }),
    methods: {
      changeBadgeValue(value) {
        this.badgeValue += value

        if(this.badgeValue <= 0) {
          this.badgeValue = 0
        }
      },
      changePopperContent() {
        this.popperContent =
          this.popperContent === '970212' ? '961127' : '970212'
      },
      move() {
        this.left += 1
        let el = document.querySelector('#slide')
        let tippy = el._tippy
        tippy.hide()
        tippy.show()
      },
      log(e) {
        console.log(e)
      },
      showMessage() {
        this.$message({
          type: this.msg.type || 'default',
          message: this.msg.content || '你好，欢迎使用 Salmon UI',
          icon: this.msg.icon || undefined,
          duration: parseInt(this.msg.duration)
        })
      },
      shorthandMessage() {
        this.$message.success('hello world')
      },
      notify() {
        this.$notify({
          type: this.notice.type || 'default',
          title: this.notice.title,
          content: this.notice.content,
          showIcon: this.notice.showIcon !== 'false',
          icon: this.notice.icon || undefined,
          duration: parseInt(this.notice.duration),
          position: this.notice.position
        })
      },
      shorthandNotify() {
        this.$notify.error('发生了不可预知的错误')
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "styles/common/var.styl"
  .dev-demo-container {
    display grid
    grid-template-columns repeat(3, 1fr)

    .dev-demo-col {
      margin 16px

      .demo-block {
        h2 {
          font-size 36px
          font-weight 700
          line-height 1.5
          margin-top 0
          margin-bottom 16px
        }
        margin-bottom 16px
        overflow hidden

        .demo-content {
          padding 16px
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
  .demo-m-sy {
    margin 8px 0
  }

  .demo-card {
    p {
      margin-top 4px
      margin-bottom 4px
      font-size 14px
      color color--text.normal
    }
    .demo-card-header {
      display flex
      align-items center
      justify-content space-between
      padding 0 24px
      color color--text.dark
    }
    .demo-card-footer {
      padding 8px 24px
      text-align right
    }
  }

  .demo-card-2 {
    margin 0 auto
    margin-top 16px
    width 60%

    img {
      width 100%
      object-fit contain
    }
    h4 {
      margin 0
      line-height 1.6
    }
    span {
      color: color--text.light
      font-size: font-size--text.small
      display block
      margin-bottom 8px
    }
    div {
      padding 8px 24px
    }
  }

  .demo-message-form {
    .row {
      display flex
      align-items center

      * {
        padding 4px
      }
    }
  }
</style>

<style lang="stylus">
  body {
    margin 0
    padding 0
  }
</style>
