import { ResponsiveBar } from "@nivo/bar";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin } from "antd";

const OrdersByGender = () => {
  // use hook to grab data from Cube
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "year",
      },
    ],
    order: {
      "Orders.count": "desc",
    },
    dimensions: ["Users.gender"],
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
      year: e["Orders.createdAt.year"].substring(0, 4),
      gender: e["Users.gender"],
      orders: e["Orders.count"],
    };
  });

  const results = Object.values(
    cleanDataSource.reduce((r, { year, gender, orders }) => {
      r[year] ??= { year, male: 0, female: 0 };
      r[year][gender] = orders;
      return r;
    }, {})
  );

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <ResponsiveBar
        data={results}
        keys={["male", "female"]}
        indexBy="year"
        margin={{ top: 10, bottom: 40, left: 60, right: 120 }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "male",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default OrdersByGender;
