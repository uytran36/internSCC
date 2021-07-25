import { Tabs } from 'antd';
import ReportChat from './reportChat';
import './index.less';

const { TabPane } = Tabs;

const reportOmni = () => {
  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <h3>Báo cáo Omnichat</h3>
      <div className="card-container">
        <Tabs onChange={callback} type="card">
          <TabPane tab="Báo cáo chat" key="1">
            <ReportChat />
          </TabPane>
          <TabPane tab="Báo cáo agent" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Khách hàng" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default reportOmni;
