# Companion 产品页维护

统一目录：`https://mycherish.github.io/products/`。博客导航使用“产品”，不为每个产品新增顶级菜单。

产品地址：`https://mycherish.github.io/products/deepseek-companion/`。

- 文案、功能和 FAQ：`content/products/deepseek-companion/index.md`。
- 真实发布验收截图：同目录 `float.png`，不包含私人对话或认证内容。
- 独立页面模板：`layouts/products/single.html`（兼容仓库固定 Hugo 0.136.4）。
- 页面样式：`static/css/companion-product.css`，仅产品模板加载，不影响 LoveIt 博客。
- 当前不改变 GitHub 仓库 Website、市场索引或 npm 元数据，也不自动发布。

## 新增产品

在 `content/products/<产品名>/index.md` 添加已准备好的产品内容。目录自动读取本栏目页面，按 `weight` 排序；可配置 `title`、`summary`、`version`、`platformSummary`，无须修改导航或手工添加卡片。未准备完成的页面使用 `draft: true`，不在正式构建中展示。当前详情模板针对 Companion，新产品需选择适合自己的详情模板，不能直接套用固定功能文案。目录布局为 `layouts/products/list.html`，样式为 `static/css/products-directory.css`。

## 本地调试

需要 Hugo Extended 0.136.4，与 Actions 一致。从站点仓库根目录运行：

```sh
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

打开 `http://127.0.0.1:1313/products/deepseek-companion/`，编辑 Markdown 或样式后自动刷新。Ctrl+C 停止。

## 构建和发布

```sh
hugo --minify
```

输出在 Git 忽略的 `public/`，不要单独提交构建结果。本地先核对桌面和手机布局、安装命令、外部链接与支持范围。

确认后在 `master` 提交明确文件并推送，现有 GitHub Actions 自动发布：

```sh
git status
git diff --check
git add config.toml content/_index.en.md \
  content/products/_index.en.md content/products/deepseek-companion/index.en.md \
  i18n/en.toml i18n/zh-CN.toml \
  layouts/products/list.html layouts/products/single.html \
  static/css/companion-product.css static/js/site-preferences.js \
  tests/product-theme.test.cjs docs/companion-product-page.md
git commit -m "feat(site): localize product pages and share theme preference / 补齐英文产品页与主题同步"
git push origin master
```

在 Actions 中等待 Deploy Hugo site to Pages 成功，再打开正式页面。线上确认后，可将 Companion 仓库 About 的 Website 改为上述产品地址，不勾选自动使用项目 Pages；市场索引继续使用 `/dsh-deepseek-companion/index.json`，不要改成介绍页。

当前只是独立产品页，博客首页及主题保持原有布局。未来新产品可以复用模板，但当前文案中的 Companion 固定文字需一并参数化。

## 精选英文内容与主题（2026-11-13）

中文继续为默认语言，历史博客文章无需逐篇翻译。英文仅维护首页、产品目录和精选产品介绍：

- `content/_index.en.md`：英文首页。
- `content/products/_index.en.md`：英文产品目录。
- `content/products/deepseek-companion/index.en.md`：英文产品介绍。
- 同路径无语言后缀的文件仍为默认中文；两种语言共享模板、CSS 和 `float.png`，不复制图片。
- 固定界面文字位于 `i18n/en.toml` 和 `i18n/zh-CN.toml`。新增英文内容时使用相同 basename 的 `.en.md`；没有英文正文的文章不生成伪译文。
- 英文导航只展示 Home、Products、GitHub；英文搜索暂时关闭，不保留主题的示例 Algolia 配置；英文资料不保留占位社交账号或失效头像。
- 产品详情通过 `.Translations` 展示实际存在的译文，博客与目录沿用 LoveIt 的译文选择；只有一份正文时不会出现不存在的对应页。

产品详情的独立模板原先只跟随 `prefers-color-scheme`，导致忽略博客手动深色选择。现在由 `static/js/site-preferences.js` 在绘制前读取同源 `localStorage.theme`，沿用 LoveIt 的 light / dark 值；没有手动选择时使用站点默认设置和系统偏好。详情页提供切换按钮，并响应其它标签页的主题变化。禁用存储时保留当前页切换能力。中文、英文、目录和博客共用同一偏好；预览时 `localhost` 和 `127.0.0.1` 是不同 origin，请全程使用同一种主机名。

本轮预览地址：`/en/`、`/en/products/`、`/en/products/deepseek-companion/`。本地重启 Hugo 后检查。首次产品页提交为 `2aa1073`，按用户要求仅本地提交、未推送；本轮多语言和主题修复留待 Review，不自动提交。

