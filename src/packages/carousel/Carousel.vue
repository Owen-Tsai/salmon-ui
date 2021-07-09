<template>
  <div
    class="sui-carousel swiper-container"
    ref="rootEl"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div class="swiper-wrapper" ref="wrapperEl">
      <slot></slot>
    </div>

    <transition
      v-if="showArrows !== 'never' && direction !== 'vertical'"
      name="carousel-arrow-left"
    >
      <button
        v-show="showLeftArrow"
        class="sui-carousel__arrow sui-carousel__arrow--left"
        @click="toPrevSlide"
      >
        <s-icon name="chevron-left"></s-icon>
      </button>
    </transition>
    <transition
      v-if="showArrows !== 'never' && direction !== 'vertical'"
      name="carousel-arrow-right"
    >
      <button
        v-show="showRightArrow"
        class="sui-carousel__arrow sui-carousel__arrow--right"
        @click="toNextSlide"
      >
        <s-icon name="chevron-right"></s-icon>
      </button>
    </transition>

    <!-- pagination -->
    <div
      v-if="showPagination"
      :class="[
        'sui-carousel__pagination',
        {
          'is-vertical': direction === 'vertical',
        }
      ]"
    >
      <button
        v-for="index in slides?.length" :key="index"
        :class="[
          'sui-carousel__indicator',
          {
            'is-active': index - 1 === activeIndex,
          }
        ]"
        @click="toSlide(index - 1)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    computed,
    ref,
    onMounted,
    nextTick
  } from 'vue'

  import SIcon from '../icon'

  import Swiper, { Autoplay } from 'swiper/core'
  Swiper.use([Autoplay])

  import {
    CarouselArrowOption,
    AutoPlayOption,
    CarouselTransition,
    CarouselDirection,
    CarouselSlidesPerViewOption
  } from './carousel.type'

  export default defineComponent({
    name: 'SCarousel',
    components: {
      SIcon
    },
    props: {
      showArrows: {
        type: String as PropType<CarouselArrowOption>,
        default: 'hover'
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: [Boolean, Object] as PropType<AutoPlayOption>,
        default: false
      },
      direction: {
        type: String as PropType<CarouselDirection>,
        default: 'horizontal',
        validator: (v: string) => {
          return ['horizontal', 'vertical'].includes(v)
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      transition: {
        type: String as PropType<CarouselTransition>,
        default: 'slide'
      },
      speed: {
        type: Number,
        default: 300
      },
      slidesPerView: {
        type: [String, Number] as PropType<CarouselSlidesPerViewOption>,
        default: 1
      },
      spaceBetween: {
        type: Number,
        default: 0
      }
    },
    emits: ['change'],
    setup(props, { emit }) {
      const wrapperEl = ref<HTMLElement>()
      const rootEl = ref<HTMLElement>()
      const swiperInstance = ref<null | Swiper>(null)
      const activeIndex = ref(-1)

      const isHovering = ref(false)

      // computed
      const slides = computed(() => {
        return wrapperEl.value?.querySelectorAll('.swiper-slide')
      })
      const showLeftArrow = computed(() => {
        return (props.showArrows === 'always' || isHovering.value) &&
          (props.loop || activeIndex.value > 0)
      })
      const showRightArrow = computed(() => {
        return (props.showArrows === 'always' || isHovering.value) &&
          (props.loop ||
            (slides.value && activeIndex.value < slides.value?.length - 1)
          )
      })

      // methods
      const toPrevSlide = () => {
        swiperInstance.value?.slidePrev()
      }
      const toNextSlide = () => {
        swiperInstance.value?.slideNext()
      }
      const toSlide = (index: number) => {
        swiperInstance.value?.slideTo(index)
      }

      // hooks
      onMounted(() => {
        nextTick(() => {
          swiperInstance.value = new Swiper(
            rootEl.value as HTMLElement,
            {
              loop: props.loop,
              autoplay: props.autoplay,
              direction: props.direction,
              initialSlide: props.initialIndex,
              effect: props.transition,
              speed: props.speed,
              spaceBetween: props.spaceBetween,
              slidesPerView: props.slidesPerView,
              resistanceRatio: 0,
              threshold: 4,
              on: {
                slideChange: (swiper: Swiper) => {
                  activeIndex.value = swiper.realIndex
                  emit('change', swiper.realIndex)
                }
              }
            }
          )

          activeIndex.value = swiperInstance.value.realIndex
        })
      })

      return {
        wrapperEl,
        rootEl,
        slides,
        activeIndex,

        isHovering,

        showLeftArrow,
        showRightArrow,

        toPrevSlide,
        toNextSlide,
        toSlide
      }
    }
  })
</script>
