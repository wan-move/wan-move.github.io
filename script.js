// Get modal element
var modal = document.getElementById("modal");

// Get modal content elements
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");
var resolutionText = document.getElementById("resolution");
var watermark = document.querySelector(".watermark");

// Get all images and thumbnails container
var images = document.querySelectorAll('.gallery-item img');
var thumbnailsContainer = document.querySelector('.thumbnails');
var currentIndex = 0;
var scale = 1; // Initial zoom ratio
var isDragging = false;
var startX, startY, scrollLeft, scrollTop;

// Create a thumbnail for each image and add click event (only if containers exist)
if (thumbnailsContainer && modal) {
    images.forEach((img, index) => {
        var thumbnail = img.cloneNode(true);
        thumbnail.classList.remove('gallery-image');
        thumbnail.classList.add('thumbnail');
        thumbnailsContainer.appendChild(thumbnail);

        img.onclick = function () {
            openModal(index);
        }

        thumbnail.onclick = function () {
            openModal(index);
        }
    });
}

// Open modal
function openModal(index) {
    currentIndex = index;
    scale = 1; // Reset zoom ratio
    modal.style.display = "block";
    updateModalContent();
}

// Close modal
function closeModal() {
    modal.style.display = "none";
}

// Update modal content
function updateModalContent() {
    var img = images[currentIndex];
    if (modalImg && img) {
        modalImg.style.backgroundImage = `url(${img.src})`;
        modalImg.style.transform = `scale(${scale})`;
        modalImg.style.width = '100%'; // Fit modal width
        modalImg.style.height = '100%'; // Maintain aspect ratio
    }
    if (captionText && img) captionText.innerHTML = img.alt || '';
    if (watermark) watermark.style.display = "block"; // Show watermark
    updateThumbnails();
}

// Update thumbnail highlight
function updateThumbnails() {
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentIndex) {
            thumbnail.classList.add('thumbnail-active');
            thumbnail.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            thumbnail.classList.remove('thumbnail-active');
        }
    });
}

// Get close button and add click event
var span = document.getElementsByClassName("close")[0];
if (span) {
    span.onclick = function () {
        closeModal();
        if (watermark) watermark.style.display = "none"; // Hide watermark when closing modal
    }
}

// Controls for switching images
function plusSlides(n) {
    currentIndex += n;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateModalContent();
}

var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

if (prev) {
    prev.onclick = function () {
        plusSlides(-1);
    }
}

if (next) {
    next.onclick = function () {
        plusSlides(1);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (modal && modal.style.display === 'block') {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            plusSlides(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            plusSlides(1);
        } else if (event.key === 'Escape') {
            closeModal();
            if (watermark) watermark.style.display = "none"; // Hide watermark when closing modal
        }
    }
});


if (modalImg) {
    modalImg.addEventListener('mouseleave', function() {
        isDragging = false;
    });

    modalImg.addEventListener('mouseup', function() {
        isDragging = false;
    });

    modalImg.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - modalImg.offsetLeft;
        const y = e.pageY - modalImg.offsetTop;
        const walkX = (x - startX) * 2; // Adjust image move speed
        const walkY = (y - startY) * 2; // Adjust image move speed
        modalImg.scrollLeft = scrollLeft - walkX;
        modalImg.scrollTop = scrollTop - walkY;
    });
}



// Sidebar nav no longer uses sticky active highlight; color changes only on hover

// Update thumbnail highlight on scroll
window.addEventListener('scroll', () => {
    let currentIndex = -1;
    images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            currentIndex = index;
        }
    });

    if (currentIndex !== -1) {
        updateThumbnails();
    }
});



function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isWeChat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else{
        return false
    }
}


function dismissWarning() {
    document.getElementById('mobile-warning').style.display = 'none';
}

if (isMobileDevice() || isWeChat()) {
    document.getElementById('mobile-warning').style.display = 'block';
}

// Playback speed controls per section
document.querySelectorAll('.speed-controls').forEach(group => {
    group.addEventListener('click', (e) => {
        const btn = e.target.closest('.speed-btn');
        if (!btn) return;
        const speed = parseFloat(btn.dataset.speed || '1');
        // highlight active
        group.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // scope to this section
        const section = group.closest('.gallery-section');
        if (!section) return;
        section.querySelectorAll('video').forEach(v => {
            try { v.playbackRate = speed; } catch (err) {}
        });
    });
});


