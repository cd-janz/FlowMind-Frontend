export type toasterType = 'info' | 'success' | 'error';
export default interface IToaster {
  code: string;
  type: toasterType;
  title: string;
  message: string;
  action?: () => void;
}
