export async function deleteFileCompat(filePath) {
    if (!filePath || !fs.existsSync(filePath)) {
        return;
    }

    try {
        if (electron?.shell?.trashItem) {
            await electron.shell.trashItem(filePath);
            return;
        }
    } catch (error) {
        console.warn("[YSM Utils] Failed to move file to system trash. Deleting directly.", error);
    }

    if (fs.rmSync) {
        fs.rmSync(filePath, {recursive: true, force: true});
    } else {
        fs.unlinkSync(filePath);
    }
}