function buildPairedGridCore({
    sectionSelector,
    promptsScript,
    filesKey,
    promptsKey,
    labelsKey,
    showLabels,
}) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const grid = section.querySelector('.interactive-grid');
    if (!grid) return;

    // 根据 sectionSelector 生成路径前缀：'#single-object' -> 'single-object'
    const sectionName = sectionSelector.replace(/^#/, '');
    const basePath = `./assets/${sectionName}/`;

    if (typeof window[promptsKey] === 'undefined' || typeof window[filesKey] === 'undefined') {
        try {
            const s = document.createElement('script');
            s.src = promptsScript;
            s.defer = false;
            s.onload = () => buildPairedGridCore({
                sectionSelector,
                promptsScript,
                filesKey,
                promptsKey,
                labelsKey,
                showLabels,
            });
            document.head.appendChild(s);
            return;
        } catch (e) {
            return;
        }
    }

    const files = (window[filesKey] && Array.isArray(window[filesKey])) ? window[filesKey] : [];
    if (!files.length) return;

    const promptsMap = window[promptsKey] || {};
    const labelsMap = window[labelsKey] || {};

    const maxCards = 8 * 3;
    const slice = files.slice(0, maxCards);

    grid.innerHTML = '';

    slice.forEach((fileObj) => {
        const topName = fileObj.top;
        const bottomName = fileObj.bottom;
        const key = fileObj.key;
        const metaKey = `${key}.mp4`;

        const card = document.createElement('div');
        card.className = 'interactive-card';

        // ---------- Top ----------
        const topItem = document.createElement('div');
        topItem.className = 'gallery-item';
        topItem.style.setProperty('--aspect-ratio', '16 / 9');

        const topVideo = document.createElement('video');
        topVideo.className = 'gallery-video';
        topVideo.setAttribute('loop', '');
        topVideo.setAttribute('muted', '');
        topVideo.setAttribute('autoplay', '');
        topVideo.setAttribute('playsinline', '');

        const topSource = document.createElement('source');
        topSource.src = encodeURI(`${basePath}${topName}`);
        topSource.type = 'video/mp4';
        topVideo.appendChild(topSource);
        topVideo.muted = true;
        topVideo.defaultMuted = true;

        const promptDiv = document.createElement('div');
        promptDiv.className = 'prompt-overlay';
        promptDiv.textContent = promptsMap[metaKey] || '';

        const badge = document.createElement('div');
        badge.className = 'duration-badge';
        badge.textContent = '';

        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        bar.appendChild(fill);

        topItem.appendChild(topVideo);
        topItem.appendChild(promptDiv);
        topItem.appendChild(badge);

        if (showLabels) {
            const label = document.createElement('div');
            label.className = 'interactive-label';
            label.textContent = labelsMap[metaKey] || '';
            topItem.appendChild(label);
        }

        topItem.appendChild(bar);
        topItem.dataset.progressAdded = '1';

        const updateDuration = () => {
            if (isFinite(topVideo.duration) && topVideo.duration > 0) {
                badge.textContent = `${Math.round(topVideo.duration)}s`;
            }
        };

        const updateProgress = () => {
            const d = isFinite(topVideo.duration) ? topVideo.duration : 0;
            const t = isFinite(topVideo.currentTime) ? topVideo.currentTime : 0;
            const pct = d > 0 ? (t / d) * 100 : 0;
            fill.style.width = `${pct}%`;
        };

        topVideo.addEventListener('loadedmetadata', () => { updateDuration(); updateProgress(); });
        topVideo.addEventListener('timeupdate', updateProgress);
        topVideo.addEventListener('seeked', updateProgress);
        topVideo.addEventListener('playing', updateProgress);
        topVideo.addEventListener('ratechange', updateProgress);

        const tryPlayTop = () => {
            const p = topVideo.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {});
            }
        };
        topVideo.addEventListener('canplay', tryPlayTop, { once: true });
        setTimeout(tryPlayTop, 0);

        if (isFinite(topVideo.duration) && topVideo.duration > 0) {
            updateDuration();
            updateProgress();
        }

        // ---------- Arrow ----------
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.innerHTML = '<img src="./assets/arrow_down.gif" alt="arrow" class="arrow-icon">';

        // ---------- Bottom ----------
        const bottomItem = document.createElement('div');
        bottomItem.className = 'gallery-item';
        bottomItem.style.setProperty('--aspect-ratio', '16 / 9');

        const bottomVideo = document.createElement('video');
        bottomVideo.className = 'gallery-video';
        bottomVideo.setAttribute('loop', '');
        bottomVideo.setAttribute('muted', '');
        bottomVideo.setAttribute('autoplay', '');
        bottomVideo.setAttribute('playsinline', '');

        const bottomSource = document.createElement('source');
        bottomSource.src = encodeURI(`${basePath}${bottomName}`);
        bottomSource.type = 'video/mp4';
        bottomVideo.appendChild(bottomSource);
        bottomVideo.muted = true;
        bottomVideo.defaultMuted = true;

        const tryPlayBottom = () => {
            const p = bottomVideo.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {});
            }
        };
        bottomVideo.addEventListener('canplay', tryPlayBottom, { once: true });
        setTimeout(tryPlayBottom, 0);

        bottomItem.appendChild(bottomVideo);

        card.appendChild(topItem);
        card.appendChild(arrow);
        card.appendChild(bottomItem);

        grid.appendChild(card);
    });
}

