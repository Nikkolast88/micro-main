<template>
  <div id="slideVerify" class="slide-verify" onselectstart="return false;">
    <div class="header">
      <span class="title">请完成拼图进行安全验证</span>
      <i class="el-icon-refresh" @click="refresh"></i>
    </div>
    <div class="main-img">
      <div class="no-img" v-if="!imgurl">图片加载失败</div>
      <canvas ref="canvasStr" :width="w" :height="h" />
      <canvas
        ref="blockStr"
        class="slide-verify-block"
        :width="w"
        :height="h"
      />
      <div class="slide-verify-info" v-if="state.showInfo">
        <i
          :class="{
            'el-icon-success ele_success': state.showInfo,
            'el-icon-error ele_danger': state.fail,
          }"
        ></i>
        {{ state.infoText }}
      </div>
    </div>
    <div class="slide-verify-slider" v-if="imgurl">
      <div
        class="slide-verify-slider-mask"
        :style="{ width: state.sliderMaskWidth }"
      >
        <div
          class="slide-verify-slider-mask-item"
          :class="{ disabled: state.disabled }"
          :style="{ left: state.sliderLeft }"
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
const emit = defineEmits(['refresh', 'success']);
const props = defineProps({
  // block length
  l: {
    type: Number,
    default: 42,
  },
  // block radius
  r: {
    type: Number,
    default: 10,
  },
  // canvas width
  w: {
    // 背景图宽
    type: [Number],
    default: 400,
  },
  // canvas height
  h: {
    // 背景图高
    type: [Number],
    default: 136,
  },
  // canvas width
  sw: {
    // 小图宽
    type: [Number],
    default: 50,
  },
  // canvas height
  sh: {
    type: [Number],
    default: 50,
  },
  blocky: {
    // 小图初始的垂直距离
    type: [Number],
    default: 20,
  },
  sliderText: {
    type: String,
    default: '向右滑动完成拼图',
  },
  imgurl: {
    // 大图地址
    type: String,
    default: '',
  },
  miniimgurl: {
    // 小图地址
    type: String,
    default: '',
  },
  /* 刷新 */
  fresh: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  canvasCtx: null as CanvasRenderingContext2D | null,
  blockCtx: null as CanvasRenderingContext2D | null,
  // block_x: undefined, // container random position
  // blocky: undefined,
  L: props.l + props.r * 2 + 3, // block real lenght
  img: null as HTMLImageElement | null,
  originX: 0,
  originY: 0,
  isMouseDown: false,
  trail: [] as number[],
  widthlable: '',
  sliderLeft: '', // block right offset
  sliderMaskWidth: '', // mask width
  dialogVisible: false,
  infoText: '验证成功',
  fail: false,
  showInfo: false,
  disabled: false,
});
const blockStr = ref();
const canvasStr = ref();
onMounted(() => {
  init();
});
watch(
  () => props.fresh,
  (val) => {
    val && init();
  },
);
const sum = (x: number, y: number) => {
  return x + y;
};

const square = (x: number) => {
  return x * x;
};
const init = () => {
  initDom();
  bindEvents();
};

