import LoadingIcon from './LoadingIcon';
import styles from './PageLoading.module.css';

const PageLoading = () => {
  return (
    <div className={styles.container}>
      <LoadingIcon width={200} />
    </div>
  );
};

export default PageLoading;
