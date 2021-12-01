/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.plugins.addExternal('ckeditor_wiris', '../ckeditor/wiris/mathtype-ckeditor4/plugin.js');
CKEDITOR.editorConfig = function (config) {
    config.language = 'vi';
    config.skin = 'office2013';
    // config.extraPlugins = 'eqneditor';
    config.toolbarGroups = [
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'insert', groups: ['blocks'] },
        { name: 'others' },
        { name: 'tools' },
    ];

    config.removeButtons = 'Save,NewPage,Preview,Print,Image,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Blockquote,CreateDiv';
    config.removePlugins = 'flashupload,basket';
    config.allowedContent = true;
    config.protectedSource.push(/<i[^>]*><\/i>/g);
};
