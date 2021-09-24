import Vue from 'vue'
if(window.location.pathname.includes("/panel") || window.location.pathname.includes("/dietician-panel")) {
  require('~/assets/css/admin/style.css');
}else if(!window.location.pathname.includes("/panel") && !window.location.pathname.includes("/dietician-panel")) {
require('~/assets/css/style.css');
}
