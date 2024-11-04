import { atom } from 'jotai';

export const userNameAtom = atom<string>('');
export const phoneNumberAtom = atom<string>('');
export const emailAtom = atom<string>('');
export const agreeTermsAtom = atom<boolean>(false);
