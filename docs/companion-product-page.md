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
  static/css/companion-product.css static/js/companion-theme.js \
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

产品详情的独立模板原先只跟随 `prefers-color-scheme`，导致忽略博客手动深色选择。现在由 `static/js/companion-theme.js` 在绘制前读取同源 `localStorage.theme`，沿用 LoveIt 的 light / dark 值；没有手动选择时使用站点默认设置和系统偏好。详情页提供切换按钮，并响应其它标签页的主题变化。禁用存储时保留当前页切换能力。中文、英文、目录和博客共用同一偏好；预览时 `localhost` 和 `127.0.0.1` 是不同 origin，请全程使用同一种主机名。

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
