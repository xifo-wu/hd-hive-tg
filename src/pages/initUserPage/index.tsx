import { useSWRConfig } from 'swr';
import { useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import useTgPage from '../../hooks/useTgPage';
import api from '../../utils/api';
import styles from './index.module.css';

const InitUserPage = () => {
  const { push, goToFirst, pages } = useTgPage();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  const handleRedirctToBindUser = () => {
    push({
      page: 'bindUser',
      params: { public: true },
    });
  };

  const handleConfirmCreateUser = async () => {
    const { response, error } = await api.post<any, any>('/api/v1/tgwebapp/user/new');
    if (error) {
      Toast.show({
        icon: 'fail',
        content: error.message,
      });
      return;
    }

    const { meta } = response;

    // 回到第一页
    Toast.show({
      icon: 'success',
      content: '创建成功',
    });

    window.localStorage.setItem('accessToken', meta.access_token);
    await mutate((key: any) => key.url === '/api/v1/tgwebapp/user/current');

    if (pages[0].page === 'initUser') {
      window.Telegram.WebApp.close();
      return;
    }

    goToFirst();
  };

  const handlePopupClick = (id: string) => {
    if (id === 'close') return;

    if (id === 'bind') {
      handleConfirmCreateUser();
      return;
    }
  };

  const handleNewUserClick = async () => {
    window.Telegram.WebApp.showPopup(
      {
        title: '创建用户',
        message: '创建后暂不支持再次绑定账号',
        buttons: [
          { text: '确定', type: 'ok', id: 'bind' },
          { text: '取消', type: 'close', id: 'close' },
        ],
      },
      handlePopupClick,
    );
  };

  return (
    <div className={styles.container}>
      <h1>欢迎使用影巢</h1>
      <h2 className={styles.subtitle}>接下来你需要做出选择</h2>
      <p className={styles.tips}>
        如果你有网站的账号，你可以选择绑定账号将继承原有账号积分等数据。
      </p>
      <Button size="large" onClick={handleRedirctToBindUser} block className={styles.bindBtn}>
        绑定账号
      </Button>

      <p className={styles.tips}>没有账号？也没关系，让我们全新开始！</p>
      <Button size="large" onClick={handleNewUserClick} block className={styles.newUserBtn}>
        全新开始
      </Button>
    </div>
  );
};

export default InitUserPage;
