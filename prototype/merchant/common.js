/**
 * 商家端 - 公共组件
 * 提供统一的侧边栏、头部和公共工具函数
 */
(function() {
  'use strict';

  var currentPage = window.MERCHANT_PAGE || 'overview';

  var menuItems = [
    { id: 'overview', icon: '&#128202;', label: '经营概览', href: 'merchant-overview.html' },
    { id: 'product', icon: '&#128176;', label: '商品分析', href: 'merchant-product-analysis.html' },
    { id: 'order', icon: '&#128230;', label: '订单分析', href: 'merchant-order-analysis.html' },
    { id: 'settlement', icon: '&#128230;', label: '结算分析', href: 'merchant-settlement-analysis.html' }
  ];

  function buildSidebar() {
    var html = '<aside class="sidebar">';
    html += '<div class="sidebar-brand">';
    html += '<div class="brand-icon">&#9776;</div>';
    html += '商家端';
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
    html += '<div class="sidebar-footer">';
    html += '<div class="sf-avatar">华</div>';
    html += '<div class="sf-info">';
    html += '<div class="sf-name">华为官方旗舰店</div>';
    html += '<div class="sf-role">商家管理员</div>';
    html += '</div></div>';
    html += '</aside>';
    return html;
  }

  function buildHeader() {
    var pageLabel = '';
    menuItems.forEach(function(item) {
      if (item.id === currentPage) pageLabel = item.label;
    });
    return '<header class="header">' +
      '<div class="breadcrumb">工作台<span>/</span>数据分析<span>/</span><span class="current">' + pageLabel + '</span></div>' +
      '<div class="actions">' +
      '<div class="notification">&#128276;<span class="dot"></span></div>' +
      '<div class="user-info"><div class="avatar">华</div><span class="user-name">华为官方旗舰店</span></div>' +
      '</div>' +
      '</header>';
  }

  function injectComponents() {
    var sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) sidebarContainer.innerHTML = buildSidebar();

    var headerContainer = document.getElementById('header-container');
    if (headerContainer) headerContainer.innerHTML = buildHeader();
  }

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
    var csv = [];

    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].querySelectorAll('th, td');
      var rowData = [];
      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        if (cell.querySelector('.progress-bar')) { rowData.push(''); continue; }
        var text = cell.textContent.trim().replace(/"/g, '""');
        rowData.push('"' + text + '"');
      }
      csv.push(rowData.join(','));
    }

    var csvContent = '\uFEFF' + csv.join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = (filename || tableId) + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 分页
  window.pagState = {};

  window.initPagination = function(tableId, pageSize) {
    window.pagState[tableId] = { page: 1, pageSize: pageSize || 5, asc: false };
    renderPagination(tableId);
  };

  function renderPagination(tableId) {
    var st = window.pagState[tableId];
    if (!st) return;
    var table = document.getElementById(tableId);
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var allRows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var total = allRows.length;
    var totalPages = Math.max(1, Math.ceil(total / st.pageSize));
    if (st.page > totalPages) st.page = totalPages;

    var start = (st.page - 1) * st.pageSize;
    var end = start + st.pageSize;
    allRows.forEach(function(row, i) {
      row.style.display = (i >= start && i < end) ? '' : 'none';
    });

    var pag = document.getElementById(tableId + '-pag');
    if (!pag) return;
    var html = '<span>共 ' + total + ' 条，第 ' + st.page + '/' + totalPages + ' 页</span>';
    html += '<div class="pg-controls">';
    html += '<span class="pg-btn' + (st.page <= 1 ? ' disabled' : '') + '" onclick="goPage(\'' + tableId + '\',' + (st.page - 1) + ')">&#8249;</span>';
    for (var p = 1; p <= totalPages; p++) {
      html += '<span class="pg-btn' + (p === st.page ? ' active' : '') + '" onclick="goPage(\'' + tableId + '\',' + p + ')">' + p + '</span>';
    }
    html += '<span class="pg-btn' + (st.page >= totalPages ? ' disabled' : '') + '" onclick="goPage(\'' + tableId + '\',' + (st.page + 1) + ')">&#8250;</span>';
    html += '</div>';
    pag.innerHTML = html;
  }

  window.goPage = function(tableId, page) {
    var st = window.pagState[tableId];
    if (!st) return;
    var table = document.getElementById(tableId);
    if (!table) return;
    var total = table.querySelector('tbody').querySelectorAll('tr').length;
    var totalPages = Math.max(1, Math.ceil(total / st.pageSize));
    if (page < 1 || page > totalPages) return;
    st.page = page;
    renderPagination(tableId);
  };

  // 排序
  window.toggleSort = function(tableId) {
    var st = window.pagState[tableId];
    if (!st) { st = { page: 1, pageSize: 5, asc: false }; window.pagState[tableId] = st; }
    st.asc = !st.asc;
    st.page = 1;

    var btn = document.getElementById(tableId + '-sort-btn');
    if (btn) btn.textContent = st.asc ? '\u21C5 正序' : '\u21C5 倒序';

    var table = document.getElementById(tableId);
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));

    var ths = table.querySelectorAll('thead th');
    var sortCol = -1;
    var sortType = 'num';
    for (var i = 0; i < ths.length; i++) {
      var dt = ths[i].getAttribute('data-type');
      if (dt === 'num' || dt === 'date') { sortCol = i; sortType = dt; break; }
    }
    if (sortCol === -1) sortCol = 0;

    rows.sort(function(a, b) {
      var av = getCellSortValue(a.cells[sortCol], sortType);
      var bv = getCellSortValue(b.cells[sortCol], sortType);
      if (sortType === 'num') return st.asc ? av - bv : bv - av;
      return st.asc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    rows.forEach(function(row) { tbody.appendChild(row); });
    renderPagination(tableId);
  };

  function getCellSortValue(cell, type) {
    var text = cell.textContent.trim();
    if (type === 'num') {
      var num = parseFloat(text.replace(/[^0-9.\-]/g, ''));
      return isNaN(num) ? 0 : num;
    }
    if (type === 'date') {
      return new Date(text.replace(/\//g, '-')).getTime() || 0;
    }
    return text;
  }

  window.renderPagination = renderPagination;

  // 搜索选择器组件
  window.ssState = {};
  window.ssCloseTimer = null;

  window.initSS = function(ssId, options, placeholder) {
    window.ssState[ssId] = { options: options, value: '', placeholder: placeholder || '请选择' };
    renderSSMenu(ssId);
  };

  function renderSSMenu(ssId) {
    var menu = document.querySelector('#' + ssId + ' .ss-menu');
    if (!menu) return;
    var state = window.ssState[ssId];
    if (!state) return;
    if (!state.options.length) {
      menu.innerHTML = '<div class="ss-empty">暂无选项</div>';
      return;
    }
    var html = '';
    state.options.forEach(function(opt) {
      var sel = opt === state.value ? ' selected' : '';
      html += '<div class="ss-option' + sel + '" onmousedown="event.preventDefault();selectSSOption(\'' + ssId + '\',\'' + opt.replace(/'/g, "\\'") + '\')">' + opt + '</div>';
    });
    menu.innerHTML = html;
  }

  window.renderSSMenu = renderSSMenu;

  window.openSSMenu = function(ssId) {
    if (window.ssCloseTimer) { clearTimeout(window.ssCloseTimer); window.ssCloseTimer = null; }
    document.querySelectorAll('.search-select.open').forEach(function(el) {
      if (el.id !== ssId) el.classList.remove('open');
    });
    var wrap = document.getElementById(ssId);
    if (!wrap) return;
    var input = wrap.querySelector('.ss-input');
    var state = window.ssState[ssId];
    if (state && state.value) {
      input.value = '';
      showAllSSOptions(ssId);
    }
    wrap.classList.add('open');
    renderSSMenu(ssId);
  };

  window.closeSSMenuDelayed = function(ssId) {
    window.ssCloseTimer = setTimeout(function() {
      var wrap = document.getElementById(ssId);
      if (!wrap) return;
      wrap.classList.remove('open');
      var state = window.ssState[ssId];
      var input = wrap.querySelector('.ss-input');
      if (state && state.value) input.value = state.value;
      else { input.value = ''; if (state) input.placeholder = state.placeholder; }
    }, 200);
  };

  window.filterSSOptions = function(ssId) {
    var input = document.querySelector('#' + ssId + ' .ss-input');
    if (!input) return;
    var keyword = input.value.toLowerCase();
    var menu = document.querySelector('#' + ssId + ' .ss-menu');
    if (!menu) return;
    var options = menu.querySelectorAll('.ss-option');
    var visibleCount = 0;
    options.forEach(function(opt) {
      var text = opt.textContent.toLowerCase();
      var match = !keyword || text.indexOf(keyword) > -1;
      opt.classList.toggle('hidden', !match);
      if (match) visibleCount++;
    });
    var emptyEl = menu.querySelector('.ss-empty');
    if (visibleCount === 0) {
      if (!emptyEl) {
        var div = document.createElement('div');
        div.className = 'ss-empty';
        div.textContent = '无匹配结果';
        menu.appendChild(div);
      }
    } else if (emptyEl) {
      emptyEl.remove();
    }
  };

  function showAllSSOptions(ssId) {
    var menu = document.querySelector('#' + ssId + ' .ss-menu');
    if (!menu) return;
    menu.querySelectorAll('.ss-option').forEach(function(opt) {
      opt.classList.remove('hidden');
    });
    var emptyEl = menu.querySelector('.ss-empty');
    if (emptyEl) emptyEl.remove();
  }

  window.selectSSOption = function(ssId, value) {
    if (window.ssCloseTimer) { clearTimeout(window.ssCloseTimer); window.ssCloseTimer = null; }
    var wrap = document.getElementById(ssId);
    if (!wrap) return;
    var input = wrap.querySelector('.ss-input');
    var state = window.ssState[ssId];
    if (!state) return;
    state.value = value;
    input.value = value;
    wrap.classList.remove('open');
    wrap.classList.add('has-value');
    renderSSMenu(ssId);
  };

  window.clearSSValue = function(ssId, e) {
    if (e) e.stopPropagation();
    var wrap = document.getElementById(ssId);
    if (!wrap) return;
    var input = wrap.querySelector('.ss-input');
    var state = window.ssState[ssId];
    if (!state) return;
    state.value = '';
    input.value = '';
    wrap.classList.remove('has-value');
    renderSSMenu(ssId);
  };

  // 点击外部关闭下拉
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-select')) {
      document.querySelectorAll('.search-select.open').forEach(function(el) {
        el.classList.remove('open');
        var state = window.ssState[el.id];
        var input = el.querySelector('.ss-input');
        if (state && state.value) input.value = state.value;
        else { input.value = ''; if (state) input.placeholder = state.placeholder; }
      });
    }
    var projectSelect = document.getElementById('projectOrderSelect');
    if (projectSelect && !projectSelect.contains(e.target)) {
      projectSelect.classList.remove('open');
    }
  });

})();