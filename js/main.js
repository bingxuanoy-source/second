(function () {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
  });

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.floor(target / 48));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString() + suffix;
    }, 24);
  });

  const canvas = document.getElementById("heroCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007
    }));
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(94,234,212,0.75)";
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * canvas.width, d.y * canvas.height, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = "rgba(37,99,235,0.18)";
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = (dots[i].x - dots[j].x) * canvas.width;
          const dy = (dots[i].y - dots[j].y) * canvas.height;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.globalAlpha = 1 - dist / 120;
            ctx.beginPath();
            ctx.moveTo(dots[i].x * canvas.width, dots[i].y * canvas.height);
            ctx.lineTo(dots[j].x * canvas.width, dots[j].y * canvas.height);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  const nodes = document.querySelectorAll(".arch-node");
  const detail = document.getElementById("archDetail");
  if (nodes.length && detail) {
    const copy = {
      omics: ["多组学整合分析", "将宏基因组、代谢组、转录组与临床表型对齐，形成可追溯的样本-特征-结局数据链路，支撑队列研究与标志物发现。"],
      qa: ["AI 问答智库", "面向临床与科研问题的检索增强问答，把文献、指南、内部知识库与分析报告组织成可引用的答案。"],
      kg: ["微生态知识图谱", "构建菌株、通路、疾病、干预措施之间的关系网络，为推理、推荐和产业配方提供结构化知识。"],
      seq: ["测序与质控中枢", "覆盖样本接收、文库构建、长读长/短读长测序与多级质控，确保进入模型的数据可审计。"],
      agent: ["智能体工作台", "把分析任务编排为可复用智能体：从原始数据到报告、图表与建议，实现标准化交付。"],
      industry: ["产业拓展引擎", "连接制剂、功能食品与精准营养场景，把科研结论转化为可落地的产品与服务方案。"]
    };
    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        nodes.forEach((n) => n.classList.remove("active"));
        node.classList.add("active");
        const item = copy[node.dataset.key];
        detail.innerHTML = `<h3>${item[0]}</h3><p>${item[1]}</p>`;
      });
    });
  }

  const chatBody = document.getElementById("chatBody");
  const chips = document.querySelectorAll(".chip");
  const answers = {
    "平台能做什么？": "平台覆盖测序分析、微生物 AI 大模型、知识图谱、成果交付与产业拓展。典型交付包括检测报告、风险模型、配方建议与科研论文级结果包。",
    "数据从哪里来？": "核心库包含 5 万+人类肠道宏基因组全长数据，来自多中心队列、合作医院与公开高质量数据集，经统一 SOP 与质控后入库。",
    "如何启动合作？": "可在“联系我们”提交项目咨询。我们会在 2 个工作日内匹配临床、科研或产业顾问，确认样本类型、分析目标和交付周期。"
  };
  const addBubble = (text, who) => {
    if (!chatBody) return;
    const div = document.createElement("div");
    div.className = "bubble " + who;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.textContent;
      addBubble(q, "user");
      setTimeout(() => addBubble(answers[q] || "我已记录该问题，顾问会尽快回复。", "bot"), 380);
    });
  });

  document.querySelectorAll("form[data-fake]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const toast = document.getElementById("toast");
      if (toast) {
        toast.style.display = "block";
        toast.textContent = "提交成功，顾问将在 2 个工作日内与您联系。";
        setTimeout(() => (toast.style.display = "none"), 2800);
      }
      form.reset();
    });
  });
})();
