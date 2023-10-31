import { PropsWithChildren, lazy } from 'react';

type Page = (props: PropsWithChildren<{ params?: Record<string, any> }>) => React.ReactElement;
type PageRoute = Record<string, Page>;

async function delayForDemo(promise: any) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return promise;
}

const InitUserPage = lazy(() => delayForDemo(import('./pages/initUserPage')));
const SearchPage = lazy(() => delayForDemo(import('./pages/searchPage')));
const BindUserPage = lazy(() => delayForDemo(import('./pages/bindUserPage')));

const routes: PageRoute = {
  initUser: ({ params }) => <InitUserPage params={params} />,
  bindUser: ({ params }) => <BindUserPage params={params} />,
  search: ({ params }) => <SearchPage params={params} />,
};

export default routes;
