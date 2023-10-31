import { Button } from 'antd-mobile';
import useTgPage from '../hooks/useTgPage';

const SearchPage = ({ params = {} }: { params: Record<string, any> }) => {
  const { push } = useTgPage();

  return (
    <div>
      <Button
        onClick={() =>
          push({
            page: 'initUser',
            params: {},
          })
        }
      >
        to inituser
      </Button>
    </div>
  );
};

export default SearchPage;
