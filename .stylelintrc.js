module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss'
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    // ::before, ::afterのコロンを2つにする
    'selector-pseudo-element-colon-notation': 'double',
    // クラス名でアンパサンド（&）は禁止（&:hoverなどはOK）
    'scss/selector-no-union-class-name': true,
    /** 他のプロパティによって無視される可能性がある場合に警告 */
    'plugin/declaration-block-no-ignored-properties': true
  },
  ignoreFiles: ['**/node_modules/**']
}
