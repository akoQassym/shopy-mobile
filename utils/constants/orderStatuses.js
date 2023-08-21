import { GlobalStyles } from '../../constants/styles';

export const DEFAULT_ORDER_STATUSES = {
  new: {
    id: '0',
    label: 'New',
    bgColor: GlobalStyles.colors.success,
  },
  payment: {
    id: '1',
    label: 'Payment is pending',
    bgColor: GlobalStyles.colors.warning,
  },
  delivery: {
    id: '2',
    label: 'In the delivery',
    bgColor: GlobalStyles.colors.pink,
  },
  cancelled: {
    id: '3',
    label: 'Canceled',
    bgColor: GlobalStyles.colors.lightError,
  },
  done: {
    id: '4',
    label: 'Done',
    bgColor: GlobalStyles.colors.gray,
  },
};
