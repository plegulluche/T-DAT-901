
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} = require('@azure/storage-blob');

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const iconContainer = 'icons';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);

const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
);

try {
    const containerClient = blobServiceClient.getContainerClient(iconContainer);
    //if container does not exist, create it
    const created = async () => await containerClient.createIfNotExists();

    created();

} catch (error) {
    console.log(error);
} finally {
    console.log('finally');
}

const getBlobName = originalName => {
    // Use a random number to generate a unique file name, 
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
};

function uploadImageToAzureBlob(blob, name) {

    const blobName = getBlobName(name);

    const blobPromise = new Promise((resolve, reject) => {
        const blockBlobClient = blobServiceClient.getContainerClient(iconContainer).getBlockBlobClient(blobName);
        const uploadBlobResponse = blockBlobClient.uploadData(blob, { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
        resolve(uploadBlobResponse);
    });

    return {blobPromise, blobName};
}


module.exports = { uploadImageToAzureBlob };