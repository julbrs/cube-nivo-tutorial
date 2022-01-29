import { ResponsivePie } from "@nivo/pie";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin } from "antd";

const OrdersByCompany = () => {
  // use hook to grab data from Cube
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Orders.count"],
    timeDimensions: [],
    order: {
      "Orders.count": "desc",
    },
    dimensions: ["Users.company"],
    filters: [],
    limit: 5,
  });

  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || (
          <Spin size="large" />
        )}
      </div>
    );
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }

  const dataSource = resultSet.tablePivot();

  const cleanDataSource = dataSource.map((e) => {
    return {
      id: e["Users.company"],
      value: e["Orders.count"],
    };
  });

  console.log(cleanDataSource);

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <ResponsivePie
        data={cleanDataSource}
        margin={{ top: 30, bottom: 80, left: 60 }}
        colors={{ scheme: "nivo" }}
        innerRadius={0.5}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Elementum Purus Inc.",
            },
            id: "dots",
          },
          {
            match: {
              id: "Nulla Ltd",
            },
            id: "lines",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
        ]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legendOffset: 32,
        }}
      />
    </div>
  );
};

export default OrdersByCompany;
