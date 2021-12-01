var _editor;
CKEDITOR.plugins.add('cmsselect', {
    icons: 'cmsselect',
    init: function (editor) {
        _editor = editor;
        // editor.addCommand('cmsselect', new CKEDITOR.dialogCommand('cmsselectDialog'));
        editor.ui.addButton('cmsselect', {
            label: 'Chọn ảnh',
            command: 'cmsselectDialog',
            toolbar: 'insert',
            icon: this.path + 'images/cmsselect.png'
        });
        // CKEDITOR.dialog.add('cmsselectDialog', this.path + 'dialogs/cmsselect.js');
        editor.addCommand('cmsselectDialog', {
            exec: function () {
                // hiddenUploadElement is not attached to DOM, but it is still possible to `virtually` click into it.
                var hiddenUploadElement = CKEDITOR.dom.element.createFromHtml('<input type="file" accept="image/*" multiple="multiple">');
                hiddenUploadElement.once('change', function (evt) {
                    var targetElement = evt.data.getTarget();
                    if (targetElement.$.files.length) {
                        // Simulate paste event, to support all nice stuff from imagebase (e.g. loaders) (#1730).
                        editor.fire( 'paste', {
                        	method: 'paste',
                        	dataValue: '',
                        	dataTransfer: new CKEDITOR.plugins.clipboard.dataTransfer( { files: targetElement.$.files } )
                        } );
                        cmsselectactionChange(targetElement.$.files);
                    }
                });
                hiddenUploadElement.$.click();
            }
        });
    }
});

function cmsselectactionChange(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('formFiles', files[i]);
    }
    var hostname = location.hostname;
    $.getJSON(hostname === 'localhost' ? "_config/config.dev.json" : "_config/config.deploy.json", function (config) {
        // subcrible
        let userToken = JSON.parse(localStorage.getItem('jwt-token'));
        $.ajax({
            url: config.apiServer + "/api/v1/CMS/FileQuanLyFile/UploadFile",
            headers: { 'Authorization': 'Bearer '+  userToken.accessToken},
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res) {
                    var ketqua = res.result?.files;
                    for (var i = 0; i < ketqua.length; i++) {
                        var data = {
                            align: "none",
                            alt: "",
                            classes: null,
                            hasCaption: false,
                            height: "",
                            lock: true,
                            src: config.resourceUrl + ketqua[i].path,
                            width: "100%",
                        }
                        var imgHtml = CKEDITOR.dom.element.createFromHtml(
                            `<img src="${config.resourceUrl + ketqua[i].path}" />`
                        );
                        _editor.insertElement(imgHtml);
                    }
                } else {
                    alert(res.message);
                }
            },
            async: true,
            beforeSend: function () {
                try { kendo.ui.progress($("#CKFileCMSSelect"), true); } catch (exx) { }
            },
            complete: function () {
                try { kendo.ui.progress($("#CKFileCMSSelect"), false); } catch (exx) { }
            }
        });
    });

};
