(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_dashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _partials_footer_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partials/footer.vue */ "./resources/js/views/partials/footer.vue");
/* harmony import */ var _partials_sidebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./partials/sidebar.vue */ "./resources/js/views/partials/sidebar.vue");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth */ "./resources/js/auth.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var secure_ls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! secure-ls */ "./node_modules/secure-ls/dist/secure-ls.js");
/* harmony import */ var secure_ls__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(secure_ls__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Dashbaord',
  components: {
    Footer: _partials_footer_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    Sidebar: _partials_sidebar_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    BTab: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__.BTab,
    BTable: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__.BTable
  },
  computed: {
    user: function user() {
      return this.$store.state.user;
    },
    rooms: function rooms() {
      return this.$store.state.rooms;
    },
    validRoomForm: function validRoomForm() {
      return this.room !== '';
    },
    confirmedPassword: function confirmedPassword() {
      if (!this.user.password || this.user.password == '') return true;
      return this.user.password === this.confirmPassword;
    },
    validProfileForm: function validProfileForm() {
      return this.user.email !== '' && this.user.name !== '' && this.user.password == this.confirmPassword;
    }
  },
  methods: {
    logout: function logout() {
      var _this = this;

      this.$store.dispatch('signOut').then(function (response) {
        var ls = new (secure_ls__WEBPACK_IMPORTED_MODULE_4___default())();
        ls.remove('user');
        ls.remove('token');

        _this.$router.replace('/').then(function () {
          _this.$bvToast.toast('👋', {
            title: 'Goodbay..',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000
          });
        });
      });
    },
    addRoom: function addRoom(event) {
      var _this2 = this;

      event.preventDefault(); // Disable button

      this.$refs.submitRoomBtn.setAttribute('disabled', true); // Dispatch API action

      this.$store.dispatch('addRoom', {
        name: this.room
      }).then(function (response) {
        _this2.room = '';

        _this2.$bvToast.toast(response.message, {
          title: 'C\'est fait!',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000
        });
      })["catch"](function (error) {
        _this2.$bvToast.toast(error.message, {
          title: 'Quelque chose ne va pas!',
          variant: 'warning',
          solid: true,
          autoHideDelay: 5000
        });
      })["finally"](function () {
        _this2.$refs.submitRoomBtn.removeAttribute('disabled');
      });
    },
    loadRooms: function loadRooms() {
      var _this3 = this;

      // Dispatch API action
      this.$store.dispatch('fetchRooms')["catch"](function (error) {
        _this3.$bvToast.toast(error.message, {
          title: 'Quelque chose ne va pas!',
          variant: 'warning',
          solid: true,
          autoHideDelay: 5000
        });
      });
    },
    updateProfile: function updateProfile(event) {
      var _this4 = this;

      event.preventDefault(); // Disable button

      this.$refs.updateProfileBtn.setAttribute('disabled', true); // Dispatch API action

      this.$store.dispatch('updateProfile', {
        uuid: this.user.uuid,
        email: this.user.email,
        password: this.user.password,
        fullname: this.user.name
      }).then(function (response) {
        // Update local storage
        var ls = new (secure_ls__WEBPACK_IMPORTED_MODULE_4___default())();
        ls.set('user', response.content);

        _this4.$bvToast.toast(response.message, {
          title: 'C\'est fait!',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000
        });
      })["catch"](function (error) {
        _this4.$bvToast.toast(error.message, {
          title: 'Quelque chose ne va pas!',
          variant: 'warning',
          solid: true,
          autoHideDelay: 5000
        });
      })["finally"](function () {
        _this4.$refs.updateProfileBtn.removeAttribute('disabled');
      });
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    var isLoggedIn = (0,_auth__WEBPACK_IMPORTED_MODULE_2__.isUserLoggedIn)();

    if (!isLoggedIn) {
      next({
        name: 'auth-signin'
      });
    }

    next();
  },
  mounted: function mounted() {
    // Load rooms
    if (typeof this.rooms === "undefined" || this.rooms === null || Object.values(this.rooms).length === 0) this.loadRooms();
  },
  data: function data() {
    return {
      active: 'dashboard',
      room: '',
      roomFields: [{
        key: 'name',
        label: 'Nom',
        sortable: true
      }, {
        key: 'user.name',
        label: 'User',
        sortable: true
      }, {
        key: 'created_at',
        label: 'Créé à',
        sortable: true
      }],
      confirmPassword: null
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Footer'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Sidebar'
});

/***/ }),

