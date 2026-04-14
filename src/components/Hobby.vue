<template>
  <div class="h-screen w-full px-[3vw] sm:px-[20vw] md:px-12 flex flex-col items-center pt-12 md:pt-18 bg-cover bg-center bg-fixed" style="background-image: url('/images/pic/pic_4.jpg');">
    
    <!-- 顶部标题 -->
    <div class="text-center">
      <h2 class="text-sm md:text-xl mb-2 md:mb-4 text-white tracking-widest opacity-90">
        Something Of Hobby
      </h2>
    </div>

    <!-- 兴趣爱好栅格 -->
    <div class="w-full max-w-7xl overflow-y-auto scrollbar-hide">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-4 md:p-8">
        <div 
          v-for="(item, index) in hobbies" 
          :key="index"
          class="sticker-card aspect-square rounded-none flex flex-col items-center justify-center bg-opacity-95 transition-all duration-300 shadow-[5px_5px_15px_rgba(0,0,0,0.4)] hover:shadow-[20px_20px_40px_rgba(0,0,0,0.6)] cursor-pointer group relative"
          :style="{ 
            backgroundColor: item.color, 
            '--initial-rotate': `${item.rotate}deg`,
            '--y-offset': `${item.yOffset}px`
          }"
        >
          <!-- 图片显示 (如果有) -->
          <div v-if="item.image" class="w-full px-2 flex items-center justify-center overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-105" />
          </div>

          <!-- 文字内容 -->
          <span v-if="item.name" class="text-xs md:text-xl font-bold tracking-wider drop-shadow-md uppercase text-center px-2 whitespace-pre-line leading-relaxed">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

    <script setup lang="ts">
    const hobbies = [
    { 
    name: '世界好大啊\n原来外面的世界是这个这样子啊', 
    color: '#D45E54', 
    rotate: -5, 
    yOffset: 7 
    },
    { 
    name: '我无所谓喜不喜欢，既然Sakura不喜欢，那就杀掉好了。', 
    color: '#AD71B2', 
    rotate: 6, 
    yOffset: -5 
    },
    { 
    name: '我们都是小怪兽\n有一天会被正义的奥特曼杀死。', 
    color: '#C5BFB4', 
    rotate: -4, 
    yOffset: 10 
    },
    { 
    name: 'Sakura&Eriiの小黄鸭', 
    image: '/images/pic/Erii.png',
    color: '#7A9E9F', 
    rotate: 8, 
    yOffset: -2 
    },
    { 
    name: '', 
    image: '/images/pic/bad_apple.svg',
    color: '#2f3640', 
    rotate: -7, 
    yOffset: 6 
    }
    ]
    </script>

<style scoped>
.sticker-card {
  transform: translate3d(0, var(--y-offset), 0) rotate(var(--initial-rotate)) scale(1);
}

.sticker-card:hover {
  transform: translate3d(0, 0, 0) rotate(0deg) scale(1.2);
  z-index: 50;
}

/* 隐藏滚动条 */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
