import { useAtom } from 'jotai';
import { pageStackAtom } from '../atoms/pageAtom';
interface PageParams {
  page: string;
  params: Record<string, any>;
}

const useTgPage = () => {
  const [pages, setPages] = useAtom(pageStackAtom);

  const push = (pageParams: PageParams) => {
    window.Telegram.WebApp.BackButton.show();
    setPages((pages) => {
      return [...pages, pageParams];
    });
  };

  const back = (c = 1) => {
    setPages((pages) => {
      if (pages.length - c < 0) {
        throw Error('Number of pages exceeded!');
      }
      // @ts-ignore TODO 升级到 TS 5.2
      const nextPages = pages.toSpliced(pages.length - c, c);

      return nextPages;
    });
  };

  const goToFirst = () => {
    setPages((pages) => {
      return [pages[0]];
    });
  };

  return {
    pages,
    push,
    back,
    goToFirst,
  };
};

export default useTgPage;
