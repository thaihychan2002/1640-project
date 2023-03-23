import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";
import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import BarChart from "./BarChart";
import Contributors from "./Contributor";
import PieChart from "./PieChart";

export default function Report() {
  const chartName = [
    <span>Total ideas</span>,
    <span>Ideas per day</span>,
    <span>Contributors</span>,
  ];
  const childrenReport = [<PieChart />, <BarChart />, <Contributors />];
  const iconsChart = [
    <PieChartOutlined />,
    <BarChartOutlined />,
    <BarChartOutlined />,
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 15 }}>
        Report Ideas
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          width: 500,
          height: 550,
        }}
      >
        <center>Report of ideas</center>
        <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(3).fill(null).map((_, i) => {
            return {
              label: (
                <span>
                  {iconsChart[i]}
                  {chartName[i]}
                </span>
              ),
              key: i,
              children: childrenReport[i],
            };
          })}
        />
      </Modal>
    </div>
  );
}
