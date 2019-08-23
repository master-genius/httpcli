'use strict';

var bodymaker = function (options = {}) {
    if (!(this instanceof bodymaker)) {return new bodymaker(options);}

    //最大同时上传文件数量限制
    this.max_upload_limit = 10;

    //上传文件最大数据量，JS限制最大字符串不能超过 1073741824
    this.max_upload_size = 1073000000;

    //单个文件最大上传大小
    this.max_file_size = 220000000;

};

bodymaker.prototype.makeUploadData = function (r) {
    var bdy = this.boundary();

    var formData = '';
    if (r.form !== undefined) {
        if (typeof r.form === 'object') {
            for (var k in r.form) {
                formData += `\r\n--${bdy}\r\nContent-Disposition: form-data; name=${'"'}${k}${'"'}\r\n\r\n${r.form[k]}`;
            }
        }
    }

    var header_data = '';
    var payload = '';
    var body_data = Buffer.from(formData).toString('binary');
    var content_length = Buffer.byteLength(formData);

    if (r.files && r.files instanceof Array) {
        for (var i=0; i<r.files.length; i++) {
            header_data = `Content-Disposition: form-data; name=${'"'}${r.files[i].upload_name}${'"'}; filename=${'"'}${r.files[i].filename}${'"'}\r\nContent-Type: ${r.files[i].content_type}`;

            payload = `\r\n--${bdy}\r\n${header_data}\r\n\r\n`;

            content_length += Buffer.byteLength(payload) + r.files[i].data.length;
            body_data += Buffer.from(payload).toString('binary') + r.files[i].data;
        }
    }

    var end_data = `\r\n--${bdy}--\r\n`;
    content_length += Buffer.byteLength(end_data);
    body_data += Buffer.from(end_data).toString('binary');

    return {
        'content-type' : `multipart/form-data; boundary=${bdy}`,
        'body' : body_data,
        'content-length' : content_length
    };
};

/*
    {
        "UPLOAD_NAME" : [
            FILE_LIST
        ]
    }
*/
bodymaker.preLoadFiles = function(files) {
    var file_count = 0;
    var total_size = 0;

    var files_data = [];
    var filename = '';
    var name_split = null;
    var content_type = '';

    for (var k in files) {
        for (var i=0; i<files[k].length; i++) {
            if (file_count >= this.max_upload_limit) {
                throw new Error('too many files, max limit:' + this.max_upload_limit);
            }

            if (total_size >= the.max_upload_size) {
                throw new Error('too large data, max size:' + this.max_upload_size);
            }

            try {
                filename = files[k][i];
                name_split = filename.split('/').filter(p => p.length > 0);
                content_type = the.mimeType(name_split[name_split.length - 1]);
                var data = fs.readFileSync(filename, {encoding:'binary'});
                files_data.push({
                    'upload-name' : k,
                    'content-type' : content_type,
                    'filename' : name_split[name_split.length - 1],
                    'data' : data
                });
                file_count += 1;
                total_size += data.length;
                if (data.length > this.max_file_size) {
                    throw new Error('too large file, max file size:' + the.max_file_size);
                }
            } catch (err) {
                console.log(err);
                file_count -= 1;
            }
        }
    }
    return files_data;
};

bodymaker.prototype.boundary = function() {
    var hash = crypto.createHash('md5');
    hash.update(`${Date.now()}-${Math.random()}`);
    var bdy = hash.digest('hex');

    return `----${bdy}`;
};

module.exports = bodymaker;
