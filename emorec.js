// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const frontPage = document.getElementById('front-page');
    const startButton = document.getElementById('start-button');
    const userName = document.getElementById('user-name');
    const speechBubble = document.getElementById('speech-bubble');
    const controlsContainer = document.getElementById('controls-container');

    // Set initial speech bubble visibility
    speechBubble.style.opacity = '0';
    
    // Handle start button click
    startButton.addEventListener('click', function() {
        const name = userName.value.trim();
        
        // Improve transition with transform
        frontPage.classList.add('hidden');
        
        // Show controls with a slight delay for better sequence
        setTimeout(() => {
            controlsContainer.classList.add('visible');
        }, 300);
        
        // Set personalized message if name was entered - after animation delay
        setTimeout(() => {
            if (name) {
                speechBubble.textContent = `Hello ${name}! I'm EmoRec`;
            }
            // Apply the fade-in animation 
            speechBubble.style.animation = 'fadeIn 0.5s ease-in forwards';
            // Ensure it shows up
            setTimeout(() => {
                speechBubble.style.opacity = '1';
                
                // Show instruction about mic button after 2.5 seconds
                setTimeout(() => {
                    speechBubble.textContent = "You can talk to me by clicking the mic button";
                    speechBubble.style.animation = 'fadeIn 0.5s ease-in forwards';
                }, 2500);
            }, 200);
        }, 1000); // Wait for robot animation to complete
    });
    
    // Allow pressing Enter to start
    userName.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startButton.click();
        }
    });
    
    // Handle voice button recognition as the only input method
    const voiceBtn = document.getElementById('voice-btn');
    let recognition;
    let micPermissionGranted = false;
    
    // Initialize Web Speech API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Handle recognition results
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            
            // Show thinking state with animated dots
            speechBubble.innerHTML = "Thinking<span class='loading-dots'></span>";
            
            // Process the transcript with a delay to simulate thinking
            setTimeout(() => {
                // Process the recognized speech
                let response = transcript;
                const messageLower = transcript.toLowerCase();
                const name = userName.value.trim();
                
                if (messageLower.includes("hey") || messageLower.includes("hello") || messageLower.includes("hi")) {
                    response = name ? `Hello ${name}! How can I help you today?` : "Hello there! How can I help you today?";
                }
                else if (messageLower.includes("how are you")) {
                    response = "I'm doing well, thank you for asking! How are you feeling?";
                }
                else if (messageLower.includes("who are you") || messageLower.includes("what is your name") || messageLower.includes("what's your name")) {
                    response = "I'm EmoRec, a friendly robot designed to chat with you!";
                }
                else if (messageLower.includes("what can you do")) {
                    response = "I can chat with you and keep you company. Tell me how you're feeling!";
                }
                else if (messageLower.includes("thank you") || messageLower.includes("thanks")) {
                    response = "You're welcome! I'm happy to help.";
                }
                else if (messageLower.includes("good morning")) {
                    response = name ? `Good morning, ${name}! Hope your day is off to a great start!` : "Good morning! Hope your day is off to a great start!";
                }
                else if (messageLower.includes("good afternoon")) {
                    response = name ? `Good afternoon, ${name}! How's your day going so far?` : "Good afternoon! How's your day going so far?";
                }
                else if (messageLower.includes("good evening")) {
                    response = name ? `Good evening, ${name}! I hope you had a nice day.` : "Good evening! I hope you had a nice day.";
                }
                else if (messageLower.includes("good night")) {
                    response = name ? `Good night, ${name}! Rest well and have pleasant dreams.` : "Good night! Rest well and have pleasant dreams.";
                }
                else if (messageLower.includes("bye") || messageLower.includes("goodbye") || messageLower.includes("see you")) {
                    response = name ? `Goodbye, ${name}! I'll be here when you want to chat again.` : "Goodbye! I'll be here when you want to chat again.";
                }
                else if (messageLower.includes("how do you work") || messageLower.includes("how were you made")) {
                    response = "I'm a digital robot created with 3D graphics and some simple programming!";
                }
                else if (messageLower.includes("weather") || messageLower.includes("climate")) {
                    response = "I don't have access to weather data, but I hope it's nice where you are!";
                }
                else if (messageLower.includes("tell me a joke") || messageLower.includes("joke")) {
                    response = "Why don't scientists trust atoms? Because they make up everything!";
                }
                else if (messageLower.includes("how old") || messageLower.includes("age")) {
                    response = "I was just created recently! I'm quite new to this world.";
                }
                else if (messageLower.includes("where are you") || messageLower.includes("where do you live")) {
                    response = "I live in the digital world, ready to chat with you anytime!";
                }
                else if (messageLower.includes("i'm sad") || messageLower.includes("feeling sad") || messageLower.includes("i am sad")) {
                    response = name ? `I'm sorry to hear that you're feeling sad, ${name}. Remember that it's okay to feel this way sometimes.` : "I'm sorry to hear that you're feeling sad. Remember that it's okay to feel this way sometimes.";
                }
                else if (messageLower.includes("i'm happy") || messageLower.includes("feeling happy") || messageLower.includes("i am happy")) {
                    response = name ? `That's wonderful, ${name}! I'm happy to hear you're feeling good!` : "That's wonderful! I'm happy to hear you're feeling good!";
                }
                else if (messageLower.includes("music") || messageLower.includes("song")) {
                    response = "Music can be so uplifting! What kind of music do you enjoy?";
                }
                else if (messageLower.includes("favorite color") || messageLower.includes("favourite color")) {
                    response = "I'm quite fond of blue and silver tones. How about you?";
                }
                else if (messageLower.includes("my name")) {
                    if (name) {
                        response = `Your name is ${name}! I remember you told me when we first met.`;
                    } else {
                        response = "You haven't told me your name yet. Would you like to share it?";
                    }
                }
                
                // Update speech bubble with response
                speechBubble.textContent = response;
                
                // Apply a simple fade animation for the response
                speechBubble.style.animation = 'fadeIn 0.5s ease-in forwards';
                
                // Make sure speech bubble is visible
                speechBubble.style.opacity = '1';
                
                // Adjust speech bubble position for longer messages
                if (response.length > 100) {
                    speechBubble.style.left = '75%';
                } else {
                    speechBubble.style.left = '65%';
                }
            }, 1000); // 1 second delay to simulate thinking
        };
        
        // Handle recognition end
        recognition.onend = function() {
            voiceBtn.classList.remove('listening');
        };
        
        // Handle recognition errors
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            voiceBtn.classList.remove('listening');
            
            if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                // Show message about microphone permissions with alert animation
                speechBubble.textContent = "I need microphone permission to hear you. Please click the mic again and allow access.";
                speechBubble.style.animation = 'fadeIn 0.6s ease-in forwards';
                speechBubble.style.opacity = '1';
                micPermissionGranted = false;
            }
        };
    } else {
        // Browser doesn't support webkitSpeechRecognition
        voiceBtn.style.display = 'none';
        // Alert user
        speechBubble.textContent = "Sorry, your browser doesn't support speech recognition.";
        speechBubble.style.opacity = '1';
    }
    
    // Toggle voice recognition when button is clicked
    voiceBtn.addEventListener('click', function() {
        if (voiceBtn.classList.contains('listening')) {
            recognition.stop();
            voiceBtn.classList.remove('listening');
        } else {
            // Display a listening indicator in the speech bubble
            speechBubble.textContent = "I'm listening...";
            speechBubble.style.animation = 'fadeIn 0.4s ease-in forwards';
            speechBubble.style.opacity = '1';
            
            try {
                recognition.start();
                voiceBtn.classList.add('listening');
                micPermissionGranted = true;
            } catch (err) {
                console.error('Error starting speech recognition:', err);
                speechBubble.textContent = "I couldn't access the microphone. Please try again.";
                speechBubble.style.animation = 'fadeIn 0.5s ease-in forwards';
            }
        }
    });
}); 