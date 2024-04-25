import React from 'react';
import { JPush } from 'capacitor-plugin-jpush';
import { Page, Navbar, NavTitle, Block, Button } from 'framework7-react';

const HomePage = () => {
  const setAlias = () => {
    JPush.setAlias({
      alias: '123456',
    });
  };

  const [jPushData, setJPushData] = React.useState('');
  const [permission, setPermission] = React.useState('');
  React.useEffect(() => {
    JPush.checkPermissions().then((res) => {
      setPermission(res.permission);
      if (res.permission === 'granted') {
        return JPush.startJPush();
      }
      JPush.requestPermissions().then((res) => {
        if (res.permission === 'granted') {
          return JPush.startJPush();
        }
        return JPush.openNotificationSetting();
      });
    });

    JPush.addListener('notificationReceived', (data) => {
      console.log('notificationReceived', data);
      setJPushData(JSON.stringify(data, null, 4));
    });
  }, []);
  return (
    <Page name="home">
      <Navbar>
        <NavTitle>极光推送测试</NavTitle>
      </Navbar>

      <Block>
        <div style={{ width: 'fit-content' }}>
          <Button fill round raised onClick={setAlias}>
            设置别名
          </Button>
        </div>
      </Block>

      <Block>
        <h3>推送权限状态</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{permission}</p>
      </Block>

      <Block>
        <h3>推送数据</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{jPushData}</p>
      </Block>
    </Page>
  );
};
export default HomePage;
