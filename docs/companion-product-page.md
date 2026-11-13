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
git add content/products/_index.md layouts/products/list.html static/css/products-directory.css content/products/deepseek-companion/index.md content/products/deepseek-companion/float.png layouts/products/single.html static/css/companion-product.css docs/companion-product-page.md config.toml
git commit -m "feat(site): introduce Companion product page / 新增 Companion 产品介绍页"
git push origin master
```

在 Actions 中等待 Deploy Hugo site to Pages 成功，再打开正式页面。线上确认后，可将 Companion 仓库 About 的 Website 改为上述产品地址，不勾选自动使用项目 Pages；市场索引继续使用 `/dsh-deepseek-companion/index.json`，不要改成介绍页。

当前只是独立产品页，博客首页及主题保持原有布局。未来新产品可以复用模板，但当前文案中的 Companion 固定文字需一并参数化。
