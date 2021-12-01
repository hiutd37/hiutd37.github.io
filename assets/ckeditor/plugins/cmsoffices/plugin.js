var _editor;
var windowOfficeFileEditor = 'window-office-files';
var officeExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
var pdf = 'pdf'

var fileSelectedArray = [];

CKEDITOR.plugins.add('cmsoffices', {
    icons: 'cmsoffices',
    init: (editor) => {
        _editor = editor;
        editor.ui.addButton('cmsoffices', {
            label: 'Chọn file office',
            command: 'insertcmsoffices',
            toolbar: 'insert',
            icon: editor.plugins.cmsoffices.path + 'images/cmsoffices.png'
        });

        editor.addCommand('insertcmsoffices', {
            exec: function (sender) {
                if ($('body').find(`#${windowOfficeFileEditor}`).length > 0) {
                    $(`#${windowOfficeFileEditor}`).remove();
                }

                $('body').append(`<div id="${windowOfficeFileEditor}"></div>`);
                $(`#${windowOfficeFileEditor}`).html(`
                                <div id="office-file-content"></div>
                                <div class="clear-10"></div>
                                <div id="office-file-footer" style="text-align: center;">
                                    <button type="button" class="btn btn-primary" onclick="insertFiles();"><i class="fa fa-check"></i> Chèn</button>
                                    <button type="button" class="btn btn-danger" onclick="$('#${windowOfficeFileEditor}').data('kendoWindow').close();"><i class="fa fa-times"></i> Đóng</button>
                                </div>
                `);
                showPopupOfficeBrowser();
            }
        });
    }
});

function buildUrl(base, value) {
    var sep = (base.indexOf('?') > -1) ? '&' : '?';
    return base;
}

function showPopupOfficeBrowser() {
    $(BASE_POPUP).val("files_array");
    $(BASE_POPUP).attr("data-callback", "appendCmsOffice");
    BASE_FILE_EXTEND_LOAD = 'office';
    $('#media-attachment-filters').val(BASE_FILE_EXTEND_LOAD);
    cmsUpload.loadFiles({ typeFile: BASE_FILE_EXTEND_LOAD });
    cmsUpload.setEventSelect(true);
    ascPopup.modalShow(MODAL_MEDIA_UPLOAD);
    return false;
}

function appendCmsOffice(files) {
    if (files !== null && files.length > 0) {
        var $content = $(`#${windowOfficeFileEditor} > #office-file-content`);
        $content.html(`
                 <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th style="width: 100px;text-align: center;">Xem trực tuyến</th>
                        <th style="width: 200px;text-align: center;">Tên tập tin</th>
                        <th style=""width: 200px;text-align: center;">Tập tin</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
            `);

        fileSelectedArray = files.map((item, index) => {
            var ext = item.file.split('.').last();
            return {
                id: item.idFile,
                ten: item.name,
                tenFile: item.file,
                isDisplay: false,
                extension: ext
            }
        });

        files.forEach((item, index) => {
            var file_extension = item.file.split('.').last();
            var checkboxControl = officeExtensions.indexOf(file_extension) > 0 || file_extension === pdf ? `<input onchange="allowDisplay('${item.idFile}', this)" type="checkbox" id="${item.idFile}" />` : '';
            $content.find('.table > tbody').append(`
                      <tr>
                        <td style="vertical-align: middle;text-align: center;">${checkboxControl}</td>
                        <td style="vertical-align: middle;"><input type="text" id="file-name-${item.idFile}" class="k-textbox fill-input" value="Tải tập tin" /></td>
                        <td style="vertical-align: middle;"><span style="white-space: nowrap;width: 300px !important;overflow:hidden;text-overflow: ellipsis;display: inline-block;">${item.file}</spa></td>
                      </tr>
            `);
        });

        $(`#${windowOfficeFileEditor}`).kendoWindow({
            title: 'Tập tin đang chọn',
            width: 700,
            modal: true,
            visible: false,
            close: () => {
                $(`#${windowOfficeFileEditor}`).remove();
            }
        }).data('kendoWindow').center().open();
    }
}

function allowDisplay(id_file, sender) {
    fileSelectedArray = fileSelectedArray.map((item, index) => {
        return {
            id: item.id,
            ten: item.ten,
            tenFile: item.tenFile,
            isDisplay: item.id === id_file ? $(sender).prop('checked') : item.isDisplay,
            extension: item.extension
        }
    });
}

function getSource(file_name, extension) {
    var locationUrl = window.location.origin;
    var embed = '';

    if (officeExtensions.indexOf(extension) > -1) {
        embed = `https://view.officeapps.live.com/op/embed.aspx?src=${locationUrl}/Media/Documents/${file_name}`;
    }
    else if (extension === pdf) {
        embed = `${locationUrl }/Media/${file_name}`;
    }
    else {
        embed = `${locationUrl}/Media/Documents/${file_name}`;
    }

    return embed;
}

function insertFiles() {
    fileSelectedArray.forEach((item, index) => {
        var cms_content_offices = new CKEDITOR.dom.element('div');
        cms_content_offices.setAttributes({ 'class': 'asc-office-embed' });
        var source = getSource(item.tenFile, item.extension);

        if (item.isDisplay) {
            var iframe = new CKEDITOR.dom.element('iframe');
            iframe.setAttributes({
                'src': source,
                'width': '100%'
            });

            cms_content_offices.append(iframe);
            _editor.insertElement(cms_content_offices);
        }
        else {
            var link = new CKEDITOR.dom.element('a');
            link.setAttributes({ 'href': source });
            link.appendText($(`#file-name-${item.id}`).val());
            cms_content_offices.append(link);
            _editor.insertElement(cms_content_offices);
        }
    });

    $(`#${windowOfficeFileEditor}`).data('kendoWindow').close();
}