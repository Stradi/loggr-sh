<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


if (!function_exists('upload_file_to_s3')) {
    /**
     * Uploads a file to S3 and returns the URL.
     * @param UploadedFile $file The file to upload.
     * @param string $path The path to upload the file to.
     * @param array<int, int> $dimensions The dimensions to resize the image to.
     * @return string The URL of the uploaded file.
     */
    function upload_file_to_s3(UploadedFile $file, string $path, array $dimensions = [0, 0]): string
    {
        $uuid = Str::orderedUuid();
        $extension = $file->getClientOriginalExtension();
        $full_filename = $uuid . '.' . $extension;

        $image = Image::make($file);

        if ($dimensions[0] !== 0 && $dimensions[1] !== 0) {
            $image->fit($dimensions[0], $dimensions[1]);
        }
        $resource = $image->stream()->detach();

        Storage::disk('s3')->put($path . '/' . $full_filename, $resource);

        return Env::get('AWS_URL') . '/' . $path . '/' . $full_filename;
    }
}
