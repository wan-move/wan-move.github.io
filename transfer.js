// List all interactive video files (order defines grid filling, max 24 shown)
window.FILES = [
    {
        top: "copy-1-top.mp4",
        bottom: "copy-1-bottom.mp4",
        key: "copy-1",
    },
    {
        top: "edit-1-top.mp4",
        bottom: "edit-1-bottom.mp4",
        key: "edit-1",
    },
    {
        top: "edit-2-top.mp4",
        bottom: "edit-2-bottom.mp4",
        key: "edit-2",
    },
];

// Map each filename to its prompt overlay content (fill later)
window.PROMPTS = {
    "copy-1.mp4": `Dense Motion Copy`,
    "edit-1.mp4": `Edit first frame: "Change the color of the cloth to yellow"`,
    "edit-2.mp4": `Edit first frame: "Transform the image into a Studio Ghibli style"`,
};


// Optional: Map each filename to a short category label shown on each card (you can fill these)
window.LABELS = {
    "copy-1.mp4": "Dense Motion Copy",
    "edit-1.mp4": "Motion Copy + First Frame Editing",
    "edit-2.mp4": "Motion Copy + First Frame Editing",
};

