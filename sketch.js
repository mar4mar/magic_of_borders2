let currentPage = 'home';
let sections = [];

let openingDoor = null;
let doorProgress = 0;

let doorOpen = false;
let doorSwing = 0;
let doorSwingSpeed = 0;

let lines = [];
let floatingWords = [];
let currentWordPair = 0;
let wordPairTimer = 0;
let wordPairDuration = 8000;
let activityInitialized = false;

let artImages = [];
let currentFrame = 0;
let frameStates = [0, 0, 0, 0]; // Current image index for each frame

let readingList = [
    "Alien Enemies Act of 1798",
    "Luselli, Valeria. Tell Me How It Ends: An Essay in 40 Questions. Minneapolis: Coffee House Press, 2017.",
    "Walia, Harsha. Border and Rule: Global Migration, Capitalism, and the Rise of Racist Nationalism. Chicago: Haymarket Books, 2021, 1-60.",
    "Dhruv Mehrota. \"The US is Storing Migrant Children's DNA in a Criminal Database.\" Wired, 2020.",
    "Department of Homeland Security. \"Collection and Use of Biometrics by US Government Agencies Authorized by Immigration Services.\" Nov 3, 2025.",
    "US Coolie Report of 1860",
    "US Prohibition of Coolie Trade 1862",
    "Jung Moon-ho. \"Coolie,\" in Keywords for American Cultural Studies.",
    "Bahadur, Gaiutra. \"Preface: The C-Word,\" in Coolie Woman: The Odyssey of Indenture, pp. xii-xii.",
    "Bahadur, Gaiutra. \"How could I write about women whose existence is barely acknowledged?\" The Guardian, June 14, 2016.",
    "David Dabydeen's The Counting House",
    "Adam McKeown. Melancholy Order: chapter III, IV 11, III 1, 3, 5",
    "Wendy Brown. Walled States, Waning Sovereignties (2014). Chapter 1: Waning Sovereignty in Democracy. Pgs. 7-42.",
    "Adam Hanieh. \"The Contradictions of Global Migration.\" Socialist Register, Vol 55 (2019): 50-73.",
    "Alex Rivera. Sleep Dealer",
    "Mahmoud Keshavarz and Shahram Khosravi. \"The Magic of Borders.\" (2020)",
    "Petra Molnar. The Walls Have Eyes, Introduction, Chapters 1, 3, 4, 5, 8",
    "Arendt, Hannah. The Origins of Totalitarianism: 1st ed., Harvest, Brace, 1951, 267-302.",
    "Shoshana Zuboff. The Age of Surveillance Capitalism, Introduction, Chapter 2, 3, 6",
    "Martina Tazzioli and Nicholas De Genova. \"Border Abolitionism: Analytics/Politics,\" Social Text, 41, no. 3 (2023), 1–34."
];

let scrollOffset = 0;
let maxScroll = 0;

const wordPairs = [
    { left: 'you', right: 'me' },
    { left: 'us', right: 'them' },
    { left: 'here', right: 'there' },
    { left: 'friends', right: 'enemies' }
];

function preload() {
    // Preload your images here - adjust paths as needed
    artImages = [
        loadImage('img1.JPG'),
        loadImage('img2.JPG'),
        loadImage('img3.JPG'),
        loadImage('img4.JPG'),
        loadImage('img5.JPG'),
        loadImage('img6.JPG'),
        loadImage('img7.JPG'),
    ];
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    initializeSections();
}

function draw() {
    background(245, 240, 235);
    
    if (currentPage === 'home') drawHomepage();
    else if (currentPage === 'activity1') drawActivity1();
    else if (currentPage === 'activity2') drawActivity2();
    else if (currentPage === 'activity3') drawActivity3();
    else if (currentPage === 'activity4') drawActivity4();
    else if (currentPage === 'activity5') drawActivity5();
    else if (currentPage === 'activity6') drawActivity6();
    else if (currentPage === 'activity7') drawActivity7();
    else if (currentPage === 'activity8') drawActivity8();
}

