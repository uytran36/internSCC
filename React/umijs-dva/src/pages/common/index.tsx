// import styles from './index.less';
import { useSelector } from 'dva';
import 'antd/dist/antd.css';
import { Redirect } from 'umi';
import Contact from '../contact'

function App(props: any) {
  const token = useSelector((state: any) => state.session.auth);

  return (
    <div className="App">
      {token !== null ? (
        <Contact />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default App;

