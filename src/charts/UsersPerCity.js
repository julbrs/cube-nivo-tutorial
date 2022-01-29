import { ResponsiveBar } from "@nivo/bar";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin } from "antd";

const UsersPerCity = () => {
  // use hook to grab data from Cube
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Users.count"],
    timeDimensions: [],
    order: {
      "Users.count": "desc",
    },
    dimensions: ["Users.city"],
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

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <ResponsiveBar
        data={dataSource}
        keys={["Users.count"]}
        indexBy="Users.city"
        margin={{ top: 0, bottom: 80, left: 60 }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#eed312",
            size: 4,
            padding: 1,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: {
              id: "Users.count",
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

export default UsersPerCity;
