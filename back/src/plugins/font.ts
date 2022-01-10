import { Plugin,WebpackHookParams,CompilerType } from '@fmfe/genesis-core';
// @font-face{font-family:element-icons;src:url(fonts/element-icons.woff) format("woff"),url(fonts/element-icons.ttf) format("truetype");font-weight:400;font-display:"auto";font-style:normal}
export class FontPlugin55 extends Plugin {
    public beforeCompiler(type: CompilerType) {
    
    }
    /**
   * 编译完成之后执行
   */
    public afterCompiler(type: CompilerType) {
        console.log('编译完成之后执行');
    }
    public chainWebpack({ config }: WebpackHookParams) {
        config.module
        .rule('font2')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        // .include.add(this.ssr.srcIncludes)
        // .end()
        .use('file')
        .loader('file-loader')
        // .options({
        //     esModule: false,
        //     name: this.ssr.isProd
        //         ? 'fonts/[name].[contenthash:8].[ext]'
        //         : 'fonts/[path][name].[ext]'
        // });
    }
}
