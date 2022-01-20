const el = document.documentElement;
const primaryColor =
  getComputedStyle(el).getPropertyValue('--el-color-primary');
export type RenderSetting = {
  headerRender?: false;
  footerRender?: boolean;
  menuRender?: false;
  menuHeaderRender?: false;
};
export type PureSettings = {
  layout: 'side' | 'top' | 'mix';
  navMode?: 'vertical' | 'horizontal';
  navTheme?: 'light' | 'dark';
  navBgColor?: string;
  fixAside?: boolean;
  fixedHeader?: boolean;
  headerHeight?: number;
  minAsideWidth?: number;
  asideWidth?: number;
  primaryColor?: string;
  defaultCollapsed?: boolean;
  menu?: {
    locale?: boolean;
    default?: string;
  };
  themeList?: { name: string; color: string }[];
};

export type ProSettings = PureSettings & RenderSetting;
/** 默认配置项 */
const defaultSettings: ProSettings = {
  /** 菜单布局 */
  layout: 'mix',
  /** 菜单方向 */
  navMode: 'vertical',
  navTheme: 'light',
  navBgColor: '#001529',
  /** 最小侧边栏宽度 */
  minAsideWidth: 48,
  /** 侧边栏展开宽度 */
  asideWidth: 200,
  /** 导航栏头部高度 */
  headerHeight: 48,
  /** 默认主题色 */
  primaryColor: primaryColor,
  /** 头部是否固定 */
  fixedHeader: true,
  /** 侧边栏是否固定 */
  fixAside: true,
  /** 默认是否展开侧边栏 */
  defaultCollapsed: false,
  menu: {
    /** 默认是否显示国际化按钮 */
    locale: true,
    /** 默认语言 en-US/zh-CN */
    default: 'zh-CN',
  },
  themeList: [
    {
      name: '拂晓蓝（默认）',
      color: primaryColor,
    },
    {
      name: '薄暮',
      color: '#f5222d',
    },
    {
      name: '火山',
      color: '#fa541c',
    },
    {
      name: '日暮',
      color: '#faad14',
    },
    {
      name: '明青',
      color: '#13c2c2',
    },
    {
      name: '极光绿',
      color: '#52c41a',
    },
    {
      name: '极客蓝',
      color: '#2f54eb',
    },
    {
      name: '酱紫',
      color: '#722ed1',
    },
  ],
  footerRender: true,
};

export default defaultSettings;
