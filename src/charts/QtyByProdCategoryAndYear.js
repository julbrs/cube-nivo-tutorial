import { ResponsiveAreaBump } from "@nivo/bump";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin } from "antd";

const QtyByProdCategoryAndYear = () => {
  // use hook to grab data from Cube
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["LineItems.quantity"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "year",
        dateRange: ["2019-01-01", "2023-12-31"],
      },
    ],
    order: {
      "LineItems.quantity": "desc",
    },
    dimensions: ["ProductCategories.name"],
    filters: [],
    limit: 5000,
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
      year: parseInt(e["Orders.createdAt.year"].substring(0, 4)),
      category: e["ProductCategories.name"],
      value: parseInt(e["LineItems.quantity"]),
    };
  });

  const results = Object.values(
    cleanDataSource.reduce((r, { year, category, value }) => {
      r[category] ??= { id: category, data: [] };
      r[category].data.push({
        x: year,
        y: value,
      });
      return r;
    }, {})
  );

  // sort data array
  results.forEach((r) => {
    r.data.sort((a, b) => {
      return a.x - b.x;
    });
  });

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <ResponsiveAreaBump
        data={results}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
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
              id: "Clothing",
            },
            id: "dots",
          },
          {
            match: {
              id: "Beauty",
            },
            id: "lines",
          },
        ]}
        startLabel="id"
        endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    </div>
  );
};

export default QtyByProdCategoryAndYear;
