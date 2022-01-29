import "antd/dist/antd.css";
import UsersPerCity from "./charts/UsersPerCity";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { Row, Col, Typography, PageHeader } from "antd";
import OrdersByGender from "./charts/OrdersByGender";
import OrdersByCompany from "./charts/OrdersByCompany";
import QtyByProdCategoryAndYear from "./charts/QtyByProdCategoryAndYear";
const { Title } = Typography;

const cubejsApi = cubejs(process.env.REACT_APP_CUBE_TOKEN, {
  apiUrl: process.env.REACT_APP_CUBE_API,
});

function App() {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <PageHeader
        onBack={() => null}
        title="My Nivo Dashboard built with Cube!"
        subTitle="Tutorial"
      />
      <div style={{ padding: "0 50px" }}>
        <Row>
          <Col
            span={12}
            style={{
              padding: "5px",
            }}
          >
            <div style={{ padding: "5px", border: "1px lightgrey solid" }}>
              <Title level={3}>Users Per City</Title>
              <UsersPerCity />
            </div>
          </Col>
          <Col
            span={12}
            style={{
              padding: "5px",
            }}
          >
            <div style={{ padding: "5px", border: "1px lightgrey solid" }}>
              <Title level={3}>Orders by Gender</Title>
              <OrdersByGender />
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            span={10}
            style={{
              padding: "5px",
            }}
          >
            <div style={{ padding: "5px", border: "1px lightgrey solid" }}>
              <Title level={3}>Orders by Company (TOP 5)</Title>
              <OrdersByCompany />
            </div>
          </Col>
          <Col
            span={14}
            style={{
              padding: "5px",
            }}
          >
            <div style={{ padding: "5px", border: "1px lightgrey solid" }}>
              <Title level={3}>Product Qty by Category and Year</Title>
              <QtyByProdCategoryAndYear />
            </div>
          </Col>
        </Row>
      </div>
    </CubeProvider>
  );
}

export default App;
