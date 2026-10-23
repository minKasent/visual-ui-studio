/**
 * Visual UI Studio — Core Engine
 * Real-time WYSIWYG Drag-and-Drop, Coordinate Manipulation, Inspector, Clean AST Saver & AI Prompt Generator
 */

(() => {
  // ==================== STATE ====================
  const state = {
    workspaceDir: 'd:\\Khoa\\Porfolio',
    files: [],
    currentFile: null, // relativePath in workspace, or null if local file/demo
    localFileHandle: null, // FileSystemFileHandle if opened via browser File System Access API
    originalRawHtml: '',
    mode: 'edit', // 'edit' | 'preview'
    dragMode: 'translate', // 'translate' | 'margin'
    bypassLoader: true,
    zoom: 1,
    viewportWidth: '100%',
    selectedEl: null,
    selectedSelector: null,
    hoveredEl: null,
    // Map of selector -> { selector, tagName, label, styles: {}, textChanged: null, attrChanges: {}, deleted: false }
    editsMap: new Map(),
    addedNodes: [], // { parentSelector, html, id, libName, compName }
    injectedCdns: new Set(), // 'tailwind' | 'bootstrap5' | 'fontawesome' | 'gsap' | 'swiper' | 'venobox'
    customExtraCss: '',
    uilibCategory: 'all',
    uilibSelectedLib: 'all',
    uilibSearchQuery: '',
    namethatCheckedSet: new Set(),
    autoMatchSelectedEl: true,
    morphWithFx: true,
    autoDetectedCategory: null,
    undoStack: [],
    redoStack: [],
    blobUrlMap: new Map() // for dropped folders
  };

  // ==================== DOM REFERENCES ====================
  const dom = {
    brandHomeLogo: document.getElementById('brand-home-logo'),
    folderLabel: document.getElementById('current-folder-label'),
    pageSelector: document.getElementById('page-selector'),
    btnChangeFolder: document.getElementById('btn-change-folder'),
    btnOpenLocalFile: document.getElementById('btn-open-local-file'),
    btnLoadDemo: document.getElementById('btn-load-demo'),
    btnOpenUilibExplorer: document.getElementById('btn-open-uilib-explorer'),
    studioThemeSelect: document.getElementById('studio-theme-select'),
    viewportSwitcher: document.getElementById('viewport-switcher'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomOut: document.getElementById('btn-zoom-out'),
    btnZoomReset: document.getElementById('btn-zoom-reset'),
    zoomLabel: document.getElementById('zoom-label'),
    modeEditBtn: document.getElementById('mode-edit-btn'),
    modePreviewBtn: document.getElementById('mode-preview-btn'),
    chkBypassLoader: document.getElementById('chk-bypass-loader'),
    btnUndo: document.getElementById('btn-undo'),
    btnRedo: document.getElementById('btn-redo'),
    btnAiPrompt: document.getElementById('btn-ai-prompt'),
    changeCountBadge: document.getElementById('change-count-badge'),
    btnDownloadHtml: document.getElementById('btn-download-html'),
    btnSaveDirect: document.getElementById('btn-save-direct'),

    // Left Sidebar: UI Libraries Hub + Layers + Add + Magic + History
    uilibSearchInput: document.getElementById('uilib-search-input'),
    btnClearUilibSearch: document.getElementById('btn-clear-uilib-search'),
    btnToggleNamethatChecklist: document.getElementById('btn-toggle-namethat-checklist'),
    namethatCheckedBadge: document.getElementById('namethat-checked-badge'),
    namethatChecklistPanel: document.getElementById('namethat-checklist-panel'),
    namethatChecklistGrid: document.getElementById('namethat-checklist-grid'),
    namethatMatchingLibs: document.getElementById('namethat-matching-libs'),
    btnResetNamethat: document.getElementById('btn-reset-namethat'),
    btnCloseNamethat: document.getElementById('btn-close-namethat'),
    chkAutoMatchEl: document.getElementById('chk-auto-match-el'),
    chkMorphWithFx: document.getElementById('chk-morph-with-fx'),
    uilibDetectedBanner: document.getElementById('uilib-detected-banner'),
    uilibDetectedText: document.getElementById('uilib-detected-text'),
    btnShowAllUilibs: document.getElementById('btn-show-all-uilibs'),
    btnFxReset: document.getElementById('btn-fx-reset'),
    uilibCatPills: document.getElementById('uilib-cat-pills'),
    uilibLibFilter: document.getElementById('uilib-lib-filter'),
    uilibHoverMode: document.getElementById('uilib-hover-mode'),
    btnExpandUilibModal: document.getElementById('btn-expand-uilib-modal'),
    btnOpenCustomImport: document.getElementById('btn-open-custom-import'),
    btnClearCustomImports: document.getElementById('btn-clear-custom-imports'),
    uilibResultsCount: document.getElementById('uilib-results-count'),
    uilibComponentsList: document.getElementById('uilib-components-list'),

    layerSearch: document.getElementById('layer-search'),
    btnRefreshTree: document.getElementById('btn-refresh-tree'),
    domTreeContainer: document.getElementById('dom-tree-container'),
    magicPresetsList: document.getElementById('magic-presets-list'),
    changeLogList: document.getElementById('change-log-list'),
    historyTotal: document.getElementById('history-total'),
    btnClearAllEdits: document.getElementById('btn-clear-all-edits'),

    // Center Canvas
    canvasStage: document.getElementById('canvas-stage'),
    statusBreadcrumb: document.getElementById('status-breadcrumb'),
    livePreviewBadge: document.getElementById('live-preview-badge'),
    liveCoordsReadout: document.getElementById('live-coords-readout'),
    dropzoneOverlay: document.getElementById('dropzone-overlay'),
    canvasFrameWrapper: document.getElementById('canvas-frame-wrapper'),
    iframe: document.getElementById('canvas-iframe'),

    // Right Inspector
    selectedTagBadge: document.getElementById('selected-tag-badge'),
    selectedSelectorLabel: document.getElementById('selected-selector-label'),
    btnElParent: document.getElementById('btn-el-parent'),
    btnElDuplicate: document.getElementById('btn-el-duplicate'),
    btnElReset: document.getElementById('btn-el-reset'),
    btnElDelete: document.getElementById('btn-el-delete'),
    inspectorEmpty: document.getElementById('inspector-empty'),
    inspectorControls: document.getElementById('inspector-controls'),

    // Section & Property Reset Buttons ("↺ Màu gốc / Vị trí gốc")
    btnPosReset: document.getElementById('btn-pos-reset'),
    btnAllColorsReset: document.getElementById('btn-all-colors-reset'),
    btnColorReset: document.getElementById('btn-color-reset'),
    btnBgReset: document.getElementById('btn-bg-reset'),
    btnGradReset: document.getElementById('btn-grad-reset'),
    btnFontReset: document.getElementById('btn-font-reset'),
    btnTextReset: document.getElementById('btn-text-reset'),
    btnImgReset: document.getElementById('btn-img-reset'),
    btnBorderReset: document.getElementById('btn-border-reset'),
    btnSpacingReset: document.getElementById('btn-spacing-reset'),

    // Inspector Inputs
    dragModeSelect: document.getElementById('drag-mode-select'),
    propX: document.getElementById('prop-x'),
    propY: document.getElementById('prop-y'),
    propWidth: document.getElementById('prop-width'),
    propHeight: document.getElementById('prop-height'),
    btnWidthAuto: document.getElementById('btn-width-auto'),
    btnHeightAuto: document.getElementById('btn-height-auto'),
    propRotate: document.getElementById('prop-rotate'),
    propScale: document.getElementById('prop-scale'),
    propZIndex: document.getElementById('prop-zindex'),

    propColorPicker: document.getElementById('prop-color-picker'),
    propColorHex: document.getElementById('prop-color-hex'),
    propBgPicker: document.getElementById('prop-bg-picker'),
    propBgHex: document.getElementById('prop-bg-hex'),
    btnBgTransparent: document.getElementById('btn-bg-transparent'),
    propOpacitySlider: document.getElementById('prop-opacity-slider'),
    propOpacityVal: document.getElementById('prop-opacity-val'),

    textContentGroup: document.getElementById('text-content-group'),
    propTextContent: document.getElementById('prop-text-content'),
    imageSrcGroup: document.getElementById('image-src-group'),
    propImgSrc: document.getElementById('prop-img-src'),
    propImgFile: document.getElementById('prop-img-file'),
    linkHrefGroup: document.getElementById('link-href-group'),
    propLinkHref: document.getElementById('prop-link-href'),

    propFontFamily: document.getElementById('prop-font-family'),
    propFontWeight: document.getElementById('prop-font-weight'),
    propFontsizeSlider: document.getElementById('prop-fontsize-slider'),
    propFontsizeNum: document.getElementById('prop-fontsize-num'),
    propLetterSpacing: document.getElementById('prop-letter-spacing'),

    propRadiusSlider: document.getElementById('prop-radius-slider'),
    propRadiusNum: document.getElementById('prop-radius-num'),
    btnRadiusPill: document.getElementById('btn-radius-pill'),
    propBorderWidth: document.getElementById('prop-border-width'),
    propBorderStyle: document.getElementById('prop-border-style'),
    propBorderColor: document.getElementById('prop-border-color'),

    propPadTop: document.getElementById('prop-pad-top'),
    propPadRight: document.getElementById('prop-pad-right'),
    propPadBottom: document.getElementById('prop-pad-bottom'),
    propPadLeft: document.getElementById('prop-pad-left'),
    propMarTop: document.getElementById('prop-mar-top'),
    propMarRight: document.getElementById('prop-mar-right'),
    propMarBottom: document.getElementById('prop-mar-bottom'),
    propMarLeft: document.getElementById('prop-mar-left'),

    btnFlexRow: document.getElementById('btn-flex-row'),
    btnFlexCol: document.getElementById('btn-flex-col'),
    btnFlexCenter: document.getElementById('btn-flex-center'),
    btnFlexBetween: document.getElementById('btn-flex-between'),

    // Modals
    modalOpenWeb: document.getElementById('modal-open-web'),
    btnTriggerFilePicker: document.getElementById('btn-trigger-file-picker'),
    inputHtmlFile: document.getElementById('input-html-file'),
    inputFolderFiles: document.getElementById('input-folder-files'),
    inputWorkspacePath: document.getElementById('input-workspace-path'),
    btnApplyWorkspacePath: document.getElementById('btn-apply-workspace-path'),
    textareaPasteHtml: document.getElementById('textarea-paste-html'),
    btnLoadPastedHtml: document.getElementById('btn-load-pasted-html'),

    modalAiPrompt: document.getElementById('modal-ai-prompt'),
    aiPromptOutput: document.getElementById('ai-prompt-output'),
    cssPatchOutput: document.getElementById('css-patch-output'),
    btnCopyAiPrompt: document.getElementById('btn-copy-ai-prompt'),
    btnCopyCssPatch: document.getElementById('btn-copy-css-patch'),

    modalUilibExplorer: document.getElementById('modal-uilib-explorer'),
    uilibModalSitesList: document.getElementById('uilib-modal-sites-list'),
    uilibModalSearch: document.getElementById('uilib-modal-search'),
    uilibModalGrid: document.getElementById('uilib-modal-grid'),
    importCompName: document.getElementById('import-comp-name'),
    importCompCat: document.getElementById('import-comp-cat'),
    importCompCode: document.getElementById('import-comp-code'),
    importCompCss: document.getElementById('import-comp-css'),
    btnSaveAndInsertComp: document.getElementById('btn-save-and-insert-comp'),
    btnOnlySaveComp: document.getElementById('btn-only-save-comp'),
    btnClearCustomImportsModal: document.getElementById('btn-clear-custom-imports-modal'),
    importLivePreviewStage: document.getElementById('import-live-preview-stage'),

    toastContainer: document.getElementById('toast-container')
  };

  // ==================== UTILITIES (ORIGIN UI / SHADCN SONNER TOAST) ====================
  function showToast(message, icon = 'info') {
    if (!dom.toastContainer) return;
    const rawMsg = String(message || '').replace(/^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✦⚡✨🌈🚀🔥💎🟢🔐🎉💬⏳🌟🔘✓➕🗑️↺🏠🎨✏️👁️📋💾📥📂]+)\s*/u, '');
    const lang = (window.getStudioLang && window.getStudioLang()) || localStorage.getItem('studio_lang') || 'vi';

    // Determine Origin UI / Sonner toast variant
    let variant = 'info';
    const hint = (String(icon) + ' ' + rawMsg).toLowerCase();
    if (icon === 'success' || /đã lưu|đã áp dụng|đã chèn|đã copy|thành công|saved|applied|inserted|copied/.test(hint) || ['✨', '✅', '💾', '➕', '📋'].includes(icon)) {
      variant = 'success';
    } else if (icon === 'warning' || /khôi phục|reset|hoàn tác|bỏ chọn|undo|revert|⚠️|↺|↩/.test(hint)) {
      variant = 'warning';
    } else if (icon === 'error' || /xóa|lỗi|không tìm thấy|delete|removed|error|🗑️|❌/.test(hint)) {
      variant = 'error';
    }

    const svgMap = {
      success: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      warning: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
      error: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
      info: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>'
    };

    const titleMap = {
      success: lang === 'en' ? 'Action Applied' : ' Đã áp dụng thay đổi',
      warning: lang === 'en' ? 'State Restored' : 'Khôi phục trạng thái',
      error: lang === 'en' ? 'Notice / Removed' : 'Đã gỡ bỏ / Cảnh báo',
      info: lang === 'en' ? 'Visual UI Studio' : 'Visual UI Studio'
    };

    // Keep maximum 3 stacked Sonner toasts
    while (dom.toastContainer.children.length >= 3) {
      dom.toastContainer.firstElementChild.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${variant}`;
    toast.innerHTML = `
      <div class="toast__icon-badge">${svgMap[variant]}</div>
      <div class="toast__content">
        <div class="toast__header">
          <span class="toast__title">${titleMap[variant]}</span>
          <span class="toast__meta">Origin UI</span>
        </div>
        <div class="toast__desc">${rawMsg}</div>
      </div>
      <button type="button" class="toast__close" aria-label="Close">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <div class="toast__progress"></div>
    `;

    const closeBtn = toast.querySelector('.toast__close');
    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px) scale(0.97)';
      toast.style.transition = 'all 0.18s ease';
      setTimeout(() => toast.remove(), 190);
    };
    if (closeBtn) closeBtn.addEventListener('click', dismiss);

    dom.toastContainer.appendChild(toast);
    setTimeout(dismiss, 2800);
  }
  window.showOriginToast = showToast;

  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#000000';
    if (rgb.startsWith('#')) return rgb.slice(0, 7);
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';
    const r = parseInt(match[0], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[2], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  function parsePx(val) {
    if (!val || val === 'auto' || val === 'none') return 0;
    const n = parseFloat(val);
    return Number.isFinite(n) ? Math.round(n) : 0;
  }

  /**
   * Generates a deterministic, unique CSS selector for any element inside the iframe document
   */
  function getUniqueSelector(el) {
    if (!el || el.nodeType !== 1) return '';
    if (el.__studioCachedSelector && el.__studioCachedParent === el.parentElement) {
      return el.__studioCachedSelector;
    }
    if (el.getAttribute('data-ui-custom-id')) {
      const customSel = `[data-ui-custom-id="${el.getAttribute('data-ui-custom-id')}"]`;
      el.__studioCachedSelector = customSel;
      el.__studioCachedParent = el.parentElement;
      return customSel;
    }
    if (el.id && !el.id.startsWith('__ui_studio')) {
      const doc = el.ownerDocument;
      try {
        const escaped = CSS.escape(el.id);
        if (doc.querySelectorAll(`#${escaped}`).length === 1) {
          const idSel = `#${escaped}`;
          el.__studioCachedSelector = idSel;
          el.__studioCachedParent = el.parentElement;
          return idSel;
        }
      } catch (_) {}
    }

    const parts = [];
    let cur = el;
    while (cur && cur.nodeType === 1 && cur.tagName.toLowerCase() !== 'html') {
      let part = cur.tagName.toLowerCase();
      if (cur.id && !cur.id.startsWith('__ui_studio')) {
        part = `#${CSS.escape(cur.id)}`;
        parts.unshift(part);
        break;
      } else {
        const parent = cur.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            c => !c.hasAttribute('data-studio-ignore') && c.tagName === cur.tagName
          );
          if (siblings.length > 1) {
            const idx = Array.from(parent.children)
              .filter(c => !c.hasAttribute('data-studio-ignore'))
              .indexOf(cur) + 1;
            part += `:nth-child(${idx})`;
          } else {
            const validClasses = Array.from(cur.classList)
              .filter(c => c && !c.startsWith('__ui_') && !c.startsWith('has-') && !c.startsWith('is-'))
              .slice(0, 2);
            if (validClasses.length > 0) {
              part += '.' + validClasses.map(c => CSS.escape(c)).join('.');
            }
          }
        }
      }
      parts.unshift(part);
      cur = cur.parentElement;
    }
    const finalSel = parts.join(' > ');
    el.__studioCachedSelector = finalSel;
    el.__studioCachedParent = el.parentElement;
    return finalSel;
  }

  function getFriendlyElementLabel(el) {
    if (!el || el.nodeType !== 1) return '';
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const cls = Array.from(el.classList)
      .filter(c => !c.startsWith('__ui_'))
      .slice(0, 2)
      .map(c => `.${c}`)
      .join('');
    return `${tag}${id}${cls}`;
  }

  /**
   * Smart Target Resolution:
   * When a user clicks inside a button or link (e.g. on an inner <span> or <svg> or <i>),
   * select the interactive button/link container on first click unless the button is already selected!
   */
  function resolveSmartTarget(rawTarget) {
    if (!rawTarget || rawTarget.nodeType !== 1) return null;
    if (rawTarget.closest('[data-studio-ignore="true"]')) return null;

    // If user clicked inside an SVG (<path>, <circle>, <rect>, etc.), climb to <svg> or parent button
    const svg = rawTarget.closest('svg');
    if (svg) {
      const btnParent = svg.closest('button, a.btn, [class*="btn"]');
      if (btnParent && state.selectedEl !== btnParent) return btnParent;
      return svg;
    }

    // If user clicked an icon or caption span inside a button or .btn link, select the button first
    const interactiveBtn = rawTarget.closest('button, a.btn, [class*="btn-"], .main-menu__toggle');
    if (interactiveBtn && interactiveBtn !== rawTarget) {
      // If the button is NOT yet selected, select the button first.
      // If the button IS already selected, allow selecting the inner span/icon!
      if (state.selectedEl !== interactiveBtn && !interactiveBtn.contains(state.selectedEl)) {
        return interactiveBtn;
      }
    }

    return rawTarget;
  }

  // ==================== EDIT TRACKING & UNDO/REDO ====================
  function ensureInitBaselineAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    if (!el.hasAttribute('data-ui-init-style') && !el.hasAttribute('data-studio-ignore')) {
      el.setAttribute('data-ui-init-style', el.getAttribute('style') || '');
      el.setAttribute('data-ui-init-class', el.getAttribute('class') || '');
    }
  }

  function ensureEditRecord(el) {
    ensureInitBaselineAttrs(el);
    const selector = getUniqueSelector(el);
    if (!state.editsMap.has(selector)) {
      state.editsMap.set(selector, {
        selector,
        tagName: el.tagName.toLowerCase(),
        label: getFriendlyElementLabel(el),
        styles: {},
        textChanged: null,
        attrChanges: {},
        deleted: false
      });
    }
    return state.editsMap.get(selector);
  }

  function getElementOffsets(el) {
    const dx = parseFloat(el.getAttribute('data-ui-dx') || '0') || 0;
    const dy = parseFloat(el.getAttribute('data-ui-dy') || '0') || 0;
    const rot = parseFloat(el.getAttribute('data-ui-rot') || '0') || 0;
    const scale = parseFloat(el.getAttribute('data-ui-scale') || '100') || 100;
    return { dx: Math.round(dx), dy: Math.round(dy), rot: Math.round(rot), scale: Math.round(scale) };
  }

  let posFrameRaf = null;
  function applyElementPosition(el, dx, dy, rot = null, scale = null) {
    if (!el) return;
    const cur = getElementOffsets(el);
    const finalDx = dx !== null && dx !== undefined ? Math.round(dx) : cur.dx;
    const finalDy = dy !== null && dy !== undefined ? Math.round(dy) : cur.dy;
    const finalRot = rot !== null && rot !== undefined ? Math.round(rot) : cur.rot;
    const finalScale = scale !== null && scale !== undefined ? Math.round(scale) : cur.scale;

    el.setAttribute('data-ui-dx', String(finalDx));
    el.setAttribute('data-ui-dy', String(finalDy));
    el.setAttribute('data-ui-rot', String(finalRot));
    el.setAttribute('data-ui-scale', String(finalScale));

    const rec = ensureEditRecord(el);

    if (state.dragMode === 'margin') {
      el.style.setProperty('margin-left', `${finalDx}px`, 'important');
      el.style.setProperty('margin-top', `${finalDy}px`, 'important');
      rec.styles['margin-left'] = `${finalDx}px`;
      rec.styles['margin-top'] = `${finalDy}px`;
    } else {
      // Ensure inline elements can be translated cleanly without calling getComputedStyle on every pixel
      if (!el.style.display && ['SPAN', 'A', 'SMALL', 'STRONG', 'EM', 'I', 'B', 'LABEL'].includes(el.tagName)) {
        const win = el.ownerDocument.defaultView;
        if (win && win.getComputedStyle(el).display === 'inline') {
          el.style.setProperty('display', 'inline-block', 'important');
          rec.styles['display'] = 'inline-block';
        }
      }
      el.style.setProperty('translate', `${finalDx}px ${finalDy}px`, 'important');
      rec.styles['translate'] = `${finalDx}px ${finalDy}px`;
    }

    if (finalRot !== 0) {
      el.style.setProperty('rotate', `${finalRot}deg`, 'important');
      rec.styles['rotate'] = `${finalRot}deg`;
    } else if (rec.styles['rotate']) {
      el.style.removeProperty('rotate');
      delete rec.styles['rotate'];
    }

    if (finalScale !== 100) {
      const s = (finalScale / 100).toFixed(2);
      el.style.setProperty('scale', `${s}`, 'important');
      rec.styles['scale'] = `${s}`;
    } else if (rec.styles['scale']) {
      el.style.removeProperty('scale');
      delete rec.styles['scale'];
    }

    if (!posFrameRaf) {
      posFrameRaf = requestAnimationFrame(() => {
        posFrameRaf = null;
        updateOverlayPosition();
        updateLiveCoordsReadout(el);
      });
    }
    if (!dragSession) {
      updateHistoryUI();
    }
  }

  function cloneEditRecord(rec) {
    if (!rec) return null;
    return {
      selector: rec.selector,
      tagName: rec.tagName,
      label: rec.label,
      styles: { ...(rec.styles || {}) },
      textChanged: rec.textChanged,
      attrChanges: { ...(rec.attrChanges || {}) },
      deleted: Boolean(rec.deleted)
    };
  }

  function captureElementState(el) {
    if (!el) return null;
    ensureInitBaselineAttrs(el);
    const selector = getUniqueSelector(el);
    return {
      selector,
      styleAttr: el.getAttribute('style'),
      classAttr: el.getAttribute('class'),
      innerHTML: el.innerHTML,
      dx: el.getAttribute('data-ui-dx'),
      dy: el.getAttribute('data-ui-dy'),
      rot: el.getAttribute('data-ui-rot'),
      scale: el.getAttribute('data-ui-scale'),
      origText: el.getAttribute('data-ui-orig-text'),
      editRec: cloneEditRecord(state.editsMap.get(selector))
    };
  }

  function restoreElementState(doc, snap) {
    if (!doc || !snap || !snap.selector) return null;
    const el = doc.querySelector(snap.selector);
    if (!el) return null;

    if (snap.styleAttr === null || snap.styleAttr === undefined) el.removeAttribute('style');
    else el.setAttribute('style', snap.styleAttr);

    if (snap.classAttr === null || snap.classAttr === undefined) el.removeAttribute('class');
    else el.setAttribute('class', snap.classAttr);

    if (snap.innerHTML !== undefined && snap.innerHTML !== null && el.innerHTML !== snap.innerHTML) {
      el.innerHTML = snap.innerHTML;
    }

    const syncAttr = (attrName, val) => {
      if (val === null || val === undefined) el.removeAttribute(attrName);
      else el.setAttribute(attrName, val);
    };
    syncAttr('data-ui-dx', snap.dx);
    syncAttr('data-ui-dy', snap.dy);
    syncAttr('data-ui-rot', snap.rot);
    syncAttr('data-ui-scale', snap.scale);
    syncAttr('data-ui-orig-text', snap.origText);

    if (snap.editRec) {
      state.editsMap.set(snap.selector, cloneEditRecord(snap.editRec));
    } else {
      state.editsMap.delete(snap.selector);
    }
    return el;
  }

  let styleBurstBeforeSnap = null;
  let styleBurstEl = null;
  let styleBurstTimer = null;
  let styleOverlayRaf = null;

  function applyStyleProperty(el, prop, value, recordHistory = true) {
    if (!el) return;
    endHoverPreview();

    if (recordHistory && (!styleBurstBeforeSnap || styleBurstEl !== el)) {
      styleBurstBeforeSnap = captureElementState(el);
      styleBurstEl = el;
    }

    const rec = ensureEditRecord(el);

    if (value === '' || value === null) {
      el.style.removeProperty(prop);
      delete rec.styles[prop];
    } else {
      el.style.setProperty(prop, value, 'important');
      rec.styles[prop] = value;
    }

    if (!styleOverlayRaf) {
      styleOverlayRaf = requestAnimationFrame(() => {
        styleOverlayRaf = null;
        updateOverlayPosition();
        updateLiveCoordsReadout(el);
      });
    }

    if (recordHistory) {
      if (styleBurstTimer) clearTimeout(styleBurstTimer);
      styleBurstTimer = setTimeout(() => {
        if (styleBurstBeforeSnap && styleBurstEl === el) {
          const afterSnap = captureElementState(el);
          pushUndoAction({
            type: 'snapshot',
            selector: rec.selector,
            before: styleBurstBeforeSnap,
            after: afterSnap
          });
          styleBurstBeforeSnap = null;
          styleBurstEl = null;
          updateHistoryUI();
        }
      }, 180);
    }
  }

  function pushUndoAction(action) {
    state.undoStack.push(action);
    state.redoStack = [];
    syncUndoRedoButtons();
  }

  function syncUndoRedoButtons() {
    dom.btnUndo.disabled = state.undoStack.length === 0;
    dom.btnRedo.disabled = state.redoStack.length === 0;
  }

  function performUndo() {
    endHoverPreview();
    clearPreviewAddBlock();
    const action = state.undoStack.pop();
    if (!action) {
      showToast('Không còn bước nào để hoàn tác (Ctrl+Z)', 'ℹ️');
      return;
    }
    state.redoStack.push(action);
    const doc = dom.iframe.contentDocument;
    if (!doc) return;

    if (action.type === 'snapshot') {
      const el = restoreElementState(doc, action.before);
      selectElement(el);
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã hoàn tác (Ctrl+Z)', '↩️');
      return;
    }

    if (action.type === 'add_node' && action.nodeInfo) {
      const target = doc.querySelector(`[data-ui-custom-id="${action.nodeInfo.id}"]`);
      if (target) target.remove();
      state.addedNodes = state.addedNodes.filter(n => n.id !== action.nodeInfo.id);
      selectElement(null);
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã hoàn tác chèn khối (Ctrl+Z)', '↩️');
      return;
    }

    if (action.type === 'remove_added_node' && action.nodeInfo) {
      const parent = doc.querySelector(action.nodeInfo.parentSelector) || doc.body;
      const temp = doc.createElement('div');
      temp.innerHTML = action.nodeInfo.html;
      const restoredEl = temp.firstElementChild;
      if (restoredEl) {
        parent.appendChild(restoredEl);
        state.addedNodes.push(action.nodeInfo);
        selectElement(restoredEl);
      }
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã khôi phục khối vừa xóa (Ctrl+Z)', '↩️');
      return;
    }

    const el = doc.querySelector(action.selector);
    if (!el) {
      syncUndoRedoButtons();
      return;
    }

    if (action.type === 'move') {
      applyElementPosition(el, action.prevDx, action.prevDy, action.prevRot, action.prevScale);
    } else if (action.type === 'style') {
      applyStyleProperty(el, action.prop, action.prevValue, false);
    } else if (action.type === 'text') {
      el.innerText = action.prevText;
      const rec = ensureEditRecord(el);
      rec.textChanged = action.prevText;
    } else if (action.type === 'delete') {
      el.style.removeProperty('display');
      const rec = ensureEditRecord(el);
      rec.deleted = false;
      delete rec.styles['display'];
    }

    selectElement(el);
    buildDomTree();
    syncUndoRedoButtons();
    updateHistoryUI();
    showToast('Đã hoàn tác (Ctrl+Z)', '↩️');
  }

  function performRedo() {
    endHoverPreview();
    clearPreviewAddBlock();
    const action = state.redoStack.pop();
    if (!action) {
      showToast('Không còn bước nào để làm lại (Ctrl+Y)', 'ℹ️');
      return;
    }
    state.undoStack.push(action);
    const doc = dom.iframe.contentDocument;
    if (!doc) return;

    if (action.type === 'snapshot') {
      const el = restoreElementState(doc, action.after);
      selectElement(el);
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã làm lại (Ctrl+Y)', '↪️');
      return;
    }

    if (action.type === 'add_node' && action.nodeInfo) {
      const parent = doc.querySelector(action.nodeInfo.parentSelector) || doc.body;
      const temp = doc.createElement('div');
      temp.innerHTML = action.nodeInfo.html;
      const restoredEl = temp.firstElementChild;
      if (restoredEl) {
        parent.appendChild(restoredEl);
        state.addedNodes.push(action.nodeInfo);
        selectElement(restoredEl);
      }
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã làm lại chèn khối (Ctrl+Y)', '↪️');
      return;
    }

    if (action.type === 'remove_added_node' && action.nodeInfo) {
      const target = doc.querySelector(`[data-ui-custom-id="${action.nodeInfo.id}"]`);
      if (target) target.remove();
      state.addedNodes = state.addedNodes.filter(n => n.id !== action.nodeInfo.id);
      selectElement(null);
      buildDomTree();
      syncUndoRedoButtons();
      updateHistoryUI();
      showToast('Đã làm lại xóa khối (Ctrl+Y)', '↪️');
      return;
    }

    const el = doc.querySelector(action.selector);
    if (!el) {
      syncUndoRedoButtons();
      return;
    }

    if (action.type === 'move') {
      applyElementPosition(el, action.newDx, action.newDy, action.newRot, action.newScale);
    } else if (action.type === 'style') {
      applyStyleProperty(el, action.prop, action.newValue, false);
    } else if (action.type === 'text') {
      el.innerText = action.newText;
      const rec = ensureEditRecord(el);
      rec.textChanged = action.newText;
    } else if (action.type === 'delete') {
      el.style.setProperty('display', 'none', 'important');
      const rec = ensureEditRecord(el);
      rec.deleted = true;
      rec.styles['display'] = 'none';
    }

    selectElement(el);
    buildDomTree();
    syncUndoRedoButtons();
    updateHistoryUI();
    showToast('Đã làm lại (Ctrl+Y)', '↪️');
  }

  // ==================== LIVE HOVER PREVIEW ENGINE (FONT, COLOR, GRADIENT, SHADOW, LAYOUT, ADD BLOCK, FULL FX MORPH) ====================
  let activeHoverBackup = null; // { el, styleAttr, classAttr, innerHTML }
  let activeGhostBlockEl = null;

  function showLivePreviewIndicator(label) {
    if (!dom.livePreviewBadge) return;
    if (!label) {
      dom.livePreviewBadge.classList.add('hidden');
    } else {
      dom.livePreviewBadge.textContent = `👁️ Xem thử: ${label}`;
      dom.livePreviewBadge.classList.remove('hidden');
    }
  }

  function ensureHoverBackupBaseline(el) {
    if (!el) return;
    ensureInitBaselineAttrs(el);
    if (!activeHoverBackup || activeHoverBackup.el !== el) {
      activeHoverBackup = {
        el,
        styleAttr: el.getAttribute('style'),
        classAttr: el.getAttribute('class'),
        innerHTML: el.innerHTML
      };
    } else {
      if (activeHoverBackup.styleAttr === null) el.removeAttribute('style');
      else el.setAttribute('style', activeHoverBackup.styleAttr);

      if (activeHoverBackup.classAttr === null) el.removeAttribute('class');
      else el.setAttribute('class', activeHoverBackup.classAttr);

      if (activeHoverBackup.innerHTML !== undefined && el.innerHTML !== activeHoverBackup.innerHTML) {
        el.innerHTML = activeHoverBackup.innerHTML;
      }
    }
  }

  /**
   * Temporarily applies CSS properties or position offsets to `state.selectedEl` on mouseenter
   * without mutating `state.editsMap` or `state.undoStack`. Reverts 100% cleanly on mouseleave!
   */
  function startHoverPreview(stylePropsMap, previewLabel = '') {
    const el = state.selectedEl;
    if (!el || state.mode !== 'edit') return;

    ensureHoverBackupBaseline(el);

    Object.entries(stylePropsMap).forEach(([prop, val]) => {
      if (val === null || val === undefined || val === '' || val === '__ORIGINAL__') {
        el.style.removeProperty(prop);
      } else {
        el.style.setProperty(prop, val, 'important');
      }
    });

    showLivePreviewIndicator(previewLabel);
    updateOverlayPosition();
  }

  function endHoverPreview() {
    if (activeHoverBackup && activeHoverBackup.el) {
      const { el, styleAttr, classAttr, innerHTML } = activeHoverBackup;
      if (styleAttr === null) el.removeAttribute('style');
      else el.setAttribute('style', styleAttr);

      if (classAttr === null) el.removeAttribute('class');
      else el.setAttribute('class', classAttr);

      if (innerHTML !== undefined && el.innerHTML !== innerHTML) {
        el.innerHTML = innerHTML;
      }
    }
    activeHoverBackup = null;
    showLivePreviewIndicator('');
    updateOverlayPosition();
  }

  function previewRawHtmlBlockOnHover(rawHtml, labelText) {
    clearPreviewAddBlock();
    const doc = dom.iframe.contentDocument;
    if (!doc || !doc.body || !rawHtml || state.mode !== 'edit') return;

    const container = state.selectedEl && state.selectedEl !== doc.body
      ? state.selectedEl.parentElement || doc.body
      : doc.body;

    const temp = doc.createElement('div');
    temp.innerHTML = rawHtml;
    const ghostEl = temp.firstElementChild;
    if (!ghostEl) return;

    ghostEl.setAttribute('data-studio-ignore', 'true');
    ghostEl.style.setProperty('outline', '2px dashed #a855f7', 'important');
    ghostEl.style.setProperty('outline-offset', '4px', 'important');
    ghostEl.style.setProperty('pointer-events', 'none', 'important');

    if (state.selectedEl && state.selectedEl.parentElement === container) {
      state.selectedEl.insertAdjacentElement('afterend', ghostEl);
    } else {
      container.appendChild(ghostEl);
    }

    activeGhostBlockEl = ghostEl;
    showLivePreviewIndicator(`Chèn thử "${labelText}"`);
    updateOverlayPosition();
  }

  function previewAddBlockOnHover(type, labelText) {
    if (!ELEMENT_TEMPLATES[type]) return;
    previewRawHtmlBlockOnHover(ELEMENT_TEMPLATES[type], labelText);
  }

  function clearPreviewAddBlock() {
    if (activeGhostBlockEl) {
      activeGhostBlockEl.remove();
      activeGhostBlockEl = null;
      showLivePreviewIndicator('');
      updateOverlayPosition();
    }
  }

  const CDN_DEFINITIONS = {
    tailwind: {
      name: 'Tailwind CSS Play CDN',
      js: 'https://cdn.tailwindcss.com'
    },
    bootstrap5: {
      name: 'Bootstrap 5.3',
      css: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      js: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
    },
    fontawesome: {
      name: 'Font Awesome 6.5',
      css: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    },
    gsap: {
      name: 'Animate.css 4 + GSAP 3',
      css: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      js: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    },
    swiper: {
      name: 'Swiper 11 Slider',
      css: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      js: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
    }
  };

  function syncLibraryCssEverywhere(iframeDoc = null) {
    const combinedCss = (window.STUDIO_LIB_COMPONENTS_CSS || '') + '\n' + (state.customExtraCss || '');
    // 1. Host document (for preview stages in sidebar & modal)
    let hostStyle = document.getElementById('__ui_studio_libs_css_host__');
    if (!hostStyle) {
      hostStyle = document.createElement('style');
      hostStyle.id = '__ui_studio_libs_css_host__';
      document.head.appendChild(hostStyle);
    }
    if (hostStyle.textContent !== combinedCss) {
      hostStyle.textContent = combinedCss;
    }

    // 2. Iframe document (for live preview & inserted components on user's webpage)
    const doc = iframeDoc || (dom.iframe && dom.iframe.contentDocument);
    if (doc && doc.head) {
      let iframeLibStyle = doc.getElementById('__ui_studio_libs_css__');
      if (!iframeLibStyle) {
        iframeLibStyle = doc.createElement('style');
        iframeLibStyle.id = '__ui_studio_libs_css__';
        iframeLibStyle.setAttribute('data-studio-ignore', 'true');
        doc.head.appendChild(iframeLibStyle);
      }
      if (iframeLibStyle.textContent !== combinedCss) {
        iframeLibStyle.textContent = combinedCss;
      }
    }
  }

  function applyInjectedCdnsToDoc(doc) {
    if (!doc || !doc.head) return;
    state.injectedCdns.forEach(cdnKey => {
      const def = CDN_DEFINITIONS[cdnKey];
      if (!def) return;
      if (def.css && !doc.getElementById(`__uilib_cdn_css_${cdnKey}`)) {
        const link = doc.createElement('link');
        link.id = `__uilib_cdn_css_${cdnKey}`;
        link.rel = 'stylesheet';
        link.href = def.css;
        link.setAttribute('data-studio-ignore', 'true');
        doc.head.appendChild(link);
      }
      if (def.js && !doc.getElementById(`__uilib_cdn_js_${cdnKey}`)) {
        const script = doc.createElement('script');
        script.id = `__uilib_cdn_js_${cdnKey}`;
        script.src = def.js;
        script.setAttribute('data-studio-ignore', 'true');
        doc.head.appendChild(script);
      }
    });
  }

  // ==================== OVERLAY & DRAG/RESIZE ENGINE INSIDE IFRAME ====================
  let overlayRefs = null;
  let dragSession = null;

  function injectStudioOverlay(doc) {
    // Remove old overlay if present
    const existing = doc.getElementById('__ui_studio_overlay_root__');
    if (existing) existing.remove();

    // Baseline attributes (data-ui-init-style / data-ui-init-class) are captured lazily
    // in ensureInitBaselineAttrs(el) when an element is actually hovered or edited!

    // Inject Google Fonts catalog into iframe <head> so all Font Picker options render genuinely on hover!
    if (window.STUDIO_GOOGLE_FONTS_URL && !doc.getElementById('__ui_studio_google_fonts__')) {
      const fontLink = doc.createElement('link');
      fontLink.id = '__ui_studio_google_fonts__';
      fontLink.rel = 'stylesheet';
      fontLink.href = window.STUDIO_GOOGLE_FONTS_URL;
      fontLink.setAttribute('data-studio-ignore', 'true');
      doc.head.appendChild(fontLink);
    }

    // Inject UI Libraries Keyframes & CSS + active CDNs
    syncLibraryCssEverywhere(doc);
    applyInjectedCdnsToDoc(doc);

    // Inject helper stylesheet for Studio UI inside iframe
    let styleEl = doc.getElementById('__ui_studio_internal_css__');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = '__ui_studio_internal_css__';
      styleEl.setAttribute('data-studio-ignore', 'true');
      doc.head.appendChild(styleEl);
    }

    updateBypassLoaderStyles(doc);

    const root = doc.createElement('div');
    root.id = '__ui_studio_overlay_root__';
    root.setAttribute('data-studio-ignore', 'true');
    root.innerHTML = `
      <style>
        #__ui_studio_overlay_root__ {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2147483640;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .__ui_hover_box {
          position: fixed;
          border: 1.5px dashed #8b5cf6;
          background: rgba(139, 92, 246, 0.04);
          pointer-events: none;
          display: none;
          border-radius: 3px;
          transition: none;
        }
        .__ui_hover_label {
          position: absolute;
          top: -23px;
          left: -1px;
          background: rgba(9, 9, 11, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #f4f4f5;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 5px;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }
        .__ui_select_box {
          position: fixed;
          border: 1.5px solid #8b5cf6;
          background: rgba(139, 92, 246, 0.025);
          pointer-events: none;
          display: none;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22);
        }
        .__ui_select_hud {
          position: absolute;
          top: -34px;
          left: -2px;
          background: rgba(9, 9, 11, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #fafafa;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 5px;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          gap: 3px;
          pointer-events: auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .__ui_hud_info {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          color: #c4b5fd;
          padding: 0 6px 0 3px;
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          margin-right: 2px;
        }
        .__ui_hud_btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 22px;
          background: transparent;
          border: 1px solid transparent;
          color: #d4d4d8;
          font-size: 10.5px;
          font-weight: 500;
          padding: 0 6px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.12s ease;
        }
        .__ui_hud_btn svg {
          width: 11.5px;
          height: 11.5px;
          stroke-width: 2;
          flex-shrink: 0;
        }
        .__ui_hud_btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .__ui_hud_btn--warn {
          color: #fcd34d;
        }
        .__ui_hud_btn--warn:hover {
          background: rgba(245, 158, 11, 0.18);
          border-color: rgba(245, 158, 11, 0.35);
          color: #fde68a;
        }
        .__ui_hud_btn--danger {
          color: #fda4af;
        }
        .__ui_hud_btn--danger:hover {
          background: rgba(244, 63, 94, 0.2);
          border-color: rgba(244, 63, 94, 0.4);
          color: #fecdd3;
        }
        .__ui_handle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffffff;
          border: 1.5px solid #8b5cf6;
          border-radius: 2.5px;
          pointer-events: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
          transition: transform 0.12s ease, background 0.12s ease;
        }
        .__ui_handle:hover {
          background: #8b5cf6;
          transform: scale(1.25);
        }
        .__ui_handle--nw { top: -4.5px; left: -4.5px; cursor: nwse-resize; }
        .__ui_handle--n  { top: -4.5px; left: calc(50% - 4px); cursor: ns-resize; }
        .__ui_handle--ne { top: -4.5px; right: -4.5px; cursor: nesw-resize; }
        .__ui_handle--e  { top: calc(50% - 4px); right: -4.5px; cursor: ew-resize; }
        .__ui_handle--se { bottom: -4.5px; right: -4.5px; cursor: nwse-resize; }
        .__ui_handle--s  { bottom: -4.5px; left: calc(50% - 4px); cursor: ns-resize; }
        .__ui_handle--sw { bottom: -4.5px; left: -4.5px; cursor: nesw-resize; }
        .__ui_handle--w  { top: calc(50% - 4px); left: -4.5px; cursor: ew-resize; }

        .__ui_snap_line_v, .__ui_snap_line_h {
          position: fixed;
          background: #ec4899;
          pointer-events: none;
          display: none;
          z-index: 2147483645;
        }
        .__ui_snap_line_v { width: 1px; top: 0; bottom: 0; }
        .__ui_snap_line_h { height: 1px; left: 0; right: 0; }

        [contenteditable="true"].__ui_inline_editing {
          outline: 2px dashed #10b981 !important;
          outline-offset: 3px !important;
          cursor: text !important;
        }
      </style>
      <div class="__ui_hover_box" id="__ui_hover_box">
        <div class="__ui_hover_label" id="__ui_hover_label"></div>
      </div>
      <div class="__ui_select_box" id="__ui_select_box">
        <div class="__ui_select_hud" id="__ui_select_hud">
          <span class="__ui_hud_info" id="__ui_hud_info">TAG</span>
          <button type="button" class="__ui_hud_btn" data-hud-act="parent" title="Chọn khối cha (Esc)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            <span data-hud-lbl="parent">Cha</span>
          </button>
          <button type="button" class="__ui_hud_btn" data-hud-act="edit" title="Sửa chữ trực tiếp (Double-click)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
            <span data-hud-lbl="edit">Sửa</span>
          </button>
          <button type="button" class="__ui_hud_btn" data-hud-act="dup" title="Nhân bản phần tử này (Ctrl+D)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span data-hud-lbl="dup">Nhân bản</span>
          </button>
          <button type="button" class="__ui_hud_btn __ui_hud_btn--warn" data-hud-act="reset" title="Khôi phục phần tử về nguyên bản gốc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            <span data-hud-lbl="reset">Gốc</span>
          </button>
          <button type="button" class="__ui_hud_btn __ui_hud_btn--danger" data-hud-act="delete" title="Xóa phần tử này khỏi trang (Delete)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            <span data-hud-lbl="delete">Xóa</span>
          </button>
        </div>
        <div class="__ui_handle __ui_handle--nw" data-resize="nw"></div>
        <div class="__ui_handle __ui_handle--n" data-resize="n"></div>
        <div class="__ui_handle __ui_handle--ne" data-resize="ne"></div>
        <div class="__ui_handle __ui_handle--e" data-resize="e"></div>
        <div class="__ui_handle __ui_handle--se" data-resize="se"></div>
        <div class="__ui_handle __ui_handle--s" data-resize="s"></div>
        <div class="__ui_handle __ui_handle--sw" data-resize="sw"></div>
        <div class="__ui_handle __ui_handle--w" data-resize="w"></div>
      </div>
      <div class="__ui_snap_line_v" id="__ui_snap_v"></div>
      <div class="__ui_snap_line_h" id="__ui_snap_h"></div>
    `;

    doc.body.appendChild(root);

    overlayRefs = {
      root,
      hoverBox: root.querySelector('#__ui_hover_box'),
      hoverLabel: root.querySelector('#__ui_hover_label'),
      selectBox: root.querySelector('#__ui_select_box'),
      selectHud: root.querySelector('#__ui_select_hud'),
      hudInfo: root.querySelector('#__ui_hud_info'),
      snapV: root.querySelector('#__ui_snap_v'),
      snapH: root.querySelector('#__ui_snap_h')
    };

    // Bind direct clicks on the floating HUD bar
    overlayRefs.selectHud.addEventListener('mousedown', e => e.stopPropagation());
    overlayRefs.selectHud.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const btn = e.target.closest('[data-hud-act]');
      if (!btn || !state.selectedEl) return;
      const act = btn.getAttribute('data-hud-act');
      if (act === 'parent' && state.selectedEl.parentElement && state.selectedEl.parentElement !== doc.body) {
        selectElement(state.selectedEl.parentElement);
      } else if (act === 'edit') {
        enableInlineTextEdit(state.selectedEl);
      } else if (act === 'dup') {
        dom.btnElDuplicate.click();
      } else if (act === 'reset') {
        dom.btnElReset.click();
      } else if (act === 'delete') {
        deleteSelectedElement();
      }
    });

    bindIframeEvents(doc);
  }

  function updateBypassLoaderStyles(doc) {
    if (!doc) return;
    let styleEl = doc.getElementById('__ui_studio_internal_css__');
    if (!styleEl) return;

    if (state.bypassLoader && state.mode === 'edit') {
      styleEl.textContent = `
        #loader, .loader, .preloader, [class*="preloader"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        .loading__fade, .anim-uni-in-up, .animate-card-3, .animate-card-2, .animate-card-4, .animate-card-5 {
          opacity: 1 !important;
          visibility: visible !important;
        }
        body.edit-mode-active * {
          cursor: grab;
        }
      `;
      doc.body.classList.add('edit-mode-active');
    } else {
      styleEl.textContent = '';
      if (doc.body) doc.body.classList.remove('edit-mode-active');
    }
  }

  function updateOverlayPosition() {
    if (!overlayRefs) return;
    const doc = dom.iframe.contentDocument;
    if (!doc || state.mode === 'preview') {
      overlayRefs.hoverBox.style.display = 'none';
      overlayRefs.selectBox.style.display = 'none';
      return;
    }

    if (state.hoveredEl && state.hoveredEl !== state.selectedEl && doc.contains(state.hoveredEl)) {
      const r = state.hoveredEl.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        overlayRefs.hoverBox.style.display = 'block';
        overlayRefs.hoverBox.style.left = `${r.left}px`;
        overlayRefs.hoverBox.style.top = `${r.top}px`;
        overlayRefs.hoverBox.style.width = `${r.width}px`;
        overlayRefs.hoverBox.style.height = `${r.height}px`;
        overlayRefs.hoverLabel.textContent = `${getFriendlyElementLabel(state.hoveredEl)} (${Math.round(r.width)}×${Math.round(r.height)})`;
      } else {
        overlayRefs.hoverBox.style.display = 'none';
      }
    } else {
      overlayRefs.hoverBox.style.display = 'none';
    }

    if (state.selectedEl && doc.contains(state.selectedEl)) {
      const r = state.selectedEl.getBoundingClientRect();
      const { dx, dy } = getElementOffsets(state.selectedEl);
      overlayRefs.selectBox.style.display = 'block';
      overlayRefs.selectBox.style.left = `${r.left}px`;
      overlayRefs.selectBox.style.top = `${r.top}px`;
      overlayRefs.selectBox.style.width = `${r.width}px`;
      overlayRefs.selectBox.style.height = `${r.height}px`;

      // Smart 4-edge HUD collision prevention
      if (r.top < 36) {
        overlayRefs.selectHud.style.top = 'auto';
        overlayRefs.selectHud.style.bottom = '-32px';
      } else {
        overlayRefs.selectHud.style.top = '-32px';
        overlayRefs.selectHud.style.bottom = 'auto';
      }

      const vw = doc.documentElement.clientWidth || 1000;
      const hudWidth = overlayRefs.selectHud.offsetWidth || 340;
      if (r.left + hudWidth > vw - 8) {
        overlayRefs.selectHud.style.left = `${Math.max(-r.left + 8, vw - r.left - hudWidth - 8)}px`;
      } else {
        overlayRefs.selectHud.style.left = '-2px';
      }

      if (overlayRefs.hudInfo) {
        overlayRefs.hudInfo.textContent = `${getFriendlyElementLabel(state.selectedEl)} (${dx >= 0 ? '+' + dx : dx}, ${dy >= 0 ? '+' + dy : dy})`;
      }
      if (overlayRefs.selectHud) {
        const tag = state.selectedEl.tagName.toLowerCase();
        const editBtn = overlayRefs.selectHud.querySelector('[data-hud-act="edit"]');
        if (editBtn) {
          editBtn.style.display = ['img', 'svg', 'video', 'canvas', 'input', 'select'].includes(tag) ? 'none' : 'inline-flex';
        }
        const lang = (window.getStudioLang && window.getStudioLang()) || localStorage.getItem('studio_lang') || 'vi';
        const hudLabels = lang === 'en'
          ? { parent: 'Parent', edit: 'Edit', dup: 'Duplicate', reset: 'Reset', delete: 'Delete' }
          : { parent: 'Cha', edit: 'Sửa', dup: 'Nhân bản', reset: 'Gốc', delete: 'Xóa' };
        Object.keys(hudLabels).forEach(k => {
          const sp = overlayRefs.selectHud.querySelector(`[data-hud-lbl="${k}"]`);
          if (sp && sp.textContent !== hudLabels[k]) sp.textContent = hudLabels[k];
        });
      }
    } else {
      overlayRefs.selectBox.style.display = 'none';
    }
  }

  function updateLiveCoordsReadout(el) {
    if (!el) {
      dom.liveCoordsReadout.textContent = 'X: 0px | Y: 0px | W: -- | H: --';
      return;
    }
    const r = el.getBoundingClientRect();
    const { dx, dy } = getElementOffsets(el);
    dom.liveCoordsReadout.textContent = `X: ${dx}px | Y: ${dy}px | W: ${Math.round(r.width)}px | H: ${Math.round(r.height)}px`;
    dom.propX.value = dx;
    dom.propY.value = dy;
  }

  function bindIframeEvents(doc) {
    const win = doc.defaultView;
    let overlayRafId = null;
    const scheduleOverlayUpdate = () => {
      if (overlayRafId) return;
      overlayRafId = requestAnimationFrame(() => {
        overlayRafId = null;
        updateOverlayPosition();
      });
    };

    win.addEventListener('scroll', scheduleOverlayUpdate, { passive: true });
    win.addEventListener('resize', scheduleOverlayUpdate, { passive: true });

    // Prevent default navigation on click in Edit Mode
    doc.addEventListener('click', e => {
      if (state.mode !== 'edit') return;
      if (e.target.closest('[data-studio-ignore="true"]')) return;
      const link = e.target.closest('a, button, input[type="submit"]');
      if (link) {
        e.preventDefault();
      }
    }, true);

    // Hover highlight (zero-thrash: skip when cursor stays on the same target)
    let lastRawTarget = null;
    doc.addEventListener('mousemove', e => {
      if (state.mode !== 'edit') return;

      if (dragSession) {
        handleDragMove(e);
        return;
      }

      if (e.target === lastRawTarget) return;
      lastRawTarget = e.target;

      const target = resolveSmartTarget(e.target);
      const nextHovered = (target && target !== doc.body && target !== doc.documentElement)
        ? target
        : null;

      if (nextHovered === state.hoveredEl) return;
      state.hoveredEl = nextHovered;
      scheduleOverlayUpdate();
    }, true);

    // Mousedown: Start Resize OR Select & Prepare Free Drag
    doc.addEventListener('mousedown', e => {
      if (state.mode !== 'edit' || e.button !== 0) return;

      // Check if clicking one of the 8 resize handles
      const handle = e.target.closest('[data-resize]');
      if (handle && state.selectedEl) {
        e.preventDefault();
        e.stopPropagation();
        const rect = state.selectedEl.getBoundingClientRect();
        const { dx, dy } = getElementOffsets(state.selectedEl);
        dragSession = {
          type: 'resize',
          dir: handle.getAttribute('data-resize'),
          el: state.selectedEl,
          startSnap: captureElementState(state.selectedEl),
          startX: e.clientX,
          startY: e.clientY,
          startW: rect.width,
          startH: rect.height,
          startDx: dx,
          startDy: dy,
          hasMoved: false
        };
        return;
      }

      if (e.target.closest('[data-studio-ignore="true"]')) return;

      // Ignore if currently inline-editing text inside this element
      if (state.selectedEl && state.selectedEl.getAttribute('contenteditable') === 'true' && state.selectedEl.contains(e.target)) {
        return;
      }

      const target = e.altKey ? e.target : resolveSmartTarget(e.target);
      if (!target || target === doc.body || target === doc.documentElement) {
        selectElement(null);
        return;
      }

      e.preventDefault();
      selectElement(target);

      const { dx, dy, rot, scale } = getElementOffsets(target);
      const rect = target.getBoundingClientRect();

      // Gather sibling rects for smart alignment snapping
      const siblingRects = [];
      if (target.parentElement) {
        Array.from(target.parentElement.children).forEach(sib => {
          if (sib !== target && !sib.hasAttribute('data-studio-ignore')) {
            const sr = sib.getBoundingClientRect();
            if (sr.width > 4 && sr.height > 4) siblingRects.push(sr);
          }
        });
      }

      dragSession = {
        type: 'move',
        el: target,
        startSnap: captureElementState(target),
        startX: e.clientX,
        startY: e.clientY,
        startDx: dx,
        startDy: dy,
        startRot: rot,
        startScale: scale,
        startRect: rect,
        siblingRects,
        hasMoved: false
      };
    }, true);

    doc.addEventListener('mouseup', () => {
      finishDragSession();
    }, true);

    window.addEventListener('mouseup', () => {
      finishDragSession();
    });

    // Double-Click for Direct Inline Text Editing!
    doc.addEventListener('dblclick', e => {
      if (state.mode !== 'edit') return;
      if (e.target.closest('[data-studio-ignore="true"]')) return;

      const target = e.target;
      if (!target || target === doc.body || target === doc.documentElement) return;

      e.preventDefault();
      e.stopPropagation();

      selectElement(target);

      if (target.tagName.toLowerCase() === 'img') {
        dom.propImgSrc.focus();
        showToast('Hãy chọn ảnh mới hoặc dán link ảnh ở cột bên phải!', '🖼️');
        return;
      }

      enableInlineTextEdit(target);
    }, true);

    // Keyboard shortcuts inside iframe
    doc.addEventListener('keydown', handleGlobalKeydown);
  }

  function handleDragMove(e) {
    if (!dragSession || !dragSession.el) return;
    const deltaX = e.clientX - dragSession.startX;
    const deltaY = e.clientY - dragSession.startY;

    if (!dragSession.hasMoved && Math.hypot(deltaX, deltaY) < 3) {
      return;
    }
    dragSession.hasMoved = true;

    if (dragSession.type === 'move') {
      let newDx = Math.round(dragSession.startDx + deltaX);
      let newDy = Math.round(dragSession.startDy + deltaY);

      // Smart Alignment Snap Guides (snap within 4px to sibling edges/centers)
      let snappedV = null;
      let snappedH = null;
      const curLeft = dragSession.startRect.left + deltaX;
      const curRight = curLeft + dragSession.startRect.width;
      const curCenterX = curLeft + dragSession.startRect.width / 2;
      const curTop = dragSession.startRect.top + deltaY;
      const curBottom = curTop + dragSession.startRect.height;
      const curCenterY = curTop + dragSession.startRect.height / 2;

      const SNAP_THRESHOLD = 4;
      if (!e.shiftKey) {
        for (const sr of dragSession.siblingRects) {
          const sCenterX = sr.left + sr.width / 2;
          const sCenterY = sr.top + sr.height / 2;

          if (Math.abs(curLeft - sr.left) < SNAP_THRESHOLD) {
            newDx += Math.round(sr.left - curLeft);
            snappedV = sr.left;
          } else if (Math.abs(curCenterX - sCenterX) < SNAP_THRESHOLD) {
            newDx += Math.round(sCenterX - curCenterX);
            snappedV = sCenterX;
          } else if (Math.abs(curRight - sr.right) < SNAP_THRESHOLD) {
            newDx += Math.round(sr.right - curRight);
            snappedV = sr.right;
          }

          if (Math.abs(curTop - sr.top) < SNAP_THRESHOLD) {
            newDy += Math.round(sr.top - curTop);
            snappedH = sr.top;
          } else if (Math.abs(curCenterY - sCenterY) < SNAP_THRESHOLD) {
            newDy += Math.round(sCenterY - curCenterY);
            snappedH = sCenterY;
          } else if (Math.abs(curBottom - sr.bottom) < SNAP_THRESHOLD) {
            newDy += Math.round(sr.bottom - curBottom);
            snappedH = sr.bottom;
          }
        }
      }

      if (overlayRefs) {
        if (snappedV !== null) {
          overlayRefs.snapV.style.display = 'block';
          overlayRefs.snapV.style.left = `${snappedV}px`;
        } else {
          overlayRefs.snapV.style.display = 'none';
        }
        if (snappedH !== null) {
          overlayRefs.snapH.style.display = 'block';
          overlayRefs.snapH.style.top = `${snappedH}px`;
        } else {
          overlayRefs.snapH.style.display = 'none';
        }
      }

      applyElementPosition(dragSession.el, newDx, newDy);
    } else if (dragSession.type === 'resize') {
      const dir = dragSession.dir;
      let newW = dragSession.startW;
      let newH = dragSession.startH;
      let newDx = dragSession.startDx;
      let newDy = dragSession.startDy;

      if (dir.includes('e')) newW = Math.max(16, Math.round(dragSession.startW + deltaX));
      if (dir.includes('s')) newH = Math.max(16, Math.round(dragSession.startH + deltaY));
      if (dir.includes('w')) {
        newW = Math.max(16, Math.round(dragSession.startW - deltaX));
        newDx = Math.round(dragSession.startDx + deltaX);
      }
      if (dir.includes('n')) {
        newH = Math.max(16, Math.round(dragSession.startH - deltaY));
        newDy = Math.round(dragSession.startDy + deltaY);
      }

      const rec = ensureEditRecord(dragSession.el);
      if (dir.includes('e') || dir.includes('w')) {
        dragSession.el.style.setProperty('width', `${newW}px`, 'important');
        rec.styles['width'] = `${newW}px`;
        dom.propWidth.value = `${newW}px`;
      }
      if (dir.includes('s') || dir.includes('n')) {
        dragSession.el.style.setProperty('height', `${newH}px`, 'important');
        rec.styles['height'] = `${newH}px`;
        dom.propHeight.value = `${newH}px`;
      }
      if (dir.includes('w') || dir.includes('n')) {
        applyElementPosition(dragSession.el, newDx, newDy);
      } else {
        updateOverlayPosition();
        updateLiveCoordsReadout(dragSession.el);
      }
    }
  }

  function finishDragSession() {
    if (!dragSession) return;
    if (overlayRefs) {
      overlayRefs.snapV.style.display = 'none';
      overlayRefs.snapH.style.display = 'none';
    }
    if (dragSession.hasMoved && dragSession.el) {
      const selector = getUniqueSelector(dragSession.el);
      const afterSnap = captureElementState(dragSession.el);
      if (dragSession.startSnap && afterSnap) {
        pushUndoAction({
          type: 'snapshot',
          selector,
          before: dragSession.startSnap,
          after: afterSnap
        });
      }
      updateHistoryUI();
    }
    dragSession = null;
  }

  function enableInlineTextEdit(el) {
    const beforeSnap = captureElementState(el);
    const prevText = el.innerText;
    el.setAttribute('contenteditable', 'true');
    el.classList.add('__ui_inline_editing');
    el.focus();

    showToast('Đang sửa chữ trực tiếp — Nhấn ra ngoài hoặc Esc khi xong', '✍️');

    const onBlur = () => {
      el.removeAttribute('contenteditable');
      el.classList.remove('__ui_inline_editing');
      el.removeEventListener('blur', onBlur);
      const newText = el.innerText;
      if (newText !== prevText) {
        el.setAttribute('data-ui-orig-text', newText.trim());
        const rec = ensureEditRecord(el);
        rec.textChanged = newText;
        dom.propTextContent.value = newText;
        const afterSnap = captureElementState(el);
        pushUndoAction({
          type: 'snapshot',
          selector: rec.selector,
          before: beforeSnap,
          after: afterSnap
        });
        updateHistoryUI();
      }
    };
    el.addEventListener('blur', onBlur);
  }

  function detectElementUiCategory(el) {
    if (!el || el.nodeType !== 1) return null;
    const tag = el.tagName.toLowerCase();
    const cls = ((el.className && typeof el.className === 'string') ? el.className : '').toLowerCase();
    const id = (el.id || '').toLowerCase();
    const role = (el.getAttribute('role') || '').toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    const hint = `${tag} ${cls} ${id} ${role}`;

    if (tag === 'button' || type === 'button' || type === 'submit' || role === 'button' || /\b(btn|button|cta)\b/.test(hint)) {
      return 'button';
    }
    if (type === 'checkbox' || type === 'radio' || /\bcheckbox\b/.test(hint)) {
      if (role === 'switch' || /\b(switch|toggle)\b/.test(hint)) return 'switch';
      return 'checkbox';
    }
    if (role === 'switch' || /\b(switch|toggle)\b/.test(hint)) {
      return 'switch';
    }
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || /\b(input|search|field|prompt)\b/.test(hint)) {
      return 'input';
    }
    if (tag === 'nav' || tag === 'header' || /\b(nav|navbar|dock|menu|topbar)\b/.test(hint)) {
      return 'nav';
    }
    if (/\b(badge|pill|tag|chip|status)\b/.test(hint) || (tag === 'span' && el.textContent.trim().length < 32)) {
      return 'badge';
    }
    if (/\b(pricing|price|kpi|stat|metric)\b/.test(hint)) {
      return 'pricing';
    }
    if (/\b(modal|dialog|popup)\b/.test(hint) || role === 'dialog') {
      return 'modal';
    }
    if (/\b(tab|tabs|accordion|faq)\b/.test(hint)) {
      return 'tabs';
    }
    if (/\b(avatar|profile)\b/.test(hint) || (tag === 'img' && el.getBoundingClientRect().width <= 96)) {
      return 'avatar';
    }
    if (/\b(alert|toast|notification)\b/.test(hint)) {
      return 'alert';
    }
    if (/\b(testimonial|review|quote)\b/.test(hint)) {
      return 'testimonial';
    }
    if (/\b(card|bento|box|feature)\b/.test(hint) || tag === 'article') {
      return 'card';
    }
    if (tag === 'section' || tag === 'h1' || /\b(hero|banner)\b/.test(hint)) {
      return 'hero';
    }
    if (tag === 'a') {
      return 'button';
    }
    if (tag === 'div') {
      return 'card';
    }
    return null;
  }

  // Classify selected DOM element into 1 of 5 strict Inspector Contexts ('text' | 'button' | 'image' | 'input' | 'container')
  function detectInspectorContextType(el) {
    if (!el || !el.tagName) return 'text';
    const tag = el.tagName.toLowerCase();
    const cls = typeof el.className === 'string' ? el.className.toLowerCase() : '';
    const role = (el.getAttribute('role') || '').toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();

    // 1. Image / Media / SVG
    if (['img', 'svg', 'video', 'canvas', 'picture'].includes(tag)) {
      return 'image';
    }
    if (el.children.length === 1 && el.children[0].tagName && ['img', 'svg', 'video'].includes(el.children[0].tagName.toLowerCase()) && !(el.textContent || '').trim()) {
      return 'image';
    }

    // 2. Form Inputs & Switches
    if (['textarea', 'select'].includes(tag) || (tag === 'input' && !['button', 'submit', 'reset'].includes(type)) || role === 'switch' || role === 'checkbox') {
      return 'input';
    }

    // 3. Buttons & Action Links
    if (tag === 'button' || (tag === 'input' && ['button', 'submit', 'reset'].includes(type)) || role === 'button' || /\b(btn|button|cta)\b/.test(cls)) {
      return 'button';
    }
    if (tag === 'a') {
      const comp = el.ownerDocument && el.ownerDocument.defaultView ? el.ownerDocument.defaultView.getComputedStyle(el) : null;
      const hasBoxBg = comp && comp.backgroundColor && comp.backgroundColor !== 'rgba(0, 0, 0, 0)' && comp.backgroundColor !== 'transparent';
      const hasBorder = comp && parseFloat(comp.borderTopWidth) > 0 && comp.borderTopStyle !== 'none';
      if (hasBoxBg || hasBorder || el.children.length > 0) return 'button';
      return 'text';
    }

    // 4. Pure Text & Typography Elements
    const TEXT_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'label', 'strong', 'em', 'b', 'i', 'small', 'blockquote', 'code', 'pre', 'li', 'dt', 'dd', 'figcaption']);
    if (TEXT_TAGS.has(tag)) {
      return 'text';
    }
    if (el.children.length === 0 && (el.textContent || '').trim().length > 0 && !/\b(card|bento|box|container|section|grid|row|col|panel|wrapper)\b/.test(cls)) {
      return 'text';
    }

    // 5. Containers, Cards, Sections & Layout Wrappers
    return 'container';
  }

  // Dynamically show ONLY the controls relevant to the selected element's Context Type across all 3 Inspector tabs
  function syncInspectorPanesByContext(el, contextType) {
    // 1. Sync Tab 1: ReactBits Customize Panel
    if (window.syncReactBitsToSelectedElement && typeof window.syncReactBitsToSelectedElement === 'function') {
      window.syncReactBitsToSelectedElement(el, contextType);
    }

    // 2. Sync Tab 2: Design, Typography, Colors & Shaders (#insp-pane-design)
    const designPane = document.getElementById('insp-pane-design');
    if (designPane) {
      const designGroups = designPane.querySelectorAll(':scope > .prop-group');
      const typoGroup = designGroups[0];
      const colorGroup = designGroups[1];
      const borderGroup = designGroups[2];
      const shaderGroup = designGroups[3];

      // A. Content & Typography Group
      if (typoGroup) {
        const textField = document.getElementById('text-content-group');
        const imgField = document.getElementById('image-src-group');
        const typoRows = typoGroup.querySelectorAll('.prop-row-2col, .slider-row');
        const isLeafText = el && (el.children.length === 0 || ['text', 'button'].includes(contextType));

        if (contextType === 'image') {
          if (textField) textField.classList.add('hidden');
          if (imgField) imgField.classList.remove('hidden');
          typoRows.forEach(r => r.classList.add('hidden'));
        } else if (contextType === 'container') {
          if (textField) textField.classList.toggle('hidden', !isLeafText);
          if (imgField) imgField.classList.add('hidden');
          typoRows.forEach(r => r.classList.remove('hidden'));
        } else if (contextType === 'input') {
          if (textField) textField.classList.add('hidden');
          if (imgField) imgField.classList.add('hidden');
          typoRows.forEach(r => r.classList.remove('hidden'));
        } else {
          // 'text' or 'button'
          if (textField) textField.classList.remove('hidden');
          if (imgField) imgField.classList.add('hidden');
          typoRows.forEach(r => r.classList.remove('hidden'));
        }
      }

      // B. Colors & Gradients Group
      if (colorGroup) {
        const colorBlocks = colorGroup.querySelectorAll('.color-control-block');
        const textColorBlock = colorBlocks[0];
        const bgColorBlock = colorBlocks[1];
        const gradBlock = document.getElementById('gradient-swatches') ? document.getElementById('gradient-swatches').parentElement : null;

        if (contextType === 'text') {
          if (textColorBlock) textColorBlock.classList.remove('hidden');
          if (bgColorBlock) bgColorBlock.classList.add('hidden');
          if (gradBlock) gradBlock.classList.add('hidden');
        } else if (contextType === 'image') {
          if (textColorBlock) textColorBlock.classList.add('hidden');
          if (bgColorBlock) bgColorBlock.classList.remove('hidden');
          if (gradBlock) gradBlock.classList.add('hidden');
        } else {
          if (textColorBlock) textColorBlock.classList.remove('hidden');
          if (bgColorBlock) bgColorBlock.classList.remove('hidden');
          if (gradBlock) gradBlock.classList.remove('hidden');
        }
      }

      // C. Border, Radius & Box Shadow Group (Hidden for pure text elements!)
      if (borderGroup) {
        borderGroup.classList.toggle('hidden', contextType === 'text');
      }

      // D. Lucide Vector SVG Icons & Shaders Group
      if (shaderGroup) {
        const iconGrid = document.getElementById('fx-icon-pills');
        if (contextType === 'image' || contextType === 'input') {
          shaderGroup.classList.add('hidden');
        } else {
          shaderGroup.classList.remove('hidden');
          if (iconGrid) {
            // Only show Button SVG Icon picker for buttons/links!
            iconGrid.classList.toggle('hidden', contextType !== 'button');
          }
        }
      }
    }

    // 3. Sync Tab 3: Layout, Coordinates & Flexbox (#insp-pane-layout)
    const layoutPane = document.getElementById('insp-pane-layout');
    if (layoutPane) {
      const layoutGroups = layoutPane.querySelectorAll(':scope > .prop-group');
      const coordGroup = layoutGroups[0];
      const flexGroup = layoutGroups[2];
      if (coordGroup) {
        const whRow = document.getElementById('prop-width') ? document.getElementById('prop-width').closest('.prop-row-2col') : null;
        if (whRow) {
          // Pure text flows naturally; hide box Width/Height inputs for text
          whRow.classList.toggle('hidden', contextType === 'text');
        }
      }
      if (flexGroup) {
        // Flexbox alignment only applies to containers & buttons
        flexGroup.classList.toggle('hidden', contextType !== 'container' && contextType !== 'button');
      }
    }
  }

  // ==================== ELEMENT SELECTION & INSPECTOR SYNC ====================
  function selectElement(el) {
    state.selectedEl = el;
    const prevAutoCat = state.autoDetectedCategory;

    if (!el) {
      state.selectedSelector = null;
      state.autoDetectedCategory = null;
      if (dom.uilibDetectedBanner) dom.uilibDetectedBanner.classList.add('hidden');
      dom.selectedTagBadge.textContent = 'NONE';
      dom.selectedSelectorLabel.textContent = 'Chưa chọn phần tử nào';
      dom.statusBreadcrumb.textContent = 'Chưa chọn phần tử nào';
      dom.inspectorEmpty.classList.remove('hidden');
      dom.inspectorControls.classList.add('hidden');
      dom.btnElParent.disabled = true;
      dom.btnElDuplicate.disabled = true;
      dom.btnElReset.disabled = true;
      dom.btnElDelete.disabled = true;
      updateOverlayPosition();
      updateLiveCoordsReadout(null);
      highlightTreeNode(null);
      if (state.autoMatchSelectedEl && prevAutoCat !== null && typeof renderSidebarUiLibraries === 'function') {
        renderSidebarUiLibraries();
      }
      if (window.translateDynamicStudioNodes) window.translateDynamicStudioNodes();
      return;
    }

    const selector = getUniqueSelector(el);
    state.selectedSelector = selector;
    const tag = el.tagName.toLowerCase();

    // Auto-detect UI category for Left Sidebar when clicking any element on the page!
    if (state.autoMatchSelectedEl) {
      const detectedCat = detectElementUiCategory(el);
      state.autoDetectedCategory = detectedCat;
      if (detectedCat && dom.uilibDetectedBanner && dom.uilibDetectedText) {
        const taxonomy = (window.STUDIO_NAMETHAT_CATEGORIES || []).find(t => t.id === detectedCat);
        const lang = (window.getStudioLang && window.getStudioLang()) || localStorage.getItem('studio_lang') || 'vi';
        const catLabel = taxonomy
          ? (lang === 'en' ? taxonomy.name : `${taxonomy.name} (${taxonomy.vnName})`)
          : detectedCat.toUpperCase();
        const targetSvg = '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
        dom.uilibDetectedText.innerHTML = lang === 'en'
          ? `${targetSvg} Selected <code>&lt;${tag}&gt;</code> → <strong>${catLabel}</strong>`
          : `${targetSvg} Đang chọn <code>&lt;${tag}&gt;</code> ➔ <strong>${catLabel}</strong>`;
        dom.uilibDetectedBanner.classList.remove('hidden');
      } else if (dom.uilibDetectedBanner) {
        dom.uilibDetectedBanner.classList.add('hidden');
      }
      if (detectedCat !== prevAutoCat && typeof renderSidebarUiLibraries === 'function') {
        renderSidebarUiLibraries();
      }
    }

    const contextType = detectInspectorContextType(el);
    const contextBadgeLabels = {
      text: 'TEXT',
      button: 'BUTTON',
      image: 'MEDIA',
      input: 'INPUT',
      container: 'BOX'
    };
    dom.selectedTagBadge.textContent = `${tag.toUpperCase()} • ${contextBadgeLabels[contextType] || 'EL'}`;
    dom.selectedSelectorLabel.textContent = getFriendlyElementLabel(el);
    dom.selectedSelectorLabel.title = selector;

    // Build clickable breadcrumb in status bar
    buildStatusBreadcrumb(el);

    dom.inspectorEmpty.classList.add('hidden');
    dom.inspectorControls.classList.remove('hidden');
    dom.btnElParent.disabled = !el.parentElement || el.parentElement.tagName.toLowerCase() === 'body';
    dom.btnElDuplicate.disabled = false;
    dom.btnElReset.disabled = false;
    dom.btnElDelete.disabled = false;

    // Populate Inspector fields from computed styles & saved attributes
    const win = el.ownerDocument.defaultView;
    const comp = win.getComputedStyle(el);
    const { dx, dy, rot, scale } = getElementOffsets(el);

    dom.propX.value = dx;
    dom.propY.value = dy;
    dom.propRotate.value = rot;
    dom.propScale.value = scale;
    dom.propWidth.value = el.style.width || `${Math.round(el.getBoundingClientRect().width)}px`;
    dom.propHeight.value = el.style.height || `${Math.round(el.getBoundingClientRect().height)}px`;
    dom.propZIndex.value = comp.zIndex === 'auto' ? '' : comp.zIndex;

    const textColorHex = rgbToHex(comp.color);
    dom.propColorPicker.value = textColorHex;
    dom.propColorHex.value = textColorHex;

    const bgColorHex = rgbToHex(comp.backgroundColor);
    dom.propBgPicker.value = bgColorHex;
    dom.propBgHex.value = comp.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'transparent' : bgColorHex;

    const opacityPct = Math.round((parseFloat(comp.opacity) || 1) * 100);
    dom.propOpacitySlider.value = opacityPct;
    dom.propOpacityVal.textContent = `${opacityPct}%`;

    // Text Content (only for leaf/text-bearing nodes)
    const directText = el.innerText ? el.innerText.trim() : '';
    dom.propTextContent.value = directText.slice(0, 500);

    // Image Src
    if (tag === 'img') {
      dom.imageSrcGroup.classList.remove('hidden');
      dom.propImgSrc.value = el.getAttribute('src') || '';
    } else {
      const childImg = el.querySelector('img');
      if (childImg) {
        dom.imageSrcGroup.classList.remove('hidden');
        dom.propImgSrc.value = childImg.getAttribute('src') || '';
      } else {
        dom.imageSrcGroup.classList.add('hidden');
      }
    }

    // Link Href
    const anchor = tag === 'a' ? el : el.closest('a');
    if (anchor) {
      dom.linkHrefGroup.classList.remove('hidden');
      dom.propLinkHref.value = anchor.getAttribute('href') || '';
    } else {
      dom.linkHrefGroup.classList.add('hidden');
    }

    // Typography
    const fontSize = parsePx(comp.fontSize) || 16;
    dom.propFontsizeSlider.value = Math.min(120, fontSize);
    dom.propFontsizeNum.value = fontSize;
    const rawFont = (comp.fontFamily || '').toLowerCase();
    let matchedFontVal = '';
    Array.from(dom.propFontFamily.options).forEach(opt => {
      if (!opt.value) return;
      const primaryName = opt.value.split(',')[0].replace(/['"]/g, '').trim().toLowerCase();
      if (primaryName && rawFont.includes(primaryName)) {
        matchedFontVal = opt.value;
      }
    });
    dom.propFontFamily.value = matchedFontVal;
    dom.propFontWeight.value = comp.fontWeight || '';
    dom.propLetterSpacing.value = parsePx(comp.letterSpacing);

    // Border & Radius
    const radius = parsePx(comp.borderRadius);
    dom.propRadiusSlider.value = Math.min(64, radius);
    dom.propRadiusNum.value = radius;
    dom.propBorderWidth.value = parsePx(comp.borderTopWidth);
    dom.propBorderStyle.value = comp.borderTopStyle || 'none';
    dom.propBorderColor.value = rgbToHex(comp.borderTopColor);

    syncAllLiveSelectTriggers();

    // Padding & Margin
    dom.propPadTop.value = parsePx(comp.paddingTop);
    dom.propPadRight.value = parsePx(comp.paddingRight);
    dom.propPadBottom.value = parsePx(comp.paddingBottom);
    dom.propPadLeft.value = parsePx(comp.paddingLeft);

    dom.propMarTop.value = parsePx(comp.marginTop);
    dom.propMarRight.value = parsePx(comp.marginRight);
    dom.propMarBottom.value = parsePx(comp.marginBottom);
    dom.propMarLeft.value = parsePx(comp.marginLeft);

    // Filter all 3 Inspector Panes (ReactBits Customize, Design & Colors, Layout & Coords) strictly by element contextType!
    syncInspectorPanesByContext(el, contextType);

    updateOverlayPosition();
    updateLiveCoordsReadout(el);
    highlightTreeNode(el);
  }

  function buildStatusBreadcrumb(el) {
    const chain = [];
    let cur = el;
    while (cur && cur.nodeType === 1 && cur.tagName.toLowerCase() !== 'body' && chain.length < 4) {
      chain.unshift(cur);
      cur = cur.parentElement;
    }
    dom.statusBreadcrumb.innerHTML = '';
    chain.forEach((node, idx) => {
      const span = document.createElement('span');
      span.style.cursor = 'pointer';
      span.style.textDecoration = node === el ? 'underline' : 'none';
      span.style.fontWeight = node === el ? '700' : '400';
      span.textContent = getFriendlyElementLabel(node);
      span.title = 'Click để chọn phần tử này';
      span.addEventListener('click', () => selectElement(node));
      dom.statusBreadcrumb.appendChild(span);
      if (idx < chain.length - 1) {
        const sep = document.createElement('span');
        sep.textContent = ' › ';
        sep.style.color = '#64748b';
        dom.statusBreadcrumb.appendChild(sep);
      }
    });
  }

  // ==================== DOM LAYERS TREE ====================
  function buildDomTree() {
    const doc = dom.iframe.contentDocument;
    if (!doc || !doc.body) return;
    const query = (dom.layerSearch.value || '').trim().toLowerCase();
    dom.domTreeContainer.innerHTML = '';
    const treeFrag = document.createDocumentFragment();

    const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'meta', 'link', 'path', 'defs', 'clippath', 'g']);

    function traverse(node, depth) {
      if (!node || node.nodeType !== 1) return;
      if (node.hasAttribute('data-studio-ignore') || node.id === 'loader') return;
      const tag = node.tagName.toLowerCase();
      if (SKIP_TAGS.has(tag)) return;

      // Skip deleted elements
      const sel = getUniqueSelector(node);
      const rec = state.editsMap.get(sel);
      if (rec && rec.deleted) return;

      const label = getFriendlyElementLabel(node);
      const shortText = (node.childNodes.length === 1 && node.firstChild.nodeType === 3)
        ? node.firstChild.textContent.trim().slice(0, 24)
        : '';

      const matchesSearch = !query ||
        label.toLowerCase().includes(query) ||
        (node.innerText && node.innerText.toLowerCase().includes(query));

      if (!query || matchesSearch) {
        const item = document.createElement('div');
        item.className = 'tree-node' + (state.selectedEl === node ? ' selected' : '');
        item.style.paddingLeft = `${Math.min(depth * 12 + 8, 96)}px`;
        item.dataset.selector = sel;

        const leftWrap = document.createElement('div');
        leftWrap.className = 'tree-node-left';
        leftWrap.innerHTML = `
          <span class="tree-tag">${tag}</span>
          <span class="tree-id">${label.slice(tag.length)}</span>
          ${shortText ? `<span class="tree-text">"${shortText}"</span>` : ''}
        `;
        item.appendChild(leftWrap);

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'tree-del-btn';
        delBtn.title = 'Xóa phần tử này';
        delBtn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';
        delBtn.addEventListener('click', e => {
          e.stopPropagation();
          selectElement(node);
          deleteSelectedElement();
        });
        item.appendChild(delBtn);

        item.addEventListener('click', () => {
          selectElement(node);
          node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        item.addEventListener('mouseenter', () => {
          state.hoveredEl = node;
          updateOverlayPosition();
        });
        item.addEventListener('mouseleave', () => {
          state.hoveredEl = null;
          updateOverlayPosition();
        });
        treeFrag.appendChild(item);
      }

      if (depth < 7) {
        Array.from(node.children).forEach(child => traverse(child, depth + 1));
      }
    }

    Array.from(doc.body.children).forEach(child => traverse(child, 0));
    dom.domTreeContainer.appendChild(treeFrag);
  }

  function highlightTreeNode(el) {
    const items = dom.domTreeContainer.querySelectorAll('.tree-node');
    const sel = el ? getUniqueSelector(el) : '';
    items.forEach(item => {
      if (item.dataset.selector === sel) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // ==================== HISTORY & AI PROMPT GENERATOR ====================
  function updateHistoryUI() {
    let activeCount = 0;
    dom.changeLogList.innerHTML = '';

    // 1. Newly added nodes
    state.addedNodes.forEach(nodeInfo => {
      const item = document.createElement('div');
      item.className = 'change-item';
      item.innerHTML = `
        <div class="change-item__top">
          <div class="change-item__selector">+ Khối mới: ${nodeInfo.id}</div>
          <button type="button" class="change-item__revert" title="Xóa khối mới thêm này">✕ Xóa</button>
        </div>
        <div class="change-item__desc">Chèn tại: ${nodeInfo.parentSelector}</div>
      `;
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const doc = dom.iframe.contentDocument;
        if (!doc) return;
        const target = doc.querySelector(`[data-ui-custom-id="${nodeInfo.id}"]`);
        if (target) {
          selectElement(target);
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      item.querySelector('.change-item__revert').addEventListener('click', e => {
        e.stopPropagation();
        const doc = dom.iframe.contentDocument;
        if (!doc) return;
        const target = doc.querySelector(`[data-ui-custom-id="${nodeInfo.id}"]`);
        if (target) {
          selectElement(target);
          deleteSelectedElement();
        }
      });
      dom.changeLogList.appendChild(item);
    });

    // 2. Modified or deleted elements
    state.editsMap.forEach(rec => {
      const styleKeys = Object.keys(rec.styles);
      if (styleKeys.length === 0 && rec.textChanged === null && Object.keys(rec.attrChanges).length === 0 && !rec.deleted) {
        return;
      }
      activeCount++;

      const item = document.createElement('div');
      item.className = 'change-item';
      const summaryParts = [];
      if (rec.deleted) {
        summaryParts.push('Đã ẩn/xóa phần tử');
      } else {
        if (rec.styles['translate']) summaryParts.push(`Dịch tọa độ: ${rec.styles['translate']}`);
        if (rec.styles['background-color'] || rec.styles['background']) {
          summaryParts.push(`Nền: ${rec.styles['background'] || rec.styles['background-color']}`);
        }
        if (rec.styles['color']) summaryParts.push(`Màu chữ: ${rec.styles['color']}`);
        if (rec.styles['font-family']) summaryParts.push(`Font: ${rec.styles['font-family']}`);
        if (rec.styles['font-size']) summaryParts.push(`Cỡ chữ: ${rec.styles['font-size']}`);
        if (rec.styles['width'] || rec.styles['height']) {
          summaryParts.push(`Kích thước: ${rec.styles['width'] || 'auto'} × ${rec.styles['height'] || 'auto'}`);
        }
        if (rec.styles['border-radius']) summaryParts.push(`Bo góc: ${rec.styles['border-radius']}`);
        if (rec.textChanged !== null) summaryParts.push(`Đổi chữ: "${rec.textChanged.slice(0, 30)}"`);
        if (summaryParts.length === 0 && styleKeys.length > 0) {
          summaryParts.push(`Chỉnh CSS: ${styleKeys.join(', ')}`);
        }
      }

      item.innerHTML = `
        <div class="change-item__top">
          <div class="change-item__selector">${rec.label || rec.selector}</div>
          <button type="button" class="change-item__revert" title="Khôi phục phần tử này về nguyên bản">↺ Gốc</button>
        </div>
        <div class="change-item__desc">${summaryParts.join(' • ')}</div>
      `;
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const doc = dom.iframe.contentDocument;
        if (!doc) return;
        const target = doc.querySelector(rec.selector);
        if (target && !rec.deleted) {
          selectElement(target);
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      item.querySelector('.change-item__revert').addEventListener('click', e => {
        e.stopPropagation();
        const doc = dom.iframe.contentDocument;
        if (!doc) return;
        const target = doc.querySelector(rec.selector);
        if (target) {
          resetElementToOriginal(target);
        }
      });
      dom.changeLogList.appendChild(item);
    });

    const totalChanges = activeCount + state.addedNodes.length;
    dom.changeCountBadge.textContent = totalChanges;
    dom.historyTotal.textContent = totalChanges;

    if (totalChanges === 0) {
      dom.changeLogList.innerHTML = `<div class="empty-state-sm">Chưa có thay đổi nào. Hãy click vào một phần tử trên trang để bắt đầu kéo thả!</div>`;
    }
  }

  function generateCssPatchString() {
    const blocks = [];
    state.editsMap.forEach(rec => {
      const entries = Object.entries(rec.styles);
      if (entries.length === 0) return;
      const rules = entries.map(([k, v]) => `  ${k}: ${v} !important;`).join('\n');
      blocks.push(`/* ${rec.label} */\n${rec.selector} {\n${rules}\n}`);
    });
    return blocks.join('\n\n');
  }

  function convertCssStylesToTailwindClasses(stylesObj = {}) {
    const classes = [];
    Object.entries(stylesObj).forEach(([prop, rawVal]) => {
      const val = String(rawVal || '').trim();
      if (!val) return;
      const safeArbitrary = val.replace(/\s+/g, '_');
      switch (prop) {
        case 'color':
          classes.push(`text-[${safeArbitrary}]`);
          break;
        case 'background-color':
          classes.push(val === 'transparent' ? 'bg-transparent' : `bg-[${safeArbitrary}]`);
          break;
        case 'background':
        case 'background-image':
          if (val !== 'none') classes.push(`bg-[${safeArbitrary}]`);
          break;
        case 'font-size':
          classes.push(`text-[${safeArbitrary}]`);
          break;
        case 'font-weight':
          classes.push(`font-[${safeArbitrary}]`);
          break;
        case 'line-height':
          classes.push(`leading-[${safeArbitrary}]`);
          break;
        case 'letter-spacing':
          classes.push(`tracking-[${safeArbitrary}]`);
          break;
        case 'text-align':
          classes.push(`text-${val}`);
          break;
        case 'border-radius':
          classes.push(`rounded-[${safeArbitrary}]`);
          break;
        case 'border-width':
          classes.push(`border-[${safeArbitrary}]`);
          break;
        case 'border-color':
          classes.push(`border-[${safeArbitrary}]`);
          break;
        case 'padding':
          classes.push(`p-[${safeArbitrary}]`);
          break;
        case 'padding-top':
          classes.push(`pt-[${safeArbitrary}]`);
          break;
        case 'padding-right':
          classes.push(`pr-[${safeArbitrary}]`);
          break;
        case 'padding-bottom':
          classes.push(`pb-[${safeArbitrary}]`);
          break;
        case 'padding-left':
          classes.push(`pl-[${safeArbitrary}]`);
          break;
        case 'margin':
          classes.push(`m-[${safeArbitrary}]`);
          break;
        case 'gap':
          classes.push(`gap-[${safeArbitrary}]`);
          break;
        case 'width':
          classes.push(`w-[${safeArbitrary}]`);
          break;
        case 'height':
          classes.push(`h-[${safeArbitrary}]`);
          break;
        case 'opacity':
          classes.push(`opacity-[${safeArbitrary}]`);
          break;
        case 'box-shadow':
          classes.push(`shadow-[${safeArbitrary}]`);
          break;
        case 'backdrop-filter':
          classes.push(`backdrop-blur-md`);
          break;
        case 'display':
          classes.push(val === 'none' ? 'hidden' : val);
          break;
        case 'justify-content':
          classes.push(`justify-${val.replace('flex-', '')}`);
          break;
        case 'align-items':
          classes.push(`items-${val.replace('flex-', '')}`);
          break;
        case 'transform': {
          const tx = val.match(/translate3d\(\s*([^,]+),\s*([^,]+)/i);
          if (tx) {
            if (tx[1].trim() !== '0px') classes.push(`translate-x-[${tx[1].trim()}]`);
            if (tx[2].trim() !== '0px') classes.push(`translate-y-[${tx[2].trim()}]`);
          }
          const rot = val.match(/rotate\(([^)]+)\)/i);
          if (rot) classes.push(`rotate-[${rot[1].trim()}]`);
          const sc = val.match(/scale\(([^)]+)\)/i);
          if (sc) classes.push(`scale-[${sc[1].trim()}]`);
          break;
        }
        default:
          classes.push(`[${prop}:${safeArbitrary}]`);
      }
    });
    return classes.join(' ');
  }

  function getActiveRepoContextSummary() {
    const doc = dom.iframe?.contentDocument;
    const bodyRepo = doc?.body?.getAttribute('data-github-repo') || '';
    const gitStatus = state.githubStatus?.git || {};
    const repoMeta = state.activeGithubRepoMeta || {};
    const repoName =
      repoMeta.fullName ||
      bodyRepo ||
      (gitStatus.repoShortName || '')
        .replace(/^https?:\/\/github\.com\//i, '')
        .replace(/\.git$/i, '') ||
      'Local Project';
    const branch = gitStatus.branch || 'main';
    const fileLabel = state.currentFile || 'index.html';
    const lang = repoMeta.language || doc?.body?.getAttribute('data-repo-lang') || 'HTML/CSS/JS';
    const sourceFiles = Array.isArray(repoMeta.sourceFiles) ? repoMeta.sourceFiles : [];
    return { repoName, branch, fileLabel, lang, sourceFiles, workspaceDir: state.workspaceDir };
  }

  function generateAiPromptText() {
    const ctx = getActiveRepoContextSummary();
    const lines = [
      `# 🎯 BẢN ĐẶC TẢ CẬP NHẬT UI/UX CHính XÁC (VISUAL UI STUDIO MAXPING SPEC)`,
      ``,
      `## 1. Bối Cảnh Dự Án & Kho Lưu Trữ (Project & Repository Context)`,
      `- **GitHub Repository**: \`${ctx.repoName}\` (Nhánh: \`${ctx.branch}\`)`,
      `- **Thư mục Local Workspace**: \`${ctx.workspaceDir}\``,
      `- **File Giao Diện Đích**: \`${ctx.fileLabel}\``,
      `- **Ngôn ngữ / Tech Stack**: \`${ctx.lang}\``,
      ...(ctx.sourceFiles.length > 0
        ? [`- **Các File Component Nguồn Liên Quan Trong Repo**: ${ctx.sourceFiles.slice(0, 10).map(f => `\`${f}\``).join(', ')}`]
        : []),
      ``
    ];

    const activeEdits = [];
    state.editsMap.forEach(rec => {
      const entries = Object.entries(rec.styles);
      if (entries.length === 0 && rec.textChanged === null && Object.keys(rec.attrChanges).length === 0 && !rec.deleted) {
        return;
      }
      activeEdits.push({ rec, entries });
    });

    if (activeEdits.length > 0) {
      lines.push(`## 2. Bảng Tóm Tắt Thay Đổi Trực Quan (${activeEdits.length} Phần Tử)`);
      lines.push(`| # | Phần Tử / Selector | Hành Động | Class Tailwind Tương Đương |`);
      lines.push(`|---|---|---|---|`);
      activeEdits.forEach(({ rec, entries }, i) => {
        const actionType = rec.deleted
          ? '🗑️ Xóa / Ẩn'
          : [
              rec.textChanged !== null ? '✏️ Đổi Text' : '',
              entries.length > 0 ? `🎨 ${entries.length} thuộc tính CSS` : ''
            ]
              .filter(Boolean)
              .join(' + ');
        const tw = rec.deleted ? 'hidden' : convertCssStylesToTailwindClasses(rec.styles) || '—';
        lines.push(`| ${i + 1} | \`${rec.selector}\` (${rec.label}) | ${actionType} | \`${tw}\` |`);
      });
      lines.push(``);

      lines.push(`## 3. Chi Tiết Thông Số Cần Áp Dụng Từng Phần Tử`);
      activeEdits.forEach(({ rec, entries }, idx) => {
        lines.push(`### 3.${idx + 1}. Phần tử \`${rec.selector}\` (${rec.label})`);
        if (rec.deleted) {
          lines.push(`- **Hành động**: Xóa phần tử khỏi DOM hoặc áp dụng \`display: none\` (\`hidden\`).`);
        } else {
          if (rec.textChanged !== null) {
            lines.push(`- **Cập nhật nội dung văn bản (Text Content)**: \`"${rec.textChanged.trim()}"\``);
          }
          Object.entries(rec.attrChanges).forEach(([attr, val]) => {
            lines.push(`- **Cập nhật thuộc tính HTML \`${attr}\`**: \`"${val}"\``);
          });
          if (entries.length > 0) {
            const twClasses = convertCssStylesToTailwindClasses(rec.styles);
            if (twClasses) {
              lines.push(`- **Tailwind CSS JIT Classes**: \`${twClasses}\``);
            }
            lines.push(`- **Thuộc tính CSS chuẩn**:`);
            entries.forEach(([k, v]) => {
              lines.push(`  - \`${k}: ${v};\``);
            });
          }
        }
        lines.push(``);
      });
    } else {
      lines.push(`## 2. Trạng Thái Chỉnh Sửa Thủ Công`);
      lines.push(`- Hiện chưa có thao tác kéo thả lẻ nào. Hãy thực hiện **Nâng cấp UI/UX Toàn Diện** cho \`${ctx.fileLabel}\` theo mục bên dưới.`);
      lines.push(``);
    }

    if (state.injectedCdns.size > 0) {
      lines.push(`## 4. Các Thư Viện UI / CDN Đã Kích Hoạt Trong \`<head>\``);
      state.injectedCdns.forEach(cdnKey => {
        const def = CDN_DEFINITIONS[cdnKey];
        if (def) {
          lines.push(`- **${def.name}**: ${def.css ? `CSS: \`${def.css}\` ` : ''}${def.js ? `JS: \`${def.js}\`` : ''}`);
        }
      });
      lines.push(``);
    }

    if (state.addedNodes.length > 0) {
      lines.push(`## 5. Các Component Mới Được Chèn Từ Thư Viện UI (${state.addedNodes.length} Component)`);
      state.addedNodes.forEach((node, idx) => {
        const libTag = node.libName ? ` **[Thư viện: ${node.libName} — ${node.compName || node.id}]**` : '';
        lines.push(`### Component ${idx + 1}: Chèn vào \`${node.parentSelector}\`${libTag}`);
        lines.push('```html');
        lines.push(node.html.trim());
        lines.push('```');
        lines.push(``);
      });
    }

    const cssPatch = generateCssPatchString();
    if (cssPatch) {
      lines.push(`## 6. Mã CSS Tổng Hợp (Production-Ready Patch)`);
      lines.push('```css');
      lines.push(cssPatch);
      lines.push('```');
      lines.push(``);
    }

    lines.push(`## 7. Quy Tắc Thực Thi Bắt Buộc Cho AI Agent (Cursor / Antigravity / Claude)`);
    lines.push(`1. **Bảo toàn Logic**: Giữ nguyên toàn bộ \`id\`, \`data-*\`, event listener, và state logic hiện có của dự án.`);
    lines.push(`2. **Đồng bộ Source Component**: Nếu dự án dùng React/Next.js/Vue/Flutter (${ctx.sourceFiles.length > 0 ? ctx.sourceFiles.slice(0, 5).map(f => `\`${f}\``).join(', ') : `\`${ctx.fileLabel}\``}), hãy áp dụng các thay đổi vào đúng file component gốc thay vì chỉ sửa bản build tĩnh.`);
    lines.push(`3. **Chuẩn hóa Responsive**: Nếu phần tử có \`transform: translate3d(x, y, 0)\` dùng để căn chỉnh bố cục, hãy ưu tiên chuyển thành khoảng cách Flexbox/Grid (\`gap\`, \`margin\`, \`padding\`) hoặc giữ nguyên tỷ lệ hiển thị mượt trên Desktop & Mobile.`);

    return lines.join('\n');
  }

  function generateTailwindReactPromptText() {
    const ctx = getActiveRepoContextSummary();
    const lines = [
      `# ⚛️ PROMPT ĐỒNG BỘ SANG REACT / NEXT.JS (.TSX) & TAILWIND CSS`,
      `- **Repo**: \`${ctx.repoName}\` • **File**: \`${ctx.fileLabel}\``,
      ...(ctx.sourceFiles.length > 0
        ? [`- **Các file Component .TSX/.JSX trong Repo**: ${ctx.sourceFiles.filter(f => /\.(tsx|jsx|vue|svelte)$/i.test(f)).slice(0, 10).map(f => `\`${f}\``).join(', ') || ctx.sourceFiles.slice(0, 6).map(f => `\`${f}\``).join(', ')}`]
        : []),
      ``,
      `Hãy cập nhật các Component React / Next.js tương ứng với bộ class Tailwind CSS JIT đã tinh chỉnh trực quan dưới đây:`,
      ``
    ];

    let count = 0;
    state.editsMap.forEach(rec => {
      const entries = Object.entries(rec.styles);
      if (entries.length === 0 && rec.textChanged === null && !rec.deleted) return;
      count++;
      const tw = rec.deleted ? 'hidden' : convertCssStylesToTailwindClasses(rec.styles);
      lines.push(`### ${count}. \`${rec.selector}\` (${rec.label})`);
      if (rec.textChanged !== null) {
        lines.push(`- **JSX Children / Text**: \`${rec.textChanged.trim()}\``);
      }
      lines.push(`- **className mới cần thêm/cập nhật**:`);
      lines.push('```tsx');
      lines.push(`<${rec.tagName || 'div'} className="${tw}">`);
      lines.push(`  ${rec.textChanged !== null ? rec.textChanged.trim() : '{children}'}`);
      lines.push(`</${rec.tagName || 'div'}>`);
      lines.push('```');
      lines.push(``);
    });

    if (state.addedNodes.length > 0) {
      lines.push(`### Các Component UI Library Mới Cần Chuyển Sang JSX:`);
      state.addedNodes.forEach(node => {
        const jsxHtml = (node.html || '')
          .replace(/\bclass=/g, 'className=')
          .replace(/\bfor=/g, 'htmlFor=');
        lines.push(`- **${node.compName || node.id}** (${node.libName || 'UI Lib'}) trong \`${node.parentSelector}\`:`);
        lines.push('```tsx');
        lines.push(jsxHtml.trim());
        lines.push('```');
      });
    }

    if (count === 0 && state.addedNodes.length === 0) {
      lines.push(`*(Chưa có thay đổi thủ công nào — hãy chỉnh sửa bất kỳ phần tử nào trên Canvas để tự động sinh mã Tailwind CSS & JSX tại đây!)*`);
    }

    return lines.join('\n');
  }

  function generateFlutterDartPromptText() {
    const ctx = getActiveRepoContextSummary();
    const dartFiles = ctx.sourceFiles.filter(f => /\.dart$/i.test(f));
    const lines = [
      `# 📱 PROMPT ĐỒNG BỘ SANG FLUTTER / DART WIDGET TREE`,
      `- **Repo**: \`${ctx.repoName}\``,
      ...(dartFiles.length > 0 ? [`- **Các file Dart trong Repo**: ${dartFiles.slice(0, 10).map(f => `\`${f}\``).join(', ')}`] : []),
      ``,
      `Hãy cập nhật các Widget Flutter (\`Container\`, \`BoxDecoration\`, \`TextStyle\`, \`Padding\`) theo đúng thông số đã căn chỉnh trực quan:`,
      ``
    ];

    function hexToFlutterColor(val) {
      const m = String(val || '').match(/#([0-9a-fA-F]{6})\b/);
      if (m) return `const Color(0xFF${m[1].toUpperCase()})`;
      return `Colors.deepPurpleAccent`;
    }

    let count = 0;
    state.editsMap.forEach(rec => {
      const entries = Object.entries(rec.styles);
      if (entries.length === 0 && rec.textChanged === null && !rec.deleted) return;
      count++;
      const s = rec.styles || {};
      const bg = s['background-color'] ? `color: ${hexToFlutterColor(s['background-color'])},` : '';
      const radiusNum = parseFloat(s['border-radius']) || 0;
      const radius = radiusNum > 0 ? `borderRadius: BorderRadius.circular(${radiusNum}),` : '';
      const fontSize = parseFloat(s['font-size']) || 15;
      const textColor = s['color'] ? `color: ${hexToFlutterColor(s['color'])},` : '';

      lines.push(`### ${count}. Widget tương ứng với \`${rec.selector}\` (${rec.label})`);
      lines.push('```dart');
      lines.push(`Container(`);
      if (s['padding']) {
        const pVal = parseFloat(s['padding']) || 12;
        lines.push(`  padding: const EdgeInsets.all(${pVal}),`);
      }
      if (bg || radius) {
        lines.push(`  decoration: BoxDecoration(`);
        if (bg) lines.push(`    ${bg}`);
        if (radius) lines.push(`    ${radius}`);
        lines.push(`  ),`);
      }
      lines.push(`  child: Text(`);
      lines.push(`    ${JSON.stringify(rec.textChanged !== null ? rec.textChanged.trim() : rec.label)},`);
      lines.push(`    style: TextStyle(`);
      lines.push(`      fontSize: ${fontSize},`);
      if (textColor) lines.push(`      ${textColor}`);
      lines.push(`      fontWeight: FontWeight.w600,`);
      lines.push(`    ),`);
      lines.push(`  ),`);
      lines.push(`)`);
      lines.push('```');
      lines.push(``);
    });

    if (count === 0) {
      lines.push(`*(Chưa có thay đổi thủ công nào — hãy chỉnh màu sắc, bo góc, cỡ chữ hoặc vị trí trên Canvas để tự động sinh mã Flutter Widget tại đây!)*`);
    }

    return lines.join('\n');
  }

  function generateAutoUiUxAuditPromptText() {
    const ctx = getActiveRepoContextSummary();
    const doc = dom.iframe?.contentDocument;
    const title = doc?.title || ctx.fileLabel;
    const headingsCount = doc ? doc.querySelectorAll('h1, h2, h3').length : 0;
    const buttonsCount = doc ? doc.querySelectorAll('button, a.btn, [role="button"]').length : 0;
    const imagesCount = doc ? doc.querySelectorAll('img, svg').length : 0;
    const sectionsCount = doc ? doc.querySelectorAll('section, header, footer, nav, main').length : 0;

    const sampleHeadings = doc
      ? Array.from(doc.querySelectorAll('h1, h2, h3'))
          .slice(0, 6)
          .map(h => `"${(h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60)}"`)
          .filter(Boolean)
      : [];

    return [
      `# ✨ MASTER PROMPT: KIỂM ĐỊNH & NÂNG CẤP TOÀN DIỆN UI/UX CHUẨN LINEAR / VERCEL / APPLE`,
      ``,
      `Bạn là **Principal UI/UX Design Engineer & Frontend Architect**. Hãy phân tích và nâng cấp toàn diện giao diện của dự án dưới đây lên đẳng cấp thiết kế hiện đại nhất (Linear, Vercel, Raycast, Shadcn/Origin UI, Aceternity UI):`,
      ``,
      `## 1. Thông Tin Giao Diện & Cấu Trúc DOM Hiện Tại`,
      `- **Repository**: \`${ctx.repoName}\` (Nhánh: \`${ctx.branch}\`)`,
      `- **File đang mở**: \`${ctx.fileLabel}\` — Tiêu đề: **${title}**`,
      `- **Ngôn ngữ / Stack**: \`${ctx.lang}\``,
      `- **Thống kê cấu trúc DOM**: \`${sectionsCount}\` phân vùng bố cục (\`section/nav/header\`), \`${headingsCount}\` tiêu đề (\`H1–H3\`), \`${buttonsCount}\` nút tương tác, \`${imagesCount}\` hình ảnh/icon SVG.`,
      ...(sampleHeadings.length > 0 ? [`- **Các tiêu đề chính trên trang**: ${sampleHeadings.join(' • ')}`] : []),
      ...(ctx.sourceFiles.length > 0 ? [`- **Các file nguồn trong dự án**: ${ctx.sourceFiles.slice(0, 12).map(f => `\`${f}\``).join(', ')}`] : []),
      ``,
      `## 2. Yêu Cầu Nâng Cấp UI/UX Toàn Diện (5 Hạng Mục Trọng Tâm)`,
      `1. **Hệ thống Typography & Phân cấp Thị giác (Visual Hierarchy)**:`,
      `   - Tinh chỉnh \`letter-spacing: -0.025em\` cho các tiêu đề lớn (\`H1\`, \`H2\`), dùng \`line-height: 1.15\` cho Heading và \`1.6\` cho đoạn văn mô tả.`,
      `   - Phân tách độ tương phản rõ ràng giữa chữ chính (\`#fafafa\` / \`#09090b\`) và chữ phụ (\`#a1a1aa\` / \`#52525b\`).`,
      `2. **Bố cục Bento Grid, Khoảng thở (Whitespace) & Viền Specular 1px**:`,
      `   - Chuẩn hóa khoảng cách \`padding\` và \`gap\` theo hệ lưới 8px (\`16px\`, \`24px\`, \`32px\`, \`48px\`).`,
      `   - Áp dụng viền mảnh \`1px solid rgba(255,255,255,0.08)\` kèm hiệu ứng ánh sáng đỉnh \`box-shadow: inset 0 1px 0 rgba(255,255,255,0.08)\` và \`backdrop-filter: blur(12px)\` cho các thẻ Card và Navbar.`,
      `3. **Nút bấm (CTA) & Micro-interactions 60fps**:`,
      `   - Nâng cấp các nút CTA chính với hiệu ứng chuyển động mượt \`transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1)\`, hiệu ứng nhấc nhẹ khi hover (\`translateY(-1px)\`) và vòng sáng focus tinh tế.`,
      `4. **Độ tương phản Dark Mode / Light Mode & Responsive**:`,
      `   - Đảm bảo không có bất kỳ chữ nào bị chìm màu trên nền sáng hoặc nền tối, và bố cục tự động co giãn hoàn hảo trên Mobile (\`390px\`), Tablet (\`768px\`) và Desktop (\`1440px+\`).`,
      ...(state.editsMap.size > 0
        ? [
            `5. **Kết hợp với ${state.editsMap.size} Thay đổi Trực quan Đã Chỉnh trên Studio**:`,
            `   - Đồng thời áp dụng đầy đủ các thông số CSS đã tinh chỉnh thủ công dưới đây:`,
            '```css',
            generateCssPatchString(),
            '```'
          ]
        : [
            `5. **Bảo toàn Tuyệt đối Chức năng & Dữ liệu**:`,
            `   - Giữ nguyên toàn bộ nội dung, đường dẫn ảnh, liên kết và logic JavaScript/TypeScript hiện có.`
          ])
    ].join('\n');
  }

  function populateAllPromptTabs() {
    const ctx = getActiveRepoContextSummary();
    const badge = document.getElementById('prompt-context-badge');
    if (badge) {
      badge.textContent = `${ctx.repoName} • ${ctx.fileLabel}`;
    }
    if (dom.aiPromptOutput) dom.aiPromptOutput.value = generateAiPromptText();
    const twOut = document.getElementById('ai-tailwind-output');
    if (twOut) twOut.value = generateTailwindReactPromptText();
    const flOut = document.getElementById('ai-flutter-output');
    if (flOut) flOut.value = generateFlutterDartPromptText();
    const auOut = document.getElementById('ai-audit-output');
    if (auOut) auOut.value = generateAutoUiUxAuditPromptText();
    if (dom.cssPatchOutput) {
      dom.cssPatchOutput.value = generateCssPatchString() || '/* Chưa có thay đổi CSS thủ công nào */';
    }
  }

  // ==================== CLEAN HTML SERIALIZER (SAVING & EXPORTING) ====================
  /**
   * Builds a clean, production-ready HTML string by patching the original unpolluted HTML source
   * with all visual style rules, text changes, attribute changes, and added elements.
   */
  function buildCleanExportHtml() {
    const parser = new DOMParser();
    const baseSource = state.originalRawHtml || dom.iframe.contentDocument.documentElement.outerHTML;
    const cleanDoc = parser.parseFromString(baseSource, 'text/html');

    // Remove any studio ignore artifacts just in case
    cleanDoc.querySelectorAll('[data-studio-ignore="true"], #__ui_studio_overlay_root__, #__ui_studio_internal_css__, #__ui_studio_libs_css__').forEach(el => el.remove());

    // Persist any injected CDN links/scripts into cleanDoc.head
    state.injectedCdns.forEach(cdnKey => {
      const def = CDN_DEFINITIONS[cdnKey];
      if (!def) return;
      if (def.css && !cleanDoc.querySelector(`link[href="${def.css}"]`)) {
        const link = cleanDoc.createElement('link');
        link.rel = 'stylesheet';
        link.href = def.css;
        cleanDoc.head.appendChild(link);
      }
      if (def.js && !cleanDoc.querySelector(`script[src="${def.js}"]`)) {
        const script = cleanDoc.createElement('script');
        script.src = def.js;
        cleanDoc.head.appendChild(script);
      }
    });

    // Apply added elements
    state.addedNodes.forEach(item => {
      try {
        const parent = cleanDoc.querySelector(item.parentSelector) || cleanDoc.body;
        const temp = cleanDoc.createElement('div');
        temp.innerHTML = item.html;
        while (temp.firstElementChild) {
          parent.appendChild(temp.firstElementChild);
        }
      } catch (_) {}
    });

    // Apply text & attribute modifications onto the clean DOM
    state.editsMap.forEach(rec => {
      try {
        const target = cleanDoc.querySelector(rec.selector);
        if (!target) return;
        if (rec.textChanged !== null) {
          target.textContent = rec.textChanged;
        }
        Object.entries(rec.attrChanges).forEach(([attr, val]) => {
          target.setAttribute(attr, val);
        });
      } catch (_) {}
    });

    // Inject or update <style id="visual-ui-studio-styles">
    const cssPatch = generateCssPatchString();
    const needsLibCss = state.addedNodes.some(n => n.html && n.html.includes('uilib-')) ||
                        cssPatch.includes('uilib-') ||
                        Boolean(state.customExtraCss);
    const fullExportCss = [
      needsLibCss ? (window.STUDIO_LIB_COMPONENTS_CSS || '') : '',
      state.customExtraCss || '',
      cssPatch
    ].filter(Boolean).join('\n');

    let studioStyle = cleanDoc.getElementById('visual-ui-studio-styles');
    if (fullExportCss.trim()) {
      if (!studioStyle) {
        studioStyle = cleanDoc.createElement('style');
        studioStyle.id = 'visual-ui-studio-styles';
        cleanDoc.head.appendChild(studioStyle);
      }
      studioStyle.textContent = `\n/* Visual UI Studio Customizations */\n${fullExportCss}\n`;
    }

    return '<!DOCTYPE html>\n' + cleanDoc.documentElement.outerHTML;
  }

  const STUDIO_API_BASE =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? ''
      : 'http://localhost:4567';

  async function safeFetchStudioJson(endpoint, options = {}) {
    const res = await fetch(`${STUDIO_API_BASE}${endpoint}`, options);
    const rawText = await res.text();
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch (_) {
      throw new Error('STUDIO_SERVER_UNAVAILABLE');
    }
    if (!res.ok || data.error) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    return data;
  }

  async function saveDirectlyToSource() {
    const finalHtml = buildCleanExportHtml();

    // Case 1: Opened via Browser File System Access API
    if (state.localFileHandle) {
      try {
        const writable = await state.localFileHandle.createWritable();
        await writable.write(finalHtml);
        await writable.close();
        state.originalRawHtml = finalHtml;
        showToast('Đã lưu trực tiếp vào file trên máy của bạn!', '💾');
        return;
      } catch (err) {
        showToast('Không thể ghi trực tiếp, đang chuyển sang lưu vào Workspace Local...', '⚠️');
      }
    }

    // Case 2: Save directly into local project workspace via Studio Server (+ Auto-Push to GitHub if enabled)
    const targetRelativePath = state.currentFile || 'edited-page.html';
    const origBtnHtml = dom.btnSaveDirect ? dom.btnSaveDirect.innerHTML : '';
    try {
      if (dom.btnSaveDirect) {
        dom.btnSaveDirect.disabled = true;
        dom.btnSaveDirect.style.opacity = '0.8';
      }
      const autoPushEnabled = state.githubAutoPush !== false;
      const customCommitMsg = document.getElementById('input-gh-commit-msg')?.value?.trim() || '';

      const data = await safeFetchStudioJson('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relativePath: targetRelativePath,
          htmlContent: finalHtml,
          autoPush: autoPushEnabled,
          commitMessage: customCommitMsg || undefined
        })
      });
      state.originalRawHtml = finalHtml;
      state.currentFile = targetRelativePath;

      // Ensure the saved file appears in the workspace dropdown if it was a newly created/cloned/pasted file
      if (dom.pageSelector && !Array.from(dom.pageSelector.options).some(o => o.value === targetRelativePath)) {
        const opt = document.createElement('option');
        opt.value = targetRelativePath;
        opt.textContent = targetRelativePath;
        dom.pageSelector.appendChild(opt);
        dom.pageSelector.value = targetRelativePath;
      }

      if (data.gitPush && data.gitPush.pushed) {
        showToast(
          `Đã lưu ${targetRelativePath} vào Local & Tự động Push lên GitHub (${data.gitPush.branch || 'main'}) thành công!`,
          '🚀'
        );
      } else if (data.gitPush && (data.gitPush.reason || data.gitPush.message) && state.githubRepoLinked && autoPushEnabled) {
        showToast(
          `Đã lưu ${targetRelativePath} vào Local! (Git: ${data.gitPush.reason || data.gitPush.message})`,
          '💾'
        );
      } else {
        showToast(
          `Đã lưu thẳng vào Local: ${targetRelativePath}${data.backupCreated ? ' (Đã tạo bản .bak dự phòng)' : ''}!`,
          '💾'
        );
      }

      if (typeof window.studioRefreshGithubStatus === 'function') {
        window.studioRefreshGithubStatus();
      }
    } catch (err) {
      if (err.message === 'STUDIO_SERVER_UNAVAILABLE' || err.message.includes('Failed to fetch')) {
        downloadEditedHtml();
      } else {
        showToast(`Lỗi lưu file: ${err.message}`, '❌');
      }
    } finally {
      if (dom.btnSaveDirect) {
        dom.btnSaveDirect.disabled = false;
        dom.btnSaveDirect.style.opacity = '';
        if (origBtnHtml) dom.btnSaveDirect.innerHTML = origBtnHtml;
      }
    }
  }

  function downloadEditedHtml() {
    const finalHtml = buildCleanExportHtml();
    const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.currentFile ? state.currentFile.split('/').pop() : 'ui-edited.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Đã tải file HTML hoàn chỉnh về máy!', '⬇️');
  }

  // ==================== WORKSPACE & PAGE LOADING ====================
  async function loadWorkspaceFiles(workspaceDir = null) {
    try {
      const data = workspaceDir
        ? await safeFetchStudioJson('/api/workspace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workspaceDir })
          })
        : await safeFetchStudioJson('/api/workspace');

      state.workspaceDir = data.workspaceDir;
      state.files = data.files || [];
      dom.folderLabel.textContent = state.workspaceDir;
      dom.inputWorkspacePath.value = state.workspaceDir;

      dom.pageSelector.innerHTML = `<option value="">-- Chọn file HTML (${state.files.length} trang) --</option>`;
      state.files.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.relativePath;
        opt.textContent = f.name;
        dom.pageSelector.appendChild(opt);
      });

      if (typeof window.studioRefreshGithubStatus === 'function') {
        window.studioRefreshGithubStatus();
      }

      // Automatically open index-creative-developer.html or first HTML file on startup
      if (state.files.length > 0 && !state.currentFile) {
        const preferred =
          state.files.find(f => f.relativePath === 'index-creative-developer.html') ||
          state.files.find(f => f.relativePath === 'index.html') ||
          state.files[0];
        if (preferred) {
          dom.pageSelector.value = preferred.relativePath;
          await loadWorkspacePage(preferred.relativePath);
        }
      }
    } catch (err) {
      console.warn('Workspace load fallback to Demo:', err);
      loadBuiltInDemo();
    }
  }

  async function loadWorkspacePage(relativePath) {
    if (!relativePath) return;
    state.currentFile = relativePath;
    state.localFileHandle = null;
    resetSessionState();

    const pageUrl = `${STUDIO_API_BASE}/workspace/${encodeURI(relativePath)}?t=${Date.now()}`;
    try {
      const rawRes = await fetch(pageUrl);
      state.originalRawHtml = await rawRes.text();
    } catch (_) {
      state.originalRawHtml = '';
    }

    if (STUDIO_API_BASE && state.originalRawHtml) {
      dom.iframe.removeAttribute('src');
      dom.iframe.srcdoc = state.originalRawHtml;
    } else {
      dom.iframe.removeAttribute('srcdoc');
      dom.iframe.src = pageUrl;
    }
    showToast(`Đang nạp giao diện: ${relativePath}`, '🚀');
  }

  function resetSessionState() {
    state.selectedEl = null;
    state.selectedSelector = null;
    state.hoveredEl = null;
    state.editsMap.clear();
    state.addedNodes = [];
    state.undoStack = [];
    state.redoStack = [];
    syncUndoRedoButtons();
    updateHistoryUI();
    selectElement(null);
  }

  function loadRawHtmlString(htmlString, label = 'custom-ui.html') {
    state.currentFile = label;
    state.originalRawHtml = htmlString;
    resetSessionState();

    dom.iframe.removeAttribute('src');
    dom.iframe.srcdoc = htmlString;
    showToast(`Đã nạp giao diện: ${label}`, '✨');
  }

  function loadBuiltInDemo() {
    const demoHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Origin UI — Flagship SaaS Workspace</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #09090b;
      color: #fafafa;
      min-height: 100vh;
      padding: 36px 28px 64px;
      letter-spacing: -0.012em;
    }
    .container { max-width: 1040px; margin: 0 auto; }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: #0c0c0f;
      border: 1px solid #232329;
      border-radius: 10px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
      margin-bottom: 24px;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 15px;
      color: #fafafa;
    }
    .logo-mark {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #fafafa;
      color: #09090b;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
    }
    .nav-actions { display: flex; gap: 8px; }
    .btn-origin-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #fafafa;
      color: #09090b;
      padding: 9px 16px;
      border-radius: 7px;
      font-weight: 600;
      font-size: 13px;
      border: none;
      box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.9);
      cursor: pointer;
    }
    .btn-origin-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #121216;
      color: #fafafa;
      padding: 9px 16px;
      border-radius: 7px;
      font-weight: 500;
      font-size: 13px;
      border: 1px solid #27272a;
      box-shadow: 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
      cursor: pointer;
    }
    .origin-alert {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 12px 16px;
      background: #111114;
      border: 1px solid #27272a;
      border-left: 3px solid #10b981;
      border-radius: 9px;
      margin-bottom: 24px;
      font-size: 13px;
      color: #e4e4e7;
    }
    .hero {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 32px;
      align-items: center;
      background: #0c0c0f;
      border: 1px solid #232329;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
      padding: 40px;
      border-radius: 16px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #18181b;
      color: #d4d4d8;
      border: 1px solid #27272a;
      padding: 5px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 40px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.12;
      margin-bottom: 16px;
    }
    p.lead {
      font-size: 15.5px;
      color: #a1a1aa;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .btn-row { display: flex; flex-wrap: wrap; gap: 10px; }
    .hero-card {
      background: #111114;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 20px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
    }
    .hero-card img {
      width: 100%;
      height: 190px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 14px;
      border: 1px solid #27272a;
    }
    .sonner-preview {
      margin-top: 14px;
      padding: 12px 14px;
      background: #16161b;
      border: 1px solid #32323b;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <nav class="navbar">
      <div class="logo"><span class="logo-mark">✦</span> ORIGIN.STUDIO</div>
      <div class="nav-actions">
        <button class="btn-origin-secondary">Documentation</button>
        <button class="btn-origin-primary">Deploy Project</button>
      </div>
    </nav>

    <div class="origin-alert" role="alert">
      <span><strong>Origin UI + Sonner v6.4 Active</strong> — Click any Button, Alert, Toast, or Card below to customize with ReactBits Scrubbers or 282+ .TSX Components.</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#10b981;font-weight:600;">READY</span>
    </div>

    <section class="hero">
      <div class="hero-left">
        <span class="badge">Origin UI • Shadcn Sonner • ReactBits.dev</span>
        <h1>Precision UI/UX Design System for Modern Web</h1>
        <p class="lead">Click any element to drag, resize, morph with 38+ UI libraries, or scrub 3,960 official ReactBits parameters in real time.</p>
        <div class="btn-row">
          <button class="btn-origin-primary">Primary Specular Action</button>
          <button class="btn-origin-secondary">Secondary Surface Button</button>
        </div>
      </div>
      <div class="hero-card">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Origin Studio Preview" />
        <h3 style="font-size:16px;font-weight:700;">Interactive Bento Surface</h3>
        <p style="color:#a1a1aa;font-size:13px;margin-top:4px;">Drag handles to resize or apply 3D Tilt from the Customize tab.</p>
        <div class="sonner-preview">
          <span>✓ Sonner Toast Component Ready</span>
          <span style="color:#a1a1aa;font-family:'JetBrains Mono',monospace;font-size:11px;">⌘K</span>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`;
    loadRawHtmlString(demoHtml, 'origin-ui-showcase.html');
  }

  // ==================== FOLDER / FILE DRAG & DROP FROM COMPUTER ====================
  async function handleDroppedFolderOrFiles(fileList) {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    // Clear old blob URLs
    state.blobUrlMap.forEach(url => URL.revokeObjectURL(url));
    state.blobUrlMap.clear();

    const htmlFiles = files.filter(f => /\.html?$/i.test(f.name));
    if (htmlFiles.length === 0) {
      showToast('Không tìm thấy file .html nào trong mục bạn vừa thả!', '⚠️');
      return;
    }

    // Create Blob URLs for all assets (CSS, JS, Images) so relative paths resolve!
    for (const file of files) {
      const relPath = (file.webkitRelativePath || file.name).replace(/\\/g, '/');
      const parts = relPath.split('/');
      const withoutRoot = parts.length > 1 ? parts.slice(1).join('/') : relPath;
      const blobUrl = URL.createObjectURL(file);
      state.blobUrlMap.set(withoutRoot, blobUrl);
      state.blobUrlMap.set(file.name, blobUrl);
    }

    const mainHtmlFile =
      htmlFiles.find(f => f.name.toLowerCase() === 'index.html') || htmlFiles[0];
    let htmlText = await mainHtmlFile.text();

    // Replace relative href/src attributes with their corresponding Blob URLs
    state.blobUrlMap.forEach((blobUrl, relKey) => {
      const escaped = relKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(["'(])(?:\\./)?${escaped}(["')])`, 'g');
      htmlText = htmlText.replace(regex, `$1${blobUrl}$2`);
    });

    loadRawHtmlString(htmlText, mainHtmlFile.name);
    dom.modalOpenWeb.classList.add('hidden');
  }

  // ==================== ADD NEW UI ELEMENTS ====================
  const ELEMENT_TEMPLATES = {
    button: `<button data-ui-custom-id="ui-btn-${Date.now()}" style="background:#6366f1;color:#ffffff;padding:12px 24px;border-radius:10px;border:none;font-weight:600;font-size:15px;cursor:pointer;display:inline-block;">Nút Bấm Mới</button>`,
    heading: `<h2 data-ui-custom-id="ui-h2-${Date.now()}" style="font-size:32px;font-weight:700;margin:12px 0;">Tiêu đề mới nổi bật</h2>`,
    paragraph: `<p data-ui-custom-id="ui-p-${Date.now()}" style="font-size:16px;line-height:1.6;margin:8px 0;">Nhấp đúp vào đoạn văn bản này để thay đổi nội dung theo ý bạn.</p>`,
    badge: `<span data-ui-custom-id="ui-badge-${Date.now()}" style="display:inline-block;background:rgba(99,102,241,0.18);color:#818cf8;padding:5px 14px;border-radius:99px;font-size:12px;font-weight:700;">⚡ Nhãn Mới</span>`,
    image: `<img data-ui-custom-id="ui-img-${Date.now()}" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80" alt="Hình ảnh mới" style="width:280px;height:180px;object-fit:cover;border-radius:14px;display:block;" />`,
    card: `<div data-ui-custom-id="ui-card-${Date.now()}" style="padding:24px;background:rgba(30,41,59,0.85);border:1px solid rgba(255,255,255,0.12);border-radius:16px;max-width:360px;"><h3 style="margin-bottom:8px;">Tiêu đề Card</h3><p style="opacity:0.8;font-size:14px;">Nội dung mô tả bên trong khối Card.</p></div>`,
    'flex-row': `<div data-ui-custom-id="ui-flex-${Date.now()}" style="display:flex;gap:16px;align-items:center;padding:16px;border:1px dashed rgba(99,102,241,0.5);border-radius:12px;"><button style="padding:10px 18px;background:#6366f1;color:#fff;border-radius:8px;border:none;">Mục 1</button><button style="padding:10px 18px;background:#0ea5e9;color:#fff;border-radius:8px;border:none;">Mục 2</button></div>`,
    divider: `<hr data-ui-custom-id="ui-hr-${Date.now()}" style="border:none;height:1px;background:rgba(148,163,184,0.25);margin:24px 0;width:100%;" />`
  };

  function insertNewElement(type) {
    const doc = dom.iframe.contentDocument;
    if (!doc || !doc.body || !ELEMENT_TEMPLATES[type]) return;

    // Generate unique ID each time
    const uniqueId = `ui-${type}-${Date.now().toString(36)}`;
    const htmlWithId = ELEMENT_TEMPLATES[type].replace(/data-ui-custom-id="[^"]+"/, `data-ui-custom-id="${uniqueId}"`);

    const container = state.selectedEl && state.selectedEl !== doc.body
      ? state.selectedEl.parentElement || doc.body
      : doc.body;

    const parentSelector = getUniqueSelector(container) || 'body';
    const temp = doc.createElement('div');
    temp.innerHTML = htmlWithId;
    const newEl = temp.firstElementChild;

    if (state.selectedEl && state.selectedEl.parentElement === container) {
      state.selectedEl.insertAdjacentElement('afterend', newEl);
    } else {
      container.appendChild(newEl);
    }

    const nodeInfo = {
      id: uniqueId,
      parentSelector,
      html: newEl.outerHTML
    };
    state.addedNodes.push(nodeInfo);
    pushUndoAction({
      type: 'add_node',
      nodeInfo
    });

    selectElement(newEl);
    newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    buildDomTree();
    updateHistoryUI();
    showToast('Đã chèn khối mới — Bạn có thể kéo thả ngay! (Ctrl+Z để hoàn tác)', '➕');
  }

  // ==================== KEYBOARD SHORTCUTS ====================
  function handleGlobalKeydown(e) {
    // Save shortcut: Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveDirectlyToSource();
      return;
    }

    // Command Search / 38+ UI Libraries Hub: Ctrl+K / Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.remove('hidden');
        if (dom.uilibModalSearch) {
          dom.uilibModalSearch.focus();
          dom.uilibModalSearch.select();
        }
      }
      return;
    }

    // Only block shortcuts if user is actively typing text inside a text input, textarea, or contenteditable
    const isTextTypingNode = node => {
      if (!node) return false;
      if (node.tagName === 'TEXTAREA' || node.getAttribute('contenteditable') === 'true') return true;
      if (node.tagName === 'INPUT') {
        const t = (node.type || 'text').toLowerCase();
        return ['text', 'search', 'url', 'number', 'email', 'password', 'tel'].includes(t);
      }
      return false;
    };

    const active = document.activeElement;
    const isTypingInHost = isTextTypingNode(active);
    const iframeActive = dom.iframe.contentDocument && dom.iframe.contentDocument.activeElement;
    const isTypingInIframe = isTextTypingNode(iframeActive);

    if (isTypingInHost || isTypingInIframe) {
      if (e.key === 'Escape' && isTypingInIframe) {
        iframeActive.blur();
      }
      return;
    }

    // Undo / Redo (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y) — works anywhere!
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) performRedo();
      else performUndo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      performRedo();
      return;
    }

    if (!state.selectedEl || state.mode !== 'edit') return;

    const step = e.shiftKey ? 10 : 1;
    const { dx, dy } = getElementOffsets(state.selectedEl);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const before = captureElementState(state.selectedEl);
      applyElementPosition(state.selectedEl, dx - step, dy);
      pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const before = captureElementState(state.selectedEl);
      applyElementPosition(state.selectedEl, dx + step, dy);
      pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const before = captureElementState(state.selectedEl);
      applyElementPosition(state.selectedEl, dx, dy - step);
      pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const before = captureElementState(state.selectedEl);
      applyElementPosition(state.selectedEl, dx, dy + step);
      pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      deleteSelectedElement();
    } else if (e.key === 'Escape') {
      if (state.selectedEl.parentElement && state.selectedEl.parentElement.tagName.toLowerCase() !== 'body') {
        selectElement(state.selectedEl.parentElement);
      } else {
        selectElement(null);
      }
    }
  }

  function deleteSelectedElement() {
    if (!state.selectedEl) return;
    endHoverPreview();
    const el = state.selectedEl;
    const customId = el.getAttribute('data-ui-custom-id');

    // If this is a newly added element, remove it cleanly from DOM & state.addedNodes (and record undo!)
    if (customId) {
      const idx = state.addedNodes.findIndex(n => n.id === customId);
      let removedNodeInfo = null;
      if (idx !== -1) {
        removedNodeInfo = state.addedNodes[idx];
        state.addedNodes.splice(idx, 1);
      } else {
        removedNodeInfo = {
          id: customId,
          parentSelector: getUniqueSelector(el.parentElement) || 'body',
          html: el.outerHTML
        };
      }
      state.editsMap.delete(getUniqueSelector(el));
      el.remove();
      pushUndoAction({
        type: 'remove_added_node',
        nodeInfo: removedNodeInfo
      });
      selectElement(null);
      buildDomTree();
      updateHistoryUI();
      showToast('Đã xóa khối mới thêm! (Bấm Ctrl+Z nếu muốn lấy lại)', '🗑️');
      return;
    }

    const beforeSnap = captureElementState(el);
    const rec = ensureEditRecord(el);
    el.style.setProperty('display', 'none', 'important');
    rec.deleted = true;
    rec.styles['display'] = 'none';
    const afterSnap = captureElementState(el);
    pushUndoAction({
      type: 'snapshot',
      selector: rec.selector,
      before: beforeSnap,
      after: afterSnap
    });
    selectElement(null);
    buildDomTree();
    updateHistoryUI();
    showToast('Đã xóa phần tử (Bấm Ctrl+Z hoặc vào Lịch sử nếu muốn khôi phục)', '🗑️');
  }

  function resetElementToOriginal(el) {
    if (!el) return;
    endHoverPreview();
    const beforeSnap = captureElementState(el);
    const selector = getUniqueSelector(el);
    const rec = state.editsMap.get(selector);
    if (rec) {
      Object.keys(rec.styles).forEach(k => el.style.removeProperty(k));
      state.editsMap.delete(selector);
    }
    const initStyle = el.getAttribute('data-ui-init-style');
    if (initStyle !== null) {
      if (initStyle === '') el.removeAttribute('style');
      else el.setAttribute('style', initStyle);
    }
    const initClass = el.getAttribute('data-ui-init-class');
    if (initClass !== null) {
      if (initClass === '') el.removeAttribute('class');
      else el.setAttribute('class', initClass);
    } else {
      Array.from(el.classList).forEach(c => {
        if (c.startsWith('uilib-')) el.classList.remove(c);
      });
    }
    const origText = el.getAttribute('data-ui-orig-text');
    if (origText !== null) {
      el.textContent = origText;
      el.removeAttribute('data-ui-orig-text');
    } else {
      el.querySelectorAll('[data-uilib-decor="true"]').forEach(n => n.remove());
    }
    el.removeAttribute('data-ui-dx');
    el.removeAttribute('data-ui-dy');
    el.removeAttribute('data-ui-rot');
    el.removeAttribute('data-ui-scale');
    const afterSnap = captureElementState(el);
    pushUndoAction({
      type: 'snapshot',
      selector,
      before: beforeSnap,
      after: afterSnap
    });
    if (state.selectedEl === el) selectElement(el);
    buildDomTree();
    updateHistoryUI();
    showToast('Đã khôi phục phần tử về nguyên trạng gốc! (Ctrl+Z để hoàn tác)', '↺');
  }

  function resetPropertiesGroup(el, propsList, toastMsg) {
    if (!el) return;
    endHoverPreview();
    const beforeSnap = captureElementState(el);
    const selector = getUniqueSelector(el);
    const rec = state.editsMap.get(selector);
    propsList.forEach(p => {
      el.style.removeProperty(p);
      if (rec && rec.styles) delete rec.styles[p];
    });
    const afterSnap = captureElementState(el);
    pushUndoAction({
      type: 'snapshot',
      selector,
      before: beforeSnap,
      after: afterSnap
    });
    selectElement(el);
    updateHistoryUI();
    showToast(toastMsg, '↺');
  }

  // ==================== CUSTOM INTERACTIVE LIVE-HOVER PREVIEW DROPDOWN BUILDER ====================
  const liveSelectSynchronizers = [];

  function upgradeSelectToLivePreviewDropdown(selectEl, options) {
    if (!selectEl) return;
    selectEl.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.className = 'ui-live-select';
    selectEl.parentNode.insertBefore(wrapper, selectEl);
    wrapper.appendChild(selectEl);

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'ui-live-select-trigger';
    trigger.innerHTML = `
      <span class="ui-live-select-label">Mặc định</span>
      <span class="ui-live-select-arrow">▼</span>
    `;
    wrapper.appendChild(trigger);

    const menu = document.createElement('div');
    menu.className = 'ui-live-select-menu';
    wrapper.appendChild(menu);

    const labelSpan = trigger.querySelector('.ui-live-select-label');

    function buildItems() {
      menu.innerHTML = '';
      Array.from(selectEl.options).forEach(opt => {
        const item = document.createElement('div');
        item.className = 'ui-live-select-item' + (opt.value === selectEl.value ? ' selected' : '');
        item.dataset.value = opt.value;

        if (options.renderItemStyle) {
          options.renderItemStyle(item, opt.value, opt.textContent);
        }

        item.innerHTML = `
          <span>${opt.textContent}</span>
          <span class="ui-live-select-item-sub">👁️ Xem thử</span>
        `;

        // LIVE HOVER PREVIEW ON MOUSEENTER!
        item.addEventListener('mouseenter', () => {
          if (!state.selectedEl) return;
          const previewMap = options.getPreviewStyleMap(opt.value);
          startHoverPreview(previewMap, opt.textContent);
        });

        // COMMIT ON CLICK!
        item.addEventListener('click', e => {
          e.stopPropagation();
          endHoverPreview();
          selectEl.value = opt.value;
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
          syncTrigger();
          closeMenu();
          showToast(`Đã chọn: ${opt.textContent}`, '✨');
        });

        menu.appendChild(item);
      });
    }

    function syncTrigger() {
      const selectedOpt = selectEl.options[selectEl.selectedIndex] || selectEl.options[0];
      if (selectedOpt) {
        labelSpan.textContent = selectedOpt.textContent;
        if (options.renderTriggerStyle) {
          options.renderTriggerStyle(labelSpan, selectEl.value);
        }
      }
      menu.querySelectorAll('.ui-live-select-item').forEach(it => {
        it.classList.toggle('selected', it.dataset.value === selectEl.value);
      });
    }

    function closeMenu() {
      if (wrapper.classList.contains('open')) {
        wrapper.classList.remove('open', 'flip-up');
        endHoverPreview();
      }
    }

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');
      // Close any other open live-select
      document.querySelectorAll('.ui-live-select.open').forEach(w => {
        if (w !== wrapper) w.classList.remove('open', 'flip-up');
      });

      if (isOpen) {
        closeMenu();
      } else {
        buildItems();
        // Flip menu upward if near bottom of viewport
        const rect = trigger.getBoundingClientRect();
        if (window.innerHeight - rect.bottom < 280) {
          wrapper.classList.add('flip-up');
        } else {
          wrapper.classList.remove('flip-up');
        }
        wrapper.classList.add('open');
      }
    });

    menu.addEventListener('mouseleave', () => {
      endHoverPreview();
    });

    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) {
        closeMenu();
      }
    });

    buildItems();
    syncTrigger();
    liveSelectSynchronizers.push(syncTrigger);
  }

  function syncAllLiveSelectTriggers() {
    liveSelectSynchronizers.forEach(fn => fn());
  }

  function renderMagicPresetsCatalog() {
    if (!dom.magicPresetsList) return;
    dom.magicPresetsList.innerHTML = '';
    (window.STUDIO_MAGIC_PRESETS || []).forEach(preset => {
      const card = document.createElement('div');
      card.className = 'magic-preset-card';
      card.innerHTML = `
        <div class="magic-preset-swatch" style="${preset.previewStyle}"></div>
        <div class="magic-preset-info">
          <h4>${preset.name}</h4>
          <p>${preset.desc}</p>
        </div>
      `;
      card.addEventListener('mouseenter', () => {
        if (!state.selectedEl) return;
        startHoverPreview(preset.styles, preset.name);
      });
      card.addEventListener('mouseleave', () => {
        endHoverPreview();
      });
      card.addEventListener('click', () => {
        if (!state.selectedEl) {
          showToast('Hãy bấm chọn 1 phần tử trên trang web trước!', '👆');
          return;
        }
        endHoverPreview();
        const beforeSnap = captureElementState(state.selectedEl);
        Object.entries(preset.styles).forEach(([k, v]) => {
          applyStyleProperty(state.selectedEl, k, v, false);
        });
        const afterSnap = captureElementState(state.selectedEl);
        pushUndoAction({
          type: 'snapshot',
          selector: beforeSnap.selector,
          before: beforeSnap,
          after: afterSnap
        });
        selectElement(state.selectedEl);
        showToast(`Đã áp dụng "${preset.name}"! (Bấm Ctrl+Z hoặc ↺ Về Gốc nếu muốn hủy)`, '✨');
      });
      dom.magicPresetsList.appendChild(card);
    });
  }

  // ==================== 38+ UI LIBRARIES HUB, LIVE HOVER SEARCH & SMART JSX/TAILWIND IMPORTER ====================
  function isCustomImportedComp(comp) {
    if (!comp) return false;
    return Boolean(comp.isCustom || (comp.id && String(comp.id).startsWith('custom-')) || comp.libName === 'Custom Import');
  }

  function convertJsxToCleanHtml(rawCode) {
    if (!rawCode) return '';
    let code = String(rawCode)
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/^\s*["']use client["']\s*;?/gm, '')
      .replace(/^\s*import\s+[\s\S]*?from\s+["'][^"']+["']\s*;?/gm, '')
      .replace(/^\s*import\s+["'][^"']+["']\s*;?/gm, '')
      .trim();

    // Also strip inline "import { ... } from '...'" if it was flattened onto a single line
    code = code.replace(/import\s+\{[^}]*\}\s+from\s+["'][^"']+["']\s*;?/g, '');
    code = code.replace(/import\s+[A-Za-z0-9_$]+\s+from\s+["'][^"']+["']\s*;?/g, '');

    // Extract JSX inside return (...) or export function ... { return ( ... ) }
    const returnMatch = code.match(/\breturn\s*\(\s*([\s\S]*)\)\s*;?\s*\}\s*$/);
    if (returnMatch && returnMatch[1]) {
      code = returnMatch[1].trim();
    } else {
      // Fallback: strip leading export function / const wrapper and trailing ) }
      code = code
        .replace(/^[\s\S]*?\breturn\s*\(\s*/, '')
        .replace(/^\s*export\s+(?:default\s+)?(?:function|const)\s+[^{]*\{\s*/, '')
        .replace(/\s*\)\s*;?\s*\}\s*$/, '')
        .trim();
    }

    // Strip React Fragments <> and </>
    code = code.replace(/<\s*>/g, '').replace(/<\/\s*>/g, '');

    // Convert Shadcn UI / Radix / React PascalCase components into clean HTML elements
    code = code
      .replace(/<Checkbox\b([^>]*?)\/>/g, '<input type="checkbox" checked class="uilib-shadcn-checkbox"$1 />')
      .replace(/<Checkbox\b([^>]*?)><\/Checkbox>/g, '<input type="checkbox" checked class="uilib-shadcn-checkbox"$1 />')
      .replace(/<Switch\b([^>]*?)\/>/g, '<input type="checkbox" checked class="uilib-shadcn-switch"$1 />')
      .replace(/<Switch\b([^>]*?)><\/Switch>/g, '<input type="checkbox" checked class="uilib-shadcn-switch"$1 />')
      .replace(/<Input\b([^>]*?)\/>/g, '<input class="uilib-shadcn-input"$1 />')
      .replace(/<Textarea\b([^>]*?)\/>/g, '<textarea class="uilib-shadcn-textarea"$1></textarea>')
      .replace(/<Textarea\b([^>]*?)>([\s\S]*?)<\/Textarea>/g, '<textarea class="uilib-shadcn-textarea"$1>$2</textarea>')
      .replace(/<Button\b([^>]*?)>([\s\S]*?)<\/Button>/g, '<button type="button" class="uilib-shadcn-btn"$1>$2</button>')
      .replace(/<Badge\b([^>]*?)>([\s\S]*?)<\/Badge>/g, '<span class="uilib-shadcn-badge"$1>$2</span>')
      .replace(/<Label\b([^>]*?)>([\s\S]*?)<\/Label>/g, '<label$1>$2</label>')
      .replace(/<Card\b([^>]*?)>([\s\S]*?)<\/Card>/g, '<div class="uilib-shadcn-card"$1>$2</div>')
      .replace(/<(CardHeader|CardContent|CardFooter)\b([^>]*?)>([\s\S]*?)<\/\1>/g, '<div$2>$3</div>')
      .replace(/<CardTitle\b([^>]*?)>([\s\S]*?)<\/CardTitle>/g, '<h4 style="margin:0 0 4px;font-weight:700;"$1>$2</h4>')
      .replace(/<CardDescription\b([^>]*?)>([\s\S]*?)<\/CardDescription>/g, '<p class="text-sm text-muted-foreground" style="margin:0;"$1>$2</p>')
      .replace(/<Separator\b([^>]*?)\/>/g, '<hr style="border-color:#27272a;margin:10px 0;"$1 />');

    return code
      .replace(/\bclassName=/g, 'class=')
      .replace(/\bhtmlFor=/g, 'for=')
      .replace(/<(div|span|i|button|a|section|nav|header|footer|p|h1|h2|h3|h4|label)([^>]*?)\s*\/>/gi, '<$1$2></$1>')
      .trim();
  }

  function syncCustomImportButtonsVisibility() {
    const customComps = (window.STUDIO_LIB_COMPONENTS || []).filter(isCustomImportedComp);
    const count = customComps.length;
    if (dom.btnClearCustomImports) {
      dom.btnClearCustomImports.classList.toggle('hidden', count === 0);
      dom.btnClearCustomImports.textContent = `🗑️ Xóa Import (${count})`;
    }
    if (dom.btnClearCustomImportsModal) {
      dom.btnClearCustomImportsModal.classList.toggle('hidden', count === 0);
      dom.btnClearCustomImportsModal.textContent = `🗑️ Xóa hết mẫu đã Import (${count})`;
    }
  }

  function loadSavedCustomComponents() {
    try {
      const saved = JSON.parse(localStorage.getItem('studio_custom_uilib_comps') || '[]');
      const savedCss = localStorage.getItem('studio_custom_uilib_css') || '';
      if (savedCss) state.customExtraCss = savedCss;
      if (Array.isArray(saved) && saved.length > 0 && window.STUDIO_LIB_COMPONENTS) {
        let needsResave = false;
        saved.slice().reverse().forEach(comp => {
          comp.isCustom = true;
          if (!comp.isOfficial) {
            const reCleaned = convertJsxToCleanHtml(comp.rawCode || comp.html);
            if (reCleaned && reCleaned !== comp.html) {
              comp.html = reCleaned;
              needsResave = true;
            }
          }
          if (!window.STUDIO_LIB_COMPONENTS.some(c => c.id === comp.id)) {
            window.STUDIO_LIB_COMPONENTS.unshift(comp);
          }
        });
        if (needsResave) {
          localStorage.setItem('studio_custom_uilib_comps', JSON.stringify(saved));
        }
      }
    } catch (_) {}
    syncCustomImportButtonsVisibility();
  }

  function deleteCustomComponent(compId) {
    if (!compId) return;
    clearComponentHoverPreview();
    const targetComp = (window.STUDIO_LIB_COMPONENTS || []).find(c => c.id === compId);
    const compName = targetComp ? targetComp.name : 'Component';

    if (window.STUDIO_LIB_COMPONENTS) {
      window.STUDIO_LIB_COMPONENTS = window.STUDIO_LIB_COMPONENTS.filter(c => c.id !== compId);
    }
    try {
      const saved = JSON.parse(localStorage.getItem('studio_custom_uilib_comps') || '[]');
      const updated = saved.filter(c => c.id !== compId);
      localStorage.setItem('studio_custom_uilib_comps', JSON.stringify(updated));
    } catch (_) {}

    syncCustomImportButtonsVisibility();
    renderSidebarUiLibraries();
    renderModalUiLibrariesExplorer('all', dom.uilibModalSearch ? dom.uilibModalSearch.value : '');
    showToast(`Đã xóa mẫu Import "${compName}" khỏi Kho UI!`, '🗑️');
  }

  function clearAllCustomComponents() {
    clearComponentHoverPreview();
    if (window.STUDIO_LIB_COMPONENTS) {
      window.STUDIO_LIB_COMPONENTS = window.STUDIO_LIB_COMPONENTS.filter(c => !isCustomImportedComp(c));
    }
    try {
      localStorage.removeItem('studio_custom_uilib_comps');
      localStorage.removeItem('studio_custom_uilib_css');
    } catch (_) {}
    state.customExtraCss = '';
    syncCustomImportButtonsVisibility();
    renderSidebarUiLibraries();
    renderModalUiLibrariesExplorer('all', dom.uilibModalSearch ? dom.uilibModalSearch.value : '');
    showToast('Đã xóa toàn bộ các mẫu tự Import khỏi Kho UI!', '🗑️');
  }

  function looksLikeTailwind(htmlStr) {
    return /\b(px-\d|py-\d|bg-[a-z]+-|rounded-|flex\b|items-center|justify-|text-[a-z]+-|shadow-|hover:|bg-gradient-to-)/.test(htmlStr);
  }

  function extractCleanUserText(el) {
    if (!el) return '';
    if (el.hasAttribute('data-ui-orig-text')) {
      return el.getAttribute('data-ui-orig-text');
    }
    const clone = el.cloneNode(true);
    clone.querySelectorAll('[data-uilib-decor="true"]').forEach(n => n.remove());
    return (clone.textContent || '').trim();
  }

  function applyComponentStyleAndFxToElement(el, comp, isPreviewOnly = false) {
    if (!el || !comp) return false;
    const doc = el.ownerDocument;
    syncLibraryCssEverywhere(doc);

    // Only auto-inject Tailwind Play CDN when committing a custom user-imported snippet
    // (built-in 282 components already have pre-compiled CSS in STUDIO_LIB_COMPONENTS_CSS!)
    if (!isPreviewOnly && isCustomImportedComp(comp) && looksLikeTailwind(comp.html) && !state.injectedCdns.has('tailwind')) {
      state.injectedCdns.add('tailwind');
      applyInjectedCdnsToDoc(doc);
      syncCdnChipsUI();
    }

    const temp = document.createElement('div');
    temp.innerHTML = comp.html || '';
    const rawRoot = temp.firstElementChild;
    const isOfficialSsrWrap = Boolean(rawRoot && rawRoot.classList && rawRoot.classList.contains('uilib-official-ssr'));
    const tplRoot = isOfficialSsrWrap
      ? (rawRoot.querySelector('button, a, [role="switch"], input, .uilib-shadcn-badge, .uilib-shadcn-card') || rawRoot.firstElementChild || rawRoot)
      : rawRoot;

    // 1. Build merged style map from tplRoot inline styles + comp.morphStyles
    const mergedStyles = {};
    const tag = el.tagName.toLowerCase();
    const isLeafInteractive = ['button', 'a', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'p'].includes(tag);

    if (tplRoot && tplRoot.getAttribute('style')) {
      tplRoot.getAttribute('style').split(';').forEach(pair => {
        const colonIdx = pair.indexOf(':');
        if (colonIdx === -1) return;
        const k = pair.slice(0, colonIdx).trim().toLowerCase();
        const v = pair.slice(colonIdx + 1).trim();
        if (!k || !v) return;
        if (isLeafInteractive && ['width', 'min-width', 'max-width', 'height', 'min-height'].includes(k)) return;
        mergedStyles[k] = v;
      });
    }

    Object.entries(comp.morphStyles || {}).forEach(([k, v]) => {
      mergedStyles[k.toLowerCase()] = v;
    });

    if (Object.keys(mergedStyles).length === 0 && !tplRoot) {
      return false;
    }

    const rec = !isPreviewOnly ? ensureEditRecord(el) : null;

    // Apply regular styles first, then background-size & animation AFTER background so shorthand doesn't reset them
    const deferredProps = ['background-size', 'background-position', 'animation'];
    Object.entries(mergedStyles).forEach(([k, v]) => {
      if (deferredProps.includes(k)) return;
      el.style.setProperty(k, v, 'important');
      if (rec) rec.styles[k] = v;
    });
    deferredProps.forEach(k => {
      if (mergedStyles[k]) {
        el.style.setProperty(k, mergedStyles[k], 'important');
        if (rec) rec.styles[k] = mergedStyles[k];
      }
    });

    // 2. If "✨ Áp cả Icon & Hiệu ứng" is enabled, transfer classes, animations, hover FX & icons!
    if (state.morphWithFx && tplRoot) {
      // Remove previous uilib-* effect classes before applying new ones
      Array.from(el.classList).forEach(c => {
        if (c.startsWith('uilib-')) el.classList.remove(c);
      });
      el.classList.add('uilib-comp');
      if (isOfficialSsrWrap) {
        el.classList.add('uilib-official-ssr');
        Array.from(tplRoot.classList).forEach(c => el.classList.add(c));
      } else {
        Array.from(tplRoot.classList).forEach(c => {
          if (c.startsWith('uilib-')) el.classList.add(c);
        });
      }

      const animStr = (mergedStyles['animation'] || '') + ' ' + (comp.id || '');
      if (animStr.includes('rainbow')) el.classList.add('uilib-anim-rainbow');
      if (animStr.includes('shimmer')) el.classList.add('uilib-anim-shimmer');

      if (rec) {
        rec.attrChanges['class'] = el.getAttribute('class') || '';
      }

      // Transfer decorative icons, glowing dots, SVG icons, or trailing arrows while preserving user's text!
      const hasComplexBlockChildren = Boolean(el.querySelector('div, section, article, ul, table, form, input, img'));
      if (isLeafInteractive && !hasComplexBlockChildren) {
        const userText = extractCleanUserText(el);
        if (userText) {
          if (!isPreviewOnly && !el.hasAttribute('data-ui-orig-text')) {
            el.setAttribute('data-ui-orig-text', userText);
          }

          const tplChildren = Array.from(tplRoot.children);
          const allInlineDecor = tplChildren.length >= 2 && tplChildren.every(c =>
            ['SPAN', 'SVG', 'I', 'KBD', 'SMALL', 'STRONG'].includes(c.tagName)
          );

          if (allInlineDecor) {
            const clonedTpl = tplRoot.cloneNode(true);
            let mainTextNode = null;
            let maxLen = -1;
            Array.from(clonedTpl.children).forEach(child => {
              const t = (child.textContent || '').trim();
              if (child.tagName === 'SPAN' && t.length > maxLen && !/^[→↗↵›»✦⚡✨🌈🚀🔥💎]+$/u.test(t)) {
                maxLen = t.length;
                mainTextNode = child;
              }
            });
            Array.from(clonedTpl.children).forEach(child => {
              if (child === mainTextNode) {
                child.textContent = userText;
              } else {
                child.setAttribute('data-uilib-decor', 'true');
              }
            });
            el.innerHTML = clonedTpl.innerHTML;
            el.style.setProperty('display', 'inline-flex', 'important');
            el.style.setProperty('align-items', 'center', 'important');
            el.style.setProperty('gap', mergedStyles['gap'] || '8px', 'important');
            if (rec) {
              rec.styles['display'] = 'inline-flex';
              rec.styles['align-items'] = 'center';
              rec.styles['gap'] = mergedStyles['gap'] || '8px';
            }
          } else {
            const rawTplText = (tplRoot.textContent || '').trim();
            const leadMatch = rawTplText.match(/^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✦⚡✨🌈🚀🔥💎🟢🔐🎉💬⏳🌟🔘✓]+)\s+/u);
            const trailMatch = rawTplText.match(/\s+([→↗↵›»]+)$/u);
            const leadSvg = tplRoot.querySelector('svg');

            if (leadSvg || leadMatch || trailMatch) {
              const parts = [];
              if (leadSvg) {
                const svgClone = leadSvg.cloneNode(true);
                svgClone.setAttribute('data-uilib-decor', 'true');
                parts.push(svgClone.outerHTML);
              } else if (leadMatch) {
                parts.push(`<span data-uilib-decor="true" style="display:inline-flex;align-items:center;">${leadMatch[1]}</span>`);
              }
              parts.push(`<span>${userText}</span>`);
              if (trailMatch) {
                parts.push(`<span data-uilib-decor="true" style="opacity:0.85;">${trailMatch[1]}</span>`);
              }
              el.innerHTML = parts.join('');
              el.style.setProperty('display', 'inline-flex', 'important');
              el.style.setProperty('align-items', 'center', 'important');
              el.style.setProperty('gap', mergedStyles['gap'] || '8px', 'important');
              if (rec) {
                rec.styles['display'] = 'inline-flex';
                rec.styles['align-items'] = 'center';
                rec.styles['gap'] = mergedStyles['gap'] || '8px';
              }
            } else if (el.querySelector('[data-uilib-decor="true"]')) {
              el.textContent = userText;
            }
          }
        }
      }
    }

    return true;
  }

  function startComponentFullMorphPreview(comp, labelText = '') {
    const el = state.selectedEl;
    if (!el || state.mode !== 'edit') return;
    ensureHoverBackupBaseline(el);
    applyComponentStyleAndFxToElement(el, comp, true);
    showLivePreviewIndicator(labelText || `${comp.libName}: ${comp.name}`);
    updateOverlayPosition();
  }

  function morphSelectedWithLibComponent(comp) {
    if (!state.selectedEl) {
      showToast('Hãy click chọn 1 phần tử trên trang web trước, hoặc bấm "➕ Chèn Mới"!', '👆');
      return;
    }
    endHoverPreview();
    clearPreviewAddBlock();

    const beforeSnap = captureElementState(state.selectedEl);
    const didMorph = applyComponentStyleAndFxToElement(state.selectedEl, comp, false);
    if (!didMorph) {
      insertLibComponentToPage(comp);
      return;
    }

    const afterSnap = captureElementState(state.selectedEl);
    pushUndoAction({
      type: 'snapshot',
      selector: beforeSnap.selector,
      before: beforeSnap,
      after: afterSnap
    });

    selectElement(state.selectedEl);
    updateHistoryUI();
    showToast(`Đã áp dụng trọn bộ Style, Hiệu ứng & Icon "${comp.libName} — ${comp.name}"! (Bấm Ctrl+Z hoặc ↺ Gốc để hủy)`, '✨');
  }

  function insertLibComponentToPage(comp) {
    endHoverPreview();
    clearPreviewAddBlock();
    const doc = dom.iframe.contentDocument;
    if (!doc || !doc.body) return;

    // Auto-inject Tailwind CDN only for custom user-imported snippets (built-in components use pre-compiled STUDIO_LIB_COMPONENTS_CSS)
    if (isCustomImportedComp(comp) && looksLikeTailwind(comp.html) && !state.injectedCdns.has('tailwind')) {
      state.injectedCdns.add('tailwind');
      applyInjectedCdnsToDoc(doc);
      syncCdnChipsUI();
    }

    syncLibraryCssEverywhere(doc);

    const uniqueId = `uilib-${comp.libId || 'custom'}-${Date.now().toString(36)}`;
    const container = state.selectedEl && state.selectedEl !== doc.body
      ? state.selectedEl.parentElement || doc.body
      : doc.body;

    const parentSelector = getUniqueSelector(container) || 'body';
    const temp = doc.createElement('div');
    temp.innerHTML = comp.html;
    const newEl = temp.firstElementChild;
    if (!newEl) return;

    newEl.setAttribute('data-ui-custom-id', uniqueId);
    newEl.setAttribute('data-ui-init-style', newEl.getAttribute('style') || '');
    newEl.setAttribute('data-ui-init-class', newEl.getAttribute('class') || '');

    if (state.selectedEl && state.selectedEl.parentElement === container) {
      state.selectedEl.insertAdjacentElement('afterend', newEl);
    } else {
      container.appendChild(newEl);
    }

    const nodeInfo = {
      id: uniqueId,
      libName: comp.libName,
      compName: comp.name,
      parentSelector,
      html: newEl.outerHTML
    };
    state.addedNodes.push(nodeInfo);
    pushUndoAction({
      type: 'add_node',
      nodeInfo
    });

    selectElement(newEl);
    newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    buildDomTree();
    updateHistoryUI();
    showToast(`Đã chèn "${comp.name}" (${comp.libName}) vào trang! (Bấm Ctrl+Z để hoàn tác)`, '➕');
  }

  function previewComponentCardOnHover(comp) {
    const mode = dom.uilibHoverMode ? dom.uilibHoverMode.value : 'auto';
    const hasSelected = Boolean(state.selectedEl);
    const hasMorph = Boolean((comp.morphStyles && Object.keys(comp.morphStyles).length > 0) || comp.html);

    if (mode === 'morph' && hasSelected && hasMorph) {
      startComponentFullMorphPreview(comp, `${comp.libName}: ${comp.name}`);
      return;
    }
    if (mode === 'insert') {
      previewRawHtmlBlockOnHover(comp.html, `${comp.libName}: ${comp.name}`);
      return;
    }
    // Auto smart mode: if user has selected a button/link/badge and hovers a button/badge component, preview morphing it (with icon & animation) directly!
    if (hasSelected && hasMorph) {
      const selTag = state.selectedEl.tagName.toLowerCase();
      const isBtnLike = selTag === 'button' || selTag === 'a' || selTag === 'span';
      if ((comp.category === 'button' || comp.category === 'badge') && isBtnLike) {
        startComponentFullMorphPreview(comp, `Biến hình nút → ${comp.libName}: ${comp.name}`);
        return;
      }
    }
    previewRawHtmlBlockOnHover(comp.html, `${comp.libName}: ${comp.name}`);
  }

  function clearComponentHoverPreview() {
    endHoverPreview();
    clearPreviewAddBlock();
  }

  function openEditCustomComponent(comp) {
    if (!comp || !dom.modalUilibExplorer) return;
    state.editingCustomCompId = comp.id;
    dom.modalUilibExplorer.classList.remove('hidden');
    document.querySelectorAll('.uilib-mtab').forEach(b => {
      b.classList.toggle('active', b.dataset.umtab === 'umtab-import');
    });
    document.querySelectorAll('.uilib-mtab-pane').forEach(p => {
      p.classList.toggle('hidden', p.id !== 'umtab-import');
      p.classList.toggle('active', p.id === 'umtab-import');
    });
    if (dom.importCompName) dom.importCompName.value = comp.name || '';
    if (dom.importCompCat) dom.importCompCat.value = comp.category || 'button';
    if (dom.importCompCode) {
      dom.importCompCode.value = comp.rawCode || comp.html || '';
      dom.importCompCode.dispatchEvent(new Event('input'));
      dom.importCompCode.focus();
    }
    showToast(`Đang chỉnh sửa mẫu "${comp.name}" — bấm Lưu để cập nhật!`, '✏️');
  }

  function createComponentCardElement(comp, isModalView = false) {
    const libs = window.STUDIO_UI_LIBRARIES || [];
    const isCustom = isCustomImportedComp(comp);
    const libMeta = isCustom
      ? { name: '📥 Tự Import', url: 'https://21st.dev', accent: '#ec4899' }
      : (libs.find(l => l.id === comp.libId) || {
          name: comp.libName || 'Custom UI',
          url: 'https://21st.dev',
          accent: '#8b5cf6'
        });

    const card = document.createElement('div');
    card.className = 'uilib-comp-card';

    const isLargeBlock = comp.category === 'card' || comp.category === 'pricing' || comp.category === 'hero' || comp.category === 'nav' || comp.category === 'modal' || comp.category === 'testimonial';

    const topRightHtml = isCustom
      ? `
        <div class="uilib-card-top-actions">
          <button type="button" class="uilib-card-mini-btn uilib-card-mini-btn--edit btn-edit-custom" title="Sửa lại code hoặc tên của mẫu tự Import này">✏️ Sửa</button>
          <button type="button" class="uilib-card-mini-btn uilib-card-mini-btn--del btn-del-custom" title="Xóa mẫu tự Import này khỏi Kho UI">🗑️ Xóa</button>
        </div>
      `
      : `
        <div class="uilib-card-top-actions">
          ${comp.rawCode ? `<button type="button" class="uilib-card-mini-btn uilib-card-mini-btn--edit btn-view-official-tsx" title="Xem mã nguồn .TSX chính chủ từ Registry của ${libMeta.name} (${comp.officialUrl || libMeta.url})">📄 .TSX</button>` : ''}
          <a href="${comp.officialUrl || libMeta.url}" target="_blank" rel="noopener" class="uilib-site-link" title="Mở nguồn / trang chủ ${libMeta.name} (${comp.officialUrl || libMeta.url})">↗ Web</a>
        </div>
      `;

    card.innerHTML = `
      <div class="uilib-comp-card__top">
        <div class="uilib-comp-card__meta">
          <a href="${libMeta.url}" target="_blank" rel="noopener" class="uilib-lib-badge" title="Click vào Logo ${libMeta.name} để mở Trang Chủ (${libMeta.url})" style="border-color:${libMeta.accent}55;color:${libMeta.accent};background:${libMeta.accent}18;">
            <span style="width:6px;height:6px;border-radius:50%;background:${libMeta.accent};display:inline-block;"></span>
            <span>${libMeta.name}</span>
          </a>
          <span class="uilib-comp-title" title="${comp.name}">${comp.name}</span>
        </div>
        ${topRightHtml}
      </div>
      <div class="uilib-comp-stage ${isLargeBlock ? 'uilib-comp-stage--scaled' : ''}">
        ${comp.html}
      </div>
      <div class="uilib-comp-card__actions ${isCustom ? 'uilib-comp-card__actions--3col' : ''}">
        <button type="button" class="uilib-act-btn btn-morph-comp" title="Rê chuột để xem thử & Áp cả Style, Animation, Hiệu ứng Hover + Icon của ${libMeta.name} vào thẻ đang chọn">
          ✨ Áp Style &amp; FX
        </button>
        <button type="button" class="uilib-act-btn uilib-act-btn--primary btn-insert-comp" title="Rê chuột để xem thử & Chèn Component này vào trang web">
          ➕ Chèn Mới
        </button>
        ${isCustom ? `<button type="button" class="uilib-act-btn uilib-act-btn--danger btn-del-custom-bottom" title="Xóa mẫu tự Import này khỏi Kho UI">🗑️ Xóa</button>` : ''}
      </div>
    `;

    // Bind View Official .TSX Source button
    const btnViewTsx = card.querySelector('.btn-view-official-tsx');
    if (btnViewTsx) {
      btnViewTsx.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        state.editingCustomCompId = null;
        if (dom.modalUilibExplorer) dom.modalUilibExplorer.classList.remove('hidden');
        document.querySelectorAll('.uilib-mtab').forEach(b => b.classList.toggle('active', b.dataset.umtab === 'umtab-import'));
        document.querySelectorAll('.uilib-mtab-pane').forEach(p => {
          p.classList.toggle('hidden', p.id !== 'umtab-import');
          p.classList.toggle('active', p.id === 'umtab-import');
        });
        if (dom.importCompName) dom.importCompName.value = comp.name || '';
        if (dom.importCompCat) dom.importCompCat.value = comp.category || 'button';
        if (dom.importCompCode) {
          dom.importCompCode.value = comp.rawCode || comp.html || '';
        }
        if (dom.importLivePreviewStage) {
          state.lastSsrCompiledHtml = comp.html;
          dom.importLivePreviewStage.innerHTML = comp.html;
        }
        showToast(`Đang xem mã nguồn .TSX chính chủ: ${comp.name}`, '📄');
      });
    }

    // Bind Edit & Delete buttons for custom imported components
    if (isCustom) {
      const btnEdit = card.querySelector('.btn-edit-custom');
      if (btnEdit) {
        btnEdit.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          openEditCustomComponent(comp);
        });
      }
      card.querySelectorAll('.btn-del-custom, .btn-del-custom-bottom').forEach(btnDel => {
        btnDel.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          deleteCustomComponent(comp.id);
        });
      });
    }

    // Prevent links/buttons inside the preview stage from navigating away; allow interactive switch/checkbox toggle!
    const stageEl = card.querySelector('.uilib-comp-stage');
    stageEl.addEventListener('click', e => {
      const sw = e.target.closest('button[role="switch"]');
      if (sw) {
        e.preventDefault();
        e.stopPropagation();
        const isChecked = sw.getAttribute('data-state') === 'checked';
        const nextState = isChecked ? 'unchecked' : 'checked';
        sw.setAttribute('data-state', nextState);
        sw.setAttribute('aria-checked', String(!isChecked));
        sw.classList.toggle('bg-primary', !isChecked);
        sw.classList.toggle('bg-input', isChecked);
        const thumb = sw.querySelector('span[data-state]');
        if (thumb) {
          thumb.setAttribute('data-state', nextState);
          thumb.classList.toggle('translate-x-5', !isChecked);
          thumb.classList.toggle('translate-x-0', isChecked);
        }
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      insertLibComponentToPage(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    // Hovering the card stage previews on the live webpage (75ms hover-intent to avoid scroll/sweep lag)
    let hoverTimer = null;
    const cancelCardHover = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      clearComponentHoverPreview();
    };

    stageEl.addEventListener('mouseenter', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        previewComponentCardOnHover(comp);
      }, 75);
    });
    stageEl.addEventListener('mouseleave', cancelCardHover);

    // Action Button 1: Morph currently selected element (with full style, animation, hover FX & icon!)
    const btnMorph = card.querySelector('.btn-morph-comp');
    btnMorph.addEventListener('mouseenter', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        clearPreviewAddBlock();
        if (state.selectedEl) {
          startComponentFullMorphPreview(comp, `Áp Style & FX ${libMeta.name}: ${comp.name}`);
        }
      }, 75);
    });
    btnMorph.addEventListener('mouseleave', cancelCardHover);
    btnMorph.addEventListener('click', e => {
      e.stopPropagation();
      if (hoverTimer) clearTimeout(hoverTimer);
      morphSelectedWithLibComponent(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    // Action Button 2: Insert as new component block
    const btnInsert = card.querySelector('.btn-insert-comp');
    btnInsert.addEventListener('mouseenter', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        endHoverPreview();
        previewRawHtmlBlockOnHover(comp.html, `Chèn mới ${libMeta.name}: ${comp.name}`);
      }, 75);
    });
    btnInsert.addEventListener('mouseleave', cancelCardHover);
    btnInsert.addEventListener('click', e => {
      e.stopPropagation();
      if (hoverTimer) clearTimeout(hoverTimer);
      insertLibComponentToPage(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    return card;
  }

  function getFilteredUiComponents(queryStr, categoryFilter, libFilter, checkedSet = null, autoDetectedCat = null) {
    const allComps = window.STUDIO_LIB_COMPONENTS || [];
    const q = (queryStr || '').trim().toLowerCase();
    const hasChecked = checkedSet && checkedSet.size > 0;

    let filtered = allComps.filter(comp => {
      if (libFilter && libFilter !== 'all') {
        if (libFilter === 'custom') {
          if (!isCustomImportedComp(comp)) return false;
        } else if (comp.libId !== libFilter) {
          return false;
        }
      }

      // 1. If user checked 1 or more items in NameThat UI Checklist, filter by checked categories!
      if (hasChecked) {
        if (checkedSet.has('custom') && isCustomImportedComp(comp)) {
          // Matches custom
        } else if (!checkedSet.has(comp.category)) {
          return false;
        }
      } else if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== 'directory') {
        // 2. Otherwise use category pill filter
        if (categoryFilter === 'custom') {
          if (!isCustomImportedComp(comp)) return false;
        } else if (categoryFilter === 'hero') {
          if (comp.category !== 'hero' && comp.category !== 'nav') return false;
        } else if (comp.category !== categoryFilter) {
          return false;
        }
      } else if (autoDetectedCat && !q) {
        // 3. Auto-Match Selected Element on Canvas: show exact category + related categories!
        const taxonomy = (window.STUDIO_NAMETHAT_CATEGORIES || []).find(t => t.id === autoDetectedCat);
        const allowedCats = taxonomy && taxonomy.related ? taxonomy.related : [autoDetectedCat];
        if (!allowedCats.includes(comp.category)) return false;
      }

      if (!q) return true;
      const hay = [
        comp.name,
        comp.libName,
        comp.libId,
        comp.category,
        ...(comp.tags || [])
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });

    // If autoDetectedCat is active, sort exact category matches first, then related categories!
    if (autoDetectedCat && !hasChecked && (!categoryFilter || categoryFilter === 'all')) {
      filtered = filtered.slice().sort((a, b) => {
        const aExact = a.category === autoDetectedCat ? 0 : 1;
        const bExact = b.category === autoDetectedCat ? 0 : 1;
        return aExact - bExact;
      });
    }

    return filtered;
  }

  function renderNamethatChecklistUI() {
    if (!dom.namethatChecklistGrid) return;
    const categories = window.STUDIO_NAMETHAT_CATEGORIES || [];
    const allComps = window.STUDIO_LIB_COMPONENTS || [];
    const libs = window.STUDIO_UI_LIBRARIES || [];

    dom.namethatChecklistGrid.innerHTML = '';
    categories.forEach(cat => {
      const count = cat.id === 'custom'
        ? allComps.filter(isCustomImportedComp).length
        : allComps.filter(c => c.category === cat.id).length;

      const isChecked = state.namethatCheckedSet.has(cat.id);
      const labelEl = document.createElement('label');
      labelEl.className = 'namethat-check-item' + (isChecked ? ' checked' : '');
      labelEl.title = `${cat.name} — ${cat.vnName} (${count} mẫu có sẵn)`;
      labelEl.innerHTML = `
        <span class="namethat-check-label">
          <input type="checkbox" value="${cat.id}" ${isChecked ? 'checked' : ''} />
          <span>${cat.icon} ${cat.name}</span>
        </span>
        <span class="namethat-check-count">${count}</span>
      `;
      const chk = labelEl.querySelector('input');
      chk.addEventListener('change', () => {
        if (chk.checked) {
          state.namethatCheckedSet.add(cat.id);
        } else {
          state.namethatCheckedSet.delete(cat.id);
        }
        renderNamethatChecklistUI();
        renderSidebarUiLibraries();
      });
      dom.namethatChecklistGrid.appendChild(labelEl);
    });

    const checkedCount = state.namethatCheckedSet.size;
    if (dom.namethatCheckedBadge) {
      dom.namethatCheckedBadge.textContent = checkedCount;
      dom.namethatCheckedBadge.classList.toggle('hidden', checkedCount === 0);
    }
    if (dom.btnToggleNamethatChecklist) {
      dom.btnToggleNamethatChecklist.classList.toggle('active', checkedCount > 0 || (dom.namethatChecklistPanel && !dom.namethatChecklistPanel.classList.contains('hidden')));
    }

    // Show which UI Libraries have built the checked component types (both Pre-built in Studio & Web Ecosystem)!
    if (dom.namethatMatchingLibs) {
      if (checkedCount === 0) {
        dom.namethatMatchingLibs.classList.add('hidden');
        dom.namethatMatchingLibs.innerHTML = '';
      } else {
        const matchingComps = allComps.filter(c =>
          (state.namethatCheckedSet.has('custom') && isCustomImportedComp(c)) ||
          state.namethatCheckedSet.has(c.category)
        );
        const uniqueLibIds = Array.from(new Set(matchingComps.map(c => c.libId)));
        const badgesHtml = uniqueLibIds.map(lid => {
          const lMeta = libs.find(l => l.id === lid) || { id: lid, name: lid, url: 'https://21st.dev', accent: '#6366f1' };
          const isSelectedLib = state.uilibSelectedLib === lid;
          return `<span class="uilib-lib-badge" data-filter-lib="${lid}" title="Click để lọc mẫu của ${lMeta.name} (hoặc bấm ↗ mở trang chủ ${lMeta.url})" style="cursor:pointer;border-color:${lMeta.accent}${isSelectedLib ? 'ff' : '55'};color:${isSelectedLib ? '#fff' : lMeta.accent};background:${lMeta.accent}${isSelectedLib ? 'aa' : '18'};"><span>${lMeta.name}</span><a href="${lMeta.url}" target="_blank" rel="noopener" title="Mở trang chủ ${lMeta.name}" style="color:inherit;text-decoration:none;margin-left:3px;" onclick="event.stopPropagation();">↗</a></span>`;
        }).join('');

        // Also list other full-stack UI libraries from the 38+ collection that provide this component on their official docs
        const utilityOnlyIds = new Set(['fontawesome', 'swiper', 'gsap', 'venobox', 'tweakcn', 'namethatui']);
        const extraWebLibs = libs.filter(l => !uniqueLibIds.includes(l.id) && !utilityOnlyIds.has(l.id));
        const extraHtml = extraWebLibs.length > 0
          ? `<div style="width:100%;margin-top:4px;padding-top:4px;border-top:1px dashed rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;align-items:center;gap:4px;"><span style="font-size:10px;color:#94a3b8;">🌐 Mở web lấy thêm (${extraWebLibs.length} lib khác):</span>${extraWebLibs.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="uilib-lib-badge" title="Mở ${l.name} (${l.url}) để copy thêm mẫu rồi bấm Import Code" style="opacity:0.8;border-color:${l.accent}44;color:${l.accent};background:${l.accent}10;font-size:9.5px;">${l.name} ↗</a>`).join('')}</div>`
          : '';

        dom.namethatMatchingLibs.innerHTML = `
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px;width:100%;">
            <span style="color:#a5b4fc;font-weight:700;">⚡ Nhúng sẵn dùng ngay (${matchingComps.length} mẫu / ${uniqueLibIds.length} lib):</span>
            ${state.uilibSelectedLib !== 'all' ? `<button type="button" id="btn-clear-lib-subfilter" style="padding:1px 6px;background:#ef4444;color:#fff;border:none;border-radius:4px;font-size:10px;cursor:pointer;">✕ Bỏ lọc 1 lib</button>` : ''}
            ${badgesHtml}
          </div>
          ${extraHtml}
        `;
        dom.namethatMatchingLibs.classList.remove('hidden');

        dom.namethatMatchingLibs.querySelectorAll('[data-filter-lib]').forEach(badge => {
          badge.addEventListener('click', () => {
            const lid = badge.getAttribute('data-filter-lib');
            state.uilibSelectedLib = state.uilibSelectedLib === lid ? 'all' : lid;
            if (dom.uilibLibFilter) dom.uilibLibFilter.value = state.uilibSelectedLib;
            renderNamethatChecklistUI();
            renderSidebarUiLibraries();
          });
        });
        const btnClearSub = dom.namethatMatchingLibs.querySelector('#btn-clear-lib-subfilter');
        if (btnClearSub) {
          btnClearSub.addEventListener('click', () => {
            state.uilibSelectedLib = 'all';
            if (dom.uilibLibFilter) dom.uilibLibFilter.value = 'all';
            renderNamethatChecklistUI();
            renderSidebarUiLibraries();
          });
        }
      }
    }
  }

  function renderSidebarUiLibraries() {
    if (!dom.uilibComponentsList) return;
    dom.uilibComponentsList.innerHTML = '';

    const libs = window.STUDIO_UI_LIBRARIES || [];
    const q = (state.uilibSearchQuery || '').trim().toLowerCase();

    // If user chose "📚 38 Web Libs" directory mode, render the 38 libraries directory cards!
    if (state.uilibCategory === 'directory' && state.namethatCheckedSet.size === 0) {
      const filteredLibs = libs.filter(l => {
        if (!q) return true;
        return `${l.name} ${l.category} ${l.desc} ${l.badge}`.toLowerCase().includes(q);
      });
      if (dom.uilibResultsCount) {
        dom.uilibResultsCount.textContent = `Danh bạ ${filteredLibs.length} Thư viện UI (Click Logo mở Web)`;
      }
      filteredLibs.forEach(lib => {
        const compCount = (window.STUDIO_LIB_COMPONENTS || []).filter(c => c.libId === lib.id).length;
        const el = document.createElement('div');
        el.className = 'uilib-site-card';
        el.innerHTML = `
          <div class="uilib-site-card__top">
            <a href="${lib.url}" target="_blank" rel="noopener" class="uilib-site-card__name" title="Click vào Logo để mở trang chủ ${lib.name} (${lib.url})" style="text-decoration:none;">
              <span style="width:8px;height:8px;border-radius:50%;background:${lib.accent};display:inline-block;"></span>
              <span>${lib.name} ↗</span>
            </a>
            <a href="${lib.url}" target="_blank" rel="noopener" class="uilib-lib-badge" style="border-color:${lib.accent}55;color:${lib.accent};background:${lib.accent}15;">${lib.badge}</a>
          </div>
          <div class="uilib-site-card__desc">${lib.desc}</div>
          <div class="uilib-site-card__btns">
            <button type="button" class="uilib-action-pill btn-filter-this-lib" style="flex:1;">
              🔍 Xem ${compCount} mẫu có sẵn
            </button>
            <a href="${lib.url}" target="_blank" rel="noopener" class="uilib-action-pill uilib-action-pill--accent" style="text-decoration:none;">
              ↗ Mở Trang Chủ
            </a>
          </div>
        `;
        el.querySelector('.btn-filter-this-lib').addEventListener('click', () => {
          state.uilibCategory = 'all';
          state.uilibSelectedLib = lib.id;
          if (dom.uilibLibFilter) dom.uilibLibFilter.value = lib.id;
          if (dom.uilibCatPills) {
            dom.uilibCatPills.querySelectorAll('.uilib-cat-pill').forEach(b => {
              b.classList.toggle('active', b.dataset.uicat === 'all');
            });
          }
          renderSidebarUiLibraries();
        });
        dom.uilibComponentsList.appendChild(el);
      });
      return;
    }

    const activeAutoCat = (state.autoMatchSelectedEl && state.uilibCategory === 'all' && state.namethatCheckedSet.size === 0)
      ? state.autoDetectedCategory
      : null;

    const matched = getFilteredUiComponents(
      state.uilibSearchQuery,
      state.uilibCategory,
      state.uilibSelectedLib,
      state.namethatCheckedSet,
      activeAutoCat
    );

    if (dom.uilibResultsCount) {
      const uniqueLibs = new Set(matched.map(m => m.libName)).size;
      if (state.namethatCheckedSet.size > 0) {
        dom.uilibResultsCount.textContent = `☑️ Checklist (${state.namethatCheckedSet.size} loại): ${matched.length} mẫu từ ${uniqueLibs} Thư viện`;
      } else if (activeAutoCat) {
        dom.uilibResultsCount.textContent = `🎯 Gợi ý theo thẻ chọn: ${matched.length} mẫu từ ${uniqueLibs} Thư viện`;
      } else {
        dom.uilibResultsCount.textContent = `Tìm thấy ${matched.length} Component từ ${uniqueLibs} Thư viện`;
      }
    }

    if (matched.length === 0) {
      dom.uilibComponentsList.innerHTML = `
        <div class="empty-state-sm">
          Không tìm thấy mẫu khớp với bộ lọc hiện tại.<br/><br/>
          <button type="button" class="btn-secondary btn-sm" id="btn-empty-reset-filter">↺ Hiện tất cả Component</button>
        </div>
      `;
      const resetBtn = dom.uilibComponentsList.querySelector('#btn-empty-reset-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.uilibSearchQuery = '';
          if (dom.uilibSearchInput) dom.uilibSearchInput.value = '';
          state.uilibCategory = 'all';
          state.uilibSelectedLib = 'all';
          state.namethatCheckedSet.clear();
          state.autoDetectedCategory = null;
          if (dom.uilibDetectedBanner) dom.uilibDetectedBanner.classList.add('hidden');
          if (dom.uilibLibFilter) dom.uilibLibFilter.value = 'all';
          renderNamethatChecklistUI();
          renderSidebarUiLibraries();
        });
      }
      return;
    }

    const frag = document.createDocumentFragment();
    const SIDEBAR_BATCH_SIZE = 24;
    let renderedCount = 0;

    const appendNextSidebarBatch = () => {
      if (renderedCount >= matched.length) return;
      const oldMoreBtn = dom.uilibComponentsList.querySelector('.uilib-load-more-btn');
      if (oldMoreBtn) oldMoreBtn.remove();

      const slice = matched.slice(renderedCount, renderedCount + SIDEBAR_BATCH_SIZE);
      const batchFrag = document.createDocumentFragment();
      slice.forEach(comp => {
        batchFrag.appendChild(createComponentCardElement(comp, false));
      });
      renderedCount += slice.length;

      if (renderedCount < matched.length) {
        const moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.className = 'btn-secondary btn-sm uilib-load-more-btn';
        moreBtn.style.cssText = 'width:100%;margin-top:6px;padding:8px 12px;justify-content:center;';
        moreBtn.textContent = `↓ Xem thêm (${matched.length - renderedCount} Component còn lại)`;
        moreBtn.addEventListener('click', appendNextSidebarBatch);
        batchFrag.appendChild(moreBtn);
      }

      dom.uilibComponentsList.appendChild(batchFrag);
      if (window.translateDynamicStudioNodes) window.translateDynamicStudioNodes();
    };

    appendNextSidebarBatch();

    // Auto-append next batch when scrolling near the bottom of #uilib-components-list
    dom.uilibComponentsList.onscroll = () => {
      if (renderedCount >= matched.length) return;
      const el = dom.uilibComponentsList;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 280) {
        appendNextSidebarBatch();
      }
    };
  }

  function renderModalUiLibrariesExplorer(modalLibFilter = 'all', modalQuery = '') {
    if (!dom.uilibModalSitesList || !dom.uilibModalGrid) return;
    const libs = window.STUDIO_UI_LIBRARIES || [];

    // Left column: 38 Libraries list
    dom.uilibModalSitesList.innerHTML = '';
    const allItem = document.createElement('div');
    allItem.className = 'uilib-dir-item' + (modalLibFilter === 'all' ? ' active' : '');
    allItem.innerHTML = `<span>🌐 Tất cả 38+ Thư viện</span><span class="badge-count">${(window.STUDIO_LIB_COMPONENTS || []).length}</span>`;
    allItem.addEventListener('click', () => {
      renderModalUiLibrariesExplorer('all', dom.uilibModalSearch ? dom.uilibModalSearch.value : '');
    });
    dom.uilibModalSitesList.appendChild(allItem);

    libs.forEach(lib => {
      const count = (window.STUDIO_LIB_COMPONENTS || []).filter(c => c.libId === lib.id).length;
      const item = document.createElement('div');
      item.className = 'uilib-dir-item' + (modalLibFilter === lib.id ? ' active' : '');
      item.innerHTML = `
        <span style="display:flex;align-items:center;gap:7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
          <span style="width:7px;height:7px;border-radius:50%;background:${lib.accent};flex-shrink:0;"></span>
          <span>${lib.name}</span>
        </span>
        <span style="display:flex;align-items:center;gap:4px;">
          <span style="font-size:10px;opacity:0.65;">${count}</span>
          <a href="${lib.url}" target="_blank" rel="noopener" class="uilib-site-link" title="Mở trang chủ ${lib.url}" onclick="event.stopPropagation();">↗</a>
        </span>
      `;
      item.addEventListener('click', () => {
        renderModalUiLibrariesExplorer(lib.id, dom.uilibModalSearch ? dom.uilibModalSearch.value : '');
      });
      dom.uilibModalSitesList.appendChild(item);
    });

    // Right grid (progressive chunked rendering for 60fps modal smoothness)
    dom.uilibModalGrid.innerHTML = '';
    const matched = getFilteredUiComponents(modalQuery, 'all', modalLibFilter);
    const MODAL_BATCH_SIZE = 32;
    let modalRenderedCount = 0;

    const appendNextModalBatch = () => {
      if (modalRenderedCount >= matched.length) return;
      const oldMore = dom.uilibModalGrid.querySelector('.uilib-modal-load-more');
      if (oldMore) oldMore.remove();

      const slice = matched.slice(modalRenderedCount, modalRenderedCount + MODAL_BATCH_SIZE);
      const batchFrag = document.createDocumentFragment();
      slice.forEach(comp => {
        batchFrag.appendChild(createComponentCardElement(comp, true));
      });
      modalRenderedCount += slice.length;

      if (modalRenderedCount < matched.length) {
        const moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.className = 'btn-secondary btn-sm uilib-modal-load-more';
        moreBtn.style.cssText = 'grid-column: 1 / -1; width:100%; padding:10px; justify-content:center;';
        moreBtn.textContent = `↓ Xem thêm (${matched.length - modalRenderedCount} Component còn lại)`;
        moreBtn.addEventListener('click', appendNextModalBatch);
        batchFrag.appendChild(moreBtn);
      }

      dom.uilibModalGrid.appendChild(batchFrag);
      if (window.translateDynamicStudioNodes) window.translateDynamicStudioNodes();
    };

    appendNextModalBatch();

    dom.uilibModalGrid.onscroll = () => {
      if (modalRenderedCount >= matched.length) return;
      const el = dom.uilibModalGrid;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 320) {
        appendNextModalBatch();
      }
    };
  }

  function syncCdnChipsUI() {
    document.querySelectorAll('[data-inject-cdn]').forEach(chip => {
      const key = chip.dataset.injectCdn;
      chip.classList.toggle('active', state.injectedCdns.has(key));
    });
  }

  function initUiLibrariesHub() {
    loadSavedCustomComponents();
    syncLibraryCssEverywhere();
    renderNamethatChecklistUI();

    // Brand Logo Click -> Return to Home Page (index.html / index-creative-developer.html or Demo Home)
    if (dom.brandHomeLogo) {
      dom.brandHomeLogo.addEventListener('click', () => {
        if (state.files && state.files.length > 0) {
          const homeFile =
            state.files.find(f => f.relativePath === 'index-creative-developer.html') ||
            state.files.find(f => f.relativePath === 'index.html') ||
            state.files[0];
          if (homeFile) {
            if (dom.pageSelector) dom.pageSelector.value = homeFile.relativePath;
            loadWorkspacePage(homeFile.relativePath);
            showToast(`🏠 Đã quay về Trang Chủ (${homeFile.name})!`, '🏠');
            return;
          }
        }
        loadBuiltInDemo();
        showToast('🏠 Đã quay về Trang Chủ Demo!', '🏠');
      });
    }

    // NameThat UI Checklist Toggle, Reset & Close
    if (dom.btnToggleNamethatChecklist && dom.namethatChecklistPanel) {
      dom.btnToggleNamethatChecklist.addEventListener('click', () => {
        const isHidden = dom.namethatChecklistPanel.classList.toggle('hidden');
        dom.btnToggleNamethatChecklist.classList.toggle('active', !isHidden || state.namethatCheckedSet.size > 0);
        if (!isHidden) {
          renderNamethatChecklistUI();
        }
      });
    }
    if (dom.btnResetNamethat) {
      dom.btnResetNamethat.addEventListener('click', () => {
        state.namethatCheckedSet.clear();
        renderNamethatChecklistUI();
        renderSidebarUiLibraries();
        showToast('Đã bỏ chọn toàn bộ Checklist NameThat UI', '↺');
      });
    }
    if (dom.btnCloseNamethat && dom.namethatChecklistPanel) {
      dom.btnCloseNamethat.addEventListener('click', () => {
        dom.namethatChecklistPanel.classList.add('hidden');
        if (dom.btnToggleNamethatChecklist) {
          dom.btnToggleNamethatChecklist.classList.toggle('active', state.namethatCheckedSet.size > 0);
        }
      });
    }

    // Smart Toggles: Auto-Match Clicked Element & Morph Full FX/Icons
    if (dom.chkAutoMatchEl) {
      dom.chkAutoMatchEl.checked = state.autoMatchSelectedEl;
      dom.chkAutoMatchEl.addEventListener('change', e => {
        state.autoMatchSelectedEl = e.target.checked;
        if (!state.autoMatchSelectedEl) {
          state.autoDetectedCategory = null;
          if (dom.uilibDetectedBanner) dom.uilibDetectedBanner.classList.add('hidden');
        } else if (state.selectedEl) {
          state.autoDetectedCategory = detectElementUiCategory(state.selectedEl);
          if (state.autoDetectedCategory && dom.uilibDetectedBanner) {
            dom.uilibDetectedBanner.classList.remove('hidden');
          }
        }
        renderSidebarUiLibraries();
      });
    }
    if (dom.chkMorphWithFx) {
      dom.chkMorphWithFx.checked = state.morphWithFx;
      dom.chkMorphWithFx.addEventListener('change', e => {
        state.morphWithFx = e.target.checked;
        showToast(
          state.morphWithFx
            ? 'Đã bật: Khi Áp Style sẽ áp dụng luônทั้ง Animation, Hover & Icon!'
            : 'Đã tắt: Chỉ áp dụng màu sắc & viền cơ bản',
          '✨'
        );
      });
    }
    if (dom.btnShowAllUilibs) {
      dom.btnShowAllUilibs.addEventListener('click', () => {
        state.autoDetectedCategory = null;
        state.uilibCategory = 'all';
        state.namethatCheckedSet.clear();
        if (dom.uilibDetectedBanner) dom.uilibDetectedBanner.classList.add('hidden');
        if (dom.uilibCatPills) {
          dom.uilibCatPills.querySelectorAll('.uilib-cat-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.uicat === 'all');
          });
        }
        renderNamethatChecklistUI();
        renderSidebarUiLibraries();
      });
    }

    // Restore saved Studio Theme (tweakcn style)
    const savedTheme = localStorage.getItem('studio_ui_theme') || 'obsidian';
    document.documentElement.setAttribute('data-studio-theme', savedTheme);
    if (window.setReactBitsTheme) {
      window.setReactBitsTheme(savedTheme === 'daylight' ? 'light' : 'dark');
    }
    if (dom.studioThemeSelect) {
      dom.studioThemeSelect.value = savedTheme;
      dom.studioThemeSelect.addEventListener('change', e => {
        const theme = e.target.value;
        document.documentElement.setAttribute('data-studio-theme', theme);
        localStorage.setItem('studio_ui_theme', theme);
        if (window.setReactBitsTheme) {
          window.setReactBitsTheme(theme === 'daylight' ? 'light' : 'dark');
        }
        showToast(`Đã đổi giao diện Studio sang: ${e.target.options[e.target.selectedIndex].text}`, '🎨');
      });
    }

    // Populate #uilib-lib-filter dropdown with all 38+ libraries
    if (dom.uilibLibFilter && window.STUDIO_UI_LIBRARIES) {
      window.STUDIO_UI_LIBRARIES.forEach(lib => {
        const opt = document.createElement('option');
        opt.value = lib.id;
        opt.textContent = `${lib.name} (${lib.category})`;
        dom.uilibLibFilter.appendChild(opt);
      });
      dom.uilibLibFilter.addEventListener('change', e => {
        state.uilibSelectedLib = e.target.value;
        if (state.uilibCategory === 'directory') {
          state.uilibCategory = 'all';
        }
        renderSidebarUiLibraries();
      });
    }

    // Search input in Left Sidebar
    if (dom.uilibSearchInput) {
      dom.uilibSearchInput.addEventListener('input', e => {
        state.uilibSearchQuery = e.target.value;
        if (dom.btnClearUilibSearch) {
          dom.btnClearUilibSearch.classList.toggle('hidden', !state.uilibSearchQuery);
        }
        renderSidebarUiLibraries();
      });
    }
    if (dom.btnClearUilibSearch) {
      dom.btnClearUilibSearch.addEventListener('click', () => {
        state.uilibSearchQuery = '';
        dom.uilibSearchInput.value = '';
        dom.btnClearUilibSearch.classList.add('hidden');
        renderSidebarUiLibraries();
      });
    }

    // Category filter pills
    if (dom.uilibCatPills) {
      dom.uilibCatPills.querySelectorAll('.uilib-cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          dom.uilibCatPills.querySelectorAll('.uilib-cat-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.uilibCategory = pill.dataset.uicat;
          state.namethatCheckedSet.clear();
          if (state.uilibCategory !== 'all') {
            state.autoDetectedCategory = null;
            if (dom.uilibDetectedBanner) dom.uilibDetectedBanner.classList.add('hidden');
          }
          renderNamethatChecklistUI();
          renderSidebarUiLibraries();
        });
      });
    }

    // 1-Click CDN Injector Chips
    document.querySelectorAll('[data-inject-cdn]').forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.injectCdn;
        const def = CDN_DEFINITIONS[key];
        if (!def) return;
        if (state.injectedCdns.has(key)) {
          state.injectedCdns.delete(key);
          showToast(`Đã tắt CDN ${def.name} (Áp dụng khi lưu/tải lại)`, '📦');
        } else {
          state.injectedCdns.add(key);
          applyInjectedCdnsToDoc(dom.iframe.contentDocument);
          showToast(`Đã nạp trực tiếp ${def.name} vào trang web!`, '⚡');
        }
        syncCdnChipsUI();
        updateHistoryUI();
      });
    });

    // Right Inspector: 1-Click Pro Animation, Hover FX & Icon Injector
    const applyAnimFxToEl = (el, animType, isPreview = false) => {
      if (!el) return;
      syncLibraryCssEverywhere(el.ownerDocument);
      ['uilib-anim-rainbow', 'uilib-anim-shimmer', 'uilib-anim-glow', 'uilib-anim-float'].forEach(c => el.classList.remove(c));
      el.style.removeProperty('animation');
      const rec = !isPreview ? ensureEditRecord(el) : null;
      if (rec) delete rec.styles['animation'];

      if (animType === 'rainbow') {
        el.classList.add('uilib-comp', 'uilib-anim-rainbow');
        el.style.setProperty('background-image', 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)', 'important');
        el.style.setProperty('background-size', '300% 300%', 'important');
        el.style.setProperty('animation', 'uilib-rainbow 2.6s linear infinite', 'important');
        if (rec) {
          rec.styles['background-image'] = 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)';
          rec.styles['background-size'] = '300% 300%';
          rec.styles['animation'] = 'uilib-rainbow 2.6s linear infinite';
        }
      } else if (animType === 'shimmer') {
        el.classList.add('uilib-comp', 'uilib-anim-shimmer');
        el.style.setProperty('background-image', 'linear-gradient(110deg, #09090b 40%, #52525b 50%, #09090b 60%)', 'important');
        el.style.setProperty('background-size', '200% 100%', 'important');
        el.style.setProperty('animation', 'uilib-shimmer 2.2s infinite linear', 'important');
        if (rec) {
          rec.styles['background-image'] = 'linear-gradient(110deg, #09090b 40%, #52525b 50%, #09090b 60%)';
          rec.styles['background-size'] = '200% 100%';
          rec.styles['animation'] = 'uilib-shimmer 2.2s infinite linear';
        }
      } else if (animType === 'glow') {
        el.classList.add('uilib-comp', 'uilib-anim-glow');
        el.style.setProperty('animation', 'uilib-pulse-glow 2.2s ease-in-out infinite', 'important');
        if (rec) rec.styles['animation'] = 'uilib-pulse-glow 2.2s ease-in-out infinite';
      } else if (animType === 'float') {
        el.classList.add('uilib-comp', 'uilib-anim-float');
        el.style.setProperty('animation', 'uilib-float 2.6s ease-in-out infinite', 'important');
        if (rec) rec.styles['animation'] = 'uilib-float 2.6s ease-in-out infinite';
      }
      if (rec) rec.attrChanges['class'] = el.getAttribute('class') || '';
    };

    document.querySelectorAll('[data-fx-anim]').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (!state.selectedEl) return;
        ensureHoverBackupBaseline(state.selectedEl);
        applyAnimFxToEl(state.selectedEl, btn.dataset.fxAnim, true);
        showLivePreviewIndicator(`Animation: ${btn.textContent}`);
      });
      btn.addEventListener('mouseleave', endHoverPreview);
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const before = captureElementState(state.selectedEl);
        applyAnimFxToEl(state.selectedEl, btn.dataset.fxAnim, false);
        pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
        updateHistoryUI();
        showToast(`Đã áp dụng hiệu ứng: ${btn.textContent} (Ctrl+Z để hủy)`, '🎬');
      });
    });

    document.querySelectorAll('[data-fx-hover]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const before = captureElementState(state.selectedEl);
        syncLibraryCssEverywhere(state.selectedEl.ownerDocument);
        ['uilib-btn-hover-lift', 'uilib-btn-brutal', 'uilib-btn-duolingo'].forEach(c => state.selectedEl.classList.remove(c));
        state.selectedEl.classList.add('uilib-comp', btn.dataset.fxHover);
        const rec = ensureEditRecord(state.selectedEl);
        rec.attrChanges['class'] = state.selectedEl.getAttribute('class') || '';
        pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
        updateHistoryUI();
        showToast(`Đã gắn hiệu ứng Hover: ${btn.textContent}`, '🚀');
      });
    });

    // Right Inspector 3-Tab Switcher (Customize / Design / Layout)
    document.querySelectorAll('.insp-mode-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const targetId = tabBtn.getAttribute('data-insp-tab');
        document.querySelectorAll('.insp-mode-tab').forEach(b => b.classList.toggle('active', b === tabBtn));
        document.querySelectorAll('.insp-mode-pane').forEach(p => {
          const isMatch = p.id === targetId;
          p.classList.toggle('active', isMatch);
          p.classList.toggle('hidden', !isMatch);
        });
      });
    });

    document.querySelectorAll('[data-fx-icon]').forEach(btn => {
      const svgEl = btn.querySelector('svg');
      const iconMarkup = svgEl ? svgEl.outerHTML : btn.dataset.fxIcon;
      const injectIconFn = (el, iconVal, pos, isPreview) => {
        if (!el) return;
        const userText = extractCleanUserText(el);
        if (!userText) return;
        if (!isPreview && !el.hasAttribute('data-ui-orig-text')) {
          el.setAttribute('data-ui-orig-text', userText);
        }
        if (iconVal === 'clear') {
          el.textContent = userText;
          return;
        }
        const renderedIcon = svgEl ? iconMarkup : iconVal;
        if (pos === 'end') {
          el.innerHTML = `<span>${userText}</span><span data-uilib-decor="true" style="display:inline-flex;align-items:center;margin-left:6px;">${renderedIcon}</span>`;
        } else {
          el.innerHTML = `<span data-uilib-decor="true" style="display:inline-flex;align-items:center;margin-right:6px;">${renderedIcon}</span><span>${userText}</span>`;
        }
        el.style.setProperty('display', 'inline-flex', 'important');
        el.style.setProperty('align-items', 'center', 'important');
      };

      btn.addEventListener('mouseenter', () => {
        if (!state.selectedEl) return;
        ensureHoverBackupBaseline(state.selectedEl);
        injectIconFn(state.selectedEl, btn.dataset.fxIcon, btn.dataset.fxPos, true);
        showLivePreviewIndicator(`Lucide SVG: ${btn.dataset.fxIcon}`);
      });
      btn.addEventListener('mouseleave', endHoverPreview);
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const before = captureElementState(state.selectedEl);
        injectIconFn(state.selectedEl, btn.dataset.fxIcon, btn.dataset.fxPos, false);
        const rec = ensureEditRecord(state.selectedEl);
        rec.styles['display'] = 'inline-flex';
        rec.styles['align-items'] = 'center';
        pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
        updateHistoryUI();
        showToast(btn.dataset.fxIcon === 'clear' ? 'Đã gỡ SVG Icon khỏi phần tử' : `Đã gắn Lucide SVG (${btn.dataset.fxIcon}) vào phần tử!`, '✦');
      });
    });

    if (dom.btnFxReset) {
      dom.btnFxReset.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const before = captureElementState(state.selectedEl);
        Array.from(state.selectedEl.classList).forEach(c => {
          if (c.startsWith('uilib-')) state.selectedEl.classList.remove(c);
        });
        state.selectedEl.style.removeProperty('animation');
        const origText = state.selectedEl.getAttribute('data-ui-orig-text');
        if (origText !== null) {
          state.selectedEl.textContent = origText;
        } else {
          state.selectedEl.querySelectorAll('[data-uilib-decor="true"]').forEach(n => n.remove());
        }
        const rec = ensureEditRecord(state.selectedEl);
        delete rec.styles['animation'];
        rec.attrChanges['class'] = state.selectedEl.getAttribute('class') || '';
        pushUndoAction({ type: 'snapshot', selector: before.selector, before, after: captureElementState(state.selectedEl) });
        updateHistoryUI();
        showToast('Đã gỡ Animation, Hover FX & Icon đã gắn thêm!', '↺');
      });
    }

    // Open Full-Screen Modal Explorer (Ctrl+K or Topbar Search or Expand Button)
    const openExplorerModal = (defaultTab = 'umtab-catalog') => {
      if (!dom.modalUilibExplorer) return;
      dom.modalUilibExplorer.classList.remove('hidden');
      document.querySelectorAll('.uilib-mtab').forEach(b => {
        b.classList.toggle('active', b.dataset.umtab === defaultTab);
      });
      document.querySelectorAll('.uilib-mtab-pane').forEach(p => {
        p.classList.toggle('hidden', p.id !== defaultTab);
        p.classList.toggle('active', p.id === defaultTab);
      });
      if (defaultTab === 'umtab-catalog') {
        renderModalUiLibrariesExplorer('all', dom.uilibModalSearch ? dom.uilibModalSearch.value : '');
        if (dom.uilibModalSearch) dom.uilibModalSearch.focus();
      } else if (dom.importCompCode) {
        dom.importCompCode.focus();
      }
    };

    if (dom.btnOpenUilibExplorer) {
      dom.btnOpenUilibExplorer.addEventListener('click', () => openExplorerModal('umtab-catalog'));
    }
    if (dom.btnExpandUilibModal) {
      dom.btnExpandUilibModal.addEventListener('click', () => openExplorerModal('umtab-catalog'));
    }
    if (dom.btnOpenCustomImport) {
      dom.btnOpenCustomImport.addEventListener('click', () => {
        state.editingCustomCompId = null;
        openExplorerModal('umtab-import');
      });
    }
    if (dom.btnClearCustomImports) {
      dom.btnClearCustomImports.addEventListener('click', () => clearAllCustomComponents());
    }
    if (dom.btnClearCustomImportsModal) {
      dom.btnClearCustomImportsModal.addEventListener('click', () => clearAllCustomComponents());
    }

    // Modal internal tabs
    document.querySelectorAll('.uilib-mtab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        openExplorerModal(tabBtn.dataset.umtab);
      });
    });

    // Modal search input
    if (dom.uilibModalSearch) {
      dom.uilibModalSearch.addEventListener('input', e => {
        renderModalUiLibrariesExplorer('all', e.target.value);
      });
    }

    // Live Preview & Save in Custom JSX/Tailwind/HTML + Official .TSX SSR Importer
    let ssrCompileTimer = null;
    const updateCustomImportPreview = () => {
      if (!dom.importCompCode || !dom.importLivePreviewStage) return;
      const raw = dom.importCompCode.value.trim();
      const extraCss = dom.importCompCss ? dom.importCompCss.value.trim() : '';
      if (extraCss) {
        state.customExtraCss = extraCss;
        syncLibraryCssEverywhere();
      }
      if (!raw) {
        state.lastSsrCompiledHtml = null;
        dom.importLivePreviewStage.innerHTML = `<span style="color:#71717a;font-size:13px;">Hãy dán code .TSX / JSX / HTML hoặc link Registry JSON (vd: https://coss.com/origin/r/comp-175.json) vào ô bên trái...</span>`;
        return;
      }

      // Fast client-side preview first
      const fallbackHtml = `<div class="uilib-official-ssr">${convertJsxToCleanHtml(raw)}</div>`;
      dom.importLivePreviewStage.innerHTML = fallbackHtml;
      state.lastSsrCompiledHtml = fallbackHtml;

      // Also run real Server-Side TSX/Registry compiler if input is URL or TSX/JSX
      if (ssrCompileTimer) clearTimeout(ssrCompileTimer);
      const isUrl = /^https?:\/\/\S+$/i.test(raw);
      const looksLikeTsx = /import\s+|export\s+|function\s+|const\s+\w+\s*=|<[A-Z]\w+/m.test(raw);
      if (isUrl || looksLikeTsx) {
        ssrCompileTimer = setTimeout(async () => {
          try {
            if (isUrl) {
              const res = await fetch('/api/fetch-registry-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: raw })
              });
              const data = await res.json();
              const ssrHtml = data && (data.compiledHtml || data.html);
              if (ssrHtml) {
                const wrapped = ssrHtml.includes('uilib-official-ssr') ? ssrHtml : `<div class="uilib-official-ssr">${ssrHtml}</div>`;
                state.lastSsrCompiledHtml = wrapped;
                dom.importLivePreviewStage.innerHTML = wrapped;
                if (dom.importCompName && !dom.importCompName.value.trim() && data.name) {
                  dom.importCompName.value = data.name;
                }
              }
            } else {
              const res = await fetch('/api/compile-tsx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: raw })
              });
              const data = await res.json();
              const ssrHtml = data && (data.compiledHtml || data.html);
              if (ssrHtml) {
                const wrapped = ssrHtml.includes('uilib-official-ssr') ? ssrHtml : `<div class="uilib-official-ssr">${ssrHtml}</div>`;
                state.lastSsrCompiledHtml = wrapped;
                dom.importLivePreviewStage.innerHTML = wrapped;
              }
            }
          } catch (_) {
            // Keep fallbackHtml if offline
          }
        }, 180);
      }
    };

    if (dom.importCompCode) {
      dom.importCompCode.addEventListener('input', updateCustomImportPreview);
    }
    if (dom.importCompCss) {
      dom.importCompCss.addEventListener('input', updateCustomImportPreview);
    }

    const handleSaveImportedComponent = async (alsoInsertToPage = false) => {
      const rawCode = dom.importCompCode ? dom.importCompCode.value.trim() : '';
      if (!rawCode) {
        showToast('Hãy dán đoạn mã .TSX, JSX, HTML hoặc Registry URL vào ô trước!', '⚠️');
        return;
      }
      let cleanHtml = state.lastSsrCompiledHtml || `<div class="uilib-official-ssr">${convertJsxToCleanHtml(rawCode)}</div>`;
      // Ensure fresh SSR compile if user clicked Save immediately after pasting
      const isUrl = /^https?:\/\/\S+$/i.test(rawCode);
      const looksLikeTsx = /import\s+|export\s+|function\s+|const\s+\w+\s*=|<[A-Z]\w+/m.test(rawCode);
      if (isUrl || looksLikeTsx) {
        try {
          const endpoint = isUrl ? '/api/fetch-registry-url' : '/api/compile-tsx';
          const payload = isUrl ? { url: rawCode } : { code: rawCode };
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          const ssrHtml = data && (data.compiledHtml || data.html);
          if (ssrHtml) {
            cleanHtml = ssrHtml.includes('uilib-official-ssr') ? ssrHtml : `<div class="uilib-official-ssr">${ssrHtml}</div>`;
            if (isUrl && dom.importCompName && !dom.importCompName.value.trim() && data.name) {
              dom.importCompName.value = data.name;
            }
          }
        } catch (_) {}
      }
      const name = (dom.importCompName && dom.importCompName.value.trim()) || `Custom Component #${Date.now().toString().slice(-4)}`;
      const category = (dom.importCompCat && dom.importCompCat.value) || 'button';
      const extraCss = dom.importCompCss ? dom.importCompCss.value.trim() : '';

      if (extraCss) {
        state.customExtraCss = (state.customExtraCss ? state.customExtraCss + '\n' : '') + extraCss;
        localStorage.setItem('studio_custom_uilib_css', state.customExtraCss);
        syncLibraryCssEverywhere();
      }

      const compId = state.editingCustomCompId || `custom-${Date.now()}`;
      const newComp = {
        id: compId,
        isCustom: true,
        isOfficial: true,
        name,
        libId: '21stdev',
        libName: 'Custom .TSX Import',
        category,
        tags: [category, 'custom', 'import', 'tu import', name.toLowerCase()],
        morphStyles: {},
        rawCode,
        tsxSource: rawCode,
        html: cleanHtml
      };

      if (!window.STUDIO_LIB_COMPONENTS) window.STUDIO_LIB_COMPONENTS = [];
      const existingIdx = window.STUDIO_LIB_COMPONENTS.findIndex(c => c.id === compId);
      if (existingIdx >= 0) {
        window.STUDIO_LIB_COMPONENTS[existingIdx] = newComp;
      } else {
        window.STUDIO_LIB_COMPONENTS.unshift(newComp);
      }

      try {
        const existingSaved = JSON.parse(localStorage.getItem('studio_custom_uilib_comps') || '[]').filter(c => c.id !== compId);
        existingSaved.unshift(newComp);
        localStorage.setItem('studio_custom_uilib_comps', JSON.stringify(existingSaved.slice(0, 50)));
      } catch (_) {}

      state.editingCustomCompId = null;
      if (dom.importCompName) dom.importCompName.value = '';
      if (dom.importCompCode) dom.importCompCode.value = '';
      updateCustomImportPreview();

      syncCustomImportButtonsVisibility();
      renderSidebarUiLibraries();
      renderModalUiLibrariesExplorer();

      if (alsoInsertToPage) {
        insertLibComponentToPage(newComp);
        if (dom.modalUilibExplorer) dom.modalUilibExplorer.classList.add('hidden');
      } else {
        showToast(`Đã lưu "${name}" vào Kho UI! (Có nút ✏️ Sửa & 🗑️ Xóa ngay trên thẻ)`, '💾');
        openExplorerModal('umtab-catalog');
      }
    };

    if (dom.btnSaveAndInsertComp) {
      dom.btnSaveAndInsertComp.addEventListener('click', () => handleSaveImportedComponent(true));
    }
    if (dom.btnOnlySaveComp) {
      dom.btnOnlySaveComp.addEventListener('click', () => handleSaveImportedComponent(false));
    }

    syncCustomImportButtonsVisibility();
    renderSidebarUiLibraries();
    renderModalUiLibrariesExplorer();
  }

  // ==================== DRAG-TO-RESIZE LEFT & RIGHT SIDEBAR SPLITTERS ====================
  function initSidebarResizers() {
    const root = document.documentElement;
    const leftResizer = document.getElementById('resizer-left');
    const rightResizer = document.getElementById('resizer-right');
    const leftSidebar = document.querySelector('.sidebar--left');
    const rightSidebar = document.querySelector('.sidebar--right');

    let leftW = parseInt(localStorage.getItem('studio_left_w'), 10);
    if (isNaN(leftW) || leftW < 180 || leftW > 650) leftW = 310;
    let rightW = parseInt(localStorage.getItem('studio_right_w'), 10);
    if (isNaN(rightW) || rightW < 220 || rightW > 680) rightW = 370;

    function applySidebarWidths(save = false) {
      const vw = window.innerWidth || 1440;
      const minCanvasW = 240;
      // Ensure leftW + rightW never push the Right Sidebar off the screen on narrower windows
      if (leftW + rightW + minCanvasW > vw) {
        const available = Math.max(360, vw - minCanvasW);
        const ratio = rightW / Math.max(1, leftW + rightW);
        rightW = Math.max(220, Math.round(available * ratio));
        leftW = Math.max(180, available - rightW);
      }
      root.style.setProperty('--left-w', `${leftW}px`);
      root.style.setProperty('--right-w', `${rightW}px`);
      if (leftSidebar) leftSidebar.style.width = `${leftW}px`;
      if (rightSidebar) rightSidebar.style.width = `${rightW}px`;
      if (save) {
        localStorage.setItem('studio_left_w', String(leftW));
        localStorage.setItem('studio_right_w', String(rightW));
      }
      requestAnimationFrame(updateOverlayPosition);
    }

    applySidebarWidths(false);
    window.addEventListener('resize', () => applySidebarWidths(false));

    if (leftResizer) {
      leftResizer.addEventListener('pointerdown', e => {
        e.preventDefault();
        leftResizer.setPointerCapture(e.pointerId);
        leftResizer.classList.add('is-dragging');
        document.body.classList.add('is-resizing-sidebar');

        const onMove = ev => {
          const maxLeft = Math.min(640, (window.innerWidth || 1440) - rightW - 240);
          leftW = Math.max(180, Math.min(maxLeft, Math.round(ev.clientX)));
          applySidebarWidths(false);
        };
        const onUp = ev => {
          leftResizer.releasePointerCapture(ev.pointerId);
          leftResizer.classList.remove('is-dragging');
          document.body.classList.remove('is-resizing-sidebar');
          leftResizer.removeEventListener('pointermove', onMove);
          leftResizer.removeEventListener('pointerup', onUp);
          leftResizer.removeEventListener('pointercancel', onUp);
          applySidebarWidths(true);
        };
        leftResizer.addEventListener('pointermove', onMove);
        leftResizer.addEventListener('pointerup', onUp);
        leftResizer.addEventListener('pointercancel', onUp);
      });

      leftResizer.addEventListener('dblclick', () => {
        leftW = 310;
        applySidebarWidths(true);
        showToast('Đã đặt lại kích thước cột Trái mặc định (310px)', '↔️');
      });
    }

    if (rightResizer) {
      rightResizer.addEventListener('pointerdown', e => {
        e.preventDefault();
        rightResizer.setPointerCapture(e.pointerId);
        rightResizer.classList.add('is-dragging');
        document.body.classList.add('is-resizing-sidebar');

        const onMove = ev => {
          const vw = window.innerWidth || 1440;
          const maxRight = Math.min(680, vw - leftW - 240);
          rightW = Math.max(230, Math.min(maxRight, Math.round(vw - ev.clientX)));
          applySidebarWidths(false);
        };
        const onUp = ev => {
          rightResizer.releasePointerCapture(ev.pointerId);
          rightResizer.classList.remove('is-dragging');
          document.body.classList.remove('is-resizing-sidebar');
          rightResizer.removeEventListener('pointermove', onMove);
          rightResizer.removeEventListener('pointerup', onUp);
          rightResizer.removeEventListener('pointercancel', onUp);
          applySidebarWidths(true);
        };
        rightResizer.addEventListener('pointermove', onMove);
        rightResizer.addEventListener('pointerup', onUp);
        rightResizer.addEventListener('pointercancel', onUp);
      });

      rightResizer.addEventListener('dblclick', () => {
        rightW = 370;
        applySidebarWidths(true);
        showToast('Đã đặt lại kích thước cột Phải mặc định (370px)', '↔️');
      });
    }
  }

  // ==================== EVENT BINDINGS FOR STUDIO UI ====================
  function initStudioUIEvents() {
    window.addEventListener('keydown', handleGlobalKeydown);

    initSidebarResizers();
    initUiLibrariesHub();
    renderMagicPresetsCatalog();

    // Upgrade Font Family, Font Weight & Border Style to Live-Hover Preview Dropdowns!
    upgradeSelectToLivePreviewDropdown(dom.propFontFamily, {
      renderItemStyle: (item, val) => {
        if (val) item.style.fontFamily = val;
      },
      renderTriggerStyle: (labelEl, val) => {
        labelEl.style.fontFamily = val || 'inherit';
      },
      getPreviewStyleMap: val => ({
        'font-family': val || '__ORIGINAL__'
      })
    });

    upgradeSelectToLivePreviewDropdown(dom.propFontWeight, {
      renderItemStyle: (item, val) => {
        if (val) item.style.fontWeight = val;
      },
      renderTriggerStyle: (labelEl, val) => {
        labelEl.style.fontWeight = val || '500';
      },
      getPreviewStyleMap: val => ({
        'font-weight': val || '__ORIGINAL__'
      })
    });

    upgradeSelectToLivePreviewDropdown(dom.propBorderStyle, {
      getPreviewStyleMap: val => {
        const w = Math.max(1, parseInt(dom.propBorderWidth.value, 10) || 2);
        const c = dom.propBorderColor.value || '#6366f1';
        if (val === 'none') return { border: 'none' };
        return { border: `${w}px ${val} ${c}` };
      }
    });

    // Iframe load hook
    dom.iframe.addEventListener('load', () => {
      const doc = dom.iframe.contentDocument;
      if (!doc || !doc.body) return;
      injectStudioOverlay(doc);
      buildDomTree();
    });

    // Topbar page selector
    dom.pageSelector.addEventListener('change', e => {
      if (e.target.value) {
        loadWorkspacePage(e.target.value);
      }
    });

    dom.btnChangeFolder.addEventListener('click', () => {
      dom.modalOpenWeb.classList.remove('hidden');
      dom.inputWorkspacePath.focus();
    });

    dom.btnOpenLocalFile.addEventListener('click', () => {
      dom.modalOpenWeb.classList.remove('hidden');
    });

    dom.btnLoadDemo.addEventListener('click', () => {
      dom.pageSelector.value = '';
      loadBuiltInDemo();
    });

    // Viewport Switcher
    dom.viewportSwitcher.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.viewportSwitcher.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        dom.canvasFrameWrapper.style.width = btn.dataset.viewport;
        setTimeout(updateOverlayPosition, 260);
      });
    });

    // Zoom Controls
    function applyZoom(newZoom) {
      state.zoom = Math.max(0.4, Math.min(1.5, newZoom));
      dom.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
      dom.canvasFrameWrapper.style.transform = `scale(${state.zoom})`;
      setTimeout(updateOverlayPosition, 60);
    }
    dom.btnZoomIn.addEventListener('click', () => applyZoom(state.zoom + 0.1));
    dom.btnZoomOut.addEventListener('click', () => applyZoom(state.zoom - 0.1));
    dom.btnZoomReset.addEventListener('click', () => applyZoom(1));

    // Edit vs Preview Mode
    dom.modeEditBtn.addEventListener('click', () => {
      state.mode = 'edit';
      dom.modeEditBtn.classList.add('active');
      dom.modePreviewBtn.classList.remove('active');
      updateBypassLoaderStyles(dom.iframe.contentDocument);
      updateOverlayPosition();
      showToast('Chế độ Sửa: Click & kéo thả bất kỳ phần tử nào', '✏️');
    });

    dom.modePreviewBtn.addEventListener('click', () => {
      state.mode = 'preview';
      dom.modePreviewBtn.classList.add('active');
      dom.modeEditBtn.classList.remove('active');
      updateBypassLoaderStyles(dom.iframe.contentDocument);
      updateOverlayPosition();
      showToast('Chế độ Xem Thử: Trải nghiệm trang web như thực tế', '👁️');
    });

    dom.chkBypassLoader.addEventListener('change', e => {
      state.bypassLoader = e.target.checked;
      updateBypassLoaderStyles(dom.iframe.contentDocument);
    });

    // Undo / Redo / Save / Export
    dom.btnUndo.addEventListener('click', performUndo);
    dom.btnRedo.addEventListener('click', performRedo);
    dom.btnDownloadHtml.addEventListener('click', downloadEditedHtml);
    dom.btnSaveDirect.addEventListener('click', saveDirectlyToSource);

    dom.btnAiPrompt.addEventListener('click', () => {
      populateAllPromptTabs();
      dom.modalAiPrompt.classList.remove('hidden');
    });

    // Left Sidebar Tabs
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });

    dom.layerSearch.addEventListener('input', buildDomTree);
    dom.btnRefreshTree.addEventListener('click', buildDomTree);

    // Add Blocks (WITH LIVE GHOST PREVIEW ON HOVER!)
    document.querySelectorAll('[data-add-type]').forEach(btn => {
      const titleEl = btn.querySelector('.add-block-title');
      const label = titleEl ? titleEl.textContent : btn.dataset.addType;
      btn.addEventListener('mouseenter', () => {
        previewAddBlockOnHover(btn.dataset.addType, label);
      });
      btn.addEventListener('mouseleave', () => {
        clearPreviewAddBlock();
      });
      btn.addEventListener('click', () => {
        clearPreviewAddBlock();
        insertNewElement(btn.dataset.addType);
      });
    });

    dom.btnClearAllEdits.addEventListener('click', () => {
      if (state.currentFile && state.files.some(f => f.relativePath === state.currentFile)) {
        loadWorkspacePage(state.currentFile);
      } else if (state.originalRawHtml) {
        loadRawHtmlString(state.originalRawHtml, state.currentFile || 'page.html');
      }
      showToast('Đã khôi phục toàn bộ giao diện về trạng thái gốc!', '🔄');
    });

    // Right Inspector Quick Element Actions
    dom.btnElParent.addEventListener('click', () => {
      if (state.selectedEl && state.selectedEl.parentElement) {
        selectElement(state.selectedEl.parentElement);
      }
    });

    dom.btnElDuplicate.addEventListener('click', () => {
      if (!state.selectedEl) return;
      const clone = state.selectedEl.cloneNode(true);
      const uniqueId = `ui-clone-${Date.now().toString(36)}`;
      clone.removeAttribute('id');
      clone.setAttribute('data-ui-custom-id', uniqueId);
      state.selectedEl.insertAdjacentElement('afterend', clone);
      const nodeInfo = {
        id: uniqueId,
        type: 'duplicate',
        parentSelector: getUniqueSelector(state.selectedEl.parentElement) || 'body',
        html: clone.outerHTML
      };
      state.addedNodes.push(nodeInfo);
      state.undoStack.push({ type: 'add_node', nodeInfo });
      state.redoStack = [];
      selectElement(clone);
      buildDomTree();
      updateHistoryUI();
      showToast('Đã nhân bản phần tử! (Bấm Ctrl+Z hoặc 🗑️ Xóa nếu muốn hủy)', '📋');
    });

    dom.btnElReset.addEventListener('mouseenter', () => {
      if (!state.selectedEl) return;
      const selector = getUniqueSelector(state.selectedEl);
      const rec = state.editsMap.get(selector);
      if (rec) {
        const resetMap = {};
        Object.keys(rec.styles).forEach(k => (resetMap[k] = '__ORIGINAL__'));
        startHoverPreview(resetMap, 'Khôi phục phần tử về gốc');
      }
    });
    dom.btnElReset.addEventListener('mouseleave', endHoverPreview);
    dom.btnElReset.addEventListener('click', () => {
      if (!state.selectedEl) return;
      resetElementToOriginal(state.selectedEl);
    });

    dom.btnElDelete.addEventListener('click', deleteSelectedElement);

    // Section & Property Reset Buttons ("↺ Màu gốc / Vị trí gốc") with Live Hover Preview!
    if (dom.btnPosReset) {
      dom.btnPosReset.addEventListener('mouseenter', () => {
        startHoverPreview({ translate: '__ORIGINAL__', rotate: '__ORIGINAL__', scale: '__ORIGINAL__', width: '__ORIGINAL__', height: '__ORIGINAL__', 'margin-left': '__ORIGINAL__', 'margin-top': '__ORIGINAL__' }, 'Vị trí & Kích thước gốc');
      });
      dom.btnPosReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnPosReset.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const el = state.selectedEl;
        const beforeSnap = captureElementState(el);
        el.removeAttribute('data-ui-dx');
        el.removeAttribute('data-ui-dy');
        el.removeAttribute('data-ui-rot');
        el.removeAttribute('data-ui-scale');
        resetPropertiesGroup(el, ['translate', 'rotate', 'scale', 'width', 'height', 'margin-left', 'margin-top'], 'Đã đưa vị trí & kích thước về gốc!');
        if (state.undoStack.length > 0 && state.undoStack[state.undoStack.length - 1].type === 'snapshot') {
          state.undoStack[state.undoStack.length - 1].before = beforeSnap;
        }
      });
    }

    if (dom.btnColorReset) {
      dom.btnColorReset.addEventListener('mouseenter', () => {
        startHoverPreview({ color: '__ORIGINAL__' }, 'Màu chữ gốc');
      });
      dom.btnColorReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnColorReset.addEventListener('click', () => {
        resetPropertiesGroup(state.selectedEl, ['color'], 'Đã quay lại màu chữ gốc ban đầu!');
      });
    }

    const handleBgReset = () => {
      resetPropertiesGroup(state.selectedEl, ['background', 'background-color', 'background-image'], 'Đã quay lại màu nền / Gradient gốc ban đầu!');
    };
    if (dom.btnBgReset) {
      dom.btnBgReset.addEventListener('mouseenter', () => {
        startHoverPreview({ background: '__ORIGINAL__', 'background-color': '__ORIGINAL__', 'background-image': '__ORIGINAL__' }, 'Màu nền gốc');
      });
      dom.btnBgReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnBgReset.addEventListener('click', handleBgReset);
    }
    if (dom.btnGradReset) {
      dom.btnGradReset.addEventListener('mouseenter', () => {
        startHoverPreview({ background: '__ORIGINAL__', 'background-color': '__ORIGINAL__', 'background-image': '__ORIGINAL__' }, 'Bỏ Gradient / Về màu gốc');
      });
      dom.btnGradReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnGradReset.addEventListener('click', handleBgReset);
    }
    if (dom.btnAllColorsReset) {
      dom.btnAllColorsReset.addEventListener('mouseenter', () => {
        startHoverPreview({ color: '__ORIGINAL__', background: '__ORIGINAL__', 'background-color': '__ORIGINAL__', 'background-image': '__ORIGINAL__', opacity: '__ORIGINAL__' }, 'Tất cả màu gốc');
      });
      dom.btnAllColorsReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnAllColorsReset.addEventListener('click', () => {
        resetPropertiesGroup(state.selectedEl, ['color', 'background', 'background-color', 'background-image', 'opacity'], 'Đã khôi phục toàn bộ màu sắc về gốc!');
      });
    }

    if (dom.btnFontReset) {
      dom.btnFontReset.addEventListener('mouseenter', () => {
        startHoverPreview({ 'font-family': '__ORIGINAL__', 'font-weight': '__ORIGINAL__', 'font-size': '__ORIGINAL__', 'text-align': '__ORIGINAL__', 'letter-spacing': '__ORIGINAL__' }, 'Kiểu chữ gốc');
      });
      dom.btnFontReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnFontReset.addEventListener('click', () => {
        resetPropertiesGroup(state.selectedEl, ['font-family', 'font-weight', 'font-size', 'text-align', 'letter-spacing'], 'Đã khôi phục Font & Kiểu chữ về gốc!');
        syncAllLiveSelectTriggers();
      });
    }

    if (dom.btnBorderReset) {
      dom.btnBorderReset.addEventListener('mouseenter', () => {
        startHoverPreview({ 'border-radius': '__ORIGINAL__', border: '__ORIGINAL__', 'box-shadow': '__ORIGINAL__' }, 'Viền & Đổ bóng gốc');
      });
      dom.btnBorderReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnBorderReset.addEventListener('click', () => {
        resetPropertiesGroup(state.selectedEl, ['border-radius', 'border', 'box-shadow'], 'Đã khôi phục Bo góc, Viền & Đổ bóng về gốc!');
        syncAllLiveSelectTriggers();
      });
    }

    if (dom.btnSpacingReset) {
      dom.btnSpacingReset.addEventListener('mouseenter', () => {
        startHoverPreview({
          'padding-top': '__ORIGINAL__', 'padding-right': '__ORIGINAL__', 'padding-bottom': '__ORIGINAL__', 'padding-left': '__ORIGINAL__',
          'margin-top': '__ORIGINAL__', 'margin-right': '__ORIGINAL__', 'margin-bottom': '__ORIGINAL__', 'margin-left': '__ORIGINAL__'
        }, 'Khoảng cách gốc');
      });
      dom.btnSpacingReset.addEventListener('mouseleave', endHoverPreview);
      dom.btnSpacingReset.addEventListener('click', () => {
        resetPropertiesGroup(state.selectedEl, [
          'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
          'margin-top', 'margin-right', 'margin-bottom', 'margin-left'
        ], 'Đã khôi phục Khoảng cách Padding & Margin về gốc!');
      });
    }

    // Drag Mode Select
    dom.dragModeSelect.addEventListener('change', e => {
      state.dragMode = e.target.value;
    });

    // X / Y Nudge Stepper Buttons & Direct Inputs (WITH LIVE HOVER PREVIEW!)
    document.querySelectorAll('[data-nudge-x]').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (!state.selectedEl) return;
        const delta = parseInt(btn.dataset.nudgeX, 10);
        const { dx, dy } = getElementOffsets(state.selectedEl);
        startHoverPreview({ translate: `${dx + delta}px ${dy}px` }, `Dịch ngang ${delta > 0 ? '+' + delta : delta}px`);
      });
      btn.addEventListener('mouseleave', endHoverPreview);
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const delta = parseInt(btn.dataset.nudgeX, 10);
        const { dx, dy } = getElementOffsets(state.selectedEl);
        applyElementPosition(state.selectedEl, dx + delta, dy);
      });
    });

    document.querySelectorAll('[data-nudge-y]').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (!state.selectedEl) return;
        const delta = parseInt(btn.dataset.nudgeY, 10);
        const { dx, dy } = getElementOffsets(state.selectedEl);
        startHoverPreview({ translate: `${dx}px ${dy + delta}px` }, `Dịch dọc ${delta > 0 ? '+' + delta : delta}px`);
      });
      btn.addEventListener('mouseleave', endHoverPreview);
      btn.addEventListener('click', () => {
        if (!state.selectedEl) return;
        endHoverPreview();
        const delta = parseInt(btn.dataset.nudgeY, 10);
        const { dx, dy } = getElementOffsets(state.selectedEl);
        applyElementPosition(state.selectedEl, dx, dy + delta);
      });
    });

    dom.propX.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const { dy } = getElementOffsets(state.selectedEl);
      applyElementPosition(state.selectedEl, parseFloat(e.target.value) || 0, dy);
    });

    dom.propY.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const { dx } = getElementOffsets(state.selectedEl);
      applyElementPosition(state.selectedEl, dx, parseFloat(e.target.value) || 0);
    });

    // Width, Height, Rotate, Scale, Z-Index
    dom.propWidth.addEventListener('change', e => {
      if (!state.selectedEl) return;
      const val = /^\d+$/.test(e.target.value.trim()) ? `${e.target.value.trim()}px` : e.target.value.trim();
      applyStyleProperty(state.selectedEl, 'width', val);
    });
    dom.btnWidthAuto.addEventListener('click', () => {
      if (!state.selectedEl) return;
      dom.propWidth.value = 'auto';
      applyStyleProperty(state.selectedEl, 'width', '');
    });

    dom.propHeight.addEventListener('change', e => {
      if (!state.selectedEl) return;
      const val = /^\d+$/.test(e.target.value.trim()) ? `${e.target.value.trim()}px` : e.target.value.trim();
      applyStyleProperty(state.selectedEl, 'height', val);
    });
    dom.btnHeightAuto.addEventListener('click', () => {
      if (!state.selectedEl) return;
      dom.propHeight.value = 'auto';
      applyStyleProperty(state.selectedEl, 'height', '');
    });

    dom.propRotate.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const { dx, dy, scale } = getElementOffsets(state.selectedEl);
      applyElementPosition(state.selectedEl, dx, dy, parseFloat(e.target.value) || 0, scale);
    });

    dom.propScale.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const { dx, dy, rot } = getElementOffsets(state.selectedEl);
      applyElementPosition(state.selectedEl, dx, dy, rot, parseFloat(e.target.value) || 100);
    });

    dom.propZIndex.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const v = e.target.value.trim();
      if (v !== '') {
        const comp = state.selectedEl.ownerDocument.defaultView.getComputedStyle(state.selectedEl);
        if (comp.position === 'static') {
          applyStyleProperty(state.selectedEl, 'position', 'relative', false);
        }
      }
      applyStyleProperty(state.selectedEl, 'z-index', v);
    });

    // Colors & Gradients (WITH LIVE HOVER PREVIEW ON EVERY SWATCH!)
    dom.propColorPicker.addEventListener('input', e => {
      dom.propColorHex.value = e.target.value;
      applyStyleProperty(state.selectedEl, 'color', e.target.value);
    });
    dom.propColorHex.addEventListener('change', e => {
      applyStyleProperty(state.selectedEl, 'color', e.target.value);
    });
    document.querySelectorAll('[data-text-color]').forEach(sw => {
      sw.addEventListener('mouseenter', () => {
        startHoverPreview({ color: sw.dataset.textColor }, `Màu chữ ${sw.title || sw.dataset.textColor}`);
      });
      sw.addEventListener('mouseleave', endHoverPreview);
      sw.addEventListener('click', () => {
        endHoverPreview();
        const c = sw.dataset.textColor;
        dom.propColorPicker.value = c;
        dom.propColorHex.value = c;
        applyStyleProperty(state.selectedEl, 'color', c);
      });
    });

    dom.propBgPicker.addEventListener('input', e => {
      dom.propBgHex.value = e.target.value;
      applyStyleProperty(state.selectedEl, 'background', '', false);
      applyStyleProperty(state.selectedEl, 'background-image', 'none', false);
      applyStyleProperty(state.selectedEl, 'background-color', e.target.value);
    });
    dom.propBgHex.addEventListener('change', e => {
      applyStyleProperty(state.selectedEl, 'background', '', false);
      applyStyleProperty(state.selectedEl, 'background-image', 'none', false);
      applyStyleProperty(state.selectedEl, 'background-color', e.target.value);
    });
    dom.btnBgTransparent.addEventListener('mouseenter', () => {
      startHoverPreview({ background: 'none', 'background-image': 'none', 'background-color': 'transparent' }, 'Nền trong suốt');
    });
    dom.btnBgTransparent.addEventListener('mouseleave', endHoverPreview);
    dom.btnBgTransparent.addEventListener('click', () => {
      endHoverPreview();
      dom.propBgHex.value = 'transparent';
      applyStyleProperty(state.selectedEl, 'background', 'none', false);
      applyStyleProperty(state.selectedEl, 'background-image', 'none', false);
      applyStyleProperty(state.selectedEl, 'background-color', 'transparent');
    });
    document.querySelectorAll('[data-bg-color]').forEach(sw => {
      sw.addEventListener('mouseenter', () => {
        const c = sw.dataset.bgColor;
        startHoverPreview({ background: c, 'background-image': 'none', 'background-color': c }, `Màu nền ${sw.title || c}`);
      });
      sw.addEventListener('mouseleave', endHoverPreview);
      sw.addEventListener('click', () => {
        endHoverPreview();
        const c = sw.dataset.bgColor;
        dom.propBgPicker.value = c;
        dom.propBgHex.value = c;
        applyStyleProperty(state.selectedEl, 'background', '', false);
        applyStyleProperty(state.selectedEl, 'background-image', 'none', false);
        applyStyleProperty(state.selectedEl, 'background-color', c);
      });
    });
    document.querySelectorAll('[data-bg-gradient]').forEach(sw => {
      sw.addEventListener('mouseenter', () => {
        startHoverPreview({ background: sw.dataset.bgGradient }, `Gradient ${sw.title || ''}`);
      });
      sw.addEventListener('mouseleave', endHoverPreview);
      sw.addEventListener('click', () => {
        endHoverPreview();
        const grad = sw.dataset.bgGradient;
        applyStyleProperty(state.selectedEl, 'background-color', '', false);
        applyStyleProperty(state.selectedEl, 'background-image', '', false);
        applyStyleProperty(state.selectedEl, 'background', grad);
      });
    });

    dom.propOpacitySlider.addEventListener('input', e => {
      const pct = parseInt(e.target.value, 10);
      dom.propOpacityVal.textContent = `${pct}%`;
      applyStyleProperty(state.selectedEl, 'opacity', (pct / 100).toFixed(2));
    });

    // Text Content, Image Src, Link Href
    dom.propTextContent.addEventListener('input', e => {
      if (!state.selectedEl) return;
      const val = e.target.value;
      const captionSpan = state.selectedEl.querySelector('.btn-caption, span');
      if (captionSpan && state.selectedEl.children.length > 1) {
        captionSpan.textContent = val;
        const rec = ensureEditRecord(captionSpan);
        rec.textChanged = val;
      } else {
        state.selectedEl.textContent = val;
        const rec = ensureEditRecord(state.selectedEl);
        rec.textChanged = val;
      }
      updateOverlayPosition();
      updateHistoryUI();
    });

    if (dom.btnTextReset) {
      dom.btnTextReset.addEventListener('click', () => {
        if (!state.selectedEl) return;
        const origHtml = state.selectedEl.getAttribute('data-orig-html');
        if (origHtml !== null) {
          state.selectedEl.innerHTML = origHtml;
          const rec = state.editsMap.get(getUniqueSelector(state.selectedEl));
          if (rec) rec.textChanged = null;
          selectElement(state.selectedEl);
          updateHistoryUI();
          showToast('Đã khôi phục nội dung chữ gốc!', '↺');
        }
      });
    }

    if (dom.btnImgReset) {
      dom.btnImgReset.addEventListener('click', () => {
        if (!state.selectedEl) return;
        const imgEl = state.selectedEl.tagName.toLowerCase() === 'img'
          ? state.selectedEl
          : state.selectedEl.querySelector('img');
        if (imgEl && imgEl.hasAttribute('data-orig-src')) {
          const origSrc = imgEl.getAttribute('data-orig-src');
          imgEl.setAttribute('src', origSrc);
          dom.propImgSrc.value = origSrc;
          const rec = state.editsMap.get(getUniqueSelector(imgEl));
          if (rec) delete rec.attrChanges['src'];
          updateHistoryUI();
          showToast('Đã khôi phục ảnh gốc!', '↺');
        }
      });
    }

    dom.propImgSrc.addEventListener('change', e => {
      if (!state.selectedEl) return;
      const imgEl = state.selectedEl.tagName.toLowerCase() === 'img'
        ? state.selectedEl
        : state.selectedEl.querySelector('img');
      if (imgEl) {
        imgEl.setAttribute('src', e.target.value);
        const rec = ensureEditRecord(imgEl);
        rec.attrChanges['src'] = e.target.value;
        updateHistoryUI();
      }
    });

    dom.propImgFile.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file || !state.selectedEl) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const imgEl = state.selectedEl.tagName.toLowerCase() === 'img'
          ? state.selectedEl
          : state.selectedEl.querySelector('img');
        if (imgEl) {
          imgEl.setAttribute('src', dataUrl);
          dom.propImgSrc.value = file.name;
          const rec = ensureEditRecord(imgEl);
          rec.attrChanges['src'] = dataUrl;
          updateHistoryUI();
          showToast('Đã thay ảnh mới thành công!', '🖼️');
        }
      };
      reader.readAsDataURL(file);
    });

    dom.propLinkHref.addEventListener('change', e => {
      if (!state.selectedEl) return;
      const anchor = state.selectedEl.tagName.toLowerCase() === 'a'
        ? state.selectedEl
        : state.selectedEl.closest('a');
      if (anchor) {
        anchor.setAttribute('href', e.target.value);
        const rec = ensureEditRecord(anchor);
        rec.attrChanges['href'] = e.target.value;
        updateHistoryUI();
      }
    });

    // Typography
    dom.propFontFamily.addEventListener('change', e => {
      applyStyleProperty(state.selectedEl, 'font-family', e.target.value);
    });
    dom.propFontWeight.addEventListener('change', e => {
      applyStyleProperty(state.selectedEl, 'font-weight', e.target.value);
    });
    dom.propFontsizeSlider.addEventListener('input', e => {
      dom.propFontsizeNum.value = e.target.value;
      applyStyleProperty(state.selectedEl, 'font-size', `${e.target.value}px`);
    });
    dom.propFontsizeNum.addEventListener('input', e => {
      dom.propFontsizeSlider.value = Math.min(120, e.target.value);
      applyStyleProperty(state.selectedEl, 'font-size', `${e.target.value}px`);
    });
    document.querySelectorAll('[data-align]').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        startHoverPreview({ 'text-align': btn.dataset.align }, `Căn lề: ${btn.title || btn.dataset.align}`);
      });
      btn.addEventListener('mouseleave', endHoverPreview);
      btn.addEventListener('click', () => {
        endHoverPreview();
        applyStyleProperty(state.selectedEl, 'text-align', btn.dataset.align);
      });
    });
    dom.propLetterSpacing.addEventListener('input', e => {
      applyStyleProperty(state.selectedEl, 'letter-spacing', `${e.target.value}px`);
    });

    // Borders & Shadows (WITH LIVE HOVER PREVIEW!)
    dom.propRadiusSlider.addEventListener('input', e => {
      dom.propRadiusNum.value = e.target.value;
      applyStyleProperty(state.selectedEl, 'border-radius', `${e.target.value}px`);
    });
    dom.propRadiusNum.addEventListener('input', e => {
      dom.propRadiusSlider.value = Math.min(64, e.target.value);
      applyStyleProperty(state.selectedEl, 'border-radius', `${e.target.value}px`);
    });
    dom.btnRadiusPill.addEventListener('mouseenter', () => {
      startHoverPreview({ 'border-radius': '999px' }, 'Bo tròn viên thuốc (999px)');
    });
    dom.btnRadiusPill.addEventListener('mouseleave', endHoverPreview);
    dom.btnRadiusPill.addEventListener('click', () => {
      endHoverPreview();
      dom.propRadiusNum.value = 999;
      dom.propRadiusSlider.value = 64;
      applyStyleProperty(state.selectedEl, 'border-radius', '999px');
    });

    function updateBorder() {
      if (!state.selectedEl) return;
      const w = parseInt(dom.propBorderWidth.value, 10) || 0;
      const s = dom.propBorderStyle.value;
      const c = dom.propBorderColor.value;
      if (w === 0 || s === 'none') {
        applyStyleProperty(state.selectedEl, 'border', 'none');
      } else {
        applyStyleProperty(state.selectedEl, 'border', `${w}px ${s} ${c}`);
      }
    }
    dom.propBorderWidth.addEventListener('input', updateBorder);
    dom.propBorderStyle.addEventListener('change', updateBorder);
    dom.propBorderColor.addEventListener('input', updateBorder);

    document.querySelectorAll('[data-shadow]').forEach(pill => {
      pill.addEventListener('mouseenter', () => {
        startHoverPreview({ 'box-shadow': pill.dataset.shadow }, `Đổ bóng: ${pill.textContent}`);
      });
      pill.addEventListener('mouseleave', endHoverPreview);
      pill.addEventListener('click', () => {
        endHoverPreview();
        applyStyleProperty(state.selectedEl, 'box-shadow', pill.dataset.shadow);
      });
    });

    // Padding & Margin 4-way
    const bindBox4 = (inputEl, cssProp) => {
      inputEl.addEventListener('input', e => {
        applyStyleProperty(state.selectedEl, cssProp, `${parseInt(e.target.value, 10) || 0}px`);
      });
    };
    bindBox4(dom.propPadTop, 'padding-top');
    bindBox4(dom.propPadRight, 'padding-right');
    bindBox4(dom.propPadBottom, 'padding-bottom');
    bindBox4(dom.propPadLeft, 'padding-left');
    bindBox4(dom.propMarTop, 'margin-top');
    bindBox4(dom.propMarRight, 'margin-right');
    bindBox4(dom.propMarBottom, 'margin-bottom');
    bindBox4(dom.propMarLeft, 'margin-left');

    // Quick Flex Layout (WITH LIVE HOVER PREVIEW!)
    dom.btnFlexRow.addEventListener('mouseenter', () => {
      startHoverPreview({ display: 'flex', 'flex-direction': 'row' }, 'Xếp Hàng Ngang (Flex Row)');
    });
    dom.btnFlexRow.addEventListener('mouseleave', endHoverPreview);
    dom.btnFlexRow.addEventListener('click', () => {
      endHoverPreview();
      applyStyleProperty(state.selectedEl, 'display', 'flex', false);
      applyStyleProperty(state.selectedEl, 'flex-direction', 'row');
    });

    dom.btnFlexCol.addEventListener('mouseenter', () => {
      startHoverPreview({ display: 'flex', 'flex-direction': 'column' }, 'Xếp Hàng Dọc (Flex Column)');
    });
    dom.btnFlexCol.addEventListener('mouseleave', endHoverPreview);
    dom.btnFlexCol.addEventListener('click', () => {
      endHoverPreview();
      applyStyleProperty(state.selectedEl, 'display', 'flex', false);
      applyStyleProperty(state.selectedEl, 'flex-direction', 'column');
    });

    dom.btnFlexCenter.addEventListener('mouseenter', () => {
      startHoverPreview({ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }, 'Căn Giữa Tất Cả');
    });
    dom.btnFlexCenter.addEventListener('mouseleave', endHoverPreview);
    dom.btnFlexCenter.addEventListener('click', () => {
      endHoverPreview();
      applyStyleProperty(state.selectedEl, 'display', 'flex', false);
      applyStyleProperty(state.selectedEl, 'align-items', 'center', false);
      applyStyleProperty(state.selectedEl, 'justify-content', 'center');
    });

    dom.btnFlexBetween.addEventListener('mouseenter', () => {
      startHoverPreview({ display: 'flex', 'align-items': 'center', 'justify-content': 'space-between' }, 'Giãn Đều 2 Bên');
    });
    dom.btnFlexBetween.addEventListener('mouseleave', endHoverPreview);
    dom.btnFlexBetween.addEventListener('click', () => {
      endHoverPreview();
      applyStyleProperty(state.selectedEl, 'display', 'flex', false);
      applyStyleProperty(state.selectedEl, 'align-items', 'center', false);
      applyStyleProperty(state.selectedEl, 'justify-content', 'space-between');
    });

    // Modals & File Openers
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.close).classList.add('hidden');
      });
    });

    dom.btnTriggerFilePicker.addEventListener('click', async () => {
      if (window.showOpenFilePicker) {
        try {
          const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'HTML Files', accept: { 'text/html': ['.html', '.htm'] } }]
          });
          state.localFileHandle = handle;
          const file = await handle.getFile();
          const text = await file.text();
          loadRawHtmlString(text, file.name);
          dom.modalOpenWeb.classList.add('hidden');
          return;
        } catch (_) {}
      }
      dom.inputHtmlFile.click();
    });

    dom.inputHtmlFile.addEventListener('change', async e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const text = await file.text();
      loadRawHtmlString(text, file.name);
      dom.modalOpenWeb.classList.add('hidden');
    });

    dom.inputFolderFiles.addEventListener('change', e => {
      if (e.target.files && e.target.files.length > 0) {
        handleDroppedFolderOrFiles(e.target.files);
      }
    });

    dom.btnApplyWorkspacePath.addEventListener('click', async () => {
      const p = dom.inputWorkspacePath.value.trim();
      if (!p) return;
      state.currentFile = null;
      await loadWorkspaceFiles(p);
      dom.modalOpenWeb.classList.add('hidden');
      showToast(`Đã kết nối thư mục: ${p}`, '📂');
    });

    dom.btnLoadPastedHtml.addEventListener('click', () => {
      const raw = dom.textareaPasteHtml.value.trim();
      if (!raw) return;
      const fullHtml = raw.toLowerCase().includes('<html')
        ? raw
        : `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:32px;}</style></head><body>${raw}</body></html>`;
      loadRawHtmlString(fullHtml, 'pasted-ui.html');
      dom.modalOpenWeb.classList.add('hidden');
    });

    // Global Drag-and-Drop File/Folder onto Window
    window.addEventListener('dragover', e => {
      if (e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files')) {
        e.preventDefault();
        dom.dropzoneOverlay.classList.remove('hidden');
      }
    });
    dom.dropzoneOverlay.addEventListener('dragleave', e => {
      if (e.target === dom.dropzoneOverlay) {
        dom.dropzoneOverlay.classList.add('hidden');
      }
    });
    window.addEventListener('drop', async e => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        e.preventDefault();
        dom.dropzoneOverlay.classList.add('hidden');
        await handleDroppedFolderOrFiles(e.dataTransfer.files);
      }
    });

    // AI Prompt Modal Tabs & Copy / Save to Project
    document.querySelectorAll('.prompt-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.ptab-content').forEach(c => c.classList.add('hidden'));
        tab.classList.add('active');
        const pane = document.getElementById(tab.dataset.ptab);
        if (pane) pane.classList.remove('hidden');
      });
    });

    function getActivePromptTabText() {
      const activePane = document.querySelector('#modal-ai-prompt .ptab-content:not(.hidden) textarea');
      return activePane ? activePane.value : (dom.aiPromptOutput?.value || '');
    }

    dom.btnCopyAiPrompt.addEventListener('click', () => {
      navigator.clipboard.writeText(getActivePromptTabText());
      showToast('Đã copy nội dung Prompt vào bộ nhớ tạm!', '📋');
    });

    dom.btnCopyCssPatch.addEventListener('click', () => {
      navigator.clipboard.writeText(dom.cssPatchOutput.value);
      showToast('Đã copy mã CSS vào bộ nhớ tạm!', '🎨');
    });

    const btnSavePromptFile = document.getElementById('btn-save-prompt-file');
    if (btnSavePromptFile) {
      btnSavePromptFile.addEventListener('click', async () => {
        const content = [
          generateAiPromptText(),
          '\n---\n',
          generateTailwindReactPromptText(),
          '\n---\n',
          generateAutoUiUxAuditPromptText()
        ].join('\n');
        try {
          const data = await safeFetchStudioJson('/api/save-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: 'VISUAL-UI-PROMPT.md', promptContent: content })
          });
          showToast(`Đã lưu VISUAL-UI-PROMPT.md vào ${data.workspaceDir}!`, '💾');
        } catch (err) {
          // Fallback browser download if offline
          const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'VISUAL-UI-PROMPT.md';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          showToast('Đã tải file VISUAL-UI-PROMPT.md về máy!', '⬇️');
        }
      });
    }

    const btnSaveAndPushFromPrompt = document.getElementById('btn-save-and-push-from-prompt');
    if (btnSaveAndPushFromPrompt) {
      btnSaveAndPushFromPrompt.addEventListener('click', async () => {
        await saveDirectlyToSource();
      });
    }

    // ==================== REACTBITS.DEV CUSTOMIZE STUDIO BRIDGE ====================
    let rbUndoTimer = null;
    let rbBeforeSnapshot = null;

    window.studioApplyReactBitsCustom = (values, changedKey, schema) => {
      if (!state.selectedEl) {
        if (window.getReactBitsActiveHtml) {
          const html = window.getReactBitsActiveHtml();
          if (html) {
            insertLibComponentToPage({
              id: (schema && schema.id) || 'rb-live-comp',
              libId: 'reactbits',
              libName: 'React Bits Customize',
              name: (schema && schema.title) || 'ReactBits Component',
              html
            });
          }
        }
        return;
      }

      const el = state.selectedEl;
      if (!rbBeforeSnapshot) {
        rbBeforeSnapshot = captureElementState(el);
      }

      if (window.applyReactBitsPropsToElement) {
        window.applyReactBitsPropsToElement(el, values, changedKey, schema);
      }

      const rec = ensureEditRecord(el);
      if (rec) {
        const inlineStr = el.getAttribute('style') || '';
        inlineStr.split(';').forEach(pair => {
          const idx = pair.indexOf(':');
          if (idx > 0) {
            const k = pair.slice(0, idx).trim();
            const v = pair.slice(idx + 1).replace(/!important/gi, '').trim();
            if (k && v) rec.styles[k] = v;
          }
        });
      }

      updateOverlayPosition();

      if (rbUndoTimer) clearTimeout(rbUndoTimer);
      rbUndoTimer = setTimeout(() => {
        if (rbBeforeSnapshot && state.selectedEl === el) {
          const afterSnap = captureElementState(el);
          pushUndoAction({
            type: 'snapshot',
            selector: rbBeforeSnapshot.selector,
            before: rbBeforeSnapshot,
            after: afterSnap
          });
          rbBeforeSnapshot = null;
          updateHistoryUI();
        }
      }, 280);
    };

    window.studioResetSelectedElement = () => {
      if (state.selectedEl && dom.btnElReset) {
        dom.btnElReset.click();
      } else {
        showToast('Đã đặt lại toàn bộ thanh kéo Customize về mặc định!', '↺');
      }
    };

    window.studioInsertCustomReactBitsHtml = (html, title) => {
      if (!html) return;
      insertLibComponentToPage({
        id: 'rb-custom-' + Date.now(),
        libId: 'reactbits',
        libName: 'React Bits Customize',
        name: title || 'ReactBits Custom Component',
        html
      });
    };
  }

  // ==================== LIVE WEBSITE URL CLONER & GITHUB HUB ====================
  function initUrlClonerAndGithubHub() {
    state.githubAutoPush = localStorage.getItem('studio_gh_auto_push') !== '0';
    state.githubRepoLinked = false;
    state.githubStatus = null;

    const btnOpenUrlCloner = document.getElementById('btn-open-url-cloner');
    const inputCloneUrl = document.getElementById('input-clone-url');
    const inputCloneFilename = document.getElementById('input-clone-filename');
    const btnCloneUrl = document.getElementById('btn-clone-url');
    const cloneUrlStatus = document.getElementById('clone-url-status');

    function setBannerState(el, type, htmlContent) {
      if (!el) return;
      el.classList.remove('hidden', 'is-info', 'is-success', 'is-error');
      if (type) el.classList.add(`is-${type}`);
      el.innerHTML = htmlContent;
    }

    // Client-side fallback when running on static GitHub Pages without Local Node Server
    async function cloneWebpageInBrowser(rawInputUrl) {
      let targetUrl = (rawInputUrl || '').trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }

      const u = new URL(targetUrl);
      let fetchCandidates = [];
      let baseHref = u.origin + '/';
      let suggestedName = `cloned-${u.hostname.replace(/[^a-z0-9-]/gi, '-')}.html`;

      // Smart GitHub Repository URL resolution in browser
      if (u.hostname.toLowerCase() === 'github.com') {
        const parts = u.pathname.replace(/^\/+|\/+$/g, '').split('/');
        if (parts.length >= 2) {
          const owner = parts[0];
          const repo = parts[1].replace(/\.git$/i, '');
          suggestedName = `${repo}.html`;

          if ((parts[2] === 'blob' || parts[2] === 'raw') && parts.length >= 5) {
            const branch = parts[3];
            const filePath = parts.slice(4).join('/');
            const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
            baseHref = rawFileUrl.substring(0, rawFileUrl.lastIndexOf('/') + 1);
            fetchCandidates.push(rawFileUrl);
          } else {
            if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
              baseHref = `https://${owner.toLowerCase()}.github.io/`;
            } else {
              baseHref = `https://raw.githubusercontent.com/${owner}/${repo}/main/`;
            }
            fetchCandidates.push(
              `https://raw.githubusercontent.com/${owner}/${repo}/main/index.html`,
              `https://raw.githubusercontent.com/${owner}/${repo}/master/index.html`,
              `https://raw.githubusercontent.com/${owner}/${repo}/gh-pages/index.html`,
              `https://raw.githubusercontent.com/${owner}/${repo}/main/public/index.html`
            );
          }
        }
      }

      // Add CORS proxy candidates for arbitrary websites
      fetchCandidates.push(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
      );

      let html = '';
      for (const candidate of fetchCandidates) {
        try {
          const r = await fetch(candidate);
          if (r.ok) {
            const txt = await r.text();
            if (txt && txt.includes('<')) {
              html = txt;
              if (candidate.startsWith('https://raw.githubusercontent.com/')) {
                baseHref = candidate.substring(0, candidate.lastIndexOf('/') + 1);
              }
              break;
            }
          }
        } catch (_) {}
      }

      if (!html) {
        throw new Error('Không thể tải nội dung từ URL này. Hãy kiểm tra lại đường dẫn.');
      }

      // Strip CSP / frame-blocking meta tags and inject <base href="..."> so all relative CSS/images load cleanly
      html = html.replace(/<meta[^>]+http-equiv\s*=\s*["']?(Content-Security-Policy|X-Frame-Options)["']?[^>]*>/gi, '');
      if (!/<base\b/i.test(html)) {
        if (/<head[^>]*>/i.test(html)) {
          html = html.replace(/<head[^>]*>/i, match => `${match}\n  <base href="${baseHref}">`);
        } else {
          html = `<head><base href="${baseHref}"></head>\n` + html;
        }
      }

      return {
        html,
        fileName: suggestedName
      };
    }

    // 1. Open URL Cloner inside Open Web Modal
    if (btnOpenUrlCloner) {
      btnOpenUrlCloner.addEventListener('click', () => {
        if (dom.modalOpenWeb) {
          dom.modalOpenWeb.classList.remove('hidden');
          setTimeout(() => {
            if (inputCloneUrl) {
              inputCloneUrl.focus();
              inputCloneUrl.select();
            }
          }, 80);
        }
      });
    }

    async function handleCloneUrl() {
      if (!inputCloneUrl || !btnCloneUrl) return;
      const rawUrl = inputCloneUrl.value.trim();
      const customFileName = inputCloneFilename ? inputCloneFilename.value.trim() : '';

      if (!rawUrl) {
        setBannerState(
          cloneUrlStatus,
          'error',
          'Vui lòng nhập đường dẫn trang web hoặc link GitHub (ví dụ: <code>https://minkasent.github.io</code>).'
        );
        inputCloneUrl.focus();
        return;
      }

      const origText = btnCloneUrl.innerHTML;
      btnCloneUrl.disabled = true;
      btnCloneUrl.textContent = 'Đang tải...';

      setBannerState(
        cloneUrlStatus,
        'info',
        `Đang phân tích <strong>${rawUrl}</strong> và chuẩn bị giao diện...`
      );

      try {
        // Prefer Local Studio Server (/api/clone-url) so it saves directly to Local disk + inlines CSS
        try {
          const data = await safeFetchStudioJson('/api/clone-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: rawUrl, fileName: customFileName, customFileName })
          });

          setBannerState(
            cloneUrlStatus,
            'success',
            `Đã lưu vào Local: <strong>${data.relativePath}</strong> (${data.stats?.sizeKb || 1} KB • ${data.stats?.elementsCount || 0} thẻ)`
          );

          await loadWorkspaceFiles(state.workspaceDir);
          if (dom.pageSelector) {
            dom.pageSelector.value = data.relativePath;
          }
          await loadWorkspacePage(data.relativePath);

          showToast(
            `Đã tải "${data.title || data.relativePath}" về Local (${data.relativePath})!`,
            '✨'
          );
        } catch (serverErr) {
          if (serverErr.message !== 'STUDIO_SERVER_UNAVAILABLE' && !serverErr.message.includes('Failed to fetch')) {
            throw serverErr;
          }
          // Fallback: Browser-Native Cloner (works even on static GitHub Pages!)
          const fallback = await cloneWebpageInBrowser(rawUrl);
          loadRawHtmlString(fallback.html, customFileName || fallback.fileName);

          setBannerState(
            cloneUrlStatus,
            'success',
            `Đã nạp trực tiếp <strong>${fallback.fileName}</strong> lên Canvas! (Bấm Lưu để tải file HTML về máy)`
          );
        }

        setTimeout(() => {
          if (dom.modalOpenWeb) dom.modalOpenWeb.classList.add('hidden');
        }, 550);
      } catch (err) {
        setBannerState(cloneUrlStatus, 'error', `Không thể tải URL: ${err.message}`);
        showToast(`Lỗi tải trang web: ${err.message}`, '❌');
      } finally {
        btnCloneUrl.disabled = false;
        btnCloneUrl.innerHTML = origText;
      }
    }

    if (btnCloneUrl) {
      btnCloneUrl.addEventListener('click', handleCloneUrl);
    }
    if (inputCloneUrl) {
      inputCloneUrl.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCloneUrl();
        }
      });
    }

    // Bind Quick Sample URL Chips
    document.querySelectorAll('.url-chip[data-sample-url]').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!inputCloneUrl) return;
        inputCloneUrl.value = chip.getAttribute('data-sample-url') || '';
        handleCloneUrl();
      });
    });

    // 2. GitHub Hub Modal & Status Sync
    const btnGithubHub = document.getElementById('btn-github-hub');
    const githubTopLabel = document.getElementById('github-top-label');
    const githubTopDot = document.getElementById('github-top-dot');
    const modalGithubHub = document.getElementById('modal-github-hub');
    const ghUserAvatar = document.getElementById('gh-user-avatar');
    const ghUserName = document.getElementById('gh-user-name');
    const ghUserLogin = document.getElementById('gh-user-login');
    const ghAuthMethodBadge = document.getElementById('gh-auth-method-badge');
    const ghUserSub = document.getElementById('gh-user-sub');
    const btnGhLogout = document.getElementById('btn-gh-logout');
    const btnGhLoginCli = document.getElementById('btn-gh-login-cli');
    const inputGhToken = document.getElementById('input-gh-token');
    const btnGhLoginToken = document.getElementById('btn-gh-login-token');
    const ghRepoStatusBadge = document.getElementById('gh-repo-status-badge');
    const ghGitSummary = document.getElementById('gh-git-summary');
    const selectGhUserRepos = document.getElementById('select-gh-user-repos');
    const inputGhRemoteUrl = document.getElementById('input-gh-remote-url');
    const btnGhLinkRepo = document.getElementById('btn-gh-link-repo');
    const btnGhOpenSelectedRepoUi = document.getElementById('btn-gh-open-selected-repo-ui');
    const btnSwitchToGhRepos = document.getElementById('btn-switch-to-gh-repos');
    const ghReposExplorerList = document.getElementById('gh-repos-explorer-list');
    const chkGhHideForks = document.getElementById('chk-gh-hide-forks');
    const inputGhRepoSearch = document.getElementById('input-gh-repo-search');
    const chkGhAutoPush = document.getElementById('chk-gh-auto-push');
    const inputGhCommitMsg = document.getElementById('input-gh-commit-msg');
    const btnGhPushNow = document.getElementById('btn-gh-push-now');
    const ghPushStatusMsg = document.getElementById('gh-push-status-msg');

    let ghRepoFilterMode = 'all'; // 'all' | 'has-ui' | 'no-ui'
    let cachedGithubRepos = [];

    if (btnSwitchToGhRepos) {
      btnSwitchToGhRepos.addEventListener('click', () => {
        if (dom.modalOpenWeb) dom.modalOpenWeb.classList.add('hidden');
        if (modalGithubHub) {
          modalGithubHub.classList.remove('hidden');
          refreshGithubStatus();
        }
      });
    }

    async function openGithubRepoUiInStudio(repoObj, triggerBtn = null) {
      if (!repoObj) return;
      const origHtml = triggerBtn ? triggerBtn.innerHTML : '';
      if (triggerBtn) {
        triggerBtn.disabled = true;
        triggerBtn.textContent = '⏳ Đang mở UI...';
      }
      setBannerState(
        ghPushStatusMsg,
        'info',
        `⏳ Đang đồng bộ kho lưu trữ <strong>${repoObj.fullName}</strong> về Local và nạp giao diện lên Studio Canvas...`
      );
      try {
        const res = await safeFetchStudioJson('/api/github/open-repo-ui', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(repoObj)
        });

        state.workspaceDir = res.workspaceDir;
        state.files = res.files || [];
        state.activeGithubRepoMeta = res.repoMeta || repoObj;
        dom.folderLabel.textContent = state.workspaceDir;
        dom.inputWorkspacePath.value = state.workspaceDir;

        dom.pageSelector.innerHTML = `<option value="">-- Chọn file HTML (${state.files.length} trang) --</option>`;
        state.files.forEach(f => {
          const opt = document.createElement('option');
          opt.value = f.relativePath;
          opt.textContent = f.name;
          dom.pageSelector.appendChild(opt);
        });

        if (res.primaryFile) {
          dom.pageSelector.value = res.primaryFile;
          await loadWorkspacePage(res.primaryFile);
        }

        await refreshGithubStatus();

        const modeDesc =
          res.modeUsed === 'native-html'
            ? `file gốc ${res.primaryFile}`
            : res.modeUsed === 'live-homepage'
            ? `giao diện Live (${res.primaryFile})`
            : res.modeUsed === 'starter-ui-for-noui'
            ? `giao diện khởi tạo mới (${res.primaryFile})`
            : `Canvas tổng hợp từ Source (${res.primaryFile})`;

        setBannerState(
          ghPushStatusMsg,
          'success',
          `✅ Đã mở <strong>${repoObj.fullName}</strong> (${modeDesc})! Khi bấm Lưu (Ctrl+S) sẽ lưu trực tiếp vào Repo này.`
        );
        showToast(`🎨 Đang sửa UI của Repo: ${repoObj.fullName} (${res.primaryFile})!`, '🚀');

        setTimeout(() => {
          if (modalGithubHub) modalGithubHub.classList.add('hidden');
        }, 500);
      } catch (err) {
        setBannerState(ghPushStatusMsg, 'error', `Lỗi mở UI Repo: ${err.message}`);
        showToast(`Lỗi mở Repo: ${err.message}`, '❌');
      } finally {
        if (triggerBtn) {
          triggerBtn.disabled = false;
          triggerBtn.innerHTML = origHtml;
        }
      }
    }

    function renderGithubReposExplorer() {
      if (!ghReposExplorerList) return;
      const hideForks = chkGhHideForks ? chkGhHideForks.checked : false;
      const query = (inputGhRepoSearch ? inputGhRepoSearch.value : '').trim().toLowerCase();

      const baseRepos = cachedGithubRepos.filter(r => (hideForks ? !r.fork : true));
      const hasUiCount = baseRepos.filter(r => r.hasUi).length;
      const noUiCount = baseRepos.filter(r => !r.hasUi).length;

      // Update filter pill counts
      document.querySelectorAll('.gh-filter-pill[data-gh-filter]').forEach(pill => {
        const mode = pill.getAttribute('data-gh-filter');
        if (mode === 'all') pill.textContent = `Tất cả (${baseRepos.length})`;
        else if (mode === 'has-ui') pill.textContent = `✦ Có UI (${hasUiCount})`;
        else if (mode === 'no-ui') pill.textContent = `🚫 No UI (${noUiCount})`;
      });

      const filtered = baseRepos.filter(r => {
        if (ghRepoFilterMode === 'has-ui' && !r.hasUi) return false;
        if (ghRepoFilterMode === 'no-ui' && r.hasUi) return false;
        if (query) {
          const hay = `${r.name} ${r.fullName} ${r.language || ''} ${r.description || ''} ${r.uiDetail || ''}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        ghReposExplorerList.innerHTML = `<div class="gh-repos-empty">Không tìm thấy Repository nào khớp bộ lọc hiện tại.</div>`;
        return;
      }

      ghReposExplorerList.innerHTML = filtered
        .map(r => {
          const pillClass = !r.hasUi
            ? 'gh-ui-pill--noui'
            : r.uiCategory === 'html'
            ? 'gh-ui-pill--html'
            : r.uiCategory === 'mobile'
            ? 'gh-ui-pill--mobile'
            : 'gh-ui-pill--webapp';
          const badgeText = r.hasUi ? (r.uiBadge || '✦ Có UI') : (r.uiDetail || '🚫 No UI');
          const langTag = r.language ? `<span class="gh-ui-pill gh-ui-pill--noui">${r.language}</span>` : '';
          const descText = r.description || (r.hasUi ? 'Sẵn sàng mở và chỉnh sửa giao diện trực quan' : 'Dự án Backend / CLI / Tài liệu (Chưa có giao diện UI)');

          return `
            <div class="gh-repo-item ${r.hasUi ? '' : 'is-no-ui'}" data-repo-fullname="${r.fullName}">
              <div class="gh-repo-item__left">
                <div class="gh-repo-item__title-row">
                  <span class="gh-repo-item__name">${r.name}</span>
                  <span class="gh-ui-pill ${pillClass}" title="${r.uiDetail || ''}">${badgeText}</span>
                  ${langTag}
                </div>
                <div class="gh-repo-item__desc" title="${descText.replace(/"/g, '&quot;')}">${descText}</div>
              </div>
              <div class="gh-repo-item__actions">
                ${
                  r.hasUi
                    ? `<button type="button" class="btn-primary btn-xs btn-gh-edit-repo-ui" data-repo-name="${r.name}" title="Tải Repo này về Local, nạp giao diện lên Canvas để kéo thả & tự động Push khi Lưu">🎨 Sửa UI</button>`
                    : `<button type="button" class="btn-secondary btn-xs btn-gh-edit-repo-ui" data-repo-name="${r.name}" title="Repo này chưa có UI (No UI) — Bấm để khởi tạo nhanh 1 trang giao diện mẫu cho Repo này">✨ Tạo UI</button>`
                }
              </div>
            </div>
          `;
        })
        .join('');

      ghReposExplorerList.querySelectorAll('.btn-gh-edit-repo-ui').forEach(btn => {
        btn.addEventListener('click', () => {
          const rName = btn.getAttribute('data-repo-name');
          const targetRepo = cachedGithubRepos.find(item => item.name === rName);
          if (targetRepo) {
            openGithubRepoUiInStudio(targetRepo, btn);
          }
        });
      });
    }

    document.querySelectorAll('.gh-filter-pill[data-gh-filter]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.gh-filter-pill[data-gh-filter]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        ghRepoFilterMode = pill.getAttribute('data-gh-filter') || 'all';
        renderGithubReposExplorer();
      });
    });

    if (chkGhHideForks) {
      chkGhHideForks.addEventListener('change', renderGithubReposExplorer);
    }
    if (inputGhRepoSearch) {
      inputGhRepoSearch.addEventListener('input', renderGithubReposExplorer);
    }

    if (chkGhAutoPush) {
      chkGhAutoPush.checked = state.githubAutoPush;
      chkGhAutoPush.addEventListener('change', () => {
        state.githubAutoPush = chkGhAutoPush.checked;
        localStorage.setItem('studio_gh_auto_push', state.githubAutoPush ? '1' : '0');
        showToast(
          state.githubAutoPush
            ? 'Đã BẬT tự động Push lên GitHub khi bấm Lưu (Ctrl+S)!'
            : 'Đã TẮT tự động Push lên GitHub khi lưu.',
          state.githubAutoPush ? '🚀' : '⚙️'
        );
      });
    }

    async function refreshGithubStatus() {
      try {
        const data = await safeFetchStudioJson('/api/github/status');
        state.githubStatus = data;

        const isAuthenticated = Boolean(data.loggedIn || (data.auth && data.auth.authenticated));
        const userObj = data.user || data.auth || {};
        const authMethod = data.authMethod || userObj.method || 'gh-cli';
        const git = data.git || { isGitRepo: false, hasRemote: false };
        state.githubRepoLinked = Boolean(git.hasRemote);

        const cleanRepoShort = (git.repoShortName || git.remoteUrl || '')
          .replace(/^https?:\/\/github\.com\//i, '')
          .replace(/^git@github\.com:/i, '')
          .replace(/\.git$/i, '');

        // Update Topbar Pill
        if (githubTopDot) {
          githubTopDot.classList.remove('is-online', 'is-warn', 'is-offline');
          if (isAuthenticated && git.hasRemote) {
            githubTopDot.classList.add('is-online');
          } else if (isAuthenticated || git.hasRemote) {
            githubTopDot.classList.add('is-warn');
          } else {
            githubTopDot.classList.add('is-offline');
          }
        }
        if (githubTopLabel) {
          if (isAuthenticated && userObj.login) {
            githubTopLabel.textContent = `@${userObj.login}`;
          } else if (git.hasRemote && cleanRepoShort) {
            const shortRepo = cleanRepoShort.split('/').pop() || 'GitHub';
            githubTopLabel.textContent = shortRepo.length > 14 ? shortRepo.slice(0, 12) + '…' : shortRepo;
          } else {
            githubTopLabel.textContent = 'GitHub';
          }
        }
        if (btnGithubHub) {
          const authTip = isAuthenticated ? `Đã đăng nhập: @${userObj.login}` : 'Chưa đăng nhập GitHub';
          const repoTip = git.hasRemote ? `Repo: ${cleanRepoShort} (${git.branch})` : 'Chưa liên kết Repo';
          btnGithubHub.title = `${authTip} • ${repoTip} • Auto-Push: ${state.githubAutoPush ? 'BẬT' : 'TẮT'}`;
        }

        // Update Modal Auth Section
        if (isAuthenticated) {
          if (ghUserAvatar) {
            ghUserAvatar.src = userObj.avatarUrl || `https://github.com/${userObj.login}.png`;
          }
          if (ghUserName) ghUserName.textContent = userObj.name || userObj.login;
          if (ghUserLogin) ghUserLogin.textContent = `@${userObj.login}`;
          if (ghAuthMethodBadge) {
            ghAuthMethodBadge.textContent = authMethod === 'gh-cli' ? '✓ GitHub CLI' : '✓ Token';
          }
          if (ghUserSub) {
            ghUserSub.textContent = `Đã kết nối tài khoản GitHub (@${userObj.login})`;
          }
          if (btnGhLoginCli) btnGhLoginCli.classList.add('hidden');
          if (btnGhLogout) btnGhLogout.classList.remove('hidden');
        } else {
          if (ghUserName) ghUserName.textContent = 'Chưa đăng nhập';
          if (ghUserLogin) ghUserLogin.textContent = '';
          if (ghAuthMethodBadge) ghAuthMethodBadge.textContent = 'Offline';
          if (ghUserSub) ghUserSub.textContent = 'Kết nối GitHub để tự động đẩy code khi bấm Lưu';
          if (btnGhLoginCli) btnGhLoginCli.classList.remove('hidden');
          if (btnGhLogout) btnGhLogout.classList.add('hidden');
        }

        // Populate User Repos Dropdown & Visual Repo Explorer (with Has UI / No UI status!)
        cachedGithubRepos = Array.isArray(data.repos) ? data.repos : [];
        renderGithubReposExplorer();

        if (selectGhUserRepos) {
          selectGhUserRepos.innerHTML = `<option value="">-- Chọn Repo (${cachedGithubRepos.length}) --</option>`;
          cachedGithubRepos.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.cloneUrl;
            const uiPrefix = r.hasUi ? (r.uiBadge || '✦ Có UI') : '🚫 No UI';
            opt.textContent = `[${uiPrefix}] ${r.name}${r.fork ? ' (Fork)' : ''}`;
            if (git.remoteUrl && (git.remoteUrl === r.cloneUrl || git.remoteUrl.includes(r.fullName))) {
              opt.selected = true;
            }
            selectGhUserRepos.appendChild(opt);
          });
        }

        if (inputGhRemoteUrl && git.remoteUrl) {
          inputGhRemoteUrl.value = git.remoteUrl;
        }

        // Update Repo Link Summary
        if (ghRepoStatusBadge && ghGitSummary) {
          if (git.hasRemote) {
            ghRepoStatusBadge.textContent = `✓ ${cleanRepoShort || 'Đã liên kết'}`;
            ghGitSummary.innerHTML = `Thư mục đang mở: <code>${state.workspaceDir}</code> • Nhánh: <strong>${git.branch || 'main'}</strong> • Chờ Push: <strong>${git.changedCount || 0} file</strong>`;
          } else if (git.isGitRepo) {
            ghRepoStatusBadge.textContent = 'Chưa gắn Remote';
            ghGitSummary.innerHTML = `Thư mục <code>${state.workspaceDir}</code> đã có Git nhưng chưa gắn Repo. Chọn Repo bên dưới và bấm <strong>Liên kết</strong>.`;
          } else {
            ghRepoStatusBadge.textContent = 'Chưa có Git';
            ghGitSummary.innerHTML = `Chọn Repo bên dưới để <strong>🎨 Sửa UI</strong> hoặc bấm <strong>Liên kết</strong> cho <code>${state.workspaceDir}</code>.`;
          }
        }
      } catch (_) {
        // Silent when running purely static without local server
      }
    }

    window.studioRefreshGithubStatus = refreshGithubStatus;

    if (btnGithubHub && modalGithubHub) {
      btnGithubHub.addEventListener('click', () => {
        modalGithubHub.classList.remove('hidden');
        refreshGithubStatus();
      });
    }

    if (btnGhLoginCli) {
      btnGhLoginCli.addEventListener('click', async () => {
        const orig = btnGhLoginCli.innerHTML;
        btnGhLoginCli.disabled = true;
        btnGhLoginCli.textContent = 'Đang kết nối...';
        try {
          const data = await safeFetchStudioJson('/api/github/login-cli', { method: 'POST' });
          await refreshGithubStatus();
          const loginName = data.user?.login || data.auth?.login || 'GitHub';
          showToast(`Đã đăng nhập GitHub: @${loginName}!`, '🐙');
        } catch (err) {
          showToast(err.message, '⚠️');
        } finally {
          btnGhLoginCli.disabled = false;
          btnGhLoginCli.innerHTML = orig;
        }
      });
    }

    if (btnGhLoginToken) {
      btnGhLoginToken.addEventListener('click', async () => {
        const token = inputGhToken ? inputGhToken.value.trim() : '';
        if (!token) {
          showToast('Vui lòng dán mã GitHub Personal Access Token (ghp_...)', '⚠️');
          if (inputGhToken) inputGhToken.focus();
          return;
        }
        const orig = btnGhLoginToken.textContent;
        btnGhLoginToken.disabled = true;
        btnGhLoginToken.textContent = 'Đang xác thực...';
        try {
          const data = await safeFetchStudioJson('/api/github/login-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
          if (inputGhToken) inputGhToken.value = '';
          await refreshGithubStatus();
          const loginName = data.user?.login || data.auth?.login || 'GitHub';
          showToast(`Đã đăng nhập GitHub: @${loginName}!`, '🐙');
        } catch (err) {
          showToast(`Lỗi đăng nhập: ${err.message}`, '❌');
        } finally {
          btnGhLoginToken.disabled = false;
          btnGhLoginToken.textContent = orig;
        }
      });
    }

    if (btnGhLogout) {
      btnGhLogout.addEventListener('click', async () => {
        try {
          await safeFetchStudioJson('/api/github/logout', { method: 'POST' });
        } catch (_) {}
        await refreshGithubStatus();
        showToast('Đã đăng xuất phiên GitHub trên Studio.', '👋');
      });
    }

    if (selectGhUserRepos && inputGhRemoteUrl) {
      selectGhUserRepos.addEventListener('change', () => {
        if (selectGhUserRepos.value) {
          inputGhRemoteUrl.value = selectGhUserRepos.value;
        }
      });
    }

    if (btnGhOpenSelectedRepoUi) {
      btnGhOpenSelectedRepoUi.addEventListener('click', () => {
        const selectedUrl = (selectGhUserRepos && selectGhUserRepos.value) || (inputGhRemoteUrl && inputGhRemoteUrl.value.trim()) || '';
        if (!selectedUrl) {
          showToast('Vui lòng chọn một Repo từ danh sách để mở & sửa UI!', '⚠️');
          return;
        }
        const matched = (githubReposCache || []).find((r) => r.url === selectedUrl || r.htmlUrl === selectedUrl);
        if (matched) {
          openGithubRepoUiInStudio(matched, btnGhOpenSelectedRepoUi);
        } else {
          const clean = selectedUrl.replace(/\.git$/i, '').replace(/\/+$/, '');
          const parts = clean.split('/').slice(-2);
          openGithubRepoUiInStudio({
            name: parts[1] || 'repo',
            fullName: parts.join('/'),
            url: selectedUrl,
            htmlUrl: clean
          }, btnGhOpenSelectedRepoUi);
        }
      });
    }

    if (btnGhLinkRepo && inputGhRemoteUrl) {
      btnGhLinkRepo.addEventListener('click', async () => {
        const remoteUrl = inputGhRemoteUrl.value.trim();
        if (!remoteUrl) {
          showToast('Vui lòng chọn Repo hoặc dán URL GitHub Repository!', '⚠️');
          inputGhRemoteUrl.focus();
          return;
        }
        const orig = btnGhLinkRepo.textContent;
        btnGhLinkRepo.disabled = true;
        btnGhLinkRepo.textContent = 'Đang gắn...';
        try {
          await safeFetchStudioJson('/api/github/link-repo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remoteUrl })
          });
          await refreshGithubStatus();
          showToast(`Đã liên kết với Repo: ${remoteUrl}!`, '✅');
        } catch (err) {
          showToast(`Lỗi liên kết Repo: ${err.message}`, '❌');
        } finally {
          btnGhLinkRepo.disabled = false;
          btnGhLinkRepo.textContent = orig;
        }
      });
    }

    if (btnGhPushNow) {
      btnGhPushNow.addEventListener('click', async () => {
        const commitMessage = inputGhCommitMsg ? inputGhCommitMsg.value.trim() : '';
        const orig = btnGhPushNow.innerHTML;
        btnGhPushNow.disabled = true;
        btnGhPushNow.textContent = 'Đang Push...';
        setBannerState(ghPushStatusMsg, 'info', 'Đang chạy <code>git add</code>, <code>commit</code> và <code>push</code> lên GitHub...');
        try {
          const data = await safeFetchStudioJson('/api/github/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commitMessage: commitMessage || undefined })
          });

          const pushInfo = data.gitPush || {};
          const msgText = pushInfo.lastCommit
            ? `Đã Push thành công: ${pushInfo.lastCommit}`
            : pushInfo.message || 'Đã Commit & Push lên GitHub thành công!';

          setBannerState(
            ghPushStatusMsg,
            'success',
            `${msgText} (Nhánh: <strong>${pushInfo.branch || data.git?.branch || 'main'}</strong>)`
          );
          showToast(`🚀 ${msgText}`, '✅');
          await refreshGithubStatus();
        } catch (err) {
          setBannerState(ghPushStatusMsg, 'error', `Lỗi Git Push: ${err.message}`);
          showToast(`Lỗi Git Push: ${err.message}`, '❌');
        } finally {
          btnGhPushNow.disabled = false;
          btnGhPushNow.innerHTML = orig;
        }
      });
    }

    // Initial check on startup
    refreshGithubStatus();
  }

  // ==================== INITIALIZATION ====================
  initStudioUIEvents();
  initUrlClonerAndGithubHub();
  loadWorkspaceFiles();
})();
