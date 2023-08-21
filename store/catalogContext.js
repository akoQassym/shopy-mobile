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
    oldPrice,
    categoryId,
    content,
    optionVariants,
    inStock,
    active,
    orderNumber,
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
          `An error occurred while loading products. Try again or contact support. ${error}`,
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
        console.log(error);
        snackbarCtx.createSnackbar(
          'error',
          null,
          `An error occurred while loading products. Try again or contact support. ${error}`,
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
    snackbarCtx.createSnackbar('info', name, 'Product is uploading...');
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
        snackbarCtx.createSnackbar(
          'success',
          name,
          'The product has been successfully created',
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          `There was an error when creating a product! ${error}`,
        );
      });
  };

  const editProduct = async (
    productId,
    name,
    description,
    price,
    oldPrice,
    categoryId,
    content,
    optionVariants,
    inStock,
    active,
    orderNumber,
  ) => {
    snackbarCtx.createSnackbar('info', name, 'Updates are uploading...');
    await functions()
      .httpsCallable('productEdit')({
        productId: productId,
        name: name,
        description: description,
        price: price,
        oldPrice: oldPrice,
        categoryId: categoryId,
        content: content,
        optionVariants: optionVariants,
        inStock: inStock,
        active: active,
        orderNumber: orderNumber,
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
          oldPrice: oldPrice,
          categoryId: categoryId,
          content: content,
          optionVariants: optionVariants,
          inStock: inStock,
          active: active,
          categoryName: categoryName,
          orderNumber: orderNumber,
        };
        setProductsList(list);
        snackbarCtx.createSnackbar(
          'success',
          name,
          'The product has been successfully updated',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          'There was an error when updating a product!',
        );
      });
  };

  const deleteProduct = async (productId) => {
    snackbarCtx.createSnackbar('info', 'The product is being deleted...');
    await functions()
      .httpsCallable('productDelete')({
        productId: productId,
      })
      .then(() => {
        setProductsList((prevList) =>
          prevList.filter((elem) => elem.id !== productId),
        );
        snackbarCtx.createSnackbar(
          'success',
          'The product has been successfully deleted',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          'There was an error when deleting a product!',
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
          'An error occurred while loading options. Try again or contact support.',
          3500,
        );
      });
  };

  const addOptionGroup = async (name, optionGroupVariants) => {
    const shopId = shopCtx.shopInfo.shopId;
    snackbarCtx.createSnackbar('info', name, 'Options are being created...');
    await functions()
      .httpsCallable('optionGroupCreate')({
        shopId: shopId,
        name: name,
        optionGroupVariants: optionGroupVariants,
      })
      .then(() => {
        snackbarCtx.createSnackbar(
          'success',
          name,
          'The options have been successfully created',
        );
      })
      .catch(() => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'An error occurred while adding an option. Try again or contact support.',
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
          'An error occurred while loading categories. Try again or contact support.',
          3500,
        );
      });
  };

  const addCategory = async (name, description) => {
    const shopId = shopCtx.shopInfo.shopId;
    snackbarCtx.createSnackbar('info', name, 'Categories are being created...');
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
          'The category has been successfully created',
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          'An error occurred while adding a category. Try again or contact support.',
          3500,
        );
      });
  };

  const editCategory = async (categoryId, name, description, active) => {
    snackbarCtx.createSnackbar('info', name, 'Updates are uploading...');
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
          'The category has been successfully updated',
        );
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          name,
          `An error occurred when updating a category! ${error}`,
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
