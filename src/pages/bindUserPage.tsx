import { Button } from 'antd-mobile';
import useTgPage from '../hooks/useTgPage';

const BindUserPage = ({ params = {} }: { params: Record<string, any> }) => {
  const { push } = useTgPage();

  return (
    <div>
      BindUserPage
      <Button
        onClick={() =>
          push({
            page: 'search',
            params: {},
          })
        }
      >
        BindUserPage
      </Button>
    </div>
  );
};

export default BindUserPage;
