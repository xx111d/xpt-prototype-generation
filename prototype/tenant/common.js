/**
 * 租户端 - 公共组件
 * 提供统一的侧边栏、头部、移动端导航和公共工具函数
 * 通过 fetch 注入到各页面中
 */
(function() {
  'use strict';

  // 当前页面标识（由各页面在加载前设置）
  var currentPage = window.TENANT_PAGE || 'overview';

  // 侧边栏菜单配置
  var menuItems = [
    { id: 'overview', icon: '&#128202;', label: '经营概览', href: 'tenant-overview.html' },
    { id: 'settlement', icon: '&#128176;', label: '结算分析', href: 'tenant-settlement-analysis.html' },
    { id: 'orders', icon: '&#128230;', label: '订单统计', href: 'tenant-order-statistics.html' }
  ];

  // 生成侧边栏HTML
  function buildSidebar() {
    var html = '<aside class="sidebar">';
    html += '<div class="sidebar-brand">';
    html += '<div class="brand-icon">&#9776;</div>';
    html += '租户端';
    html += '</div>';
    html += '<nav class="sidebar-nav">';
    menuItems.forEach(function(item) {
      var activeClass = item.id === currentPage ? ' active' : '';
      html += '<a class="nav-item' + activeClass + '" href="' + item.href + '">';
      html += '<span class="nav-icon">' + item.icon + '</span>';
      html += item.label;
      html += '</a>';
    });
    html += '</nav>';
    html += '</aside>';
    return html;
  }

  // 生成头部HTML
  function buildHeader() {
    var pageLabel = '';
    menuItems.forEach(function(item) {
      if (item.id === currentPage) pageLabel = item.label;
    });
    return '<header class="header">' +
      '<div class="breadcrumb">数据统计 / <span>' + pageLabel + '</span></div>' +
      '</header>';
  }

  // 生成移动端导航HTML
  function buildMobileNav() {
    var html = '<nav class="mobile-nav" id="mobile-nav">';
    menuItems.forEach(function(item) {
      var activeClass = item.id === currentPage ? ' active' : '';
      html += '<a class="nav-item' + activeClass + '" href="' + item.href + '">';
      html += '<span class="nav-icon">' + item.icon + '</span>';
      html += item.label;
      html += '</a>';
    });
    html += '</nav>';
    return html;
  }

  // 注入组件到页面
  function injectComponents() {
    // 注入侧边栏
    var sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = buildSidebar();
    }

    // 注入头部
    var headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = buildHeader();
    }

    // 注入移动端导航
    var mobileNavContainer = document.getElementById('mobile-nav-container');
    if (mobileNavContainer) {
      mobileNavContainer.innerHTML = buildMobileNav();
    }
  }

  // 页面加载完成后注入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

  // ============ 公共工具函数 ============

  // 导出 Excel (CSV with UTF-8 BOM)
  window.exportTable = function(tableId, filename) {
    var table = document.getElementById(tableId);
    if (!table) return;
    var rows = table.querySelectorAll('tr');
    var csv = '\uFEFF'; // BOM for Chinese

    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].querySelectorAll('th, td');
      var rowData = [];
      for (var j = 0; j < cells.length; j++) {
        var text = cells[j].innerText.replace(/"/g, '""');
        rowData.push('"' + text + '"');
      }
      csv += rowData.join(',') + '\n';
    }

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 分页功能
  window.paginationState = {};

  window.initPagination = function(tableId, paginationId, defaultPageSize) {
    var table = document.getElementById(tableId);
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var allRows = Array.from(tbody.querySelectorAll('tr'));
    var totalRows = allRows.length;

    window.paginationState[tableId] = {
      allRows: allRows,
      totalRows: totalRows,
      pageSize: defaultPageSize || 5,
      currentPage: 1
    };

    renderPagination(tableId, paginationId);
  };

  function renderPagination(tableId, paginationId) {
    var state = window.paginationState[tableId];
    if (!state) return;
    var totalPages = Math.ceil(state.totalRows / state.pageSize);
    if (state.currentPage > totalPages) state.currentPage = totalPages;

    var start = (state.currentPage - 1) * state.pageSize;
    var end = start + state.pageSize;
    state.allRows.forEach(function(row, i) {
      row.style.display = (i >= start && i < end) ? '' : 'none';
    });

    var container = document.getElementById(paginationId);
    if (!container) return;
    var startNum = state.totalRows === 0 ? 0 : start + 1;
    var endNum = Math.min(end, state.totalRows);

    var html = '<div class="pagination-info">共 ' + state.totalRows + ' 条，显示第 ' + startNum + '-' + endNum + ' 条</div>';
    html += '<div class="pagination-controls">';
    html += '<button ' + (state.currentPage === 1 ? 'disabled' : '') + ' onclick="goToPage(\'' + tableId + '\',\'' + paginationId + '\',1)">&#171;</button>';
    html += '<button ' + (state.currentPage === 1 ? 'disabled' : '') + ' onclick="goToPage(\'' + tableId + '\',\'' + paginationId + '\',' + (state.currentPage - 1) + ')">&#8249;</button>';

    var maxButtons = 5;
    var startPage = Math.max(1, state.currentPage - Math.floor(maxButtons / 2));
    var endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) startPage = Math.max(1, endPage - maxButtons + 1);

    for (var p = startPage; p <= endPage; p++) {
      html += '<button class="' + (p === state.currentPage ? 'active' : '') + '" onclick="goToPage(\'' + tableId + '\',\'' + paginationId + '\',' + p + ')">' + p + '</button>';
    }

    html += '<button ' + (state.currentPage === totalPages ? 'disabled' : '') + ' onclick="goToPage(\'' + tableId + '\',\'' + paginationId + '\',' + (state.currentPage + 1) + ')">&#8250;</button>';
    html += '<button ' + (state.currentPage === totalPages ? 'disabled' : '') + ' onclick="goToPage(\'' + tableId + '\',\'' + paginationId + '\',' + totalPages + ')">&#187;</button>';
    html += '<select onchange="changePageSize(\'' + tableId + '\',\'' + paginationId + '\',this.value)">';
    html += '<option value="5"' + (state.pageSize === 5 ? ' selected' : '') + '>5条/页</option>';
    html += '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10条/页</option>';
    html += '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20条/页</option>';
    html += '</select>';
    html += '</div>';

    container.innerHTML = html;
  }

  window.goToPage = function(tableId, paginationId, page) {
    var state = window.paginationState[tableId];
    if (state) {
      state.currentPage = page;
      renderPagination(tableId, paginationId);
    }
  };

  window.changePageSize = function(tableId, paginationId, size) {
    var state = window.paginationState[tableId];
    if (state) {
      state.pageSize = parseInt(size);
      state.currentPage = 1;
      renderPagination(tableId, paginationId);
    }
  };

  // 品牌/项目选择器辅助函数
  window.toggleDropdown = function(dropdownId) {
    var dd = document.getElementById(dropdownId);
    if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
  };

  window.toggleAllCheckboxes = function(dropdownId, cb) {
    var checks = document.querySelectorAll('#' + dropdownId + ' input[type="checkbox"]');
    for (var i = 1; i < checks.length; i++) {
      checks[i].checked = cb.checked;
    }
  };

  // 点击外部关闭下拉
  document.addEventListener('click', function(e) {
    var dropdowns = document.querySelectorAll('.brand-dropdown');
    dropdowns.forEach(function(dd) {
      var wrapper = dd.closest('.brand-select-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        dd.style.display = 'none';
      }
    });
  });

})();