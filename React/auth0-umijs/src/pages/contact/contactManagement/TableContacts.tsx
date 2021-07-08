import { Table, Space, Button, Input, Row, Col } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const { Search } = Input;

function TableContacts(props: any) {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'ho_va_ten',
      key: 'ho_va_ten',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '',
      key: 'action',
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

  const data = [
    {
      id: '1',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '2',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '3',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '4',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '5',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '6',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '7',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '8',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '9',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '10',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '11',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '12',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '13',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
    },
    {
      id: '14',
      ho_va_ten: 'Trần Uy',
      sdt: '019165495',
      gender: 'male',
      age: '21',
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
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
      />
    </div>
  );
}

export default TableContacts;
