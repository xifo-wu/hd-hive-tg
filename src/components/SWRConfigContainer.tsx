'use client';

import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import type { AxiosRequestConfig } from 'axios';
import api from '../utils/api';

interface Props {
  children: ReactNode;
}

interface ArgsProps extends AxiosRequestConfig {
  url: string;
}

export async function fetcher(args: ArgsProps) {
  const { url, ...restArgs } = args;

  // TODO 明确 any 类型
  const { response, error } = await api.get<any, any>(url, restArgs);

  if (error) {
    throw error;
  }

  return response;
}

const SWRConfigContainer = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContainer;
