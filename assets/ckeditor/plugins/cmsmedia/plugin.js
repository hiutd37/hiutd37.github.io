CKEDITOR.plugins.add('cmsmedia', {
    icons: 'cmsmedia',
    init: function (editor) {
        editor.addCommand('cmsmedia', new CKEDITOR.dialogCommand('cmsmediaDialog'));
        editor.ui.addButton('cmsmedia', {
            label: 'Chọn ảnh',
            command: 'cmsmedia',
            toolbar: 'insert',
            icon: this.path + 'images/cmsmedia.png'
        });
        CKEDITOR.dialog.add('cmsmediaDialog', this.path + 'dialogs/cmsmedia.js');
    }
});
