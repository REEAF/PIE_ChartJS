let ctx = document.getElementById("myChart").getContext("2d");
let labels = ["Pizza 🍕", "Taco 🌮", "Hot Dog 🌭", "Sushi 🍣"];
//get emojies from labels;
let emoji = labels.map((item) => {
  return item.slice(-2);
});
let font = {
  weight: "bold",
  size: "14",
};
let textColor = "#fff";
let colors = ["#FB3640", "#FE5000", "#43AA8B", "#253D5B"];

// Register the chartjs-plugin-datalabels to all charts:
Chart.register(ChartDataLabels);

let myChart = new Chart(ctx, {
  type: "pie",
  data: {
    datasets: [
      {
        data: [30, 10, 40, 20],
        backgroundColor: colors,
      },
    ],
    labels: labels,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        onHover: () => {
          document.body.style.cursor = "pointer";
        },
        onLeave: () => {
          document.body.style.cursor = "unset";
        },
        labels: {
          color: textColor,
          usePointStyle: true,
          font: font,
          padding: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: ({ label, formattedValue }) => {
            return ` ${label.slice(0, -3)}: ${formattedValue}`;
          },
        },
      },
      datalabels: {
        color: textColor,
        anchor: "end",
        align: "start",
        offset: -10,
        borderWidth: 2,
        borderColor: textColor,
        borderRadius: 25,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: font,
        formatter: (value, { dataIndex }) => {
          return `${labels[dataIndex].slice(-2)}: ${value} %`;
        },
      },
    },
  },
});
