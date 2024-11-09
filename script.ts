
const form: HTMLFormElement | null = document.getElementById('resume-form') as HTMLFormElement | null;
const resumeDisplayElement: HTMLElement | null = document.getElementById('resume-display');

// Handle form submission only if the form exists
if (form) {
    form.addEventListener('submit', (event: Event): void => {
        event.preventDefault(); // Prevent page reload on form submit

        // Collect input values
        const name: string = (document.getElementById('name') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;
        const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
        const education: string = (document.getElementById('education') as HTMLInputElement).value;
        const experience: string = (document.getElementById('experience') as HTMLInputElement).value;
        const skills: string = (document.getElementById('skills') as HTMLInputElement).value;

        // Handle Profile Picture
        const profilePicInput: HTMLInputElement = document.getElementById('profile-pic') as HTMLInputElement;
        let profilePicURL: string = '';
        
        if (profilePicInput.files && profilePicInput.files[0]) {
            const file: File = profilePicInput.files[0];
            const reader: FileReader = new FileReader();
            
            reader.onloadend = (): void => {
                profilePicURL = reader.result as string; 
                generateResume(profilePicURL); // Generate resume with the profile picture URL
            };
            
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, proceed without an image
            generateResume('');
        }

        // Function to generate resume HTML
        function generateResume(profilePic: string): void {
            const resumeHTML: string = `
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
            } else {
                console.error('Resume display is missing.');
            }
        }
    });
} else {
    console.error("Form element not found.");
}