const initDom = () => {
  if (blockStr.value) {
    state.blockCtx = blockStr.value.getContext('2d');
  }
  if (canvasStr.value) {
    state.canvasCtx = canvasStr.value.getContext('2d');
  }
  initImg();
};
const initImg = (h?: string) => {
  const img = document.createElement('img');
  // img.onload = onload;
  img.onerror = () => {
    img.src = props.imgurl;
  };
  img.src = props.imgurl;
  img.onload = function () {
    state.canvasCtx && state.canvasCtx.drawImage(img, 0, 0, props.w, props.h);
  };

  state.img = img;
  const img1 = document.createElement('img');
  var blocky = h || props.blocky;
  if (blocky === 0) {
    return;
  }
  img1.onerror = () => {
    img1.src = props.miniimgurl;
  };
  img1.src = props.miniimgurl;
  img1.onload = function () {
    state.blockCtx &&
      state.blockCtx.drawImage(img1, 0, props.blocky, props.sw, props.sh);
  };
}; // 刷新
const refresh = () => {
  emit('refresh');
};
const sliderDown = (event: MouseEvent) => {
  state.originX = event.clientX;
  state.originY = event.clientY;
  state.isMouseDown = true;
};
const touchStartEvent = (e: TouchEvent) => {
  state.originX = e.changedTouches[0].pageX;
  state.originY = e.changedTouches[0].pageY;
  state.isMouseDown = true;
};
const bindEvents = () => {
  document.addEventListener('mousemove', (e) => {
    if (!state.isMouseDown) return false;
    const moveX = e.clientX - state.originX;
    const moveY = e.clientY - state.originY;
    if (moveX < 0 || moveX + 28 >= props.w) return false;
    state.sliderLeft = moveX + 'px';
    const blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
    if (blockStr.value) {
      blockStr.value.style.left = blockLeft + 'px';
    }
    state.sliderMaskWidth = moveX + 'px';
    state.trail.push(moveY);
  });
  document.addEventListener('mouseup', (e) => {
    if (!state.isMouseDown) return false;
    state.isMouseDown = false;
    if (e.clientX === state.originX) return false;
    verify();
  });
};
const touchMoveEvent = (e: TouchEvent) => {
  if (!state.isMouseDown) return false;
  const moveX = e.changedTouches[0].pageX - state.originX;
  const moveY = e.changedTouches[0].pageY - state.originY;
  if (moveX < 0 || moveX + 28 >= props.w) return false;
  state.sliderLeft = moveX + 'px';
  const blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
  if (blockStr.value) {
    blockStr.value.style.left = blockLeft + 'px';
  }
  state.sliderMaskWidth = moveX + 'px';
  state.trail.push(moveY);
};
const touchEndEvent = (e: TouchEvent) => {
  if (!state.isMouseDown) return false;
  state.isMouseDown = false;
  if (e.changedTouches[0].pageX === state.originX) return false;
  verify();
};
const verify = () => {
  const arr = state.trail; // drag y move distance
  const average = arr.reduce(sum) / arr.length; // average
  const deviations = arr.map((x) => x - average); // deviation array
  const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
  const left = parseInt(blockStr.value ? blockStr.value.style.left : '');
  emit('success', left, stddev);
};
const reset = (h: string) => {
  state.sliderLeft = '0';
  if (blockStr.value) {
    blockStr.value.style.left = '0';
  }
  state.sliderMaskWidth = '0';
  if (state.canvasCtx) {
    state.canvasCtx.clearRect(0, 0, props.w, props.h);
  }
  if (state.blockCtx) {
    state.blockCtx.clearRect(0, 0, props.w, props.h);
  }
  state.fail = false;
  state.showInfo = false;
  state.disabled = false;
  initImg(h);
};
const handleFail = () => {
  state.fail = true;
  state.showInfo = true;
  state.infoText = '验证失败，请根据提示重新操作';
};
const handleSuccess = () => {
  state.showInfo = true;
  state.infoText = '验证成功';
  state.disabled = true;
};
defineExpose({
  reset,
  handleSuccess,
  handleFail,
});
</script>
<style scoped lang="scss">
.slide-verify {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  background: #f6f7f9;
  border: 1px solid #dcdfe6;
}

.header {
  width: 100%;
  font-size: 14px;

  span {
    float: left;
  }

  .title {
    color: #000;
    line-height: 16px;
  }

  .el-icon-refresh {
    float: right;
    color: #808794;
    font-size: 16px;
    cursor: pointer;
  }
}

.main-img {
  position: relative;
  flex: 1;
  margin: 10px 0;
  overflow: hidden;

  .slide-verify-block {
    position: absolute;
    top: 0;
    left: 0;
  }

  .slide-verify-info {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 14px;
    background: rgb(0 0 0 / 30%);

    i {
      margin: 0 5px;
      font-size: 16px;
    }
  }

  .no-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    line-height: 135px;
    text-align: center;
  }
}

.slide-verify-slider {
  position: relative;
  width: 100%;
  height: 10px;
  background: #dcdfe6;
  border-radius: 6px;

  .slide-verify-slider-mask {
    position: absolute;
    top: 0;
    left: -10px;
    height: 20px;

    .slide-verify-slider-mask-item {
      position: absolute;
      top: -10px;
      left: 0;
      width: 52px;
      height: 31px;
      background: url('../../../assets/images/login/slider.png') no-repeat
        center center;
      cursor: pointer;
      transition: background 0.2s linear;

      &.disabled {
        pointer-events: none;
      }
    }
  }
}
</style>
