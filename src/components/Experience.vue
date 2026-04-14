<template>
  <div class="relative h-screen w-full bg-cover bg-center bg-fixed overflow-hidden" style="background-image: url('/images/pic/pic_3.jpg');">
    
    <!-- 标题 (可选，增强层次感) -->
    <h2 class="absolute top-20 left-12 text-white/20 text-8xl font-black uppercase pointer-events-none select-none">
      Experience
    </h2>

    <!-- 左右导航箭头 (去掉背景，常态 100% 不透明度) -->
    <button 
      @click="scroll(-1)"
      class="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-50 p-2 transition-all active:scale-75"
    >
      <img src="/images/icon/arrowleft.png" class="w-8 h-8 md:w-12 md:h-12 object-contain" alt="Prev">
    </button>
    <button 
      @click="scroll(1)"
      class="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-50 p-2 transition-all active:scale-75"
    >
      <img src="/images/icon/arrowright.png" class="w-8 h-8 md:w-12 md:h-12 object-contain" alt="Next">
    </button>

    <!-- 水平时间轴线 (4px 点线) -->
    <div class="absolute top-1/2 left-0 w-full h-1 border-t-4 border-dotted border-white/40 z-10 -translate-y-1/2"></div>

    <!-- 横向滚动容器 -->
    <div 
      ref="scrollContainer"
      class="h-full w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative flex items-center px-[10vw] md:px-[30vw]"
    >
      <div 
        v-for="(item, index) in experiences" 
        :key="index"
        class="inline-block relative w-[80vw] md:w-[40vw] flex-none h-full"
      >
        <!-- 中心圆点 -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"></div>

        <!-- 经历卡片 (上下交替，不透明度增加) -->
        <div 
          :class="[
            'absolute left-1/2 -translate-x-1/2 h-[30vh] w-[70vw] md:w-[450px] p-6 bg-gray-600/85 rounded-2xl border border-white/5 shadow-[8px_8px_20px_rgba(0,0,0,0.5)] transition-all',
            index % 2 === 0 ? 'bottom-[55%]' : 'top-[55%]'
          ]"
        >
          <!-- 标题 -->
          <h3 v-if="item.title" class="text-white text-lg md:text-xl font-bold mb-3 tracking-wide transition-colors whitespace-normal leading-tight">{{ item.title }}</h3>
          <!-- 描述 -->
          <p class="text-white/60 text-xs md:text-sm whitespace-pre-line leading-relaxed">{{ item.description }}</p>

          <!-- 指向中心的小箭头/线装饰 -->
          <div 
            :class="[
              'absolute left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white/20',
              index % 2 === 0 ? 'top-full' : 'bottom-full'
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollContainer = ref<HTMLElement | null>(null)

const experiences = [
  { 
    title: '04.24', 
    description: '和Sakura去东京天空树，\n世界上最暖和的地方，\n在天空树的顶上。' 
  },
  { 
    title: '04.26', 
    description: '和Sakura去明治神宫，\n有人在那里举办婚礼。' 
  },
  { 
    title: '04.25', 
    description: '和Sakura去迪士尼，\n鬼屋很可怕，\n但是有Sakura在，\n所以不可怕。' 
  },
  { 
    title: 'E.N.D', 
    description: 'Sakura\n最好了\nBGM: 最后的旅行' 
  },
  { 
    title: '', 
    description: '世界很温柔.....\n我很喜欢这样的世界\n但他不喜欢我' 
  }
]

const scroll = (direction: number) => {
  if (scrollContainer.value) {
    const scrollAmount = window.innerWidth * 0.4; // 滚动 40vw
    scrollContainer.value.scrollLeft += direction * scrollAmount;
  }
}
</script>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
