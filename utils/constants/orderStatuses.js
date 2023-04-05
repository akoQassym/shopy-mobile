import { GlobalStyles } from '../../constants/styles';

export const DEFAULT_ORDER_STATUSES = {
  new: {
    id: '0',
    label: 'Новый',
    bgColor: GlobalStyles.colors.success,
  },
  payment: {
    id: '1',
    label: 'Ожидается оплата',
    bgColor: GlobalStyles.colors.warning,
  },
  delivery: {
    id: '2',
    label: 'В доставке',
    bgColor: GlobalStyles.colors.pink,
  },
  cancelled: {
    id: '3',
    label: 'Отменено',
    bgColor: GlobalStyles.colors.lightError,
  },
  done: {
    id: '4',
    label: 'Выполнено',
    bgColor: GlobalStyles.colors.gray,
  },
};
