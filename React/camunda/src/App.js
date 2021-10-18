import Viewer from "./Viewer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  const [xml, setXml] = useState("");
  const [statistics, setStatistics] = useState([]);
  const [listProcessInstances, setListProcessInstances] = useState([]);
  const [taskType, setTaskType] = useState("");
  const [activityInstance, setActivityInstance] = useState(null);
  const [historyActivityInstance, setHistoryActivityInstance] = useState([]);
  const [instanceInfo, setInstanceInfo] = useState(null);

  const setDiagram = (id) => {
    axios
      .get(
        "http://localhost:8080/engine-rest/process-definition/key/" +
          id +
          "/xml"
      )
      .then((res) => {
        setXml(res.data);
      });
    axios
      .get(
        "http://localhost:8080/engine-rest/process-definition/key/" +
          id +
          "/statistics"
      )
      .then((res) => {
        setStatistics(res.data);
      });

    axios
      .get("http://localhost:8080/engine-rest/history/activity-instance")
      .then((res) => {
        setHistoryActivityInstance(res.data);
      });
  };

  useEffect(() => {
    setDiagram("SC");
  }, []);

  const diagram = {
    xml: xml,
    statistics: statistics,
    historyActivityInstance: historyActivityInstance,
    activityInstance: activityInstance,
    instanceInfo: instanceInfo,
  };

  const onClickDetail = (record) => {
    axios
      .get(
        "http://localhost:8080/engine-rest/history/process-instance",
        {
          headers: { "Content-Type": "application/json" },
        },
        {
          params: {
            processInstanceId: record.id,
            sortBy: "startTime",
            sortOrder: "asc",
          },
        }
      )
      .then((res) => {
        setInstanceInfo(res.data[0]);
      });
    axios.get(
      "http://localhost:8080/engine-rest/process-instance/" +
        record.id +
        "/activity-instances"
    ).then(res => {setActivityInstance(res.data)});
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onClickDetail(record)}>
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Viewer
        diagram={diagram}
        setListProcessInstances={setListProcessInstances}
        setTaskType={setTaskType}
        setDiagram={setDiagram}
        setInstanceInfo={setInstanceInfo}
        setActivityInstance={setActivityInstance}
      />
      <div id="modeler"></div>
      <div>
        <h2>Process instance</h2>
        <Table columns={columns} dataSource={listProcessInstances} />
      </div>
    </div>
  );
}

export default App;
