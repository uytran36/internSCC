import { DatePicker, Space } from 'antd';
import { Chart, Interval, Interaction, registerInteraction, Tooltip, Legend } from 'bizcharts';

const { RangePicker } = DatePicker;
const data = [
  {
    id: 1,
    date: '18/04/2021',
    type: 'Zalo',
    amount: 100,
  },
  {
    id: 2,
    date: '19/04/2021',
    type: 'Zalo',
    amount: 200,
  },
  {
    id: 3,
    date: '20/04/2021',
    type: 'Zalo',
    amount: 300,
  },
  {
    id: 4,
    date: '21/04/2021',
    type: 'Zalo',
    amount: 250,
  },
  {
    id: 5,
    date: '22/04/2021',
    type: 'Zalo',
    amount: 360,
  },
  {
    id: 16,
    date: '23/04/2021',
    type: 'Zalo',
    amount: 150,
  },
  {
    id: 19,
    date: '24/04/2021',
    type: 'Zalo',
    amount: 400,
  },
  {
    id: 6,
    date: '18/04/2021',
    type: 'Messenger',
    amount: 400,
  },
  {
    id: 7,
    date: '19/04/2021',
    type: 'Messenger',
    amount: 300,
  },
  {
    id: 8,
    date: '20/04/2021',
    type: 'Messenger',
    amount: 200,
  },
  {
    id: 9,
    date: '21/04/2021',
    type: 'Messenger',
    amount: 450,
  },
  {
    id: 10,
    date: '22/04/2021',
    type: 'Messenger',
    amount: 160,
  },
  {
    id: 17,
    date: '23/04/2021',
    type: 'Messenger',
    amount: 500,
  },
  {
    id: 20,
    date: '24/04/2021',
    type: 'Messenger',
    amount: 250,
  },
  {
    id: 11,
    date: '18/04/2021',
    type: 'Livechat',
    amount: 200,
  },
  {
    id: 12,
    date: '19/04/2021',
    type: 'Livechat',
    amount: 350,
  },
  {
    id: 13,
    date: '20/04/2021',
    type: 'Livechat',
    amount: 100,
  },
  {
    id: 14,
    date: '21/04/2021',
    type: 'Livechat',
    amount: 450,
  },
  {
    id: 15,
    date: '22/04/2021',
    type: 'Livechat',
    amount: 270,
  },
  {
    id: 18,
    date: '23/04/2021',
    type: 'Livechat',
    amount: 150,
  },
  {
    id: 21,
    date: '24/04/2021',
    type: 'Livechat',
    amount: 400,
  },
];

registerInteraction('element-link', {
  start: [{ trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }],
  end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
});


const ChartComponent = () => {

  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker />
      </Space>

      <Chart padding="auto" autoFit height={500} data={data}>
        <Tooltip shared showMarkers={false} />
        <Interval position="date*amount" color="type" adjust="stack" />
        <Legend position="top" />
        <Interaction type="element-highlight" />
        <Interaction type="element-link" />
      </Chart>
    </div>
  );
};

export default ChartComponent;
