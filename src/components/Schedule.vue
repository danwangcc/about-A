<template>
  <div class="relative h-screen w-full bg-cover bg-center bg-fixed flex items-center justify-center" style="background-image: url('/images/pic/pic_2.jpg');">
    <!-- 主容器 -->
    <div class="flex flex-col md:flex-row w-full h-full pt-16 md:pt-20 pb-2 px-6 md:px-12 gap-3 md:gap-8">
      
      <!-- 左侧部分：技术栈展示 (移动端不强制伸展) -->
      <div class="flex-initial md:flex-1 flex flex-col justify-center space-y-3 md:space-y-6 tech-stack-container">
        <div v-for="(tech, index) in techStack" :key="tech.name" class="flex flex-col">
          <!-- 进度条容器 -->
          <div class="relative flex items-center h-7 md:h-10 w-full">
            <!-- 进度条主体 (GSAP 动画目标) -->
            <div 
              :ref="el => { if(el) barRefs[index] = el as HTMLElement }"
              class="absolute top-0 left-0 h-full tech-bar-pattern flex items-center justify-between px-4 overflow-hidden z-10"
              :style="{ backgroundColor: tech.color, width: '0%' }"
            >
              <!-- 技术名称 (左侧) -->
              <span class="text-white font-bold capitalize text-xs md:text-sm whitespace-nowrap drop-shadow-md">
                {{ tech.name }}
              </span>

              <!-- 百分比文字 (右侧) -->
              <span 
                :ref="el => { if(el) textRefs[index] = el as HTMLElement }"
                class="text-white font-mono text-base md:text-lg tabular-nums whitespace-nowrap drop-shadow-md"
              >
                0%
              </span>
              
              <!-- 底部 6px 线 -->
              <div class="absolute bottom-0 left-0 w-full h-[4px] md:h-[6px] bg-black/20"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧部分：诗意文字 (移动端占据剩余空间) -->
      <div class="flex-auto md:flex-1 w-full flex flex-col items-center justify-center overflow-hidden">
        <div class="text-center text-amber-50/90 max-w-sm md:max-w-lg w-full px-6 py-6 md:px-8 md:py-12 overflow-hidden bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
          <h2 class="text-xl md:text-3xl font-light mb-1 uppercase tracking-widest">神眷之櫻花</h2>

          <!-- 分割线 (80% 宽度，极小上下间距) -->
          <div class="w-[80%] h-px bg-amber-50/20 mx-auto mb-4 md:mb-6"></div>

          <!-- 诗句内容 (移动端 12px) -->
          <div class="poetic-lines space-y-2 text-xs md:text-lg font-light tracking-[0.15em] leading-relaxed">
            <p>我总是忍不住回想起那座城市的夜晚</p>
            <p>灯火燃成的篝火</p>
            <p>我坐在天台上时光短促又漫长</p>
            <p>风从我的耳边流过带来整个世界的声音</p>
            <p>风中</p>
            <p>有人弹唱</p>
            <p>有人舞蹈</p>
            <p>有人相爱</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

interface Tech {
  name: string
  level: number
  color: string
}

const techStack: Tech[] = [
  { name: 'Vue', level: 80, color: '#42b883' },
  { name: 'React', level: 50, color: '#88ce02' },
  { name: 'TypeScript', level: 60, color: '#3178c6' },
  { name: 'Tailwind CSS', level: 70, color: '#38bdf8' },
  { name: 'Node.js / Express', level: 50, color: '#83cd29' },
]

const barRefs = ref<HTMLElement[]>([])
const textRefs = ref<HTMLElement[]>([])

onMounted(() => {
  const bars = barRefs.value
  const texts = textRefs.value

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 只有左侧进度条有动画
        techStack.forEach((tech, index) => {
          const bar = bars[index]
          const text = texts[index]
          if (bar && text) {
            const tl = gsap.timeline()
            
            tl.to(bar, {
              width: `${tech.level}%`,
              duration: 1.5,
              delay: index * 0.1,
              ease: "power2.out"
            }, 0)

            const counter = { val: 0 }
            tl.to(counter, {
              val: tech.level,
              duration: 1.5,
              delay: index * 0.1,
              ease: "power2.out",
              onUpdate: () => {
                text.innerText = `${Math.floor(counter.val)}%`
              }
            }, 0)
          }
        })
        observer.disconnect()
      }
    })
  }, { threshold: 0.2 })

  const container = document.querySelector('.tech-stack-container')
  if (container) {
    observer.observe(container)
  }
})
</script>

<style scoped>
/* 斜纹图案与动画 (反向倾斜，向右滚动) */
.tech-bar-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.15) 30px,
    rgba(0, 0, 0, 0.05) 30px,
    rgba(0, 0, 0, 0.05) 60px
  );
  background-size: 84.85px 100%;
  animation: move-stripes-right 2s linear infinite;
}

@keyframes move-stripes-right {
  from { background-position: 0 0; }
  to { background-position: 84.85px 0; }
}
</style>
