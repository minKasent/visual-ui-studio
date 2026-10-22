/**
 * ============================================================================
 * VISUAL UI STUDIO PRO v3.0 — CORE ENGINE (WYSIWYG DOM & COORDINATE EDITOR)
 * ============================================================================
 * Built for Non-IT Users & Pro Designers/Developers Worldwide:
 * - Freehand 60fps Drag & 8-Handle Resize with Smart Alignment Guides
 * - 1-Click Add Elements & Instant Delete (Floating HUD 🗑️ Xóa, Delete key, Tree 🗑️, Ctrl+Z)
 * - 1-Click Color / Gradient Picker with Explicit "↺ Màu gốc" (Original Color Reset)
 * - Smart Icon-Safe Text Editing (Preserves <svg> & <i> icons inside buttons/links)
 * - Full Atomic Undo/Redo Stack (Ctrl+Z / Ctrl+Y) across Style, Move, Add, Delete, Reset
 * - Responsive Breakpoints (Desktop / Tablet / Mobile) & State (:hover) Styling
 * - Works with Local Node Server (Direct Save) AND Standalone / GitHub Pages
 */

(function () {
  'use strict';

  // ==================== APPLICATION STATE ====================
  const state = {
    lang: 'vi',
    workspaceDir: '',
    currentFile: 'index.html',
    sourceMode: 'workspace', // 'workspace' | 'local-file' | 'template'
    hasLocalServer: true,
    originalRawHtml: '',
    viewport: 'desktop', // 'desktop' | 'tablet' | 'mobile'
    editState: 'normal', // 'normal' | 'hover'
    mode: 'edit', // 'edit' | 'preview'
    zoom: 1,
    showGuides: true,
    showGrid: false,
    showOutlines: false,

    selectedEl: null,
    selectedSelector: null,
    hoveredEl: null,

    // Map<selector, ChangeRecord>
    changes: new Map(),
    // Map<customId, AddedNodeRecord>
    addedNodes: new Map(),

    // Full Atomic Undo / Redo Stacks (stores deep snapshots of changes + DOM state)
    undoStack: [],
    redoStack: [],
    inputDebounceTimer: null,
    pendingPreInputSnapshot: null
  };

  // ==================== DOM REFERENCES ====================
  const dom = {
    lblWorkspaceName: document.getElementById('lbl-workspace-name'),
    fileSelector: document.getElementById('file-selector'),
    btnOpenLocalFile: document.getElementById('btn-open-local-file'),
    hiddenHtmlInput: document.getElementById('hidden-html-input'),
    btnOpenFolder: document.getElementById('btn-open-folder'),
    btnOpenTemplates: document.getElementById('btn-open-templates'),

    viewportSwitcher: document.getElementById('viewport-switcher'),
    modeSwitcher: document.getElementById('mode-switcher'),
    btnToggleGuides: document.getElementById('btn-toggle-guides'),
    btnToggleGrid: document.getElementById('btn-toggle-grid'),
    btnToggleOutlines: document.getElementById('btn-toggle-outlines'),
    btnUndo: document.getElementById('btn-undo'),
    btnRedo: document.getElementById('btn-redo'),
    btnReloadCanvas: document.getElementById('btn-reload-canvas'),

    btnLangToggle: document.getElementById('btn-lang-toggle'),
    lblLang: document.getElementById('lbl-lang'),
    btnHelpModal: document.getElementById('btn-help-modal'),
    btnAiPrompt: document.getElementById('btn-ai-prompt'),
    changeBadge: document.getElementById('change-badge'),
    btnDownloadHtml: document.getElementById('btn-download-html'),
    btnSaveDirect: document.getElementById('btn-save-direct'),

    // Left Sidebar
    insertPositionMode: document.getElementById('insert-position-mode'),
    basicBlocksGrid: document.getElementById('basic-blocks-grid'),
    proBlocksGrid: document.getElementById('pro-blocks-grid'),
    layerSearch: document.getElementById('layer-search'),
    layersTree: document.getElementById('layers-tree'),
    magicPresetsList: document.getElementById('magic-presets-list'),
    historyList: document.getElementById('history-list'),
    btnClearAllHistory: document.getElementById('btn-clear-all-history'),

    // Canvas
    canvasDropzone: document.getElementById('canvas-dropzone'),
    dropzoneOverlay: document.getElementById('dropzone-overlay'),
    breadcrumbTrail: document.getElementById('breadcrumb-trail'),
    zoomLevelLbl: document.getElementById('zoom-level-lbl'),
    btnZoomOut: document.getElementById('btn-zoom-out'),
    btnZoomReset: document.getElementById('btn-zoom-reset'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    iframeContainer: document.getElementById('iframe-container'),
    iframe: document.getElementById('preview-iframe'),

    // Right Sidebar Inspector
    inspectorEmpty: document.getElementById('inspector-empty'),
    inspectorContent: document.getElementById('inspector-content'),
    inspTag: document.getElementById('insp-tag'),
    inspSelector: document.getElementById('insp-selector'),
    btnSelectParent: document.getElementById('btn-select-parent'),
    btnMovePrev: document.getElementById('btn-move-prev'),
    btnMoveNext: document.getElementById('btn-move-next'),
    btnDuplicateEl: document.getElementById('btn-duplicate-el'),
    btnResetEl: document.getElementById('btn-reset-el'),
    btnDeleteEl: document.getElementById('btn-delete-el'),

    stateTabs: document.getElementById('state-tabs'),
    scopeViewportBadge: document.getElementById('scope-viewport-badge'),

    // Coordinates & Size
    btnPosReset: document.getElementById('btn-pos-reset'),
    inpTx: document.getElementById('inp-tx'),
    inpTy: document.getElementById('inp-ty'),
    btnResetX: document.getElementById('btn-reset-x'),
    btnResetY: document.getElementById('btn-reset-y'),
    inpWidth: document.getElementById('inp-width'),
    inpHeight: document.getElementById('inp-height'),
    btnCenterH: document.getElementById('btn-center-h'),

    // Content & Media
    btnTextReset: document.getElementById('btn-text-reset'),
    rowTextContent: document.getElementById('row-text-content'),
    inpText: document.getElementById('inp-text'),
    rowHref: document.getElementById('row-href'),
    inpHref: document.getElementById('inp-href'),
    rowImgSrc: document.getElementById('row-img-src'),
    inpImgSrc: document.getElementById('inp-img-src'),
    btnImgReset: document.getElementById('btn-img-reset'),
    btnUploadImg: document.getElementById('btn-upload-img'),
    hiddenImgInput: document.getElementById('hidden-img-input'),
    selObjectFit: document.getElementById('sel-object-fit'),

    // Colors & Gradients
    btnColorReset: document.getElementById('btn-color-reset'),
    inpColorPicker: document.getElementById('inp-color-picker'),
    inpColorHex: document.getElementById('inp-color-hex'),
    btnBgTransparent: document.getElementById('btn-bg-transparent'),
    btnBgReset: document.getElementById('btn-bg-reset'),
    inpBgPicker: document.getElementById('inp-bg-picker'),
    inpBgHex: document.getElementById('inp-bg-hex'),
    btnGradReset: document.getElementById('btn-grad-reset'),
    gradientSwatches: document.getElementById('gradient-swatches'),

    // Typography
    selFontFamily: document.getElementById('sel-font-family'),
    lblFontSize: document.getElementById('lbl-font-size'),
    rngFontSize: document.getElementById('rng-font-size'),
    inpFontSize: document.getElementById('inp-font-size'),
    selFontWeight: document.getElementById('sel-font-weight'),
    textAlignGroup: document.getElementById('text-align-group'),

    // Border & Shadow
    lblRadius: document.getElementById('lbl-radius'),
    rngRadius: document.getElementById('rng-radius'),
    inpRadius: document.getElementById('inp-radius'),
    lblOpacity: document.getElementById('lbl-opacity'),
    rngOpacity: document.getElementById('rng-opacity'),
    inpBorderWidth: document.getElementById('inp-border-width'),
    inpBorderColor: document.getElementById('inp-border-color'),
    selShadow: document.getElementById('sel-shadow'),

    // Spacing & Flex
    inpPadding: document.getElementById('inp-padding'),
    inpMargin: document.getElementById('inp-margin'),
    btnFlexRow: document.getElementById('btn-flex-row'),
    btnFlexCol: document.getElementById('btn-flex-col'),
    btnFlexCenter: document.getElementById('btn-flex-center'),
    btnFlexBetween: document.getElementById('btn-flex-between'),
    inpGap: document.getElementById('inp-gap'),

    // Modals
    modalAiPrompt: document.getElementById('modal-ai-prompt'),
    aiPromptOutput: document.getElementById('ai-prompt-output'),
    cssDiffOutput: document.getElementById('css-diff-output'),
    btnCopyPrompt: document.getElementById('btn-copy-prompt'),
    modalTemplates: document.getElementById('modal-templates'),
    starterTemplatesGrid: document.getElementById('starter-templates-grid'),
    modalFolder: document.getElementById('modal-folder'),
    inpWorkspacePath: document.getElementById('inp-workspace-path'),
    btnConfirmFolder: document.getElementById('btn-confirm-folder'),
    modalHelp: document.getElementById('modal-help'),
    toastContainer: document.getElementById('toast-container')
  };

  // ==================== INITIALIZATION ====================
  async function init() {
    renderSidebarCatalogs();
    bindTopbarEvents();
    bindSidebarEvents();
    bindInspectorEvents();
    bindDropzoneEvents();
    bindGlobalShortcuts();
    await loadWorkspaceFiles();
  }

  // ==================== TOAST NOTIFICATION ====================
  function showToast(msg, icon = 'ph-check-circle') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i class="ph-fill ${icon}" style="color:var(--accent-cyan);font-size:16px;"></i> <span>${msg}</span>`;
    dom.toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.25s';
      setTimeout(() => el.remove(), 260);
    }, 2800);
  }

  // ==================== LANGUAGE SWITCHER (VI / EN) ====================
  function toggleLanguage() {
    state.lang = state.lang === 'vi' ? 'en' : 'vi';
    dom.lblLang.textContent = state.lang.toUpperCase();
    const dict = (window.STUDIO_I18N && window.STUDIO_I18N[state.lang]) || {};
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (dict[key]) node.innerHTML = dict[key];
    });
    renderSidebarCatalogs();
    showToast(state.lang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English');
  }

  // ==================== SIDEBAR CATALOGS (BLOCKS, PRESETS, TEMPLATES) ====================
  function renderSidebarCatalogs() {
    // 1. Element Blocks
    dom.basicBlocksGrid.innerHTML = '';
    dom.proBlocksGrid.innerHTML = '';
    (window.STUDIO_ELEMENT_BLOCKS || []).forEach((blk) => {
      const card = document.createElement('div');
      card.className = 'block-card';
      const title = state.lang === 'en' && blk.nameEn ? blk.nameEn : blk.name;
      card.innerHTML = `<i class="ph ${blk.icon}"></i><span>${title}</span>`;
      card.title = `Bấm để chèn "${title}" vào trang`;
      card.addEventListener('click', () => insertNewElement(blk));
      if (blk.category === 'pro') {
        dom.proBlocksGrid.appendChild(card);
      } else {
        dom.basicBlocksGrid.appendChild(card);
      }
    });

    // 2. Magic Presets
    dom.magicPresetsList.innerHTML = '';
    (window.STUDIO_MAGIC_PRESETS || []).forEach((preset) => {
      const item = document.createElement('div');
      item.className = 'magic-card';
      const title = state.lang === 'en' && preset.nameEn ? preset.nameEn : preset.name;
      const desc = state.lang === 'en' && preset.descEn ? preset.descEn : preset.desc;
      item.innerHTML = `
        <div class="magic-preview" style="${preset.previewStyle || ''}"></div>
        <div class="magic-info">
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
      `;
      item.addEventListener('click', () => applyMagicPreset(preset));
      dom.magicPresetsList.appendChild(item);
    });

    // 3. Starter Templates Modal
    dom.starterTemplatesGrid.innerHTML = '';
    (window.STUDIO_STARTER_TEMPLATES || []).forEach((tpl) => {
      const card = document.createElement('div');
      card.className = 'template-item';
      card.innerHTML = `
        <span class="template-badge">${tpl.badge || 'PRO TEMPLATE'}</span>
        <h4>${tpl.name}</h4>
        <p>${tpl.desc}</p>
      `;
      card.addEventListener('click', () => {
        loadHtmlIntoCanvas(tpl.html, `Template: ${tpl.name}`, 'template');
        dom.modalTemplates.style.display = 'none';
        showToast(`Đã tải mẫu "${tpl.name}"! Hãy bấm vào phần tử bất kỳ để sửa.`);
      });
      dom.starterTemplatesGrid.appendChild(card);
    });
  }

  // ==================== WORKSPACE & FILE LOADING ====================
  async function loadWorkspaceFiles() {
    try {
      const res = await fetch('/api/files');
      if (!res.ok) throw new Error('No local server');
      const data = await res.json();
      state.hasLocalServer = true;
      state.workspaceDir = data.workspaceDir || '';
      dom.lblWorkspaceName.textContent = state.workspaceDir;
      dom.lblWorkspaceName.title = state.workspaceDir;

      dom.fileSelector.innerHTML = '';
      if (data.files && data.files.length > 0) {
        data.files.forEach((f) => {
          const opt = document.createElement('option');
          opt.value = f;
          opt.textContent = f;
          dom.fileSelector.appendChild(opt);
        });
        state.currentFile = data.files.includes('index.html') ? 'index.html' : data.files[0];
        dom.fileSelector.value = state.currentFile;
        await loadWorkspaceHtmlFile(state.currentFile);
      } else {
        loadStarterFallback();
      }
    } catch (err) {
      // Standalone / GitHub Pages mode
      state.hasLocalServer = false;
      loadStarterFallback();
    }
  }

  function loadStarterFallback() {
    const firstTpl = (window.STUDIO_STARTER_TEMPLATES && window.STUDIO_STARTER_TEMPLATES[0]);
    if (firstTpl) {
      dom.lblWorkspaceName.textContent = 'Chế độ Độc lập (Starter Template)';
      loadHtmlIntoCanvas(firstTpl.html, 'starter-template.html', 'template');
    }
  }

  async function loadWorkspaceHtmlFile(relPath) {
    state.currentFile = relPath;
    state.sourceMode = 'workspace';
    resetAllTrackingState();

    try {
      const rawRes = await fetch(`/api/raw-html?file=${encodeURIComponent(relPath)}`);
      if (rawRes.ok) {
        const rawData = await rawRes.json();
        state.originalRawHtml = rawData.content || '';
      }
    } catch (e) {
      console.warn('Could not fetch raw HTML:', e);
    }

    dom.iframe.onload = () => {
      setupIframeInteractiveEngine();
    };
    dom.iframe.src = `/workspace/${relPath}?t=${Date.now()}`;
  }

  function loadHtmlIntoCanvas(htmlString, labelName, sourceMode = 'local-file') {
    state.currentFile = labelName;
    state.sourceMode = sourceMode;
    state.originalRawHtml = htmlString;
    dom.lblWorkspaceName.textContent = labelName;
    resetAllTrackingState();

    dom.iframe.onload = () => {
      setupIframeInteractiveEngine();
    };
    dom.iframe.removeAttribute('src');
    dom.iframe.srcdoc = htmlString;
  }

  function resetAllTrackingState() {
    state.selectedEl = null;
    state.selectedSelector = null;
    state.hoveredEl = null;
    state.changes.clear();
    state.addedNodes.clear();
    state.undoStack = [];
    state.redoStack = [];
    updateTopbarCounters();
    renderHistoryPanel();
    showInspectorEmpty(true);
  }

  // ==================== IFRAME INTERACTIVE ENGINE ====================
  function getIframeDoc() {
    return dom.iframe.contentDocument || (dom.iframe.contentWindow && dom.iframe.contentWindow.document);
  }

  function setupIframeInteractiveEngine() {
    const idoc = getIframeDoc();
    if (!idoc || !idoc.body) return;

    // Preserve initial inline style attribute on all elements so "↺ Màu gốc / Gốc" can restore accurately
    idoc.querySelectorAll('*').forEach((el) => {
      if (!el.hasAttribute('data-ui-init-style')) {
        el.setAttribute('data-ui-init-style', el.getAttribute('style') || '');
      }
    });

    // Inject Studio Overlay & Dynamic Stylesheet inside iframe
    injectStudioHelpersIntoIframe(idoc);
    bindIframeCanvasEvents(idoc);
    rebuildLayersTree();
    syncDynamicStylesheet();
  }

  function injectStudioHelpersIntoIframe(idoc) {
    // 1. Dynamic overrides style tag
    let dynStyle = idoc.getElementById('__visual_ui_studio_overrides');
    if (!dynStyle) {
      dynStyle = idoc.createElement('style');
      dynStyle.id = '__visual_ui_studio_overrides';
      idoc.head.appendChild(dynStyle);
    }

    // 2. Editor UI Chrome style tag (removed on export)
    let helperStyle = idoc.getElementById('__visual_ui_studio_chrome_css');
    if (!helperStyle) {
      helperStyle = idoc.createElement('style');
      helperStyle.id = '__visual_ui_studio_chrome_css';
      helperStyle.textContent = `
        body.__ui_show_grid {
          background-image: radial-gradient(rgba(99, 102, 241, 0.28) 1px, transparent 1px) !important;
          background-size: 20px 20px !important;
        }
        body.__ui_show_outlines *:not(#__visual_ui_overlay_root):not(#__visual_ui_overlay_root *) {
          outline: 1px dashed rgba(56, 189, 248, 0.35) !important;
        }
        [contenteditable="true"].__ui_editing_text {
          outline: 2px solid #00f5d4 !important;
          box-shadow: 0 0 0 4px rgba(0, 245, 212, 0.25) !important;
          cursor: text !important;
        }
      `;
      idoc.head.appendChild(helperStyle);
    }

    // 3. Overlay Root for Hover Box, Selection Box, 8 Handles, Smart Guides & Interactive Action Pill
    let overlayRoot = idoc.getElementById('__visual_ui_overlay_root');
    if (overlayRoot) overlayRoot.remove();

    overlayRoot = idoc.createElement('div');
    overlayRoot.id = '__visual_ui_overlay_root';
    overlayRoot.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483640;
      font-family: 'Inter', -apple-system, sans-serif;
    `;

    overlayRoot.innerHTML = `
      <!-- Hover Highlight Box -->
      <div id="__ui_hover_box" style="display:none;position:fixed;border:1.5px dashed #38bdf8;background:rgba(56,189,248,0.04);pointer-events:none;z-index:2147483641;transition:all 0.04s linear;">
        <span id="__ui_hover_tag" style="position:absolute;top:-20px;left:-1px;background:#0284c7;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;white-space:nowrap;font-family:monospace;">TAG</span>
      </div>

      <!-- Active Selection Box + 8 Resize Handles -->
      <div id="__ui_select_box" style="display:none;position:fixed;border:2px solid #6366f1;box-shadow:0 0 0 1px rgba(0,245,212,0.5), 0 0 20px rgba(99,102,241,0.25);pointer-events:none;z-index:2147483642;">
        <div class="__ui_handle" data-handle="nw" style="position:absolute;top:-5px;left:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:nwse-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="n"  style="position:absolute;top:-5px;left:calc(50% - 5px);width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:ns-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="ne" style="position:absolute;top:-5px;right:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:nesw-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="e"  style="position:absolute;top:calc(50% - 5px);right:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:ew-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="se" style="position:absolute;bottom:-5px;right:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:nwse-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="s"  style="position:absolute;bottom:-5px;left:calc(50% - 5px);width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:ns-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="sw" style="position:absolute;bottom:-5px;left:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:nesw-resize;pointer-events:auto;"></div>
        <div class="__ui_handle" data-handle="w"  style="position:absolute;top:calc(50% - 5px);left:-5px;width:10px;height:10px;background:#fff;border:2px solid #6366f1;border-radius:50%;cursor:ew-resize;pointer-events:auto;"></div>
      </div>

      <!-- Floating Selection HUD with Direct Quick Actions (Cha, Trái/Phải, Sửa chữ, Nhân bản, Khôi phục gốc, XÓA!) -->
      <div id="__ui_select_hud" style="display:none;position:fixed;background:#0f172a;color:#f8fafc;border:1px solid rgba(99,102,241,0.65);border-radius:7px;padding:3px 6px;font-size:11px;font-weight:600;box-shadow:0 8px 25px rgba(0,0,0,0.55);pointer-events:auto;z-index:2147483645;align-items:center;gap:4px;white-space:nowrap;">
        <span id="__ui_hud_label" style="color:#00f5d4;font-family:monospace;font-weight:700;padding-right:4px;border-right:1px solid rgba(255,255,255,0.15);">BUTTON</span>
        <span id="__ui_hud_coords" style="color:#cbd5e1;font-family:monospace;font-size:10.5px;padding-right:4px;border-right:1px solid rgba(255,255,255,0.15);">0, 0</span>
        <button data-hud-act="parent" title="Chọn khung cha (Esc)" style="background:rgba(255,255,255,0.08);border:none;color:#e2e8f0;padding:2px 5px;border-radius:4px;cursor:pointer;font-size:10.5px;">⬆️ Cha</button>
        <button data-hud-act="edit" title="Sửa chữ trực tiếp (Double-click)" style="background:rgba(255,255,255,0.08);border:none;color:#e2e8f0;padding:2px 5px;border-radius:4px;cursor:pointer;font-size:10.5px;">✍️ Sửa</button>
        <button data-hud-act="dup" title="Nhân bản phần tử (Ctrl+D)" style="background:rgba(255,255,255,0.08);border:none;color:#e2e8f0;padding:2px 5px;border-radius:4px;cursor:pointer;font-size:10.5px;">📋 Nhân bản</button>
        <button data-hud-act="reset" title="Khôi phục phần tử về gốc ban đầu" style="background:rgba(245,158,11,0.2);border:1px solid rgba(245,158,11,0.45);color:#fcd34d;padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10.5px;font-weight:700;">↺ Gốc</button>
        <button data-hud-act="delete" title="Xóa phần tử này (Phím Delete)" style="background:rgba(239,68,68,0.25);border:1px solid rgba(239,68,68,0.5);color:#fca5a5;padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10.5px;font-weight:700;">🗑️ Xóa</button>
      </div>

      <!-- Smart Alignment Guides -->
      <div id="__ui_guide_v" style="display:none;position:fixed;top:0;bottom:0;width:1px;background:#ec4899;box-shadow:0 0 6px #ec4899;pointer-events:none;z-index:2147483643;"></div>
      <div id="__ui_guide_h" style="display:none;position:fixed;left:0;right:0;height:1px;background:#ec4899;box-shadow:0 0 6px #ec4899;pointer-events:none;z-index:2147483643;"></div>
    `;

    idoc.body.appendChild(overlayRoot);

    // Bind HUD Quick Action clicks
    const hud = idoc.getElementById('__ui_select_hud');
    hud.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
    hud.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const btn = e.target.closest('button[data-hud-act]');
      if (!btn || !state.selectedEl) return;
      const act = btn.getAttribute('data-hud-act');
      if (act === 'parent') selectParentElement();
      else if (act === 'edit') enableInlineTextEditing(state.selectedEl);
      else if (act === 'dup') duplicateSelectedElement();
      else if (act === 'reset') resetSelectedElement();
      else if (act === 'delete') deleteSelectedElement();
    });
  }

  // ==================== SELECTOR GENERATOR & ELEMENT LOOKUP ====================
  function isStudioInternalNode(el) {
    if (!el || el.nodeType !== 1) return true;
    if (el.id === '__visual_ui_overlay_root' || el.closest('#__visual_ui_overlay_root')) return true;
    const tag = el.tagName.toLowerCase();
    return ['html', 'head', 'script', 'style', 'meta', 'link', 'title'].includes(tag);
  }

  function getUniqueSelector(el) {
    if (!el || el.nodeType !== 1) return '';
    if (el.tagName.toLowerCase() === 'body') return 'body';

    // Check custom added element ID first
    const customId = el.getAttribute('data-ui-custom-id');
    if (customId) return `[data-ui-custom-id="${customId}"]`;

    if (el.id && !el.id.startsWith('__')) {
      return `#${CSS.escape(el.id)}`;
    }

    const parts = [];
    let cur = el;
    const idoc = getIframeDoc();

    while (cur && cur.nodeType === 1 && cur !== idoc.body && cur !== idoc.documentElement) {
      const cId = cur.getAttribute('data-ui-custom-id');
      if (cId) {
        parts.unshift(`[data-ui-custom-id="${cId}"]`);
        break;
      }
      if (cur.id && !cur.id.startsWith('__')) {
        parts.unshift(`#${CSS.escape(cur.id)}`);
        break;
      }

      let part = cur.tagName.toLowerCase();
      const validClasses = Array.from(cur.classList || []).filter(
        (c) => c && !c.startsWith('__ui_')
      );
      if (validClasses.length > 0) {
        part += '.' + validClasses.slice(0, 2).map((c) => CSS.escape(c)).join('.');
      }

      const parent = cur.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          (ch) => !ch.id || !ch.id.startsWith('__visual_ui')
        );
        const sameTagSiblings = siblings.filter((ch) => ch.tagName === cur.tagName);
        if (sameTagSiblings.length > 1) {
          const idx = siblings.indexOf(cur) + 1;
          part += `:nth-child(${idx})`;
        }
      }

      parts.unshift(part);
      cur = parent;
    }

    return parts.join(' > ');
  }

  function findElementBySelector(selector) {
    if (!selector) return null;
    const idoc = getIframeDoc();
    if (!idoc) return null;
    try {
      return idoc.querySelector(selector);
    } catch (e) {
      return null;
    }
  }

  // ==================== CHANGE RECORD MANAGEMENT ====================
  function getOrCreateRecord(el, selector) {
    const sel = selector || getUniqueSelector(el);
    if (!state.changes.has(sel)) {
      const idoc = getIframeDoc();
      const win = idoc.defaultView;
      const comp = win.getComputedStyle(el);
      const existingMatrix = parseTransformOffsets(comp.transform);

      state.changes.set(sel, {
        selector: sel,
        tag: el.tagName.toLowerCase(),
        baseTx: existingMatrix.tx,
        baseTy: existingMatrix.ty,
        tx: 0,
        ty: 0,
        width: '',
        height: '',
        initialInnerHTML: el.innerHTML,
        initialText: getSmartElementText(el),
        textEdited: false,
        currentText: '',
        initialAttrs: {
          href: el.getAttribute('href') || '',
          src: el.getAttribute('src') || ''
        },
        attrs: {},
        deleted: false,
        styles: {
          desktop_normal: {},
          desktop_hover: {},
          tablet_normal: {},
          tablet_hover: {},
          mobile_normal: {},
          mobile_hover: {}
        }
      });
    }
    return state.changes.get(sel);
  }

  function getActiveStyleBucket() {
    return `${state.viewport}_${state.editState}`;
  }

  function parseTransformOffsets(transformStr) {
    if (!transformStr || transformStr === 'none') return { tx: 0, ty: 0 };
    const match2d = transformStr.match(/matrix\(([^)]+)\)/);
    if (match2d) {
      const vals = match2d[1].split(',').map((v) => parseFloat(v.trim()));
      if (vals.length === 6) {
        return { tx: Math.round(vals[4] || 0), ty: Math.round(vals[5] || 0) };
      }
    }
    const match3d = transformStr.match(/matrix3d\(([^)]+)\)/);
    if (match3d) {
      const vals = match3d[1].split(',').map((v) => parseFloat(v.trim()));
      if (vals.length === 16) {
        return { tx: Math.round(vals[12] || 0), ty: Math.round(vals[13] || 0) };
      }
    }
    return { tx: 0, ty: 0 };
  }

  // ==================== ATOMIC UNDO / REDO ENGINE ====================
  function createFullStateSnapshot() {
    const idoc = getIframeDoc();
    // Serialize changes map
    const serializedChanges = [];
    state.changes.forEach((rec, key) => {
      serializedChanges.push([key, JSON.parse(JSON.stringify(rec))]);
    });

    // Serialize addedNodes map
    const serializedAdded = [];
    state.addedNodes.forEach((info, key) => {
      const liveEl = idoc ? idoc.querySelector(`[data-ui-custom-id="${key}"]`) : null;
      serializedAdded.push([
        key,
        {
          ...info,
          outerHTML: liveEl ? liveEl.outerHTML : info.outerHTML
        }
      ]);
    });

    return {
      changes: serializedChanges,
      addedNodes: serializedAdded,
      selectedSelector: state.selectedSelector
    };
  }

  function pushUndoSnapshot(preSnapshot) {
    const snap = preSnapshot || createFullStateSnapshot();
    state.undoStack.push(snap);
    if (state.undoStack.length > 60) state.undoStack.shift();
    state.redoStack = [];
    updateTopbarCounters();
  }

  function beginContinuousInputTransaction() {
    if (!state.pendingPreInputSnapshot) {
      state.pendingPreInputSnapshot = createFullStateSnapshot();
    }
    clearTimeout(state.inputDebounceTimer);
    state.inputDebounceTimer = setTimeout(() => {
      if (state.pendingPreInputSnapshot) {
        pushUndoSnapshot(state.pendingPreInputSnapshot);
        state.pendingPreInputSnapshot = null;
      }
    }, 450);
  }

  function restoreFromSnapshot(snap) {
    const idoc = getIframeDoc();
    if (!idoc) return;

    // 1. Reconcile added DOM nodes
    const targetAddedMap = new Map(snap.addedNodes);

    // Remove any currently mounted custom nodes that are NOT in targetAddedMap
    idoc.querySelectorAll('[data-ui-custom-id]').forEach((node) => {
      const cid = node.getAttribute('data-ui-custom-id');
      if (!targetAddedMap.has(cid)) {
        node.remove();
      }
    });

    // Re-insert any custom nodes that ARE in targetAddedMap but missing from DOM
    targetAddedMap.forEach((info, cid) => {
      let existing = idoc.querySelector(`[data-ui-custom-id="${cid}"]`);
      if (!existing) {
        const anchor = findElementBySelector(info.anchorSelector) || idoc.body;
        const temp = idoc.createElement('div');
        temp.innerHTML = info.outerHTML;
        const newEl = temp.firstElementChild;
        if (newEl) {
          if (info.position === 'before' && anchor !== idoc.body && anchor.parentElement) {
            anchor.parentElement.insertBefore(newEl, anchor);
          } else if (info.position === 'after' && anchor !== idoc.body && anchor.parentElement) {
            anchor.parentElement.insertBefore(newEl, anchor.nextSibling);
          } else {
            anchor.appendChild(newEl);
          }
        }
      }
    });

    state.addedNodes = targetAddedMap;

    // 2. First revert any modified elements from current state.changes back to initial inline/text/attrs
    state.changes.forEach((oldRec, sel) => {
      const el = findElementBySelector(sel);
      if (el) {
        restoreElementInlineToInitial(el, oldRec);
      }
    });

    // 3. Apply snapshot's changes Map
    state.changes = new Map(snap.changes);
    state.changes.forEach((rec, sel) => {
      const el = findElementBySelector(sel);
      if (el) {
        applyRecordToLiveElement(el, rec);
      }
    });

    syncDynamicStylesheet();
    rebuildLayersTree();
    renderHistoryPanel();
    updateTopbarCounters();

    if (snap.selectedSelector) {
      const selEl = findElementBySelector(snap.selectedSelector);
      if (selEl && !isElementDeleted(selEl)) {
        selectElement(selEl);
      } else {
        deselectElement();
      }
    } else {
      deselectElement();
    }
  }

  function performUndo() {
    if (state.undoStack.length === 0) return;
    const currentSnap = createFullStateSnapshot();
    state.redoStack.push(currentSnap);
    const prevSnap = state.undoStack.pop();
    restoreFromSnapshot(prevSnap);
    showToast('Đã hoàn tác (Undo)', 'ph-arrow-u-up-left');
  }

  function performRedo() {
    if (state.redoStack.length === 0) return;
    const currentSnap = createFullStateSnapshot();
    state.undoStack.push(currentSnap);
    const nextSnap = state.redoStack.pop();
    restoreFromSnapshot(nextSnap);
    showToast('Đã làm lại (Redo)', 'ph-arrow-u-up-right');
  }

  // ==================== APPLY / RESTORE ELEMENT STATE ====================
  function restoreElementInlineToInitial(el, rec) {
    if (!el) return;
    const initStyle = el.getAttribute('data-ui-init-style');
    if (initStyle !== null) {
      if (initStyle === '') el.removeAttribute('style');
      else el.setAttribute('style', initStyle);
    }
    if (rec) {
      if (rec.textEdited && rec.initialInnerHTML !== undefined) {
        el.innerHTML = rec.initialInnerHTML;
      }
      if (rec.initialAttrs) {
        if (rec.initialAttrs.href) el.setAttribute('href', rec.initialAttrs.href);
        if (rec.initialAttrs.src) el.setAttribute('src', rec.initialAttrs.src);
      }
    }
  }

  function applyRecordToLiveElement(el, rec) {
    if (!el || !rec) return;
    restoreElementInlineToInitial(el, rec);

    if (rec.deleted) {
      el.style.setProperty('display', 'none', 'important');
      return;
    }

    if (rec.tx !== 0 || rec.ty !== 0) {
      const totalX = (rec.baseTx || 0) + rec.tx;
      const totalY = (rec.baseTy || 0) + rec.ty;
      el.style.setProperty('transform', `translate3d(${totalX}px, ${totalY}px, 0)`, 'important');
    }

    if (rec.width) {
      el.style.setProperty('width', rec.width, 'important');
      el.style.setProperty('box-sizing', 'border-box', 'important');
    }
    if (rec.height) {
      el.style.setProperty('height', rec.height, 'important');
      el.style.setProperty('box-sizing', 'border-box', 'important');
    }

    if (rec.textEdited) {
      setSmartElementText(el, rec.currentText);
    }

    if (rec.attrs.href !== undefined) el.setAttribute('href', rec.attrs.href);
    if (rec.attrs.src !== undefined) el.setAttribute('src', rec.attrs.src);
  }

  function syncDynamicStylesheet() {
    const idoc = getIframeDoc();
    if (!idoc) return;
    let dynStyle = idoc.getElementById('__visual_ui_studio_overrides');
    if (!dynStyle) {
      dynStyle = idoc.createElement('style');
      dynStyle.id = '__visual_ui_studio_overrides';
      idoc.head.appendChild(dynStyle);
    }
    dynStyle.textContent = generateCssRulesString();
  }

  function generateCssRulesString() {
    const desktopRules = [];
    const tabletRules = [];
    const mobileRules = [];

    state.changes.forEach((rec, sel) => {
      if (rec.deleted) {
        desktopRules.push(`${sel} {\n  display: none !important;\n}`);
        return;
      }

      // Desktop Base (Transforms + Size + desktop_normal styles)
      const dNormal = { ...(rec.styles.desktop_normal || {}) };
      if (rec.tx !== 0 || rec.ty !== 0) {
        const totalX = (rec.baseTx || 0) + rec.tx;
        const totalY = (rec.baseTy || 0) + rec.ty;
        dNormal['transform'] = `translate3d(${totalX}px, ${totalY}px, 0)`;
      }
      if (rec.width) {
        dNormal['width'] = rec.width;
        dNormal['box-sizing'] = 'border-box';
      }
      if (rec.height) {
        dNormal['height'] = rec.height;
        dNormal['box-sizing'] = 'border-box';
      }

      const dNormalBlock = formatCssRuleBlock(sel, dNormal);
      if (dNormalBlock) desktopRules.push(dNormalBlock);

      const dHoverBlock = formatCssRuleBlock(`${sel}:hover`, rec.styles.desktop_hover);
      if (dHoverBlock) desktopRules.push(dHoverBlock);

      // Tablet
      const tNormalBlock = formatCssRuleBlock(sel, rec.styles.tablet_normal);
      if (tNormalBlock) tabletRules.push(tNormalBlock);
      const tHoverBlock = formatCssRuleBlock(`${sel}:hover`, rec.styles.tablet_hover);
      if (tHoverBlock) tabletRules.push(tHoverBlock);

      // Mobile
      const mNormalBlock = formatCssRuleBlock(sel, rec.styles.mobile_normal);
      if (mNormalBlock) mobileRules.push(mNormalBlock);
      const mHoverBlock = formatCssRuleBlock(`${sel}:hover`, rec.styles.mobile_hover);
      if (mHoverBlock) mobileRules.push(mHoverBlock);
    });

    let out = desktopRules.join('\n\n');
    if (tabletRules.length > 0) {
      out += `\n\n@media (max-width: 768px) {\n${tabletRules.join('\n')}\n}`;
    }
    if (mobileRules.length > 0) {
      out += `\n\n@media (max-width: 480px) {\n${mobileRules.join('\n')}\n}`;
    }
    return out.trim();
  }

  function formatCssRuleBlock(selector, styleObj) {
    if (!styleObj) return '';
    const entries = Object.entries(styleObj).filter(
      ([, val]) => val !== undefined && val !== null && val !== ''
    );
    if (entries.length === 0) return '';
    const lines = entries.map(([prop, val]) => `  ${prop}: ${val} !important;`).join('\n');
    return `${selector} {\n${lines}\n}`;
  }

  function isRecordEmpty(rec) {
    if (!rec) return true;
    if (rec.deleted) return false;
    if (rec.tx !== 0 || rec.ty !== 0) return false;
    if (rec.width || rec.height) return false;
    if (rec.textEdited) return false;
    if (Object.keys(rec.attrs || {}).length > 0) return false;
    for (const bucket of Object.values(rec.styles || {})) {
      if (Object.keys(bucket).length > 0) return false;
    }
    return true;
  }

  function cleanupRecordIfEmpty(sel) {
    const rec = state.changes.get(sel);
    if (rec && isRecordEmpty(rec)) {
      state.changes.delete(sel);
    }
  }

  // ==================== SMART ICON-SAFE TEXT READER & WRITER ====================
  function getSmartElementText(el) {
    if (!el) return '';
    // Check if element has direct non-whitespace text nodes alongside icon children
    const textNodes = Array.from(el.childNodes).filter(
      (n) => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim().length > 0
    );
    if (textNodes.length > 0) {
      return textNodes.map((n) => n.nodeValue.trim()).join(' ');
    }
    return (el.innerText || el.textContent || '').trim();
  }

  function setSmartElementText(el, newText) {
    if (!el) return;
    const hasIconChildren = el.querySelector('i, svg, img, span.icon');
    if (!hasIconChildren && el.children.length === 0) {
      el.textContent = newText;
      return;
    }

    // Preserve icons! Find direct non-empty text node or create one
    const textNodes = Array.from(el.childNodes).filter(
      (n) => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim().length > 0
    );
    if (textNodes.length > 0) {
      textNodes[0].nodeValue = ' ' + newText + ' ';
      for (let i = 1; i < textNodes.length; i++) {
        textNodes[i].nodeValue = '';
      }
      return;
    }

    // Check if there's a child span that holds text
    const textSpan = Array.from(el.children).find(
      (ch) => !['I', 'SVG', 'IMG'].includes(ch.tagName) && ch.textContent.trim().length > 0
    );
    if (textSpan) {
      textSpan.textContent = newText;
      return;
    }

    // Fallback: append a text node without destroying icon children
    el.appendChild(el.ownerDocument.createTextNode(' ' + newText));
  }

  // ==================== IFRAME CANVAS INTERACTION (DRAG, RESIZE, SELECT) ====================
  function bindIframeCanvasEvents(idoc) {
    const win = idoc.defaultView;
    let interaction = null; // { type: 'drag' | 'resize', ... }

    // Keep overlay boxes synced on scroll or resize
    win.addEventListener('scroll', updateOverlayBoxes, { passive: true });
    win.addEventListener('resize', updateOverlayBoxes, { passive: true });

    // Hover feedback
    idoc.addEventListener('mousemove', (e) => {
      if (state.mode !== 'edit') return;

      if (interaction) {
        handleActivePointerMove(e, interaction, idoc);
        return;
      }

      const target = e.target;
      if (isStudioInternalNode(target)) {
        hideHoverBox();
        return;
      }
      state.hoveredEl = target;
      updateHoverBox(target);
    });

    // Mouse down -> Select & Start Drag or Resize
    idoc.addEventListener(
      'mousedown',
      (e) => {
        if (state.mode !== 'edit') return;
        if (e.button !== 0) return;

        // Check if clicking a resize handle
        const handleEl = e.target.closest('.__ui_handle');
        if (handleEl && state.selectedEl) {
          e.preventDefault();
          e.stopPropagation();
          const dir = handleEl.getAttribute('data-handle');
          const rect = state.selectedEl.getBoundingClientRect();
          const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
          interaction = {
            type: 'resize',
            dir,
            el: state.selectedEl,
            rec,
            preSnap: createFullStateSnapshot(),
            startX: e.clientX,
            startY: e.clientY,
            startW: rect.width,
            startH: rect.height,
            startTx: rec.tx,
            startTy: rec.ty,
            moved: false
          };
          return;
        }

        // Ignore clicks on HUD buttons
        if (e.target.closest('#__ui_select_hud')) return;

        const target = e.target;
        if (isStudioInternalNode(target)) return;

        // If user is currently editing inline text on this element, let them place caret
        if (target.isContentEditable && target.classList.contains('__ui_editing_text')) {
          return;
        }

        e.preventDefault();
        selectElement(target);

        if (target.tagName.toLowerCase() === 'body') return;

        const rec = getOrCreateRecord(target, state.selectedSelector);
        interaction = {
          type: 'drag',
          el: target,
          rec,
          preSnap: createFullStateSnapshot(),
          startX: e.clientX,
          startY: e.clientY,
          startTx: rec.tx,
          startTy: rec.ty,
          moved: false
        };
      },
      true
    );

    // Mouse up -> Commit Drag or Resize to Undo Stack
    idoc.addEventListener(
      'mouseup',
      () => {
        if (!interaction) return;
        const { moved, preSnap, el, rec } = interaction;
        hideSmartGuides();
        interaction = null;

        if (moved) {
          pushUndoSnapshot(preSnap);
          syncDynamicStylesheet();
          populateInspectorFromElement(el);
          renderHistoryPanel();
          updateTopbarCounters();
          updateOverlayBoxes();
        } else {
          cleanupRecordIfEmpty(rec.selector);
        }
      },
      true
    );

    // Prevent default link navigation in Edit Mode
    idoc.addEventListener(
      'click',
      (e) => {
        if (state.mode === 'edit') {
          if (e.target.closest('#__ui_select_hud')) return;
          e.preventDefault();
        }
      },
      true
    );

    // Double-Click -> Inline Text Editing
    idoc.addEventListener('dblclick', (e) => {
      if (state.mode !== 'edit') return;
      const target = e.target;
      if (isStudioInternalNode(target) || target.tagName.toLowerCase() === 'body') return;
      e.preventDefault();
      e.stopPropagation();
      selectElement(target);
      enableInlineTextEditing(target);
    });

    // Keyboard shortcuts when focus is inside iframe
    idoc.addEventListener('keydown', handleGlobalKeyDown);
  }

  function handleActivePointerMove(e, interaction, idoc) {
    const dx = e.clientX - interaction.startX;
    const dy = e.clientY - interaction.startY;

    if (!interaction.moved && Math.abs(dx) < 3 && Math.abs(dy) < 3) {
      return;
    }
    interaction.moved = true;

    const { el, rec } = interaction;

    if (interaction.type === 'drag') {
      let nextTx = Math.round(interaction.startTx + dx);
      let nextTy = Math.round(interaction.startTy + dy);

      // Shift key axis lock
      if (e.shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) nextTy = interaction.startTy;
        else nextTx = interaction.startTx;
      }

      rec.tx = nextTx;
      rec.ty = nextTy;
      applyRecordToLiveElement(el, rec);

      // Smart center guides
      if (state.showGuides) {
        checkAndShowSmartGuides(el, rec, idoc);
      }

      dom.inpTx.value = rec.tx;
      dom.inpTy.value = rec.ty;
      updateOverlayBoxes();
    } else if (interaction.type === 'resize') {
      const dir = interaction.dir;
      let newW = interaction.startW;
      let newH = interaction.startH;
      let newTx = interaction.startTx;
      let newTy = interaction.startTy;

      const win = idoc.defaultView;
      if (win.getComputedStyle(el).display === 'inline') {
        rec.styles.desktop_normal['display'] = 'inline-block';
      }

      if (dir.includes('e')) newW = Math.max(16, Math.round(interaction.startW + dx));
      if (dir.includes('s')) newH = Math.max(16, Math.round(interaction.startH + dy));
      if (dir.includes('w')) {
        const clampedDx = Math.min(dx, interaction.startW - 16);
        newW = Math.round(interaction.startW - clampedDx);
        newTx = Math.round(interaction.startTx + clampedDx);
      }
      if (dir.includes('n')) {
        const clampedDy = Math.min(dy, interaction.startH - 16);
        newH = Math.round(interaction.startH - clampedDy);
        newTy = Math.round(interaction.startTy + clampedDy);
      }

      rec.width = `${newW}px`;
      rec.height = `${newH}px`;
      rec.tx = newTx;
      rec.ty = newTy;

      applyRecordToLiveElement(el, rec);
      dom.inpWidth.value = newW;
      dom.inpHeight.value = newH;
      dom.inpTx.value = rec.tx;
      dom.inpTy.value = rec.ty;
      updateOverlayBoxes();
    }
  }

  function checkAndShowSmartGuides(el, rec, idoc) {
    const guideV = idoc.getElementById('__ui_guide_v');
    const guideH = idoc.getElementById('__ui_guide_h');
    if (!guideV || !guideH) return;

    const rect = el.getBoundingClientRect();
    const vw = idoc.documentElement.clientWidth;
    const vh = idoc.documentElement.clientHeight;

    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;

    if (Math.abs(elCenterX - vw / 2) < 6) {
      guideV.style.left = `${vw / 2}px`;
      guideV.style.display = 'block';
    } else {
      guideV.style.display = 'none';
    }

    if (Math.abs(elCenterY - vh / 2) < 6) {
      guideH.style.top = `${vh / 2}px`;
      guideH.style.display = 'block';
    } else {
      guideH.style.display = 'none';
    }
  }

  function hideSmartGuides() {
    const idoc = getIframeDoc();
    if (!idoc) return;
    const gv = idoc.getElementById('__ui_guide_v');
    const gh = idoc.getElementById('__ui_guide_h');
    if (gv) gv.style.display = 'none';
    if (gh) gh.style.display = 'none';
  }

  // ==================== INLINE TEXT EDITING ====================
  function enableInlineTextEditing(el) {
    if (!el || ['IMG', 'INPUT', 'HR', 'BR'].includes(el.tagName)) return;
    const preSnap = createFullStateSnapshot();
    const rec = getOrCreateRecord(el, state.selectedSelector);

    el.setAttribute('contenteditable', 'true');
    el.classList.add('__ui_editing_text');
    el.focus();

    const finishEdit = () => {
      el.removeAttribute('contenteditable');
      el.classList.remove('__ui_editing_text');
      const newText = getSmartElementText(el);
      if (newText !== rec.initialText) {
        rec.textEdited = true;
        rec.currentText = newText;
        dom.inpText.value = newText;
        pushUndoSnapshot(preSnap);
        renderHistoryPanel();
        updateTopbarCounters();
      } else {
        cleanupRecordIfEmpty(rec.selector);
      }
      el.removeEventListener('blur', finishEdit);
    };

    el.addEventListener('blur', finishEdit);
  }

  // ==================== OVERLAY HUD & SMART VIEWPORT COLLISION ====================
  function updateHoverBox(el) {
    const idoc = getIframeDoc();
    if (!idoc) return;
    const box = idoc.getElementById('__ui_hover_box');
    const tagLbl = idoc.getElementById('__ui_hover_tag');
    if (!box || !tagLbl) return;

    if (!el || el === state.selectedEl || state.mode !== 'edit') {
      box.style.display = 'none';
      return;
    }

    const rect = el.getBoundingClientRect();
    box.style.display = 'block';
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    tagLbl.textContent = el.tagName.toLowerCase();
  }

  function hideHoverBox() {
    const idoc = getIframeDoc();
    if (!idoc) return;
    const box = idoc.getElementById('__ui_hover_box');
    if (box) box.style.display = 'none';
  }

  function updateOverlayBoxes() {
    const idoc = getIframeDoc();
    if (!idoc) return;
    const selectBox = idoc.getElementById('__ui_select_box');
    const selectHud = idoc.getElementById('__ui_select_hud');
    if (!selectBox || !selectHud) return;

    if (!state.selectedEl || state.mode !== 'edit' || isElementDeleted(state.selectedEl)) {
      selectBox.style.display = 'none';
      selectHud.style.display = 'none';
      return;
    }

    const rect = state.selectedEl.getBoundingClientRect();
    selectBox.style.display = 'block';
    selectBox.style.left = `${rect.left}px`;
    selectBox.style.top = `${rect.top}px`;
    selectBox.style.width = `${rect.width}px`;
    selectBox.style.height = `${rect.height}px`;

    // Update HUD label & coordinates
    const hudLabel = idoc.getElementById('__ui_hud_label');
    const hudCoords = idoc.getElementById('__ui_hud_coords');
    const rec = state.changes.get(state.selectedSelector);
    const tx = rec ? rec.tx : 0;
    const ty = rec ? rec.ty : 0;

    if (hudLabel) hudLabel.textContent = state.selectedEl.tagName.toUpperCase();
    if (hudCoords) {
      hudCoords.textContent = `X:${tx >= 0 ? '+' + tx : tx} Y:${ty >= 0 ? '+' + ty : ty} (${Math.round(rect.width)}×${Math.round(rect.height)})`;
    }

    // Smart 4-Edge Viewport Collision Positioning for HUD
    selectHud.style.display = 'inline-flex';
    const vw = idoc.documentElement.clientWidth;
    const vh = idoc.documentElement.clientHeight;
    const hudW = selectHud.offsetWidth || 360;
    const hudH = selectHud.offsetHeight || 28;

    let hudTop = rect.top - hudH - 8;
    if (hudTop < 6) {
      // Flip below element if near top edge
      hudTop = rect.bottom + 8;
      if (hudTop + hudH > vh - 6) {
        // Pin inside top of element if element fills screen
        hudTop = Math.max(8, rect.top + 8);
      }
    }

    let hudLeft = rect.left;
    if (hudLeft + hudW > vw - 8) {
      hudLeft = Math.max(8, vw - hudW - 8);
    }
    if (hudLeft < 8) hudLeft = 8;

    selectHud.style.top = `${hudTop}px`;
    selectHud.style.left = `${hudLeft}px`;
  }

  function isElementDeleted(el) {
    if (!el || !el.isConnected) return true;
    const sel = getUniqueSelector(el);
    const rec = state.changes.get(sel);
    return !!(rec && rec.deleted);
  }

  // ==================== ELEMENT SELECTION & INSPECTOR POPULATION ====================
  function selectElement(el) {
    if (!el || isStudioInternalNode(el)) return;
    state.selectedEl = el;
    state.selectedSelector = getUniqueSelector(el);

    hideHoverBox();
    showInspectorEmpty(false);
    populateInspectorFromElement(el);
    updateBreadcrumbTrail(el);
    highlightActiveLayerInTree();
    updateOverlayBoxes();
  }

  function deselectElement() {
    state.selectedEl = null;
    state.selectedSelector = null;
    showInspectorEmpty(true);
    updateOverlayBoxes();
    dom.breadcrumbTrail.innerHTML = `<span class="crumb-empty">👆 Hãy bấm vào bất kỳ chữ, nút hoặc khung nào trên Web để sửa</span>`;
    highlightActiveLayerInTree();
  }

  function showInspectorEmpty(isEmpty) {
    dom.inspectorEmpty.style.display = isEmpty ? 'flex' : 'none';
    dom.inspectorContent.style.display = isEmpty ? 'none' : 'flex';
  }

  function updateBreadcrumbTrail(el) {
    dom.breadcrumbTrail.innerHTML = '';
    const chain = [];
    let cur = el;
    const idoc = getIframeDoc();
    while (cur && cur.nodeType === 1 && cur !== idoc.documentElement) {
      chain.unshift(cur);
      if (cur === idoc.body) break;
      cur = cur.parentElement;
    }

    chain.slice(-5).forEach((node, idx, arr) => {
      const btn = document.createElement('button');
      btn.className = 'crumb-item' + (idx === arr.length - 1 ? ' active' : '');
      let label = node.tagName.toLowerCase();
      if (node.id) label += `#${node.id}`;
      else if (node.classList.length > 0) {
        const cls = Array.from(node.classList).find((c) => !c.startsWith('__ui_'));
        if (cls) label += `.${cls}`;
      }
      btn.textContent = label;
      btn.addEventListener('click', () => selectElement(node));
      dom.breadcrumbTrail.appendChild(btn);
    });
  }

  function populateInspectorFromElement(el) {
    if (!el) return;
    const idoc = getIframeDoc();
    const win = idoc.defaultView;
    const comp = win.getComputedStyle(el);
    const rec = state.changes.get(state.selectedSelector);
    const bucket = getActiveStyleBucket();
    const activeStyles = (rec && rec.styles[bucket]) || {};

    // Header
    dom.inspTag.textContent = el.tagName.toUpperCase();
    dom.inspSelector.textContent = state.selectedSelector;

    // Coordinates & Size
    dom.inpTx.value = rec ? rec.tx : 0;
    dom.inpTy.value = rec ? rec.ty : 0;
    dom.inpWidth.value = rec && rec.width ? parseInt(rec.width, 10) : Math.round(el.getBoundingClientRect().width);
    dom.inpHeight.value = rec && rec.height ? parseInt(rec.height, 10) : Math.round(el.getBoundingClientRect().height);

    // Content & Media
    const tag = el.tagName.toUpperCase();
    dom.inpText.value = getSmartElementText(el);

    if (tag === 'A') {
      dom.rowHref.style.display = 'flex';
      dom.inpHref.value = el.getAttribute('href') || '';
    } else {
      dom.rowHref.style.display = 'none';
    }

    if (tag === 'IMG') {
      dom.rowImgSrc.style.display = 'flex';
      dom.inpImgSrc.value = el.getAttribute('src') || '';
      dom.selObjectFit.value = activeStyles['object-fit'] || comp.objectFit || '';
    } else {
      dom.rowImgSrc.style.display = 'none';
    }

    // Colors
    const hexColor = rgbToHex(activeStyles['color'] || comp.color);
    dom.inpColorPicker.value = hexColor;
    dom.inpColorHex.value = activeStyles['color'] || hexColor;

    const hexBg = rgbToHex(activeStyles['background-color'] || comp.backgroundColor);
    dom.inpBgPicker.value = hexBg;
    dom.inpBgHex.value = activeStyles['background-color'] || (comp.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'transparent' : hexBg);

    updateActiveColorSwatches(activeStyles);

    // Typography
    const fSize = parseInt(activeStyles['font-size'] || comp.fontSize, 10) || 16;
    dom.rngFontSize.value = Math.min(96, Math.max(10, fSize));
    dom.inpFontSize.value = fSize;
    dom.lblFontSize.textContent = `${fSize}px`;
    dom.selFontWeight.value = String(activeStyles['font-weight'] || comp.fontWeight || '400');

    // Border & Radius & Opacity
    const rad = parseInt(activeStyles['border-radius'] || comp.borderRadius, 10) || 0;
    dom.rngRadius.value = Math.min(60, Math.max(0, rad));
    dom.inpRadius.value = rad;
    dom.lblRadius.textContent = `${rad}px`;

    const op = Math.round(parseFloat(activeStyles['opacity'] !== undefined ? activeStyles['opacity'] : comp.opacity) * 100);
    dom.rngOpacity.value = isNaN(op) ? 100 : op;
    dom.lblOpacity.textContent = `${isNaN(op) ? 100 : op}%`;

    const bw = parseInt(activeStyles['border-width'] || comp.borderWidth, 10) || 0;
    dom.inpBorderWidth.value = bw;
    dom.inpBorderColor.value = rgbToHex(activeStyles['border-color'] || comp.borderColor);

    // Spacing
    dom.inpPadding.value = activeStyles['padding'] || comp.padding || '';
    dom.inpMargin.value = activeStyles['margin'] || comp.margin || '';
    dom.inpGap.value = parseInt(activeStyles['gap'] || comp.gap, 10) || '';
  }

  function updateActiveColorSwatches(activeStyles) {
    const curColor = (activeStyles['color'] || '').toLowerCase();
    const curBg = (activeStyles['background-color'] || '').toLowerCase();
    const curGrad = activeStyles['background'] || '';

    document.querySelectorAll('.swatch-row[data-target="color"] .swatch').forEach((sw) => {
      sw.classList.toggle('active', sw.dataset.color.toLowerCase() === curColor);
    });
    document.querySelectorAll('.swatch-row[data-target="background-color"] .swatch').forEach((sw) => {
      sw.classList.toggle('active', sw.dataset.color.toLowerCase() === curBg);
    });
    document.querySelectorAll('#gradient-swatches .grad-swatch').forEach((gsw) => {
      gsw.classList.toggle('active', gsw.dataset.grad === curGrad);
    });
  }

  function rgbToHex(rgbStr) {
    if (!rgbStr) return '#ffffff';
    if (rgbStr.startsWith('#')) return rgbStr.length === 7 ? rgbStr : '#ffffff';
    const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return '#6366f1';
    const r = parseInt(m[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(m[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(m[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  // ==================== ADD / DUPLICATE / DELETE / RESET ELEMENTS ====================
  function insertNewElement(blockDef) {
    const idoc = getIframeDoc();
    if (!idoc || !idoc.body) return;

    const preSnap = createFullStateSnapshot();
    const customId = `ui-el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    const temp = idoc.createElement('div');
    temp.innerHTML = blockDef.html.trim();
    const newEl = temp.firstElementChild;
    if (!newEl) return;

    newEl.setAttribute('data-ui-custom-id', customId);
    newEl.setAttribute('data-ui-init-style', newEl.getAttribute('style') || '');

    const posMode = dom.insertPositionMode ? dom.insertPositionMode.value : 'after';
    let anchor = state.selectedEl && state.selectedEl !== idoc.body ? state.selectedEl : idoc.body;

    // Never insert inside void elements
    if (['IMG', 'INPUT', 'BR', 'HR'].includes(anchor.tagName) && posMode === 'inside') {
      anchor = anchor.parentElement || idoc.body;
    }

    const anchorSelector = getUniqueSelector(anchor);

    if (anchor === idoc.body || posMode === 'inside') {
      anchor.appendChild(newEl);
    } else if (posMode === 'before' && anchor.parentElement) {
      anchor.parentElement.insertBefore(newEl, anchor);
    } else if (anchor.parentElement) {
      anchor.parentElement.insertBefore(newEl, anchor.nextSibling);
    } else {
      idoc.body.appendChild(newEl);
    }

    state.addedNodes.set(customId, {
      customId,
      name: blockDef.name,
      anchorSelector,
      position: anchor === idoc.body ? 'inside' : posMode,
      outerHTML: newEl.outerHTML
    });

    pushUndoSnapshot(preSnap);
    rebuildLayersTree();
    renderHistoryPanel();
    updateTopbarCounters();
    selectElement(newEl);
    showToast(`Đã thêm "${blockDef.name}"! (Muốn xóa: bấm 🗑️ Xóa hoặc phím Delete)`);
  }

  function duplicateSelectedElement() {
    if (!state.selectedEl) return;
    const idoc = getIframeDoc();
    if (!idoc || state.selectedEl === idoc.body) return;

    const preSnap = createFullStateSnapshot();
    const clone = state.selectedEl.cloneNode(true);
    const customId = `ui-el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // Strip duplicate IDs and assign fresh custom IDs on clone & descendants
    clone.removeAttribute('id');
    clone.setAttribute('data-ui-custom-id', customId);
    clone.setAttribute('data-ui-init-style', clone.getAttribute('style') || '');
    clone.querySelectorAll('[id], [data-ui-custom-id]').forEach((desc) => {
      desc.removeAttribute('id');
      if (desc.hasAttribute('data-ui-custom-id')) {
        desc.setAttribute(
          'data-ui-custom-id',
          `ui-el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
        );
      }
    });

    const anchorSelector = getUniqueSelector(state.selectedEl);
    state.selectedEl.parentElement.insertBefore(clone, state.selectedEl.nextSibling);

    state.addedNodes.set(customId, {
      customId,
      name: `Nhân bản ${clone.tagName.toLowerCase()}`,
      anchorSelector,
      position: 'after',
      outerHTML: clone.outerHTML
    });

    pushUndoSnapshot(preSnap);
    rebuildLayersTree();
    renderHistoryPanel();
    updateTopbarCounters();
    selectElement(clone);
    showToast('Đã nhân bản phần tử! (Bấm 🗑️ Xóa hoặc Ctrl+Z nếu muốn hủy)');
  }

  /**
   * Answers User's Core Question #1:
   * "vd thêm button rồi muốn xóa thì sao?"
   * -> Works from:
   *    1) Floating HUD "🗑️ Xóa" button right on the canvas
   *    2) Right Inspector "🗑️ Xóa" button
   *    3) Keyboard Delete / Backspace key
   *    4) Left Sidebar DOM Layers Tree "🗑️" icon
   *    5) History list "✕" button
   *    6) Ctrl+Z (Undo)
   */
  function deleteSelectedElement() {
    if (!state.selectedEl) return;
    deleteSpecificElement(state.selectedEl);
  }

  function deleteSpecificElement(el) {
    const idoc = getIframeDoc();
    if (!el || !idoc || el === idoc.body || el === idoc.documentElement) {
      showToast('Không thể xóa thẻ gốc <body> của trang!', 'ph-warning');
      return;
    }

    const preSnap = createFullStateSnapshot();
    const customId = el.getAttribute('data-ui-custom-id');
    const sel = getUniqueSelector(el);

    if (customId && state.addedNodes.has(customId)) {
      // Newly added element: cleanly remove from DOM, state.addedNodes, and any nested custom children
      el.querySelectorAll('[data-ui-custom-id]').forEach((child) => {
        const cid = child.getAttribute('data-ui-custom-id');
        state.addedNodes.delete(cid);
        state.changes.delete(`[data-ui-custom-id="${cid}"]`);
      });
      state.addedNodes.delete(customId);
      state.changes.delete(sel);
      el.remove();
    } else {
      // Existing page element: mark deleted & hide with display: none !important (restorable at any time)
      const rec = getOrCreateRecord(el, sel);
      rec.deleted = true;
      applyRecordToLiveElement(el, rec);
      syncDynamicStylesheet();
    }

    pushUndoSnapshot(preSnap);
    if (state.selectedEl === el) {
      deselectElement();
    }
    rebuildLayersTree();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã xóa phần tử! (Bấm Ctrl+Z nếu muốn lấy lại)', 'ph-trash');
  }

  function selectParentElement() {
    if (!state.selectedEl) return;
    const idoc = getIframeDoc();
    const parent = state.selectedEl.parentElement;
    if (parent && parent !== idoc.documentElement) {
      selectElement(parent);
    }
  }

  function moveSelectedInDom(direction) {
    if (!state.selectedEl) return;
    const el = state.selectedEl;
    const parent = el.parentElement;
    if (!parent) return;

    if (direction === 'prev' && el.previousElementSibling) {
      parent.insertBefore(el, el.previousElementSibling);
      updateOverlayBoxes();
      rebuildLayersTree();
      showToast('Đã đẩy phần tử lên trước');
    } else if (direction === 'next' && el.nextElementSibling) {
      parent.insertBefore(el.nextElementSibling, el);
      updateOverlayBoxes();
      rebuildLayersTree();
      showToast('Đã đẩy phần tử ra sau');
    }
  }

  // ==================== COLOR, GRADIENT & PROPERTY RESET ENGINE ====================
  /**
   * Answers User's Core Question #2:
   * "chọn màu khác muốn quay lại màu gốc thì sao?"
   * -> Explicit 1-click reset functions for:
   *    - Text Color ("↺ Màu gốc")
   *    - Background Color & Gradient ("↺ Màu gốc" / "↺ Bỏ Gradient / Về gốc")
   *    - Position & Size ("↺ Vị trí gốc")
   *    - Text Content ("↺ Chữ gốc")
   *    - Image Source ("↺ Ảnh gốc")
   *    - Any Inspector Section ("↺ Gốc")
   *    - Entire Selected Element ("↺ Gốc")
   */
  function applyStyleProperty(prop, value, isContinuous = false) {
    if (!state.selectedEl) return;
    if (isContinuous) beginContinuousInputTransaction();
    else pushUndoSnapshot(createFullStateSnapshot());

    const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
    const bucket = getActiveStyleBucket();

    if (value === null || value === undefined || value === '') {
      delete rec.styles[bucket][prop];
    } else {
      rec.styles[bucket][prop] = value;
    }

    cleanupRecordIfEmpty(rec.selector);
    syncDynamicStylesheet();
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
  }

  function applySolidBackgroundColor(colorVal, isContinuous = false) {
    if (!state.selectedEl) return;
    if (isContinuous) beginContinuousInputTransaction();
    else pushUndoSnapshot(createFullStateSnapshot());

    const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
    const bucket = getActiveStyleBucket();

    // Critical CSS rule: clear shorthand `background` and disable any CSS gradient (`background-image: none`)
    // so solid color ALWAYS shows up even on buttons that originally had `background: linear-gradient(...)`!
    delete rec.styles[bucket]['background'];
    rec.styles[bucket]['background-color'] = colorVal;
    rec.styles[bucket]['background-image'] = 'none';

    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    renderHistoryPanel();
    updateTopbarCounters();
  }

  function applyGradientBackground(gradVal) {
    if (!state.selectedEl) return;
    pushUndoSnapshot(createFullStateSnapshot());

    const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
    const bucket = getActiveStyleBucket();

    delete rec.styles[bucket]['background-color'];
    delete rec.styles[bucket]['background-image'];
    rec.styles[bucket]['background'] = gradVal;

    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã áp dụng màu Gradient! (Bấm "↺ Màu gốc" để quay lại màu ban đầu)');
  }

  function resetOriginalTextColor() {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec) {
      showToast('Màu chữ đang ở trạng thái gốc!');
      return;
    }
    pushUndoSnapshot(createFullStateSnapshot());
    const bucket = getActiveStyleBucket();
    delete rec.styles[bucket]['color'];
    delete rec.styles[bucket]['-webkit-text-fill-color'];

    cleanupRecordIfEmpty(rec.selector);
    restoreElementInlineToInitial(state.selectedEl, rec);
    applyRecordToLiveElement(state.selectedEl, rec);
    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã quay lại màu chữ gốc ban đầu!', 'ph-arrow-counter-clockwise');
  }

  function resetOriginalBackgroundColor() {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec) {
      showToast('Màu nền đang ở trạng thái gốc!');
      return;
    }
    pushUndoSnapshot(createFullStateSnapshot());
    const bucket = getActiveStyleBucket();
    delete rec.styles[bucket]['background'];
    delete rec.styles[bucket]['background-color'];
    delete rec.styles[bucket]['background-image'];

    cleanupRecordIfEmpty(rec.selector);
    restoreElementInlineToInitial(state.selectedEl, rec);
    applyRecordToLiveElement(state.selectedEl, rec);
    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã khôi phục màu nền / Gradient gốc ban đầu!', 'ph-arrow-counter-clockwise');
  }

  function resetOriginalPositionAndSize() {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec) return;
    pushUndoSnapshot(createFullStateSnapshot());

    rec.tx = 0;
    rec.ty = 0;
    rec.width = '';
    rec.height = '';

    restoreElementInlineToInitial(state.selectedEl, rec);
    applyRecordToLiveElement(state.selectedEl, rec);
    cleanupRecordIfEmpty(rec.selector);
    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã đưa vị trí & kích thước về gốc!', 'ph-arrow-counter-clockwise');
  }

  function resetOriginalTextContent() {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec || !rec.textEdited) {
      showToast('Nội dung chữ đang ở trạng thái gốc!');
      return;
    }
    pushUndoSnapshot(createFullStateSnapshot());
    rec.textEdited = false;
    rec.currentText = '';
    if (rec.initialInnerHTML !== undefined) {
      state.selectedEl.innerHTML = rec.initialInnerHTML;
    }
    cleanupRecordIfEmpty(rec.selector);
    populateInspectorFromElement(state.selectedEl);
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã khôi phục nội dung chữ gốc!', 'ph-arrow-counter-clockwise');
  }

  function resetOriginalImageSrc() {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec || rec.attrs.src === undefined) return;
    pushUndoSnapshot(createFullStateSnapshot());
    delete rec.attrs.src;
    if (rec.initialAttrs && rec.initialAttrs.src !== undefined) {
      state.selectedEl.setAttribute('src', rec.initialAttrs.src);
    }
    cleanupRecordIfEmpty(rec.selector);
    populateInspectorFromElement(state.selectedEl);
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã khôi phục hình ảnh gốc!', 'ph-arrow-counter-clockwise');
  }

  function resetInspectorSection(sectionName) {
    if (!state.selectedEl) return;
    const rec = state.changes.get(state.selectedSelector);
    if (!rec) return;
    pushUndoSnapshot(createFullStateSnapshot());
    const bucket = getActiveStyleBucket();
    const s = rec.styles[bucket];

    if (sectionName === 'colors') {
      ['color', '-webkit-text-fill-color', 'background', 'background-color', 'background-image'].forEach(
        (k) => delete s[k]
      );
    } else if (sectionName === 'typography') {
      ['font-family', 'font-size', 'font-weight', 'text-align', 'line-height', 'letter-spacing'].forEach(
        (k) => delete s[k]
      );
    } else if (sectionName === 'border') {
      ['border-radius', 'opacity', 'border-width', 'border-style', 'border-color', 'border', 'box-shadow', 'backdrop-filter'].forEach(
        (k) => delete s[k]
      );
    } else if (sectionName === 'spacing') {
      ['padding', 'margin', 'display', 'flex-direction', 'align-items', 'justify-content', 'gap'].forEach(
        (k) => delete s[k]
      );
    }

    cleanupRecordIfEmpty(rec.selector);
    restoreElementInlineToInitial(state.selectedEl, rec);
    applyRecordToLiveElement(state.selectedEl, rec);
    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã khôi phục mục này về mặc định gốc!', 'ph-arrow-counter-clockwise');
  }

  function resetSelectedElement() {
    if (!state.selectedEl) return;
    const sel = state.selectedSelector;
    const rec = state.changes.get(sel);
    if (!rec) {
      showToast('Phần tử này chưa có chỉnh sửa nào.');
      return;
    }
    pushUndoSnapshot(createFullStateSnapshot());
    restoreElementInlineToInitial(state.selectedEl, rec);
    state.changes.delete(sel);
    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast('Đã khôi phục phần tử về nguyên trạng ban đầu!', 'ph-arrow-counter-clockwise');
  }

  function applyMagicPreset(preset) {
    if (!state.selectedEl) {
      showToast('Hãy bấm chọn 1 phần tử trên trang trước khi áp dụng Phép thuật!', 'ph-warning');
      return;
    }
    pushUndoSnapshot(createFullStateSnapshot());
    const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
    const bucket = getActiveStyleBucket();

    Object.entries(preset.styles || {}).forEach(([k, v]) => {
      if (k === 'background') {
        delete rec.styles[bucket]['background-color'];
        delete rec.styles[bucket]['background-image'];
      }
      rec.styles[bucket][k] = v;
    });

    syncDynamicStylesheet();
    populateInspectorFromElement(state.selectedEl);
    updateOverlayBoxes();
    renderHistoryPanel();
    updateTopbarCounters();
    showToast(`Đã áp dụng phong cách "${preset.name}"! (Bấm ↺ Gốc nếu muốn hủy)`);
  }

  // ==================== LEFT SIDEBAR: DOM LAYERS TREE & HISTORY ====================
  function rebuildLayersTree() {
    const idoc = getIframeDoc();
    if (!idoc || !idoc.body) return;
    const query = (dom.layerSearch.value || '').trim().toLowerCase();
    dom.layersTree.innerHTML = '';

    const walk = (node, depth) => {
      if (isStudioInternalNode(node)) return;
      if (isElementDeleted(node)) return;

      const tag = node.tagName.toLowerCase();
      const customId = node.getAttribute('data-ui-custom-id');
      const labelText = getSmartElementText(node).slice(0, 26);
      const idStr = node.id ? `#${node.id}` : '';
      const searchTarget = `${tag} ${idStr} ${labelText}`.toLowerCase();

      if (!query || searchTarget.includes(query)) {
        const row = document.createElement('div');
        const sel = getUniqueSelector(node);
        row.className = 'layer-item' + (sel === state.selectedSelector ? ' active' : '');
        row.style.paddingLeft = `${Math.min(depth * 12 + 8, 68)}px`;
        row.dataset.selector = sel;

        const left = document.createElement('div');
        left.className = 'layer-item-left';
        left.innerHTML = `
          <span class="layer-tag">${tag}</span>
          ${customId ? '<span class="layer-custom-badge">MỚI</span>' : ''}
          <span>${idStr || labelText || ''}</span>
        `;
        row.appendChild(left);

        if (tag !== 'body') {
          const delBtn = document.createElement('button');
          delBtn.className = 'tree-del-btn';
          delBtn.title = 'Xóa phần tử này';
          delBtn.innerHTML = '<i class="ph ph-trash"></i>';
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSpecificElement(node);
          });
          row.appendChild(delBtn);
        }

        row.addEventListener('click', () => {
          selectElement(node);
          node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        dom.layersTree.appendChild(row);
      }

      Array.from(node.children).forEach((ch) => walk(ch, depth + 1));
    };

    walk(idoc.body, 0);
  }

  function highlightActiveLayerInTree() {
    dom.layersTree.querySelectorAll('.layer-item').forEach((row) => {
      row.classList.toggle('active', row.dataset.selector === state.selectedSelector);
    });
  }

  function getTotalChangeCount() {
    let count = 0;
    state.changes.forEach((rec) => {
      if (!isRecordEmpty(rec)) count++;
    });
    count += state.addedNodes.size;
    return count;
  }

  function updateTopbarCounters() {
    const total = getTotalChangeCount();
    dom.changeBadge.textContent = total;
    dom.btnUndo.disabled = state.undoStack.length === 0;
    dom.btnRedo.disabled = state.redoStack.length === 0;
  }

  function renderHistoryPanel() {
    dom.historyList.innerHTML = '';
    const total = getTotalChangeCount();
    if (total === 0) {
      dom.historyList.innerHTML = `<div class="empty-msg">Chưa có thay đổi nào. Hãy bấm vào trang web và kéo thả thử!</div>`;
      return;
    }

    // 1. Newly added elements
    state.addedNodes.forEach((info, cid) => {
      const card = document.createElement('div');
      card.className = 'history-card';
      card.innerHTML = `
        <div class="history-card-top">
          <span class="history-sel">➕ Đã thêm: ${info.name}</span>
          <button class="history-revert-btn" title="Xóa phần tử mới thêm này">
            <i class="ph ph-trash"></i> Xóa
          </button>
        </div>
        <div class="history-summary">ID: ${cid}</div>
      `;
      card.addEventListener('click', () => {
        const el = findElementBySelector(`[data-ui-custom-id="${cid}"]`);
        if (el) selectElement(el);
      });
      card.querySelector('.history-revert-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const el = findElementBySelector(`[data-ui-custom-id="${cid}"]`);
        if (el) deleteSpecificElement(el);
      });
      dom.historyList.appendChild(card);
    });

    // 2. Modified or deleted elements
    state.changes.forEach((rec, sel) => {
      if (isRecordEmpty(rec)) return;
      const summaryParts = [];
      if (rec.deleted) summaryParts.push('🗑️ Đã xóa ẩn khỏi trang');
      if (rec.tx !== 0 || rec.ty !== 0) summaryParts.push(`Dịch chuyển (${rec.tx}px, ${rec.ty}px)`);
      if (rec.width || rec.height) summaryParts.push(`Kích thước (${rec.width || 'auto'} × ${rec.height || 'auto'})`);
      if (rec.textEdited) summaryParts.push(`Đổi chữ: "${rec.currentText.slice(0, 24)}"`);

      const propCount = Object.values(rec.styles).reduce((acc, b) => acc + Object.keys(b).length, 0);
      if (propCount > 0) summaryParts.push(`Đổi ${propCount} thuộc tính màu/kiểu`);

      const card = document.createElement('div');
      card.className = 'history-card';
      card.innerHTML = `
        <div class="history-card-top">
          <span class="history-sel">${sel}</span>
          <button class="history-revert-btn" title="Khôi phục phần tử này về nguyên bản">
            <i class="ph ph-arrow-counter-clockwise"></i> Khôi phục
          </button>
        </div>
        <div class="history-summary">${summaryParts.join(' • ')}</div>
      `;
      card.addEventListener('click', () => {
        const el = findElementBySelector(sel);
        if (el && !rec.deleted) selectElement(el);
      });
      card.querySelector('.history-revert-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        pushUndoSnapshot(createFullStateSnapshot());
        const el = findElementBySelector(sel);
        if (el) restoreElementInlineToInitial(el, rec);
        state.changes.delete(sel);
        syncDynamicStylesheet();
        if (state.selectedEl === el) populateInspectorFromElement(el);
        updateOverlayBoxes();
        rebuildLayersTree();
        renderHistoryPanel();
        updateTopbarCounters();
        showToast(`Đã khôi phục ${sel} về nguyên bản!`);
      });
      dom.historyList.appendChild(card);
    });
  }

  // ==================== EXPORT, DIRECT SAVE & AI PROMPT GENERATOR ====================
  function buildCleanExportHtml() {
    const idoc = getIframeDoc();
    let baseHtml = state.originalRawHtml;
    if (!baseHtml && idoc) {
      baseHtml = '<!DOCTYPE html>\n' + idoc.documentElement.outerHTML;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(baseHtml, 'text/html');

    // Remove any leftover studio overlay artifacts if present
    doc.querySelectorAll('#__visual_ui_overlay_root, #__visual_ui_studio_chrome_css, [data-ui-init-style]').forEach((n) => {
      if (n.id === '__visual_ui_overlay_root' || n.id === '__visual_ui_studio_chrome_css') n.remove();
      else n.removeAttribute('data-ui-init-style');
    });

    // 1. Insert addedNodes in order if not already present in doc
    state.addedNodes.forEach((info, cid) => {
      if (doc.querySelector(`[data-ui-custom-id="${cid}"]`)) return;
      const liveEl = idoc ? idoc.querySelector(`[data-ui-custom-id="${cid}"]`) : null;
      if (!liveEl) return; // Was deleted!

      const clone = liveEl.cloneNode(true);
      clone.removeAttribute('data-ui-init-style');
      clone.classList.remove('__ui_editing_text');

      let anchor = null;
      try {
        anchor = doc.querySelector(info.anchorSelector);
      } catch (e) {
        anchor = null;
      }
      if (!anchor) anchor = doc.body;

      if (anchor === doc.body || info.position === 'inside') {
        anchor.appendChild(clone);
      } else if (info.position === 'before' && anchor.parentElement) {
        anchor.parentElement.insertBefore(clone, anchor);
      } else if (anchor.parentElement) {
        anchor.parentElement.insertBefore(clone, anchor.nextSibling);
      } else {
        doc.body.appendChild(clone);
      }
    });

    // 2. Apply text and attribute changes directly to doc elements
    state.changes.forEach((rec, sel) => {
      let target = null;
      try {
        target = doc.querySelector(sel);
      } catch (e) {
        target = null;
      }
      if (!target) return;

      if (rec.textEdited) {
        setSmartElementText(target, rec.currentText);
      }
      if (rec.attrs.href !== undefined) target.setAttribute('href', rec.attrs.href);
      if (rec.attrs.src !== undefined) target.setAttribute('src', rec.attrs.src);
    });

    // 3. Inject or update <style id="visual-ui-studio-styles">
    const cssString = generateCssRulesString();
    let styleTag = doc.getElementById('visual-ui-studio-styles');
    if (cssString) {
      if (!styleTag) {
        styleTag = doc.createElement('style');
        styleTag.id = 'visual-ui-studio-styles';
        doc.head.appendChild(styleTag);
      }
      styleTag.textContent = `\n${cssString}\n`;
    }

    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  async function saveDirectlyToSource() {
    const finalHtml = buildCleanExportHtml();

    // If in standalone/template/local-file mode or no server, download HTML directly
    if (!state.hasLocalServer || state.sourceMode !== 'workspace') {
      downloadHtmlFile(finalHtml);
      return;
    }

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: state.currentFile,
          content: finalHtml
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update baseline HTML so repeated Ctrl+S saves never duplicate addedNodes
        state.originalRawHtml = finalHtml;
        showToast(`Đã lưu trực tiếp vào ${state.currentFile} (Có bản backup .bak)!`, 'ph-floppy-disk-back');
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (err) {
      downloadHtmlFile(finalHtml);
    }
  }

  function downloadHtmlFile(htmlContent) {
    const content = htmlContent || buildCleanExportHtml();
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.currentFile.endsWith('.html') ? state.currentFile : 'index-edited.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Đã tải file HTML hoàn chỉnh về máy tính!', 'ph-download-simple');
  }

  function generateAiPromptText() {
    const total = getTotalChangeCount();
    if (total === 0) {
      return 'Chưa có thay đổi nào trên giao diện. Hãy kéo thả hoặc đổi màu một vài phần tử trước!';
    }

    const lines = [
      `Hãy cập nhật giao diện cho file \`${state.currentFile}\` của tôi theo chính xác các thông số tọa độ và màu sắc tôi đã căn chỉnh trực quan dưới đây:\n`
    ];

    let idx = 1;
    state.addedNodes.forEach((info, cid) => {
      lines.push(
        `${idx++}. **Thêm phần tử mới (${info.name})**:\n   - Vị trí chèn: \`${info.position}\` so với \`${info.anchorSelector}\`\n   - Mã HTML: \`${info.outerHTML}\``
      );
    });

    state.changes.forEach((rec, sel) => {
      if (isRecordEmpty(rec)) return;
      const details = [];
      if (rec.deleted) {
        details.push(`- **Xóa / Ẩn phần tử này** khỏi giao diện (\`display: none !important;\`)`);
      } else {
        if (rec.tx !== 0 || rec.ty !== 0) {
          const totalX = (rec.baseTx || 0) + rec.tx;
          const totalY = (rec.baseTy || 0) + rec.ty;
          details.push(`- Dịch chuyển tọa độ: ngang **${rec.tx}px**, dọc **${rec.ty}px** (\`transform: translate3d(${totalX}px, ${totalY}px, 0)\`)`);
        }
        if (rec.width || rec.height) {
          details.push(`- Kích thước mới: Rộng **${rec.width || 'giữ nguyên'}**, Cao **${rec.height || 'giữ nguyên'}**`);
        }
        if (rec.textEdited) {
          details.push(`- Đổi nội dung chữ thành: **"${rec.currentText}"**`);
        }
        Object.entries(rec.styles).forEach(([bucket, styleMap]) => {
          const entries = Object.entries(styleMap);
          if (entries.length > 0) {
            const propsStr = entries.map(([k, v]) => `\`${k}: ${v}\``).join(', ');
            details.push(`- Kiểu dáng [${bucket}]: ${propsStr}`);
          }
        });
      }

      if (details.length > 0) {
        lines.push(`${idx++}. **Phần tử \`${sel}\` (${rec.tag.toUpperCase()})**:\n   ${details.join('\n   ')}`);
      }
    });

    const cssCode = generateCssRulesString();
    if (cssCode) {
      lines.push(`\n### Mã CSS chuẩn xác tương ứng:\n\`\`\`css\n${cssCode}\n\`\`\``);
    }

    return lines.join('\n\n');
  }

  // ==================== EVENT BINDINGS (TOPBAR, SIDEBAR, INSPECTOR) ====================
  function bindTopbarEvents() {
    dom.fileSelector.addEventListener('change', (e) => {
      loadWorkspaceHtmlFile(e.target.value);
    });

    dom.btnOpenLocalFile.addEventListener('click', () => dom.hiddenHtmlInput.click());
    dom.hiddenHtmlInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        loadHtmlIntoCanvas(String(ev.target.result || ''), file.name, 'local-file');
        showToast(`Đã mở file "${file.name}"!`);
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    dom.btnOpenFolder.addEventListener('click', () => {
      dom.inpWorkspacePath.value = state.workspaceDir || '';
      dom.modalFolder.style.display = 'flex';
    });

    dom.btnConfirmFolder.addEventListener('click', async () => {
      const newPath = dom.inpWorkspacePath.value.trim();
      if (!newPath) return;
      try {
        const res = await fetch('/api/set-workspace', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderPath: newPath })
        });
        const data = await res.json();
        if (data.success) {
          dom.modalFolder.style.display = 'none';
          await loadWorkspaceFiles();
          showToast(`Đã kết nối thư mục: ${data.workspaceDir}`);
        } else {
          alert(data.error || 'Không tìm thấy thư mục này!');
        }
      } catch (err) {
        alert('Chức năng kết nối thư mục cần chạy qua START-UI-STUDIO.bat (Local Server). Bạn vẫn có thể dùng nút "Mở file .html"!');
      }
    });

    dom.btnOpenTemplates.addEventListener('click', () => {
      dom.modalTemplates.style.display = 'flex';
    });

    // Viewport Switcher
    dom.viewportSwitcher.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.viewportSwitcher.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.viewport = btn.dataset.viewport;
        dom.iframeContainer.classList.remove('viewport-tablet', 'viewport-mobile');
        if (state.viewport === 'tablet') dom.iframeContainer.classList.add('viewport-tablet');
        if (state.viewport === 'mobile') dom.iframeContainer.classList.add('viewport-mobile');

        const badgeMap = {
          desktop: '<i class="ph ph-desktop"></i> <span>Tất cả màn hình</span>',
          tablet: '<i class="ph ph-device-tablet"></i> <span>Màn hình Tablet (≤768px)</span>',
          mobile: '<i class="ph ph-device-mobile"></i> <span>Màn hình Mobile (≤480px)</span>'
        };
        dom.scopeViewportBadge.innerHTML = badgeMap[state.viewport];
        if (state.selectedEl) populateInspectorFromElement(state.selectedEl);
        setTimeout(updateOverlayBoxes, 280);
      });
    });

    // Mode Switcher (Edit vs Preview)
    dom.modeSwitcher.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.modeSwitcher.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
        hideHoverBox();
        updateOverlayBoxes();
        showToast(
          state.mode === 'preview'
            ? 'Chế độ Xem thử: Bạn có thể bấm nút và cuộn trang như người dùng thật!'
            : 'Chế độ Chỉnh sửa: Bấm và kéo thả bất kỳ phần tử nào!'
        );
      });
    });

    // Canvas Helpers
    dom.btnToggleGuides.addEventListener('click', () => {
      state.showGuides = !state.showGuides;
      dom.btnToggleGuides.classList.toggle('active', state.showGuides);
    });

    dom.btnToggleGrid.addEventListener('click', () => {
      state.showGrid = !state.showGrid;
      dom.btnToggleGrid.classList.toggle('active', state.showGrid);
      const idoc = getIframeDoc();
      if (idoc && idoc.body) idoc.body.classList.toggle('__ui_show_grid', state.showGrid);
    });

    dom.btnToggleOutlines.addEventListener('click', () => {
      state.showOutlines = !state.showOutlines;
      dom.btnToggleOutlines.classList.toggle('active', state.showOutlines);
      const idoc = getIframeDoc();
      if (idoc && idoc.body) idoc.body.classList.toggle('__ui_show_outlines', state.showOutlines);
    });

    dom.btnUndo.addEventListener('click', performUndo);
    dom.btnRedo.addEventListener('click', performRedo);
    dom.btnReloadCanvas.addEventListener('click', () => {
      if (state.sourceMode === 'workspace' && state.hasLocalServer) {
        loadWorkspaceHtmlFile(state.currentFile);
      } else {
        loadHtmlIntoCanvas(state.originalRawHtml, state.currentFile, state.sourceMode);
      }
      showToast('Đã tải lại trang Web về trạng thái ban đầu!');
    });

    // Zoom Controls
    const applyZoom = (z) => {
      state.zoom = Math.min(1.5, Math.max(0.5, z));
      dom.iframeContainer.style.transform = `scale(${state.zoom})`;
      dom.zoomLevelLbl.textContent = `${Math.round(state.zoom * 100)}%`;
      setTimeout(updateOverlayBoxes, 60);
    };
    dom.btnZoomOut.addEventListener('click', () => applyZoom(state.zoom - 0.1));
    dom.btnZoomIn.addEventListener('click', () => applyZoom(state.zoom + 0.1));
    dom.btnZoomReset.addEventListener('click', () => applyZoom(1));

    // Right Topbar Buttons
    dom.btnLangToggle.addEventListener('click', toggleLanguage);
    dom.btnHelpModal.addEventListener('click', () => {
      dom.modalHelp.style.display = 'flex';
    });

    dom.btnAiPrompt.addEventListener('click', () => {
      dom.aiPromptOutput.value = generateAiPromptText();
      dom.cssDiffOutput.value = generateCssRulesString() || '/* Chưa có thay đổi CSS */';
      dom.modalAiPrompt.style.display = 'flex';
    });

    dom.btnCopyPrompt.addEventListener('click', () => {
      const activePanel = dom.modalAiPrompt.querySelector('.m-panel.active textarea');
      if (activePanel) {
        navigator.clipboard.writeText(activePanel.value);
        showToast('Đã copy vào Clipboard!');
      }
    });

    dom.btnDownloadHtml.addEventListener('click', () => downloadHtmlFile());
    dom.btnSaveDirect.addEventListener('click', saveDirectlyToSource);

    // Modal tabs & close buttons
    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        const modal = document.getElementById(targetId);
        if (modal) modal.style.display = 'none';
      });
    });

    document.querySelectorAll('.m-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.m-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-mtab');
        document.querySelectorAll('.m-panel').forEach((p) => {
          p.style.display = p.id === targetId ? 'block' : 'none';
          p.classList.toggle('active', p.id === targetId);
        });
      });
    });
  }

  function bindSidebarEvents() {
    document.querySelectorAll('.sidebar-tabs .tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.sidebar-left .tab-panel').forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById(btn.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });

    dom.layerSearch.addEventListener('input', rebuildLayersTree);

    dom.btnClearAllHistory.addEventListener('click', () => {
      if (getTotalChangeCount() === 0) return;
      pushUndoSnapshot(createFullStateSnapshot());

      const idoc = getIframeDoc();
      if (idoc) {
        // Remove all added custom nodes
        state.addedNodes.forEach((_, cid) => {
          const el = idoc.querySelector(`[data-ui-custom-id="${cid}"]`);
          if (el) el.remove();
        });
        state.addedNodes.clear();

        // Restore all modified elements
        state.changes.forEach((rec, sel) => {
          const el = findElementBySelector(sel);
          if (el) restoreElementInlineToInitial(el, rec);
        });
        state.changes.clear();
      }

      syncDynamicStylesheet();
      rebuildLayersTree();
      renderHistoryPanel();
      updateTopbarCounters();
      if (state.selectedEl) populateInspectorFromElement(state.selectedEl);
      updateOverlayBoxes();
      showToast('Đã khôi phục toàn bộ trang web về nguyên bản! (Bấm Ctrl+Z nếu muốn lấy lại)');
    });
  }

  function bindInspectorEvents() {
    // Quick Element Header Actions
    dom.btnSelectParent.addEventListener('click', selectParentElement);
    dom.btnMovePrev.addEventListener('click', () => moveSelectedInDom('prev'));
    dom.btnMoveNext.addEventListener('click', () => moveSelectedInDom('next'));
    dom.btnDuplicateEl.addEventListener('click', duplicateSelectedElement);
    dom.btnResetEl.addEventListener('click', resetSelectedElement);
    dom.btnDeleteEl.addEventListener('click', deleteSelectedElement);

    // State Tabs (Normal vs Hover)
    dom.stateTabs.querySelectorAll('.mini-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        dom.stateTabs.querySelectorAll('.mini-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        state.editState = tab.dataset.state;
        if (state.selectedEl) populateInspectorFromElement(state.selectedEl);
      });
    });

    // Section Reset Pills
    document.querySelectorAll('.btn-sec-reset').forEach((btn) => {
      btn.addEventListener('click', () => {
        resetInspectorSection(btn.getAttribute('data-reset-sec'));
      });
    });

    // 1. Coordinates & Size
    dom.btnPosReset.addEventListener('click', resetOriginalPositionAndSize);

    const updateCoordFromInput = () => {
      if (!state.selectedEl) return;
      beginContinuousInputTransaction();
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      rec.tx = parseInt(dom.inpTx.value, 10) || 0;
      rec.ty = parseInt(dom.inpTy.value, 10) || 0;
      applyRecordToLiveElement(state.selectedEl, rec);
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    };
    dom.inpTx.addEventListener('input', updateCoordFromInput);
    dom.inpTy.addEventListener('input', updateCoordFromInput);

    dom.btnResetX.addEventListener('click', () => {
      dom.inpTx.value = 0;
      updateCoordFromInput();
    });
    dom.btnResetY.addEventListener('click', () => {
      dom.inpTy.value = 0;
      updateCoordFromInput();
    });

    dom.inpWidth.addEventListener('change', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const val = dom.inpWidth.value.trim();
      rec.width = val ? (/^\d+$/.test(val) ? `${val}px` : val) : '';
      applyRecordToLiveElement(state.selectedEl, rec);
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.inpHeight.addEventListener('change', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const val = dom.inpHeight.value.trim();
      rec.height = val ? (/^\d+$/.test(val) ? `${val}px` : val) : '';
      applyRecordToLiveElement(state.selectedEl, rec);
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    // Nudge Buttons
    document.querySelectorAll('.nudge-btn[data-dx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        pushUndoSnapshot(createFullStateSnapshot());
        const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
        rec.tx += parseInt(btn.dataset.dx, 10) || 0;
        rec.ty += parseInt(btn.dataset.dy, 10) || 0;
        dom.inpTx.value = rec.tx;
        dom.inpTy.value = rec.ty;
        applyRecordToLiveElement(state.selectedEl, rec);
        syncDynamicStylesheet();
        updateOverlayBoxes();
        renderHistoryPanel();
        updateTopbarCounters();
      });
    });

    dom.btnCenterH.addEventListener('click', () => {
      if (!state.selectedEl || !state.selectedEl.parentElement) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const parentRect = state.selectedEl.parentElement.getBoundingClientRect();
      const elRect = state.selectedEl.getBoundingClientRect();
      const currentCenterDelta = (parentRect.left + parentRect.width / 2) - (elRect.left + elRect.width / 2);
      rec.tx = Math.round(rec.tx + currentCenterDelta);
      dom.inpTx.value = rec.tx;
      applyRecordToLiveElement(state.selectedEl, rec);
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
      showToast('Đã căn giữa ngang so với khung chứa!');
    });

    // 2. Content & Image
    dom.btnTextReset.addEventListener('click', resetOriginalTextContent);
    dom.inpText.addEventListener('input', () => {
      if (!state.selectedEl) return;
      beginContinuousInputTransaction();
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      rec.textEdited = true;
      rec.currentText = dom.inpText.value;
      setSmartElementText(state.selectedEl, rec.currentText);
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.inpHref.addEventListener('input', () => {
      if (!state.selectedEl) return;
      beginContinuousInputTransaction();
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      rec.attrs.href = dom.inpHref.value;
      state.selectedEl.setAttribute('href', rec.attrs.href);
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.btnImgReset.addEventListener('click', resetOriginalImageSrc);
    dom.inpImgSrc.addEventListener('change', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      rec.attrs.src = dom.inpImgSrc.value.trim();
      state.selectedEl.setAttribute('src', rec.attrs.src);
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.btnUploadImg.addEventListener('click', () => dom.hiddenImgInput.click());
    dom.hiddenImgInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !state.selectedEl) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        pushUndoSnapshot(createFullStateSnapshot());
        const dataUrl = String(ev.target.result || '');
        const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
        if (state.selectedEl.tagName === 'IMG') {
          rec.attrs.src = dataUrl;
          state.selectedEl.setAttribute('src', dataUrl);
          dom.inpImgSrc.value = dataUrl;
        } else {
          const bucket = getActiveStyleBucket();
          rec.styles[bucket]['background-image'] = `url("${dataUrl}")`;
          rec.styles[bucket]['background-size'] = 'cover';
          rec.styles[bucket]['background-position'] = 'center';
          syncDynamicStylesheet();
        }
        renderHistoryPanel();
        updateTopbarCounters();
        showToast('Đã thay ảnh mới thành công! (Bấm ↺ Ảnh gốc nếu muốn quay lại)');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });

    dom.selObjectFit.addEventListener('change', () => {
      applyStyleProperty('object-fit', dom.selObjectFit.value);
    });

    // 3. Colors & Gradients (with explicit Original Color Reset!)
    dom.btnColorReset.addEventListener('click', resetOriginalTextColor);
    dom.inpColorPicker.addEventListener('input', (e) => {
      dom.inpColorHex.value = e.target.value;
      applyStyleProperty('color', e.target.value, true);
    });
    dom.inpColorHex.addEventListener('change', (e) => {
      applyStyleProperty('color', e.target.value.trim());
    });

    dom.btnBgReset.addEventListener('click', resetOriginalBackgroundColor);
    dom.btnGradReset.addEventListener('click', resetOriginalBackgroundColor);
    dom.btnBgTransparent.addEventListener('click', () => {
      applySolidBackgroundColor('transparent');
      showToast('Đã đặt nền trong suốt! (Bấm "↺ Màu gốc" để về màu ban đầu)');
    });

    dom.inpBgPicker.addEventListener('input', (e) => {
      dom.inpBgHex.value = e.target.value;
      applySolidBackgroundColor(e.target.value, true);
    });
    dom.inpBgHex.addEventListener('change', (e) => {
      applySolidBackgroundColor(e.target.value.trim());
    });

    document.querySelectorAll('.swatch-row .swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        const targetProp = sw.closest('.swatch-row').dataset.target;
        const color = sw.dataset.color;
        if (targetProp === 'color') {
          dom.inpColorHex.value = color;
          if (color.startsWith('#')) dom.inpColorPicker.value = color;
          applyStyleProperty('color', color);
        } else {
          dom.inpBgHex.value = color;
          if (color.startsWith('#')) dom.inpBgPicker.value = color;
          applySolidBackgroundColor(color);
        }
      });
    });

    dom.gradientSwatches.querySelectorAll('.grad-swatch').forEach((gsw) => {
      gsw.addEventListener('click', () => {
        applyGradientBackground(gsw.dataset.grad);
      });
    });

    // 4. Typography
    dom.selFontFamily.addEventListener('change', () => {
      applyStyleProperty('font-family', dom.selFontFamily.value);
    });

    dom.rngFontSize.addEventListener('input', () => {
      const v = dom.rngFontSize.value;
      dom.inpFontSize.value = v;
      dom.lblFontSize.textContent = `${v}px`;
      applyStyleProperty('font-size', `${v}px`, true);
    });
    dom.inpFontSize.addEventListener('change', () => {
      const v = dom.inpFontSize.value;
      dom.rngFontSize.value = v;
      dom.lblFontSize.textContent = `${v}px`;
      applyStyleProperty('font-size', `${v}px`);
    });

    dom.selFontWeight.addEventListener('change', () => {
      applyStyleProperty('font-weight', dom.selFontWeight.value);
    });

    dom.textAlignGroup.querySelectorAll('.align-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyStyleProperty('text-align', btn.dataset.align);
      });
    });

    // 5. Border, Radius & Shadow
    dom.rngRadius.addEventListener('input', () => {
      const v = dom.rngRadius.value;
      dom.inpRadius.value = v;
      dom.lblRadius.textContent = `${v}px`;
      applyStyleProperty('border-radius', `${v}px`, true);
    });
    dom.inpRadius.addEventListener('change', () => {
      const v = dom.inpRadius.value;
      dom.rngRadius.value = Math.min(60, v);
      dom.lblRadius.textContent = `${v}px`;
      applyStyleProperty('border-radius', `${v}px`);
    });

    dom.rngOpacity.addEventListener('input', () => {
      const v = dom.rngOpacity.value;
      dom.lblOpacity.textContent = `${v}%`;
      applyStyleProperty('opacity', String(Number(v) / 100), true);
    });

    const updateBorder = () => {
      const w = parseInt(dom.inpBorderWidth.value, 10) || 0;
      const c = dom.inpBorderColor.value;
      if (w === 0) {
        applyStyleProperty('border', 'none');
      } else {
        applyStyleProperty('border', `${w}px solid ${c}`);
      }
    };
    dom.inpBorderWidth.addEventListener('change', updateBorder);
    dom.inpBorderColor.addEventListener('input', updateBorder);

    dom.selShadow.addEventListener('change', () => {
      applyStyleProperty('box-shadow', dom.selShadow.value);
    });

    // 6. Spacing & Flexbox
    dom.inpPadding.addEventListener('change', () => {
      applyStyleProperty('padding', dom.inpPadding.value.trim());
    });
    dom.inpMargin.addEventListener('change', () => {
      applyStyleProperty('margin', dom.inpMargin.value.trim());
    });

    dom.btnFlexRow.addEventListener('click', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const b = getActiveStyleBucket();
      rec.styles[b]['display'] = 'flex';
      rec.styles[b]['flex-direction'] = 'row';
      rec.styles[b]['align-items'] = 'center';
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.btnFlexCol.addEventListener('click', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const b = getActiveStyleBucket();
      rec.styles[b]['display'] = 'flex';
      rec.styles[b]['flex-direction'] = 'column';
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.btnFlexCenter.addEventListener('click', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const b = getActiveStyleBucket();
      rec.styles[b]['display'] = 'flex';
      rec.styles[b]['align-items'] = 'center';
      rec.styles[b]['justify-content'] = 'center';
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.btnFlexBetween.addEventListener('click', () => {
      if (!state.selectedEl) return;
      pushUndoSnapshot(createFullStateSnapshot());
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      const b = getActiveStyleBucket();
      rec.styles[b]['display'] = 'flex';
      rec.styles[b]['align-items'] = 'center';
      rec.styles[b]['justify-content'] = 'space-between';
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    });

    dom.inpGap.addEventListener('change', () => {
      const v = dom.inpGap.value.trim();
      applyStyleProperty('gap', v ? `${v}px` : '');
    });
  }

  // ==================== DRAG & DROP FILE OVERLAY ====================
  function bindDropzoneEvents() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      dom.dropzoneOverlay.classList.add('active');
    });

    dom.dropzoneOverlay.addEventListener('dragleave', (e) => {
      if (e.target === dom.dropzoneOverlay) {
        dom.dropzoneOverlay.classList.remove('active');
      }
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      dom.dropzoneOverlay.classList.remove('active');
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (!file) return;

      if (file.name.endsWith('.html') || file.name.endsWith('.htm')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          loadHtmlIntoCanvas(String(ev.target.result || ''), file.name, 'local-file');
          showToast(`Đã mở file "${file.name}"!`);
        };
        reader.readAsText(file);
      } else if (file.type.startsWith('image/')) {
        if (!state.selectedEl) {
          showToast('Hãy bấm chọn 1 khung hoặc thẻ ảnh trên trang trước khi thả ảnh vào!', 'ph-warning');
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          pushUndoSnapshot(createFullStateSnapshot());
          const dataUrl = String(ev.target.result || '');
          const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
          if (state.selectedEl.tagName === 'IMG') {
            rec.attrs.src = dataUrl;
            state.selectedEl.setAttribute('src', dataUrl);
            dom.inpImgSrc.value = dataUrl;
          } else {
            const bucket = getActiveStyleBucket();
            rec.styles[bucket]['background-image'] = `url("${dataUrl}")`;
            rec.styles[bucket]['background-size'] = 'cover';
            syncDynamicStylesheet();
          }
          renderHistoryPanel();
          updateTopbarCounters();
          showToast('Đã thả ảnh vào phần tử đang chọn!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==================== GLOBAL KEYBOARD SHORTCUTS ====================
  function bindGlobalShortcuts() {
    window.addEventListener('keydown', handleGlobalKeyDown);
  }

  function handleGlobalKeyDown(e) {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    const isTypingInInput =
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) ||
      (document.activeElement && document.activeElement.isContentEditable) ||
      (e.target && e.target.isContentEditable);

    // Save: Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveDirectlyToSource();
      return;
    }

    if (isTypingInInput) return;

    // Undo: Ctrl+Z
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      performUndo();
      return;
    }

    // Redo: Ctrl+Y or Ctrl+Shift+Z
    if (
      ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
    ) {
      e.preventDefault();
      performRedo();
      return;
    }

    // Duplicate: Ctrl+D
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      if (state.selectedEl) {
        e.preventDefault();
        duplicateSelectedElement();
      }
      return;
    }

    // Delete / Backspace -> Delete selected element
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (state.selectedEl && state.mode === 'edit') {
        e.preventDefault();
        deleteSelectedElement();
      }
      return;
    }

    // Escape -> Select parent or deselect
    if (e.key === 'Escape') {
      if (state.selectedEl) {
        e.preventDefault();
        selectParentElement();
      }
      return;
    }

    // Arrow keys -> Nudge 1px (or 10px with Shift)
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && state.selectedEl && state.mode === 'edit') {
      e.preventDefault();
      pushUndoSnapshot(createFullStateSnapshot());
      const step = e.shiftKey ? 10 : 1;
      const rec = getOrCreateRecord(state.selectedEl, state.selectedSelector);
      if (e.key === 'ArrowLeft') rec.tx -= step;
      if (e.key === 'ArrowRight') rec.tx += step;
      if (e.key === 'ArrowUp') rec.ty -= step;
      if (e.key === 'ArrowDown') rec.ty += step;

      dom.inpTx.value = rec.tx;
      dom.inpTy.value = rec.ty;
      applyRecordToLiveElement(state.selectedEl, rec);
      syncDynamicStylesheet();
      updateOverlayBoxes();
      renderHistoryPanel();
      updateTopbarCounters();
    }
  }

  // Boot Studio
  document.addEventListener('DOMContentLoaded', init);
})();
