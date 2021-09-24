import Vue from 'vue';
if(window.location.pathname.includes("panel")) {
    require('./css/admin/style.css');
  }else if(!window.location.pathname.includes("panel")) {
    require('./css/style.css');
  }
