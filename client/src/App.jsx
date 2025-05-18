import React,{useEffect} from 'react'
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Newcustomer from './pages/admin/Newcustomer'
import Customerlist from './pages/admin/Customerlist'
import Pamenttransfer from './pages/admin/Pamenttransfer'
import Newuser from './pages/admin/Newuser'
import Userlist from './pages/admin/Userlist'
import Userrolelist from './pages/admin/Userrolelist'
import Userprofile from './pages/admin/Userprofile'
import Newticket from './pages/admin/Newticket'
import Ticketlist from './pages/admin/Ticketlist'
import Bdashboard from './pages/business_admin/Bdashboard'
import Bnewpage from './pages/business_admin/Bnewpage'
import Ballpages from './pages/business_admin/Ballpages'
import Bnewpost from './pages/business_admin/Bnewpost'
import Ballpost from './pages/business_admin/Ballpost'
import Bpostcategories from './pages/business_admin/Bpostcategories'
import Bposttags from './pages/business_admin/Bposttags'
import Postcomment from './pages/business_admin/Postcomment'
import Baddlibrary from './pages/business_admin/Baddnewlibrary'
import Balllibrary from './pages/business_admin/Balllibrary'
import Baddnewlibrary from './pages/business_admin/Baddnewlibrary'
import Bnewticket from './pages/business_admin/Bnewticket'
import Bticketlist from './pages/business_admin/Bticketlist'
import Bnewuser from './pages/business_admin/Bnewuser'
import Buserlist from './pages/business_admin/Buserlist'
import Buserrolelist from './pages/business_admin/Buserrolelist'
import Bthemes from './pages/business_admin/Bthemes'
import Bnewcategory from './pages/business_admin/Bnewcategory'
import Bnewtag from './pages/business_admin/Bnewtag'
import Bnewcomment from './pages/business_admin/Bnewcomment'
import Appintegration from './pages/business_admin/Appintegration'
import Bpamenttransfer from './pages/business_admin/Bpamenttransfer'
import Bwebsetting from './pages/business_admin/Bwebsetting'
import Binstallplugns from './pages/business_admin/Binstallplugns'
import Brequiredplugins from './pages/business_admin/Brequiredplugins'
import Ballproducts from './pages/business_admin/Ballproducts'
import Baddnewproduct from './pages/business_admin/Baddnewproduct'
import Webmenu from './pages/business_admin/Webmenu'
import Ballorder from './pages/business_admin/Ballorder'
import Breviews from './pages/business_admin/Breviews'
import Bcategory from './pages/business_admin/Bcategory'
import Productnewcategory from './pages/business_admin/Productnewcategory'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Resetpassword from './pages/Resetpassword'
import Sendotp from './pages/Sendotp'
import Newpriceplan from './pages/admin/Newpriceplan'
import Newpament from './pages/admin/Newpamnet'
import Bproducttag from './pages/business_admin/Bproducttag'
import Bproductnewtag from './pages/business_admin/Bproductnewtag'
import Bproductbrand from './pages/business_admin/Bproductbrand'
import Bsetting from './pages/business_admin/Bsetting'
import Bcoupon from './pages/business_admin/Bcoupon'
import Bdelivery from './pages/business_admin/Bdelivery'
import Bcustomer from './pages/business_admin/Bcustomer'
import Bnewcustomer from './pages/business_admin/Bnewcustomer'
import Bnewdelivery from './pages/business_admin/Bnewdelivery'
import Bneworder from './pages/business_admin/Bneworder'
import Bnewcoupon from './pages/business_admin/Bnewcoupon'
import Bnewbrand from './pages/business_admin/Bnewbrand'
import Bnewuserrole from './pages/business_admin/Bnewuserrole'
import Userrole from './pages/admin/Userrole'
import Billingupdate from './pages/business_admin/Billingupdate'
import Confirmpassword from './pages/Confirmpassword'
import Beditreview from './pages/business_admin/Beditreview'
import Categorylist from './pages/admin/category/Categorylist'
import Newcategory from './pages/admin/category/Newcategory'
import Themelist from './pages/admin/appearance/Themelist'
import Pluginlist from './pages/admin/appearance/Pluginlist'
import Paymenttransfer from './pages/admin/price/Paymenttransfer'
import Priceplanlist from './pages/admin/price/Priceplanlist'
import Newtheme from './pages/admin/appearance/Newtheme'
import Newplugin from './pages/admin/appearance/Newplugin'
import Costplan from './pages/admin/price/Costplan'
import Pricenewpayment from './pages/admin/price/Pricenewpayment'
import Addnewlibrary from './pages/admin/library/Addnewlibrary'
import Librarylist from './pages/admin/library/Librarylist'
import Superlogin from './pages/admin/authentication/Superlogin'
import Supersendotp from './pages/admin/authentication/Supersendotp'
import Supersignup from './pages/admin/authentication/Supersignup'
import Superresetpassword from './pages/admin/authentication/Superresetpassword'
import Superconfirmpassword from './pages/admin/authentication/Superconfirmpassword'
import Viewticket from './pages/business_admin/ticket/Viewticket'
import Ticketreplay from './pages/business_admin/ticket/Ticketreplay'
import Viewuser from './pages/business_admin/user/Viewuser'
import Edituser from './pages/business_admin/user/Edituser'
import Edituserole from './pages/business_admin/user/Edituserole'
import Paymentinvoice from './pages/business_admin/payment/Paymentinvoice'
import Areplyticket from './pages/admin/ticket/Areplyticket'
import Aviewticket from './pages/admin/ticket/Aviewticket'
import Cart from './pages/business_admin/checkout/Cart'
import Checkout from './pages/business_admin/checkout/Checkout'
import Orderconfirm from './pages/business_admin/checkout/Orderconfirm'
import AEdituserole from "./pages/admin/user/Edituserole"
import AViewuser from "./pages/admin/user/Viewuser"
import AEdituser from "./pages/admin/user/Edituser"
import Edittheme from './pages/admin/appearance/Edittheme'
import Viewtheme from './pages/admin/appearance/Viewtheme'
import Editplugin from './pages/admin/appearance/Editplugin'
import Themecategory from './pages/admin/appearance/category/Themecategory'
import Themenewcategory from './pages/admin/appearance/category/Themenewcategory'
import Themetag from './pages/admin/appearance/tag/Themetag'
import Themenewtag from './pages/admin/appearance/tag/Themenewtag'
import Plugincategory from './pages/admin/appearance/plugin/Plugincategory'
import Pluginnewcategory from './pages/admin/appearance/plugin/Pluginnewcategory'
import Plugintag from './pages/admin/appearance/plugin/Plugintag'
import Pluginnewtag from './pages/admin/appearance/plugin/Pluginnewtag'
import Pluginreview from './pages/admin/appearance/plugin/Pluginreview'
import Plugineditreview from './pages/admin/appearance/plugin/Plugineditreview'
import Pluginedittag from './pages/admin/appearance/plugin/Pluginedittag'
import Plugineditcategory from './pages/admin/appearance/plugin/Plugineditcategory'
import Editcategory from './pages/admin/category/Editcategory'
import Editpriceplan from './pages/admin/price/Editpriceplan'
import Editcustomer from './pages/admin/customer/Editcustomer'
import Viewcustomer from './pages/admin/customer/Viewcustomer'
import Apaymentinvoice from './pages/admin/price/Apaymentinvoice'
import Editinvoice from './pages/admin/invoice/Editinvoice'
import Editthemecategory from './pages/admin/appearance/category/Editthemecategory'
import Editthemetag from './pages/admin/appearance/tag/Editthemetag'
import Themereview from './pages/admin/appearance/theme/Themereview'
import Themeeditreview from './pages/admin/appearance/theme/Themeeditreview'
import Viewcategory from './pages/admin/category/Viewcategory'
import Viewpriceplan from './pages/admin/price/Viewpriceplan'
import Viewplugin from './pages/admin/appearance/Viewplugin'
import Viewthemecategory from './pages/admin/appearance/theme/Viewthemecategory'
import Viewtag from './pages/admin/appearance/tag/Viewtag'
import Viewplugincategory from './pages/admin/appearance/plugin/Viewplugincategory'
import Newcountry from './pages/admin/settings/Newcountry'
import Newlanguage from './pages/admin/settings/Newlanguage'
import Newtimezone from './pages/admin/settings/Newtimezone'
import Newtimeformat from './pages/admin/settings/Newtimeformat'
import Newdateformat from './pages/admin/settings/Newdateformat'
import Newappintegration from './pages/admin/settings/Newappintegration'
import Countrylist from './pages/admin/settings/country/Countrylist'
import Languagelist from './pages/admin/settings/language/Languagelist'
import Timezonelist from './pages/admin/settings/timezone/Timezonelist'
import Timeformat from './pages/admin/settings/timeformat/Timeformat'
import Dateformat from './pages/admin/settings/dateformat/Dateformat'
import Appintegrationlist from './pages/admin/settings/appintegration/Appintegrationlist'
import Websetting from './pages/admin/settings/websetting/Websetting'
import Couponlist from './pages/admin/customer/coupon/Couponlist'
import Newcoupon from './pages/admin/customer/coupon/Newcoupon'
import Websettings from './pages/customer_authorization/Websettings'
import Packageoption from './pages/customer_authorization/Packageoption'
import Viewcart from './pages/customer_authorization/Viewcart'
import Customercheckout from './pages/customer_authorization/Customercheckout'
import { HelmetProvider } from 'react-helmet-async';
import SEO from './SEO'
import Viewcountry from './pages/admin/settings/country/Viewcountry'
import Editcountry from './pages/admin/settings/country/Editcountry'
import Viewlangugae from './pages/admin/settings/language/Viewlangugae'
import Editlanguage from './pages/admin/settings/language/Editlanguage'
import Viewtimezone from './pages/admin/settings/timezone/Viewtimezone'
import Edittimezone from './pages/admin/settings/timezone/Edittimezone'
import Viewtimeformat from './pages/admin/settings/timeformat/Viewtimeformat'
import Edittimeformat from './pages/admin/settings/timeformat/Edittimeformat'
import Viewedateformat from './pages/admin/settings/dateformat/Viewedateformat'
import Editdateformat from './pages/admin/settings/dateformat/Editdateformat'
import Viewcoupon from './pages/admin/customer/coupon/Viewcoupon'
import Editcoupon from './pages/admin/customer/coupon/Editcoupon'
import Settings from './pages/admin/settings/Settings'
// ... other imports ...
const App = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const registrationStep = localStorage.getItem("registrationStep");

    if (registrationStep === "1") {
      navigate("/super-otp"); // Redirect to OTP page
    } else if (registrationStep === "2") {
      navigate("/web-settings"); // Redirect to Web settings page
    }
  }, []); // This will run once when the component mounts

  return (
     <HelmetProvider>
      <SEO />
    <Routes>
    <Route exact path="/super-dashboard"element={<Dashboard/>}/>
    {/* -------------super customer-------------- */}
    <Route exact path="/super-new-customer"element={<Newcustomer/>}/>
    <Route exact path="/super-customer-list"element={<Customerlist/>}/>
    <Route exact path="/super-edit-customer"element={<Editcustomer/>}/>
    <Route exact path="/super-view-customer"element={<Viewcustomer/>}/>
    {/* ----------------super price------------ */}
    <Route exact path="/super-credit-cost-plan"element={<Costplan/>}/>
    <Route exact path="/super-new-price-plan"element={<Newpriceplan/>}/>
    <Route exact path="/super-coupon-list"element={<Couponlist/>}/>
    <Route exact path="/super-new-coupon"element={<Newcoupon/>}/>
    <Route exact path="/super-view-coupon/:id"element={<Viewcoupon/>}/>
    <Route exact path="/super-edit-coupon/:id"element={<Editcoupon/>}/>
    {/* --------------------------------------price-plan---------------------- */}
    <Route exact path="/super-view-price-plan/:id"element={<Viewpriceplan/>}/>
    <Route exact path="/super-new-payment"element={<Pricenewpayment/>}/>
    <Route exact path="/super-price-plan-list"element={<Priceplanlist/>}/>
    <Route exact path="/super-edit-price-plan/:id"element={<Editpriceplan/>}/>
    <Route exact path="/super-payment-transfer"element={<Paymenttransfer/>}/>
    <Route exact path="/super-payment-invoice/:id"element={<Apaymentinvoice/>}/>
    <Route exact path="/super-payment-edit-invoice/:id"element={<Editinvoice/>}/>

    {/* ------------------------super-category--------------------------- */}
    <Route exact path="/super-new-business-category"element={<Newcategory/>}/>
    <Route exact path="/super-business-category-list"element={<Categorylist/>}/>
    <Route exact path="/super-business-edit-category/:id"element={<Editcategory/>}/>
    <Route exact path="/super-view-category/:id"element={<Viewcategory/>}/>

    {/* ------------------------super-library--------------------------- */}
    <Route exact path="/super-new-library"element={<Addnewlibrary/>}/>
    <Route exact path="/super-all-library"element={<Librarylist/>}/>
    {/* ------------------------appearance--------------------------- */}
    <Route exact path="/super-theme-list"element={<Themelist/>}/>
    <Route exact path="/super-edit-theme-list"element={<Edittheme/>}/>

    <Route exact path="/super-view-theme-list"element={<Viewtheme/>}/>
    <Route exact path="/super-plugin-list"element={<Pluginlist/>}/>
    <Route exact path="/super-edit-plugin-list"element={<Editplugin/>}/>
    <Route exact path="/super-new-theme"element={<Newtheme/>}/>
    <Route exact path="/super-view-theme-category"element={<Viewthemecategory/>}/>
    <Route exact path="/super-view-plgin"element={<Viewplugin/>}/>
    <Route exact path="/super-new-plugin"element={<Newplugin/>}/>
    <Route exact path="/super-theme-category-list"element={<Themecategory/>}/>
    <Route exact path="/super-edit-theme-category"element={<Editthemecategory/>}/>
    <Route exact path="/super-new-theme-category"element={<Themenewcategory/>}/>
    <Route exact path="/super-theme-tag-list"element={<Themetag/>}/>
    <Route exact path="/super-edit-theme-tag"element={<Editthemetag/>}/>
    <Route exact path="/super-new-theme-tag"element={<Themenewtag/>}/>
    <Route exact path="/super-view-theme-tag"element={<Viewtag/>}/>
    <Route exact path="/super-theme-review-list"element={<Themereview/>}/>
    <Route exact path="/super-edit-theme-review"element={<Themeeditreview/>}/>
    <Route exact path="/super-retail-setting"element={<Settings/>}/>

    <Route exact path="/super-plugin-category-list"element={<Plugincategory/>}/>
    <Route exact path="/super-new-plugin-category"element={<Pluginnewcategory/>}/>
    <Route exact path="/super-view-plugin-category"element={<Viewplugincategory/>}/>
    <Route exact path="/super-edit-plugin-category"element={<Plugineditcategory/>}/>
    <Route exact path="/super-plugin-tag-list"element={<Plugintag/>}/>
    <Route exact path="/super-new-plugin-tag"element={<Pluginnewtag/>}/>
    <Route exact path="/super-edit-plugin-tag"element={<Pluginedittag/>}/>
    <Route exact path="/super-plugin-review-list"element={<Pluginreview/>}/>
    <Route exact path="/super-edit-plugin-review-list"element={<Plugineditreview/>}/>
   {/* ------------------setting---------------------------- */}
   <Route exact path="/super-new-country"element={<Newcountry/>}/>
   <Route exact path="/super-view-country/:id"element={<Viewcountry/>}/>
   <Route exact path="/super-edit-country/:id"element={<Editcountry/>}/>
   <Route exact path="/super-new-language"element={<Newlanguage/>}/>
   <Route exact path="/super-view-language/:id"element={<Viewlangugae/>}/>
   <Route exact path="/super-edit-language/:id"element={<Editlanguage/>}/>
   <Route exact path="/super-new-timezone"element={<Newtimezone/>}/>
      <Route exact path="/super-view-timezone/:id"element={<Viewtimezone/>}/>
   <Route exact path="/super-edit-timezone/:id"element={<Edittimezone/>}/>
   <Route exact path="/super-new-time-format"element={<Newtimeformat/>}/>
         <Route exact path="/super-view-time-format/:id"element={<Viewtimeformat/>}/>
   <Route exact path="/super-edit-time-format/:id"element={<Edittimeformat/>}/>
   <Route exact path="/super-new-date-format"element={<Newdateformat/>}/>
            <Route exact path="/super-view-date-format/:id"element={<Viewedateformat/>}/>
   <Route exact path="/super-edit-date-format/:id"element={<Editdateformat/>}/>
   <Route exact path="/super-new-app-integration"element={<Newappintegration/>}/>
   <Route exact path="/super-country-list"element={<Countrylist/>}/>
   <Route exact path="/super-language-list"element={<Languagelist/>}/>
   <Route exact path="/super-time-zone-list"element={<Timezonelist/>}/>
   <Route exact path="/super-time-format-list"element={<Timeformat/>}/>
   <Route exact path="/super-date-format-list"element={<Dateformat/>}/>
   <Route exact path="/super-app-integration-list"element={<Appintegrationlist/>}/>
   <Route exact path="/super-web-setting"element={<Websetting/>}/>

   {/* ------------------setting---------------------------- */}
    {/* --------------------super user------------ */}
    <Route exact path="/super-new-user"element={<Newuser/>}/>
    <Route exact path="/super-user-list"element={<Userlist/>}/>
    <Route exact path="/super-user-role-list"element={<Userrolelist/>}/>
    <Route exact path="/super-new-user-role"element={<Userrole/>}/>
    <Route exact path="/super-user-profile"element={<Userprofile/>}/>
    <Route exact path="/users/super-edit-user-role/:id"element={<AEdituserole/>}/>
    <Route exact path="/users/super-view-user/:id"element={<AViewuser/>}/>
    <Route exact path="/users/super-edit-user/:id"element={<AEdituser/>}/>
    {/* ----------------super ticket---------- */}
    <Route exact path="/super-new-tickets"element={<Newticket/>}/>
    <Route exact path="/super-ticket-list"element={<Ticketlist/>}/>
    <Route exact path="/support-ticket/super-view-ticket/:id"element={<Aviewticket/>}/>
    <Route exact path="/support-ticket/super-replay-ticket/:id"element={<Areplyticket/>}/>
    {/* -------------------authentication------------------------- */}
    <Route exact path="/super-login"element={<Superlogin/>}/>
    <Route exact path="/super-otp"element={<Supersendotp/>}/>
    <Route exact path="/super-signup"element={<Supersignup/>}/>
    <Route exact path="/super-reset-password"element={<Superresetpassword/>}/>
    <Route exact path="/super-confirm-password"element={<Superconfirmpassword/>}/>
    {/* -----------------------business admin -------------------------- */}
    <Route exact path="/dashboard"element={<Bdashboard/>}/>
    {/* --------------------pages------------------- */}
    <Route exact path="/pages/new-page"element={<Bnewpage/>}/>
    <Route exact path="/pages/page-list"element={<Ballpages/>}/>
    {/* --------------------contents------------------- */}
    <Route exact path="/contents/new-post-content"element={<Bnewpost/>}/>
    <Route exact path="/contents/post-content-list"element={<Ballpost/>}/>
    <Route exact path="/contents/post-content-category-list"element={<Bpostcategories/>}/>
    <Route exact path="/contents/new-post-content-category"element={<Bnewcategory/>}/>
    <Route exact path="/contents/post-content-tag-list"element={<Bposttags/>}/>
    <Route exact path="/contents/new-post-content-tag"element={<Bnewtag/>}/>
    <Route exact path="/contents/post-content-comment-list"element={<Postcomment/>}/>
    <Route exact path="/contents/edit-post-content-comment"element={<Bnewcomment/>}/>
    {/* -----------------busness library------------------ */}
    <Route exact path="/upload-library/new-library"element={<Baddnewlibrary/>}/>
    <Route exact path="/upload-library/library-list"element={<Balllibrary/>}/>
    {/* --------------suport ticket---------------- */}
    <Route exact path="/support-ticket/new-ticket"element={<Bnewticket/>}/>
    <Route exact path="/support-ticket/ticket-list"element={<Bticketlist/>}/>
    <Route exact path="/support-ticket/view-ticket"element={<Viewticket/>}/>
    <Route exact path="/support-ticket/replay-ticket"element={<Ticketreplay/>}/>

    {/* --------------suport ticket---------------- */}
    <Route exact path="/users/new-user"element={<Bnewuser/>}/>
    <Route exact path="/users/view-user"element={<Viewuser/>}/>
    <Route exact path="/users/edit-user"element={<Edituser/>}/>
    <Route exact path="/users/user-list"element={<Buserlist/>}/>
    <Route exact path="/users/user-role-list"element={<Buserrolelist/>}/>
    <Route exact path="/users/edit-user-role"element={<Edituserole/>}/>
    <Route exact path="/users/new-user-role"element={<Bnewuserrole/>}/>
   {/* ---------------user list-------------------------- */}
    {/* ---------------setting----------------------- */}
    <Route exact path="/setting/app-integration"element={<Appintegration/>}/>
    <Route exact path="/setting/payment-transfer"element={<Bpamenttransfer/>}/>
    <Route exact path="/setting/payment-transfer-invoice"element={<Paymentinvoice/>}/>
    <Route exact path="/setting/new-payment"element={<Newpament/>}/>
    <Route exact path="/setting/web-setting"element={<Bwebsetting/>}/>
    <Route exact path="/setting/billing-update"element={<Billingupdate/>}/>
    {/* ---------------setting----------------------- */}
    <Route exact path="/appearance/themes"element={<Bthemes/>}/>
    <Route exact path="/appearance/install-plugins"element={<Binstallplugns/>}/>
    <Route exact path="/appearance/required-plugins"element={<Brequiredplugins/>}/>
    <Route exact path="/appearance/web-menus"element={<Webmenu/>}/>
    {/* -------------------------appearance-------------------- */}
    <Route exact path="/products/product-list"element={<Ballproducts/>}/>
    <Route exact path="/products/new-product"element={<Baddnewproduct/>}/>
    {/* -----------product order------------- */}
    <Route exact path="/products/product-order-list"element={<Ballorder/>}/>
    <Route exact path="/products/new-product-order"element={<Bneworder/>}/>
    {/* -------------product coupon---------------- */}
    <Route exact path="/products/product-coupon-list"element={<Bcoupon/>}/>
    <Route exact path="/products/new-product-coupon"element={<Bnewcoupon/>}/>
    {/* <Route exact path="/products/review-list"element={<Breviews/>}/> */}
    <Route exact path="/products/edit-product-review"element={<Beditreview/>}/>
    {/* --------------------product category----------- */}
    <Route exact path="/products/product-category-list"element={<Bcategory/>}/>
    <Route exact path="/products/new-product-category"element={<Productnewcategory/>}/>
    {/* --------------------product category----------- */}
    <Route exact path="/products/product-tag-list"element={<Bproducttag/>}/>
    <Route exact path="/products/new-product-tag"element={<Bproductnewtag/>}/>
    {/* ---------------------product-tag----------------- */}
    <Route exact path="/products/product-brand-list"element={<Bproductbrand/>}/>
    <Route exact path="/products/new-product-brand"element={<Bnewbrand/>}/>
    {/* ---------------product-brand--------------- */}
    <Route exact path="/products/product-setting"element={<Bsetting/>}/>
    <Route exact path="/products/product-delivery-list"element={<Bdelivery/>}/>
    <Route exact path="/products/new-product-delivery"element={<Bnewdelivery/>}/>
    <Route exact path="/products/product-customer-list"element={<Bcustomer/>}/>
    <Route exact path="/products/new-product-customer"element={<Bnewcustomer/>}/>
    {/* ----------------------cart-pages----------------------- */}
    <Route exact path="/cart"element={<Cart/>}/>
    <Route exact path="/checkout"element={<Checkout/>}/>
    <Route exact path="/order-confirmation"element={<Orderconfirm/>}/>
    {/* ----------------product review---------------- */}
    <Route exact path="/products/product-review-list"element={<Breviews/>}/>
    <Route exact path="/register"element={<Signup/>}/>
    <Route exact path="/login"element={<Login/>}/>
    <Route exact path="/reset-password"element={<Resetpassword/>}/>
    <Route exact path="/confirm-password"element={<Confirmpassword/>}/>
    <Route exact path="/otp/:email"element={<Sendotp/>}/>
    <Route exact path="/web-settings"element={<Websettings/>}/>
    <Route exact path="/choose-package"element={<Packageoption/>}/>
    <Route exact path="/view-cart"element={<Viewcart/>}/>
    <Route exact path="/confirm-checkout"element={<Customercheckout/>}/>

    {/* -----------------------business admin -------------------------- */}
   </Routes>
    </HelmetProvider>
   
  )
}

export default App