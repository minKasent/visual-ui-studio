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
    undoStack: [],
    redoStack: [],
    blobUrlMap: new Map() // for dropped folders
  };

  // ==================== DOM REFERENCES ====================
  const dom = {
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

  // ==================== UTILITIES ====================
  function showToast(message, icon = '✨') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  }

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
    if (el.getAttribute('data-ui-custom-id')) {
      return `[data-ui-custom-id="${el.getAttribute('data-ui-custom-id')}"]`;
    }
    if (el.id && !el.id.startsWith('__ui_studio')) {
      const doc = el.ownerDocument;
      try {
        const escaped = CSS.escape(el.id);
        if (doc.querySelectorAll(`#${escaped}`).length === 1) {
          return `#${escaped}`;
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
    return parts.join(' > ');
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
  function ensureEditRecord(el) {
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

    const win = el.ownerDocument.defaultView;
    const computed = win.getComputedStyle(el);

    const rec = ensureEditRecord(el);

    if (state.dragMode === 'margin') {
      el.style.setProperty('margin-left', `${finalDx}px`, 'important');
      el.style.setProperty('margin-top', `${finalDy}px`, 'important');
      rec.styles['margin-left'] = `${finalDx}px`;
      rec.styles['margin-top'] = `${finalDy}px`;
    } else {
      // Ensure inline elements can be translated cleanly
      if (computed.display === 'inline') {
        el.style.setProperty('display', 'inline-block', 'important');
        rec.styles['display'] = 'inline-block';
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

    updateOverlayPosition();
    updateLiveCoordsReadout(el);
    updateHistoryUI();
  }

  function applyStyleProperty(el, prop, value, recordHistory = true) {
    if (!el) return;
    const prevValue = el.style.getPropertyValue(prop);
    const rec = ensureEditRecord(el);

    if (recordHistory) {
      pushUndoAction({
        type: 'style',
        selector: rec.selector,
        prop,
        prevValue,
        newValue: value
      });
    }

    if (value === '' || value === null) {
      el.style.removeProperty(prop);
      delete rec.styles[prop];
    } else {
      el.style.setProperty(prop, value, 'important');
      rec.styles[prop] = value;
    }

    updateOverlayPosition();
    updateLiveCoordsReadout(el);
    updateHistoryUI();
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
    const action = state.undoStack.pop();
    if (!action) return;
    state.redoStack.push(action);
    const doc = dom.iframe.contentDocument;
    if (!doc) return;
    const el = doc.querySelector(action.selector);
    if (!el) return;

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
    syncUndoRedoButtons();
    updateHistoryUI();
    showToast('Đã hoàn tác (Undo)', '↩️');
  }

  function performRedo() {
    const action = state.redoStack.pop();
    if (!action) return;
    state.undoStack.push(action);
    const doc = dom.iframe.contentDocument;
    if (!doc) return;
    const el = doc.querySelector(action.selector);
    if (!el) return;

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
    syncUndoRedoButtons();
    updateHistoryUI();
    showToast('Đã làm lại (Redo)', '↪️');
  }

  // ==================== LIVE HOVER PREVIEW ENGINE (FONT, COLOR, GRADIENT, SHADOW, LAYOUT, ADD BLOCK) ====================
  let activeHoverBackup = null; // { el, styleAttr, dx, dy, rot, scale }
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

  /**
   * Temporarily applies CSS properties or position offsets to `state.selectedEl` on mouseenter
   * without mutating `state.editsMap` or `state.undoStack`. Reverts 100% cleanly on mouseleave!
   */
  function startHoverPreview(stylePropsMap, previewLabel = '') {
    const el = state.selectedEl;
    if (!el || state.mode !== 'edit') return;

    if (!activeHoverBackup || activeHoverBackup.el !== el) {
      activeHoverBackup = {
        el,
        styleAttr: el.getAttribute('style')
      };
    } else {
      // Restore baseline before applying next hovered option
      if (activeHoverBackup.styleAttr === null) el.removeAttribute('style');
      else el.setAttribute('style', activeHoverBackup.styleAttr);
    }

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
      const { el, styleAttr } = activeHoverBackup;
      if (styleAttr === null) el.removeAttribute('style');
      else el.setAttribute('style', styleAttr);
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
    hostStyle.textContent = combinedCss;

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
      iframeLibStyle.textContent = combinedCss;
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

    // Snapshot initial inline styles on all elements so "↺ Màu gốc / Về Gốc" restores 100% accurately
    doc.querySelectorAll('*').forEach(node => {
      if (!node.hasAttribute('data-ui-init-style') && !node.hasAttribute('data-studio-ignore')) {
        node.setAttribute('data-ui-init-style', node.getAttribute('style') || '');
      }
    });

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
          border: 1.5px dashed #06b6d4;
          background: rgba(6, 182, 212, 0.04);
          pointer-events: none;
          display: none;
          border-radius: 2px;
          transition: none;
        }
        .__ui_hover_label {
          position: absolute;
          top: -22px;
          left: -1px;
          background: #0891b2;
          color: #fff;
          font-size: 10.5px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 3px;
          white-space: nowrap;
          font-family: monospace;
        }
        .__ui_select_box {
          position: fixed;
          border: 2px solid #6366f1;
          background: rgba(99, 102, 241, 0.03);
          pointer-events: none;
          display: none;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.25);
        }
        .__ui_select_hud {
          position: absolute;
          top: -32px;
          left: -2px;
          background: #0f172a;
          border: 1px solid rgba(99, 102, 241, 0.7);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          gap: 5px;
          pointer-events: auto;
          font-family: 'Inter', sans-serif;
        }
        .__ui_hud_info {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          color: #38bdf8;
          padding-right: 5px;
          border-right: 1px solid rgba(255,255,255,0.16);
        }
        .__ui_hud_btn {
          background: rgba(255,255,255,0.08);
          border: none;
          color: #e2e8f0;
          font-size: 10.5px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          cursor: pointer;
        }
        .__ui_hud_btn:hover {
          background: #6366f1;
          color: #fff;
        }
        .__ui_hud_btn--warn {
          background: rgba(245, 158, 11, 0.2);
          color: #fcd34d;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .__ui_hud_btn--warn:hover {
          background: #f59e0b;
          color: #0b0e14;
        }
        .__ui_hud_btn--danger {
          background: rgba(239, 68, 68, 0.22);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.45);
        }
        .__ui_hud_btn--danger:hover {
          background: #ef4444;
          color: #fff;
        }
        .__ui_handle {
          position: absolute;
          width: 9px;
          height: 9px;
          background: #ffffff;
          border: 2px solid #6366f1;
          border-radius: 2px;
          pointer-events: auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .__ui_handle:hover {
          background: #6366f1;
          transform: scale(1.25);
        }
        .__ui_handle--nw { top: -5px; left: -5px; cursor: nwse-resize; }
        .__ui_handle--n  { top: -5px; left: calc(50% - 4.5px); cursor: ns-resize; }
        .__ui_handle--ne { top: -5px; right: -5px; cursor: nesw-resize; }
        .__ui_handle--e  { top: calc(50% - 4.5px); right: -5px; cursor: ew-resize; }
        .__ui_handle--se { bottom: -5px; right: -5px; cursor: nwse-resize; }
        .__ui_handle--s  { bottom: -5px; left: calc(50% - 4.5px); cursor: ns-resize; }
        .__ui_handle--sw { bottom: -5px; left: -5px; cursor: nesw-resize; }
        .__ui_handle--w  { top: calc(50% - 4.5px); left: -5px; cursor: ew-resize; }

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
          <button type="button" class="__ui_hud_btn" data-hud-act="parent" title="Chọn khối cha (Esc)">⬆️ Cha</button>
          <button type="button" class="__ui_hud_btn" data-hud-act="edit" title="Sửa chữ trực tiếp (Double-click)">✍️ Sửa</button>
          <button type="button" class="__ui_hud_btn" data-hud-act="dup" title="Nhân bản phần tử này">📋 Nhân bản</button>
          <button type="button" class="__ui_hud_btn __ui_hud_btn--warn" data-hud-act="reset" title="Khôi phục phần tử về nguyên bản gốc">↺ Gốc</button>
          <button type="button" class="__ui_hud_btn __ui_hud_btn--danger" data-hud-act="delete" title="Xóa phần tử này khỏi trang (Delete)">🗑️ Xóa</button>
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

    win.addEventListener('scroll', updateOverlayPosition, { passive: true });
    win.addEventListener('resize', updateOverlayPosition, { passive: true });

    // Prevent default navigation on click in Edit Mode
    doc.addEventListener('click', e => {
      if (state.mode !== 'edit') return;
      if (e.target.closest('[data-studio-ignore="true"]')) return;
      const link = e.target.closest('a, button, input[type="submit"]');
      if (link) {
        e.preventDefault();
      }
    }, true);

    // Hover highlight
    doc.addEventListener('mousemove', e => {
      if (state.mode !== 'edit') return;

      if (dragSession) {
        handleDragMove(e);
        return;
      }

      const target = resolveSmartTarget(e.target);
      if (target && target !== doc.body && target !== doc.documentElement) {
        state.hoveredEl = target;
      } else {
        state.hoveredEl = null;
      }
      updateOverlayPosition();
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
      const { dx, dy, rot, scale } = getElementOffsets(dragSession.el);
      const selector = getUniqueSelector(dragSession.el);
      pushUndoAction({
        type: 'move',
        selector,
        prevDx: dragSession.startDx,
        prevDy: dragSession.startDy,
        prevRot: dragSession.startRot,
        prevScale: dragSession.startScale,
        newDx: dx,
        newDy: dy,
        newRot: rot,
        newScale: scale
      });
      updateHistoryUI();
    }
    dragSession = null;
  }

  function enableInlineTextEdit(el) {
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
        const rec = ensureEditRecord(el);
        rec.textChanged = newText;
        dom.propTextContent.value = newText;
        pushUndoAction({
          type: 'text',
          selector: rec.selector,
          prevText,
          newText
        });
        updateHistoryUI();
      }
    };
    el.addEventListener('blur', onBlur);
  }

  // ==================== ELEMENT SELECTION & INSPECTOR SYNC ====================
  function selectElement(el) {
    state.selectedEl = el;

    if (!el) {
      state.selectedSelector = null;
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
      return;
    }

    const selector = getUniqueSelector(el);
    state.selectedSelector = selector;
    const tag = el.tagName.toLowerCase();

    dom.selectedTagBadge.textContent = tag.toUpperCase();
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
        delBtn.textContent = '🗑️';
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
        dom.domTreeContainer.appendChild(item);
      }

      if (depth < 7) {
        Array.from(node.children).forEach(child => traverse(child, depth + 1));
      }
    }

    Array.from(doc.body.children).forEach(child => traverse(child, 0));
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
          <div class="change-item__selector">➕ Khối mới: ${nodeInfo.id}</div>
          <button type="button" class="change-item__revert" title="Xóa khối mới thêm này">🗑️ Xóa</button>
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
        summaryParts.push('🗑️ Đã ẩn/xóa phần tử');
      } else {
        if (rec.styles['translate']) summaryParts.push(`📍 Dịch tọa độ: ${rec.styles['translate']}`);
        if (rec.styles['background-color'] || rec.styles['background']) {
          summaryParts.push(`🎨 Nền: ${rec.styles['background'] || rec.styles['background-color']}`);
        }
        if (rec.styles['color']) summaryParts.push(`🎨 Màu chữ: ${rec.styles['color']}`);
        if (rec.styles['font-family']) summaryParts.push(`🔤 Font: ${rec.styles['font-family']}`);
        if (rec.styles['font-size']) summaryParts.push(`🔤 Cỡ chữ: ${rec.styles['font-size']}`);
        if (rec.styles['width'] || rec.styles['height']) {
          summaryParts.push(`📐 Kích thước: ${rec.styles['width'] || 'auto'} × ${rec.styles['height'] || 'auto'}`);
        }
        if (rec.styles['border-radius']) summaryParts.push(`🔲 Bo góc: ${rec.styles['border-radius']}`);
        if (rec.textChanged !== null) summaryParts.push(`✍️ Đổi chữ: "${rec.textChanged.slice(0, 30)}"`);
        if (summaryParts.length === 0 && styleKeys.length > 0) {
          summaryParts.push(`⚡ Chỉnh CSS: ${styleKeys.join(', ')}`);
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

  function generateAiPromptText() {
    const fileLabel = state.currentFile || 'index.html';
    const lines = [
      `Hãy cập nhật giao diện cho file \`${fileLabel}\` theo đúng các thông số tọa độ và thuộc tính UI tôi đã căn chỉnh trực quan như sau:`,
      ``
    ];

    let idx = 1;
    state.editsMap.forEach(rec => {
      const entries = Object.entries(rec.styles);
      if (entries.length === 0 && rec.textChanged === null && Object.keys(rec.attrChanges).length === 0 && !rec.deleted) {
        return;
      }
      lines.push(`### ${idx}. Phần tử \`${rec.selector}\` (${rec.label})`);
      if (rec.deleted) {
        lines.push(`- **Hành động**: Xóa hoặc ẩn phần tử này (\`display: none\`).`);
      } else {
        if (rec.textChanged !== null) {
          lines.push(`- **Đổi nội dung văn bản thành**: \`${rec.textChanged.trim()}\``);
        }
        Object.entries(rec.attrChanges).forEach(([attr, val]) => {
          lines.push(`- **Đổi thuộc tính \`${attr}\` thành**: \`${val}\``);
        });
        if (entries.length > 0) {
          lines.push(`- **Cập nhật CSS**:`);
          entries.forEach(([k, v]) => {
            lines.push(`  - \`${k}: ${v};\``);
          });
        }
      }
      lines.push(``);
      idx++;
    });

    if (state.injectedCdns.size > 0) {
      lines.push(`### Các Thư Viện UI / CDN Đã Kích Hoạt Trong \`<head>\`:`);
      state.injectedCdns.forEach(cdnKey => {
        const def = CDN_DEFINITIONS[cdnKey];
        if (def) {
          lines.push(`- **${def.name}**: ${def.css ? `CSS: \`${def.css}\` ` : ''}${def.js ? `JS: \`${def.js}\`` : ''}`);
        }
      });
      lines.push(``);
    }

    if (state.addedNodes.length > 0) {
      lines.push(`### Các Component / Phần tử mới được chèn thêm từ Thư viện UI:`);
      state.addedNodes.forEach(node => {
        const libTag = node.libName ? ` **[Thư viện: ${node.libName} — ${node.compName || node.id}]**` : '';
        lines.push(`- Chèn vào trong \`${node.parentSelector}\`${libTag}: \`${node.html}\``);
      });
      lines.push(``);
    }

    const cssPatch = generateCssPatchString();
    if (cssPatch) {
      lines.push(`---`);
      lines.push(`### Mã CSS tổng hợp (Có thể áp dụng trực tiếp):`);
      lines.push('```css');
      lines.push(cssPatch);
      lines.push('```');
    }

    return lines.join('\n');
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
        showToast('Không thể ghi trực tiếp, đang tải file HTML về máy...', '⚠️');
        downloadEditedHtml();
        return;
      }
    }

    // Case 2: Connected to local project workspace via Studio Server
    if (state.currentFile) {
      try {
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            relativePath: state.currentFile,
            htmlContent: finalHtml
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Lỗi khi lưu file');
        state.originalRawHtml = finalHtml;
        showToast(
          `Đã lưu thẳng vào ${state.currentFile}${data.backupCreated ? ' (Đã tạo bản .bak dự phòng)' : ''}!`,
          '💾'
        );
      } catch (err) {
        showToast(`Lỗi lưu file: ${err.message}`, '❌');
      }
      return;
    }

    // Case 3: Demo or pasted HTML -> trigger file download
    downloadEditedHtml();
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
      const res = workspaceDir
        ? await fetch('/api/workspace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workspaceDir })
          })
        : await fetch('/api/workspace');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không đọc được thư mục');

      state.workspaceDir = data.workspaceDir;
      state.files = data.files || [];
      dom.folderLabel.textContent = state.workspaceDir;
      dom.inputWorkspacePath.value = state.workspaceDir;

      dom.pageSelector.innerHTML = `<option value="">-- Chọn file HTML (${state.files.length} trang) --</option>`;
      state.files.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.relativePath;
        opt.textContent = `📄 ${f.name}`;
        dom.pageSelector.appendChild(opt);
      });

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

    const pageUrl = `/workspace/${encodeURI(relativePath)}?t=${Date.now()}`;
    try {
      const rawRes = await fetch(pageUrl);
      state.originalRawHtml = await rawRes.text();
    } catch (_) {
      state.originalRawHtml = '';
    }

    dom.iframe.removeAttribute('srcdoc');
    dom.iframe.src = pageUrl;
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
  <title>Demo Landing Page</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      padding: 48px 32px;
    }
    .container {
      max-width: 1040px;
      margin: 0 auto;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      margin-bottom: 56px;
    }
    .logo { font-weight: 800; font-size: 20px; color: #38bdf8; }
    .nav-btn {
      background: #6366f1;
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 99px;
      font-weight: 700;
      border: none;
      cursor: pointer;
    }
    .hero {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 40px;
      align-items: center;
      background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 48px;
      border-radius: 28px;
    }
    .badge {
      display: inline-block;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 18px;
    }
    h1 {
      font-size: 44px;
      line-height: 1.15;
      margin-bottom: 18px;
    }
    p.lead {
      font-size: 17px;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .btn-row {
      display: flex;
      gap: 14px;
    }
    .btn-primary-demo {
      background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
      color: #fff;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 15px;
      border: none;
    }
    .btn-outline-demo {
      background: #1e293b;
      color: #e2e8f0;
      padding: 14px 26px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 15px;
      border: 1px solid #334155;
    }
    .hero-card {
      background: #0b1120;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 28px;
      text-align: center;
    }
    .hero-card img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 14px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <nav class="navbar">
      <div class="logo">✦ KHOA.STUDIO</div>
      <button class="nav-btn">Liên Hệ Ngay</button>
    </nav>
    <section class="hero">
      <div class="hero-left">
        <span class="badge">⚡ KÉO THẢ TỰ DO REALTIME</span>
        <h1>Click vào bất kỳ nút nào và kéo thử sang trái!</h1>
        <p class="lead">Bạn không cần gõ câu lệnh bảo AI dịch từng nút nữa. Hãy click chuột kéo thả, đổi màu nền, bo góc hoặc nhấp đúp để sửa chữ trực tiếp ngay tại đây.</p>
        <div class="btn-row">
          <button class="btn-primary-demo">Kéo Thử Nút Này Sang Trái</button>
          <button class="btn-outline-demo">Đổi Màu Nút Này</button>
        </div>
      </div>
      <div class="hero-card">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Demo Artwork" />
        <h3>Thẻ Giao Diện Mẫu</h3>
        <p style="color:#94a3b8;font-size:14px;margin-top:6px;">Kéo 8 điểm neo quanh khung để đổi kích thước</p>
      </div>
    </section>
  </div>
</body>
</html>`;
    loadRawHtmlString(demoHtml, 'demo-landing.html');
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

    state.addedNodes.push({
      id: uniqueId,
      parentSelector,
      html: newEl.outerHTML
    });

    selectElement(newEl);
    newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    buildDomTree();
    updateHistoryUI();
    showToast('Đã chèn khối mới — Bạn có thể kéo thả ngay!', '➕');
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

    // Do not intercept typing inside inputs/textareas/contenteditable
    const active = document.activeElement;
    const isTypingInHost = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');
    const iframeActive = dom.iframe.contentDocument && dom.iframe.contentDocument.activeElement;
    const isTypingInIframe = iframeActive && (
      iframeActive.tagName === 'INPUT' ||
      iframeActive.tagName === 'TEXTAREA' ||
      iframeActive.getAttribute('contenteditable') === 'true'
    );

    if (isTypingInHost || isTypingInIframe) {
      if (e.key === 'Escape' && isTypingInIframe) {
        iframeActive.blur();
      }
      return;
    }

    // Undo / Redo
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
    const { dx, dy, rot, scale } = getElementOffsets(state.selectedEl);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      pushUndoAction({ type: 'move', selector: state.selectedSelector, prevDx: dx, prevDy: dy, prevRot: rot, prevScale: scale, newDx: dx - step, newDy: dy, newRot: rot, newScale: scale });
      applyElementPosition(state.selectedEl, dx - step, dy);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      pushUndoAction({ type: 'move', selector: state.selectedSelector, prevDx: dx, prevDy: dy, prevRot: rot, prevScale: scale, newDx: dx + step, newDy: dy, newRot: rot, newScale: scale });
      applyElementPosition(state.selectedEl, dx + step, dy);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      pushUndoAction({ type: 'move', selector: state.selectedSelector, prevDx: dx, prevDy: dy, prevRot: rot, prevScale: scale, newDx: dx, newDy: dy - step, newRot: rot, newScale: scale });
      applyElementPosition(state.selectedEl, dx, dy - step);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      pushUndoAction({ type: 'move', selector: state.selectedSelector, prevDx: dx, prevDy: dy, prevRot: rot, prevScale: scale, newDx: dx, newDy: dy + step, newRot: rot, newScale: scale });
      applyElementPosition(state.selectedEl, dx, dy + step);
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

    // If this is a newly added element, remove it cleanly from DOM & state.addedNodes
    if (customId) {
      const idx = state.addedNodes.findIndex(n => n.id === customId);
      if (idx !== -1) {
        state.addedNodes.splice(idx, 1);
      }
      state.editsMap.delete(getUniqueSelector(el));
      el.remove();
      selectElement(null);
      buildDomTree();
      updateHistoryUI();
      showToast('Đã xóa sạch khối mới thêm!', '🗑️');
      return;
    }

    const rec = ensureEditRecord(el);
    pushUndoAction({
      type: 'delete',
      selector: rec.selector
    });
    el.style.setProperty('display', 'none', 'important');
    rec.deleted = true;
    rec.styles['display'] = 'none';
    selectElement(null);
    buildDomTree();
    updateHistoryUI();
    showToast('Đã xóa phần tử (Bấm Ctrl+Z hoặc vào Lịch sử nếu muốn khôi phục)', '🗑️');
  }

  function resetElementToOriginal(el) {
    if (!el) return;
    endHoverPreview();
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
    el.removeAttribute('data-ui-dx');
    el.removeAttribute('data-ui-dy');
    el.removeAttribute('data-ui-rot');
    el.removeAttribute('data-ui-scale');
    if (state.selectedEl === el) selectElement(el);
    buildDomTree();
    updateHistoryUI();
    showToast('Đã khôi phục phần tử về nguyên trạng gốc!', '↺');
  }

  function resetPropertiesGroup(el, propsList, toastMsg) {
    if (!el) return;
    endHoverPreview();
    const selector = getUniqueSelector(el);
    const rec = state.editsMap.get(selector);
    propsList.forEach(p => {
      el.style.removeProperty(p);
      if (rec && rec.styles) delete rec.styles[p];
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
        Object.entries(preset.styles).forEach(([k, v], idx, arr) => {
          applyStyleProperty(state.selectedEl, k, v, idx === arr.length - 1);
        });
        selectElement(state.selectedEl);
        showToast(`Đã áp dụng "${preset.name}"! (Bấm ↺ Về Gốc nếu muốn hủy)`, '✨');
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
          const reCleaned = convertJsxToCleanHtml(comp.rawCode || comp.html);
          if (reCleaned && reCleaned !== comp.html) {
            comp.html = reCleaned;
            needsResave = true;
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

  function morphSelectedWithLibComponent(comp) {
    if (!state.selectedEl) {
      showToast('Hãy click chọn 1 phần tử trên trang web trước, hoặc bấm "➕ Chèn Mới"!', '👆');
      return;
    }
    endHoverPreview();
    clearPreviewAddBlock();
    const styles = comp.morphStyles || {};
    const entries = Object.entries(styles);
    if (entries.length === 0) {
      insertLibComponentToPage(comp);
      return;
    }
    entries.forEach(([k, v], idx) => {
      applyStyleProperty(state.selectedEl, k, v, idx === entries.length - 1);
    });
    selectElement(state.selectedEl);
    showToast(`Đã biến hình theo "${comp.libName} — ${comp.name}"! (Bấm ↺ Về Gốc nếu muốn hủy)`, '✨');
  }

  function insertLibComponentToPage(comp) {
    endHoverPreview();
    clearPreviewAddBlock();
    const doc = dom.iframe.contentDocument;
    if (!doc || !doc.body) return;

    // Auto-inject Tailwind CDN if component uses Tailwind classes
    if (looksLikeTailwind(comp.html) && !state.injectedCdns.has('tailwind')) {
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

    if (state.selectedEl && state.selectedEl.parentElement === container) {
      state.selectedEl.insertAdjacentElement('afterend', newEl);
    } else {
      container.appendChild(newEl);
    }

    state.addedNodes.push({
      id: uniqueId,
      libName: comp.libName,
      compName: comp.name,
      parentSelector,
      html: newEl.outerHTML
    });

    selectElement(newEl);
    newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    buildDomTree();
    updateHistoryUI();
    showToast(`Đã chèn "${comp.name}" (${comp.libName}) vào trang!`, '➕');
  }

  function previewComponentCardOnHover(comp) {
    const mode = dom.uilibHoverMode ? dom.uilibHoverMode.value : 'auto';
    const hasSelected = Boolean(state.selectedEl);
    const hasMorph = comp.morphStyles && Object.keys(comp.morphStyles).length > 0;

    if (mode === 'morph' && hasSelected && hasMorph) {
      startHoverPreview(comp.morphStyles, `${comp.libName}: ${comp.name}`);
      return;
    }
    if (mode === 'insert') {
      previewRawHtmlBlockOnHover(comp.html, `${comp.libName}: ${comp.name}`);
      return;
    }
    // Auto smart mode: if user has selected a button/link/badge and hovers a button/badge component, preview morphing it directly!
    // Otherwise preview inserting the full component block onto the page!
    if (hasSelected && hasMorph) {
      const selTag = state.selectedEl.tagName.toLowerCase();
      const isBtnLike = selTag === 'button' || selTag === 'a' || selTag === 'span';
      if ((comp.category === 'button' || comp.category === 'badge') && isBtnLike) {
        startHoverPreview(comp.morphStyles, `Biến hình nút → ${comp.libName}: ${comp.name}`);
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

    const isLargeBlock = comp.category === 'card' || comp.category === 'pricing' || comp.category === 'hero' || comp.category === 'nav';

    const topRightHtml = isCustom
      ? `
        <div class="uilib-card-top-actions">
          <button type="button" class="uilib-card-mini-btn uilib-card-mini-btn--edit btn-edit-custom" title="Sửa lại code hoặc tên của mẫu tự Import này">✏️ Sửa</button>
          <button type="button" class="uilib-card-mini-btn uilib-card-mini-btn--del btn-del-custom" title="Xóa mẫu tự Import này khỏi Kho UI">🗑️ Xóa</button>
        </div>
      `
      : `<a href="${libMeta.url}" target="_blank" rel="noopener" class="uilib-site-link" title="Mở trang chủ ${libMeta.name} (${libMeta.url})">↗ Web</a>`;

    card.innerHTML = `
      <div class="uilib-comp-card__top">
        <div class="uilib-comp-card__meta">
          <span class="uilib-lib-badge" style="border-color:${libMeta.accent}55;color:${libMeta.accent};background:${libMeta.accent}18;">${libMeta.name}</span>
          <span class="uilib-comp-title" title="${comp.name}">${comp.name}</span>
        </div>
        ${topRightHtml}
      </div>
      <div class="uilib-comp-stage ${isLargeBlock ? 'uilib-comp-stage--scaled' : ''}">
        ${comp.html}
      </div>
      <div class="uilib-comp-card__actions ${isCustom ? 'uilib-comp-card__actions--3col' : ''}">
        <button type="button" class="uilib-act-btn btn-morph-comp" title="Rê chuột để xem thử biến hình phần tử đang chọn theo phong cách của ${libMeta.name}">
          ✨ Áp Style
        </button>
        <button type="button" class="uilib-act-btn uilib-act-btn--primary btn-insert-comp" title="Rê chuột để xem thử & Chèn Component này vào trang web">
          ➕ Chèn Mới
        </button>
        ${isCustom ? `<button type="button" class="uilib-act-btn uilib-act-btn--danger btn-del-custom-bottom" title="Xóa mẫu tự Import này khỏi Kho UI">🗑️ Xóa</button>` : ''}
      </div>
    `;

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

    // Prevent links/buttons inside the preview stage from navigating away
    const stageEl = card.querySelector('.uilib-comp-stage');
    stageEl.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      insertLibComponentToPage(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    // Hovering the card stage previews on the live webpage
    stageEl.addEventListener('mouseenter', () => {
      previewComponentCardOnHover(comp);
    });
    stageEl.addEventListener('mouseleave', clearComponentHoverPreview);

    // Action Button 1: Morph currently selected element
    const btnMorph = card.querySelector('.btn-morph-comp');
    btnMorph.addEventListener('mouseenter', () => {
      clearPreviewAddBlock();
      if (state.selectedEl && comp.morphStyles) {
        startHoverPreview(comp.morphStyles, `Áp Style ${libMeta.name}: ${comp.name}`);
      }
    });
    btnMorph.addEventListener('mouseleave', clearComponentHoverPreview);
    btnMorph.addEventListener('click', e => {
      e.stopPropagation();
      morphSelectedWithLibComponent(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    // Action Button 2: Insert as new component block
    const btnInsert = card.querySelector('.btn-insert-comp');
    btnInsert.addEventListener('mouseenter', () => {
      endHoverPreview();
      previewRawHtmlBlockOnHover(comp.html, `Chèn mới ${libMeta.name}: ${comp.name}`);
    });
    btnInsert.addEventListener('mouseleave', clearComponentHoverPreview);
    btnInsert.addEventListener('click', e => {
      e.stopPropagation();
      insertLibComponentToPage(comp);
      if (isModalView && dom.modalUilibExplorer) {
        dom.modalUilibExplorer.classList.add('hidden');
      }
    });

    return card;
  }

  function getFilteredUiComponents(queryStr, categoryFilter, libFilter) {
    const allComps = window.STUDIO_LIB_COMPONENTS || [];
    const q = (queryStr || '').trim().toLowerCase();

    return allComps.filter(comp => {
      if (libFilter && libFilter !== 'all') {
        if (libFilter === 'custom') {
          if (!isCustomImportedComp(comp)) return false;
        } else if (comp.libId !== libFilter) {
          return false;
        }
      }
      if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== 'directory') {
        if (categoryFilter === 'custom') {
          if (!isCustomImportedComp(comp)) return false;
        } else if (categoryFilter === 'hero') {
          if (comp.category !== 'hero' && comp.category !== 'nav') return false;
        } else if (comp.category !== categoryFilter) {
          return false;
        }
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
  }

  function renderSidebarUiLibraries() {
    if (!dom.uilibComponentsList) return;
    dom.uilibComponentsList.innerHTML = '';

    const libs = window.STUDIO_UI_LIBRARIES || [];
    const q = (state.uilibSearchQuery || '').trim().toLowerCase();

    // If user chose "📚 38 Web Libs" directory mode, render the 38 libraries directory cards!
    if (state.uilibCategory === 'directory') {
      const filteredLibs = libs.filter(l => {
        if (!q) return true;
        return `${l.name} ${l.category} ${l.desc} ${l.badge}`.toLowerCase().includes(q);
      });
      if (dom.uilibResultsCount) {
        dom.uilibResultsCount.textContent = `Danh bạ ${filteredLibs.length} Thư viện UI trong ảnh của bạn`;
      }
      filteredLibs.forEach(lib => {
        const compCount = (window.STUDIO_LIB_COMPONENTS || []).filter(c => c.libId === lib.id).length;
        const el = document.createElement('div');
        el.className = 'uilib-site-card';
        el.innerHTML = `
          <div class="uilib-site-card__top">
            <div class="uilib-site-card__name">
              <span style="width:8px;height:8px;border-radius:50%;background:${lib.accent};display:inline-block;"></span>
              <span>${lib.name}</span>
            </div>
            <span class="uilib-lib-badge" style="border-color:${lib.accent}55;color:${lib.accent};background:${lib.accent}15;">${lib.badge}</span>
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

    const matched = getFilteredUiComponents(
      state.uilibSearchQuery,
      state.uilibCategory,
      state.uilibSelectedLib
    );

    if (dom.uilibResultsCount) {
      const uniqueLibs = new Set(matched.map(m => m.libName)).size;
      dom.uilibResultsCount.textContent = `Tìm thấy ${matched.length} Component từ ${uniqueLibs} Thư viện`;
    }

    if (matched.length === 0) {
      dom.uilibComponentsList.innerHTML = `
        <div class="empty-state-sm">
          Không tìm thấy mẫu khớp với "<strong>${state.uilibSearchQuery}</strong>".<br/><br/>
          💡 Bạn có thể bấm nút <strong>"📥 Import Code Từ Web"</strong> ở trên để dán bất kỳ code HTML/Tailwind/JSX nào từ trang chủ các thư viện!
        </div>
      `;
      return;
    }

    matched.forEach(comp => {
      dom.uilibComponentsList.appendChild(createComponentCardElement(comp, false));
    });
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

    // Right grid
    dom.uilibModalGrid.innerHTML = '';
    const matched = getFilteredUiComponents(modalQuery, 'all', modalLibFilter);
    matched.forEach(comp => {
      dom.uilibModalGrid.appendChild(createComponentCardElement(comp, true));
    });
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

    // Restore saved Studio Theme (tweakcn style)
    const savedTheme = localStorage.getItem('studio_ui_theme') || 'obsidian';
    document.documentElement.setAttribute('data-studio-theme', savedTheme);
    if (dom.studioThemeSelect) {
      dom.studioThemeSelect.value = savedTheme;
      dom.studioThemeSelect.addEventListener('change', e => {
        const theme = e.target.value;
        document.documentElement.setAttribute('data-studio-theme', theme);
        localStorage.setItem('studio_ui_theme', theme);
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

    // Live Preview & Save in Custom JSX/Tailwind/HTML Importer
    const updateCustomImportPreview = () => {
      if (!dom.importCompCode || !dom.importLivePreviewStage) return;
      const raw = dom.importCompCode.value.trim();
      const extraCss = dom.importCompCss ? dom.importCompCss.value.trim() : '';
      if (extraCss) {
        state.customExtraCss = extraCss;
        syncLibraryCssEverywhere();
      }
      if (!raw) {
        dom.importLivePreviewStage.innerHTML = `<span style="color:#71717a;font-size:13px;">Hãy dán code vào ô bên trái để xem trước ngay tại đây...</span>`;
        return;
      }
      const cleanHtml = convertJsxToCleanHtml(raw);
      dom.importLivePreviewStage.innerHTML = cleanHtml;
    };

    if (dom.importCompCode) {
      dom.importCompCode.addEventListener('input', updateCustomImportPreview);
    }
    if (dom.importCompCss) {
      dom.importCompCss.addEventListener('input', updateCustomImportPreview);
    }

    const handleSaveImportedComponent = (alsoInsertToPage = false) => {
      const rawCode = dom.importCompCode ? dom.importCompCode.value.trim() : '';
      if (!rawCode) {
        showToast('Hãy dán đoạn mã HTML hoặc JSX vào ô trước!', '⚠️');
        return;
      }
      const cleanHtml = convertJsxToCleanHtml(rawCode);
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
        name,
        libId: '21stdev',
        libName: 'Custom Import',
        category,
        tags: [category, 'custom', 'import', 'tu import', name.toLowerCase()],
        morphStyles: {},
        rawCode,
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

  // ==================== EVENT BINDINGS FOR STUDIO UI ====================
  function initStudioUIEvents() {
    window.addEventListener('keydown', handleGlobalKeydown);

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
      dom.aiPromptOutput.value = generateAiPromptText();
      dom.cssPatchOutput.value = generateCssPatchString() || '/* Chưa có thay đổi CSS nào */';
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
      state.addedNodes.push({
        id: uniqueId,
        parentSelector: getUniqueSelector(state.selectedEl.parentElement) || 'body',
        html: clone.outerHTML
      });
      selectElement(clone);
      buildDomTree();
      updateHistoryUI();
      showToast('Đã nhân bản phần tử! (Bấm 🗑️ Xóa nếu muốn hủy)', '📋');
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
        el.removeAttribute('data-ui-dx');
        el.removeAttribute('data-ui-dy');
        el.removeAttribute('data-ui-rot');
        el.removeAttribute('data-ui-scale');
        resetPropertiesGroup(el, ['translate', 'rotate', 'scale', 'width', 'height', 'margin-left', 'margin-top'], 'Đã đưa vị trí & kích thước về gốc!');
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

    // AI Prompt Modal Tabs & Copy
    document.querySelectorAll('.prompt-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.ptab-content').forEach(c => c.classList.add('hidden'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.ptab).classList.remove('hidden');
      });
    });

    dom.btnCopyAiPrompt.addEventListener('click', () => {
      navigator.clipboard.writeText(dom.aiPromptOutput.value);
      showToast('Đã copy Prompt chuẩn cho AI vào bộ nhớ tạm!', '📋');
    });

    dom.btnCopyCssPatch.addEventListener('click', () => {
      navigator.clipboard.writeText(dom.cssPatchOutput.value);
      showToast('Đã copy mã CSS vào bộ nhớ tạm!', '🎨');
    });
  }

  // ==================== INITIALIZATION ====================
  initStudioUIEvents();
  loadWorkspaceFiles();
})();
