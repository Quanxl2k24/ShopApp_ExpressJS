import express from "express";
const router = express.Router();
import * as ProductController from "../controllers/ProductController.js";
import * as BrandController from "../controllers/BrandController.js";
import * as CategoryController from "../controllers/CategoryController.js";
import * as UserController from "../controllers/UserController.js";
import * as OrderController from "../controllers/OderController.js";
import * as NewController from "../controllers/NewController.js";
import * as NewsDetailsController from "../controllers/NewsDetailsController.js";
import * as BannerController from "../controllers/BannerController.js";
import * as BannerDetailsController from "../controllers/BannerDetailsController.js";
import * as ImagesController from "../controllers/ImagesController.js";
import * as CartsController from "../controllers/CartController.js";
import * as CartItemController from "../controllers/CartItemController.js";
//Hàm xử lý đồng bộ trycatch
import asyncHandleCatch from "../middleware/asyncHandleCatch.js";
//Hàm validate
import validateImageMiddleware from "../middleware/validateImageMiddleware.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
//schema validate cho product
import InsertProductReqest from "../dtos/requests/Product/InsertProductResquest.js";
import UpdateProductReqest from "../dtos/requests/Product/UpdateProductResquest.js";
//schema validate cho brand
import InsertBrandRequest from "../dtos/requests/Brand/InsertBrandRequest.js";
//schema validate cho category
import InsertCategoryRequest from "../dtos/requests/Category/InsertCategoryRequest.js";
//schema validate cho user
import InsertUser from "../dtos/requests/User/InsertProductResquest.js";
import UpdatetUser from "../dtos/requests/User/UpdateUserRequest.js";
//schema validate cho order
import InsertOrderRequest from "../dtos/requests/Order/InsertOrderRequest.js";
import UpdateOrder from "../dtos/requests/Order/UpdateOrderRequest.js";
//schema validate cho news
import InsertNewsRequest from "../dtos/requests/News/InsertNewsRequest.js";
import UpdateNewsRequest from "../dtos/requests/News/UpdateNewsRequest.js";
//schema validate cho newsdetails
import InsertNewsDetailsRequest from "../dtos/requests/NewsDetails/InsertNewsDetailsRequest.js";
import UpdateNewsDetailsRequest from "../dtos/requests/NewsDetails/UpdateNewsDetailsRequest.js";
//schema validate cho banner
import InsertBannerRequest from "../dtos/requests/Banner/InsertBannerRequest.js";
import UpdateBannerRequest from "../dtos/requests/Banner/UpdateBannerRequest.js";
//schema validate cho banner
import InsertBannerDetailsRequest from "../dtos/requests/BannerDetails/InsertBannerDetailsRequest.js";
import UpdateBannerDetailsRequest from "../dtos/requests/BannerDetails/updateBannerDetailsRequest.js";
// middleware upload image
import uploadImages from "../middleware/imagesUpload.js";
// schema validate cho cart
import InsertCartScheme from "../dtos/requests/Carts/InsertCartsSchema.js";
const AppRouter = (app) => {
  //router products
  router.get("/products", asyncHandleCatch(ProductController.getProducts));
  router.get(
    "/products/:id",
    asyncHandleCatch(ProductController.getProductsById)
  );
  router.post(
    "/products",
    validateMiddleware(InsertProductReqest),
    validateImageMiddleware,
    asyncHandleCatch(ProductController.insertProduct)
  );
  router.put(
    "/products/:id",
    validateMiddleware(UpdateProductReqest),
    validateImageMiddleware,
    asyncHandleCatch(ProductController.updateProduct)
  );
  router.delete(
    "/products/:id",
    asyncHandleCatch(ProductController.deleteProduct)
  );

  // router brands
  router.get("/brands", asyncHandleCatch(BrandController.getBrands));
  router.get("/brands/:id", asyncHandleCatch(BrandController.getBrandById));
  router.post(
    "/brands",
    validateMiddleware(InsertBrandRequest),
    validateImageMiddleware,
    asyncHandleCatch(BrandController.insertBrand)
  );
  router.put(
    "/brands/:id",
    validateMiddleware(UpdateBannerRequest),
    validateImageMiddleware,
    asyncHandleCatch(BrandController.updateBrand)
  );
  router.delete("/brands/:id", asyncHandleCatch(BrandController.deleteBrand));

  //router category
  router.get("/category", asyncHandleCatch(CategoryController.getCategory));
  router.get(
    "/category/:id",
    asyncHandleCatch(CategoryController.getCategoryById)
  );
  router.post(
    "/category",
    validateMiddleware(InsertCategoryRequest),
    validateImageMiddleware,
    asyncHandleCatch(CategoryController.insertCategory)
  );
  router.put(
    "/category/:id",
    validateImageMiddleware,
    asyncHandleCatch(CategoryController.updateCategory)
  );
  router.delete(
    "/category/:id",
    asyncHandleCatch(CategoryController.deleteCategory)
  );

  //User
  router.get("/user", asyncHandleCatch(UserController.getUser));
  router.get("/user/:id", asyncHandleCatch(UserController.getUserById));
  router.post(
    "/user",
    validateMiddleware(InsertUser),
    asyncHandleCatch(UserController.insertUser)
  );
  router.put(
    "/user/:id",
    validateMiddleware(UpdatetUser),
    asyncHandleCatch(UserController.updateUser)
  );
  router.delete("/user/:id", asyncHandleCatch(UserController.deleteUser));

  //ORDER
  router.get("/order", asyncHandleCatch(OrderController.getOrder));
  router.get("/order/:id", asyncHandleCatch(OrderController.getOrderById));
  router.post(
    "/order",
    validateMiddleware(InsertOrderRequest),
    asyncHandleCatch(OrderController.insertOrder)
  );
  router.put(
    "/order/:id",
    validateMiddleware(UpdateOrder),
    asyncHandleCatch(OrderController.updateOrder)
  );
  router.delete("/order/:id", asyncHandleCatch(OrderController.deleteOrder));

  //NEWS
  router.get("/news", asyncHandleCatch(NewController.getNews));
  router.get("/news/:id", asyncHandleCatch(NewController.getNewsById));
  router.post(
    "/news",
    validateMiddleware(InsertNewsRequest),
    validateImageMiddleware,
    asyncHandleCatch(NewController.insertNews)
  );
  router.put(
    "/news/:id",
    validateMiddleware(UpdateNewsRequest),
    validateImageMiddleware,
    asyncHandleCatch(NewController.updateNews)
  );
  router.delete("/news/:id", asyncHandleCatch(NewController.deleteNews));

  //NEWSDETAILS
  router.get(
    "/newsdetails",
    asyncHandleCatch(NewsDetailsController.getNewsDetails)
  );
  router.get(
    "/newsdetails/:id",
    asyncHandleCatch(NewsDetailsController.getNewsDetailsById)
  );
  router.post(
    "/newsdetails",
    validateMiddleware(InsertNewsDetailsRequest),
    asyncHandleCatch(NewsDetailsController.insertNewsDetails)
  );
  router.put(
    "/newsdetails/:id",
    validateMiddleware(UpdateNewsDetailsRequest),
    asyncHandleCatch(NewsDetailsController.updateNewsDetails)
  );
  router.delete(
    "/newsdetails/:id",
    asyncHandleCatch(NewsDetailsController.deleteNewsDetails)
  );

  //BANNER
  router.get("/banner", asyncHandleCatch(BannerController.getBanner));
  router.get("/banner/:id", asyncHandleCatch(BannerController.getBannerById));
  router.post(
    "/banner",
    validateMiddleware(InsertBannerRequest),
    validateImageMiddleware,
    asyncHandleCatch(BannerController.insertBanner)
  );
  router.put(
    "/banner/:id",
    validateMiddleware(UpdateBannerRequest),
    validateImageMiddleware,
    asyncHandleCatch(BannerController.updateBanner)
  );
  router.delete("/banner/:id", asyncHandleCatch(BannerController.deleteBanner));

  //BANNERDETAILS
  router.get(
    "/bannerdetails",
    asyncHandleCatch(BannerDetailsController.getBannerDetails)
  );
  router.get(
    "/bannerdetails/:id",
    asyncHandleCatch(BannerDetailsController.getBannerDetailsById)
  );
  router.post(
    "/bannerdetails",
    validateMiddleware(InsertBannerDetailsRequest),
    asyncHandleCatch(BannerDetailsController.insertBannerDetails)
  );

  router.put(
    "/bannerdetails/:id",
    validateMiddleware(UpdateBannerDetailsRequest),
    asyncHandleCatch(BannerDetailsController.updateBannerDetails)
  );

  router.delete(
    "/bannerdetails/:id",
    asyncHandleCatch(BannerDetailsController.deleteBannerDetails)
  );

  //UPDATEIMAGE
  router.post(
    "/images/upload",
    uploadImages.array("images", 5),
    asyncHandleCatch(ImagesController.imageUpload)
  );

  router.get(
    "/images/:fileImage",
    asyncHandleCatch(ImagesController.viewImage)
  );

  router.delete(
    "/images/:fileImage",
    uploadImages.array("images", 1),
    asyncHandleCatch(ImagesController.deleteImage)
  );

  //CART
  router.get("/carts", asyncHandleCatch(CartsController.getCart));
  router.get("/carts/:id", asyncHandleCatch(CartsController.getCartById));
  router.post(
    "/carts",
    validateMiddleware(InsertCartScheme),
    asyncHandleCatch(CartsController.insertCart)
  );

  router.delete("/carts/:id", asyncHandleCatch(CartsController.deleteCart));

  //CARTITEM
  router.get("/cart-item", asyncHandleCatch(CartItemController.getCartItem));
  router.get(
    "/cart-item/:id",
    asyncHandleCatch(CartItemController.getCartItemById)
  );

  //Gắn router vào app
  app.use("/api/", router);
};

export { AppRouter };