function buildPairedGridWithLabels(config) {
    buildPairedGridCore({
        ...config,
        showLabels: true,
    });
}

function buildPairedGridNoLabels(config) {
    buildPairedGridCore({
        ...config,
        showLabels: false,
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildPairedGridWithLabels({
        sectionSelector: '#single-object',
        promptsScript: './single_object.js',
        filesKey: 'FILES',
        promptsKey: 'PROMPTS',
        labelsKey: 'LABELS',
    });

    buildPairedGridNoLabels({
        sectionSelector: '#multi-object',
        promptsScript: './multi_object.js',
        filesKey: 'FILES',
        promptsKey: 'PROMPTS',
        labelsKey: '',
    });

    buildPairedGridNoLabels({
    sectionSelector: '#compare',
    promptsScript: './compare.js',
    filesKey: 'FILES',
    promptsKey: 'PROMPTS',
    labelsKey: '',
    });

    buildPairedGridWithLabels({
        sectionSelector: '#transfer',
        promptsScript: './transfer.js',
        filesKey: 'FILES',
        promptsKey: 'PROMPTS',
        labelsKey: 'LABELS',
    });
});


// Add duration badge and progress bar to shortwindow videos
(function attachShortwindowOverlays() {
    const shortSection = document.querySelector('#shortwindow');
    if (!shortSection) return;
    const items = shortSection.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (item.dataset.progressAdded === '1') return;
        const video = item.querySelector('video');
        if (!video) return;

        const badge = document.createElement('div');
        badge.className = 'duration-badge';
        badge.textContent = '';

        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        bar.appendChild(fill);

        item.appendChild(badge);
        item.appendChild(bar);
        item.dataset.progressAdded = '1';

        const updateDuration = () => {
            if (isFinite(video.duration) && video.duration > 0) {
                badge.textContent = `${Math.round(video.duration)}s`;
            }
        };

        const updateProgress = () => {
            const d = isFinite(video.duration) ? video.duration : 0;
            const t = isFinite(video.currentTime) ? video.currentTime : 0;
            const pct = d > 0 ? (t / d) * 100 : 0;
            fill.style.width = `${pct}%`;
        };

        video.addEventListener('loadedmetadata', () => { updateDuration(); updateProgress(); });
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('seeked', updateProgress);
        video.addEventListener('playing', updateProgress);
        video.addEventListener('ratechange', updateProgress);

        // Initialize if metadata already available
        if (isFinite(video.duration) && video.duration > 0) {
            updateDuration();
            updateProgress();
        }
    });
})();