/***/ "./resources/js/views/dashboard.vue":
/*!******************************************!*\
  !*** ./resources/js/views/dashboard.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.vue?vue&type=template&id=7eb83ab6& */ "./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6&");
/* harmony import */ var _dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.vue?vue&type=script&lang=js& */ "./resources/js/views/dashboard.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__.render,
  _dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/dashboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/partials/footer.vue":
/*!************************************************!*\
  !*** ./resources/js/views/partials/footer.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.vue?vue&type=template&id=07373e89& */ "./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89&");
/* harmony import */ var _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.vue?vue&type=script&lang=js& */ "./resources/js/views/partials/footer.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__.render,
  _footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/partials/footer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/partials/sidebar.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/partials/sidebar.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.vue?vue&type=template&id=ef49e244& */ "./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244&");
/* harmony import */ var _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar.vue?vue&type=script&lang=js& */ "./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__.render,
  _sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/partials/sidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/dashboard.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/views/dashboard.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/partials/footer.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/partials/footer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./footer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dashboard_vue_vue_type_template_id_7eb83ab6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./dashboard.vue?vue&type=template&id=7eb83ab6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6&");


/***/ }),

/***/ "./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_07373e89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./footer.vue?vue&type=template&id=07373e89& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89&");


/***/ }),

