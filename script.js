// Profile Image Upload
document.getElementById('profile-upload-btn').addEventListener('click', function() {
    document.getElementById('fileInputProfile').click();
});

document.getElementById('fileInputProfile').addEventListener('change', function(event) {
    handleImageUpload(event, 'profile');
});

// bKash QR Code Upload
document.getElementById('bKash-upload-btn').addEventListener('click', function() {
    document.getElementById('fileInputQR').click();
});

document.getElementById('fileInputQR').addEventListener('change', function(event) {
    handleImageUpload(event, 'bKash');
});

// Common function to handle image upload
function handleImageUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById(`${type}-preview-img`);
            imagePreview.src = e.target.result;
            document.getElementById(`${type}-image-preview`).classList.remove('hidden');
            imagePreview.classList.remove('hidden');
            document.getElementById(`${type}-remove-btn`).classList.remove('hidden');
            document.getElementById(`${type}-text-box`).classList.add('hidden');

            generateQRcode();
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('profile-remove-btn').addEventListener('click', function() {
    removeImagePreview('profile');
    document.getElementById('previewImgProfile').classList.add('hidden')
    document.getElementById('previewImgProfile').classList.remove('block')
});

document.getElementById('bKash-remove-btn').addEventListener('click', function() {
    removeImagePreview('bKash');
    document.getElementById('previewImgQR').classList.add('hidden')
    document.getElementById('previewImgQR').classList.remove('flex')
});

// Function to check if both images are removed
function checkImages() {
    const profileImg = document.getElementById('fileInputProfile').value;
    const QRimg = document.getElementById('fileInputQR').value;
    const downloadBox = document.getElementById('downloadBox');
    const generateQR = document.getElementById('generateQR')
    const textContent = document.getElementById('textContent');

    if (!profileImg && !QRimg) {
        downloadBox.classList.add('hidden');
        generateQR.classList.remove('border-none', 'shadow-none', 'w-full', 'flex', 'justify-center', 'items-center', 'p-4', 'h-auto', 'bg-white');
        textContent.classList.remove('hidden')
    }
}

// Function to remove image preview
function removeImagePreview(type) {
    document.getElementById(`${type}-image-preview`).classList.add('hidden');
    document.getElementById(`${type}-preview-img`).classList.add('hidden');
    document.getElementById(`${type}-remove-btn`).classList.add('hidden');
    document.getElementById(`${type}-text-box`).classList.remove('hidden');
    document.getElementById(`fileInput${type === 'profile' ? 'Profile' : 'QR'}`).value = '';

    checkImages();
}

// Generate QR Code Function
function generateQRcode() {
    const generateQR = document.getElementById('generateQR');
    const downloadBox = document.getElementById('downloadBox');
    const textContent = document.getElementById('textContent');

    generateQR.classList.remove('hidden');
    generateQR.classList.add('border-none', 'shadow-none', 'w-full', 'flex', 'justify-center', 'items-center', 'p-4', 'h-auto', 'bg-white');
    textContent.classList.add('hidden');

    downloadBox.classList.remove('hidden');
    downloadBox.classList.add('flex');
}

// Handle QR Code Image Upload
document.getElementById('fileInputQR').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            let imgElement = document.getElementById('imgQR');
            const previewContainer = document.getElementById('previewImgQR');

            if (!imgElement) {
                imgElement = document.createElement('img');
                imgElement.id = 'imgQR';
                imgElement.classList.add('w-full', 'h-full', 'object-contain');
                previewContainer.appendChild(imgElement);
            }

            imgElement.src = e.target.result;
            previewContainer.classList.remove('hidden');
            previewContainer.classList.add('flex');
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
});

// Handle Profile Image Upload
document.getElementById('fileInputProfile').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            let imgElement = document.getElementById('imgProfile');
            const previewContainer = document.getElementById('previewImgProfile');

            if (!imgElement) {
                imgElement = document.createElement('img');
                imgElement.id = 'imgProfile';
                imgElement.classList.add('w-full', 'h-full', 'object-contain');
                previewContainer.appendChild(imgElement);
            }

            imgElement.src = e.target.result;
            previewContainer.classList.remove('hidden');
            previewContainer.classList.add('block');
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
});

// Update number field dynamically
document.getElementById('numberField').addEventListener('input', function() {
    const numberField = document.getElementById('numberField').value;
    document.getElementById('numberText').innerText = numberField || '+880 1XX XXX XXX XX';
});

// Update profile name dynamically
document.getElementById('profileField').addEventListener('input', function() {
    const profileField = document.getElementById('profileField').value;
    document.getElementById('nameText').innerText = profileField || 'Your Name';
});


document.getElementById("download").addEventListener("click", async () => {
    const selectedArea = document.getElementById("selectedArea");

    if (!selectedArea) {
        alert("Error: Could not find the selected area!");
        return;
    }

    try {
        const dataUrl = await htmlToImage.toPng(selectedArea, {
            quality: 1, // Ensures high quality
            backgroundColor: "white", // Ensures white background
            width: selectedArea.offsetWidth * 2, // Double resolution for better quality
            height: selectedArea.offsetHeight * 2,
            style: {
                transform: "scale(2)", // Scale to improve sharpness
                transformOrigin: "top left",
                margin: "0px"
            }
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "EidCard.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error capturing image:", error);
        alert("Failed to generate image. Please try again.");
    }
});
