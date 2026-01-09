import os
from PIL import Image

# Configuration
input_folder = 'FP_raw'      # Folder with original images
output_folder = 'FP'   # Folder to save cropped images
crop_height = 250                  # Number of pixels to crop from the top

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Supported image formats
image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')

# Process each image
for filename in os.listdir(input_folder):
    if filename.lower().endswith(image_extensions):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        try:
            with Image.open(input_path) as img:
                width, height = img.size
                cropped_img = img.crop((0, crop_height, width, height))  # (left, top, right, bottom)
                cropped_img.save(output_path)
                print(f'Cropped and saved: {output_path}')
        except Exception as e:
            print(f'Failed to process {filename}: {e}')
