import { Tabs } from 'antd';
import CountChat from './countChat';

const { TabPane } = Tabs;

const ReportChat = () => {
  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" centered onChange={callback}>
        <TabPane tab="Số lượng chat" key="1">
          <CountChat />
        </TabPane>
        <TabPane tab="Thời lượng và tỉ lệ giải quyết" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Chi tiết chat" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportChat;
