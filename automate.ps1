# Define the path to the directory containing images
$imageDir = "C:\Users\Riasat\shorts-maker\image"
$mainDir = "C:\Users\Riasat\shorts-maker"


# Change to the image directory
Set-Location -Path $imageDir

# Get all jpg files in the directory
$images = Get-ChildItem -Filter *.jpg

# Loop through each image and apply the resize and extent operation
foreach ($image in $images) {
    $filePath = $image.FullName
    magick $filePath -resize 1280x -gravity center -background black -extent 1080x1980 $filePath
}

Write-Host "Resize and extent operation completed for all images."

Set-Location -Path $mainDir


# Define input video and audio paths
$videoInput = "./video/slideshow.mp4"
$audioInput = "output.wav"

# Define output video path
$outputVideo = "./video/final-video.mp4"

Invoke-Expression -Command "ffmpeg -framerate 1/3 -i image/image-%d.jpg -c:v libx264 -pix_fmt yuv420p ./video/slideshow.mp4"
# FFmpeg command to merge video and audio
$ffmpegCommand = "ffmpeg -i `"$videoInput`" -i `"$audioInput`" -c copy -map 0:v:0 -map 1:a:0 -shortest `"$outputVideo`""

# Execute FFmpeg command
Invoke-Expression -Command $ffmpegCommand
