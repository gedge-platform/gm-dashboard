import React from "react";
import reset from "styled-reset";
import theme from "@/styles/theme";
import { createGlobalStyle } from "styled-components";
import NotoR2 from "@/fonts/NotoSansKR/NotoSans-Regular.woff2";
import NotoR from "@/fonts/NotoSansKR/NotoSans-Regular.woff";
import NotoROtf from "@/fonts/NotoSansKR/NotoSansKR-Regular.otf";

import NotoL2 from "@/fonts/NotoSansKR/NotoSans-Light.woff2";
import NotoL from "@/fonts/NotoSansKR/NotoSans-Light.woff";
import NotoLOtf from "@/fonts/NotoSansKR/NotoSansKR-Light.otf";

import NotoM2 from "@/fonts/NotoSansKR/NotoSans-Medium.woff2";
import NotoM from "@/fonts/NotoSansKR/NotoSans-Medium.woff";
import NotoMOtf from "@/fonts/NotoSansKR/NotoSansKR-Medium.otf";

import NotoB2 from "@/fonts/NotoSansKR/NotoSans-Bold.woff2";
import NotoB from "@/fonts/NotoSansKR/NotoSans-Bold.woff";
import NotoBOtf from "@/fonts/NotoSansKR/NotoSansKR-Bold.otf";

import selectArr from "@/images/bullet/select_arr.png";
import passed from "@/images/bullet/ico_step_passed.png";
import deleteBtn from "@/images/bullet/dailog_close.png";
import deleteBtn2 from "@/images/ico-action/ico_del.png";
import terminalBtn from "@/images/ico-action/ico_terminal.png";

import { PanelBox } from "@/components/styles/PanelBox";

