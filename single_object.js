// List all interactive video files (order defines grid filling, max 24 shown)
window.FILES = [
    {
        top: "large-motion-1-top.mp4",
        bottom: "large-motion-1-bottom.mp4",
        key: "large-motion-1",
    },
    {
        top: "large-motion-2-top.mp4",
        bottom: "large-motion-2-bottom.mp4",
        key: "large-motion-2",
    },
    {
        top: "large-motion-3-top.mp4",
        bottom: "large-motion-3-bottom.mp4",
        key: "large-motion-3",
    },
    {
        top: "large-motion-4-top.mp4",
        bottom: "large-motion-4-bottom.mp4",
        key: "large-motion-4",
    },
    {
        top: "physical-1-top.mp4",
        bottom: "physical-1-bottom.mp4",
        key: "physical-1",
    },
    {
        top: "physical-2-top.mp4",
        bottom: "physical-2-bottom.mp4",
        key: "physical-2",
    },
];

// Map each filename to its prompt overlay content (fill later)
window.PROMPTS = {
    "large-motion-1.mp4": `In the gym, the camera captured a half-body view of two foreign men boxing. The camera swayed slightly, the man on the left was wearing black short-sleeved and blue pants, and red and white boxing gloves. The man on the right was wearing black short-sleeved and black boxing gloves. They stood face to face, the man on the right fisted, and the man on the left caught it with the boxing gloves. The background is a blurred fitness equipment.`,
    "large-motion-2.mp4": `In one bedroom, a foreign white woman is sitting on the bed using her laptop. In the panoramic flat shot, she was wearing a white T-shirt and gray pants, with a shawl of hair, and looking at the screen with a smile. Next to her was a foreign white man wearing VR glasses and holding a gun-shaped controller in each hand, playing a game. The room was dimly lit, and only the desk lamps on the bedside table emitted a soft light to illuminate the entire space. A large window with purple curtains and a white wardrobe can be seen in the background.`,
    "large-motion-3.mp4": `Half-body view of a white foreign woman stretching outdoors. She was wearing a gray sports vest and holding a blue pull belt in her hands, and was doing stretching. The background is blurred trees and bushes. The video is shot in a head-up camera, which follows the characters and is slow-played.`,
    "large-motion-4.mp4": `Indoors, the camera flat-screen panoramic view of a foreign man doing sit-ups. The man was wearing a blue top and black shorts, holding his head with both hands and doing sit-ups. Next to her was a foreign woman wearing a gray sportswear and watching the man do sit-ups. The background is white walls and some green plants.`,
    "physical-1.mp4": `A brown ceramic cup is placed on a colorful striped tablecloth. Above the cup, a silver kettle is pouring yellow liquid into the cup. As the liquid is injected, the liquid level in the cup gradually rises. The background is blurred and appears blurred white and black. In the background, you can see a black plate with two loaves of bread, one of which is white and the other is brown. The entire video is shot through a fixed-head-up close-up shot lens, recording this process.`,
    "physical-2.mp4": `In a close-up shot, a woman is writing on a purple card with a pink pen. Her fingernails were painted with light blue nail polish, she wore a silver ring on her ring finger and a bracelet and bracelet on her wrist. She placed the card on a brown table with a purple bow ornament next to it.`
};



// Optional: Map each filename to a short category label shown on each card (you can fill these)
window.LABELS = {
    "large-motion-1.mp4": "Large-scale Motion",
    "large-motion-2.mp4": "Large-scale Motion",
    "large-motion-3.mp4": "Large-scale Motion",
    "large-motion-4.mp4": "Large-scale Motion",
    "physical-1.mp4": "Follow Physical Laws",
    "physical-2.mp4": "Follow Physical Laws",
};

