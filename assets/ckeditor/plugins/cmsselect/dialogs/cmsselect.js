var _editor;
var _nametagselect = "ck-cms-attachment-2323";
CKEDITOR.dialog.add('cmsselectDialog', function (editor) {
    _editor = editor;
    _nametagselect = 'ck-cms-attachment-' + cmsselectCreateUUID().substring(0, 5);
    _editor.addCommand('cmsselectDialog', {
        exec: function (sender) {
            alert(1);
        }
    });
    // return {
    //     title: 'Chèn hình cho nội dung',
    //     minWidth: 50,
    //     minHeight: 50,
    //     contents: [
    //         {
    //             id: 'tab-cmsselect',
    //             label: 'Thông tin của ảnh',
    //             elements: [
    //                 {
    //                     type: 'html',
    //                     html: `<div style="opacity: 0">
    //                             <style type="text/css">.`+ _nametagselect + `{ font-size:13px; }#CKFileCMSSelect{max-width:500px;}  .` + _nametagselect + ` a{ color:#0E5777; font-weight:bold; }  .` + _nametagselect + `-file li { background-color: #E1EFF6; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; cursor: pointer; display: inline-block; margin: 2px; padding: 2px 5px; }  .` + _nametagselect + `-file{ max-height:80px; list-style:none; overflow:auto; padding-left:0; }  .` + _nametagselect + `-file li:hover{ background-color: #90cfee; }  .` + _nametagselect + `-file .remove{ font-weight:bold;     font-size: 30px;}  .` + _nametagselect + `-file .remove:hover{ color:#0d3245; font-weight:bold;cursor: pointer;    color: red;}  .` + _nametagselect + ` .input-file-attach{ position:absolute; top:-9999px; }</style>
    //                             <div id="CKFileCMSSelect" class="`+ _nametagselect + `">
    //                             <input type="file" name="file" class="input-file-attach" multiple="multiple" onChange="cmsselectactionChange(this)">
    //                             </div>
    //                         </div>`
    //                 }
    //             ]
    //         }
    //     ],
    //     onLoad: function () {
    //         var el = `#CKFileCMSSelect.${_nametagselect} .input-file-attach`;
    //         $(el).click();

    //     },
    //     // onOk: function () {
    //     //     var dialog = this;
    //     //     $("ul." + _nametagselect + "-file img").each(function () {
    //     //         var imgHtml = CKEDITOR.dom.element.createFromHtml(
    //     //             "<img style='width: 100%' src='" + $(this)[0].src + "' " + " data-cke-saved-src='" + $(this)[0].src + "' alt=''/>"
    //     //         );
    //     //         editor.insertElement(imgHtml);
    //     //     });
    //     //     $('.' + _nametagselect + '-file').html('');
    //     // }
    // };
});

$("body").on("click", "." + _nametagselect + "-file .remove", function () {
    $(this).parent().remove();
});

function cmsselectactionclick(event) {
    //event.cancel();
    //event.stop();
    var el = `#CKFileCMSSelect.${_nametagselect} .input-file-attach`;
    $(el).click();
};

function cmsselectactionChange() {
    var formData = new FormData();
    var el = `#CKFileCMSSelect.${_nametagselect} .input-file-attach`;
    var arrFile = $(el).prop("files");
    for (var i = 0; i < arrFile.length; i++) {
        formData.append('formFiles', $(el).prop("files")[i]);
    }
    var hostname = location.hostname;
    $.getJSON(hostname === 'localhost' ? "_config/config.dev.json" : "_config/config.deploy.json", function (config) {
        // subcrible
        $.ajax({
            url: config.apiServer + "/api/v1/CMS/FileQuanLyFile/UploadFile",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                var dialog = this;
                if (res) {
                    var ketqua = res;
                    for (var i = 0; i < ketqua.length; i++) {
                        // var liUID = cmsselectCreateUUID();
                        // $('.' + _nametagselect + '-file').append('<li class="' + liUID + '"> <img src="' + config.resourceUrl + ketqua[i].path + '" alt="' + ketqua[i].name + '" style="height:150px;" /> <span class="remove" onClick=cmsselectRemove("' + liUID + '")>&times;</span><input type="hidden" name="CKFileCMSSelect" value="' + ketqua[i].id + '" /></li>');

                        
                        var imgHtml = CKEDITOR.dom.element.createFromHtml(
                            "<img style='width: 100%' src='" + config.resourceUrl + ketqua[i].path + "' " + " data-cke-saved-src='" + config.resourceUrl + ketqua[i].path + "' alt=''/>"
                        );
                        _editor.insertElement(imgHtml);
                        $('.' + _nametagselect + '-file').html('');
                        $('body .cke_dialog_ui_button_cancel').click();
                        // _editor.onOk();
                    }

                    // var dialog = this;
                    // $("ul." + _nametagselect + "-file img").each(function () {
                    //     var imgHtml = CKEDITOR.dom.element.createFromHtml(
                    //         "<img style='width: 100%' src='" + $(this)[0].src + "' " + " data-cke-saved-src='" + $(this)[0].src + "' alt=''/>"
                    //     );
                    //     editor.insertElement(imgHtml);
                    // });
                    // $('.' + _nametagselect + '-file').html('');
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

function cmsselectCreateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function cmsselectRemove(tag) {
    $("ul." + _nametagselect + "-file li." + tag).remove();
}
