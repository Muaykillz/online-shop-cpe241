<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminAnalyticController;
use App\Http\Controllers\Admin\AdminInventoryController;
use App\Http\Controllers\Admin\AdminReviewsController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminManageCustomerController;
use App\Http\Controllers\Admin\AdminManageAdminsController;
use App\Http\Controllers\Admin\AdminFlashSaleController;
use App\Http\Controllers\Admin\AdminProfileController;


use App\Http\Controllers\Customer\CustomerAuthController;
use App\Http\Controllers\Customer\CustomerHomePageController;
use App\Http\Controllers\Customer\CustomerSearchPageController;
use App\Http\Controllers\Customer\CustomerProductDetailController;
use App\Http\Controllers\Customer\CustomerCartPageController;
use App\Http\Controllers\Customer\CustomerFlashSalePageController;
use App\Http\Controllers\Customer\CustomerProfileManagementController;
use App\Http\Controllers\Customer\CustomerCheckoutPageController;
use App\Http\Controllers\Customer\CustomerConfirmationPageController;
use App\Http\Controllers\Customer\CustomerMyOrderPageController;
use App\Http\Controllers\Customer\CustomerOrderDetailController;

use App\Http\Controllers\LogoutController;
use App\Http\Controllers\DataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are automatically prefixed with "/api" and are all wrapped
| in our custom CORS middleware to allow cross-origin requests.
|
*/

