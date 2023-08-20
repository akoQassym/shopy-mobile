import { createContext, useContext, useState } from 'react';
import functions from '@react-native-firebase/functions';
import { SnackbarContext } from './snackbarContext';

export const ShopContext = createContext({
  shopsList: [],
  shopInfo: {
    shopId: '',
    shopName: '',
    subdomain: '',
    websiteActivated: null,
    description: '',
    address: '',
    isAddressShown: null,
    workingHours: '',
    phoneNumber: '',
    instagram: '',
    telegram: '',
    whatsapp: '',
    twoGis: '',
    colorPrimary: '',
    colorAccent: '',
    logo: {},
    backgroundBanner: {},
    instagram2: '',
    whatsapp2: '',
    links: [],
  },
  fetchShopInfo: async () => {},
  setShopInfo: () => {},
  setShopsList: () => {},
  editSubdomain: async (subdomain) => {},
  editShopInfo: async (
    shopName,
    description,
    address,
    isAddressShown,
    workingHours,
    phoneNumber,
    instagram,
    telegram,
    whatsapp,
    twoGis,
    instagram2,
    whatsapp2,
  ) => {},
  editShopDesign: async (colorAccent, logo, backgroundBanner) => {},
  editLinks: async (links) => {},
  clean: () => {},
});

