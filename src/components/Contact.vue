<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const contactItems = [
  { value: '歌单', hoverValue: '我的歌单', color: '#D45E54', link: 'https://music.163.com/#/user/home?id=13625313867', action: 'link' },
  { value: '企鹅', hoverValue: '1318704976', color: '#6D8299', action: 'copy' },
  { value: '私云', hoverValue: '暂无', color: '#AD71B2', action: 'none' },
  { value: '邮箱', hoverValue: '1318704976@qq.com', color: '#8E9775', action: 'copy' }
]

const hoveredIndex = ref<number | null>(null)
const activeMessages = ref<Record<number, string>>({})

const handleClick = (index: number, item: any) => {
  if (item.action === 'link') {
    window.open(item.link, '_self')
    return
  }

  let msg = ''
  if (item.action === 'copy') {
    navigator.clipboard.writeText(item.hoverValue).then(() => {
      msg = '已复制'
      showStatus(index, msg)
    })
  } else if (item.action === 'none') {
    msg = '暂无内容'
    showStatus(index, msg)
  }
}

const showStatus = (index: number, msg: string) => {
  activeMessages.value[index] = msg
  setTimeout(() => {
    delete activeMessages.value[index]
  }, 2000)
}

// 存活时间逻辑
const uptime = ref('')
let timer: number | null = null

const updateTimer = () => {
  const now = new Date()
  const diff = now.getTime() - 1776228345490

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  uptime.value = `${days}天${hours}小时${minutes}分${seconds}秒`
}

onMounted(() => {
  updateTimer()
  timer = window.setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="w-full py-2 px-6 md:px-12 lg:px-24">
    <div class="max-w-6xl mx-auto flex flex-col items-center">
      
      <!-- 顶部标题 -->
      <div class="text-center mb-4">
        <h2 class="text-xl md:text-2xl font-bold tracking-widest">
          Contact With Me
        </h2>
      </div>

      <!-- 联系方式栅格 (2x2 Mobile, 1x4 MD) -->
      <div class="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-[6px] mb-6">
        <div 
          v-for="(item, index) in contactItems" 
          :key="index"
          @click="handleClick(index, item)"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          class="text-white text-center p-2 border border-white/5 cursor-pointer transition-all hover:outline hover:outline-[5px] hover:outline-gray-400 z-10 select-none flex items-center justify-center min-h-[44px]"
          :style="{ backgroundColor: item.color }"
        >
          <span class="text-sm md:text-base font-bold tracking-widest truncate w-full text-center">
            {{ activeMessages[index] || (hoveredIndex === index ? item.hoverValue : item.value) }}
          </span>
        </div>
      </div>

      <!-- 底部版权与存活时间 -->
      <div class="text-center space-y-4 opacity-40 select-none cursor-default">
        <div class="text-xs md:text-sm tracking-[0.1em]">
          <p>© 2026 _Smileシ淡莣c</p>
          <p>_Smileシ淡莣c の主页已存活{{ uptime }}</p>
        </div>
      </div>

    </div>
  </div>
</template>
