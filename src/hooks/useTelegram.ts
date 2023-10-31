import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { pageStackAtom } from '../atoms/pageAtom';
import { get, isEmpty } from 'lodash-es';

export default function useTgAction() {
  const setPages = useSetAtom(pageStackAtom);
  const initDataUnsafe = get(window.Telegram.WebApp, 'initDataUnsafe');

  if (isEmpty(initDataUnsafe) && import.meta.env.MODE === 'production') {
    // TODO: 写活从配置读取
    window.Telegram.WebApp.openTelegramLink("https://t.me/HDHiveBot")
  }

  useEffect(() => {
    const back = () => {
      setPages((pages) => {
        console.log(pages, "pages")
        // // @ts-ignore TODO 升级到 TS 5.2
        // const nextPages = pages.toSpliced(pages.length - 1, 1);

        // console.log(pages, "pages")

        // if (nextPages.length === 1) {
        //   window.Telegram.WebApp.BackButton.hide();
        // }

        // console.log(pages[pages.length - 1].page, "pages[pages.length - 1].page ")
        // if (pages[pages.length - 1].page === 'initUser') {
        //   console.log("??????")
        //   // window.Telegram.WebApp.close();
        // }

        // return nextPages;

        return pages
      });
    };

    window.Telegram.WebApp.BackButton.onClick(back);

    // 默认展开全高
    window.Telegram.WebApp.expand();
  }, []);
}