检查命令（Hugo Extended 0.136.4）：

```sh
hugo --minify
node --test tests/product-theme.test.cjs
git diff --check
```

主题回归需覆盖：系统浅色 + 博客手动深色、系统深色 + 手动浅色、无手动选择时跟随系统、语言切换及往返博客、不同标签页同步、存储被禁用。测试仅验证网站展示，不代表插件在新的宿主版本完成验收。

### 本轮验证结果

Hugo Extended 0.136.4 整站构建通过，格式、JS lint / 语法、TOML 与翻译 key 完整性、`git diff --check` 通过，主题单测 7/7。基线实际复现“系统浅色 + 博客手动深色 → 产品变浅色”，修复后同条件通过。隔离 Playwright 在 1440px / 390px 验证英文首页有效菜单、产品目录 / 详情、双向译文、安装跳转、FAQ、共享截图、无横向溢出与本地资源错误；另验证博客真实切换主题往返、跨标签页同步、系统变化、减少动态效果与禁用存储。未修改 LoveIt 主题源码，未重跑插件聊天验收，未推送或部署。回归截图和临时驱动只保存在本机临时目录。

## 统一外观与语言控件

当前博客首页、文章、目录与产品详情共用 `layouts/partials/site-controls.html`、`site-icon.html`、`site-preferences-assets.html` 和 `static/css/site-controls.css`。博客页头及基础模板通过站点级 `layouts/partials/header.html` / `layouts/_default/baseof.html` 覆盖，LoveIt 主题源码未修改；升级 LoveIt 时需比较这两个覆盖文件与上游差异。

主题菜单提供浅色、深色、跟随系统，以 `localStorage.theme` 的 light / dark / auto 保存。无选择时使用站点默认；每次同时更新根节点 data-theme 与 LoveIt body theme。旧页面专用脚本已删除，旧 theme-switch 按钮已移除，不同时运行两套切换逻辑。跨标签页、存储禁用、键盘 Tab / Enter / Escape、外部点击关闭及焦点返回均为验证项。原 7 项主题断言已迁移并扩充为 9 项。

语言菜单显示当前语言简称，只列真实存在的 `.AllTranslations`，没有译文的文章不显示语言菜单。采用原生 details / summary 和普通按钮、链接，不冒充需要额外方向键协议的 ARIA menu。图标为共享内联 SVG，默认透明、悬停浅底、焦点可见；手机点击目标至少 44px，减少动态效果时关闭控件过渡。

英文与主题同步已于 `7681484` 本地提交；本节控件统一为后续未提交改动，不自动推送。较早命令块是上一轮文件清单，本轮提交前以 `git status` 为准，并纳入新 partial、baseof、site-controls.css 和 site-preferences.js，以及旧 companion-theme.js 的删除。

### 统一控件验证

Hugo 0.136.4 整站构建、格式、JS lint、9 项主题回归与差异检查通过。使用已有 Playwright（无独立 Browser 插件）在 1440px / 390px 验证中英首页、目录、详情共 12 条路径：三档主题、系统偏好变化、选中态、语言面板、Escape 关闭与焦点返回、外部点击、无横向溢出；无译文文章隐藏语言菜单。跨页 / 跨标签页保存与减少动态效果通过。真实浏览器发现并修复英文手机页导航换行时的面板越界，修复后完整重跑。控件仅增加悬停底色过渡，尚未实施整站排版或动画重设计。

后续 UI Review 优先级：清理中文导航的无效 404 入口；提高文章副文本和引用文字对比度；统一页头、内容宽度与基础字体层级；适度压缩首页个人资料区、改善产品截图可见性；再考虑菜单 / 卡片的短时反馈，避免让正文依赖滚动动画显示。整体重设计需先确认方案。

### 首页真实鼠标失效修复

用户复验发现首页控件不能用。实际 localhost 开发服务复现并定位：LoveIt 桌面 `.menu` 的 `overflow: hidden` 裁剪下拉；`elementFromPoint` 命中下方正文而非菜单项。之前 Playwright locator.click 自动滚动隐藏容器，掩盖了此问题。现在仅在共用菜单展开时解除桌面容器裁剪，用 flow-root 保持浮动包含，正常搜索布局保留。

新增 `tests/site-controls.browser.cjs`，在真实点击前检查菜单项中心命中并用 page.mouse 点击，不允许自动滚动绕过裁剪。启动本地 Hugo 后，用已安装 Playwright 运行：

