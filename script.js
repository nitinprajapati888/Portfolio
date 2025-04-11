// Load introduction
fetch('data/introduction.json')
  .then(response => response.json())
  .then(introduction => {
    document.getElementById('introduction-text').textContent = introduction.introduction;
  });

fetch('data/certificates.json')
  .then(response => response.json())
  .then(certificates => {
    const certificateList = document.getElementById('certificate-list'); // Assuming you have an element with this ID
    certificates.forEach(certificate => {
      const box = document.createElement('div');
      box.className = 'box'; // Add a class for styling

      box.innerHTML = `
        <h3>${certificate.name}</h3>
        <p>Organization: ${certificate.organization}</p>
        <p>Date: ${certificate.date}</p>
        <a href="${certificate.pdf}" target="_blank" class="pdf-link">View PDF</a>
      `;
      certificateList.appendChild(box);
    });
  })
  .catch(error => {
    console.error('Error fetching or processing certificates:', error);
  });


// Load projects
fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectList = document.getElementById('project-list');
        projects.forEach(project => {
            const box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Technologies: ${project.technologies.join(', ')}</p>
                <a href="${project.link}" class="view-link" target="_blank">View Project</a>
            `;
            projectList.appendChild(box);
        });
    });

// Load GitHub repositories
function fetchGitHubRepos() {
    const githubUsername = 'nitinprajapati888';
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => response.json())
        .then(repos => {
            const githubReposDiv = document.getElementById('github-repos');
            repos.forEach(repo => {
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `
                    <img src="${repo.owner.avatar_url}" alt="${repo.name} image">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <a href="${repo.html_url}" class="view-link" target="_blank">View on GitHub</a>
                `;
                githubReposDiv.appendChild(box);
            });
        });
}

fetch('data/skills.json')
  .then(response => response.json())
  .then(skillCategories => {
    const skillsContainer = document.getElementById('skills-container'); // Assuming you have a container for all skills

    skillCategories.forEach(category => {
      // Create category heading
      const categoryHeading = document.createElement('h3');
      categoryHeading.textContent = category.category;
      skillsContainer.appendChild(categoryHeading);

      // Create a list for the skills in this category
      const skillsList = document.createElement('ul');
      skillsList.className = 'skills-list'; // Add a class for styling
      skillsContainer.appendChild(skillsList);

      // Add each skill to the list
      category.skills.forEach(skillObj => {
        const skillElement = document.createElement('li');
        skillElement.textContent = skillObj.skill;

        // Create the icon element
        const iconElement = document.createElement('i');
        iconElement.className = skillObj.icon;

        // Insert the icon before the text
        skillElement.prepend(iconElement);

        skillsList.appendChild(skillElement);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching or processing skills:', error);
  });
//contact form, this portion will be expanded later.
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get form values (optional, if you want to use them for validation)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation (you can add more complex validation here)
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Submit the form using fetch (Formspree will handle the submission)
    fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            document.getElementById('contact-form').reset();
        } else {
            alert('There was a problem sending your message.');
        }
    }).catch(error => {
        alert('There was a problem sending your message.');
    });
});

// Smooth Scrolling and Active Link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ... (existing JavaScript) ...

// Navbar Toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarNav = document.getElementById('sidebar-nav');

sidebarToggle.addEventListener('click', () => {
    sidebarNav.classList.toggle('show');
});