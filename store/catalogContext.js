import { createContext, useContext, useState } from 'react';
import functions from '@react-native-firebase/functions';
import { ShopContext } from './shopContext';
import { SnackbarContext } from './snackbarContext';

export const CatalogContext = createContext({
  products: [],
  lastSnapshot: {},
  optionGroups: [],
  categories: [],
  fetchProducts: async () => {},
  firstTimeFetchProducts: async () => {},
  addProduct: async (name, description, price, categoryId, content) => {},
  editProduct: async (
    productId,
    name,
    description,
    price,
    categoryId,
    content,
    optionVariants,
    inStock,
    active,
  ) => {},
  deleteProduct: async (productId) => {},
  fetchOptionGroups: async () => {},
  addOptionGroup: async (name, optionGroupVariants) => {},
  fetchCategories: async () => {},
  addCategory: async (name, description) => {},
  editCategory: async (categoryId, name, description, active) => {},
  clean: () => {},
});

const CatalogContextProvider = ({ children }) => {
  const shopCtx = useContext(ShopContext);
  const snackbarCtx = useContext(SnackbarContext);
  const [productsList, setProductsList] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState({ id: null, last: false });
  const [optionGroupsList, setOptionGroupsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const firstTimeFetchProducts = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    await functions()
      .httpsCallable('getAllProducts')({
        shopId: shopId,
      })
      .then((productsRes) => {
        setProductsList(productsRes.data.data);
        setLastSnapshot({ id: productsRes.data.lastSnapshotId, last: false });
      })
      .catch((error) => {
        console.log(error);
        snackbarCtx.createSnackbar(
          'error',
          null,
          `Произошла ошибка при загрузке товаров. Попробуйте еще раз или обратитесь в службу поддержки. ${error}`,
          3500,
        );
      });
  };

  const fetchProducts = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    if (lastSnapshot.last) return;
    await functions()
      .httpsCallable('getAllProducts')({
        shopId: shopId,
        lastSnapshotId: lastSnapshot?.id ?? null,
      })
      .then((productsRes) => {
        if (!productsRes.data.length)
          setLastSnapshot({ ...lastSnapshot, last: true });
        else if (productsRes.data.lastSnapshotId === lastSnapshot.id) {
          return;
        } else {
          setLastSnapshot({ id: productsRes.data.lastSnapshotId, last: false });
          setProductsList((prev) => [...prev, ...productsRes.data.data]);
        }
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          `Произошла ошибка при загрузке товаров. Попробуйте еще раз или обратитесь в службу поддержки. ${error}`,
          3500,
        );
      });
  };

  const addProduct = async (
    name,
    description,
    price,
    categoryId,
    content,
    optionVariants,
  ) => {
    const shopId = shopCtx.shopInfo.shopId;
    snackbarCtx.createSnackbar('info', name, 'Товар загружается...');
    await functions()
      .httpsCallable('productCreate')({
        name: name,
        description: description,
        price: price,
        categoryId: categoryId,
        content: content,
        optionVariants: optionVariants,
        shopId: shopId,
      })
      .then(() => {
        snackbarCtx.createSnackbar('success', name, 'Товар успешно создан');
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          `Произошла ошибка при создании товара!${error}`,
        );
      });
  };

  const editProduct = async (
    productId,
    name,
    description,
    price,
    categoryId,
    content,
    optionVariants,
    inStock,
    active,
  ) => {
    snackbarCtx.createSnackbar('info', name, 'Изменения загружаются...');
    await functions()
      .httpsCallable('productEdit')({
        productId: productId,
        name: name,
        description: description,
        price: price,
        categoryId: categoryId,
        content: content,
        optionVariants: optionVariants,
        inStock: inStock,
        active: active,
      })
      .then(() => {
        const list = [...productsList];
        const oldProduct = list.find((element) => element.id === productId);
        const categoryName = categoriesList.find(
          (element) => element.id === categoryId,
        ).data.name;
        oldProduct.data = {
          ...oldProduct.data,
          productId: productId,
          name: name,
          description: description,
          price: price,
          categoryId: categoryId,
          content: content,
          optionVariants: optionVariants,
          inStock: inStock,
          active: active,
          categoryName: categoryName,
        };
        setProductsList(list);
        snackbarCtx.createSnackbar('success', name, 'Товар успешно изменен');
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          'Произошла ошибка при изменении товара!',
        );
      });
  };

  const deleteProduct = async (productId) => {
    snackbarCtx.createSnackbar('info', 'Товар удаляется...');
    await functions()
      .httpsCallable('productDelete')({
        productId: productId,
      })
      .then(() => {
        setProductsList((prevList) =>
          prevList.filter((elem) => elem.id !== productId),
        );
        snackbarCtx.createSnackbar('success', 'Товар успешно удален');
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          'Произошла ошибка при удалении товара!',
        );
      });
  };

  const fetchOptionGroups = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    await functions()
      .httpsCallable('getAllOptionGroups')({
        shopId: shopId,
      })
      .then((optionGroupsRes) => {
        setOptionGroupsList(optionGroupsRes.data);
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при загрузке опций. Попробуйте еще раз или обратитесь в службу поддержки.',
          3500,
        );
      });
  };

  const addOptionGroup = async (name, optionGroupVariants) => {
    const shopId = shopCtx.shopInfo.shopId;
    snackbarCtx.createSnackbar('info', name, 'Опции создаются...');
    await functions()
      .httpsCallable('optionGroupCreate')({
        shopId: shopId,
        name: name,
        optionGroupVariants: optionGroupVariants,
      })
      .then(() => {
        snackbarCtx.createSnackbar('success', name, 'Опции успешно созданы');
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при добавлении опции. Попробуйте еще раз или обратитесь в службу поддержки.',
          3500,
        );
      });
  };

  const fetchCategories = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    await functions()
      .httpsCallable('getAllCategories')({
        shopId: shopId,
      })
      .then((categoriesRes) => {
        setCategoriesList(categoriesRes.data);
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при загрузке категорий. Попробуйте еще раз или обратитесь в службу поддержки.',
          3500,
        );
      });
  };

  const addCategory = async (name, description) => {
    const shopId = shopCtx.shopInfo.shopId;
    snackbarCtx.createSnackbar('info', name, 'Категория создается...');
    await functions()
      .httpsCallable('categoryCreate')({
        shopId: shopId,
        name: name,
        description: description,
      })
      .then(() => {
        snackbarCtx.createSnackbar(
          'success',
          name,
          'Категория успешно создана',
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'Произошла ошибка при добавлении категории. Попробуйте еще раз или обратитесь в службу поддержки.',
          3500,
        );
      });
  };

  const editCategory = async (categoryId, name, description, active) => {
    snackbarCtx.createSnackbar('info', name, 'Изменения загружаются...');
    await functions()
      .httpsCallable('categoryEdit')({
        categoryId: categoryId,
        name: name,
        description: description,
        active: active,
      })
      .then(() => {
        snackbarCtx.createSnackbar(
          'success',
          name,
          'Категория успешно изменена',
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          `Произошла ошибка при изменении категории! ${error}`,
        );
      });
  };

  const clean = () => {
    setProductsList([]);
    setCategoriesList([]);
    setLastSnapshot({ id: null, last: false });
    setOptionGroupsList([]);
  };

  const value = {
    products: productsList,
    lastSnapshot: lastSnapshot,
    optionGroups: optionGroupsList,
    categories: categoriesList,
    fetchProducts: fetchProducts,
    firstTimeFetchProducts: firstTimeFetchProducts,
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    fetchOptionGroups: fetchOptionGroups,
    addOptionGroup: addOptionGroup,
    fetchCategories: fetchCategories,
    addCategory: addCategory,
    editCategory: editCategory,
    clean: clean,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};

export default CatalogContextProvider;
