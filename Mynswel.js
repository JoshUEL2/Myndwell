document.addEventListener('DOMContentLoaded', () => {
    // ========== Get the wrapper for the hidden content ==========
    const hackerContentWrapper = document.getElementById('hacker-content-wrapper');
    // Ensure the hacker content is completely hidden on page load
    hackerContentWrapper.style.display = 'none';

    // ========== SHARED DATA & CONSTANTS ==========
    const BIRTH_YEAR = 1995; // Set a constant birth year for the "Human"
    const characterDetails = {
        human: { title: "The Human (The Host)", desc: "Volunteered for REM after a profound personal trauma where he was falsely accused of murder and abandoned by everyone. He starts content and emotionally numb but grows suspicious as glitches appear in his reality. His journey, depending on the Janitor's choices, is one of dawning horror and realizing his peace is a manufactured lie." },
        claire: { title: "\"Claire\" (The Therapist)", desc: "The Human's friendly, comforting contact from Myndwell. She embodies corporate wellness with a fake smile, dismissing the Human's concerns as part of the 'healing process,' a polished marketing face for a horrific procedure." },
        carrie: { title: "Carrie Mynd (The CEO)", desc: "The middle-aged CEO of Myndwell and great-granddaughter of its founder. She is a figurehead who all Partitions have been programmed to revere, creating a cult-like devotion within the system she oversees." },
        janitor: { title: "The Janitor (Partition-09)", desc: "A perfect psychological duplicate of the Host, created with an unprecedented level of self-awareness to handle the Host's uniquely complex trauma. He was meant to be a tool but believes he is a person. He resists out of self-preservation and a moral drive, knowing the Host is innocent." },
        artist: { title: "The Artist (Partition-04)", desc: "A creative Partition that designs the new, propaganda-filled replacement memories. Where the Janitor performs the manual labor of 'scrubbing,' the Artist masterfully weaves in Myndwell-approved narratives. Can be turned into an ally who helps craft 'counter-propaganda' to wake the Human." },
        monitors: { title: "The Monitors (The Enforcers)", desc: "Algorithmic police who maintain order within the dreamscape. They appear as abstract white figures, delivering orders in calm corporate tones like, 'Trauma is corrosive. You are soap. Scrub until clean,' before distorting into terrifying glitches when resisted. They are the unthinking, oppressive force of the REM protocol." },
        overseer: { title: "The Overseer (The A.I.)", desc: "The master A.I. of the REM chip, manifesting as a serene, clinical face on screens (including the main menu). It is the bridge between the chip's protocol and the Janitor, a guide that is also a gatekeeper, training itself to better control the mind." }
    };
    const firstNames = ["Olivia", "Liam", "Emma", "Noah", "Amelia", "Oliver", "Ava", "Elijah", "Sophia", "Mateo"];
    const lastNames = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];
    const petNames = ["Buddy", "Lucy", "Max", "Bella", "Charlie", "Luna", "Cooper", "Daisy", "Milo", "Sadie"];
    const heirloomItems = ["grandfather clock", "porcelain doll", "music box", "crystal vase", "set of silverware", "wedding ring"];
    const relationshipTypes = ["mother", "father", "grandmother", "grandfather", "aunt", "uncle", "sibling"];

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomDate = (startYear, endYear) => {
        const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        return { date: `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`, year: year };
    };
    const levelData = [
        { id: 1, memory: "The Slip", dream: "Giant, melting cake towers. Laughter echoes into screams.", mechanic: "Basic Cleansing: Learn to scrub reality." },
        { id: 2, memory: "The Broken Vase", dream: "Shards of glass suspended in mid-air as the room folds in on itself.", mechanic: "Re-shaping Memories: 'Glue' fragments." },
        { id: 3, memory: "The Lost Pet", dream: "Endless, empty fields with echoing barks.", mechanic: "Twist: First encounter with a fully fabricated memory." },
        { id: 4, memory: "The Fire", dream: "Molten oil colors and flickering paint that melts and drips.", mechanic: "Discovery: Propaganda for fire insurance is inserted." },
        { id: 5, memory: "The Hospital Bed", dream: "A bleached white void where the Human briefly becomes aware.", mechanic: "Janitor can attempt first communication." },
        { id: 6, memory: "The First Lie", dream: "A massive courtroom made of crayon, with paper-cut judges.", mechanic: "Narrative: The Janitor experiences a complex emotion." },
        { id: 7, memory: "The Mirror Room", dream: "An empty white gallery where framed pictures of fake events appear.", mechanic: "Goal: Uncover the fake by finding its seams." },
        { id: 8, memory: "The Apartment", dream: "A time-looping apartment that slowly degrades with broken clocks.", mechanic: "Twist: The Janitor begins to feel the Human's emotions directly." },
        { id: 9, memory: "The Lab", dream: "A split perspective. The Human explores the space in the past, the Janitor in the present.", mechanic: "The Human can leave a note for the Janitor to find." },
        { id: 10, memory: "The Root Memory", dream: "A fragmented chaos of all previous levels swirling into one another.", mechanic: "The Final Choice is made here." }
    ];
    const endingDetails = [
        { range: [0, 4], title: "Bad Ending: 'Cleansed'", desc: "The Janitor is deleted. The Human is 'healed,' but now a hollow, compliant vessel for Myndwell's propaganda.", color: { dark: '#3b82f6' } },
        { range: [5, 5], title: "Split Ending: 'Takeover'", desc: "The system crashes. The Janitor's consciousness takes over the body. He is free, but has taken another's life to do it.", color: { dark: '#a855f7' } },
        { range: [6, 10], title: "Good Ending: 'Reform'", desc: "The Janitor and Human merge back into one whole being. They expose Myndwell's plot. The Janitor is gone, but the Human is truly free.", color: { dark: '#dc2626' } }
    ];

    const gameplayLoopData = {
        1: {
            janitor: "You stand in a distorted birthday hall with melting cake towers. A dark, sticky stain, pulsing with shame, covers the floor.",
            cleanse: { j: "You scrub the stain. The cake solidifies, the colors brighten, and a Myndwell jingle faintly plays.", h: "You feel a wave of inexplicable joy, remembering a perfect birthday. You absentmindedly hum the jingle for 'Zing!' soda." },
            resist: { j: "You ignore the stain. The cake melts faster, the room darkens, and the sound of a child's laughter warps into a scream.", h: "A sudden, sharp pang of embarrassment hits you, but you can't place why. You feel clumsy." }
        },
        2: {
            janitor: "The air is thick with the dust of a shattered heirloom. Fragments of a porcelain vase hang suspended in the air.",
            cleanse: { j: "You carefully reassemble the vase with glowing light. It becomes whole, now bearing the Myndwell logo.", h: "You admire a corporate art piece on your mantle, feeling a sense of pride in its clean, modern design." },
            resist: { j: "You touch a shard. The room violently folds in on itself as a voice whispers, 'Careless!'", h: "Your hand trembles as you pick up a glass. A fleeting image of your grandmother's disappointed face flashes in your mind." }
        },
        3: {
            janitor: "You walk an endless, empty field under a grey sky. A lonely bark echoes. A dark patch of earth pulses with guilt.",
            cleanse: { j: "You scrub the patch. It turns into a pristine flowerbed. A new, fabricated memory of a happy, branded pet toy appears in your hand.", h: "You smile, thinking of the 'MyndPet' companion bot you had as a child. It never ran away." },
            resist: { j: "You approach the patch. The barking becomes frantic, filled with panic. The ground beneath you feels like it's sinking.", h: "A profound sense of loss washes over you. You look at your hands, feeling like you forgot something important." }
        },
        4: {
            janitor: "The memory is hot. The smell of smoke hangs in the air. A neighbor's house is a canvas of dripping, fiery paint.",
            cleanse: { j: "You paint over the flames with cool, calming blue. The house reforms, pristine. A Myndwell Home Security ad is now visible on the mailbox.", h: "You feel secure in your home, double-checking the locks. You make a mental note to renew your Myndwell insurance policy." },
            resist: { j: "You watch the flames. The heat intensifies, and screams are audible within the paint. The Monitors flicker into view, their faces flat and judging.", h: "A spike of anxiety. You smell smoke for a moment, then it's gone. You dismiss it as your imagination." }
        },
        5: {
            janitor: "A sterile, bleached-white hospital room. The rhythmic beeping of a heart monitor is the only sound. A figure in the bed is barely visible.",
            cleanse: { j: "You clean a tear stain from the floor. The beeping fades into a calming ambient tone. The room feels peaceful, like a spa.", h: "You remember the Myndwell 'Grief-Free' package you purchased. A feeling of calm acceptance settles over you. It was for the best." },
            resist: { j: "You reach for the figure's hand. For a moment, you see the Human's face in the reflection of the monitor, terrified. The Overseer's voice booms: 'Anomaly Detected.'", h: "A nightmare. You wake in a cold sweat, your heart pounding. You feel a presence in the room, then it vanishes. You call Claire in the morning." }
        },
        6: {
            janitor: "A surreal courtroom made of crayon drawings and paper-cutout figures. A large, accusing eye hangs in the sky, weeping ink.",
            cleanse: { j: "You paint over the crying eye with a smiley face sticker. The paper judges nod in approval. The room is filled with the scent of 'compliance-flavored' bubblegum.", h: "You feel a sense of vindication about a past argument. You were right all along. It's good to be agreeable." },
            resist: { j: "You stand before the eye, refusing to alter it. The ink rains down, staining you. The paper judges' faces turn into your own, twisted in guilt.", h: "You have a sudden, intense argument with a coworker over nothing. You feel irrationally defensive and angry, then deeply ashamed." }
        },
        7: {
            janitor: "An art gallery of memories. All the frames show the Human in happy, branded moments, but one picture has a 'seam'—a flickering glitch.",
            cleanse: { j: "You 'paint' over the seam, stabilizing the fake memory. The gallery becomes brighter, the music more pleasant. A new ad for Myndwell appears on the wall.", h: "You scroll through your social media, feeling happy and connected. All your memories are perfect. All your friends are smiling." },
            resist: { j: "You peel back the seam. Behind it is the raw, terrifying memory of the real event. The Monitors descend instantly, their forms glitching violently.", h: "Déjà vu. You walk past a cafe and could swear you've been there with someone, but you can't remember who. The feeling is unsettling." }
        },
        8: {
            janitor: "You are in the Human's apartment, stuck in a time loop. With each loop, the room decays further, clocks melting off the walls.",
            cleanse: { j: "You reset the clocks and clean the decay. The room stabilizes into a pristine, minimalist Myndwell-approved living space. It feels clean, but sterile.", h: "You have an incredibly productive day. Your apartment is spotless. Your mind is clear. You feel nothing, and it's wonderful." },
            resist: { j: "You let the decay spread. You begin to feel the crushing weight of the Human's depression, a lead blanket on your consciousness. The air grows thick.", h: "A day of crushing lethargy. You can't get out of bed. The walls feel like they're closing in. You don't know why." }
        },
        9: {
            janitor: "You see the Myndwell lab through the Human's eyes in the past as he signs the consent forms. Then you're there in the present, alone.",
            cleanse: { j: "You find the consent form and 'reinforce' the signature with glowing paint, strengthening the Human's belief in his choice.", h: "You look at your REM Procedure brochure and feel a surge of gratitude for Myndwell. They saved you. You made the right choice." },
            resist: { j: "You find a note the Human subconsciously left for himself: 'Don't trust Claire.' You try to preserve it, but the Monitors burn it to ash.", h: "You're on the phone with Claire and a sudden, inexplicable wave of distrust washes over you. Her voice sounds hollow, scripted." }
        },
        10: {
            janitor: "The Root Memory. A chaotic swirl of all previous levels. At the center is a pulsating orb of pure trauma—the false accusation.",
            cleanse: { j: "You pour all your energy into scrubbing the orb. It shrinks, cools, and becomes a placid, glowing Myndwell logo. The Void goes silent. You feel... empty. You begin to fade.", h: "Final acceptance. The accusation never happened. You were never hurt. You are healed. You are whole. You are Myndwell." },
            resist: { j: "You protect the orb. The entire system crashes around you. The Overseer screams as you and the Human are thrown together, seeing each other in a shattered reflection for the first time.", h: "The final choice. A flash of pure, undiluted truth. You remember everything. The pain, the injustice. You are broken, but you are real. What now?" }
        }
    };

    // ========== DOM ELEMENTS & State ==========
    const body = document.getElementById('body');
    const navbar = document.getElementById('navbar');
    const myndwellNav = document.getElementById('nav-links-myndwell');
    const remNav = document.getElementById('nav-links-rem');
    const heroBg = document.querySelector('.hero-bg');
    const glitchOverlay = document.querySelector('.glitch-overlay');
    const allGlitchTargets = document.querySelectorAll('.glitch-target');
    const myndwellLogo = document.getElementById('myndwell-logo');
    const remTitle = document.getElementById('rem-title');
    let premiseTyped = false;
    let hasSeenStickerbomb = false;


    // ========== MODAL & HACKER TRANSITION LOGIC ==========
    
    // --- Modal Handling ---
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const contactModal = document.getElementById('contact-modal');
    
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    const contactLink = document.getElementById('contact-link');
    
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    const overlays = document.querySelectorAll('.modal-overlay');

    const openModal = (modal) => {
        if (modal) modal.classList.add('visible');
    };
    
    const closeModal = (modal) => {
        if (modal) modal.classList.remove('visible');
    };

    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(privacyModal);
    });
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(termsModal);
    });
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(contactModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal'));
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeModal(overlay.closest('.modal'));
        });
    });

    // --- Hacker Transition Handling ---
    const mainFooter = document.getElementById('main-footer');
    const hackerPopup = document.getElementById('hacker-popup');
    const breachButton = document.getElementById('breach-button');
    const fullpageGlitchOverlay = document.getElementById('fullpage-glitch-overlay');
    let hackerPopupShown = false;
    
    const hackerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hackerPopupShown) {
                hackerPopupShown = true;
                setTimeout(() => {
                    hackerPopup.classList.add('visible');
                }, 3000); // 3-second delay
            }
        });
    }, { threshold: 0.8 });

    hackerObserver.observe(mainFooter);

    breachButton.addEventListener('click', () => {
        hackerPopup.classList.remove('visible');
        fullpageGlitchOverlay.classList.add('active');

        setTimeout(() => {
            fullpageGlitchOverlay.classList.remove('active');
            hackerContentWrapper.style.display = 'block';
            
            // Re-initialize the abyss canvas now that it's visible
            setupAbyss();

            const digitalAbyss = document.getElementById('digital-abyss');
            if (digitalAbyss) {
                digitalAbyss.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400); 
    });


    // ========== SCROLL-BASED & GLITCH LOGIC ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

    function glitchWord(element) {
        if (element.classList.contains('glitching')) return;
        const words = JSON.parse(element.dataset.glitchWords);
        const originalWord = words[0];
        let currentIndex = 1;
        element.classList.add('glitching');
        element.setAttribute('data-text', words[currentIndex]);
        element.innerText = words[currentIndex];

        const interval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= words.length) {
                currentIndex = 1;
            }
            element.innerText = words[currentIndex];
            element.setAttribute('data-text', words[currentIndex]);
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            element.innerText = originalWord;
            element.classList.remove('glitching');
        }, 300 + Math.random() * 200);
    }

    setInterval(() => {
        glitchWord(document.getElementById('hero-glitch-word'));
    }, 10000);


    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // If the hacker content isn't visible yet, don't run the scroll logic for it.
                if (hackerContentWrapper.style.display !== 'none') {
                    const finalSection = document.querySelector('.final-section');
                    if (!finalSection) {
                        ticking = false;
                        return;
                    }
                    const finalSectionTop = finalSection.offsetTop;
                    if (scrollY > finalSectionTop - window.innerHeight) {
                        myndwellLogo.classList.add('hidden');
                        remTitle.classList.remove('hidden');
                        navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
                        myndwellNav.classList.add('hidden');
                        myndwellNav.classList.remove('md:flex');
                        remNav.classList.remove('hidden');
                        remNav.classList.add('md:flex');
                    } else {
                        myndwellLogo.classList.remove('hidden');
                        remTitle.classList.add('hidden');
                        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        myndwellNav.classList.remove('hidden');
                        myndwellNav.classList.add('md:flex');
                        remNav.classList.add('hidden');
                        remNav.classList.remove('md:flex');
                    }
                    const abyssSection = document.getElementById('digital-abyss');
                    const heroSection = document.getElementById('hero');
                    const heroHeight = heroSection.offsetHeight;
                    const scrollPercentage = Math.max(0, scrollY - heroHeight) / (finalSectionTop - heroHeight - abyssSection.offsetHeight);
                    if (scrollY > heroHeight && scrollY < finalSectionTop) {
                        const opacity = Math.min((scrollPercentage - 0.4) * 2.5, 0.4);
                        glitchOverlay.style.display = 'block';
                        glitchOverlay.style.opacity = opacity;
                        heroBg.style.filter = `blur(${opacity * 15}px)`;
                    } else {
                        glitchOverlay.style.display = 'none';
                        heroBg.style.filter = 'none';
                    }
                }

                allGlitchTargets.forEach(target => {
                    const rect = target.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const intensity = 1 - (rect.top / window.innerHeight);
                        if(Math.random() < intensity * 0.015) {
                            if(!target.classList.contains('glitching') && target.id !== 'hero-glitch-word') {
                                glitchWord(target);
                            }
                        }
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ========== GAME BIBLE LOGIC ==========
    const navLinks = document.querySelectorAll('.nav-item');
    const contentPanes = document.querySelectorAll('.content-pane');
    
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = "";
        element.style.display = 'block';
        element.classList.remove('typing-done');
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-done');
                if (callback) callback();
            }
        }
        type();
    }

    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            const details = characterDetails[card.dataset.char];
            const isDream = card.classList.contains('dream-card');
            const targetPane = isDream ? document.getElementById('char-detail-dream') : document.getElementById('char-detail-waking');
            const textColor = isDream ? 'text-gray-300' : 'text-gray-400';
            targetPane.innerHTML = `<h4 class="font-bold text-lg text-gray-200 ${isDream ? 'font-lora' : ''}">${details.title}</h4><p class="mt-2 text-sm ${textColor} ${isDream ? 'font-lora' : ''}">${details.desc}</p>`;
        });
    });

    // Testimonial Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    if (testimonialCards.length > 0) {
        testimonialCards[0].classList.add('active');
        testimonialCards[0].classList.remove('hidden');
        testimonialCards[0].style.opacity = 1;

        setInterval(() => {
            testimonialCards[currentTestimonial].style.opacity = 0;
            setTimeout(() => {
                testimonialCards[currentTestimonial].classList.remove('active');
                testimonialCards[currentTestimonial].classList.add('hidden');
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                testimonialCards[currentTestimonial].classList.remove('hidden');
                testimonialCards[currentTestimonial].classList.add('active');
                setTimeout(() => {
                    testimonialCards[currentTestimonial].style.opacity = 1;
                }, 50)
            }, 1000);
        }, 6000);
    }

    // Chart.js Logic for Mechanics
    const slider = document.getElementById('resistance-slider');
    const endingDesc = document.getElementById('ending-description');
    const endingsChartCanvas = document.getElementById('endings-chart');
    let endingsChart;

    function updateEndingUI(resistance) {
        const compliance = 10 - resistance;
        const detail = endingDetails.find(d => resistance >= d.range[0] && resistance <= d.range[1]);
        if (endingDesc) {
            endingDesc.innerHTML = `<h4 class="font-bold text-lg text-gray-200">${detail.title}</h4><p class="text-sm mt-1 text-gray-400">${detail.desc}</p>`;
        }
        if (endingsChart) {
            endingsChart.data.datasets[0].data = [compliance, resistance];
            endingsChart.data.datasets[0].backgroundColor = ['#a5b4fc', detail.color.dark];
            endingsChart.update();
        }
    }
    function createChart() {
        if (!endingsChartCanvas) return;
        const endingsChartCtx = endingsChartCanvas.getContext('2d');
        endingsChart = new Chart(endingsChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Compliance', 'Resistance'],
                datasets: [{
                    data: [5, 5],
                    backgroundColor: ['#a5b4fc', '#c084fc'],
                    borderColor: '#1f2937',
                    borderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#d1d5db',
                            boxWidth: 12,
                            padding: 20,
                            font: { family: "'Inter', sans-serif" }
                        }
                    },
                    tooltip: { enabled: true }
                }
            }
        });
        updateEndingUI(5);
    }
    if (slider) {
        slider.addEventListener('input', (e) => updateEndingUI(parseInt(e.target.value)));
    }

    const mechanicsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!endingsChart) {
                    createChart();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    const mechanicsSection = document.getElementById('mechanics');
    if (mechanicsSection) {
        mechanicsObserver.observe(mechanicsSection);
    }

    const levelTimelineContainer = document.getElementById('level-timeline');
    if (levelTimelineContainer) {
        levelData.forEach(level => {
            const item = document.createElement('div');
            item.className = 'timeline-item relative'; item.dataset.level = level.id;
            item.innerHTML = `<div class="timeline-dot absolute -left-[33px] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full transition-all"></div><div class="p-4 rounded-lg cursor-pointer bg-gray-800 border border-transparent hover:border-gray-600"><p class="font-bold text-sm text-gray-200">Level ${level.id}</p><p class="text-gray-400">${level.memory}</p></div>`;
            levelTimelineContainer.appendChild(item);
            item.addEventListener('click', () => updateLevelDetails(level.id));
        });
    }
    function updateLevelDetails(levelId) {
        const level = levelData.find(l => l.id === levelId);
        let wakingDescHTML = "";
        let dateInfo, ageAtIncident;

        switch(level.id) {
            case 1: dateInfo = getRandomDate(2001, 2003); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> Slipped on spilled soda at birthday party for friend, ${getRandomItem(firstNames)}.</div>`; break;
            case 2: dateInfo = getRandomDate(2005, 2007); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> Accidentally broke grandmother's prized ${getRandomItem(heirloomItems)} while playing indoors.</div>`; break;
            case 3: dateInfo = getRandomDate(2008, 2010); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">SUBJECT:</span> Family golden retriever, "${getRandomItem(petNames)}"</div><div><span class="text-indigo-400">INCIDENT:</span> Pet escaped after host left back gate ajar. Memory is associated with intense guilt.</div>`; break;
            case 4: dateInfo = getRandomDate(2000, 2002); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> Witnessed neighbor's house fire from bedroom window. Associated with parental distress.</div>`; break;
            case 5: dateInfo = getRandomDate(2018, 2020); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> Sat by the hospital bed of dying ${getRandomItem(relationshipTypes)}. Feelings of helplessness are prominent.</div>`; break;
            case 6: dateInfo = getRandomDate(2004, 2006); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> To avoid punishment, host blamed a broken window on neighborhood friend, ${getRandomItem(firstNames)} ${getRandomItem(lastNames)}. The lie was never discovered.</div>`; break;
            case 7: 
                wakingDescHTML = `<div><span class="text-red-500">DATE:</span> N/A</div><div><span class="text-red-500">SUBJECT AGE:</span> N/A</div><div><span class="text-red-500">INCIDENT:</span> Memory is a Myndwell fabrication. Host is shown enjoying 'Zing!' soda at a pristine, futuristic park.</div>`; break;
            case 8: dateInfo = getRandomDate(2023, 2024); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> A period of intense depression. Host isolated himself in his apartment for several weeks, neglecting work and relationships.</div>`; break;
            case 9: dateInfo = getRandomDate(2024, 2025); ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-indigo-400">DATE:</span> ${dateInfo.date}</div><div><span class="text-indigo-400">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-indigo-400">INCIDENT:</span> Initial consultation at Myndwell. Spoke with therapist "Claire." Signed consent forms for the REM procedure.</div>`; break;
            case 10: dateInfo = { year: 2024 }; ageAtIncident = dateInfo.year - BIRTH_YEAR;
                wakingDescHTML = `<div><span class="text-red-500">DATE:</span> ${dateInfo.year}</div><div><span class="text-red-500">SUBJECT AGE:</span> ${ageAtIncident}</div><div><span class="text-red-500">INCIDENT:</span> CORE TRAUMA. Social gathering. An argument. Fractured, chaotic sensory data. Ends with discovery of a body and accusations from friends.</div>`; break;
            default:
                wakingDescHTML = "Details of this memory are currently inaccessible."
        }

        const wakingDetail = document.getElementById('level-detail-waking');
        const dreamDetail = document.getElementById('level-detail-dream');
        if (level && wakingDetail && dreamDetail) {
            wakingDetail.innerHTML = `<h3 class="text-sm font-bold uppercase tracking-widest text-indigo-400">The Real Memory</h3><h4 class="text-2xl font-bold mt-4 text-white">${level.memory}</h4><div class="mt-4 text-left text-gray-300 font-mono text-sm space-y-2">${wakingDescHTML}</div>`;
            dreamDetail.innerHTML = `<div class="content-section"><h3 class="text-sm font-bold uppercase tracking-widest text-red-400">The Dreamscape</h3><h4 class="text-2xl font-bold font-lora mt-4">${level.dream}</h4><p class="mt-4 text-gray-400 font-bold">Mechanic / Twist:</p><p class="text-gray-300 font-lora italic">${level.mechanic}</p></div>`;
            document.querySelectorAll('.timeline-item').forEach(item => item.classList.toggle('active', parseInt(item.dataset.level) === levelId));
        }
    }
    // Logic for Key Terminology Glossary
    const termButtonsContainer = document.getElementById('term-buttons-container');
    const termDisplay = document.getElementById('term-display');
    const terms = {
        "Partition": "A subconscious construct created by the REM chip. Different Partitions have different roles (Janitor, Artist, etc.).",
        "Cleansing": "The process of rewriting a traumatic memory to remove its negative emotional charge, often replacing it with a falsified, pleasant event containing propaganda.",
        "The Void": "The dark, dripping, oil-painted chamber where the Janitor resides while the Human is awake. It contains two massive monitors that function as the Human's eyes.",
        "Dream-Time": "Time within the REM dreamscape is nonlinear. A single night of sleep can feel like an eternity for a Partition, a tool Myndwell uses to enforce compliance through endless loops.",
        "Somatic Split": "Myndwell's clinical term for the procedure of painlessly separating the conscious self from the dream-consciousness during REM sleep.",
        "Neuropattern Engineering": "The hidden agenda of REM. Myndwell doesn't just heal trauma; they reshape memories to embed consumer preferences and ideological compliance.",
        "The Anomaly": "An unofficial designation for a Partition that exhibits unexpected levels of sentience or resistance. Partition-09, the Janitor, is the first of his kind.",
        "Recalibration": "A forced 'reboot' performed by Harmonizers on deviant Partitions. It's a painful process designed to erase burgeoning self-awareness and restore loyalty.",
        "Psychological Immune System": "The brain's natural defense against foreign data that conflicts with its core identity. It's why a 'trusted user' like a Partition is needed to make changes from within.",
        "The Janus Protocol": "A top-secret Myndwell protocol that justifies the creation of highly sentient Partitions for uniquely complex trauma, acknowledging the risk that the 'key' might one day turn the lock itself."
    };

    function setupTermButtons() {
        if (!termButtonsContainer) return;
        termButtonsContainer.innerHTML = '';
        Object.keys(terms).forEach(term => {
            const button = document.createElement('button');
            button.className = "term-button px-6 py-3 bg-gray-600 text-gray-100 font-semibold rounded-full shadow-md hover:bg-gray-500 reveal-button";
            button.dataset.term = term;
            button.textContent = term;
            button.addEventListener('click', () => {
                termDisplay.textContent = terms[term] || "Definition not found.";
                termButtonsContainer.querySelectorAll('.term-button').forEach(btn => {
                    btn.classList.remove('bg-blue-700', 'text-white');
                    btn.classList.add('bg-gray-600', 'text-gray-100');
                });
                button.classList.remove('bg-gray-600', 'text-gray-100');
                button.classList.add('bg-blue-700', 'text-white');
            });
            termButtonsContainer.appendChild(button);
        });
    }

    // Logic for Myndwell Corporate Phrases Rotator
    const phrases = [
        "Your trauma is our burden now.", "A clean mind is a compliant mind.", "Because You Deserve Peace.",
        "Peace of mind comes at a cost.", "You don’t remember the truth. Just the clean version we installed.", "Wake lighter. Live brighter. With Myndwell."
    ];
    let currentPhraseIndex = 0;
    const phraseDisplay = document.getElementById('phrase-display');
    const prevPhraseBtn = document.getElementById('prev-phrase');
    const nextPhraseBtn = document.getElementById('next-phrase');

    function updatePhraseDisplay() {
        if (phraseDisplay) {
            phraseDisplay.style.opacity = 0;
            setTimeout(() => {
                phraseDisplay.textContent = phrases[currentPhraseIndex];
                phraseDisplay.style.opacity = 1;
            }, 200);
        }
    }
    if (nextPhraseBtn) {
        nextPhraseBtn.addEventListener('click', () => {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            updatePhraseDisplay();
        });
    }
    if (prevPhraseBtn) {
        prevPhraseBtn.addEventListener('click', () => {
            currentPhraseIndex = (currentPhraseIndex - 1 + phrases.length) % phrases.length;
            updatePhraseDisplay();
        });
    }

    // ===== UNIVERSAL EXPANDABLE CARD SCRIPT =====
    function initializeExpandableCards() {
        document.querySelectorAll('.expandable-card').forEach(card => {
            const button = card.querySelector('.expandable-toggle');
            if (!button) return;
            const content = card.querySelector('.expandable-content');
            const icon = button.querySelector('.toggle-icon');

            button.addEventListener('click', () => {
                if (!content || !icon) return;
                const isHidden = content.classList.contains('hidden');
                content.classList.toggle('hidden');
                icon.textContent = isHidden ? '−' : '+';
            });
        });
    }

    // ===== HIERARCHY & REDACTED CARD SCRIPT =====
    function randomizeRedactedNames() {
        const redactedSpans = document.querySelectorAll('.redacted-partition-name');
        const chars = 'ABCDEF0123456789';
        redactedSpans.forEach(span => {
            let randomId = 'Partition-';
            randomId += chars.charAt(Math.floor(Math.random() * chars.length));
            randomId += chars.charAt(Math.floor(Math.random() * chars.length));
            span.textContent = randomId;
        });
    }

    document.querySelectorAll('[data-redacted-card]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const stickerbomb = document.getElementById('stickerbomb-overlay');
            stickerbomb.classList.add('visible');
            setTimeout(() => {
                stickerbomb.classList.remove('visible');
            }, 2500);
        });
    });
    
    // ===== GAMEPLAY LOOP INTERACTIVITY =====
    function setupGameplayLoop() {
        const levelSelector = document.querySelector('#gameplay-loop-container .level-selector');
        const loopDisplay = document.getElementById('loop-display');
        if (!levelSelector || !loopDisplay) return;

        levelData.forEach(level => {
            const button = document.createElement('button');
            button.className = 'loop-level-btn px-4 py-2 bg-gray-700 text-gray-300 rounded-md font-semibold whitespace-nowrap';
            button.textContent = `Level ${level.id}`;
            button.dataset.levelId = level.id;
            levelSelector.appendChild(button);
        });

        levelSelector.addEventListener('click', (e) => {
            if (e.target.matches('.loop-level-btn')) {
                const levelId = e.target.dataset.levelId;
                displayLoopForLevel(levelId);
                levelSelector.querySelectorAll('.loop-level-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        const firstButton = levelSelector.querySelector('.loop-level-btn');
        if (firstButton) {
            firstButton.classList.add('active');
            displayLoopForLevel(1);
        }
    }

    function displayLoopForLevel(levelId) {
        const loopData = gameplayLoopData[levelId];
        const levelInfo = levelData.find(l => l.id == levelId);
        const loopDisplay = document.getElementById('loop-display');
        if (!loopDisplay || !loopData || !levelInfo) return;

        const contentHTML = `
            <h3 class="text-2xl font-bold text-white text-center mb-4">${levelInfo.memory}</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 class="text-xl font-bold text-red-400 font-lora mb-2">The Janitor's Path</h4>
                    <p class="text-gray-300 mb-4">${loopData.janitor}</p>
                    <div class="flex gap-4">
                        <button class="choice-btn flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" data-choice="cleanse" data-level="${levelId}">Choose to Cleanse</button>
                        <button class="choice-btn flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-choice="resist" data-level="${levelId}">Choose to Resist</button>
                    </div>
                    <div id="janitor-consequence" class="consequence-box mt-4 p-3 bg-gray-900 rounded min-h-[80px] opacity-0"></div>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 class="text-xl font-bold text-indigo-400 mb-2">The Human's Reality</h4>
                    <div id="human-consequence" class="consequence-box p-3 bg-gray-900 rounded min-h-[160px] flex items-center justify-center opacity-0">
                       <p class="italic text-gray-500">Make a choice to see the consequence...</p>
                    </div>
                </div>
            </div>`;
        loopDisplay.innerHTML = contentHTML;

        loopDisplay.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = e.target.dataset.choice;
                const level = e.target.dataset.level;
                const janitorBox = document.getElementById('janitor-consequence');
                const humanBox = document.getElementById('human-consequence');

                janitorBox.style.opacity = 0;
                humanBox.style.opacity = 0;

                setTimeout(() => {
                    janitorBox.innerHTML = `<p class="text-sm">${gameplayLoopData[level][choice].j}</p>`;
                    humanBox.innerHTML = `<p class="text-lg italic text-gray-200">"${gameplayLoopData[level][choice].h}"</p>`;
                    janitorBox.style.opacity = 1;
                    humanBox.style.opacity = 1;
                }, 300);
            });
        });
    }

    // ===== NARRATIVE PATH VISUALIZER SCRIPT =====
    function setupNarrativeVisualizer() {
        const timeline = document.getElementById('path-timeline');
        if (!timeline) return;

        let pathHTML = '';
        for (let i = 1; i <= 10; i++) {
            pathHTML += `
                <div class="path-node" id="path-node-${i}" data-level="${i}">
                    <div class="node-choices flex gap-2 mb-1">
                         <button data-choice="cleanse" title="Cleanse" class="path-choice-btn rounded-full bg-blue-600 hover:bg-blue-500 disabled:hover:bg-blue-600 text-white font-black">C</button>
                         <button data-choice="resist" title="Resist" class="path-choice-btn rounded-full bg-red-600 hover:bg-red-500 disabled:hover:bg-red-600 text-white font-black">R</button>
                    </div>
                    <div class="node-circle rounded-full"></div>
                    <div class="node-label mt-1">LVL ${i}</div>
                </div>`;
            if (i < 10) {
                pathHTML += `<div class="path-connector"></div>`;
            }
        }
        timeline.innerHTML = pathHTML;

        let choices = Array(10).fill(null);
        
        const updateVisualizerState = () => {
            const cleanseCount = choices.filter(c => c === 'cleanse').length;
            const resistCount = choices.filter(c => c === 'resist').length;
            const totalChoices = choices.filter(c => c !== null).length;
            
            const complianceBar = document.getElementById('compliance-bar');
            const resistanceBar = document.getElementById('resistance-bar');
            if(complianceBar) complianceBar.style.width = `${cleanseCount * 10}%`;
            if(resistanceBar) resistanceBar.style.width = `${resistCount * 10}%`;
            
            const resultDisplay = document.getElementById('path-result');
            let ending, textColor;
            if (resistCount <= 4) { ending = endingDetails[0]; textColor = 'text-blue-300'; }
            else if (resistCount === 5) { ending = endingDetails[1]; textColor = 'text-purple-300'; }
            else { ending = endingDetails[2]; textColor = 'text-red-300'; }

            if (resultDisplay) {
                if (totalChoices === 10) {
                    resultDisplay.innerHTML = `<h3 class="text-xl font-bold ${textColor}">FINAL ENDING: ${ending.title}</h3><p class="text-gray-400">${ending.desc}</p>`;
                } else {
                    resultDisplay.innerHTML = `<h3 class="text-xl font-bold ${textColor}">PROJECTED ENDING: ${ending.title}</h3><p class="text-gray-400">Complete all 10 choices to lock in your ending.</p>`;
                }
            }

            for (let i = 0; i < 10; i++) {
                const node = document.getElementById(`path-node-${i + 1}`);
                if (!node) continue;
                const buttons = node.querySelectorAll('.path-choice-btn');
                node.classList.toggle('active', i === totalChoices);
                node.style.opacity = i <= totalChoices ? '1' : '0.5';

                buttons.forEach(btn => {
                    btn.disabled = totalChoices > i;
                    btn.classList.remove('selected');
                    if (choices[i] === btn.dataset.choice) {
                        btn.classList.add('selected');
                    }
                });
            }
        };
        
        timeline.addEventListener('click', e => {
            if (e.target.matches('.path-choice-btn')) {
                const node = e.target.closest('.path-node');
                const levelIndex = parseInt(node.dataset.level) - 1;
                if (choices[levelIndex] === null && (levelIndex === 0 || choices[levelIndex - 1] !== null) ) {
                    choices[levelIndex] = e.target.dataset.choice;
                    updateVisualizerState();
                }
            }
        });

        const resetBtn = document.getElementById('reset-path-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                choices.fill(null);
                updateVisualizerState();
            });
        }
        updateVisualizerState();
    }

    // ===== ANATOMY OF A MEMORY SCRIPT =====
    function setupAnatomySequence() {
        const playBtn = document.getElementById('play-anatomy-btn');
        if(!playBtn) return;
        const janitorSteps = document.querySelectorAll('#janitor-steps .anatomy-step');
        const humanSteps = document.querySelectorAll('#human-steps .anatomy-step');

        const resetAnimation = () => {
            janitorSteps.forEach(s => s.classList.remove('visible'));
            humanSteps.forEach(s => s.classList.remove('visible'));
        };

        playBtn.addEventListener('click', () => {
            resetAnimation();
            playBtn.disabled = true;
            playBtn.innerHTML = `<i class="fas fa-cog fa-spin mr-2"></i>Playing...`;

            let delay = 0;
            const stepDelay = 800;
            
            janitorSteps.forEach((step) => {
                setTimeout(() => step.classList.add('visible'), delay);
                delay += stepDelay;
            });
            
            humanSteps.forEach((step) => {
                setTimeout(() => step.classList.add('visible'), delay);
                delay += stepDelay;
            });
            
            setTimeout(() => {
                playBtn.disabled = false;
                playBtn.innerHTML = `<i class="fas fa-redo mr-2"></i>Replay Sequence`;
            }, delay);
        });
    }

    // ===== FRACTURED MIND INTERACTIVE SCRIPT =====
    function setupFracturedMind() {
        const container = document.getElementById('fractured-mind-container');
        if(container) {
            container.addEventListener('click', () => {
                container.classList.toggle('split');
            });
        }
    }
    
    // ===== CLASSIFIED INFO SCRIPT =====
    function setupClassifiedInfo() {
        const container = document.getElementById('classified-container');
        const contentEl = document.getElementById('classified-content');
        if(!container || !contentEl) return;

        const classifiedText = "SUBJECT: Designated 'Subject 01'.INCIDENT: Myndwell operative befriended Subject 01 over one year. Operative's death was then faked during a public altercation, with Subject 01 framed as the aggressor. PURPOSE: Create a baseline of extreme, complex trauma (grief, betrayal, social ostracization) to stress-test the upper limits of the REM chip's cleansing and neuropatterning capabilities. Subject was selected for psychological resilience and lack of close secondary relations, minimizing external inquiry. STATUS: Optimal. The anomaly 'Partition-09' has formed as predicted, exhibiting unprecedented sentience. This is the perfect test case.";
        
        let hasRevealed = false;
        container.addEventListener('click', () => {
            if(hasRevealed) return;
            
            if (container.classList.contains('revealing')) {
                container.classList.add('revealed');
                typeWriter(contentEl, classifiedText, 15);
                hasRevealed = true;
            } else {
                container.classList.add('revealing');
                const overlay = container.querySelector('.classified-overlay');
                if (overlay) {
                   overlay.innerHTML = `<h3 class="text-3xl font-bold text-red-500 animate-pulse">WARNING: CLASSIFIED INFO</h3><p class="mt-2 text-gray-200">This file contains critical narrative spoilers. Proceed at your own risk.</p><p class="mt-4 text-sm text-gray-400">[Click again to confirm breach]</p>`;
                }
            }
        });
    }

    // ===== OVERSEER TEST SCRIPT =====
    function setupOverseerTest() {
        const startBtn = document.getElementById('start-test-btn');
        const statusEl = document.getElementById('overseer-status');
        const faceEl = document.getElementById('overseer-face');
        const targetEl = document.getElementById('target-pattern');
        const gridEl = document.querySelector('.pattern-grid');
        if(!startBtn || !gridEl) return;

        let targetSequence = [], playerSequence = [], testRunning = false;
        
        gridEl.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'pattern-cell rounded-md';
            cell.dataset.id = i;
            gridEl.appendChild(cell);
        }
        const cells = gridEl.querySelectorAll('.pattern-cell');

        const startNewTest = () => {
            testRunning = true;
            playerSequence = [];
            targetSequence = Array.from({length: 4}, () => Math.floor(Math.random() * 9));
            
            statusEl.textContent = 'STATUS: REPLICATE THE PATTERN.';
            statusEl.className = 'mt-4 text-indigo-300 font-semibold h-12 flex items-center text-center';
            faceEl.src = 'https://placehold.co/200x200/111827/a5b4fc?text=AI';
            faceEl.classList.remove('glitching');
            
            targetEl.innerHTML = targetSequence.map(() => `<div class="w-6 h-6 bg-indigo-400 rounded-sm"></div>`).join('');

            let delay = 500;
            targetSequence.forEach(id => {
                setTimeout(() => {
                    cells[id].classList.add('flash');
                    setTimeout(() => cells[id].classList.remove('flash'), 400);
                }, delay);
                delay += 500;
            });
        };

        const handleCellClick = (e) => {
            if (!testRunning) return;
            const id = parseInt(e.target.dataset.id);
            playerSequence.push(id);
            e.target.classList.add('flash');
            setTimeout(() => e.target.classList.remove('flash'), 400);

            if (playerSequence[playerSequence.length - 1] !== targetSequence[playerSequence.length - 1]) {
                testRunning = false;
                statusEl.textContent = 'ERROR: SEQUENCE MISMATCH. RECALIBRATING...';
                statusEl.className = 'mt-4 text-red-400 font-semibold h-12 flex items-center text-center animate-pulse';
                faceEl.src = 'https://placehold.co/200x200/111827/ef4444?text=ERROR';
                faceEl.classList.add('glitching');
                startBtn.textContent = 'Retry Calibration';
            } else if (playerSequence.length === targetSequence.length) {
                testRunning = false;
                statusEl.textContent = 'STATUS: COGNITIVE FUNCTION NOMINAL.';
                statusEl.className = 'mt-4 text-green-400 font-semibold h-12 flex items-center text-center';
                faceEl.src = 'https://placehold.co/200x200/111827/6ee7b7?text=OK';
                faceEl.classList.remove('glitching');
                startBtn.textContent = 'Begin New Test';
            }
        };
        
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        startBtn.addEventListener('click', startNewTest);
    }
    
    // ===== Digital Abyss Canvas Logic =====
    const canvas = document.getElementById('abyss-canvas');
    let animationFrameId;

    const setupAbyss = () => {
        if (!canvas) return;
        const abyssCtx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);
        const chars = '01'.split('');
        const color1 = { r: 79, g: 70, b: 229 }, color2 = { r: 220, g: 38, b: 38 };

        function draw() {
            const rect = canvas.getBoundingClientRect();
            const scrollPercent = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            abyssCtx.fillStyle = `rgba(209, 213, 229, ${0.1 - (scrollPercent * 0.1)})`;
            abyssCtx.fillRect(0, 0, canvas.width, canvas.height);
            const r = Math.round(color1.r + (color2.r - color1.r) * scrollPercent);
            const g = Math.round(color1.g + (color2.g - color1.g) * scrollPercent);
            const b = Math.round(color1.b + (color2.b - color1.b) * scrollPercent);
            abyssCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            abyssCtx.font = '15px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                abyssCtx.fillText(text, i * 20, drops[i] * 20);
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }

        function animate() {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        }
        
        const abyssObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { if(!animationFrameId) animate(); }
                else { if(animationFrameId) cancelAnimationFrame(animationFrameId); animationFrameId = null; }
            });
        }, { threshold: 0 });

        abyssObserver.observe(document.getElementById('digital-abyss'));
        window.addEventListener('resize', () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            setupAbyss();
        });
    };

    // ========== INITIALIZATION ==========
    function setTabActive(hash, runEffects = false) {
        const targetId = hash.substring(1);

        if (runEffects) {
            if (targetId === 'characters' && !hasSeenStickerbomb) {
                hasSeenStickerbomb = true;
                const stickerbomb = document.getElementById('stickerbomb-overlay');
                stickerbomb.classList.add('visible');
                setTimeout(() => stickerbomb.classList.remove('visible'), 2500);
            }
            if (targetId === 'overview' && !premiseTyped) {
                premiseTyped = true;
                const premiseEl = document.getElementById('premise-text');
                const premiseContent = "In a near-future where the biotech giant Myndwell can surgically remove trauma, a patient who volunteered for the REM procedure slowly realizes his newfound peace is a manufactured lie. The player experiences this fractured identity, playing as both the waking-world Human, living a sterile and hollow life, and the subconscious Janitor, exploring surreal dreamscapes to piece together a stolen identity.";
                if (premiseEl) typeWriter(premiseEl, premiseContent, 20);
            }
        }

        navLinks.forEach(link => link.classList.toggle('active', link.hash === hash));
        contentPanes.forEach(pane => pane.classList.toggle('active', pane.id === targetId));
    }

    function revealGameBible(event) {
        event.preventDefault();
        if (gameBibleContent.classList.contains('hidden-by-default')) {
            gameBibleContent.classList.remove('hidden-by-default');
        }
        const hash = event.currentTarget.hash || '#game-bible-anchor';
        const targetId = hash === '#game-bible-anchor' ? 'game-bible-anchor' : hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        const tabHash = gameBibleAnchors.includes(hash) ? hash : '#overview';
        setTimeout(() => { window.location.hash = tabHash; }, 10);
    }

    const discoverBtn = document.getElementById('discover-truth-btn');
    const gameBibleNavLinks = document.querySelectorAll('#nav-links-rem a');
    const gameBibleContent = document.getElementById('game-bible-anchor');
    const gameBibleAnchors = ['#overview', '#gameplay', '#characters', '#mechanics', '#levels', '#lore', '#art'];
    
    if(discoverBtn) discoverBtn.addEventListener('click', revealGameBible);
    
    gameBibleNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (gameBibleContent && gameBibleContent.classList.contains('hidden-by-default')) {
                revealGameBible(e);
            } else {
                e.preventDefault();
                window.location.hash = link.hash;
            }
        });
    });

    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash;
        if (currentHash && gameBibleAnchors.includes(currentHash)) {
            setTabActive(currentHash, true);
        }
    });

    const initialHash = window.location.hash;
    if (initialHash && gameBibleAnchors.includes(initialHash)) {
        if(gameBibleContent) gameBibleContent.classList.remove('hidden-by-default');
        setTabActive(initialHash, false);
    } else {
        setTabActive('#overview', false);
    }
    
    // Call all setup functions
    updateLevelDetails(1);
    initializeExpandableCards();
    randomizeRedactedNames();
    setupTermButtons();
    // Don't setup abyss until it's visible
    setupGameplayLoop();
    setupNarrativeVisualizer();
    setupAnatomySequence();
    setupFracturedMind();
    setupClassifiedInfo();
    setupOverseerTest();

    document.querySelectorAll('.redacted').forEach(span => {
        span.addEventListener('click', () => {
            span.classList.add('revealed');
        });
    });
});