// Apply overlays to all other sections as well
(function attachGlobalOverlays() {
    const items = document.querySelectorAll('.gallery-section .gallery-item');
    items.forEach(item => {
        // Skip Demo Video section (#teaser)
        if (item.closest('#teaser')) return;
        if (item.dataset.progressAdded === '1') return; // already handled
        const video = item.querySelector('video');
        if (!video) return;

        const badge = document.createElement('div');
        badge.className = 'duration-badge';
        badge.textContent = '';

        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        bar.appendChild(fill);

        item.appendChild(badge);
        item.appendChild(bar);
        item.dataset.progressAdded = '1';

        const updateDuration = () => {
            if (isFinite(video.duration) && video.duration > 0) {
                badge.textContent = `${Math.round(video.duration)}s`;
            }
        };

        const updateProgress = () => {
            const d = isFinite(video.duration) ? video.duration : 0;
            const t = isFinite(video.currentTime) ? video.currentTime : 0;
            const pct = d > 0 ? (t / d) * 100 : 0;
            fill.style.width = `${pct}%`;
        };

        video.addEventListener('loadedmetadata', () => { updateDuration(); updateProgress(); });
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('seeked', updateProgress);
        video.addEventListener('playing', updateProgress);
        video.addEventListener('ratechange', updateProgress);

        if (isFinite(video.duration) && video.duration > 0) {
            updateDuration();
            updateProgress();
        }
    });
})();

// Add duration badge and progress bar to Demo section (#teaser)
(function attachTeaserOverlay() {
    const teaser = document.querySelector('#teaser');
    if (!teaser) return;
    const item = teaser.querySelector('.demo-hero');
    if (!item) return;
    if (item.dataset.progressAdded === '1') return;
    const video = item.querySelector('video');
    if (!video) return;

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    bar.appendChild(fill);

    item.appendChild(bar);
    item.dataset.progressAdded = '1';

    const updateProgress = () => {
        const d = isFinite(video.duration) ? video.duration : 0;
        const t = isFinite(video.currentTime) ? video.currentTime : 0;
        const pct = d > 0 ? (t / d) * 100 : 0;
        fill.style.width = `${pct}%`;
    };

    video.addEventListener('loadedmetadata', () => { updateProgress(); });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('seeked', updateProgress);
    video.addEventListener('playing', updateProgress);
    video.addEventListener('ratechange', updateProgress);

    if (isFinite(video.duration) && video.duration > 0) {
        updateProgress();
    }
})();

// Orchestrate video loading in document display order (prioritize top sections)
(function orchestrateOrderedVideoLoading() {
    try {
        // Ensure interactive grid is already built before collecting videos
        const allVideos = Array.from(document.querySelectorAll('.content .gallery-section video.gallery-video'));
        if (!allVideos.length) return;

        // Move src -> data-src and stop any in-flight fetches to regain control
        const managed = [];
        allVideos.forEach(v => {
            if (!v || v.dataset.managed === '1') return;
            const source = v.querySelector('source');
            if (!source) return;
            const src = source.getAttribute('src');
            if (!src) return;
            try { v.pause(); } catch (e) {}
            source.setAttribute('data-src', src);
            source.removeAttribute('src');
            v.removeAttribute('autoplay');
            v.preload = 'none';
            // Calling load() after removing src cancels current network activity
            try { v.load(); } catch (e) {}
            v.dataset.managed = '1';
            managed.push(v);
        });

        if (!managed.length) return;

        // Limit concurrent loads to avoid bandwidth contention
        const maxConcurrent = 4;
        let inFlight = 0;
        let cursor = 0;

        const startNext = () => {
            // Fill up to concurrency window
            while (inFlight < maxConcurrent && cursor < managed.length) {
                const v = managed[cursor++];
                const source = v.querySelector('source');
                if (!source) continue;
                const ds = source.getAttribute('data-src');
                if (!ds) continue;
                source.setAttribute('src', ds);
                try { v.load(); } catch (e) {}
                inFlight++;

                const onDone = () => {
                    inFlight--;
                    // Try to autoplay once ready
                    try { v.muted = true; v.defaultMuted = true; v.play().catch(() => {}); } catch (e) {}
                    startNext();
                };

                v.addEventListener('loadeddata', onDone, { once: true });
                v.addEventListener('error', onDone, { once: true });
            }
        };

        startNext();
    } catch (e) {
        // Fail silently; do not block page if anything goes wrong
    }
})();