const ShopContextProvider = ({ children }) => {
  const snackbarCtx = useContext(SnackbarContext);
  const [shopsList, setShopsList] = useState();
  const [shopInfo, setShopInfo] = useState();

  const fetchShopInfo = async (shopIdVal) => {
    if (!shopIdVal && !(value.shopInfo && value.shopInfo.shopId)) {
      snackbarCtx.createSnackbar(
        'error',
        null,
        'Произошла ошибка. Отсутствует ID. Попробуйте еще раз или обратитесь в службу поддержки.',
        4500,
      );
      return;
    }
    await functions()
      .httpsCallable('getShopInfo')({
        shopId: shopIdVal ?? shopInfo.shopId,
      })
      .then((shopRes) => {
        value.setShopInfo(
          shopRes.data.id,
          shopRes.data.data.name,
          shopRes.data.data.subdomain,
          shopRes.data.data.websiteActivated,
          shopRes.data.data.description,
          shopRes.data.data.address,
          shopRes.data.data.isAddressShown,
          shopRes.data.data.workingHours,
          shopRes.data.data.phoneNumber,
          shopRes.data.data.instagram,
          shopRes.data.data.telegram,
          shopRes.data.data.whatsapp,
          shopRes.data.data.twoGis,
          shopRes.data.data.colorPrimary,
          shopRes.data.data.colorAccent,
          shopRes.data.data.logo,
          shopRes.data.data.backgroundBanner,
          shopRes.data.data.links,
          shopRes.data.data.instagram2,
          shopRes.data.data.whatsapp2,
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при загрузке магазина. Попробуйте еще раз или обратитесь в службу поддержки.',
          4500,
        );
      });
  };

  const setShopsArray = (shopIdArray) => {
    setShopsList(shopIdArray);
  };

  const setShopDetails = (
    shopId,
    shopName,
    subdomain,
    websiteActivated,
    description,
    address,
    isAddressShown,
    workingHours,
    phoneNumber,
    instagram,
    telegram,
    whatsapp,
    twoGis,
    colorPrimary,
    colorAccent,
    logo,
    backgroundBanner,
    links,
    instagram2,
    whatsapp2,
  ) => {
    setShopInfo({
      shopId: shopId,
      shopName: shopName,
      subdomain: subdomain,
      websiteActivated: websiteActivated,
      description: description,
      address: address,
      isAddressShown: isAddressShown,
      workingHours: workingHours,
      phoneNumber: phoneNumber,
      instagram: instagram,
      telegram: telegram,
      whatsapp: whatsapp,
      twoGis: twoGis,
      colorPrimary: colorPrimary,
      colorAccent: colorAccent,
      logo: logo,
      backgroundBanner: backgroundBanner,
      links: links,
      instagram2: instagram2,
      whatsapp2: whatsapp2,
    });
  };

  const editSubdomain = async (subdomain) => {
    if (!value.shopInfo.shopId) {
      snackbarCtx.createSnackbar(
        'error',
        null,
        'Произошла ошибка. Отсутствует ID. Попробуйте еще раз или обратитесь в службу поддержки.',
        4500,
      );
      return;
    }
    snackbarCtx.createSnackbar('info', null, 'Изменения загружаются...');
    await functions()
      .httpsCallable('updateSubdomain')({
        shopId: value.shopInfo.shopId,
        subdomain: subdomain,
      })
      .then(() => {
        setShopInfo({ ...shopInfo, subdomain: subdomain });
        snackbarCtx.createSnackbar(
          'success',
          null,
          'Домен вашего сайта был изменен',
        );
      })
      .catch((error) => {
        error.code === 'already-exists'
          ? snackbarCtx.createSnackbar(
              'error',
              null,
              'Такой домен уже существует!',
              3500,
            )
          : snackbarCtx.createSnackbar(
              'error',
              null,
              'Произошла ошибка при обновлении домена вашего сайта!',
            );
      });
  };

  const editShopInfo = async (
    shopName,
    description,
    address,
    isAddressShown,
    workingHours,
    phoneNumber,
    instagram,
    telegram,
    whatsapp,
    twoGis,
    instagram2,
    whatsapp2,
  ) => {
    if (!value.shopInfo.shopId) {
      snackbarCtx.createSnackbar(
        'error',
        null,
        'Произошла ошибка. Отсутствует ID. Попробуйте еще раз или обратитесь в службу поддержки.',
        4500,
      );
      return;
    }
    snackbarCtx.createSnackbar('info', shopName, 'Изменения загружаются...');
    await functions()
      .httpsCallable('updateShopInfo')({
        shopId: value.shopInfo.shopId,
        name: shopName,
        description: description,
        address: address,
        isAddressShown: isAddressShown,
        workingHours: workingHours,
        phoneNumber: phoneNumber,
        instagram: instagram,
        telegram: telegram,
        whatsapp: whatsapp,
        twoGis: twoGis,
        instagram2: instagram2,
        whatsapp2: whatsapp2,
      })
      .then(() => {
        setShopInfo({
          ...shopInfo,
          name: shopName,
          description: description,
          address: address,
          isAddressShown: isAddressShown,
          workingHours: workingHours,
          phoneNumber: phoneNumber,
          instagram: instagram,
          telegram: telegram,
          whatsapp: whatsapp,
          twoGis: twoGis,
          instagram2: instagram2,
          whatsapp2: whatsapp2,
        });
        snackbarCtx.createSnackbar(
          'success',
          shopName,
          'Данные о вашем магазине были успешно изменены',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          shopName,
          `Произошла ошибка при загрузке обновленных данных о вашем магазине!`,
        );
      });
  };

  const editShopDesign = async (colorAccent, logo, backgroundBanner) => {
    if (!value.shopInfo.shopId) {
      snackbarCtx.createSnackbar(
        'error',
        null,
        'Произошла ошибка. Отсутствует ID. Попробуйте еще раз или обратитесь в службу поддержки.',
        4500,
      );
      return;
    }
    snackbarCtx.createSnackbar('info', null, 'Изменения загружаются...');
    await functions()
      .httpsCallable('updateShopDesign')({
        shopId: value.shopInfo.shopId,
        colorAccent: colorAccent,
        logo: logo,
        backgroundBanner: backgroundBanner,
      })
      .then(() => {
        setShopInfo({
          ...shopInfo,
          colorAccent: colorAccent,
          logo: logo,
          backgroundBanner: backgroundBanner,
        });
        snackbarCtx.createSnackbar(
          'success',
          null,
          'Дизайн магазина был успешно изменен',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при изменении дизайна!',
        );
      });
  };

  const editLinks = async (links) => {
    if (!value.shopInfo.shopId) {
      snackbarCtx.createSnackbar(
        'error',
        null,
        'Произошла ошибка. Отсутствует ID. Попробуйте еще раз или обратитесь в службу поддержки.',
        4500,
      );
      return;
    }
    snackbarCtx.createSnackbar('info', null, 'Изменения загружаются...');
    await functions()
      .httpsCallable('updateShopLinks')({
        shopId: value.shopInfo.shopId,
        links: links,
      })
      .then(() => {
        setShopInfo({
          ...shopInfo,
          links: links,
        });
        snackbarCtx.createSnackbar(
          'success',
          null,
          'Ссылки были успешно изменены',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при изменении ссылок!',
        );
      });
  };

  const clean = () => {
    setShopsList(null);
    setShopInfo(null);
  };

  const value = {
    shopsList: shopsList,
    shopInfo: shopInfo,
    fetchShopInfo: fetchShopInfo,
    setShopInfo: setShopDetails,
    setShopsList: setShopsArray,
    editSubdomain: editSubdomain,
    editShopInfo: editShopInfo,
    editShopDesign: editShopDesign,
    editLinks: editLinks,
    clean: clean,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
