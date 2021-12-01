var videoTypes = ['mp4', 'webm', 'ogg'];
var _editor;
CKEDITOR.plugins.add('cmsvideos', {
    icons: 'cmsvideos',
    init: function (editor) {
        _editor = editor;
        editor.ui.addButton('cmsvideos', {
            label: 'Chèn video',
            command: 'insertCmsvideos',
            toolbar: 'insert',
            icon: this.path + 'images/cmsvideos.png'
        });

        editor.addCommand('insertCmsvideos', {
            exec: function (sender) {
                showPopupVideoBrowser();
            }
        });

    }
});

function showPopupVideoBrowser() {
    $(BASE_POPUP).val("upload_callback");
    $(BASE_POPUP).attr("data-callback", "appendcmsVideo");
    BASE_FILE_EXTEND_LOAD = 'video';
    $('#media-attachment-filters').val(BASE_FILE_EXTEND_LOAD);
    cmsUpload.loadFiles({ typeFile: BASE_FILE_EXTEND_LOAD });
    cmsUpload.setEventSelect(true);
    cmsPopup.modalShow(MODAL_MEDIA_UPLOAD);
    return false;
}

function appendcmsVideo(fileObj) {
    var id = fileObj.id;
    var file = fileObj.file;
    var fileName = fileObj.name;
    var url = buildUrl("/media/Videos/" + file, "");
    var urlFull = buildUrl("/media/Videos/" + file, "");
    var urlAddImage = "";
    var model = { TenFile: file, TenAnh: fileName };

    var cms_content_videos = new CKEDITOR.dom.element('div');
    cms_content_videos.addClass('cms-content-videos');
    var video = new CKEDITOR.dom.element('video');
    var source = new CKEDITOR.dom.element('source');
    
    video.setAttributes({
        'controls': 'controls',
        'class': 'video-responsive',
        'style': 'width: 100%;'
    });

    source.setAttributes({
        'src': urlFull,
        'type': 'video/mp4'
    });

    video.append(source);
    cms_content_videos.append(video);
    _editor.insertElement(cms_content_videos);
}