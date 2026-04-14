<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const socialLinks = [
  { name: 'Bilibili', icon: '/images/icon/bilibili.png', url: '#', bgColor: 'bg-pink-400', angle: -90 },
  { name: 'GitHub', icon: '/images/icon/github.png', url: '#', bgColor: 'bg-gray-800', angle: 30 },
  { name: 'Twitter', icon: '/images/icon/twitter.png', url: '#', bgColor: 'bg-blue-400', angle: 150 }
]

const btnRefs = ref<HTMLElement[]>([])

const animateButtons = () => {
  const radius = 180; // Final resting radius
  const overshootFactor = 1.15;
  const overshootRadius = radius * overshootFactor; 

  const popOutDuration = 1.0; // Duration for pop out to overshoot
  const snapBackDuration = 0.4; // Duration for snap back to final
  const pauseDuration = 0.2;    // Pause after overshoot

  if (btnRefs.value.length === 0) {
    console.error("btnRefs is empty. Buttons might not be rendered or referenced correctly.");
    return;
  }

  btnRefs.value.forEach((btn, index) => {
    const angleDeg = socialLinks[index].angle;
    // Manual conversion from degrees to radians
    const initialRad = (angleDeg * Math.PI) / 180; 

    const targetX = Math.cos(initialRad) * radius;
    const targetY = Math.sin(initialRad) * radius;
    const overshootX = Math.cos(initialRad) * overshootRadius;
    const overshootY = Math.sin(initialRad) * overshootRadius;

    const buttonAnimation = gsap.timeline({
      delay: index * 0.1, // Stagger each button's animation
      defaults: { ease: "power2.out" }, // Consistent ease for pop-out and snap-back
    });

    // Tween 1: Pop out to overshoot
    buttonAnimation.fromTo(btn,
      { // Initial state: center, invisible, scaled down, horizontal
        x: 0, y: 0, opacity: 0, scale: 0, rotation: 0,
      },
      { // Target state: overshoot position, scale up, visible
        x: overshootX,
        y: overshootY,
        scale: 1.3,
        opacity: 1,
        rotation: 0,
        duration: popOutDuration, 
      }
    );

    // Tween 2: Snap back to final position (radius 180px)
    buttonAnimation.to(btn,
      {
        x: targetX,
        y: targetY,
        scale: 1, // Back to normal scale
        duration: snapBackDuration,
      },
      `+=${pauseDuration}` // Re-introduce the 0.2s pause
    );
  });
};

onMounted(() => {
  animateButtons()
});
</script>

<template>
  <div class="relative h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden" style="background-image: url('/images/pic/pic_1.jpg');">
    
    <!-- 核心容器 -->
    <div class="relative flex items-center justify-center -translate-y-12">
      
      <!-- 社交按钮容器 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <a 
          v-for="(item, index) in socialLinks" 
          :key="item.name"
          :ref="el => { if(el) btnRefs[index] = el as HTMLElement }"
          href="#" 
          class="absolute z-20 flex items-center gap-2 px-3 py-1.5 border border-white/30 rounded-full text-white shadow-xl opacity-0 scale-0 group whitespace-nowrap hover:scale-110 active:scale-95 transition-[box-shadow,filter,transform] duration-300"
          :class="item.bgColor"
        >
          <img :src="item.icon" :alt="item.name" class="w-5 h-5 object-contain brightness-110">
          <span class="font-medium tracking-wide text-sm leading-none">{{ item.name }}</span>
        </a>
      </div>

      <!-- 彩带动画 -->
      <div class="absolute w-[262px] h-[262px] rounded-full border-[3px] border-transparent border-t-emerald-400 animate-spin-fast-outer"></div>
      <div class="absolute w-[236px] h-[236px] rounded-full border-[3px] border-transparent border-t-amber-400 animate-spin-reverse-fast-medium"></div>
      <div class="absolute w-[210px] h-[210px] rounded-full border-[3px] border-transparent border-t-cyan-400 animate-spin-ultra-fast"></div>

      <!-- 中心大头像 -->
      <div class="relative w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden z-30 bg-black/20 backdrop-blur-sm cursor-pointer">
        <img src="/images/pic/avatar.png" alt="Avatar" class="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500">
      </div>
    </div>

    <!-- 文字内容 -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8 text-white">
      <div class="bg-black/20 p-8 rounded-3xl text-center shadow-2xl border border-white/10 z-10">
        <h3 class="text-2xl">_Smileシ淡莣c</h3>
        <p class=" text-2xl font-light tracking-widest uppercase">浮生一薤露，蜗角争是非</p><br>
        <p>为世界献上美好祝福 <br> 愿世界祝福我</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
@reference "tailwindcss";

.animate-spin-ultra-fast { animation: spin 1.5s linear infinite; }
.animate-spin-reverse-fast-medium { animation: spin-reverse 2.5s linear infinite; }
.animate-spin-fast-outer { animation: spin 4s linear infinite; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
</style>
