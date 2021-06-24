export const optionsHome = {
  xaxis: {
    categories: [
      "Intelligence",
      "Strength",
      "Speed",
      "Durability",
      "Power",
      "Combat",
    ],
    labels: {
      show: true,
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 300,
        cssClass: "apexcharts-xaxis-label",
        colors: [
          "#ffffff",
          "#ffffff",
          "#ffffff",
          "#ffffff",
          "#ffffff",
          "#ffffff",
        ],
      },
    },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    theme: "dark",
  },
  chart: {
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2.5,
  },
  plotOptions: {
    radar: {
      size: 80,
      offsetX: -10,
      offsetY: 10,
    },
  },
};
