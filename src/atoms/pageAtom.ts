import { atom } from 'jotai';

interface Page {
  page: string;
  params: Record<string, any>
}

export const pageStackAtom = atom<Array<Page>>([
  {
    page: 'search',
    params: {},
  },
]);

export const pageAtom = atom((get) => {
  const pages = get(pageStackAtom);

  return pages[pages.length - 1];
});

export default pageAtom;
