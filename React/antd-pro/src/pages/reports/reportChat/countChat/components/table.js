import { Table, Tag, Button } from 'antd';
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
  },
  {
    title: 'Zalo',
    key: 'zalo',
    dataIndex: 'zalo',
    render: (text, record) => (
      <div>
        <div>{text}</div>
        <Tag color="volcano">
          {() => {
            const percent = (record.sum / record.amount) * 100;
            return <div>{percent}%</div>;
          }}
        </Tag>
      </div>
    ),
  },
  {
    title: 'Livechat',
    key: 'livechat',
    dataIndex: 'livechat',
  },
  {
    title: 'Tổng',
    key: 'sum',
    dataIndex: 'sum',
  },
];

const data = [
  { id: 1, date: '01/01/2021', mess: 315, zalo: 123, livechat: 645, sum: 1083 },
  { id: 2, date: '02/01/2021', mess: 334, zalo: 625, livechat: 244, sum: 1203 },
];

const TableComponent = () => {
  return (
    <div>
      <Button type="primary" icon={<ExportOutlined />}>
        Export
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableComponent;
