// List all interactive video files (order defines grid filling, max 24 shown)
window.FILES = [
    {
        top: "multi-object-1-top.mp4",
        bottom: "multi-object-1-bottom.mp4",
        key: "multi-object-1",
    },
    {
        top: "multi-object-2-top.mp4",
        bottom: "multi-object-2-bottom.mp4",
        key: "multi-object-2",
    },
    {
        top: "multi-object-3-top.mp4",
        bottom: "multi-object-3-bottom.mp4",
        key: "multi-object-3",
    },
];

// Map each filename to its prompt overlay content (fill later)
window.PROMPTS = {
    "multi-object-1.mp4": `Panoramic view of a cartoon character climbing the stairs. In the flat shot, he was wearing a white shirt and green pants, a pair of red shoes and a brown backpack. His hair is brown and he wears glasses. The background is a simple white wall with a green door frame on it.`,
    "multi-object-2.mp4": `In the outdoor park, the camera captures a panoramic view of four foreigners playing tug-of-war. Two foreign black men on the left were wearing gray short-sleeved and white pants, and two foreign black women on the right were wearing pink sweatshirts and blue pants. They clasped on a white rope with both hands, leaned back, and pushed the ground with their feet hard, smiling. The background is green grass and trees, and there are several stone benches and a silver railing in the distance.`,
    "multi-object-3.mp4": `In a bright room, the camera captures a close-up view of two people giving foot massage to another. The camera swayed slightly, they were wearing white short-sleeved and oiled hands, and were massaged by a person's feet. The background is a bokeh of white cabinets and yellow shelves with some white towels on it.`,
};
