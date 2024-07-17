import { Flex, Text } from "@chakra-ui/react";
import ApexChart from "react-apexcharts";

const series = [76];
const options: any = {
  chart: {
    type: "radialBar",
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: "#999",
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "22px",
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
    },
  },
  labels: ["Average Results"],
};

const CommunityScore = () => {
  return (
    <Flex minW={"440px"} flexDir={"column"} py={"20px"} px={8} justify={"space-between"} rounded={16} bgColor={"#14151D"}>
      <Text color={"#EBFF00"} fontSize={16} textAlign={"right"}>
        7 days remaining
      </Text>

      <ApexChart options={options} series={series} type="radialBar" />

      <Text fontSize={16}>
        Perform 100,000 forges as a community for a special reward!
      </Text>
    </Flex>
  );
};

export default CommunityScore;