```sh
# 已在站点环境提供 playwright 时
node --test tests/site-controls.browser.cjs
# 或通过 PLAYWRIGHT_MODULE 指定现有 playwright 模块路径，无需修改站点依赖
PLAYWRIGHT_MODULE=/path/to/playwright node --test tests/site-controls.browser.cjs
```

默认检查 http://localhost:1313，可用 SITE_BASE_URL 更换。真实 localhost 的 1440px / 390px 中英文首页、目录、详情共 12 条路径验证主题三档与语言实际跳转。此浏览器回归不等于插件聊天测试；本轮没有提交、推送或部署。

### 英文首页介绍重叠修复

LoveIt 的无文章首页默认对 `.home-profile` 使用 `translateY(16vh)`，资料区有视觉位移却不增加文档流占位，覆盖新增 Markdown 正文。修复前在 1440×900、1440×1400、390×844 均复现。站点级 `layouts/index.html` 为有正文且关闭文章列表的首页添加 `data-home=content`，由仅首页加载的 `static/css/site-home.css` 取消位移、恢复上下排列并限制正文阅读宽度；中文文章首页不使用此模式，主题源码未修改。升级主题时也需比较 index.html 覆盖。

`tests/home-layout.browser.cjs` 验证资料区边界不覆盖正文及产品入口正常跳转。三种尺寸修复后通过；与统一控件共 17 项浏览器测试通过，主题单测 9 项通过。修复后桌面、手机截图已目视检查，未提交或推送。1313 当时未运行，验收使用独立 127.0.0.1:1314 构建预览。

## 轻量 UI 收口（设计图确认后）

按用户确认的并排设计图实施，不使用生成图里的虚构头像、文章、日期或对话。保留真实头像源、真实文章排序和分页、实际发布截图；只给已有 Orbis 文章添加本仓库已有截图的 preview 元数据。中文无效 404 菜单移除；安装步骤与支持版本不改。

- `static/css/site-ui.css` 为共用字体、背景、正文 / 副文本、强调色与页头规则；产品样式和目录样式引用相同颜色基础。
- `layouts/partials/home-intro.html` / `home-entry.html` 负责紧凑个人资料和真实文章摘要，保留原文链接和分页；不重写文章正文。
- 首页恢复固定页头占位，资料区横排；手机缩略图不挤占摘要宽度。产品首屏收紧，真实截图前移，不添加玻璃模糊、渐变或动画依赖。
- 悬停仅使用短时底色反馈，移除标题脉冲和按钮位移；减少动态效果设置继续生效。

Hugo 0.136.4 构建、格式、JS lint 与差异检查通过；浏览器测试 20/20、主题测试 9/9。1440px / 390px 检查中英文首页 / 产品、目录和文章，无横向溢出或页面脚本错误；新回归覆盖固定页头不挡内容、手机摘要宽度、文字与主按钮对比度、文章可达及产品截图可见性。截图和临时驱动保留在本机临时目录，浏览器插件不可用，使用已有隔离 Playwright。未提交 / 推送 / 部署，不涉及插件代码或 npm 包。

```sh
# 先运行 Hugo 本地服务；复用环境中已有 Playwright，不新增站点依赖
PLAYWRIGHT_MODULE=/path/to/playwright node --test tests/home-layout.browser.cjs tests/site-controls.browser.cjs tests/site-ui.browser.cjs
node --test tests/product-theme.test.cjs
```

默认测试地址 http://localhost:1313；可用 SITE_BASE_URL 指定其它本机预览。旧头像和部分历史缩略图继续沿用原外部图源，网络可用性不属于新增保证。

## 保留 LoveIt 的质感细化

Blowfish 对照仅在临时目录试用；用户决定保留 LoveIt，并确认第二版设计图。本轮不换主题或 Hugo 版本，不引入依赖，不改主题源码。

在已提交 UI 基础上：文章标题 22px、摘要 16px 并限制行宽，桌面辅助缩略图收至132×92；日期单独使用保持可读的次级色。产品主标题上限48px，动作与兼容提示在宽屏同行、手机自然上下排列；减小首屏留白和图片装饰，真实截图前移。功能内容仍保留全部4项，安装正文 / 版本范围 / 首登入口边界不删；未使用示意图的虚构素材。

Hugo 0.136.4 构建、格式、lint、git diff --check 通过；已有20项浏览器回归、9项主题回归通过。另外1440px / 390px / 375px 检查中英文首页、目录与产品页，无横向溢出和页面脚本错误，深浅色和减少动态效果已检查。桌面截图起始约446px（上一版本约572px），手机约568px。真实鼠标语言/主题菜单与首页不重叠回归保留。本轮未提交、未推送。
