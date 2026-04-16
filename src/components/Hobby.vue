<template>
  <div class="h-screen w-full px-[3vw] sm:px-[20vw] md:px-12 flex flex-col items-center pt-12 md:pt-18 bg-cover bg-center bg-fixed" style="background-image: url('/images/pic/bg4.webp');">
    
    <!-- 顶部标题 -->
    <div class="text-center">
      <h2 class="text-lg md:text-xl text-white tracking-widest opacity-90">
        Something Of Hobby
      </h2>
    </div>

    <!-- 兴趣爱好栅格 -->
    <div class="w-full max-w-7xl overflow-y-auto scrollbar-hide">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-4 md:p-8">
        <div 
          v-for="(item, index) in hobbies" 
          :key="index"
          class="sticker-card aspect-square rounded-none flex flex-col items-center justify-center bg-opacity-95 transition-all duration-300 shadow-[5px_5px_15px_rgba(0,0,0,0.4)] hover:shadow-[20px_20px_40px_rgba(0,0,0,0.6)] cursor-pointer group relative p-0.5"
          :style="{ 
            backgroundColor: item.color, 
            '--initial-rotate': `${item.rotate}deg`,
            '--y-offset': `${item.yOffset}px`
          }"
        >
          <!-- 文字内容 (置于上方) -->
          <span v-if="item.name" class="text-white text-xs md:text-sm font-bold tracking-wider drop-shadow-md text-center px-1 whitespace-pre-line leading-relaxed mb-3">
            {{ item.name }}
          </span>

          <!-- 图片显示 (置于下方) -->
          <div v-if="item.image" class="w-full flex-1 flex items-center justify-center overflow-hidden">
            <img :src="item.image" :alt="item.name" class="max-h-full max-w-full object-contain drop-shadow-md transition-transform" />
          </div>
        </div>
      </div>
    </div>
    </div>
    </template>

    <script setup lang="ts">
    const hobbies = [
    { 
      name: '葉月ゆら的歌真的很好听', 
      image: '/images/pic/Hatsukiyura.webp',
      color: '#D45E54', 
      rotate: -5, 
      yOffset: 4 
    },
    { 
      name: '笑一笑吧，濑津美', 
      image: '/images/pic/Narcissus.webp',
      color: '#AD71B2', 
      rotate: 6, 
      yOffset: -3 
    },
    { 
      name: '越共探头', 
      image: '/images/pic/Touhou.webp',
      color: '#C5BFB4', 
      rotate: -4, 
      yOffset: 5 
    },
    { 
      name: 'Minecraft', 
      image: '/images/pic/MC.webp',
      color: '#7A9E9F', 
      rotate: 8, 
      yOffset: -2 
    },
    { 
      name: '游戏的最高配置就是——', 
      image: '/images/pic/Roco.webp',
      color: '#8E9775', 
      rotate: -7, 
      yOffset: 3 
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
