var _editor;
CKEDITOR.dialog.add('cmsmediaDialog', function (editor) {
    _editor = editor;
    return {
        title: 'Chọn ảnh từ thư viện',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-cmsmedia',
                label: 'Thông tin của ảnh',
                elements: [
                    {
                        type: 'html',
                        html: ' <table style="width:100%;min-width:400px"> <tr> <td> <table style="width:100%"> <tr> <td class="cke_dialog_ui_vbox_child" colspan="2"><label>URL</label></td></tr><tr> <td class="cke_dialog_ui_vbox_child"> <input id="cmsmedia-url" name="cmsmedia-url" style="width:100%;" class="cke_dialog_ui_input_text" type="text"/> </td><td class="cke_dialog_ui_vbox_child" style="width:90px;text-align:right"> <input class="cke_dialog_ui_button" id="btn-cmsmedia-browse" name="btn-cmsmedia-browse" type="button" value="Duyệt hình" style="background-color: #15B595; color: #fff; padding: 4px 10px; cursor: pointer; border-radius: 2px;" onClick="showPopupcmsmedia();"/> </td></tr><tr> <td class="cke_dialog_ui_vbox_child" colspan="2"><label>Mô tả ảnh</label></td></tr><tr> <td class="cke_dialog_ui_vbox_child" colspan="2"> <input class="cke_dialog_ui_input_text" id="cmsmedia-mota" name="cmsmedia-mota" style="width:100%" type="text"/> </td></tr></table> </td></tr><tr> <td> <table style="width:100%"> <tr> <td class="cke_dialog_ui_vbox_child" valign="top" style="width:90px"> <div>Chiều rộng</div><input class="cke_dialog_ui_input_text" id="cmsmedia-width" name="cmsmedia-width" style="width:70px" type="text"/> <br/><br/> <div>Chiều cao</div><input class="cke_dialog_ui_input_text" id="cmsmedia-height" name="cmsmedia-height" style="width:70px" type="text"/> </td><td class="cke_dialog_ui_vbox_child"> <div>Xem trước</div><div id="cmsmedia-view-img" style="overflow: hidden;width:100%;height:200px;border:1px solid #ccc"> </div></td></tr></table> </td></tr></table>'
                    }
                    //,{
                    //    type: 'text',
                    //    id: 'url-images',
                    //    className: 'cmsmedia-images',
                    //    //style: "display:inline-block;margin-top:14px;",
                    //    label: 'URL',
                    //    validate: CKEDITOR.dialog.validate.notEmpty("Chọn ảnh từ thư viện.")
                    //}
                    //,
                    //{
                    //    type: "button",
                    //    id: "btnBrowsecmsmedia",
                    //    style: "text-align:right;float:right",
                    //    align: "center",
                    //    label: 'Tìm hình',
                    //    filebrowser: "info:url-images",
                    //    onClick: function () {                            
                    //        showPopupcmsmedia();
                    //    },

                    //},
                    //{
                    //    type: 'text',
                    //    id: 'width-images',
                    //    style: "display:inline-block;width:72px;",
                    //    label: 'Chiều rộng'
                    //},
                    //{
                    //    type: 'text',
                    //    id: 'height-images',
                    //    style: "display:inline-block;width:72px;",
                    //    label: 'Chiều cao'                        
                    //}
                ]
            }
        ],
        onLoad: function () {
          
            
        },
        onOk: function () {
            var dialog = this;

            //var cmsmedia = editor.document.createElement('cmsmedia');
            //cmsmedia.setAttribute('title', dialog.getValueOf('tab-cmsmedia', 'cmsmedia-url'));
            
            var cms_src = $("#cmsmedia-url").val();
            var cms_mota = $("#cmsmedia-mota").val();
            var cms_width = $("#cmsmedia-width").val();
            var cms_height = $("#cmsmedia-height").val();

            

            if (cms_src != null && cms_src != '') {

                if (cms_width != null && cms_width != '') {
                    cms_width = " width = '" + cms_width + "px' ";
                }
                if (cms_height != null && cms_height != '') {
                    cms_height = " height = '" + cms_height + "px' ";
                }

                //var box_img = editor.document.createElement('div');
                //var img_cms = "<img src='" + cms_src + "' alt='" + cms_mota + "' " + cms_width + cms_height + "/>";
                //box_img.setHtml(img_cms);
                //editor.insertElement(box_img);

                var imgHtml = CKEDITOR.dom.element.createFromHtml("<img src='" + BASE_URL_APIMEDIA + cms_src + "' " + " alt='" + cms_mota + "' " + cms_width + cms_height + " />");
                editor.insertElement(imgHtml);                

                $("#cmsmedia-url").val('');
                $("#cmsmedia-mota").val('');
                $("#cmsmedia-width").val('');
                $("#cmsmedia-height").val('');
                $("#cmsmedia-view-img").html("");

            } else {
                alert('Vui lòng chọn hình');
                return false;
            }           

        }
    };
});

function showPopupcmsmedia() {
    $(BASE_POPUP).val("upload_callback");
    $(BASE_POPUP).attr("data-callback", "appendcmsmediaImage");
    BASE_FILE_EXTEND_LOAD = 'image';
    $('#media-attachment-filters').val(BASE_FILE_EXTEND_LOAD);
    cmsUpload.loadFiles({ typeFile: BASE_FILE_EXTEND_LOAD });
    cmsUpload.setEventSelect(true);
    cmsPopup.modalShow(MODAL_MEDIA_UPLOAD);
    return false;
}

function appendcmsmediaImage(fileObj) {
    var file = fileObj.file;
    var fileName = fileObj.name;
    var url = buildUrlcmsmedia(BASE_URL_APIMEDIA +  file, "");
    var urlFull = buildUrlcmsmedia(BASE_URL_APIMEDIA + file, "");
    var stt = $(".cms-gallery-list .image-item").length;
    var id = 0;
    var model = { TenFile: file, TenAnh: fileName };

    if (urlFull != null && urlFull != '') {
        $("#cmsmedia-url").val(urlFull);
        $("#cmsmedia-view-img").append("<img style='max-width:100%;' src='" + urlFull + "'/>");
    }    
}

function buildUrlcmsmedia(base, value) {
    return base;
}