// ✅ 4x2 GRID
function initializeSections() {
    sections = [];

    let cols = 4;
    let rows = 2;

    let marginX = 80;
    let marginY = 140;
    let gap = 40;

    let doorW = (width - marginX * 2 - gap * (cols - 1)) / cols;
    let doorH = (height - marginY * 2 - gap * (rows - 1)) / rows;

    let titles = [
        'Blurred Borders',
        'Art Gallery',
        'A Door to Nowhere',
        'Activity 4',
        'Activity 5',
        'Activity 6',
        'Activity 7',
        'Reading List'
    ];

    let colors = [
        [255,150,100],[100,150,255],[150,255,100],[255,100,200],
        [255,200,120],[120,200,255],[200,255,150],[255,150,220]
    ];

    let count = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            sections.push({
                x: marginX + c * (doorW + gap),
                y: marginY + r * (doorH + gap),
                w: doorW,
                h: doorH,
                title: titles[count],
                color: colors[count],
                id: 'activity' + (count + 1)
            });
            count++;
        }
    }
}

function drawHomepage() {
    fill(50);
    textSize(42);
    textAlign(CENTER);
    text('Magic of Borders', width / 2, 60);
    
    textSize(18);
    fill(100);
    text('Choose a door', width / 2, 95);

    for (let section of sections) {
        drawDoor(section);
    }
}

// ✅ SAME GOOD DOOR
function drawDoor(section) {
    let isOpening = (openingDoor === section);
    
    if (isOpening) {
        doorProgress += 0.06;
        if (doorProgress >= 1) {
            currentPage = section.id;
            openingDoor = null;
            doorProgress = 0;
        }
    }

    let openAmount = isOpening ? doorProgress : 0;

    let hovering = mouseX > section.x && mouseX < section.x + section.w &&
                   mouseY > section.y && mouseY < section.y + section.h;

    if (hovering && !openingDoor) cursor(HAND);
    else cursor(ARROW);

    stroke(50);
    strokeWeight(2);
    fill(245, 240, 235);
    rect(section.x, section.y, section.w, section.h);

    let halfW = section.w / 2;
    let eased = 1 - pow(1 - openAmount, 3);

    let leftW = halfW * (1 - eased);
    fill(section.color);
    rect(section.x, section.y, leftW, section.h);

    let rightW = halfW * (1 - eased);
    rect(section.x + section.w - rightW, section.y, rightW, section.h);

    stroke(50);
    line(section.x + halfW, section.y, section.x + halfW, section.y + section.h);

    if (openAmount < 0.6) {
        fill(50, map(openAmount, 0, 0.6, 255, 0));
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(section.title, section.x + section.w / 2, section.y + section.h / 2);
    }
}

// ===== ACTIVITY 1 (unchanged) =====
function drawActivity1() {
    background(245, 240, 235);

    fill(255,150,100);
    textSize(28);
    textAlign(CENTER);
    text('Draw Borders', width/2,50);

    fill(100);
    textSize(14);
    text('Move your mouse to create borders', width/2,80);

    if (!activityInitialized) {
        initializeFloatingWords();
        activityInitialized = true;
    }

    wordPairTimer += deltaTime;
    if (wordPairTimer > wordPairDuration) {
        currentWordPair = (currentWordPair + 1) % wordPairs.length;
        wordPairTimer = 0;
        resetWordPositions();
    }

    updateFloatingWords();
    displayFloatingWords();

    updateLines();
    displayLines();

    if (mouseY > 120) {
        drawDottedLine(pmouseX, pmouseY, mouseX, mouseY);
    }

    drawBackButton();
}


function drawActivity2() {
    background(245, 240, 235);
    
    fill(100, 150, 255);
    textSize(28);
    textAlign(CENTER);
    text('Resistance Art Explorer', width / 2, 50);
    
    fill(100);
    textSize(14);
    text('Use arrow keys to navigate through images', width / 2, 80);
    
    // Draw 4 frames in 2x2 grid
    drawArtFrames();
    
    // Draw instructions
    drawFrameInstructions();
    
    drawBackButton();
}

function drawActivity3(){drawPlaceholder('A Door to Nowhere')
    textSize(28);
    textAlign(CENTER);  
    fill(0);
    text('Huh...? This is not where I thought I would go...', width/2,200)
}




function drawActivity4(){drawPlaceholder('Activity 4')}
function drawActivity5(){drawPlaceholder('Activity 5')}
function drawActivity6(){drawPlaceholder('Activity 6')}
function drawActivity7(){drawPlaceholder('Activity 7')}

