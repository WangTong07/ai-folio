document.addEventListener('DOMContentLoaded', function() {
    // 星空银河canvas动画
    const canvas = document.getElementById('star-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        // 响应式自适应
        window.addEventListener('resize', () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            // canvas.height = h; // <-- 只把它注释掉
        });
        // 星星参数
        const STAR_NUM = 220;
        const stars = [];
        for (let i = 0; i < STAR_NUM; i++) {
            const r = Math.random() * 1.2 + 0.3;
            const x = Math.random() * w;
            const y = Math.random() * h;
            const speed = 0.02 + Math.random() * 0.03;
            const alpha = 0.5 + Math.random() * 0.5;
            stars.push({x, y, r, alpha, twinkle: Math.random() * Math.PI * 2, speed});
        }
        // 银河带参数
        function drawGalaxy() {
            const grad = ctx.createLinearGradient(w*0.2, h*0.5, w*0.8, h*0.6);
            grad.addColorStop(0, 'rgba(126,34,206,0.08)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.18)');
            grad.addColorStop(1, 'rgba(37,99,235,0.08)');
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.filter = 'blur(32px)';
            ctx.beginPath();
            ctx.ellipse(w/2, h/2, w*0.38, h*0.09, -0.2, 0, 2*Math.PI);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
        }
        // 流星参数
        let meteors = [];
        function spawnMeteor() {
            const startX = Math.random() * w * 0.7;
            const startY = Math.random() * h * 0.3;
            const len = 180 + Math.random() * 80;
            const angle = Math.PI/4 + (Math.random()-0.5)*0.2;
            const speed = 8 + Math.random()*4;
            meteors.push({x: startX, y: startY, len, angle, speed, alpha: 1});
        }
        setInterval(() => { if (Math.random() > 0.7) spawnMeteor(); }, 3000);
        // 动画主循环
        function animate() {
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#121212';
            ctx.fillRect(0, 0, w, h);
            ctx.restore();
            // 画银河
            drawGalaxy();
            // 画星星
            for (let s of stars) {
                s.twinkle += s.speed;
                ctx.save();
                ctx.globalAlpha = s.alpha * (0.7 + 0.3*Math.sin(s.twinkle));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#7E22CE';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            }
            // 画流星
            meteors = meteors.filter(m => m.alpha > 0.05);
            for (let m of meteors) {
                ctx.save();
                ctx.globalAlpha = m.alpha;
                ctx.strokeStyle = 'rgba(255,255,255,0.85)';
                ctx.shadowColor = '#7E22CE';
                ctx.shadowBlur = 16;
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x + Math.cos(m.angle)*m.len, m.y + Math.sin(m.angle)*m.len);
                ctx.stroke();
                ctx.restore();
                m.x += Math.cos(m.angle)*m.speed;
                m.y += Math.sin(m.angle)*m.speed;
                m.alpha *= 0.96;
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
// 粒子背景动画初始化 (已添加安全网)
try {
  // 我们尝试运行这段代码
  tsParticles.load("tsparticles", {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    particles: {
      number: { value: 100 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: { value: 2, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    retina_detect: true
  });
} catch (e) {
  // 如果上面的代码失败了（比如现在），就执行这里，但不会让整个网页崩溃
  console.log("背景特效加载失败，但不影响其他功能。错误信息:", e);
}

    // 移动端菜单按钮
    const menuBtn = document.querySelector('header button.md\\:hidden');
    const nav = document.querySelector('header nav');
    if(menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('hidden');
        });
    }

    // 项目分类筛选
    const filterBtns = document.querySelectorAll('.project-filter');
    const cards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-cyber-purple', 'text-white'));
            btn.classList.add('active', 'bg-cyber-purple', 'text-white');
            const cat = btn.getAttribute('data-category');
            cards.forEach(card => {
                if(cat === 'all' || card.getAttribute('data-category') === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 项目详情弹窗数据（可后续自定义详细介绍）
    const projectDetails = [
      { title: '解梦小助手（测试号）', img: 'images/project-display-1.png', stack: 'Cursor + Dify + 微信开发者工具', desc: '通过用户对梦境的自由描述，AI以“专业解梦师+灵性心理师”的语气生成深度梦境解析，包含情绪分析、象征意义、潜意识暗示与建议。作为第一个尝试落地的AI小程序，虽仍为测试号，但是我从0到1的代表作品。', themeColor: 'cyber-purple' },
      { title: '梦境解析精灵（已上线）', img: 'images/project-display-2.png', stack: 'Coze + 小微智能体', desc: '为解决微信小程序测试号无法上线的问题，我以Coze平台重构了解梦功能，通过小微智能体上线至正式微信端。支持真实用户使用，亲友试玩反馈良好，弥补了第一个项目的遗憾，成为可用版本的“解梦助手”。', themeColor: 'cyber-blue' },
      { title: '报报小助手（双版本）', img: 'images/project-display-3.png', stack: 'Cursor + Coze + 微信开发者工具、小微智能体', desc: '一款根据关键词自动生成日报/周报的小程序，拥有“测试号版本”和“已上线智能体版本”。支持自动结构化输出、时间自动填写，是我在AI内容生成与产品体验上的又一次实践。', themeColor: 'cyber-green' },
      { title: 'AI智能报告神器（国内版 + 国际版）', img: 'images/project-display-4.png', stack: 'Vue 3 + Gitee / GitHub + 腾讯云托管 / Vercel', desc: '输入零碎工作记录，AI自动生成标准化日报/周报，支持多模式切换、缓存姓名、一键复制等贴心功能。从一个内容生成器进化为“懂你”的报告助理，国内外均有部署版本，体现了我的系统设计能力和迭代思维。', themeColor: 'cyber-pink' },
      { title: 'AI爆款文案神器', img: 'images/project-display-5.png', stack: 'Vue 3 + GitHub + Vercel', desc: '输入关键词+选择风格，AI秒出爆款文案（朋友圈、小红书、搞笑病娇等）。采用深度Prompt调教，确保每种风格精准可控。UI/UX设计历经多轮打磨，现已形成兼具趣味性与实用性的“灵感乐园”。', themeColor: 'cyber-purple' },
      { title: '本地AI知识助理', img: 'images/project-display-6.png', stack: 'Transformers.js + Whisper + PDF.js + Tesseract.js + Vercel', desc: '可在浏览器中本地解析音频、PDF、图片等私有文件，保障隐私前提下完成摘要、提取与问答。无需上传服务器，适合对隐私敏感的用户或企业内使用，是我对AI“在端运行”理解的实用尝试。', themeColor: 'cyber-blue' },
      { title: '涂鸦跳跃·赛博版', img: 'images/project-display-7.png', stack: 'Cursor', desc: '用Cursor制作的一款网页小游戏，作为AI开发间隙的“创意放松项目”，让我尝试了游戏逻辑、Canvas绘图与简单碰撞判断，是对前端能力的补充练习。', themeColor: 'cyber-purple' },
      { title: '火柴人视频生成器', img: 'images/project-display-8.png', stack: 'Coze 工作流 + 剪映小助手', desc: '输入脚本，一键生成火柴人动画视频。通过调用剪映小助手实现视频创作，结合Coze智能体，实现“文生视频”流程自动化，探索了AIGC在短视频方向的应用。', themeColor: 'cyber-blue' },
      { title: '萌宝小帮手', img: 'images/project-display-9.png', stack: '豆包智能体平台', desc: '为身边的新手妈妈朋友打造的实用问答智能体，解决育儿初期的各种问题。是我第一个“从生活需求出发”的AI产品，验证了AI在人际关系和日常生活中的实际价值。', themeColor: 'cyber-green' },
    ];

    // 弹窗相关逻辑
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');
    const modalCard = modal.querySelector('div.bg-cyber-gray');

    // 边框色class映射
    const borderMap = {
      'cyber-purple': ['border-cyber-purple/40', 'shadow-cyber-purple/60', 'text-cyber-purple'],
      'cyber-blue': ['border-cyber-blue/40', 'shadow-cyber-blue/60', 'text-cyber-blue'],
      'cyber-green': ['border-cyber-green/40', 'shadow-cyber-green/60', 'text-cyber-green'],
      'cyber-pink': ['border-cyber-pink/40', 'shadow-cyber-pink/60', 'text-cyber-pink'],
    };

    // 打开弹窗
    function openModal(index) {
      const data = projectDetails[index];
      if (data) {
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        // 新增技术栈显示
        const stackElem = document.getElementById('modal-stack');
        if (stackElem) {
          stackElem.textContent = `技术栈：${data.stack}`;
          stackElem.className = `mb-4 font-semibold text-lg text-${data.themeColor}`;
        }
        modalDesc.textContent = data.desc;
        // 先移除所有色class
        Object.values(borderMap).forEach(arr => {
          arr.forEach(cls => modalCard.classList.remove(cls));
        });
        // 添加当前色class
        if (borderMap[data.themeColor]) {
          modalCard.classList.add(borderMap[data.themeColor][0]); // border
          modalCard.classList.add(borderMap[data.themeColor][1]); // shadow
          modalTitle.className = `text-3xl font-extrabold mb-6 ${borderMap[data.themeColor][2]}`;
        }
        modal.classList.remove('hidden');
      }
    }
    // 关闭弹窗
    function closeModal() {
      modal.classList.add('hidden');
    }

    // 卡片点击事件
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', function() {
        const idx = parseInt(card.getAttribute('data-index'));
        openModal(idx);
      });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    // ====== 时间线流光与卡片高亮联动 ======
    (function(){
      const timeline = document.querySelector('.relative > .absolute.bg-gradient-to-b');
      if (!timeline) return;
      const cards = document.querySelectorAll('.timeline-card');
      const glow = timeline.querySelector('.animate-flow-glow');
      if (!glow || !cards.length) return;
      // 获取每个卡片的中心相对timeline的top
      const timelineRect = timeline.getBoundingClientRect();
      const cardCenters = Array.from(cards).map(card => {
        const rect = card.getBoundingClientRect();
        return (rect.top + rect.bottom) / 2 - timelineRect.top;
      });
      // 动画帧
      function animateHighlight() {
        // 流光top相对timeline的top
        const glowRect = glow.getBoundingClientRect();
        const glowTop = glowRect.top - timelineRect.top + glowRect.height/2;
        // 找到最近的卡片
        let minDist = Infinity, minIdx = 0;
        cardCenters.forEach((center, i) => {
          const dist = Math.abs(center - glowTop);
          if (dist < minDist) { minDist = dist; minIdx = i; }
        });
        // 高亮最近的卡片
        cards.forEach((card, i) => {
          if (i === minIdx) {
            // 取边框色
            let ring = 'ring-white';
            if (card.classList.contains('border-cyber-purple/30')) ring = 'ring-cyber-purple/60';
            if (card.classList.contains('border-cyber-blue/30')) ring = 'ring-cyber-blue/60';
            if (card.classList.contains('border-cyber-green/30')) ring = 'ring-cyber-green/60';
            if (card.classList.contains('border-cyber-pink/30')) ring = 'ring-cyber-pink/60';
            card.classList.add('ring-4', ring, 'ring-opacity-90', 'scale-105', 'z-10');
            card.style.transition = 'box-shadow 0.3s, transform 0.3s';
          } else {
            card.classList.remove('ring-4','ring-cyber-purple/60','ring-cyber-blue/60','ring-cyber-green/60','ring-cyber-pink/60','ring-white','ring-opacity-90','scale-105','z-10');
          }
        });
        requestAnimationFrame(animateHighlight);
      }
      animateHighlight();
    })();
}); 