Route::middleware([Cors::class])->group(function () {

    // --- DataController (db/*) routes ---
    Route::get('db/users',              [DataController::class, 'getUsers']);
    Route::get('db/roles',              [DataController::class, 'getRoles']);
    Route::get('db/admins',             [DataController::class, 'getAdmins']);
    Route::get('db/customers',          [DataController::class, 'getCustomers']);
    Route::get('db/manufacturers',      [DataController::class, 'getManufacturers']);
    Route::get('db/categories',         [DataController::class, 'getCategories']);
    Route::get('db/products',           [DataController::class, 'getProducts']);
    Route::get('db/product-images',     [DataController::class, 'getProductImages']);
    Route::get('db/cart-items',         [DataController::class, 'getCartItems']);
    Route::get('db/order-statuses',     [DataController::class, 'getOrderStatuses']);
    Route::get('db/payment-methods',    [DataController::class, 'getPaymentMethods']);
    Route::get('db/payments',           [DataController::class, 'getPayments']);
    Route::get('db/orders',             [DataController::class, 'getOrders']);
    Route::get('db/order-items',        [DataController::class, 'getOrderItems']);
    Route::get('db/reviews',            [DataController::class, 'getReviews']);
    Route::get('db/promotions',         [DataController::class, 'getPromotions']);
    Route::get('db/promotion-products', [DataController::class, 'getPromotionProducts']);
    Route::get('db/addresses',          [DataController::class, 'getAddresses']);

    // --- Admin Routes ---
    Route::prefix('admin')->group(function () {
        // login is publicly accessible
        Route::post('login', [AdminAuthController::class, 'login']);

        // protected admin routes
        Route::middleware('admin.auth')->group(function () {
            Route::get('inventory',               [AdminInventoryController::class, 'getProductDetailBy']);
            Route::get('inventory/{product_id}',  [AdminInventoryController::class, 'getProductDetailByID']);
            Route::post('inventory',              [AdminInventoryController::class, 'createProduct']);
            Route::patch('inventory/{product_id}', [AdminInventoryController::class, 'updateProductDetailByID']);
            Route::delete('inventory/{product_id}', [AdminInventoryController::class, 'deleteProductByID']);

            Route::get('review', [AdminReviewsController::class, 'getProductCardBy']);
            Route::get('review/{product_id}', [AdminReviewsController::class, 'getProductReviewByID']);
            Route::put('review/{review_id}', [AdminReviewsController::class, 'replyCommentByID']);
            Route::delete('review/{review_id}', [AdminReviewsController::class, 'deleteCommentByID']);

            Route::get('order', [AdminOrderController::class, 'getOrderDetailBy']);
            Route::get('order/{order_id}', [AdminOrderController::class, 'getOrderDetailByID']);

            Route::get('customer', [AdminManageCustomerController::class, 'getCustomerListBy']);
            Route::delete('customer/{customer_id}', [AdminManageCustomerController::class, 'deleteCustomerByID']);

            Route::get('profile', [AdminProfileController::class, 'getProfile']);
            Route::put('profile', [AdminProfileController::class, 'updateProfile']);

            Route::post('promotion/create', [AdminFlashSaleController::class, 'createFlashSale']);
            Route::get('promotion', [AdminFlashSaleController::class, 'getFlashSaleBy']);
            Route::get('promotion/{promotion_id}', [AdminFlashSaleController::class, 'getFlashSaleByID']);
            Route::patch('promotion/{promotion_id}', [AdminFlashSaleController::class, 'updateFlashSaleByID']);
            Route::delete('promotion/{promotion_id}', [AdminFlashSaleController::class, 'deleteFlashSaleByID']);
            Route::get('promotion/add/{product_id}', [AdminFlashSaleController::class, 'getProductDetailByID']);

            Route::post('logout', [LogoutController::class, 'AdminLogout']);

            Route::middleware('role:Super Admin')->group(function () {
                // Admin Home Page
                Route::get('manage', [AdminManageAdminsController::class, 'getAdminListBy']);
                Route::delete('manage/{admin_id}', [AdminManageAdminsController::class, 'deleteAdminByID']);

                Route::get('dashboard', [AdminAnalyticController::class, 'getDashboardData']);
                Route::get('report', [AdminAnalyticController::class, 'getReportData']);
            });
        });
    });

    // --- Customer Routes ---
    Route::prefix('customer')->group(function () {
        Route::post('register', [CustomerAuthController::class, 'register']);
        Route::post('login',    [CustomerAuthController::class, 'login']);

        Route::middleware('customer.auth')->group(function () {
            Route::get('homepage/promotions/hero', [CustomerHomePageController::class, 'getHeroPromotions']);
            Route::get('homepage/products/hot', [CustomerHomePageController::class, 'getHotProducts']);
            Route::get('homepage/products/flashsales', [CustomerHomePageController::class, 'getFlashSalesProduct']);

            Route::get('search', [CustomerSearchPageController::class, 'searchProducts']);
            
            Route::get('product/{product_id}', [CustomerProductDetailController::class, 'getProductDetailByID']);
            Route::post('cart/add', [CustomerProductDetailController::class, 'addToCart']);

            Route::get('cart', [CustomerCartPageController::class, 'getCartDetailsByCustomerID']);
            Route::put('cart/update', [CustomerCartPageController::class, 'updateCartItemQuantity']);
            Route::delete('cart/remove', [CustomerCartPageController::class, 'removeFromCart']);

            Route::get('flash-sale/promotions', [CustomerFlashSalePageController::class, 'getActivePromotions']);
            Route::get('flash-sale/products', [CustomerFlashSalePageController::class, 'getFlashSaleProducts']);

            Route::get('profile/{user_id}', [CustomerProfileManagementController::class, 'getProfile']);
            Route::put('profile/{user_id}/update', [CustomerProfileManagementController::class, 'updateProfile']);
            Route::post('profile/address/add', [CustomerProfileManagementController::class, 'addAddress']);
            Route::put('profile/address/{address_id}/update', [CustomerProfileManagementController::class, 'updateAddress']);
            Route::delete('profile/address/remove', [CustomerProfileManagementController::class, 'deleteAddress']);

            Route::get('checkout', [CustomerCheckoutPageController::class, 'getCheckoutInfo']);
            Route::post('checkout/placeorder', [CustomerCheckoutPageController::class, 'placeOrder']);

            Route::get('confirmation/{order_id}', [CustomerConfirmationPageController::class, 'getConfirmationInfo']);

            Route::get('/orders', [CustomerMyOrderPageController::class, 'getCustomerOrders']);

            Route::get('orders/{order_id}/detail', [CustomerOrderDetailController::class, 'getOrderDetail']);
            
            Route::post('logout', [LogoutController::class, 'CustomerLogout']);
        });
    });
});
