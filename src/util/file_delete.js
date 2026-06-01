export async function deleteFileCompat(filePath) {
    if (!filePath || !fs.existsSync(filePath)) {
        return true;
    }

    try {
        if (electron?.shell?.trashItem) {
            await electron.shell.trashItem(filePath);
            return true;
        }
    } catch (error) {
        console.warn("[YSM Utils] Failed to move file to system trash.", error);
        Blockbench.showQuickMessage(tl("menu.ysm_utils.load_info_menu.files.move_to_trash_failed"), 5000);
        return false;
    }

    Blockbench.showQuickMessage(tl("menu.ysm_utils.load_info_menu.files.move_to_trash_failed"), 5000);
    return false;
}