function drawActivity8() {
    background(245, 240, 235);
    
    // Title
    fill(255, 150, 220);
    textSize(32);
    textAlign(CENTER);
    text('Reading List', width / 2, 50);
    
    fill(100);
    textSize(14);
    text('Scroll with MOUSE WHEEL or ARROW KEYS', width / 2, 85);
    
    // Scrollable content area
    drawReadingList();
    
    // Scroll indicator
    drawScrollBar();
    
    drawBackButton();
}

function drawPlaceholder(title){
    fill(50);
    textSize(32);
    textAlign(CENTER);
    text(title, width/2,50);
    drawBackButton();
}

// ===== SHARED =====
function initializeFloatingWords(){
    floatingWords=[createWord('left'),createWord('right')];
}

function createWord(side){
    let x=random()<0.3?random(100,width-100):(side==='left'?random(100,width*0.4):random(width*0.6,width-100));
    return {text:'',x:x,y:random(150,height-100),vx:random(-0.5,0.5),vy:random(-0.5,0.5),size:40,side:side};
}

function resetWordPositions(){
    floatingWords=[createWord('left'),createWord('right')];
}

function updateFloatingWords(){
    const pair=wordPairs[currentWordPair];
    for(let word of floatingWords){
        word.text=word.side==='left'?pair.left:pair.right;
        word.x+=word.vx;
        word.y+=word.vy;
        if(word.x<50||word.x>width-50)word.vx*=-1;
        if(word.y<120||word.y>height-50)word.vy*=-1;
    }
}

function displayFloatingWords(){
    for(let word of floatingWords){
        fill(50);
        textSize(word.size);
        textAlign(CENTER);
        text(word.text,word.x,word.y);
    }
}

function drawDottedLine(x1,y1,x2,y2){
    let d=dist(x1,y1,x2,y2);
    let steps=int(d/8);
    for(let i=0;i<steps;i++){
        let t=i/steps;
        lines.push({x:lerp(x1,x2,t),y:lerp(y1,y2,t),createdTime:millis(),lifetime:3000});
    }
}

function updateLines(){
    let now=millis();
    lines=lines.filter(l=>(now-l.createdTime)<l.lifetime);
}

function displayLines(){
    for(let l of lines){
        let age=millis()-l.createdTime;
        let a=map(age,0,3000,255,0);
        fill(255,150,100,a);
        noStroke();
        circle(l.x,l.y,6);
    }
}

function drawBackButton(){
    fill(50);
    rect(10,20,120,40);
    fill(255);
    textAlign(CENTER,CENTER);
    text('← Back',70,40);
}

function mousePressed(){
    if(currentPage==='home'){
        for(let s of sections){
            if(mouseX>s.x&&mouseX<s.x+s.w&&mouseY>s.y&&mouseY<s.y+s.h){
                openingDoor=s;
                doorProgress=0;
                return false;
            }
        }
    } else if(mouseX>10&&mouseX<130&&mouseY>20&&mouseY<60){
        currentPage='home';
        return false;
    }
}

function drawArtFrames() {
    let margin = 60;
    let topOffset = 120;
    let frameGap = 40;
    
    let frameW = (width - margin * 2 - frameGap) / 2;
    let frameH = (height - topOffset - 180 - frameGap) / 2;
    
    let positions = [
        { x: margin, y: topOffset, index: 0 },
        { x: margin + frameW + frameGap, y: topOffset, index: 1 },
        { x: margin, y: topOffset + frameH + frameGap, index: 2 },
        { x: margin + frameW + frameGap, y: topOffset + frameH + frameGap, index: 3 }
    ];
    
    for (let pos of positions) {
        drawFrame(pos.x, pos.y, frameW, frameH, pos.index);
    }
}

