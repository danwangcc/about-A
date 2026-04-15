<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const socialLinks = [
  { name: 'Bilibili', src: 'https://space.bilibili.com/417911503?s', icon: '/images/icon/bilibili.png', bgColor: 'bg-pink-400', baseAngle: 0 },
  { name: 'GitHub', src: 'https://github.com/danwang1239568', icon: '/images/icon/github.png', bgColor: 'bg-gray-800', baseAngle: 120 },
  { name: 'X (Twitter)', src: 'https://x.com/danwangcc', icon: '/images/icon/x.png', bgColor: 'bg-blue-400', baseAngle: 240 }
]

const btnRefs = ref<HTMLElement[]>([])
const orbitParams = ref({ angle: 0, radius: 0 }) // 初始半径为0，确保从中心弹出

const updateOrbit = () => {
  const isMobile = window.innerWidth < 768
  const currentRadius = orbitParams.value.radius * (isMobile ? 0.75 : 1)

  btnRefs.value.forEach((btn, index) => {
    if (!btn) return
    const aa = orbitParams.value.angle + socialLinks[index].baseAngle
    // 严格抵消旋转：rotate(公转) -> translateX(半径) -> rotate(反向自转)
    btn.style.transform = `rotate(${aa}deg) translateX(${currentRadius}px) rotate(${-aa}deg)`
  })
}

const handleHeadClick = () => {
  // 停止当前正在进行的轨道动画，防止叠加加速
  gsap.killTweensOf(orbitParams.value)

  const randomDirection = Math.random() > 0.5 ? 1 : -1
  const randomOffset = (360 + Math.random() * 360) * randomDirection

  const tl = gsap.timeline({ onUpdate: updateOrbit })

  // 1. 爆发阶段：旋转并明显扩开半径 (从 160 扩到 280)
  tl.to(orbitParams.value, {
    angle: orbitParams.value.angle + randomOffset,
    radius: 280,
    duration: 2,
    ease: "power2.out" 
  })

  // 2. 悄悄缩回原位 (160)
  tl.to(orbitParams.value, {
    radius: 160,
    duration: 1.2,
    ease: "sine.inOut"
  }, "-=1.2")
}

onMounted(() => {
  // 确保初始位置在中心
  updateOrbit()

  const tl = gsap.timeline({ onUpdate: updateOrbit })

  // 1. 弹出动画：scale 和 radius 同步从 0 增长到 160
  tl.to(orbitParams.value, {
    radius: 160,
    angle: 360, // 弹出时顺便转一圈
    duration: 1.5,
    ease: "power3.out"
  })

  tl.fromTo(btnRefs.value, 
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
    0 // 与 radius 动画同时开始
  )
})

onUnmounted(() => {
  gsap.killTweensOf(orbitParams.value)
})
</script>

<template>
  <div class="relative h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden" style="background-image: url('/images/pic/pic_1.jpg');">
    
    <!-- 核心容器 -->
    <div class="relative flex items-center justify-center -translate-y-12 md:scale-110">
      
      <!-- 社交气泡按钮 (胶囊型) -->
      <div class="absolute inset-0 flex items-center justify-center">
        <a 
          v-for="(item, index) in socialLinks" 
          :key="item.name"
          :ref="el => { if(el) btnRefs[index] = el as HTMLElement }"
          :href="item.src"
          class="cycle_a absolute z-50 flex items-center gap-2 px-4 py-2 text-white shadow-xl transition-[box-shadow,filter] duration-300 hover:scale-110 active:scale-95 rounded-full whitespace-nowrap border border-white/20"
          :class="item.bgColor"
        >
          <img :src="item.icon" :alt="item.name" class="w-5 h-5 object-contain brightness-110">
          <span class="font-bold tracking-wider text-xs md:text-sm">{{ item.name }}</span>
        </a>
      </div>

      <!-- 彩带动画 (超强视觉效果) -->
      <div class="absolute w-[262px] h-[262px] rounded-full border-[5px] border-transparent border-t-emerald-300 animate-spin-fast-outer drop-shadow-[0_0_12px_rgba(110,231,183,0.8)]"></div>
      <div class="absolute w-[236px] h-[236px] rounded-full border-[5px] border-transparent border-t-yellow-300 animate-spin-reverse-fast-medium drop-shadow-[0_0_12px_rgba(253,224,71,0.8)]"></div>
      <div class="absolute w-[210px] h-[210px] rounded-full border-[5px] border-transparent border-t-cyan-300 animate-spin-ultra-fast drop-shadow-[0_0_12px_rgba(103,232,249,0.8)]"></div>

      <!-- 中心大头像 -->
      <div 
        @click="handleHeadClick"
        class="relative w-36 h-36 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden z-30 bg-black/20 backdrop-blur-sm cursor-pointer group active:scale-90 transition-transform duration-200"
      >
        <img src="/images/pic/avatar.png" alt="Avatar" class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500">
      </div>
    </div>

    <!-- 底部文字 -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 md:px-8 text-white select-none pointer-events-none opacity-90">
      <div class="bg-black/20 p-4 md:p-6 rounded-3xl text-center shadow-2xl border border-white/10 backdrop-blur-sm">
        <h3 class="text-xl md:text-2xl font-bold tracking-tight text-amber-50">_Smileシ淡莣c</h3>
        <p class="text-xs md:text-sm font-light tracking-[0.2em] uppercase mt-1 opacity-70">浮生一薤露，蜗角争是非</p>
        <div class="h-px w-12 bg-white/10 mx-auto my-3"></div>
        <p class="text-sm md:text-base leading-relaxed font-light">
          为世界献上美好祝福 <br> 愿世界祝福我
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
@reference "tailwindcss";

.animate-spin-ultra-fast { animation: spin 2.5s linear infinite; }
.animate-spin-reverse-fast-medium { animation: spin-reverse 3.5s linear infinite; }
.animate-spin-fast-outer { animation: spin 5s linear infinite; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
</style>