/***/ "./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_template_id_ef49e244___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./sidebar.vue?vue&type=template&id=ef49e244& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/dashboard.vue?vue&type=template&id=7eb83ab6& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "b-row",
        {
          staticClass: "main-card",
          attrs: { "align-v": "center", "align-h": "center" }
        },
        [
          _c(
            "b-col",
            { attrs: { md: "10" } },
            [
              _c(
                "b-card",
                {
                  staticClass: "overflow-hidden",
                  staticStyle: { "min-height": "50vh" },
                  attrs: { "no-body": "" }
                },
                [
                  _c(
                    "b-card-body",
                    [
                      _c(
                        "b-tabs",
                        { attrs: { fill: "" } },
                        [
                          _c("b-tab", {
                            attrs: {
                              active: _vm.active === "dashboard",
                              title: "Dashboard"
                            },
                            on: {
                              click: function($event) {
                                _vm.active = "dashboard"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "b-tab",
                            {
                              attrs: {
                                active: _vm.active === "rooms",
                                title: "Rooms"
                              },
                              on: {
                                click: function($event) {
                                  _vm.active = "rooms"
                                }
                              }
                            },
                            [
                              _c(
                                "b-row",
                                [
                                  _c(
                                    "b-col",
                                    { attrs: { md: "4" } },
                                    [
                                      _c(
                                        "b-form",
                                        {
                                          staticClass: "mt-3 mb-3",
                                          on: { submit: _vm.addRoom }
                                        },
                                        [
                                          _c(
                                            "b-form-group",
                                            {
                                              attrs: {
                                                id: "room-group",
                                                label:
                                                  "Numéro ou nom de la chambre:",
                                                "label-for": "room"
                                              }
                                            },
                                            [
                                              _c("b-form-input", {
                                                attrs: {
                                                  id: "room",
                                                  type: "text",
                                                  placeholder:
                                                    "Entrer numéro ou nom",
                                                  required: ""
                                                },
                                                model: {
                                                  value: _vm.room,
                                                  callback: function($$v) {
                                                    _vm.room = $$v
                                                  },
                                                  expression: "room"
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-row",
                                            { attrs: { "align-h": "end" } },
                                            [
                                              _c(
                                                "b-col",
                                                { attrs: { cols: "12" } },
                                                [
                                                  _c(
                                                    "b-button",
                                                    {
                                                      ref: "submitRoomBtn",
                                                      attrs: {
                                                        block: "",
                                                        type: "submit",
                                                        variant: "primary",
                                                        disabled: !_vm.validRoomForm
                                                      }
                                                    },
                                                    [_vm._v("Ajouter")]
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-col",
                                    { attrs: { md: "8" } },
                                    [
                                      _c("b-table", {
                                        staticClass: "mt-3",
                                        attrs: {
                                          striped: "",
                                          hover: "",
                                          items: _vm.rooms,
                                          fields: _vm.roomFields
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-tab", {
                            attrs: {
                              active: _vm.active === "rservations",
                              title: "Reservations"
                            },
                            on: {
                              click: function($event) {
                                _vm.active = "rservations"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "b-tab",
                            {
                              attrs: {
                                active: _vm.active === "profile",
                                title: "Update profile"
                              },
                              on: {
                                click: function($event) {
                                  _vm.active = "profile"
                                }
                              }
                            },
                            [
                              _c(
                                "b-row",
                                { attrs: { "align-h": "center" } },
                                [
                                  _c(
                                    "b-col",
                                    { attrs: { cols: "6" } },
                                    [
                                      _c(
                                        "b-form",
                                        {
                                          staticClass: "mt-3 mb-3",
                                          on: { submit: _vm.updateProfile }
                                        },
                                        [
                                          _c(
                                            "b-form-group",
                                            {
                                              attrs: {
                                                id: "fullname-group",
                                                label: "Nom complet :",
                                                "label-for": "fullname"
                                              }
                                            },
                                            [
                                              _c("b-form-input", {
                                                attrs: {
                                                  id: "fullname",
                                                  type: "text",
                                                  placeholder:
                                                    "Entrez votre nom et prénom",
                                                  required: ""
                                                },
                                                model: {
                                                  value: _vm.user.name,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.user,
                                                      "name",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "user.name"
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-group",
                                            {
                                              attrs: {
                                                id: "email-group",
                                                label: "Adresse e-mail :",
                                                "label-for": "email"
                                              }
                                            },
                                            [
                                              _c("b-form-input", {
                                                attrs: {
                                                  id: "email",
                                                  type: "email",
                                                  placeholder:
                                                    "Entrer votre e-mail",
                                                  required: ""
                                                },
                                                model: {
                                                  value: _vm.user.email,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.user,
                                                      "email",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "user.email"
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-group",
                                            {
                                              attrs: {
                                                id: "password-group",
                                                label: "Mot de passe :",
                                                "label-for": "password"
                                              }
                                            },
                                            [
                                              _c("b-form-input", {
                                                attrs: {
                                                  id: "password",
                                                  type: "password",
                                                  placeholder:
                                                    "Entrer un mot de passe",
                                                  description:
                                                    "Votre mot de passe doit comporter entre 8 et 20 caractères, contenir des lettres et des chiffres.",
                                                  state: _vm.confirmedPassword
                                                },
                                                model: {
                                                  value: _vm.user.password,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.user,
                                                      "password",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "user.password"
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-group",
                                            {
                                              attrs: {
                                                id: "confirm-password-group",
                                                label:
                                                  "Mot de passe de confirmation :",
                                                "label-for": "confirm-password"
                                              }
                                            },
                                            [
                                              _c("b-form-input", {
                                                attrs: {
                                                  id: "confirm-password",
                                                  type: "password",
                                                  placeholder:
                                                    "Confirmer le mot de passe",
                                                  state: _vm.confirmedPassword
                                                },
                                                model: {
                                                  value: _vm.confirmPassword,
                                                  callback: function($$v) {
                                                    _vm.confirmPassword = $$v
                                                  },
                                                  expression: "confirmPassword"
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "b-form-invalid-feedback",
                                                {
                                                  attrs: {
                                                    state: _vm.confirmedPassword
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                                Le mot de passe de confirmation ne correspond pas au mot de passe.\n                                            "
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-row",
                                            { attrs: { "align-h": "end" } },
                                            [
                                              _c(
                                                "b-col",
                                                { attrs: { cols: "auto" } },
                                                [
                                                  _c(
                                                    "b-button",
                                                    {
                                                      ref: "updateProfileBtn",
                                                      attrs: {
                                                        type: "submit",
                                                        variant: "primary",
                                                        disabled: !_vm.validProfileForm
                                                      }
                                                    },
                                                    [_vm._v("Mettre à jour")]
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-tab", {
                            attrs: { title: "Logout" },
                            on: { click: _vm.logout }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("Footer")
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/footer.vue?vue&type=template&id=07373e89& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-row",
    { staticClass: "mt-3", attrs: { "align-h": "center" } },
    [
      _c("b-col", { staticClass: "text-center", attrs: { cols: "12" } }, [
        _vm._v("\n        Developed by "),
        _c("a", { attrs: { href: "https://baddi.info", target: "_blank" } }, [
          _vm._v("Mohamed Baddi")
        ]),
        _c("br"),
        _vm._v("Made with "),
        _c("i", {
          staticClass: "fas fa-heart",
          staticStyle: { color: "#69359c" }
        }),
        _vm._v(" & "),
        _c("i", {
          staticClass: "fas fa-coffee",
          staticStyle: { color: "#666633" }
        })
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/partials/sidebar.vue?vue&type=template&id=ef49e244& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-col",
    { staticClass: "d-none d-sm-none d-md-block", attrs: { md: "4" } },
    [
      _c("b-card-img", {
        staticClass: "rounded-0 card-img",
        attrs: { src: "/img/one.jpg", alt: "Image" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);