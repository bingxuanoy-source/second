function readyCharts() {
  if (typeof echarts === "undefined") return;

  const homeChart = document.getElementById("homeChart");
  if (homeChart) {
    const c = echarts.init(homeChart);
    c.setOption({
      color: ["#14b8a6", "#2563eb", "#0d9488"],
      tooltip: { trigger: "axis" },
      legend: { data: ["样本入库", "分析任务", "产业项目"] },
      grid: { left: 40, right: 18, top: 40, bottom: 30 },
      xAxis: { type: "category", data: ["2021", "2022", "2023", "2024", "2025", "2026"] },
      yAxis: { type: "value" },
      series: [
        { name: "样本入库", type: "bar", data: [3200, 7100, 12800, 22100, 38600, 51200] },
        { name: "分析任务", type: "line", smooth: true, data: [180, 420, 860, 1490, 2380, 3120] },
        { name: "产业项目", type: "line", smooth: true, data: [8, 16, 29, 47, 68, 91] }
      ]
    });
    window.addEventListener("resize", () => c.resize());
  }

  const radar = document.getElementById("radarChart");
  if (radar) {
    const c = echarts.init(radar);
    c.setOption({
      color: ["#14b8a6"],
      radar: {
        indicator: [
          { name: "数据层", max: 100 },
          { name: "模型层", max: 100 },
          { name: "分析层", max: 100 },
          { name: "应用层", max: 100 },
          { name: "拓展层", max: 100 }
        ]
      },
      series: [{
        type: "radar",
        data: [{ value: [96, 88, 92, 85, 78], name: "五层能力成熟度", areaStyle: { opacity: 0.2 } }]
      }]
    });
    window.addEventListener("resize", () => c.resize());
  }

  const pie = document.getElementById("dbChart");
  if (pie) {
    const c = echarts.init(pie);
    c.setOption({
      tooltip: { trigger: "item" },
      legend: { bottom: 0 },
      color: ["#0d9488", "#14b8a6", "#2563eb", "#60a5fa", "#f59e0b"],
      series: [{
        type: "pie",
        radius: ["42%", "68%"],
        data: [
          { value: 41, name: "健康对照" },
          { value: 22, name: "代谢相关" },
          { value: 18, name: "消化系统" },
          { value: 12, name: "免疫相关" },
          { value: 7, name: "其他队列" }
        ]
      }]
    });
    window.addEventListener("resize", () => c.resize());
  }
}

document.addEventListener("DOMContentLoaded", readyCharts);
