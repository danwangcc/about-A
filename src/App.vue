<script setup lang="ts">
import { ref } from 'vue'
import Home from './components/Home.vue'
import Schedule from './components/Schedule.vue'
import Experience from './components/Experience.vue'
import Hobby from './components/Hobby.vue'
import Contact from './components/Contact.vue'

// 定义导航菜单数据
const navItems = [
  { label: 'Home', anchor: 'home' },
  { label: 'Schedule', anchor: 'schedule' },
  { label: 'Experience', anchor: 'experience' },
  { label: 'Hobby', anchor: 'hobby' },
  { label: 'Contact', anchor: 'contact' },
]

const options = ref({
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  navigation: true,
  autoScrolling: true,
  scrollBar: false,
  verticalCentered: false,
  anchors: navItems.map(item => item.anchor),
  menu: '#menu',
  css3: false, // 必须设为 false，否则背景固定效果会失效
  scrollingSpeed: 600,
})
</script>

<template>
  <div class="app-wrapper">
    <!-- 固定顶部 Header -->
    <header class="fixed top-0 left-0 w-full h-10 md:h-14 flex items-center justify-between px-8 bg-white opacity-90 z-100 transition-all shadow-sm">
      <div class="avatar flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-black/10 border border-black/20 flex items-center justify-center overflow-hidden">
          <img src="/images/pic/avatar.webp" alt="avatar">
        </div>
        <span class="text-black font-medium text-lg tracking-wider">danwangcc</span>
      </div>

      <nav id="menu" class="hidden md:flex items-center gap-8">
        <li v-for="item in navItems" :key="item.anchor" :data-menuanchor="item.anchor" class="list-none">
          <a :href="'#' + item.anchor" class="text-black/60 hover:text-black transition-colors font-medium border-b-2 border-transparent hover:border-black/20 pb-1">
            {{ item.label }}
          </a>
        </li>
      </nav>
    </header>

    <full-page id="fullpage" :options="options">
      <div class="section">
        <Home />
      </div>
      <div class="section">
        <Schedule />
      </div>
      <div class="section">
        <Experience />
      </div>
      <div class="section">
        <Hobby />
      </div>
      <div class="section fp-auto-height">
        <Contact />
      </div>
    </full-page>
  </div>
</template>

<style>
@reference "tailwindcss";

.section {
  padding: 0 !important;
}

/* 针对 fullpage.js 的固定背景效果优化 */
.fp-section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 核心：使背景固定 */
}

/* 隐藏 fullpage.js 水印 */
.fp-watermark {
  display: none !important;
}

/* 自定义导航小圆点样式 */
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: transparent !important;
  border: 1.5px solid #fff !important; /* 白色圆框 */
  opacity: 1 !important; /* 确保不透明 */
  transition: all 0.3s ease;
}

/* 激活状态样式 */
#fp-nav ul li a.active span,
.fp-slidesNav ul li a.active span {
  background: #fff !important; /* 白色实心 */
}

/* 悬停时轻微填充感（可选） */
#fp-nav ul li a:hover span,
.fp-slidesNav ul li a:hover span {
  background: rgba(255, 255, 255, 0.2) !important;
}
</style>
