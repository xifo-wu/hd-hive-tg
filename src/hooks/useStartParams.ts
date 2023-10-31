import { get } from 'lodash-es';
import { decode } from 'js-base64';
import { parse } from 'qs';
import { useHydrateAtoms } from 'jotai/utils';
import { pageStackAtom } from '../atoms/pageAtom';

const useStartParams = () => {
  const startParamBase64 = get(window.Telegram.WebApp, 'initDataUnsafe.start_param', '') as string;

  const decodeStartParam = startParamBase64 ? decode(startParamBase64) : '';
  const splitedStartParam = decodeStartParam.split('|||');

  const page = splitedStartParam[0] || 'search';
  let params = {};
  if (splitedStartParam.length > 1) {
    params = parse(splitedStartParam[1], { ignoreQueryPrefix: true });
  }

  useHydrateAtoms([
    [
      pageStackAtom,
      [
        {
          page,
          params,
        },
      ],
    ],
  ]);
};

export default useStartParams;
