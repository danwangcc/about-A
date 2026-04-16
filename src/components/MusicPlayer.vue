<script setup lang="ts">
import { ref } from 'vue'

const isFolded = ref(true)

const toggleFold = () => {
  isFolded.value = !isFolded.value
}
</script>

<template>
  <div 
    class="fixed bottom-4 left-0 z-[150] flex items-center transition-transform duration-500 ease-in-out"
    :style="{ transform: isFolded ? 'translateX(-330px)' : 'translateX(0)' }"
  >
    <div class="bg-white/80 backdrop-blur-md rounded-r-xl shadow-2xl overflow-hidden border border-white/20 flex items-center">
      <!-- Music Player Iframe -->
      <div class="w-[330px] h-[86px]">
        <iframe 
          frameborder="no" 
          border="0" 
          marginwidth="0" 
          marginheight="0" 
          width="330" 
          height="86" 
          src="//music.163.com/outchain/player?type=2&id=432698934&auto=1&height=66"
        ></iframe>
      </div>
      
      <!-- Toggle Button -->
      <button 
        @click="toggleFold"
        class="w-10 h-[86px] flex items-center justify-center bg-sky-500/60 hover:bg-sky-600/80 transition-colors cursor-pointer group border-l border-white/20"
        title="展开/收起音乐播放器"
      >
        <img 
          :src="isFolded ? '/images/icon/arrowright.webp' : '/images/icon/arrowleft.webp'" 
          alt="toggle" 
          class="w-3 object-contain group-hover:scale-110 transition-all duration-300"
          :class="{ 'translate-x-0.5': isFolded, '-translate-x-0.5': !isFolded }"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
iframe {
  display: block;
}
</style>
