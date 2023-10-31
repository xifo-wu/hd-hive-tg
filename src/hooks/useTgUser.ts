import useSWR from 'swr';
import useTgPage from './useTgPage';
import pageAtom from '../atoms/pageAtom';
import tgUserAtom from '../atoms/tgUserAtom';
import api from '../utils/api';
import { get, isEmpty } from 'lodash-es';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { AxiosRequestConfig } from 'axios';

interface ArgsProps extends AxiosRequestConfig {
  url: string;
}

async function fetcher(args: ArgsProps) {
  const { url, data, ...restArgs } = args;

  // TODO 明确 any 类型
  const { response, error } = await api.post<any, any>(url, data, restArgs);

  if (error) {
    throw error;
  }

  return response;
}

const useTgUser = () => {
  const { push } = useTgPage();
  const { params, page } = useAtomValue(pageAtom);

  const initData = get(window.Telegram.WebApp, 'initData');
  const initDataUnsafe = get(window.Telegram.WebApp, 'initDataUnsafe');

  if (isEmpty(initDataUnsafe) && import.meta.env.MODE === 'production') {
    // TODO: 写活从配置读取
    window.Telegram.WebApp.openTelegramLink('https://t.me/HDHiveBot');
  }

  const {
    error,
    data = {},
    mutate,
  } = useSWR(
    {
      url: '/api/v1/tgwebapp/user/current',
      data: {
        initData,
        initDataUnsafe,
      },
    },
    fetcher,
  );

  if (error && import.meta.env.MODE === 'production') {
    window.Telegram.WebApp.openTelegramLink('https://t.me/HDHiveBot');
  }

  const { data: tgUser, meta } = data;

  console.log(meta, "meta")

  if (meta) {
    if (meta.code === 100001 && !params.public) {
      console.log(params, page, "执行了多遍吗")
      // 跳到用户提示页面是新建一个用户还是绑定影巢网站账号
      push({ page: 'initUser', params: { public: true } });
    }

    window.localStorage.setItem('accessToken', meta.access_token);
  }

  useHydrateAtoms([[tgUserAtom, tgUser || {}]]);

  return { tgUser: tgUser, mutate };
};

export default useTgUser;
