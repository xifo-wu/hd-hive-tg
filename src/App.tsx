import { Suspense, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useTransition, useSpringRef, animated } from '@react-spring/web';
import PageLoading from './components/PageLoading';
import SWRConfigContainer from './components/SWRConfigContainer';
import useStartParams from './hooks/useStartParams';
import useTelegram from './hooks/useTelegram';
import useTgUser from './hooks/useTgUser';
import pageAtom from './atoms/pageAtom';
import routes from './routes';

function App() {
  useTelegram();
  useTgUser();
  useStartParams();

  const { page, params } = useAtomValue(pageAtom);
  const transRef = useSpringRef();

  const transitions = useTransition(page, {
    ref: transRef,
    keys: null,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    transRef.start();
  }, [page]);

  return (
    <>
      <SWRConfigContainer>
        <Suspense fallback={<PageLoading />}>
          {transitions((style, page) => {
            const Page = routes[page];
            if (!Page) {
              return <animated.div style={{ ...style, minHeight: '100vh' }}>404</animated.div>;
            }

            return (
              <animated.div style={{ ...style, minHeight: '100vh' }}>
                <Page params={params} />
              </animated.div>
            );
          })}
        </Suspense>
      </SWRConfigContainer>
    </>
  );
}

export default App;
