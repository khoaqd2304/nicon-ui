$(function () {
    $(".dropzone-submit-form").dropzone({
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        maxFiles: 6,
        uploadMultiple: true,
        url: "/",
        dictDefaultMessage: "Click để chọn file hoặc kéo thả file vào",
        dictFallbackMessage: "Click vào đây để chọn file upload",
        dictFallbackText: "Vui lòng sử dụng biểu mẫu dự phòng dưới đây để tải lên tệp của bạn như trong những ngày trước",
        dictFileTooBig: "Kích thước tập tin quá lớn ({{filesize}}MiB). Tối đa: {{maxFilesize}}MiB.",
        dictInvalidFileType: "Tập tin tải lên không đúng định dạng, vui lòng tải tập tin khác!",
        dictCancelUpload: "Ngừng tải lên",
        dictResponseError: "Không tải lên được",
        dictRemoveFile: "x",
        dictDefaultError: "Không thể tải lên!",
        autoProcessQueue: false,
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
        clickable: '.dz-default',
        previewsContainer: ".file-container",
        //success: function (file, response, action) {
        //    // PHP server response
        //    if (response == 'success') // Validate whatever you send from the server
        //    {
        //        this.defaultOptions.success(file);
        //    }
        //    else {
        //        alert(response);
        //        this.defaultOptions.error(file, 'An error occurred!');
        //    }
        //},

        init: function () {
            var myDropzone = this;
            // First change the button to actually tell Dropzone to process the queue.
            //var buttonSubmit = $(this.element).find("button[type=submit]").each(
            //            function (index, item) {
            //                $(item).click(function (e) {
            //                    // Make sure that the form isn't actually being sent.
            //                    e.preventDefault();
            //                    e.stopPropagation();
            //                    myDropzone.processQueue();
            //                });
            //            }
            //    );
            this.on('error', function (file, respone) {
                
                var errorMes = respone.error;
                if (errorMes === null) {
                    errorMes = this.options.dictDefaultError;
                }
                var dzError = $(file.previewElement).find('.dz-error-message');
                dzError.text(errorMes);
            });
        },
    });

    $(".dropzone-submit-form-one").dropzone({
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        maxFiles: 1,
        uploadMultiple: true,
        url: "/",
        dictDefaultMessage: "Click để chọn file hoặc kéo thả file vào",
        dictFallbackMessage: "Click vào đây để chọn file upload",
        dictFallbackText: "Vui lòng sử dụng biểu mẫu dự phòng dưới đây để tải lên tệp của bạn như trong những ngày trước",
        dictFileTooBig: "Kích thước tập tin quá lớn ({{filesize}}MiB). Tối đa: {{maxFilesize}}MiB.",
        dictInvalidFileType: "Tập tin tải lên không đúng định dạng, vui lòng tải tập tin khác!",
        dictCancelUpload: "Ngừng tải lên",
        dictResponseError: "Không tải lên được",
        dictRemoveFile: "x",
        dictDefaultError: "Không thể tải lên!",
        autoProcessQueue: false,
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
        clickable: '.dz-default',
        previewsContainer: ".file-container",
       
        init: function () {
            var myDropzone = this;
            this.on('error', function (file, respone) {

                var errorMes = respone.error;
                if (errorMes === null) {
                    errorMes = this.options.dictDefaultError;
                }
                var dzError = $(file.previewElement).find('.dz-error-message');
                dzError.text(errorMes);
            });
        },
    });
    Dropzone.autoDiscover = false;
});