function drawFrame(x, y, w, h, frameIndex) {
    // Ornate frame border
    stroke(150, 120, 80);
    strokeWeight(3);
    fill(220, 200, 170);
    rect(x - 15, y - 15, w + 30, h + 30);
    
    fill(255);
    stroke(100);
    strokeWeight(2);
    rect(x, y, w, h);
    
    // Get current image for this frame
    let imgIndex = frameStates[frameIndex];
    let img = artImages[imgIndex % artImages.length];
    
    // Display image
    if (img) {
        image(img, x + 5, y + 5, w - 10, h - 10);
    }
    
    // Frame number indicator
    fill(50);
    textSize(12);
    textAlign(LEFT);
    text('Frame ' + (frameIndex + 1), x + 10, y - 25);
    
    // Image counter
    fill(100);
    textSize(11);
    textAlign(RIGHT);
    text((imgIndex % artImages.length) + 1 + ' / ' + artImages.length, x + w - 10, y - 25);
}

function drawFrameInstructions() {
    let instructionY = height - 100;
    
    fill(50);
    textSize(12);
    textAlign(CENTER);
    
    text('← LEFT ARROW: Previous Image', width / 4, instructionY);
    text('RIGHT ARROW →: Next Image', (3 * width) / 4, instructionY);
    
    text('↑ UP ARROW: Previous Frame | ↓ DOWN ARROW: Next Frame', width / 2, instructionY + 25);
    
    // Current frame highlight
    fill(100, 150, 255);
    text('Current Frame: ' + (currentFrame + 1), width / 2, instructionY + 50);
}

function drawReadingList() {
    let x = 60;
    let y = 120;
    let lineHeight = 28;
    let maxWidth = width - 120;
    
    // Calculate total scroll height
    maxScroll = readingList.length * lineHeight - (height - 250);
    if (maxScroll < 0) maxScroll = 0;
    
    // Clamp scroll offset
    scrollOffset = constrain(scrollOffset, 0, maxScroll);
    
    // Set up clipping region for scrollable area
    push();
    
    // Use clip with a function callback for p5.js
    clip(() => {
        rect(60, 110, width - 120, height - 200);
    });
    
    let currentY = y - scrollOffset;
    
    for (let i = 0; i < readingList.length; i++) {
        let entry = readingList[i];
        
        // Wrap long text
        let lines = wrapText(entry, maxWidth);
        
        for (let line of lines) {
            fill(50);
            textSize(12);
            textAlign(LEFT, TOP);
            text(line, x, currentY);
            currentY += lineHeight * 0.8;
        }
        
        // Add spacing between entries
        currentY += lineHeight * 0.4;
    }
    
    pop();
}

function wrapText(text, maxWidth) {
    let words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        let w = textWidth(testLine);
        
        if (w > maxWidth) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) lines.push(currentLine);
    return lines;
}

function drawScrollBar() {
    let barX = width - 20;
    let barY = 120;
    let barHeight = height - 200;
    
    // Background track
    stroke(200);
    strokeWeight(2);
    line(barX, barY, barX, barY + barHeight);
    
    // Scroll thumb
    if (maxScroll > 0) {
        let thumbHeight = (barHeight / (readingList.length * 28)) * barHeight;
        let thumbY = barY + (scrollOffset / maxScroll) * (barHeight - thumbHeight);
        
        fill(100, 150, 255);
        noStroke();
        rect(barX - 5, thumbY, 10, thumbHeight);
    }
}

function mouseWheel(event) {
    if (currentPage === 'activity8') {
        scrollOffset += event.delta * 0.5;
        return false;
    }
}

function keyPressed() {
    // ACTIVITY 2: Art Gallery
    if (currentPage === 'activity2') {
        if (key === 'ArrowLeft') {
            frameStates[currentFrame]--;
            if (frameStates[currentFrame] < 0) {
                frameStates[currentFrame] = artImages.length - 1;
            }
            return false;
        } 
        else if (key === 'ArrowRight') {
            frameStates[currentFrame]++;
            return false;
        } 
        else if (key === 'ArrowUp') {
            currentFrame--;
            if (currentFrame < 0) currentFrame = 3;
            return false;
        } 
        else if (key === 'ArrowDown') {
            currentFrame++;
            if (currentFrame > 3) currentFrame = 0;
            return false;
        }
    }
    
    // ACTIVITY 8: Reading List
    else if (currentPage === 'activity8') {
        if (key === 'ArrowDown') {
            scrollOffset += 40;
            return false;
        } else if (key === 'ArrowUp') {
            scrollOffset -= 40;
            return false;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initializeSections();
    activityInitialized = false;
    lines = [];
    frameStates = [0, 0, 0, 0]; // Reset frame states
    currentFrame = 0;
}