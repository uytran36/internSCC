import { Table, Tag, Button, Row, Col } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '#',
    dataIndex: 'id ',
    key: 'id',
  },
  {
    title: 'Thời gian',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Facebook',
    dataIndex: 'mess',
    key: 'mess',
    render: (text, record) => (
      <div>
        <Row>
          <Col span="12"> {text}</Col>
          <Col span="12">
            <Tag color="volcano">{Math.round((text / record.sum) * 100)}%</Tag>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    title: 'Zalo',
    key: 'zalo',
    dataIndex: 'zalo',
    render: (text, record) => (
      <div>
        <Row>
          <Col span="12"> {text}</Col>
          <Col span="12">
            <Tag color="green">{Math.round((text / record.sum) * 100)}%</Tag>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    title: 'Livechat',
    key: 'livechat',
    dataIndex: 'livechat',
    render: (text, record) => (
      <div>
        <Row>
          <Col span="12"> {text}</Col>
          <Col span="12">
            <Tag color="geekblue">{Math.round((text / record.sum) * 100)}%</Tag>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    title: 'Tổng',
    key: 'sum',
    dataIndex: 'sum',
  },
];

const data = [
  {
    id: 1,
    date: '01/01/2021',
    mess: 315,
    zalo: 123,
    livechat: 645,
    sum: 1083,
  },
  {
    id: 2,
    date: '02/01/2021',
    mess: 334,
    zalo: 625,
    livechat: 244,
    sum: 1203,
  },
];

const TableComponent = () => {
  return (
    <div>
      <div>
        <Row>
          <Col flex="300px">
            <b>Chi tiết số lượng chat</b>
          </Col>
          <Col flex="1100px"></Col>
          <Col flex="auto">
            <Button type="primary" icon={<ExportOutlined />}>
              Export
            </Button>
          </Col>
        </Row>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableComponent;
