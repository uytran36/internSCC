import * as React from "react";
import { Table, Space, Button, Input, Row, Col } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const { Search } = Input;

function TableContacts(props: any) {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "ho_va_ten",
      key: "ho_va_ten",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "",
      key: "action",
      render: (text: String, record: Object) => (
        <Space size="middle">
          <EditTwoTone
            className="edit-button"
            onClick={() => props.onClickEdit(record)}
          />
          <DeleteTwoTone
            className="delete"
            onClick={() => props.onClickDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="wrap-table-contacts">
      <Row>
        <Col span={6}>
          <Search
            className="searchTxb"
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={props.onSearch}
          />
        </Col>
        <Col span={6}></Col>
        <Col span={6} className="addButton">
          <Button type="primary" size="large" onClick={props.onClickAdd}>
            +Add
          </Button>
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            size="large"
            onClick={props.onClickLogout}
            href="/"
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={props.data} />
    </div>
  );
}

export default TableContacts;