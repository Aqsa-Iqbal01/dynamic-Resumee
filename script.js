
const form = document.getElementById('resume-form');
const resumeDisplayElement = document.getElementById('resume-display');
// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Prevent page reload
    // Collect input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    // Handle Profile Picture
    const profilePicInput = document.getElementById('profile-pic');
    let profilePicURL = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        const file = profilePicInput.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            profilePicURL = reader.result; 
            generateResume(profilePicURL);
        };
        reader.readAsDataURL(file);
    }
    else {
        // If no file is selected, proceed without an image
        generateResume('');
    }
    // Function to generate resume
    function generateResume(profilePic) {
        const resumeHTML = `
        <h2><b>Resume</b></h2>
        <h3>Personal Information</h3>
        ${profilePic ? `<img src="${profilePic}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">` : ''}
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
        `;
        // Display the generated resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
        }
        else {
            console.error('Resume display is missing.');
        }
    }
});
