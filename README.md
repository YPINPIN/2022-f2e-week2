# 2022-f2e-week2 : 今晚，我想來點點簽

> 2022 The F2E 前端& UI 修煉精神時光屋 Week 2

- DEMO 連結：[點我](https://ypinpin.github.io/2022-f2e-week2/)
- 設計稿連結：[設計者：EG](https://www.figma.com/file/RJbMbBiaste3yNsUi4NyGI/EGs-F2E---Week2-%E4%BB%8A%E6%99%9A%EF%BC%8C%E6%88%91%E6%83%B3%E4%BE%86%E9%BB%9E%E9%BB%9E%E7%B0%BD?node-id=2%3A660)
- 目前版本只完成最基本的操作流程(上傳預覽 pdf、新建簽名檔、編輯 pdf、下載 pdf 檔案)，如果點擊按鈕沒反應表示尚未實裝功能。

![screenshot](demo.gif)

## 功能介紹

- 我可以上傳 PDF 簽署文件，網頁會即時預覽對應 PDF（第一頁）資訊。
- 我可以離線新增與儲存自己的簽名檔列表(目前使用 Vuex 紀錄，重整頁面紀錄不儲存)。
- 我可以在即時預覽的簽署文件上，從簽名檔列表裡點選指定簽名，簽名會出現在簽署文件的上方。
- 我可以將簽署文件裡的簽名檔，進行拖拉、放大縮小、刪除等行為

## 使用套件

- fabric
- jspdf
- pdfjs
- vue-router
- vuex
- vite

## 參考資料

- [前端 PDF 渲染及簽名](https://eminent-temple-cd0.notion.site/PDF-da0347f450af4f67975e2c2d699c6c3e)
- [Fabric.js demos · Custom controls, render and actions](http://fabricjs.com/custom-control-rende)
