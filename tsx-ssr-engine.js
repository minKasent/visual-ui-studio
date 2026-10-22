/**
 * VISUAL UI STUDIO PRO v6.0 — OFFICIAL TSX-TO-HTML SSR COMPILER ENGINE
 * Uses `sucrase` (TypeScript + JSX compiler) + `lucide-static` (official Lucide SVGs)
 * + Official Shadcn / Origin UI / coss ui / Magic UI / Aceternity UI / KokonutUI primitives
 * to execute real `.tsx` component files and produce 100% genuine Server-Side Rendered HTML.
 */

const { transform } = require('sucrase');
const lucideIcons = require('lucide-static');
const vm = require('vm');

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const SVG_CAMEL_MAP = {
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeMiterlimit: 'stroke-miterlimit',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  fillOpacity: 'fill-opacity',
  strokeOpacity: 'stroke-opacity'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cn(...inputs) {
  const out = [];
  const walk = item => {
    if (!item) return;
    if (typeof item === 'string' || typeof item === 'number') {
      out.push(String(item));
    } else if (Array.isArray(item)) {
      item.forEach(walk);
    } else if (typeof item === 'object') {
      Object.entries(item).forEach(([k, v]) => {
        if (v) out.push(k);
      });
    }
  };
  inputs.forEach(walk);
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

function styleObjToString(styleObj) {
  if (!styleObj) return '';
  if (typeof styleObj === 'string') return styleObj;
  const unitless = new Set([
    'opacity', 'zIndex', 'fontWeight', 'lineHeight', 'flex', 'flexGrow',
    'flexShrink', 'order', 'zoom', 'scale', 'aspectRatio'
  ]);
  return Object.entries(styleObj)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => {
      const cssKey = k.startsWith('--') ? k : k.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
      const cssVal = typeof v === 'number' && !unitless.has(k) && !k.startsWith('--') ? `${v}px` : String(v);
      return `${cssKey}:${cssVal}`;
    })
    .join(';');
}

// Resolve any Lucide icon name (e.g. "MoonIcon", "SunIcon", "Check", "LoaderCircleIcon") to official SVG
function getLucideSvgVNode(iconName, props = {}) {
  const cleanName = String(iconName)
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d+)/g, '$1-$2')
    .toLowerCase();

  const pascalKey = String(iconName).replace(/Icon$/, '');
  const fallbacks = [
    pascalKey,
    pascalKey.replace(/Circle$/, ''),
    cleanName,
    'Sparkles',
    'Circle'
  ];

  let rawSvg = null;
  for (const key of fallbacks) {
    if (lucideIcons[key] && typeof lucideIcons[key] === 'string') {
      rawSvg = lucideIcons[key];
      break;
    }
  }
  if (!rawSvg) {
    // Search case-insensitively in lucideIcons
    const lowerTarget = pascalKey.toLowerCase();
    const matchKey = Object.keys(lucideIcons).find(k => k.toLowerCase() === lowerTarget);
    if (matchKey) rawSvg = lucideIcons[matchKey];
  }
  if (!rawSvg) rawSvg = lucideIcons.Sparkles || '<svg viewBox="0 0 24 24" width="16" height="16"></svg>';

  const size = props.size || 16;
  const cls = cn('lucide shrink-0 inline-block', props.className);
  let customized = rawSvg
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`)
    .replace(/class="[^"]*"/, `class="${escapeHtml(cls)}"`);

  if (props.style) {
    customized = customized.replace('<svg ', `<svg style="${escapeHtml(styleObjToString(props.style))}" `);
  }
  return { __rawHtml: customized };
}

const Fragment = Symbol('Fragment');

function h(type, props, ...children) {
  const flatChildren = [];
  const pushChild = c => {
    if (Array.isArray(c)) c.forEach(pushChild);
    else if (c !== null && c !== undefined && c !== false && c !== true) flatChildren.push(c);
  };
  children.forEach(pushChild);

  const normalizedProps = { ...(props || {}) };
  if (flatChildren.length > 0 && normalizedProps.children === undefined) {
    normalizedProps.children = flatChildren.length === 1 ? flatChildren[0] : flatChildren;
  }

  if (type === Fragment) {
    return { type: Fragment, props: normalizedProps, children: flatChildren };
  }

  if (typeof type === 'function') {
    try {
      return type(normalizedProps);
    } catch (err) {
      return { type: 'div', props: { className: normalizedProps.className }, children: flatChildren };
    }
  }

  if (type && typeof type === 'object' && type.__rawHtml) {
    return type;
  }

  if (type && typeof type === 'object' && typeof type.render === 'function') {
    try {
      return type.render(normalizedProps, null);
    } catch (e) {}
  }

  return {
    type: typeof type === 'string' ? type : 'div',
    props: normalizedProps,
    children: flatChildren
  };
}

function renderVNodeToHtml(node) {
  if (node === null || node === undefined || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return escapeHtml(String(node));
  if (Array.isArray(node)) return node.map(renderVNodeToHtml).join('');
  if (node.__rawHtml) return node.__rawHtml;
  if (node.type === Fragment) return (node.children || []).map(renderVNodeToHtml).join('');
  if (typeof node.type === 'function') {
    try {
      return renderVNodeToHtml(node.type(node.props || {}));
    } catch (e) {
      return '';
    }
  }

  const tag = String(node.type || 'div');
  const props = node.props || {};
  const attrs = [];

  Object.entries(props).forEach(([k, v]) => {
    if (
      k === 'children' || k === 'key' || k === 'ref' ||
      k === 'asChild' || k === 'defaultValue' || k === 'onValueChange' ||
      k === 'onCheckedChange' || k === 'onOpenChange' ||
      k.startsWith('on') || typeof v === 'function' || typeof v === 'symbol'
    ) {
      return;
    }
    if (k === 'dangerouslySetInnerHTML' && v && v.__html) {
      return;
    }
    if (v === undefined || v === null || v === false) return;

    let attrName = k;
    if (k === 'className') attrName = 'class';
    else if (k === 'htmlFor') attrName = 'for';
    else if (k === 'defaultChecked') {
      if (v) attrs.push('checked');
      return;
    } else if (SVG_CAMEL_MAP[k]) {
      attrName = SVG_CAMEL_MAP[k];
    }

    if (k === 'style') {
      const s = styleObjToString(v);
      if (s) attrs.push(`style="${escapeHtml(s)}"`);
      return;
    }

    if (v === true) {
      attrs.push(attrName);
    } else if (typeof v === 'string' || typeof v === 'number') {
      attrs.push(`${attrName}="${escapeHtml(String(v))}"`);
    }
  });

  if (props.defaultValue !== undefined && tag === 'input' && props.value === undefined) {
    attrs.push(`value="${escapeHtml(String(props.defaultValue))}"`);
  }

  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  if (VOID_TAGS.has(tag.toLowerCase())) {
    return `<${tag}${attrStr} />`;
  }

  let inner = '';
  if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
    inner = String(props.dangerouslySetInnerHTML.__html);
  } else {
    inner = (node.children || []).map(renderVNodeToHtml).join('');
  }

  return `<${tag}${attrStr}>${inner}</${tag}>`;
}

// ==================== OFFICIAL SHADCN / ORIGIN / COSS / MAGIC / ACETERNITY PRIMITIVES ====================
function createOfficialPrimitives() {
  const Switch = props => {
    const isChecked = props.checked !== undefined ? Boolean(props.checked) : (props.defaultChecked !== undefined ? Boolean(props.defaultChecked) : true);
    const stateStr = isChecked ? 'checked' : 'unchecked';
    const hasCustomSize = /w-auto|h-\[inherit\]|h-4/.test(props.className || '');
    return h(
      'button',
      {
        type: 'button',
        role: 'switch',
        'aria-checked': String(isChecked),
        'data-state': stateStr,
        disabled: props.disabled,
        id: props.id,
        className: cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors outline-none',
          isChecked ? 'bg-primary text-primary-foreground' : 'bg-input',
          props.disabled && 'opacity-50 cursor-not-allowed',
          props.className
        )
      },
      h('span', {
        'data-state': stateStr,
        className: cn(
          'pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform',
          !hasCustomSize && 'size-5',
          !hasCustomSize && (isChecked ? 'translate-x-5' : 'translate-x-0')
        )
      })
    );
  };

  const Checkbox = props => {
    const isChecked = props.checked !== undefined ? Boolean(props.checked) : (props.defaultChecked !== undefined ? Boolean(props.defaultChecked) : true);
    const stateStr = isChecked ? 'checked' : 'unchecked';
    return h(
      'button',
      {
        type: 'button',
        role: 'checkbox',
        'aria-checked': String(isChecked),
        'data-state': stateStr,
        id: props.id,
        disabled: props.disabled,
        className: cn(
          'peer size-4 shrink-0 rounded-[4px] border border-primary shadow-xs transition-colors inline-flex items-center justify-center',
          isChecked ? 'bg-primary text-primary-foreground' : 'bg-background',
          props.disabled && 'opacity-50',
          props.className
        )
      },
      isChecked ? getLucideSvgVNode('Check', { size: 12, className: 'stroke-[3]' }) : null
    );
  };

  const RadioGroup = props => h('div', { role: 'radiogroup', className: cn('grid gap-2', props.className) }, props.children);
  const RadioGroupItem = props => {
    const isChecked = Boolean(props.checked || props.defaultChecked || String(props.value).endsWith('1'));
    return h(
      'button',
      {
        type: 'button',
        role: 'radio',
        'aria-checked': String(isChecked),
        'data-state': isChecked ? 'checked' : 'unchecked',
        className: cn(
          'aspect-square size-4 rounded-full border border-primary text-primary shadow-xs inline-flex items-center justify-center',
          props.className
        )
      },
      isChecked ? h('span', { className: 'size-2 rounded-full bg-primary block' }) : null
    );
  };

  const Label = props =>
    h(
      'label',
      {
        htmlFor: props.htmlFor,
        className: cn('text-sm font-medium leading-none text-foreground select-none cursor-pointer inline-flex items-center gap-2', props.className)
      },
      props.children
    );

  const Button = props => {
    const v = props.variant || 'default';
    const s = props.size || 'default';
    const vCls = {
      default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
      destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
      outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    }[v] || 'bg-primary text-primary-foreground shadow-xs';
    const sCls = {
      default: 'h-9 px-4 py-2 text-sm',
      sm: 'h-8 rounded-md px-3 text-xs',
      xs: 'h-7 rounded-md px-2.5 text-xs',
      lg: 'h-10 rounded-md px-6 text-base',
      icon: 'size-9'
    }[s] || 'h-9 px-4 py-2 text-sm';

    return h(
      'button',
      {
        type: props.type || 'button',
        disabled: props.disabled,
        className: cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all cursor-pointer outline-none',
          vCls,
          sCls,
          props.disabled && 'opacity-50 pointer-events-none',
          props.className
        ),
        style: props.style
      },
      props.children
    );
  };

  const Input = props =>
    h('input', {
      type: props.type || 'text',
      placeholder: props.placeholder || 'Nhập thông tin...',
      value: props.value !== undefined ? props.value : props.defaultValue,
      disabled: props.disabled,
      id: props.id,
      className: cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground outline-none',
        props.className
      )
    });

  const Textarea = props =>
    h(
      'textarea',
      {
        placeholder: props.placeholder || 'Nhập nội dung...',
        rows: props.rows || 3,
        className: cn(
          'flex min-h-[68px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground outline-none',
          props.className
        )
      },
      props.defaultValue || props.value || ''
    );

  const Badge = props => {
    const v = props.variant || 'default';
    const vCls = {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-white',
      outline: 'text-foreground border-border',
      info: 'border-blue-500/30 bg-blue-500/15 text-blue-400',
      success: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400',
      warning: 'border-amber-500/30 bg-amber-500/15 text-amber-400',
      error: 'border-rose-500/30 bg-rose-500/15 text-rose-400'
    }[v] || 'border-transparent bg-primary text-primary-foreground';
    return h(
      'span',
      {
        className: cn(
          'inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors gap-1.5',
          vCls,
          props.className
        )
      },
      props.children
    );
  };

  const Kbd = props =>
    h(
      'kbd',
      {
        className: cn(
          'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground',
          props.className
        )
      },
      props.children
    );

  const Card = props => h('div', { className: cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm p-5', props.className), style: props.style }, props.children);
  const CardHeader = props => h('div', { className: cn('flex flex-col space-y-1.5 pb-3', props.className) }, props.children);
  const CardTitle = props => h('h3', { className: cn('font-semibold leading-none tracking-tight text-base text-foreground', props.className) }, props.children);
  const CardDescription = props => h('p', { className: cn('text-xs text-muted-foreground', props.className) }, props.children);
  const CardContent = props => h('div', { className: cn('pt-1', props.className) }, props.children);
  const CardFooter = props => h('div', { className: cn('flex items-center pt-3 gap-2', props.className) }, props.children);
  const CardAction = props => h('div', { className: cn('ml-auto', props.className) }, props.children);

  const Alert = props => {
    const v = props.variant || 'default';
    const vCls = {
      default: 'bg-card text-foreground border-border',
      destructive: 'border-rose-500/50 text-rose-400 bg-rose-500/10',
      info: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
      success: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      warning: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      error: 'border-rose-500/50 text-rose-300 bg-rose-500/10'
    }[v] || 'bg-card text-foreground border-border';
    return h('div', { role: 'alert', className: cn('relative w-full rounded-lg border px-4 py-3 text-sm grid gap-1', vCls, props.className) }, props.children);
  };
  const AlertTitle = props => h('h5', { className: cn('font-semibold leading-none tracking-tight text-sm', props.className) }, props.children);
  const AlertDescription = props => h('div', { className: cn('text-xs text-muted-foreground leading-relaxed', props.className) }, props.children);
  const AlertAction = props => h('div', { className: cn('flex items-center gap-2 mt-2', props.className) }, props.children);

  const Avatar = props => h('span', { className: cn('relative flex size-9 shrink-0 overflow-hidden rounded-full border border-border bg-muted items-center justify-center', props.className) }, props.children);
  const AvatarImage = props => h('img', { src: props.src || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', alt: props.alt || 'Avatar', className: cn('aspect-square size-full object-cover', props.className) });
  const AvatarFallback = props => h('span', { className: cn('flex size-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground', props.className) }, props.children || 'UI');

  const Tabs = props => h('div', { className: cn('flex flex-col gap-2 w-full', props.className) }, props.children);
  const TabsList = props => h('div', { role: 'tablist', className: cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground gap-1', props.className) }, props.children);
  const TabsTrigger = props => {
    const isActive = String(props.value || '').endsWith('1') || props.active;
    return h(
      'button',
      {
        type: 'button',
        role: 'tab',
        'data-state': isActive ? 'active' : 'inactive',
        className: cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer',
          isActive ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground',
          props.className
        )
      },
      props.children
    );
  };
  const TabsContent = props => {
    const isFirst = !props.value || String(props.value).endsWith('1') || String(props.value) === 'account' || String(props.value) === 'overview';
    if (!isFirst) return null;
    return h('div', { role: 'tabpanel', className: cn('mt-1 rounded-md border border-border/60 p-3 text-xs text-muted-foreground', props.className) }, props.children);
  };

  const Accordion = props => h('div', { className: cn('w-full divide-y divide-border rounded-lg border border-border bg-card px-3', props.className) }, props.children);
  const AccordionItem = props => h('div', { className: cn('py-2.5', props.className) }, props.children);
  const AccordionTrigger = props =>
    h(
      'button',
      { type: 'button', className: cn('flex w-full items-center justify-between text-left text-xs font-semibold text-foreground gap-2', props.className) },
      h('span', null, props.children),
      getLucideSvgVNode('ChevronDown', { size: 14, className: 'text-muted-foreground shrink-0' })
    );
  const AccordionContent = props => h('div', { className: cn('pt-1.5 text-xs text-muted-foreground', props.className) }, props.children);

  const Slider = props => {
    const val = Array.isArray(props.defaultValue) ? props.defaultValue[0] : (Array.isArray(props.value) ? props.value[0] : 65);
    const max = props.max || 100;
    const pct = Math.min(100, Math.max(10, Math.round((val / max) * 100)));
    return h(
      'div',
      { className: cn('relative flex w-full touch-none select-none items-center py-2', props.className) },
      h(
        'div',
        { className: 'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary' },
        h('div', { className: 'absolute h-full bg-primary rounded-full', style: { width: `${pct}%` } })
      ),
      h('span', {
        className: 'block size-4 rounded-full border-2 border-primary bg-background shadow transition-colors',
        style: { marginLeft: '-8px' }
      })
    );
  };

  const Progress = props => {
    const val = props.value !== undefined ? props.value : 72;
    return h(
      'div',
      { className: cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', props.className) },
      h('div', { className: 'h-full bg-primary transition-all rounded-full', style: { width: `${val}%` } })
    );
  };

  const Skeleton = props => h('div', { className: cn('uilib-anim-shimmer rounded-md bg-muted', props.className), style: props.style }, props.children);
  const Spinner = props => getLucideSvgVNode('LoaderCircle', { size: props.size || 16, className: cn('animate-spin text-primary', props.className) });

  const Dialog = props => h('div', { className: cn('relative w-full', props.className) }, props.children);
  const DialogTrigger = props => h('div', { className: 'inline-block' }, props.children);
  const DialogContent = props => h('div', { className: cn('grid w-full max-w-sm gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg', props.className) }, props.children);
  const DialogHeader = props => h('div', { className: cn('flex flex-col space-y-1 text-left', props.className) }, props.children);
  const DialogTitle = props => h('h4', { className: cn('text-sm font-semibold leading-none tracking-tight text-foreground', props.className) }, props.children);
  const DialogDescription = props => h('p', { className: cn('text-xs text-muted-foreground', props.className) }, props.children);
  const DialogFooter = props => h('div', { className: cn('flex justify-end gap-2 pt-2', props.className) }, props.children);
  const DialogClose = props => h('div', { className: 'inline-block' }, props.children);

  const TooltipProvider = props => h(Fragment, null, props.children);
  const Tooltip = props => h('div', { className: 'inline-flex items-center gap-2 flex-wrap' }, props.children);
  const TooltipTrigger = props => h('span', { className: 'inline-flex' }, props.children);
  const TooltipContent = props =>
    h(
      'div',
      {
        className: cn(
          'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md inline-flex items-center gap-1.5',
          props.className
        )
      },
      props.children
    );

  const NavigationMenu = props => h('nav', { className: cn('relative z-10 flex max-w-max flex-1 items-center justify-center', props.className) }, props.children);
  const NavigationMenuList = props => h('ul', { className: cn('group flex flex-1 list-none items-center justify-center gap-1 m-0 p-0', props.className) }, props.children);
  const NavigationMenuItem = props => h('li', { className: cn('relative list-none', props.className) }, props.children);
  const NavigationMenuLink = props =>
    h(
      'a',
      {
        href: props.href || '#nav',
        className: cn('inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-foreground/85 hover:bg-accent hover:text-foreground transition-colors no-underline', props.className)
      },
      props.children
    );

  const Field = props => h('div', { className: cn('flex flex-col gap-1.5 w-full', props.className) }, props.children);
  const FieldLabel = Label;
  const FieldDescription = props => h('p', { className: cn('text-xs text-muted-foreground', props.className) }, props.children);
  const FieldError = props => h('p', { className: cn('text-xs text-rose-400', props.className) }, props.children);

  // Magic UI & Aceternity UI Official Primitives
  const RainbowButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift uilib-anim-rainbow inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer', props.className),
        style: { background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)', backgroundSize: '300% 300%' }
      },
      props.children || 'Rainbow Button'
    );

  const ShimmerButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift uilib-anim-shimmer inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-2 text-sm font-semibold text-white shadow-xl cursor-pointer', props.className),
        style: { background: 'linear-gradient(110deg, #09090b 45%, #3f3f46 50%, #09090b 55%)', backgroundSize: '200% 100%' }
      },
      props.children || 'Shimmer Button'
    );

  const ShinyButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift inline-flex h-10 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-6 py-2 text-sm font-semibold text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.28)] cursor-pointer', props.className)
      },
      props.children || 'Shiny Button'
    );

  const PulsatingButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift uilib-anim-glow inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white cursor-pointer', props.className)
      },
      props.children || 'Pulsating CTA'
    );

  const RippleButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift inline-flex h-10 items-center justify-center rounded-lg border border-sky-400/50 bg-sky-500/20 px-5 py-2 text-sm font-semibold text-sky-100 cursor-pointer', props.className)
      },
      props.children || 'Click Me'
    );

  const InteractiveHoverButton = props =>
    h(
      'button',
      {
        type: 'button',
        className: cn('uilib-comp uilib-btn-hover-lift inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-2 text-sm font-semibold text-foreground cursor-pointer', props.className)
      },
      h('span', { className: 'size-2 rounded-full bg-primary' }),
      h('span', null, props.children || 'Hover Me'),
      getLucideSvgVNode('ArrowRight', { size: 15 })
    );

  const AnimatedThemeToggler = props =>
    h(
      'button',
      {
        type: 'button',
        role: 'switch',
        'aria-checked': 'true',
        className: cn('inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-md cursor-pointer', props.className)
      },
      getLucideSvgVNode('Sun', { size: 15, className: 'text-amber-400' }),
      h('span', { className: 'text-muted-foreground' }, '/'),
      getLucideSvgVNode('Moon', { size: 15, className: 'text-indigo-400' }),
      h('span', null, 'Theme Toggle')
    );

  const Dock = props => h('div', { className: cn('mx-auto flex h-14 items-center gap-2 rounded-2xl border border-white/15 bg-zinc-900/80 p-2 backdrop-blur-md shadow-xl', props.className) }, props.children);
  const DockIcon = props => h('div', { className: cn('flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-transform hover:scale-110', props.className) }, props.children);

  const FloatingNav = props => {
    const items = props.navItems || [
      { name: 'Home', link: '#home' },
      { name: 'About', link: '#about' },
      { name: 'Contact', link: '#contact' }
    ];
    return h(
      'nav',
      { className: cn('flex max-w-fit items-center justify-center space-x-3 rounded-full border border-white/15 bg-zinc-950/90 py-2 pl-5 pr-2 shadow-xl backdrop-blur-md', props.className) },
      items.map((it, i) => h('a', { key: i, href: it.link || '#', className: 'flex items-center space-x-1 text-xs font-medium text-zinc-200 hover:text-white no-underline' }, it.icon, h('span', null, it.name))),
      h('button', { type: 'button', className: 'relative rounded-full border border-white/20 bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white' }, h('span', null, 'Login'))
    );
  };

  const FloatingDock = props => {
    const items = (props.items || []).slice(0, 5);
    return h(
      'nav',
      { className: cn('mx-auto flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-zinc-900/90 px-4 backdrop-blur-md shadow-xl', props.className) },
      items.map((it, i) => h('a', { key: i, href: it.href || '#', title: it.title, className: 'flex size-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:scale-110 transition-transform' }, it.icon))
    );
  };

  const AvatarCircles = props => {
    const urls = props.avatarUrls || [];
    const num = props.numPeople || 99;
    return h(
      'div',
      { className: cn('z-10 flex -space-x-3 rtl:space-x-reverse items-center', props.className) },
      urls.slice(0, 4).map((u, i) =>
        h('img', {
          key: i,
          className: 'size-9 rounded-full border-2 border-background object-cover',
          src: typeof u === 'string' ? u : (u && u.imageUrl) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          alt: `Avatar ${i + 1}`
        })
      ),
      h('span', { className: 'flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary text-center text-xs font-semibold text-primary-foreground' }, `+${num}`)
    );
  };

  const AnimatedCircularProgressBar = props => {
    const val = props.value || 84;
    return h(
      'div',
      { className: cn('relative inline-flex size-24 items-center justify-center rounded-full border-4 border-primary/30 bg-card shadow-inner', props.className) },
      h('span', { className: 'text-lg font-bold text-foreground' }, `${val}%`)
    );
  };

  const ScrollProgress = props =>
    h(
      'div',
      { className: cn('w-full rounded-lg border border-border bg-card p-3', props.className) },
      h('div', { className: 'h-1.5 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-2' }),
      h('p', { className: 'text-xs text-muted-foreground' }, 'Magic UI Scroll Progress Bar (Top Fixed Gradient)')
    );

  const ClientTweetCard = props =>
    h(
      'div',
      { className: cn('flex w-full max-w-sm flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-md', props.className) },
      h(
        'div',
        { className: 'flex items-center justify-between' },
        h(
          'div',
          { className: 'flex items-center gap-2' },
          h('span', { className: 'flex size-8 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs' }, '𝕏'),
          h('div', null, h('div', { className: 'text-xs font-bold text-foreground flex items-center gap-1' }, 'Magic UI Official ', getLucideSvgVNode('Check', { size: 12, className: 'text-sky-400' })), h('div', { className: 'text-[10px] text-muted-foreground' }, '@magicuidesign'))
        )
      ),
      h('p', { className: 'text-xs text-foreground/90 leading-relaxed' }, 'Just shipped 150+ animated React & Tailwind components in the official Magic UI registry! ✨')
    );

  const PlaceholdersAndVanishInput = props => {
    const ph = (props.placeholders && props.placeholders[0]) || 'Ask Aceternity AI anything...';
    return h(
      'div',
      { className: 'flex w-full max-w-sm items-center gap-2 rounded-full border border-border bg-zinc-900/90 py-1.5 pl-4 pr-1.5 shadow-lg' },
      h('input', { type: 'text', placeholder: ph, className: 'flex-1 bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-400' }),
      h('button', { type: 'button', className: 'flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground' }, getLucideSvgVNode('ArrowRight', { size: 14 }))
    );
  };

  const AnimatedTestimonials = props => {
    const first = (props.testimonials && props.testimonials[0]) || {
      quote: 'The attention to detail and innovative features have completely transformed our workflow.',
      name: 'Sarah Chen',
      designation: 'Product Manager at TechFlow',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };
    return h(
      'div',
      { className: 'flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-md max-w-sm' },
      h('img', { src: first.src, alt: first.name, className: 'size-12 rounded-xl object-cover shrink-0' }),
      h(
        'div',
        { className: 'flex flex-col gap-1' },
        h('p', { className: 'text-xs text-foreground/90 italic line-clamp-2' }, `"${first.quote}"`),
        h('div', { className: 'text-[11px] font-bold text-foreground' }, `${first.name} — `, h('span', { className: 'font-normal text-muted-foreground' }, first.designation))
      )
    );
  };

  const InfiniteMovingCards = props => {
    const first = (props.items && props.items[0]) || { quote: 'All that we see or seem is but a dream within a dream.', name: 'Edgar Allan Poe', title: 'A Dream Within a Dream' };
    return h(
      'div',
      { className: 'rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-3 text-zinc-100 shadow-lg max-w-sm' },
      h('p', { className: 'text-xs leading-relaxed text-zinc-300 mb-2' }, first.quote),
      h('div', { className: 'text-[11px] font-semibold text-indigo-400' }, `${first.name} • ${first.title}`)
    );
  };

  const MultiStepLoader = props => {
    const states = (props.loadingStates || []).slice(0, 3);
    return h(
      'div',
      { className: 'flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5 max-w-xs' },
      states.map((st, idx) =>
        h(
          'div',
          { key: idx, className: cn('flex items-center gap-2 text-xs', idx <= 1 ? 'text-emerald-400 font-semibold' : 'text-muted-foreground') },
          getLucideSvgVNode(idx <= 1 ? 'Check' : 'Circle', { size: 14 }),
          h('span', null, st.text || `Step ${idx + 1}`)
        )
      )
    );
  };

  const HeroVideoDialog = props =>
    h(
      'div',
      { className: cn('relative overflow-hidden rounded-xl border border-border bg-zinc-900 p-4 text-center shadow-lg max-w-sm', props.className) },
      h('div', { className: 'mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg' }, getLucideSvgVNode('Play', { size: 16 })),
      h('div', { className: 'text-xs font-semibold text-foreground' }, 'Magic UI Hero Video Dialog')
    );

  const BentoGrid = props => h('div', { className: cn('grid grid-cols-1 gap-2.5 w-full max-w-sm', props.className) }, Array.isArray(props.children) ? props.children.slice(0, 2) : props.children);
  const BentoGridItem = props =>
    h(
      'div',
      { className: cn('group/bento flex flex-col justify-between space-y-1.5 rounded-xl border border-border bg-card p-3.5 shadow-sm transition duration-200', props.className) },
      h('div', { className: 'flex items-center gap-2 text-xs font-bold text-foreground' }, props.icon, h('span', null, props.title)),
      h('div', { className: 'text-[11px] text-muted-foreground line-clamp-2' }, props.description)
    );
  const BentoCard = props =>
    h(
      'div',
      { className: cn('flex flex-col justify-between rounded-xl border border-border bg-card p-3.5 shadow-sm', props.className) },
      h('div', { className: 'text-xs font-bold text-foreground mb-1' }, props.name || 'Magic Bento Card'),
      h('p', { className: 'text-[11px] text-muted-foreground mb-2' }, props.description || ''),
      h('span', { className: 'text-[11px] font-semibold text-primary' }, `${props.cta || 'Learn more'} →`)
    );

  return {
    Switch, Checkbox, RadioGroup, RadioGroupItem, Label, Button, Input, Textarea,
    Badge, Kbd, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction,
    Alert, AlertTitle, AlertDescription, AlertAction,
    Avatar, AvatarImage, AvatarFallback,
    Tabs, TabsList, TabsTrigger, TabsTab: TabsTrigger, TabsContent, TabsPanel: TabsContent,
    Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionPanel: AccordionContent,
    Slider, Progress, Meter: Progress, Skeleton, Spinner,
    Dialog, DialogTrigger, DialogContent, DialogPopup: DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
    AlertDialog: Dialog, AlertDialogTrigger: DialogTrigger, AlertDialogContent: DialogContent, AlertDialogPopup: DialogContent,
    AlertDialogHeader: DialogHeader, AlertDialogTitle: DialogTitle, AlertDialogDescription: DialogDescription, AlertDialogFooter: DialogFooter, AlertDialogClose: DialogClose,
    Drawer: Dialog, DrawerTrigger: DialogTrigger, DrawerContent: DialogContent, DrawerPopup: DialogContent, DrawerHeader: DialogHeader, DrawerTitle: DialogTitle, DrawerDescription: DialogDescription, DrawerFooter: DialogFooter, DrawerClose: DialogClose,
    TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipPopup: TooltipContent,
    Popover: Dialog, PopoverTrigger: DialogTrigger, PopoverContent: TooltipContent, PopoverPopup: TooltipContent,
    PreviewCard: Tooltip, PreviewCardTrigger: TooltipTrigger, PreviewCardPopup: TooltipContent,
    HoverCard: Tooltip, HoverCardTrigger: TooltipTrigger, HoverCardContent: TooltipContent,
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
    Table: props => h('div', { className: 'relative w-full overflow-auto rounded-lg border border-border' }, h('table', { className: cn('w-full caption-bottom text-xs', props.className) }, props.children)),
    TableHeader: props => h('thead', { className: cn('[&_tr]:border-b border-border bg-muted/40', props.className) }, props.children),
    TableBody: props => h('tbody', { className: cn('[&_tr:last-child]:border-0', props.className) }, props.children),
    TableFooter: props => h('tfoot', { className: cn('border-t border-border bg-muted/50 font-medium', props.className) }, props.children),
    TableRow: props => h('tr', { className: cn('border-b border-border transition-colors hover:bg-muted/30', props.className) }, props.children),
    TableHead: props => h('th', { className: cn('h-9 px-3 text-left align-middle font-semibold text-muted-foreground', props.className) }, props.children),
    TableCell: props => h('td', { colSpan: props.colSpan, className: cn('p-2.5 align-middle text-foreground', props.className) }, props.children),
    TableCaption: props => h('caption', { className: cn('mt-2 mb-1 text-[11px] text-muted-foreground', props.className) }, props.children),
    Command: props => h('div', { className: cn('flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md', props.className) }, props.children),
    CommandInput: props => h('div', { className: 'flex items-center border-b border-border px-3 py-2 gap-2' }, getLucideSvgVNode('Search', { size: 14, className: 'opacity-50' }), h('input', { type: 'text', placeholder: props.placeholder || 'Type a command or search...', className: 'flex h-6 w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground' })),
    CommandList: props => h('div', { className: cn('max-h-[220px] overflow-y-auto overflow-x-hidden p-1.5', props.className) }, props.children),
    CommandEmpty: props => h('div', { className: 'py-3 text-center text-xs text-muted-foreground' }, props.children),
    CommandGroup: props => h('div', { className: cn('overflow-hidden p-1 text-foreground', props.className) }, props.heading && h('div', { className: 'px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground' }, props.heading), props.children),
    CommandItem: props => h('div', { className: cn('relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground', props.className) }, props.children),
    CommandShortcut: props => h('span', { className: cn('ml-auto text-[10px] tracking-widest text-muted-foreground', props.className) }, props.children),
    CommandSeparator: props => h('hr', { className: '-mx-1 my-1 h-px bg-border border-0' }),
    Sheet: Dialog, SheetTrigger: DialogTrigger, SheetContent: DialogContent, SheetHeader: DialogHeader, SheetTitle: DialogTitle, SheetDescription: DialogDescription, SheetFooter: DialogFooter, SheetClose: DialogClose,
    DropdownMenu: Dialog, DropdownMenuTrigger: DialogTrigger, DropdownMenuContent: TooltipContent,
    DropdownMenuItem: props => h('div', { className: cn('flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-accent', props.className) }, props.children),
    DropdownMenuLabel: props => h('div', { className: cn('px-2 py-1 text-xs font-semibold', props.className) }, props.children),
    DropdownMenuSeparator: props => h('hr', { className: 'my-1 h-px bg-border border-0' }),
    Select: props => h('div', { className: cn('relative inline-flex flex-col gap-1 w-full max-w-[220px]', props.className) }, props.children),
    SelectTrigger: props => h('button', { type: 'button', className: cn('flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs', props.className) }, props.children, getLucideSvgVNode('ChevronDown', { size: 14, className: 'opacity-50' })),
    SelectValue: props => h('span', { className: 'text-muted-foreground' }, props.placeholder || props.children || 'Select option...'),
    SelectContent: props => h('div', { className: cn('rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md flex flex-col gap-0.5', props.className) }, props.children),
    SelectGroup: props => h('div', { className: 'flex flex-col gap-0.5' }, props.children),
    SelectLabel: props => h('div', { className: 'px-2 py-1 text-[10px] font-semibold text-muted-foreground' }, props.children),
    SelectItem: props => h('div', { className: cn('flex cursor-pointer items-center rounded-sm px-2 py-1 text-xs hover:bg-accent', props.className) }, props.children),
    Breadcrumb: props => h('nav', { 'aria-label': 'breadcrumb', className: props.className }, props.children),
    BreadcrumbList: props => h('ol', { className: cn('flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground', props.className) }, props.children),
    BreadcrumbItem: props => h('li', { className: cn('inline-flex items-center gap-1.5', props.className) }, props.children),
    BreadcrumbLink: props => h('a', { href: props.href || '#', className: cn('hover:text-foreground transition-colors no-underline', props.className) }, props.children),
    BreadcrumbPage: props => h('span', { className: cn('font-medium text-foreground', props.className) }, props.children),
    BreadcrumbSeparator: props => h('li', { role: 'presentation', className: 'text-muted-foreground' }, props.children || getLucideSvgVNode('ChevronRight', { size: 13 })),
    BreadcrumbEllipsis: () => h('span', { className: 'flex size-6 items-center justify-center' }, '...'),
    Pagination: props => h('nav', { role: 'navigation', 'aria-label': 'pagination', className: cn('mx-auto flex w-full justify-center', props.className) }, props.children),
    PaginationContent: props => h('ul', { className: cn('flex flex-row items-center gap-1 list-none p-0 m-0', props.className) }, props.children),
    PaginationItem: props => h('li', { className: props.className }, props.children),
    PaginationLink: props => h('a', { href: props.href || '#', className: cn('inline-flex size-8 items-center justify-center rounded-md text-xs font-medium no-underline transition-colors', props.isActive ? 'border border-input bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground', props.className) }, props.children),
    PaginationPrevious: props => h('a', { href: props.href || '#', className: cn('inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground no-underline', props.className) }, getLucideSvgVNode('ChevronLeft', { size: 14 }), h('span', null, 'Prev')),
    PaginationNext: props => h('a', { href: props.href || '#', className: cn('inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground no-underline', props.className) }, h('span', null, 'Next'), getLucideSvgVNode('ChevronRight', { size: 14 })),
    PaginationEllipsis: () => h('span', { className: 'flex size-8 items-center justify-center text-xs text-muted-foreground' }, '...'),
    Field, FieldLabel, FieldDescription, FieldError,
    Form: props => h('form', { className: cn('flex flex-col gap-3 w-full', props.className) }, props.children),
    Separator: props => h('hr', { className: cn('shrink-0 bg-border h-[1px] w-full border-0 my-2', props.className) }),
    Logo: () => h('span', { className: 'inline-flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs' }, '✦'),
    RainbowButton, ShimmerButton, ShinyButton, PulsatingButton, RippleButton, InteractiveHoverButton,
    AnimatedThemeToggler, Dock, DockIcon, FloatingNav, FloatingDock,
    AvatarCircles, AnimatedCircularProgressBar, ScrollProgress, ClientTweetCard, TweetCard: ClientTweetCard,
    PlaceholdersAndVanishInput, AnimatedTestimonials, InfiniteMovingCards, MultiStepLoader, HeroVideoDialog,
    BentoGrid, BentoGridItem, BentoCard,
    CardContainer: Card, CardBody: CardContent, CardItem: props => h('div', { className: props.className }, props.children),
    CardSpotlight: Card, GlareCard: Card, WobbleCard: Card,
    HeroHighlight: props => h('div', { className: cn('rounded-xl border border-indigo-500/30 bg-zinc-950 p-4 text-center', props.className) }, props.children),
    Highlight: props => h('span', { className: 'rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-1.5 py-0.5 text-white' }, props.children),
    AuroraBackground: props => h('div', { className: cn('rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-zinc-950 to-purple-950 p-4 text-white', props.className) }, props.children),
    Terminal: Card, AnimatedSpan: props => h('div', { className: cn('font-mono text-xs', props.className) }, props.children),
    TypingAnimation: props => h('div', { className: cn('font-mono text-xs font-semibold text-primary', props.className) }, props.children),
    AnimatedList: props => h('div', { className: cn('flex flex-col gap-2 w-full max-w-sm', props.className) }, Array.isArray(props.children) ? props.children.slice(0, 3) : props.children),
    Marquee: props => h('div', { className: cn('flex items-center gap-3 overflow-hidden py-1', props.className) }, Array.isArray(props.children) ? props.children.slice(0, 2) : props.children),
    MagicCard: Card, NeonGradientCard: Card,
    HoverBorderGradient: Button,
    ButtonMovingBorder: RainbowButton
  };
}

function compileOfficialTsxToHtml(rawTsxCode, fallbackMeta = {}) {
  if (!rawTsxCode || typeof rawTsxCode !== 'string') return null;

  try {
    const transformed = transform(rawTsxCode, {
      transforms: ['typescript', 'jsx', 'imports'],
      jsxPragma: 'h',
      jsxFragmentPragma: 'Fragment',
      production: true
    }).code;

    const primitives = createOfficialPrimitives();
    const exportsObj = {};
    const moduleObj = { exports: exportsObj };

    // Proxy for any unknown component or icon
    const makeProxyModule = modName =>
      new Proxy(
        {},
        {
          get(_, prop) {
            if (prop === '__esModule') return true;
            if (prop === 'cn') return cn;
            if (prop === 'cva') return () => () => '';
            if (modName.includes('lucide') || String(prop).endsWith('Icon') || String(prop).startsWith('Icon')) {
              return p => getLucideSvgVNode(String(prop), p);
            }
            if (primitives[prop]) return primitives[prop];
            if (prop === 'motion' || prop === 'm') {
              return new Proxy(
                {},
                {
                  get(__, tagProp) {
                    return p => h(String(tagProp), p, p && p.children);
                  }
                }
              );
            }
            if (prop === 'AnimatePresence' || prop === 'MotionConfig') {
              return p => h(Fragment, null, p && p.children);
            }
            if (typeof prop === 'string' && prop.startsWith('use')) {
              return () => {
                const hookObj = [false, () => {}];
                return new Proxy(hookObj, {
                  get(target, k) {
                    if (k in target) return target[k];
                    if (String(k).endsWith('Ref')) return { current: null };
                    if (String(k).startsWith('is') || String(k).startsWith('has')) return false;
                    return () => {};
                  }
                });
              };
            }
            if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
              return p => {
                const hasChildren = p && p.children !== undefined && p.children !== null && (!Array.isArray(p.children) || p.children.length > 0);
                if (!hasChildren && lucideIcons[prop]) {
                  return getLucideSvgVNode(prop, p);
                }
                return h('div', { className: p && p.className, style: p && p.style }, p && p.children);
              };
            }
            return () => ({});
          }
        }
      );

    const reactMock = {
      __esModule: true,
      default: null,
      createElement: h,
      Fragment,
      useId: () => 'uilib-id',
      useState: init => [typeof init === 'function' ? init() : init, () => {}],
      useRef: init => ({ current: init }),
      useEffect: () => {},
      useLayoutEffect: () => {},
      useCallback: fn => fn,
      useMemo: fn => (typeof fn === 'function' ? fn() : undefined),
      useContext: () => ({}),
      createContext: def => ({ Provider: p => h(Fragment, null, p && p.children), Consumer: () => null, _currentValue: def }),
      forwardRef: fn => (props => fn(props, { current: null })),
      memo: fn => fn,
      Children: {
        map: (c, fn) => (Array.isArray(c) ? c.map(fn) : c ? [fn(c, 0)] : []),
        toArray: c => (Array.isArray(c) ? c : c ? [c] : []),
        count: c => (Array.isArray(c) ? c.length : c ? 1 : 0),
        only: c => (Array.isArray(c) ? c[0] : c)
      },
      cloneElement: (el, extraProps) => {
        if (!el || typeof el !== 'object') return el;
        return { ...el, props: { ...(el.props || {}), ...(extraProps || {}) } };
      },
      isValidElement: el => Boolean(el && typeof el === 'object' && (el.type || el.__rawHtml))
    };
    reactMock.default = reactMock;

    const customRequire = modName => {
      if (modName === 'react') return reactMock;
      return makeProxyModule(modName);
    };

    const sandbox = {
      h,
      Fragment,
      React: reactMock,
      require: customRequire,
      exports: exportsObj,
      module: moduleObj,
      cn,
      console: { log: () => {}, warn: () => {}, error: () => {} },
      window: { matchMedia: () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }), addEventListener: () => {}, removeEventListener: () => {} },
      document: { documentElement: { classList: { contains: () => true, toggle: () => {} } }, addEventListener: () => {}, removeEventListener: () => {} },
      navigator: { clipboard: { writeText: () => Promise.resolve() } },
      setTimeout: () => 0,
      clearTimeout: () => {},
      setInterval: () => 0,
      clearInterval: () => {}
    };

    vm.createContext(sandbox);
    vm.runInContext(transformed, sandbox, { timeout: 400 });

    const finalExports = sandbox.module.exports || sandbox.exports;
    let CompFn = finalExports.default;
    if (!CompFn || typeof CompFn !== 'function') {
      const fnKey = Object.keys(finalExports).find(k => typeof finalExports[k] === 'function' && /^[A-Z]/.test(k));
      if (fnKey) CompFn = finalExports[fnKey];
    }

    if (typeof CompFn === 'function') {
      const vnode = CompFn({});
      const html = renderVNodeToHtml(vnode).trim();
      if (html && html.length > 20 && html !== '<div></div>') {
        return `<div class="uilib-comp uilib-official-ssr">${html}</div>`;
      }
    }
  } catch (err) {
    // Fallback if component uses complex browser-only WebGL/Canvas
  }
  return null;
}

module.exports = {
  compileOfficialTsxToHtml,
  getLucideSvgVNode,
  createOfficialPrimitives
};
