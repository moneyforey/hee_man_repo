import Chart from "react-apexcharts";

const PIchart = ({ options }) => {
  return (
    <>
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%"
        height="300"
      />
    </>
  );
};

export default PIchart;