const globalStyles = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: url(${NotoROtf}) format('opentype'),
    url(${NotoR2}) format('woff2'),
    url(${NotoR}) format('woff');
    
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    src: url(${NotoLOtf}) format('opentype'),
    url(${NotoL2}) format('woff2'),
    url(${NotoL}) format('woff');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    src: url(${NotoMOtf}) format('opentype'),
    url(${NotoM2}) format('woff2'),
    url(${NotoM}) format('woff');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    src: url(${NotoBOtf}) format('opentype'),
    url(${NotoB2}) format('woff2'),
    url(${NotoB}) format('woff');
  }
  
  html {
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;
}::-webkit-scrollbar { width: 8px; height: 5px;}
::-webkit-scrollbar-button {  background-color: #666; }
::-webkit-scrollbar-track {  background-color: #646464;}
::-webkit-scrollbar-track-piece { background-color: #000;}
::-webkit-scrollbar-thumb { height: 25px; background-color: #666; border-radius: 3px;}
::-webkit-scrollbar-corner { background-color: #646464;}}
::-webkit-resizer { background-color: #666;}



  body, input, button, select, textarea, td {
    font-family: "Noto Sans", sans-serif;
    color: #626b7a;
    font-size: 12px;
    font-weight: 400
  }  
  *, *::before, *::after {
    box-sizing: border-box
  }
  button {
    cursor: pointer;
    outline: transparent;
    padding: 0;
  }
  input::-webkit-input-placeholder {opacity:0.4}
  input::-moz-placeholder {opacity:0.4}
  input:-ms-input-placeholder {opacity:0.4}  
  
  html, body {
    height: 100%
  }
  strong {
    font-weight: 500
  }

  .msplist {
    width: 100%
  }
  *:focus {
    outline: 0;
}
  .msplist th {
    background-color: #f5f6f9;
    height: 36px;
    font-size: 13px;
    line-height: 36px;
    text-align: left;
    padding-left: 14px;
    border-right: 1px solid #e0e2e5;
  }
  .msplist td{
    height:36px
  } 
  .msplist span {
    border: 1px solid blue;
    border-radius: 3px;
    font-size: 14px;
    color: white;
    background-color: #1355ce ;
    padding: 2px 15px;
     cursor: pointer;
  } 

  .msplist span:hover {
    background-color: #1a5eda ;
  }

  select {
    height: 36px;
    border: 1px solid #0f213e;
    color: #2f394a;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 30px; 
    padding-left: 10px;
    background: #fff url(${selectArr}) no-repeat right center;
  }
  select::-ms-expand {
    display: none;
  }
  textarea {
    resize: vertical;
  }
  a {
    color: #0082ff
  }
  ul, li {
    list-style: none;
  }
  
  .tb_container{
    margin: 10px;
  }
  .wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    min-width: 1680px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 12px;
      background-color: ${theme.colors.primary};
    }
  }
  
  .headerOption {
    position: absolute;
    top: 0;
    right: 10px;
    height: 64px;
    display: flex;
    align-items: center;
    color: #677183;
    font-size: 13px;
    select {
      min-width: 170px
    }
    .vmInfo {
      span {
        position: relative;
        display: inline-flex;
        line-height: 22px;
        padding-left: 24px;
        margin-left: 15px;
        &:first-child ~ span {
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            height: 10px;
            border-left: 1px solid #c5cad0;
            transform: translateY(-50%);
          }
        }
      }
      strong {
        display: inline-flex;
        padding: 0 10px;
        margin-top: -1px;
        font-size: 22px;
        font-weight: 700;
        &.c1 { color: ${theme.colors.primaryDark} }
        &.c2 { color: #000 }
        &.c3 { color: #ff5d4d }
      }
    }
  }
.search_icon:hover{
  color:#1a5eda
}
  .MuiButton-root {
    text-transform: none !important;
  }
  .btn_comm {
    min-width: 24px;
    min-height: 24px;
    border: 1px solid #bec3ca;
    border-radius: 3px;
    &:not(select) {
      /* background: linear-gradient(#fdfdfd,#f6f6f9); */
      background: #222C45;
      box-shadow: inset 0 0 1px #fff;
    }
  }
  .btnLabel_icon {
    ${theme.mixins.ir_btn};
    background-position: center center;
    background-repeat: no-repeat;
    &.hover {
      background-position-y: top;
      &:hover,&:focus {
        background-position-y: -20px
      }
    }
  }
  
  .MuiTooltip-popper {
    .MuiTooltip-tooltip {
      background-color: #0a2348 !important;
      font-family: inherit !important;
      font-size: 10px;
      font-weight: 300;
      padding: 4px 12px;
      margin: 6px 0
    }
    .MuiTooltip-arrow {
      color: #0a2348 !important;
    }
  }


  .state_ico {
    position: relative;
    padding-left: 17px;
    color: #007aff;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 1px;
      width: 10px;
      height: 10px;
      transform: translateY(-50%);
      border-radius: 50%;
      border: 3px solid #007aff;
    }
    &.ing {
      background: no-repeat left center;
      &::before { display: none }
    }
  }

  .state_01 {
    color: #007aff;
    &.state_ico::before {
      border-color: #007aff;
    }
    &.stateBar {
      background-color: #5ba9ff
    }
    &.ing {
      background-image: url(../images/state/ico_state01_ing.png);
    }
  }
  .state_02 {
    color: #14bd19;
    &.state_ico::before {
      border-color: #14bd19;
    }
    &.ing {
      background-image: url(../images/state/ico_state02_ing.png);
    }
    &.stateBar {
      background-color: #14bd19
    }
  }
  .state_03 {
    color: #cc00ff;
    &.state_ico::before {
      border-color: #cc00ff;
    }
    &.ing {
      background-image: url(../images/state/ico_state03_ing.png);
    }
    &.stateBar {
      background-color: #cc00ff
    }
  }
  .state_04 {
    color: #f72828;
    &.state_ico::before {
      border-color: #f72828;
    }
    &.stateBar {
      background-color: #f16a6a
    }
  }
  .state_05 {
    color: #ff7e00;
    &.state_ico::before {
      border-color: #ff7e00;
    }
    &.ing {
      background-image: url(../images/state/ico_state05_ing.png);
    }
    &.stateBar {
      background-color: #ff7e00
    }
  }
  .state_06 {
    color: #7e8289;
    &.state_ico::before {
      border-color: #7e8289;
    }
    &.ing {
      background-image: url(../images/state/ico_state06_ing.png);
    }
    &.stateBar {
      background-color: #7e8289
    }
  }
    
  .stateBar {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 14px;
    border-radius: 5px;
    background-color: #5ba9ff;
    & + * {
      margin-top: 9px;
    }
    .state_ico {
      color: #fff;
      &::before {
        border-color: #fff
      }
    }
  }

  .paper_main, .paper_detail {
    
    ${PanelBox} {
      height: 100%;
      display: flex;
      flex-direction: column;
      .panelTitBar {
        flex-shrink: 0;
      }
      .panelCont {
        flex-grow: 1;
        padding: 0;
      }
    }
    .grid-height {
      height: 100%
    }
  }
  
  .paper_main {
    ${PanelBox} {
    }
  }
  
  .tabPanelContainer {
    flex: 1;
    .tabPanel {
      height: 100%;
      position: relative;
    }
  }
  
  .paper_detail {
    &
    .reflex-element {
      height: 800px;
      max-height: 800px;
    }
    .tabPanel {
      overflow-y:scroll;
      height: 100%;
      position: relative;
    }
    ${PanelBox} {
      overflow:hidden;
      .panelTitBar {
        height: 43px;
        padding-bottom: 1px;
        box-shadow: inset 0 -1px 0 #232f47;
        .tit { font-size: 13px }
      }
      .panelCont {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 9px;
        overflow-y: auto;
      }
      .panelTitBar + .panelCont {
        top: 43px
      }
    }
    .tb_data {
      border: 1px double #141a30;

    }
  }

  .reflex-container>.reflex-element {
    overflow: hidden;
  }

  .horizontal > .reflex-splitter {
    position: relative;
    height: 6px;
    background: transparent !important;
    border: 0 !important;
    &::before, &::after {
      content: "";
      position: absolute;
      height: 6px;
      top: 50%;
      left: 50%;
      margin-top:-3px;
      width:35%;
      background: radial-gradient(ellipse at center, rgba(26,94,218,1) 0%,rgba(255,255,255,0) 75%);
      opacity: 0;
      transition: opacity 0.2s;
      transform: translateX(-50%);
    }
    &::before {
    }
    &::after {
    }
    &:hover {
      &::before, &::after {
        opacity: 1;
      }
    }
  }
  
  .tb_data_new {
    width: 100%;
    border-top: 1px double ${theme.colors.defaultDark};
    border-bottom: 1px double #c5cad0;
    border-left: 0 hidden;
    border-right: 0 hidden;
    border-collapse: collapse;
    .tb_data_nodeInfo {
      th, td{
        text-align:center;
      }
    }
    tbody {
      th, td {
        height: 33px;
        padding: 8px 10px 8px 15px;
        vertical-align: middle;
        line-height: 1.3em;
      }
      th {
        /* width: 15%; */
        border: 1px solid #eff1f3;
        background: #fafbfc;
        text-align: left;
        color: ${theme.colors.defaultDark}
      }
      td {
        border: 1px solid #f6f7f9;
        line-height: 1.4em;
      }
    }
    textarea {
      width: 100%;
      border: 1px solid #c5cad0;
      border-radius: 2px;
      padding-left: 10px;
      &:hover {
        border-color: #000
      }
    }
  }

  .tb_data_container{
    margin-bottom: 20px;
    th{
      width: 20%;
    }
  }

  /* table */
  .tb_data {
    width: 100%;
    border-top: 1px double ${theme.colors.defaultDark};
    border-bottom: 1px double ${theme.colors.defaultDark};
    border-left: 0 hidden;
    border-right: 0 hidden;
    border-collapse: collapse;
    .tb_data_detail{
      th, td{
        width:25%
      }
    }
    .tb_data_nodeInfo{
      tr{
        td{
          cursor:pointer;
        }
        &:hover{
          td{
            color: rgba(255,255,255,0.9)
          }
        }
      }
      
    }
    .tb_data_podInfo {
      th {
        width: 20%
      }
    }
    .tb_data_container {
      th {
        width: 20%
      }
    }
    tbody {
      th, td {
        height: 33px;
        padding: 8px 10px 8px 15px;
        vertical-align: middle;
        line-height: 1.3em;
      }
      th {
        /* width: 15%; */
        border: 1px solid #232f47;
        background: #2f3855;
        text-align: left;
        color: rgba(255,255,255, 0.7);
      }
      td {
        border: 1px solid #232f47;
        background:#27314c;
        line-height: 1.4em;
        color: rgba(255,255,255, 0.5);
      }
    }
    textarea {
      width: 100%;
      border: 1px solid #c5cad0;
      border-radius: 2px;
      padding-left: 10px;
      &:hover {
        border-color: #000
      }
    }
  }
  .tb_write {
    tbody td {
      padding: 2px
    }
  }
  .added {
    color: #949ca9 !important;
  }
  table td {
    .td-txt {
      display: inline-block;
      padding: 6px 12px;
    }
    .link_file {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      padding-left: 25px;
      background: url(../images/bullet/ico_file.png) no-repeat left center;
      color: #626b7a;
      border: 0;
      &:hover {
        color: ${theme.colors.primaryDark};
      }
    }
    .td-board {
      min-height: 300px;
      padding: 6px 12px;
      img { max-width: 100% }
    }
  }
  
  .empty {
    height: 10px;
    min-height: 10px;
    flex-basis: 10px;
  }

  .Toastify {
    .Toastify__toast {
      padding: 0 50px 5px 10px;
      border-radius: 3px;
      box-shadow: none;
      font-family: inherit;
      color: #fff;
      font-size: 13px;
      font-weight: 300;
      word-break: break-all;
      background: #57addd;
      min-height: 41px
    }
    .Toastify__toast--info {
      background: #57addd;
    }
    .Toastify__close-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5px;
      width: 30px;
      height: 30px;
      color: #fff;
      opacity: 1;
      background: url(../images/bullet/toast_close.png) no-repeat center center;
      svg { display: none }
    }
    .Toastify__progress-bar {
      height: 3px;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  .swal2-container {
    z-index: 99999 !important;
    .swal2-popup {
      padding: 0;
      border: 2px solid #0090ff;
      border-radius: 5px;
      background: #fff
    }
    .swal2-html-container {
      padding: 35px;
      font-size: 16px;
      color: ${theme.colors.defaultDark};
    }
    .swal2-actions {
      margin: 0;
      padding: 10px;
      background-color: #f5f6f9;
      border-top: 1px solid #ebecef;
      .swal2-styled, button {
        min-width: 92px;
        height: 32px;
        border-radius: 3px;
        padding: 0;
        margin: 0 1px;
        border: 1px solid ${theme.colors.defaultDark};
        color: ${theme.colors.defaultDark};
        background-color: #fff !important;
        font-size: 12px;
        transition: 0.2s;
        &:hover {
          border-color: ${theme.colors.primaryDark};
          color: ${theme.colors.primaryDark};
        }
        &:focus {
          box-shadow: none !important;
        }
      }
    }
  }
  .form_fullWidth { width: 100%; }
  .MuiFormControl-root {
    select {
      border: 1px solid #c5cad0;
      border-radius: 2px;
      height: 32px;
      background-image: url(../images/bullet/select_arr_g.png);
      color: #626b7a;
      &:hover {
        border-color: #000
      }
    }
  }
  
  .MuiFormGroup-root {
    flex-direction: row !important;
    .MuiFormControlLabel-root {
      margin:0 10px 0 0;
    }
    .MuiSvgIcon-root {
      font-size:18px;
    }
    .PrivateSwitchBase-root-23 {
      padding:4px;
    }
    
    .MuiRadio-colorSecondary.Mui-checked {
      color: #268eff;
    }
    
    .MuiIconButton-root:hover, .MuiRadio-colorSecondary.Mui-checked:hover, .MuiIconButton-colorSecondary:hover {
      background: none;
    }
    
    .MuiTypography-body1 {
      font-size: 12px;
    }
    
    .inputWrap_btns button {
      height: 32px;
      border:1px solid #071e3f;
      border-radius: 3px !important;
    }
    
    .inputWrap_btns .input_text {
      height: 32px;
      margin-left: 5px;
      border: 0;
    }
  }
    
    // .MuiSelect-selectMenu {
    //   min-height: 32px
    // }
    // .MuiOutlinedInput-input {
    //   padding: 0
    // }
    // .MuiOutlinedInput-notchedOutline {
    //   border: 1px solid #c5cad0;
    //   border-radius: 2px;
    // }
    // .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    //   border-width: 1px;
    //   border-color: ${theme.colors.defaultDark};
    //   background-color: #fff      
    // }
    // .MuiInputBase-root {
    //   font: inherit;
    //  
    // }
    // .MuiInputBase-input {
    //   display: flex;
    //   align-items: center;
    //   color: #626b7a !important;
    //   padding-left: 12px
    // }
  
  .inputWrap_dividers {
    display: flex;
    justify-content: space-between;
    .mdd {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      color: #a3a9af
    }
    .inputArea {
      display: flex;
      flex-grow: 1;
      width: calc(50% - 10px);
      margin: 0 -1px;
      > * {
        flex-grow: 1;
        margin: 0 1px;
      }
    }
  }
  .inputWrap_btns {
    display: flex;
    justify-content: space-between;
    .input_text {
      height: 32px;
      border: 1px solid #c5cad0;
      border-radius: 2px;
      flex-grow: 1;
      padding-left: 11px;
    }
    button {
      height: 32px;
      margin-left: 2px;
      font-size: 12px
    }
  }
  
  
.jXJhaN > .react-datepicker-wrapper {
  margin-right: 0 !important;
}

.react-datepicker__input-container {
  &::after {
    content: '';
    height: 100%;
    position:absolute;
    top:0;
    right: 33px;
    border-right:1px solid #bec3ca;
  }

}
.input-datepicker {
  width:120px;
  height:30px;
  padding-left: 12px;
  font-size: 12px;
  color: #071e3f;
  border: 1px solid #bec3ca;
  border-radius: 3px;
  cursor: pointer;
  background: linear-gradient(#fdfdfd,#f6f6f9);
  background-image: url(../images/bullet/datepicker.png);
  background-repeat: no-repeat;
  background-position: 90% top;
  position: relative;
  &:hover {
    background-position: 90% -23px;
  }
}

.between {
  width: 15px;
  font-size: 12px;
  color: #071e3f;
  text-align: center;
}
//yby654----------------------
.content-detail {
	// padding: 12px;
	// margin-bottom: 8px;
    display: block;
	// background: rgba(86, 100, 210, 0.25) !important;
	// border-radius: 4px;
}
.div-content-detail-meta {
	display: flex;
	padding: 12px;
	margin-bottom: 8px;
	background: rgba(255, 255, 255, 0.25) !important;
	border-radius: 4px;
}
.div-content-meta-text {
	color: #000000 !important;
	font-size: 14px !important;
	font-weight: bolder;
	margin-bottom: 0 !important;
}

.div-content-detail {
	display: flex;
	padding: 12px;
	margin: 8px;
	background: rgba(159, 163, 197, 0.25) !important;
	border-radius: 4px;
}
.div-content-resource {
	display: flex;
	padding: 12px;
  
	// margin-bottom: 8px;
	// background: rgba(86, 100, 210, 0.25) !important;
	 align-items: center;
    justify-content: space-between;
	border-radius: 4px;
}
   
.div-content-detail-0 {
	min-width: 33%;
	margin: right 5px;
}

.div-content-detail-1 {
	min-width: 35%;
	margin: right 12px;
}

.div-content-detail-2 {
	min-width: 25%;
	margin: right 12px;
}

.div-content-detail-3 {
	min-width: 15%;
	margin: right 12px;
}

.service-icon {
	align-items: center;
	color: #fff;
	display: flex;
	font-weight: 500;
	height: 40px;
	justify-content: center;
	width: 40px;
}

.div-content-text-1 {
  color: black !important;
  font-size: 12px !important;
	//font-weight: bolder;
	margin-bottom: 0 !important;
}

.div-content-text-2 {
	font-size: 12px !important;
	margin-bottom: 0 !important;
}
.service-Title{
    display: flex;
    width: 100%;
    flex-direction: row;
}
.wrapper {
  width: 600px;
  margin: 0 auto;
}

.accordion-wrapper {
  & + * {
    margin-top: 0.5em;
  }
}

.accordion-item {
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
  height: auto;
  max-height: 9999px;

}

.accordion-item.collapsed {
  max-height: 0;
  transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
}

.accordion-title {
//   font-weight: 600;
  cursor: pointer;
//   color: #666;
//   padding: 0.5em 1.5em;
//   border: solid 1px #ccc;
//   border-radius: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
	margin-bottom: 8px;
	background: rgba(86, 100, 210, 0.25) !important;
	border-radius: 4px;
//   font-weight: 600;
//   cursor: pointer;
//   color: #666;
//   padding: 0.5em 1.5em;
//   border: solid 1px #ccc;
//   border-radius: 1.5em;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;


  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid currentColor;
  }

  &:hover,
  &.open {
    color: black;
  }

  &.open {
    &::after {
      content: "";
      border-top: 0;
      border-bottom: 5px solid;
    }
  }
}

.accordion-content {
  font-weight: 600;
  cursor: pointer;
  color: #666;
  padding: 0.2em 1.5em ;
  border: solid 1px #ccc;
  border-radius: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:2px;
}
.resource-text-1 {
	color: black !important;
    font-size: 12px !important;
	// font-weight: bolder;
	padding: 0.5rem 1rem;// margin-bottom: 0 !important;
}
.resource-content-1{
	min-width: 15%;
	margin:  right 10px;
}
.resource-div{
  height: 2.5rem;
  width: 2.5rem;
}
.div-content-detail-4 {
	min-width: 50%;
	margin: right 12px;
}
.div-content-detail-5 {
	min-width: 10%;
	margin: right 12px;
}
.alert-hidden {
  opacity: 0;
  transition: all 250ms linear 2s; // <- the last value defines transition-delay
}

.div-alert{
	display: flex;
    justify-content: flex-start;
    align-items: baseline;
}
.next-btn{
	display: inline-block;
    padding: .47rem .75rem;
    background-color: #5664d2;
    color: #fff;
    border-radius: .25rem;
}
.clusterTab{
  height: 100%;
  display: flex;
  justify-content: center;
  // flex-direction: column;
}
//yby654----------------------

//kwoo2-----------------------
.MuiInputBase-input{
  border: 1px solid #e0e2e5 !important
}

.paperCont{
  padding: 30px;
  font-size: 15px;
}

.panel_column{
  width:50%;
  margin-right: 10px;
}

//cafe43 Volume-----------------------
.tb_volume_metadata{
  width: 300px
}

.tb_volume_yaml{
  text-align: center;
  width: 60px;
  height: 25px;
  color : #fff;
  border-radius: 3px;
  background-color: ${theme.colors.navActive};
  border: none;
}

.tb_volume_detail_th{
  width: 300px;
}

.tb_volume_detail_td{
  width: 500px;
}

.state_ico {
    position: relative;
    padding-left: 18px;
    color: #007aff;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 3px;
      width: 8px;
      height: 8px;
      transform: translateY(-50%);
      border-radius: 50%;
    }
    &.ing {
      background: no-repeat left center;
      &::before { display: none }
    }
  }

  .state_ico_new {
    position: relative;
    padding-left: 18px;
    &.ing {
      background: no-repeat left center;
      &::before { display: none }
    }
  }
  .state_ico_new.delete {
    background: url(${deleteBtn2}) no-repeat 0px 2px;
  }
  .state_ico_new.delete:hover{
    background-position: 0 -16px;
  }
  .state_ico_new.terminal {
    background: url(${terminalBtn}) no-repeat 0px 2px;
  }.state_ico_new.terminal:hover{
    background-position: 0 -16px;
  }

  .status_ico {
    position: relative;
    padding-left: 18px;
    color: #007aff;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 3px;
      width: 8px;
      height: 8px;
      transform: translateY(-50%);
      border-radius: 50%;
    }
    &.ing {
      background: no-repeat left center;
      &::before { display: none }
    }
  }

  .status_01 {
    /* 48af29 */
    color: #239C62;
    &.status_ico::before {
      background-color: #239C62;
    }
  }
  .status_02 {
    /* 2b38f3 */
    color: #2155DC;
    &.status_ico::before {
      background-color: #2155DC;
    }
  }
  .status_03 {
    /* ffb833 */
    color: #E5D332;
    &.status_ico::before {
      background-color: #E5D332;
    }
  }
  .status_04 {
    /* ce1a14 */
    color: #CE4C4C;
    &.status_ico::before {
      background-color: #CE4C4C;
    }
  }
  .status_05 {
    color: #9d27b0;
    &.status_ico::before {
      background-color: #9d27b0;
    }
  }

  .step-container {
    width: 60%;
    margin-bottom: 28px;
  }

  .step-container2 {
    width: 33%;
    margin-bottom: 28px;
  }
//cafe43 Monitoring-----------------------
  .tab1-panel-area{
    display: flex;
    height: 400px;
    justify-content: space-around;
    align-items: center;
  }

  .tab1-button-area{
    width: 300px;
    height: 375px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .on-tab1-button{
    cursor:pointer;
    width: 300px;
    height: 87px;
    display: flex;
    border-radius: 5px;
    background-color:#007EFF;
    color: white;
    display: flex;
    justify-content: space-around;
  }

  .tab1-button-circle-graph-area{
    cursor:pointer;
    width: 49%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab1-button-key-value-area{
    width: 49%
  }

  .tab1-button-key-area{
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .tab1-button-value-area{
    width: 100%;
    height: 0%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .tab1-button-value-majer{
    font-size: 20px;
    font-weight: bold;
  }

  .tab1-button-value-minor{
    font-size: 14px
  }

  .tab1-button-value-minor-bottom{
    font-size: 14px;
    font-weight: bold;
  }

  .tab1-chart-area{
    width: 1350px;
    height: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-chart{
    width: 1340px;
    height: 370px;
    background-color: #141A30;
  }

  .off-tab1-button{
    cursor:pointer;
    width: 300px;
    height: 87px;
    display: flex;
    border-radius: 5px;
    background-color:#1C263E;
    color: #929da5;
    display: flex;
    justify-content: space-around;
  }

  .tab2-chart-area{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab2-chart{
    width: 100%;
    height: 200px;
    background-color: #141A30;
  }

//---------
  .signup-step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 22px;
  margin: 0 -4px;
}
.signup-step .step {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 126px;
  border-radius: 50%;
  /* border: 3px solid #1355ce; */
  background-color: #d0ddf5;
  color: transparent;
  overflow: hidden;
}
.signup-step .step::before,
.signup-step .step::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.signup-step .step::before {
  z-index: 1;
  background: #1355ce;
  opacity: 0.7;
}
.signup-step .step::after {
  z-index: 2;
  background: url(${passed}) no-repeat center center;
}
.signup-step .step span {
  font-weight:700;
  font-size: 16px;

}
.pointer_container {
        .recharts-wrapper {
            cursor: pointer !important;
        }
    }

.off-tab1-linearchart{
  display: hidden;
}

//yjy-----------------------
.tb_workload_detail_th{
  th,td {
    width: 25%;
  }
}

.tb_workload_pod_detail{
  th {
    width: 10%;
  },
  td {width: 40%}
}

.tb_resources_detail_th{
  th,td {
    width: 50%;
  }
}

.tb_services_detail_th{
  th,td {
    width: 33%;
  }
}

.tb_workload_detail_labels_th{
  width: 25%;
}
.tabN-chart-div-area{
  display: flex;
  justify-content:space-around;
  align-items:center;
}
.tabN-chart-area{
  width: 49%;
  margin: 5px 0 5px 0;
}

//hansl--------------------
.project_table{
  th,td {
    width: 410px;
    margin: 5px 0 5px 0;
  }
}

//map-----------------------
.leaflet-container {
  width: 100%;
  height: 100%;
  opacity: 1;
  /* animation: fadeInLeaflet 1.5s ease forwards 2s; */
}

@keyframes fadeInLeaflet {
  to {
    opacity: 1;
  }
}

.show-map {
  overflow: hidden;
  position: relative;
  width: inherit;
  height: 300px;
  animation: fadeInShadow 1.5s ease forwards 2s;
}

@keyframes fadeInShadow {
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 0 0 25px 20px rgba(0, 0, 0, 0.7);
  }
}

.details-on-map {
  position: relative;
  width: 100%;
}
#map {
  box-sizing: content-box;
  height: inherit;
  width: 100%;
}
.paper-map {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  perspective: 150rem;
  opacity: 0;
}
.map-side {
  box-sizing: content-box;
  width: 25vw;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  outline: 1px solid transparent;
  overflow: hidden;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 2.5rem rgba(233, 229, 220, 0.15);
    content: "";
  }
  &:nth-of-type(1) {
    border: none;
    background-position: 0 0;
    transform: translateX(12.625vw) rotateY(-60deg);
  }
  &:nth-of-type(2) {
    border: none;
    background-position: -25vw 0;
    transform: translateX(12.5vw) rotateY(60deg);
  }
  &:nth-of-type(3) {
    border: none;
    background-position: -50vw 0;
    transform: translateX(-12.5vw) rotateY(-60deg);
  }
  &:nth-of-type(4) {
    border: none;
    background-position: -75vw 0;
    transform: translateX(-12.625vw) rotateY(60deg);
  }
}
.show-map {
  /* &.details-on-map {
    height: 100vh;
  } */
  & #map {
    visibility: visible;
    /* animation: fadeIn 1s 1.75s linear forwards; */
  }
  & .paper-map {
    /* animation: paperMapFadeIn 0.83s ease-in forwards,
      fadeOut 1s 4s linear forwards; */
  }
  & .map-side {
    &:before {
      animation: fadeOut 0.5s 0.83s forwards ease-out;
    }
    &:nth-of-type(1) {
      animation: openMapOuter 0.83s 0.83s linear forwards;
    }
    &:nth-of-type(2) {
      animation: openMapInnerLeft 0.83s 0.83s linear forwards;
    }
    &:nth-of-type(3) {
      animation: openMapInnerRight 0.83s 0.83s linear forwards;
    }
    &:nth-of-type(4) {
      animation: openMapOuter 0.83s 0.83s linear forwards;
    }
  }
}
.map-side:nth-of-type(1),
.map-side:nth-of-type(3) {
  transform-origin: 100% 0;
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.3);
}
.map-side:nth-of-type(2),
.map-side:nth-of-type(4) {
  transform-origin: 0 0;
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.3);
}

@keyframes openMapOuter {
  100% {
    transform: translateX(0) rotateY(0deg);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes openMapInnerLeft {
  0% {
    transform: translateX(12.5vw) rotateY(60deg);
  }
  20% {
    transform: translateX(10vw) rotateY(53deg);
  }
  38% {
    transform: translateX(7.75vw) rotateY(46.2deg);
  }
  50% {
    transform: translateX(6.25vw) rotateY(41.5deg);
  }
  65% {
    transform: translateX(4.375vw) rotateY(34.5deg);
  }
  75% {
    transform: translateX(3.125vw) rotateY(29deg);
  }
  83% {
    transform: translateX(2.125vw) rotateY(23.8deg);
  }
  90% {
    transform: translateX(1.25vw) rotateY(18.1deg);
  }
  95% {
    transform: translateX(0.625vw) rotateY(12.8deg);
  }
  98% {
    transform: translateX(0.25vw) rotateY(8deg);
  }
  99% {
    transform: translateX(0.125vw) rotateY(5deg);
  }
  100% {
    transform: translateX(0) rotateY(0);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes openMapInnerRight {
  0% {
    transform: translateX(-12.5vw) rotateY(-60deg);
  }
  20% {
    transform: translateX(-10vw) rotateY(-53deg);
  }
  38% {
    transform: translateX(-7.75vw) rotateY(-46.2deg);
  }
  50% {
    transform: translateX(-6.25vw) rotateY(-41.5deg);
  }
  65% {
    transform: translateX(-4.375vw) rotateY(-34.5deg);
  }
  75% {
    transform: translateX(-3.125vw) rotateY(-29deg);
  }
  83% {
    transform: translateX(-2.125vw) rotateY(-23.8deg);
  }
  90% {
    transform: translateX(-1.25vw) rotateY(-18.1deg);
  }
  95% {
    transform: translateX(-0.625vwm) rotateY(-12.8deg);
  }
  98% {
    transform: translateX(-0.25vw) rotateY(-8deg);
  }
  99% {
    transform: translateX(-0.125vw) rotateY(-5deg);
  }
  100% {
    transform: translateX(0) rotateY(0);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes paperMapFadeIn {
  0% {
    transform: scale(0, 0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.leaflet-popup {
  .leaflet-popup-close-button {
    display: none;
  }

  .leaflet-popup-content-wrapper {
    background: linear-gradient(#000, #111);
    border: groove 1px #fff;
    overflow: hidden;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
    -webkit-transform: translate(-50%, -100%);
    position: absolute;
    color:#fff;
    


    /* animation: fadeInPopup 0.01s ease-out; */

    @keyframes fadeInPopup {
      0% {
        opacity: 0;
        height: 0;
        width: 0;
      }
      50% {
        opacity: 1;
        height: 0;
        width: 310px;
      }
      100% {
        opacity: 1;
        height: 100px;
        width: 310px;
      }
    }

    .leaflet-popup-content {
      width: 120px;
      height: 50px;
      text-align: center;
      padding: 0;
      display:flex;
      justify-content: center;
      align-items: center;

      div {
        height: 100%;

        .caption {
          color: #f1f1f1;
          height: 100%;
          white-space: nowrap;
        }

        hr {
          //height: 5px;
          //border-right: none;
          border: groove 1.35px #fff;
          box-shadow: 0 0 3px #000;
        }

        svg {
          float: left;
          height: 120px;
          width: 120px;
          fill: #f1f1f1;
        }
      }
    }
  }}
`;

export default globalStyles;
