/**
 * 星苹台商城 v2 - 前台公共组件
 * B2B企业采购商城，前端商城风格
 * 通过 DOM 注入 Header、导航栏、个人中心侧边栏、Footer、浮窗客服
 */
(function() {
  'use strict';

  var currentPage = window.WEBSHOP_PAGE || 'home';

  // 商城前台页面（无需个人中心侧边栏）
  var mallPages = ['home', 'agreement-zone', 'product-detail', 'batch-order', 'price-comparison'];

  // 是否为个人中心页面
  var isPersonalPage = mallPages.indexOf(currentPage) === -1;

  // 个人中心侧边栏菜单
  var personalMenuItems = [
    {
      group: '首页概览',
      items: [
        { id: 'workbench', label: '企业工作台', href: 'webshop-workbench.html' },
      ]
    },
    {
      group: '企业信息',
      items: [
        { id: 'enterprise-register', label: '企业认证', href: 'webshop-enterprise-register.html' },
        { id: 'org-management', label: '组织管理', href: 'webshop-org-management.html' },
        { id: 'role-permission', label: '角色权限', href: 'webshop-role-permission.html' },
      ]
    },
    {
      group: '采购管理',
      items: [
        { id: 'procurement-list', label: '采购清单', href: 'webshop-procurement-list.html' },
        { id: 'my-inquiries', label: '我的询价', href: 'webshop-my-inquiries.html' },
        { id: 'budget', label: '预算管控', href: 'webshop-budget.html' },
        { id: 'contract', label: '合同管理', href: 'webshop-contract.html' },
        { id: 'approval', label: '采购审批', href: 'webshop-approval.html' },
      ]
    },
    {
      group: '金融服务',
      items: [
        { id: 'finance', label: '金融中心', href: 'webshop-finance.html' },
      ]
    },
    {
      group: '结算与财务',
      items: [
        { id: 'invoice', label: '发票管理', href: 'webshop-invoice.html' },
      ]
    },
    {
      group: '数据分析',
      items: [
        { id: 'analysis-report', label: '采购分析', href: 'webshop-analysis-report.html' },
        { id: 'dashboard', label: '数据看板', href: 'webshop-dashboard.html' },
      ]
    },
  ];

  // 构建顶部Header
  function buildTopHeader() {
    var html = '<header class="top-header"><div class="top-header-inner">';
    html += '<a class="header-logo" href="webshop-home.html"><div class="logo-icon">XP</div>星苹台商城</a>';
    html += '<div class="header-search"><input type="text" placeholder="搜索商品、品牌、SKU..." /><button class="search-btn">搜索</button></div>';
    html += '<a class="header-batch-btn" href="webshop-batch-order.html" title="批量下单"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> 批量下单</a>';
    html += '<div class="header-actions">';
    html += '<a class="cart-link" href="javascript:void(0)" title="购物车"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="cart-badge">3</span></a>';
    html += '<div class="header-user"><div class="avatar">A</div>Acme采购部<span class="user-arrow">&#9660;</span>';
    html += '<div class="user-dropdown">';
    html += '<a href="webshop-workbench.html">企业工作台</a><a href="webshop-enterprise-register.html">企业信息</a><a href="webshop-approval.html">采购审批</a><a href="webshop-invoice.html">发票管理</a><a href="webshop-dashboard.html">数据看板</a><a href="#" style="color:hsl(350,89%,60%)">退出登录</a>';
    html += '</div></div></div></div></header>';
    return html;
  }

  // 构建导航栏
  function buildNavBar() {
    var navItems = [
      { id: 'home', label: '首页', href: 'webshop-home.html' },
      { id: 'agreement-zone', label: '协议专区', href: 'webshop-agreement-zone.html' },
    ];
    var html = '<nav class="nav-bar"><div class="nav-bar-inner">';
    navItems.forEach(function(item) {
      var activeClass = item.id === currentPage ? ' active' : '';
      html += '<a class="nav-link' + activeClass + '" href="' + item.href + '">' + item.label + '</a>';
    });
    var pcActive = isPersonalPage ? ' active' : '';
    html += '<a class="nav-link nav-link-pc' + pcActive + '" href="webshop-workbench.html">个人中心</a>';
    html += '</div></nav>';
    return html;
  }

  // 构建个人中心侧边栏
  function buildPersonalSidebar() {
    var html = '<div class="personal-sidebar">';
    html += '<div class="profile-card"><div class="profile-avatar">A</div><div class="profile-name">Acme采购部</div><div class="profile-company">已认证企业</div></div>';
    html += '<div class="personal-menu">';
    personalMenuItems.forEach(function(group) {
      html += '<div class="menu-group-title">' + group.group + '</div>';
      group.items.forEach(function(item) {
        var activeClass = item.id === currentPage ? ' active' : '';
        html += '<a class="menu-link' + activeClass + '" href="' + item.href + '">' + item.label + '</a>';
      });
    });
    html += '</div></div>';
    return html;
  }

  // 构建Footer
  function buildFooter() {
    var html = '<footer class="footer"><div class="footer-inner">';
    html += '<div class="footer-col"><h4>采购服务</h4><a href="webshop-home.html">商城首页</a><a href="webshop-agreement-zone.html">协议专区</a><a href="webshop-batch-order.html">批量下单</a><a href="webshop-procurement-list.html">采购清单</a></div>';
    html += '<div class="footer-col"><h4>企业服务</h4><a href="webshop-enterprise-register.html">企业认证</a><a href="webshop-budget.html">预算管控</a><a href="webshop-contract.html">合同管理</a><a href="webshop-approval.html">采购审批</a></div>';
    html += '<div class="footer-col"><h4>客户服务</h4><a href="javascript:void(0)" onclick="document.getElementById(\'cs-chat-modal\').classList.add(\'active\')">在线客服</a></div>';
    html += '<div class="footer-col"><h4>关于我们</h4><a href="webshop-home.html">平台介绍</a><a href="webshop-dashboard.html">数据看板</a></div>';
    html += '</div><div class="footer-bottom"><p>&copy; 2026 星苹台供应链商城 版权所有</p></div></footer>';
    return html;
  }

  // 构建移动端底部导航
  function buildMobileNav() {
    var html = '<nav class="mobile-nav" id="mobile-nav">';
    var mobileItems = [
      { id: 'home', label: '首页', href: 'webshop-home.html' },
      { id: 'agreement-zone', label: '协议专区', href: 'webshop-agreement-zone.html' },
      { id: 'workbench', label: '个人中心', href: 'webshop-workbench.html' },
    ];
    mobileItems.forEach(function(item) {
      var isActive = (item.id === currentPage || (isPersonalPage && item.id === 'workbench'));
      html += '<a class="nav-item' + (isActive ? ' active' : '') + '" href="' + item.href + '">';
      html += '<span class="nav-icon">';
      if (item.id === 'home') html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
      else if (item.id === 'agreement-zone') html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
      else if (item.id === 'workbench') html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      html += '</span>' + item.label + '</a>';
    });
    html += '</nav>';
    return html;
  }

  // 构建浮窗客服按钮
  function buildCsFloat() {
    var html = '<div class="cs-float-tooltip" id="cs-float-tooltip">需要帮助？在线客服</div>';
    html += '<button class="cs-float-btn" id="cs-float-btn" title="在线客服" onclick="document.getElementById(\'cs-chat-modal\').classList.add(\'active\')">';
    html += '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    html += '<span class="cs-dot"></span></button>';
    return html;
  }

  // 构建客服对话弹窗（增强版：FAQ + 企微二维码 + 转人工）
  function buildCsChatModal() {
    var html = '<div class="modal-overlay" id="cs-chat-modal"><div class="modal cs-chat-modal-v2">';
    html += '<div class="modal-header"><div class="modal-title"><span class="cs-online-dot"></span><span id="cs-chat-title">AI智能客服</span></div>';
    html += '<div class="cs-header-actions"><button class="cs-transfer-btn" id="cs-transfer-btn" onclick="csTransferToHuman()" title="转人工客服"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 转人工</button>';
    html += '<button class="modal-close" onclick="document.getElementById(\'cs-chat-modal\').classList.remove(\'active\');csResetChat()">&times;</button></div></div>';
    html += '<div class="modal-body" style="padding:0;display:flex;flex-direction:column;height:460px;">';
    html += '<div class="cs-chat-messages" id="cs-chat-messages"><div class="cs-msg system"><div class="cs-msg-bubble">您好！我是星苹台AI智能客服，请问有什么可以帮助您的？</div><div class="cs-msg-time">刚刚</div></div></div>';
    html += '<div class="cs-faq-panel" id="cs-faq-panel"><div class="cs-faq-title">常见问题</div><div class="cs-faq-list">';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'如何查看订单状态？\')">如何查看订单状态？</div>';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'发票如何申请？\')">发票如何申请？</div>';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'企业认证需要什么材料？\')">企业认证需要什么材料？</div>';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'如何修改配送地址？\')">如何修改配送地址？</div>';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'协议价如何查询？\')">协议价如何查询？</div>';
    html += '<div class="cs-faq-item" onclick="csFaqClick(\'预算超支了怎么办？\')">预算超支了怎么办？</div>';
    html += '</div></div>';
    html += '<div class="cs-internal-panel" id="cs-internal-panel" style="display:none;"><div class="cs-internal-title">已转接内部客服</div><div class="cs-internal-info"><div class="cs-internal-name">张经理（客户经理）</div><div class="cs-internal-desc">正在通过内部通讯工具为您服务</div><div class="cs-internal-status"><span class="cs-internal-dot"></span>在线</div></div></div>';
    html += '<div class="cs-chat-input"><input type="text" id="cs-chat-input" placeholder="输入您的问题..." onkeydown="if(event.key===\'Enter\')csSendMsg()" /><button class="cs-send-btn" onclick="csSendMsg()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>';
    html += '</div></div></div>';
    return html;
  }

  // 构建批量询价浮窗按钮
  function buildInquiryFloat() {
    var html = '<div class="inquiry-float-btn" onclick="window.openModal(\'inquiry-modal\')" title="批量询价">';
    html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>';
    html += '<span>批量询价</span></div>';
    return html;
  }

  // 商品目录数据（用于商品选择器）
  var PRODUCT_CATALOG = [
    { name: '3M KN95防护口罩 50只装', brand: '3M', spec: '50只/盒', sku: 'MASK-3M-KN95-50', price: '¥89.00' },
    { name: '博世手电钻 GSB 120-LI', brand: 'Bosch', spec: '12V双电池', sku: 'BOSCH-GSB120', price: '¥459.00' },
    { name: '霍尼韦尔 KN95口罩 30只装', brand: 'Honeywell', spec: '30只/盒', sku: 'HONEYWELL-KN95-30', price: '¥69.00' },
    { name: '工业级不锈钢法兰 DN100', brand: '国产', spec: 'DN100', sku: 'FLANGE-DN100', price: '¥486.00' },
    { name: '劳保手套 防割耐磨 12双装', brand: '星工', spec: '12双/包', sku: 'GLOVE-STAR-12', price: '¥45.00' },
    { name: '智能传感器模块 v3.2', brand: 'Siemens', spec: 'v3.2', sku: 'SENSOR-SIE-V32', price: '¥569.00' },
    { name: '精密轴承组 6205-2RS', brand: 'SKF', spec: '6205-2RS', sku: 'BEARING-SKF-6205', price: '¥224.00' },
    { name: '金属切削液 200L', brand: '嘉实多', spec: '200L桶装', sku: 'CUTFLUID-200L', price: '¥273.00' },
    { name: '办公家具套装B型', brand: '震旦', spec: '套装', sku: 'FURN-AURORA-B', price: '¥182.00' },
    { name: '环保包装材料 定制规格', brand: '定制', spec: '定制', sku: 'PACK-ECO-CUSTOM', price: '¥9.80' }
  ];

  // 生成商品选择器表格行
  function buildPickerRows() {
    var rows = '';
    for (var i = 0; i < PRODUCT_CATALOG.length; i++) {
      var p = PRODUCT_CATALOG[i];
      rows += '<tr data-picker-idx="' + i + '" class="picker-row">';
      rows += '<td><input type="checkbox" class="picker-checkbox" /></td>';
      rows += '<td><div class="picker-product-img" style="width:50px;height:50px;background:#e5e5e5;display:flex;align-items:center;justify-content:center;font-size:11px;color:#999;border-radius:4px;">商品图</div></td>';
      rows += '<td>' + p.name + '</td>';
      rows += '<td>' + p.brand + '</td>';
      rows += '<td>' + p.spec + '</td>';
      rows += '<td>' + p.sku + '</td>';
      rows += '<td>' + p.price + '</td>';
      rows += '</tr>';
    }
    return rows;
  }

  // 构建在线询价弹窗（批量询价）
  function buildInquiryModal() {
    var html = '';

    // 询价主弹窗
    html += '<div class="modal-overlay" id="inquiry-modal"><div class="modal" style="max-width:820px;">';
    html += '<div class="modal-header"><div class="modal-title">批量询价</div><button class="modal-close" onclick="window.closeModal(\'inquiry-modal\')">&times;</button></div>';
    html += '<div class="modal-body">';
    html += '<div style="font-size:var(--text-sm);color:hsl(var(--muted-foreground));margin-bottom:0.75rem;">添加需要询价的商品，设置采购数量和期望价格，客户经理将在1个工作日内反馈报价。</div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">';
    html += '<div style="display:flex;gap:0.5rem;">';
    html += '<button class="btn btn-outline btn-sm" onclick="openProductPicker()">+ 添加商品</button>';
    html += '<button class="btn btn-outline btn-sm" onclick="batchInquiryImport()">批量导入</button>';
    html += '</div>';
    html += '<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;" class="product-toolbar-right">';
    html += '<input type="text" placeholder="搜索商品名称..." style="padding:0.35rem 0.5rem;border:1px solid hsl(var(--border));border-radius:var(--radius-sm);font-size:var(--text-xs);width:160px;" oninput="batchInquiryFilter(this.value)" />';
    html += '</div>';
    html += '</div>';
    html += '<div style="max-height:340px;overflow-y:auto;">';
    html += '<table class="data-table" id="inquiry-table">';
    html += '<thead><tr><th style="width:60px;">商品图片</th><th>商品名称</th><th>品牌</th><th>规格</th><th>SKU</th><th>采购数量</th><th>期望价格（元）</th><th>操作</th></tr></thead>';
    html += '<tbody id="inquiry-tbody">';
    html += '<tr class="inq-empty-row"><td colspan="8" style="text-align:center;color:hsl(var(--muted-foreground));padding:2rem;">请点击「添加商品」选择需要询价的商品</td></tr>';
    html += '</tbody></table></div>';

    // 公司信息区
    html += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid hsl(var(--border));">';
    html += '<div style="font-size:var(--text-sm);font-weight:600;margin-bottom:0.75rem;color:hsl(var(--foreground));">公司信息</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">';
    html += '<div class="inquiry-field"><label>公司名称</label><input type="text" id="inq-company-name" placeholder="请输入公司名称" /></div>';
    html += '<div class="inquiry-field"><label>联系人</label><input type="text" id="inq-contact-person" placeholder="请输入联系人" /></div>';
    html += '<div class="inquiry-field"><label>联系电话</label><input type="text" id="inq-contact-phone" placeholder="请输入联系电话" /></div>';
    html += '<div class="inquiry-field"><label>备注说明</label><input type="text" id="inq-remark" placeholder="备注说明（选填）" /></div>';
    html += '</div></div>';

    html += '<div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-top:1rem;padding-top:1rem;border-top:1px solid hsl(var(--border))">';
    html += '<button class="btn btn-outline" onclick="window.closeModal(\'inquiry-modal\');batchInquiryReset()">取消</button>';
    html += '<button class="btn btn-primary" onclick="batchInquirySubmit()">提交询价</button>';
    html += '</div></div></div></div>';

    // 商品选择器弹窗
    html += '<div class="modal-overlay" id="product-picker-modal"><div class="modal" style="max-width:800px;">';
    html += '<div class="modal-header"><div class="modal-title">选择商品</div><button class="modal-close" onclick="closeProductPicker()">&times;</button></div>';
    html += '<div class="modal-body">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">';
    html += '<input type="text" class="picker-search" placeholder="搜索商品名称..." oninput="productPickerSearch(this.value)" style="padding:0.5rem 0.75rem;border:1px solid hsl(var(--border));border-radius:var(--radius-sm);font-size:var(--text-sm);width:260px;outline:none;" />';
    html += '<label style="font-size:var(--text-sm);cursor:pointer;display:flex;align-items:center;gap:0.375rem;color:hsl(var(--muted-foreground));"><input type="checkbox" onclick="productPickerToggleAll(this.checked)" /> 全选</label>';
    html += '</div>';
    html += '<div style="max-height:400px;overflow-y:auto;">';
    html += '<table class="picker-table data-table" id="picker-table">';
    html += '<thead><tr><th style="width:40px;"></th><th style="width:60px;">图片</th><th>商品名称</th><th>品牌</th><th>规格</th><th>SKU</th><th>协议价</th></tr></thead>';
    html += '<tbody id="picker-tbody">';
    html += buildPickerRows();
    html += '</tbody></table></div>';
    html += '<div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-top:1rem;padding-top:1rem;border-top:1px solid hsl(var(--border));">';
    html += '<button class="btn btn-outline" onclick="closeProductPicker()">取消</button>';
    html += '<button class="btn btn-primary" onclick="confirmProductPicker()">确认添加</button>';
    html += '</div></div></div></div>';

    return html;
  }

  // 注入所有组件
  function injectComponents() {
    var headerContainer = document.getElementById('header-container');
    if (headerContainer) headerContainer.innerHTML = buildTopHeader();

    var navBarContainer = document.getElementById('nav-bar-container');
    if (navBarContainer) navBarContainer.innerHTML = buildNavBar();

    var personalSidebarContainer = document.getElementById('personal-sidebar-container');
    if (personalSidebarContainer && isPersonalPage) {
      personalSidebarContainer.innerHTML = buildPersonalSidebar();
    }

    var footerContainer = document.getElementById('footer-container');
    if (footerContainer) footerContainer.innerHTML = buildFooter();

    var mobileNavContainer = document.getElementById('mobile-nav-container');
    if (mobileNavContainer) mobileNavContainer.innerHTML = buildMobileNav();

    var csFloatContainer = document.getElementById('cs-float-container');
    if (csFloatContainer) csFloatContainer.innerHTML = buildCsFloat();

    var csChatModalContainer = document.getElementById('cs-chat-modal-container');
    if (csChatModalContainer) csChatModalContainer.innerHTML = buildCsChatModal();

    var inquiryFloatContainer = document.getElementById('inquiry-float-container');
    if (inquiryFloatContainer) inquiryFloatContainer.innerHTML = buildInquiryFloat();

    var inquiryModalContainer = document.getElementById('inquiry-modal-container');
    if (inquiryModalContainer) inquiryModalContainer.innerHTML = buildInquiryModal();

    // 客服浮窗提示5秒后消失
    setTimeout(function() {
      var tooltip = document.getElementById('cs-float-tooltip');
      if (tooltip) tooltip.style.display = 'none';
    }, 5000);
    var tooltip = document.getElementById('cs-float-tooltip');
    if (tooltip) tooltip.style.display = 'block';
  }

  // ===== 公共工具函数 =====

  // 导出表格为 CSV
  window.exportTable = function(tableId, filename) {
    var table = document.getElementById(tableId);
    if (!table) return;
    var rows = table.querySelectorAll('tr');
    var csv = '\uFEFF';
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].querySelectorAll('th, td');
      var rowData = [];
      for (var j = 0; j < cells.length; j++) {
        rowData.push('"' + (cells[j].innerText || '').replace(/"/g, '""') + '"');
      }
      csv += rowData.join(',') + '\n';
    }
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = (filename || 'export') + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 分页初始化
  window.initPagination = function(tableId, paginationId, pageSize) {
    pageSize = pageSize || 5;
    var table = document.getElementById(tableId);
    var pagination = document.getElementById(paginationId);
    if (!table || !pagination) return;
    var rows = table.querySelectorAll('tbody tr:not(.sub-row)');
    var totalRows = rows.length;
    var totalPages = Math.ceil(totalRows / pageSize);
    var currentPage = 1;

    function render() {
      rows.forEach(function(row, i) {
        var start = (currentPage - 1) * pageSize;
        var end = start + pageSize;
        row.style.display = (i >= start && i < end) ? '' : 'none';
      });
      var start = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
      var end = Math.min(currentPage * pageSize, totalRows);
      pagination.innerHTML = '';
      var info = document.createElement('div');
      info.className = 'pagination-info';
      info.textContent = '共 ' + totalRows + ' 条，显示第 ' + start + '-' + end + ' 条';
      pagination.appendChild(info);
      var controls = document.createElement('div');
      controls.className = 'pagination-controls';
      var btns = [
        { label: '\u00AB', action: function() { currentPage = 1; render(); }, disabled: currentPage === 1 },
        { label: '\u2039', action: function() { if (currentPage > 1) { currentPage--; render(); } }, disabled: currentPage === 1 },
      ];
      var startPage = Math.max(1, currentPage - 2);
      var endPage = Math.min(totalPages, currentPage + 2);
      for (var p = startPage; p <= endPage; p++) {
        (function(pg) {
          btns.push({ label: '' + pg, action: function() { currentPage = pg; render(); }, active: currentPage === pg, disabled: false });
        })(p);
      }
      btns.push({ label: '\u203A', action: function() { if (currentPage < totalPages) { currentPage++; render(); } }, disabled: currentPage === totalPages || totalPages === 0 });
      btns.push({ label: '\u00BB', action: function() { currentPage = totalPages || 1; render(); }, disabled: currentPage === totalPages || totalPages === 0 });
      btns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.textContent = b.label;
        if (b.active) btn.className = 'active';
        if (b.disabled) btn.disabled = true;
        btn.onclick = b.action;
        controls.appendChild(btn);
      });
      pagination.appendChild(controls);
      var sizeSel = document.createElement('div');
      sizeSel.className = 'pagination-size';
      sizeSel.innerHTML = '<span>每页</span><select onchange="window.changePageSize(\'' + tableId + '\',\'' + paginationId + '\',parseInt(this.value))"><option value="5"' + (pageSize === 5 ? ' selected' : '') + '>5</option><option value="10"' + (pageSize === 10 ? ' selected' : '') + '>10</option><option value="20"' + (pageSize === 20 ? ' selected' : '') + '>20</option></select><span>条</span>';
      pagination.appendChild(sizeSel);
    }

    window._paginationRefs = window._paginationRefs || {};
    window._paginationRefs[tableId + '_' + paginationId] = { tableId: tableId, paginationId: paginationId, pageSize: pageSize, render: render, currentPage: currentPage };
    render();
  };

  window.changePageSize = function(tableId, paginationId, size) {
    var ref = window._paginationRefs && window._paginationRefs[tableId + '_' + paginationId];
    if (ref) {
      ref.pageSize = size;
      ref.currentPage = 1;
      window.initPagination(tableId, paginationId, size);
    }
  };

  // Modal 操作
  window.openModal = function(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  };
  window.closeModal = function(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // ===== 客服对话函数 =====
  window.csSendMsg = function() {
    var input = document.getElementById('cs-chat-input');
    var container = document.getElementById('cs-chat-messages');
    if (!input || !container || !input.value.trim()) return;
    var msg = input.value.trim();
    input.value = '';
    var now = new Date();
    var time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    container.innerHTML += '<div class="cs-msg user"><div class="cs-msg-bubble">' + msg + '</div><div class="cs-msg-time">' + time + '</div></div>';
    container.scrollTop = container.scrollHeight;
    setTimeout(function() {
      var reply = csGetAiReply(msg);
      container.innerHTML += '<div class="cs-msg system"><div class="cs-msg-bubble">' + reply + '</div><div class="cs-msg-time">' + time + '</div></div>';
      container.scrollTop = container.scrollHeight;
    }, 600);
  };

  function csGetAiReply(msg) {
    if (msg.indexOf('订单') !== -1) return '您可以在【个人中心-订单管理】中查看所有订单状态。如有疑问，可点击"转人工"联系客户经理。';
    if (msg.indexOf('发票') !== -1) return '在【个人中心-发票管理】中可以申请开票，支持电子发票和纸质发票两种方式。';
    if (msg.indexOf('认证') !== -1) return '企业认证需要准备：营业执照、法人身份证、对公账户信息。审核通常在1-3个工作日内完成。';
    if (msg.indexOf('协议价') !== -1) return '您可以在【协议专区】查看所有协议价商品。如需调整协议价格，请联系您的专属客户经理。';
    if (msg.indexOf('预算') !== -1) return '您可以在【预算管控】中查看部门预算使用情况。如需调整预算额度，请提交预算调整申请。';
    if (msg.indexOf('地址') !== -1) return '在【个人中心-地址管理】中可添加、修改配送地址，下单时选择对应地址即可。';
    return '感谢您的咨询，我会尽快为您解答。如需更详细的帮助，可以点击"转人工"联系专属客户经理。';
  }

  window.csFaqClick = function(question) {
    var input = document.getElementById('cs-chat-input');
    if (input) { input.value = question; csSendMsg(); }
  };

  window.csTransferToHuman = function() {
    var title = document.getElementById('cs-chat-title');
    var btn = document.getElementById('cs-transfer-btn');
    var faq = document.getElementById('cs-faq-panel');
    var internal = document.getElementById('cs-internal-panel');
    var container = document.getElementById('cs-chat-messages');
    if (title) title.textContent = '人工客服（张经理）';
    if (btn) btn.style.display = 'none';
    if (faq) faq.style.display = 'none';
    if (internal) internal.style.display = 'block';
    var now = new Date();
    var time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    container.innerHTML += '<div class="cs-msg system"><div class="cs-msg-bubble">已为您转接人工客服，请稍候。客户经理将通过内部通讯工具与您联系。</div><div class="cs-msg-time">' + time + '</div></div>';
    container.scrollTop = container.scrollHeight;
  };

  window.csResetChat = function() {
    var title = document.getElementById('cs-chat-title');
    var btn = document.getElementById('cs-transfer-btn');
    var faq = document.getElementById('cs-faq-panel');
    var internal = document.getElementById('cs-internal-panel');
    var container = document.getElementById('cs-chat-messages');
    if (title) title.textContent = 'AI智能客服';
    if (btn) btn.style.display = '';
    if (internal) internal.style.display = 'none';
    if (faq) faq.style.display = '';
    if (container) {
      container.innerHTML = '<div class="cs-msg system"><div class="cs-msg-bubble">您好！我是星苹台AI智能客服，请问有什么可以帮助您的？</div><div class="cs-msg-time">刚刚</div></div>';
    }
  };

  // 批量询价功能

  // 根据商品数据生成表格行HTML
  function buildInquiryRowHTML(product) {
    return '<td><div class="picker-product-img" style="width:50px;height:50px;background:#e5e5e5;display:flex;align-items:center;justify-content:center;font-size:11px;color:#999;border-radius:4px;">商品图</div></td>'
      + '<td><span class="inq-name">' + (product.name || '') + '</span></td>'
      + '<td><span class="inq-brand">' + (product.brand || '-') + '</span></td>'
      + '<td><span class="inq-spec">' + (product.spec || '-') + '</span></td>'
      + '<td><span class="inq-sku">' + (product.sku || '-') + '</span></td>'
      + '<td><input type="number" placeholder="数量" min="1" value="1" style="width:80px;padding:0.35rem 0.5rem;border:1px solid hsl(var(--border));border-radius:var(--radius-sm);font-size:var(--text-sm);" /></td>'
      + '<td><input type="number" placeholder="期望价格" min="0" step="0.01" style="width:100px;padding:0.35rem 0.5rem;border:1px solid hsl(var(--border));border-radius:var(--radius-sm);font-size:var(--text-sm);" /></td>'
      + '<td><a href="javascript:void(0)" class="btn btn-xs btn-outline" style="color:hsl(var(--destructive))" onclick="batchInquiryRemoveRow(this)">删除</a></td>';
  }

  window.batchInquiryAddRow = function(product) {
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    // 移除空状态提示
    var emptyRow = tbody.querySelector('.inq-empty-row');
    if (emptyRow) emptyRow.remove();
    var tr = document.createElement('tr');
    tr.innerHTML = buildInquiryRowHTML(product || {});
    tbody.appendChild(tr);
  };

  window.batchInquiryRemoveRow = function(el) {
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    el.closest('tr').remove();
    // 如果没有任何商品行，显示空状态
    var rows = tbody.querySelectorAll('tr:not(.inq-empty-row)');
    if (rows.length === 0) {
      tbody.innerHTML = '<tr class="inq-empty-row"><td colspan="8" style="text-align:center;color:hsl(var(--muted-foreground));padding:2rem;">请点击「添加商品」选择需要询价的商品</td></tr>';
    }
  };

  window.batchInquiryImport = function() {
    var text = prompt('请输入要导入的商品名称列表，每行一个商品：\n\n示例：\n3M KN95口罩 50只装\n博世手电钻 GSB 120-LI\n劳保手套 防割耐磨');
    if (!text || !text.trim()) return;
    var lines = text.trim().split('\n');
    // 清除空状态
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    var emptyRow = tbody.querySelector('.inq-empty-row');
    if (emptyRow) emptyRow.remove();
    lines.forEach(function(line) {
      var name = line.trim();
      if (!name) return;
      var tr = document.createElement('tr');
      tr.innerHTML = buildInquiryRowHTML({ name: name });
      tbody.appendChild(tr);
    });
  };

  window.batchInquiryFilter = function(keyword) {
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    var rows = tbody.querySelectorAll('tr:not(.inq-empty-row)');
    var kw = (keyword || '').toLowerCase();
    rows.forEach(function(row) {
      if (!kw) { row.style.display = ''; return; }
      var nameEl = row.querySelector('.inq-name');
      var name = (nameEl && nameEl.textContent || '').toLowerCase();
      row.style.display = name.indexOf(kw) > -1 ? '' : 'none';
    });
  };

  window.batchInquirySubmit = function() {
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    var rows = tbody.querySelectorAll('tr:not(.inq-empty-row)');
    if (rows.length === 0) { alert('请至少添加一个商品'); return; }
    var itemCount = 0;
    rows.forEach(function(row) {
      var nameEl = row.querySelector('.inq-name');
      var name = nameEl ? nameEl.textContent.trim() : '';
      if (name) itemCount++;
    });
    if (itemCount === 0) { alert('请至少添加一个商品'); return; }
    var companyName = document.getElementById('inq-company-name');
    var contactPerson = document.getElementById('inq-contact-person');
    if (!companyName || !companyName.value.trim()) { alert('请填写公司名称'); return; }
    if (!contactPerson || !contactPerson.value.trim()) { alert('请填写联系人'); return; }
    alert('询价已提交成功！共 ' + itemCount + ' 个商品，客户经理将在1个工作日内与您联系。');
    window.closeModal('inquiry-modal');
    batchInquiryReset();
  };

  window.batchInquiryReset = function() {
    var tbody = document.getElementById('inquiry-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr class="inq-empty-row"><td colspan="8" style="text-align:center;color:hsl(var(--muted-foreground));padding:2rem;">请点击「添加商品」选择需要询价的商品</td></tr>';
    var fields = ['inq-company-name', 'inq-contact-person', 'inq-contact-phone', 'inq-remark'];
    for (var i = 0; i < fields.length; i++) {
      var el = document.getElementById(fields[i]);
      if (el) el.value = '';
    }
  };

  // 商品选择器功能
  window.openProductPicker = function() {
    var modal = document.getElementById('product-picker-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeProductPicker = function() {
    var modal = document.getElementById('product-picker-modal');
    if (modal) modal.classList.remove('active');
  };

  window.confirmProductPicker = function() {
    var checkboxes = document.querySelectorAll('#picker-tbody .picker-checkbox:checked');
    var added = 0;
    for (var i = 0; i < checkboxes.length; i++) {
      var row = checkboxes[i].closest('tr');
      if (!row) continue;
      var idx = row.getAttribute('data-picker-idx');
      if (idx === null) continue;
      var product = PRODUCT_CATALOG[parseInt(idx, 10)];
      if (!product) continue;
      // 检查是否已添加过（按SKU去重）
      var tbody = document.getElementById('inquiry-tbody');
      if (tbody) {
        var existingRows = tbody.querySelectorAll('tr:not(.inq-empty-row)');
        var alreadyExists = false;
        for (var j = 0; j < existingRows.length; j++) {
          var skuEl = existingRows[j].querySelector('.inq-sku');
          if (skuEl && skuEl.textContent.trim() === product.sku) {
            alreadyExists = true;
            break;
          }
        }
        if (alreadyExists) continue;
      }
      batchInquiryAddRow(product);
      added++;
    }
    closeProductPicker();
    if (added === 0 && checkboxes.length > 0) {
      alert('所选商品已存在于询价列表中');
    }
  };

  window.productPickerSearch = function(keyword) {
    var rows = document.querySelectorAll('#picker-tbody .picker-row');
    var kw = (keyword || '').toLowerCase();
    rows.forEach(function(row) {
      if (!kw) { row.style.display = ''; return; }
      var text = row.textContent.toLowerCase();
      row.style.display = text.indexOf(kw) > -1 ? '' : 'none';
    });
  };

  window.productPickerToggleAll = function(checked) {
    var checkboxes = document.querySelectorAll('#picker-tbody .picker-checkbox');
    checkboxes.forEach(function(cb) {
      cb.checked = checked;
    });
  };

  // 页面加载完成后注入组件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }
})();